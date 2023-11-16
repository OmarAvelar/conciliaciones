const { DynamoDBClient } = "@aws-sdk/client-dynamodb";
const { PutCommand, DynamoDBDocumentClient } = "@aws-sdk/lib-dynamodb";
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, S3 } = require("@aws-sdk/client-s3");
const Transform = require("stream").Transform;
const formidable = require("formidable");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const regionDDB = process.env.DB_REGION;
const Bucket = process.env.S3_BUCKET;
const tableMex = "mex_docs_loaded";
const tableArg = "arg_docs_loaded";

var AWS = require("aws-sdk");
AWS.config.update({ region: region });
var AWSDDB = require("aws-sdk");
AWSDDB.config.update({ region: regionDDB });
var ddb = new AWSDDB.DynamoDB({ apiVersion: "2012-08-10" });

const parseFile = async (req) => {
  return new Promise((resolve, reject) => {
    let options = {
      maxFileSize: 100 * 1024 * 1024, //100 megabytes converted to bytes,
      allowEmptyFiles: false,
    };

    const form = new formidable.IncomingForm();
    // method accepts the request and a callback.
    form.parse(req, (err, fields, files) => {
      // console.log(fields, "====", files)
    });

    form.on("error", (error) => {
      reject(error.message);
    });

    form.on("data", (data) => {
      if (data.name === "complete") {
        // let statuscode = data.value['$metadata']?.httpStatusCode || 200;
        resolve(data.value);
      }
    });

    form.on("fileBegin", (formName, file) => {
      file.open = async function () {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          },
        });

        this._writeStream.on("error", (e) => {
          form.emit("error", e);
        });

        var today = new Date();
        var todayTS = Date.now();
        var year = today.toLocaleString("default", { year: "numeric" });
        var month = today.toLocaleString("default", { month: "2-digit" });
        var day = today.toLocaleString("default", { day: "2-digit" });
        var period = year + "/" + month;
        var dateFormat = year + "/" + month + "/" + day + "/";
        var fileName = `${this.originalFilename}`;
        var tableName = tableArg;
        //console.log(fileName)
        var filePath = "loaded/ARG/" + dateFormat + todayTS + "-" + fileName;
        //console.log(filePath)
        //console.log(fileName)
        if (filePath.includes("export")) {
          filePath = "loaded/MEX/" + dateFormat + todayTS + "-" + fileName;
          tableName = tableMex;
          //console.log(filePath)
          //console.log(fileName)
        }
        // upload to S3
        new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
          }),
          params: {
            ACL: "public-read",
            Bucket,
            Key: filePath,
            Body: this._writeStream,
          },
          tags: [], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        })
          .done()
          .then((data) => {
            console.log(filePath);
            console.log(fileName);
            form.emit("data", { name: "complete", value: data });

            var params = {
              TableName: tableName,
              Item: {
                user_id: { S: "57845652" },
                doc_name: { S: todayTS + "-" + fileName },
                last_update: { S: today.toLocaleString("es-MX") },
                period: { S: period },
              },
            };

            // Call DynamoDB to add the item to the table
            ddb.putItem(params, function (err, data) {
              if (err) {
                console.log("Error", err);
              } else {
                console.log("Success", data);
              }
            });
          })
          .catch((err) => {
            form.emit("error", err);
          });
      };

      file.end = function (cb) {
        this._writeStream.on("finish", () => {
          this.emit("end");
          cb();
        });
        this._writeStream.end();
      };
    });
  });
};

module.exports = parseFile;

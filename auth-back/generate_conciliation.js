const regionDDB = process.env.DB_REGION;

var AWS = require("aws-sdk");
AWS.config.update({ region: regionDDB });
var lambda = new AWS.Lambda();

const generateConciliation = async (req) => {
  return new Promise((resolve, reject) => {
    var params = {
      FunctionName: "generateConciliation",
    };
    lambda.invoke(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  });
};

module.exports = generateConciliation;

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authenticateToken = require("./auth/authenticateToken");
const log = require("./lib/trace");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.set("json spaces", 5); // to pretify json response

const PORT = process.env.PORT;
const fileParser = require("./file_parser");
const fileParserArg = require("./file_parser_arg");
const generateConciliation = require("./generate_conciliation");

const port = process.env.PORT || 3000;


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  console.log("Conectado a la base de datos");
}

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signout", require("./routes/logout"));

// Ruta para renovar el token de acceso utilizando el token de actualización
app.use("/api/refresh-token", require("./routes/refreshToken"));

app.use("/api/posts", authenticateToken, require("./routes/posts"));
// Ruta protegida que requiere autenticación
/* app.get("/api/posts", authenticateToken, (req, res) => {
  res.json(posts);
}); */
/* app.post("/api/posts", authenticateToken, (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const post = {
    id: posts.length + 1,
    title: req.body.title,
    completed: false,
  };

  posts.push(post);

  res.json(post);
}); */

app.use("/api/user", authenticateToken, require("./routes/user"));

app.post("/api/upload", async (req, res) => {
  await fileParser(req)
    .then((data) => {
      //res.status(200).json({
      //message: "Success",
      //data
      //})
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred." + error,
        error,
      });
    });
});

app.post("/api/upload/arg", async (req, res) => {
  await fileParserArg(req)
    .then((data) => {
      //res.status(200).json({
      //message: "Success",
      //data
      //})
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred." + error,
        error,
      });
    });
});

app.post("/api/generate/conciliation", async (req, res) => {
  await generateConciliation(req)
    .then((data) => {
      res.status(200).json({
        message: "Success",
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred." + error,
        error,
      });
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = app;

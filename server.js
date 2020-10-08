const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dbConfig = require("./app/config/db.config");
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE //
const db = require("./app/models");
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;
const connectionString = `mongodb+srv://admin:${PASSWORD}@${DB}?retryWrites=true&w=majority`;

db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to workMax" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

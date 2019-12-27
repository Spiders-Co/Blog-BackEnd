const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/connectDb");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid");

const users = require("./routes/users");
const auth = require("./routes/auth");
const category = require("./routes/categories");

const app = express();
const port = process.env.PORT || 5000;

// Connecting to MongoDb
connectDb();

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/categories", category);

const server = app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`)
);

module.exports = server;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./API");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api", router)

app.use(express.static("client"))

//Connecting to db
mongoose.connect(
    "mongodb://localhost:27017/gruppen",
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }, 
    () => console.log("Connected to db")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));



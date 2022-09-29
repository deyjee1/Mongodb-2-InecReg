const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userModel = require("./inecReg");

app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(
  "mongodb://localhost/InecRegistration",
  () => {
    console.log(`Database Connected`);
  },
  (e) => {
    console.log(`Server could not run because of ${e.message}`);
  }
);

app.post("/inecUsers", async (req, res) => {
  await userModel
    .create(req.body)
    .then((user) => {
      res.status(201).json({
        sucess: "true",
        message: "Data created",
        user,
      });
    })
    .catch((e) => {
      res.status(501).json({
        success: "false",
        message: `Data could not be created because of ${e.message}`,
      });
    });
});

app.get("/allUsers", async (req, res) => {
  try {
    const users = await userModel.find();

    if (users) {
      res.status(200).json({
        success: "true",
        users,
      });
    } else if (users.length < 1) {
      res.status(404).json({
        success: "true",
        message: "No record found",
      });
    }
  } catch (e) {
    res.status(501).json({
      success: false,
      error: e.message,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await userModel.findById(userID);

    if (user) {
      res.status(200).json({
        success: "true",
        user,
      });
    } else {
      res.status(404).json({
        success: "false",
        message: `No record found with user with ID ${userID}`,
      });
    }
  } catch (e) {
    res.status(501).json({
      success: false,
      error: e.message,
    });
  }
});

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

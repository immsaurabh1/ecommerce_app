const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require('path');
// making few variables accessible globally

global._app = express();
global._config = require("./config");
global._models = require("./models");

_app.use(cors());
_app.use(require("./middleware"));
_app.use(require("./routes"));

// console.log(__dirname)
// _app.use(express.static(path.join(__dirname, "../frontend/build/")));

// Setup DB Connection
mongoose
  .connect(_config.get("db").uri, _config.get("db").options)
  .then(connection => {
    global._db = connection;
    _app.listen(`${_config.get("port")}`, () => {
      console.log(
        `App is running on ${_config.get("port")} in ${_config.get(
          "environment"
        )} mode`
      );
    });
  })
  .catch(err => {
    console.error("Unable to connect to database. Aborting start up.", err);
  });

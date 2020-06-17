// var mongoose = require('mongoose');
// var url = "mongodb://localhost:27017/Friends";

mongoose.connect("mongodb://localhost:27017/Friends",
    { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
        if (err) {
            Console.log("Not connected");
        }
        else {
            console.log("database connected success");

            db.close();
        }
    })

// const newModel = require('./newModel.model');
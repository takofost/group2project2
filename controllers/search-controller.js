var db = require("../models");

var passport = require("passport");

module.exports = function(app) {
  app.get("/search", function(req, res) {
    if(req.isAuthenticated()){
      db.student.findAll({}).then(function (studentdb) {
        console.log("studentdb", studentdb);

        var hbsObj = {
          student: [],
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };;
        studentdb.forEach(function(student){
          hbsObj.student.push(student.dataValues);
        });

        res.render("search", hbsObj);
      });
    }
    else{
      res.redirect("/");
    }
  });
};
;
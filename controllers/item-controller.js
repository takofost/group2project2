var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  //Brings to add-items form.
  app.get("/add-student/new", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };;
      res.render("add-student", user);
    } else {
      res.redirect("/");;
    }
  });

  //Posting item to item table.
  app.post("add-student/new", function(req, res) {
    console.log(req.body);
    console.log("is logged in", req.isAuthenticated());;
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };;
      db.student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        rank: req.body.rank,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone
      }).then(function(studentdb) {
        res.redirect("/add-student/new");
      });
    } else {
      res.redirect("/");;
    }
  });

  app.put("/add-student/update/:student_id", function(req, res) {
    if (req.isAuthenticated()) {
      db.student.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          rank: req.body.rank,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          email: req.body.email,
          phone: req.body.phone
        },
        {
          where: {
            id: req.params.student_id
          }
        }
      ).then(function(studentdbs) {
        db.Transactions.create({
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          student_id: req.params.student_id,
          user_id: req.session.passport.user
        }).then(function () {
          res.redirect("/add-student/new");
        });
      });
    } else {
      res.redirect("/");;
    }
  });

  //Update the item's desceription etc...
  app.get(
    "/add-student/transactions/:account_id/:account_key/:student_id",
    function(req, res) {
      db.Accounts.findOne({
        where: {
          id: req.params.account_id,
          account_key: req.params.account_key
        }
      }).then(function(dbAccounts) {
        console.log(dbAccounts);
        // //IF confirmed then apply below.
        // db.Items.update({
        //     available: req.body.start_date
        // }, {
        //         where: {
        //             id: req.params.item_id
        //         }
        //     }).then(function (result) {
        //         if (result.changedRows == 0) {
        //             return res.status(404).end();
        //         } else {
        //             res.status(200).end();
        //         }
        //     })
      });;
    }
  );

  //Delete an item.
  app.delete("/add-student/:student_id", function(req, res) {
    db.student.destroy({
      where: {
        id: req.params.student_id
      }
    }).then(function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });;
  });
};;

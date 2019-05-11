module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };;
      res.render("home", user);
    } else {
      res.render("home");
    }
  });;

  app.get("/search", function(req, res) {
    res.render("search");
  });

  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/acounts/view");
    } else {
      res.render("accounts");
    }
  });

  app.get("/add-student", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("add-student");
    } else {
      res.redirect();;
    }
  });
};

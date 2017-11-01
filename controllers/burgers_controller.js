var express = require("express");

var router = express.Router();
var db = require("../models");


module.exports=function(app){
  // get route -> index
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });//end of get home function

  app.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll({}).then(function(results) {
      var hbsObject = { burgers: results };
    res.render("index", hbsObject);
    });
  
});//end of get /burger route function


// post route -> back to index
app.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  console.log(req.body);

  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(results){
      res.redirect("/");
  })

});


  // PUT route for updating posts
  app.put("/burgers/update", function(req, res) {
    db.Burger.update({ devoured: true},
      {
        where: {
          id: req.body.burger_id
        }
      })
    .then(function(results) {
      res.json(results);
    });
    res.redirect("/");
  });


}//end of export



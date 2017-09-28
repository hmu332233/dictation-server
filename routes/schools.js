const express = require('express');
const router = express.Router();

var School = require("../models/school");

//search
router.get("/schools/search", function (req, res){
  var query = {};
  var _region1 = req.query.region1;
  var _region2 = req.query.region2;
  
  if(_region1) query.region1 = _region1;
  if(_region2) query.region2 = _region2;
  
  console.log(query);
  
  School.find(query, function (err, schools){
    if(err){
      console.err(err);
      return res.status(500).send(err);
    } 
    if(schools.length === 0) return res.status(404).send({});
    
    return res.send(schools);
  });
});

//index
router.get("/schools", function (req, res){
	School.find({}, function (err, schools){
		if(err){
      console.log(err);
      return res.status(500).send(err);
    }
		res.send(schools);
	});
});

//show
router.get("/schools/:id", function (req, res){
	var id = req.params.id;
	
	School.findById(id, function (err, school) {
 		if(err) return res.status(500).send(err);
  	if(!school) return res.status(404).send({ err: "school not found"});
  	res.send(school);
  });
});

// //create
// router.post("/schools", function (req, res){
// });

// //update
// router.put("/schools/:id", function (req, res){
// 	var id = req.params.id;
// });

// //delete
// router.delete("/teachers/:id", function (req, res){
// 	var id = req.params.id;
// });

module.exports = router;
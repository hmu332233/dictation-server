const express = require('express');
const router = express.Router();

var School = require("../models/school");

//index
router.get("/schools", function (req, res){
	School.find({}, function (err, schools){
		if(err) return res.status(500).send(err);
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
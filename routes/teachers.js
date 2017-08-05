const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");

//index
router.get("/teachers", function (req, res){
	Teacher.find({}, function (err, teachers){
		if(err) return res.status(500).send(err);
		res.send(teachers);
	});
});

//show
router.get("/teachers/:id", function (req, res){
	
	var id = req.params.id;
  
	Teacher.findById(id, function (err, teacher) {
 		if(err) return res.status(500).send(err);
  	if(!teacher) return res.status(404).send({ err: "Teacher not found"});
  	res.send(teacher);
  });
});

//create
router.post("/teachers", function (req, res){
	
	var teacher = new Teacher(req.body);
  
  teacher.save(function (err, teacher){
    if(err) return res.status(500).send(err);
    res.send(teacher);
  });
	
});

//update
router.put("/teachers/:id", function (req, res){
	
});

//delete
router.delete("/teachers/:id", function (req, res){
	
});

module.exports = router;
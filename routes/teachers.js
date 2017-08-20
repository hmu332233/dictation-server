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
	
	var id = req.params.id;
  
  Teacher.findByIdAndUpdate(id, req.body, {new: true}, function (err, teacher) {
    if(err) return res.status(500).send(err);
    res.send(teacher);
  });
});

//delete
router.delete("/teachers/:id", function (req, res){
	
	var id = req.params.id;
  
  Teacher.remove({ "_id": id }, function (err){
    if(err) return res.status(500).send(err);
    res.send("success");
  });
});

router.get("/teachers/:id/quzzies", function (req, res){
	var id = req.params.id;
	
	Teacher.findById(id, function (err, teacher) {
 		if(err) return res.status(500).send(err);
  	if(!teacher) return res.status(404).send({ err: "Teacher not found"});
  	res.send(teacher.quzzies);
  });
});

module.exports = router;
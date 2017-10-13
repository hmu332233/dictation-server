const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Quiz = require("../models/quiz");

//check for duplicate
router.get("/teachers/check_duplicate", function (req, res){
	var login_id = req.query.login_id;
	console.log(login_id);
	Teacher.checkForDuplicate(login_id, function (err, duplicate){
		console.log(duplicate);
		if(duplicate) return res.send({result:true});
		else return res.send({result:false});
	});
});

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
    if(err){
			if(err.code === 11000) return res.status(409).send(err);
			
			return res.status(500).send(err);
		} 
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

router.get("/teachers/login_id/:login_id", function (req, res){
	
	var login_id = req.params.login_id;
	
	Teacher.findOne({'login_id': login_id }, function (err, teacher){
		if(err) return res.status(500).send(err);
		if(!teacher) return res.status(404).send({ err: "Teacher not found"});
		res.send(teacher);
	});
	
});

//add teacher.quizzes
// @body: quiz
router.post("/teachers/:id/quizzes", function (req, res) {
  var id = req.params.id;
  
	Teacher.findById(id, function (err, teacher) {
    
		Quiz.create(req.body, function (err, quiz){
			if(err) {
  			console.log(err);
				return res.status(500).send(err);
      }
      
			teacher.quizzes.push(quiz._id);
			teacher.save();
      
			return res.send({result:true});
		});
  });
  
});

module.exports = router;
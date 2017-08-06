const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

router.get('/test', function (req, res){
	res.send('test');
});

router.get('/teachers/:teacher_id/students', function (req ,res){

	var teacher_id = req.params.teacher_id;

	Teacher.findById(teacher_id, function (err, teacher){
		if(err) return res.status(500).send(err);
		Student.find({_id: { $in : teacher.students }}, function(err, students){
			if(err) return res.status(500).send(err);
			res.send(students);
		});
		
	});
});

router.post("/teachers/:teacher_id/students", function (req, res){
	
	var teacher_id = req.params.teacher_id;
	
	var student = new Student(req.body);
	console.log(student);
	student.save(function (err, student) {
		
		Teacher.findById(teacher_id, function (err, teacher) {
		
			teacher.students.push(student.id);
			teacher.save(function (err, teacher) {
				
				if(err) return res.status(500).send(err);
				res.send(teacher);
			});
		});
	});
});


router.get('/students/:id', function (req, res){
	var id = req.parmas.id;
	
	Student.findById(id, function (err, student){
		if(err) return res.status(500).send(err);
		res.send(student);
	});
});

router.put('/students/:id', function (req, res){
	
	var id = req.params.id;
  
  Student.findByIdAndUpdate(id, req.body, {new: true}, function (err, student) {
    if(err) return res.status(500).send(err);
    res.send(student);
  });
});

module.exports = router;
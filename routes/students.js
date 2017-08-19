const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");


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

//학생 회원가입 + 선생님 반 학생으로 추가
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

//선생님 반 학생으로 추가
router.post("/teachers/:teacher_id/students/:student_id", function (req, res){
	
	var teacher_id = req.params.teacher_id;
	var student_id = req.params.student_id; 
	
	Teacher.findById(teacher_id, function (err, teacher) {

    teacher.students.push(student_id);
    teacher.save(function (err, teacher) {	
	    if(err) return res.status(500).send(err);
      res.send(teacher);
    });
	});
});

//show
router.get('/students/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	
	Student.findById(id, function (err, student){
		if(err) return res.status(500).send(err);
		res.send(student);
	});
});

//create
router.post("/students", function (req, res){
	
	var student = new Student(req.body);
  
  student.save(function (err, student){
    if(err) return res.status(500).send(err);
    res.send(student);
  });
	
});

//update
router.put('/students/:id', function (req, res){
	
	var id = req.params.id;
  
  Student.findByIdAndUpdate(id, req.body, {new: true}, function (err, student) {
    if(err) return res.status(500).send(err);
    res.send(student);
  });
});

//delete
router.delete("/teachers/:teacher_id/students/:students_id", function (req, res){
	
	var teacher_id = req.params.teacher_id;
	var students_id = req.params.students_id;
	
	Teacher.findById(teacher_id, function (err, teacher){
		if(err) return res.status(500).send(err);
		teacher.students.remove(students_id);
		teacher.save(function (err, teacher){
			if(err) return res.status(500).send(err);
		});
	});
  
	Student.remove({ "_id": students_id }, function (err){
    if(err) return res.status(500).send(err);
    res.send("success");
  });
	
});

module.exports = router;
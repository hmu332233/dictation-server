
const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

router.get('/teachers/:teacher_id/students', function (req ,res){

	var teacher_id = req.params.teacher_id;
	
	Teacher.findById(teacher_id).populate({path:'students',populate:{path:'quiz_results'}}).exec(function (err, teacher){
		if(err) return res.status(500).send(err);
		res.send(teacher.students);
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

//check for duplicate
router.get("/students/check_duplicate", function (req, res){

	Student.checkForDuplicate(req.query, function (err, duplicate){
		console.log(duplicate);
		if(duplicate) return res.send({result:true});
		else return res.send({result:false});
	});
});

//show
router.get('/students/:id', function (req, res){
	var id = req.params.id;
	
	Student.findById(id, function (err, student){
		if(err) return res.status(500).send(err);
    if(!student) return res.status(404).send({});
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
    if(err) {
      console.log(err);
    	return res.status(500).send(err);
    }
    if(!student) return res.status(404).send({});
    res.send(student);
  });
});

//delete
router.delete("/teachers/:teacher_id/students/:student_id", function (req, res){
	
	var teacher_id = req.params.teacher_id;
	var student_id = req.params.student_id;
	
	Teacher.findById(teacher_id, function (err, teacher){
		if(err){
      console.log(err);
    	return res.status(500).send(err); 
    } 
    if(!teacher) return res.status(404).send({});
		teacher.students.remove(student_id);
		teacher.save(function (err, teacher){
			if(err) return res.status(500).send(err);
      res.send({reusult:true});
		});
	});
});

router.get('/students/:id/teachers', function (req, res){
  
  var id = req.params.id;
  
  Student.findById(id).populate('teachers').exec(function (err, student){
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    if(!student){
      return res.status(404).send({});
    }
    
    return res.send(student.teachers);
  });
  
});

router.delete('/students/:student_id/teachers/:teacher_id', function (req, res){
  
  var teacher_id = req.params.teacher_id;
  var student_id = req.params.student_id;
  
  Student.findById(student_id).exec(function (err, student){
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    if(!student){
      return res.status(404).send({});
    }
    
    student.teachers.remove(teacher_id);
    student.save();
    
    return res.send({});
  });
});

module.exports = router;
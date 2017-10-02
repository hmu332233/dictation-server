const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

router.post('/matching/apply', function (req, res){

	var teacher_login_id = req.body.teacher_login_id;
  var student_id = req.body.student_id;
  
  Teacher.findOne({login_id: teacher_login_id}, function (err, teacher){
    if(err) return res.status(500).send(err);
    if(!teacher) return res.status(404).send({});
    
    teacher.applicants.push(student_id);
    teacher.save();
    return res.send({result:true});
  });
  
});

router.post('/matching/accept', function (req, res){
  
  var teacher_login_id = req.body.teacher_login_id;
  var student_id = req.body.student_id;
  
  Teacher.findOne({login_id: teacher_login_id}, function (err, teacher){
    if(err){
          console.log(err);
          return res.status(500).send(err);
    } 
    if(!teacher) return res.status(404).send({});
    
    if(teacher.applicants.indexOf(student_id) > -1){  // if student exsis, remove at applicants and add in students
      
      Student.findById(student_id, function (err, student){
      	if(err){
          console.log(err);
          return res.status(500).send(err);
        } 
    		if(!student) return res.status(404).send({});
      	
      	teacher.applicants.remove(student_id);
      	teacher.students.push(student_id);
      	teacher.save();  
        
        student.teachers.push(teacher._id);
        student.save();
      });
    } else {
      return res.status(404).send({});
    }
    
    return res.send({result:true});
  });
});

router.post('/matching/cancel', function (req, res){
  
  var teacher_login_id = req.body.teacher_login_id;
  var student_id = req.body.student_id;
  
	Teacher.findOne({login_id: teacher_login_id}, function (err, teacher){
  	if(err) return res.status(500).send(err);
    if(!teacher) return res.status(404).send({});
    
    if(teacher.applicants.indexOf(student_id) > -1){  // if student exsis, remove at applicants
      
      teacher.applicants.remove(student_id);
      teacher.save();
      
    } else {
      return res.status(404).send({});
    }
    
    return res.send({result:true});
  });
  
});

router.get('/matching/list/:teacher_login_id', function (req ,res){

	var teacher_login_id = req.params.teacher_login_id;
	
	Teacher.findOne({login_id: teacher_login_id}).populate('applicants','school grade class name').exec(function (err, teacher){
		if(err) return res.status(500).send(err);
    if(!teacher) return res.status(400).send({});
		
    return res.send(teacher.applicants);
	});
});

router.delete('/matching/teacher_id/:teacher_id/student_id/:student_id', function (req, res){
    
  var teacher_id = req.params.teacher_id;
  var student_id = req.params.student_id;
  
  Teacher.findById(teacher_id).exec()
  	.then(function (teacher){
    	if(!teacher){
        throw new Error({status:404});
      }
    	teacher.students.remove(student_id);
  		teacher.save();
    
  		return Student.findById(student_id).exec();  
  	})
  	.then(function (student){
    	if(!student){
        throw new Error({status:404});
      }
    
  		student.teachers.remove(teacher_id);  
  		student.save();
  	})
  	.then(function (){
    	return res.send({result:true});
  	})
  	.catch(function (err){
    	if(err.status === 404) return res.status(404).send({});
    
    	console.log(err);
    	return res.status(500).send(err);
  	});
});

module.exports = router;
const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");

router.post('/matching/apply', function (req ,res){

	var teacher_login_id = req.body.teacher_login_id;
  var student_id = req.body.student_id;
  
  Teacher.findOne({login_id: teacher_login_id}, function (err, teacher){
    if(err) return res.status(500).send(err);
    if(!teacher) return res.status(404),send({});
    
    teacher.applicants.push(student_id);
    teacher.save();
    return res.send(teacher);
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

module.exports = router;
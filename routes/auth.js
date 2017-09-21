const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

router.post('/auth/login', function (req, res){
	
	var login_id = req.body.login_id;
	var pw = req.body.password;
	var type = req.body.type;
	
	// console.log(email);
	// console.log(pw);
	// console.log(type);
	switch(type) {
    case 'teacher':
			Teacher.findOne({login_id: login_id, password: pw}, function (err, teacher){
				if(err) return res.status(500).send(err);
				if(!teacher) return res.status(404).send({});
				
				res.send(teacher);
			});
      break;
    case 'student':
			
			var name = req.body.name;
			var school = req.body.school;
			var student_id = req.body.student_id;
			
			Student.findOne({name: name, school: school, student_id: student_id}, function(err, student){
				if(err) return res.status(500).send(err);
  			if(!student) return res.status(404).send({result: "fail",user:{}});
				res.send({result: "success",type:"student",user:student});
			});
    	break;
    default:
			res.status(400).send({result:'fail',user:{}});
	}
});

module.exports = router;
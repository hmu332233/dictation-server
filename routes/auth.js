const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

/*
학생 또는 선생님 로그인

type = 선생님
@params = {login_id, password}

type = 학생
@params = {school, grade, class, student_id, name}
*/
router.post('/auth/login', function (req, res){
	
	var type = req.body.type;
  delete req.body.type;
	
	switch(type) {
    case 'teacher':
			Teacher.findOne(req.body, function (err, teacher){
				if(err) return res.status(500).send(err);
				if(!teacher) return res.status(404).send({});
				
				res.send(teacher);
			});
      break;
    case 'student':  
			Student.findOne(req.body, function(err, student){
				if(err) {
        	return res.status(500).send(err);
        }
  			if(!student) {
        	return res.status(404).send({});
        }
				res.send(student);
			});
    	break;
    default:
			res.status(400).send({});
	}
});

module.exports = router;
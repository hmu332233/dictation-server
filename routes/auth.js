const express = require('express');
const router = express.Router();

var Teacher = require("../models/teacher");
var Student = require("../models/student");

router.post('/auth/login', function (req, res){
	
	var email = req.body.email;
	var pw = req.body.password;
	var type = req.body.type;
	
	// console.log(email);
	// console.log(pw);
	// console.log(type);
	
	switch(type) {
    case 'teacher':
			Teacher.findOne({email: email}, function (err, teacher){
				if (err) return res.status(500).send(err);
				if(teacher){
					if(teacher.password === pw)
						res.send({result: "success",user:{type:"teacher","_id":teacher.id}});
					else
						res.send({result: "fail",user:{}});
				} else {
					res.send({result: "fail",user:{}});
				}
			});
      break;
    case 'student':
			res.send({result: "fail",user:{}});
    	break;
    default:
			res.send({result:'fail',user:{}});
	}
});

module.exports = router;
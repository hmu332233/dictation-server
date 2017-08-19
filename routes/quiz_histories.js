const express = require('express');
const router = express.Router();

var QuizHistory = require("../models/quiz_history");
var Teacher = require("../models/teacher");

//index
router.get('/teachers/:teacher_id/quiz_histories', function (req, res){
  
	var teacher_id = req.params.teacher_id;
	
	Teacher.findById(teacher_id, function (err, teacher){
		if(err) return res.status(500).send(err);
		res.send(teacher.quiz_histories);
	});
});

//index
router.get('/quiz_histories/:id', function (req, res){
  
	var id = req.params.id;
	
	QuizHistory.findById(id, function (err, quizHistory){
		if(err) return res.status(500).send(err);
		res.send(quizHistory);
	});
});

module.exports = router;
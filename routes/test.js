const express = require('express');
const router = express.Router();

var async = require('async');
var QuizHistory = require("../models/quiz_history");
var Teacher = require("../models/teacher");
var Student = require("../models/student");

//index
router.post('/quiz/start', function (req, res){
  
	var teacher_id = req.body.teacher_id;
	
	var tasks = [
		function(callback){
			QuizHistory.create(req.body, function (err, quizHistory){
				if(err) callback(err, 0);
				callback(null, quizHistory);
			});
		},
		function(data, callback){
			Teacher.findById(teacher_id, function (err, teacher){
				if(err) callback(err, 0);
				teacher.quiz_histories.push(data._id);
				teacher.save();
				callback(null, data._id);
			});
		}
	];
	
	async.waterfall(tasks, function (err, results){

		if(err) return res.status(500).send(err);
		res.send({quiz_history_id: results});
	});
});


router.post('/quiz/end', function (req, res){
  
	var student_id = req.body.student_id;
	var quiz_history_id = req.body.quiz_history_id;
	var quiz_result = req.body.quiz_result;
	
	Student.findById(student_id, function (err, student){
		if(err) return res.status(500).send(err);
		console.log(student);
		student.quiz_results.push(quiz_result);
		student.save();
	});
	
	QuizHistory.findById(quiz_history_id, function (err, quizHistory){
		if(err) return res.status(500).send(err);
		quizHistory.quiz_results.push(quiz_result);
		quizHistory.save();
		res.send(quizHistory);
	});
});

module.exports = router;
const express = require('express');
const router = express.Router();

var async = require('async');
var QuizHistory = require("../models/quiz_history");
var QuizResult = require("../models/quiz_result");
var Teacher = require("../models/teacher");
var Student = require("../models/student");

//index
router.post('/quiz/start', function (req, res){
  
	var teacher_id = req.body.teacher_id;

  Teacher.findById(teacher_id)
  	.then(function (teacher) {
    	if(!teacher) throw new Error('not found');
    	var quizHistory = new QuizHistory(req.body);
    	quizHistory.save();
    	teacher.quiz_histories.push(quizHistory._id);
			teacher.save();
    	return quizHistory;
  	})
  	.then(function (quizHistory) {
    	res.send({quiz_history_id: quizHistory._id});
  	})
  	.catch(function (err) {
    	if(err.message === 'not found') return res.status(404).send({});
    	res.status(500).send(err);
  	});
});


router.post('/quiz/end', function (req, res){
	
	var data = req.body;
	var student_id = data.student_id;
	var quiz_history_id = data.quiz_history_id;
	var quiz_result = new QuizResult(data.quiz_result);
  
  Student.findById(student_id)
  	.then(function (student) {
    	if(!student) throw new Error('not found');
    	student.quiz_results.push(quiz_result);
			student.save();
  	})
  	.then(function () {
    	return QuizHistory.findById(quiz_history_id);
  	})
  	.then(function (quizHistory) {
    	if(!quizHistory) throw new Error('not found');
    	quizHistory.quiz_results.push(quiz_result);
			quizHistory.save();
    	return quizHistory;
  	})
  	.then(function (quizHistory) {
    	res.send(quizHistory);
  	})
  	.catch(function (err) {
    	if(err.message === 'not found') return res.status(404).send({});
    	res.status(500).send(err);
  	});
});

module.exports = router;
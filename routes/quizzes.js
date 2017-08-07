const express = require('express');
const router = express.Router();

var Quiz = require("../models/quiz");
var Question = require("../models/question");


//index
router.get('/quizzes', function (req, res){
	Quiz.find({}, function (err, quizzes){
		if(err) return res.status(500).send(err);
		res.send(quizzes);
	});
});

//show
router.get('/quizzes/:id', function (req, res){
	var id = req.params.id;
	
	Quiz.findOne({quiz_number: id}, function (err, quiz){
		if(err) return res.status(500).send(err);
		res.send(quiz);
	});
});

//create
router.post('/quizzes', function (req, res){
	/*
	quiz_number
	questions : [
	  {
		  question_number,
		  answer
		},
		{
		  question_number,
		  answer
		}
	]
	*/
	Quiz.create(req.body, function (err, quiz){
		if(err) return res.status(500).send(err);
		res.send(quiz);
	});
	
	console.log(req.body);
});

//update
router.put('/quizzes/:id', function (req, res){
	var id = req.params.id;
	
	Quiz.findOneAndUpdate({quiz_number: id}, req.body, { new: true }, function (err, quiz){
		if(err) return res.status(500).send(err);
		res.send(quiz);
	});
});

//delete
router.delete('/quizzes/:id', function (req, res){
	var id = req.params.id;
	
	Quiz.remove({quiz_number: id}, function (err){
		if(err) return res.status(500).send(err);
		res.send({result:'success'});
	});
});

module.exports = router;
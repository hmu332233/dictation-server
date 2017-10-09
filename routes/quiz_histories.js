const express = require('express');
const router = express.Router();

var QuizHistory = require("../models/quiz_history");
var Teacher = require("../models/teacher");

//index
router.get('/teachers/:teacher_id/quiz_histories', function (req, res){
  
	var teacher_id = req.params.teacher_id;
	
	Teacher.findById(teacher_id, function (err, teacher){
		if(err) return res.status(500).send(err);
		QuizHistory.find({_id: { $in : teacher.quiz_histories }},{_id:1, quiz_number:1, date:1} , function(err, quizHistories){
			if(err) return res.status(500).send(err);
			res.send(quizHistories);
		});
	});
});

//index
router.get('/quiz_histories/:id', function (req, res){
  
	var id = req.params.id;

	QuizHistory.findById(id, function (err, quizHistory){
		if(err) return res.status(500).send(err);
    quizHistory.update_average_and_rectify_count_and_lank(function (err, quizHistory) {
      return res.send(quizHistory);
    });
	});
});

module.exports = router;
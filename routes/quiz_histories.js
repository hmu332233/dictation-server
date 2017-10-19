const express = require('express');
const router = express.Router();

var QuizHistory = require("../models/quiz_history");
var Teacher = require("../models/teacher");

//index
router.get('/teachers/:teacher_id/quiz_histories', function (req, res){
  
	var teacher_id = req.params.teacher_id;
  const results = [];
	
	Teacher.findById(teacher_id, function (err, teacher){
		if(err) {
			console.log(err);
			return res.status(500).send(err);
    }
    if(!teacher) return res.status(404).send({});
		QuizHistory.find({_id: { $in : teacher.quiz_histories }}, function(err, quizHistories){
			if(err) {
				console.log(err);
				return res.status(500).send(err);
      }
      if(quizHistories.length === 0) return res.status(404).send({});
      quizHistories.forEach(function (quizHistory) {
        quizHistory.update_average_and_rectify_count_and_lank();
        results.push(quizHistory);
      });
			res.send(results);
		});
	});
});

//index
router.get('/quiz_histories/:id', function (req, res){
  
	var id = req.params.id;

	QuizHistory.findById(id, function (err, quizHistory){
		if(err) return res.status(500).send(err);
		if(!quizHistory) return res.status(404).send({});
		quizHistory.update_average_and_rectify_count_and_lank();
		return res.send(quizHistory);
	});
});

//전체회차에 대한 rectify_count의 합산
router.get('/teachers/:teacher_id/quiz_histories/rectify_count', function (req, res){	
	let teacher_id = req.params.teacher_id;
	let rectify_count = {};
  
	Teacher.findById(teacher_id, function (err, teacher){
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		QuizHistory.find({_id: { $in : teacher.quiz_histories }}, function(err, quizHistories){
			if(err) {
				console.log(err);
				return res.status(500).send(err); 
			}
			quizHistories.forEach(function (quizHistory) {
				const quiz_history_with_rectify_count = quizHistory.get_quiz_history_with_rectify_count();
				for(let i = 1 ; i <= 10 ; i++) {
					if(!rectify_count[`property${i}`]) {
						rectify_count[`property${i}`] = 0;
					} 
					rectify_count[`property${i}`] += quiz_history_with_rectify_count.rectify_count[`property${i}`];
				}
			});
			return res.send(rectify_count);
		});
	});
});

//시험을 보는 학생들의 수를 set
router.post('/quiz_histories/:id/number', function (req, res){
  
	var id = req.params.id;
	var number = req.body.num;

	QuizHistory.findById(id, function (err, quizHistory){
		if(err) return res.status(500).send(err);
		if(!quizHistory) return res.status(404).send({});
		quizHistory.number = number;
		quizHistory.save();
		return res.send({result:true});
	});
});

module.exports = router;
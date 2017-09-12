const mongoose   = require("mongoose");

var async = require('async');
var Teacher = require("../models/teacher");
var Student = require("../models/student");
var Quiz = require("../models/quiz");
var QuizHistory = require("../models/quiz_history");

/* 데이터 베이스 서버 연결 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
	
	var teacher = {
		_id: "599b03151c6e6f0159a72815",
		login_id: "test@test.com",
		password: "123",
		school: "한국초등학교",
		grade: "1",
		"class": "3",
		name: "한의현"
	};
	
	var student1 = {
		_id: "599b4041cefd5d07c5be9594",
		school: "한국초등학교",
		grade: "1",
		class: "2",
		student_id: 1,
		name: "반도범"
	};
	
	var student2 = {
		_id: "599c75f7836cc308789f5902",
		school: "한국초등학교",
		grade: "1",
		class: "2",
		student_id: 2,
		name: "한민웅"
	};
	
	var quiz = {
		"number": 9,
		"name": "1학년 1학기 9급",
		"questions": [
			{
				"number": 1,
				"sentence": "세수를 합니다."
			},
			{
				"number": 2,
				"sentence": "잠을 잡니다."
			},
			{
				"number": 3,
				"sentence": "책을 읽습니다."
			},
			{
				"number": 4,
				"sentence": "꼬리를 흔듭니다."
			},
			{
				"number": 5,
				"sentence": "시소 미끄럼틀"
			},
			{
				"number": 6,
				"sentence": "놀이터에서 놀아요."
			},
			{
				"number": 7,
				"sentence": "그네를 타요."
			},
			{
				"number": 8,
				"sentence": "콩쥐가 울고"
			},
			{
				"number": 9,
				"sentence": "항아리가 깨졌습니다."
			},
			{
				"number": 10,
				"sentence": "다람쥐가 도와줍니다."
			}
		]
	};
	
	var quiz_history = {
		"teacher_id": "599b03151c6e6f0159a72815",
		"quiz_number": 1,
		"_id": "599c85332a7fdd0961a8c712"
	};
	
	var tasks2 = [
		function(callback){
			QuizHistory.create(quiz_history, function (err, quizHistory){
				if(err) callback(err, 0);
				console.log('quiz history save');
				callback(null, quizHistory);
			});
		},
		function(data, callback){
			Teacher.findById(teacher._id, function (err, teacher){
				if(err) callback(err, 0);
				if(!teacher) console.log('not find teacher');
				teacher.quiz_histories.push(data._id);
				teacher.save();
				console.log('teacher add quiz history');
				callback(null, data._id);
			});
		}
	];
	
	var tasks = [
		function (callback) {
			Teacher.remove({}, function (err){
				Student.remove({}, function (err){
					Quiz.remove({}, function (err){
						QuizHistory.remove({}, function (err){
							console.log('remove all success');
							callback(null,0);
						});
					});
				});
			});
		},
		function (data, callback){
			Teacher.create(teacher, function (err, teacher){
				if(err) return console.log(err);
				console.log('teacher save');
				callback(null,teacher);
			});
		},
		function (teacher, callback){
			Student.create(student2, function (err, student){
				console.log('student2 save');
				teacher.students.push(student._id);
				teacher.save();
				callback(null,teacher);
			});
		},
		function (teacher, callback){
			Student.create(student1, function (err, student){
				if(err) return console.log(err);
				console.log('student1 save');
				teacher.students.push(student._id);
				teacher.save();
				callback(null,teacher);
			});
		},
		function (teacher, callback){
			Quiz.create(quiz, function (err, quiz){
				if(err) return console.log(err);
				console.log('quiz save');
				callback(null,teacher);
			});	
		},
		function (data, callback){
			async.waterfall(tasks2, function (err, results){
				if(err) return res.status(500).send(err);
				console.log('quiz history save');
				callback(null,0);
			});
		}
	];
	
	
	async.waterfall(tasks, function (err, results){
		if(err) return res.status(500).send(err);
		console.log('seed complete');
	});
});
mongoose.connect('mongodb://localhost:27017/dictationdb');





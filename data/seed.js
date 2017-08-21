const mongoose   = require("mongoose");

var Teacher = require("../models/teacher");
var Student = require("../models/student");
var Quiz = require("../models/quiz");


/* 데이터 베이스 서버 연결 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
	
	var teacher = {
		_id: "599b03151c6e6f0159a72815",
		email: "test@test.com",
		school: "한국초등학교",
		name: "한의현"
	};
	
	var student1 = {
		school: "한국초등학교",
		level: "1",
		class_name: "2",
		student_id: 1,
		name: "반도범",
	};
	
	var student2 = {
		
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
	
	Teacher.create(teacher, function (err, teacher){
		if(err) return console.log(err);
		console.log(teacher);
		
 		Student.create(student1, function (err, student){
			if(err) return console.log(err);
			console.log(student);
			teacher.students.push(student._id);
			teacher.save();
			Quiz.create(quiz, function (err, quiz){
			if(err) return console.log(err);
				console.log(quiz);
				db.close();
			});
		});
		
		
	});
	
});
mongoose.connect('mongodb://localhost:27017/dictationdb');





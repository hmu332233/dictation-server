const mongoose   = require("mongoose");

var Teacher = require("../models/teacher");
var Student = require("../models/student");


/* 데이터 베이스 서버 연결 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
	
	var teacher = {
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
	
	Teacher.create(teacher, function (err, teacher){
		if(err) return console.log(err);
		console.log(teacher);
		
 		Student.create(student1, function (err, student){
			if(err) return console.log(err);
			console.log(student);
			teacher.students.push(student._id);
			teacher.save();
			db.close();
		});
	});
	
});
mongoose.connect('mongodb://localhost:27017/dictationdb');





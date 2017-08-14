var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var studentSchema = new Schema({
    //id는 기본으로 생성됨
		school: String,
		class_name: String,
	  student_id: Number,
    name: String,
		grades: Array
});

module.exports = mongoose.model("Student", studentSchema);
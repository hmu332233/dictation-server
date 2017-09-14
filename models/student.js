var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var studentSchema = new Schema({
    //id는 기본으로 생성됨
		school: String,
		grade: String,
		class: String,
		student_id: Number,
		name: String,
		quiz_results: Array
});

/* 중복체크 함수 */
studentSchema.statics.checkForDuplicate = function (data, callback) {
  this.findOne({school: data.school, grade: data.grade, class: data.class, student_id: data.student_id}, function (err, student){
		if(err) callback(err, null);
		
		if(!student) callback(null, false);
		else callback(null, true);
	});
};

module.exports = mongoose.model("Student", studentSchema);
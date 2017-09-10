var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var teacherSchema = new Schema({
    //id는 기본으로 생성됨
		email: String,
		password: String,
		school: String,
		class_name: String,
    name: String,
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    quiz_histories: Array
});

module.exports = mongoose.model("Teacher", teacherSchema);
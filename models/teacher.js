var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var teacherSchema = new Schema({
    //id는 기본으로 생성됨
		email: String,
		password: String,
		school: String,
		class: String,
    name: String,
		students: Array
});

module.exports = mongoose.model("Teacher", teacherSchema);
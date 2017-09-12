var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var teacherSchema = new Schema({
    //id는 기본으로 생성됨
		login_id: String,
		password: String,
		school: String,
		grade: String,
		class: String,
    name: String,
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    quiz_histories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizHistory' }]
});

module.exports = mongoose.model("Teacher", teacherSchema);
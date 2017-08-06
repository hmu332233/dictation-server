var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizSchema = new Schema({
    //id는 기본으로 생성됨
		quiz_number: { type: Number, unique: true},
		questions: Array
});

module.exports = mongoose.model("Quiz", studentSchema);
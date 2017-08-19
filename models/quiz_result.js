var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizResultSchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: Date, default: Date.now },
		quiz_number: Number, //quiz 외래키
		student_name: String,
		score: Number,
		question_results: Array
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
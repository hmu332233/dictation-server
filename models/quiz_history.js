var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizHistorySchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: Date, default: Date.now },
		quiz_number: Number, //quiz 외래키
		quiz_results: Array
});

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
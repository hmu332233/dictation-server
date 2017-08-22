require('../util/date');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizHistorySchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: String, default: new Date().format("MM월 dd일 a/p hh시 mm분")},
		quiz_number: Number, //quiz 외래키
		quiz_results: Array
});

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
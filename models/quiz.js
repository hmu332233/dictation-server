var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizSchema = new Schema({
    //id는 기본으로 생성됨
		number: { type: Number, unique: true},
		name: String,
		questions: Array
});

module.exports = mongoose.model("Quiz", quizSchema);
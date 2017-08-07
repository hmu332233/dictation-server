var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var gradeSchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: Date, default: Date.now },
		quiz_number: Number, //quiz 외래키
		score: Number,
		detail: Array
});

module.exports = mongoose.model("Grade", gradeSchema);
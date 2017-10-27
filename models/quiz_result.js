require('../util/date');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizResultSchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: String, default: new Date().format("MM월 dd일 a/p hh시 mm분")},
		quiz: Object,
		student_name: String,
		score: Number,
		question_results: Array,
  	rank: { type: Number },
  	rectify_count: {
      property1: { type: Number, default: 0 },
      property2: { type: Number, default: 0 },
      property3: { type: Number, default: 0 },
      property4: { type: Number, default: 0 },
      property5: { type: Number, default: 0 },
      property6: { type: Number, default: 0 },
      property7: { type: Number, default: 0 },
      property8: { type: Number, default: 0 },
      property9: { type: Number, default: 0 },
      property10: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
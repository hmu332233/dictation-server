require('../util/date');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var quizHistorySchema = new Schema({
    //id는 기본으로 생성됨
		date: { type: String, default: new Date().format("MM월 dd일 a/p hh시 mm분")},
		quiz_number: Number, //quiz 외래키
		quiz_results: Array,
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

/*
 ### function get_average (id, callback)
 #### @id {ObjectId} quiz_history의 id
 #### @callback {function(err, average)} 완료시 응답한다.
 
 quiz_history의 quiz_result들의 score의 평균을 구해준다 
*/
quizHistorySchema.statics.get_average = function (id, callback) {
  this.findById(id, function (err, quiz_history) {
    if(err) {
      return callback(err);
    }
    
    let sum = 0;
    const quiz_results = quiz_history.quiz_results;
    
    for(var i = 0 ; i < quiz_results.length ; i++) {
    	const quiz_result = quiz_results[i];
			sum += quiz_result.score;
    }
    
    let average = sum/quiz_results.length;
    return callback(null,average);
	});
};

/*
 ### function get_quiz_history_with_lank (id, callback)
 #### @id {ObjectId} quiz_history의 id
 #### @callback {function(err, quiz_history)} 완료시 응답한다.
 
 quiz_history에서 quiz_result들에 lank를 계산하고 추가한다.
*/
quizHistorySchema.statics.get_quiz_history_with_lank = function (id, callback) {
  this.findById(id, function (err, quiz_history) {
    if(err) {
      return callback(null);
    }
    
    quiz_history.quiz_results.sort(function(a, b) {
        return b.score - a.score;
    });
    
    const quiz_results = quiz_history.quiz_results;
    for(var i = 0 ; i < quiz_results.length ; i++) {
      let quiz_result = quiz_results[i];
      quiz_result.lank = i+1;
    }
    
    quiz_history.quiz_results = quiz_results;
    return callback(null, quiz_history);
  });
};

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
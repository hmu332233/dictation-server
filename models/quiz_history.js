require('../util/date');

var async = require('async');
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
 #### @callback {function(err, average)} 완료시 응답한다.
 
 quiz_history의 quiz_result들의 score의 평균을 구해준다 
*/
quizHistorySchema.methods.get_average = function (callback) {
  
  const quiz_history = this;
    
  let sum = 0;
  const quiz_results = quiz_history.quiz_results;
    
  for(var i = 0 ; i < quiz_results.length ; i++) {
  	const quiz_result = quiz_results[i];
		sum += quiz_result.score;
  }
    
  let average = sum/quiz_results.length;
  return callback(null,average);
};

/*
 ### function get_quiz_history_with_lank (callback)
 #### @callback {function(err, quiz_history)} 완료시 응답한다.
 
 quiz_history에서 quiz_result들에 lank를 계산하고 추가한다.
*/
quizHistorySchema.methods.get_quiz_history_with_lank = function (callback) {
  
  const quiz_history = this;

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
};

/*
 ### function get_quiz_history_with_rectify_count (callback)
 #### @callback {function(err, quiz_history)} 완료시 응답한다.
 
 quiz_result.rectify_count들을 모두 합산하여 quiz_history.rectify_count를 갱신한다.
*/
quizHistorySchema.methods.get_quiz_history_with_rectify_count = function (callback) {

  const quiz_history = this;

  const quiz_results = quiz_history.quiz_results;
 	quiz_results.forEach(function (quiz_result) {
    for(let i = 1 ; i <= 10 ; i++) {
    	quiz_history.rectify_count[`property${i}`] += quiz_result.rectify_count[`property${i}`];
    }
  });
		
  return callback(null, quiz_history);
};

/*
 ## function update_average_and_rectify_count_and_lank (callback)
 ### @callback {function (err, quiz_histories)}
 
 quiz_history에 평균, rectify_count, lank를 업데이트 시켜 돌려준다.
*/
quizHistorySchema.methods.update_average_and_rectify_count_and_lank = function (callback) {
  
  let self = this;
  
  var tasks = [
		function (callback) {    
      self.get_quiz_history_with_lank(function (err, quiz_history) {
        if(err) callback(err);
        callback(null, quiz_history);
      });
		},
		function (callback) {
			self.get_quiz_history_with_rectify_count(function (err, quiz_history) {
        if(err) callback(err);
        callback(null, quiz_history);
      });
		},
    function (callback) {
      self.get_average(function (err, average) {
        if(err) callback(err);
        callback(null, average);
      });
    }
	];
  
  async.parallel(tasks, function (err, results){
		if(err) {
      return callback(err);
    }
    const quiz_history_with_lank = results[0];
    const quiz_history_with_rectify_count = results[1];
    const average = results[2];
    
    self.quiz_results = quiz_history_with_lank.quiz_results;
    self.rectify_count = quiz_history_with_rectify_count.rectify_count;
    self.average = average;
    
    return callback(null, self);
	});
  
};

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
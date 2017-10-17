var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var studentSchema = new Schema({
    //id는 기본으로 생성됨
		school: String,
		grade: String,
		class: String,
		student_id: Number,
		name: String,
		quiz_results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizResult' }],
  	teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
});

/* 중복체크 함수 */
studentSchema.statics.checkForDuplicate = function (query, callback) {
  this.findOne(query, function (err, student){
		if(err) callback(err, null);
		if(!student) callback(null, false);
		else callback(null, true);
	});
};

studentSchema.pre('find', function(next) {
  console.log("Pre Find");
  this.populate('quiz_results');
  next();
});

studentSchema.pre('findOne', function(next) {
  console.log("Pre Find One");
  this.populate('quiz_results');
  next();
});

module.exports = mongoose.model("Student", studentSchema);
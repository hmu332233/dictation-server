var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var teacherSchema = new Schema({
    //id는 기본으로 생성됨
		login_id: { type : String , unique : true },
		password: String,
		school: String,
		grade: String,
		class: String,
    name: String,
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    quiz_histories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizHistory' }]
});

/* 중복체크 함수 */
teacherSchema.statics.checkForDuplicate = function (_login_id, callback) {
  this.findOne({login_id:_login_id}, function (err, teacher){
		if(err) callback(err, null);
		if(!teacher) callback(null, false);
		else callback(null, true);
	});
};


module.exports = mongoose.model("Teacher", teacherSchema);
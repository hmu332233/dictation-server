var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/* 스키마 정의 */
var quizSchema = new Schema({
    //id는 기본으로 생성됨
		number: { type: Number, unique: true},
		name: String,
		questions: Array
});

//number에 대해 auto increment를 적용한다.
quizSchema.plugin(autoIncrement.plugin, {
	model: 'Quiz',
	field: 'number',
	startAt: 1,
	incrementBy: 1
});

module.exports = mongoose.model("Quiz", quizSchema);
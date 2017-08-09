var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/* 스키마 정의 */
var schoolSchema = new Schema({
  //id는 기본으로 생성됨
	region1: String,
	region2: String,
	name: String,
	address: String
});

module.exports = mongoose.model("School", schoolSchema);
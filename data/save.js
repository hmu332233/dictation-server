const fs = require('fs');
var School = require("../models/school");
const mongoose   = require("mongoose");

/* 데이터 베이스 서버 연결 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
	
	fs.readFile('school_data.txt','utf8', function(err, data){
		var schools = JSON.parse(data);
		for(var i in schools){
			var school = schools[i];
			School.create(school, function(err, sc){
				console.log(sc);
				db.close();
			});
		}
	});
});
mongoose.connect('mongodb://localhost:27017/dictationdb');





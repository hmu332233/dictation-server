const fs = require('fs');
var School = require("../models/school");
const mongoose   = require("mongoose");

/* 데이터 베이스 서버 연결 */
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");

	fs.readFile('./data/school_data.txt','utf8', function(err, data){
		var schools = JSON.parse(data);
    
    School.remove({}).then(function (){
      console.log('schools data remove all');
      for(var i in schools){
        var school = schools[i];
        School.create(school, function(err, sc){
          console.log(sc);
          db.close();
        });
      }
      console.log('schools data create complete');
    });
		
	});
});
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/dictationdb');





const fs = require('fs');
var School = require("../models/school");
var Quiz = require("../models/quiz");
const mongoose   = require("mongoose");

/* 데이터 베이스 서버 연결 */
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");

	fs.readFile('./data/quiz_data.json','utf8', function(err, data){
    var result = '';
		var schools = JSON.parse(data);
    console.log(schools);
    
    Quiz.remove({}).then(function (){
      console.log('schools data remove all');
      schools.forEach(function (school) {
        let data = new Quiz(school);
        data.save();
        console.log(data._id);
        
        result += `${data._id},`;
        // Quiz.create(school, function(err, sc){
        //   console.log(sc); 
        // });
      });
      
      fs.writeFileSync('result.txt', result, 'utf8');
    });
		
	});
});
mongoose.connect(process.env.DB_URL || 'mongodb://dictation:dictation@ds119585.mlab.com:19585/dictation-op');





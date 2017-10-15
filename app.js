const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose   = require("mongoose");
const logger = require('morgan');

/*개발용 log*/
app.use(logger('dev'));
/*bodyParser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* 데이터 베이스 서버 연결 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});
mongoose.connect( process.env.DB_URL || 'mongodb://localhost:27017/dictationdb');
mongoose.Promise = global.Promise;

/*route*/
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/teachers'));
app.use('/', require('./routes/students'));
app.use('/', require('./routes/quizzes'));
app.use('/', require('./routes/schools'));
app.use('/', require('./routes/quiz_histories'));
app.use('/', require('./routes/test'));
app.use('/', require('./routes/matching'));

app.listen(process.env.PORT || 3000, function (){
   console.log('server start!'); 
});
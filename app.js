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
mongoose.connect('mongodb://localhost:27017/dictationdb');


/*route*/
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/teachers'));
app.use('/', require('./routes/students'));



app.listen(3000, function (){
   console.log('server start!'); 
});
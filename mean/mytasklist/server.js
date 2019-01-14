// 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

//
var port = 3001;

var app = express();

// enable cors
app.use(cors());

// view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port, function() {
   console.log('server is staring...on port: ', port);
});

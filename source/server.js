var express = require('express'),
  http = require('http'),
  path = require('path'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 3000;


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "themy.trinh@gmail.com",
    pass: "vbjcjxpfjiqcdbth"
  }
});

// Message object
var mailOptions = {
  from: 'themy.trinh@gmail.com', // sender address
  to: 'themy.trinh@gmail.com', // list of receivers
  cc: 'truongthinnguyen@gmail.com',
  subject: '{0} sent you a message - www.trinhthemy.com', // Subject line
  text: 'Hello world ✔', // plaintext body
  html: '<b>Hello world ✔</b>' // html body
};

app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/contact', function(req, res){
  var obj = { error: false };

  if(!req.body.yourname || !req.body.yourmail || !req.body.yourmsg) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify(obj);
    res.end(json);
  }
  else {
    mailOptions.subject = req.body.yourname + ' sent you a message - www.trinhthemy.com';
    mailOptions.html = '<p>Name: ' + req.body.yourname + '</p>' +
                       '<p>Email: ' + req.body.yourmail + '</p>' +
                       '<p>Message: </p>' +
                       '<p>' + req.body.yourmsg.replace(/\n/gi, '<br />') + '</p>';

    transporter.sendMail(mailOptions, function(error, info) {
      res.writeHead(200, {"Content-Type": "application/json"});

      if(error){
        obj.error = true;
      }

      var json = JSON.stringify(obj);
      res.end(json);
    });
  }
});

http.createServer(app).listen(port);
console.log('Frontend template is running on port ' + port);

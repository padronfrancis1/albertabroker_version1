var express = require('express');
var router = express.Router();

var path = require('path');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var twilio = require('twilio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Motorious Home' });
});

router.get('/homepage', function(req, res, next) {
  res.render('index', { title: 'Motorious Home' });
});

router.get('/lifeinsurance', function(req, res, next) {
  res.render('LifeInsurance', { title: 'Life Insurance' });
});

router.get('/healthinsurance', function(req, res, next) {
  res.render('HealthInsurance', { title: 'Health Insurance' });
});

router.get('/travelinsurance', function(req, res, next) {
  res.render('TravelInsurance', { title: 'Travel Insurance' });
});

router.get('/homeauto', function(req, res, next) {
  res.render('HomeAutoInsurance', { title: 'Home and Auto Insurance' });
});

router.post('/contactus', function(req, res) {

  var mailOpts, smtpTrans;


  smtpTrans = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          XOAuth2: {
            user: "padronfrancis1@gmail.com", // Your gmail address.
            // Not @developer.gserviceaccount.com
            clientId: "1031556748357-82fcmdjqjfm4v2gbtfulajo05rlasvt3.apps.googleusercontent.com",
            clientSecret: "8ALjIsFWCJ1xjh-iHr0xUCkf",
            refreshToken: "1/mcE_MwkETrMaRs2n0Zp5flyUP4DE3YgioriSD63120U"
          }
        }
      });

  
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt',
    to: 'francisjohnpadron@yahoo.com ,myalbertabroker@gmail.com',
    // to: 'francisjohnpadron@yahoo.com',
    subject: 'Message from the Client - ' + req.body.name,
    
    text: 'name : ' + '   ' + req.body.name + '   ' +   'Message : ' + '   ' + req.body.message + '   ' +  'email address : ' + req.body.email + '   ' +  'phone: ' + req.body.phone
  };

  smtpTrans.sendMail(mailOpts, function(error, info){
    
    if(error) {

     
     
	 res.render('index', { title: 'Motorious Home' });
    }
    else {

      res.render('index', { title: 'Motorious Home' });
    }
  });

});


router.post('/sms', function(req, res) {


// Find your account sid and auth token in your Twilio account Console.
var client = twilio('ACaed4ee145e5c490b8c8123895247f81f', 'c08c046c1feebad4d0531054e17442e1');

  // Send the text message.
  var x = client.sendMessage({
    // to: '4039185507',
    to: '+14039185507',
    from: '+15873338675',
    body: 'Hello from Client!'
  
  });

  if(x) {
    res.render('index', { title: 'Motorious Home' });
  }
    else{
      res.render('index', { title: 'Motorious Home' });
    }
  
});

module.exports = router;
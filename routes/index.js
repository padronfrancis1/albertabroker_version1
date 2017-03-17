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

router.get('/quote', function(req, res, next) {
  res.render('quote', { title: 'Home and Auto Insurance' });
});

router.get('/messageSent', function(req, res, next) {
  res.render('MessageSent', { title: 'Home and Auto Insurance' });
});

router.get('/messageFailed', function(req, res, next) {
  res.render('MessageFailed', { title: 'Home and Auto Insurance' });
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
    
    text: 'name : ' + '   ' + req.body.name + '   ' +   'Insurance Type : ' + '   ' + req.body.type + '   ' +  'email address : ' + req.body.email + '   '  +  'Message: ' + req.body.message
  };

  smtpTrans.sendMail(mailOpts, function(error, info){
    
    if(error) {

	   res.render('MessageFailed', { title: 'Message Failed' });
    }
    else {

      res.render('MessageSent', { title: 'Message Sent!' });
    }

  });

});


router.post('/sms', function(req, res) {


// Find your account sid and auth token in your Twilio account Console.
  var client = twilio('ACaed4ee145e5c490b8c8123895247f81f', 'c08c046c1feebad4d0531054e17442e1');
//  var client = twilio('AC3d81b62658b6dccce7d664f46af118e0', 'ce443214bfe92664c2c6d7a66ca5fccd');

  // Send the text message.
  var x = client.sendMessage({
    
    to: '+14039185507',
    from: '+15873338675',

    
    // to: '+14037141510',
    // from: '+15873179970',

    body: 'Client Name :' + req.body.name + '\nInsurance type :' + req.body.type + '\nClient Phone :' + req.body.phone + '\nClient email :' + req.body.email +  '\nMessage: ' + req.body.message
  
  });

  if(x) {
    
    res.render('MessageSent', { title: 'Message Sent!' });
    
  }
  else{
    res.render('MessageFailed', { title: 'Message Failed' });
  }
  
});

module.exports = router;
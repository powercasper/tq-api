var HTMLBuilder = require('./html_builder');
var config = require('config');

module.exports = {
  mailResults: mailResults
};

function mailResults(results) {
  var api_key = config.mailApiKey;
  var domain = config.mailDomain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  var html = HTMLBuilder.buildHTML(results);

  var emails = [
    's.m.diachenko@gmail.com.com'
  ];

  var data = {
    from: 'TQ: Do Not Reply <tq@mail.tq.com>',
    to: emails,
    html: html
  };
  
  if (process.env.SEND_MAIL_ON_FAILURES === 'true') {
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });  
  }
}
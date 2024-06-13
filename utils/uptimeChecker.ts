const HTML_TEMPLATE = require('../config/mailTemplate');
const SENDMAIL = require('../config/mail');

let uptime = 0;

function increaseUptime() {
  //uptime++;
  if (uptime != 0 && uptime % 10 == 0) {
    console.log('10seconds without request from plugin');
  }
  checkIfDown();
  setTimeout(increaseUptime, 1000);
}
increaseUptime();

function checkIfDown() {
  if (uptime == 60) {
    console.log('Problem with the plugin !!!!');
    const message = `Hi ! It looks like the plugin isn't sending request anymore ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: 'Framework. <frame-work@gmail.com>', // sender address
      to: 'damien.audrezet@icloud.com', // receiver email
      subject: 'Problem with plugin 1minutes down', // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log('Email sent successfully');
      console.log('MESSAGE ID: ', info.messageId);
    });
  }
  if (uptime == 600) {
    console.log('Problem with the plugin !!!!');
    const message = `Hi ! It looks like the plugin isn't sending request anymore it's been 10 minutes ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: 'Framework. <frame-work@gmail.com>', // sender address
      to: 'damien.audrezet@icloud.com', // receiver email
      subject: 'Problem with plugin 10minutes', // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log('Email sent successfully');
      console.log('MESSAGE ID: ', info.messageId);
    });
  }
  if (uptime == 1800) {
    console.log('Problem with the plugin !!!!');
    const message = `Hi ! It looks like the plugin isn't sending request anymore it's been 30 minutes ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: 'Framework. <frame-work@gmail.com>', // sender address
      to: 'damien.audrezet@icloud.com', // receiver email
      subject: 'Problem with plugin LAST WARNING', // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log('Email sent successfully');
      console.log('MESSAGE ID: ', info.messageId);
    });
  }
}

function sendErrorEmail() {
  const message = `Hi ! It looks like an error occured ! <br /> 
  <br /> 
  
  <br /> `;
  const options = {
    from: 'Framework. <frame-work@gmail.com>', // sender address
    to: 'damien.audrezet@icloud.com', // receiver email
    subject: 'Problem with backend/plugin', // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
  };
  // console.log(options);
  SENDMAIL(options, (info) => {
    console.log('Email sent successfully');
    console.log('MESSAGE ID: ', info.messageId);
  });
}

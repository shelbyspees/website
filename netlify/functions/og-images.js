const chromium = require('chrome-aws-lambda');
const fs = require('fs-extra');
const path = require('path');

console.log('inside index.js!');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
}

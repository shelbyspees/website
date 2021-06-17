const chromium = require('chrome-aws-lambda');
const fs = require('fs-extra');
const path = require('path');

console.log('inside og-images.js!');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
}

console.log("WHOA");

var title = document.getElementById("title");
console.log(title.innerText);

function updateContent(id, value) {
  var element = document.getElementById(id);
  element.innerText = value;
}   
updateContent("title", "Testing");
updateContent("summary", "this is a test");
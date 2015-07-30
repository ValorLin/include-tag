// Use `node demo/build.js` command to run this.
var fs = require('fs');
var includeTag = require('../dist/includeTag');

var html = fs.readFileSync(__dirname + '/index.html').toString();

// Do it!
html = includeTag(__dirname, html);
// Remove includeTag.browser.js reference.
html = html.replace(/<script.*?includeTag.browser.js.*?<\/script>/gi, '');

fs.writeFileSync('demo/build.html', html, {flags: 'w+'});
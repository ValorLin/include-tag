# Include Tag
How to deal with the common header and footer in your batch of html files?
It used to be a question, but use the &lt;include> tag in html file, it wasn't a question anymore.

## How to use
### Develop
Use includeTag.browser.js for develop
```html
<include src="header.html"></include>
<div>Content</div>
<include src="footer.html"></include>
<script type="text/javascript" src="../dist/includeTag.browser.js"></script>
```

### Production
I recommend you use [gulp-include-tag](https://github.com/weilao/gulp-include-tag) to compile your html files.

However, you can write your own build script to do it too.¡ý
```js
var fs = require('fs');
var includeTag = require('../dist/includeTag');

var html = fs.readFileSync(__dirname + '/index.html').toString();

// Do it!
html = includeTag(__dirname, html);
// Remove includeTag.browser.js reference.
html = html.replace(/<script.*?includeTag.browser.js.*?<\/script>/gi, '');

fs.writeFileSync('demo/build.html', html, {flags: 'w+'});
```

Run it, And you would got a compiled html file like this.
#### build.html
```html
<header>
    <ul>
    <li>Home</li>
    <li>Article</li>
    <li>About</li>
</ul>
</header>
<div>Content</div>
<footer>Footer</footer>
```

All done, enjoy it dude.

## Why &lt;include> tag
It is the most natural thing in html file, so, why not?

## License
MIT ? [ÍþÀÏ](http://doctype-html.com)
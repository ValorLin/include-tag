var path = require('path');

module.exports = {
    entry: {
        'includeTag.browser': './src/includeTag.browser.js',
        'includeTag.node': './src/includeTag.node.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    }
};
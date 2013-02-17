ESV API Wrapper
================

An extremely simple API wrapper for the ESV (English Standard Version) Bible API (http://esvapi.org)

There's currently only 1 method implemented because it's the only one I need right now.  I plan on improving it at some point, but it works for now.
- - -

## Example
```js
var = EsvApi = require('esv');

var = esvapi = new EsvApi("IP");

esvapi.passageQuery({passage:"Romans 1-2"}, function(data) {
    res.end(data);
});
```

## Todo
 - Implement other methods in the API 
 - Make the code better
 - Eventually push it up to NPM

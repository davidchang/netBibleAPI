net Bible API Wrapper
================

A wrapper for the net Bible API (https://labs.bible.org/api_web_service)

There's currently only 1 method implemented because it's the only one I need right now.  I plan on improving it at some point, but it works for now.
- - -

## Example
```js
var netBible = require('netBible');

netBible.get("Nahum 1")
    .then(function(data) {
        console.log(data);
    });
```

## Todo
 - Implement other methods in the API
 - Make the code better
 - Improve test cases

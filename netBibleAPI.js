var http = require('http'),
    qs = require('querystring'),
    Q = require('q');

var utils = {
    clean: function(word) {
        var trimmed = word.replace(/^\s+|\s+$/g, '');
        return trimmed.replace(/(^[a-z]|[ .,\(\)\[\]]+[a-z])/g, function(s) {
            return s.toUpperCase();
        });
    },
    getBookName: function(match) {
        var name = match.slice(1, match.length - 1).join(' ');
        name = this.clean(name).toLowerCase();
        return name;
    },

    findScriptureMatch: function(text) {
        var passageRegex = /^([0-9]*)\s*([a-zA-Z]+)\s*([0-9]+).*$/;
        return passageRegex.exec(text);
    }
};

var netBibleApi =  {
    baseUrl: 'http://labs.bible.org/api/?type=json&passage=',

    get: function(passage, callback) {
        var data = '';
        var d = Q.defer();

        http.get(this.baseUrl + passage, function(res) {
            res.setEncoding = 'utf8';
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                var match = utils.findScriptureMatch(passage), success = false;
                if(match) {
                    var jsonData = null;
                    try {
                        jsonData = JSON.parse(data)[0];
                    } catch(err) { console.log(err); }

                    if(jsonData && data && data.length && jsonData.bookname.toLowerCase() == utils.getBookName(match) && jsonData.chapter == match[match.length - 1]) {
                        success = true;
                        d.resolve(JSON.parse(data));
                    }
                }

                if(!success)
                    d.reject("error retrieving " + passage + "... does it exist?");
            });
        })
        .on('error', function(error) {
            d.reject(error);
        });

        return d.promise;
    }
}

module.exports = netBibleApi;

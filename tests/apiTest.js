var vows = require('vows')
    , assert = require('assert')
    , BibleApi = require('../netBible');

function makeCall(text, cb) {
    BibleApi.get(text).then(cb);
}
function makeCallExpectingError(text, cb) {
    BibleApi.get(text).then(null, cb);
}

function assertGoodResponse(data, length) {
    assert.equal(typeof(data), 'object');
    if(length != null)
        assert.equal(data.length, length);
}
function assertBadResponse(error) {
    assert.equal(typeof(error), 'string');
}

vows.describe('api tests').addBatch({
    'when making a call to get an existing chapter': {
        topic: function() {
            makeCall('Nahum 1', this.callback);
        },
        'we should receive no errors and get data back': function(response, nothing) {
            assertGoodResponse(response, 15);
        }
    },
    'when making a call to get an existing verse segment': {
        topic: function() {
            makeCall('Nahum 1:1-5', this.callback);
        },
        'we should receive no errors and get data back': function(response, nothing) {
            assertGoodResponse(response, 5);
        }
    },
    'when making a call to get a nonexistent passage': {
        topic: function() {
            makeCallExpectingError('Nahum 25', this.callback);
        },
        'we should receive an error and no results': function(response, nothing) {
            assertBadResponse(response);
        }
    },
    'when making a call to get just a random string': {
        topic: function() {
            makeCallExpectingError('sdghwefhisdglhdsf', this.callback);
        },
        'we should receive an error and no results': function(response, nothing) {
            assertBadResponse(response);
        }
    }
}).run();

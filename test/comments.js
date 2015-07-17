

var cc = require('..')
var assert = require('assert')


assert.deepEqual(
    {hello: 'world'},
    cc(__dirname + '/comments.json').get('one')
);


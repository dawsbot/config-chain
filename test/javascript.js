var cc = require('..')
var path = require('path')
var test = require('tap').test

var loc = path.join(__dirname, 'fixtures', 'example.js')

test('can load with javascript', function (assert) {
    var opts = cc.javascript(loc)

    assert.equal(opts.config, 'set')
    assert.end()
})

test('can load with cc directly', function (assert) {
    var opts = cc(loc).store

    assert.equal(opts.config, 'set')
    assert.end()
})



var cc =require('..')
var INI = require('ini')
var assert = require('assert')

function test(obj) {

  var _json, _ini
  var json = cc.parse (_json = JSON.stringify(obj))
  var ini = cc.parse (_ini = INI.stringify(obj))

  console.log(_json, _ini)
  assert.deepEqual(json, ini)
}


test({hello: true})


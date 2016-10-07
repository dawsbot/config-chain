var test = require('tap').test
var CC = require('../index.js').ConfigChain

test('test chain extension', function (t) {
  var cc = new CC()

  cc.add({foo: 'foo_noname'})
    .add({foo: 'foo_named', bar: 'bar_named'}, 'named')
    .on('load', function (cc) {

      t.same(cc.get('foo'), 'foo_noname')
      t.same(cc.get('foo', 'named'), 'foo_named')
      t.same(cc.get('bar'), 'bar_named')
      t.same(cc.get('bar', 'named'), 'bar_named')

      var cc2 = new CC(cc)

      t.same(cc2.get('foo'), 'foo_noname')
      t.same(cc2.get('foo', 'named'), 'foo_named')
      t.same(cc2.get('bar'), 'bar_named')
      t.same(cc2.get('bar', 'named'), 'bar_named')

      // Add uses push, so adds to both base and extended chains ...
      cc2.add({baz: 'baz_named2'}, 'named2')
      t.same(cc.get('baz'), 'baz_named2')
      t.same(cc2.get('baz'), 'baz_named2')
      // ... but the new named config only exists in cc2
      t.same(cc.get('baz', 'named2'), undefined)
      t.same(cc2.get('baz', 'named2'), 'baz_named2')

      // Using unshift will only affect cc2, with no effect on cc
      cc2.unshift({qux: 'qux_noname'})
      t.same(cc.get('qux'), undefined)
      t.same(cc2.get('qux'), 'qux_noname')

      t.pass('ok')
      t.end()
    })
})

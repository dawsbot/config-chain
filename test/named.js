var test = require('tap').test
var CC = require('../index.js').ConfigChain

test('test named configs', function (t) {
  var cc = new CC()

  cc.add({foo: 'foo_cfg1'}, 'cfg1')
    .add({foo: 'foo_noname', bar: 'bar_noname'})
    .add({foo: 'foo_cfg2', baz: 'baz_cfg2'}, 'cfg2')
    .on('load', function (cc) {

      t.same(cc.get('foo'), 'foo_cfg1')
      t.same(cc.get('foo', 'cfg1'), 'foo_cfg1')
      t.same(cc.get('foo', 'cfg2'), 'foo_cfg2')
      t.same(cc.get('foo', 'bad'), undefined)

      t.same(cc.get('bar'), 'bar_noname')
      t.same(cc.get('baz'), 'baz_cfg2')
      t.same(cc.get('baz', 'cfg2'), 'baz_cfg2')

      cc.set('baz', 'baz_new', 'cfg1')
      t.same(cc.get('baz'), 'baz_new')
      t.same(cc.get('baz', 'cfg1'), 'baz_new')
      t.same(cc.get('baz', 'cfg2'), 'baz_cfg2')

      cc.set('bar', 'bar_new')
      t.same(cc.get('bar'), 'bar_new')
      t.same(cc.get('bar', 'cfg1'), 'bar_new')
      t.same(cc.get('bar', 'cfg2'), undefined)

      t.pass('ok')
      t.end()
    })
})

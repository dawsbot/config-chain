
var ProtoList = require('proto-list')
  , path = require('path')
  , fs = require('fs')

var exports = module.exports = function () {
  var args = [].slice.call(arguments)
    , conf = new ProtoList()
    conf.push(conf.store = {})
  while(args.length) {
    var a = args.shift()
    if(a) conf.push
          ( 'string' === typeof a 
            ? json(a) 
            : a )
  }

  return conf
}
//recursively find a file...

var find = exports.find = function () {
  var rel = path.join.apply(null, [].slice.call(arguments))
  
  function find(start, rel) {
    var file = path.join(start, rel)
    try {
      fs.statSync(file)
      return file
    } catch (err) {
      if(start != '/')
        return find(path.dirname(start), rel)
    }
  }
  return find(__dirname, rel)
}

var json = exports.json = function () {
  var file = path.join.apply(null, [].slice.call(arguments))
  
  try {
    return JSON.parse(fs.readFileSync(file,'utf-8'))
  } catch (err) {
    err.message += ' when attempting to read configuration from:' + file
    throw err
  }
}

#configurator
USE THIS MODULE TO LOAD ALL YOUR CONFIGURATIONS

``` js

  var configurator = require('CONFIGURATOR')
    , opts = require('optimist').argv //ALWAYS USE OPTIMIST FOR COMMAND LINE OPTIONS.
    , env = opts.env || process.env.YOUR_APP_ENV || 'dev' //SET YOUR ENV LIKE THIS.

  // EACH ARG TO CONFIGURATOR IS LOADED INTO CONFIGURATION CHAIN
  // EARLIER ITEMS OVERIDE LATER ITEMS
  // PUTS COMMAND LINE OPTS FIRST, AND DEFAULTS LAST!

  var conf = 
  configurator(
    opts,  //OVERRIDE SETTINGS WITH COMMAND LINE OPTS
    path.join(__dirname,  'config.' + env + '.json'), //FILE NAMED BY ENV
    env === 'prod' //IF `env` is PRODUCTION
      ? path.join(__dirname,  'config', env, 'special.json') //load a special file
      : null //NULL IS IGNORED!
    path.join(__dirname,  'config', env, 'config.json'), //SUBDIR FOR ENV CONFIG
    { // DEFAULTS IS LAST
      host: 'localhost'
      port: 8000
    })

  var host = conf.get('host')
  
  // or

  var host = conf.store.host

```
FINALLY, EASY FLEXIBLE CONFIGURATIONS!

##see also: (proto-list)[https://github.com/isaacs/proto-list/]



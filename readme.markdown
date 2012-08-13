#config-chain

USE THIS MODULE TO LOAD ALL YOUR CONFIGURATIONS

``` js

  //npm install config-chain

  var cc = require('config-chain')
    , opts = require('optimist').argv //ALWAYS USE OPTIMIST FOR COMMAND LINE OPTIONS.
    , env = opts.env || process.env.YOUR_APP_ENV || 'dev' //SET YOUR ENV LIKE THIS.

  // EACH ARG TO CONFIGURATOR IS LOADED INTO CONFIGURATION CHAIN
  // EARLIER ITEMS OVERIDE LATER ITEMS
  // PUTS COMMAND LINE OPTS FIRST, AND DEFAULTS LAST!

  //strings are interpereted as filenames.
  //will be loaded synchronously

  var conf =
  cc(
    //OVERRIDE SETTINGS WITH COMMAND LINE OPTS
    opts,

    //ENV VARS IF PREFIXED WITH 'myApp_'

    cc.env('myApp_'), //myApp_foo = 'like this'

    //FILE NAMED BY ENV
    path.join(__dirname,  'config.' + env + '.json'),

    //IF `env` is PRODUCTION
    env === 'prod'
      ? path.join(__dirname, 'special.json') //load a special file
      : null //NULL IS IGNORED!

    //SUBDIR FOR ENV CONFIG
    path.join(__dirname,  'config', env, 'config.json'),

    //SEARCH PARENT DIRECTORIES FROM CURRENT DIR FOR FILE
    cc.find('config.json'),

    //PUT DEFAULTS LAST
    {
      host: 'localhost'
      port: 8000
    })

  var host = conf.get('host')

  // or

  var host = conf.store.host

```

FINALLY, EASY FLEXIBLE CONFIGURATIONS!

##see also: (proto-list)[https://github.com/isaacs/proto-list/]

WHATS THAT YOU SAY?

YOU WANT A "CLASS" SO THAT YOU CAN DO CRAYCRAY JQUERY CRAPS?

EXTEND WITH YOUR OWN FUNCTIONALTY!?

## CONFIGCHAIN LIVES TO SERVE ONLY YOU!

```javascript
var cc = require('config-chain')

// all the stuff you did before
var config = cc({
      some: 'object'
    },
    cc.find('config.json'),
    cc.env('myApp_')
  )
  // CONFIGS AS A SERVICE, aka "CaaS", aka EVERY DEVOPS DREAM OMG!
  .addUrl('http://configurator:1234/my-configs')
  // ASYNC FTW!
  .addFile('/path/to/file.json')

  // OBJECTS ARE OK TOO, they're SYNC but they still ORDER RIGHT
  // BECAUSE PROMISES ARE USED BUT NO, NOT *THOSE* PROMISES, JUST
  // ACTUAL PROMISES LIKE YOU MAKE TO YOUR MOM, KEPT OUT OF LOVE
  .add({ another: 'object' })

  // DIE A THOUSAND DEATHS IF THIS EVER HAPPENS!!
  .on('error', function (er) {
    // IF ONLY THERE WAS SOMETHIGN HARDER THAN THROW
    // MY SORROW COULD BE ADEQUATELY EXPRESSED.  /o\
    throw er
  })

  // THROW A PARTY IN YOUR FACE WHEN ITS ALL LOADED!!
  .on('load', function (config) {
    console.awesome('HOLY SHIT!')
  })
```

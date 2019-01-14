// class
const EventEmitter = require('events');
const emitter = new EventEmitter();

// // register a listener
// emitter.on('messageLogged', function(arg) {
//    console.log('Listener is called and parameters..', arg);
// });

const Logger = require('./logger');
const logger = new Logger();

// // register a listener
logger.on('messageLogged', function(arg) {
   console.log('Listener is called and parameters..', arg);
});

logger.log('message');

// class
const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener
emitter.on('messageLogged', function(arg) {
   console.log('Listener is called and parameters..', arg);
});

// raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://..'});

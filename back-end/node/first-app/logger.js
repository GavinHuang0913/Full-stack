// class
const EventEmitter = require('events');
// const emitter = new EventEmitter();

const url = 'http://sample.com';

class Logger extends EventEmitter{

// function log(message) {
   log(message) {
   console.log(url + message);

   // raise an event
   // emitter.emit('messageLogged', { id: 1, url: 'http://..'});
   this.emit('messageLogged', { id: 1, url: 'http://..'});
}

}

module.exports = Logger;
// module.exports.log = log;

// console.log('The module of logger: ', module);

// // export single class or method
// module.exports = log;
// console.log('The module of single logger: ', module);


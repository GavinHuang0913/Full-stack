const http = require('http');

const server = http.createServer( (req, res) => { // routers
   if(req.url === '/' ) {
      res.write('hello world...');
      res.end();
   }

   if(req.url === '/api/test') {
      res.write(JSON.stringify([1,2,3]));
      res.write(JSON.stringify({"id": "1", "name": "gavin" }));
      res.end();
   }
});


server.on('connection', (socket) => {
   console.log('New connection....');
})

server.listen(3001);
console.log('server is running..');


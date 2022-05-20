const http = require('http');

const server = http.createServer((req, res) => {
    console.log('run request...');

})

server.listen(3000, 'localhost', () => {
    console.log("NODE is running on port: 3000");
})
const http = require('http');
const { pipeline } = require('stream');

const server = http.createServer((req, res) => {
  // Simulate a long-running operation using streams
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(chunks);
    // Process the data from the request
    const data = buffer.toString();

    setTimeout(() => {
      // Send response after the delay
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Processed: ' + data);
    }, 5000);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
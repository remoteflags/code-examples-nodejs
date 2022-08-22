const http = require('http');
const client = require('remoteflags-nodejs-client');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();
server.on('request', async (req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // remoteflags client setup
  client.ApiClient.instance.authentications['RemoteFlagsAuthorizer'].apiKey = "<YOUR_API_KEY>"
  const api = new client.PublicApi()

  // parameters
  const ownerId = "<YOUR_OWNER_ID>";
  const flagId = "<YOUR_FLAG_ID>";
  const opts = {
    'segment': "status",
  };

  // remoteflags api call
  api.getStatus(ownerId, flagId, opts)
     .then(data => {
       console.log('API called successfully. Returned data: ' + data.value);
       res.end('Remote Flags - Nodejs code examples.\nFlag value: ' + data.value);
     })
     .catch(error => {
       console.error(error);
       res.end('Remote Flags - Nodejs code examples.\nError calling API: ' + error.response.text)
     });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

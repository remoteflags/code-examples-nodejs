const http = require('http');
const client = require('remoteflags-nodejs-client');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  // remoteflags client setup
  const authorizer = client.ApiClient.instance.authentications['RemoteFlagsAuthorizer'];
  authorizer.apiKey = "<YourAccessToken>"
  const api = new client.PublicApi()

  // parameters
  const ownerId = "<YourOwnerId>";
  const flagId = "<YourFlagId>";
  const opts = {
    'segment': "status",
  };
  const callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Remote Flags - Nodejs code examples.\nFlag value: ' + data.value);
    }
  };

  // remoteflags api call
  api.getStatus(ownerId, flagId, opts, callback);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

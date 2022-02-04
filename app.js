const http = require('http');
const remoteflagsClient = require('remoteflags-nodejs-client');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // remoteflags client setup
  const defaultClient = remoteflagsClient.ApiClient.instance;
  const RemoteFlagsAuthorizer = defaultClient.authentications['RemoteFlagsAuthorizer'];
  RemoteFlagsAuthorizer.apiKey = "<YourAccessToken>"
  const api = new remoteflagsClient.PublicApi()

  // remoteflags api call
  const ownerId = "<YourOwnerId>";
  const flagId = "<YourFlagId>";
  const opts = {
    'segment': "status",
  };
  const callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Remote Flags - Nodejs code examples.\nFlag value: ' + data.value);
      }
    }
  };
  api.getStatus(ownerId, flagId, opts, callback);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

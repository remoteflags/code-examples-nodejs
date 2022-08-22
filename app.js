const http = require('http');
const client = require('remoteflags-nodejs-client');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer();

// remoteflags client setup
apiClient = client.ApiClient.instance;
apiClient.authentications['RemoteFlagsAuthorizer'].apiKey = "<YOUR_API_KEY>";
remoteFlagsApi = new client.PublicApi(apiClient);

server.on('request', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // remoteflags parameters
  const ownerId = "<YOUR_OWNER_ID>";
  const flagId = "<YOUR_FLAG_ID>";
  const opts = {
    'segment': "status",
  };

  // remoteflags api call
  remoteFlagsApi.getStatus(ownerId, flagId, opts)
     .then(data => {
       console.log('API called successfully. Returned data: ' + data.value);
       console.log('API raw response: ' + JSON.stringify(data));
       res.end('Remote Flags - Nodejs code examples.\n\nFlag value: ' + data.value
          + '\n\nRaw response: ' + JSON.stringify(data));
     })
     .catch(error => {
       console.error(error);
       res.end('Remote Flags - Nodejs code examples.\nError calling API: ' + error.response.text)
     });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

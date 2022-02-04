![alt text](https://s3.eu-west-1.amazonaws.com/www.remoteflags.com/Header.png)
# Node.js examples

This package contains code example on how to integrate with Remote Flags api and fetch a specific flag status.

**Please Note**: [Remote Flags](remoteflags.com) is currently in beta. The examples contained in this package are subject to change, namely the api endpoints. 

---
# How to use
## Step 1 - Gather data
Visit remoteflags.com and grab the information you need to query the api, namely:

1. Access Token - get it at [remoteflags.com/account](www.remoteflags.com/account)
2. OwnerId - get it at [remoteflags.com/account]((www.remoteflags.com/account))
3. FlagId - get it by selecting one flag at [remoteflags.com/flags]((www.remoteflags.com/flags))

## Step 2
In ```app.js``` you will find the execution code, there you have a const segment which is intended to be passed at runtime and it not a static valuue like your flagId or ownerId.
Just edit the example for a value that makes sense for your flag context, this might be a county Id or user group. By default, all flags have a segment named ```status```.

```./app.js```
```
RemoteFlagsAuthorizer.apiKey = "YourAccessToken"
const ownerId = "YourOwnerId";
const flagId = "YourFlagId";
```

Additionally, set segment and key optional parameters
```
const opts = {
    // The segment to get status from. Required for multi-segment flags. For single segment flag skip this.
    'segment': "status", 
    // An identifier to be a key to associate the status with. This is used on flag which status you need to be consistent after the first random generated. For always random status behavior skip this.
    'key': "someIdetifier" 
};
```

**Note**: If you don't want to include segment or key in your query simply leave opts as empty:
```
const opts = {};
```

## Step 3
Your all set, simply run the project and see the flag status 

1. Run - ```npm start```
2. Visit - http://127.0.0.1:3000 

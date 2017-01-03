RESTFul-API
===========

A RestFul-API in Express.js and MongoDB

Requirement:

MongoDB must be installed and running

```
npm install
node app
```

## Get all Users
curl -X GET -H "api-key: sampleKey1" -H "accept: application/json" -H "timestamp: 1483429036212" -H "checksum: checksum" -H "Cache-Control: no-cache" -H "Postman-Token: b1a5bdc6-88a4-6c3e-a699-94a4b4b98ac1" "http://localhost:3000/api/users"

## Create a New User
curl -X POST -H "api-key: sampleKey1" -H "accept: application/json" -H "timestamp: 1483429036212" -H "checksum: checksum" -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 57130b2e-f353-b43d-86d6-2af5175da8f7" -d 'first_name=Prabhat&last_name=Khera&=' "http://localhost:3000/api/users"
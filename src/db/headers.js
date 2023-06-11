const http = require('http');
const options = {
  hostname: 'www.fumarya.com',
  port: 80,
  path: '/api',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};
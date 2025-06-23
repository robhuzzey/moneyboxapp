// Polyfill Request, Response, Headers for Node.js/Jest
const fetch = require('node-fetch');
global.Request = fetch.Request;
global.Response = fetch.Response;
global.Headers = fetch.Headers;

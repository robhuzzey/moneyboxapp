import '@testing-library/jest-dom';

// Polyfill Request, Response, Headers for Node.js/Jest
try {
  const fetch = require('node-fetch');
  global.Request = fetch.Request;
  global.Response = fetch.Response;
  global.Headers = fetch.Headers;
} catch (e) {
  // node-fetch may not be installed or not needed
}

// Polyfill setImmediate for Node.js/Jest
global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));

// Mock NextResponse.json to behave like a real Response
const { NextResponse } = require('next/server');
if (NextResponse && typeof NextResponse.json !== 'function') {
  NextResponse.json = (data, init) => {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init && init.headers) },
    });
  };
}

afterEach(() => {
  jest.resetModules();
});

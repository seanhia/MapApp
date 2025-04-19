const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// Proxy configuration
const apiProxy = createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true, // Needed for Google Maps
  pathRewrite: {
    '^/proxy': '/maps/api', // Rewrite the path to match Google Maps API
  },
  onProxyRes: function (proxyRes, req, res) {
    // Add CORS header to allow access from http://localhost:8081
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8081';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS';
  },
});

// Use the proxy middleware
app.use('/proxy', apiProxy);

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
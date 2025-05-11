const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;
const cors = require('cors');

// Proxy configuration
const apiProxy = createProxyMiddleware({
  target: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  changeOrigin: true, // Needed for Google Maps
  pathRewrite: {
    '^/proxy': '/maps/api', // Rewrite the path to match Google Maps API
  },
  onProxyRes: function (proxyRes, req, res) {
    // Add CORS header to allow access from http://localhost:8081
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,OPTIONS,DELETE';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    next();
  },
});

// Use the proxy middleware
app.use(cors()); // Enable CORS for all routes
//app.use('/proxy', apiProxy);

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Logging for debugging
app.use(morgan('dev'));

// Proxy configuration
const apiProxy = createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '/maps/api', 
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to:', proxyReq.path);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  },
});

// Use the proxy middleware
app.use('/proxy', apiProxy);

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});

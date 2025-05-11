const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors  = require('cors');

const app  = express();
const PORT = 3000;

const googleProxy = createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '/maps/api' },
           
  onProxyReq: (proxyReq, req) => {
    console.log(`[→ Google] ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes) => {
    // Add CORS headers so the browser accepts the response
    proxyRes.headers['Access-Control-Allow-Origin']  = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,OPTIONS,DELETE';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  },
});

app.use(cors());               
app.use('/proxy', googleProxy); 

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://github.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
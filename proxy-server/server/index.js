require('newrelic');
require('dotenv').config();
var compression = require('compression')
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT
const app = express();
app.use(compression())
const rewardsServiceRoute =
  'http://ec2-3-133-92-215.us-east-2.compute.amazonaws.com:3005';

const proxyRouter = {
  '/api/banner': 'http://sdc-lb-679578692.us-west-1.elb.amazonaws.com/',
};

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(
  createProxyMiddleware({
    target: '/:id',
    router: proxyRouter,
    changeOrigin: true,
    prependPath: false,
  })
);

app.listen(port, () => {
  console.log('Proxy Server is listening on port 4000');
});

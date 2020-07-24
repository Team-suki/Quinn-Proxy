require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const template = require('../ssr/layout.js');
const body = require('../ssr/app.js');
const scripts = require('../ssr/scripts.js');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const exportedLoader = require('./loader.js')
const app = express();
const rewardsServiceRoute =
  'http://ec2-3-133-92-215.us-east-2.compute.amazonaws.com:3005';

const proxyRouter = {
  '/api/banner': 'http://localhost:8080',
};

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

//this is wrong and I know it.
//Needs to be compiled into a string, and passed into the
//const bannerBundle = require('http://localhost:8080/serverbundle.js')


//console.log(bannerBundle)

//console.log('String - ', ReactDOMServer.renderToString(bannerService))

app.get('/ssr/:id', (req, res) => {
  var content = ReactDOMServer.renderToString(exportedLoader.bannerService);



  //What do I call renderTostring on?
  //An element?
  //How do I access the element from the bundle?? Can I?
  res.send(template('Kickstarter', body(content), scripts()))
});

app.use(
  createProxyMiddleware({
    target: '/:id',
    router: proxyRouter,
    changeOrigin: true,
    prependPath: false,
  })
);

app.listen(4000, () => {
  console.log('Proxy Server is listening on port 4000');
});

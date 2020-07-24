module.exports = {
  apps : [{
    name: "Proxy",
    script: './server/index.js',
    watch: 'false',
    env: {
      NODE_ENV: "production"
    }
  }],
};

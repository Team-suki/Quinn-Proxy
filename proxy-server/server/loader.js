axios = require('axios');
services = require('./services.config.json');

(async () => {
  console.log('running')
    for (var key in services) {
      await axios.get(services[key]).then((data) => module.exports[key] = data)
    }
    console.log(module.exports)
})()


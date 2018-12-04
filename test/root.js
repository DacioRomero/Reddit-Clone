const server = require('../server');

after(() => {
    return server.stop();
})

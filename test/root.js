// test/root.js
const server = require('../server');

after(() => {
    return server.stop();
})

// require your server and launch it
const server = require('./api/server');

const port = 5050;

server.listen(port, () => {
    console.log(`\n*** Server is running on http://localhost:${port} ***\n`);
});
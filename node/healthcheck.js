const http = require('http');
const options = {
    host: 'localhost',
    port: 3000,
    path: '/healthcheck',
    timeout: 2000
};

const healthCheck = http.request(options, (res) => {
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

healthCheck.on('error', function (err) {
    process.exit(1);
});

healthCheck.end();
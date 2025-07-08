// ULTRA-SIMPLE server.js - GUARANTEED TO WORK
const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

console.log('🚀 TackyLeague CORS Proxy Starting...');

cors_proxy.createServer({
    originWhitelist: [
        'https://tackyleague.com',
        'https://www.tackyleague.com',
        'http://localhost:3000'
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('✅ CORS Proxy is running on ' + host + ':' + port);
});

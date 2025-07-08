const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

console.log('Starting CORS proxy server...');
console.log('Host:', host);
console.log('Port:', port);

const server = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins for testing
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
    httpProxyOptions: {
        // Use different DNS servers
        lookup: require('dns').lookup
    }
});

server.listen(port, host, function() {
    console.log('✅ CORS proxy server running on ' + host + ':' + port);
    console.log('📝 Test URL: http://' + host + ':' + port + '/https://api.roblox.com/users/get-by-username?username=Builderman');
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ Server error:', err);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled rejection:', err);
});

const cors_proxy = require('cors-anywhere');

// Environment configuration
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

// Security: Only allow requests from your domains
const originWhitelist = [
    'https://tackyleague.com',
    'https://www.tackyleague.com',
    process.env.ALLOWED_ORIGIN,  // Set this in Render dashboard
    'http://localhost:3000',     // For testing
    'http://localhost:8080',     // For testing
    'http://127.0.0.1:3000'      // For testing
].filter(Boolean); // Remove undefined values

console.log('🚀 TackyLeague CORS Proxy starting...');
console.log('🔒 Allowed origins:', originWhitelist);

// Create CORS proxy server
cors_proxy.createServer({
    originWhitelist: originWhitelist,
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
    
    // Enhanced security and performance
    httpProxyOptions: {
        timeout: 15000,  // 15 second timeout
        secure: true,    // Verify SSL certificates
        changeOrigin: true
    },
    
    // Custom request handler for additional security
    getProxyForUrl: function(url) {
        // Only allow Roblox API requests for security
        if (!url.includes('roblox.com')) {
            throw new Error('Only Roblox API requests are allowed');
        }
        
        // Block potentially dangerous URLs
        const blockedPatterns = [
            'javascript:',
            'data:',
            'file:',
            'ftp:'
        ];
        
        if (blockedPatterns.some(pattern => url.toLowerCase().includes(pattern))) {
            throw new Error('Blocked URL pattern');
        }
        
        console.log('✅ Proxying request to:', url);
        return url;
    }
}).listen(port, host, function() {
    console.log('🚀 TackyLeague CORS Proxy running on ' + host + ':' + port);
    console.log('📝 Allowed domains:', originWhitelist.join(', '));
    console.log('🎯 Test URL: http://' + host + ':' + port + '/https://api.roblox.com/users/get-by-username?username=Builderman');
    console.log('📊 Health check: http://' + host + ':' + port + '/health');
});

// Basic health check endpoint (not part of cors-anywhere)
const http = require('http');
const originalCreateServer = cors_proxy.createServer;

// Override to add health check
cors_proxy.createServer = function(options) {
    const server = originalCreateServer.call(this, options);
    
    // Add health check route
    const originalListeners = server.listeners('request');
    server.removeAllListeners('request');
    
    server.on('request', function(req, res) {
        if (req.url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                service: 'tackyleague-cors-proxy',
                uptime: process.uptime()
            }));
            return;
        }
        
        // Call original handlers
        originalListeners.forEach(listener => listener.call(server, req, res));
    });
    
    return server;
};

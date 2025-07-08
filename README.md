# TackyLeague CORS Proxy

A secure CORS proxy specifically designed for TackyLeague's Roblox API integration.

## 🚀 Features

- ✅ Secure whitelist-based origin control
- ✅ Roblox API specific filtering  
- ✅ 15-second timeout protection
- ✅ Health check endpoint
- ✅ Production-ready logging
- ✅ Auto-deployment with Render

## 🔧 Usage

Once deployed, use your proxy URL in your avatar fetcher:

```javascript
this.corsProxies = [
    'https://your-app.onrender.com/',  // Your deployed proxy
    'https://api.allorigins.win/raw?url=',  // Fallback
];
```

## 🧪 Testing

Test your deployed proxy:

```bash
curl "https://your-app.onrender.com/https://api.roblox.com/users/get-by-username?username=Builderman"
```

Health check:
```bash
curl "https://your-app.onrender.com/health"
```

## 🔒 Security

- Only allows requests from whitelisted domains
- Only permits Roblox API endpoints
- Blocks dangerous URL patterns
- Removes sensitive headers

## 📊 Monitoring

Access logs and metrics through your Render dashboard.

## 🛠️ Environment Variables

- `ALLOWED_ORIGIN`: Your main domain (set in Render dashboard)
- `NODE_ENV`: Set to 'production' automatically
- `PORT`: Auto-set by Render

## 📝 License

MIT License - Free to use and modify.

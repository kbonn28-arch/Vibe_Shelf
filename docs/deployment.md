# VibeShelf Deployment Guide

## Production Deployment

### Client (React PWA)
**Platform**: Netlify
**URL**: https://vibeshelf350.netlify.app/

#### Build Process
```bash
cd client
npm install
npm run build
```

#### Environment Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

#### Netlify Configuration
Create `netlify.toml` in client directory:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### API (Express.js)
**Platform**: Railway/Render/Vercel (Node.js)

#### Build Process
```bash
cd api
npm install --production
npm start
```

#### Environment Variables
- `NODE_ENV`: production
- `PORT`: 3001 (or platform-assigned port)
- `CLIENT_URL`: https://vibeshelf350.netlify.app
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

### Database (Supabase)
**Platform**: Supabase Cloud

#### Setup Steps
1. Create new Supabase project
2. Run migrations from `supabase/migrations/`
3. Run seeds from `supabase/seeds/`
4. Configure authentication settings
5. Set up Row Level Security policies

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase CLI (optional for local development)

### Local Development

#### Client
```bash
cd client
npm install
npm run dev
```
Access: http://localhost:5173

#### API
```bash
cd api
cp .env.example .env
# Configure .env with local Supabase settings
npm install
npm run dev
```
Access: http://localhost:3001

#### Database (Supabase)
1. Create Supabase project
2. Run migrations via Supabase Dashboard or CLI
3. Run seed data for development

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy VibeShelf
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd client && npm ci && npm run test
          cd ../api && npm ci && npm run test

  deploy-client:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=client/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-api:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-app/railway-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_TOKEN }}
          service: vibeshelf-api
```

## Monitoring and Maintenance

### Client Monitoring
- Netlify Analytics for performance
- Error tracking with Sentry (optional)
- PWA installation metrics

### API Monitoring
- Railway/Render monitoring dashboards
- API response time tracking
- Error logging and alerting

### Database Monitoring
- Supabase Dashboard metrics
- Query performance analysis
- Storage usage monitoring

## Backup and Recovery

### Database Backups
- Supabase automatic backups (7-day retention)
- Manual export before major updates
- Point-in-time recovery capability

### Code Backups
- Git repository (primary backup)
- GitHub as remote backup
- Tag releases for deployment points

## Security Considerations

### Client
- HTTPS enforcement
- Content Security Policy
- Secure cookie handling
- Input validation and sanitization

### API
- Rate limiting
- CORS configuration
- Request validation
- Environment variable protection

### Database
- Row Level Security
- API key management
- User authentication
- Data encryption at rest and in transit

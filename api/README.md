# VibeShelf API

This is the local backend API for VibeShelf Prototype 2.

The frontend should call this API. The frontend should not connect directly to Supabase.

## Local URL

http://localhost:3001

## Environment Variables

Create an api/.env file with:

PORT=3001
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-secret-key

Do not commit api/.env to GitHub.

## Install

cd api
npm install

## Run Locally

npm run dev

Expected message:

VibeShelf API server running on port 3001

## Test in Browser

http://localhost:3001/health
http://localhost:3001/api/books
http://localhost:3001/api/moods

## Smoke Test

From the project root, while the API is running:

BASE_URL=http://localhost:3001 ./tests/smoke.sh

Expected result:

All smoke tests passed.

## Main Routes

GET /health
GET /api/books
POST /api/books
GET /api/books/:id
GET /api/books/user/:userId
POST /api/books/user
PATCH /api/books/user/:id
GET /api/moods

## Supabase Tables Used

books
moods
profiles
bookshelf_entries
book_moods
recommendations
reviews

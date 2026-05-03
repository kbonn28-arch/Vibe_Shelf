#!/usr/bin/env bash

set -e

BASE_URL="${BASE_URL:-http://localhost:3001}"

echo "Testing VibeShelf API at $BASE_URL"

echo "1. Health check"
curl -sSf "$BASE_URL/health" > /dev/null

echo "2. GET books"
curl -sSf "$BASE_URL/api/books" > /dev/null

echo "3. GET moods"
curl -sSf "$BASE_URL/api/moods" > /dev/null

echo "4. POST book"
UNIQUE_ISBN="$(date +%s)"

curl -sSf -X POST "$BASE_URL/api/books" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Smoke Test Book\",
    \"author\": \"Smoke Test Author\",
    \"genre\": \"Fiction\",
    \"isbn\": \"$UNIQUE_ISBN\",
    \"description\": \"Created by smoke test.\",
    \"cover_image_url\": \"https://example.com/smoke-test.jpg\"
  }" > /dev/null

echo "All smoke tests passed."

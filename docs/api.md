# VibeShelf API Documentation

## Overview

The VibeShelf API provides RESTful endpoints for managing user accounts, book collections, mood-based recommendations, and community features. The API is built with Express.js and uses Supabase as the backend database.

## Base URL

**Development**: `http://localhost:3001`
**Production**: `https://your-api-url.com`

## Authentication

The API uses Supabase Authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "message": "Operation completed successfully"
}
```

## Error Handling

```json
{
  "success": false,
  "data": null,
  "error": "Error message",
  "message": "Operation failed"
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "booklover",
  "full_name": "Jane Doe"
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Logout
```http
POST /api/auth/logout
```

#### Get Current User
```http
GET /api/auth/me
```

### Books

#### Get All Books
```http
GET /api/books
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search by title or author
- `genre` (string): Filter by genre
- `mood` (string): Filter by mood

#### Get Book by ID
```http
GET /api/books/:id
```

#### Add New Book
```http
POST /api/books
```

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "description": "A classic American novel",
  "cover_url": "https://example.com/cover.jpg",
  "page_count": 180,
  "publication_date": "1925-04-10",
  "genre": ["Fiction", "Classic"],
  "tags": ["classic", "american", "1920s"]
}
```

#### Update Book
```http
PUT /api/books/:id
```

#### Delete Book
```http
DELETE /api/books/:id
```

### User Books

#### Get User's Bookshelf
```http
GET /api/user-books
```

**Query Parameters:**
- `status` (string): Filter by status (want_to_read, currently_reading, read, did_not_finish)

#### Add Book to User's Library
```http
POST /api/user-books
```

**Request Body:**
```json
{
  "book_id": "uuid",
  "status": "want_to_read",
  "rating": 5,
  "review": "Amazing book!",
  "notes": "Personal notes",
  "progress": 100
}
```

#### Update User Book
```http
PUT /api/user-books/:id
```

#### Remove Book from User's Library
```http
DELETE /api/user-books/:id
```

### Moods

#### Get All Moods
```http
GET /api/moods
```

#### Get Mood by ID
```http
GET /api/moods/:id
```

### Recommendations

#### Get Recommendations
```http
GET /api/recommendations
```

**Query Parameters:**
- `mood_id` (string, required): Current mood
- `limit` (number): Number of recommendations (default: 5)

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "book": {
          "id": "uuid",
          "title": "Book Title",
          "author": "Author Name",
          "cover_url": "https://example.com/cover.jpg",
          "average_rating": 4.5,
          "rating_count": 120
        },
        "recommendation_score": 0.85,
        "reason": "Based on your 'Adventurous' mood and reading history"
      }
    ]
  }
}
```

#### Save Recommendation Feedback
```http
POST /api/recommendations/:id/feedback
```

**Request Body:**
```json
{
  "was_helpful": true,
  "feedback": "Great recommendation! I loved this book."
}
```

### Reviews

#### Get Book Reviews
```http
GET /api/books/:id/reviews
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

#### Add Review
```http
POST /api/books/:id/reviews
```

**Request Body:**
```json
{
  "rating": 5,
  "review": "Absolutely loved this book! Highly recommend.",
  "user_book_id": "uuid"
}
```

#### Update Review
```http
PUT /api/reviews/:id
```

#### Delete Review
```http
DELETE /api/reviews/:id
```

### User Profile

#### Get User Profile
```http
GET /api/profile
```

#### Update User Profile
```http
PUT /api/profile
```

**Request Body:**
```json
{
  "username": "booklover",
  "full_name": "Jane Doe",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

#### Get User Statistics
```http
GET /api/profile/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_books": 45,
    "books_read": 32,
    "currently_reading": 2,
    "average_rating": 4.2,
    "favorite_genres": ["Fiction", "Mystery", "Romance"],
    "reading_streak": 7
  }
}
```

## Rate Limiting

- **100 requests per 15 minutes** per IP address
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Data Models

### Book
```json
{
  "id": "uuid",
  "title": "string",
  "author": "string",
  "isbn": "string",
  "description": "string",
  "cover_url": "string",
  "page_count": "number",
  "publication_date": "date",
  "genre": ["string"],
  "tags": ["string"],
  "average_rating": "number",
  "rating_count": "number",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### User Book
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "book_id": "uuid",
  "status": "want_to_read | currently_reading | read | did_not_finish",
  "rating": "number (1-5)",
  "review": "string",
  "notes": "string",
  "progress": "number (0-100)",
  "started_at": "timestamp",
  "finished_at": "timestamp",
  "added_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Mood
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "color": "string",
  "icon": "string",
  "created_at": "timestamp"
}
```

### Profile
```json
{
  "id": "uuid",
  "username": "string",
  "full_name": "string",
  "avatar_url": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## SDK Examples

### JavaScript (Fetch)
```javascript
// Get recommendations
const response = await fetch('/api/recommendations?mood_id=uuid', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### React Hook Example
```javascript
import { useState, useEffect } from 'react';

function useRecommendations(moodId) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch(`/api/recommendations?mood_id=${moodId}`);
        const data = await response.json();
        setRecommendations(data.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    if (moodId) {
      fetchRecommendations();
    }
  }, [moodId]);

  return { recommendations, loading };
}
```

## Testing

The API includes comprehensive test coverage. Run tests with:

```bash
cd api
npm test
```

## Changelog

### v1.0.0
- Initial API release
- Authentication endpoints
- Book management
- Mood-based recommendations
- User profiles and statistics

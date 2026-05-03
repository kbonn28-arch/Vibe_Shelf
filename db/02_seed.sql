-- VibeShelf Prototype 2 Seed Data
-- Run this after db/01_schema.sql

insert into app_users (user_id, email, password_hash, last_login_at) values
('11111111-1111-1111-1111-111111111111', 'kanaea@example.com', 'demo_hash_1', now()),
('22222222-2222-2222-2222-222222222222', 'reader@example.com', 'demo_hash_2', now()),
('33333333-3333-3333-3333-333333333333', 'reviewer@example.com', 'demo_hash_3', now());

insert into profiles (profile_id, user_id, username, bio, is_public) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'kanaea_reads', 'I love mood-based book recommendations.', true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'cozy_reader', 'Always looking for comforting reads.', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'chapter_chaser', 'I review books after every finish.', true);

insert into books (book_id, title, author, genre, isbn, description, cover_image_url, average_rating) values
('aaaaaaaa-1111-1111-1111-111111111111', 'The Midnight Library', 'Matt Haig', 'Fiction', '9780525559474', 'A reflective novel about choices, regret, and possibility.', 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg', 5.0),
('bbbbbbbb-2222-2222-2222-222222222222', 'Book Lovers', 'Emily Henry', 'Romance', '9780593334836', 'A witty romance about books, ambition, and unexpected connection.', 'https://covers.openlibrary.org/b/isbn/9780593334836-L.jpg', 4.5),
('cccccccc-3333-3333-3333-333333333333', 'Atomic Habits', 'James Clear', 'Self-Help', '9780735211292', 'A practical guide to building better habits through small changes.', 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg', 4.8),
('dddddddd-4444-4444-4444-444444444444', 'Mexican Gothic', 'Silvia Moreno-Garcia', 'Horror', '9780525620785', 'A dark gothic mystery with suspense and atmosphere.', 'https://covers.openlibrary.org/b/isbn/9780525620785-L.jpg', 4.0),
('eeeeeeee-5555-5555-5555-555555555555', 'The House in the Cerulean Sea', 'TJ Klune', 'Fantasy', '9781250217288', 'A warm fantasy story about acceptance, found family, and kindness.', 'https://covers.openlibrary.org/b/isbn/9781250217288-L.jpg', 5.0);

insert into genres (genre_id, name, description) values
('10000000-0000-0000-0000-000000000001', 'Fiction', 'Story-driven novels and literary books.'),
('10000000-0000-0000-0000-000000000002', 'Romance', 'Books focused on love and relationships.'),
('10000000-0000-0000-0000-000000000003', 'Self-Help', 'Books focused on personal growth.'),
('10000000-0000-0000-0000-000000000004', 'Horror', 'Dark, suspenseful, or scary books.'),
('10000000-0000-0000-0000-000000000005', 'Fantasy', 'Books with magical or imaginative worlds.');

insert into moods (mood_id, name, description) values
('20000000-0000-0000-0000-000000000001', 'Reflective', 'For when the user wants something thoughtful.'),
('20000000-0000-0000-0000-000000000002', 'Cozy', 'For when the user wants comfort and warmth.'),
('20000000-0000-0000-0000-000000000003', 'Motivated', 'For when the user wants inspiration or self-improvement.'),
('20000000-0000-0000-0000-000000000004', 'Spooky', 'For when the user wants suspense or darker stories.'),
('20000000-0000-0000-0000-000000000005', 'Romantic', 'For when the user wants love, connection, or charm.');

insert into book_genres (book_id, genre_id) values
('aaaaaaaa-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001'),
('bbbbbbbb-2222-2222-2222-222222222222', '10000000-0000-0000-0000-000000000002'),
('cccccccc-3333-3333-3333-333333333333', '10000000-0000-0000-0000-000000000003'),
('dddddddd-4444-4444-4444-444444444444', '10000000-0000-0000-0000-000000000004'),
('eeeeeeee-5555-5555-5555-555555555555', '10000000-0000-0000-0000-000000000005');

insert into book_moods (book_id, mood_id, confidence_score) values
('aaaaaaaa-1111-1111-1111-111111111111', '20000000-0000-0000-0000-000000000001', 0.95),
('bbbbbbbb-2222-2222-2222-222222222222', '20000000-0000-0000-0000-000000000005', 0.97),
('bbbbbbbb-2222-2222-2222-222222222222', '20000000-0000-0000-0000-000000000002', 0.84),
('cccccccc-3333-3333-3333-333333333333', '20000000-0000-0000-0000-000000000003', 0.99),
('dddddddd-4444-4444-4444-444444444444', '20000000-0000-0000-0000-000000000004', 0.98),
('eeeeeeee-5555-5555-5555-555555555555', '20000000-0000-0000-0000-000000000002', 0.96);

insert into bookshelf_entries (entry_id, user_id, book_id, status, progress, start_date, finish_date) values
('30000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-1111-1111-1111-111111111111', 'finished', 100, '2026-01-10', '2026-01-18'),
('30000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-2222-2222-2222-222222222222', 'currently_reading', 45, '2026-02-01', null),
('30000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-5555-5555-5555-555555555555', 'want_to_read', 0, null, null),
('30000000-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'dddddddd-4444-4444-4444-444444444444', 'finished', 100, '2026-03-03', '2026-03-12');

insert into reviews (review_id, user_id, book_id, star_rating, review_text, is_public) values
('40000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-1111-1111-1111-111111111111', 5, 'This book was thoughtful and emotional. Perfect for a reflective mood.', true),
('40000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-5555-5555-5555-555555555555', 5, 'Warm, cozy, and comforting.', true),
('40000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'dddddddd-4444-4444-4444-444444444444', 4, 'Spooky and atmospheric with a strong mystery feel.', true);

insert into recommendations (recommendation_id, user_id, book_id, mood_id, session_id, status) values
('50000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-1111-1111-1111-111111111111', '20000000-0000-0000-0000-000000000001', 'demo-session-1', 'shown'),
('50000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-2222-2222-2222-222222222222', '20000000-0000-0000-0000-000000000005', 'demo-session-1', 'shown'),
('50000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-5555-5555-5555-555555555555', '20000000-0000-0000-0000-000000000002', 'demo-session-2', 'shown');

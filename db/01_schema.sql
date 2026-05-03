create extension if not exists "pgcrypto";

drop table if exists recommendations cascade;
drop table if exists reviews cascade;
drop table if exists bookshelf_entries cascade;
drop table if exists book_moods cascade;
drop table if exists book_genres cascade;
drop table if exists moods cascade;
drop table if exists genres cascade;
drop table if exists books cascade;
drop table if exists profiles cascade;
drop table if exists app_users cascade;

create table app_users (
    user_id uuid primary key default gen_random_uuid(),
    email text not null unique,
    password_hash text not null,
    created_at timestamp with time zone default now(),
    last_login_at timestamp with time zone
);

create table profiles (
    profile_id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references app_users(user_id) on delete cascade,
    username text not null unique,
    bio text,
    is_public boolean not null default true
);

create table books (
    book_id uuid primary key default gen_random_uuid(),
    title text not null,
    author text not null,
    genre text,
    isbn text unique,
    description text,
    cover_image_url text,
    average_rating numeric(2,1) default 0
);

create table genres (
    genre_id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text
);

create table moods (
    mood_id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text
);

create table book_genres (
    book_id uuid not null references books(book_id) on delete cascade,
    genre_id uuid not null references genres(genre_id) on delete cascade,
    primary key (book_id, genre_id)
);

create table book_moods (
    book_id uuid not null references books(book_id) on delete cascade,
    mood_id uuid not null references moods(mood_id) on delete cascade,
    confidence_score numeric(3,2) default 1.00,
    rule_note text default 'No more than two moods per book',
    primary key (book_id, mood_id)
);

create table bookshelf_entries (
    entry_id uuid primary key default gen_random_uuid(),
    user_id uuid not null references app_users(user_id) on delete cascade,
    book_id uuid not null references books(book_id) on delete cascade,
    status text not null check (
        status in (
            'want_to_read',
            'currently_reading',
            'finished',
            'paused',
            'dropped',
            're_reading'
        )
    ),
    progress integer default 0 check (progress >= 0 and progress <= 100),
    start_date date,
    finish_date date,
    added_at timestamp with time zone default now(),
    unique(user_id, book_id)
);

create table reviews (
    review_id uuid primary key default gen_random_uuid(),
    user_id uuid not null references app_users(user_id) on delete cascade,
    book_id uuid not null references books(book_id) on delete cascade,
    star_rating integer not null check (star_rating between 1 and 5),
    review_text text not null,
    review_date timestamp with time zone default now(),
    is_public boolean not null default true
);

create table recommendations (
    recommendation_id uuid primary key default gen_random_uuid(),
    user_id uuid not null references app_users(user_id) on delete cascade,
    book_id uuid not null references books(book_id) on delete cascade,
    mood_id uuid not null references moods(mood_id) on delete cascade,
    recommended_at timestamp with time zone default now(),
    session_id text not null,
    status text not null default 'shown' check (
        status in ('shown', 'skipped', 'not_interested', 'saved')
    )
);

-- Business rule: each book can have no more than two mood tags
create or replace function enforce_max_two_moods()
returns trigger as $$
begin
    if (
        select count(*)
        from book_moods
        where book_id = new.book_id
    ) >= 2 then
        raise exception 'Each book can have no more than two mood tags.';
    end if;

    return new;
end;
$$ language plpgsql;

drop trigger if exists trg_max_two_moods on book_moods;

create trigger trg_max_two_moods
before insert on book_moods
for each row
execute function enforce_max_two_moods();

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration. Check api/.env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  static async testConnection() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('book_id')
        .limit(1);

      if (error) throw error;

      return {
        success: true,
        message: 'Database connection successful',
        data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('username');

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getBooks(filters = {}) {
    try {
      let query = supabase
        .from('books')
        .select('*')
        .order('title');

      if (filters.genre) {
        query = query.ilike('genre', `%${filters.genre}%`);
      }

      if (filters.author) {
        query = query.ilike('author', `%${filters.author}%`);
      }

      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%,genre.ilike.%${filters.search}%`
        );
      }

      if (filters.minRating) {
        query = query.gte('average_rating', Number(filters.minRating));
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getBookById(bookId) {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('book_id', bookId)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserBooks(userId, filters = {}) {
    try {
      let query = supabase
        .from('bookshelf_entries')
        .select(`
          *,
          books (*)
        `)
        .eq('user_id', userId)
        .order('added_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createUserBook(userBookData) {
    try {
      const { data, error } = await supabase
        .from('bookshelf_entries')
        .insert({
          user_id: userBookData.user_id,
          book_id: userBookData.book_id,
          status: userBookData.status || 'want_to_read',
          progress: userBookData.progress || 0,
          start_date: userBookData.start_date || null,
          finish_date: userBookData.finish_date || null
        })
        .select(`
          *,
          books (*)
        `)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateUserBook(entryId, updates) {
    try {
      const { data, error } = await supabase
        .from('bookshelf_entries')
        .update(updates)
        .eq('entry_id', entryId)
        .select(`
          *,
          books (*)
        `)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createBook(bookData) {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre || null,
          isbn: bookData.isbn || null,
          description: bookData.description || null,
          cover_image_url: bookData.cover_image_url || null,
          average_rating: bookData.average_rating || 0
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getMoods() {
    try {
      const { data, error } = await supabase
        .from('moods')
        .select('*')
        .order('name');

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async generateRecommendations(userId, moodId) {
    try {
      const { data: bookMoods, error: bookMoodsError } = await supabase
        .from('book_moods')
        .select(`
          book_id,
          mood_id,
          confidence_score,
          books (*)
        `)
        .eq('mood_id', moodId)
        .order('confidence_score', { ascending: false });

      if (bookMoodsError) throw bookMoodsError;

      const userBooksResult = await this.getUserBooks(userId);
      const userBookIds =
        userBooksResult.data?.map((entry) => entry.book_id) || [];

      const availableRecommendations =
        bookMoods
          ?.filter((bookMood) => !userBookIds.includes(bookMood.book_id))
          ?.map((bookMood) => ({
            user_id: userId,
            book_id: bookMood.book_id,
            mood_id: moodId,
            recommendation_score: bookMood.confidence_score,
            status: 'shown',
            book: bookMood.books
          }))
          ?.slice(0, 5) || [];

      return { success: true, data: availableRecommendations };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createRecommendation(recommendationData) {
    try {
      const { data, error } = await supabase
        .from('recommendations')
        .insert({
          user_id: recommendationData.user_id,
          book_id: recommendationData.book_id,
          mood_id: recommendationData.mood_id,
          session_id: recommendationData.session_id,
          status: recommendationData.status || 'shown'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          books (*),
          app_users (
            user_id,
            profiles (*)
          )
        `)
        .eq('is_public', true)
        .order('review_date', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createReview(reviewData) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: reviewData.user_id,
          book_id: reviewData.book_id,
          star_rating: reviewData.star_rating,
          review_text: reviewData.review_text,
          is_public: reviewData.is_public ?? true
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

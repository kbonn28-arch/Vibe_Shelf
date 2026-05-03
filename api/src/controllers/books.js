import { DatabaseService } from '../models/database.js';

export const getBooks = async (req, res) => {
  try {
    const filters = {
      genre: req.query.genre,
      author: req.query.author,
      search: req.query.search,
      minRating: req.query.minRating
    };

    const { success, data, error } = await DatabaseService.getBooks(filters);

    if (!success) {
      return res.status(500).json({ error });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, data, error } = await DatabaseService.getBookById(id);

    if (!success) {
      return res.status(500).json({ error });
    }

    if (!data) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      isbn,
      description,
      cover_image_url,
      average_rating
    } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        error: 'title and author are required'
      });
    }

    const { success, data, error } = await DatabaseService.createBook({
      title,
      author,
      genre,
      isbn,
      description,
      cover_image_url,
      average_rating
    });

    if (!success) {
      return res.status(500).json({ error });
    }

    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const filters = {
      status: req.query.status
    };

    const { success, data, error } = await DatabaseService.getUserBooks(userId, filters);

    if (!success) {
      return res.status(500).json({ error });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user books' });
  }
};

export const addUserBook = async (req, res) => {
  try {
    const {
      user_id,
      book_id,
      status,
      progress,
      start_date,
      finish_date
    } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).json({
        error: 'user_id and book_id are required'
      });
    }

    const { success, data, error } = await DatabaseService.createUserBook({
      user_id,
      book_id,
      status,
      progress,
      start_date,
      finish_date
    });

    if (!success) {
      return res.status(500).json({ error });
    }

    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book to library' });
  }
};

export const updateUserBook = async (req, res) => {
  try {
    const entryId = req.params.id;

    const { success, data, error } = await DatabaseService.updateUserBook(
      entryId,
      req.body
    );

    if (!success) {
      return res.status(500).json({ error });
    }

    if (!data) {
      return res.status(404).json({ error: 'Bookshelf entry not found' });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bookshelf entry' });
  }
};

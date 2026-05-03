import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  getUserBooks,
  addUserBook,
  updateUserBook
} from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);

router.get('/user/:userId', getUserBooks);
router.post('/user', addUserBook);
router.patch('/user/:id', updateUserBook);

router.get('/:id', getBookById);

export default router;

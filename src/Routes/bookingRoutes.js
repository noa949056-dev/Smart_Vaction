import { Router } from 'express';
import { 
  getAllBookings, 
  getBookingById, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from './Controller/booking.controller.js';
import { 
  AddBookingSchema, 
  updateBookingSchema 
} from '../Validations/booking.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();

// הגדרת מידלוורים לתיקוף גוף הבקשה
const validateAddBooking = validateBody(AddBookingSchema);
const validateUpdateBooking = validateBody(updateBookingSchema);

// נתיבי הראוטר
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', validateAddBooking, createBooking);
router.put('/:id', validateUpdateBooking, updateBooking);
router.delete('/:id', deleteBooking);

export default router;
import { Router } from 'express';
import { 
  getAllHotels, 
  getHotelById, 
  createHotel, 
  updateHotel, 
  deleteHotel 
} from './Controller/hotel.controller.js';
import { 
  addHotelSchema, 
  updateHotelSchema 
} from '../Validations/hotel.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();

// הגדרת מידלוורים לתיקוף גוף הבקשה
const validateAddHotel = validateBody(addHotelSchema);
const validateUpdateHotel = validateBody(updateHotelSchema);

// נתיבי הראוטר
router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.post('/', validateAddHotel, createHotel);
router.put('/:id', validateUpdateHotel, updateHotel);
router.delete('/:id', deleteHotel);

export default router;
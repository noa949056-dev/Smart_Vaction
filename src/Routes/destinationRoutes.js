import { Router } from 'express';
import { 
  getAllDestinations, 
  getDestinationById, 
  createDestination, 
  updateDestination, 
  deleteDestination 
} from './Controller/destination.controller.js';
import { 
  addDestinationSchema, 
  updateDestinationSchema 
} from '../Validations/destination.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();

// הגדרת מידלוורים לתיקוף גוף הבקשה
const validateAddDestination = validateBody(addDestinationSchema);
const validateUpdateDestination = validateBody(updateDestinationSchema);

// נתיבי הראוטר
router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);
router.post('/', validateAddDestination, createDestination);
router.put('/:id', validateUpdateDestination, updateDestination);
router.delete('/:id', deleteDestination);

export default router;
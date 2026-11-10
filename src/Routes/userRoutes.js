import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  signUp, 
  signIn, 
  updateUser, 
  updatePassword, 
  deleteUser 
} from './Controller/user.controller.js';
import { 
  signInSchema, 
  registerSchema, 
  updateUserSchema, 
  updatePasswordSchema 
} from '../Validations/user.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();

// הגדרת מידלוורים לתיקוף לפי הסכמות שלך
const validateRegister = validateBody(registerSchema);
const validateSignIn = validateBody(signInSchema);
const validateUpdateUser = validateBody(updateUserSchema);
const validateUpdatePassword = validateBody(updatePasswordSchema);

// נתיבי התחברות והרשמה
router.post('/register', validateRegister, signUp);
router.post('/login', validateSignIn, signIn);

// נתיבי ניהול משתמשים
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateUpdateUser, updateUser);
router.patch('/:id/password', validateUpdatePassword, updatePassword);
router.delete('/:id', deleteUser);

export default router;
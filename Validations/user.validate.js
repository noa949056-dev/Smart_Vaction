import Joi from 'joi';

// התחברות (Sign In)
export const signInSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// הרשמה (Register / Sign Up)
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'הסיסמאות אינן תואמות'
  }),
  address: Joi.string().required(),
  phone: Joi.string().required()
});

// עדכון סיסמה בלבד
export const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'הסיסמאות אינן תואמות'
  })
});

// עדכון פרטי משתמש (ללא סיסמה)
export const updateUserSchema = Joi.object({
  username: Joi.string(),
  address: Joi.string(),
  phone: Joi.string()
}).min(1);
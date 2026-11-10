import Joi from "joi";

// יצירת / הרשמת משתמש חדש
export const createUserSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    role: Joi.string().valid('customer', 'admin').default('customer')
});

// עדכון משתמש
export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string(),
    role: Joi.string().valid('customer', 'admin')
});
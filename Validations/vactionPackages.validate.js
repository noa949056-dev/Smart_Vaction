import Joi from "joi";

export const vacationPackageSchema = Joi.object({
    hotelId: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(), // תאריך סיום חייב להיות אחרי תאריך התחלה
    maxOccupancy: Joi.object({
        maxAdults: Joi.number().integer().positive().required(),
        maxChildren: Joi.number().integer().min(0).required()
    }).required(),
    boardBasis: Joi.string().valid('הכל כלול', 'חצי פנסיון', 'לינה וארוחת בוקר', 'ללא ארוחות').required(),
    totalPrice: Joi.number().positive().required(),
    discountPercentage: Joi.number().min(0).max(100).default(0),
    isAvailable: Joi.boolean().default(true)
});

export const updateVacationPackageSchema = Joi.object({
    hotelId: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    maxOccupancy: Joi.object({
        maxAdults: Joi.number().integer().positive(),
        maxChildren: Joi.number().integer().min(0)
    }),
    boardBasis: Joi.string().valid('הכל כלול', 'חצי פנסיון', 'לינה וארוחת בוקר', 'ללא ארוחות'),
    totalPrice: Joi.number().positive(),
    discountPercentage: Joi.number().min(0).max(100),
    isAvailable: Joi.boolean()
});
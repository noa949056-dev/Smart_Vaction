import Joi from "joi";

export const AddBookingSchema = Joi.object({
    userId: Joi.string().required(),
    packageId: Joi.string().required(),
    guestsDetails: Joi.array().items(
        Joi.object({
            fullName: Joi.string().required(),
            idNumber: Joi.string().required(),
            age: Joi.number().integer().min(0).required()
        })
    ).min(1).required(),
    totalAmountPaid: Joi.number().positive().required(),
    paymentStatus: Joi.string().valid('paid', 'pending', 'cancelled').default('pending'),
    specialRequests: Joi.string().allow("", null)
});

export const updateBookingSchema = Joi.object({
    guestsDetails: Joi.array().items(
        Joi.object({
            fullName: Joi.string(),
            idNumber: Joi.string(),
            age: Joi.number().integer().min(0)
        })
    ),
    totalAmountPaid: Joi.number().positive(),
    paymentStatus: Joi.string().valid('paid', 'pending', 'cancelled'),
    specialRequests: Joi.string().allow("", null)
});
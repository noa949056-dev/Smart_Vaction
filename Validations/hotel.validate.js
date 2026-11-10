import Joi from "joi";

export const hotelSchema = Joi.object({
    destinationId: Joi.string().required(), // ObjectId as string
    name: Joi.string().required(),
    starRating: Joi.number().min(1).max(5).required(),
    address: Joi.string().required(),
    amenities: Joi.array().items(Joi.string()),
    basePricePerNight: Joi.number().positive().required(),
    contactPhone: Joi.string().required()
});

export const updateHotelSchema = Joi.object({
    destinationId: Joi.string(),
    name: Joi.string(),
    starRating: Joi.number().min(1).max(5),
    address: Joi.string(),
    amenities: Joi.array().items(Joi.string()),
    basePricePerNight: Joi.number().positive(),
    contactPhone: Joi.string()
});
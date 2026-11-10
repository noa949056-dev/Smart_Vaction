import Joi from "joi";

export const addDestinationSchema = Joi.object({
    regionName: Joi.string().required(),
    cityName: Joi.string().required(),
    country: Joi.string().required(),
    description: Joi.string().allow("", null),
    imageUrl: Joi.string().uri().allow("", null)
});

export const updateDestinationSchema = Joi.object({
    regionName: Joi.string(),
    cityName: Joi.string(),
    country: Joi.string(),
    description: Joi.string().allow("", null),
    imageUrl: Joi.string().uri().allow("", null)
});
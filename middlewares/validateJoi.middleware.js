
export const validateBody = (schema) => {

    const mdl=async (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            
            return res.status(409).json(error);
        }
        else
        {
           req.body = value;
           next();
        }
        
    };
    return mdl;
};

export const errorHandler = (err, req, res, next) => {

    const {message ="" ,status=500,type="server Error"} = err;

    return res.status(status).json({error: {message, status, type}});
    
};
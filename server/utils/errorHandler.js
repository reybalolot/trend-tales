const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    const errorMessage = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: error.code || 'SERVER_ERROR',
            details: error.details || null
        }
    });
};

export default errorHandler;

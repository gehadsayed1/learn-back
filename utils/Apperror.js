class AppError extends Error {
    constructor() {
        super();
        

        Error.captureStackTrace(this, this.constructor);
    }
    create( message , statusCode , statusText){
        this.message = message || 'An error occurred';
        this.statusCode = statusCode || 500;
        this.statusText = statusText || 'error';
        return this;
       
    }
}

module.exports = new AppError();


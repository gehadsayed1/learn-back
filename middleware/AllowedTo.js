const Apperror = require("../utils/Apperror");
const { ERROR } = require("../utils/httpStatusText");

module.exports = (...roles) => {    
    return (req, res, next) => {

        

        if (!roles.includes(req.currentUser.role)) {
            return next(Apperror.create("this role is not authorized", 401, ERROR));
        }
        next();
    }
}



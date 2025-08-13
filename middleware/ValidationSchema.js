const { body } = require("express-validator");
const validationSchema = ()=>{
    return [body("price").notEmpty(), body("name").notEmpty()];
}


module.exports = {
    validationSchema
}
const { body } = require("express-validator");
const validtionSckema = ()=>{
    return [body("price").notEmpty(), body("name").notEmpty()];
}


module.exports ={
    validtionSckema
}
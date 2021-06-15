const { validationResult } = require('express-validator');


const validateCampos = (req,res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            msg:"te hace falta algun campo"            
        })
    }
    next();
}

module.exports = {
    validateCampos
}

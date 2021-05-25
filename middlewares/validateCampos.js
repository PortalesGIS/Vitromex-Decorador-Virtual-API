const { validationResult } = require('express-validator');


const validateCampos = (req,res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            ok:false,
            error,            
        })
    }
    next();
}

module.exports = {
    validateCampos
}

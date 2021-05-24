const User = require('../models/user')


const emailExist = async (email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error("Email ya registrado")
    }
}

module.exports = {
    emailExist,
}
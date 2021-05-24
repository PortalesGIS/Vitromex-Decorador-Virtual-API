const User = require('../models/user')


const emailExist = async (email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error("Email ya registrado")
    }
}

const exitUserById =async ( id ) => {
    const exist = await User.findById(id);
    if(!exist){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    emailExist,
    exitUserById
}
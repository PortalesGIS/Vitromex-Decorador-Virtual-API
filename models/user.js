


const {Schema, model } = require('mongoose');


const UserSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    lastName:{
        type: 'string',
        require:[true,"El apellido es requerido"]
    },
    email:{
        type: 'string',
        require:[true,"El correo es requerido"],
        unique: true
    },
    password:{
        type: 'string',
        require:[true,"la contraseña es requerida"]
    },
    img:{
        type: 'string',
    },
    country:{
        type: 'string',
    },
    city:{
        type: 'string',
    },
    state:{
        type:Boolean,
        default:true
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user;

}

module.exports = model("User",UserSchema);
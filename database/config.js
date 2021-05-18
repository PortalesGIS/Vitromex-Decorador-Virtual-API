const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log("DB online ok")
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la DB")
    }
}

module.exports = {
    dbConnection
}
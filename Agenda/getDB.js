const cron = require('node-cron');
const fetch = require('node-fetch');
const Product = require('../models/product')
const Favorite = require('../models/favorite')
const Counter = require('../models/counter')
const getDB = cron.schedule('* * * * * 5', () => {
    // ActualizarDB();
  });


  const ActualizarDB = async() => {
      console.log("empieza a actualizar la DB");
      fetch("http://localhost:8080/api/test/db",{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) =>res.json())
        .then(async(response)=>{
            //   console.log(response.db.result.P_InfoProductos_RowSet)
            const productsOracle = filterData(response.db.result.P_InfoProductos_RowSet);
            //   console.log(productsOracle[0])
           await productsOracle.forEach(async (element,index) => {
              const exist = await existProduct(element.CODIGO_ITEM)
              if(!exist){
                  console.log("agregado")
                  const format = getFormat(element)
                  const prod = new Product({...format});
                  const pr = await prod.save()
                  console.log(pr._id)
                  const fav = new Favorite({_id:pr.id,total:0,dates:[]})
                  await fav.save();
                  const count = new Counter({_id:pr.id,total:0})
                  await count.save();
          }
          else{                                
          }
          });
      }).catch(err =>console.log(err))
      console.log("fin")
  }
  
  const existProduct= async(id)=>{
    const exist = await Product.findOne({idFromOracle:id})
    if(exist)
        return true;
    else return false;
  }

  const filterData = (data)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element.CODIGO_ITEM) === -1){
              arrValid.push(element.CODIGO_ITEM)
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }

  const getFormat = (elem)=>{
    return {
        dateCreated:new Date().toISOString().slice(0,10),
        idFromOracle:elem.CODIGO_ITEM,
        available:true, //cambiar
        name:elem.DESCRIPTION,
        albedo:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/albedo_3.jpg?alt=media&token=05b80b17-3d4d-4e46-8d7e-224b68c3ed12",
        normal:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/normal_3.jpg?alt=media&token=ac615096-5f08-4433-9bf5-e0d85cdbb034",
        roughness:"",
        smallPicture:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/miniatura.png?alt=media&token=3687227f-dcbb-498f-a67e-8934df698261",
        sized:elem.FORMATO,
        isNewProduct:true,//:TODO dfsd
        family:elem.FAMILIA,
        branding:elem.DESC_MARCA,
        textureWidth:0,
        textureHeight:0,
        color:elem.COLOR,
        finish:elem.DESC_BRILLO,
        typologies:elem.TIPOLOGIA,
        aplications:[],
        renders:[
          "https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/renders%2FImagen1-panda.jpg?alt=media&token=21f92da2-512b-441b-86d0-cf5a8c10bd08",
          "https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/renders%2FImagen1-panda.jpg?alt=media&token=21f92da2-512b-441b-86d0-cf5a8c10bd08",
          "https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/renders%2FImagen1-panda.jpg?alt=media&token=21f92da2-512b-441b-86d0-cf5a8c10bd08",
        ]
    }
  }


module.exports ={
    getDB,
    ActualizarDB
}
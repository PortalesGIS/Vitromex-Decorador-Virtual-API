const cron = require('node-cron');
const fetch = require('node-fetch');
const Product = require('../models/product')
const Favorite = require('../models/favorite')
const Counter = require('../models/counter')
const Serie = require('../models/serie')
const Typologies = require('../models/typologies')
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
            const productsOracle = filterDataNotDuplicate(response.db.result.P_InfoProductos_RowSet);

            const productsOracleSeries = filterDataNotDuplicateSeries(response.db.result.P_InfoProductos_RowSet);
            await addSeries(productsOracleSeries);

            const productsOracleTypologies = filterDataNotDuplicateTypologies(response.db.result.P_InfoProductos_RowSet);
            await addTypologies(productsOracleTypologies);

           await productsOracle.forEach(async (element) => {
              existProduct(element.CODIGO_ITEM, async (exist)=>{
                if(!exist){
                  const format = getFormat(element)
                  const prod = new Product({...format});
                  const pr = await prod.save()
                  console.log(`agregado: ${pr._id}`)
                  const fav = new Favorite({_id:pr.id,
                    total:0,dates:[],
                    platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
                  })
                  await fav.save();
                  const count = new Counter({_id:pr.id,
                    total:0,dates:[],
                    platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
                  })
                  await count.save();
          }
          else{                                
          }
              })
              });
      }).catch(err =>console.log(err))
      console.log("fin")
  }
  
  const existProduct= async(id, callback)=>{
    const exist = await Product.findOne({idFromOracle:id})
    if(exist)
    callback(true) ;
    else  callback(false);
  }

  const filterDataNotDuplicate = (data)=>{
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

  const filterDataNotDuplicateSeries = (data)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element.SERIE) === -1){
              arrValid.push(element.SERIE)
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }

  const filterDataNotDuplicateTypologies = (data)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element.DESC_TIPOLOGIA) === -1){
              arrValid.push(element.DESC_TIPOLOGIA)
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }


  const getFormat = (elem)=>{
    const arr = elem.DESCRIPTION.split(" ")
    const end = arr.findIndex(el=>el==="CM")
    let name="";
    for (let index = 1; index < end-1; index++) {
        name += arr[index]+" "
    }
    return {
        dateCreated:new Date().toISOString().slice(0,10),
        idFromOracle:elem.CODIGO_ITEM,
        available:true, //cambiar
        description:elem.DESCRIPTION,
        name:name.trim(),
        albedo:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/albedo_3.jpg?alt=media&token=05b80b17-3d4d-4e46-8d7e-224b68c3ed12",
        normal:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/normal_3.jpg?alt=media&token=ac615096-5f08-4433-9bf5-e0d85cdbb034",
        roughness:(elem.BRILLO ==="BR")?'1':'0',
        smallPicture:"https://random.imagecdn.app/300/300",        
        sized:elem.FORMATO,
        isNewProduct:true,//:TODO dfsd
        family:elem.FAMILIA,
        branding:elem.DESC_MARCA,
        textureWidth:0,
        textureHeight:0,
        serie:elem.SERIE,
        color:elem.COLOR,
        finish:elem.DESC_BRILLO,
        typologies:elem.DESC_TIPOLOGIA,
        pzasXpallet:elem.PZASXPALLET,
        aplications:[],
        renders:[
          "https://random.imagecdn.app/872/518",
          "https://random.imagecdn.app/872/520",
          "https://random.imagecdn.app/872/515",
        ]
    }
  }

  const addSeries =async (elements) => {
    elements.forEach(async (element) => {
      const exist =await Serie.findOne({name:element.SERIE})
      if(!exist){
        const serie = new Serie({
          name:element.SERIE,
          typologie:element.DESC_TIPOLOGIA,
          platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
          img:"https://random.imagecdn.app/300/300",
          render:"https://random.imagecdn.app/870/520",
          dateCreated:new Date().toISOString().slice(0,10)
        })
        await  serie.save()
        console.log(`Serie guardada: ${element.SERIE}`)
      }      
    })
  }

  const addTypologies =async (elements) => {
    elements.forEach(async (element) => {
      const exist =await Typologies.findOne({name:element.DESC_TIPOLOGIA})
      if(!exist){
        const typologie = new Typologies({
          name:element.DESC_TIPOLOGIA,
          platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
          img:"https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/typologies%2Ftipologia.png?alt=media&token=e5057344-040d-46e0-a0f2-776768e8ea14",          
          dateCreated:new Date().toISOString().slice(0,10)
        })
        await  typologie.save()
        console.log(`typologia guardada: ${element.DESC_TIPOLOGIA}`)
      }      
    })
  }

module.exports ={
    getDB,
    ActualizarDB
}
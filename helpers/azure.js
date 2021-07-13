const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');

const uploadAzureImg = async (file,blob, callBack)=>{
    const blobservice =await azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
    fileName = uuidv4()+file.name.replace(/ /g, "")
    if(file.tempFilePath){
        blobservice.createBlockBlobFromLocalFile(`${blob}`,fileName,file.tempFilePath,{
            contentType: 'image/jpeg'
         },
    function(error, result, response) {
       if (!error) {
           const url=  blobservice.host.primaryHost + `${blob}`+"/"+ fileName
           callBack(url)
       }
       else
       console.log(error)
     })
    }
}

module.exports = {
    uploadAzureImg
}
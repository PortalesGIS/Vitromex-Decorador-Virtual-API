
# Vitromex-Arko Api (Node.js)

descripcion e instalaciones para correrlo en local y produccion 




## Authors

- [Angel Isai (developer)](https://github.com/AngelIsaiRB)
- [Inmersys](https://www.inmersys.com)


  
## Instalacion

Install my-project with npm

```bash
  git clone
  npm install
  nodemon app.js
  or
  node app.js 
```
    
## ENV guia 

el archivo cuenta con links y string que aran funcionar el API

`PORT` 
 puerto donde correra el API
 default: 8080

`MONGO_CNN`
cadena de conexion de mongo proporcionada por [Azure cosmos DB](https://docs.microsoft.com/es-es/azure/cosmos-db/connect-mongodb-account)

`SECRETKEY`
para firmar los JWT puede ser cualquier string

`AZURE_STORAGE_CONNECTION_STRING`
cadena de conexion para [azure Storage](https://experienceleague.adobe.com/docs/experience-platform/sources/ui-tutorials/create/cloud-storage/blob.html?lang=es) 

### Nombres de contenedores de imagenes

(Recomendado no cambiar)

`AZURE_BOLB_CONTAINER_NAME` = imagenes
`AZURE_BOLB_CONTAINER_NAME_RENDERS` = renders
`AZURE_BLOB_CONTAINER_SERIES` = series
`AZURE_BLOB_CONTAINER_APLICATIONS` = aplicaciones
`AZURE_BLOB_CONTAINER_TYPOLOGIAS` = typologias
  
## Ajustes en el codigo

por cuestiones de implementación algunos edpoints para hacer funcionar este api se necesitan sustituir dentro del Código 
estos son los siguientes:
- obtener productos de su DB (API REST) `/Agenda/getDB.js`
- obtener las tiendas de su DB (API REST) `/Agenda/getDB.js`
- validación de administradores (API REST) `/controllers/admin.js`
- servicio de Mail  `/controllers/auth.js`

Ejemplo (no funcional)
```
    // TODO: aqui modificar hacia donde apunta el link para obtener los productos de Oracle
    // solo cambiar el link 
    fetch("http://localhost:8080/api/test/db",{

    })
```
cambiar a 
```
fetch("http://servicioparaobtenerproductos.com/getproduc",{

    })
```

## API Reference

#### Get all items-Vitromex

```http
  GET /api/product/vitromex
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `` | `` |  |

response:

```
{
    "toalProductsInThisQuery": 177,
    "products": [
        {
            "available": true,
            "isNewProduct": true,
            "aplications": [
                "FACHADA",
                "MURO"
            ],
            "renders": [
                "https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/renders%2FImagen1-panda.jpg?alt=media&token=21f92da2-512b-441b-86d0-cf5a8c10bd08",
                "https://testimgvitro.blob.core.windows.net:443/renders/f6956eae-9caf-49d9-91f7-19993c8200ccdescargar.jpg",
                "https://testimgvitro.blob.core.windows.net:443/renders/7d5fc95c-e8c2-47e6-ab7c-0f93c61379e9descargar.jpg"
            ],
            "_id": "60f0f1793f2beccddb81f553",
            "dateCreated": "2021-07-16",
            "name": "MONET HAYA",
            "albedo": "https://testimgvitro.blob.core.windows.net:443/imagenes/b55c41f2-d45b-4f15-9948-30c78e9c7ba9VITROMEX_CADEREYTA_CAFE_36X36CM_BR_Albedo.jpg",
            "normal": "https://firebasestorage.googleapis.com/v0/b/test-analitycs-simulador.appspot.com/o/normal_3.jpg?alt=media&token=ac615096-5f08-4433-9bf5-e0d85cdbb034",
            "roughness": "",
            "smallPicture": "https://testimgvitro.blob.core.windows.net:443/imagenes/9078d241-cbb6-4bd0-8ff1-b7534c3c9e06descargar.jpg",
            "sized": "50X100",
            "family": "PISO",
            "branding": "VITROMEX",
            "textureWidth": 4,
            "textureHeight": 4,
            "serie": "MONET",
            "color": "HAYA",
            "finish": "MATE",
            "typologies": "MADERAS",
            "pzasXpallet": "42",
            "__v": 0
        },
    ]
}
```

# Despliegue a produccion

el servidor de produccion se plena utilizar una maquina virtual de Azure. 
para poder desplegar a este servidor se utilia GitLab 
realizar un push a `main` con cambios 
dentro de la maquina virtual realizar un pull a `main`
## confuguracion de nginx
el servidor ocupa `nginx` para desplegar realizar instalaciones y configuraciones
- cofiguraciones basicas de nginx 
- configurar el dominio

configuracion para aceptar archivos de mas de 1 MB

editar 

```bash
vi /etc/nginx/nginx.conf
```
(si no se puede editar dar permisos)
```bash
sudo chmod 777 nginx.conf
```

agregar en http lo siguinete
```bash
http {
client_max_body_size 100M;
.........
}
```

  


# Proyecto Angular/Java Spring - Docker / AWS (VPC,SG,RDS,EC2-Docker,ALB).

Despliegue de proyecto localmente con autenticación en AWS COGNITO.

## 1.- PROBANDO APIS

**Crear grupo de usuario en Cognito**

Se cargará un stack de cloudformation para la creacion de usuarios en cognito.

    cd cloudformation

Archivo: 4-z-cognito.json

Se enviará al correo electronico proporcionado, contraseñas temporales para los usuarios creados (un usuario admin y un usuario comun).


**Directorio con docker-compose.yml**

    cd aplicativo/

**Actualizar valores de variables de entorno en archivo docker-compose.yml**

userPoolId: Id de grupo de usuarios de Cognito (se obtiene del stack de cloud formation)
clientId: Id de cliente de aplicación que tendrá acceso al grupo de usuarios de cognito (se obtiene del stack de cloud formation)
AWS_ACCESS_KEY_ID: KEY_ID de IAM para interactuar con la nube de AWS. (Se crea en la consola AWS - Deshabilitar/Eliminar luego de usar)
AWS_SECRET_ACCESS_KEY: ACCESSS_KEY de IAM para interactuar con la nube de AWS. (Se crea en la consola AWS - Deshabilitar/Eliminar luego de usar)
aws_Region_Cognito: Region donde se creó la configuración de usuarios en cognito. 

**Actualizar region de Cognito en Monolito**

Se actualiza la region de cognito en el archivo App.java

**Creando imagenes docker**

    docker-compose build

**Levantando contenedores de imagenes**
 
    docker-compose up -d

**Ingresar a la bd (cliente mysql):**

    localhost:3310

**Revisando contenedores generados**
  
    docker-compose ps

**Ingresar a las apis (browser):**

http://localhost:8081/status/verificar
http://localhost:8081/v2/api-docs

 
## 2.- Iniciando proyecto angular


### Requiere:

 - nodejs > 10
 - angular
 - angular material

	https://tecadmin.net/install-angular-on-ubuntu/
	https://material.angular.io/guide/getting-started

- IDE: Visual Studio Code
	Extensiones:
	- Angular Language Service by Angular
	- Angular Snippets (Version 9) by John Papa

  

https://code.visualstudio.com/docs/?dv=linux64_deb

### Pasos:
**Directorio con proyecto Angular**

    cd aplicativo/angular

**Descargando dependencias**

    npm install

**Levantando Frontend en Servidor local**

    ng s

**Url de Despliegue**

http://localhost:4200


**Iniciar Sesión con los usuarios creados**
Se pedirá las contraseñas temporales para iniciar sesión por primera vez y solicitará el cambio de clave


## Basado en:

https://github.com/wjma90/taller-docker-swarm
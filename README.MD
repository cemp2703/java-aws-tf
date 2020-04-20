
# Proyecto Angular/Java Spring - Docker / AWS (VPC,SG,RDS,EC2-Docker,ALB).

Despliegue de proyecto localmente con autenticación en AWS COGNITO.

## 1.- PROBANDO APIS

**Crear grupo de usuario en Cognito**
Dentro del grupo de usuario crear 2 grupos (ADMIN y USER), cada grupo debe tener minimo 1 usuario creado y asignado.

**Directorio con docker-compose.yml**

    cd aplicativo/

**Actualizar valores de variables de entorno en archivo docker-compose.yml**

userPoolId: Id de grupo de usuarios de Cognito
clientId: Id de cliente de aplicación que tendrá acceso al grupo de usuarios de cognito
AWS_ACCESS_KEY_ID: KEY_ID de IAM para interactuar con la nube de AWS. (Deshabilitar/Eliminar luego de usar)
AWS_SECRET_ACCESS_KEY: ACCESSS_KEY de IAM para interactuar con la nube de AWS. (Deshabilitar/Eliminar luego de usar)

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



## Basado en:

https://github.com/wjma90/taller-docker-swarm

# Proyecto Angular/Java Spring - Dockerizado y Despliegue en nube AWS (VPC,SG,RDS,ECS / EC2-Docker,ALB,S3,Cloudfront,Cognito,IAM).

Despliegue de proyecto localmente con autenticación en AWS COGNITO.

## 1.- PROBANDO APIS

**Crear grupo de usuario en Cognito**

Se cargará un stack de cloudformation para la creacion de usuarios en cognito.

    cd cloudformation

Archivo: 4-z-cognito.json

Se enviará al correo electronico proporcionado, contraseñas temporales para los usuarios creados (un usuario admin y un usuario comun).

**Creando politica en IAM**
    
    cd cloudformation/IAM

Se actualiza el archivo policyCognito.json con el ARN del grupo de usuarios creados anteriormente.

Nos dirigimos a IAM en AWS y creamos una politica.
Actualizamos el ARN del pool de usuarios creados en cognito en el archivo policyCognito.json: 
Se elige la opción JSON y se pega el contenido del json de policyCognito.json
Se elige un nombre a la politica, se recomienda que el nombre empiece con guion bajo _
Creamos la politica.


**Creando usuario de IAM con los permisos para gestionar Cognito desde fuera de AWS**

 - Se crea un usuario para acceso programatico, por la consola aws.
 - Se asigna la politica creada anteriormente por consola AWS.
 - Se copia el AWS_ACCESS_KEY_ID y el AWS_SECRET_ACCESS_KEY del usuario.


**Actualizar valores de variables de entorno en archivo docker-compose.yml**

    cd aplicativo/

userPoolId: Id de grupo de usuarios de Cognito (se obtiene del stack de cloud formation)
clientId: Id de cliente de aplicación que tendrá acceso al grupo de usuarios de cognito (se obtiene del stack de cloud formation)
AWS_ACCESS_KEY_ID: KEY_ID de usuario IAM creado. (Deshabilitar/Eliminar luego de usar)
AWS_SECRET_ACCESS_KEY: ACCESSS_KEY de usuario IAM creado. (Deshabilitar/Eliminar luego de usar)
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


## 3- Subiendo a la nube

  

**Login en dockerhub**

    docker login
    
**Enviando imagenes a dockerhub**

    docker-compose push

**Directorio con CloudFormation (AWS)**

      cd cloudformation

**Cargando stacks de cloudformation en orden:**

 - 1-infraestructura.json
 - 2-security-groups.json
 - 3-a-bastion.json
 - 4-basedatos.json

**Carga de scripts de base de datos en RDS**

En una carpeta con los siguientes:

    cd aplicativo/basedatos/scripts

Se necesitará tener una llave .pem de la region en dicha carpeta.

copiando scrips DDL.sql y DML.sql a ec2-bastion

    scp -i "kp_cesar_virginia.pem" DDL.sql ec2-user@ec2-34-227-103-11.compute-1.amazonaws.com:/tmp

    scp -i "kp_cesar_virginia.pem" DML.sql ec2-user@ec2-34-227-103-11.compute-1.amazonaws.com:/tmp

Ingresando a bastion

    ssh -i "kp_cesar_ohio.pem" ec2-user@ec2-3-21-207-183.us-east-2.compute.amazonaws.com

Instalando mysql

    sudo yum install mysql -y

Ingresando a base de datos en RDS con el endpoint generado dimanicamente por cloudformation

    mysql -h demobd.c9eaxdedlyrv.us-east-2.rds.amazonaws.com -u root -p

Cargando los scripts en base de datos RDS

    source /tmp/DDL.sql
    source /tmp/DML.sql

**Actualizando valores de docker-compose.yml (7-monolito)**

Se actualizan los parametros de cognito que se generaron automaticamente.
Se realiza un commit y un push al repositorio remoto desde donde se descargará el archivo docker-compose.yml

**Cargando stacks de cloudformation en orden:**

 - 6-balanceador.json
 - 10-ecs.json

 NOTA:
 Como alternativa al archivo 10.-ecs.json para levantar el backend se puede correr el archivo 7-monolito.json. La diferencia es que se dejaria de usar ecs por ec2 con docker instalado.

 ## 4- Frontend local con Balanceador en la nube.

 **Ingresar al correo electronico al que se envió los password provicionales para los usuarios en cognito, solicitará cambiar contraseña a primera vez**

 **Probando url de balanceador**

     curl -i -X POST -H 'Content-type: application/json' -d '{"username": "admin","password":"12345678"}' http://mybalancercf-1830245007.us-east-1.elb.amazonaws.com/api/security/login

Se obtendrá una respuesta exitosa.

    HTTP/1.1 200 OK
    ...

 **Actualizar la variable HOST_BACKEND  para que apunte a la url del balanceador**

    cd aplicativo/angular/src/app/_shared/constants.ts

    export const HOST_BACKEND =`http://mybalancercf-1830245007.us-east-1.elb.amazonaws.com`

**Iniciar proyecto angular**

    cd aplicativo/angular

    ng s

## 5-Frontend local con APIGateway.

Crear API REST en AWS API Gateway importando el json de swagger con contenido de AWS ubicado en

    cd aplicativo/cloudformation

archivo: "RestApi Encuestas-prod-swagger-apigateway.json"

Acciones > Implementar API

Crear nueva etapa: prod

Se obtendrá una url de apigateway parecida a la siguiente:

    https://rk983uneh1.execute-api.us-east-1.amazonaws.com/prod

**Probando API con Curl**

    curl -i -X POST -H 'Content-type: application/json' -d '{"username": "admin","password":"12345678"}' https://rk983uneh1.execute-api.us-east-1.amazonaws.com/prod/api/security/login

Se obtendrá un response exitoso:

    HTTP/1.1 200 OK
    ...

**Probando localmente frontend con API en la nube**

    cd aplicativo/angular

    ng s

## 6- Subiendo Frontend a la nube (s3 + Cloudfront)

**Generando compilado del proyecto angular para despligue**

    cd aplicativo/angular

    ng build --prod

Se genera el directorio:
    aplicativo/angular/dist/service-bank-app

**Cargar stack de cloudformation (consola AWS) para creación de bucket de s3 y distribición de cloudfront**

    archivo: 9-cloudfront.json

subiendo: cloudfront y s3

**Configuración de bucket s3**

Ingresar a S3 (consola AWS) al bucket creado qe debe tener un nombre como:

    couldformation-s3-mys3frontendangular-12u5awkox35ko

Propiedades del bucket creado > Alojamiento de sitios webs estaticos > Usar este bucker para alojat un sitio web. 
Generará una web con protocolo http

**Cargar los archivos generados de angular de la carpeta service-bank-app al bucket de s3**

Opcion Cargar, arrastrar los archivos a la ventana. Dar en siguiente

Establecer permmisos.
Administrar servicios publicos > Conceder acceso de lectura publica a estos objetos. Siguiente.

Establecer prioridad. Estandar.Siguiente y cargar.


**Ingresar a cloudfront (consola aws)**

Seleccionar la distribución que tiene como origen (origin) el bucket anterior.
Fijarse que esté en estado Enabled, sino en todo caso habilitarlo.

Ingresar a la distribución, en la pestaña general se visualizará la url de la distribución (Domain Name) del tipo:

    d1avzlnzxanret.cloudfront.net



## Fuentes:

https://github.com/wjma90/taller-docker-swarm
https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
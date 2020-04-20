CREATE DATABASE IF NOT EXISTS demobd CHARACTER SET latin1 COLLATE latin1_swedish_ci;

USE demobd;

DROP TABLE IF EXISTS personas;

CREATE TABLE personas(
   	id INT(2) NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    edad INT(2) NULL,
    sexo CHAR NULL,
    profesion VARCHAR(20) NOT NULL,
    lugar_trabajo VARCHAR(30) NOT NULL,
    lenguaje_programacion VARCHAR(50) NOT NULL,
    INDEX (id),
    PRIMARY KEY (`id`)
) ENGINE=INNODB;
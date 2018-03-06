CREATE DATABASE  IF NOT EXISTS `controlgastos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `controlgastos`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: controlgastos
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit` (
  `idusuario` int(10) unsigned DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipooperacion` int(10) unsigned NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `aditionalinfo` varchar(500) DEFAULT NULL,
  KEY `fk_audit_tipooperacion_idx` (`tipooperacion`),
  CONSTRAINT `fk_audit_tipooperacion` FOREIGN KEY (`tipooperacion`) REFERENCES `audit_tipooperaciones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
INSERT INTO `audit` (`idusuario`, `fecha`, `tipooperacion`, `observacion`, `aditionalinfo`) VALUES (0,'2018-03-02 18:51:54',2,NULL,NULL),(0,'2018-03-02 18:56:35',2,'Email / Password no informado','joseluiseiguren@gmail.com'),(0,'2018-03-02 18:58:19',2,'Email / Password no informado','[object Object]'),(0,'2018-03-02 19:00:24',2,'{\"message\":\"Email / Password no informado\"}','{\"email\":\"joseluiseiguren@gmail.com\"}'),(0,'2018-03-02 19:05:38',2,'{\"message\":\"Email / Password no informado\"}','{\"email\":\"joseluiseiguren@gmail.com\"}'),(0,'2018-03-02 19:11:55',2,'{\"message\":\"Email / Password no informado\"}','{\"email\":\"joseluiseiguren@gmail.com\"}'),(1,'2018-03-02 19:18:06',1,'',''),(1,'2018-03-04 11:21:46',1,'',''),(1,'2018-03-04 12:33:00',1,'',''),(14,'2018-03-04 13:30:38',1,'',''),(14,'2018-03-04 13:46:40',1,'',''),(14,'2018-03-05 22:23:34',1,'','');
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_tipooperaciones`
--

DROP TABLE IF EXISTS `audit_tipooperaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_tipooperaciones` (
  `id` int(10) unsigned NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_tipooperaciones`
--

LOCK TABLES `audit_tipooperaciones` WRITE;
/*!40000 ALTER TABLE `audit_tipooperaciones` DISABLE KEYS */;
INSERT INTO `audit_tipooperaciones` (`id`, `descripcion`) VALUES (1,'Login Exitoso'),(2,'Login Denied');
/*!40000 ALTER TABLE `audit_tipooperaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conceptos`
--

DROP TABLE IF EXISTS `conceptos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conceptos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) unsigned NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `credito` tinyint(4) NOT NULL,
  `fechaalta` datetime NOT NULL,
  `idestado` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptos`
--

LOCK TABLES `conceptos` WRITE;
/*!40000 ALTER TABLE `conceptos` DISABLE KEYS */;
INSERT INTO `conceptos` (`id`, `idusuario`, `descripcion`, `credito`, `fechaalta`, `idestado`) VALUES (1,1,'Supermercado',0,'2018-02-13 00:00:00',0),(2,1,'Auto',0,'2018-02-13 00:00:00',0),(3,1,'Sueldo',1,'2018-02-13 00:00:00',0),(4,1,'Plazo Fijo',1,'2018-02-13 00:00:00',0),(5,1,'Salidas',0,'2018-02-13 00:00:00',0),(6,1,'Alquileres',0,'2018-02-13 00:00:00',0),(7,2,'Vacaciones',0,'2018-02-13 00:00:00',0),(8,2,'Coto',0,'2018-02-13 00:00:00',0),(9,1,'Moto',0,'2018-02-13 00:00:00',0),(10,1,'Perros',0,'2018-02-13 00:00:00',0),(11,1,'Viajes',0,'2018-02-18 11:58:05',0),(12,1,'Macetas',1,'2018-02-18 11:58:50',0),(13,1,'Muebles',0,'2018-02-18 12:31:30',0),(14,1,'aaaaarebnados2',0,'2018-02-18 12:48:23',0),(15,1,'Tecno',0,'2018-02-19 09:57:30',0),(16,1,'Abuela2',0,'2018-02-19 09:59:48',0),(17,1,'Coto',0,'2018-02-19 10:17:45',0),(18,1,'Ferreteria',0,'2018-02-19 10:20:00',0),(19,1,'Prueba',0,'2018-02-19 10:22:40',0),(20,1,'Nada',0,'2018-02-19 10:22:53',0),(21,1,'Gym',0,'2018-02-19 10:28:24',0),(22,1,'Notebook',0,'2018-02-19 10:29:47',0),(23,1,'Valijas',0,'2018-02-19 10:34:22',0),(24,1,'Baño',0,'2018-02-19 10:38:36',0),(25,1,'joseluis',0,'2018-02-19 11:09:23',0),(26,1,'Prueba2',0,'2018-02-19 11:10:10',0),(27,1,'heee',0,'2018-02-19 11:10:15',0),(28,1,'trebol',0,'2018-02-19 11:10:21',0),(29,1,'Bici',0,'2018-02-19 11:12:30',0),(30,1,'Hola',0,'2018-02-19 11:16:22',0),(31,1,'Ferreteria2',0,'2018-02-19 11:28:54',0),(32,1,'Estantes',0,'2018-02-19 11:29:12',0),(33,1,'Sabanas',0,'2018-02-19 11:45:13',0),(34,1,'Servilletas',0,'2018-02-19 11:47:43',0),(35,1,'Cargadotr',0,'2018-02-19 12:15:11',0),(36,1,'Cel',0,'2018-02-19 12:15:17',0),(37,1,'Sillas',0,'2018-02-19 12:29:13',0),(38,1,'Mesas',0,'2018-02-19 12:29:19',0),(39,6,'Auto',0,'2018-02-19 18:04:44',0),(52,1,'Asc',1,'2018-02-19 18:51:07',0),(53,1,'Arrugaw',1,'2018-02-19 18:52:22',0),(54,1,'Fuego',0,'2018-02-19 20:21:42',0),(55,1,'Www',0,'2018-02-21 17:41:54',0),(56,1,'Iuy',1,'2018-02-21 17:46:39',0),(57,1,'Mudebles',1,'2018-02-21 18:22:19',0),(58,1,'Olp',1,'2018-02-21 18:50:37',0),(59,1,'Uji',1,'2018-02-21 18:50:41',0),(60,1,'Wsd',1,'2018-02-21 18:50:49',0),(61,14,'Suedo',1,'2018-03-04 13:30:50',0),(62,14,'Supermercado',0,'2018-03-04 13:31:01',0),(63,14,'Perros',0,'2018-03-04 13:31:07',0),(64,14,'Viajes Work',0,'2018-03-04 13:31:20',0),(65,14,'Comida Work',0,'2018-03-04 13:31:27',0),(66,14,'Gym',0,'2018-03-04 13:31:35',0),(67,14,'Beauty',0,'2018-03-04 13:31:46',0),(68,14,'Salidas',0,'2018-03-04 13:31:58',0),(69,14,'Ahorro',1,'2018-03-04 13:32:31',0),(70,14,'Alquiler',0,'2018-03-04 13:35:30',0),(71,14,'Orange',0,'2018-03-04 13:35:56',0),(72,14,'Luz',0,'2018-03-04 13:36:10',0),(73,14,'Gas',0,'2018-03-04 13:36:12',0),(74,14,'Agua',0,'2018-03-04 13:36:15',0),(75,14,'Seguros',0,'2018-03-04 13:36:25',0);
/*!40000 ALTER TABLE `conceptos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diario`
--

DROP TABLE IF EXISTS `diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diario` (
  `idconcepto` int(11) unsigned NOT NULL,
  `fecha` datetime NOT NULL,
  `importe` decimal(12,2) NOT NULL,
  `fechaalta` datetime NOT NULL,
  PRIMARY KEY (`idconcepto`,`fecha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diario`
--

LOCK TABLES `diario` WRITE;
/*!40000 ALTER TABLE `diario` DISABLE KEYS */;
INSERT INTO `diario` (`idconcepto`, `fecha`, `importe`, `fechaalta`) VALUES (1,'2018-02-01 00:00:00',-100.00,'2018-02-01 00:00:00'),(1,'2018-02-15 00:00:00',0.00,'2018-02-15 09:49:50'),(2,'2018-02-01 00:00:00',-963.00,'2018-02-01 00:00:00'),(2,'2018-02-14 00:00:00',-850.00,'2018-02-14 15:45:36'),(2,'2018-02-15 00:00:00',0.00,'2018-02-15 13:30:32'),(2,'2018-02-16 00:00:00',-5866.60,'2018-02-16 09:37:59'),(2,'2018-02-19 00:00:00',-25.36,'2018-02-19 12:16:27'),(2,'2018-04-06 00:00:00',-850.00,'2018-02-23 08:01:40'),(2,'2018-04-07 00:00:00',-150.00,'2018-02-23 08:02:01'),(2,'2019-06-01 00:00:00',-100.00,'2018-02-16 11:59:08'),(3,'2018-02-01 00:00:00',25000.00,'2018-02-01 00:00:00'),(3,'2018-02-16 00:00:00',2000.00,'2018-02-16 21:32:01'),(3,'2018-06-09 00:00:00',30000.00,'2018-02-14 15:47:00'),(4,'1970-01-01 00:00:00',51.00,'2018-02-14 15:34:41'),(4,'2018-01-03 00:00:00',60.00,'2018-02-15 09:50:40'),(4,'2018-02-14 12:57:55',0.00,'2018-02-14 12:58:23'),(4,'2018-02-15 00:00:00',2000.00,'2018-02-15 08:49:21'),(4,'2018-02-16 00:00:00',8500.00,'2018-02-16 10:00:12'),(4,'2018-02-17 00:00:00',15000.36,'2018-02-17 10:14:56'),(4,'2018-02-28 23:00:00',500.00,'2018-02-14 14:57:23'),(4,'2018-03-01 00:00:00',50.00,'2018-02-14 15:09:47'),(4,'2018-03-01 23:00:00',50.00,'2018-02-14 15:10:23'),(4,'2018-03-02 23:00:00',50.00,'2018-02-14 15:11:48'),(4,'2018-03-03 23:00:00',51.00,'2018-02-14 15:30:27'),(4,'2018-03-07 23:00:00',51.00,'2018-02-14 15:31:26'),(4,'2018-03-08 23:00:00',51.00,'2018-02-14 15:32:00'),(4,'2018-03-09 23:00:00',51.00,'2018-02-14 15:32:39'),(4,'2018-03-10 23:00:00',51.00,'2018-02-14 15:33:35'),(4,'2018-03-12 00:00:00',51.00,'2018-02-14 15:36:04'),(4,'2018-04-03 22:00:00',51.00,'2018-02-14 15:26:38'),(4,'2018-05-01 00:00:00',51.00,'2018-02-14 15:37:04'),(4,'2018-05-31 00:00:00',51.00,'2018-02-14 15:37:33'),(4,'2018-06-01 00:00:00',50.00,'2018-02-14 15:45:49'),(4,'2019-02-01 00:00:00',2000.00,'2018-02-16 12:03:45'),(4,'2024-06-05 22:00:00',51.00,'2018-02-14 15:21:20'),(5,'2018-02-13 00:00:00',-100000.32,'2018-02-14 15:57:38'),(5,'2018-02-15 00:00:00',-3000.00,'2018-02-15 10:18:11'),(5,'2018-02-16 00:00:00',-85.69,'2018-02-16 10:02:17'),(5,'2018-06-02 00:00:00',-1000.00,'2018-02-14 15:46:05'),(6,'2018-01-03 00:00:00',-500.00,'2018-02-15 09:50:27'),(6,'2018-01-04 00:00:00',-452.01,'2018-02-16 21:28:46'),(6,'2018-02-14 12:46:12',-600.65,'2018-02-14 12:46:33'),(6,'2018-02-15 00:00:00',0.00,'2018-02-15 08:32:56'),(6,'2018-02-16 00:00:00',-8500.00,'2018-02-16 09:26:53'),(6,'2018-02-21 00:00:00',-7.41,'2018-02-21 17:30:24'),(6,'2018-03-09 23:00:00',-526.33,'2018-02-14 14:41:05'),(6,'2018-06-02 00:00:00',0.00,'2018-02-14 15:46:48'),(6,'2018-07-07 00:00:00',-950.00,'2018-02-16 13:28:58'),(7,'2018-02-01 00:00:00',12.00,'2018-02-01 00:00:00'),(7,'2018-02-14 00:00:00',-500.00,'2018-02-14 15:47:51'),(7,'2018-02-19 00:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-02-20 00:00:00',1.00,'2066-03-30 21:24:36'),(7,'2018-02-21 00:00:00',5.00,'2018-02-14 11:17:19'),(7,'2018-02-28 23:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-03-10 00:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-04-14 22:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-05-02 00:00:00',-85.33,'2018-02-14 15:48:22'),(8,'2018-05-01 00:00:00',-2000.00,'2018-02-14 15:48:13'),(8,'2018-05-04 00:00:00',50.00,'2018-02-14 15:48:40'),(8,'2018-08-22 00:00:00',-500.00,'2018-02-17 10:08:50'),(10,'2018-02-17 00:00:00',-54.25,'2018-02-17 10:14:29'),(16,'2018-02-19 00:00:00',0.45,'2018-02-19 20:20:56'),(16,'2018-02-21 00:00:00',-1500.00,'2018-02-21 17:30:04'),(16,'2018-02-22 00:00:00',-50.03,'2018-02-21 18:21:43'),(17,'2013-06-08 00:00:00',-152.33,'2018-03-02 18:17:38'),(17,'2018-02-19 00:00:00',-850.00,'2018-02-19 12:16:21'),(40,'2018-02-19 00:00:00',-50.00,'2018-02-19 18:26:51'),(52,'2018-02-22 00:00:00',4.56,'2018-02-22 14:29:48'),(53,'2018-02-01 00:00:00',50.00,'2018-02-21 17:05:24'),(53,'2018-02-19 00:00:00',500.00,'2018-02-19 20:22:05'),(53,'2018-05-12 00:00:00',5.63,'2018-02-21 18:21:52'),(61,'2018-03-01 00:00:00',3384.88,'2018-03-04 13:43:40'),(62,'2018-03-03 00:00:00',-31.00,'2018-03-04 13:44:13'),(62,'2018-03-05 00:00:00',-154.00,'2018-03-05 22:23:45'),(63,'2018-03-04 00:00:00',-50.00,'2018-03-04 14:12:57'),(65,'2018-03-05 00:00:00',-8.50,'2018-03-05 22:23:57'),(68,'2018-03-04 00:00:00',-4.50,'2018-03-05 22:24:43');
/*!40000 ALTER TABLE `diario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fechanacimiento` datetime NOT NULL,
  `fechaalta` datetime NOT NULL,
  `idestado` int(11) unsigned NOT NULL,
  `password` varchar(255) NOT NULL,
  `moneda` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `email`, `nombre`, `fechanacimiento`, `fechaalta`, `idestado`, `password`, `moneda`) VALUES (1,'joseluiseiguren@gmail.com','Jose Luis','1980-05-13 00:00:00','2018-02-10 13:00:02',0,'sha1$837ab1aa$1$eb10aa226ce37a7b1268be7729611ce0250d627f','$'),(2,'nada@nada.com','Flor','1986-12-27 00:00:00','2018-02-12 14:12:50',0,'sha1$2067a839$1$c4b4d740b624a96613b83c88149331687a82789f','$'),(3,'joseluiseiguren2@gmail.com','JosephL','1983-05-13 00:00:00','2018-02-19 13:11:44',0,'sha1$8d602c79$1$49a4af73e26d7087a53a8859c61398f48ec359f7','U$D'),(4,'joseluiseiguren3@gmail.com','Joseph','1980-05-13 00:00:00','2018-02-19 17:44:51',0,'sha1$517d056c$1$1c77eb70bb1352f58a3e1ac354626cf6c7365363','$'),(5,'joseluiseiguren4@gmail.com','Joseph','1980-05-13 00:00:00','2018-02-19 17:45:02',0,'sha1$f045fcd0$1$9ffb2b6d788c24ce30b0850199c2659305f0d6b0','$'),(6,'josheneixe@gmail.com','Jose Luis','1980-05-13 00:00:00','2018-02-19 18:03:47',0,'sha1$a01b51f3$1$8b8d07cebed2afa6fb1d43259f94e63f238f37e1','1'),(7,'pepe@gmail.com','Jose Luis','1980-05-13 00:00:00','2018-02-19 18:10:05',0,'sha1$1c4690e3$1$dcf023e71e3730734ff917de8606ad3f60c23e16','1'),(8,'aaa@gmail.com','Pedro','2000-08-12 00:00:00','2018-02-19 18:24:46',0,'sha1$c3198e01$1$0d973cd4bfb84cc8bfb7bb626ae757d79f129bfc','€'),(9,'bbb@gmail.com','Alejandro','1985-02-01 00:00:00','2018-02-19 18:26:16',0,'sha1$7d8028e2$1$2cf3591285b05183af623a597460b4d6a482f4ed','U$D'),(10,'josheneixe4@gmail.com','321','1980-05-13 00:00:00','2018-02-21 15:49:56',0,'sha1$09251dea$1$d2c3f7640c8b512681a668d025efa37234703389','$'),(11,'josheneixe9@gmail.com','231','1980-05-13 00:00:00','2018-02-21 16:10:05',0,'sha1$a514a0d4$1$2c10a42dc958bdc550730ce7c7efa52aba5c8fa0','$'),(12,'josheneixe50@gmail.com','897','1980-05-13 00:00:00','2018-02-21 18:27:43',0,'sha1$d997e9fd$1$68741825e533dbacb312041fc28e022e34c391b6','$'),(13,'josheneixe99@gmail.com','321','1980-05-13 00:00:00','2018-02-21 18:57:09',0,'sha1$b1be0f4a$1$7efe6d30bfab6d74666c0dd18b2eb0cb4cdd6bcd','$'),(14,'flopyglorias@gmail.com','Flor','1986-12-27 00:00:00','2018-03-04 13:30:31',0,'sha1$0aba42ea$1$ffb674911b122a75a8721d1bd47c54a28670acb5','€');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-06 21:03:30

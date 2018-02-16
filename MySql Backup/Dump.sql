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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptos`
--

LOCK TABLES `conceptos` WRITE;
/*!40000 ALTER TABLE `conceptos` DISABLE KEYS */;
INSERT INTO `conceptos` VALUES (1,1,'Supermercado',0,'2018-02-13 00:00:00',0),(2,1,'Auto',0,'2018-02-13 00:00:00',0),(3,1,'Sueldo',1,'2018-02-13 00:00:00',0),(4,1,'Plazo Fijo',1,'2018-02-13 00:00:00',0),(5,1,'Salidas',0,'2018-02-13 00:00:00',0),(6,1,'Alquiler',0,'2018-02-13 00:00:00',0),(7,2,'Vacaciones',0,'2018-02-13 00:00:00',0),(8,2,'Coto',0,'2018-02-13 00:00:00',0);
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
INSERT INTO `diario` VALUES (1,'2018-02-01 00:00:00',-100.00,'2018-02-01 00:00:00'),(1,'2018-02-15 00:00:00',0.00,'2018-02-15 09:49:50'),(2,'2018-02-01 00:00:00',-963.00,'2018-02-01 00:00:00'),(2,'2018-02-14 00:00:00',-850.00,'2018-02-14 15:45:36'),(2,'2018-02-15 00:00:00',0.00,'2018-02-15 13:30:32'),(2,'2018-02-16 00:00:00',-5866.60,'2018-02-16 09:37:59'),(2,'2019-06-01 00:00:00',-100.00,'2018-02-16 11:59:08'),(3,'2018-02-01 00:00:00',25000.00,'2018-02-01 00:00:00'),(3,'2018-06-09 00:00:00',30000.00,'2018-02-14 15:47:00'),(4,'1970-01-01 00:00:00',51.00,'2018-02-14 15:34:41'),(4,'2018-01-03 00:00:00',60.00,'2018-02-15 09:50:40'),(4,'2018-02-14 12:57:55',0.00,'2018-02-14 12:58:23'),(4,'2018-02-15 00:00:00',2000.00,'2018-02-15 08:49:21'),(4,'2018-02-16 00:00:00',8500.00,'2018-02-16 10:00:12'),(4,'2018-02-28 23:00:00',500.00,'2018-02-14 14:57:23'),(4,'2018-03-01 00:00:00',50.00,'2018-02-14 15:09:47'),(4,'2018-03-01 23:00:00',50.00,'2018-02-14 15:10:23'),(4,'2018-03-02 23:00:00',50.00,'2018-02-14 15:11:48'),(4,'2018-03-03 23:00:00',51.00,'2018-02-14 15:30:27'),(4,'2018-03-07 23:00:00',51.00,'2018-02-14 15:31:26'),(4,'2018-03-08 23:00:00',51.00,'2018-02-14 15:32:00'),(4,'2018-03-09 23:00:00',51.00,'2018-02-14 15:32:39'),(4,'2018-03-10 23:00:00',51.00,'2018-02-14 15:33:35'),(4,'2018-03-12 00:00:00',51.00,'2018-02-14 15:36:04'),(4,'2018-04-03 22:00:00',51.00,'2018-02-14 15:26:38'),(4,'2018-05-01 00:00:00',51.00,'2018-02-14 15:37:04'),(4,'2018-05-31 00:00:00',51.00,'2018-02-14 15:37:33'),(4,'2018-06-01 00:00:00',50.00,'2018-02-14 15:45:49'),(4,'2019-02-01 00:00:00',2000.00,'2018-02-16 12:03:45'),(4,'2024-06-05 22:00:00',51.00,'2018-02-14 15:21:20'),(5,'2018-02-13 00:00:00',-100000.32,'2018-02-14 15:57:38'),(5,'2018-02-15 00:00:00',-3000.00,'2018-02-15 10:18:11'),(5,'2018-02-16 00:00:00',-85.69,'2018-02-16 10:02:17'),(5,'2018-06-02 00:00:00',-1000.00,'2018-02-14 15:46:05'),(6,'2018-01-03 00:00:00',-500.00,'2018-02-15 09:50:27'),(6,'2018-02-14 12:46:12',-600.65,'2018-02-14 12:46:33'),(6,'2018-02-15 00:00:00',0.00,'2018-02-15 08:32:56'),(6,'2018-02-16 00:00:00',-8500.00,'2018-02-16 09:26:53'),(6,'2018-03-09 23:00:00',-526.33,'2018-02-14 14:41:05'),(6,'2018-06-02 00:00:00',0.00,'2018-02-14 15:46:48'),(6,'2018-07-07 00:00:00',-950.00,'2018-02-16 13:28:58'),(7,'2018-02-01 00:00:00',12.00,'2018-02-01 00:00:00'),(7,'2018-02-14 00:00:00',-500.00,'2018-02-14 15:47:51'),(7,'2018-02-19 00:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-02-20 00:00:00',1.00,'2066-03-30 21:24:36'),(7,'2018-02-21 00:00:00',5.00,'2018-02-14 11:17:19'),(7,'2018-02-28 23:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-03-10 00:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-04-14 22:00:00',1.00,'2018-02-28 23:00:00'),(7,'2018-05-02 00:00:00',-85.33,'2018-02-14 15:48:22'),(8,'2018-05-01 00:00:00',-2000.00,'2018-02-14 15:48:13'),(8,'2018-05-04 00:00:00',50.00,'2018-02-14 15:48:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'joseluiseiguren@gmail.com','Jose Luis','1980-05-13 00:00:00','2018-02-10 13:00:02',0,'sha1$837ab1aa$1$eb10aa226ce37a7b1268be7729611ce0250d627f','€'),(2,'flopyglorias@gmail.com','Flor','1986-12-27 00:00:00','2018-02-12 14:12:50',0,'sha1$2067a839$1$c4b4d740b624a96613b83c88149331687a82789f','$');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'controlgastos'
--

--
-- Dumping routines for database 'controlgastos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-16 15:44:50

-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: projectdb_schema
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Table structure for table `User_detail`
--

DROP TABLE IF EXISTS `User_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_detail` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_username` varchar(90) DEFAULT NULL,
  `user_address` varchar(90) DEFAULT NULL,
  `user_phoneno` bigint(20) DEFAULT NULL,
  `user_password` varchar(90) DEFAULT NULL,
  `email_id` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (4,'SHREYAS','PANIGRAHI','skp','AUNDH',919096875035,'g','shreyaspanigrahi@gmail.com'),(37,'skp','Circle Area, Long Beach, CA, USA','2021 N Beverly Plaza, 2Long Beach,CA','2',0,'1','8.8'),(38,'ra','ra','hh','hsh',9090,'g','a@ja');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_detail`
--

DROP TABLE IF EXISTS `booking_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_detail` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `booking_id` varchar(100) NOT NULL,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `driverid` varchar(10) DEFAULT NULL,
  `drivername` varchar(100) NOT NULL,
  `eta` varchar(100) NOT NULL,
  `fare` varchar(100) NOT NULL,
  `driver_status1` int(11) NOT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_detail`
--

LOCK TABLES `booking_detail` WRITE;
/*!40000 ALTER TABLE `booking_detail` DISABLE KEYS */;
INSERT INTO `booking_detail` VALUES (5,'1','1','1','1','1','1','1','1',1),(13,'1','1','1','1','1','1','1','1',1),(26,'2','2','2','2','2','2','2','2',2),(35,'skp','97027','Circle Area, Long Beach, CA, USA','2021 N Beverly Plaza, 2Long Beach,CA','2','ramesh','3.4 mi','8.8',1);
/*!40000 ALTER TABLE `booking_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_detail1`
--

DROP TABLE IF EXISTS `booking_detail1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_detail1` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `username1` varchar(100) DEFAULT NULL,
  `booking_id` varchar(100) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `driverid` int(11) NOT NULL,
  `drivername` varchar(100) DEFAULT NULL,
  `eta` varchar(100) DEFAULT NULL,
  `fare` varchar(100) DEFAULT NULL,
  `driver_status1` int(11) DEFAULT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_detail1`
--

LOCK TABLES `booking_detail1` WRITE;
/*!40000 ALTER TABLE `booking_detail1` DISABLE KEYS */;
INSERT INTO `booking_detail1` VALUES (4,'skp','art',NULL,NULL,0,NULL,NULL,NULL,NULL),(13,'2','2',NULL,NULL,0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `booking_detail1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_detail`
--

DROP TABLE IF EXISTS `driver_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver_detail` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `driver_username` varchar(90) DEFAULT NULL,
  `driver_address` varchar(90) DEFAULT NULL,
  `driver_phoneno` bigint(20) DEFAULT NULL,
  `truck_make` varchar(90) DEFAULT NULL,
  `driver_licence` varchar(90) DEFAULT NULL,
  `car_plate` varchar(90) DEFAULT NULL,
  `email_id` varchar(90) DEFAULT NULL,
  `driver_password` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_detail`
--

LOCK TABLES `driver_detail` WRITE;
/*!40000 ALTER TABLE `driver_detail` DISABLE KEYS */;
INSERT INTO `driver_detail` VALUES (1,'k','k','k','k',0,'k','k','k','kk@a','k'),(2,'k','k','as','k',0,'k','k','k','k@as','k'),(3,'au','j','j','j',0,'j','jjjj','j','j@df','j'),(4,'kio','kk','hjk','nn',9000,'kk','kak','kkkk','a@add','w'),(5,'are','kdkdkl','o','mm',909,'dndn','dndn','d','a@d','o'),(6,'asgard','lasdt','ramesh','kakak',9090,'9888','kjhh','jj','a@455','r');
/*!40000 ALTER TABLE `driver_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_loc`
--

DROP TABLE IF EXISTS `driver_loc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver_loc` (
  `userd_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_lat` varchar(100) DEFAULT NULL,
  `driver_long` varchar(100) DEFAULT NULL,
  `driver_name` varchar(40) DEFAULT NULL,
  `driver_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`userd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_loc`
--

LOCK TABLES `driver_loc` WRITE;
/*!40000 ALTER TABLE `driver_loc` DISABLE KEYS */;
INSERT INTO `driver_loc` VALUES (1,'33.77313700','-118.20101400','suresh',0),(2,'33.77135300','-118.18734500','ramesh',0),(3,'33','-118','k',NULL);
/*!40000 ALTER TABLE `driver_loc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-01 14:37:31

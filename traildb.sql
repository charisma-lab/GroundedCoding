-- MySQL dump 10.15  Distrib 10.0.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: traildb
-- ------------------------------------------------------
-- Server version	10.0.38-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trail`
--

DROP TABLE IF EXISTS `trail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trail` (
  `trail_id` int(8) NOT NULL AUTO_INCREMENT,
  `recorder_name` varchar(20) NOT NULL,
  `trail_number` int(8) NOT NULL,
  `started_recording_on` datetime NOT NULL,
  `trail_notes` longtext,
  PRIMARY KEY (`trail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trail`
--

LOCK TABLES `trail` WRITE;
/*!40000 ALTER TABLE `trail` DISABLE KEYS */;
/*!40000 ALTER TABLE `trail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trail_action_log`
--

DROP TABLE IF EXISTS `trail_action_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trail_action_log` (
  `logid` int(8) NOT NULL AUTO_INCREMENT,
  `time_in_trail` decimal(5,2) NOT NULL,
  `trail_id` int(8) NOT NULL,
  `action` varchar(255) NOT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trail_action_log`
--

LOCK TABLES `trail_action_log` WRITE;
/*!40000 ALTER TABLE `trail_action_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `trail_action_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-30 15:35:41

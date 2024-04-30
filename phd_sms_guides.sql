-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: phd_sms
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `guides`
--

DROP TABLE IF EXISTS `guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guides` (
  `guide_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `college` varchar(300) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`guide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guides`
--

LOCK TABLES `guides` WRITE;
/*!40000 ALTER TABLE `guides` DISABLE KEYS */;
INSERT INTO `guides` VALUES (0,'N/A','N/A','N/A',NULL,NULL),(1,'C. Subhas','Professor','ECE, Sree Vidyanikethan Engineering College',NULL,NULL),(2,'D. Vishu Vardhan','Asst. Professor','ECE, JNTUACEA',NULL,NULL),(3,'S. Govinda Rajulu','Professor','ECE, Pulla Reddy Engineeirng College',NULL,NULL),(4,'M. L. Ravi Chandra','Asst. Professor','ECE, JNTUACEA',NULL,NULL),(5,'G. Mamatha','Asst. Professor','ECE, JNTUACEA',NULL,NULL),(6,'D.Neeraja','Professor','CIVIL,JNTUCEK',NULL,NULL),(7,'J. Guru Jawahar','Professor','CIVIL,AITS,Tirupathi',NULL,NULL),(8,'P. Sai  Chandana','Assoc. Professor','CIVIL,AITS,Kadapa',NULL,NULL),(9,'M. Sunandana Reddy','Asst. Professor','CIVIL,RGMCET,Nandhayl',NULL,NULL),(10,'E. Arunakanti','Professor','CIVIL,JNTUCEA',NULL,NULL),(11,'B.Eswara Reddy','Professor','CSE JNTUA','',''),(12,'P.Balachennaiah','Assoc Professor','EEE,JNTUA','',''),(13,'P.Sujatha','Professor','EEE,JNTUA','',''),(14,'V.VenuGopal Reddy','Professor','ME,JNTUA','',''),(15,'M.Ram Prasad Reddy','Professor','EEE,Pullaiah college of engineering and Technology Kurnool','',''),(16,'M.Siva Satya Narayana','Assoc Professor','EEE,Pullaiah college of engineering and Technology Kurnool','',''),(17,'P.Bala Chennaiah','Assoc Professor','EEE,AITS Rajampet Kadapa','',''),(18,'D.V. Ashok Kumar','Professor','EEE,RGMCET Nandyal','',''),(19,'J.Hari Prasad','Professor','Mech,SVEC Tirupathi','',''),(20,'B.Chandra Mohan Reddy','Assoc Professor','Mech,JNTUA','',''),(21,'B.Omprakash','Assoc Professor','Mech,JNTUA','',''),(22,'Shaik Mahaboob Basha','Professor','ECE,Geethanjali Institute of science & technology,Nellore','',''),(23,'A.Maheswara Rao','Professor','ECE,Geethanjali Institute of science & technology,Nellore','',''),(24,'K.Aparna','Asst.Professor','ECE,JNTUACEK,Chittoor','',''),(25,'G.Kishore Kumar','Assoc.Professor','CSE,RGM College of Engineering&Technology,Nandyala','',''),(26,'Dhanraj Cheelu ','Professor','Dr.K.V.Subba Reddy Institute of Technology,Kurnool','',''),(27,'P.Radhika Raju','Asst Professor','CSE,JNTUA CEA,Ananthapuramu','',''),(28,'A.Suresh Babu','Professor','CSE,JNTUA CEA,Ananthapuramu-515002','',''),(29,'B.Dilip Kumar','Professor','CHEM,JNTUA','',''),(30,'T.Bala Narsaiah','Professor','CHEM,JNTUA','',''),(31,'M.Padhma Lalitha','Professor','EEE,Annamacharya Institute of Technology and Sciences Rajampeta','',''),(32,'B.Sarvesh','Professor','EEE,JNTUA CEA','',''),(33,'A.Srinivasula Reddy','Professor','EEE,C.M.Reddy College of Engineerinh,Hyderabad','',''),(34,'H.Sudharsana Rao','Rector','JNTUA ,ANANTAPURAM','',''),(35,'P.Bhanu Murthy','Director of Evalution','JNTUA ,ANANTAPURAM','',''),(36,'Kumar.R.Rao','Professor','Civil Eng,Dayananda Sagar Institute of Management and Technology ,Banglore','',''),(37,'C.Sashidhar','Professor','JNTUA CEA','',''),(38,'K.Gopal Reddy','Assoc.Professor','Dept.of English,SSBN Degree&PG College Anantapuram','',''),(39,'V.B.Chitra','Asst.Proffesor','Depatment of Humanities,JNTUA College of Engineering Anantapuramu-515005','',''),(40,'Y.Padmananbha Reddy','Professor ','Raghavendra Institute of Pharmaceutical Education & Research Anantapur','',''),(41,'N.Devanna','Professor ','JNTUCEK','',''),(42,'G.B.Radhika ','Professor','CHEMICAL,Padmasri Dr.B.V.Raju Institute of ','',''),(43,'S.V.Sathyanarayana','Professor','JNTUA CEA,Anantapur','',''),(44,'N.Padmaja','Professor','ECE,Sree Vidyanikethan Engg.College,Tirupathi-517102','',''),(45,'V.Sumalatha','Co-ordinator,Academic & Planning','JNTUA  CEA Anantapur','',''),(46,'K.Suresh','Professor',' CSE Sree Vidyanikethan Engineering College A.Rangampet-517102','','');
/*!40000 ALTER TABLE `guides` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 15:34:27

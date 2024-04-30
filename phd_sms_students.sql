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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `admn_no` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mode` varchar(50) DEFAULT NULL,
  `year` int NOT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `guide_id` int DEFAULT NULL,
  `co_guide_id` int DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  `gender` varchar(10) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `research_topic` varchar(300) DEFAULT NULL,
  `qualification` varchar(300) DEFAULT NULL,
  `doa` date DEFAULT NULL,
  `fatherORhusband` varchar(255) DEFAULT NULL,
  `status` varchar(300) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admn_no`),
  KEY `guide_id` (`guide_id`),
  KEY `co_guide_id` (`co_guide_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`guide_id`),
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`co_guide_id`) REFERENCES `guides` (`guide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('14PH0101','Bollavaram Ajitha','PT',2008,'CIVIL',34,0,'9533666677','Assistant Professor Department of Civil Engineering JNTUA College of Engineering Ananthapuramu-515002','female','ST','A STUDY ON THE EFFECT AL2O3 NANO PARTICLES ON WORKABILITY STRENGTH & DURABILITY, CHARACTERISTICS OF HIGH STRENGTH CONCRETE','M.Tech','2015-04-20','Y.Jammanna','enrolled','ajitha123@gmail.com',NULL),('14PH0102','D.Satish','PT',2014,'CIVIL',35,36,'9886000035','\"# GB-89, 7th Cross, HAL Old Town Ship Vimanapura, Bangalore-560017\"','male','BC-C','TRAFFIC MANAGEMENT PLANING  AND STUDIES THROUGH INTEGRATED APPROACH','M.Tech','2015-04-20','D.Govind','enrolled','satishdeosur@gmail.com',NULL),('14PH0210','P.Malleswara Reddy','FT',2014,'EEE',33,32,'8985596640','D.No:97/200-4-31, Siva Sai Nagar Utukur-516003','male','OC','AN ADVANCED METHOD FOR EVALUATION AND IMPROVEMENT OF POWER QUALITY IN SMART GRID','M.Tech','2015-04-04','-','enrolled','mallesh.palla@gmail.com',NULL),('14PH0225',' Papugari Bhaskara Prasad','PT',2014,'EEE',31,32,'8185945663','\"D.No:8/606, Prakash Nagar Kadapa-516004\"','male','SC','MULTI LEVEL INVERTER TOPOLOGY FOR GRID CONNECTED RENEWABLE ENERGY SOURCES','M.Tech','2015-04-20','P.Chandrayudu','enrolled','bhaskara.papugari@gmail.com',NULL),('14PH0425 ','Adapala Rajani ','PT',2014,'ECE',44,45,'9440829317','\"H.No:13-3-344/11A, Jabbar Layout Near Head Post Office Tirupathi-517501\"','female','OC','IMAGE FUSION ALGORITHMS FOR MEDICAL APPLICATIONS','M.Tech','2015-04-20','-','enrolled','rajaniaitstpt@gmail.com',NULL),('14PH0604','P.L.V.N.Sai Chandra','PT',2014,'Chemical',42,43,'7769936677','Flat No:214, Sinhad Staff Quarters Ambegaon Block Pune-411041','male','OC','MODELING, OPTIMIZATION AND ADSORPTION STUDIEES OF VARIOUS METAL IONS USING NATURAL ADSORBENTS','M.Tech','2015-04-20','P.Shiva Kumar','enrolled','chandra_chem20@yahoo.co.in',NULL),('14PH1323','K.V.R.K.Teja','PT',2014,'Pharmacy',40,41,'8971233511','\"H.No:890, Ramraj Building,  Sri Ramanagar Colony Manikonda, Hyderabad-89\"','male','OC','ADVERSE DRUG REACTION MONITORING : SUPPORT FOR PHARMACOVIGILANCE AT A TERTIARY CARE HOSPITAL IN INDIA','M.Tech','2015-04-21','K.V.S.S.Gowrinath Sharma','enrolled','kvrktheja@gmail.com',NULL),('14PH1403','B.Kesava Reddy','PT',2014,'English',38,39,'9491831336','\"Lecturer in English SSBN Degree College Anantapur\"','male','OC','ENGLISH LANGUAGE TEACHING AT THE U.G. LEVEL(NON-PROFESSIONAL): AN EMPIRICAL STUDY','M.Tech','2020-04-20','Kesanna','enrolled','bkesavareddy2006@gmail.com',NULL),('18PH0406','Uppana Sudha Rani','PT',2018,'ECE',1,0,'8463948796','Flat No. 103, Asst Professors Quarters, JNTUA Kalikiri','Female','BC-D','N/A','M.Tech','2019-01-28','U. Venkata Ravi','enrolled',NULL,NULL),('18PH0407','P. Murali Krishna','PT',2018,'ECE',2,0,'9533985330','E2/227, Shilpa Lepakshi Nagar, Anantapur','Male','BC-B','N/A','M.Tech','2019-01-28','P. Narayanappa','enrolled',NULL,NULL),('18PH0408','N. P. Sharada Devi','PT',2018,'ECE',3,0,'9030528937','14.2.65, Kamannagatta Street, Uravakonda, Anantapur','Female','BC-B','N/A','M.Tech','2019-01-28','N. P. Subramanyam','enrolled',NULL,NULL),('18PH0410','N. Fouzia Sultana','PT',2018,'ECE',4,0,'9299450420','16-765, Nandalapadu, Tadipatri, Anantapur','Male','BC-E','N/A','M.Tech','2019-01-28','N. Akbar Saheb','enrolled',NULL,NULL),('18PH0411','P. Durga Devi','PT',2018,'ECE',5,0,'9810075896','3-9-27/1, Sarada Nagar, Ramnanthapur, Hyderabad','Female','OC','N/A','M.Tech','2019-01-28','P. Pullaiah Naidu','enrolled',NULL,NULL),('2000PH0101','Mekala Sravanthi','PT',2020,'CIVIL',37,0,'8074576155','-','female','OC','ASSESSEMENT OF HEALTH MONITORING SYSTEM FOR SELF-HEALING STRUCTURE BASED ON SMART AGGREGATE','M.Tech','2021-02-25','-','enrolled','-','ADF'),('2000PH0201','G.Pravallika','PT',2020,'EEE',13,0,'8886302095','-','female','OC','ELECTRIC VEHICLE CHARGING STATIONS FOR EFFICIENT POWER MANAGEMENT USING RENEWABLE ENERGY SOURCES','M.Tech','2021-02-25','-','enrolled','pravallikagandhaveeti@gmail.com','ADF'),('20PH0109','D.Krupanand','PT',2020,'CIVIL',6,0,'09700651627','81/5, Siri garden,Peddacherukuru,524002','male','SC','VIBRATION- BASED DAMAGE DIAGNOSTIC TECHNIQUES FOR BRIDGES','M.Tech','2020-09-16','D.Venkatesramwarulu','enrolled','dkanand106@gmail.com',''),('20PH0110','N.Avinash Kumar Reddy','PT',2020,'CIVIL',8,0,'9703850609','42/869,Mruthunjayakunta near APRTC Bus stand Kadapa-516002','male','OC','EFFECT OF PHOTOCATALYTIC  NANO TIO2 ON MECHANICAL AND SELF-CLEANING PROPERTIES OF CEMENT MORTARS ','M.Tech','2020-09-16','N.RajasekharReddy','enrolled','avinashce104@gmail.com',NULL),('20PH0111','Mareddy Arun Kumar','PT',2020,'CIVIL',7,0,'8500473704','11-1-180/5,Santhi Nagr 2nd Street,Kovur-524137,Nellore District','male','OC(EWS)','EXPERIMENTAL AND ANALYTICAL STUDY ON EXTERIOR BEAM-COLUMN JOINTS OF SPECIAL CONCRETES ','M.Tech','2020-09-16','M. Raghu Ram Reddy','enrolled','arun08104@gmail.com',NULL),('20PH0112','P Naveen','PT',2020,'CIVIL',9,0,'8790340510','4-402,16Th Cross sriKrishna Nagar,Tiruoathi-517502','male','OC(EWS)','MONITORING AND ANALYSIS OF URBAN GROWTH IN SMART CITIES THROUGH GEOGRAPHICAL INFORMATION SYSTEMS (GIS)','M.Tech','2020-09-16','P.Sambaiah','enrolled','naveenp126@gmail.com',NULL),('20PH0113','K.Dada Hayath','PT',2020,'CIVIL',10,0,'9032600526','Pamidi(v),Pamidi(M),Ananthapuramu','male','BC-E','ANALYSIS OF RCC STRUCTURAL ELEMENTS SUBJECTED TO BLAST LOAD USING ARTIFICIAL NEURAL NETWORKS ','M.Tech','2020-09-16','K.MD Rafi','enrolled','rajhayath@gmail.com',NULL),('20PH0201','D.Sreenadh Reddy','PT',2020,'EEE',15,0,'9642146765','5-60-2,Rajupalem Road,Iskapalem(v) Bachureddy Palem-524305 Nellore ','male','OC',' MODELING AND SIMULATION OF DC MICROGRIDS FOR ELECTRIC VEHICLE CHARGING STATIONS','M.Tech','2020-09-17','D.Indrasena Reddy','enrolled','d.sreenadhreddy@gmail.com',NULL),('20PH0202','K.Siva Sankar Reddy','PT',2020,'EEE',16,0,'9866872943','Plat No:5/123 E2,Near SBF,Muddnur YSR,Kadapa ','male','OC','APPLICATION OF META HEURISTIC ALGORITHMS FOR OPTIMAL POWER FLOW SOLUTIONS WITH RENEWABLE ENERGY SOURCES','M.Tech','2020-09-17','K.Reddapa Reddy','enrolled','reddy72943@gmail.com',NULL),('20PH0203','K Praveen Kumar Reddy','PT',2020,'EEE',12,0,'9703248829','5/123E2 near SB,Muddanur,YSR kadapa ','male','OC','MODELLING AND ANALYSIS OF DISTRIBUTED CONTROL APPROACH FOR ENERGY MANAGEMENT OF MICRO-GRIDS','M.Tech','2020-09-17','K.Raja Gopal Reddy','enrolled','praveenk0311@gmail.com',NULL),('20PH0204','Devaraju Kalyani','PT',2020,'EEE',13,0,'8106105741','8/177,Behind Sauthi Theatre,court Road ,Ananthapuramu','female','BC-A','ISLANDING DETECTION IN DISTRIBUTED GENERATION SYSTEMS BY USING DG RESIDENT TECHNIQUES','M.Tech','2020-09-17','D.Obulapathi','enrolled','pujarianjappa@gmail.com',NULL),('20PH0205','B.Sujatha','PT',2020,'EEE',18,0,'8142691516','D.No:G2,Satyam Towers,Satyam heights,Rajiv Gandhi Nagar,Bachupalli,Hyderabad-500090','female','OC','OPERATION AND CONTROL OF MICRO GRID ENERGY MANAGEMENT SYSTEM USING DIFFERENT OPTIMIZATION TECHNIQUES ','M.Tech','2020-09-17','B.Venkata Reddy','enrolled','sujathareddy4311@gmail.com',NULL),('20PH0301','R.Vishu Vardhan Reddy','PT',2020,'MECH',14,0,'8142195730','d.No-3-12-165,plot No:165','male','OC','MULTI-OBJECTIVE OPTIMIZATION OF MACHINING PARAMETERS IN NON-TRADITIONAL MACHINING PROCESS BY USING EVOLUTIONARY ALGORITHMS','M.Tech','2020-09-17','B.Bhaskar Reddy','enrolled','vishnureddy589@gmail.com',NULL),('20PH0302','S.Siva Kumar','PT',2020,'MECH',19,0,'9398619245','7/296,NarapureddyPalli,Rajampet,Kadapa-516126','male','BC-B','DEVELOPMENT AND CHARACTERIZATION OF TITIANIUM METAL MATRIX COMPOSITE FOR INDUSTRIAL APPLICATIONS','M.Tech','2020-09-16','S.Subba Rayudu','enrolled','sivasankars333@gmail.com',NULL),('20PH0303','N.P Lakshminarayana','PT',2020,'MECH',20,0,'9492657660','28-6-812-27,Omkar Vilas opp R.T.O office,Anntapuramu','male','BC-A','STRESS ANALYSIS OF TWO UNEQUAL CRACKS EMANATING FROM MULTIPLE COLLINEAR HOLES IN A SPECIALLY ORTHOTROPIC PLATE SUBJECTED TO VARIOUS TYPES OF LOADING','M.Tech','2020-09-16','N.Naganna','enrolled','laxmi512@gmail.com',NULL),('20PH0401','Allabaksh  Shaik','PT',2020,'ECE',22,0,'9441524367','20-3126B1-B,Near Kola Grand hotel,Leela Mahal circle,Tirupathi-517501','male','BC-E','A REAL-TIME LOW ALTITUDE ARIEL VIEW IMAGE STITCHING WITH STANDALONE DEVICES','M.Tech','2020-09-18','Karimulla','enrolled','baksh402@gmail.com',NULL),('20PH0402','Kuruva Lakshmanna','PT',2020,'ECE',23,0,'9177935064','1-105,velamakur DevanaKonda-518465,Kurnool(District)','male','BC-B','A LOCAL SHORT TERM MODEL FOR FORECASTING OF IONOSPHERIC SCINTILLATIONS USING MACHINE LEARNING ALGORITHMS','M.Tech','2020-09-18','K.Anjanappa','enrolled','lakshmanna05@gmail.com',NULL),('20PH0403','Kakumanu Gangabhavani','PT',2020,'ECE',24,0,'8309920085','26-754,vasanthapeta,Proddatur,Kadapa-Dist','female','SC','A NOISE ASSISTED DATA ANALYSIS METHOD BASED ON ENSEMBLE EMPIRICAL MODE DECOMPOSITION','M.Tech','2020-09-18','K.Govindu','enrolled','kgangabhavani66@gmail.com',NULL),('20PH0501','Komerollu R Harinath','PT',2020,'CSE',25,0,'9966458007','29-178-11-13,SBI colony,nandyala-518501,Kurnool  ','male','BC-A','INTRUSION DETECTION METHODS FOR ENCRYPTED PACKETS WITH MLIDS INTENDING META-HEURISTIC ALGORITHMS','M.Tech','2020-09-17','K.C.Venkateswarlu','enrolled','harirooba007@gmail.com',NULL),('20PH0502','Vemula Rohini','PT',2020,'CSE',26,1,'9700560566','27-1037,Ganesh Nagar,Kurnool-518002','female','BC-B','WIRELESS NETWORKS WITH MACHINE LEARNING','M.Tech','2020-09-17','V.Nagaraju','enrolled','vemula.rohinigoud@gmail.com',NULL),('20PH0504','Kamala Challa','PT',2020,'CSE',28,0,'9652192968','3-18,Komerupudi Sattenapalli,Guntur-522438','female','OC','MODELING AND ANALYSIS OF HIGHER-ORDER COMPLEX NETWORKS FOR BIG DATA','M.Tech','2020-09-17','Raghu Rami Reddy','enrolled','kamalachalla@gmail.com',NULL),('20PH0601','CH Venkata Krishnaiah','PT',2020,'CHEM',29,0,'9493463708','Turpukanupuru,Chilakuru,SPSR Nellore-524412','male','BC-D','SYNTHESIS, CHARACTERIZATION OF METAL, METAL OXIDE AND DOPED METAL OXIDES VIA GREEN ROUTES FOR CATALYTIC/CHEMICAL/ELECTROCHEMICAL APPLICATIONS','M.Tech','2020-09-16','CH.Subbaiah','enrolled','venkat08chem@gmail.com',NULL),('20PH0602','Gurramkonda Neha Mallika','PT',2020,'CHEM',30,0,'9032346676','Plat No.-507,Rajahamsa Royal Regency Apartment,Ist Road,Ananthapuramu-515001','female','SC','SYNTHESIS OF NANO CATALYSTS FOR WASTE WATER TREATMENT','M.Tech','2020-09-16','G.Venkata Ramana','enrolled','nehamallika860@gmail.com',NULL),('2100PH0101','M. Shyam Sundar','FT',2021,'CIVIL',37,0,'8686848443','-','male','OC','GREEN TECHNOLOGIES','M.Tech','2021-12-06','   M.Venkata Ramesh Babu','enrolled','muthamsettyshyamsundar@gmail.com','ADF'),('2100PH0301','Syed Sohail','FT',2021,'MECH',20,0,'9032392723','-','male','OC','3D PRINTING','M.Tech','2021-12-07','Syed Arif','enrolled','syedsohail321@gmail.com','ADF'),('21RD4P0103','V. Chandra Sekhar Reddy','FT',2021,'CIVIL',10,0,'9502075774','-','male','OC','In depth study on Concrete, by replacing it with locally available, suitable alternative aggregates in production of traditional Concrete for Cost Reduction and Environment Protection','M.Tech','2021-04-21','-','enrolled','vcsreddy333@gmail.com',NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
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

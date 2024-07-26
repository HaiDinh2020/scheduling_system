-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datn2
-- ------------------------------------------------------
-- Server version	5.7.42-log

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` varchar(255) NOT NULL,
  `mechanic_id` varchar(255) DEFAULT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `status` enum('todo','in-progress','done') DEFAULT 'todo',
  `createBy` enum('mechanic','customer','garage') DEFAULT 'mechanic',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('0d0c8d1c-dd09-4dac-b854-c9bc4a4e5b71','8c50dd74-972f-4c06-b7c2-ea53a0046507',NULL,'Hello world','hello world','2024-07-04 23:00:00','2024-07-05 00:30:00','todo','mechanic','2024-07-01 22:47:16','2024-07-01 22:47:16'),('4d5329b0-ce85-4af3-b4d6-ec4f6b554f8d','8c50dd74-972f-4c06-b7c2-ea53a0046507','ee75e788-3666-4ab5-9ab0-00349a66c005','Sua chua','Phủ nano kính lái','2024-07-01 21:22:53','2024-07-05 01:30:23','done','mechanic','2024-07-01 21:22:54','2024-07-05 01:30:25'),('4db644a2-4195-47bf-8ddc-696f958a2265','8c50dd74-972f-4c06-b7c2-ea53a0046507',NULL,'Kiem tra vat tư','kime tra vat tu','2024-07-03 19:00:00','2024-07-03 20:30:00','done','mechanic','2024-07-01 22:46:51','2024-07-01 22:46:54'),('529db891-39f4-4526-8889-03d4c017d703','3797da6c-f71e-4786-8245-06e54e4a303a','ce61b648-2d99-41f8-8a46-18080256919a','Sua chua','BẢO DƯỠNG THEO LỊCH HẸN','2024-07-12 00:41:20','2024-07-12 02:41:20','in-progress','mechanic','2024-07-12 00:41:21','2024-07-12 00:41:21'),('9d089981-8c3e-4312-99b3-2cd0f85394c8','8c50dd74-972f-4c06-b7c2-ea53a0046507',NULL,'sửa chữa xe','kiểm tra hệ thống lọc gió','2024-07-11 23:00:00','2024-07-12 02:00:00','todo','mechanic','2024-07-11 01:59:14','2024-07-11 01:59:14'),('c2d0db5a-aa6b-4fab-8021-9ba5872655e0','8c50dd74-972f-4c06-b7c2-ea53a0046507','2c529e16-fabc-484b-bfff-9ae7b8bd4c33','Sua chua','Loc gió chắn bụi xe số 19','2024-07-01 21:06:20','2024-07-01 23:03:00','done','mechanic','2024-07-01 21:06:22','2024-07-01 21:06:56');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookinggarages`
--

DROP TABLE IF EXISTS `bookinggarages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookinggarages` (
  `id` varchar(255) NOT NULL,
  `booking_id` varchar(255) DEFAULT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `status` enum('accepted','rejected','pending') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookinggarages`
--

LOCK TABLES `bookinggarages` WRITE;
/*!40000 ALTER TABLE `bookinggarages` DISABLE KEYS */;
INSERT INTO `bookinggarages` VALUES ('0dcbd241-f8d5-44f6-ba33-8229447695b9','2bafd455-257c-483b-931a-61cf362b3cfb','acdc77df-fc05-47fc-a03f-259c60d9602b','rejected','2024-06-26 02:02:26','2024-06-26 04:26:10'),('3121344c-2d6c-4329-97f1-173c858f81ca','f48222e7-017e-4f73-85b7-3718e874f127','acdc77df-fc05-47fc-a03f-259c60d9602b','rejected','2024-06-29 09:06:45','2024-06-29 09:08:14'),('3888a78c-2426-4cba-82e7-545b5290a83a','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','acdc77df-fc05-47fc-a03f-259c60d9602b','rejected','2024-06-26 04:29:35','2024-06-26 07:39:25'),('3dcfadc6-d983-4e4a-a05f-526b86e71ee3','b144c283-13d6-4f20-9eb4-dc41e6159a8a','acdc77df-fc05-47fc-a03f-259c60d9602b','pending','2024-07-01 14:08:49','2024-07-01 14:08:49'),('433cb0ff-9f1c-4eb3-a74a-86744d74ee30','119ded1c-3cbe-4174-a311-1b2f1b626158','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-06-30 10:01:36','2024-06-30 10:01:44'),('55bf1943-1c78-4330-b82d-e30234545624','0eb23c1a-4a18-486d-a368-30c4c9ed5a80','acdc77df-fc05-47fc-a03f-259c60d9602b','rejected','2024-06-26 18:51:18','2024-06-29 09:07:49'),('7ca8a80b-08d0-45a3-81cd-60c1118e6e4a','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-06-26 07:35:41','2024-06-26 07:39:25'),('7cdaed83-49b9-48a0-baf6-7e29cffba4d1','a956bda7-a896-4cbd-b60b-c72279be2202','ec1ff37b-53be-43ff-9c1f-182ea67e472c','pending','2024-07-11 21:42:05','2024-07-11 21:42:05'),('81d71a1c-856c-4d66-978d-13121199f945','2bafd455-257c-483b-931a-61cf362b3cfb','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-06-26 02:02:26','2024-06-26 04:26:10'),('84c590dd-6473-4453-8c91-67dfa7d81bf8','119ded1c-3cbe-4174-a311-1b2f1b626158','acdc77df-fc05-47fc-a03f-259c60d9602b','rejected','2024-06-30 10:01:36','2024-06-30 10:01:44'),('8fb40687-6460-4149-abe4-78d512eefaf3','b7f9822f-1000-4362-aaf9-8bd638b34f78','d0d5b450-3cc8-4348-b71c-41bea2616b67','rejected','2024-07-12 01:24:49','2024-07-12 01:28:49'),('9b5ecac1-d6d6-4eb9-867f-27e59589fbae','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','d0d5b450-3cc8-4348-b71c-41bea2616b67','rejected','2024-06-26 04:29:35','2024-06-26 07:39:25'),('b37a22c1-d23b-41e0-a571-a2a27ca98964','b7f9822f-1000-4362-aaf9-8bd638b34f78','ec1ff37b-53be-43ff-9c1f-182ea67e472c','rejected','2024-07-12 01:25:04','2024-07-12 01:30:08'),('b71e17cd-329d-4de2-998e-11d59ea30632','cbff9df5-4ac9-48bd-9c05-9fd467e15ffa','d0d5b450-3cc8-4348-b71c-41bea2616b67','rejected','2024-07-12 01:36:23','2024-07-12 01:37:45'),('c17f1df3-7788-4b7f-904a-e22546e37161','cbff9df5-4ac9-48bd-9c05-9fd467e15ffa','acdc77df-fc05-47fc-a03f-259c60d9602b','accepted','2024-07-12 01:37:21','2024-07-12 01:37:45'),('c24e5b2e-26eb-46a4-af37-710b91e04912','a956bda7-a896-4cbd-b60b-c72279be2202','d0d5b450-3cc8-4348-b71c-41bea2616b67','rejected','2024-07-11 21:42:04','2024-07-11 21:49:59'),('d390c130-d10d-4251-af03-4836ecfc5210','3d81e0c0-20c3-4808-8cfc-5677cc3f5252','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-07-11 22:55:38','2024-07-11 22:56:17'),('d4c127dc-6069-431c-b807-726023dbf08d','f81f4141-d51d-4c5e-b917-1eaa47319eee','acdc77df-fc05-47fc-a03f-259c60d9602b','pending','2024-07-01 11:36:10','2024-07-01 11:36:10'),('d65dc00c-eb1b-4173-9c4d-4996b740df88','0eb23c1a-4a18-486d-a368-30c4c9ed5a80','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-06-26 18:51:18','2024-06-29 09:07:49'),('d89477b6-687e-447f-8b7a-37078245da12','f81f4141-d51d-4c5e-b917-1eaa47319eee','ec1ff37b-53be-43ff-9c1f-182ea67e472c','pending','2024-07-01 11:36:10','2024-07-01 11:36:10'),('e85cbde2-c073-4a2a-bbf5-101d2e3f414d','cbff9df5-4ac9-48bd-9c05-9fd467e15ffa','d0d5b450-3cc8-4348-b71c-41bea2616b67','rejected','2024-07-12 01:37:21','2024-07-12 01:37:45'),('ea4a38f5-f871-4f44-b6ff-3a298a325788','f48222e7-017e-4f73-85b7-3718e874f127','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-06-29 09:06:45','2024-06-29 09:08:14'),('ef642a0a-ea5e-4609-a5c6-a75ae8aa2228','b144c283-13d6-4f20-9eb4-dc41e6159a8a','ec1ff37b-53be-43ff-9c1f-182ea67e472c','pending','2024-07-01 14:08:49','2024-07-01 14:08:49'),('f1953d12-5b4a-43e7-a10b-ae0cf441418e','3d81e0c0-20c3-4808-8cfc-5677cc3f5252','ec1ff37b-53be-43ff-9c1f-182ea67e472c','rejected','2024-07-11 22:55:38','2024-07-11 22:56:17'),('f71ca620-9ec6-4965-ae72-f8f0dcf7f50f','0aa2c9ab-7152-4070-a6ba-a9b6eae30740','ec1ff37b-53be-43ff-9c1f-182ea67e472c','rejected','2024-07-06 20:13:27','2024-07-06 20:13:43'),('fbd034e1-2a7f-492a-999f-d341cfe04d14','0aa2c9ab-7152-4070-a6ba-a9b6eae30740','d0d5b450-3cc8-4348-b71c-41bea2616b67','accepted','2024-07-06 20:13:27','2024-07-06 20:13:43'),('ff91c784-fb04-4d0d-b4e1-6aba838d269d','cbff9df5-4ac9-48bd-9c05-9fd467e15ffa','ec1ff37b-53be-43ff-9c1f-182ea67e472c','rejected','2024-07-12 01:36:24','2024-07-12 01:37:45');
/*!40000 ALTER TABLE `bookinggarages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` varchar(255) NOT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `car_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `booking_images` varchar(255) DEFAULT NULL,
  `booking_date` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `exactAddress` varchar(255) DEFAULT NULL,
  `pickupOption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('0aa2c9ab-7152-4070-a6ba-a9b6eae30740','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','5f5055c7-3a96-4444-bc75-158a2d2c77ed','in-progress','sua_chua','w','','2024-07-06 20:13:26','1111','21.004526, 105.860134','0','2024-07-06 20:13:26','2024-07-06 20:13:43'),('0eb23c1a-4a18-486d-a368-30c4c9ed5a80','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','in-progress','sua_chua','thay guong','','2024-06-26 18:51:16','123 kim nguu','21.004526, 105.860134','0','2024-06-26 18:51:18','2024-06-29 09:07:49'),('119ded1c-3cbe-4174-a311-1b2f1b626158','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','complete','sua_chua','test','','2024-06-30 10:01:35','123 kim nguu','21.004526, 105.860134','0','2024-06-30 10:01:35','2024-07-01 09:56:56'),('1e759432-1cfb-4d9f-9a5c-84077e347cbb','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','5f5055c7-3a96-4444-bc75-158a2d2c77ed','in-progress','bao_duong','BẢO DƯỠNG THEO LỊCH HẸN',NULL,'2024-07-12 07:00:00','122 kim nguu','20.8404, 106.678','0','2024-07-11 18:23:22','2024-07-11 23:17:24'),('2535c3f9-e5fa-43da-90c7-5a0ec48b5443','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','complete','sua_chua','Không khởi động được','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1718720726/datn/images/ukcpfnb9on75fb4lgvha.jpg','2024-06-24 17:27:50','111','21.004526, 105.860134','1','2024-06-24 17:27:50','2024-06-28 08:39:29'),('2bafd455-257c-483b-931a-61cf362b3cfb','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','complete','sua_chua','sơn lại xe','','2024-06-26 02:02:25','123 kim nguu','21.004526, 105.860134','1','2024-06-26 02:02:26','2024-06-29 10:23:47'),('3d81e0c0-20c3-4808-8cfc-5677cc3f5252','ad50d559-f32a-41d0-a704-64edf8153fcb','d0d5b450-3cc8-4348-b71c-41bea2616b67','405375e6-4d7f-4f31-89eb-50b34ab9b2bd','complete','sua_chua','hong đèn','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1720738529/datn/images/agfpy41kayzvivt6lvnv.jpg','2024-07-11 22:55:38','1221','21.004687, 105.859296','0','2024-07-11 22:55:38','2024-07-11 23:35:02'),('50d07e04-d63b-4497-ba2b-ab104d7d86fb','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7',NULL,'54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','cancelled','sua_chua','test','','2024-06-24 16:01:40','hai ba trung ha noi','21.004526, 105.860134','0','2024-06-24 16:01:40','2024-06-24 17:26:27'),('7c44173a-f2af-446e-89e5-477002e021ed','ad50d559-f32a-41d0-a704-64edf8153fcb','acdc77df-fc05-47fc-a03f-259c60d9602b','405375e6-4d7f-4f31-89eb-50b34ab9b2bd','schedule','bao_duong','BẢO DƯỠNG THEO LỊCH HẸN',NULL,'2024-07-15 06:00:00','123 áaa','20.8404, 106.678','1','2024-07-12 00:40:50','2024-07-12 00:40:50'),('c2bea974-a9cb-457e-bb66-42a6906347e3','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','5f5055c7-3a96-4444-bc75-158a2d2c77ed','reject','bao_duong','bao duong cho khach hang ',NULL,'2024-06-29 10:00:00','123 kim nguu hai ba trung ha noi','21.004526, 105.860134','1','2024-06-26 18:02:42','2024-07-01 09:26:59'),('c9dcef4c-3d5f-4515-b30d-ad117fba0a64','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7',NULL,'54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','cancelled','sua_chua','test','','2024-06-24 16:27:21','hai ba trung ha noi','21.004526, 105.860134','0','2024-06-24 16:27:22','2024-06-24 17:26:23'),('cbff9df5-4ac9-48bd-9c05-9fd467e15ffa','ad50d559-f32a-41d0-a704-64edf8153fcb','acdc77df-fc05-47fc-a03f-259c60d9602b','405375e6-4d7f-4f31-89eb-50b34ab9b2bd','in-progress','sua_chua','1','','2024-07-12 01:36:23','1','20.8404, 106.678','0','2024-07-12 01:36:23','2024-07-12 01:37:45'),('f48222e7-017e-4f73-85b7-3718e874f127','bed55856-fffd-4b81-91ac-5d2474f1527a','d0d5b450-3cc8-4348-b71c-41bea2616b67','a78528ec-00a7-461e-b641-d46c7b239cc9','in-progress','sua_chua','Kính vỡ ','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719853754/datn/images/kinh_vo_cesbbd.jpg','2024-06-29 09:06:46','Thanh van hai ba trung ha noi','21.0043327, 105.8600862','1','2024-06-29 09:06:45','2024-06-29 09:08:14'),('f70128c8-56e0-4bab-8819-baef96212981','ad50d559-f32a-41d0-a704-64edf8153fcb','acdc77df-fc05-47fc-a03f-259c60d9602b','405375e6-4d7f-4f31-89eb-50b34ab9b2bd','schedule','bao_duong','BẢO DƯỠNG NHANH CẤP 1 (MỐC 5.000 KM)',NULL,'2024-07-12 04:30:00','122 back khoa','20.8404, 106.678','0','2024-07-12 00:05:35','2024-07-12 00:05:35'),('fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','d0d5b450-3cc8-4348-b71c-41bea2616b67','54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','complete','sua_chua','test','','2024-06-26 04:29:33','111','21.004746, 105.859337','0','2024-06-26 04:29:35','2024-06-30 10:07:04');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` varchar(255) NOT NULL,
  `owner_id` varchar(255) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `number_plate` varchar(255) DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES ('405375e6-4d7f-4f31-89eb-50b34ab9b2bd','ad50d559-f32a-41d0-a704-64edf8153fcb','Mazda','2',2021,'51G - 189.76','đev','2024-07-11 21:37:21','2024-07-11 21:37:21'),('54c00cb2-8591-41e3-8e6a-042a3c0fb3d3','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','Acura','2.5TL',1995,'33 MD1 - 1234','red','2024-06-24 05:24:19','2024-06-24 05:24:19'),('5f5055c7-3a96-4444-bc75-158a2d2c77ed','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','Honda','S2000',2009,'37N1 - 10335','den-trang','2024-06-24 17:59:40','2024-06-24 17:59:40'),('a78528ec-00a7-461e-b641-d46c7b239cc9','bed55856-fffd-4b81-91ac-5d2474f1527a','Aston Martin','DB11 V8',2023,'37M1- 88888','Red','2024-06-29 09:05:00','2024-06-29 09:05:00');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firebasetokens`
--

DROP TABLE IF EXISTS `firebasetokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `firebasetokens` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `firebaseToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firebasetokens`
--

LOCK TABLES `firebasetokens` WRITE;
/*!40000 ALTER TABLE `firebasetokens` DISABLE KEYS */;
INSERT INTO `firebasetokens` VALUES ('00124f1c-f208-4a9a-8189-0468fa815494','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','cec74oEIfChyplhk11Ee7R:APA91bE5IxyAfFVgYbFpxBXRp-pe4cP_DcOahyo3BiG226Qsd2uBZ7e2PGNs54kcASpdUDlVAqC08u8mlH5oAXG7flpwEjxGRyWqTAYpQjgfm1xGR7DwTKjs71EhwCVsJh9ru_Fnmnxs','2024-06-24 05:23:43','2024-07-06 20:11:38'),('203ef839-e796-4422-a5fc-09aa424cc580','c150daeb-bd64-41e1-b0bf-f9a01e93aeb4','eNYCCap3g15A1LVwUNQp3r:APA91bH5PJQ6wsNE21fehy7aoDZCQKb-pITxA3o_jcNVU6MtAEyNMGpHG9J0X8pDwMJWTROGzKQtV0mJyjeq1lvEspftUEq4wogSTyFgo_dzVX9AVpGK4andnqMvLRlBShFCF7pNIDws','2024-06-26 07:03:23','2024-07-11 22:39:23'),('545a8a92-f9e6-4f28-9d23-c8f780b6bf36','34343076-44de-4c09-9b30-bd6ff53fa998','cec74oEIfChyplhk11Ee7R:APA91bE5IxyAfFVgYbFpxBXRp-pe4cP_DcOahyo3BiG226Qsd2uBZ7e2PGNs54kcASpdUDlVAqC08u8mlH5oAXG7flpwEjxGRyWqTAYpQjgfm1xGR7DwTKjs71EhwCVsJh9ru_Fnmnxs','2024-07-01 03:05:35','2024-07-01 03:05:35'),('7bc2b98f-b6a9-4f6f-8d09-8785033ab13e','bed55856-fffd-4b81-91ac-5d2474f1527a','cec74oEIfChyplhk11Ee7R:APA91bE5IxyAfFVgYbFpxBXRp-pe4cP_DcOahyo3BiG226Qsd2uBZ7e2PGNs54kcASpdUDlVAqC08u8mlH5oAXG7flpwEjxGRyWqTAYpQjgfm1xGR7DwTKjs71EhwCVsJh9ru_Fnmnxs','2024-06-29 08:59:30','2024-07-11 20:20:55'),('e15d5017-4948-4628-b178-f85dbcfbc9bd','0041867c-9e8c-4c0f-ac76-657508091316','clCJLrUdk2M_liFpr6Sm9O:APA91bGsbxENzqcaab_MAi05ce6MuoCWBoxLJ5ozrvNT2lClQZUZd3RLXYNTTmAaoWnR73lzoTD_vPh4xsixh6fZPTwneC5kw_n7nnClxtIh-reatGNHtTOMIPWpsyV1u4i11_3mg8gT','2024-06-29 10:23:41','2024-07-05 23:12:41'),('f02d1d2e-9e43-435a-8ad6-5c3d4f87fc7b','38eeef68-ce1d-4d3b-8ed0-16af8586f000','clCJLrUdk2M_liFpr6Sm9O:APA91bGsbxENzqcaab_MAi05ce6MuoCWBoxLJ5ozrvNT2lClQZUZd3RLXYNTTmAaoWnR73lzoTD_vPh4xsixh6fZPTwneC5kw_n7nnClxtIh-reatGNHtTOMIPWpsyV1u4i11_3mg8gT','2024-06-26 16:53:51','2024-06-26 16:53:51'),('feea5d9a-27be-408b-880c-19940d3b3978','ad50d559-f32a-41d0-a704-64edf8153fcb','cec74oEIfChyplhk11Ee7R:APA91bE5IxyAfFVgYbFpxBXRp-pe4cP_DcOahyo3BiG226Qsd2uBZ7e2PGNs54kcASpdUDlVAqC08u8mlH5oAXG7flpwEjxGRyWqTAYpQjgfm1xGR7DwTKjs71EhwCVsJh9ru_Fnmnxs','2024-07-11 21:25:51','2024-07-11 21:25:51');
/*!40000 ALTER TABLE `firebasetokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garagepaymentconfigs`
--

DROP TABLE IF EXISTS `garagepaymentconfigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garagepaymentconfigs` (
  `id` varchar(255) NOT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `vnp_TmnCode` varchar(255) NOT NULL,
  `vnp_HashSecret` varchar(255) NOT NULL,
  `vnp_ReturnUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garagepaymentconfigs`
--

LOCK TABLES `garagepaymentconfigs` WRITE;
/*!40000 ALTER TABLE `garagepaymentconfigs` DISABLE KEYS */;
INSERT INTO `garagepaymentconfigs` VALUES ('33613d4d-af77-4778-876f-d2e313feb7f4','acdc77df-fc05-47fc-a03f-259c60d9602b','EYLFURJY','QR95PGICX9SXVZYJ02TFGY9E6N4GSYP8','http://localhost:3000/customer/vnpay_return','2024-06-02 15:46:34','2024-06-02 15:46:34'),('ca291528-62f4-40a8-ad8b-c3f09b545d19','d0d5b450-3cc8-4348-b71c-41bea2616b67','EYLFURJY','QR95PGICX9SXVZYJ02TFGY9E6N4GSYP8','http://localhost:3000/customer/vnpay_return','2024-06-02 13:54:24','2024-06-02 13:54:24');
/*!40000 ALTER TABLE `garagepaymentconfigs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garages`
--

DROP TABLE IF EXISTS `garages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garages` (
  `id` varchar(255) NOT NULL,
  `garage_name` varchar(255) DEFAULT NULL,
  `garageAddress` varchar(255) DEFAULT NULL,
  `exactAddress` varchar(255) DEFAULT NULL,
  `introduce` text,
  `website` varchar(255) DEFAULT NULL,
  `business_hours` varchar(255) DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `images` text,
  `owner_id` varchar(255) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garages`
--

LOCK TABLES `garages` WRITE;
/*!40000 ALTER TABLE `garages` DISABLE KEYS */;
INSERT INTO `garages` VALUES ('acdc77df-fc05-47fc-a03f-259c60d9602b','Chi nhánh Thanh Nhàn','Thanh Nhan - HBT - Ha Noi','21.002964, 105.853954','gara Thanh Nhan is more than just a place to park your car; it\'s a hub for all your automotive needs. Located in the heart of our community, Garage1 has been serving customers for over two decades with quality service, reliability, and a passion for all things automotive.','gara Thanh Nhan','9h- 16h','Sửa chữa, Bảo dưỡng, Tư vấn khách hàng','10',NULL,'c150daeb-bd64-41e1-b0bf-f9a01e93aeb4',21.002964,105.853954,'2024-06-24 16:25:33','2024-06-24 16:25:33'),('d0d5b450-3cc8-4348-b71c-41bea2616b67','Chi nhánh Thanh Lương','Thanh Luong - HBT - Ha Noi','21.004925, 105.862046','gara Thanh Luong is more than just a place to park your car; it\'s a hub for all your automotive needs. Located in the heart of our community, Garage1 has been serving customers for over two decades with quality service, reliability, and a passion for all things automotive.','gara Thanh Luong','9h- 16h','Sửa chữa, Bảo dưỡng, Tư vấn khách hàng','10',NULL,'0041867c-9e8c-4c0f-ac76-657508091316',21.004925,105.862046,'2024-06-24 16:24:18','2024-06-24 16:24:18'),('ec1ff37b-53be-43ff-9c1f-182ea67e472c','chi nhánh Hải Quân',NULL,'21.004526, 105.860134','garage do pho do doc hai quan monkey.D.Garp dan dat tien vao dai hai trinh bat hai tac','monked','8-20','Sửa chữa, Bán phụ tùng','10',NULL,'34343076-44de-4c09-9b30-bd6ff53fa998',21.004526,105.860134,'2024-07-01 03:05:34','2024-07-01 03:05:34');
/*!40000 ALTER TABLE `garages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicedetails`
--

DROP TABLE IF EXISTS `invoicedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicedetails` (
  `id` varchar(255) NOT NULL,
  `invoice_id` varchar(255) DEFAULT NULL,
  `item_description` text,
  `unit` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicedetails`
--

LOCK TABLES `invoicedetails` WRITE;
/*!40000 ALTER TABLE `invoicedetails` DISABLE KEYS */;
INSERT INTO `invoicedetails` VALUES ('08507b53-55fb-4b2c-a01b-d4d928fea296','1a94b301-32a1-4241-873c-5afa623eb4aa','test','lần',1,120000.00,'2024-06-28 08:44:59','2024-06-28 08:44:59'),('0c647123-5133-40f3-9db6-7847f687f6c6','cf38821d-911a-49f8-b9aa-cafced47046b','đèn mazda 2','chiếc',1,3560000.00,'2024-07-11 23:32:33','2024-07-11 23:32:33'),('0fe3d4ae-8293-40d7-80b3-94c2dbf3e89a','af7e49d2-4dcd-42d3-ba7c-4ce167b68c35','sơn gương','hôp',1,120000.00,'2024-06-26 18:36:04','2024-06-26 18:36:04'),('373c8230-6988-4cab-a5fb-28403dcc730d','ce590ee7-0237-43ea-823d-e5ad9650b6ff','tiền vận chuyển xe','lần',1,100000.00,'2024-07-11 23:21:27','2024-07-11 23:21:27'),('3b1e44ca-41b0-4253-8ea1-3975474cef7b','1a94b301-32a1-4241-873c-5afa623eb4aa','test2','chiếc',1,790000.00,'2024-06-28 08:47:10','2024-06-28 08:47:10'),('455d464b-ee12-4c35-9110-df2f5f1778cf','05b009d6-4fab-4bbc-9e6a-496f5a653fcf','GƯƠNG CHIẾU HẬU ACURA MDX','chiếc',1,2500000.00,'2024-07-01 09:54:54','2024-07-01 09:54:54'),('5b3240fc-4367-4423-95dc-f37911f6df97','c9219d21-cb06-4b7a-b210-8b560ec89dff','Rửa xe','lần',1,120000.00,'2024-06-25 09:39:42','2024-06-25 09:39:42'),('6bd1df6a-63b2-4ad9-b177-473e16b3cefb','9db5462e-6f39-4b10-9ae7-c7efa249c83e','GƯƠNG CHIẾU HẬU ACURA MDX','chiếc',1,2500000.00,'2024-07-01 09:33:38','2024-07-01 09:33:38'),('7e515e55-f5fb-4a16-aa7b-7a7a9382a58f','af7e49d2-4dcd-42d3-ba7c-4ce167b68c35','sơn nắp capo','lần',1,1200000.00,'2024-06-26 18:37:02','2024-06-26 18:37:02'),('8928004e-7880-408e-8d6f-cec04e210acc','cf38821d-911a-49f8-b9aa-cafced47046b','vận chuyển xe','lần',2,100000.00,'2024-07-11 23:32:57','2024-07-11 23:32:57'),('db32b681-dce5-4dce-9bad-256492a7b7da','ce590ee7-0237-43ea-823d-e5ad9650b6ff','bảo dưỡng tổng quát','lần',1,2100000.00,'2024-07-11 23:21:05','2024-07-11 23:21:05'),('e408dc21-77bb-4577-9520-45f05c47409b','ce590ee7-0237-43ea-823d-e5ad9650b6ff','thay nhớt','lần',1,200000.00,'2024-07-11 23:20:45','2024-07-11 23:20:45');
/*!40000 ALTER TABLE `invoicedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` varchar(255) NOT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `booking_id` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `invoice_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES ('05b009d6-4fab-4bbc-9e6a-496f5a653fcf','d0d5b450-3cc8-4348-b71c-41bea2616b67','119ded1c-3cbe-4174-a311-1b2f1b626158',2500000.00,'paid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719826436/datn/images/gnqrcf1kt1lhhmcupipc.jpg','2024-07-01 09:54:47','2024-07-01 09:56:39'),('1a94b301-32a1-4241-873c-5afa623eb4aa','d0d5b450-3cc8-4348-b71c-41bea2616b67','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52',910000.00,'paid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719564391/datn/images/nqhimh2dq6kp2myjo374.jpg','2024-06-28 08:44:23','2024-06-30 10:06:10'),('6baf0584-0eb9-4686-a4fb-31b38acf2847','d0d5b450-3cc8-4348-b71c-41bea2616b67','0aa2c9ab-7152-4070-a6ba-a9b6eae30740',0.00,'unpaid',NULL,'2024-07-11 23:20:06','2024-07-11 23:20:06'),('9db5462e-6f39-4b10-9ae7-c7efa249c83e','d0d5b450-3cc8-4348-b71c-41bea2616b67','0eb23c1a-4a18-486d-a368-30c4c9ed5a80',2500000.00,'unpaid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719826436/datn/images/gnqrcf1kt1lhhmcupipc.jpg','2024-07-01 09:30:55','2024-07-01 09:33:57'),('af7e49d2-4dcd-42d3-ba7c-4ce167b68c35','d0d5b450-3cc8-4348-b71c-41bea2616b67','2bafd455-257c-483b-931a-61cf362b3cfb',1320000.00,'paid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719426978/datn/images/uhlcvo2yy2qlqi828doa.jpg','2024-06-26 18:33:12','2024-06-26 18:37:31'),('c9219d21-cb06-4b7a-b210-8b560ec89dff','d0d5b450-3cc8-4348-b71c-41bea2616b67','2535c3f9-e5fa-43da-90c7-5a0ec48b5443',120000.00,'paid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719308427/datn/images/tlyyczzag9jmggmt0dix.jpg','2024-06-25 09:33:54','2024-06-26 20:41:52'),('ce590ee7-0237-43ea-823d-e5ad9650b6ff','d0d5b450-3cc8-4348-b71c-41bea2616b67','1e759432-1cfb-4d9f-9a5c-84077e347cbb',2400000.00,'unpaid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1720740100/datn/images/f2yexretl4q7qxffgmwi.jpg','2024-07-11 23:20:16','2024-07-11 23:21:41'),('cf38821d-911a-49f8-b9aa-cafced47046b','d0d5b450-3cc8-4348-b71c-41bea2616b67','3d81e0c0-20c3-4808-8cfc-5677cc3f5252',3760000.00,'paid','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1720740785/datn/images/rs7ntsovhcruef8lrsn0.jpg','2024-07-11 23:22:27','2024-07-11 23:34:31');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenanceschedules`
--

DROP TABLE IF EXISTS `maintenanceschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenanceschedules` (
  `id` varchar(255) NOT NULL,
  `booking_id` varchar(255) DEFAULT NULL,
  `maintenanceTime` date NOT NULL,
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenanceschedules`
--

LOCK TABLES `maintenanceschedules` WRITE;
/*!40000 ALTER TABLE `maintenanceschedules` DISABLE KEYS */;
INSERT INTO `maintenanceschedules` VALUES ('3c0bcc56-1461-4190-b462-0a2fd580b72b','2bafd455-257c-483b-931a-61cf362b3cfb','2024-07-12','kiểm tra hệ thống lọc gió','2024-06-28 08:09:24','2024-06-28 08:09:24'),('51ea656f-63ae-4e1d-88c9-c5f0731fb15b','3d81e0c0-20c3-4808-8cfc-5677cc3f5252','2024-07-26','Bảo dưỡng định kỳ','2024-07-11 23:51:57','2024-07-11 23:51:57'),('58a0075c-2493-4058-a4fa-be4fe4ce50f9','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','2024-07-10','test drove vehicle','2024-06-30 10:08:44','2024-06-30 10:08:44');
/*!40000 ALTER TABLE `maintenanceschedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanics`
--

DROP TABLE IF EXISTS `mechanics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanics` (
  `id` varchar(255) NOT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanics`
--

LOCK TABLES `mechanics` WRITE;
/*!40000 ALTER TABLE `mechanics` DISABLE KEYS */;
INSERT INTO `mechanics` VALUES ('3797da6c-f71e-4786-8245-06e54e4a303a','acdc77df-fc05-47fc-a03f-259c60d9602b','22eeabc0-dfe3-49c8-b164-a0e6508b6aa7','xe con, bmv,..','2024-07-12 00:35:33','2024-07-12 00:35:33'),('8c50dd74-972f-4c06-b7c2-ea53a0046507','d0d5b450-3cc8-4348-b71c-41bea2616b67','38eeef68-ce1d-4d3b-8ed0-16af8586f000','chuyên bán tải','2024-06-25 20:40:37','2024-06-25 20:40:37'),('dca5c577-304b-4611-9f68-32aeb79d7b95','d0d5b450-3cc8-4348-b71c-41bea2616b67','623be510-e88e-475b-a2b4-39fedabf48fa','chuyên bán tải','2024-06-26 12:41:28','2024-06-26 12:41:28'),('e939846f-b027-4806-a3e1-7d4cbeadca19','acdc77df-fc05-47fc-a03f-259c60d9602b','ff5104f2-7219-4d2f-87f7-d488eb0b3d63','Xe điện','2024-07-01 04:14:31','2024-07-01 04:14:31');
/*!40000 ALTER TABLE `mechanics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` varchar(255) NOT NULL,
  `sender_id` varchar(255) DEFAULT NULL,
  `receiver_id` varchar(255) DEFAULT NULL,
  `content` text,
  `timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('1e7f49b0-9480-4901-b121-91fb9bcc63c9','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','0041867c-9e8c-4c0f-ac76-657508091316','Helo garage Thành Lương','2024-06-28 09:51:59','2024-06-28 09:51:59','2024-06-28 09:51:59'),('1efb55e6-3ec7-4a97-ac73-60f0dd80528d','c150daeb-bd64-41e1-b0bf-f9a01e93aeb4','ad50d559-f32a-41d0-a704-64edf8153fcb','hello test1','2024-07-12 00:18:45','2024-07-12 00:18:45','2024-07-12 00:18:45'),('26ec0a66-640d-444f-acdf-9e841e99b94f','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','0041867c-9e8c-4c0f-ac76-657508091316','Q@IOJSnkdo9)0fe0','2024-07-05 22:56:27','2024-07-05 22:56:27','2024-07-05 22:56:27'),('35ebfe41-67ae-4061-8a18-ec61333a50ba','0041867c-9e8c-4c0f-ac76-657508091316','e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','hi Hải','2024-06-29 08:55:52','2024-06-29 08:55:52','2024-06-29 08:55:52'),('413663ba-5bc2-409b-b4db-5ae4f6c16c26','c150daeb-bd64-41e1-b0bf-f9a01e93aeb4','ad50d559-f32a-41d0-a704-64edf8153fcb','hello test1','2024-07-12 00:17:41','2024-07-12 00:17:41','2024-07-12 00:17:41'),('5152d872-2463-40bc-a71b-4370744fad0f','bed55856-fffd-4b81-91ac-5d2474f1527a','0041867c-9e8c-4c0f-ac76-657508091316','Xe tôi bị vỡ gương ','2024-06-29 09:09:41','2024-06-29 09:09:41','2024-06-29 09:09:41'),('633cc8b3-c397-43ce-b66e-9f2d8b3a4942','0041867c-9e8c-4c0f-ac76-657508091316','bed55856-fffd-4b81-91ac-5d2474f1527a','oke, bạn đưa xe đến garage chúng tôi như lịch đặt nhé','2024-06-29 09:10:39','2024-06-29 09:10:39','2024-06-29 09:10:39'),('8581e907-0f33-49d1-9fbb-a6615902b30b','bed55856-fffd-4b81-91ac-5d2474f1527a','0041867c-9e8c-4c0f-ac76-657508091316','Oke','2024-06-29 09:10:54','2024-06-29 09:10:54','2024-06-29 09:10:54'),('c48220be-e861-48ec-b05f-d02fe17814fe','0041867c-9e8c-4c0f-ac76-657508091316','ad50d559-f32a-41d0-a704-64edf8153fcb','lô','2024-07-11 21:47:40','2024-07-11 21:47:40','2024-07-11 21:47:40'),('d6bc1f6b-3189-4c19-b8eb-2e0b8dfecc19','ad50d559-f32a-41d0-a704-64edf8153fcb','0041867c-9e8c-4c0f-ac76-657508091316','hello','2024-07-11 23:35:37','2024-07-11 23:35:37','2024-07-11 23:35:37'),('db5ec1fc-c28c-4590-95dd-b9a155a2369e','0041867c-9e8c-4c0f-ac76-657508091316','bed55856-fffd-4b81-91ac-5d2474f1527a','hi','2024-07-11 20:22:54','2024-07-11 20:22:54','2024-07-11 20:22:54'),('e25f0869-0260-4c54-9672-20f2c91a8b74','bed55856-fffd-4b81-91ac-5d2474f1527a','0041867c-9e8c-4c0f-ac76-657508091316','Oke','2024-06-29 09:10:54','2024-06-29 09:10:54','2024-06-29 09:10:54'),('fc3d347c-3b45-4ac9-b0b4-4edc013bac9b','ad50d559-f32a-41d0-a704-64edf8153fcb','c150daeb-bd64-41e1-b0bf-f9a01e93aeb4','hi','2024-07-12 00:18:16','2024-07-12 00:18:16','2024-07-12 00:18:16');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('migrate-appointment.js'),('migrate-booking-garage.js'),('migrate-booking.js'),('migrate-car.js'),('migrate-firebase-token.js'),('migrate-fix-db-charset.js'),('migrate-garage-payment-configs.js'),('migrate-garage.js'),('migrate-invoice_detail.js'),('migrate-invoice.js'),('migrate-maintenance-schedule.js'),('migrate-mechanic.js'),('migrate-message.js'),('migrate-task.js'),('migrate-transaction.js'),('migrate-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` varchar(255) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `garage_id` varchar(255) DEFAULT NULL,
  `booking_id` varchar(255) DEFAULT NULL,
  `assign_to` varchar(255) DEFAULT NULL,
  `level` enum('easy','medium','hard') DEFAULT 'easy',
  `task_status` enum('pending','assigned','in_progress','completed') DEFAULT 'pending',
  `allocation_date` date DEFAULT NULL,
  `estimated_time` int(11) DEFAULT '60',
  `start_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('2c529e16-fabc-484b-bfff-9ae7b8bd4c33','Loc gió chắn bụi xe số 19','d0d5b450-3cc8-4348-b71c-41bea2616b67','2535c3f9-e5fa-43da-90c7-5a0ec48b5443','8c50dd74-972f-4c06-b7c2-ea53a0046507','easy','completed','2024-06-26',45,'2024-07-02','04:06:20','2024-07-02','06:03:00','2024-06-25 20:31:35','2024-07-01 21:06:56'),('439f5ac5-9e39-4fd3-a894-329b708027ea','Thay dầu động cơ xe số 12','d0d5b450-3cc8-4348-b71c-41bea2616b67','2535c3f9-e5fa-43da-90c7-5a0ec48b5443','8c50dd74-972f-4c06-b7c2-ea53a0046507','medium','completed','2024-06-26',30,'2024-06-26','17:42:39','2024-06-26','19:48:09','2024-06-24 18:01:58','2024-06-26 12:48:12'),('71f3c5a9-6d26-4d40-aa0c-228beaabbcf2','BẢO DƯỠNG THEO LỊCH HẸN','d0d5b450-3cc8-4348-b71c-41bea2616b67','1e759432-1cfb-4d9f-9a5c-84077e347cbb','8c50dd74-972f-4c06-b7c2-ea53a0046507','medium','assigned','2024-07-12',120,NULL,NULL,NULL,NULL,'2024-07-11 18:23:22','2024-07-11 18:23:22'),('80460694-a18b-4c40-b776-65583927679a','vệ sinh dàn lạnh','d0d5b450-3cc8-4348-b71c-41bea2616b67','2bafd455-257c-483b-931a-61cf362b3cfb','dca5c577-304b-4611-9f68-32aeb79d7b95','easy','completed','2024-06-26',30,'2024-06-26','08:00:00','2024-06-26','08:30:00','2024-06-26 12:53:34','2024-06-26 12:53:34'),('82193d41-ac40-4a5e-9894-f99fc4f17432','Cứu hộ xe','d0d5b450-3cc8-4348-b71c-41bea2616b67','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','dca5c577-304b-4611-9f68-32aeb79d7b95','easy','in_progress','2024-06-26',120,'2024-06-26','19:50:14',NULL,NULL,'2024-06-26 12:50:18','2024-06-26 12:50:18'),('b57c3834-246f-43f1-9424-7bb7f092b7f4','Bảo trì','d0d5b450-3cc8-4348-b71c-41bea2616b67','c2bea974-a9cb-457e-bb66-42a6906347e3','8c50dd74-972f-4c06-b7c2-ea53a0046507','medium','in_progress','2024-07-03',120,'2024-07-02','01:50:10',NULL,NULL,'2024-06-26 18:02:42','2024-07-01 18:50:15'),('ce61b648-2d99-41f8-8a46-18080256919a','BẢO DƯỠNG THEO LỊCH HẸN','acdc77df-fc05-47fc-a03f-259c60d9602b','7c44173a-f2af-446e-89e5-477002e021ed','3797da6c-f71e-4786-8245-06e54e4a303a','medium','in_progress','2024-07-15',120,'2024-07-12','07:41:20',NULL,NULL,'2024-07-12 00:40:50','2024-07-12 00:41:21'),('d167cb2c-899c-468a-9bc7-c91f1808a244','Kiểm tra và bảo dưỡng hệ thống truyền động (hộp số, ly hợp)','d0d5b450-3cc8-4348-b71c-41bea2616b67','0aa2c9ab-7152-4070-a6ba-a9b6eae30740',NULL,'easy','pending',NULL,50,NULL,NULL,NULL,NULL,'2024-07-10 01:46:00','2024-07-10 01:46:00'),('da202078-8d3c-4441-b0b6-0f437e410171','Thay kính cửa sổ','d0d5b450-3cc8-4348-b71c-41bea2616b67','2bafd455-257c-483b-931a-61cf362b3cfb','dca5c577-304b-4611-9f68-32aeb79d7b95','medium','assigned','2024-06-30',50,NULL,NULL,NULL,NULL,'2024-06-26 10:42:09','2024-06-30 11:05:19'),('e68948ef-af4d-4765-a2dc-4ca81981e81c','Kiểm tra và thay nước làm mát','d0d5b450-3cc8-4348-b71c-41bea2616b67','0aa2c9ab-7152-4070-a6ba-a9b6eae30740',NULL,'easy','pending',NULL,30,NULL,NULL,NULL,NULL,'2024-07-10 00:57:15','2024-07-10 00:57:15'),('e9e1cb30-5b94-4f0c-8bcc-fbb49bc3d748','Rửa xe','d0d5b450-3cc8-4348-b71c-41bea2616b67','f48222e7-017e-4f73-85b7-3718e874f127','8c50dd74-972f-4c06-b7c2-ea53a0046507','easy','assigned','2024-07-12',30,NULL,NULL,NULL,NULL,'2024-07-11 18:57:58','2024-07-11 18:57:58'),('ee75e788-3666-4ab5-9ab0-00349a66c005','Phủ nano kính lái','d0d5b450-3cc8-4348-b71c-41bea2616b67','2bafd455-257c-483b-931a-61cf362b3cfb','8c50dd74-972f-4c06-b7c2-ea53a0046507','easy','completed','2024-06-26',130,'2024-07-02','04:22:53','2024-07-05','08:30:23','2024-06-26 12:54:25','2024-07-05 01:30:24'),('eed4d789-c116-4bfe-83d6-7bdc8db55358','sơn xe','d0d5b450-3cc8-4348-b71c-41bea2616b67','fda2b0ac-203e-4d3a-bb4f-68a1963f4d52','8c50dd74-972f-4c06-b7c2-ea53a0046507','medium','completed','2024-06-23',50,'2024-06-24','17:44:26','2031-06-29','17:00:00','2024-06-26 10:44:43','2024-06-26 10:44:43'),('fc492347-4eed-4bab-8141-235651ee4740','BẢO DƯỠNG NHANH CẤP 1 (MỐC 5.000 KM)','acdc77df-fc05-47fc-a03f-259c60d9602b','f70128c8-56e0-4bab-8819-baef96212981','e939846f-b027-4806-a3e1-7d4cbeadca19','medium','assigned','2024-07-12',120,NULL,NULL,NULL,NULL,'2024-07-12 00:05:35','2024-07-12 00:05:35');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` varchar(255) NOT NULL,
  `invoice_id` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('1b1c4e7d-e846-42e1-b805-522c6e682b32','c9219d21-cb06-4b7a-b210-8b560ec89dff','14480757',120000.00,'success','2024-06-27 00:30:31','2024-06-27 00:30:31'),('2b6fb762-47c6-4d43-9043-15c319ae3572','1a94b301-32a1-4241-873c-5afa623eb4aa','14486235',910000.00,'success','2024-06-30 10:06:10','2024-06-30 10:06:10'),('2f79d723-7a08-46ab-94d2-aa53dcc468cd','c9219d21-cb06-4b7a-b210-8b560ec89dff','14480757',120000.00,'success','2024-06-26 20:41:52','2024-06-26 20:41:52'),('66beab91-37f0-406b-8631-a6696573af6c','05b009d6-4fab-4bbc-9e6a-496f5a653fcf','14487721',2500000.00,'success','2024-07-01 09:56:39','2024-07-01 09:56:39'),('b46c2390-dfe1-4009-9a45-97beb813422e','cf38821d-911a-49f8-b9aa-cafced47046b','14507922',3760000.00,'success','2024-07-11 23:34:31','2024-07-11 23:34:31');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0041867c-9e8c-4c0f-ac76-657508091316','Phan Thành Lương','$2a$12$AfP.bpah.CYIL8G8ciJuO.BrE/ScTjeIlgr74H115dHALGNKHvrIW','gara3@gmail.com','0333121244','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719398341/datn/avatar/rx6jxwilpi50trqn80jv.png','garage','2024-06-24 16:24:18','2024-06-24 16:24:18'),('22eeabc0-dfe3-49c8-b164-a0e6508b6aa7','aokij','$2a$12$fcAxd9Az7R3FsKu2YZh0Lua.ylqGdSjuv8TSd54Up6lrhSlVsbO/S','mechanicaokij@gmail.com',NULL,NULL,'mechanic','2024-07-12 00:35:33','2024-07-12 00:35:33'),('34343076-44de-4c09-9b30-bd6ff53fa998','Monkey.D.Garp','$2a$12$qLhR9SF8bR5er0scd4a4xeNuVelu.Fozb8.0h7LFbrAGaZejL1PZe','gara2@gmail.com','0111222333','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719803427/datn/avatar/uekyqokkrvyh9q1wnugh.png','garage','2024-07-01 03:05:34','2024-07-01 03:05:34'),('38eeef68-ce1d-4d3b-8ed0-16af8586f000','Mr.Bean','$2a$12$N7USvCe840w8HyNT9NpQ1eGSqdEQHljsSxZLkTlQmtJVcu7lj5UJ.','mechanic1@gmail.com','0322111432','null','mechanic','2024-06-25 20:40:37','2024-06-25 20:40:37'),('623be510-e88e-475b-a2b4-39fedabf48fa','Dr.Strange','$2a$12$2c6s/hOhkmrXQICFXydaEOFvT.Y1S5cFWJLFph7HYk8k66UjDE/4K','mechanic2@gmail.com','0322111432',NULL,'mechanic','2024-06-26 12:41:28','2024-06-26 12:41:28'),('ad50d559-f32a-41d0-a704-64edf8153fcb','test1','$2a$12$FFtop7PmBmUH1iaeA2acOeVyzwZIrJipHl1ChijVBbLK59EC91Nby','huuhaij1@gmail.com','0333222111','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1720733336/datn/avatar/wtenaegisxbii3rrqenx.jpg','customer','2024-07-11 21:25:50','2024-07-11 21:25:50'),('bed55856-fffd-4b81-91ac-5d2474f1527a','Nguyễn Văn Tèo','$2a$12$C9V/ngAGyW6I5ueiiqyCquIGC694eE9tOVy4Thg0wJLnHjkIHGaMa','huuhaij2@gmail.com','0323222333','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1720732591/datn/avatar/bv2rrt8znmfqpvo56ywf.jpg','customer','2024-06-29 08:59:28','2024-06-29 08:59:28'),('c150daeb-bd64-41e1-b0bf-f9a01e93aeb4','Nguyen Thanh Nhan','$2a$12$6oeqT6NZ1g7Bta4q8.htDuULRiYJZXxFrR/8NF7Ik/II50bqy5O8K','gara1@gmail.com','0333121244',NULL,'garage','2024-06-24 16:25:33','2024-06-24 16:25:33'),('e0cf1b91-a856-4158-8b8e-77eb16ed5ce7','Hữu Hải','$2a$12$TdAggeetGkA8bnAtv1AQruXyEv1z2QfpcdMAQvvGsjsB5219tlDsO','haidinh6008@gmail.com','0346572346','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719399535/datn/avatar/kb8pjc2onmffiva53dzt.png','customer','2024-06-24 05:23:40','2024-06-24 05:23:40'),('ff5104f2-7219-4d2f-87f7-d488eb0b3d63','koby','$2a$12$OeaqsPlnfBuGQA5Vcrlx1unwUFPODggeOSL2A.jQPhswjfzgzLD3a','mechanickob@gmail.com','0998877665','https://res.cloudinary.com/dmrsdkvzl/image/upload/v1719807404/datn/avatar/cmpuqhn3nvcwhbrqzffk.jpg','mechanic','2024-07-01 04:14:31','2024-07-01 04:14:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-12  8:41:04

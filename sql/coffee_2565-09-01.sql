# ************************************************************
# Sequel Ace SQL dump
# Version 20035
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.39)
# Database: coffee
# Generation Time: 2022-09-01 02:52:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table tb_beverage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_beverage`;

CREATE TABLE `tb_beverage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `selectType` tinyint(4) NOT NULL DEFAULT '1',
  `selectSweetness` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_c9277545cce8145850f88770a81` (`createByUserId`),
  KEY `FK_70b49417fef9c6464c39cef013a` (`updateByUserId`),
  KEY `FK_f16989e896155c5ba5743459a69` (`categoryId`),
  CONSTRAINT `FK_70b49417fef9c6464c39cef013a` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c9277545cce8145850f88770a81` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f16989e896155c5ba5743459a69` FOREIGN KEY (`categoryId`) REFERENCES `tb_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_beverage` WRITE;
/*!40000 ALTER TABLE `tb_beverage` DISABLE KEYS */;

INSERT INTO `tb_beverage` (`id`, `name`, `duration`, `price`, `img`, `createAt`, `updateAt`, `createByUserId`, `updateByUserId`, `categoryId`, `selectType`, `selectSweetness`)
VALUES
	(1,'Espresso',35,25,'public/images/coffee2-900x480.jpeg','2022-08-31 06:36:11','2022-08-31 06:36:11',1,NULL,1,1,1),
	(2,'Americano',40,30,'public/images/coffeemenu3.jpeg','2022-08-31 07:29:29','2022-08-31 07:29:29',1,NULL,1,1,1),
	(3,'Taiwan tea',35,35,'public/images/7ec5a4dd661a42f7bdb32884ab8c41ea.webp','2022-08-31 07:31:23','2022-08-31 07:31:23',1,1,2,1,1),
	(4,'Thai tea',35,25,'public/images/1e0e327a52ce405196bb7242d22ea752.webp','2022-08-31 07:32:36','2022-08-31 07:32:36',1,NULL,2,1,1),
	(5,'Cola',30,15,'public/images/coke-2.jpeg','2022-08-31 07:36:10','2022-08-31 07:36:10',1,NULL,3,0,0),
	(6,'Energy drink',30,20,'public/images/m100.jpeg','2022-08-31 07:40:11','2022-08-31 07:40:11',1,1,3,0,0),
	(7,'Soda',30,15,'public/images/64.jpeg','2022-08-31 07:52:21','2022-08-31 07:52:21',1,1,3,0,0),
	(8,'Latte',45,35,'public/images/coke-2.jpeg','2022-08-31 14:41:31','2022-08-31 14:41:31',1,NULL,1,1,1);

/*!40000 ALTER TABLE `tb_beverage` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_bill
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_bill`;

CREATE TABLE `tb_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `table` varchar(255) NOT NULL,
  `status` enum('waiting','producing','finish','cancel') NOT NULL DEFAULT 'waiting',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c38d5ff0317a94b83662d2f673e` (`updateByUserId`),
  CONSTRAINT `FK_c38d5ff0317a94b83662d2f673e` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tb_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_category`;

CREATE TABLE `tb_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1dc1b4ebd9ef65af80d1137facc` (`createByUserId`),
  KEY `FK_95488a0ab41762017caa1df3ab8` (`updateByUserId`),
  CONSTRAINT `FK_1dc1b4ebd9ef65af80d1137facc` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_95488a0ab41762017caa1df3ab8` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_category` WRITE;
/*!40000 ALTER TABLE `tb_category` DISABLE KEYS */;

INSERT INTO `tb_category` (`id`, `name`, `createAt`, `updateAt`, `createByUserId`, `updateByUserId`)
VALUES
	(1,'Coffee','2022-08-31 06:20:11','2022-08-31 06:20:11',1,NULL),
	(2,'Tea','2022-08-31 06:20:22','2022-08-31 06:20:22',1,NULL),
	(3,'Soft drink','2022-08-31 06:20:32','2022-08-31 06:20:32',1,NULL);

/*!40000 ALTER TABLE `tb_category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_options`;

CREATE TABLE `tb_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_945fda62e4ff74f6b7ee3dd8db6` (`createByUserId`),
  KEY `FK_0f20867e2eef1db40571a8f68a3` (`updateByUserId`),
  CONSTRAINT `FK_0f20867e2eef1db40571a8f68a3` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_945fda62e4ff74f6b7ee3dd8db6` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_options` WRITE;
/*!40000 ALTER TABLE `tb_options` DISABLE KEYS */;

INSERT INTO `tb_options` (`id`, `name`, `createAt`, `updateAt`, `createByUserId`, `updateByUserId`)
VALUES
	(1,'Straw','2022-08-31 12:56:36','2022-08-31 12:56:36',1,NULL),
	(2,'Cup Cover','2022-08-31 12:56:50','2022-08-31 12:56:50',1,NULL);

/*!40000 ALTER TABLE `tb_options` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_order`;

CREATE TABLE `tb_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `beverageId` int(11) DEFAULT NULL,
  `status` enum('waiting','producing','out of stock','finish') NOT NULL DEFAULT 'waiting',
  `billId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  `sweetness` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `option` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_adc9489233a9d064a073e2d4881` (`beverageId`),
  KEY `FK_0859efb8666f1d80a8e9cd5691c` (`billId`),
  KEY `FK_22f91155ecb2973acee0ed21c03` (`updateByUserId`),
  CONSTRAINT `FK_0859efb8666f1d80a8e9cd5691c` FOREIGN KEY (`billId`) REFERENCES `tb_bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_22f91155ecb2973acee0ed21c03` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_adc9489233a9d064a073e2d4881` FOREIGN KEY (`beverageId`) REFERENCES `tb_beverage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tb_sweetness
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_sweetness`;

CREATE TABLE `tb_sweetness` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1fddc0ebd5bcbf46f0e33db0010` (`createByUserId`),
  KEY `FK_c3bcdfc7e37202908e7fc470ecc` (`updateByUserId`),
  CONSTRAINT `FK_1fddc0ebd5bcbf46f0e33db0010` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c3bcdfc7e37202908e7fc470ecc` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_sweetness` WRITE;
/*!40000 ALTER TABLE `tb_sweetness` DISABLE KEYS */;

INSERT INTO `tb_sweetness` (`id`, `name`, `createAt`, `updateAt`, `createByUserId`, `updateByUserId`)
VALUES
	(1,'Less sugar','2022-08-31 12:55:40','2022-08-31 12:55:40',1,NULL),
	(2,'Default','2022-08-31 12:55:49','2022-08-31 12:55:49',1,NULL),
	(3,'More sugar','2022-08-31 12:55:58','2022-08-31 12:55:58',1,NULL);

/*!40000 ALTER TABLE `tb_sweetness` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_tables
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_tables`;

CREATE TABLE `tb_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  `number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_eb567be7fe2a945e02beb68006` (`number`),
  KEY `FK_ce77ecf1286326c2059296593cc` (`createByUserId`),
  KEY `FK_a5f6b63697cf29a5459b3a2df2f` (`updateByUserId`),
  CONSTRAINT `FK_a5f6b63697cf29a5459b3a2df2f` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ce77ecf1286326c2059296593cc` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_tables` WRITE;
/*!40000 ALTER TABLE `tb_tables` DISABLE KEYS */;

INSERT INTO `tb_tables` (`id`, `createAt`, `updateAt`, `createByUserId`, `updateByUserId`, `number`)
VALUES
	(1,'2022-08-31 11:55:20','2022-08-31 11:55:20',1,NULL,'1'),
	(2,'2022-08-31 11:55:27','2022-08-31 11:55:27',1,NULL,'2'),
	(5,'2022-08-31 11:56:08','2022-08-31 11:56:08',1,NULL,'3'),
	(16,'2022-08-31 12:05:12','2022-08-31 12:05:12',1,NULL,'4'),
	(39,'2022-08-31 12:27:02','2022-08-31 12:27:02',1,NULL,'5');

/*!40000 ALTER TABLE `tb_tables` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_types`;

CREATE TABLE `tb_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createByUserId` int(11) DEFAULT NULL,
  `updateByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a879ae44a47eb0fb505bd1b3fca` (`createByUserId`),
  KEY `FK_c580bd29c084955b9fdbe46dc6d` (`updateByUserId`),
  CONSTRAINT `FK_a879ae44a47eb0fb505bd1b3fca` FOREIGN KEY (`createByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c580bd29c084955b9fdbe46dc6d` FOREIGN KEY (`updateByUserId`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_types` WRITE;
/*!40000 ALTER TABLE `tb_types` DISABLE KEYS */;

INSERT INTO `tb_types` (`id`, `name`, `createAt`, `updateAt`, `duration`, `price`, `createByUserId`, `updateByUserId`)
VALUES
	(4,'Hot','2022-08-29 21:06:14','2022-08-29 21:06:14',0,0,1,1),
	(5,'Cold','2022-08-31 12:54:46','2022-08-31 12:54:46',5,5,1,1);

/*!40000 ALTER TABLE `tb_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_users`;

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `img` varchar(255) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_142ce3112f446974f1c96a5d3f` (`email`),
  UNIQUE KEY `IDX_4402e5176d3d51b228b3466d07` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_users` WRITE;
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;

INSERT INTO `tb_users` (`id`, `name`, `email`, `username`, `password`, `role`, `img`, `createAt`, `updateAt`)
VALUES
	(1,'admin','admin@gamil.com','admin','$2b$12$KU5FBunrZUlHoiBZ/l98i.4iEBgGY8txSY7feuWDwt3ETnkwl7olO','user',NULL,'2022-09-01 02:50:05','2022-09-01 02:50:05');

/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql2.freemysqlhosting.net
-- Generation Time: Apr 07, 2018 at 07:07 PM
-- Server version: 5.5.54-0ubuntu0.12.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql2225236`
--
CREATE DATABASE IF NOT EXISTS `sql2225236` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql2225236`;

-- --------------------------------------------------------

--
-- Table structure for table `audit`
--

CREATE TABLE `audit` (
  `idusuario` int(10) UNSIGNED DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipooperacion` int(10) UNSIGNED NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `aditionalinfo` varchar(1000) DEFAULT NULL,
  `location` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `audit`
--

INSERT INTO `audit` (`idusuario`, `fecha`, `tipooperacion`, `observacion`, `aditionalinfo`, `location`) VALUES
(0, '2018-03-02 18:51:54', 2, NULL, NULL, NULL),
(0, '2018-03-02 18:56:35', 2, 'Email / Password no informado', 'joseluiseiguren@gmail.com', NULL),
(0, '2018-03-02 18:58:19', 2, 'Email / Password no informado', '[object Object]', NULL),
(0, '2018-03-02 19:00:24', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}', NULL),
(0, '2018-03-02 19:05:38', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}', NULL),
(0, '2018-03-02 19:11:55', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}', NULL),
(1, '2018-03-02 19:18:06', 1, '', '', NULL),
(1, '2018-03-04 11:21:46', 1, '', '', NULL),
(1, '2018-03-04 12:33:00', 1, '', '', NULL),
(14, '2018-03-04 13:30:38', 1, '', '', NULL),
(14, '2018-03-04 13:46:40', 1, '', '', NULL),
(14, '2018-03-05 22:23:34', 1, '', '', NULL),
(1, '2018-03-07 18:37:02', 1, '', '', NULL),
(1, '2018-03-07 18:46:16', 1, '', '', NULL),
(0, '2018-03-07 22:45:57', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"321\"}', NULL),
(0, '2018-03-07 22:46:03', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"MATADEROS\"}', NULL),
(14, '2018-03-07 22:46:13', 1, '', '', NULL),
(0, '2018-03-08 18:16:34', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"1\"}', NULL),
(14, '2018-03-08 18:16:40', 1, '', '', NULL),
(14, '2018-03-08 18:17:02', 1, '', '', NULL),
(0, '2018-03-08 18:53:14', 2, '{\"message\":\"Usuario Inexistente\"}', '{\"email\":\"flopyglorias@hotmail.com\",\"password\":\"mataderos\"}', NULL),
(14, '2018-03-08 18:53:35', 1, '', '', NULL),
(14, '2018-03-08 18:55:15', 1, '', '', NULL),
(14, '2018-03-08 19:00:09', 1, '', '', NULL),
(14, '2018-03-08 19:43:15', 1, '', '', NULL),
(15, '2018-03-08 19:44:04', 1, '', '', NULL),
(15, '2018-03-08 19:45:19', 1, '', '', NULL),
(14, '2018-03-08 20:05:35', 1, '', '', NULL),
(14, '2018-03-08 22:32:07', 1, '', '', NULL),
(15, '2018-03-08 22:32:17', 1, '', '', NULL),
(15, '2018-03-08 22:32:46', 1, '', '', NULL),
(14, '2018-03-09 07:18:47', 1, '', '', NULL),
(14, '2018-03-09 13:57:23', 1, '', '', NULL),
(14, '2018-03-09 16:15:21', 1, '', '', NULL),
(0, '2018-03-09 16:16:04', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"joseluiseiguren@gmail.com\",\"password\":\"MATADEROS\"}', NULL),
(15, '2018-03-09 16:16:09', 1, '', '', NULL),
(14, '2018-03-09 16:16:29', 1, '', '', NULL),
(15, '2018-03-09 17:03:21', 1, '', '', NULL),
(14, '2018-03-09 21:29:31', 1, '', '', NULL),
(14, '2018-03-11 00:05:28', 1, '', '', NULL),
(0, '2018-03-11 15:10:21', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"joseluiseiguren@gmail.com\",\"password\":\"matadertos\"}', NULL),
(15, '2018-03-11 15:10:25', 1, '', '', NULL),
(14, '2018-03-12 06:27:07', 1, '', '', NULL),
(14, '2018-03-12 16:53:15', 1, '', '', NULL),
(16, '2018-03-12 23:23:51', 1, '', '', NULL),
(15, '2018-03-13 18:19:33', 1, '', '', NULL),
(14, '2018-03-13 19:37:34', 1, '', '', NULL),
(14, '2018-03-13 19:38:11', 1, '', '', NULL),
(15, '2018-03-13 19:38:22', 1, '', '', NULL),
(14, '2018-03-13 19:38:41', 1, '', '', NULL),
(14, '2018-03-13 19:53:54', 1, '', '', NULL),
(15, '2018-03-13 21:12:02', 1, '', '', NULL),
(0, '2018-03-13 21:12:28', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"joseluiseiguren@gmail.com\",\"password\":\"123456\",\"location\":\"{\\\"height\\\":1080,\\\"width\\\":1920,\\\"appCodeName\\\":\\\"Mozilla\\\",\\\"appVersion\\\":\\\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\\",\\\"language\\\":\\\"en-US\\\",\\\"platform\\\":\\\"Win32\\\",\\\"userAgent\\\":\\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\\",\\\"ip\\\":\\\"2a01:c50e:2110:3800:4c4a:8033:5046:37da\\\",\\\"country_cod', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:4c4a:8033:5046:37da\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(15, '2018-03-13 21:12:31', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:4c4a:8033:5046:37da\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-13 21:13:42', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.137 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.137 Mobile Safari/537.36\"}'),
(14, '2018-03-13 21:15:56', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows)\",\"language\":\"en-GB\",\"platform\":\"Win64\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0\",\"ip\":\"2a01:c50e:2110:3800:4c4a:8033:5046:37da\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-14 17:50:16', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(15, '2018-03-14 19:09:00', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"ip\":\"2a01:c50e:2110:3800:9147:cccd:def1:a492\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(0, '2018-03-15 17:58:43', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"matadertos\"}', NULL),
(14, '2018-03-15 17:58:49', 1, '', '', NULL),
(14, '2018-03-15 19:09:32', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:69ba:4877:4889:7d35\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(15, '2018-03-15 21:37:41', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:69ba:4877:4889:7d35\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(15, '2018-03-16 16:17:51', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(0, '2018-03-16 16:19:19', 2, '{\"message\":\"Usuario Inexistente\"}', '{\"email\":\"noeli.giacomino@gmail.com\",\"password\":\"g\",\"location\":\"{\\\"height\\\":534,\\\"width\\\":320,\\\"appCodeName\\\":\\\"Mozilla\\\",\\\"appVersion\\\":\\\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\\\",\\\"language\\\":\\\"en-US\\\",\\\"platform\\\":\\\"Linux armv7l\\\",\\\"userAgent\\\":\\\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\\\",\\\"ip\\\":\\\"2a01:c50e:2110:3800:e90f:4:87f9:3251\\\",\\\"country_code\\\":\\\"ES\\\",\\\"country_name\\\":\\\"Spain\\\",\\\"region_code\\\":\\\"\\\",\\\"region_name\\\":\\\"\\\",\\\"city\\\":\\\"\\\",\\\"zip_code\\\":\\\"\\\",\\\"time_zone\\\":\\\"\\\",\\\"latitude\\\":40.4172,\\\"longitude\\\":-3.684,\\\"metro_code\\\":0}\"}', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:e90f:4:87f9:3251\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-16 17:31:48', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(14, '2018-03-16 17:32:55', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(14, '2018-03-17 12:02:34', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:e9d2:f486:ce1b:a894\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(16, '2018-03-17 14:37:46', 1, '', '', '{\"height\":768,\"width\":1366,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"es\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"152.171.105.7\",\"country_code\":\"AR\",\"country_name\":\"Argentina\",\"region_code\":\"B\",\"region_name\":\"Buenos Aires\",\"city\":\"Lomas de Zamora\",\"zip_code\":\"1832\",\"time_zone\":\"America/Argentina/Buenos_Aires\",\"latitude\":-34.7667,\"longitude\":-58.4,\"metro_code\":0}'),
(0, '2018-03-17 19:56:12', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"mataderis\",\"location\":\"{\\\"height\\\":1080,\\\"width\\\":1920,\\\"appCodeName\\\":\\\"Mozilla\\\",\\\"appVersion\\\":\\\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\\",\\\"language\\\":\\\"en-US\\\",\\\"platform\\\":\\\"Win32\\\",\\\"userAgent\\\":\\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\\",\\\"ip\\\":\\\"2a01:c50e:2110:3800:e9d2:f486:ce1b:a894\\\",\\\"country_code\\\":\\\"ES\\\",\\\"country_name\\\":\\\"Spain\\\",\\\"region_code\\\":\\\"\\\",\\\"region_name\\\":\\\"\\\",\\\"city\\\":\\\"\\\",\\\"zip_code\\\":\\\"\\\",\\\"time_zone\\\":\\\"\\\",\\\"latitude\\\":40.4172,\\\"longitude\\\":-3.684,\\\"metro_code\\\":0}\"}', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:e9d2:f486:ce1b:a894\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-17 19:56:17', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:e9d2:f486:ce1b:a894\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(15, '2018-03-17 22:48:59', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:e9d2:f486:ce1b:a894\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-17 22:50:14', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-17 22:50:39', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:1d95:6551:e06a:323e\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-17 23:51:30', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"ip\":\"213.143.49.92\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(14, '2018-03-17 23:52:37', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1\",\"ip\":\"213.143.49.92\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(14, '2018-03-18 13:42:26', 1, '', '', '{\"height\":533,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Android 5.1.1)\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Android 5.1.1; Mobile; rv:59.0) Gecko/59.0 Firefox/59.0\",\"ip\":\"2a01:c50e:2110:3800:b012:2265:f55f:8e90\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-18 15:11:20', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:b012:2265:f55f:8e90\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-18 15:44:33', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(14, '2018-03-18 15:53:16', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/10.6b8836 Mobile/15D100 Safari/604.5.6\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/10.6b8836 Mobile/15D100 Safari/604.5.6\",\"ip\":\"2a01:c50e:2110:3800:31ac:efb:a8c8:e7b8\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-19 17:42:40', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-19 18:13:25', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\"}'),
(14, '2018-03-20 18:48:32', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-20 21:56:16', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-03-22 07:01:22', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-22 19:50:28', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-03-23 16:36:00', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-23 20:34:11', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-03-23 21:17:24', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"CT\",\"region_name\":\"Catalonia\",\"city\":\"Barcelona\",\"zip_code\":\"08001\",\"time_zone\":\"Europe/Madrid\",\"latitude\":41.3984,\"longitude\":2.1741,\"metro_code\":0}'),
(0, '2018-03-24 20:14:40', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"mataderos1\",\"location\":\"{\\\"height\\\":1080,\\\"width\\\":1920,\\\"appCodeName\\\":\\\"Mozilla\\\",\\\"appVersion\\\":\\\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\\\",\\\"language\\\":\\\"en-US\\\",\\\"platform\\\":\\\"Win32\\\",\\\"userAgent\\\":\\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\\\",\\\"ip\\\":\\\"2a01:c50e:2110:3800:9de6:af39:53d8:4764\\\",\\\"country_code\\\":\\\"ES\\\",\\\"country_name\\\":\\\"Spain\\\",\\\"region_code\\\":\\\"\\\",\\\"region_name\\\":\\\"\\\",\\\"city\\\":\\\"\\\",\\\"zip_code\\\":\\\"\\\",\\\"time_zone\\\":\\\"\\\",\\\"latitude\\\":40.4172,\\\"longitude\\\":-3.684,\\\"metro_code\\\":0}\"}', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:9de6:af39:53d8:4764\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-24 20:14:48', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:9de6:af39:53d8:4764\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(15, '2018-03-25 11:24:48', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-25 12:16:28', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:a967:1133:398:ce98\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-25 20:17:44', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:49de:2586:67e6:c686\",\"country_code\":\"ES\",\"country_name\":\"Spain\",\"region_code\":\"\",\"region_name\":\"\",\"city\":\"\",\"zip_code\":\"\",\"time_zone\":\"\",\"latitude\":40.4172,\"longitude\":-3.684,\"metro_code\":0}'),
(14, '2018-03-26 16:56:52', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-27 17:33:15', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-03-28 17:40:30', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-03-30 09:31:57', 1, '', '', ''),
(14, '2018-03-31 20:38:08', 1, '', '', ''),
(14, '2018-04-01 08:35:44', 1, '', '', ''),
(14, '2018-04-01 08:39:06', 1, '', '', ''),
(14, '2018-04-01 08:46:36', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(15, '2018-04-01 09:04:38', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-04-01 09:05:16', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\"}'),
(14, '2018-04-01 09:08:01', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(15, '2018-04-01 09:13:20', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"94.177.235.208\",\"city\":\"Paris\",\"region\":\"Île-de-France\",\"region_code\":\"IDF\",\"country\":\"FR\",\"country_name\":\"France\",\"continent_code\":\"EU\",\"postal\":\"93200\",\"latitude\":48.9333,\"longitude\":2.3667,\"timezone\":\"Europe/Paris\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+33\",\"currency\":\"EUR\",\"languages\":\"fr-FR,frp,br,co,ca,eu,oc\",\"asn\":\"AS199653\",\"org\":\"Aruba SAS\"}'),
(14, '2018-04-01 09:15:01', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"94.177.235.208\",\"city\":\"Paris\",\"region\":\"Île-de-France\",\"region_code\":\"IDF\",\"country\":\"FR\",\"country_name\":\"France\",\"continent_code\":\"EU\",\"postal\":\"93200\",\"latitude\":48.9333,\"longitude\":2.3667,\"timezone\":\"Europe/Paris\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+33\",\"currency\":\"EUR\",\"languages\":\"fr-FR,frp,br,co,ca,eu,oc\",\"asn\":\"AS199653\",\"org\":\"Aruba SAS\"}'),
(14, '2018-04-01 09:18:21', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:cdf0:5b3e:fb4b:eaf\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(0, '2018-04-01 09:20:12', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"matadertos\",\"location\":\"{\\\"height\\\":1080,\\\"width\\\":1920,\\\"appCodeName\\\":\\\"Mozilla\\\",\\\"appVersion\\\":\\\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\\\",\\\"language\\\":\\\"en-US\\\",\\\"platform\\\":\\\"Win32\\\",\\\"userAgent\\\":\\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\\\",\\\"ip\\\":\\\"84.77.201.3\\\",\\\"city\\\":\\\"Barcelona\\\",\\\"region\\\":\\\"Catalonia\\\",\\\"region_code\\\":\\\"CT\\\",\\\"country\\\":\\\"ES\\\",\\\"country_name\\\":\\\"Spain\\\",\\\"continent_code\\\":\\\"EU\\\",\\\"postal\\\":\\\"08001\\\",\\\"latitude\\\":41.3984,\\\"longitude\\\":2.1741,\\\"timezone\\\":\\\"Europe/Madrid\\\",\\\"utc_offset\\\":\\\"+0200\\\",\\\"country_calling_code\\\":\\\"+34\\\",\\\"currency\\\":\\\"EUR\\\",\\\"languages\\\":\\\"es-ES,ca,gl,eu,oc\\\",\\\"asn\\\":\\\"AS12479\\\",\\\"org\\\":\\\"Orange Espagne SA\\\"}\"}', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-01 09:20:19', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-01 09:34:37', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1\",\"ip\":\"2a01:c50e:2110:3800:1c8:15e2:6f0a:4776\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(15, '2018-04-01 09:37:52', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:cdf0:5b3e:fb4b:eaf\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-01 11:34:36', 1, '', '', '{\"height\":667,\"width\":375,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/10.6b8836 Mobile/15D100 Safari/604.5.6\",\"language\":\"es-ES\",\"platform\":\"iPhone\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/10.6b8836 Mobile/15D100 Safari/604.5.6\",\"ip\":\"2a01:c50e:2110:3800:c523:7c87:7ae3:51a4\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(15, '2018-04-01 11:53:33', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:cdf0:5b3e:fb4b:eaf\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(15, '2018-04-01 16:44:03', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-01 18:42:01', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:cdf0:5b3e:fb4b:eaf\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-02 08:43:33', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-02 08:44:35', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows)\",\"language\":\"en-GB\",\"platform\":\"Win64\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0\",\"ip\":\"84.77.201.3\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-02 16:06:19', 1, '', '', ''),
(14, '2018-04-03 12:52:57', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\"}'),
(14, '2018-04-04 20:17:04', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\"}'),
(14, '2018-04-05 18:08:41', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"213.143.49.253\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-05 19:12:58', 1, '', '', '{\"height\":1080,\"width\":1920,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\"}'),
(15, '2018-04-06 17:28:00', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"84.78.25.242\",\"city\":\"Valencia\",\"region\":\"Valencia\",\"region_code\":\"VC\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"46014\",\"latitude\":39.4698,\"longitude\":-0.3774,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}');
INSERT INTO `audit` (`idusuario`, `fecha`, `tipooperacion`, `observacion`, `aditionalinfo`, `location`) VALUES
(14, '2018-04-06 18:25:44', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"84.78.25.242\",\"city\":\"Valencia\",\"region\":\"Valencia\",\"region_code\":\"VC\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"46014\",\"latitude\":39.4698,\"longitude\":-0.3774,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(15, '2018-04-07 12:22:55', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:59ee:b14f:46d6:8c5d\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}'),
(14, '2018-04-07 12:28:36', 1, '', '', '{\"height\":534,\"width\":320,\"appCodeName\":\"Mozilla\",\"appVersion\":\"5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"language\":\"en-US\",\"platform\":\"Linux armv7l\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36\",\"ip\":\"2a01:c50e:2110:3800:59ee:b14f:46d6:8c5d\",\"city\":\"Barcelona\",\"region\":\"Catalonia\",\"region_code\":\"CT\",\"country\":\"ES\",\"country_name\":\"Spain\",\"continent_code\":\"EU\",\"postal\":\"08001\",\"latitude\":41.3984,\"longitude\":2.1741,\"timezone\":\"Europe/Madrid\",\"utc_offset\":\"+0200\",\"country_calling_code\":\"+34\",\"currency\":\"EUR\",\"languages\":\"es-ES,ca,gl,eu,oc\",\"asn\":\"AS12479\",\"org\":\"Orange Espagne SA\"}');

-- --------------------------------------------------------

--
-- Table structure for table `audit_tipooperaciones`
--

CREATE TABLE `audit_tipooperaciones` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `audit_tipooperaciones`
--

INSERT INTO `audit_tipooperaciones` (`id`, `descripcion`) VALUES
(1, 'Login Exitoso'),
(2, 'Login Denied');

-- --------------------------------------------------------

--
-- Table structure for table `conceptos`
--

CREATE TABLE `conceptos` (
  `id` int(11) UNSIGNED NOT NULL,
  `idusuario` int(11) UNSIGNED NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `credito` tinyint(4) NOT NULL,
  `fechaalta` datetime NOT NULL,
  `idestado` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `conceptos`
--

INSERT INTO `conceptos` (`id`, `idusuario`, `descripcion`, `credito`, `fechaalta`, `idestado`) VALUES
(61, 14, 'Suedo', 1, '2018-03-04 13:30:50', 0),
(62, 14, 'Supermercado', 0, '2018-03-04 13:31:01', 0),
(63, 14, 'Perros', 0, '2018-03-04 13:31:07', 0),
(64, 14, 'Viajes Work', 0, '2018-03-04 13:31:20', 0),
(65, 14, 'Comida Work', 0, '2018-03-04 13:31:27', 0),
(66, 14, 'Gym', 0, '2018-03-04 13:31:35', 0),
(67, 14, 'Beauty', 0, '2018-03-04 13:31:46', 0),
(68, 14, 'Salidas', 0, '2018-03-04 13:31:58', 0),
(69, 14, 'Ahorro', 1, '2018-03-04 13:32:31', 0),
(70, 14, 'Alquiler', 0, '2018-03-04 13:35:30', 0),
(71, 14, 'Orange', 0, '2018-03-04 13:35:56', 0),
(72, 14, 'Luz', 0, '2018-03-04 13:36:10', 0),
(73, 14, 'Gas', 0, '2018-03-04 13:36:12', 0),
(74, 14, 'Agua', 0, '2018-03-04 13:36:15', 0),
(75, 14, 'Seguros', 0, '2018-03-04 13:36:25', 0),
(76, 15, 'Plazo Fijo', 1, '2018-03-08 19:44:20', 0),
(77, 15, 'Varios', 0, '2018-03-08 19:44:29', 0),
(78, 14, 'Odontólogo', 0, '2018-03-08 20:06:00', 0),
(79, 14, 'Cursos', 0, '2018-03-08 20:18:47', 0),
(80, 15, 'Haras', 0, '2018-03-08 22:33:05', 0),
(81, 15, 'Ahorros Arg', 1, '2018-03-08 22:36:43', 0),
(82, 15, 'Netflix', 0, '2018-03-08 22:37:38', 0),
(83, 15, 'Venta Muebles', 1, '2018-03-08 22:38:48', 0),
(84, 14, 'Salud', 0, '2018-03-09 16:17:12', 0),
(85, 14, 'Reposteria', 0, '2018-03-12 21:10:22', 0),
(86, 16, 'Sueldo', 1, '2018-03-12 23:25:30', 0),
(87, 14, 'Deco Casa', 0, '2018-03-17 12:03:19', 0),
(88, 14, 'Ajuste', 1, '2018-03-17 12:05:24', 0),
(89, 14, 'Varios', 0, '2018-03-21 20:46:19', 0),
(90, 14, 'Viajes Mundo', 0, '2018-04-01 08:48:41', 0),
(91, 15, 'Pluralsight', 0, '2018-04-06 17:28:26', 0),
(92, 15, 'Tarjeta flor', 0, '2018-04-07 12:23:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `diario`
--

CREATE TABLE `diario` (
  `idconcepto` int(11) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL,
  `importe` decimal(12,2) NOT NULL,
  `fechaalta` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diario`
--

INSERT INTO `diario` (`idconcepto`, `fecha`, `importe`, `fechaalta`) VALUES
(40, '2018-02-19 00:00:00', '-50.00', '2018-02-19 18:26:51'),
(61, '2018-03-01 00:00:00', '3384.88', '2018-03-04 13:43:40'),
(61, '2018-04-02 00:00:00', '3038.00', '2018-03-28 17:41:37'),
(61, '2018-04-03 00:00:00', '1861.00', '2018-03-30 09:38:37'),
(61, '2018-04-04 00:00:00', '256.00', '2018-03-30 09:42:23'),
(61, '2018-04-05 00:00:00', '156.20', '2018-04-04 20:17:39'),
(61, '2018-04-06 00:00:00', '87.00', '2018-04-04 20:17:59'),
(62, '2018-03-03 00:00:00', '-31.00', '2018-03-04 13:44:13'),
(62, '2018-03-05 00:00:00', '-154.00', '2018-03-05 22:23:45'),
(62, '2018-03-07 00:00:00', '-12.50', '2018-03-08 20:07:45'),
(62, '2018-03-09 00:00:00', '-9.80', '2018-03-08 20:09:53'),
(62, '2018-03-10 00:00:00', '-6.75', '2018-03-09 13:57:29'),
(62, '2018-03-11 00:00:00', '-9.15', '2018-03-10 12:03:36'),
(62, '2018-03-12 00:00:00', '-215.00', '2018-03-10 17:08:38'),
(62, '2018-03-13 00:00:00', '-11.00', '2018-03-12 21:09:30'),
(62, '2018-03-15 00:00:00', '-3.00', '2018-03-14 17:50:26'),
(62, '2018-03-17 00:00:00', '-6.30', '2018-03-17 19:56:31'),
(62, '2018-03-18 00:00:00', '-95.00', '2018-03-17 16:45:18'),
(62, '2018-03-23 00:00:00', '-8.40', '2018-03-22 18:11:06'),
(62, '2018-03-24 00:00:00', '-28.60', '2018-03-23 20:34:22'),
(62, '2018-03-26 00:00:00', '-7.59', '2018-03-25 12:16:52'),
(62, '2018-03-27 00:00:00', '-12.00', '2018-03-26 16:57:05'),
(62, '2018-03-28 00:00:00', '-62.00', '2018-03-27 17:33:24'),
(62, '2018-04-01 00:00:00', '-25.00', '2018-03-31 20:38:49'),
(62, '2018-04-02 00:00:00', '-16.65', '2018-04-01 18:44:40'),
(62, '2018-04-06 00:00:00', '-10.00', '2018-04-05 19:13:04'),
(63, '2018-03-04 00:00:00', '-50.00', '2018-03-04 14:12:57'),
(63, '2018-03-18 00:00:00', '-10.00', '2018-03-17 16:52:36'),
(64, '2018-03-10 00:00:00', '-85.00', '2018-03-09 21:29:41'),
(64, '2018-03-18 00:00:00', '-43.50', '2018-03-17 12:02:42'),
(64, '2018-03-22 00:00:00', '-43.00', '2018-03-21 18:18:55'),
(64, '2018-03-23 00:00:00', '-10.20', '2018-03-22 07:01:33'),
(64, '2018-04-06 00:00:00', '-4.00', '2018-04-05 18:09:14'),
(65, '2018-03-05 00:00:00', '-8.50', '2018-03-05 22:23:57'),
(65, '2018-03-08 00:00:00', '-12.00', '2018-03-08 20:08:04'),
(65, '2018-03-10 00:00:00', '-3.60', '2018-03-09 21:30:59'),
(65, '2018-03-13 00:00:00', '-8.95', '2018-03-12 16:53:27'),
(65, '2018-03-14 00:00:00', '-0.75', '2018-03-13 19:37:43'),
(65, '2018-03-16 00:00:00', '-4.00', '2018-03-15 17:58:55'),
(65, '2018-03-20 00:00:00', '-0.50', '2018-03-19 18:13:36'),
(65, '2018-03-21 00:00:00', '-13.00', '2018-03-20 21:56:23'),
(65, '2018-03-23 00:00:00', '-11.50', '2018-03-22 13:13:32'),
(65, '2018-03-29 00:00:00', '-7.80', '2018-03-28 18:10:11'),
(65, '2018-03-30 00:00:00', '-12.00', '2018-03-30 09:40:00'),
(65, '2018-04-05 00:00:00', '-7.50', '2018-04-04 20:17:10'),
(66, '2018-04-04 00:00:00', '-60.00', '2018-04-03 12:53:04'),
(67, '2018-03-21 00:00:00', '-25.00', '2018-03-20 19:51:17'),
(68, '2018-03-04 00:00:00', '-4.50', '2018-03-05 22:24:43'),
(68, '2018-03-09 00:00:00', '-1.25', '2018-03-08 18:55:26'),
(68, '2018-03-10 00:00:00', '-19.00', '2018-03-09 21:31:07'),
(68, '2018-03-12 00:00:00', '-7.00', '2018-03-11 00:05:35'),
(68, '2018-03-13 00:00:00', '-22.00', '2018-03-12 06:27:18'),
(68, '2018-03-14 00:00:00', '-4.32', '2018-03-12 21:10:00'),
(68, '2018-03-21 00:00:00', '-7.00', '2018-03-20 21:59:21'),
(68, '2018-03-24 00:00:00', '-24.65', '2018-03-23 19:53:37'),
(68, '2018-03-26 00:00:00', '-14.25', '2018-03-25 20:17:53'),
(68, '2018-03-30 00:00:00', '-136.00', '2018-03-30 09:34:58'),
(68, '2018-04-01 00:00:00', '-26.00', '2018-03-31 20:38:33'),
(68, '2018-04-04 00:00:00', '-27.00', '2018-04-03 19:40:01'),
(68, '2018-04-05 00:00:00', '-7.00', '2018-04-04 20:17:19'),
(68, '2018-04-06 00:00:00', '-12.75', '2018-04-05 18:08:56'),
(68, '2018-04-07 00:00:00', '-6.00', '2018-04-06 18:34:00'),
(68, '2018-04-08 00:00:00', '-1.00', '2018-04-06 22:38:38'),
(71, '2018-04-08 00:00:00', '-126.00', '2018-04-07 11:31:33'),
(73, '2018-03-09 00:00:00', '0.00', '2018-03-08 18:54:48'),
(74, '2018-03-24 00:00:00', '0.00', '2018-03-23 16:36:15'),
(75, '2018-04-01 00:00:00', '-10.00', '2018-04-01 09:39:05'),
(75, '2018-04-02 00:00:00', '-140.00', '2018-04-01 09:37:47'),
(75, '2018-04-08 00:00:00', '-9.91', '2018-04-07 11:30:34'),
(76, '2018-03-09 00:00:00', '2000.00', '2018-03-08 19:44:36'),
(77, '2018-03-09 00:00:00', '0.00', '2018-03-08 19:44:43'),
(78, '2018-03-07 00:00:00', '-6.95', '2018-03-08 20:07:30'),
(78, '2018-03-09 00:00:00', '-500.00', '2018-03-08 20:10:04'),
(79, '2018-03-09 00:00:00', '-13.00', '2018-03-08 20:18:59'),
(79, '2018-04-02 00:00:00', '-7.26', '2018-04-01 09:15:11'),
(79, '2018-04-06 00:00:00', '-95.00', '2018-04-05 18:09:03'),
(79, '2018-04-07 00:00:00', '-4.00', '2018-04-06 18:34:14'),
(80, '2018-03-09 00:00:00', '-6278.00', '2018-03-08 22:37:15'),
(80, '2018-04-02 00:00:00', '-6181.00', '2018-04-01 16:44:08'),
(81, '2018-03-09 00:00:00', '127000.00', '2018-03-08 22:36:54'),
(82, '2018-03-09 00:00:00', '-169.00', '2018-03-08 22:39:08'),
(82, '2018-04-07 00:00:00', '-163.00', '2018-04-06 17:28:56'),
(84, '2018-03-20 00:00:00', '-3.90', '2018-03-19 17:42:55'),
(84, '2018-04-06 00:00:00', '-5.50', '2018-04-05 19:13:12'),
(85, '2018-03-13 00:00:00', '-274.00', '2018-03-12 21:10:32'),
(85, '2018-03-18 00:00:00', '-33.00', '2018-03-17 15:56:29'),
(86, '2018-03-13 00:00:00', '0.00', '2018-03-12 23:27:39'),
(86, '2018-03-18 00:00:00', '20000.00', '2018-03-17 14:38:00'),
(87, '2018-03-15 00:00:00', '-132.00', '2018-03-17 15:44:44'),
(87, '2018-03-16 00:00:00', '-103.00', '2018-03-17 14:29:00'),
(87, '2018-03-17 00:00:00', '-62.00', '2018-03-17 14:13:00'),
(87, '2018-03-18 00:00:00', '-443.00', '2018-03-17 12:03:31'),
(87, '2018-03-21 00:00:00', '-0.15', '2018-03-20 18:48:58'),
(88, '2018-03-18 00:00:00', '1212.00', '2018-03-17 12:06:38'),
(89, '2018-03-14 00:00:00', '-40.00', '2018-03-23 15:07:20'),
(89, '2018-03-22 00:00:00', '-588.00', '2018-03-21 20:46:33'),
(89, '2018-03-30 00:00:00', '-327.00', '2018-03-30 09:34:22'),
(89, '2018-04-03 00:00:00', '-50.00', '2018-04-06 17:24:57'),
(89, '2018-04-04 00:00:00', '-22.00', '2018-04-03 18:45:41'),
(89, '2018-04-08 00:00:00', '-0.74', '2018-04-07 11:30:52'),
(91, '2018-04-07 00:00:00', '-600.00', '2018-04-06 17:29:01'),
(92, '2018-04-08 00:00:00', '-325.00', '2018-04-07 12:23:24');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fechanacimiento` datetime NOT NULL,
  `fechaalta` datetime NOT NULL,
  `idestado` int(11) UNSIGNED NOT NULL,
  `password` varchar(255) NOT NULL,
  `moneda` varchar(255) NOT NULL,
  `intentosfallidoslogin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `nombre`, `fechanacimiento`, `fechaalta`, `idestado`, `password`, `moneda`, `intentosfallidoslogin`) VALUES
(14, 'flopyglorias@gmail.com', 'Flor', '1986-12-27 00:00:00', '2018-03-04 13:30:31', 0, 'sha1$0aba42ea$1$ffb674911b122a75a8721d1bd47c54a28670acb5', '€', 0),
(15, 'joseluiseiguren@gmail.com', 'Joseph', '1980-05-17 00:00:00', '2018-03-08 19:43:50', 0, 'sha1$790e9674$1$4afb8e2b92a59dd3f25e25c088e5b9a90d9af4c3', '$', 0),
(16, 'fernanda.eiguren@gmail.com', 'Fernanda Eiguren', '1988-05-14 00:00:00', '2018-03-12 23:23:01', 0, 'sha1$a53c3e8c$1$479923b420203b70ed2a71a18426119aa00c4822', '$', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit`
--
ALTER TABLE `audit`
  ADD KEY `fk_audit_tipooperacion_idx` (`tipooperacion`);

--
-- Indexes for table `audit_tipooperaciones`
--
ALTER TABLE `audit_tipooperaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conceptos`
--
ALTER TABLE `conceptos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diario`
--
ALTER TABLE `diario`
  ADD PRIMARY KEY (`idconcepto`,`fecha`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conceptos`
--
ALTER TABLE `conceptos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit`
--
ALTER TABLE `audit`
  ADD CONSTRAINT `fk_audit_tipooperacion` FOREIGN KEY (`tipooperacion`) REFERENCES `audit_tipooperaciones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

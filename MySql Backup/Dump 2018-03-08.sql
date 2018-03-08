-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql2.freemysqlhosting.net
-- Generation Time: Mar 08, 2018 at 09:05 PM
-- Server version: 5.5.54-0ubuntu0.12.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

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

-- --------------------------------------------------------

--
-- Table structure for table `audit`
--

CREATE TABLE `audit` (
  `idusuario` int(10) UNSIGNED DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipooperacion` int(10) UNSIGNED NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `aditionalinfo` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `audit`
--

INSERT INTO `audit` (`idusuario`, `fecha`, `tipooperacion`, `observacion`, `aditionalinfo`) VALUES
(0, '2018-03-02 18:51:54', 2, NULL, NULL),
(0, '2018-03-02 18:56:35', 2, 'Email / Password no informado', 'joseluiseiguren@gmail.com'),
(0, '2018-03-02 18:58:19', 2, 'Email / Password no informado', '[object Object]'),
(0, '2018-03-02 19:00:24', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}'),
(0, '2018-03-02 19:05:38', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}'),
(0, '2018-03-02 19:11:55', 2, '{\"message\":\"Email / Password no informado\"}', '{\"email\":\"joseluiseiguren@gmail.com\"}'),
(1, '2018-03-02 19:18:06', 1, '', ''),
(1, '2018-03-04 11:21:46', 1, '', ''),
(1, '2018-03-04 12:33:00', 1, '', ''),
(14, '2018-03-04 13:30:38', 1, '', ''),
(14, '2018-03-04 13:46:40', 1, '', ''),
(14, '2018-03-05 22:23:34', 1, '', ''),
(1, '2018-03-07 18:37:02', 1, '', ''),
(1, '2018-03-07 18:46:16', 1, '', ''),
(0, '2018-03-07 22:45:57', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"321\"}'),
(0, '2018-03-07 22:46:03', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"MATADEROS\"}'),
(14, '2018-03-07 22:46:13', 1, '', ''),
(0, '2018-03-08 18:16:34', 2, '{\"message\":\"Password Invalido\"}', '{\"email\":\"flopyglorias@gmail.com\",\"password\":\"1\"}'),
(14, '2018-03-08 18:16:40', 1, '', ''),
(14, '2018-03-08 18:17:02', 1, '', ''),
(0, '2018-03-08 18:53:14', 2, '{\"message\":\"Usuario Inexistente\"}', '{\"email\":\"flopyglorias@hotmail.com\",\"password\":\"mataderos\"}'),
(14, '2018-03-08 18:53:35', 1, '', ''),
(14, '2018-03-08 18:55:15', 1, '', ''),
(14, '2018-03-08 19:00:09', 1, '', ''),
(14, '2018-03-08 19:43:15', 1, '', ''),
(15, '2018-03-08 19:44:04', 1, '', ''),
(15, '2018-03-08 19:45:19', 1, '', ''),
(14, '2018-03-08 20:05:35', 1, '', '');

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
(79, 14, 'Cursos', 0, '2018-03-08 20:18:47', 0);

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
(62, '2018-03-03 00:00:00', '-31.00', '2018-03-04 13:44:13'),
(62, '2018-03-05 00:00:00', '-154.00', '2018-03-05 22:23:45'),
(62, '2018-03-07 00:00:00', '-12.50', '2018-03-08 20:07:45'),
(62, '2018-03-09 00:00:00', '-9.80', '2018-03-08 20:09:53'),
(63, '2018-03-04 00:00:00', '-50.00', '2018-03-04 14:12:57'),
(65, '2018-03-05 00:00:00', '-8.50', '2018-03-05 22:23:57'),
(65, '2018-03-08 00:00:00', '-12.00', '2018-03-08 20:08:04'),
(68, '2018-03-04 00:00:00', '-4.50', '2018-03-05 22:24:43'),
(68, '2018-03-09 00:00:00', '-1.25', '2018-03-08 18:55:26'),
(73, '2018-03-09 00:00:00', '0.00', '2018-03-08 18:54:48'),
(76, '2018-03-09 00:00:00', '2700.00', '2018-03-08 19:44:36'),
(77, '2018-03-09 00:00:00', '-50.26', '2018-03-08 19:44:43'),
(78, '2018-03-07 00:00:00', '-6.95', '2018-03-08 20:07:30'),
(78, '2018-03-09 00:00:00', '-500.00', '2018-03-08 20:10:04'),
(79, '2018-03-09 00:00:00', '-13.00', '2018-03-08 20:18:59');

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
  `moneda` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `nombre`, `fechanacimiento`, `fechaalta`, `idestado`, `password`, `moneda`) VALUES
(14, 'flopyglorias@gmail.com', 'Flor', '1986-12-27 00:00:00', '2018-03-04 13:30:31', 0, 'sha1$0aba42ea$1$ffb674911b122a75a8721d1bd47c54a28670acb5', '€'),
(15, 'joseluiseiguren@gmail.com', 'Joseph', '1980-05-16 00:00:00', '2018-03-08 19:43:50', 0, 'sha1$da33a778$1$01517b43d706e08815aaa7eace359b854fa32f20', '€');

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
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

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-03-2023 a las 18:45:19
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apligood`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarios` varchar(200) NOT NULL,
  `cargo` varchar(200) NOT NULL,
  `img_id` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `info` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `usuarios`, `cargo`, `img_id`, `info`) VALUES
(6, 'Marcos Gutierrez', 'Programador', 'jywwicd3ir0aapnf2s5k', 'Telefono: 3364626278'),
(15, 'Lionel Montes', 'Contador', 'ceyawszvahd12va5jx2m', 'Telefono: 114578126'),
(14, 'Sofia Williams', 'Community manager', 'd6xpcwgln6uv0nbzcbzb', 'Instagram: @Sofiwilliams'),
(12, 'Nicolas Ramirez', 'Abogado', 'sblzgrjdnhuajxjfr1ly', 'Teléfono: 118844662\r\nEmail: Nico@abogado.com\r\nSitio: www.abogado.com'),
(13, 'Romina Arias Muñoz', 'Arquitecta', 'phnayqiucnjxmxpyrnhx', 'Sitio web: www.arquitectos.com'),
(16, 'Gonzalo Gutierrez', 'Cortador de cesped', 'yohucybgm4izfdojgvmf', 'Telefono: 341556692'),
(17, 'Julio Gomez', 'Electricista/Cerrajero', 'ir5yhf7y9hkipjbbgb2u', 'Teléfono: 119966334'),
(18, 'Juana Gimenez', 'Psicóloga', 'ruldssdfrqbi3xwppos2', 'Teléfono: 113322997');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 'facu', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

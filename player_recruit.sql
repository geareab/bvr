-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2023 at 09:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `player_recruit`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` int(50) NOT NULL,
  `blocked_by` int(50) NOT NULL,
  `blocked` int(50) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blocked`
--

INSERT INTO `blocked` (`id`, `blocked_by`, `blocked`, `created_at`) VALUES
(33, 45, 52, '2022-07-27');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(50) NOT NULL,
  `state_id` int(50) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `state_id`, `city_name`) VALUES
(1, 1, 'Bangalore'),
(2, 1, 'Mangalore'),
(3, 1, 'COORG'),
(4, 1, 'Tumkur'),
(5, 2, 'Jodhpur'),
(6, 2, 'Jaipur'),
(7, 2, 'Bikaner'),
(8, 2, 'Jaisalmer'),
(9, 2, 'Pali'),
(10, 2, 'Pushkar'),
(11, 3, 'Mumbai'),
(12, 3, 'Pune'),
(13, 3, 'Lonavala'),
(14, 3, 'Lavasa'),
(15, 3, 'Thane'),
(16, 4, 'South Goa'),
(17, 4, 'North Goa'),
(18, 5, 'Ahmedabad'),
(19, 5, 'Gandhinagar'),
(20, 5, 'Surat'),
(21, 5, 'Jamnagar'),
(22, 5, 'Kheda');

-- --------------------------------------------------------

--
-- Table structure for table `coach_divisions`
--

CREATE TABLE `coach_divisions` (
  `id` int(50) NOT NULL,
  `divisions` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_divisions`
--

INSERT INTO `coach_divisions` (`id`, `divisions`) VALUES
(1, '1st'),
(2, '2nd'),
(3, '3rd');

-- --------------------------------------------------------

--
-- Table structure for table `coach_filter`
--

CREATE TABLE `coach_filter` (
  `id` int(50) NOT NULL,
  `registration_id` int(50) NOT NULL,
  `states` varchar(2000) NOT NULL,
  `sports` varchar(2000) NOT NULL,
  `positions` varchar(2000) NOT NULL,
  `min_height` double NOT NULL,
  `max_height` double NOT NULL,
  `min_weight` double NOT NULL,
  `max_weight` double NOT NULL,
  `min_age` int(50) NOT NULL,
  `max_age` int(50) NOT NULL,
  `years` varchar(2000) NOT NULL,
  `min_gpa` double NOT NULL,
  `max_gpa` double NOT NULL,
  `min_sat` double NOT NULL,
  `max_sat` double NOT NULL,
  `min_act` double NOT NULL,
  `max_act` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_filter`
--

INSERT INTO `coach_filter` (`id`, `registration_id`, `states`, `sports`, `positions`, `min_height`, `max_height`, `min_weight`, `max_weight`, `min_age`, `max_age`, `years`, `min_gpa`, `max_gpa`, `min_sat`, `max_sat`, `min_act`, `max_act`) VALUES
(62, 49, 'null', 'null', 'null', 0, 300, 0, 300, 0, 100, 'null', 0, 4, 0, 300, 0, 300),
(131, 47, 'null', 'null', 'null', 0, 300, 0, 300, 0, 100, 'null', 0, 4, 0, 300, 0, 300),
(155, 52, 'null', 'null', 'null', 0, 10, 0, 300, 0, 100, 'null', 0, 4, 0, 300, 0, 300);

-- --------------------------------------------------------

--
-- Table structure for table `coach_registration`
--

CREATE TABLE `coach_registration` (
  `id` int(50) NOT NULL,
  `registration_id` int(50) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(200) NOT NULL,
  `state` int(50) NOT NULL,
  `city` int(50) NOT NULL,
  `college_name` int(50) NOT NULL,
  `college_state` int(50) NOT NULL,
  `university_email` varchar(200) NOT NULL,
  `coaching_sport` int(50) NOT NULL,
  `coaching_gender` varchar(200) NOT NULL,
  `team` varchar(200) NOT NULL,
  `division` int(50) NOT NULL,
  `jobtitle` varchar(500) NOT NULL,
  `personal_bio` varchar(2000) NOT NULL,
  `video` varchar(500) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `views` int(50) NOT NULL DEFAULT 0,
  `visibility` varchar(100) NOT NULL DEFAULT 'Always',
  `notification_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_registration`
--

INSERT INTO `coach_registration` (`id`, `registration_id`, `firstname`, `lastname`, `dob`, `gender`, `state`, `city`, `college_name`, `college_state`, `university_email`, `coaching_sport`, `coaching_gender`, `team`, `division`, `jobtitle`, `personal_bio`, `video`, `image`, `views`, `visibility`, `notification_token`) VALUES
(3, 44, 'Dinesh', 'Suthar', '1989-06-01', 'Male', 1, 1, 1, 1, 'dinesh.suthar@btech.christuniversity.in', 1, 'Female', 'RCB', 2, 'Senior coach', 'Welcome to my profile....', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654095866702.jpg', 69, 'Always', NULL),
(4, 46, 'Dinesh', 'Suthar', '1992-06-04', 'Male', 2, 1, 1, 1, 'dinesh.suthar@btech.christuniversity.in', 4, 'Male', 'Blast', 2, 'Coach', 'Hello sir ', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654345508005.jpg', 129, 'Always', NULL),
(5, 47, 'Rohit ', 'Sharma', '1996-06-06', 'Male', 3, 5, 1, 3, 'rohit@gmail.com', 5, 'Male', 'RM', 2, 'Head Coach ', 'What\'s up', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654515080732.jpg', 62, 'Never', NULL),
(6, 49, 'Rina', 'Singh', '1966-06-07', 'Female', 3, 5, 1, 3, 'Rima@iit.in', 1, 'Female', 'BUTCHERS', 2, 'Junior coach', 'Welcome', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654597560854.jpg', 46, 'Always', 'ExponentPushToken[tL6P7KMg8EUf_eehUchjhV]'),
(7, 52, 'Manish', 'Gehlot', '2022-06-16', 'Male', 2, 6, 4, 3, 'Manak@gmail.com', 4, 'Male', 'RK', 3, 'Just coach', 'Hello', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1656844243220.jpg', 96, 'Always', 'ExponentPushToken[AMAOdEBni8WUQhaCRm7-1r]'),
(8, 60, 'Hshs', 'Hshs', '2022-06-07', 'Male', 2, 9, 1, 1, 'Hahaha@gmail.in', 3, 'Male', 'Jaaj', 2, 'naa', 'Hello', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655290764697.jpg', 137, 'Always', NULL),
(9, 63, 'Chikhu', 'Kkaka', '2022-06-15', 'Male', 3, 9, 1, 2, 'Nsns@gmail.in', 2, 'Male', 'Jxjd', 2, 'Coahc', 'Udhdjrj', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655299198769.jpg', 20, 'Always', NULL),
(10, 66, 'Cvviv', 'Uc', '2022-06-16', 'Male', 2, 5, 1, 1, 'Ddfdff@gmail.com', 1, 'Male', 'Vgh', 2, 'Coach', 'Hcj', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655445701753.jpg', 16, 'Always', NULL),
(11, 86, 'dinesh', 'sutthar', '1999-10-09', 'male', 1, 0, 0, 1, 'dinesh@christ.in', 1, 'male', 'Dravidham', 1, 'senior coach', 'hello there', 'https://www.youtube.com/tEssaXc12F', NULL, 0, 'Always', NULL),
(12, 88, 'rahul', 'kumar', '1999-10-09', 'male', 1, 0, 0, 1, 'rahul@du.ac.in', 1, 'male', 'Dravidsham', 1, 'senior coach', 'helloss there', 'https://www.youtube.com/tEssaXc12F', 'brand-21684155985724.png', 0, 'Always', NULL),
(14, 93, 'dinesh', 'suthar', '1999-10-09', 'male', 1, 0, 0, 1, 'dinesh@christ.in', 1, 'male', 'Dravidham', 1, 'senior coach', 'hello there', 'https://www.youtube.com/tEssaXc12F', NULL, 0, 'Always', NULL),
(15, 99, 'danesh', 'suuthar', '1999-10-09', 'male', 1, 1, 1, 1, 'dinesh@677ghrust.in', 1, 'male', 'Dravidham', 1, 'senior coach', 'hello there', 'https://www.youtube.com/tEssaXc12F', NULL, 0, 'Always', NULL),
(16, 100, 'Coach', 'New1', '2023-06-05', 'Male', 1, 1, 1, 1, 'ccc@cc.com', 1, 'Male', 'cr', 1, 'coach', 'test', 'http://teeest.com', NULL, 0, 'Always', NULL),
(17, 103, 'ansh', 'verma', '2000-06-07', 'Male', 2, 8, 2, 2, 'anshu@bits.edu', 1, 'Male', 'rcb', 3, 'coach ', 'good', 'www.youtube', NULL, 0, 'always', NULL),
(18, 106, 'coach', 'new', '2000-06-09', 'Male', 1, 1, 3, 2, 'cr@vit.com', 2, 'Male', 'test', 1, 'test', 'test', 'http://test.com', 'cb1dad82-0afd-4391-aebe-06d7dbb6b93d335063299578718821685986289054.jpg', 0, 'Always', NULL),
(19, 123, 'manish', 'verma', '1995-06-09', 'Male', 2, 6, 4, 3, 'cicdu@gmail.com', 2, 'Male', 'ashoka', 1, 'coach', 'fghjvcdh', 'ffukk', 'IMG202306090009411686284167034.jpg', 0, 'Always', NULL),
(20, 126, 'lj', 'b', '2000-06-09', 'Male', 1, 3, 1, 1, 'uni@email.com', 3, 'Male', 'tigers', 1, 'coach', 'testing bio', 'https://en.wikipedia.org/wiki/Turing_pattern', 'USATSI_104650091686302611003.jpg', 0, 'Always', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `id` int(50) NOT NULL,
  `college_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `college_name`) VALUES
(1, 'Christ'),
(2, 'BITS'),
(3, 'VIT'),
(4, 'IIT Kharagpur'),
(5, 'MIT'),
(6, 'IIT Kanpur'),
(7, 'IIT Delhi'),
(8, 'IIT Mumbai'),
(9, 'IIT Gowahati'),
(10, 'IIT Madras');

-- --------------------------------------------------------

--
-- Table structure for table `ethnicity`
--

CREATE TABLE `ethnicity` (
  `id` int(50) NOT NULL,
  `ethnicities` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ethnicity`
--

INSERT INTO `ethnicity` (`id`, `ethnicities`) VALUES
(1, 'White'),
(2, 'Black'),
(3, 'Hispanic'),
(4, 'Asian American/Pacific Islander'),
(5, 'American Indian'),
(6, 'Unclassified');

-- --------------------------------------------------------

--
-- Table structure for table `gpa`
--

CREATE TABLE `gpa` (
  `id` int(50) NOT NULL,
  `gpa` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gpa`
--

INSERT INTO `gpa` (`id`, `gpa`) VALUES
(1, 4),
(2, 3.7),
(3, 3.2),
(4, 3),
(5, 2.7),
(6, 2.2),
(7, 2),
(8, 1.7),
(9, 1.2),
(10, 1),
(11, 0.7),
(12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(50) NOT NULL,
  `student_regid` int(50) NOT NULL,
  `coach_regid` int(50) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `coach_seen` varchar(50) NOT NULL DEFAULT 'Unread',
  `student_seen` varchar(50) NOT NULL DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `student_regid`, `coach_regid`, `created_at`, `coach_seen`, `student_seen`) VALUES
(2, 50, 66, '2022-06-17', 'Unread', 'Read'),
(3, 50, 60, '2022-06-17', 'Unread', 'Read'),
(4, 54, 60, '2022-06-17', 'Unread', 'Read'),
(8, 50, 46, '2022-06-24', 'Unread', 'Read'),
(10, 67, 46, '2022-06-24', 'Unread', 'Unread'),
(11, 50, 46, '2022-06-24', 'Unread', 'Read'),
(12, 51, 60, '2022-07-14', 'Unread', 'Unread'),
(15, 67, 47, '2022-07-21', 'Read', 'Unread'),
(25, 54, 47, '2022-07-23', 'Read', 'Read'),
(26, 54, 63, '2022-07-24', 'Read', 'Read'),
(28, 67, 49, '2022-07-25', 'Read', 'Unread'),
(30, 51, 49, '2022-07-25', 'Read', 'Unread'),
(50, 50, 52, '2022-07-25', 'Read', 'Read'),
(51, 50, 47, '2022-07-25', 'Read', 'Read'),
(54, 54, 49, '2022-07-25', 'Read', 'Read'),
(55, 50, 49, '2022-07-25', 'Read', 'Read'),
(58, 54, 52, '2022-07-26', 'Read', 'Read'),
(59, 45, 52, '2022-07-27', 'Read', 'Read'),
(60, 45, 47, '2022-07-27', 'Read', 'Read'),
(61, 45, 60, '2022-07-27', 'Unread', 'Read'),
(62, 67, 63, '2022-12-02', 'Read', 'Unread'),
(63, 50, 63, '2022-12-06', 'Read', 'Unread'),
(64, 45, 63, '2022-12-07', 'Unread', 'Read'),
(66, 4, 88, '2023-05-16', 'Unread', 'Unread'),
(67, 4, 98, '2023-05-31', 'Unread', 'Unread'),
(68, 4, 98, '2023-05-31', 'Unread', 'Unread'),
(69, 98, 98, '2023-05-31', 'Unread', 'Unread');

-- --------------------------------------------------------

--
-- Table structure for table `player_sports`
--

CREATE TABLE `player_sports` (
  `id` int(50) NOT NULL,
  `registration_id` int(50) NOT NULL,
  `sport` int(50) NOT NULL,
  `position` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_sports`
--

INSERT INTO `player_sports` (`id`, `registration_id`, `sport`, `position`) VALUES
(2, 43, 2, 2),
(6, 48, 1, 1),
(7, 48, 3, 3),
(8, 48, 5, 2),
(13, 51, 2, 3),
(14, 51, 1, 3),
(15, 51, 3, 3),
(16, 51, 5, 3),
(17, 53, 1, 1),
(18, 53, 2, 2),
(22, 55, 1, 1),
(23, 55, 3, 3),
(24, 55, 3, 3),
(25, 59, 3, 2),
(26, 61, 2, 1),
(27, 61, 4, 2),
(28, 62, 2, 2),
(29, 62, 4, 3),
(30, 64, 2, 1),
(31, 64, 4, 3),
(32, 65, 2, 1),
(33, 67, 2, 1),
(63, 74, 1, 1),
(80, 75, 1, 1),
(87, 50, 3, 2),
(88, 50, 1, 2),
(124, 76, 1, 2),
(125, 54, 4, 1),
(126, 54, 3, 2),
(127, 54, 2, 2),
(128, 54, 3, 3),
(129, 78, 1, 1),
(137, 45, 3, 2),
(138, 45, 4, 3),
(139, 82, 1, 1),
(140, 82, 3, 3),
(141, 82, 3, 3),
(142, 84, 1, 1),
(143, 84, 3, 3),
(144, 84, 3, 3),
(145, 87, 1, 1),
(146, 87, 3, 3),
(147, 87, 3, 3),
(148, 89, 1, 1),
(149, 89, 3, 3),
(150, 89, 3, 3),
(151, 92, 1, 1),
(157, 94, 1, NULL),
(158, 94, 2, NULL),
(159, 101, 4, NULL),
(160, 104, 2, NULL),
(161, 104, 3, NULL),
(162, 105, 2, NULL),
(163, 105, 4, NULL),
(164, 107, 1, NULL),
(165, 107, 2, NULL),
(166, 108, 1, NULL),
(167, 108, 2, NULL),
(168, 97, 3, NULL),
(169, 110, 2, NULL),
(170, 111, 1, NULL),
(171, 111, 3, NULL),
(172, 111, 3, NULL),
(173, 112, 1, NULL),
(174, 112, 3, NULL),
(175, 112, 3, NULL),
(176, 113, 1, NULL),
(177, 113, 3, NULL),
(178, 113, 3, NULL),
(179, 114, 1, NULL),
(180, 115, 1, NULL),
(181, 115, 3, NULL),
(182, 115, 3, NULL),
(183, 116, 1, NULL),
(184, 116, 3, NULL),
(185, 116, 3, NULL),
(186, 116, 1, NULL),
(187, 116, 3, NULL),
(188, 116, 3, NULL),
(189, 116, 1, NULL),
(190, 116, 3, NULL),
(191, 116, 3, NULL),
(192, 116, 1, NULL),
(193, 116, 3, NULL),
(194, 116, 3, NULL),
(195, 116, 1, NULL),
(196, 116, 3, NULL),
(197, 116, 3, NULL),
(198, 117, 1, NULL),
(199, 117, 3, NULL),
(200, 117, 3, NULL),
(201, 118, 1, NULL),
(202, 118, 3, NULL),
(203, 118, 3, NULL),
(204, 118, 1, NULL),
(205, 118, 3, NULL),
(206, 118, 3, NULL),
(207, 118, 1, NULL),
(208, 118, 3, NULL),
(209, 118, 3, NULL),
(210, 118, 1, NULL),
(211, 118, 3, NULL),
(212, 118, 3, NULL),
(213, 118, 1, NULL),
(214, 118, 3, NULL),
(215, 118, 3, NULL),
(216, 118, 1, NULL),
(217, 118, 3, NULL),
(218, 118, 3, NULL),
(219, 118, 1, NULL),
(220, 118, 3, NULL),
(221, 118, 3, NULL),
(222, 118, 1, NULL),
(223, 118, 3, NULL),
(224, 118, 3, NULL),
(225, 118, 1, NULL),
(226, 118, 3, NULL),
(227, 118, 3, NULL),
(228, 118, 1, NULL),
(229, 118, 3, NULL),
(230, 118, 3, NULL),
(231, 118, 1, NULL),
(232, 118, 3, NULL),
(233, 118, 3, NULL),
(234, 118, 1, NULL),
(235, 118, 3, NULL),
(236, 118, 3, NULL),
(237, 118, 1, NULL),
(238, 118, 3, NULL),
(239, 118, 3, NULL),
(240, 118, 1, NULL),
(241, 118, 3, NULL),
(242, 118, 3, NULL),
(243, 118, 1, NULL),
(244, 118, 3, NULL),
(245, 118, 3, NULL),
(246, 118, 1, NULL),
(247, 118, 3, NULL),
(248, 118, 3, NULL),
(249, 118, 1, NULL),
(250, 118, 3, NULL),
(251, 118, 3, NULL),
(252, 118, 1, NULL),
(253, 118, 3, NULL),
(254, 118, 3, NULL),
(255, 125, 2, NULL),
(256, 125, 3, NULL),
(257, 125, 4, NULL),
(258, 124, 1, NULL),
(259, 124, 2, NULL),
(260, 127, 2, NULL),
(261, 127, 3, NULL),
(262, 127, 4, NULL),
(263, 127, 2, NULL),
(264, 127, 3, NULL),
(265, 127, 4, NULL),
(266, 98, 0, NULL),
(267, 98, 0, NULL),
(276, 129, 1, NULL),
(277, 129, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int(50) NOT NULL,
  `position` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `position`) VALUES
(1, '1st'),
(2, '2nd'),
(3, '3rd');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(50) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `password` varchar(500) NOT NULL,
  `otp_status` varchar(10) NOT NULL DEFAULT '0',
  `account_type` varchar(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `username`, `email`, `phone`, `otp`, `password`, `otp_status`, `account_type`) VALUES
(43, 'Sidhu', 'dinesh.suthar@btech.christuniversity.in', '9828303145', '7704', '$2b$10$H2FvDzD/oPJSTi9dKBLwLejEvadgwSmm9b7Lh8DcYBQf4jQwXEyEG', '1', '1'),
(44, 'Vikcy', 'Vikram@gmail.com', '9610300118', '5897', '$2b$10$8oTsm8pfNdxtQt5D.A8hweJCEt1lyMXjT7uR./kx.ve.tQsDjDfNi', '1', '2'),
(45, 'dinesh', 'dinesh.asdev99@gmail.com', '9610300116', '2746', '$2b$10$nzmygDIUkTnTZmTXsPYJhODUnNW3vZN8uQiMo9eDs.PEVnbVDzcsq', '1', '1'),
(46, 'vickysingh', 'dinesh@gmail.com', '9987654321', '6931', '$2b$10$0njdhDizkbSvfsXPmLE4Nuns4LJiPfB1DDVah0kCCB2RDACz.1BGK', '1', '2'),
(47, 'rohitsharma', 'Rohit@gmail.com', '7894561230', '1219', '$2b$10$Bdbvszq59jtHqEuovJVK9u7Y.P9j6huj1CIAy4hSwLhaCaSmeiDFe', '1', '2'),
(48, 'naveen', 'Naveen@gmail.com', '7418529630', '7336', '$2b$10$iCMxUcbl0WJgBd.L7wMALuzGxEws37UQyzPtyp9CHTpZF/ogRteyq', '1', '1'),
(49, 'ram', 'Ram@gmail.in', '9638527410', '9161', '$2b$10$Rt0Qz0bzivbUV5nHE2zoxe7qxXEeX87hHQOhB5zg220IgFoW6kx6m', '1', '2'),
(50, 'nripesh', 'Nrip@gmail.in', '9871234560', '9705', '$2b$10$l5HELzcibbsBzH0ZikIvgeNHImLPA4T1I5rHHsj4S/yGLUUAHOSXO', '1', '1'),
(51, 'mukesh', 'Mukesh@gmail.in', '8521479630', '9963', '$2b$10$FyZL9BSe41I3wYzN6UPkS.L2MExQxztr8eTb2HGVo.Xp3rrH9FU.u', '1', '1'),
(52, 'manak', 'Manak@gmail.com', '6549873218', '8543', '$2b$10$th.3dC2LUcWDmifKRQkAVuztW1Ple27zI/N7nXXV3ij.HCOlEideq', '1', '2'),
(53, 'narpat', 'Nar@gmail.com', '9784653120', '9533', '$2b$10$htyVjpBR8s1tZmhCgXqV0ODtDNcki661I5JewPkEvTSl/rlwrJ2xG', '1', '1'),
(54, 'jai', 'asdevdinesh@gmail.com', '9610454886', '6605', '$2b$10$W2DZsuN7lxYUs7rQu4VtC.u0s8BDoMGLNxLVlfQed7.a8qPcWe49.', '1', '1'),
(55, 'sunil', 'Sunil@gmail.com', '9874563222', '1712', '$2b$10$rT1ZiW.VwhEagFWsk9IYZu75TH0k0ey3DxeeGRPgoi8Lm0e2TAwPW', '1', '1'),
(56, 'ritvik', 'asdev@gmail.com', '9787546416', '8599', '$2b$10$zuGCqUxfjRwhgqYwUu2ygOs2siDGTha9rE1FKk5VauPEw9sQkuKr.', '1', '0'),
(59, 'asdev', 'asdev@aasg.com', '5242424234', '2854', '$2b$10$3SF6hfwKoTSwjODdGFpP6O/D7E.OKCD24eEXc/2oTRlgSZJQC4CE.', '1', '1'),
(60, 'prithvi', 'Prithvi@gmail.in', '9464615188', '6400', '$2b$10$oYVLUIl581WXj6V.BbL10.qH4Z2VhnMUgcLtH8rBFPpa5UDlrc8MW', '1', '2'),
(61, 'bbbvv', 'Bbb@gmail.in', '8745662409', '1304', '$2b$10$AJggnQ4n8fMpdVxtHf6z1OD6DQSvV9CTHjYgrStmZPdukosnkoXZG', '1', '1'),
(62, 'munsi', 'Munsi@gmail.com', '9484846418', '4976', '$2b$10$7wUUyNaBxHtXR5a8ikbFI.i6HWu1Ktia5L8SO6k6gjWdODgruAavO', '1', '1'),
(63, 'jay', 'Jaynaan@gmail.in', '6194848488', '3063', '$2b$10$nV0iQ.ZJDGInbvM86etCyukdnqhB7siEW40Ab14JlqP4vHfLR.NqC', '1', '2'),
(64, 'bsbs', 'Hsjs@gmail.com', '9494949494', '6108', '$2b$10$blXRaN93mXTFBcwt3gFXYOygyu40tKE4Bz3ZzT1u.hrC7KYG4Kh5a', '1', '1'),
(65, 'nsns', 'Nssn@gmail.in', '9646494397', '9719', '$2b$10$fhJ9PjPzwUsZxmYWq3/7HeVNlmiE/PfcCOSEs7brlmrBMM8aKAu4G', '1', '1'),
(66, 'bbn', 'Ccvvv@gmail.in', '9988505726', '8651', '$2b$10$.IaZi3mLidm5JNDAvjyjPeJn/yQaMNnYB65UjDzfqY3/BxlVGQiQ2', '1', '2'),
(67, 'nabba', 'Aanna@gmail.in', '9794645548', '3076', '$2b$10$Xv0XIS57bEpNR8YRQ0ivteExHJTfVh0xody8oUS.7PdZ5cxl/1uIu', '1', '1'),
(68, 'dineshsnm', 'Nanan@gmail.com', '9649484816', '5912', '$2b$10$jQ2pDKMx2A7neacsg4q3hOqBQVs03mP1fG9vHhOMjpRG76Us5X9tG', '1', '0'),
(70, 'asd', 'faad@gmail.com', '3443423412', '4280', '$2b$10$fpqyjB6hpGM/9wOblecgq.TfpMYmdAP/TbgPBR2plBmXAla7u8jge', '', '0'),
(71, 'vishnuu', 'Jsja@gmail.vom', '9464619949', '3385', '$2b$10$b3MNmGiudhwfdA4s8a0MMuq4leiwCHmWKqVpqK2/FtbieV.UA1/AO', '1', '0'),
(74, 'nsn', 'Jaja@gmail.com', '9494949949', '9642', '$2b$10$WaVFG5VHpumAg2GaKXY3N.cx5ibaDzg.J/TOE36ieuCKVD2yB.KNi', '1', '1'),
(75, 'bznz', 'Hhs@gmail.com', '6767979797', '8073', '$2b$10$85wmbH73g0oNhQFlPM5NVeS9xcemTzDi8yMmJ.CGC6uNONn2eohhq', '1', '1'),
(76, 'punit', 'Punit@gmail.com', '9487846464', '2062', '$2b$10$xulJZuPXkWH4d.P0CDHDj.WosVXlx0.TzEBMoLWb.zvkBZLMCFiuK', '1', '1'),
(77, 'vikram', 'Vikas@gmail.com', '8795462130', '5596', '$2b$10$ZL2Ku88w3n3gwToOHr.KmeHLWZWx8OK9mH/AwieDoTNUN/vGLdPsO', '1', '0'),
(78, 'qwertyuiop', 'Qwertyuiop@gmail.com', '1234564852', '7178', '$2b$10$0njdhDizkbSvfsXPmLE4Nuns4LJiPfB1DDVah0kCCB2RDACz.1BGK', '1', '1'),
(80, 'Dinesh123', 'saif@gmaiil.com', '961030000', '2595', '$2b$10$G.chZsFj/PvN3kj79/LCsOJ9fLb1Y1uc3klSpPEeAZ3FJLOUYH.Pe', '1', '0'),
(82, 'Dinesh1234', 'saifi@gmaiil.com', '9610300010', '7056', '$2b$10$Rh/gvpgfAS.N/Yp2pws0ZevkngQzfdQSBQHaIg1Fqb3f4KJNw6c.W', '1', '1'),
(83, 'Dinesh1256', 'saifi12@gmaiil.com', ' ', '5536', '$2b$10$UCXQQVxxZpiJbjGmmYNn/.pFQ7sPYzQ1.jsYskEYQNtQLdf1CH7ta', '0', '0'),
(84, 'Dinesh12345', 'saifa@gmaiil.com', '96103001100', '9558', '$2b$10$2.RQJrFPWttmNsYDrboxQeyAaTu3oAjHZA7NuSfEOjfGtd3aqknmu', '1', '1'),
(85, 'Dinesh123456', 'saifaa@gmaiil.com', '961030011200', '6197', '$2b$10$W5Hv3rZFD41frwxB4ZyVbupJGq753E56HAK.W60.14hYgShBoaXTy', '1', '0'),
(86, 'Dinesh006', 'saifaaa@gmaiil.com', '968830011200', '4482', '$2b$10$g7N0ld.asqF4MWkgZcZ8YeFxaZmisHvWNWTp4iD/b4aLqP7NZESF.', '1', '2'),
(87, 'Dinesh0123', 'saiff@gmaiil.com', '9610303340', '1639', '$2b$10$degS1Gk1ATs6d4EW0WGEnOgr1/WKgUBo8sZQHYbHRh78kgQT5jWMq', '1', '1'),
(88, 'Dinesh10123', 'riyak', '9213994601', '3825', '$2b$10$gHj84ayQgBv665RbLoMZd.J9VFU1gp6ybCB2EwYwp8U8AvCJNMa.m', '1', '2'),
(89, 'Dinesh1', 'saif@gmail.com', '9610300000', '2722', '$2b$10$s9M07PFkvzzau5i3j7kJBeJtXwDoVLBcSOh43p0a61/WwtRjuVDAq', '1', '1'),
(91, 'tset0123', 'test@mail.com', '1234567890', '5447', '$2b$10$mm9dtzAqr0oM5YPj8y/gYedQ9EQP0zbHVfOSyM4/ATu9NCgq/3lA6', '1', '0'),
(92, 'test123', 'test12@mail.com', '12345678000', '9257', '$2b$10$vQ97tZQX5lMsrib8rDSlQe.28ZK9eL7zXnd1Nl/8jfWTJZKgH509a', '1', '1'),
(93, 'riyakumari2002', 'riyku216@gmail.com', '9213977740', '6924', '$2b$10$ypOpFwUT2hVb8O7eD5OJ6O.zXHRUbkHqq00PKCtLLCkjWVs3hJ.76', '1', '2'),
(94, 'Test13', 'test123@mail.com', '1112334567', '3125', '$2b$10$4Qtm.Sdw0VE42eGxrBrSLeaLQvJ13lvtF0vYZ01MfB4.KSQBcmFdi', '1', '1'),
(96, 'rishabhjjj', 'abcdef@gmail.com', '9996222046', '1031', '$2b$10$nxbF2k1dL61zVKzeJze.CekjG/8TCRfyYmVWnDLksFzgymdpfkpfi', '1', '0'),
(97, 'lj', 'simple.software.design@proton.me', '123456789', '8318', '$2b$10$2CDOrRqUv9KbwhwaXO4no.2CekmU4DQouLQFT7ZwHUC3vS2NswMRa', '1', '1'),
(98, 'riyakuuumariiii1', 'riyaa321@gmail.com', '9810454145', '6954', '$2b$10$EDGrpaFWHW/KK6VjH06KIOAxy7GSAPlfe2IOKIZTEDomGHx.0d24a', '1', '1'),
(99, 'New', 'newcoach@gmail.com', '2233222333', '2604', '$2b$10$4kh8iU2hirtji5GhCm8hH.K1RNU.IyDMhGdhfyVwYuNuqbly.LnzK', '1', '2'),
(100, 'coachUser', 'coach1@mail.com', '1122112211', '3739', '$2b$10$Q/YEy9uG3iHntyOHRUpzyuq7OMGQgu/VE12zewBb0SSmx5gQGKFfW', '1', '2'),
(101, 'riya11', 'riyaku217@gmail.com', '9599233917', '1702', '$2b$10$4nvFdUEGuC3eFpWnIjHqYOIduSq2BbMCTYybHfEG6r4PDry0.hqDa', '1', '1'),
(102, 'Priyanka ', 'priya12@gmail.com', '9599266711', '4980', '$2b$10$.va4P80iJkYuUpTX0Deoi.2S/2Hsm0BhdbMQOxsHltO6/W7r95Fvi', '1', '0'),
(103, 'Ansh ', 'ansh08@gmail.com', '9999999999', '3737', '$2b$10$HqTEV5spolsUydIrkJOTmOEAhiU21QZQ4hPiKqF8gsZbp5kstmyJy', '1', '2'),
(104, 'nisha', 'nish12@gmail.com', '9696969696', '5707', '$2b$10$wnuokn4cvKf.7P5ETa2zGeY/ZEKFOhdcnJTk5GogbAmb0g9UVL.XC', '1', '1'),
(105, 'riya20', 'riya11200@gmail.com', '1999999978', '9817', '$2b$10$S.gAYYQdWYTaR4S4gmc2wOyrnTM6O.SEPOQs5wNZqOtOzclIGUkbK', '1', '1'),
(106, 'Coach01', 'coach01@mail.com', '9988909090', '1277', '$2b$10$1lwkzyhXaoEWVOyF/8lzgeWztj8rWS65VJDc9T5vcX9qq7WoEXdPe', '1', '2'),
(107, 'Bimal ', 'bimal@gmail.com', '9996222044', '7316', '$2b$10$DwytlxYSOUCUyOoxg938su7i3VNppsFaSDZdQxWOEysVFSmBr713K', '1', '1'),
(108, 'cochtest', 'ci@gmail.com', '2332324225', '5276', '$2b$10$Jbnc5PvxyPQL5Z6kSvnFle1uVg5vF6A459T/lbSKieICpAcL1djjW', '1', '1'),
(109, 'pqoiwe', 'qpqowi@gmail.vom', '2589631470', '1688', '$2b$10$WRTn7eM9Mxym8aUJ6TNnge2FfeK8OBTxK7EKO6nLP1o.Qlju/r.jG', '0', '0'),
(110, 'tttt', 'tttt@gmail.com', '5632147890', '1305', '$2b$10$8Z1mkGbrcyeNNltDG2NK7Oc.ahQ663hld3OJf7X7haOK1BmgNR0HS', '1', '1'),
(111, 'riyak1', 'riyak2@gmail.com', '9256478940', '5240', '$2b$10$sJWQVNPFYpuf00z3B1Gdr.wPZSXZWiiUz6DrkI4gdVYng6tAQTjU2', '1', '1'),
(112, 'riyak123', 'riyak123@gmail.com', '912378940', '7400', '$2b$10$qkPElM6qGmWEq9wNCODLTu5NFfHso7fUoJYyx4i8H3FBEGc89930u', '1', '1'),
(113, 'riyak1234', 'riyak1234@gmail.com', '912348940', '8045', '$2b$10$I5OZplYdmYRp/HJVM3m9CeHYfSf3.uOef3Q4.LUaFbPKM6BNlcpIS', '1', '1'),
(114, 'riyak12345', 'riyak12345@gmail.com', '912548940', '9374', '$2b$10$gcDGZBcKMJn3WgRpH0jKYeNiNHZHt.afNclnD3Hw8UuHlJkw2ICCS', '1', '0'),
(115, 'riyak123456', 'riyak123456@gmail.com', '912668940', '6082', '$2b$10$U7HPxyV6cbFaMC.p5b33p.fvoPhZODO48Tm7CCXFoSuV10CSm.zcq', '1', '1'),
(116, 'ansh12', 'ansh12@gmail.com', '912664440', '1324', '$2b$10$0ad/.vzp6qKHSMq1lsplAek3DZszZRYzuIdwo0MVad.IsYyv6CtCu', '1', '1'),
(117, 'ansh123', 'ansh123@gmail.com', '9126564440', '1965', '$2b$10$2ljznKwnMtt0uo8wVuC51OCwuqtsNknF/mtW42viDJLnq7GIMrj.C', '1', '0'),
(118, 'anshu123', 'anshu123@gmail.com', '9129464440', '2426', '$2b$10$PuyZijDZ7nJl1Yth1IXRB.pZ2XYhkbtuErBgV8GsXKOTU887YfER.', '1', '1'),
(121, 'anshum123', 'anshum123@gmail.com', '9153464440', '7566', '$2b$10$ASDUL5.LVw/ja2urVGVjRO9rm4KzzLMLBQ6fcCF7BjH3gkG.IwPTa', '0', '0'),
(122, 'tina', 'tina@gmail.com', '95966385', '2774', '$2b$10$KDdh/InZpFYEpxdkhtwEquMnPdiuysKdYk4BBO45D3rBO6cMrc9Ga', '1', '0'),
(123, 'riya', 'sharma@gmail.com', '96969696', '7726', '$2b$10$00QEFM5E02i9dxiONEo4z.VC.ks5xoW2Uk6kA8hB4tSlD9WbrDXme', '1', '2'),
(124, 'test001', 'testc001@mail.com', '3433223232', '6913', '$2b$10$pjgnFoeDuDdEPf2VynnpZucjUIAh3bLBhZp3L70CFFxU.qREOrXKa', '1', '0'),
(125, 'anshkumu123', 'anshkumu123@gmail.com', '917864440', '8559', '$2b$10$diTXxZtdU6uldI2WE4MFKOEmw8vhKs2pHoT/aJFYjMld/d/A4BSZa', '1', '0'),
(126, 'coach', 'coach@gmail.com', '123454321', '6088', '$2b$10$xg.ex4i5venGdPMvbwLsb.mSHN6WjNYG/djJ3b9yjCZA3u4cc0PP6', '1', '2'),
(127, 'BuriBuri', 'buriburi123@gmail.com', '917344440', '5665', '$2b$10$VBG8sD0p0YhyhBmuhMvPkOhmeqVWBHe0RwoIGHleA6UPiWUS7fJpq', '1', '0'),
(128, 'teststudentnew', 'tests@mail.com', '2112234567', '8630', '$2b$10$Oen8cU4LpjD7CICnqbTAF.eu7uTCUQrUN80BXPtJFsqyPgdLDERZi', '1', '0'),
(129, 'BuriBurizymon', 'buri23@gmail.com', '9173675440', '5782', '$2b$10$EV/kle70tju/s/6EzKwI.u8uhaDI9tBR3ootq92uZ7n7Xjy6FcTsy', '1', '0'),
(130, 'lj2', 'email@email.com', '987654321', '9895', '$2b$10$XhGVm1xlq9LimPU5HbQmCOLYIdOciC/iUeiStyplLFdoW9et2Q7Ma', '1', '0'),
(131, 'test', 'test@sc.com', '1444215542', '6545', '$2b$10$nbj6MOWUBwAGmn6yfOSaNOAuPPBzEdI06cDGdTmIXxJyVF1wFifvq', '1', '0'),
(133, 'abc', 'abc@email.com', '123', '1344', '$2b$10$kuGWYL6iBHz22CRWZevmXOCEuMbeKCXgPzDMiUEycvx9JCnCzKMw.', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `sports`
--

CREATE TABLE `sports` (
  `id` int(50) NOT NULL,
  `sportsname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` (`id`, `sportsname`) VALUES
(1, 'Cricket'),
(2, 'Baseball'),
(3, 'Basketball'),
(4, 'Volleyball'),
(5, 'Football');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(50) NOT NULL,
  `statename` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `statename`) VALUES
(1, 'Alabama'),
(2, 'Alaska'),
(3, 'Arizona'),
(4, 'Arkansas'),
(5, 'California'),
(6, 'Colorado'),
(7, 'Connecticut'),
(8, 'Delaware'),
(9, 'Florida'),
(10, 'Georgia'),
(11, 'Hawaii'),
(12, 'Idaho'),
(13, 'Illinois'),
(14, 'Indiana'),
(15, 'Iowa'),
(16, 'Kansas'),
(17, 'Kentucky'),
(18, 'Louisiana'),
(19, 'Maine'),
(20, 'Maryland'),
(21, 'Massachusetts'),
(22, 'Michigan'),
(23, 'Minnesota'),
(24, 'Mississippi'),
(25, 'Missouri'),
(26, 'Montana'),
(27, 'Nebraska'),
(28, 'Nevada'),
(29, 'New Hampshire'),
(30, 'New Jersey'),
(31, 'New Mexico'),
(32, 'New York'),
(33, 'North Carolina'),
(34, 'North Dakota'),
(35, 'Ohio'),
(36, 'Oklahoma'),
(37, 'Oregon'),
(38, 'Pennsylvania'),
(39, 'Rhode Island'),
(40, 'South Carolina'),
(41, 'South Dakota'),
(42, 'Tennessee'),
(43, 'Texas'),
(44, 'Utah'),
(45, 'Vermont'),
(46, 'Virginia'),
(47, 'Washington'),
(48, 'West Virginia'),
(49, 'Wisconsin'),
(50, 'Wyoming');

-- --------------------------------------------------------

--
-- Table structure for table `student_filter`
--

CREATE TABLE `student_filter` (
  `id` int(50) NOT NULL,
  `registration_id` int(50) DEFAULT NULL,
  `division` varchar(1000) DEFAULT NULL,
  `sports` varchar(1000) DEFAULT NULL,
  `states` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_filter`
--

INSERT INTO `student_filter` (`id`, `registration_id`, `division`, `sports`, `states`) VALUES
(109, 43, 'null', 'null', 'null'),
(118, 48, '2', 'null', 'null'),
(124, 53, 'null', 'null', 'null'),
(148, 51, '2,3', 'null', 'null'),
(158, 59, '2', 'null', 'null'),
(159, 67, 'null', 'null', 'null'),
(160, 50, 'null', 'null', 'null'),
(177, 76, '3', NULL, NULL),
(184, 54, NULL, NULL, 'Rajasthan'),
(185, 45, NULL, 'Cricket', 'Karnataka');

-- --------------------------------------------------------

--
-- Table structure for table `student_registration`
--

CREATE TABLE `student_registration` (
  `id` int(50) NOT NULL,
  `registration_id` int(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `age` int(50) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `father_number` varchar(200) NOT NULL,
  `state` int(50) NOT NULL,
  `city` int(50) NOT NULL,
  `school_type` varchar(100) NOT NULL,
  `school_name` varchar(150) NOT NULL,
  `scholastic_year` int(50) NOT NULL,
  `gpa` int(50) NOT NULL,
  `sat` double NOT NULL,
  `act` double NOT NULL,
  `height` double NOT NULL,
  `weight` double NOT NULL,
  `wingspan` double NOT NULL,
  `dominant_hand` varchar(100) NOT NULL,
  `personal_bio` varchar(1000) NOT NULL,
  `video` varchar(500) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `views` int(50) NOT NULL DEFAULT 0,
  `validity` date DEFAULT NULL,
  `swipes` int(11) NOT NULL DEFAULT 0,
  `last_swipe` date DEFAULT NULL,
  `subscription` int(11) NOT NULL DEFAULT 0,
  `visibility` varchar(100) NOT NULL DEFAULT 'Always',
  `notification_token` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_registration`
--

INSERT INTO `student_registration` (`id`, `registration_id`, `firstname`, `lastname`, `dob`, `age`, `gender`, `father_number`, `state`, `city`, `school_type`, `school_name`, `scholastic_year`, `gpa`, `sat`, `act`, `height`, `weight`, `wingspan`, `dominant_hand`, `personal_bio`, `video`, `image`, `views`, `validity`, `swipes`, `last_swipe`, `subscription`, `visibility`, `notification_token`) VALUES
(24, 43, 'DINESH', 'SUTHAR', '1999-09-29', 22, 'Male', '', 1, 1, 'Highschool', '1', 2019, 2, 3, 4, 6, 68, 1.6, 'Right', 'Hello welcome ', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654075548914.jpg', 49, '2022-07-10', 1, '2022-07-12', 0, 'Always', NULL),
(54, 45, 'Vikram', 'Suthar', '2002-06-02', 20, 'Male', '', 1, 1, 'College', '2', 2019, 5, 4, 5, 6, 69, 160, 'Right', 'Hi my name is dinesh and iam from India. Welcome to my profile ????.', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654179756918.jpg', 47, '2023-01-06', 1, '2022-12-12', 10, 'Always', 'ExponentPushToken[bWf8xTEoUNEdHaqSiIDW-s]'),
(55, 48, 'Naveen', 'Gehlot', '1983-06-07', 39, 'Male', '', 1, 1, 'Highschool', '2', 2007, 3, 6, 7, 6, 60, 172, 'Right', 'Welcome to my profile..', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654596851978.jpg', 14, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(56, 50, 'Nripesh', 'Sharma', '1991-06-03', 0, 'Male', '', 3, 13, 'College', '2', 2022, 1, 2, 2, 6, 68, 170, 'Right', 'Welcome to my world...', 'https://www.youtube.com/embed/HmESsvTPQPk', 'profilepic1654673979087.jpg', 54, '2022-08-19', 8, '2022-07-25', 15, 'Never', 'ExponentPushToken[bWf8xTEoUNEdHaqSiIDW-s]'),
(57, 51, 'Mukesh', 'Soni', '1995-06-15', 27, 'Male', '', 1, 1, 'College', '5', 2007, 3, 6, 4, 6, 65, 170, 'Left', 'Hello everyone....', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654676358964.jpg', 32, '2022-08-13', 20, '2022-07-14', 0, 'Always', NULL),
(58, 53, 'Narpat', 'Kumar', '2000-06-09', 22, 'Male', '', 1, 1, 'Highschool', '6', 2020, 3, 5, 5, 6, 68, 172, 'Right', 'Hello...', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1654755952910.jpg', 32, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(59, 54, 'J', 'Balvin', '1999-08-28', 21, 'Male', '', 5, 18, 'College', '8', 2021, 2, 5, 5, 6, 80, 168, 'Right', 'Hello hi im testing', 'https://www.youtube.com/embed/suk3mW0tDPA', 'profilepic1656763120574.jpg', 134, '2022-08-20', 4, '2022-07-31', 15, 'Always', 'ExponentPushToken[O3ibEGNdaCp-6-TT69jWnO]'),
(60, 55, 'DINESH', 'SUTHAR', '1999-09-10', 23, 'Male', '', 2, 6, 'Highschool', '4', 1970, 1, 6, 6, 6, 65, 170, 'Left', 'Hello everyone', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655133105172.jpg', 2, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(61, 59, 'Dinesh', 'Suthar', '2022-04-14', 2, 'Male', '', 2, 6, 'Highschool', '5', 1965, 7, 4, 4, 6, 68, 170, 'Right', 'Heyhey', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655282981758.jpg', 2, '2022-08-26', 0, '2022-07-12', 10, 'Always', NULL),
(62, 61, 'Vbb', 'Gggg', '2022-06-07', 2, 'Male', '', 3, 6, 'Highschool', '6', 1965, 7, 6, 5, 6, 88, 88, 'Right', 'Vbb', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655291012501.jpg', 3, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(63, 62, 'Dinesh', 'Suthar', '1999-06-10', 2, 'Male', '', 2, 6, 'College', '7', 1964, 4, 4, 6, 6, 68, 172, 'Left', 'Yepp', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655299069058.jpg', 2, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(64, 64, 'Hh', 'Vh', '2022-06-16', 2, 'Male', '', 2, 2, 'Highschool', '2', 1983, 1, 4, 4, 6, 68, 170, 'Right', 'Fvgv', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655444518342.jpg', 3, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(65, 65, 'Baba', 'Nsnjs', '2022-06-06', 2, 'Male', '', 2, 5, 'Highschool', '4', 1965, 7, 7, 7, 6, 170, 160, 'Right', 'Bzb', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655445043750.jpg', 8, NULL, 1, '2022-07-12', 0, 'Always', NULL),
(66, 67, 'Nxns', 'Ajja', '2022-06-08', 2, 'Male', '', 2, 5, 'College', '2', 1964, 5, 4, 4, 6, 168, 170, 'Right', 'Sbns', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1655446274848.jpg', 19, NULL, 1, '2022-07-12', 0, 'Only matches', NULL),
(67, 74, 'Nsn', 'Mi', '2022-07-14', 2, 'Male', '', 2, 5, 'Highschool', '1', 1964, 5, 4, 4, 6, 68, 175, 'Right', 'Hello', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1657813043571.jpg', 1, '2022-08-13', 20, '2022-07-19', 0, 'Always', NULL),
(68, 75, 'Jdjd', 'Hshs', '2022-07-11', 2, 'Male', '', 4, 16, 'Highschool', '1', 1963, 4, 4, 4, 6, 44, 4, 'Right', 'Bsjs', 'https://www.youtube.com/embed/BddP6PYo2gs', 'profilepic1658262593745.jpg', 3, '2022-08-19', 15, '2022-07-20', 15, 'Always', NULL),
(69, 76, 'Dinesh', 'Suthar', '2022-07-11', 2, 'Male', '', 3, 11, 'Highschool', '1', 1964, 6, 4, 4, 5.5, 168, 94, 'Right', 'Heleo', 'https://youtu.be/RSISU7M31UM', 'profilepic1670387650289.jpg', 2, '2023-01-06', 1, '2022-12-07', 15, 'Always', NULL),
(70, 78, 'Poiu', 'Pokj', '2022-12-01', 2, 'Male', '', 2, 6, 'College', '2', 1964, 6, 3, 9, 6, 90, 66, 'Right', 'Dhdbdjj', 'dbxndndnd.xhh', 'profilepic1670382525734.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(71, 82, 'DINESH', 'SUTHAR', '1999-09-10', 23, 'Male', '', 2, 0, 'Highschool', '0', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'Hello boys', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(75, 84, 'DINESHI', 'SUTHAR', '1999-09-10', 23, 'Male', '', 2, 0, 'Highschool', '0', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'Hello boys and girls ', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(76, 87, 'DIINESH', 'SUTHAR', '1999-09-10', 20, 'Male', '', 2, 0, 'Highschool', '0', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'Hello boys', 'https://www.youtube.com', 'brand-71684154879920.png', 0, NULL, 0, NULL, 0, 'Always', NULL),
(77, 89, 'DINESH', 'SUTHAR', '1999-09-10', 23, 'Male', '', 2, 0, 'Highschool', '0', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'Hello boys', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(79, 92, 'test', 'test', '2014-05-01', 9, 'Male', '', 2, 0, 'Highschool', '0', 0, 4, 2, 2, 100, 50, 1.98, 'Right', 'basketball player', 'njj', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(81, 98, 'Anshu', 'Kumar', '1999-09-10', 21, 'male', '8888', 1, 1, 'highschool', '2', 2019, 7, 4.5, 7, 1.8, 0, 1.98, 'Right', '', 'www.youtube.com', 'people-g21686118971488.jpg', 0, '2023-05-12', 0, '2023-05-09', 0, 'always', 'ExponentPushToken[O3ibEGNdaCp-6-TT69jWnO]'),
(83, 94, 'Test', 'User', '1998-06-09', 25, 'Male', '6666666666', 2, 6, 'Highschool', '0', 2022, 3, 2.1, 2.2, 5.6, 55, 1.98, 'Right', '', 'http://test.com', NULL, 0, NULL, 0, NULL, 0, 'always', NULL),
(84, 101, 'riya', 'Kumari', '2002-11-11', 21, 'Male', '969693365', 1, 1, 'Highschool', '2', 2019, 3, 2.5, 3.5, 2.17, 2.45, 1.98, 'Right', 'athletic', 'www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(85, 104, 'nishu', 'gupta', '1997-06-09', 26, 'Male', '9213884502', 1, 1, 'Highschool', '0', 2017, 6, 5, 2, 2.7, 20, 1.98, 'Right', '', 'www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'always', NULL),
(86, 105, 'riya', 'Kumari ', '2002-11-11', 21, 'Male', '9963859685', 5, 19, 'Highschool', '1', 2020, 4, 5, 3, 5.2, 50, 1.98, 'Right', 'huuu', 'www.youtube.com', '758735fa-a79b-4cdb-8565-eb05e879483530606872587239539261686225635843.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(87, 107, 'ttff', 'sss', '2023-06-05', 0, 'Male', '2222222255', 2, 6, 'Highschool', '2', 874, 6, 1.8, 4, 77, 122, 1.98, 'Right', 'rrr', 'fffff', '955008a7-2fce-4cb9-943d-eacd9ad71cc813372235157526966581686053625869.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(88, 108, 'Jhon', 'vick', '2000-06-01', 23, 'Male', '9999998898', 1, 1, 'Collage', '1', 2020, 6, 1.2, 1, 55, 56, 1.98, 'Right', 'i am good player', 'http://video.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(89, 97, 'lj', 'b', '2023-06-01', 0, 'Male', '123456789', 4, 16, 'Highschool', '3', 2023, 1, 1600, 40, 72, 180, 1.98, 'Right', 'testing', 'https://www.youtube.com/watch?v=cuLprHh_BRg', 'basketball-LeBron-James-Cleveland-Cavaliers-20181686106772760.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(93, 110, 'yyy', 'ttt', '2011-06-08', 12, 'Male', '2580741369', 2, 6, 'Collage', '4', 566, 8, 5, 89, 5, 300, 1.98, 'Right', 'ghfhh', 'www.ggg.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(95, 111, 'Anshuman', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(97, 112, 'Anshumank', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(98, 113, 'Anshumank', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(100, 114, 'Ayushuman', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(107, 117, 'Ayush', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', NULL, 0, NULL, 0, NULL, 0, 'Always', NULL),
(129, 118, 'Jassilli', 'Verma', '1999-09-10', 20, 'male', '8888', 2, 1, 'highschool', '1', 2019, 2, 4.2, 7.4, 1.62, 1.63, 1.98, 'Right', 'heelo', 'https://www.youtube.com', 'people-g21686208717526.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(134, 122, 'timaa', 'sharma', '2003-06-09', 20, 'Female', '555558586', 1, 2, 'Highschool', '2', 5, 6, 2.5, 1.6, 5.6, 8.6, 0, 'Right', 'sddfggh', 'ddgbjhff', 'IMG202306090009511686282835982.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(135, 125, 'ansh', 'kumar', '2012-12-12', 20, 'male', '768686', 1, 2, 'highschool', '2', 2019, 5, 4, 9, 6.7, 8.9, 0, 'right', 'nice', 'qwert', 'people-g21686285974926.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(136, 124, 'test', 'student', '1999-06-09', 24, 'Male', '9900090909', 1, 1, 'Highschool', '1', 2021, 2, 0, 0, 5.5, 50, 0, 'Right', 'test', 'http://test.com', '11d9b5b0-14e4-4a95-96ca-3a8963c2300d7374736225859972841686287617294.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(138, 127, 'ansh', 'kumar', '2012-12-12', 20, 'male', '768686', 1, 2, 'highschool', 'Assisi convent ', 2019, 5, 4, 9, 6.7, 8.9, 0, 'right', 'nice', 'qwert', 'people-g21686324061858.jpg', 0, NULL, 0, NULL, 0, 'Always', NULL),
(140, 129, 'Anshu', 'Kumar', '1999-09-10', 21, 'male', '768686', 1, 1, 'highschool', 'Convent school', 2019, 7, 4.5, 7, 1.8, 1.72, 0, 'right', '', 'www.youtube.com', 'people-g21686469067390.jpg', 0, NULL, 0, NULL, 0, 'always', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `swiping`
--

CREATE TABLE `swiping` (
  `id` int(50) NOT NULL,
  `actionby` int(50) NOT NULL,
  `actionto` int(50) NOT NULL,
  `action` int(50) NOT NULL,
  `seen_status` varchar(50) NOT NULL DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `swiping`
--

INSERT INTO `swiping` (`id`, `actionby`, `actionto`, `action`, `seen_status`) VALUES
(294, 60, 48, 1, 'Unread'),
(295, 60, 43, 1, 'Unread'),
(296, 60, 53, 1, 'Unread'),
(300, 60, 55, 1, 'Unread'),
(361, 66, 65, 1, 'Unread'),
(365, 67, 44, 1, 'Unread'),
(487, 51, 44, 1, 'Unread'),
(776, 47, 64, 1, 'Unread'),
(777, 47, 48, 1, 'Unread'),
(779, 47, 75, 1, 'Unread'),
(780, 47, 53, 1, 'Unread'),
(784, 47, 61, 1, 'Unread'),
(788, 47, 51, 1, 'Unread'),
(789, 47, 43, 1, 'Unread'),
(790, 47, 55, 1, 'Unread'),
(996, 50, 44, 1, 'Unread'),
(1066, 47, 74, 1, 'Unread'),
(1073, 54, 46, 1, 'Unread'),
(1074, 54, 66, 1, 'Unread'),
(1089, 63, 55, 1, 'Unread'),
(1090, 63, 59, 1, 'Unread'),
(1091, 63, 75, 1, 'Unread'),
(1093, 63, 48, 1, 'Unread'),
(1095, 63, 64, 1, 'Unread'),
(1096, 63, 61, 1, 'Unread'),
(1097, 63, 62, 1, 'Unread'),
(1098, 63, 51, 1, 'Unread'),
(1099, 63, 74, 1, 'Unread'),
(1100, 63, 65, 1, 'Unread'),
(1101, 63, 53, 1, 'Unread'),
(1102, 63, 43, 1, 'Unread'),
(1132, 93, 62, 0, 'Unread'),
(1135, 101, 63, 1, 'Unread'),
(1136, 101, 47, 1, 'Unread'),
(1137, 101, 66, 0, 'Unread'),
(1138, 101, 60, 1, 'Unread'),
(1139, 101, 52, 0, 'Unread'),
(1140, 101, 44, 0, 'Unread'),
(1141, 101, 46, 1, 'Unread'),
(1142, 101, 100, 1, 'Unread'),
(1143, 101, 99, 1, 'Unread'),
(1144, 101, 49, 1, 'Unread'),
(1145, 103, 51, 0, 'Unread'),
(1146, 103, 64, 1, 'Unread'),
(1147, 103, 59, 0, 'Unread'),
(1148, 103, 74, 0, 'Unread'),
(1149, 103, 54, 1, 'Unread'),
(1150, 103, 62, 0, 'Unread'),
(1151, 103, 76, 1, 'Unread'),
(1152, 103, 53, 1, 'Unread'),
(1153, 103, 67, 0, 'Unread'),
(1154, 103, 43, 0, 'Unread'),
(1155, 103, 75, 1, 'Unread'),
(1156, 103, 65, 1, 'Unread'),
(1157, 103, 55, 0, 'Unread'),
(1158, 104, 63, 1, 'Unread'),
(1159, 104, 49, 1, 'Unread'),
(1160, 104, 44, 1, 'Unread'),
(1161, 105, 60, 1, 'Unread'),
(1162, 106, 75, 0, 'Unread'),
(1163, 106, 59, 1, 'Unread'),
(1164, 107, 52, 1, 'Unread'),
(1165, 107, 46, 1, 'Unread'),
(1166, 107, 66, 0, 'Unread'),
(1167, 108, 63, 1, 'Unread'),
(1168, 108, 49, 1, 'Unread'),
(1169, 108, 66, 1, 'Unread'),
(1170, 107, 63, 1, 'Unread'),
(1171, 107, 106, 0, 'Unread'),
(1172, 107, 60, 1, 'Unread'),
(1173, 107, 100, 0, 'Unread'),
(1174, 107, 47, 1, 'Unread'),
(1175, 107, 99, 0, 'Unread'),
(1176, 107, 49, 1, 'Unread'),
(1177, 107, 103, 0, 'Unread'),
(1178, 107, 44, 1, 'Unread'),
(1179, 97, 66, 0, 'Unread'),
(1180, 97, 99, 1, 'Unread'),
(1181, 97, 100, 0, 'Unread'),
(1182, 97, 103, 0, 'Unread'),
(1183, 97, 44, 1, 'Unread'),
(1184, 97, 46, 0, 'Unread'),
(1185, 97, 52, 1, 'Unread'),
(1186, 97, 106, 0, 'Unread'),
(1187, 97, 49, 0, 'Unread'),
(1188, 105, 106, 1, 'Unread'),
(1189, 105, 99, 0, 'Unread'),
(1190, 105, 52, 1, 'Unread'),
(1191, 122, 106, 1, 'Unread'),
(1192, 122, 47, 0, 'Unread'),
(1193, 122, 99, 1, 'Unread'),
(1194, 123, 76, 1, 'Unread'),
(1195, 123, 51, 0, 'Unread'),
(1196, 97, 60, 0, 'Unread'),
(1197, 97, 63, 1, 'Unread'),
(1198, 97, 123, 1, 'Unread'),
(1199, 97, 47, 1, 'Unread'),
(1200, 126, 50, 1, 'Unread'),
(1201, 126, 67, 1, 'Unread'),
(1202, 126, 43, 1, 'Unread'),
(1203, 126, 117, 1, 'Unread'),
(1204, 126, 125, 1, 'Unread'),
(1205, 126, 98, 1, 'Unread'),
(1206, 126, 107, 1, 'Unread'),
(1207, 126, 101, 1, 'Unread'),
(1208, 126, 54, 1, 'Unread'),
(1209, 126, 122, 1, 'Unread'),
(1210, 110, 66, 1, 'Unread'),
(1211, 110, 46, 0, 'Unread'),
(1212, 110, 123, 0, 'Unread'),
(1213, 97, 126, 1, 'Unread');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coach_divisions`
--
ALTER TABLE `coach_divisions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coach_filter`
--
ALTER TABLE `coach_filter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coach_registration`
--
ALTER TABLE `coach_registration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registration_id` (`registration_id`),
  ADD KEY `coaching_sport` (`coaching_sport`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ethnicity`
--
ALTER TABLE `ethnicity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gpa`
--
ALTER TABLE `gpa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_sports`
--
ALTER TABLE `player_sports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registration_id` (`registration_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `sports`
--
ALTER TABLE `sports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_filter`
--
ALTER TABLE `student_filter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_registration`
--
ALTER TABLE `student_registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_id` (`registration_id`);

--
-- Indexes for table `swiping`
--
ALTER TABLE `swiping`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `coach_divisions`
--
ALTER TABLE `coach_divisions`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coach_filter`
--
ALTER TABLE `coach_filter`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `coach_registration`
--
ALTER TABLE `coach_registration`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ethnicity`
--
ALTER TABLE `ethnicity`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gpa`
--
ALTER TABLE `gpa`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `player_sports`
--
ALTER TABLE `player_sports`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `student_filter`
--
ALTER TABLE `student_filter`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `student_registration`
--
ALTER TABLE `student_registration`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `swiping`
--
ALTER TABLE `swiping`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1214;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coach_registration`
--
ALTER TABLE `coach_registration`
  ADD CONSTRAINT `coach_registration_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`id`),
  ADD CONSTRAINT `coach_registration_ibfk_2` FOREIGN KEY (`coaching_sport`) REFERENCES `sports` (`id`);

--
-- Constraints for table `player_sports`
--
ALTER TABLE `player_sports`
  ADD CONSTRAINT `player_sports_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`id`);

--
-- Constraints for table `student_registration`
--
ALTER TABLE `student_registration`
  ADD CONSTRAINT `student_registration_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

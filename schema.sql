-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2020 at 11:51 AM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `edbad`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `currentDungeon` int(11) NOT NULL DEFAULT '1',
  `deepestDungeon` int(11) NOT NULL DEFAULT '1',
  `minDungeon` int(11) NOT NULL DEFAULT '1',
  `items` json DEFAULT NULL,
  `maxHealth` int(11) NOT NULL DEFAULT '5',
  `maxMana` int(11) NOT NULL DEFAULT '5',
  `damage` int(11) NOT NULL DEFAULT '1',
  `xp` int(11) NOT NULL DEFAULT '0',
  `enemiesKilled` int(11) NOT NULL DEFAULT '0',
  `narratorSaid` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

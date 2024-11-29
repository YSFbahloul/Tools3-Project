-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema toolsdatabase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema toolsdatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `toolsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `toolsdatabase` ;

-- -----------------------------------------------------
-- Table `toolsdatabase`.`couriers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `toolsdatabase`.`couriers` (
  `courier_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `courier_name` VARCHAR(255) NULL DEFAULT 'DHL',
  PRIMARY KEY (`courier_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `toolsdatabase`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `toolsdatabase`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin', 'courier') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `toolsdatabase`.`loggedinusers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `toolsdatabase`.`loggedinusers` (
  `session_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `login_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `session_active` TINYINT(1) NULL DEFAULT '0',
  `role` ENUM('user', 'courier', 'admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`session_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `loggedinusers_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `toolsdatabase`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `toolsdatabase`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `toolsdatabase`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `delivery_address` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) NULL DEFAULT 'pending',
  `courier` VARCHAR(255) NULL DEFAULT 'DHL',
  `courier_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `courier_id` (`courier_id` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `toolsdatabase`.`users` (`user_id`),
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`courier_id`)
    REFERENCES `toolsdatabase`.`couriers` (`courier_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

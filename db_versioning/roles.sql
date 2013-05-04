/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50128
Source Host           : localhost:3306
Source Database       : athletesup_main

Target Server Type    : MYSQL
Target Server Version : 50128
File Encoding         : 65001

Date: 2013-05-04 15:21:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'login', 'Login privileges, granted after account confirmation');
INSERT INTO `roles` VALUES ('2', 'admin', 'Administrative user, has access to everything.');
INSERT INTO `roles` VALUES ('3', 'moderator', 'Moderator. Is able to alter/remove any comments and/or any offensive media');
INSERT INTO `roles` VALUES ('4', 'recruiter', 'Just Recruiter');
INSERT INTO `roles` VALUES ('5', 'user', '');
INSERT INTO `roles` VALUES ('6', 'coach', '');
INSERT INTO `roles` VALUES ('7', 'league_admin', '');
INSERT INTO `roles` VALUES ('8', 'org_admin', '');
INSERT INTO `roles` VALUES ('9', 'developer', '');
INSERT INTO `roles` VALUES ('10', 'super_admin', '');

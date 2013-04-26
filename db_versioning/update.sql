SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `locations` MODIFY COLUMN `lon`  float(25,20) NULL DEFAULT NULL AFTER `zip`;

ALTER TABLE `locations` MODIFY COLUMN `lat`  float(25,20) NULL DEFAULT NULL AFTER `lon`;

ALTER TABLE `users` ADD COLUMN `dob`  date NULL DEFAULT NULL AFTER `logins`;

ALTER TABLE `users` ADD COLUMN `height_in`  int(11) NULL DEFAULT NULL AFTER `dob`;

ALTER TABLE `users` ADD COLUMN `weight_lb`  int(11) NULL DEFAULT NULL AFTER `height_in`;

ALTER TABLE `users` ADD COLUMN `grad_year`  varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `weight_lb`;

ALTER TABLE `utl_position_link` ADD COLUMN `is_primary`  tinyint(1) NOT NULL DEFAULT 0 AFTER `positions_id`;

SET FOREIGN_KEY_CHECKS=1;


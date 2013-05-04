SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `followers` ADD COLUMN `subject_enttypes_id`  int(11) NULL DEFAULT NULL AFTER `follower_users_id`;

ALTER TABLE `followers` ADD COLUMN `subject_id`  int(11) NULL DEFAULT NULL AFTER `subject_enttypes_id`;

ALTER TABLE `followers` DROP COLUMN `followed_users_id`;

SET FOREIGN_KEY_CHECKS=1;


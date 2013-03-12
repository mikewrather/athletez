SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `fitness_data` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`fitness_test`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`unit_type`  enum('number','string','time') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`sports_id`  int(11) NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=Compact
;

CREATE TABLE `fitness_data_values` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`fitness_data_id`  int(11) NOT NULL ,
`user_value`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`users_id`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
ROW_FORMAT=Compact
;

ALTER TABLE `leagues` MODIFY COLUMN `id`  int(10) NOT NULL FIRST ;

ALTER TABLE `leagues` MODIFY COLUMN `sections_id`  int(10) NULL DEFAULT NULL AFTER `name`;

ALTER TABLE `leagues` ADD COLUMN `states_id`  int(10) NULL DEFAULT NULL AFTER `sections_id`;

ALTER TABLE `leagues` MODIFY COLUMN `id`  int(10) NOT NULL AUTO_INCREMENT FIRST ;

ALTER TABLE `locations` ADD COLUMN `location_type`  enum('High School','Park','Other') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `loc_point`;

ALTER TABLE `media` ADD COLUMN `subject_type_id`  int(11) NULL DEFAULT NULL AFTER `sports_id`;

ALTER TABLE `media` ADD COLUMN `subject_id`  int(11) NULL DEFAULT NULL AFTER `subject_type_id`;

ALTER TABLE `resume_data` MODIFY COLUMN `resume_data_type`  enum('number','string','time') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `name`;

ALTER TABLE `states` DROP INDEX `abbreviation`;

ALTER TABLE `states` MODIFY COLUMN `id`  int(11) NOT NULL FIRST ;

ALTER TABLE `states` MODIFY COLUMN `name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `id`;

ALTER TABLE `states` DROP COLUMN `abbreviation`;

ALTER TABLE `states` MODIFY COLUMN `id`  int(11) NOT NULL AUTO_INCREMENT FIRST ;

ALTER TABLE `states` ENGINE=InnoDB,
ROW_FORMAT=Compact;

ALTER TABLE `statvals` MODIFY COLUMN `teams_id`  int(10) NULL DEFAULT NULL AFTER `users_id`;

ALTER TABLE `statvals` ADD COLUMN `games_id`  int(11) NULL DEFAULT NULL AFTER `statdate`;

ALTER TABLE `statvals` DROP COLUMN `event_id`;

ALTER TABLE `users` ADD COLUMN `first_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `last_login`;

ALTER TABLE `users` ADD COLUMN `last_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `first_name`;

ALTER TABLE `users` ADD COLUMN `cities_id`  int(11) NULL DEFAULT NULL AFTER `last_name`;

ALTER TABLE `videos_meta` ADD COLUMN `video_type_link_id`  int(10) NOT NULL AFTER `id`;

ALTER TABLE `videos_meta` DROP COLUMN `videos_id`;

ALTER TABLE `video_type_link` ADD COLUMN `id`  int(11) NOT NULL FIRST ;

ALTER TABLE `video_type_link` DROP PRIMARY KEY;

ALTER TABLE `video_type_link` ADD PRIMARY KEY (`id`);

ALTER TABLE `video_type_link` MODIFY COLUMN `id`  int(11) NOT NULL AUTO_INCREMENT FIRST ;

DROP TABLE `entlist`;

DROP TABLE `sports_copy`;

SET FOREIGN_KEY_CHECKS=1;


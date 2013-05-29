CREATE TABLE `phrases` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`phrase` mediumtext NULL,
`deleted` tinyint(1) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `phrases_translation` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`phrases_id` int(11) NULL,
`translation` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
`languages_id` int(11) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `languages` (
`id` int NOT NULL AUTO_INCREMENT,
`language_en` varchar(60) NULL,
`language_native` varchar(60) NULL,
PRIMARY KEY (`id`) 
);


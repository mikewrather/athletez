/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : athletesup_main

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2013-03-29 19:37:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `enttypes`
-- ----------------------------
DROP TABLE IF EXISTS `enttypes`;
CREATE TABLE `enttypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `api_name` varchar(40) DEFAULT NULL,
  `class_name` varchar(255) DEFAULT NULL,
  `db_table` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `id1` varchar(25) DEFAULT NULL,
  `id2` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of enttypes
-- ----------------------------
INSERT INTO `enttypes` VALUES ('1', 'User', 'user', 'User_Base', 'users', 'A User can be an athlete, a coach, a fan, or something else we think of in the future.  However the user itself is independent of roles and logic about what user roles have access to what will be coded logic', 'users_id', '');
INSERT INTO `enttypes` VALUES ('2', 'Organization', 'org', 'Sportorg_Org', 'orgs', 'An Organization is either a high school or a Sports Club.  It can have many sports associated with it or a single sport.  ', 'orgs_id', '');
INSERT INTO `enttypes` VALUES ('3', 'Sports Position', 'position', 'Sportorg_Position', 'positions', 'Each sport will have many positions associated with it which athletes can select per team.', 'positions_id', '');
INSERT INTO `enttypes` VALUES ('4', 'Sport', 'sport', 'Sportorg_Sport', 'sports', 'A sport is a very simple entity which basically specifies a name, a gender and a type.  ', 'sports_id', '');
INSERT INTO `enttypes` VALUES ('5', 'Team', 'team', 'Sportorg_Team', 'teams', 'Team is the intersection of an organization (e.g. Blair Acadamy), a sport (e.g. Football), a season (e.g. Winter), and a competition level (e.g. Varsity).  There is also the possibility of adding a misc identifier if there are two teams matching all of those criteria.  For instance, if there is a \"Red Team\" and \"Blue Team\" on a volleyball club that are both U17 Competion Level.', 'teams_id', '');
INSERT INTO `enttypes` VALUES ('6', 'Season', 'season', 'Sportorg_Seasons_Base', 'seasons', 'Seasons are grouped into profiles and can be anything from the standard Winter/Spring/Fall high school seasons or Summer club seasons or simply be a year-round season.', 'seasons_id', '');
INSERT INTO `enttypes` VALUES ('7', 'Season Profile', 'seasonprofile', 'Sportorg_Seasons_Profile', 'season_profiles', 'A Season Profile will group seasons into collections which are then associated with an organization.  So a season profile selected for a high school would be Fall/Winter/Spring.  The season profile allows us to offer a different selection of seasons based on the organization the athlete is involved with.', 'season_profiles_id', '');
INSERT INTO `enttypes` VALUES ('8', 'Game', 'game', 'Sportorg_Games_Base', 'games', 'A Game is composed of a Datetime, a Location, and some number of teams.  It can be further broken down into matches for sports where that is applicable.', 'games_id', '');
INSERT INTO `enttypes` VALUES ('9', 'Game Match', 'gamematch', 'Sportorg_Games_Match', 'game_matches', 'For sports that have several matches within a game such as wrestling, each of those matches is stored with the result of that match.  It also stores specific athletes involved in that match (seperately)', 'game_matches_id', '');
INSERT INTO `enttypes` VALUES ('10', 'Game Match Player', 'gamematchplayer', 'Sportorg_Games_Matchplayer', 'game_match_players', 'A Game Match Player specifies a player involved in a specific match.  Because a match does not always involve an entire team the players of a match must be stored separately.', 'game_match_players_id', '');
INSERT INTO `enttypes` VALUES ('11', 'Competition Level', 'complevel', 'Sportorg_Complevel_Base', 'complevels', 'A Competition Level can be the traditional high school levels of Junior Varsity and Varsity, but it can also be age group levels like U16 and U17 for club sports.  Competition levels are grouped into profiles which are then associated with an organization.', 'complevels_id', '');
INSERT INTO `enttypes` VALUES ('12', 'Competition Level Profile', 'complevelprofile', 'Sportorg_Complevel_Profile', 'complevel_profiles', 'Competition Levels are grouped into Profiles which are then associated with an organization.  So if the organization an athlete belongs to is a high school they will have the profile with JV and V.  If the organization is a club it will be different.  This is designed to be expandable.', 'complevel_profiles_id', '');
INSERT INTO `enttypes` VALUES ('14', 'Comment', 'comment', 'Site_Comment', 'comments', 'A Comment links some string of text (the comment) to an Anonymous Entity using an Entity (or \"subject\") Type ID and an Entity ID.  So the Type ID could specify a user or a game or a video or any other type of entity, while the Entity ID would specify which of those users, games, or videos the comment is connected to.', 'comments_id', '');
INSERT INTO `enttypes` VALUES ('16', 'Item Tag', 'tag', 'Site_Tag', 'tags', 'A Tag links a user (the tagged user) to an Anonymous Entity using an Entity (or \"subject\") Type ID and an Entity ID.  So the Type ID could specify an image or a game or a video or any other type of entity, while the Entity ID would specify which of those images, games, or videos the user is being tagged in.  The user doing the tagging is also stored.', 'tags_id', '');
INSERT INTO `enttypes` VALUES ('18', 'Vote', 'vote', 'Site_Vote', 'votes', 'A Vote links a user (the voter) to an Anonymous Entity using an Entity (or \"subject\") Type ID and an Entity ID.  So the Type ID could specify an image or a game or a video or any other type of entity, while the Entity ID would specify which of those images, games, or videos the user is voting on.', 'votes_id', '');
INSERT INTO `enttypes` VALUES ('19', 'Media', 'media', 'Media_Base', 'media', 'Media is the umbrella type which both images and videos fall under.  Media is associated with a user and a sport.  An image can be associated with ', 'media_id', '');
INSERT INTO `enttypes` VALUES ('21', 'Image', 'image', 'Media_Image', 'images', 'An image is a type of media with most information being stored in the image metadata table.  The object handles pulling and compiling that information.', 'images_id', '');
INSERT INTO `enttypes` VALUES ('23', 'Video Clip', 'video', 'Media_Video', 'videos', 'A Video is a type of media.  Videos can be one of many types (formats / resolutions).  Videos have a metadata table that will hold most information about them (duration, resolution, codec, container, etc).', 'videos_id', '');
INSERT INTO `enttypes` VALUES ('24', 'Vido Production Service', 'videoservice', 'Media_Videoservice', 'video_services', 'A Video Production Service can be given credit for a video.  They contain outside links to the service\'s website and have information on regions that the service firm covers.', 'video_services_id', '');
INSERT INTO `enttypes` VALUES ('25', 'Athletic Resume Data', 'resumedata', 'User_Resume_Data', 'resume_data', 'Athletic Resume Data is a single peice of data without a user value.  So this could be \"40 yard dash\" or \"Vertical Leap\".  Resume Data is grouped and those groups are then grouped into a \"Profile\".  A single peice of data can exist in several groups.', 'resume_data_id', '');
INSERT INTO `enttypes` VALUES ('26', 'Athletic Resume Data Group', 'resumedatagroup', 'User_Resume_Data_Group', 'resume_data_groups', 'This is a group of Athletic resume data.  A single peice of Resume Data (e.g. \"40 yard dash time\") can exist in multiple groups.  These groups are then associated with an \"Athletic Resume Data Profile\". ', 'resume_data_groups_id', '');
INSERT INTO `enttypes` VALUES ('27', 'Athletic Resume Data Profile', 'resumedataprofile', 'User_Resume_Data_Profile', 'resume_data_profiles', 'An Athletic Resume Data Profile is a collection of Athletic Resume Data Groups.  This allows a group to be used in more than one profile.  Profiles are then associated with 1 or more sports.  So The same Resume Data Group could exist in a profile for football and basketball.  Indoor and outdoor track could share the same profile.', 'resume_data_profiles_id', '');
INSERT INTO `enttypes` VALUES ('28', 'Athletic Resume Data Value', 'resumedataval', 'User_Resume_Data_Vals', 'resume_data_vals', 'An Athletic Resume Data Value is the actual user-entered answer to a peice of Resume Data.  So this would contain the athletes 40 yard dash time in seconds or the vertical leap in inches.', 'resume_data_vals_id', '');
INSERT INTO `enttypes` VALUES ('30', 'Statistics Tab', 'stattab', 'Stats_Tab', 'stattabs', 'Because each sport can contain so many statistics fields, they are broken down into tabs.  This is simply a group of statistics for a sport.  For instance with football there could be an offense tab, a defense tab, and a special teams tab.', 'stattabs_id', '');
INSERT INTO `enttypes` VALUES ('31', 'Statistic', 'stat', 'Stats_Base', 'stats', 'This is a single statistic without a user value.  So this could be Total At Bats or Total Yards Gained.  These will be grouped into tabs.', 'stats_id', '');
INSERT INTO `enttypes` VALUES ('32', 'Video Queued for Processing', 'queuedvideo', 'Media_Queuedvideo', 'queuedvideos', 'When a video is uploaded, it is placed in this queue and sent to Zencoder for encoding.  The queue object listens and keeps track of which formats zencoder has finished encoding.  When all formats have been received without error, the Queued Video object will mark the actual video object as ready to go.', 'queuedvideos_id', '');
INSERT INTO `enttypes` VALUES ('33', 'Location', 'location', 'Location_Base', 'locations', 'A location is stored as an address, as well as a point data type.  So if no address exists a location can still be plotted on a map as long as there is a longitude and latitude.  Locations exist as seperate entities so that they can be associated with multiple other objects.  For example, a high school has a location which might also be the location associated with a handful of games.', 'locations_id', '');
INSERT INTO `enttypes` VALUES ('34', 'City', 'city', 'Location_City', 'cities', 'A City references a parent County', 'cities_id', '');
INSERT INTO `enttypes` VALUES ('35', 'County', 'county', 'Location_County', 'counties', 'A County references a parent State', 'counties_id', '');
INSERT INTO `enttypes` VALUES ('36', 'State', 'state', 'Location_State', 'states', 'A State references a parent County and can contain divisions, leagues, sections, and more.', 'states_id', '');
INSERT INTO `enttypes` VALUES ('37', 'Player of the Game', 'pog', 'Site_Pog', 'player_of_game', 'On a game page, any athlete in the roster of one of the competing teams can be voted \"Player of the Game\".  It\'s like MVP.  The POG votes will dictate their placement on the roster listing.', 'player_of_game_id', '');
INSERT INTO `enttypes` VALUES ('40', 'Sports Division', 'division', 'Sportorg_Division', 'divisions', 'An organization can be associated with a division.  Divisions then can belong to a section (but this is not always the case).  This is mostly for searching for a team.', 'divisions_id', '');
INSERT INTO `enttypes` VALUES ('41', 'Sports League', 'league', 'Sportorg_League', 'leagues', 'An organization can be associated with a league.  Leagues then can belong to a section (but this is not always the case).  This is mostly for searching for a team.', 'leagues_id', '');
INSERT INTO `enttypes` VALUES ('43', 'Sports Section', 'section', 'Sportorg_Section', 'sections', 'Large States are broken into sections before they are broken into Leagues / Divisions.  So a section might be \"Southern California\" in a large state like California.', 'sport_types_id', '');
INSERT INTO `enttypes` VALUES ('44', 'Sport Type', 'sporttype', 'Sportorg_Sporttype', 'sport_types', 'The Sport type will be used to designate whether a sport is event-driven, score driven, team-based or individual, etc.  The sport type will be used to determine how various things are presented on the site.', 'stat_contexts_id', '');
INSERT INTO `enttypes` VALUES ('45', 'Statistics Context', 'statcontext', 'Stats_Context', 'stat_contexts', 'The statistics context exists so that we can designate whether a set of stats is for a game, a season, or something else.', 'statvals_id', '');
INSERT INTO `enttypes` VALUES ('46', 'Anonymous Entity', 'ent', 'Site_Enttype', 'enttypes', 'Anonymous entities can become many different types of objects.  Instead of having a single ID and a table, a type is specified which will determine the table the id refers to.  This is used for things like comments, votes, tags, and media associations.', 'subject_type_id', 'subject_id');
INSERT INTO `enttypes` VALUES ('47', 'Statistic Value', 'statval', 'Stats_Vals', 'statvals', 'This is a user value for a specific statistic', 'statvals_id', null);
INSERT INTO `enttypes` VALUES ('48', 'User Role', 'role', 'Role', 'roles', 'A user can have many roles associated with his or her account such as login, admin, etc.', 'roles_id', null);
INSERT INTO `enttypes` VALUES ('49', 'Country', 'country', 'Location_Country', 'countries', 'A Country...', 'countries_id', null);
INSERT INTO `enttypes` VALUES ('50', 'Video Type', 'videotype', 'Media_Videotype', 'video_types', 'Video Types -- a combination of container, codec, resolution, framerate and other video characteristics.', 'video_types_id', null);

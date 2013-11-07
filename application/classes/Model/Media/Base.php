<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:46 PM
 */

class Model_Media_Base extends ORM
{
	
	protected $_table_name = 'media';

	public $error_message_path = 'models/media/base';

	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(
			'sport' => 'sports_id',
		),
		'column_name_changes' => array(
			'sport_type_obj' => 'sport',
		),
	);

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);

	protected $_has_one = array(
		'image' => array(
			'model' => 'Media_Image',
			'foreign_key' => 'media_id'
		),
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'media_id'
		)
	);


	public function rules(){

		return array
		(
			'users_id' => array(
				array('not_empty'),
				array('digit'),
				array('users_id_exist'),
			),
			/*
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// users_id (int)
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// media_type (enum)
			'media_type'=>array(
				array('not_empty'),
			),

			// sports_id (int)
			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist')
			),
/*
			// subject_type_id (int)
			'subject_type_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_type_id', 'subject_id'))
			),
*/
		);
	}
	/* Comment by Jeffrey, Invalid now
	public function getMediaForObject(ORM $object)
	{
		// Get Ent Type ID
		$enttypeID = Ent::getMyEntTypeID($object);
		$result = $this->where('subject_type_id','=',$enttypeID);
		return $result;
	}
	*/
	/**
	 * getTaggedObjects should get all tagged objects and return them each with their getBasics data
	 * this method should select from the tags table where media_id = $this->id
	 */
	public static function getTaggedObjects($media_id)
	{
		$result = ORM::factory("Site_Tag")->where('media_id', '=', $media_id)->find_all();
		return $result;
	}

	public function addMedia($args = array())
	{
		//using user_id instead of users_id because I'm using this method to transfer old stuff right now.
		if(isset($args['user_id']))
		{
			$this->users_id = $args['user_id'];
		}
		else
		{
			$user = Auth::instance()->get_user();
			$this->users_id = $user->id;
		}

		if(isset($args['media_type']))
		{
			$this->media_type = $args['media_type'];
		}

		if(isset($args['sports_id']))
		{
			$this->sports_id = $args['sports_id'];
		}

		if(isset($args['name']))
		{
			$this->name = $args['name'];
		}
		else
		{
			$this->name = "";
		}
		$this->save();

		return $this->id;
	}

	public function owner()
	{
		if(!$this->id)
		{
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user)
	{
		$curr_user = Auth::instance()->get_user();
		if($curr_user->has('roles', ORM::factory('Role', array('id' =>2))) || $curr_user->has('roles', ORM::factory('Role', array('id' =>10)))) return true;
		if (is_object($user)){
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}

	public static function get_media_as_correct_type($mediaID)
	{
		$media=ORM::factory('Media_Base',$mediaID);
		if(!$media->loaded()) return false;

		if($media->media_type == 'image') $model = 'Media_Image';
		elseif($media->media_type == 'video') $model = 'Media_Video';

		$res = ORM::factory($model)->where('media_id','=',$media->id)->find();
		return $res;
	}

	public function getTaggedMedia($obj, $sports_id = null){
		$result_arr = null;
		$limit = Model_Media_Image::getImageCounts($obj);
		if($primary = Model_Media_Base::find_most_voted_tag($obj,array('image','video'), $limit))
		{
			//if the third parameter is more than one and it finds more than one result then it will return them in an array
			if(is_array($primary))
			{
				//Loop through results
				foreach($primary as $media_id => $single_image)
				{
					$media_obj = ORM::factory("Media_Base", $media_id);
					if (is_integer($sports_id)){ //only get videos related to one sports_id
						if ($media_obj->sports_id == $sports_id)
						{
							$result_arr[] = $single_image->getBasics();
						}
					}
					else
					{
						$result_arr[] = $single_image->getBasics();
					}
				}
			}
			else
			{
				$media_obj = ORM::factory("Media_Base", $primary->media_id);
				if (is_integer($sports_id)){ //only get videos related to one sports_id
					if ($media_obj->sports_id == $sports_id)
					{
						$single_image = clone $primary;
						$result_arr[] = $single_image->getBasics();
					}
				}
				else
				{
					$single_image = clone $primary;
					$result_arr[] = $single_image->getBasics();
				}

			}
		}
		$results = new stdClass();
		$results->result = $result_arr;
		return $results;
	}

	public static function find_most_voted_tag($obj,$mediaType="image",$limit=1)
	{

		//TODO: Make it so that teams pull users under them

		// get tagged images

		$entTypeID = Ent::getMyEntTypeID($obj);
		$subjectID = $obj->id;

		// This is a sub query that pulls all the media with the passed object tagged
		// It is joined with the media table so that we can pull media_type (image/vid)
		$tags = DB::select('media_id')
			->from('tags')
			->join('media','left')
				->on('media.id','=','tags.media_id')
			->where('tags.subject_enttypes_id','=',$entTypeID)
			->where('tags.subject_id','=',$subjectID)
			->group_by('media_id');

		if(is_array($mediaType))
		{
			$tags->and_where_open();
			foreach($mediaType as $type)
			{
				$tags->or_where('media.media_type','=',strtolower($type));
			}
			$tags->and_where_close();
		}
		else
		{
			$tags->where('media.media_type','=',strtolower($mediaType));
		}


		//exclude tags,  media
		$classes_arr = array('Site_Tag' => 'tags', 'Media_Base' => 'media');
		$tags = ORM::_sql_exclude_deleted($classes_arr, $tags);

		// This sub query simply gets a count of votes for the current media ID
		$count = DB::select(DB::expr('COUNT(id)'))
			->from('votes')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID('Media_Base'))
			->and_where('subject_id','=',DB::expr('tagged.media_id'));

		$classes_arr = array('Site_Vote' => 'votes');
		$count = ORM::_sql_exclude_deleted($classes_arr, $count);

		// This just puts it all together
		$qry = DB::select(array($count,'num_votes'),DB::expr('tagged.media_id'))
			->from(array($tags,'tagged'))
			->order_by('num_votes','DESC')
			->limit($limit);

		$res = $qry->execute();

//		print_r($res);
		if($res->count() > 0)
		{
			// This will only be the case if $limit is set to multiple and there are multiple results
			if($res->count() > 1)
			{
				$retArr = array();
				foreach($res as $media)
				{
					$retArr[$media['media_id']] = Model_Media_Base::get_media_as_correct_type($media['media_id']);
				}
				if(sizeof($retArr) > 0) return $retArr;
			}
			// We use the getMediaAsCorrectType method to return either a video or an image (whatever the media ID refers to)
			return Model_Media_Base::get_media_as_correct_type($res[0]['media_id']);
		}
		else
		{
			return false;
		}
	}
}
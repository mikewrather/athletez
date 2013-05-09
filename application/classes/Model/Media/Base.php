<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:46 PM
 */

class Model_Media_Base extends ORM
{
	
	protected $_table_name = 'media';

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

	public function getMediaForObject(ORM $object)
	{
		// Get Ent Type ID
		$enttypeID = Ent::getMyEntTypeID($object);
		$result = $this->where('subject_type_id','=',$enttypeID);
		return $result;
	}

	/**
	 * getTaggedObjects should get all tagged objects and return them each with their getBasics data
	 * this method should select from the tags table where media_id = $this->id
	 */
	public function getTaggedObjects()
	{

	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"media_type" => $this->media_type,
			"subject_type_id" => $this->subject_type_id,
			"subject_id" => $this->subject_id,
			"sport" => $this->sport->getBasics(),
			"user" => $this->user->getBasics(),
		);
	}

	public function addMedia($args = array())
	{
		//using user_id instead of users_id because I'm using this method to transfer old stuff right now.
		if(isset($args['user_id']))
		{
			$this->users_id = $args['user_id'];
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
			->where('media.media_type','=',strtolower($mediaType))
			->group_by('media_id');

		// This sub query simply gets a count of votes for the current media ID
		$count = DB::select(DB::expr('COUNT(id)'))
			->from('votes')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID('Media_Base'))
			->and_where('subject_id','=',DB::expr('tagged.media_id'));

		// This just puts it all together
		$qry = DB::select(array($count,'num_votes'),DB::expr('tagged.media_id'))
			->from(array($tags,'tagged'))
			->order_by('num_votes','DESC')
			->limit($limit);

		$res = $qry->execute();

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
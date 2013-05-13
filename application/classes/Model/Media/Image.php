<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:47 PM
 */

class Model_Media_Image extends ORM
{
	
	protected $_table_name = 'images';
	

	protected $_belongs_to = array(
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'media_id'
		)
	);
	
	protected $_has_many = array(
		'metadata' => array(
			'model' => 'Media_Imagesmeta',
			'foreign_key' => 'images_id'
		),
	);

	public function rules(){

		return array
		(
			// media_id (int)
			'media_id'=>array(
				array('not_empty'),
				array('digit'),
			),
		);
	}

	public function getBasics()
	{
		$num_votes = Model_Site_Vote::getNumVotes($this);

		return array(
			"id" => $this->id,
			"media" => $this->media->getBasics(),
			"num_votes" => $num_votes,
			"meta_details" => $this->get_meta_as_array()
		);
	}

	public function getGameImages($games_id){
		$games_model = ORM::factory("Sportorg_Games_Base");

		$media_image = ORM::factory("Media_Image");
		$enttypeID = Ent::getMyEntTypeID($games_model);

		$media_image->join('media', 'RIGHT')->on('media_image.media_id', '=','media.id')
			->where('media.subject_type_id', '=', $enttypeID)
			->and_where('media.subject_id', '=', $games_id);
		return $media_image;
	}

	public function addImage($args = array())
	{

		$args["media_type"] = "image";
		$this->media_id = ORM::factory('Media_Base')->addMedia($args);
		if(!$this->loaded()) $this->create();

		foreach($args as $metaprop => $metaval)
		{
			$metaObj = ORM::factory('Media_Imagesmeta');
			$metaObj->images_id = $this->id;
			$metaObj->image_prop = $metaprop;
			$metaObj->image_val = $metaval;
			$metaObj->save();

		}

	}

	public function getSearch($args = array()){
		extract($args);
		$this->join('media')->on('media_image.media_id', '=', 'media.id');
		$this->join('sports')->on('media.sports_id', '=', 'sports.id');
		$this->join('org_sport_link')->on('sports.id', '=', 'org_sport_link.sports_id');
		$this->join('teams')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
		$this->join('users_teams_link')->on('users_teams_link.teams_id', '=', 'teams.id');
		$this->join('users')->on('users_teams_link.users_id', '=', 'users.id');
		$this->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
		if (isset($sports_id)){
			$this->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($complevels_id)){
			$this->where('teams.complevels_id', '=', $complevels_id);
		}

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
		$counts = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
			->select(array('subject_id', 'users_id'))
			->from('votes')
			->where('subject_enttypes_id','=',$enttype_id);

		if (!isset($orderby)){
			$this->join(array($counts,'filtered'))->on('filtered.users_id', '=', 'users.id');
			$this->order_by('num_votes', 'asc');
		}else{
			$this->order_by($orderby, 'asc');
		}

		if (isset($gradyear)){
			$this->where('users.grad_year', '=', $gradyear);
		}

		if (isset($positions_id)){
			$this->join('positions')->on('positions.sports_id', '=', 'sports.id');
			$this->where('positions.id', '=', $positions_id);
		}

		if (isset($searchtext))
			$this->where('orgs.name', 'like', "%".$searchtext."%");

		return $this;
	}

	public function name()
	{
		return "Image ".$this->id;
	}

	public static function get_user_image_meta($image_id){
		if (empty($image_id)){
			return "";
		}
		$media_image = ORM::factory("Media_Image", $image_id);

		return $media_image->metadata->find_all();
	}

	/**
	 * This method will return an array of metadata for this image with key/value pairs
	 * @return array of metadata for the image
	 */
	public function get_meta_as_array()
	{
		if(!$this->loaded()) return;
		$image_meta_res = $this->metadata->find_all();

		$retArr = null;

		foreach($image_meta_res as $data)
		{
			if ($data->image_val != "" && $data->image_val != nulll)
				$retArr[$data->image_prop] = $data->image_val;
		}

		return $retArr;
	}


}
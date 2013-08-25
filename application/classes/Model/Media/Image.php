<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:47 PM
 */

class Model_Media_Image extends ORM
{
	
	protected $_table_name = 'images';

	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(
			'sport' => 'sports_id',
		),
		'added_function_calls' => array(
			'image_title'=>'get_name',
			'num_votes'=>'get_num_votes',
			'types' =>'getTypes'
		),
		'column_name_changes' => array(
			'original_url' => 'image_path',
		),
	);

	protected $_belongs_to = array(
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'media_id'
		)
	);
	
	protected $_has_many = array(
		'typelinks' => array(
			'model' => 'Media_Imagetypelink',
			'foreign_key' => 'images_id'
		),
		'types' => array(
			'model' => 'Media_Imagetype',
			'through' => 'image_type_link',
			'far_key' => 'image_types_id',
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



	public function get_name()
	{
		return $this->media->name;
	}
	public function get_num_votes()
	{
		return Model_Site_Vote::getNumVotes($this);
	}

	public function getTypes()
	{
		$retArr = array();
		foreach($this->typelinks->find_all() as $tl)
		{
			$retArr[$tl->type->name] = $tl->getBasics();
		}
		return $retArr;
	}

	public function getGameImages($games_id){
		$games_model = ORM::factory("Sportorg_Games_Base");

		$media_image = ORM::factory("Media_Image");
		$enttypeID = Ent::getMyEntTypeID($games_model);

		$media_image->join('tags', 'RIGHT')->on('media_image.media_id', '=','tags.media_id')
			->where('tags.subject_enttypes_id', '=', $enttypeID)
			->and_where('tags.subject_id', '=', $games_id);
		return $media_image;
	}

	public function getTagedImages($obj, $sports_id = null){
		$result_arr = null;
		$limit = Model_Media_Image::getImageCounts($obj);
		if($primary = Model_Media_Base::find_most_voted_tag($obj,'image', $limit))
		{
			//if the third parameter is more than one and it finds more than one result then it will return them in an array
			if(is_array($primary))
			{
				//Loop through results
				foreach($primary as $media_id => $single_image)
				{
					$media_obj = ORM::factory("Media_Base", $media_id);
					if ($sports_id){ //only get videos related to one sports_id

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
				$single_image = clone $primary;
				$result_arr[] = $single_image->getBasics();
			}
		}
		$results = new stdClass();
		$results->result = $result_arr;
		return $results;
	}

	/**
	 * This method will add a new image to the media table, the image table, save an original,
	 * and then trigger the function to generate all image types based off of the original
	 *
	 * @param array $args includes name, sports_id and files which have been uploaded and retrived from $_FILES array
	 * @return $this|bool which can be used in chaining if it doesn't fail and return false
	 */
	public function addImage($args = array())
	{
		// create a row in the media table and store the ID of that row in this table
		$args["media_type"] = "image";
	//	$args['user_id'] = (isset($$args['user_id']) && $$args['user_id'] > 0) ? $$args['user_id'] : Auth::instance()->get_user()->id;
		$this->media_id = ORM::factory('Media_Base')->addMedia($args);

		// Create this object in DB if not already loaded with an ID
		
		if(!$this->loaded()) $this->create();
		
		// Loop through files which are being added or uploaded
		foreach($args['files'] as $key=>$img_data)
		{
			// check to make sure it's an image.  If it's not terminate this function
			if(!strstr($img_data['type'],'image')) continue;
			else
			{
				// Save to variable because it will be used outside loop
				$tmp_image = $img_data['tmp_name'];

				// Create an image object for image data and save data to table
				$img_obj = Image::factory($tmp_image);

				$type = image_type_to_extension($img_obj->type, FALSE);

				// This is where we will temporarily store the new image before we upload to s3
				$local_path  = DOCROOT . '../files_temp/' . md5(rand()) . '.' .$type;

				//check for rotation
				if(isset($args['rotate']))
				{
					$img_obj->rotate($args['rotate']);
				}

				$img_obj->save($local_path);

				// user is used to generate url for s3
				$user = Auth::instance()->get_user();

				// save to s3 and save s3 url to database
				$this->original_url = s3::upload($local_path,$user->id);

				// save all other information to database
				$this->original_x = $img_obj->width;
				$this->original_y = $img_obj->height;
				$this->original_mime = $img_obj->mime;
				$this->original_size = filesize($local_path);
				try
				{
					$this->save();
					// generate images for each size / quality type
					$this->generate_types($local_path);
					return $this;
				}
				catch(ORM_Validation_Exception $e)
				{
					return $e;
				}

			}
		}
		//return $args['files'];
		return $this;
	}

	public function saveCrop($args,$user)
	{
		$request = Request::factory($args['image_url']);

		$request->client()->options(array(
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0
		));

		$response = $request->execute();
		//print_r($response);

		$local_path  = DOCROOT . '../files_temp/' . md5(rand());
		file_put_contents($local_path, $response->body());

		$image = Image::factory($local_path);

		$image->resize($args['image_width'],$args['image_height']);
		$image->crop($args['crop_width'],$args['crop_height'],$args['crop_x'],$args['crop_y']);
		$image->save();

		$media_args = array(
			'name' => $user->name().' Userpic',
			'files' => array(
				array(
					'tmp_name'=>$image->file,
					'type'=>$image->mime,
				)
			)
		);

		$result = $this->addImage($media_args);

		$user->user_picture = $result->id;
		$user->save();

		unlink($local_path);

		return $result;
	}

	/**
	 * generate_types method loops through all the different types stored in the db
	 * and generates an image of a given size / quality for each then saves that
	 * to s3 and stores the reference in the database
	 *
	 * @param null $local_url is the local path of the image we are using to generate types for.  If not available the original will be downloaded.
	 * @return $this used for possible chaining.
	 */
	private function generate_types($local_url=NULL)
	{
		// UserID is used to generate the url for the image
		$user = Auth::instance()->get_user();

		// retrieve all active image types to generate
		$types = ORM::factory('Media_Imagetype')->where('active','=',1)->find_all();

		// If local path is not provided the image will be pulled from the url in order to have a local copy to manipulate
		$image = $local_url==NULL ? $this->pull_to_local($this->original_url) : Image::factory($local_url);

		// Loop through types and generate image for each
		foreach($types as $type)
		{
			// Image must be cloned so that resizing does not alter the original object
			$this_img = clone($image);

			// This is where we will temporarily store the new image before we upload to s3
			$local_path  = DOCROOT . '../files_temp/' . md5(rand()) . '.' . $type->img_extension;

			// only resize if we are resizing down.  because the db col can be null we also have to check to make sure > 0
			if(((int)$type->width > 0 && $type->width < $image->width) || ((int)$type->height > 0 && $type->height < $image->height))
			{
				// If the height or width is blank in the database, NULL will be passed to the function so it is ignored
				$this_img->resize(
					$type->width != '' ? $type->width : NULL,
					$type->height != '' ? $type->height : NULL,
					Image::AUTO // this is the resizing instruction
				);
			}

			// Save with new quality
			$this_img->save($local_path,$type->quality);

			// Delete any existing links
			DB::delete('image_type_link')->where('images_id','=',$this->id)->and_where('image_types_id','=',$type->id)->execute();

			// Set up the image type link and set all relevant properties
			$this_type = ORM::factory('Media_Imagetypelink');
			$this_type->image_types_id = $type->id;
			$this_type->images_id = $this->id;
			$this_type->width = $this_img->width;
			$this_type->height = $this_img->height;
			$this_type->file_size_bytes = filesize($local_path);
			$this_type->url = s3::upload($local_path,$user->id); // upload to s3 and set new url
			$this_type->mime = $this_img->mime;
			$this_type->save();

			// Delete the temporary file
			unlink($local_path);

			// Unset all variables for use in the next iteration
			unset($this_img);
			unset($this_type);
			unset($local_path);
			if($local_url !== NULL) unset($local_url);
		}

		// Clean up locally pulled file (if it was not already local
		if($local_url===NULL) unlink($image->file);
		unset($image);

		return $this;

	}

	private function assemblingSql($class_name, $condition = array()){

		$enttypes_id = Ent::getMyEntTypeID($class_name);
		extract($condition);

		$image = DB::select('images.id', 'media.sports_id')
			->from('tags')
			->join('media')->on('media.id', '=', 'tags.media_id')
			->where('media.media_type', '=', 'image')
			->join('images')->on('images.media_id', '=', 'media.id')
			->and_where('tags.subject_enttypes_id', '=', $enttypes_id);
		if (isset($sports_id)){
			$image->where('media.sports_id', '=', $sports_id);
		}

		if (isset($states_id)){
			$image->where('tags.states_id', '=', $states_id);
		}

		if (isset($cities_id)){
			$image->where('tags.cities_id', '=', $cities_id);
		}

		if ($class_name == 'User_Base'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$image->join(array('users', 'user_base'))->on('user_base.id', '=', 'tags.subject_id');
			}
			if (isset($searchtext)){
				//$image->where(array(Db::expr('CONCAT(user_base.first_name," ",user_base.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
				$image->where('media.name', 'like', "%".$searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Team'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$image->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$image->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$image->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
			}

			if (isset($searchtext)){
				//$image->where('orgs.name', 'like', '%'.$searchtext.'%');
				$image->where('media.name', 'like', "%".$searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Games_Base'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$image->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$image->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$image->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
			}

			if (isset($searchtext)){
				//$image->where('orgs.name', 'like', '%'.$searchtext.'%');
				$image->where('media.name', 'like', "%".$searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Org'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$image->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$image->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$image->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
			}

			if (isset($searchtext)){
				//$image->where('orgs.name', 'like', '%'.$searchtext.'%');
				$image->where('media.name', 'like', "%".$searchtext."%");
			}
		}
		return $image;
	}


	public function getSearch($args = array()){
		extract($args);

		//get four types
		//user section
		$user_image = $this->assemblingSql('User_Base', $args);
		//team section
		$team_image = $this->assemblingSql('Sportorg_Team', $args);
		//org section
		$org_image = $this->assemblingSql('Sportorg_Org', $args);
		//game section
		$game_image = $this->assemblingSql('Sportorg_Games_Base', $args);

		$results = DB::select('images.id', array(DB::expr('NULL'),'sports_id'))->from('images')
			->where('images.id', '=', '-1')  // 0 rows returned plus below results
			->union($user_image, false)
			->union($team_image, false)
			->union($org_image, false)
			->union($game_image, false)->execute()->as_array();

		if (empty($results)){
			$image_ids[] = -1; //avoid sql error
		}

		foreach($results as $arr){
			$image_ids[] = $arr['id'];
		}

		$imageModel = ORM::factory("Media_Image");


		if (!isset($orderby) || $orderby == 'votes'){
			$enttype_id = Model_Site_Enttype::getMyEntTypeID($imageModel);
			$image_votes = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
				->select(array('subject_id', 'images_id'))
				->from('votes')
				->where('subject_enttypes_id','=',$enttype_id);

			$imageModel->join(array($image_votes, 'image_votes'), 'left')->on('image_votes.images_id', '=', 'media_image.id');
			$imageModel->order_by('num_votes', 'desc');
		}else if ($orderby == 'followers'){
			$enttype_id = Model_Site_Enttype::getMyEntTypeID($imageModel);
			$followers = DB::select(array(DB::expr('COUNT(id)'),'num_followers'))
				->select(array('subject_id', 'images_id'))
				->from('followers')
				->where('subject_enttypes_id','=',$enttype_id);
			$imageModel->join(array($followers,'followers'), 'LEFT')->on('followers.images_id', '=', 'media_image.id');
			$imageModel->order_by('num_followers', 'desc');
		}else if ($orderby == 'postTime'){
			$imageModel->join('media' ,'left')->on('media_image.media_id', '=', 'media.id');
			$imageModel->order_by('media.timePosted', 'desc');
		}

		$imageModel->where('media_image.id', 'in', $image_ids);

		return $imageModel;
	}

	public function name()
	{
		return "Image ".$this->id;
	}

	/**
	 * get_meta_as_array This method will return an array of metadata for this image with key/value pairs
	 * @param $type int is the ID of the type we want to pull data from
	 * @return array of metadata for the image
	 */
	public function get_meta_as_array($type=NULL)
	{
		//TODO: This needs to be updated to take an optional type ID and if none is provided return data for every image type
		if(!$this->loaded()) return;

		$meta = $this->typelinks;

		if($type===NULL)
		{
			$res = $meta->find_all();
			$retArr = array();
			foreach($res as $type)
			{
				$retArr[$type->image_types_id] = $this->get_meta_as_array($type->image_types_id);
			}
			return $retArr;
		}
		else
		{
			$typelink = $meta->where('image_types_id','=',$type)->find();
			if(!$typelink->loaded()) return;
			return $typelink->get_meta_as_array();
		}

	}

	public function pull_to_local($offsite_path)
	{
	//	if($types_id===NULL) return false;

		try
		{
			$local_copy = file_get_contents($offsite_path);
			$local_path  = DOCROOT . '../files_temp/' . md5(rand());
			file_put_contents($local_path, $local_copy);

			$image = Image::factory($local_path);

			if(!is_object($image)) return false;
			else return $image;
		}
		catch(ErrorException $e)
		{
			return false;
		}

	}

	public static function getImageCounts($obj){
		$enttype_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$res = DB::select(array(DB::expr('COUNT(*)'), 'total_count'))->from('tags')
			->where('subject_enttypes_id', '=', $enttype_id)
			->where('subject_id', '=',$subject_id);
		return $res->execute()->get('total_count');
	}
}
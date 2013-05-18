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

	public function getBasics()
	{
		$num_votes = Model_Site_Vote::getNumVotes($this);

		return array(
			"id" => $this->id,
			"original_url" => $this->original_url,
			"moviemasher_id" => $this->moviemasher_id,
			//Comment by Jeffrey, There is loop when from media to get image info
			"media" => $this->media->getBasics(),//->getBasics(),
			"num_votes" => $num_votes,
			"types" => $this->getTypes(),
		);
	}

	public function getTypes()
	{
		$retArr = array();
		foreach($this->typelinks->find_all() as $tl)
		{
			$retArr[] = $tl->getBasics();
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
				foreach($primary as $media_id => $single_media)
				{
					$media_obj = ORM::factory("Media_Base", $media_id);
					if ($sports_id){ //only get videos related to one sports_id

						if ($media_obj->sports_id == $sports_id){
							$combine_object = new stdClass();
							$num_votes = Model_Site_Vote::getNumVotes($single_media->image);
							$image_meta = $single_media->image->get_meta_as_array();
							$image_id = $single_media->image->id;
							$image_title = $image_meta['title'];
							$combine_object->image_id = $image_id;
							$combine_object->image_path = $image_meta['thumb_url'];
							$combine_object->image_title = $image_title;
							$combine_object->num_votes = $num_votes;
							$result_arr[] = $combine_object;
							unset($combine_object);
						}

					}else{
						$combine_object = new stdClass();
						$num_votes = Model_Site_Vote::getNumVotes($single_media->image);
						$image_meta = $single_media->image->get_meta_as_array();
						$image_id = $single_media->image->id;
						$image_title = $image_meta['title'];
						$combine_object->image_id = $image_id;
						$combine_object->image_path = $image_meta['thumb_url'];
						$combine_object->image_title = $image_title;
						$combine_object->num_votes = $num_votes;
						$result_arr[] = $combine_object;
						unset($combine_object);
					}
				}
			}else{
				$single_media = clone $primary;
				$combine_object = new stdClass();
				$num_votes = Model_Site_Vote::getNumVotes($single_media->image);
				$image_meta = $single_media->image->get_meta_as_array();
				$image_id = $single_media->image->id;
				$image_title = $image_meta['title'];
				$combine_object->image_id = $image_id;
				$combine_object->image_path = $image_meta['thumb_url'];
				$combine_object->image_title = $image_title;
				$combine_object->num_votes = $num_votes;
				$result_arr[] = $combine_object;
				unset($combine_object);
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
		$this->media_id = ORM::factory('Media_Base')->addMedia($args);

		// Create this object in DB if not already loaded with an ID
		if(!$this->loaded()) $this->create();

		// Loop through files which are being added or uploaded
		foreach($args['files'] as $key=>$img_data)
		{
			// check to make sure it's an image.  If it's not terminate this function
			if(!strstr($img_data['type'],'image')) return false;
			else
			{
				// Save to variable because it will be used outside loop
				$tmp_image = $img_data['tmp_name'];

				// Create an image object for image data and save data to table
				$img_obj = Image::factory($tmp_image);

				// user is used to generate url for s3
				$user = Auth::instance()->get_user();

				// save to s3 and save s3 url to database
				$this->original_url = s3::upload($tmp_image,$user->id);

				// save all other information to database
				$this->original_x = $img_obj->width;
				$this->original_y = $img_obj->height;
				$this->original_mime = $img_obj->mime;
				$this->original_size = filesize($tmp_image);
				$this->save();
			}
		}

		// generate images for each size / quality type
		$this->generate_types($tmp_image);

		return $this;

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
		}

		// Clean up locally pulled file (if it was not already local
		if($local_url===NULL) unlink($image->file);
		unset($image);

		return $this;

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


		return $media_image->metadata->find_all();
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

}
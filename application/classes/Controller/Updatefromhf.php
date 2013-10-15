<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/21/13
 * Time: 7:02 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Updatefromhf extends Controller
{

	public function action_index()
	{
		ini_set('memory_limit', '1024M');
		set_time_limit(0);
	//	$this->transfer_users();
	//	$this->transfer_videos_from_queue();
	//	$this->update_tags();
	}

	public function action_getlocs()
	{
		ini_set('memory_limit', '1024M');
		set_time_limit(0);

		$start_record = DB::select('id')->from('athletesup_main.orgs')
			->where('locations_id','IS NOT',null)
			->order_by('id','DESC')
			->limit(1)
			->execute();

		$sr = $start_record[0]['id'];

		$sc_orgs = DB::select()->from('test.schools_highlightfront')
			->where('id','>',$sr)
			->limit(1000)
			->execute();

		mysql_select_db('athletesup_main');
		foreach($sc_orgs as $org)
		{
			echo $org['id'];

			$args = array( 'address'=>$org['address_n_c_s'] );
			$location = ORM::factory('Location_Base');
			$location = $location->addLocation($args);
			if(is_subclass_of($location,'Kohana_Exception')) return;
			if($location->loaded())
			{
				DB::update('orgs')->set(array('locations_id'=>$location->id))
					->where('id','=',$org['id'])
					->execute();
			}
		}
	}

	public function action_entersmallthumbs()
	{
		$videos = ORM::factory('Media_Video')
			->where('thumbs','IS NOT',null)
			->find_all();

		foreach($videos as $video)
		{
			$url = $video->thumbs;
			$orig_x = $video->thumb_width;
			$orig_y = $video->thumb_height;

			$video->small_thumb_height = 220;
			$video->small_thumb_width = (220/$orig_y) * $orig_x;
			$video->small_thumbs = str_replace('L_0000.png','t_0000.png',$url);
			$video->save();
		}
	}

	protected function update_tags()
	{
		$new_vids = DB::select()
			->from('media')
			->where('id','>',2483)
			->and_where('media_type','=','video')
			->execute();

		foreach($new_vids as $vid)
		{
			list($cities_id,$states_id) = $this->setLocation(1,$vid['users_id']);
			DB::insert('tags',array('media_id','subject_enttypes_id','subject_id','users_id','cities_id','states_id'))
				->values(array(
					$vid['id'],
					1,
					$vid['users_id'],
					$vid['users_id'],
					$cities_id,
					$states_id
				))->execute();
		}
	}

	protected function setLocation($subject_type_id,$subject_id)
	{

		$ent = Ent::eFact($subject_type_id,$subject_id);

		$className = get_class($ent);
		switch ($className){
			case "Model_User_Base":
				$cities_id = $ent->cities_id;
				break;
			case "Model_Sportorg_Team":
				$org = $ent->getOrg();
				$cities_id = $org->location->cities_id;
				break;
			case "Model_Sportorg_Games_Base":
				$cities_id = $ent->location->cities_id;
				break;
			case "Model_Sportorg_Org":
				$cities_id = $ent->location->cities_id;
				break;
			default:
				break;
		}

		if((int)$cities_id > 0)
		{
			$city = ORM::factory('Location_City')->where('id','=',$cities_id)->find();
			if(!$city->loaded()) return false;
			return array($cities_id,$city->states_id);
		}

	}

	protected function transfer_videos_from_queue()
	{
		$queue = DB::select()->from('queuedvideos_hf')
			->execute();

		foreach($queue as $video_row)
		{

			$video = ORM::factory('Media_Video');
			$media = ORM::factory('Media_Base');


			$mediaArr = array(
				"media_type" => "video",
			);


			$mediaArr['sports_id'] = $video_row['sports_id'];


			$mediaArr['user_id'] = $video_row['user_id'];


			$mediaArr['name'] = $video_row['title'];

			$video->media_id = $media->addMedia($mediaArr);

			try
			{
				$video->save();
				$queued = ORM::factory('Media_Queuedvideo');
				$queued->url = $video_row['url'];
				$queued->users_id = $video_row['user_id'];
				$queued->videos_id = $video->id;
				$queued->sports_id = $video_row['sports_id'];
				$queued->save();
			}
			catch(ORM_Validation_Exception $e)
			{
				return $e;
			}
		}
	}

	protected function transfer_users()
	{

		$offset = 1212;
		$hf_users = DB::select()->from('highlightfront.users')->order_by('id','ASC')
			->offset($offset)
			->limit(900)
			->execute();


		$count = $offset;
		foreach($hf_users as $hfu)
		{
			ob_start();
			mysql_select_db('athletesup_main');
			$fields = array(
				'id',
				'username',
				'password',
				'email',
				'date_created',
				'last_login',
				'login_count',
				'logins',
				'first_name',
				'last_name',
				'cities_id',
				'dob',
				'grad_year',
				'gender'
			);

			$values = array(
				$hfu['id'],
				$hfu['username'],
				$hfu['password'],
				$hfu['email'],
				$hfu['date_created'],
				$hfu['last_login'],
				$hfu['logins'],
				$hfu['logins'],
				$hfu['first_name'],
				$hfu['last_name'],
				$hfu['city_id'],
				$hfu['birthdate'],
				$hfu['grad_year'],
				$hfu['gender'] == "M" || $hfu['gender'] == "F" ? $hfu['gender'] : "M"
			);

			DB::insert('users',$fields)->values($values)->execute();

			echo "\n\n".$count++.". Processing User: " . $hfu['email']."\n";

			$this_user = ORM::factory('User_Base',$hfu['id']);

			if($hfu['userpic'] != "")
			{
				echo "  Process Userpic. ".$hfu['userpic']."\n";
				//input userpic
				$image = ORM::factory('Media_Image');
				$image->savecrop(array('image_url'=>$hfu['userpic']),$this_user,false);
			}

			$this->transferUserImages($hfu['id'],$hfu['sport_id'],$hfu['city_id'],$hfu['state_id']);
			$this->processOrgs($hfu['id']);


			$output = ob_get_clean();
			$this->writeOutput($output);
			ob_end_clean();

		}
	}

	protected function writeOutput($out)
	{
		$my_file  = DOCROOT . '../files_temp/hf_process.txt';
		$handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
		fwrite($handle, $out);
		fclose($handle);
	}

	protected function transferUserImages($userid,$sports_id,$city,$state)
	{
		echo "\n  Process Images:";
		$images = DB::select()->from('highlightfront.images')
			->where('user_id','=',$userid)
			->execute();

		foreach($images as $img)
		{
			echo "\n      Process Image: ".$img['url']." ";
			$process_arr = array(
				'image_url' => $img['url'],
				'title' => $img['title'],
				'users_id' => $userid,
				'sports_id' => $sports_id
			);
			mysql_select_db('athletesup_main');
			$this->processHFImage($process_arr,$city,$state);
		}
	}

	protected function processHFImage($args,$city,$state)
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

		try{
			$image = Image::factory($local_path);
		}
		catch(Kohana_Exception $e)
		{
			return;
		}

		$media_args = array(
			'name' => $args['title'],
			'files' => array(
				array(
					'tmp_name'=>$image->file,
					'type'=>$image->mime,
				)
			),
			'sports_id' => $args['sports_id'],
			'pre_crop_url' => $args['image_url'],
			'user_id' => $args['users_id']
		);

		$image_model = ORM::factory('Media_Image');
		$result = $image_model->addImage($media_args);
		echo "Added.  ";

		DB::insert('tags',array('media_id','subject_enttypes_id','subject_id','users_id','cities_id','states_id'))
			->values(array(
				$result->media_id,
				1,
				$args['users_id'],
				$args['users_id'],
				$city,
				$state
			))->execute();

		echo "Tagged.  ";

		try{
			unlink($local_path);
		}
		catch(ErrorException $e)
		{

		}

		return $result;
	}

	protected function processOrgs($userid)
	{
		echo "\n  Process Orgs:\n";
		$hfut = DB::select()->from('highlightfront.users_teams')
			->where('user_id','=',$userid)
			->execute();

		foreach($hfut as $hfteam)
		{
			echo "      Process Team. \n";
			mysql_select_db('athletesup_main');
			//check for org_sport_link
			$osl = DB::select('id')->from('org_sport_link')
				->where('orgs_id','=',$hfteam['school_id'])
				->and_where('sports_id','=',$hfteam['sport_id'])
				->limit(1)
				->execute();

			if($osl->count() == 0)
			{
				$new_osl = DB::insert('org_sport_link',array(
					'orgs_id',
					'sports_id',
				))->values(array(
					$hfteam['school_id'],
					$hfteam['sport_id']
				))->execute();
				$osl_id = $new_osl[0];
				echo "          Add OSL $osl_id. \n";
			}
			else
			{
				$osl_id = $osl[0]['id'];
				echo "          FOUND OSL $osl_id. \n";
			}

			$level_map = array(
				"1"=>"1",
				"2"=>"2",
				"3"=>"6",
				"4"=>"7"
			);

			$season_map = array(
				'Winter'=>1,
				'Spring'=>2,
				'Summer'=>4,
				'Fall'=>3
			);

			//check if team exists
			$teams = DB::select('id')->from('teams')
				->where('org_sport_link_id','=',$osl_id)
				->and_where('complevels_id','=',$level_map[$hfteam['level_id']])
				->and_where('seasons_id','=',$season_map[$hfteam['season']])
				->and_where('year','=',$hfteam['season_year'])
				->limit(1)
				->execute();

			if($teams->count() ==0)
			{
				$new_team = DB::insert('teams',array(
					'org_sport_link_id',
					'complevels_id',
					'seasons_id',
					'year'
				))->values(array(
					$osl_id,
					$level_map[$hfteam['level_id']],
					$season_map[$hfteam['season']],
					$hfteam['season_year']
				))->execute();
				$teams_id = $new_team[0];
				echo "          Add TEAM $teams_id. \n";
			}
			else
			{
				$teams_id = $teams[0]['id'];
				echo "          FOUND TEAM $teams_id. \n";
			}

			//link user with team
			$utl = DB::select('id')->from('users_teams_link')
				->where('teams_id','=',$teams_id)
				->and_where('users_id','=',$userid)
				->limit(1)
				->execute();

			if($utl->count() == 0)
			{
				$new_utl = DB::insert('users_teams_link',array('teams_id','users_id'))->values(array($teams_id,$userid))->execute();
				$utl_id = $new_utl[0];
				echo "          Add utl $utl_id. \n";
			}
			else
			{
				$utl_id = $utl[0]['id'];
				echo "          FOUND utl $utl_id. \n";
			}

			//link utl with position
			//link user with team
			$utl_pos = DB::select('id')->from('utl_position_link')
				->where('users_teams_link_id','=',$utl_id)
				->and_where('positions_id','=',$hfteam['position_id'])
				->limit(1)
				->execute();

			if($utl_pos->count() == 0)
			{
				$new_utl_pos = DB::insert('utl_position_link',array('users_teams_link_id','positions_id','is_primary'))->values(array($utl_id,$hfteam['position_id'],1))->execute();
				echo "          Add POSTITION. \n";
			}

		}
	}

	public function action_dotransfer()
	{
/*
		//
		$images = ORM::factory('Media_Imageold')->find_all();
		foreach($images as $image)
		{
			$newImage = ORM::factory('Media_Image');
			$args = array();
			$query = DB::query(Database::SELECT, "SHOW FULL COLUMNS FROM images_old where Field != 'id' and Field != 'is_flagged' and Field != 'show_in_gallery' and Field != 'category_id' and Field != 'folder_id' and Field != 'timestamp'");
			$result = $query->execute();
			foreach($result as $col)
			{
				if($image->{$col["Field"]} != '') $args[strtolower($col["Field"])] = $image->{$col["Field"]};
			}

			$newImage->addImage($args);

		}
*/

	}

	public function action_vids()
	{

		$vid_vers = array(
			2=>'mp4_lq_url',
			1=>'mp4_url',
			4=>'webm_lq',
			3=>'webm_hq',
		);

		$vids = ORM::factory('Media_Vidhf')
			->where('id','>=',367)
			->find_all();

		foreach($vids as $vid)
		{

			$args = array(
				"sports_id" => $vid->sports_id,
				"name" => $vid->title,
				"moviemasher_id" =>$vid->mm_id,
				"thumbs" => $vid->multi_thumb,
				"types" => array(),
				"user_id" => $vid->user_id,
			);

			foreach($vid_vers as $vid_type_id => $vid_ver)
			{

				if($vid->$vid_ver != "")
				{
					echo $vid_ver;
					echo "\n";
					echo $vid->$vid_ver;
					echo "\n\n";
					$meta = $vid->meta->where('vid_ver','=',$vid_ver)->find_all();
					foreach($meta as $md)
					{
						$args["types"][$vid_type_id][$md->vid_prop] = $md->vid_val;
					}

				}

			}

			print_r($args);
			$video = ORM::factory('Media_Video');
			$video->addVideo($args);

		}

	}

	public function action_tag()
	{
		// This is the object we want to find the media for
		$team = ORM::factory('Sportorg_Team',3);

		// We call this static method which will pass the object we created and whether we want the primary image or video
		// If there are no results it will return false so we can do a check like this
		if($primary = Model_Media_Base::find_most_voted_tag($team,'image',3))
		{
			//if the third parameter is more than one and it finds more than one result then it will return them in an array
			if(is_array($primary))
			{
				//Loop through results
				foreach($primary as $media)
				{
					// This calls an image method that will load all of the images meta data into an array with key/value pairs
					//$image_meta = $media->get_meta_as_array();

					// each of these can also be called individually
					//print_r($image_meta);
				}
			}
			else
			{
				// This calls an image method that will load all of the images meta data into an array with key/value pairs
				//$image_meta = $primary->get_meta_as_array();

				// each of these can also be called individually
				//print_r($image_meta);
			}
		}
		else
		{
			echo "Nothing Found";
		}

		####################################################
		// We call this static method which will pass the object we created and whether we want the primary image or video
		// If there are no results it will return false so we can do a check like this
		if($primary = Model_Media_Base::find_most_voted_tag($team,'video',3))
		{
			//if the third parameter is more than one and it finds more than one result then it will return them in an array
			if(is_array($primary))
			{
				//Loop through results
				foreach($primary as $media)
				{
					// This calls an image method that will load all of the images meta data into an array with key/value pairs
					$video = $media->get_types_and_meta_as_array();

					// each of these can also be called individually
					print_r($video);
				}
			}
			else
			{
				// This calls an image method that will load all of the images meta data into an array with key/value pairs
				$video = $primary->get_types_and_meta_as_array();

				// each of these can also be called individually
				print_r($video);
			}
		}
		else
		{
			echo "Nothing Found";
		}

	}

	public function action_updateWithMeta()
	{
		// Step 1 shit - transfer everything from meta to the image table struct
		/*
		$qry = DB::select()->from('images_meta')->execute();

		print_r($qry);

		foreach($qry as $meta)
		{
			if($meta['image_prop']=='url')
			{
				$image = ORM::factory('Media_Image',$meta['images_id']);
				$image->original_url = $meta['image_val'];
				$image->save();
			}
			elseif($meta['image_prop']=='original_url')
			{
				$image = ORM::factory('Media_Image',$meta['images_id']);
				$image->original_url = $meta['image_val'];
				$image->save();
			}
			elseif($meta['image_prop']=='mm_id')
			{
				$image = ORM::factory('Media_Image',$meta['images_id']);
				$image->moviemasher_id = $meta['image_val'];
				$image->save();
			}
		}
		*/

		//step 2 populate linking table.

		$subqry = DB::select(array(DB::expr('COUNT(id)'),'num'))->from('image_type_link')->where('image_type_link.images_id','=',DB::expr('`images`.`id`'));
		$qry = DB::select()
			->from('images')
			->where($subqry,'=',0)
			->execute();

		print_r($qry);

		//$qry = ORM::factory('Media_Image')->limit(1000)->find_all();

		foreach($qry as $img)
		{
			$img = ORM::factory('Media_Image',$img['id']);

			if($imgobj = $img->pull_to_local($img->original_url))
			{
				DB::insert('image_type_link',array('images_id','image_types_id','url','width','height','file_size_bytes'))
					->values(array($img->id,1,$img->original_url,$imgobj->width,$imgobj->height,filesize($imgobj->file)))->execute();
				unlink($imgobj->file);
			}
		}

	}

}
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

class Controller_Updateimages extends Controller
{

	public function action_index()
	{
	
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
		/*
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
		*/
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
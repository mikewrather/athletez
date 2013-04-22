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
}
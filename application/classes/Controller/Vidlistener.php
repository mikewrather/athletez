<?php

class Controller_VidListener extends Controller
{

	function action_index($data = null)
	{
		echo $body = file_get_contents("php://input");

		$arr = json_decode($body);

		$video = Model::factory('Media_Video')
			->where('jobID','=',$arr->job->id)
			->and_where('is_ready','=',0)
			->find();

		if(!$video->loaded()) return;

		if(isset($arr->output->thumbnails)){
			
			foreach($arr->output->thumbnails[0]->images as $img)
			{
				$video->thumbs = $img->url;
				break;
			}
		}

		// Get Video Type
		$video_types_id = (int)$arr->output->label;

		// Send to moviemasher (if applicable)
		if($video_types_id == 1 && $video->mm_encode==1) $this->sendToMM($video);

		// Build Array of metadata
		$meta = array();
		foreach($arr->output as $vid_prop => $vid_val)
		{
			if(!is_array($vid_val)) $meta[$vid_prop] = (string)$vid_val;
		}

		// Add video type
		$video->addType($video_types_id,$meta,$arr->output->url);

		// Check if all types are complete and send notification if they are
		$all_done = $video->_check_ready() ? true : false;

		if($all_done)
		{
			Model_Site_Feed::addToFeed($this,'add');
			$this->sendEmail();
		}

	}

	protected function sendEmail()
	{

	}

	protected function sendToMM($video)
	{
/*		$input = array(
			"id"=>$video->mm_id,
			"url"=>$video->original,
			"label"=>$video->title
		);
		$input = serialize($input);

		$output = array(
			"UserID"=>$video->user_id
		);
		$output = serialize($output);

		print('php /home/webdata/html/moviemasher_3-2-14/media/php/start.php \''.$input.'\' \''.$output.'\'');
		exec('php /home/webdata/html/moviemasher_3-2-14/media/php/start.php \''.$input.'\' \''.$output.'\'',$out);

		echo $newID = $out[0];  */
	}
}
<?php



class Controller_VidListener extends Controller
{

	function action_index($data = null)
	{

		ob_start();
		echo $body = file_get_contents("php://input");

		$arr = json_decode($body);

		$out = ob_get_contents();
		ob_end_clean();

	//	echo $out;

		$video = Model::factory('Media_Video')
			->where('jobID','=',$arr->job->id)
			->find();


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
		$sendEmail = $video->_check_ready() ? true : false;

		if($sendEmail)
		{
		/*
			$user = ORM::factory("user", $queue->user_id);
			$data = array(
				'first_name' => $user->first_name,
				'last_name' => $user->last_name,
				'username' => $user->username,
				'linkurl' => 'http://'.$_SERVER['SERVER_NAME'].'/video/edit/' . $video->id
			);

			$emailBody = new View("dummy/user_profile/video_email", $data) . "";
			$sndemail = new Postmark();
			$sndemail->to($user->email, $user->first_name . " " . $user->last_name)
					->subject('New Video Posted on HighlightFront!')
					->tag('video')
					->messageHtml($emailBody)
					->send();
		*/
		}

	}

	protected function sendToMM($video)
	{
/*
		$input = array(
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

		echo $newID = $out[0];
*/
	}
}
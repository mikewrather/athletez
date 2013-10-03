<?php

class Controller_VidListener extends Controller
{

	function action_index($data = null)
	{
		echo $body = file_get_contents("php://input");

		//$body = '{"output":{"channels":"2","audio_codec":"aac","file_size_in_bytes":27604072,"state":"finished","video_bitrate_in_kbps":489,"total_bitrate_in_kbps":544,"audio_sample_rate":44100,"duration_in_ms":404165,"frame_rate":29.97,"width":624,"format":"mpeg4","height":352,"md5_checksum":null,"thumbnails":[{"images":[{"dimensions":"624x352","format":"PNG","file_size_bytes":270613,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/L_0000.png"}],"label":"large_thumb"},{"images":[{"dimensions":"226x128","format":"PNG","file_size_bytes":39460,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0000.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":40934,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0001.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":36953,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0002.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":40457,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0003.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":51684,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0004.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":46644,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0005.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":46552,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0006.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":47822,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0007.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":49088,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0008.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":40497,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0009.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":49575,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0010.png"},{"dimensions":"226x128","format":"PNG","file_size_bytes":44226,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/thumbs/t_0011.png"}],"label":"thumb_series"}],"audio_bitrate_in_kbps":55,"url":"http://highlightvids.s3.amazonaws.com/post/425983/37954c1827e3eaebd2d2fcb250344e76/fq_out.mp4","id":129358876,"video_codec":"h264","label":"1"},"input":{"channels":"2","audio_codec":"mp3","state":"finished","file_size_in_bytes":73410560,"video_bitrate_in_kbps":1284,"total_bitrate_in_kbps":1444,"audio_sample_rate":44100,"duration_in_ms":404037,"frame_rate":29.97,"width":624,"format":"avi","height":352,"md5_checksum":null,"audio_bitrate_in_kbps":160,"id":57992343,"video_codec":"mpeg4"},"job":{"test":false,"state":"processing","created_at":"2013-09-08T21:45:16Z","submitted_at":"2013-09-08T21:45:16Z","updated_at":"2013-09-08T21:45:19Z","pass_through":null,"id":58014360}}';

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
				$dimensions = explode('x',$img->dimensions);
				$video->thumb_height = $dimensions[1];
				$video->thumb_width = $dimensions[0];

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
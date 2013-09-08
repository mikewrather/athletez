<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:49 PM
 */

class Model_Media_Queuedvideo extends ORM
{
	
	protected $_table_name = 'queuedvideos';
	

	protected $_belongs_to = array(
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'videos_id'
		),
		'videoservice' => array(
			'model' => 'Media_Videoservice',
			'foreign_key' => 'video_services_id'
		),
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'users_obj' => 'user',
			'video_services_obj' => 'video_services',
			'videos_obj' => 'videos',
			'sports_obj' => 'sports'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);


	public function name()
	{
		return;
	}

	public function process()
	{

		if(!$this->loaded())
		{
			return;
		}

		if(isset($this->local_file))
		{
			$cloudRaw = s3::upload($this->local_file,$this->users_id);
			unlink($this->local_file);
			$this->local_file = '';
		}
		elseif(isset($this->url))
		{
			$cloudRaw = $this->url;
		}

		$zenres = Model_Media_Video::_zencode($cloudRaw);

		$this->moviemasher_id = $zenres['randID'];
		$this->jobID = $zenres['encoding_job']->id;
		$this->complete = 1;
		$this->save();

		return $this;

	}

}
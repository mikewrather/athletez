<?php defined('SYSPATH') or die('No direct script access.');

class GetBasicsExceptions
{
	protected $settings = array();

	public function __construct($settings_array = NULL)
	{
		if(isset($settings_array)) $this->populate_from_existing($settings_array);
	}

	public function populate_from_existing($settings)
	{
		if(is_array($settings)) $this->settings = $settings;
	}

	public function exclude_column($column_name)
	{
		array_push($this->settings['exclude_columns'],array($column_name));
	}

	public function remove_excluded_column($values)
	{
		$this->settings['exclude_columns'] = array_diff($this->settings['exclude_columns'],is_array($values) ? $values : array($values));
	}

	public function getSettings()
	{
		return $this->settings;
	}
}
<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 7/6/13
 * Time: 5:17 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Enttypes extends Controller
{

	public function action_index()
	{
		/*
		$res = DB::select()
			->from('enttypes')
			->execute();

		foreach($res as $row)
		{
		//	print_r($row);
			echo "'".$row['class_name']."' => array(";
			foreach($row as $key => $val)
			{
				echo "
	'".$key."' => '".addslashes($val)."',";
			}
			echo "
),
			";
		}
		(*/

		$classes_arr = array(
			'User_Resume_Data_Vals'
		);

		$db_arr = array(
			'resume_data_vals'
		);

		ORM::_sql_exclude_deleted($classes_arr,$db_arr);

	}
	
}
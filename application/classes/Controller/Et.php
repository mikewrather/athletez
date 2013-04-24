<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/3/13
 * Time: 6:50 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Et extends Controller
{

	public function action_index()
	{
		$et = ORM::factory('Site_Enttype')->find_all();
		foreach($et as $e)
		{
			$fields = $e->fields->find_all();
			foreach($fields as $field)
			{
				echo $field->name . "(" . $field->data_type . ")";
				echo "\n\n";
			}
		}
	}

	public function action_rulegen()
	{
		$return = "";
		$et = ORM::factory('Site_Enttype')->find_all();
		foreach($et as $e)
		{
			$return .= '

	## Rules For ' . $e->class_name . ' -- '.$e->name.'
	public function rules(){

		return array
		(';


			$fields = $e->fields->where('name','!=','id')->find_all();
			foreach($fields as $field)
			{
				$return .=
'
			// ' . $field->name . ' ('. $field->data_type .')
			\''.$field->name.'\'=>array(';

				if($field->data_type !== 'timestamp')
				{
					$return .= '
				array(\'not_empty\'),';
				}

				if($field->data_type == 'int')
				{
					$return .= '
				array(\'digit\'),';
				}
				elseif($field->data_type == 'tinyint')
				{
					$return .= '
				array(\'in_array\', array(\':value\', array(0, 1))),';
				}
				elseif($field->data_type == 'date')
				{
					$return .= '
				array(\'date\'),';
				}

				$return .= '
			),
';
			}

			$return .= "	    );
	}
	// end rules for " . $e->class_name . "

	";
		}

		echo $return;
	}

}
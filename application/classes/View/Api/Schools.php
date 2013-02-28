<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/19/13
 * Time: 2:09 PM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Schools extends Api_Viewclass
{

	public function fulllist(){
		$retArr = array();
		//	$schools = $this->obj->limit(500)->find_all();where('highschools_id','IS',NULL)

		$schools = ORM::factory('Scrape_School')->where('highschools_id','IS',NULL)->limit(50)->find_all();
		echo $total_rows = $schools->count();
		$total_updated = 0;
		foreach($schools as $school)
		{
			$query = DB::select('id')->from('cities')->where('name','=',$school->city)->and_where('state_id','=',DB::select('id')->from('states')->where('name','=',$school->state))->limit(1);
			$existing_school = ORM::factory('Highschool')->where('name','LIKE',"%{$school->name}%")->and_where('city_id','LIKE',$query)->find_all();

			//		print_r($existing_school);
			/*
			$address = $school->address;
			$addArr = explode(',',$address);
			if(sizeof($addArr)==3)
			{
				$city = trim($addArr[1]);
				$school->city = $city;
				$school->save();
			}
			elseif(sizeof($addArr)==2)
			{
				$city = trim($addArr[0]);
				$school->city = $city;
				$school->save();
			}
			elseif(sizeof($addArr)>3)
			{
				$key = sizeof($addArr) - 2;
				$city = trim($addArr[$key]);

				$school->city = $city;
				$school->save();
			}
			echo $city;
			*/
			if($existing_school->count()==1) {
				$school->highschools_id = $existing_school[0]->id;
				//	echo $school->mp_school_id;
				//	print_r($school);
				$school->save();
				$total_updated++;
				//	$school->save();
			}
			elseif($existing_school->count()>1) {
				$school->highschools_id = 9999999;
				$school->save();
			}

			$retArr[$school->mp_school_id] = array(
				'matches' => $existing_school->count()
			);
		}
		echo $total_updated;
		return $retArr;
	}
}
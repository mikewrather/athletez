<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 2:05 AM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Team extends Api_Viewclass
{

	public function basics()
	{
		$retArr = array(
			'org' => $this->obj->orggbslink->org->name,
			'complevel' => $this->obj->complevel->name,
			'season' => $this->obj->season->name,
			'sport' => $this->obj->orggbslink->gbslink->sport->name,
			'mascot' => $this->obj->mascot
		);
		return $retArr;
	}

}
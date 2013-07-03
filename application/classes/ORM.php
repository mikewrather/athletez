<?php defined('SYSPATH') OR die('No direct script access.');

class ORM extends Kohana_ORM
{

	public function is_flagged()
	{
		if(!$this->loaded()) return false;

		$qry = DB::select()
			->from('flags')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID($this))
			->where('subject_id','=',$this->id)
			->where('resolved','=','0')
			->limit(1)->execute();

		if($qry->count() > 0) return true;
		return false;
	}
}

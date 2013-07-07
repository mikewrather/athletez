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

	public static function _sql_exclude_deleted($class_names,$qry)
	{
		$enttypes = array();
		$qry->and_where_open();
		foreach($class_names as $class => $table_name)
		{
			$this_ent = Ent::getMyEntTypeID($class);

			$del_subqry = DB::select(array(DB::expr("COUNT('id')"),'deleted'))->from('deleted')
				->where('subject_enttypes_id','=',$this_ent)
				->and_where('subject_id','=',DB::expr($table_name.'.id'));

			$qry->where($del_subqry,'=',0);
		}
		$qry->and_where_close();

		return $qry;
	}
}

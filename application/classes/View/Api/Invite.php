<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 12/27/13
 * Time: 3:19 PM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Invite extends Api_Viewclass
{

	/**
	 * get_basics()
	 *
	 * @retun array
	 */
	public function get_basics()
	{
		if(is_array($this->obj)) return $this->obj;
		else{
			return $this->obj->getBasics();
		}

	}


	/**
	 * post_invite() This invites a FB friend based on his/her FB ID.
	 *
	 * @retun array
	 */
	public function post_invite()
	{
		$retArr = $this->obj->getBasics();
		return $retArr;
	}
	/**
	 * post_accept()
	 *
	 * @retun array
	 */
	public function post_accept()
	{
		return $this->obj->getBasics();

	}

}
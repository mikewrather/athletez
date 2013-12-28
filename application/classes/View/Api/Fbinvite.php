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

class View_Api_Fbinvite extends Api_Viewclass
{

	/**
	 * get_basics()
	 *
	 * @retun array
	 */
	public function get_basics()
	{
		$retArr = $this->obj->getBasics();
		return $retArr;
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

}
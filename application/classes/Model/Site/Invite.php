<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 12/27/13
 * Time: 2:18 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Invite extends ORM
{
	
	protected $_table_name = 'invites';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);



	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	protected function setBasics()
	{
		$user = Auth::instance()->get_user();
		if($user->id > 0)
		{
			$this->users_id = $user->id;
			$this->sechash = hash('sha256',time()."_".$user->id);
		}

		try{
			$this->save();
			return $this;
		} catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	protected function getForUser($users_id)
	{
		if(!isset($users_id)) $users_id = Auth::instance()->get_user()->id;
		$this->where('users_id','=',$users_id);

		if(get_class($this)=='Model_Site_Invite_Facebook') $this->where('invite_fb','>',0);
		elseif(get_class($this)=='Model_Site_Invite_Email') $this->where('invite_email','<>','');

		$result = $this->find_all();
		return $result;
	}

	protected function beenSent()
	{
		$this->beensent=1;
		try{
			$this->save();
		} catch (ORM_Validation_Exception $e){
			return $e;
		}
		return $this;

	}

	public function name(){
		return false;
	}
}
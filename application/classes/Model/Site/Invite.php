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

	public $invite_to_obj;

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);
	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(

		),
		'added_function_calls' => array(
			'invite_to_obj' => 'getInviteToObj',
			'invite_to_page' => 'getInviteToPage',
			'fb_user_data' => 'deserializeUserData',
		),
		'exclude_columns' => array(

		),
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function deserializeUserData(){
		return unserialize($this->fb_user_data);
	}

	public static function invite_factory($sechash){

		if($sechash){
			$invite = DB::select()->from('invites')
				->where('sechash','=',$sechash)
				->execute();
		}


		if($invite->count() == 0) return false;

		$invite = $invite[0];

		if($invite['invite_email'] != ""){
			return ORM::factory('Site_Invite_Email',$invite['id']);
		}
		else if($invite['invite_fb'] > 0){
			return ORM::factory('Site_Invite_Facebook',$invite['id']);
		}
		else {
			return ORM::factory('Site_Invite',$invite['id']);
		}

	}

	public function find_matching_user(){
		return false;
	}

	public function getInviteToObj($retObj=false)
	{
		if($this->loaded()){
			$invite_to = unserialize($this->invite_to);
			if(is_array($invite_to)){
				$obj = Ent::eFact($invite_to['enttype_id'],$invite_to['subject_id']);
				if(is_object($obj) && is_subclass_of($obj,'ORM') && $obj->loaded()) {
					if($retObj) return $obj;
					return $obj->getBasics();
				}
				else return false;
			}
		}
	}

	public static function accept($sechash,$user){

		$invite = self::invite_factory($sechash);
		if(!$invite->loaded()) return false;

		if(get_class($user) == 'Model_User') $user = ORM::factory('User_Base',$user->id);

		$user->executeInvite(array("sechash"=>$sechash));

		return $invite;
	}

	public static function email_invite($emailList,$invite_to,$invite_type){
		$retArr = array();
		foreach($emailList as $emailAddress){
			$invite = ORM::factory('Site_Invite_Email');
			$invite->invite($emailAddress,$invite_to,$invite_type);
			$retArr[] = $invite->getBasics();
			unset($invite);
		}
		return $retArr;

	}

	public function open_invite($invite_to,$invite_type){

		$this->invite_to = empty($invite_to) ? null : serialize($invite_to);
		$this->invite_type = empty($invite_type) ? null : $invite_type;

		$this->setBasics(null);
		$this->beenSent();
		return $this;
	}

	public function getInviteToPage(){
		if($this->loaded()){
			$invite_to = unserialize($this->invite_to);
			switch ($invite_to['enttype_id']){
				case 1:
					$url = "/#!profile/".$invite_to['subject_id'];
					break;
				case 5:
					$url = "/#!team/".$invite_to['subject_id'];
					break;
				case 8:
					$url = "/#!game/".$invite_to['subject_id'];
					break;
			}
			return $url;
		}
	}

	protected function setBasics($sechash)
	{
		$user = Auth::instance()->get_user();
		if($user->id > 0)
		{
			$this->users_id = $user->id;
			$this->sechash = $sechash? $sechash : hash('sha256',microtime()."_".$user->id."_".rand(0,999999));
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

	public function getInviteData($args){
		extract($args);
		if(isset($sechash)) $res = $this->where('sechash','=',$sechash);
		elseif(isset($fbid)) $res = $this->where('invite_fb','=',$fbid);
		else return false;

		$res->find();


		if($res->loaded()) return $res;
		else return false;
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
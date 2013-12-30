<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 12/27/13
 * Time: 2:25 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Invite_Facebook extends Model_Site_Invite
{
	
	protected $_table_name = 'invites';

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(

		),
		'added_function_calls' => array(
			'fb_user_data' => 'deserializeUserData',
		),
		'exclude_columns' => array(
			'invite_email'
		),
	);

	public function deserializeUserData(){
		return unserialize($this->fb_user_data);
	}

	public function invite($fb_id,$invite_to)
	{
		$invite = ORM::factory('Site_Invite_Facebook');
		$invite->where('invite_fb','=',$fb_id);
		$invite->find();

		if($invite->loaded()){
			return $invite;
		}

		$facebook = FacebookAuth::factory();
		$user_data = $facebook->getInfoById($fb_id);

		$this->fb_user_data = serialize($user_data);
		$this->invite_to = empty($invite_to) ? null : serialize($invite_to);
		$this->invite_fb = $fb_id;
		$this->setBasics();
		$this->beenSent();
		return $this;
	}
}
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

class Model_Site_Invite_Email extends Model_Site_Invite
{

	protected $_table_name = 'invites';

	public $invite_to_obj;

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}


	public function find_matching_user($auto_login = false){
		if(!$this->loaded()) return false;
		$user = ORM::factory('User_Base')->where('email','=',$this->invite_email)->find();
		if($user->loaded()) return $user;
		return false;
	}

	public function invite($emailAddress,$invite_to,$invite_type,$sechash=false)
	{
		$this->invite_email = $emailAddress;
		$this->invite_to = empty($invite_to) ? null : serialize($invite_to);
		$this->invite_type = empty($invite_type) ? null : $invite_type;
		$this->setBasics($sechash);
		$this->sendEmail();
		return $this;
	}

	protected function sendEmail(){

		$inviteToArr = unserialize($this->invite_to);

		$inviteTo = Ent::eFact($inviteToArr['enttype_id'],$inviteToArr['subject_id']);

		$subjectline = "You've Been Invited to " . $this->invite_type . " " . $inviteTo->name();


		$user = ORM::factory('User_Base',$this->users_id);
		$reason = $user->name()." invited you to join Athletez.com";

		$backlink = "http://".$_SERVER['SERVER_NAME']."/#acceptfbinvite/".$this->sechash;


		$use_subject = $inviteTo;

		$subject_as_array = $use_subject->getBasics();

		$subheader = View::factory('email/notification/content/subjectheader')
			->bind('subject',$subject_as_array)
			->bind('sub_obj',$use_subject);

		$body = View::factory('email/invitebody')
			->bind('ent_title',$inviteTo)
			->bind('user',$user)
			->bind('invite_type',$this->invite_type);

		$action_not = $body->render();
		$sub_header = $subheader->render();
		$baseview = View::factory('email/notification/base')
			->bind('email_reason',$reason)
			->bind('pingBack',$pingBack)
			->bind('doc_title',$subjectline)
			->bind('backlink',$backlink)
			->bind('subject_header',$sub_header)
			->bind('action_notification',$action_not);

		Email::send_mail($this->invite_email,$subjectline,$baseview->render());


	}

}
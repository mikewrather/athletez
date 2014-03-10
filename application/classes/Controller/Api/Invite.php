<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 12/27/13
 * Time: 3:17 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Invite extends Controller_Api_Base
{


	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Site_Invite');
		$this->popMainModel();
	}
	public function action_index()
	{
	
	}
	
	//GET methods
	/**
	 * action_get_basics()
	 * via /api/fbinvite/basics/{invites_id}
	 *
	 */
	public function action_get_basics()
	{
		$this->payloadDesc = "";
		$arguments = array();
		// CHECK FOR PARAMETERS:
		// sechash
		// The invitations can be retrieved by secret hash or by fb id.  This is for the secret hash.
		if(trim($this->request->query('sechash')) != "")
		{
			$args['sechash'] = trim($this->request->query('sechash'));
		}

		$this->mainModel = Model_Site_Invite::invite_factory($args['sechash']);

		$retArr = $this->mainModel->getBasics();

		if($user = $this->mainModel->find_matching_user()) {
		//	print_r($user);
			Auth::instance()->force_login($user->email,false);
			$retArr["force_login"]=true;
		}
		else $retArr["force_login"]=false;

		return $retArr;

	}


	/**
	 * action_post_invite() This invites a FB friend based on his/her FB ID.
	 * via /api/fbinvite/invite/{invites_id}
	 *
	 */
	public function action_post_invite()
	{
		$this->payloadDesc = "This invites a FB friend based on his/her FB ID.";
		$arguments = array();
		// CHECK FOR PARAMETERS:
		// fbid
		// This is the FB user ID of the person being invited.

		if($this->request->post('invite_to')){
			try{
				$obj = $this->request->post('invite_to');
				if(is_object($obj)) $invite_to = (array)$obj;
			} catch(Exception $e){
				$invite_to = array();
			}
		}

		if($this->request->post('invite_type'))
		{
			$invite_type = $this->request->post('invite_type');
		}

		if($this->request->post('sechash'))
		{
			$sechash = $this->request->post('sechash');
		}

		$result = $this->mainModel->invite($fbid,$invite_to,$invite_type,$sechash);
		if(get_class($result) == get_class($this->mainModel)){
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}
	}

	/**
	 * action_post_accept()
	 * via /api/invite/accept/{invites_id}
	 *
	 */
	public function action_post_accept()
	{

		if(!($user = Auth::instance()->get_user()))
			$this->throw_permission_error(Constant::NOT_OWNER);

		$this->payloadDesc = "";
		$arguments = array();
		// CHECK FOR PARAMETERS:
		// sechash
		//

		if(trim($this->request->post('sechash')) != "")
		{
			$sechash = trim($this->request->post('sechash'));
		}

		$result = $this->mainModel->accept($sechash,$user);
		if(get_class($result) == get_class($this->mainModel) || is_subclass_of($result,get_class($this->mainModel))){
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}

	}

}
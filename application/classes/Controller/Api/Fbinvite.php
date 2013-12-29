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

class Controller_Api_Fbinvite extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Site_Invite_Facebook');
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
			$sechash = trim($this->request->query('sechash'));
		}

		// fbid
		// Retrieve invite by fbid
		if((int)trim($this->request->query('fbid')) > 0)
		{
			$fbid = (int)trim($this->request->query('fbid'));
		}

		if(isset($sechash)) $res = $this->mainModel->where('sechash','=',$sechash);
		if(isset($fbid)) $res = $this->mainModel->where('invite_fb','=',$fbid);

		$res->find();
		return $res;

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

		if((int)trim($this->request->post('fbid')) > 0)
		{
			$fbid = (int)trim($this->request->post('fbid'));
		}

		$result = $this->mainModel->invite($fbid);
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

}
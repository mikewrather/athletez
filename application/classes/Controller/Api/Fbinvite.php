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

	protected $_table_name = 'invites';

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
			$args['sechash'] = trim($this->request->query('sechash'));
		}

		// fbid
		// Retrieve invite by fbid
		if(trim($this->request->query('fbid')))
		{
			$args['fbid'] = $this->request->query('fbid');
		}

		$res = $this->mainModel->getInviteData($args);

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

		if($this->request->post('fbid'))
		{
			$fbid = $this->request->post('fbid');
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

}
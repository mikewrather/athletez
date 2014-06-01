<?php defined('SYSPATH') or die('No direct script access.');

Class Controller_Api_Base extends Kohana_Controller_Api_Base{
	/*****************************************************************
	 *                UNIVERSAL ACTION METHODS
	 ****************************************************************/
	public function action_post_addtag(){
		$this->payloadDesc = "Add a new tag";
		$arguments = array();
		// CHECK FOR PARAMETERS:
		// subject_type_id (REQUIRED)
		// The ID of the subject type / entity type of the tag's subject (this is a row from the enttypes table)

		if((int)trim($this->request->post('subject_type_id')) > 0)
		{
			$arguments["subject_type_id"] = (int)trim($this->request->post('subject_type_id'));
		}

		if((int)trim($this->request->post('subject_id')) > 0)
		{
			$arguments["subject_id"] = (int)trim($this->request->post('subject_id'));
		}

		/*	if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}else{
				$arguments["users_id"] = $this->user->id;
			}   */

		$arguments["users_id"] = $this->user->id;


		if(trim($this->request->post('bib_number')) != "")
		{
			$arguments["bib_number"] = (int)trim($this->request->post('bib_number'));
		}

		if((int)trim($this->request->post('media_id')) > 0)
		{
			$arguments["media_id"] = $media_id = (int)trim($this->request->post('media_id'));
		}
		else
		{
			$this->modelNotSetError();
			return;
		}

		if($tag_array = json_decode(trim($this->request->post('tag_array'))))
		{
			Model_Site_Tag::addFromArray($tag_array,$media_id);
			return Model_Media_Base::getTaggedObjects($media_id);
		}
		else
		{
			$result = $this->mainModel->addTag($arguments);
			if(get_class($result) == get_class($this->mainModel))
			{
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

	public function action_get_tags()
	{
		$media_id = get_class($this->mainModel) == 'Model_Media_Base' ? $this->mainModel->id : $this->mainModel->media_id;
		return Model_Media_Base::getTaggedObjects($media_id);
	}

	public function action_post_addvote(){
		$this->payloadDesc = "Add a new Vote";
		$arguments = array();

		if((int)trim($this->request->post('subject_type_id')) > 0)
		{
			$arguments["subject_type_id"] = (int)trim($this->request->post('subject_type_id'));
		}

		if((int)trim($this->request->post('subject_id')) > 0)
		{
			$arguments["subject_id"] = (int)trim($this->request->post('subject_id'));
		}
		$arguments['voter_users_id'] = $this->user->id;

		$result = $this->mainModel->addVote($arguments);
		if(get_class($result) == get_class($this->mainModel))
		{
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}
	}

	public function action_post_addcomment()
	{
		//Must logged user can do action
		if (!$this->is_logged_user()){
			return $this->throw_authentication_error();
		}

		$this->payloadDesc = "Add comments";
		$arguments = array();
		// CHECK FOR PARAMETERS:

		if ($this->mainModel->id){
			$arguments["subject_enttypes_id"] = $ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$arguments["subject_id"] = $subject_id = $this->mainModel->id;
		}

		// The text of the comment
		if(trim($this->request->post('comment')) != "")
		{
			$arguments["comment"] = trim($this->request->post('comment'));
		}

		$arguments['users_id'] = $this->user->id;

		$comment_model = ORM::factory("Site_Comment");
		$result = $comment_model->addComment($arguments);

		if(get_class($result) == get_class($comment_model))
		{
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}
	}

	public function action_post_addvideo()
	{
		//$this->populateAuthVars();
		//Must logged user can do action
		if (!$this->is_logged_user()){
			return $this->throw_authentication_error();
		}

		$valid_object_types = array(
			"Model_Sportorg_Games_Base",
			"Model_Sportorg_Match",
			"Model_User_Base",
			"Model_User_Resume_Data_Vals",
			"Model_Sportorg_Org",
			"Model_Sportorg_Team",
		);

		if ($this->mainModel->id && in_array(get_class($this->mainModel),$valid_object_types)){
			$arguments["subject_type_id"] = $ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$arguments["subject_id"] = $subject_id = $this->mainModel->id;
		}
		elseif(!in_array(get_class($this->mainModel),$valid_object_types))
		{
			$ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$ent_type = ORM::factory('Site_Enttype',$ent_types_id);

			//create error because the model isn't the correct type
			// Create Array for Error Data
			$error_array = array(
				"error" => "You can't upload a video for a ".$ent_type->name,
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
		}
		else
		{
			$this->modelNotSetError();
			return false;
		}

		// cannot send this request because it will try to instantiate video with this model's id
		$req = new Request('/api/video/add');
		$req->method($this->request->method());
		$req->post($this->request->post());
		$req->cookie($this->request->cookie());

		$resp = new Response();

		$video_controller = new Controller_Api_Video($req,$resp);
		$result = $video_controller->action_post_add();

		if(get_class($result) == 'Model_Media_Video')
		{
			$arguments['media_id'] = $result->media_id;
			$tag = ORM::factory('Site_Tag');
			$tag->addTag($arguments);

			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}


	}

	public function action_post_addimage()
	{
		//Must logged user can do action
		if (!$this->is_logged_user()){
			return $this->throw_authentication_error();
		}

		$valid_object_types = array(
			"Model_Sportorg_Games_Base",
			"Model_Sportorg_Match",
			"Model_User_Base",
			"Model_User_Resume_Data_Vals",
			"Model_Sportorg_Org",
			"Model_Sportorg_Team",
		);

		if ($this->mainModel->id && in_array(get_class($this->mainModel),$valid_object_types)){
			$arguments["subject_type_id"] = $ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$arguments["subject_id"] = $subject_id = $this->mainModel->id;
		}
		elseif(!in_array(get_class($this->mainModel),$valid_object_types))
		{
			$ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$ent_type = ORM::factory('Site_Enttype',$ent_types_id);

			//create error because the model isn't the correct type
			// Create Array for Error Data
			$error_array = array(
				"error" => "You can't upload a image for a ".$ent_type->name,
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
		}
		else
		{
			$this->modelNotSetError();
			return false;
		}

		// cannot send this request because it will try to instantiate video with this model's id
		$req = new Request('/api/image/add');
		$req->method($this->request->method());
		$req->post($this->request->post());
		$req->cookie($this->request->cookie());

		$resp = new Response();

		$image_controller = new Controller_Api_Image($req,$resp);
		$result = $image_controller->action_post_add();

		if(get_class($result) == 'Model_Media_Image')
		{
			$media_id = $result->media_id;
			$arguments['media_id'] = $media_id;
			$tag = ORM::factory('Site_Tag');
			$tag->addTag($arguments);

			if(strlen($this->request->post('tag')) > 0){ Model_Site_Tag::addFromArray(json_decode($this->request->post('tag')),$media_id); }
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
	 * action_get_followers() Get followers on a specific subject
	 *
	 */
	public function action_get_followers()
	{
		$this->payloadDesc = "Get followers on a specific subject";

		if($this->mainModel->loaded() && !Ent::ent_can_follow($this->mainModel))
		{
			$ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$ent_type = ORM::factory('Site_Enttype',$ent_types_id);

			//create error because the model isn't the correct type
			// Create Array for Error Data
			$error_array = array(
				"error" => "You can't get followers of a(n) ".$ent_type->name,
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
			return false;
		}
		elseif(!$this->mainModel->loaded())
		{
			$this->modelNotSetError();
			return false;
		}

		return $followers = Model_User_Followers::get_followers($this->mainModel);

	}

	public function action_get_commentson()
	{
		$comments = Model_Site_Comment::getCommentsOn($this->mainModel);
		//	print_r($comments);
		return $comments;
	}

	public function action_get_comments()
	{
		return $this->action_get_commentson();
	}

	/**
	 * action_post_follow() Get followers on a specific subject
	 *
	 */
	public function action_post_follow()
	{
		// This requires that the user is logged in
		//$this->populateAuthVars();
		//Must logged user can do action
		if (!$this->is_logged_user()){
			return $this->throw_authentication_error();
		}

		$this->payloadDesc = "Become a Follower";

		if($this->mainModel->loaded() && !Ent::ent_can_follow($this->mainModel))
		{
			$ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$ent_type = ORM::factory('Site_Enttype',$ent_types_id);

			//create error because the model isn't the correct type
			// Create Array for Error Data
			$error_array = array(
				"error" => "You can't follow a(n) ".$ent_type->name,
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
			return false;
		}
		elseif(!$this->mainModel->loaded())
		{
			$this->modelNotSetError();
			return false;
		}

//		echo $this->mainModel->id;
//		echo $this->myID;

		$follow = ORM::factory('User_Followers');
		$follow->addFollower($this->user,$this->mainModel,true);
		return $follow;

	}


	public function action_post_flag()
	{
		if (!$this->is_logged_user())
		{
			return $this->throw_authentication_error();
		}

		if(!$this->mainModel->loaded())
		{
			$this->modelNotSetError();
			return false;
		}

		$flag = ORM::factory('Site_Flag');
		$result = $flag->addFlag($this->mainModel);
		if(get_class($result) == get_class($this->mainModel))
		{
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}
	}

	public function action_get_media()
	{

		if(!$this->mainModel->id)
		{
			$this->modelNotSetError();
			return false;
		}

		if((int)trim($this->request->query('sports_id')) > 0)
		{
			$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
		}
		elseif((int)trim($this->request->query('sport_id')) > 0)
		{
			$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sport_id'));
		}
		else
		{
			$sports_id = null;
		}

		$limit = null;
		if((int)trim($this->request->query('limit')) > 0) $limit = trim($this->request->query('limit'));

		$offset = 0;
		if((int)trim($this->request->query('offset')) > 0) $offset = trim($this->request->query('offset'));

		$media = ORM::factory('Media_Base');
		return $media->getTaggedMedia($this->mainModel, $sports_id,$limit,$offset);
	}
}
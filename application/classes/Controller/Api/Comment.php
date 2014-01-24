<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Comment extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Comment'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################


		/**
		 * action_get_getall() Get all comments for a given subject.   This does not require a comment ID and parameters are used to specify the subject instead.
		 * via /api/comment/getall/{comments_id}
		 *
		 */
		public function action_get_getall()
		{
			$this->payloadDesc = "Get all comments for a given subject.   This does not require a comment ID and parameters are used to specify the subject instead.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// subject_type_id (REQUIRED)
			// The Subject Type ID or Ent Type ID defines what type of entity this is

			if((int)trim($this->request->query('subject_enttypes_id')) > 0)
			{
				$arguments["subject_enttypes_id"] = (int)trim($this->request->query('subject_enttypes_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_type_id",
					"param_desc" => "The Subject Type ID or Ent Type ID defines what type of entity this is"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// subject_id (REQUIRED)
			// This is the ID that will specify a given row in a table defined separately by Subject Type ID.

			if((int)trim($this->request->query('subject_id')) > 0)
			{
				$arguments["subject_id"] = (int)trim($this->request->query('subject_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_id",
					"param_desc" => "This is the ID that will specify a given row in a table defined separately by Subject Type ID."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			$subject = Ent::eFact($arguments["subject_enttypes_id"],$arguments["subject_id"]);
			//check if the user already phantom deleted
		/*	$classes_arr = array(
				'User_Base' => 'user_base'
			);
			$user_model = ORM::factory('User_Base');
			$user_model->where('id', '=', $subject->id);
			$user_model = ORM::_sql_exclude_deleted($classes_arr, $user_model);
			$result = $user_model->find()->as_array();
*/
			if(!$subject->loaded())
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Could Not Load Subject",
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;
			}
		/*	if (!$result['id']){
				$error_array = array(
					"error" => "As far as we can tell,user already deleted",
					"desc" => "As far as we can tell,user already deleted"
				);

				$this->modelNotSetError($error_array);
			}
*/
			$comments = Model_Site_Comment::getCommentsOn($subject);
			return $comments;

		}

		/**
		 * action_get_basics() Basic info on a specific comment
		 * via /api/comment/basics/{comments_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a specific comment";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;

		}
		
		/**
		 * action_get_subject() Returns the subject with which the comment is associated.
		 * via /api/comment/subject/{comments_id}
		 *
		 */
		public function action_get_subject()
		{
			$this->payloadDesc = "Returns the subject with which the comment is associated.";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$subject = $this->mainModel->getSubject();
			if (!$subject){
				$error_array = array(
					"error" => "As far as we can tell, the subject was deleted",
					"desc" => "As far as we can tell, the subject was deleted"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
			return $subject;
		}
		
		/**
		 * action_get_user() Return the user responsible for a comment
		 * via /api/comment/user/{comments_id}
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Return the user responsible for a comment";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$this->mainModel->getUser();
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * Invalid now
		 */
		public function action_post_add()
		{
			if((int)trim($this->post('subject_enttypes_id')) > 0)
			{
				$subject_enttypes_id = (int)trim($this->post('subject_enttypes_id'));
			}
			elseif((int)trim($this->post('subject_type_id')) > 0)
			{
				$subject_enttypes_id = (int)trim($this->post('subject_type_id'));
			}

			if((int)trim($this->post('subject_id')) > 0)
			{
				$subject_id = (int)trim($this->post('subject_id'));
			}

			$this->mainModel = Ent::eFact($subject_enttypes_id,$subject_id);
			if($this->mainModel->loaded()) return $this->action_post_addcomment();
            else
            {
	            //throw error
	        //    $this->modelNotSetError();
	            return false;
            }
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on a specific comment
		 * via /api/comment/basics/{comments_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on a specific comment";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Assumeownership', array('owner'=>$this->mainModel->owner()))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if(trim($this->put('comment')) != "")
			{
				$comment = trim($this->put('comment'));
			}

			$args = array(
				'id' => $this->mainModel->id,
				'comment' => $comment
			);

			$result =  $this->mainModel->addComment($args);

			//Check for success / error
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
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Comment
		 * via /api/comment/base/{comments_id}
		 *
		 */
		public function action_delete_base()
		{

			$this->payloadDesc = "Delete Comment";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->owner()))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$this->mainModel->delete_with_deps();
		}
		
	}
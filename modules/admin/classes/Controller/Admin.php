<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/20/13
 * Time: 12:01 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Admin extends AuthController
{


	public function action_index()
	{
		$this->populateAuthVars();

		if($this->is_admin)
		{
			$renderer = Kostache::factory();
			$this->response->body($renderer->render(new View_Index,'admin/index'));
		}
		else
		{
			$renderer = Kostache::factory();
			$this->response->body($renderer->render(new Admin_View_Login,'admin/login'));
		}

	}

	public function action_login()
	{


		if(HTTP_Request::POST == $this->request->method())
		{
			$remember = array_key_exists('remember',$this->request->post()) ? (bool) $this->request->post('remember') : FALSE;
			$user = Auth::instance()->login($this->request->post('username'),$this->request->post('password'),$remember);
			$userroles = array();
			if($user)
			{

				$user = Auth::instance()->get_user();
				foreach($user->roles->find_all() as $role)
				{
					$userroles[] = $role->name;
				}

				if(in_array("admin",$userroles)) $retArr = array("success"=>1);
				else $retArr = array("success"=>0);

			}
			else
			{
				$retArr = array("success"=>0);
			}
		}
		else
		{
			$retArr = array("success"=>0);
		}

		$this->response->headers('Content-Type','application/json');
		$this->response->body(json_encode($retArr));

	}

	public function action_logout()
	{
		Auth::instance()->logout();
		HTTP::redirect('/admin');
	}

	public function action_list_ents()
	{

		$renderer = Kostache::factory();
		$this->response->body($renderer->render(new Admin_View_Entlist,'admin/entlist'));

	}

	public function action_show_postparams()
	{
		$renderer = Kostache::factory();
		$this->response->body($renderer->render(new Admin_View_Postparams($this->request->query('entID'),$this->request->query('httpverb')),'admin/entpost'));
	}

	public function action_emailsent()
	{
		$emailsent = ORM::factory('Email_Sent');

		if(isset($_REQUEST['schedule_id'])) $emailsent->where('email_schedule_id','=',$_REQUEST['schedule_id']);
		if(isset($_REQUEST['college_coach_id'])) $emailsent->where('college_coaches_id','=',$_REQUEST['college_coach_id']);
		if(isset($_REQUEST['user_id']))$emailsent->where('user_id','=',$_REQUEST['user_id']);
		if(isset($_REQUEST['error'])) $emailsent->where('sendError','=',$_REQUEST['error']);
		if(isset($_REQUEST['opened'])) $emailsent->where('pingTime','IS NOT',NULL);
		$data["sent"] = $emailsent->reset(FALSE)->find_all();

		$openedorm = clone $emailsent;
		$errororm = clone $emailsent;

		$data["opened"] = $openedorm->where('pingTime','IS NOT',NULL)->find_all()->count();
		$data["errors"] = $errororm->where('sendError','>',0)->find_all()->count();

		$view = new View('sentmail',$data);
		$this->response->body($view);

	}


}
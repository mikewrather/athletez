<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/8/13
 * Time: 4:12 PM
 */

class Controller_Scrape extends Controller
{

	//protected $renderer;
	public function __construct(Request $request, Response $response)
	{
		$this->renderer = Kostache::factory();
		parent::__construct($request,$response);
	}
	public function action_index()
	{
		$vobj = new View_Scrape_Sports(array());
		$this->response->body($this->renderer->render($vobj));
	}

	public function action_getStates()
	{
		$vobj = new View_Scrape_Sports(array());
		$this->response->body($this->renderer->render($vobj));
	}

	public function action_getSports()
	{
		$vobj = new View_Scrape_Sports(array('state'=>$this->request->param('id')));
		$this->response->body($this->renderer->render($vobj,'scrape'));
	}

	public function action_getTeams()
	{
		$vobj = new View_Scrape_Sports(array('sport'=>$this->request->param('id')));
		$this->response->body($this->renderer->render($vobj,'scrape'));
	}

	public function action_getSchedules()
	{
		$this->response->headers('Content-Type','application/json');

		$baseurl = "http://www.maxpreps.com/local/team/schedule.aspx?";

		$jsonarr = array();

		$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
		$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

		$schools = ORM::factory('Scrape_Schoolteams')->where('schedule_scraped','=',0)->limit($limit)->offset($offset)->find_all();
		foreach($schools as $school)
		{
			$jsonarr[$school->id] = array(
				'name'=>$school->name,
				'url'=>$baseurl."schoolid=".$school->mp_school_id."&ssid=".$school->mp_ssid,
				'school_id'=>$school->mp_school_id,
				'ssid'=>$school->mp_ssid,
				'state'=>$school->state
			);
			$school->schedule_scraped = 1;
			$school->save();
		}
		$this->request->headers('Content-type: application/json');
		echo json_encode($jsonarr);
	}

	public function action_saveGame()
	{
		$p = $_POST;
		if(!isset($p['contestid']) || $p['contestid']==0) return;

		$sc = ORM::factory('Scrape_Schedule',$p['contestid']);
		if(!$sc->loaded())
		{
			unset($sc);
			$sc = ORM::factory('Scrape_Schedule');
			$sc->gameTime = date('Y-m-d H:i:s',strtotime($p['date']));
			$sc->loc = isset($p['loc']) ? $p['loc'] : "";
			$sc->id = $p['contestid'];
			try
			{
				$sc->save();
			}
			catch(Kohana_Exception $e)
			{
				echo $e->getMessage();
			}
		}
		else
		{
			//return;
		}

		//check for home team entry
		if(!$sc->checkForTeam($p['teamData']['school_id'],$p['teamData']['ssid']))
		{
			$sc_team = ORM::factory('Scrape_Scheduleteam');
			$sc_team->mp_school_id = $p['teamData']['school_id'];
			$sc_team->mp_ssid = $p['teamData']['ssid'];
			if(isset($p['teamData']['q1']))
			{
				$sc_team->q1 = (int)trim($p['teamData']['q1']);
				$sc_team->q2 = (int)trim($p['teamData']['q2']);
				$sc_team->q3 = (int)trim($p['teamData']['q3']);
				$sc_team->q4 = (int)trim($p['teamData']['q4']);
				$sc_team->points_scored = (int)trim($p['teamData']['points_scored']);
			}
			$sc_team->schedule_id = $sc->id;

			$sc_team->save();
		}

		//check for home team entry
		if(!$sc->checkForTeam($p['opponent']['schoolid'],$p['opponent']['ssid']))
		{
			$sc_team2 = ORM::factory('Scrape_Scheduleteam');
			$sc_team2->mp_school_id = $p['opponent']['schoolid'];
			$sc_team2->mp_ssid = $p['opponent']['ssid'];
			if(isset($p['opponent']['q1']))
			{
				$sc_team2->q1 = (int)trim($p['opponent']['q1']);
				$sc_team2->q2 = (int)trim($p['opponent']['q2']);
				$sc_team2->q3 = (int)trim($p['opponent']['q3']);
				$sc_team2->q4 = (int)trim($p['opponent']['q4']);
				$sc_team2->points_scored = (int)trim($p['opponent']['points_scored']);
			}
		//	print_r($sc_team2);
			$sc_team2->schedule_id = $sc->id;
			$sc_team2->save();
		}

	//	print_r($sc);

	}

}
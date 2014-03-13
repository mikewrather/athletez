<?php defined('SYSPATH') OR die('No direct script access.');

class Email {

	public static function registration_email($user)
	{
		$facebook_url = 'https://www.facebook.com/athletez';
		$twitter_url = 'http://twitter.com/RealAthletez';
		$body = View::factory('email/email')
			->bind('user',$user)
			->bind('twitter_url',$twitter_url)
			->bind('facebook_url',$facebook_url);
		$body = $body->render();
		$subject = "Welcome to Athletez!";
		$to = $user->email;
		self::send_mail($to,$subject,$body);

	}
	public static function send_mail($to, $subject, $body, $users_id=0,$attachment=false,$cc = "", $bcc = ""){
		$pm = new Postmark();
		$from = "weare@athletez.com";
		$from_name_alias = 'Mike From Athletez';
		$to_name_alias = null;
		$pm	->from($from, $from_name_alias)
			->subject($subject)
			->messageHtml($body);
		if (is_array($to)){
			foreach($to as $v)
			$pm->addTo($v, $to_name_alias);
		}else{
			$pm->addTo($to, $to_name_alias);
		}

		if($attachment){

		}

		try{
			$result = $pm->send();
	//		print_r($result);
			if($result){
				$sent = ORM::factory('Email_Sent');
				$sent->saveSent(array(
					'users_id' => $users_id
				));
			}
		} catch(Exception $e){
			print_r($e);
		}
	}

	public static function sendFromQueue($queueID)
	{

		$queue = ORM::factory('Email_Queue', $queueID);
		if(!$queue->loaded()) return false;

		$user = ORM::factory('User_Base', $queue->users_id);

		$pm = new Postmark();
		$from = "weare@athletez.com";
		$from_name_alias = 'Athletez Mail Room';
		$to_name_alias = null;

		if($queue->attachment != "" && $queue->attachment != null){
			$pm->addCustomAttachment('game.ics',$queue->attachment,'text/calendar');
		}

		$pm->from($from, $from_name_alias)
			->subject($queue->subject_line)
			->messageHtml($queue->message_body);

		$pm->addTo($queue->to_address, $user->name());
	//	$pm->addTo("weare@athletez.com","Athletez Mailbox");
		$pm->addBcc("weare@athletez.com","Athletez Mailbox");

		try{
			$result = $pm->send();
			if ($result)
			{
				$sent = ORM::factory('Email_Sent');
				$sent->saveSent(array(
					'users_id' => $queue->users_id,
					'queue' => $queue
				));
			}

		} catch(Exception $e){

		}

	}

	public static function generateUniqueString(){
		return hash('sha256',microtime(true).mt_rand(10000,90000));
	}

}
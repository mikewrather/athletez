<?php defined('SYSPATH') OR die('No direct script access.');

class Email {

	public static function send_mail($to, $subject, $body, $cc = "", $bcc = ""){
		$pm = new Postmark();
		$from = "donotreply@highlightfront.com";
		$from_name_alias = null;
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
		//TODO, add by jeffrey, allow to cc,bcc many receipents.
		return $pm->send();
	}

}
<?php defined('SYSPATH') OR die('No direct script access.');

class Email {

	public static function send_mail($to, $subject, $body, $cc = "", $bcc = ""){
		$pm = new Postmark();
		$from = "donotreply@highlightfront.com";
		$pm	->from($from, "Mike Wrather")
			->addTo($to, 'Mike Wrather')
			->subject($subject)
			->messageHtml($body);
		//TODO, add by jeffrey, allow to cc,bcc many receipents.
		return $pm->send();
	}

}
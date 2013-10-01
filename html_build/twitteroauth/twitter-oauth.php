<?php

try{
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch,CURLOPT_URL,"https://api.twitter.com/1/users/show.json?screen_name=kotadiaparth&include_entities=true");
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	$data = curl_exec($ch);
	curl_close($ch);
	$data = json_decode($data);
	
	print '<pre>';
	print_r($data);
} catch( Exception $e ){
	print '<pre>';
	print_r($e);
}

?>
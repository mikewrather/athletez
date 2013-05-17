<?php

class S3{

	private $AWSAccessKeyID="AKIAJYRQ2ZWDK6U72EFA",
		$AWSSecretAccessKey="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",
		$s3bucket="athletesup"
	;
	static function factory () {
		return new S3();
	}


	static function upload($localfile, $user_id=null, $fname = "media"){
		$this_s3=self::factory();
		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$localmime= finfo_file($finfo, $localfile);
		finfo_close($finfo);
		if(!$user_id){
			$user_id=rand(1,1000);
		}

		switch ($localmime){
			case "image/gif": $ext="gif"; break;
			case "image/jpeg":$ext="jpg"; break;
			case "image/pjpeg":$ext="jpg"; break;
			case "image/png": $ext="png"; break;
			case "image/tiff": $ext="tif"; break;

			case "video/mpeg": $ext="mpeg"; break;
			case "video/mp4": $ext="mp4"; break;
			case "video/x-ms-wmv": $ext="avi"; break;
			case "video/x-flv": $ext="flv"; break;
			case "video/quicktime": $ext="mov"; break;

			default : $ext="xxx";
		}

		$key="upload/".$user_id."/". uniqid()."/".$fname.".$ext";

		$mydate=gmdate(DATE_RFC1123,strtotime('+ 5 minute'));
		$my_signature=$this_s3->_s3_base64($this_s3->_s3_hasher(
			"PUT\n\n$localmime\n$mydate\nx-amz-acl:public-read\n/".$this_s3->s3bucket."/$key",
			$this_s3->AWSSecretAccessKey

		));

		$fp = fsockopen("$this_s3->s3bucket.s3.amazonaws.com", 80, $errno, $errstr);
		if (!$fp) {
			return "errno: $errno \nerrstr: $errstr\n";
		}

		fwrite($fp, "PUT /$key HTTP/1.1\r\n".
			"Host: $this_s3->s3bucket.s3.amazonaws.com\r\n" .
			"Date: $mydate\r\n" .
			"Authorization: AWS ".$this_s3->AWSAccessKeyID.":".$my_signature."\r\n".
			"Content-Type: $localmime\r\n".
			"Content-Length: ".filesize($localfile)."\r\n".
			"x-amz-acl: public-read\r\n\r\n"
		);
		$file_data= file_get_contents($localfile);

		fwrite($fp, $file_data);
		fwrite($fp, "\r\n\r\n");
		$response = "";
		$response .= fread($fp, 4096);
//    do {
//      $str= fgets($fp);
//      $response .=$str";
//      if(strlen($str)==2) $response.= "EOF\r\n";
//    } while(strlen($str)!=2)  ;
		fclose($fp);
//    echo "<pre>$response \r\n</pre>";
		return "http://".$this_s3->s3bucket.".s3.amazonaws.com/$key";
	}

	static function uploads3($localfile, $user_id=null){
		$this_s3=self::factory();
		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$localmime= finfo_file($finfo, $localfile);
		finfo_close($finfo);
		if(!$user_id){
			$user_id=rand(1,1000);
		}

		switch ($localmime){
			case "image/gif": $ext="gif"; break;
			case "image/jpeg":$ext="jpg"; break;
			case "image/pjpeg":$ext="jpg"; break;
			case "image/png": $ext="png"; break;
			case "image/tiff": $ext="tif"; break;

			case "video/mpeg": $ext="mpeg"; break;
			case "video/mp4": $ext="mp4"; break;
			case "video/x-ms-wmv": $ext="avi"; break;
			case "video/x-flv": $ext="flv"; break;
			case "video/quicktime": $ext="mov"; break;

			default : $ext="xxx";
		}

		$key="upload/".$user_id."/". uniqid()."/media.$ext";

		$mydate=gmdate(DATE_RFC1123,strtotime('+ 5 minute'));
		$my_signature=$this_s3->_s3_base64($this_s3->_s3_hasher(
			"PUT\n\n$localmime\n$mydate\nx-amz-acl:public-read\n/".$this_s3->s3bucket."/$key",
			$this_s3->AWSSecretAccessKey

		));

		$fp = fsockopen("$this_s3->s3bucket.s3.amazonaws.com", 80, $errno, $errstr);
		if (!$fp) {
			return "errno: $errno \nerrstr: $errstr\n";
		}

		fwrite($fp, "PUT /$key HTTP/1.1\r\n".
			"Host: $this_s3->s3bucket.s3.amazonaws.com\r\n" .
			"Date: $mydate\r\n" .
			"Authorization: AWS ".$this_s3->AWSAccessKeyID.":".$my_signature."\r\n".
			"Content-Type: $localmime\r\n".
			"Content-Length: ".filesize($localfile)."\r\n".
			"x-amz-acl: public-read\r\n\r\n"
		);
		$file_data= file_get_contents($localfile);

		fwrite($fp, $file_data);
		fwrite($fp, "\r\n\r\n");
		$response = "";
		$response .= fread($fp, 4096);
//    do {
//      $str= fgets($fp);
//      $response .=$str";
//      if(strlen($str)==2) $response.= "EOF\r\n";
//    } while(strlen($str)!=2)  ;
		fclose($fp);
//    echo "<pre>$response \r\n</pre>";
		return "s3://".$this_s3->s3bucket."/$key";
	}


	function delete($key){

		if(strstr($key,"http://")){
			$key=substr($key, strpos($key, "amazonaws.com")+strlen("amazonaws.com"));
		}

		$this_s3=self::factory();
		$mydate=gmdate(DATE_RFC1123,strtotime('+ 5 minute'));
		$string_to_sign="DELETE\n\n\n$mydate\n/".$this_s3->s3bucket."$key";
		$my_signature=$this_s3->_s3_base64($this_s3->_s3_hasher(
			$string_to_sign, $this_s3->AWSSecretAccessKey
		));

		$fp = fsockopen("mikewbucket.s3.amazonaws.com", 80, $errno, $errstr);
		if (!$fp) {
			return "errno: $errno \nerrstr: $errstr\n";
		}

		fwrite($fp, "DELETE $key HTTP/1.1\r\n".
			"Host: ".$this_s3->s3bucket.".s3.amazonaws.com\r\n" .
			"Date: $mydate\r\n" .
			"Authorization: AWS ".$this_s3->AWSAccessKeyID.":$my_signature\r\n"
		);
		fwrite($fp, "\r\n\r\n");
		$response = fread($fp, 4096);
		fclose($fp);
//                    echo $response;
	}

	private function _s3_base64($str)
	{
// Function from MovieMasher/lib/s3utils.php
		$ret = "";
		for($i = 0; $i < strlen($str); $i += 2)
			$ret .= chr(hexdec(substr($str, $i, 2)));
		return base64_encode($ret);
	}
	private function _s3_hasher($data, $key)
	{
// Function from MovieMasher/lib/s3utils.php
		// Algorithm adapted (stolen) from http://pear.php.net/package/Crypt_HMAC/)
		if(strlen($key) > 64)
			$key = pack("H40", sha1($key));
		if(strlen($key) < 64)
			$key = str_pad($key, 64, chr(0));
		$ipad = (substr($key, 0, 64) ^ str_repeat(chr(0x36), 64));
		$opad = (substr($key, 0, 64) ^ str_repeat(chr(0x5C), 64));
		return sha1($opad . pack("H40", sha1($ipad . $data)));
	}




}

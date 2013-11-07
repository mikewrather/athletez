<?php

foreach($users as $user){
	echo "First Name: ".$user['first_name'];
	echo "<br/>";
	echo "Last Name: ".$user['last_name'];
	echo "<br/>";
	echo "Email Address: ".$user['email'];
	echo "<br/>";
	echo 'Site URL: <a href="http://www.athletez.com/#profile/'.$user['id'].'"> http://www.athletez.com/#profile/'.$user['id'].'</a>';
	echo "<br/><br/>";
}

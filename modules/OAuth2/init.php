<?php

Route::set('oauth2', 'oauth2/<action>')
	->defaults(array(
		'directory'  => 'OAuth2',
		'controller' => 'Endpoints',
	));
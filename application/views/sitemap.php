<?php

echo '<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

echo '<url>';
echo '<loc>http://www.athletez.com/#home</loc>';
echo '</url>';

foreach($users as $user){
	echo '<url>';
		echo '<loc>http://www.athletez.com/#!profile/'.$user["id"].'</loc>';
	echo '</url>';
}

foreach($games as $game){
	echo '<url>';
	echo '<loc>http://www.athletez.com/#!game/'.$game["id"].'</loc>';
	echo '</url>';
}

foreach($teams as $team){
	echo '<url>';
	echo '<loc>http://www.athletez.com/#!team/'.$team["id"].'</loc>';
	echo '</url>';
}

echo '</urlset>';
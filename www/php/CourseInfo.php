<?php

	require "Util.php";
	
	if ( isset($_POST['cid']) ) {
		
		$cid = $_POST['cid'];
		
		$courseINFO = '../../db/course/' . $cid . '/course.json';
			
		# get class path from cid
		$curi = '';
		$course = getDB($courseINFO);
		if ($course === false) {
			# course does not exist
			exit ('Error 404-02');
		} else {
			$str = json_encode($course);
			echo $str;
		}		
	} else {
		exit ('Error 404-01');
	}

?>
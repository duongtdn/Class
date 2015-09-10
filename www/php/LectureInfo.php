<?php

	require "Util.php";
	
	// simulate delay
	//sleep(2);
	
	if ( isset($_POST['cid']) && isset($_POST['lid'])) {
		
		$cid = $_POST['cid'];
		$lid = $_POST['lid'];
		
		$lectureINFO = '../../db/course/' . $cid . '/lecture/' . $lid . '.json';
			
		# get class path from cid
		$lecture = getDB($lectureINFO);
		if ($lecture === false) {
			# lecture does not exist
			exit ('Error 404-02');
		} else {
			$str = json_encode($lecture);
			echo $str;
		}
		
	} else {
		exit ('Error 404-01');
	}

?>
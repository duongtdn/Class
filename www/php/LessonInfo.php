<?php

	require "Util.php";
	
	// simulate delay
	//sleep(2);
	
	if ( isset($_POST['cid']) && isset($_POST['lid'])) {
		
		$cid = $_POST['cid'];
		$lid = $_POST['lid'];
		
		$lessonINFO = '../../db/course/' . $cid . '/lesson/' . $lid . '.json';
			
		# get class path from cid
		$lesson = getDB($lessonINFO);
		if ($lesson === false) {
			# lesson does not exist
			exit ('Error 404-02');
		} else {
			$str = json_encode($lesson);
			echo $str;
		}
		
	} else {
		exit ('Error 404-01');
	}

?>
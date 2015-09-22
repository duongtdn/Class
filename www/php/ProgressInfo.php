<?php

	require "Util.php";

	// simulate delay
	//sleep(2);

	if ( isset($_POST['uid']) && isset($_POST['cid']) && isset($_POST['lid']) ) {

		$uid = $_POST['uid'];
		$cid = $_POST['cid'];
		$lid = $_POST['lid'];
		$cmd = $_POST['cmd'];

		$userCourse = '../../db/user/' . $uid . '/user.course.json';

		if ($cmd == 'r') {
			# get progress
			$progress = getDB($userCourse, $cid);
			if ($progress === false) {
				# Data cannot found
				exit ('Error 404-02');
			} else {
				if ( array_key_exists($lid, $progress) ) {
					$lectureProgress = $progress[$lid];
				} else {
					$lectureProgress = (object)NULL;
				}
				$str = json_encode($lectureProgress);
				echo $str;
			}
		} else if ($cmd == 'w') {
			# update progress
			if ( isset($_POST['dat']) ) {
				$dat = json_decode($_POST['dat']);
				writeDB($userCourse, $cid, $dat);
			}
		}

	} else {
		exit ('Error 404-01');
	}

?>
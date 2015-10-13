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
				$dat = $_POST['dat'];
				// writeDB($userCourse, $cid, $dat);
				$jsonF = file_get_contents($userCourse);
				$data = json_decode($jsonF,true);
				foreach ($dat as $l => $v) {
					
					$data[$cid][$l] = $v;
				}
				# update back to the server
				$newJsonStr = json_encode($data);
				file_put_contents($userCourse,$newJsonStr);
			}
		}

	} else {
		exit ('Error 404-01');
	}

?>

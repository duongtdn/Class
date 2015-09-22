
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', ['$routeParams', '$http', '$location', 'Video', function ($routeParams, $http, $location, Video) {

	var SERVER = {
		COURSE : "php/CourseInfo.php",
		LECTURE : "php/lectureInfo.php",
		LECTUREPROGRESS : "php/ProgressInfo.php"
	}


	// how to know which topic should loaded?
	var flow = {
		lecture : {},
		topic : {
			tid : 1,
			name : "topic 1"
		},
		scene : {
			id : 0
		}
	};

	var lecture;
	var current = {
		tid : 0,
		sid : 0
	};
	var progress = {};
	var ready = false;

	function loadScene (tid, sid) {

		var type = lecture.topic[tid].scene[sid].type,
			src = lecture.topic[tid].scene[sid].src;

		if (type == 'youtube' ) {
			Video.load(type, src);
		}
	}

	function newScene (tid, sid) {

		var type = lecture.topic[tid].scene[sid].type,
			src = lecture.topic[tid].scene[sid].src;

		if (type == 'youtube' ) {
			Video.new(type, src);
		}
	}

	function getLecture (callback) {
		$http({
			url : SERVER.LECTURE,
			method : 'POST',
			data : $.param({cid : $routeParams.cid, lid : $routeParams.lid}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (resp) {

			lecture = resp.data;

			// init current and progress
			current.tid = 0;
			current.sid = 0;

			if (!progress[$routeParams.lid]) {
				progress[$routeParams.lid] = {};
			}

			for (var i=0, len=lecture.topic.length; i<len; i++) {
				if (progress[$routeParams.lid][i]) {

					for (var j=0, slen=lecture.topic[i].scene.length; j<slen; j++) {
						if (progress[$routeParams.lid][i][j]) {
							current.tid = i;
							current.sid = j;
						}
					}
				} else {
					progress[$routeParams.lid][i] = {};
				}
			}

			// adjust current
			if ( (current.tid !== 0 || 	current.sid !== 0) &&
			 		 (current.tid !== lecture.topic.length-1 || current.sid !== lecture.topic[current.tid].scene.length-1) ) {
				current.sid++;
				if ( current.sid == lecture.topic[current.tid].scene.length ) {
					current.sid = 0;
					current.tid++;
				}
			}

			// crete new scene & set to ready
			newScene(current.tid, current.sid);
			ready = true;

			// success
			callback(resp.data);
		}, function (resp) {
			// error
		});
	}

	return {

		cid : function() {
			return $routeParams.cid;
		},

		lid : function() {
			return $routeParams.lid;
		},

		getCourse : function(callback) {
			$http({
				url : SERVER.COURSE,
				method : 'POST',
				data : $.param({cid : $routeParams.cid}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function (resp) {
					// success
					callback(resp.data);
			}, function (resp) {
					// error
			});
		},

		getUserProgressAndLecture : function (callback) {
			$http({
				url : SERVER.LECTUREPROGRESS,
				method : 'POST',
				data : $.param({
					uid : 'bob',							// will replace bob with authen
					cid : $routeParams.cid,
					lid : $routeParams.lid,
					cmd : 'r'
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function (resp) {
				var data = resp.data;

				if ( typeof progress[$routeParams.lid] === 'undefined' ) {
					progress[$routeParams.lid] = {};
				}

				for (tid in data) {
					if (!progress[$routeParams.lid][tid]) {
						progress[$routeParams.lid][tid] = {};
					}
					for (sid in data[tid]) {
						progress[$routeParams.lid][tid][sid] = data[tid][sid];
					}
				}

				getLecture(callback);

				// success
			}, function (resp) {
				// error
			});
		},

		topic : flow.topic,

		current : current,

		progress : progress,

		loadPlayboard : function() {
			loadScene(current.tid, current.sid);
		},

		next : function() {
			if (ready) {
				//record progress
				var tid = current.tid
						sid = current.sid;

				// mark done for the current scene
				progress[$routeParams.lid][tid][sid] = 1;

				// code to save progress to the server here
				$http({
					url : SERVER.LECTUREPROGRESS,
					method : 'POST',
					data : $.param({
						uid : 'bob',							// will replace bob with authen
						cid : $routeParams.cid,
						lid : $routeParams.lid,
						cmd : 'w',
						dat : JSON.stringify(progress)
					}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
				.then(function (resp) {
					var data = resp.data;
					console.log (data);
				}, function (resp) {
					// error
				});

				// moving to next
				current.sid ++;
				if (current.sid == lecture.topic[current.tid].scene.length) { // last scene
					current.sid = 0;
					current.tid++;
					if (current.tid == lecture.topic.length) { // last topic, proceed to next lecture
						current.tid = 0;
						var currPath = $location.path(),
							index = currPath.lastIndexOf('/'),
							rootPath = currPath.substr(0,index);
							//nextlecture = parseInt(currPath.substr(index+1),10) + 1;
							nextlecture = lecture.next;
						// need proper check for that this is the last lecture
						var nextPath;
						if (nextlecture !== '0') {
							nextPath = rootPath + '/' + nextlecture;
						} else {
							// move to end course page
							nextPath = '';
						}
						// change url to next lecture
						$location.path(nextPath);
					}
				}
				loadScene(current.tid, current.sid);
			}
		},

		back : function() {
			if (ready) {
				if (current.sid > 0) {
					current.sid--;
				} else if (current.tid > 0) {
					current.tid--;
					current.sid = lecture.topic[current.tid].scene.length-1;
				}
				loadScene(current.tid, current.sid);
			}
		}
	}

}]);

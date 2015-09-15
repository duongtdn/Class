
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', ['$routeParams', '$http', '$location', 'Video', function ($routeParams, $http, $location, Video) {

	var SERVER = {
		COURSE : "php/CourseInfo.php",
		LECTURE : "php/lectureInfo.php"
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

		getLecture : function(callback) {
			$http({
				url : SERVER.LECTURE,
				method : 'POST',
				data : $.param({cid : $routeParams.cid, lid : $routeParams.lid}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function (resp) {
				lecture = resp.data;
				// init current & progress
				current.tid = 0;
				current.sid = 0;
				progress[$routeParams.lid] = {};
				for (var i=0, len=lecture.topic.length; i<len; i++) {
					// will retrieve data stored in server instead
					progress[$routeParams.lid][i] = {};
				}
				// crete new scene & set to ready
				newScene(current.tid, current.sid);
				ready = true;
				// success
				callback(resp.data);
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

				console.log (progress);
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

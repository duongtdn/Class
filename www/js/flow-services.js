
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', ['$routeParams', '$http', '$location', 'Video', function ($routeParams, $http, $location, Video) {
	
	var SERVER = {
		COURSE : "php/CourseInfo.php",
		LESSON : "php/LessonInfo.php"
	}
	
	
	
	// how to know which topic should loaded?
	var flow = {
		lesson : {},
		topic : {
			tid : 1,
			name : "topic 1"
		},
		scene : {
			id : 0
		}
	};
	
	var lesson, tid, sid;
	var ready = false;
	
	function loadScene (tid, sid) {
		
		var type = lesson.topic[tid].scene[sid].type,
			src = lesson.topic[tid].scene[sid].src;
		
		if (type == 'youtube' ) {
			Video.load(type, src);
		}
	}
	
	function newScene (tid, sid) {
		
		var type = lesson.topic[tid].scene[sid].type,
			src = lesson.topic[tid].scene[sid].src;
		
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
		
		getLesson : function(callback) {
			$http({
				url : SERVER.LESSON,
				method : 'POST',
				data : $.param({cid : $routeParams.cid, lid : $routeParams.lid}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function (resp) {
				lesson = resp.data;
				tid = 0;
				sid = 0;
				newScene(tid, sid);
				ready = true;
				// success
				callback(resp.data);
			}, function (resp) {
				// error
			});
		},
		
		topic : flow.topic,
		
		loadPlayboard : function() {
			loadScene(tid, sid);
		},
		
		next : function() {			
			if (ready) {
				sid ++;
				if (sid == lesson.topic[tid].scene.length) { // last scene					
					sid = 0;
					tid++;
					if (tid == lesson.topic.length) { // last topic, proceed to next lesson
						tid = 0;
						var currPath = $location.path(),						
							index = currPath.lastIndexOf('/'),
							rootPath = currPath.substr(0,index);
							//nextLesson = parseInt(currPath.substr(index+1),10) + 1;
							nextLesson = lesson.next;
						// need proper check for that this is the last lesson
						var nextPath;
						if (nextLesson !== '0') {
							nextPath = rootPath + '/' + nextLesson;
						} else {
							// move to end course page
							nextPath = '';
						}
						// change url to next lesson
						$location.path(nextPath);
					}
				}
				loadScene(tid, sid);
			}
		},
		
		back : function() {
			if (ready) {
				if (sid > 0) {
					sid--;
				} else if (tid > 0) {
					tid--;
					sid = lesson.topic[tid].scene.length-1;
				}
				loadScene(tid, sid);
			}
		}
	}
	
}]);
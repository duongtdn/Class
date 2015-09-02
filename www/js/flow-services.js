
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', ['$routeParams', '$http', 'Video', function ($routeParams, $http, Video) {
	
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
	
	var lesson, tid, sid;	// sid
	
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
			tid = 0;
			sid ++;
			loadScene(tid, sid);
		},
		
		back : function() {
			//flow.topic.tid--;
		}
	}
	
}]);
var classServiceModule = angular.module('classServiceModule',['ngRoute']);

classServiceModule.factory('ClassServices',['$routeParams', '$http', function($routeParams, $http) {
	
	var SERVER = {
		COURSE : "php/CourseInfo.php",
		LESSON : "php/LessonInfo.php"
	}
		
	return {
		cid : function() {
			return $routeParams.cid;
		},
		lid : function() {
				return $routeParams.lid;
		},
		getCourseInfo : function(callback) {
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
		getLessonInfo : function(callback) {
			$http({
				url : SERVER.LESSON,
				method : 'POST',
				data : $.param({cid : $routeParams.cid, lid : $routeParams.lid}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function (resp) {
					// success
					callback(resp.data);
			}, function (resp) {
					// error
			});
		}
	}

}])
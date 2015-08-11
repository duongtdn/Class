var classServiceModule = angular.module('classServiceModule',['ngRoute']);

classServiceModule.factory('ClassServices',['$routeParams', function($routeParams) {
	
		return {
			classId : $routeParams.classId,
			lessonId : $routeParams.lessonId
		}

}])
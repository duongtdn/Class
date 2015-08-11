
// APP InterCLASS

var hvmApp = angular.module('HVM',[
	'ngRoute',
	'classServiceModule',
	'InterClass'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/schedule', {
			templateUrl : 'template/body.html',
			controller : 'ClassCtrl'
		}).
		when('/class/:classId', {
			templateUrl : 'template/course.html',
			controller : 'ClassCtrl'
		}).
		when('/class/:classId/:lessonId', {
			templateUrl : 'template/class.html',
			controller : 'ClassCtrl'
		}).
		otherwise({
			redirectTo: '/schedule'
		})
}])
.controller('TemplateCtrl',TemplateCtrl);

var ClassApp = angular.module('InterClass',[])
.controller('ClassCtrl',ClassCtrl)
.controller('LessonCtrl',LessonCtrl);


// APP InterCLASS

var hvmApp = angular.module('HVM',[
	'ngRoute',	
	'InterClass'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/schedule', {
			templateUrl : 'template/body.html',
			controller : 'ClassCtrl'
		}).
		when('/class/:cid', {
			templateUrl : 'template/course.html',
			controller : 'ClassCtrl'
		}).
		when('/class/:cid/:lid', {
			templateUrl : 'template/class.html',
			controller : 'ClassCtrl'
		}).
		otherwise({
			redirectTo: '/schedule'
		})
}])
.controller('TemplateCtrl',TemplateCtrl);

var ClassApp = angular.module('InterClass',[
	'flowModule',
	'VideoPlayerModule'
])
.controller('ClassCtrl', ClassCtrl)
.controller('LectureCtrl', LectureCtrl)
.controller('TopicCtrl', TopicCtrl);


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
	'classServiceModule',
	'flowModule',
	'VideoPlayerModule'
])
.controller('ClassCtrl', ClassCtrl)
.controller('LessonCtrl', LessonCtrl)
.controller('TopicCtrl', TopicCtrl)
.controller('FlowCtrl', FlowCtrl);

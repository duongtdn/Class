
// Function Flow controller

function FlowCtrl($scope, Flow, Video){
	
	$scope.next = Flow.next;
	$scope.back = Flow.back;
	
	$scope.newPlayer = function (conf) {
		// assign video player onFinish event, using hardcoded controller name
		// changing controller name required to modify below code
		Video.setOnFinish ('FlowCtrl', Flow.next);
		Video.new(conf);
	}

}
FlowCtrl.$inject = ['$scope', 'Flow', 'Video'];
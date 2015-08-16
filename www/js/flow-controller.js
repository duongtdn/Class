
// Function Flow controller

function FlowCtrl($scope, Flow){
	
	$scope.next = Flow.next;
	$scope.back = Flow.back;
	
	$scope.VideoFinished = function () {
		console.log ('Flow control : received msg');
		Flow.next();
	};
}
FlowCtrl.$inject = ['$scope', 'Flow'];
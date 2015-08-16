
// Function for topic controller

function TopicCtrl($scope, Flow){
	
	$scope.topic = Flow.topic;
	
}
TopicCtrl.$inject = ['$scope', 'Flow'];
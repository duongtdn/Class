
// Function for lesson controller

function ClassCtrl($scope, Flow){
	
	$scope.cid = Flow.cid();
	
	Flow.getCourse(function(data){
		$scope.course = data;		
	})
}
ClassCtrl.$inject = ['$scope', 'Flow'];
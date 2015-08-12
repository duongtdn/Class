
// Function for lesson controller

function ClassCtrl($scope, ClassServices){
	
	$scope.cid = ClassServices.cid();
	
	ClassServices.getCourseInfo(function(data){
		$scope.course = data;		
	})
}
ClassCtrl.$inject = ['$scope', 'ClassServices'];
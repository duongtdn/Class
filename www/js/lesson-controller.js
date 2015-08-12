
// Function for lesson controller

function LessonCtrl($scope, ClassServices){
	
	$scope.lid = ClassServices.lid();
	ClassServices.getLessonInfo(function(data){
		$scope.lesson = data;
	})
}
LessonCtrl.$inject = ['$scope', 'ClassServices'];
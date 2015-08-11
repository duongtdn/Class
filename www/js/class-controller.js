
// Function for lesson controller

function ClassCtrl($scope, ClassServices){
	$scope.class = {
		name    : "Verilog Beginner course",
		lessons : [
			{name : 'Lesson 1', snippet : 'The Language, Concept and Model', url : '01'},
			{name : 'Lesson 2', snippet : 'Data type and Operators', url : '02'},
			{name : 'Lesson 3', snippet : 'Procedures', url : '03'}
		]
	}
	
	//$scope.classId = $routeParams.classId;
	//$scope.lessonId = $routeParams.lessonId;
	
	$scope.classId = ClassServices.classId;
	$scope.lessonId = ClassServices.lessonId;
}
ClassCtrl.$inject = ['$scope', 'ClassServices'];
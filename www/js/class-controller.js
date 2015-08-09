
// Function for lesson controller

function ClassCtrl($scope, $routeParams){
	$scope.class = {
		name    : "Verilog Beginner course",
		lessons : [
			{name : 'Lesson 1', snippet : 'The Language, Concept and Model', url : '#/class/VERL01/01'},
			{name : 'Lesson 2', snippet : 'Data type and Operators', url : '#/class/VERL01/02'},
			{name : 'Lesson 3', snippet : 'Procedures', url : '#/class/VERL01/03'}
		]
	}
	
	$scope.classId = $routeParams.classId;
	$scope.lessonId = $routeParams.lessonId;
}
ClassCtrl.$inject = ['$scope', '$routeParams'];
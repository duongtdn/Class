
// Function for lesson controller

function LessonCtrl($scope, Flow, Video){
	
	$scope.lid = Flow.lid();

	$scope.next = Flow.next;
	$scope.back = Flow.back;
	
	Flow.getLesson(function(data){
		$scope.lesson = data;	
		//console.log (data);
	})

	$scope.youtubeReady = function() {
		Video.setOnFinish ('LessonCtrl', Flow.next);
		Video.setYoutubeApiReady(true);
		if ($scope.lesson) {
			// lesson is already loaded,
			Flow.loadPlayboard();
		}
	}
	
}
LessonCtrl.$inject = ['$scope', 'Flow', 'Video'];
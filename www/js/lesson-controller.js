
// Function for lesson controller

function LessonCtrl($scope, Flow, Video){
	
	$scope.lid = Flow.lid();

	// navigation logic
	$scope.next = Flow.next;
	$scope.back = Flow.back;
	
	var screenWidth = 1170,	// need to detect screen width
		spacing = 3;
	
	
	
	// async request for lesson data
	Flow.getLesson(function(data){
		$scope.lesson = data;
		$scope.topics = $scope.lesson.topic;
		var standardBarWidth = (screenWidth + spacing)/$scope.topics.length - spacing,
			lastBarWidth = screenWidth - (standardBarWidth + spacing) * ($scope.topics.length - 1);
		// prepare bar
		$scope.bars = [];
		for (var i=0, len=$scope.topics.length-1; i < len; i++) {			
			$scope.bars.push({
				width : standardBarWidth + 'px',
				spacing : spacing + 'px',
				complete : '100%'
			});
		}
		// for the last
		$scope.bars.push({
			width : lastBarWidth + 'px',
			spacing : '0px',
			complete : '60%'
		});
		//console.log (data);
	})

	// special treatment for youtube async api load
	$scope.youtubeReady = function() {
		Video.setOnFinish ('LessonCtrl', Flow.next);
		Video.setYoutubeApiReady(true);
		if ($scope.lesson) {
			// lesson is already loaded,
			Flow.loadPlayboard();
		}
	}
	
	// progress bar
	
	
}
LessonCtrl.$inject = ['$scope', 'Flow', 'Video'];
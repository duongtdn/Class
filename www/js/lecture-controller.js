
// Function for lecture controller

function LectureCtrl($scope, Flow, Video){
	
	$scope.lid = Flow.lid();

	// navigation logic
	$scope.next = Flow.next;
	$scope.back = Flow.back;
	
	var studyBoardEl = document.getElementById('study-board');
	
	var screenWidth = studyBoardEl.offsetWidth,	// need to detect screen width
		spacing = 3;
	
	
	
	// async request for lecture data
	Flow.getLecture(function(data){
		$scope.lecture = data;
		$scope.topics = $scope.lecture.topic;
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
		Video.setOnFinish ('LectureCtrl', Flow.next);
		Video.setYoutubeApiReady(true);
		if ($scope.lecture) {
			// lecture is already loaded,
			Flow.loadPlayboard();
		}
	}
	
	// progress bar
	
	
}
LectureCtrl.$inject = ['$scope', 'Flow', 'Video'];

// Function for lecture controller

function LectureCtrl($scope, Flow, Video){

	$scope.lid = Flow.lid();
	$scope.current = Flow.current;
	$scope.progress = Flow.progress;

	// navigation logic
	$scope.next = function() {
		Flow.next();
		// logic for display correct current bar
		var id = $scope.current.tid,
				complete = $scope.progress[$scope.lid][id];
		if (complete === '0%') {
			id--;
			complete = $scope.progress[$scope.lid][id];
		}
		$scope.UpdatecurrentBar(id, 'complete', complete);
	}

	$scope.back = Flow.back;

	var studyBoardEl = document.getElementById('study-board');

	var screenWidth = studyBoardEl.offsetWidth,	// need to detect screen width
		spacing = 3;

	$scope.UpdatecurrentBar = function (id, prop, val) {
		if ($scope.bars[id].hasOwnProperty(prop)) {
			$scope.bars[id][prop] = val;
		}
	};

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
				complete : '0%'
			});
		}
		// for the last
		$scope.bars.push({
			width : lastBarWidth + 'px',
			spacing : '0px',
			complete : '0%'
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

	// current bar


}
LectureCtrl.$inject = ['$scope', 'Flow', 'Video'];

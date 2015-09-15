
// Function for lecture controller

function LectureCtrl($scope, Flow, Video){

	$scope.lid = Flow.lid();
	$scope.current = Flow.current;
	$scope.progress = Flow.progress;

	// navigation logic
	$scope.next = function() {
		Flow.next();
		$scope.UpdateCurrentBar();
	}

	$scope.back = Flow.back;

	var studyBoardEl = document.getElementById('study-board');

	var screenWidth = studyBoardEl.offsetWidth,	// need to detect screen width
		spacing = 3;

	$scope.UpdateCurrentBar = function () {
		var progress = $scope.progress[$scope.lid];
		for (var tid=0, len=$scope.bars.length; tid<len; tid++) {
			for (var sid=0, slen=$scope.bars[tid].sceneBars.length; sid<slen; sid++) {
					var val = progress[tid][sid];
					if (val) {
						$scope.bars[tid].sceneBars[sid].complete = val;
					}
			} // end for sid
		} // end for tid
	};

	function makeSceneBars (nscene, barWidth) {
		var sceneBarWidth = Math.round(barWidth / nscene),
				lastSceneBarWidth = barWidth - (sceneBarWidth * (nscene-1));
		var sceneBars = [];
		// standard scene bars
		for (var j=0 ; j<nscene-1; j++) {
			sceneBars.push({
				width : sceneBarWidth + 'px',
				complete : 0	// will retrieve value from progress
			})
		} // end for j
		// last scene bar
		sceneBars.push({
			width : lastSceneBarWidth + 'px',
			complete : 0 // will retrieve value from progress
		});

		return sceneBars;
	}

	// async request for lecture data
	Flow.getLecture ( function (data) {
		$scope.lecture = data;
		$scope.topics = $scope.lecture.topic;
		var barWidth = Math.round((screenWidth + spacing)/$scope.topics.length) - spacing,
			lastBarWidth = screenWidth - (barWidth + spacing) * ($scope.topics.length - 1);
		// prepare topic bar
		$scope.bars = [];
		for (var i=0, len=$scope.topics.length-1; i < len; i++) {
			// prepare scene bar
			var sceneBars = makeSceneBars ($scope.topics[i].scene.length, barWidth);
			// prepare topic bar
			$scope.bars.push({
				width : barWidth + 'px',
				spacing : spacing + 'px',
				sceneBars : sceneBars
			});
		} // end for i

		// for the last
		sceneBars = makeSceneBars ($scope.topics[i].scene.length, lastBarWidth);
		$scope.bars.push({
			width : lastBarWidth + 'px',
			spacing : '0px',
			sceneBars : sceneBars
		});
		console.log ($scope.bars);
	})

	// special treatment for youtube async api load
	$scope.youtubeReady = function () {
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

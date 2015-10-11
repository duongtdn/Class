
// Function for lecture controller

function LectureCtrl($scope, Flow, Video){

	$scope.lid = Flow.lid();
	$scope.current = Flow.current;
	$scope.progress = Flow.progress;

	// navigation logic
	$scope.next = function() {
		Flow.next();
		$scope.UpdateCurrentBar();
	};

	$scope.back = Flow.back;

	$scope.goto = function(id) {
		var a = id.split("."),
		    tid = a[0],
				sid = a[1];
		Flow.goto(tid,sid);
	}

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

	Flow.getUserProgressAndLecture( function (data) {
		$scope.lecture = data;
		$scope.topics = $scope.lecture.topic;
		$scope.contents = getContent($scope.topics);
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
		$scope.UpdateCurrentBar();
	});

	// special treatment for youtube async api load
	$scope.youtubeReady = function () {
		Video.setOnFinish ('LectureCtrl',$scope.next);
		Video.setYoutubeApiReady(true);
		if ($scope.lecture) {
			// lecture is already loaded,
			Flow.loadPlayboard();
		}
	};

	function getContent(topics) {
		var contents = [];
		for (var i = 0, tlen = topics.length; i < tlen; i++) {
			contents.push({
				id : i,
				name : topics[i].name,
				type : 'topic',
				expand : true
			});
			for (var n = 0, nlen = topics[i].scene.length; n < nlen; n++) {
				contents.push({
					id : i + '.' + n,
					name : topics[i].scene[n].name,
					type : 'scene',
					show : true
				});
			} // end for n
		} // end for i
		return contents;
	}


	// disable boostrap dropdown menu click behavior for content dropup menu
	$('.lecture-content').on('click', function(event){
    var events = $._data(document, 'events') || {};
    events = events.click || [];
    for(var i = 0; i < events.length; i++) {
        if(events[i].selector) {

            //Check if the clicked element matches the event selector
            if($(event.target).is(events[i].selector)) {
                events[i].handler.call(event.target, event);
            }

            // Check if any of the clicked element parents matches the
            // delegated event selector (Emulating propagation)
            $(event.target).parents(events[i].selector).each(function(){
                events[i].handler.call(this, event);
            });
        }
    }
    event.stopPropagation(); //Always stop propagation

	});

	$scope.toggleTopicContent = function(id) {
		$scope.contents[id].expand = !$scope.contents[id].expand;
		var showingScene = $scope.contents[id].expand;
		for (var i = id+1, len = $scope.contents.length; i < len; i++) {
			if ($scope.contents[i].type === 'scene') {
				$scope.contents[i].show = showingScene;
			} else {
				return;
			}
		}
	};

	$scope.isShowingContent = function(id) {
		return $scope.contents[id].expand;
	};
	$scope.isHiddingContent = function(id) {
		return !$scope.contents[id].expand;
	};

	$scope.shouldHideThisRow = function(id) {
		return $scope.contents[id].type === 'scene' && !$scope.contents[id].show;
	};

	$scope.isCompleteTopic = function (id) {
		var tid = id,
		    progress = $scope.progress[$scope.lid];;
		for (var sid in progress[tid]) {
			if (progress[tid][sid] !== 1) {
				return false;
			}
		}
		return true;
	};

	$scope.isCompletedScene = function (id) {
		var a = id.split("."),
		    tid = a[0],
				sid = a[1],
				progress = $scope.progress[$scope.lid];
		return progress[tid][sid] === 1 && !$scope.isStudyingScene(id);
	};

	$scope.isStudyingScene = function (id) {
		var a = id.split("."),
		    tid = a[0],
				sid = a[1];
		
		return $scope.current.tid === parseInt(tid,10) &&
		       $scope.current.sid === parseInt(sid,10);
	};

}
LectureCtrl.$inject = ['$scope', 'Flow', 'Video'];

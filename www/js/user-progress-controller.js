
function UserProgressCtrl($scope, Flow) {

  $scope.lid = Flow.lid();
  $scope.progress = Flow.progress;

  // calculate total progress of this class
  $scope.progressOfClass = function() {
    
  }


  // calculate progress of a lecture
  $scope.progressOfLecture = function() {

    var current = 0,
        total = 0,
        progress = $scope.progress[$scope.lid];

    for (var t in progress) {
      for (var s in progress[t] ) {
        if (progress[t][s] === 1) {
          current++;
        }
        total++;
      }
    }
    return current / total;
  };

  // calculate progress of a topic
  $scope.progressOfTopic = function(t) {
    var current = 0,
        total = 0,
        progress = $scope.progress[$scope.lid];

    for (var s in progress[t] ) {
      if (progress[t][s] === 1) {
        current++;
      }
      total++;
    }
    return current / total;
  }

}

UserProgressCtrl.$inject = ['$scope', 'Flow'];

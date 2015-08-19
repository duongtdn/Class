
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', ['Video', function (Video) {
	
	// how to know which topic should loaded?
	// do I need to use ClassService to know topic ID
	// or let this service take action?
	var flow = {
		topic : {
			tid : 1,
			name : "topic 1"
		}
	};
	
	function loadTopic (topic) {
		flow.topic.tid = topic.tid;
		flow.topic.name = topic.name;
	}
	
	return {
		
		topic : flow.topic,
		
		next : function() {
			flow.topic.tid++;
			// trial code will be replaced latter
			Video.load('ZgSCNS851Rg');
		},
		
		back : function() {
			flow.topic.tid--;
		}
	}
	
}]);
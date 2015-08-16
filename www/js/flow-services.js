
var flowModule = angular.module('flowModule',[]);

flowModule.factory('Flow', [ function () {
	
	// how to know which topic should loaded?
	// do I need to use ClassService to know topic ID
	// or let this service take action?
	var flow = {
		topic : {
			tid : 1,
			name : "topic 1"
		}
	};
	
	return {
		
		topic : flow.topic,
		
		next : function() {
			console.log ('before : ' + flow.topic.tid);
			flow.topic.tid++;
			console.log ('after : ' + flow.topic.tid);
		},
		
		back : function() {
			console.log ('before : ' + flow.topic.tid);
			flow.topic.tid--;
			console.log ('after : ' + flow.topic.tid);
		}
	}
	
}]);
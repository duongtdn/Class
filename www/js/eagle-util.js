/* -------------------------------------------------------------------------------------------------
   PROJECT      : HVM
   DESCRIPTION  : Util provide util functions
   DEPENDENCIES : 
   AUTHOR       : DuongTDN
   USAGE

   -------------------------------------------------------------------------- --------------------*/

/* update history --------------------------------------------------------------


*/

var eUtil = {

	isFunction : function (functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	},
	
	angularApplyAction : function  (ctrl, method) {
		var selectorStr = '[ng-controller=' + ctrl + ']';
		var el = angular.element(document.querySelector(selectorStr));
		var scope = el.scope();
		if (typeof scope != 'undefined') {
			scope.$apply(function(){
				scope[method]();
				/*
				if isFunction(obj) {
					console.log ('is function');
				} else {
					console.log ('is object');				
					for (var prop in obj) {
						if (obj.hasOwnProperty(prop)) {
							alias[prop] = obj[prop];
						}
					}				
				}
				*/
			});
		} else {
			console.log("Util : Info: Failed to get scope");
		}
	}

}


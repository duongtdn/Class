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

	isString : function (stringToCheck) {
		return typeof stringToCheck == 'string' || stringToCheck instanceof String;
	},

	isFunction : function (functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	},
	
	isArray : function (arrayToCheck) {
		return arrayToCheck.constructor.toString().indexOf("Array") > -1;
	},
}

var aUtil = {
	
	angularApplyAction : function  (ctrl, method) {
		var ctrl = arguments[0],
			method = arguments[1],
			args = Array.prototype.slice.call(arguments, 2),
			scope;
		if (ctrl !== '') {
			var selectorStr = '[ng-controller=' + ctrl + ']';
			var el = angular.element(document.querySelector(selectorStr));
			scope = el.scope();
		} else {
			var $injector = angular.injector(['ng']);
			scope = $injector.get('$rootScope');
		}
		if (typeof scope != 'undefined') {
			scope.$apply( function(){
				
				if (eUtil.isString(method)) {
					scope[method].apply(this||window, args);
				} else if (eUtil.isFunction(method)) {
					method.apply(this||window, args);
				}
				/*
				else {
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


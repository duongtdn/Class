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

	isEmpty : function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
	},

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

	arrayToObject : function(ary) {
		var obj = {};
		for (var i=0, len=ary.length; i<len; i++) {
			if (ary[i].constructor === Array) {
				obj[i] = eUtil.arrayToObject(ary[i]);
			} else {
				obj[i] = ary[i];
			}// end if
		} // end for
		console.log (ary);
		console.log (obj);
		return obj;
	} // end func arrayToObject

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

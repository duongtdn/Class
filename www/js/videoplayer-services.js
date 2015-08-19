
var VideoPlayerModule = angular.module('VideoPlayerModule',[]);

VideoPlayerModule.factory('Video', ['$timeout', function ($timeout) {
	
	// private members
		
	var player;
	
	function onReady () {
		console.log ('player is ready');
	}
	
	var onFinish
	
	return {
		
		new : function(conf) {
				
			if (!player) {
				// depend on the service, setup the player
				if (conf.service == 'YT') {
					player = new YT.Player(conf.player, {
						height      : conf.height,
						width       : conf.width,
						videoId     : conf.src,
						playerVars  : conf.vars,
						events      : {
							'onReady' : onReady,
							'onStateChange' : onFinish
						}
					});
				} // end if
			} // end if !player
			
		}, // new()
		
		setOnFinish : function (ctrl, func) {
			onFinish = function(evt) {
				if (evt.data === 0) {
					// though it might not necessary, but better to separate $apply call
					// to another turn by using $timeout to avoid calling $apply inside $apply
					$timeout( aUtil.angularApplyAction(ctrl, func, evt), 0);
				}
			};
		}, // setOnFinish
		
		play : function () {
			player.playVideo();
		}, // play()
		
		stop : function () {
			player.stopVideo();
		}, // stop()
		
		load : function (src) {
			player.cueVideoById({videoId:src});
		} // top()
	
	} // return
	
}]);
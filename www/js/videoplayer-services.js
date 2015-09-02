
var VideoPlayerModule = angular.module('VideoPlayerModule',[]);

VideoPlayerModule.factory('Video', ['$timeout', function ($timeout) {
	
	// private members
		
	var player;
	
	var youtubeApiReady = false;
	
	function onReady () {
		console.log (' player is ready ');
	}
	
	var onFinish
	
	return {
		
		setYoutubeApiReady : function(val) {
			youtubeApiReady = val;
		},
		
		new : function (type,src) {
			if (type == 'youtube') {
				if (youtubeApiReady) {
					player = new YT.Player(conf.player, {
						height      : conf.height,
						width       : conf.width,
						videoId     : src,
						playerVars  : conf.vars,
						events      : {
							'onReady' : onReady,
							'onStateChange' : onFinish
						}
					});	
					console.log (' player is created ');
				}
			}
			
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
		
		load : function (type,src) {
			if (type == 'youtube') {
				if (youtubeApiReady) {
					if (!player) {
						player = new YT.Player(conf.player, {
							height      : conf.height,
							width       : conf.width,
							videoId     : src,
							playerVars  : conf.vars,
							events      : {
								'onReady' : onReady,
								'onStateChange' : onFinish
							}
						});	
						console.log (' player is created ');
					} else {
						console.log (player);
						$timeout(player.cueVideoById({videoId:src}),0);
					}
				}
			}
			
		} // load()
	
	} // return
	
}]);
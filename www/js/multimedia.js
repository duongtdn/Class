/* -------------------------------------------------------------------------------------------------
   PROJECT      : HVM
   DESCRIPTION  : wrapper video player singleton that support multiple video sources such as YouTube
   DEPENDENCIES : http://www.youtube.com/player_api
   AUTHOR       : DuongTDN
   USAGE

   -------------------------------------------------------------------------- --------------------*/

/* update history --------------------------------------------------------------


*/

// Declare Class type
var VideoPlayer = {};

// New obj instance from the class
(function(){

    VideoPlayer = (function() {
		
		// private members
		
		var player;
		
		function onReady () {
			console.log ('player is ready');
		}
		
		function onFinish (evt) {
			if (evt.data === 0) {
				conf.onFinish();
			}
		}
		
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
				
			},
			
			play : function () {
				player.playVideo();
			},
			
			stop : function () {
				player.stopVideo();
			},
			
			load : function (src) {
				player.cueVideoById({videoId:src});
			}
			
		}
		
	})();

})();


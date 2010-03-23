/**
 * @name imageViewer
 */
(function() {
	if( !imageViewer ) {
		var imageViewer = window.imageViewer = { };
	}
})();

/**
 * @name define variables
 */
(function() {
	daum.extend(imageViewer, { member : {} });
	daum.extend(imageViewer.member, {
		currentPage : 1,		
		canvas : {
			id : 'imageCanvas',
			el : null
		},
		data : {
			
		}
	});
})();

/**
 * @name Initialize
 * @description Initialize Class
 */
(function() {
	daum.extend(imageViewer, {
		init : function() {
			console.log('init');			
		}
	});
})();

/**
 * @name Action
 * @description Action Class
 */
(function() {
	daum.extend(imageViewer, { action : {} });
	daum.extend(imageViewer.Action, {		
		goNext : function() {
			console.log('goNext');
		},
		goPrev : function() {
			console.log('goPrev');
		},
		draw : function() {
			console.log('draw');
		}
	});
})();
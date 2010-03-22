/**
 * @
 */
(function() {	
	if( !imageViewer ) {
		var imageViewer = window.imageViewer = {};
	}
})();

/**
 * @name Action
 * @description Action Class
 */
(function() {	
	daum.extend(imageViewer, { Action : {} });
	daum.extend(imageViewer.Action, {		
		goNext : function() {
			alert('goNext');
		},
		goPrev : function() {
			alert('goPrev');
		}
	});
})();

var viewer = imageViewer;
viewer.Action.goNext();

(function() {
	
})();
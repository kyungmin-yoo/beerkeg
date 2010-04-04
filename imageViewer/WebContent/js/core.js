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
	var _DOM = function() {		
		var CONTAINER_ID = "imageViewer";
		var PHOTOCANVAS_CLASSNAME = "photoCanvas";
		var BTNPREV_CLASSNAME = "btnPrev";
		var BTNNEXT_CLASSNAME = "btnNext";
		var _init = function() {
			if ( !!daum.$$("#" + container.id + " ." + this.className)[0] ) {
				this.object = daum.$$("#" + container.id + " ." + this.className)[0];
				return true;
			} else {
				this.className = "";
				return false;
			}
		};
		var container = {
			id : CONTAINER_ID,
			object : null,
			init : function() {				
				if ( !!daum.$(this.id) ) {
					this.object = daum.$(this.id);
					return true;
				}
				return false;
			}
		};
		var canvas = {
			className : PHOTOCANVAS_CLASSNAME,
			object : null,
			init : _init
		};
		var prevBtn = {
			className : BTNPREV_CLASSNAME,
			object : null,
			init : _init
		};
		var nextBtn = {
			className : BTNNEXT_CLASSNAME,
			object : null,
			init : _init
		};
		var thumbnail = {
			className : "",
			object : null,
			init : _init
		};
		var method = {
			setContainer : function(id) {
				container.id = id;				
				return container.init();
			},
			getContainer : function() {				
				return container;
			},
			getCanvas : function() {
				return canvas;
			},
			setCanvas : function(className) {
				canvas.className = className;				
				return canvas.init();
			},
			getPrevBtn : function() {
				return prevBtn;
			},
			setPrevBtn : function(className) {
				prevBtn.className = className;				
				return prevBtn.init();
			},
			getNextBtn : function() {
				return nextBtn;
			},
			setNextBtn : function(className) {
				nextBtn.className = className;				
				return nextBtn.init();
			},			
			getThumbnail : function() {
				return thumbnail;
			},
			setThumbnail : function(arr) {
				thumbnail = arr;
			},
			init : function(id) {
				container.init(id);
				canvas.init();
				prevBtn.init();
				nextBtn.init();				
			}
		};
		return method;
	}();
	daum.extend(imageViewer, { DOM : _DOM });
})();

/**
 * @name pagination
 */
(function() {
	var _pagination = function() {
		var _currentPage = 1;
		var method = {
			info : function() {
				console.log("_pagination.info");
			},
			getCurrentPage : function() {
				return _currentPage;
			},
			setCurrentPage : function(v) {
				_currentPage = v;
			}
		};
		return method;
	}();
	daum.extend(imageViewer, { pagination : _pagination } );
})();


/**
 * @name Canvas
 * @description Canvas Class
 */
(function() {
	var _canvas = function() {
		var currentPhoto = 1;		
		var method = {
			clickPrev : function() {
				console.log("clickPrev");
			},
			clickNext : function() {
				console.log("clickNext");
			},
			draw : function() {
				console.log('draw');
				console.log($super.DOM.getContainer());
			},
			init : function() {
				this.draw();
			}
		};
		return method;
	}();
	daum.extend(imageViewer, { canvas : _canvas });
})();

/**
 * @name DTO
 */
(function() {
	var _DTO = function() {
		var thumbs = null;
		var currentPhotoIndex = null;		
		var method = {			
			setThumbs : function(_thumbs) {
				if( _thumbs.length > 0 ) {
					thumbs = _thumbs;
					return true;
				} else {
					return false;
				}
			},
			getThumbs : function() {
				return thumbs;
			},
			setCurrentPhoto : function(index) {
				var _idx = index || 0;
				if( _idx.isNumber ) {
					currentPhotoIndex = _idx;
					return true;
				}					
				return false;
			},
			getCurrentPhoto : function() {				
				return this.getPhoto(currentPhotoIndex);			
			},
			getPhoto : function(index) {
				return thumbs[index];
			},
			init : function() {
				this.setCurrentPhoto();
			}
		};
		return method;
	}();
	daum.extend(imageViewer, { DTO : _DTO });
})();


/**
 * @name Initialize
 * @description Initialize Class
 */
(function() {
	daum.extend(imageViewer, {
		init : function(id) {
			this.DOM.init(id);
			this.DTO.init();
			this.canvas.init();
		},
		$super : this
	});
})();
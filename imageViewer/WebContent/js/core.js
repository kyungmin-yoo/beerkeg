(function() {
/*!
 * @overview Image Viewer Module, v0.1
 * Copyright (c) 2010 Contents Front-end Technology Team, Daum Communications.
 * 
 * $Version : .1 $
 * $Date : 2010-04-16 $
 * $Revision : 1 $
 * $Build : 1 $
 * 
 * Licensed under Daum Common License : http://dna.daumcorp.com/forge/docs/daum-license-1.0.txt
 */

// End of Headers

// Map 
if( !window.imageViewer ) {
	window.imageViewer = { };
}	

var _imageViewer = window.imageViewer;

/**
 * @name Initialize
 * @description Initialize Class
 */
(function() {
	var _Service = window.imageViewer.Service = function() {		
		var instanceList = [];
		var currentInstance = null;
		var method = {
			init : function() {
				// System 분석등...
				console.log('init');
			},
			add : function(data, canvasEl, prevBtnEl, nextBtnEl) {
				var instance = new _imageViewer.Instance(data, canvasEl, prevBtnEl, nextBtnEl);
				instanceList.push(instance);
				return instance;
			},
			getInstanceList : function() {
				return instanceList;
			},			
			setCurrnetInstance: function( inst ){
				curentInstance = inst;
			},
			getCurrnetInstance: function(){
				return curentInstance;
			}
		};
		return method;
	}();
})();

/**
 * @name Instance
 */
(function() {
	var _Instance = function(data, canvasEl, prevBtnEl, nextBtnEl) {
		this.idx = null;
		this.data = data;
		this.canvas = canvasEl;
		this.prevBtn = prevBtnEl;
		this.nextBtn = nextBtnEl;
		this.currentImageIndex = 0;		
		this.canvasImageSize = null; /* Canvas 에 출력 되는 이미지를 이미지팜에서 구운 이미지(고정크기)를 사용할꺼면 size 를 넣어주면 된다. */
		this.initialize();
	};
	_Instance.prototype = {
		initialize : function() {
			
		},
		draw : function() {
			this.canvas.innerHTML = '<img src="' + this.getCanvasImage() + '">'; 
		},
		drawThumbs : function() {
			var template = '<a href="#{link}"><img src="#{image}"></a>';
		},
		getThumbs : function() {			
			return this.data.thumbs;
		},
		getCurrentImage : function() {
			return this.getThumbs()[this.currentImageIndex].src;
		},
		getCanvasImage : function() {
			if( !!this.canvasImageSize ) {
				return this.getCurrentImage().replace(/\/[A-Z]{1}?(\d+)x(\d+)\//, '/'+this.canvasImageSize+'/');
			} else {
				return this.getCurrentImage().replace(/\/[A-Z]{1}?(\d+)x(\d+)\//, '/image/');
			}
		},
		setCanvasImageSize : function(size) {
			this.usingFixedCanvasImage = size;
		}
	};
	daum.extend(window.imageViewer, { Instance : _Instance } );
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
			},
			init : function() {
				this.draw();
			}
		};
		return method;
	}();
	daum.extend(_imageViewer, { canvas : _canvas });
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
	daum.extend(_imageViewer, { DTO : _DTO });
})();


/**
 * @name define variables
 */
(function() {
	var CONTAINER_ID = "imageViewer";
	var PHOTOCANVAS_CLASSNAME = "photoCanvas";
	var BTNPREV_CLASSNAME = "btnPrev";
	var BTNNEXT_CLASSNAME = "btnNext";

	var _DOM = function() {
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
			init : function(id) {
				this.id = id || CONTAINER_ID;
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
				return container.init(id);
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
	daum.extend(_imageViewer, { DOM : _DOM });
})();

})();


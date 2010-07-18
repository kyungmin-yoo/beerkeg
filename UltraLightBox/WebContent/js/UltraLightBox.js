(function() {
var UltraLightBox = window.ULB = function() {
	var wrapId = "ULBWRap";
	var wrap = null;
	var layer = null;
	var padding = 50;
	var method = {
		open : function(image) {
			method.createWrap();
			method.printDimedLayer();
			method.open = function( image ) {
				var original = daum.$(image) || image;
				var coords = daum.getCoords(original);
				var image = daum.createElement("<img src=\""+original.src+"\">");
				image.id = "ULBPhoto";
				daum.setCssText(image,
						"position:absolute"
						+ ";left:" + coords.left + "px;"
						+ ";top:" + coords.top + "px;");
				daum.setOpacity( image, 0 );
				daum.addEvent( image, "load", method.expend.bind( this, original, image ) );
				wrap.appendChild( image );
			};
			method.open( image );
		},
		destory : function( image ) {
			image.parentNode.removeChild(image);
			daum.setStyle( layer, "display:none" );
		},
		expend : function( original, image ) {
			var targetStyle = method.getSize( image );
			var _image = image.cloneNode( true );
			method.destory( image );
			daum.setStyle( _image, {
				"width" : daum.getStyle(original, "width")
				,"height" : daum.getStyle(original, "height")
				,"-moz-border-radius" : "10px"
				,"-webkit-border-radius" : "10px"
				,"backgroundColor" : "#fff"
				,"border" : "1px solid #000"
				,"padding" : "10px"
				,"zIndex" : 100000
			});
			daum.addEvent( _image, "click", method.destory.bind( this, _image ) );
			daum.$$("body")[0].appendChild( _image );
			daum.setStyle( layer, "display:block" );
			daum.Fx.animate( _image.id, targetStyle, {duration:0.5} );
		},
		createWrap : function() {
			if( !daum.$(wrapId) ) {
				wrap = daum.createElement("<div id=\"ULBWRap\"></div>");
				daum.setCssText(wrap, "position:absolute;overflow:hidden;left:0;top:0;");
				document.body.appendChild( wrap );				
			}
		},
		getSize : function( image ) {
			var targetStyle = {
				"width":daum.getStyle( image, "width" )
				,"height":daum.getStyle( image, "height" )
				,"left":"0px"
				,"top":"0px"
				,"opacity" : 1
			};
			var _w = targetStyle.width;
			var _h = targetStyle.height;
			var wSize = daum.Browser.getWindowSize();
				
			if( parseInt( targetStyle.width, 10 ) > wSize.width ) {
				_w = wSize.width - ( padding * 2 );
				_h = ( parseInt( targetStyle.height, 10) * _w ) / parseInt( targetStyle.width, 10 );
			}
			if( parseInt( _h, 10 ) > wSize.height ) {
				_h = wSize.height - ( padding * 2 );
				_w = ( parseInt( targetStyle.width, 10) * _h ) / parseInt( targetStyle.height, 10 );
			}
			
			targetStyle.width = daum.Number.px( _w );
			targetStyle.height = daum.Number.px( _h );
			targetStyle.left = daum.Number.px( wSize.width/2 - parseInt( targetStyle.width, 10 )/2 );
			targetStyle.top = daum.Number.px( wSize.height/2 - parseInt( targetStyle.height, 10 )/2 + parseInt( daum.Browser.getScrollOffsets().top, 10 ) ) ;
			
			return targetStyle;
		},
		printDimedLayer : function() {
			var UIModalB_height = 0;
			// deemed layer size setting
			if (window.innerHeight && window.scrollMaxY) {
				UIModalB_height = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				UIModalB_height = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				UIModalB_height = document.body.offsetHeight;
			}
			console.log( UIModalB_height );
			var s=[];
			s.push('<iframe frameborder="0" width="100%" height="'+UIModalB_height+'" style="z-index:99997;position:absolute;left:0;top:0;" name="modalDummyFrame" id="modalDummyFrame"></iframe>');
			s.push('<div id="modalDimed" style="z-index:99998;width:100%;height:'+UIModalB_height+'px;position:absolute;left:0;top:0;display:block;background-color:#000;"></div>');
			s.push('<div id="modalContent" style="z-index:99999;position:absolute;left:0;top:0;display:block;background-color:#fff;"></div>');
			layer = daum.createElement("<div>"+s.join('')+"</div>");
			layer.id = "modalWrap";
			daum.setStyle( layer, "display:none" ); 
			document.getElementsByTagName('body')[0].appendChild( layer );
			daum.setOpacity( daum.$("modalDimed"), 0.7 );
			daum.setOpacity( daum.$("modalDummyFrame"), 0 );
		}
	};
	return method; 
}();
})();
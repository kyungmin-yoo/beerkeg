daum.Event.addEvent(window, 'load', function() {
	module("DOM");	
	test("setContainer/getContainer", function() {
		ok(imageViewer.DOM.setContainer("imageViewer"), "container setting ok");
		equal(imageViewer.DOM.getContainer().id, "imageViewer");
	});
	
	test("setCanvas/getCanvas", function() {
		ok(imageViewer.DOM.setCanvas("photoCanvas"), "photoCanvas setting ok");
		equal(imageViewer.DOM.getCanvas().className, "photoCanvas");
		
		equal(imageViewer.DOM.setCanvas("photoCanvas2"), false, "photoCanvas setting failed");
		equal(imageViewer.DOM.getCanvas().className, "");
	});

	test("setPrevBtn/getPrevBtn", function() {
		ok(imageViewer.DOM.setPrevBtn("btnPrev"), "btnPrev setting ok");
		equal(imageViewer.DOM.getPrevBtn().className, "btnPrev");
	});
	
	test("getNextBtn/getNextBtn", function() {
		ok(imageViewer.DOM.setNextBtn("btnNext"), "btnNext setting ok");
		equal(imageViewer.DOM.getNextBtn().className, "btnNext");
	});
});
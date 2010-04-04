daum.Event.addEvent(window, 'load', function() {
	module("DTO");	
	test("setThumbs/getThumbs", function() {
		var thumbs1 = [];
		equal(imageViewer.DTO.setThumbs(thumbs1), false ,"thumbs.length 는 0이면 안된다.");
		equal(imageViewer.DTO.setThumbs(data.thumbs), true, "");
		same(imageViewer.DTO.getThumbs(), data.thumbs, "");		
		equal(imageViewer.DTO.getThumbs().length, data.thumbs.length, "");		
	});
	
	test("setCurrentPhoto/getCurrentPhoto/getPhoto", function() {		
		equal(imageViewer.DTO.setCurrentPhoto(), true, "no parameter should return true");
		equal(imageViewer.DTO.setCurrentPhoto(1), true, "1 should return true");
		equal(imageViewer.DTO.setCurrentPhoto("abc"), false ,"string return false");
		equal(imageViewer.DTO.setCurrentPhoto(), true, "no parameter should return true");
		equal(imageViewer.DTO.getCurrentPhoto().src, "http://cfile189.uf.daum.net/S68x57/13796A10324D57A5011A1D", "default");
		equal(imageViewer.DTO.getPhoto(1).src, "http://cfile189.uf.daum.net/S68x57/135F0B024AF86DD53239B8", "default");
	});
	
});
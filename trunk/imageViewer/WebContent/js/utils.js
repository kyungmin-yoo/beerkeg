(function() {
/**
 * 부모 클래스를 자식클래스에게 상속시킨다. 
 * 자식 생성자에 Parent.call(this, param1, param2, ..., paramN)을 호출하고,
 * 클래스의 외부 스코프에서 inherit(Parent, Child)를 선언해줘야한다.
 * @name tom.Util.inherit
 * @function
 * @param class parent
 * @param class child
 * @return class child
 */
var inherit = function(p, c){
	try {
		var f = function() { };
		f.prototype = p.prototype;
		daum.extend(c.prototype, new f(), false);
		c.uber = p.prototype;
		c.prototype.constructor = c;
		return c;
	} catch(e) { return false; }
};

})();
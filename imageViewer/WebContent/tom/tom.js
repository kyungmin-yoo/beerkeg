/*!
 * @overview Tomseki Javascript Widget, v1.0
 * Copyright (c) 2010 Contents Front-end Technology Team, Daum Communications.
 * 
 * $Version : 0.1 $
 * $Date : 2010-02-10 $
 * $Revision : 1 $
 * $Build : 1 $
 * 
 * Licensed under Daum Common License : http://dna.daumcorp.com/forge/docs/daum-license-1.0.txt
 */

// End of Headers

(function(){
if(!window.tom){
	/**
	 * @name tom
	 * @namespace Tomseki Javascript Widget의 namespace
	 * <p>보고 계신 이 문서는 Tomseki의 API문서입니다.
	 * <br />여기 기술된 내용들은 소스코드로부터 자동으로 추출되어 생성된 것입니다.
	 * 그래서 많은 내용이 생략되어 있습니다.
	 * <br /><a href="http://#" 
	 * target="_blank" style="font-weight:bold;">Tomseki에 관한 더 자세한 내용은 
	 * #를 참고하세요.</a></p>
	 * <p>이 문서의 최신 버전은 <a href="#" 
	 * target="_blank">#</a>에 있습니다.</p>
	 */
	/** @ignore */
	window.tom = {};
}

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

/**
 * DOM엘리먼트의 직속 자식노드 중에서 해당 className을 갖는 자식노드의 배열을 리턴한다.
 * @name tom.Util.getDirectElementsByClassName
 * @function
 * @param DOMElement element
 * @param String className
 * @return Array<daum.Element>
 */
var getDirectElementsByClassName = function(element, className){
	return getElementsByComparison(element, className, 
		function(a, b){
			return daum.Element.hasClassName(a, b);
		}
	);
};

/**
 * DOM엘리먼트의 직속 자식노드 중에서 해당 tagName을 갖는 자식노드의 배열을 리턴한다.
 * @name tom.Util.getDirectElementsByTagName
 * @function
 * @param DOMElement element
 * @param String tagName
 * @return Array<daum.Element>
 */
var getDirectElementsByTagName = function(element, tagName){
	return getElementsByComparison(element, tagName, 
		function(a, b){
			return a.tagName.toLowerCase() == b.toLowerCase();
		}
	);
};

var getElementsByComparison = function(element, str, func){
	var i = daum.$(element).firstChild, a = [];
	try{
		do {
			if (i.nodeType === 1 && func(i, str)){
				
				a.push(daum.$E(i));
			}
		} while(i = i.nextSibling);
	}catch(e){}
	return a;
};

/**
 * DOM엘리먼트의 부모노드 중에서 해당 tagName을 갖는 부모노드를 리턴한다.
 * @name tom.Util.getParentNodeByTagName
 * @function
 * @param DOMElement element
 * @param String tagName
 * @return DOMElement
 */
var getParentNodeByTagName = function(element, tagName){
	var el = element;
	tagName = tagName.toLowerCase();
	while(el != document.body){
		if(el.tagName.toLowerCase() == tagName){
			return el;
		}
		el = el.parentNode;
	}
	return false;
};

/**
 * size 이하의 원소를 갖는 큐 자료구조를 생성한다.
 * @constructor
 * @name tom.Util.TomQueue
 * @class
 * @param unsigned int size
 */
var TomQueue = function(size){
	this.q = daum.$A([]);
	this.s = size - 1 || Number.MAX_VALUE - 1;
	this.top = -1;
};
TomQueue.prototype = {
	/**
	 * object를 큐에 넣는다.
	 * 만약 큐가 가득차면 가장 먼저 넣은 object를 리턴하고
	 * 그렇지 않으면 null을 리턴한다.
	 * @name tom.Util.TomQueue.push
	 * @function
	 * @param Object object
	 * @return Object
	 */
	push : function(object){
		var o = null;
		if(this.top >= this.s){
			o = this.pop();
		} 
		this.top++;
		this.q[this.top] = object;
		return o;
	},
	/**
	 * 가장 먼저 넣은 object를 리턴한다.
	 * @name tom.Util.TomQueue.pop
	 * @function
	 * @return Object
	 */
	pop : function(){
		var o = this.q[0];
		this.q[0] = null;
		this.q = this.q.compact();
		this.top--;
		return o;
	},
	/**
	 * 큐에서 object에 해당하는 원소를 삭제한다.
	 * @name tom.Util.TomQueue.remove
	 * @function
	 * @return Object
	 */
	remove : function(object){
		var found = false;
		for(var i = this.q.length - 1; i >= 0; i--){
			if(this.q[i] == object){
				found = this.q[i];
				this.q[i] = null;
				break;
			}
		}
		if(found){
			this.q = this.q.compact();
			this.top--;
		}
		return found;
	},
	/**
	 * 큐가 가득 차있는 지 여부를 리턴한다.
	 * @name tom.Util.TomQueue.isFull
	 * @function
	 * @return Boolean
	 */
	isFull : function(){
		return this.top >= this.s;
	},
	/**
	 * 큐를 배열 형태로 리턴한다.
	 * @name tom.Util.TomQueue.toArray
	 * @function
	 * @return daum.Array
	 */
	toArray : function(){
		return this.q;
	}
};


var ParamBuilder = {
	url : '',
	prefix : '?',
	postfix : '&'
};
ParamBuilder.addParameter = function(paramName, paramValue){
	ParamBuilder.count = 0;
	ParamBuilder.parameters = [];
	ParamBuilder.addParameter = function(paramName, paramValue){
		ParamBuilder.parameters[ParamBuilder.count] = { name : paramName, value : paramValue };
		ParamBuilder.count ++;
	};
	ParamBuilder.addParameter(paramName, paramValue);
};
ParamBuilder.getFullParameter = function(){
	var res = '';
	var param = ParamBuilder.parameters[0];
	res += param.name + '=' + param.value;
	for(var i = 1;i < ParamBuilder.count; i++){
		param = ParamBuilder.parameters[i];
		res += ParamBuilder.postfix + param.name + '=' + param.value;
	}
	return res;
};
ParamBuilder.getFullUrl = function(){
	var res = ParamBuilder.url;
	if(ParamBuilder.count > 0){
		res += ParamBuilder.prefix;
		res += ParamBuilder.getFullParameter();
	}
	ParamBuilder.url = '';
	ParamBuilder.count = 0;
	ParamBuilder.parameters = [];
	return res;
};
ParamBuilder.clearParam = function() {
	var temp = ParamBuilder.parameters;
	ParamBuilder.count = 0;
	ParamBuilder.parameters = [];
	return temp;
};



/**
 * 리스트아이템 DOMElement를 type에 해당하는 컨트롤러 클래스로 변환한다.
 * @name tom.Util.ListItemAdapter
 * @function
 * @param Array<DOMElement> items
 * @param String type
 * @return Array<Object>
 */
var ListItemAdapter = function(items, type){
	var convertToRadio = function(items){
		var radioItems;
		if(items.isArray){
			radioItems = daum.$A([]);
			for(var i = items.size() - 1; i >= 0; i--){
				var item = items[i];
				var radioItem = new RadioItemController(item);
				radioItems[radioItem.key] = radioItem;
			}
		} else {
			radioItems = new RadioItemController(items);
		}
		return radioItems;
	};
	
	var convertToCheckBox = function(items){
		var checkBoxItems;
		if(items.isArray){
			checkBoxItems = daum.$A([]);
			for(var i = items.size() - 1; i >= 0; i--){
				var item = items[i];
				var checkBoxItem = new CheckBoxItemController(item);
				checkBoxItems[checkBoxItem.key] = checkBoxItem;
			}
	} else {
			checkBoxItems = new CheckBoxItemController(items);
		}
		return checkBoxItems;
	};
	
	ListItemAdapter = function(items, type){
		if(items){
			var convertedItems = [];
			switch(type){
				case 'radio' : {
					convertedItems = convertToRadio(items);
					break;
				}
				case 'checkBox' : {
					convertedItems = convertToCheckBox(items);
					break;
				}
				default :
				break;
			}
			return convertedItems;
		} else {
			return false;
		}
	};
	
	return ListItemAdapter(items, type);
};


/**
 * DOMElement를 조작하는 인터페이스다.
 * @constructor
 * @name tom.Util.DOMElementInterface
 * @interface
 * @param DOMElement element
 */
var DOMElementInterface = function(element){
	this.container = daum.$E(element);
};
DOMElementInterface.prototype = {
	/**
	 * DOMElement를 메모리로부터 해제한다.
	 * @name tom.Util.DOMElementInterface.destroy
	 * @function
	 */
	destroy : function(){
		this.container.destroy();
	},
	/**
	 * override
	 * DOMElement를 리턴한다.
	 * @name tom.Util.DOMElementInterface.toObject
	 * @function
	 * @return DOMElement
	 */
	toObject : function(){
		return this.container;
	}
};


/**
 * DOMElementInterface를 상속받은 체크가 가능한 리스트 형태의 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.CheckableItemController
 * @class
 * @param DOMElement element
 */
var CheckableItemController = function(element){
	DOMElementInterface.call(this, element);
	try{
		this.checkableItem = getDirectElementsByTagName(this.container, 'input')[0];
		this.label = getDirectElementsByTagName(this.container, 'label')[0];
	} catch(e){
		console.log(e);
		return null;
	}
	this.label.setAttribute('for', '');
	this.name = this.checkableItem.name;
	this.id = this.key = this.checkableItem.id;
	this.value = this.checkableItem.value;
};
CheckableItemController.prototype = {
	/**
	 * 체크 여부를 리턴한다.
	 * @name tom.Util.CheckableItemController.isChecked
	 * @function
	 * @return Boolean
	 */
	isChecked : function(){
		return this.checkableItem.checked || false;
	},
	/**
	 * 체크한다.
	 * @name tom.Util.CheckableItemController.check
	 * @function
	 */
	check : function(){
		this.checkableItem.checked = true;
		this.container.addClassName('on');
	},
	/**
	 * 체크를 푼다.
	 * @name tom.Util.CheckableItemController.uncheck
	 * @function
	 */
	uncheck : function(){
		this.checkableItem.checked = false;
		this.container.removeClassName('on');
	},
	/**
	 * override
	 * 체크 가능한 엘리먼트의 아이디를 리턴한다.
	 * @name tom.Util.CheckableItemController.toString
	 * @function
	 */
	toString : function(){
		return this.id;
	}
};
inherit(DOMElementInterface, CheckableItemController);


/**
 * CheckableItemController를 상속받은 라디오버튼 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.RadioItemController
 * @class
 * @param DOMElement element
 */
var RadioItemController = function(element){
	CheckableItemController.call(this, element);
	this.radio = this.checkableItem;
};
RadioItemController.prototype = {
};
inherit(CheckableItemController, RadioItemController);


/**
 * CheckableItemController를 상속받은 체크박스 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.CheckBoxItemController
 * @class
 * @param DOMElement element
 */
var CheckBoxItemController = function(element){
	CheckableItemController.call(this, element);
	this.checkBox = this.checkableItem;
};
CheckBoxItemController.prototype = {
	/**
	 * 체크를 해제하고 false를 리턴한다.
	 * @name tom.Util.CheckBoxItemController.uncheck
	 * @function
	 * @return Boolean
	 */
	uncheck : function(){
		this.container.removeClassName('on');
		return this.checkableItem.checked = false;
	}
};
inherit(CheckableItemController, CheckBoxItemController);


/**
 * DOMElementInterface를 상속받은 리스트계열 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.ListInterface
 * @class abstract
 * @param DOMElement element
 */
var ListInterface = function(element){
	DOMElementInterface.call(this, element);
	this.items = daum.$A(getDirectElementsByTagName(this.container, 'li'));
};
ListInterface.prototype = {
	/**
	 * key에 해당하는 아이템을 리턴한다.
	 * @name tom.Util.ListInterface.getItem
	 * @function
	 * @param String key
	 * @return DOMElement
	 */
	getItem : function(key){
		return this.items[key];
	},
	/**
	 * key의 자리에 item을 할당하고, 해당 아이템을 리턴한다.
	 * @name tom.Util.ListInterface.setItem
	 * @function
	 * @param String key
	 * @param DOMElement item
	 * @return DOMElement
	 */
	setItem : function(key, item){
		if(item && item.nodeType === 1 && item.tagName.toLowerCase() == 'li'){
			this.items[key] = item;
			return this.items[key];
		}
		return false;
	},
	/**
	 * key에 해당하는 아이템을 제거하고, 해당 아이템을 리턴한다.
	 * @name tom.Util.ListInterface.removeItem
	 * @function
	 * @param String key
	 * @return DOMElement
	 */
	removeItem : function(item){
		if(item){
			var key = item.key
			this.items[key].destroy();
			delete this.items[key];
		}
		return item;
	},
	/**
	 * 아이템을 DOMTree에 추가한다.
	 * @name tom.Util.ListInterface.addItem
	 * @function
	 * @param Object item
	 */
	addItem : function(item){
		var key = item.key;
		if(key && !this.items[key]){
			this.items[key] = item;
			this.container.appendChild(item.toObject());
		}
	},
	/**
	 * JSON 데이터를 적용한다.
	 * @name tom.Util.ListInterface.setJSON
	 * @function abstract
	 * @param json
	 */
	setJSON : function(json){
		
	},
	/**
	 * JSON 데이터를 리턴한다
	 * @name tom.Util.ListInterface.getJSON
	 * @function abstract
	 * @return json
	 */
	getJSON : function(){
		
	},
	getNames : function(){
		var names = {};
		for(var i in this.items){
			if(this.items.hasOwnProperty(i)){
				var item = this.items[i];
				if(!names[item.name]){
					names[item.name] = this;
				}
			}
		}
		return names;
	}
};
inherit(DOMElementInterface, ListInterface);


/**
 * ListInterface를 상속받은 체크 가능한 리스트 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.CheckableListController
 * @class
 * @param DOMElement element
 */
var CheckableListController = function(element){
	ListInterface.call(this, element);
	this.prefix = this.container.getParent().id;
	this.checkedItem;
};
CheckableListController.prototype = {
	/**
	 * override
	 * JSON 데이터를 적용한다.
	 * @name tom.Util.CheckableListController.setJSON
	 * @function
	 * @param json
	 */
	setJSON : function(json){
		for(key in json){
			if(json[key]){
				this.checkItem(key);
			} else {
				this.uncheckItem(key);
			}
		}
	},
	/*
	 * override
	 * JSON 데이터를 리턴한다.
	 * @name tom.Util.CheckableListController.getJSON
	 * @function
	 * @return json
	 */
	getJSON : function(){
		var json = {};
		if(this.checkedItem){
			json[this.checkedItem.name] = this.checkedItem.value; 
		}
		return json;
	},
	/**
	 * key에 해당하는 아이템을 체크한다.
	 * @name tom.Util.CheckableListController.checkItem
	 * @function
	 * @param String key
	 */
	checkItem : function(key){
		var item = this.items[key];
		if(item){
			item.check();
			this.checkedItem = item;
			if(this.callBack && this.callBack.isFunction){
				this.callBack(this, this.checkedItem);
			}
		}
	},
	/**
	 * key에 해당하는 아이템의 체크를 해제한다.
	 * @name tom.Util.CheckableListController.uncheckItem
	 * @function
	 * @param String key
	 */
	uncheckItem : function(key){
		var item = this.items[key];
		if(item){
			item.uncheck();
			if(this.checkedItem == item){
				 this.checkedItem = null;
			}
		}
	},
	/**
	 * 체크된 아이템을 리턴한다.
	 * @name tom.Util.CheckableListController.getCheckedItem
	 * @function
	 * @return DOMElement
	 */
	getCheckedItem : function(){
		if(this.checkedItem && !this.checkedItem.isChecked()){
			this.checkedItem = null;
		}
		return this.checkedItem;
	}
};
inherit(ListInterface, CheckableListController);


/**
 * CheckableListController를 상속받은 라디오버튼 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.RadioListController
 * @class
 * @param DOMElement element
 */
var RadioListController = function(element, callBack){
	CheckableListController.call(this, element);
	this.items = ListItemAdapter(daum.$A(getDirectElementsByTagName(this.container, 'li')), 'radio');
	this.callBack = callBack;
	this.onClick = function(e){
		var source = daum.Event.getElement(e);
		var radioItem = ListItemAdapter(getParentNodeByTagName(source, 'li'), 'radio');
		if(radioItem){
			this.uncheckItem(this.checkedItem.key);
			this.checkItem(radioItem.key);
		}
		return true;
	};
	this.init();
};
RadioListController.prototype = {
	init : function(){
		this.attachEvents();
		this.initCheckedItem();
	},
	attachEvents : function(){
		daum.addEvent(this.container, 'click', daum.Function.bind(this.onClick, this));
	},
	initCheckedItem : function(){
		for(var i in this.items){
			if(this.items.hasOwnProperty(i)){
				var item = this.items[i];
				if(item.isChecked()){
					this.checkedItem = item;
					break;
				}
			}
		}
	}
};
inherit(CheckableListController, RadioListController);


/**
 * CheckableListController를 상속받은 체크박스 DOMElement를 조작하는 클래스이다.
 * @constructor
 * @name tom.Util.CheckBoxListController
 * @class
 * @param DOMElement element
 * @param unsigned int maxCheckedItemCount
 */
var CheckBoxListController = function(element, maxCheckedItemCount, callBack){
	CheckableListController.call(this, element);
	this.items = ListItemAdapter(daum.$A(getDirectElementsByTagName(this.container, 'li')), 'checkBox');
	this.max = maxCheckedItemCount;
	this.checkBoxQueue;
	this.callBack = callBack;
	this.onClick = function(e){
		var source = daum.Event.getElement(e);
		if(source.tagName.toLowerCase() == 'input'){
			source.checked = !source.checked;
		}
		var checkBoxItem = ListItemAdapter(getParentNodeByTagName(source, 'li'), 'checkBox');
		if(checkBoxItem){
			this.handleQueue(checkBoxItem.key);
		}
		return true;
	};
	this.init();
};
CheckBoxListController.prototype = {
	/**
	 * override
	 * JSON 데이터를 적용한다.
	 * @name tom.Util.CheckableListController.setJSON
	 * @function
	 * @param json
	 */
	setJSON : function(json){
		
		for(i in this.items){
			if(this.items.hasOwnProperty(i)){
				var item = this.items[i];
				if(json[i]){
					item.check();
				} else {
					item.uncheck();
				}
			}
		}
		this.initCheckBoxQueue();
	},
	/**
	 * override
	 * JSON 데이터를 리턴한다.
	 * @name tom.Util.CheckableListController.getJSON
	 * @function
	 * @return json
	 */
	getJSON : function(json){
		var json = {};
		var checkedItems = this.getCheckedItems();
		for(var i = checkedItems.length - 1; i >= 0; i--){
			var checkedItem = checkedItems[i];
			if(checkedItem.isChecked()){
				if(!json[checkedItem.name]){
					json[checkedItem.name] = [];
				}
				json[checkedItem.name].push(checkedItem.value); 
			}
		}
		return json;
	},
	init : function(){
		this.attachEvents();
		this.initCheckBoxQueue();
	},
	initCheckBoxQueue : function(){
		if(this.checkBoxQueue){
			delete this.checkBoxQueue;
		}
		this.checkBoxQueue = new TomQueue(this.max);
		for(var i in this.items){
			var item = this.items[i];
			if(item.checkableItem && item.isChecked()){
				var kicked = this.checkBoxQueue.push(item);
				if(kicked){
					kicked.uncheck();
				}
			}
		}
	},
	attachEvents : function(){
		daum.addEvent(this.container, 'click', daum.Function.bind(this.onClick, this));
	},
	checkItem : function(key){
		this.items[key].check();
		this.handleQueue(key);
	},
	/**
	 * key에 해당하는 아이템을 maxCheckedItemCount까지 체크한다.
	 * maxCheckedItemCount를 초과하여 체크할 시에는 가장 먼저 체크된 체크박스를 해제한다.
	 * @name tom.Util.CheckBoxListController.handleQueue
	 * @function
	 * @param String key
	 */
	handleQueue : function(key){
		var checkBox = this.items[key];
		if(!checkBox.isChecked()){
			if(this.checkBoxQueue.isFull()){
				var pop = this.checkBoxQueue.pop();
				pop.uncheck();
				this.checkBoxQueue.push(checkBox);
			} else {
				this.checkBoxQueue.push(checkBox);
			}
			checkBox.check();
		} else {
			this.checkBoxQueue.remove(checkBox);
			checkBox.uncheck();
		}
		if(this.callBack && this.callBack.isFunction){
			this.callBack(this, checkBox);
		}
	},
	/**
	 * 체크된 아이템 중 가장 마지막 아이템을 리턴한다.
	 * @name tom.Util.CheckBoxListController.getCheckedItem
	 * @function
	 * @return DOMElement
	 */
	getCheckedItem : function(){
		return this.getCheckedItems().getLast();
	},
	/**
	 * 체크된 아이템들의 배열을 리턴한다.
	 * @name tom.Util.CheckBoxListController.getCheckedItem
	 * @function
	 * @return Array<DOMElement>
	 */
	getCheckedItems : function(){
		return this.checkBoxQueue.toArray();
	}
};
inherit(CheckableListController, CheckBoxListController);


var Tab = function(element, callBack){
	DOMElementInterface.call(this, element);
	this.header = getDirectElementsByClassName(this.container, 'tabHeader')[0];
	this.body = new CheckBoxListController(getDirectElementsByClassName(this.container, 'tabBody')[0]);
	this.body.callBack = callBack;
	this.init();
};
Tab.prototype = {
	init : function(){
		this.hideBody();
	},
	getKey : function(){
		return this.header.innerHTML;
	},
	showBody : function(){
		this.body.container.show();
	},
	hideBody : function(){
		this.body.container.hide();
	}
};
inherit(DOMElementInterface, Tab);


var TabController = function(element, callBack){
	DOMElementInterface.call(this, element);
	this.tabs = {};
	this.shownTab = null;
	this.callBack = callBack;
	this.onHeaderClicked = function(tab, e){
		if(this.shownTab != tab){
			this.shownTab.hideBody();
			tab.showBody();
			this.shownTab = tab;
		}
	};
	this.init();
};
TabController.prototype = {
	init : function(){
		this.initTabs();
	},
	initTabs : function(){
		var tabElements = getDirectElementsByClassName(this.container, 'tab');
		if(tabElements){
			var tab = new Tab(tabElements[0], this.callBack);
			daum.addEvent(tab.header, "click", daum.Function.bind(this.onHeaderClicked, this, tab));
			this.tabs[tab.getKey()] = tab;
			tab.showBody();
			this.shownTab = tab;
			
			for(var i = 1, len = tabElements.length; i < len; i++){
				tab = new Tab(tabElements[i], this.callBack);
				daum.addEvent(tab.header, "click", daum.Function.bind(this.onHeaderClicked, this, tab));
				this.tabs[tab.getKey()] = tab;
			}
		}
	}
};
inherit(DOMElementInterface, TabController);

/* 리팩터링 필요 */
var Slider = function(element, callBack, startValue, endValue){
	DOMElementInterface.call(this, element);
	this.prefix = this.container.getParent().id;
	this.sliderHandle = daum.$E(getDirectElementsByClassName(this.container, 'sliderHandle')[0]);
	this.leftHandle = daum.$E(getDirectElementsByClassName(this.sliderHandle, 'leftHandle')[0]);
	this.rightHandle = daum.$E(getDirectElementsByClassName(this.sliderHandle, 'rightHandle')[0]);
	this.leftHandle.toolTip = daum.$E(getDirectElementsByClassName(this.leftHandle, 'toolTip')[0]);
	this.rightHandle.toolTip = daum.$E(getDirectElementsByClassName(this.rightHandle, 'toolTip')[0]);
	this.leftInput = daum.$(this.prefix + '_Left');
	this.rightInput = daum.$(this.prefix + '_Right');
	this.callBack = callBack;
	this.startValue = startValue || 1900;
	this.endValue = endValue || 2010;
	
	this.init();
};
Slider.prototype = {
	leftHandleFunction : function(){
		var handleWidth = daum.Number.toInt(this.leftHandle.offsetWidth);
		var value = this.getValueByPos(this.leftHandle.drag.getPos().left);
		this.leftHandle.drag.setScopeX({start:handleWidth, end:this.rightHandle.drag.getPos().left});
		this.leftInput.value = value;
		this.setToolTip(this.leftHandle.toolTip, value);
	},
	rightHandleFunction : function(){
		var handleWidth = daum.Number.toInt(this.rightHandle.offsetWidth);
		var sliderWidth = daum.Number.toInt(this.container.offsetWidth);
		var value = this.getValueByPos(this.rightHandle.drag.getPos().left);
		this.rightHandle.drag.setScopeX({start:this.leftHandle.drag.getPos().left, end:sliderWidth - handleWidth});
		this.rightInput.value = value;
		this.setToolTip(this.rightHandle.toolTip, value);
	},
	initHandle : function(handle, input){
		if(!handle.drag){
			handle.drag = daum.widget.drag(handle);
		}
		handle.setLeft(this.getPosByValue(daum.Number.toInt(input.value)));
		handle.drag.setScopeY({start:0, end:0, init:0});
		handle.drag.addEventListener({
			type:'onMouseMove',
			func:daum.Function.bind(handle.className == "leftHandle"?this.leftHandleFunction:this.rightHandleFunction, this)
		});
		handle.drag.addEventListener({
			type:'onMouseUp',
			func:this.callBack
		});
		handle.drag.run();
	},
	initHandles : function(){
		this.initHandle(this.leftHandle, this.leftInput);
		this.initHandle(this.rightHandle, this.rightInput);
	},
	init : function(){
		this.initHandles();
		this.setToolTip(this.leftHandle.toolTip, this.getValueByPos(this.leftHandle.drag.getPos().left));
		this.setToolTip(this.rightHandle.toolTip, this.getValueByPos(this.rightHandle.drag.getPos().left));
	},
	getValueByPos : function(pos){
		var handleWidth = daum.Number.toInt(this.leftHandle.offsetWidth);
		var sliderWidth = daum.Number.toInt(this.container.offsetWidth);
		Slider.prototype.getValueByPos = function(pos){
			return Math.round(this.startValue + (this.endValue - this.startValue) * (pos - handleWidth)/ (sliderWidth - handleWidth * 2));
		};
		return this.getValueByPos(pos);
	},
	getPosByValue : function(value){
		var handleWidth = daum.Number.toInt(this.leftHandle.offsetWidth);
		var sliderWidth = daum.Number.toInt(this.container.offsetWidth);
		Slider.prototype.getPosByValue = function(value){
			return Math.round( handleWidth + (sliderWidth - handleWidth * 2) * (value - this.startValue) / (this.endValue - this.startValue));
		};
		return this.getPosByValue(value);
	},
	setToolTip : function(element, year){
		element.innerHTML = year;
	},
	getJSON : function(){
		var json = {};
		json[this.leftInput.name] = this.leftInput.value;
		json[this.rightInput.name] = this.rightInput.value;
		return json;
	},
	setJSON : function(json){
		if(json[this.leftInput.id] != undefined && json[this.rightInput.id] != undefined){
			this.leftInput.value = json[this.leftInput.id];
			this.rightInput.value = json[this.rightInput.id];
			this.init();
			this.callBack();
		}
	},
	getNames : function(){
		var names = {};
		names[this.leftInput.name] = this;
		names[this.rightInput.name] = this;
		return names;
	}
};
inherit(DOMElementInterface, Slider);

if(!daum.widget) { daum.widget = {}; }
daum.widget.drag = function( _id ) {
	var objEle = daum.$( _id );
	var eleInfo = {
		width : objEle.offsetWidth,
		height : objEle.offsetHeight
	};

	var scope = {
		x : { start : null, end : null, init : null },
		y : { start : null, end : null, init : null }
	};

	var onMouseUp = null;
	var onMouseDown = null;
	var onMouseMove = null;

	var deltaX, deltaY;
	var origX, origY;

	var that = {
		getScope : function(){
			return scope;
		},
		setScopeX : function( pos ){
			daum.extend( scope.x, pos );
			return that;
		},
		getScopeX : function(){
			return scope.x;
		},
		setScopeY : function( pos ){
			daum.extend( scope.y, pos );
			return that;
		},
		getScopeY : function(){
			return scope.y;
		},
		getPos : function(){
			return { 
				left : objEle.offsetLeft, 
				top : objEle.offsetTop
			};
		},
		setPosX : function( pos ){
			daum.Element.setLeft( objEle, pos );
		},
		setPosY : function( pos ){
			daum.Element.setTop( objEle, pos );
		},
		getElementInfo : function(){
			return eleInfo;
		},
		dummyHandler : function( _event ){
			return false;
		},
		downHandler : function( _event ){
		    var startX = _event.clientX, startY = _event.clientY;    
			origX = objEle.offsetLeft;
			origY = objEle.offsetTop;

			deltaX = startX - origX;
			deltaY = startY - origY;
			
			daum.Event.addEvent(document,"mousemove",that.moveHandler, true);
			daum.Event.addEvent(document,"mouseup",that.upHandler, true);
			daum.Event.addEvent(document,"selectstart",that.dummyHandler, true);

			if( onMouseDown && typeof onMouseDown == "function" ){
				onMouseDown.call();
			}

			daum.Element.setStyle( objEle, {zIndex:99999} );

			daum.Event.stopEvent( _event );
			daum.Event.preventDefault( _event );

		},
		clickHandler : function( e ){
			daum.Event.stopEvent(e);
			daum.Event.preventDefault( e );
		},
		moveHandler : function( e ){
			var x = e.clientX - deltaX;
			if( scope.x.start != null ){
				if( x < scope.x.start ){
					x = scope.x.start;
				} else if( x > scope.x.end ){
					x = scope.x.end;
				}
			}

			var y = e.clientY - deltaY;
			if( scope.y.start != null ){
				if( y < scope.y.start ){
					y = scope.y.start;
				}
				if( y > scope.y.end ){
					y = scope.y.end;
				}
			}

			daum.Element.setPosition( objEle, x, y );

			if( onMouseMove && typeof onMouseMove == "function" ){
				onMouseMove.call();
			}
			
			daum.Event.stopEvent(e);
			daum.Event.preventDefault( e );

		},
		upHandler : function( e ){
			daum.Event.removeEvent(document,"mousemove",that.moveHandler, true);
	        daum.Event.removeEvent(document,"mouseup",that.upHandler, true);               
			daum.Event.removeEvent(document,"selectstart",that.dummyHandler, true);
			if( onMouseUp && typeof onMouseUp == "function" ){
				onMouseUp.call();
			}

			daum.Element.setStyle( objEle, {zIndex:'auto'} );

			daum.Event.stopEvent(e);
			daum.Event.preventDefault(e);
		},
		overHandler : function( e){
			daum.Element.setStyle( objEle, {zIndex:9999} );

			daum.Event.stopEvent(e);
			daum.Event.preventDefault(e);
		},
		outHandler : function( e){
			daum.Element.setStyle( objEle, {zIndex:'auto'} );

			daum.Event.stopEvent(e);
			daum.Event.preventDefault(e);
		},

		addEventListener : function( obj ){
			switch( obj.type ){
			case "onMouseUp":
				onMouseUp = obj.func;
				break;
			case "onMouseDown":
				onMouseDown = obj.func;
				break;
			case "onMouseMove":
				onMouseMove = obj.func;
				break;
			}
			return that;
		},
		destroy : function(){
			daum.Event.removeEvent(objEle,"mousedown",that.downHandler, true);
			daum.Event.removeEvent(objEle,"mouseover",that.overHandler, true);
			daum.Event.removeEvent(objEle,"mouseout",that.outHandler, true);
			daum.Event.removeEvent(objEle,"click",that.clockHandler, true);
		},
		setup : function(){
			daum.Event.addEvent(objEle,"mousedown",that.downHandler, true);
			daum.Event.addEvent(objEle,"mouseover",that.overHandler, true);
			daum.Event.addEvent(objEle,"mouseout",that.outHandler, true);
			daum.Event.addEvent(objEle,"click",that.clickHandler, true);
		},
		run : function(){
			objEle.style.position = "absolute";
			if( scope.x.init != null ){
				daum.Element.setLeft( objEle, scope.x.init );
			}
			if( scope.y.init != null ){
				daum.Element.setTop( objEle, scope.y.init );
			}
			that.setup();
		}
	};

	return that;
};


var Directory = function(element, maxCheckedItemCount, afterItemClicked){
	DOMElementInterface.call(this, element);
	this.title = getDirectElementsByClassName(this.container, "dirTitle")[0];
	this.listController = null;
	this.more = null;
	this.tabController = null; 
	this.type = "undefined";
	this.names = daum.$A([]);
	this.addedItem = null;
	
	this.afterTabBodyItemClicked = function(list, item){
		var objClone = item.toObject().cloneNode(true);
		objClone.innerHTML = item.toObject().innerHTML;
		var clone = ListItemAdapter(objClone, 'radio');
		if(!this.addedItem){
			this.listController.addItem(clone);
			this.addedItem = clone;
			this.listController.checkItem(clone.key);
		} else {
			this.listController.removeItem(this.addedItem);
			if(this.addedItem.key == clone.key){
				this.addedItem.destroy();
				this.addedItem = null;
			} else {
				this.listController.addItem(clone);
				this.addedItem = clone;
				this.listController.checkItem(clone.key);
			}
		}
	}
	
	this.init(maxCheckedItemCount, afterItemClicked);
};
Directory.prototype = {
	init : function(maxCheckedItemCount, afterItemClicked){
		this.initController(maxCheckedItemCount, afterItemClicked);
	},
	initController : function(maxCheckedItemCount, afterItemClicked){
		var listElement = getDirectElementsByTagName(this.container, "ul")[0] || getDirectElementsByTagName(this.container, "ol")[0] || getDirectElementsByClassName(this.container, "slider")[0];
		if(listElement){
			var className = this.type = listElement.className;
			switch(className){
				case "radioList" :{
					this.listController = new RadioListController(listElement, afterItemClicked);
				}
				break;
				case "checkBoxList" :{
					this.listController = new CheckBoxListController(listElement, maxCheckedItemCount, afterItemClicked);
				}
				break;
				case "slider" : {
					this.listController = new Slider(listElement, afterItemClicked);
				}
				break;
				default :
				break;
			}
			this.names = this.listController.getNames();
		}
		var tc = getDirectElementsByClassName(this.container, "tabControl")[0];
		if(tc){
			this.tabController = new tom.Controller.TabController(tc, daum.Function.bind(this.afterTabBodyItemClicked, this));
		}
	},
	setJSON : function(json){
		this.listController.setJSON(json);
	},
	getJSON : function(){
		return this.listController.getJSON();
	},
	getTitle : function(){
		return this.title.innerHTML;
	},
	getId : function(){
		return this.container.id;
	},
	getNames : function(){
		return this.names;
	}
};
inherit(DOMElementInterface, Directory);


var TomController = function(element, maxCheckedItemCount){
	DOMElementInterface.call(this, element);
	this.directories = daum.$A([]);
	this.urlMan = new UrlManager();
	this.names = {};
	this.init(maxCheckedItemCount);
};
TomController.prototype = {
	init : function(maxCheckedItemCount){
		this.initDirectories(maxCheckedItemCount);
	},
	initDirectories : function(maxCheckedItemCount){
		var dirs = getDirectElementsByClassName(this.container, "directory");
		var afterItemClicked = function(container, source){
			var hash = ParamBuilder.getParameterFromJSON(this.getJSON());
			this.urlMan.setHash(hash);
		};
		for(var i = dirs.length - 1; i >= 0; i--){
			var dir = dirs[i];
			if(dir){
				var d = new Directory(dir, maxCheckedItemCount, daum.Function.bind(afterItemClicked, this));
				
				this.directories[d.getId()] = d;
				daum.extend(this.names, d.getNames());
			}
		}
	},
	getJSON : function(){
		var json = {};
		for(var i in this.directories){
			if(this.directories.hasOwnProperty(i)){
				var dir = this.directories[i];
				json[i] = dir.getJSON();
			}
		}
		return json;
	},
	setJSON : function(json){
		for(var i in json){
			if(this.directories[i]){
				var dir = this.directories[i];
				dir.setJSON(json[i]);
			}
		}
	}
};
inherit(DOMElementInterface, TomController);


var Renderer = function(element, template){
	ListInterface.call(this, element);
	this.template = new daum.Template(template);
	this.arrangeFunctions = daum.$A([]);
};
Renderer.prototype = {
	getEvaluatedInnerHTML : function(json){
		var innerHTML = this.template.evaluate(json);
		return innerHTML;
	},
	getElementFromTemplate : function(json){
		var element = this.template.toElement(json);
		return element;
	},
	setJSONArray : function(jsonArr){
		var innerHTML = "";
		for(var i in jsonArr){
			if(jsonArr.hasOwnProperty(i)){
				var json = jsonArr[i];
				innerHTML += this.getEvaluatedInnerHTML(json);
			}
		}
		this.container.innerHTML = innerHTML;
	}
};
inherit(ListInterface, Renderer);

/**
 * ParamBuilder를 확장하여 
 * 각각의 서비스에서 쓰이는 파라미터 생성을 돕는 스태틱 클래스
 * 각각의 서비스에서 파라미터의 쓰임이 다양하므로
 * JSON을 파라미터로 변환하는 메서드와
 * 파라미터를 JSON으로 변환하는 메서드를 구현하여 TomController와 통신하기를 권장합니다.
 * @name TomParamBuilder
 * @class static 
 */
/**
 * JSON을 파라미터 스트링으로 변환하는 메서드
 * @name TomParamBuilder.getParameterFromJSON
 * @function static
 * @param Json json
 * @return String 
 */
ParamBuilder.getParameterFromJSON = function(json){
	ParamBuilder.clearParam();
	for(var i in json){
		var jsonDir = json[i];
		for(var name in jsonDir){
			var value = jsonDir[name];
			ParamBuilder.addParameter(name, value);
		}
	}
	return ParamBuilder.getFullParameter();
};
ParamBuilder.nameTable = {
	'genreId' : {
		dirName : 'genre',
		convertToKey : function(value){
			if(value == -1){
				value = 'all';
			}
			var key = 'genre_' + value;
			return key;
		},
		convertToValue : function(value){
			return true;
		}
	},
	'countryId' : {
		dirName : 'country',
		convertToKey : function(value){
			if(value == -1){
				value = 'all';
			}
			var key = 'country_' + value;
			return key;
		},
		convertToValue : function(value){
			return true;
		}
	},
	'startYear' : {
		dirName : 'releaseSlider',
		convertToKey : function(){
			var key = 'releaseSlider_Left';
			return key;
		},
		convertToValue : function(value){
			return daum.Number.toInt(value);
		}
	},
	'endYear' : {
		dirName : 'releaseSlider',
		convertToKey : function(){
			var key = 'releaseSlider_Right';
			return key;
		},
		convertToValue : function(value){
			return daum.Number.toInt(value);
		}
	}
};
/**
 * 파라미터 스트링을 JSON으로 변환하는 메서드
 * @name TomParamBuilder.getJSONFromParameter
 * @function static
 * @param String param
 * @return Json 
 */
ParamBuilder.getJSONFromUrlParameter = function(){
	var params = location.search.substr(1).split('&');
	for(var i = params.length - 1;i>=0;i--){
		var p = params[i].split('=');
		params[i] = {};
		params[i][p[0]] = p[1];
	}
	var nameTable = ParamBuilder.nameTable;
	var tomJson = {};
	if(params){
		for(var i = params.length - 1;i>=0;i--){
			var p = params[i];
			for(var j in p){
				var nTable = ParamBuilder.nameTable[j];
				var dirName = nTable.dirName;
				var key = nTable.convertToKey(p[j]);
				var value = nTable.convertToValue(p[j]);
				if(!tomJson[dirName]){ tomJson[dirName] = {}; }
				tomJson[dirName][key] = value;
			}
		}
	}
	return tomJson;
};


var UrlManager = function(){
};
UrlManager.prototype = {
	setSearch : function(search){
		window.location.search = search;
	},
	setHash : function(hash){
		window.location.hash = hash;
	}
};

daum.extend(tom, {
	/**
	 * Tomseki Version
	 * @field
	 * @name tom.version 
	 */
	version : '0.1',
	/**
	 * Util 관련 메소드를 제공한다.
	 * @namespace Util 관련 메소드를 제공한다.
	 * @name tom.Util
	 *//** @ignore */
	Util : {
		inherit : inherit,
		getDirectElementsByClassName : getDirectElementsByClassName,
		getDirectElementsByTagName : getDirectElementsByTagName,
		getParentNodeByTagName : getParentNodeByTagName,
		TomQueue : TomQueue,
		ListItemAdapter : ListItemAdapter,
		ParamBuilder : ParamBuilder
	},
	/**
	 * DOMElement Controller 관련 메소드를 제공한다.
	 * @namespace DOMElement Controller 관련 메소드를 제공한다.
	 * @name tom.Controller
	 *//** @ignore */
	Controller : {
		DOMElementInterface : DOMElementInterface,
		CheckableItemController : CheckableItemController,
		RadioItemController : RadioItemController,
		CheckBoxItemController : CheckBoxItemController,
		ListInterface : ListInterface,
		CheckableListController : CheckableListController,
		RadioListController : RadioListController,
		CheckBoxListController : CheckBoxListController,
		Slider : Slider,
		Directory : Directory,
		TomController : TomController,
		Renderer : Renderer,
		TabController : TabController
	}
});
})();


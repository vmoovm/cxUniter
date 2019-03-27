/* swiperSlide 滑动组件
 * 使用介绍：
 * 传一id  格式 #id
 * 请将以下classname注入到html中，具体请参考本实例
 * zswiperSlider-js
 * zswiperHandle-js
 * zswiperOptions-js
 * zswiperOption-js
 * 作者： 张中乐
 * 依赖关系：本组件-依赖-> onEvent.js
 * 
 * bug:
 * 1.由于使用了e.preventDefault(), window.scrollTo(),因此使页面滚动条失去了弹性
 * 
 * 
 * update: 2018-06-23
 * */
function swiperSlide (elId, objFn) {
	//长按进入编辑状态
	var timeLong = 0;
	var mw = 0;
	var self={//各种坐标
		startX:null,
		startY:null,
		endX:null,
		endY:null,
		moveX:null,
		moveY:null
	};
	// 动画开始时触发此函数
	objFn.aStart = objFn.aStart ? objFn.aStart : function(){}
	// 动画结束时触发此函数
	objFn.aEnd = objFn.aEnd ? objFn.aEnd : function(){}
	// 点击选项时触发start函数
	objFn.optionStart = objFn.optionStart ? objFn.optionStart : function(){}
	// 点击选项时触发end函数
	objFn.optionEnd = objFn.optionEnd ? objFn.optionEnd : function(){}
	// 长按1秒后触发此函数
	objFn.longTap = objFn.longTap ? objFn.longTap : function(){}
	
	var els = document.querySelector(elId).querySelectorAll('.zswiperSlider-js')
	// 给每一条.zswiperSlider-js，绑定动画开始和完成事件
	for(var i = 0; i < els.length; i++) {
    	els[i].addEventListener("animationstart", objFn.aStart, false);
    	els[i].addEventListener("animationend", objFn.aEnd, false);
    	// els[i].addEventListener("animationiteration", listener, false);
	}
	
	// 使每个zswiper-js归位
	function homing (index) {
		var doms = document.querySelector(elId).querySelectorAll('.zswiperHandle-js')
		var ParentDoms = document.querySelector(elId).querySelectorAll('.zswiperSlider-js')
		for (var i = 0; i < doms.length; i++) {
			// 将当前索引排除
			if(new RegExp(' ztransition ', 'g').test(' ' + doms[i].className + ' ') && index != i) {
				setTransform(doms[i], 0)
			}
		}
		for (var j = 0; j < ParentDoms.length; j++) {
			// 将当前索引排除
			if(index != j) {
				ParentDoms[j].setAttribute('isopenning', 'off');
			}
		}
		
	}
	// 获得最大滑动长度并返回长度
	function getMoveWidth (ele) {
		var domP=ele.querySelector('.zswiperOptions-js').querySelectorAll('.zswiperOption-js');
		var w = 0;
		if (domP.length > 1) {
			for (var i = 0; i < domP.length; i++) {
				w += domP[i].scrollWidth;
			}
		} else {
			w = domP[0].scrollWidth;
		}
		return w;
		
	}
	// translateX兼容写法
	var setTransform = function(obj, leftWidth) {
		leftWidth = leftWidth || 0;
		var style = 'translateX(' + leftWidth + 'px)'
		obj.style.webkitTransform = style;
		obj.style.transform = style;
	};
	// 获取滚动条位置
	function getScrollTop(){   
	    var scrollTop=0;   
	    if(document.documentElement&&document.documentElement.scrollTop){   
	        scrollTop=document.documentElement.scrollTop;   
	    }else if(document.body){   
	        scrollTop=document.body.scrollTop;   
	    }   
	    return scrollTop;   
	}
    var clear = null;
	var start = function (obj) {
		self={//重新初始化
			endX:null,
			endY:null,
			startX:null,
			startY:null
		};
		self.startX=obj.e.touches[0].pageX;
		self.startY=obj.e.touches[0].pageY;
		timeLong =  new Date() * 1;
		if (clear) {
			clearTimeout(clear);
			clear = null;
		}
		clear = setTimeout(objFn.longTap, 1000);
		// 触发点击目标事件
		/*if(new RegExp(' zswiperOption-js ', 'g').test(' ' + obj.e.target.className + ' ')) {
			// 触发选项事件
			objFn.optionStart(obj)
			obj.e.stopPropagation()
		}*/
		moveN.addEvt();
	}
	var move = function (obj) {
		obj.e.preventDefault();
		// 滑动长度
		self.endX=obj.e.touches[0].pageX-self.startX;
		self.endY=obj.e.touches[0].pageY-self.startY;
		if (Math.abs(self.endY) > Math.abs(self.endX)) {
			// 手动恢复滚动条功能
			window.scrollTo(0, getScrollTop() - self.endY)
		} else {
			// 滑动超过4像素会停止长按操作
			if (Math.abs(self.endX) > 4 || Math.abs(self.endY) > 4) {
				if (clear) {
					clearTimeout(clear);
					clear = null;
				}
			}
			// 拿到最大可滑动长度
			mw = getMoveWidth (obj.self);
			if (self.endX > 0) { // 滑动的距离为正数时归位
				setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
				obj.self.setAttribute('isopenning', 'off');
			} else {
				homing(obj.index);
				if(obj.self.getAttribute('isopenning') == 'on') {
					return
				};
				// if(Math.tan(80*Math.PI/180) > Math.abs(self.endX)/Math.abs(self.endY)) {
					// self.endX = self.endX *.6;
					if (Math.abs(self.endX) >= mw) {
						self.endX = -mw
					}
					setTransform(obj.self.querySelector('.zswiperHandle-js'), self.endX);
					obj.self.querySelector('.zswiperHandle-js').classList.remove('ztransition');
				// } else {
					// setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
					// obj.self.setAttribute('isopenning','off');
					// moveN.addEvt = false;
				// }
			}
		}
	}
	
	var end = function (obj) {
		if(new RegExp(' zswiperOption-js ', 'g').test(' ' + obj.e.target.className + ' ')) {
			// obj.e.stopPropagation()
			// 触发选项事件
			var setTimeout1 = setTimeout(function(){
				objFn.optionEnd(obj, setTransform)
				clearTimeout(setTimeout1);
			}, 1)
			
			mw = 0;
	    	timeLong = 0;
			clearTimeout(clear);
			clear = null;
	    	moveN.removeEvt();
			return;
		}
		if(obj.self.getAttribute('isopenning') == 'on') {
			return false;
		};
		if (self.endX > 0) {
			if(Math.tan(20) > self.endY/self.endY) {
				
			}
			// if(obj.self.target)
			setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
			obj.self.setAttribute('isopenning', 'off');
		} else {
			// if(Math.tan(20*Math.PI/180) > Math.abs(self.endY)/Math.abs(self.endX)) {
				//if (Math.abs(self.endX) > mw * 0.2) { // 滑动超过操作选项宽度20%的距离可滑动
				if (Math.abs(self.endX) > 10) { // 滑动超过10px可滑动
					self.endX = -mw
					setTransform(obj.self.querySelector('.zswiperHandle-js'), self.endX);
					obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
					obj.self.setAttribute('isopenning', 'on');
				} else {
					setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
					obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
					obj.self.setAttribute('isopenning', 'off');
				}
			// } else {
				// setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
				// obj.self.setAttribute('isopenning','off');
				// obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
			// }
		}
		mw = 0;
    	timeLong = 0;
		clearTimeout(clear);
		clear = null;
    	moveN.removeEvt();
	}
	
    var startN = new On(elId, 'touchstart', '.zswiperSlider-js', start);
	var moveN = new On(elId, 'touchmove', '.zswiperSlider-js', move);
	var endN = new On(elId, 'touchend', '.zswiperSlider-js', end);
	moveN.removeEvt();
}
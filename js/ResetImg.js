/*
 * 名称：图片填满格子
 * 参数1说明：
 * listId: 必填项，接收限定范围的id  例："#refreshId",
 * 参数2说明：userConfig 是一个Obj类型
 * getImgSize:选填项，默认值空，字符串类型，auto：自动获取图片尺寸,为空：以src属性末尾?w100h100为图片尺寸（推荐，性能佳）
 * wrapSize:选填项，默认值null,Obj类型 作用：指定图片容器大小；赋值格式 {w: 100, h: 100}
 * imgSizeClass:选填项，Obj类型，默认值： 
 * {wc: 'zimgList_imgw100', 限定图片宽的样式，样式表定义：.zimgList_imgw100 img { width:100%;}
 *  hc: 'zimgList_imgh100', 限定图片高的样式，样式表定义：.zimgList_imgh100 img { height:100%;}
 *  imgBox:'.swiper-slide'  图片容器，格子样式名
 * }
 * upDateImg(Array|String) 异步更新图片  Array为多个id组成的数组，单个id字符串，id格式为 #nameid
 * 
 * 前端：张中乐 20170727
 * 更新：2017-9-22
 * */



function ResetImg (listId, userConfig,noInit) {
	var self=this;
	this.wrapId = listId;
	
	this.config = {
		getImgSize: 'auto',		//
		wrapSize: null,		//是否有，如有指定，请按以下格式默认值 null
		imgSizeClass: {wc: 'zimgList_imgw100', hc: 'zimgList_imgh100', imgBox:'.swiper-slide'}		//可修改样式名
	};
	this.running = false; // 是否在处理图片中
	if (userConfig) {
		if (userConfig.imgSizeClass) {
			for (o in this.config.imgSizeClass) {
				for (s in userConfig.imgSizeClass) {
					if (o == s) {
						this.config.imgSizeClass[o] = userConfig.imgSizeClass[s];
					} else {}
				}
			}
		}
		userConfig.imgSizeClass = this.config.imgSizeClass;
		for (v in this.config) {
			for (b in userConfig) {
				if (v == b) {
					this.config[v] = userConfig[b];
				} else {
					// 不相等时，增加新参数
					this.config[b] = userConfig[b];
				}
			}
		}
	} else {}
	
	if (!this.config.wrapSize) {
		if (!(document.querySelector(this.wrapId))) {
			console.error('限定范围id页面上不存在');
			return false;
		} else {}
		//排除页面中没有图片时
		if (document.querySelector(this.wrapId).querySelector(this.config.imgSizeClass.imgBox)){
			this.config.wrapSize = {//获得容器宽高
				w: document.querySelector(this.wrapId).querySelector(this.config.imgSizeClass.imgBox).clientWidth,
				h: document.querySelector(this.wrapId).querySelector(this.config.imgSizeClass.imgBox).clientHeight
			};
		} else {
			this.config.wrapSize = {//页面中没有图片时以按钮宽高代替容器宽高，为保证程序正常运行
				w: document.querySelector(this.wrapId).querySelector('.zsh_addImg').clientWidth,
				h: document.querySelector(this.wrapId).querySelector('.zsh_addImg').clientHeight
			};
		}
	} else {}
	this.imgArray = [];
	if(!noInit) {
		//获取所有图片
		var AllImgBox  = document.querySelector(this.wrapId).querySelectorAll(this.config.imgSizeClass.imgBox);
		for(var b = 0; b < AllImgBox.length; b++) {
			var AllImg = AllImgBox[b].querySelectorAll('img');
			for(var d = 0; d < AllImg.length; d++) {
				this.imgArray.push(AllImg[d]);
			}
		}
	} else {
		this.imgArray = [];
	}
	this.imgSize = [];
	this.imgObj = [];
	this.clear = [];
	//递归获取尺寸
	function _getSize (n,now) {
		self.imgSize[n].w = self.imgObj[n].width;
		self.imgSize[n].h = self.imgObj[n].height;
		if (self.imgSize[n].w > 0 && (self.imgObj[n].complete || self.imgObj[n].onload)) {
			if (self.clear[n]) clearInterval(self.clear[n]);
			if (self.config.wrapSize.w/self.config.wrapSize.h > self.imgSize[n].w/self.imgSize[n].h) {
				self.imgArray[n].parentElement.classList.add(self.config.imgSizeClass.wc);
				var h = Math.floor((self.config.wrapSize.w/self.imgSize[n].w*self.imgSize[n].h-self.config.wrapSize.h)/2)*-1
				self.imgArray[n].style.marginTop = h + 'px';
			} else {
				self.imgArray[n].parentElement.classList.add(self.config.imgSizeClass.hc);
				var w = Math.floor((self.config.wrapSize.h/self.imgSize[n].h*self.imgSize[n].w-self.config.wrapSize.w)/2)*-1
				self.imgArray[n].style.marginLeft = w + 'px';
			}
			_loop(n+=1);
		}
		// 超时处理
		if ((new Date() * 1 - now) > 1500) {
			if (self.clear[n]) clearInterval(self.clear[n]);
			_loop(n+=1);
		}
	}
	// 递归初始化
	function _loop (i) {
		var now = new Date() * 1;
		this.running = true;
		if (i < self.imgArray.length){
			self.imgSize[i] = {w:0,h:0};
			self.imgObj[i] = new Image();
			self.imgObj[i].src = self.imgArray[i].getAttribute('src');
			if (self.clear[i]) clearInterval(self.clear[i]);
			self.clear[i] = setInterval(function(){
				_getSize(i, now);
			},10);
		} else {
			this.running = false;
			return;
		}
	}
	
	if (this.config.getImgSize == 'auto') {
		// 执行递归
		if(this.imgArray.length > 0) _loop(0)
	} else {
		for (var i = 0 ; i < this.imgArray.length ; i++) {
			var imgsrc= this.imgArray[i].getAttribute('src');
			var wh=imgsrc.substr(imgsrc.lastIndexOf('?')+1).split(/w|h/).splice(1,2);
			if (this.config.wrapSize.w/this.config.wrapSize.h > wh[0]/wh[1]) {
				this.imgArray[i].parentElement.classList.add(this.config.imgSizeClass.wc);
				var h = Math.floor((this.config.wrapSize.w/wh[0]*wh[1]-this.config.wrapSize.h)/2)*-1
				this.imgArray[i].style.marginTop = h + 'px';
			} else {
				this.imgArray[i].parentElement.classList.add(this.config.imgSizeClass.hc);
				var w = Math.floor((this.config.wrapSize.h/wh[1]*wh[0]-this.config.wrapSize.w)/2)*-1
				this.imgArray[i].style.marginLeft = w + 'px';
			}
		}
	}
	// 异步更新图片
	this.upDateImg = function (el) {
		// alert('上传的id是'+el+'图片路径是'+document.querySelector(el).getAttribute('src'));
		// 
		if (el && el instanceof Array) {
			for (var n = 0; n < el.length; n++) {
				this.imgArray.push(document.querySelector(el[n]));
			}
		} else if (el && document.querySelector(el) != null) {
			this.imgArray.push(document.querySelector(el));
		} else {
			alert('获取id错误！格式: #defaultId');
		}
		if (!(this.running) && this.imgArray[0] != null) {
			_loop (0)
		} else {}
		
		
	}
}
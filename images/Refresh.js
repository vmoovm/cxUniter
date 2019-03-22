
/*
 * 参数1说明：
 * refreshId: 必填项，下拉容器  例："#refreshId",
 * 参数2说明：
 * backSite:选填项，默认值-42,下拉刷新恢复后的位置，
 * swipeDist:选填项，默认值35,滑动多长可以触发下拉函数，
 * refreshTime:选填项，默认值2000,刷新状态显示多久后消失，
 * swipeAngle:选填项，默认值60,滑动角度小于N值时触发滑动，越小越难触发，
 * isStopDown: 选填项，默认开启，值false， 是否关闭下拉刷新  false为开启 true为关闭，
 * isAuto: 选填项，默认为自动消失文字提示状态，值true,
 * pushDownTxt: 选填项，'下拉刷新',
 * releaseTxt: 选填项，'释放刷新',
 * pushDownLoadingTxt: 选填项，'正在刷新...',
 * scroll: 选填项，默认null, 可自定义滚动条元素，
 * onRefreshStart: 选填项，开始刷新时触发此函数，
 * onRefreshEnd: 选填项，刷新结束时触发此函数
 * 方法说明：
 * ChangeState() 手动恢复状态,在配置中isAuto值为false时，起作用，否则会弹alert()提示
 * ResetState(boolean) 是否禁止下拉刷新   传布尔值  true :禁止下拉刷新  false:开启下拉刷新
 * 
 * 前端：张中乐 20170810
 * 更新：20170822
 *  下拉刷新 下拉时触发onRefreshStart 下拉后触发onRefreshEnd
 * */
var das= function () {
	
}

/**
 * 下拉刷新 下拉刷新时触发onRefreshStart 下拉刷新后触发onRefreshEnd
 * @param {String} 触发下拉刷新的id
 * @param {Object} 参数配置
 * @example
 * new PushRefresh("#zId",objConf);<br/>
 * 
 * 
 * 参数objConf说明：<br/>
 * backSite:选填项，默认值-42,下拉刷新恢复后的位置，<br/>
 * swipeDist:选填项，默认值35,滑动多长可以触发下拉函数，<br/>
 * refreshTime:选填项，默认值2000,刷新状态显示多久后消失，<br/>
 * swipeAngle:选填项，默认值60,滑动角度小于N值时触发滑动，越小越难触发，<br/>
 * isStopDown: 选填项，默认开启，值false， 是否关闭下拉刷新  false为开启 true为关闭，<br/>
 * isAuto: 选填项，默认为自动消失文字提示状态，值true,<br/>
 * pushDownTxt: 选填项，'下拉刷新',<br/>
 * releaseTxt: 选填项，'释放刷新',<br/>
 * pushDownLoadingTxt: 选填项，'正在刷新...',<br/>
 * scroll: 选填项，默认null, 可自定义滚动条元素，<br/>
 * onRefreshStart: 选填项，开始刷新时触发此函数，<br/>
 * onRefreshEnd: 选填项，刷新结束时触发此函数<br/>
 * 方法说明：<br/>
 * ChangeState() 手动恢复状态,在配置中isAuto值为false时，起作用，否则会弹alert()提示<br/>
 * ResetState(boolean) 是否禁止下拉刷新   传布尔值  true :禁止下拉刷新  false:开启下拉刷新
 * <br/>
 * 前端：张中乐 20171208 <br/>
 * 更新：20170822
 * <br/>
 * <br/>
 */
function PushRefresh(refreshId,objConf) {
	this.zconf = {
		backSite: -42,
		swipeDist: 42,
		refreshTime: 2000,
		swipeAngle: 30,
		isStopDown: false,
		isAuto: true,
		pushDownTxt: '下拉刷新',
		releaseTxt: '释放刷新',
		pushDownLoadingTxt: '正在刷新',
		scroll: null
	};
	this.zconf.onRefreshStart = function () {};
	this.zconf.onRefreshEnd = function () {};
	this.refreshId = document.querySelector(refreshId);
	this.zconf.site = {//初始化滑屏位置
		startX: 0, startY: 0, endX: 0, endY: 0, moveX: 0, moveY: 0, pushLen: 0
	};
	//this.zconf=Object.assign(this.zconf,objConf);
	for(v in this.zconf){
		for(b in objConf){
			if(v==b){
				this.zconf[v]=objConf[b];
			}
		}
	}
	this.createRefresh(this.zconf);
	this.pushUpLoading=function(){};
};

PushRefresh.prototype.createRefresh=function(conf){
	var refreshSelf=this;
	var eleScroll=conf.scroll ? document.querySelector(conf.scroll) : null;
	var scroll=eleScroll || window;
	var sTop= eleScroll? eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
	var isRefresh=false; //是否触发了下拉刷新
	//创建下拉刷新状态结构
	var pushDown=document.createElement('div');
		pushDown.className="zrefresh",pushDown.id='pushDown';
	var pushState=document.createElement('p');
	    pushState.className="refreshIcon",pushState.id="pushState";
	var pushTxt=document.createElement('p');
	    pushTxt.className="refresh-text",pushTxt.id="pushTxt";
	    pushDown.appendChild(pushState);
	    pushDown.appendChild(pushTxt);
	    pushTxt.innerHTML=conf.pushDownTxt;//定义为下拉刷新
	    refreshSelf.refreshId.parentNode.insertBefore(pushDown,refreshSelf.refreshId);
	   
	this.touchS=function(event){
		pushDown.classList.remove('zanimate');
		refreshSelf.refreshId.classList.remove('zanimate');
		conf.site.startX=event.targetTouches[0].pageX;
		conf.site.startY=event.targetTouches[0].pageY;
	};
	this.touchM=function(event){
		conf.site.endX=event.targetTouches[0].pageX;
		conf.site.endY=event.targetTouches[0].pageY;
		conf.site.moveX=conf.site.endX-conf.site.startX,
		conf.site.moveY=conf.site.endY-conf.site.startY;
		//禁止上滑
		if(conf.site.moveY<=0 || conf.site.startY==0){
			isRefresh=false;
			pushDown.style.webkitTransform = 'translate3d(0, 0, 0)';
			refreshSelf.refreshId.style.webkitTransform = 'translate3d(0, 0, 0)';
			return false;
		}
		if(conf.site.moveY>2 && !conf.isStopDown){
			event.preventDefault();
			if(Math.tan(Math.PI/180*conf.swipeAngle) > Math.abs(conf.site.moveX/conf.site.moveY)){
				conf.site.pushLen=conf.site.moveY*0.7;
				pushDown.style.webkitTransform = 'translate3d(0, '+conf.site.pushLen+'px, 0)';
				refreshSelf.refreshId.style.webkitTransform = 'translate3d(0, '+conf.site.pushLen+'px, 0)';
				if(conf.site.pushLen>conf.swipeDist){
					pushTxt.innerHTML=conf.releaseTxt;//变量状态释放刷新
					pushState.classList.add('refreshIcon180');
					isRefresh=true;
				}else{
					pushTxt.innerHTML=conf.pushDownTxt;//恢复为下拉刷新
					pushState.classList.remove('refreshIcon180');
					return false;
				}
			}
		}
	};

	this.pushDownBack=function(){//恢复初始化
			pushDown.style.webkitTransform = 'translate3d(0, 0, 0)';
			refreshSelf.refreshId.style.webkitTransform = 'translate3d(0, 0, 0)';
			pushTxt.innerHTML=conf.pushDownTxt;//恢复为下拉刷新
			pushState.classList.remove("refreshing");
			pushState.classList.add("refreshIcon");
			refreshSelf.bindPushDown();
			conf.onRefreshEnd(refreshSelf);
	};
	this.touchE=function(){
		refreshSelf.unbindPushDown();
		
		if(isRefresh && conf.site.pushLen>conf.swipeDist){
			pushDown.classList.add('zanimate');
			refreshSelf.refreshId.classList.add('zanimate');
			// pushDown.style.marginTop=4+'px';
			pushDown.style.webkitTransform = 'translate3d(0, '+conf.swipeDist+'px, 0)';
			refreshSelf.refreshId.style.webkitTransform = 'translate3d(0, '+conf.swipeDist+'px, 0)';
			pushTxt.innerHTML=conf.pushDownLoadingTxt;//变量状态正在刷新
			pushState.classList.remove("refreshIcon");
			pushState.classList.add("refreshing");
			conf.onRefreshStart(refreshSelf);
			isRefresh=false;
		}else{
			pushDown.classList.add('zanimate');
			refreshSelf.refreshId.classList.add('zanimate');
			pushDown.style.webkitTransform = 'translate3d(0, 0, 0)';
			refreshSelf.refreshId.style.webkitTransform = 'translate3d(0, 0, 0)';
			pushTxt.innerHTML=conf.pushDownTxt;//恢复为下拉刷新
			pushState.classList.remove("refreshing");
			pushState.classList.add("refreshIcon");
			refreshSelf.bindPushDown();
			return false;
		}
		conf.site.pushLen=conf.backSite;
		if(conf.isAuto){
			setTimeout(function(){
				refreshSelf.pushDownBack();
			},conf.refreshTime);
		}
	};
	
	//绑定下拉
	this.bindPushDown=function(){
		refreshSelf.refreshId.addEventListener('touchstart',refreshSelf.touchS,false);
		refreshSelf.refreshId.addEventListener('touchmove',refreshSelf.touchM,false);
		refreshSelf.refreshId.addEventListener('touchend',refreshSelf.touchE,false);
		// 如果页面中有iframe(iframe中滑屏会卡一些)
		if(refreshSelf.refreshId.querySelectorAll('iframe')){
			for(var i=0; i<refreshSelf.refreshId.querySelectorAll('iframe').length; i++){
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.addEventListener('touchstart',refreshSelf.touchS,false);
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.addEventListener('touchmove',refreshSelf.touchM,false);
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.addEventListener('touchend',refreshSelf.touchE,false);
			}
		}
	}
	//解绑下拉
	this.unbindPushDown=function(){
		refreshSelf.refreshId.removeEventListener('touchstart',refreshSelf.touchS);
		refreshSelf.refreshId.removeEventListener('touchmove',refreshSelf.touchM);
		refreshSelf.refreshId.removeEventListener('touchend',refreshSelf.touchE);
		// 如果页面中有iframe(iframe中滑屏会卡一些)
		if(refreshSelf.refreshId.querySelectorAll('iframe')){
			for(var i=0; i<refreshSelf.refreshId.querySelectorAll('iframe').length; i++){
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.removeEventListener('touchstart',refreshSelf.touchS,false);
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.removeEventListener('touchmove',refreshSelf.touchM,false);
				refreshSelf.refreshId.querySelectorAll('iframe')[i].contentWindow.removeEventListener('touchend',refreshSelf.touchE,false);
			}
		}
	}
	
	//初次添加下拉刷新
	if(!(conf.sTop>0) && !conf.isStopDown){
		this.bindPushDown();
	}else{
		this.unbindPushDown();
	}
	
	scroll.addEventListener('scroll',function(){
		sTop= eleScroll? eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
		//下拉刷新
		if(sTop<=0 && !conf.isStopDown){
			refreshSelf.bindPushDown();
		}else{
			refreshSelf.unbindPushDown();
		}
	},false);
};

PushRefresh.prototype.ChangeState=function(){
	if(this.zconf.isAuto){
		alert('若将isAuto设置自动消失状态（true）,不必执行方法ChangeState()');
	}else{
		this.pushDownBack();
	}
}

PushRefresh.prototype.ResetState=function(state){
	this.zconf.isStopDown=state;
}


/**
 * @param {String} 触发上拉刷新的id
 * @param {Object} 参数配置
 * @example
 * 参数1说明：
 * PushUpId: 必填项，下拉容器  例："#refreshId",
 * 参数2说明： 
 * isStopUp: 选填项，默认开启，值false，是否关闭上拉加载   false为开启 true为关闭，
 * scroll: 选填项，默认null, 可自定义滚动条元素，
 * loadingTxt: 选填项，'加载中...',
 * warnningTxt: 选填项，'没有更多',
 * isData: 是否有数据，默认true,有数据为true,没数据为false,
 * Dataloading:加载更多事件，
 * 方法说明：
 * ChangeState(boolean) 传值 布尔型 true :还有数据，false:无数据
 * ResetState(boolean) 传值 布尔型 true:关闭上拉加载，false:开启上拉加载
 * 
 * 前端：张中乐 20170810
 * */

function PushUp(PushUpId,objConf){
	this.zconf={
		isStopUp:false,
		loadingTxt:'正在加载中...',
		warnningTxt:'已经到底啦~(>_<)~~',
		isData:true,
		scroll:null
	};
	this.zconf.Dataloading=function(){};
	this.PushUpId=document.querySelector(PushUpId);
	//this.zconf=Object.assign(this.zconf,objConf);
	for(v in this.zconf){
		for(b in objConf){
			if(v==b){
				this.zconf[v]=objConf[b];
			}
		}
	}
	this.eleScroll=this.zconf.scroll ? document.querySelector(this.zconf.scroll) : null;
	this.sTop= this.eleScroll? this.eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
	this.zheight=this.zconf.scroll ? parseInt(document.querySelector(this.zconf.scroll).clientHeight) : document.documentElement.clientHeight;
	
	//创建上拉加载状态结构
	this.refreshUp=document.createElement('div');
	this.refreshUp.className="zrefresh",this.refreshUp.id='refreshUp';
	this.refreshState=document.createElement('p');
   	this.refreshState.className="refreshing",this.refreshState.id='refreshState';
	this.refreshTxt=document.createElement('p');
    this.refreshTxt.className="refresh_text",this.refreshTxt.id='refreshTxt';
    this.refreshUp.appendChild(this.refreshState);
    this.refreshUp.appendChild(this.refreshTxt);
    this.refreshTxt.innerHTML=this.zconf.loadingTxt;
	this.pushUpInit(this.zconf);
};

PushUp.prototype.pushUpInit=function(conf){
	var refreshSelf=this;
	var scroll=this.eleScroll || window;
	scroll.onscroll=function(){
		refreshSelf.sTop= refreshSelf.eleScroll? refreshSelf.eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
		var isState=refreshSelf.sTop+refreshSelf.zheight;
		var documentHeight= refreshSelf.eleScroll? refreshSelf.eleScroll.scrollHeight : (document.documentElement.scrollHeight || document.body.scrollHeight);
		if((isState==documentHeight || isState>=documentHeight-1) && !conf.isStopUp){
			conf.isStopUp=true;//避免重复触发上拉，暂时关闭触发上拉
			refreshSelf.PushUpId.parentNode.appendChild(refreshSelf.refreshUp,refreshSelf.PushUpId);
			conf.Dataloading(refreshSelf);
			refreshSelf.refreshState.classList.add("zrunning");
		}else{}
	}
};

PushUp.prototype.ChangeState=function(state){
	if(document.querySelector('#refreshUp')) {
		this.isData=state;
	}else{
		return;
	}
	if(this.isData){
		document.querySelector('#refreshUp').remove();
		this.zconf.isStopUp=false;//再次开启触发上拉
	}else{
		document.querySelector('#refreshTxt').innerText=this.zconf.warnningTxt;
		document.querySelector('#refreshState').style.display='none';
	}
};
PushUp.prototype.ResetState=function(state){
	this.zconf.isStopUp=state;
	if(document.querySelector('#refreshTxt') && document.querySelector('#refreshTxt').innerText==this.zconf.warnningTxt){
		document.querySelector('#refreshUp').remove();
	}
}
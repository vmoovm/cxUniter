(function(win) {
	/**
	 * N节课至N节课
	 * @param {Element} clickDom指定触发的标签
	 * @param {Object} n数据列表，必传项
	 * @param {Element} show指定显示数据的标签 选传项
	 * 此功能没有事件委托，有待提升
	 */
	CXFun_setOption = function(clickDom, data, show){
		var that = this;
		this.show = show;
		this.oneData = data;
		this.zperiodDom = document.querySelector(clickDom);
		if (!this.zperiodDom) {
			alert('没有传id,  ' + '页面中没有找到此id:' + clickDom);
			return;
		};
		
		// this.oneData = function (callback) {
		    // callback(getPeriod(0));
		// };
		
		this.zperiodDom.addEventListener('click', function () {
		    if (that.show) {
		    	var oneLevelId = that.zperiodDom.querySelector(that.show).getAttribute('data-val');
		    } else {
		    	var oneLevelId = that.zperiodDom.getAttribute('data-val');
		    }
		    new IosSelect(1, [that.oneData], {
	            title: '设置选项',
	            itemHeight: 0.6786,
	            headerHeight:0.819,
	            relation: [1, 0, 0, 0],
	            cssUnit:'rem',
	            itemShowCount: 7,
	            oneLevelId: oneLevelId,
	            callback: function (selectOneObj) {
	                if (that.show) {
	                	that.zperiodDom.querySelector(that.show).setAttribute('data-val', selectOneObj.value);
	                	that.zperiodDom.querySelector(that.show).innerHTML = selectOneObj.value;
	                } else {
	                	that.zperiodDom.setAttribute('data-val', selectOneObj.value);
	                	that.zperiodDom.innerHTML = selectOneObj.value;
	                }
	            }
		    });
		});
	};
	// 将对像暴露给window
	win['CXFun_setOption'] = CXFun_setOption;
})(window);
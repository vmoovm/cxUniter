(function(win) {
	/**
	 * N节课至N节课
	 * @param {Element} clickDom指定触发的标签 ，必传项
	 * @param {Array} areaArr省市区数组
	 * @param {Element} show指定显示数据的标签，选传项
	 * 此功能没有事件委托，有待提升
	 */
	CXFun_area = function(clickDom, areaArr, show){
		var that = this;
		this.areaArr = areaArr;
		this.show = show;
		this.clickDom = document.querySelector(clickDom);
		if (!this.clickDom) {
			alert('没有传id,  ' + '页面中没有找到此id:' + clickDom);
			return;
		};
		
		// var selectContactDom =document.getElementById("select_contact");
		if(this.show) {
			this.showContactDom = this.clickDom.querySelector(this.show);
		} else {
			this.showContactDom = this.clickDom;
		}
		
	    this.clickDom.addEventListener('click', function () {
	        var sccode = that.showContactDom.getAttribute('data-city-code');
	        var scname = that.showContactDom.getAttribute('data-city-name');
	
	        var oneLevelId = that.showContactDom.getAttribute('data-province-code');
	        var twoLevelId = that.showContactDom.getAttribute('data-city-code');
	        var threeLevelId = that.showContactDom.getAttribute('data-district-code');
	        
	        
	        
	        
	        var iosSelect = new IosSelect(3,
	            [that.areaArr[0], that.areaArr[1], that.areaArr[2]],
	            {
	                title: '地址选择',
	                itemHeight: 0.6786,
		            headerHeight:0.819,
		            relation: [1, 1, 0, 0],
		            cssUnit:'rem',
		            itemShowCount: 7,
	                oneLevelId: oneLevelId,
	                twoLevelId: twoLevelId,
	                threeLevelId: threeLevelId,
	                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
	                    that.showContactDom.setAttribute('data-province-code', selectOneObj.id);
	                    that.showContactDom.setAttribute('data-city-code', selectTwoObj.id);
	                    that.showContactDom.setAttribute('data-district-code', selectThreeObj.id);
	                    that.showContactDom.innerHTML=selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value;
	                }
	        });
	    });
		
	};
	// 将对像暴露给window
	win['CXFun_area'] = CXFun_area;
})(window);
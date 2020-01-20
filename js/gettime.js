(function(win) {
	/**
	 * 过去m年和未来n年
	 * @param {Element} clickDom指定触发的标签 ，必传项
	 * @param {Object} m过去m年，必传项
	 * @param {Object} n过来n年， 必传项
	 * @param {Element} show指定显示数据的标签， 选传项，没有标签请传false
	 * 此功能没有事件委托，有待提升
	 */
	CXFun_gettime = function(clickDom, m, n, show, callfn){
		
		var that = this;
		this.show = show;
		this.callfn = callfn;
		this.zclassDate = document.querySelector(clickDom);
		if (!this.zclassDate) {
			alert('没有传id,  ' + '页面中没有找到此id:' + clickDom);
			return;
		}
		
		
    // var selectDateDom = $('#selectDate');
    // var showDateDom = $('#showDate');
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    
    if (this.show) {
		this.zclassDate.querySelector(this.show).setAttribute('data-year', nowYear);
	    this.zclassDate.querySelector(this.show).setAttribute('data-month', nowMonth);
	    this.zclassDate.querySelector(this.show).setAttribute('data-date', nowDate);	    	
    } else {
    	this.zclassDate.setAttribute('data-year', nowYear);
	    this.zclassDate.setAttribute('data-month', nowMonth);
	    this.zclassDate.setAttribute('data-date', nowDate);
    }
    // showDateDom.attr('data-year', nowYear);
    // showDateDom.attr('data-month', nowMonth);
    // showDateDom.attr('data-date', nowDate);
    // 数据初始化
    function formatYear (nowYear) {
        var arr = [];
        for (var i = nowYear - m; i <= nowYear + n; i++) {
            arr.push({
                id: i + '',
                value: i + ''
            });
        }
        return arr;
    }
    function formatMonth () {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + ''
            });
        }
        return arr;
    }
    function formatDate (count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + ''
            });
        }
        return arr;
    }
    var yearData = function(callback) {
        callback(formatYear(nowYear))
    }
    var monthData = function (year, callback) {
        callback(formatMonth());
    };
    var dateData = function (year, month, callback) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            callback(formatDate(31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            callback(formatDate(30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                callback(formatDate(29));
            }
            else {
                callback(formatDate(28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
    };
    var hourData = function(one, two, three, callback) {
        var hours = [];
        for (var i = 0,len = 24; i < len; i++) {
            hours.push({
                id: i,
                value: i + ''
            });
        }
        callback(hours);
    };
    var minuteData = function(one, two, three, four, callback) {
        var minutes = [];
        for (var i = 0, len = 60; i < len; i++) {
            minutes.push({
                id: i,
                value: i + ''
            });
        }
        callback(minutes);
    };
    this.zclassDate.addEventListener('click', function () {
        // var oneLevelId = showDateDom.attr('data-year');
        // var twoLevelId = showDateDom.attr('data-month');
        // var threeLevelId = showDateDom.attr('data-date');
        // var fourLevelId = showDateDom.attr('data-hour');
        // var fiveLevelId = showDateDom.attr('data-minute');
        
        if (that.show) {
    		var oneLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-year');
    		var twoLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-month');
    		var threeLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-date');
    		var fourLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-hour');
    		var fiveLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-minute');
    	} else {
	        var oneLevelId = that.zclassDate.getAttribute('data-year');
	        var twoLevelId = that.zclassDate.getAttribute('data-month');
	        var threeLevelId = that.zclassDate.getAttribute('data-date');
	        var fourLevelId = that.zclassDate.getAttribute('data-hour');
	        var fiveLevelId = that.zclassDate.getAttribute('data-minute');
    	}
        var iosSelect = new IosSelect(5, 
            [yearData, monthData, dateData, hourData, minuteData],
            {
            	title: '设置时间',
                itemHeight: 0.68,
	            headerHeight:0.62,
	            unitHeight: .5, // 数据单位的高度
	            unitItem: ['年', '月', '日', '时', '分'],
	            deg: 26,
	            translateZ: 1.5,
	            relation: [1, 1, 1, 1],
	            cssUnit:'rem',
	            itemShowCount: 5,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                fourLevelId: fourLevelId,
                fiveLevelId: fiveLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj) {
                    if (that.show) {
                    	that.zclassDate.querySelector(that.show).setAttribute('data-year', selectOneObj.id);
                    	that.zclassDate.querySelector(that.show).setAttribute('data-month', selectTwoObj.id);
                    	that.zclassDate.querySelector(that.show).setAttribute('data-date', selectThreeObj.id);
                    	that.zclassDate.querySelector(that.show).setAttribute('data-hour', selectFourObj.id);
    					that.zclassDate.querySelector(that.show).setAttribute('data-minute', selectFiveObj.id);
                    	that.zclassDate.querySelector(that.show).innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '') + ' ' + selectFourObj.value.replace(/时/, '') + ':' + selectFiveObj.value.replace(/分/, '');
                    } else {
	                    that.zclassDate.setAttribute('data-year', selectOneObj.id);
	                    that.zclassDate.setAttribute('data-month', selectTwoObj.id);
	                    that.zclassDate.setAttribute('data-date', selectThreeObj.id);
	                    that.zclassDate.setAttribute('data-hour', selectFourObj.id);
	                    that.zclassDate.setAttribute('data-minute', selectFiveObj.id);
	                    that.zclassDate.innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '') + ' ' + selectFourObj.value.replace(/时/, '') + ':' + selectFiveObj.value.replace(/分/, '');
                    }
                    // showDateDom.attr('data-year', selectOneObj.id);
                    // showDateDom.attr('data-month', selectTwoObj.id);
                    // showDateDom.attr('data-date', selectThreeObj.id);
                    // showDateDom.attr('data-hour', selectFourObj.id);
                    // showDateDom.attr('data-minute', selectFiveObj.id);
                    // showDateDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value + ' ' + selectFourObj.value + ' ' + selectFiveObj.value);
                    
                    var obj = [selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj]
	                    if (that.callfn) {
	                    	that.callfn(obj)
	                    }
                }
        });
    });
    };
    
    
	// 将对像暴露给window
	win['CXFun_gettime'] = CXFun_gettime;
})(window);
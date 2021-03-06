(function(win) {
	/**
	 * 过去m年和未来n年
	 * @param {Element} clickDom指定触发的标签 ，必传项
	 * @param {Object} m过去m年，必传项,注，传过去具体时间后，m值失效,不传m的具体值时，请传false
	 * @param {Object} n过去日期， 年月日格式2018-10-5，注：传n值后，m值失效，不传n具体时间时，请传false
	 * @param {Element} show指定显示数据的标签， 选传项
	 * 此功能没有事件委托，有待提升
	 */
	CXFun_gettoday = function(clickDom, m, n, show, callfn){
		var that = this;
		this.show = show;
		this.callfn = callfn;
		console.log(n)
		this.zclassDate = document.querySelector(clickDom);
		if (!this.zclassDate) {
			alert('没有传id,  ' + '页面中没有找到此id:' + clickDom);
			return;
		}
	    // 初始化时间
	    var now = new Date();
	    var nowYear = now.getFullYear();
	    var nowMonth = now.getMonth() + 1;
	    var nowDate = now.getDate();
	    if (n) {
		    var pastYear = n.split('-')[0]
		    var pastMonth = n.split('-')[1]
		    var pastDate = n.split('-')[2]
	    }
	    if (this.show) {
			this.zclassDate.querySelector(this.show).setAttribute('data-year', nowYear);
		    this.zclassDate.querySelector(this.show).setAttribute('data-month', nowMonth);
		    this.zclassDate.querySelector(this.show).setAttribute('data-date', nowDate);	    	
	    } else {
	    	this.zclassDate.setAttribute('data-year', nowYear);
		    this.zclassDate.setAttribute('data-month', nowMonth);
		    this.zclassDate.setAttribute('data-date', nowDate);
	    }
	    // 数据初始化
	    function formatYear (nowYear, past) {
	        var arr = [];
	        if (past) {
	        	for (var i = pastYear; i <= nowYear; i++) {
	        	    arr.push({
	        	        id: i + '',
	        	        value: i + '年'
	        	    });
	        	}
	        } else {
	        	for (var i = nowYear - m; i <= nowYear; i++) {
	        	    arr.push({
	        	        id: i + '',
	        	        value: i + '年'
	        	    });
	        	}
	        }
	        return arr;
	    }
	    function formatMonth (count, past) {
	        var arr = [];
	        if (past) {
		        for (var i = pastMonth; i <= count; i++) {
		            arr.push({
		                id: i + '',
		                value: i + '月'
		            });
		        }
	        } else {
		        for (var i = 1; i <= count; i++) {
		            arr.push({
		                id: i + '',
		                value: i + '月'
		            });
		        }
	        }
	        return arr;
	    }
	    function formatDate (count, past) {
	        var arr = [];
	        if (past) {
	        	for (var i = pastDate; i <= count; i++) {
	        	    arr.push({
	        	        id: i + '',
	        	        value: i + '日'
	        	    });
	        	}
	        } else {
		        for (var i = 1; i <= count; i++) {
		            arr.push({
		                id: i + '',
		                value: i + '日'
		            });
		        }
	        }
	        return arr;
	    }
	    var yearData = function(callback) {
	        if (n) {
	        	callback(formatYear(nowYear, true))
	        } else {
	        	callback(formatYear(nowYear, false))
	        }
	    }
	    var monthData = function (year, callback) {
            if (year == nowYear) {
            	if (year == pastYear){
            		callback(formatMonth(nowMonth, true));
            	} else {
            		callback(formatMonth(nowMonth, false));
            	}
            } else if (year == pastYear) {
            	callback(formatMonth(12, true));
            } else {
        		callback(formatMonth(12, false));
        	}
	    };
	    var dateData = function (year, month, callback) {
            if (/^4|6|9|(11)$/.test(month)) {
                if (year == nowYear && month == nowMonth) {
                	if (year == pastYear && month == pastMonth){
                		callback(formatDate(nowDate, true));
                	} else {
                		callback(formatDate(nowDate, false));
                	}
                } else if (year == pastYear && month == pastMonth){
                	callback(formatDate(30, true));
                } else {
            		callback(formatDate(30, false));
            	}
            }
            else if (/^1|3|5|7|8|(10)|(12)$/.test(month)) {
            	if (year == nowYear && month == nowMonth) {
                	if (year == pastYear && month == pastMonth){
                		callback(formatDate(nowDate, true));
                	} else {
                		callback(formatDate(nowDate, false));
                	}
              	} else if (year == pastYear && month == pastMonth){
                	callback(formatDate(31, true));
                } else {
            		callback(formatDate(31, false));
            	}
            } else if (/^2$/.test(month)) {
                if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                	if (year == nowYear && month == nowMonth) {
                		if (year == pastYear && month == pastMonth){
                		callback(formatDate(nowDate, true));
                	} else {
                		callback(formatDate(nowDate, false));
                	}
                	} else if (year == pastYear && month == pastMonth){
	                	callback(formatDate(29, true));
	                } else {
	            		callback(formatDate(29, false));
	            	}
                }
                else {
                	if (year == nowYear && month == nowMonth) {
                		if (year == pastYear && month == pastMonth){
	                		callback(formatDate(nowDate, true));
	                	} else {
	                		callback(formatDate(nowDate, false));
	                	}
                	} else if (year == pastYear && month == pastMonth){
	                	callback(formatDate(28, true));
	                } else {
	            		callback(formatDate(28, false));
	            	}
                }
            }
            else {
                throw new Error('month is illegal');
            }
	    };
	    this.zclassDate.addEventListener('click', function () {
	    	if (that.show) {
	    		var oneLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-year');
	    		var twoLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-month');
	    		var threeLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-date');
	    	} else {
		        var oneLevelId = that.zclassDate.getAttribute('data-year');
		        var twoLevelId = that.zclassDate.getAttribute('data-month');
		        var threeLevelId = that.zclassDate.getAttribute('data-date');
	    	}
	        this.iosSelect = new IosSelect(3, 
	            [yearData, monthData, dateData],
	            {
	                title: '设置时间',
	                itemHeight: 0.6786,
		            headerHeight:0.819,
		            relation: [1, 1, 0, 0],
		            deg: 25,
		        	translateZ: 1.5,
		            cssUnit:'rem',
		            itemShowCount: 7,
	                oneLevelId: oneLevelId,
	                twoLevelId: twoLevelId,
	                threeLevelId: threeLevelId,
	                showLoading: true,
	                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
	                    if (that.show) {
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-year', selectOneObj.id);
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-month', selectTwoObj.id);
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-date', selectThreeObj.id);
	                    	that.zclassDate.querySelector(that.show).innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '');
	                    } else {
		                    that.zclassDate.setAttribute('data-year', selectOneObj.id);
		                    that.zclassDate.setAttribute('data-month', selectTwoObj.id);
		                    that.zclassDate.setAttribute('data-date', selectThreeObj.id);
		                    that.zclassDate.innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '');
	                    }
	                    var obj = [selectOneObj, selectTwoObj, selectThreeObj]
	                    if (that.callfn) {
	                    	that.callfn(obj)
	                    }
	                }
	        });
	    }, false);
    }
	
	// 将对像暴露给window
	win['CXFun_gettoday'] = CXFun_gettoday;
})(window);
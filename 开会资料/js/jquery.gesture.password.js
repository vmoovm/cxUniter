
;
(function ($) {
    /**
     * @description 手势密码
     * @param {HTMLString} element 放canvas 的容器，可以为id，或者为className
     * @param {Object} options 键值对参数
     */
    var GesturePasswd= function (element, options) {
        this.$element = $(element);
        this.options = options;
        var that=this;
        this.pr = options.pointRadii;
        this.rr = options.roundRadii;
        this.o = options.space;
        this.color = options.color;
        this.lineColor = options.lineColor;
        this.circleColor = options.circleColor;
        this.rc = options.rightColor,
        this.rlc = options.rightLineColor,
        this.wc = options.wrongColor,
        this.wlc = options.wrongLineColor;
        this.flag = options.flag;
        this.isRem = options.isRem;
        this.isThrough = options.isThrough;
        this.definition = options.definition;
        this.lw = options.lineWidth;
        this.cLen = options.connectLen;
        
        if (this.isRem) {
        	//全局样式
	        this.$element.css({
	            "position":"relation",
	            "width":this.options.width/100 + 'rem',
	            "height":this.options.height/100 + 'rem',
	            "background-color":options.backgroundColor,
	            "overflow":"hidden",
	            "cursor":"default"
	        });
        } else {
	        //全局样式
	        this.$element.css({
	            "position":"relation",
	            "width":this.options.width*this.definition,
	            "height":this.options.height*this.definition,
	            "background-color":options.backgroundColor,
	            "overflow":"hidden",
	            "cursor":"default"
	        });
        }
        //选择器规范
        if(! $(element).attr("id"))
            $(element).attr("id",('abc' + (Math.floor(Math.random()*65535*10000))).toString());
        this.id="#"+$(element).attr("id");
		/**
		 * @description 记录点坐标,辅助生成数组对象坐标集合
		 * @param {Number} x 未划手势坐标x
		 * @param {Number} y 未划手势坐标y
		 * 
		 */
        var Point = function (x, y) {
            this.x  = x; this.y = y
        };
        this.result = "";
        this.pList = [];
        this.sList = [];
        this.tP = new Point(0,0);
        this.$element.append('<canvas class="main-c" width="'+options.width*this.definition+'" height="'+options.height*this.definition+'" >');
        this.$c = $(this.id+" .main-c")[0];
        this.$ctx = this.$c.getContext('2d');
		this.$ctx.scale(this.definition,this.definition);
		/**
		 * @description 初始化（未划手势状态）
		 * 
		 */
        this.initDraw=function() {
            this.$ctx.strokeStyle = this.color;
			this.$ctx.fillStyle = '#fff';
            this.$ctx.lineWidth = this.lw;
            for(var j=0; j<3;j++ ) {
                for(var i =0;i<3;i++) {
                    this.$ctx.moveTo(this.o/2+this.rr*2+i*(this.o+2*this.rr),this.o/2+this.rr+j*(this.o+2*this.rr));
                    this.$ctx.arc(this.o/2+this.rr+i*(this.o+2*this.rr),this.o/2+this.rr+j*(this.o+2*this.rr),this.rr,0,2*Math.PI);
                    var tem=new Point(this.o/2+this.rr+i*(this.o+2*this.rr),this.o/2+this.rr+j*(this.o+2*this.rr));
                    if (that.pList.length < 9)
                        this.pList.push(tem);
                }
            }
            this.$ctx.stroke();
			this.$ctx.fill();
            this.initImg=this.$ctx.getImageData(0,0,this.options.width*this.definition,this.options.height*this.definition);
        };
        this.initDraw();
        /**
		 * @description 手触坐标是否划到圆内
		 * @param {Number} x 用户手触当前x坐标
		 * @param {Number} y 用户手触当前y坐标
		 */
        this.isIn = function(x, y) {
            for (var p in that.pList) {
                if(( Math.pow((x-that.pList[p]["x"]),2)+Math.pow((y-that.pList[p]["y"]),2) ) < Math.pow(this.rr,2)) {
                    return that.pList[p];
                }
            }
            return 0;
        };
		/**
		 * @description 选中的圆点
		 * @param {String} c 字符串色值color
		 */
        this.pointDraw = function(c) {
            if (arguments.length>0) {
                that.$ctx.strokeStyle = c;
                that.$ctx.fillStyle = c;
            }
            for (var p in that.sList) {
                that.$ctx.moveTo(that.sList[p]["x"]+that.pr,that.sList[p]["y"]);
                that.$ctx.arc(that.sList[p]["x"],that.sList[p]["y"],that.pr,0,2*Math.PI);

                that.$ctx.fill();
            }
        };
		/**
		 * @description 选中时的线条包括圆点的边
		 * @param {String} c 字符串色值color
		 * @param {Number} w 线条宽度width
		 */
        this.lineDraw = function (c, w) {
            that.$ctx.beginPath();
            if (arguments.length>0) {
                that.$ctx.strokeStyle = c;
                that.$ctx.fillStyle = c;
                w = w ? w : this.lw;
                that.$ctx.lineWidth = w;
            }
            if(that.sList.length > 0) {
                for( var p in that.sList) {
                    if(p == 0) {
                        that.$ctx.moveTo(that.sList[p]["x"],that.sList[p]["y"]);
                        continue;
                    }
                    that.$ctx.lineTo(that.sList[p]["x"],that.sList[p]["y"]);
                }
            }
        };
		/**
		 * @description 描绘结果具体过程
		 * @param {String} c 圆圈及圆点结果色
		 * @param {Number} w 圆的粗细
		 */
        this.modifyLineColor = function(c,w) {
            if (arguments.length>0) {
                that.$ctx.strokeStyle = c;
                that.$ctx.fillStyle = c ;
            }
            for (var p in that.sList) {
                that.$ctx.beginPath();
                w = w ? w : this.lw;
                that.$ctx.lineWidth = w;
                that.$ctx.arc(that.sList[p]["x"],that.sList[p]["y"],that.rr,0,2*Math.PI);
                that.$ctx.stroke();
                that.$ctx.closePath();
                that.$ctx.moveTo(that.sList[p]["x"],that.sList[p]["y"]);
            }
        };
		/**
		 * @description 描绘结果
		 * @param {String} c 圆圈及圆点结果色
		 * @param {String} lc 线的结果色
		 */
        this.allDraw = function(c, lc) {
            if (arguments.length>0) {
            	this.pointDraw(c);
            	this.modifyLineColor(c);
            	this.lineDraw(lc, this.lw * this.definition);
                that.$ctx.stroke();
            } else {
                this.pointDraw();
                this.lineDraw();
            }
        };
		/**
		 * @description 仅为画线的具体操作
		 * @param {Number} x x坐标
		 * @param {Number} y y坐标
		 */
		this.drawLine = function(x, y) {
			that.$ctx.clearRect(0, 0 , that.options.width * that.definition, that.options.height * that.definition);
            that.$ctx.beginPath();
            that.$ctx.putImageData(this.initImg, 0 , 0);
            that.$ctx.lineWidth = that.lw * that.definition;
            that.lineDraw(that.lineColor, that.lw * that.definition);
            that.$ctx.lineTo(x, y);
            that.$ctx.stroke();
            that.$ctx.closePath();
		}
		/**
		 * @description 画线画圆整合方法
		 * @param {Number} x 画线的x坐标
		 * @param {Number} y 画线的y坐标
		 */
        this.draw = function(x, y) {
           that.drawLine(x, y);
           // that.$ctx.clearRect(0, 0, that.options.width * that.definition, that.options.height * that.definition);
            that.$ctx.beginPath();
            that.$ctx.lineWidth = that.lw * that.definition;

            that.pointDraw(that.circleColor);
            that.modifyLineColor(that.circleColor);
            that.$ctx.stroke();
            that.$ctx.closePath();
        };
		/**
		 * @description 将选中的点转化为数字
		 * @param {Array} poi 选中的点 
		 * @param {Array} list 所有点（选中和未选中的点） 
		 * @return {Number} 连续返回数字，最后返回 false
		 * 
		 */
        this.pointInList = function(poi, list) {
            for (var p in list) {
                if( poi["x"] == list[p]["x"] && poi["y"] == list[p]["y"]) {
                    return ++p;
                }
            }
            return false;
        };

        this.touched = false;
        $(this.id).on ("mousedown touchstart", {that:that},function(e) {
            if(that.flag) {
	            e.preventDefault();
	            e.data.that.touched = true;
            }
        });
        $(this.id).on ("mouseup touchend", {that:that}, function(e) {
            if (that.flag) {
	            e.data.that.touched = false;
	            that.$ctx.clearRect(0, 0, that.options.width*that.definition, that.options.height * that.definition);
	            that.$ctx.beginPath();
	            that.$ctx.putImageData(e.data.that.initImg, 0, 0);
	            that.allDraw(that.circleColor);
	            // that.$ctx.stroke();
	            for(var p in that.sList) {
	                if(e.data.that.pointInList(that.sList[p], e.data.that.pList)) {
	                	
	                    e.data.that.result = e.data.that.result+(e.data.that.pointInList(that.sList[p], e.data.that.pList)).toString();
	                }
	            }
	            // if (that.sList.length > that.cLen || that.cLen === false) {
	            	// $(element).trigger("hasPasswd",that.result);
	            // } else {
	            	// $(element).trigger("passwdLen");
	            // }
	            $(element).trigger("hasPasswd",that.result);
				that.flag = false;            	
            }
        });
        $(this.id).on('touchmove mousemove', {that:that}, function(e) {
            if(e.data.that.touched) {
                var x = e.pageX || e.originalEvent.targetTouches[0].pageX ;
                var y = e.pageY || e.originalEvent.targetTouches[0].pageY;
                x = x-that.$element.offset().left;
                y = y-that.$element.offset().top;
                if (e.data.that.isRem) {
	                var rw = $(this).width()/e.data.that.options.width;
	                var rh = $(this).height()/e.data.that.options.height;
	                var p = e.data.that.isIn(x/rw, y/rh);
                } else {
                	var p = e.data.that.isIn(x, y);
                	
                }
                /**
                 * @description 必经过的数字
                 * @param {Object} num:字符数字
                 */
                function throughNum(num) {
                	var result = '';
                	for(var p in that.sList) {
		                if(e.data.that.pointInList(that.sList[p], e.data.that.pList)) {
		                    result = result+(e.data.that.pointInList(that.sList[p], e.data.that.pList)).toString();
		                }
		            }
                	if(!new RegExp(num).test(result)) {
                		e.data.that.sList.splice((e.data.that.sList.length-1),0,e.data.that.pList[num-1]);
                	}
                }
                
                if(p != 0) {
                	console.log(e.data.that.sList);
                    if ( !e.data.that.pointInList(p,e.data.that.sList)) {
                    	console.log(e.data.that.pointInList(p,e.data.that.sList))
                        e.data.that.sList.push(p);
                        if (e.data.that.isThrough) {
	                        var len = e.data.that.pointInList(p,e.data.that.sList);
	                        if(e.data.that.sList.length>1) {
	                        	var cur_num = e.data.that.pointInList(e.data.that.sList[len-1], e.data.that.pList); // 当前数字
	                        	var prev_num = e.data.that.pointInList(e.data.that.sList[len-2], e.data.that.pList); // 上一个数字
		                        // 123必过2
		                        if((cur_num == 1 && prev_num == 3) || (cur_num == 3 && prev_num == 1)) {
		                        	throughNum('2');
		                        	
		                        // 147必过4
		                        } else if ((cur_num == 1 && prev_num == 7) || (cur_num == 7 && prev_num == 1)) {
		                        	throughNum('4');
		                        	
		                        // 159必过5
		                        } else if ((cur_num == 1 && prev_num == 9) || (cur_num == 9 && prev_num == 1)) {
		                        	throughNum('5');
		                        	
		                        // 258必过5
		                        } else if ((cur_num == 2 && prev_num == 8) || (cur_num == 8 && prev_num == 2)) {
		                        	throughNum('5');
		                        	
		                        // 369必过6
		                        } else if ((cur_num == 3 && prev_num == 9) || (cur_num == 9 && prev_num == 3)) {
		                        	throughNum('6');
		                        	
		                        // 357必过5
		                        } else if ((cur_num == 3 && prev_num == 7) || (cur_num == 7 && prev_num == 3)) {
		                        	throughNum('5');
		                        	
		                        // 456必过5
		                        } else if ((cur_num == 4 && prev_num == 6) || (cur_num == 6 && prev_num == 4)) {
		                        	throughNum('5');
		                        	
		                        // 789必过8
		                        } else if ((cur_num == 7 && prev_num == 9) || (cur_num == 9 && prev_num == 7)) {
		                        	throughNum('8');
		                        }
	                        }
                        }
                    }    
                }
                if (e.data.that.isRem) {
	                e.data.that.draw(x/rw, y/rh);
                } else  {
                	e.data.that.draw(x, y);
                }
            }
        });
		
		/**
         * @description 画完后的初始化
         * @param {Object} color:16进制颜色值或者rgba色值
         * 
         */
        function reset(color,qc) {
        	that.$ctx.clearRect(0,0,that.options.width*that.definition,that.options.height*that.definition);
            that.$ctx.beginPath();
            that.$ctx.putImageData(that.initImg,0,0);
            that.allDraw(color,qc);
            that.result = "";
            that.pList = [];
            that.sList = [];
        }
		
		// 自定义颜色
		$(this.id).on('default',{that:that}, function(e, color1, color2) {
            reset(color1, color2);
        });
		
		// 完成设置
		$(this.id).on('complete',{that:that}, function() {
            reset(that.circleColor, that.lineColor);
        });
        
		// 读值绘制
		$(this.id).on('read',{that:that}, function(e, v) {
            var str = v.toString();
            for (var s = 0; s < str.length; s++) {
            	that.sList.push(that.pList[str[s]-1]);
            }
            reset(that.circleColor, that.lineColor);
            that.flag = false;
        });
        
		// 禁止划动
		$(this.id).on('noSwiper',{that:that}, function() {
            reset('rgba(153, 153, 153, 1)', 'rgba(153, 153, 153, .5)');
        });
		
		// 错误事件
        $(this.id).on('passwdWrong',{that:that}, function() {
			reset(that.wc,that.wlc);
			setTimeout(function() {
                that.$ctx.clearRect(0,0,that.options.width*that.definition,that.options.height*that.definition);
                that.$ctx.beginPath();
                that.initDraw()
                $(element).trigger("rebuild",function() {});
            },500)
        });
        
		// 密码太短（暂时没有使用）
        // $(this.id).on('passwdLen',{that:that}, function() {
            // $(element).trigger("passwdWrong",function() {
            	// alert('密码太短')
            // });
        // });
        
        // 正确事件
        $(this.id).on('passwdRight',{that:that}, function() {
            reset(that.rc,that.rlc);
        });
        
        // 允许重设
        $(this.id).on('rebuild',{that:that}, function() {
			that.flag = true;
			setTimeout(function() {
                that.$ctx.clearRect(0,0,that.options.width*that.definition,that.options.height*that.definition);
                that.$ctx.beginPath();
                that.initDraw()
            },500)
        });
    };

	/**
	 * @description 手势初始化参数
	 */
    GesturePasswd.DEFAULTS = {
        zindex: 100, 	//整个组件的css z-index属性
        roundRadii: 25,	//大圆点的半径
        pointRadii: 6,	//大圆点被选中时显示的圆心的半径
        space: 30, 	//大圆点之间的间隙
        width: 240,		//整个组件的宽度
        height: 240,		//整个组件的高度
        lineColor: "rgba(0, 153, 255, .5)",	// 用户划出线条的颜色
        circleColor: "rgba(0, 153, 255, 1)",	// 用户划出线条的颜色
        backgroundColor: "#252736",	//背景色
        color: "#999",	//圆圈颜色（主要的控件颜色）
        rightColor: "rgba(102,179,78,1)", 	// 正确颜色
        rightLineColor: "rgba(102,179,78,.5)", 	// 正确线的颜色
        wrongColor: "rgba(235,103,89,1)", 	// 错误颜色
        wrongLineColor: "rgba(235,103,89,.5)", 	// 错误线的颜色
        flag: true,  	// 是否允许重画 或者禁止手势
        isRem: false, 	// 是否使用rem（默认比例750/100
        isThrough: true, 	// 是否自动连接两点之间的空白点
        definition: 2, 	// 清晰度,越大越清晰，但线条会变的更细
        lineWidth: 3, 	// 线条粗细基数
        connectLen: 3 	// 连接点的个数  false不限制个数
    };

				
	/**
	 * @description 插件初始化
	 * @param {Object} option
	 * @param {Object} arg
	 */
    function Plugin(option,arg) {
        return this.each(function () {
            var $this   = $(this);
            var options = $.extend({}, GesturePasswd.DEFAULTS, typeof option == 'object' && option);
            var data    = $this.data('GesturePasswd');
            var action  = typeof option == 'string' ? option : NaN;
            if (!data) $this.data('danmu', (data = new GesturePasswd(this, options)));
            if (action)	data[action](arg);
        });
    }

    $.fn.GesturePasswd             = Plugin;
    $.fn.GesturePasswd.Constructor = GesturePasswd;

})(jQuery);

// 学习终端占比
// echarts_xue_xi_zhong_duan_zhan_bi
var myChart_xue_xi_zhong_duan_zhan_bi = echarts.init(document.getElementById('echarts_xue_xi_zhong_duan_zhan_bi'), 'cx_echarts_vintage');
var option_xue_xi_zhong_duan_zhan_bi = {
    title : {
    	show: false
    },
    tooltip : {
        trigger: 'item',
        showDelay: 0,  
        hideDelay: 0,  
        transitionDuration:0,   
        backgroundColor : 'rgba(52, 164, 255, .8)',  
        borderColor : 'rgba(52, 164, 255, 1)',  
        borderRadius : 6,  
        borderWidth: 1,  
        padding: 10,    // [5, 10, 15, 20] 
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : '2%',
        y : '2%',
        x2 : '2%',
        y2 : '2%',
        show: false,
        data:['pc占比','Android占比','ios占比']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius: ['50%', '90%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data:[
                {value:10, name:'pc占比'},
                {value:5, name:'Android占比'},
                {value:15, name:'ios占比'}
            ]
        }
    ]
};

myChart_xue_xi_zhong_duan_zhan_bi.setOption(option_xue_xi_zhong_duan_zhan_bi);

// 完成课堂活动
// echarts_wan_cheng_ke_tang_huo_dong
var myChart_wan_cheng_ke_tang_huo_dong = echarts.init(document.getElementById('echarts_wan_cheng_ke_tang_huo_dong'), 'cx_echarts_vintage');

var option_wan_cheng_ke_tang_huo_dong = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        showDelay: 0,  
        hideDelay: 0,  
        transitionDuration:0,   
        backgroundColor : 'rgba(52, 164, 255, .8)',  
        borderColor : 'rgba(52, 164, 255, 1)',  
        borderRadius : 6,  
        borderWidth: 1,  
        padding: 10    // [5, 10, 15, 20] 
    },
    grid: {
        x: 20,
        y: 5,
        x2: 30,
        y2: 5,
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
            	formatter: function(params){
				    var newParamsName = "";// 最终拼接成的字符串
				    var paramsNameNumber = params.length;// 实际标签的个数
				    var provideNumber = 2;// 每行能显示的字的个数
				    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
				    /**
				     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
				     */
				    // 条件等同于rowNumber>1
				    if (paramsNameNumber > provideNumber) {
				        /** 循环每一行,p表示行 */
				        for (var p = 0; p < rowNumber; p++) {
				            var tempStr = "";// 表示每一次截取的字符串
				            var start = p * provideNumber;// 开始截取的位置
				            var end = start + provideNumber;// 结束截取的位置
				            // 此处特殊处理最后一行的索引值
				            if (p == rowNumber - 1) {
				                // 最后一次不换行
				                tempStr = params.substring(start, paramsNameNumber);
				            } else {
				                // 每一次拼接字符串并换行
				                tempStr = params.substring(start, end) + "\n";
				            }
				            newParamsName += tempStr;// 最终拼成的字符串
				        }
				    } else {
				        // 将旧标签的值赋给新标签
				        newParamsName = params;
				    }
				    //将最终的字符串返回
				    return newParamsName
				}
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 1, color: '#188df0'}
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '30%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

myChart_wan_cheng_ke_tang_huo_dong.setOption(option_wan_cheng_ke_tang_huo_dong);

// 课下作业完成情况
// echarts_ke_xia_zuo_ye_wan_cheng
var myChart_ke_xia_zuo_ye_wan_cheng = echarts.init(document.getElementById('echarts_ke_xia_zuo_ye_wan_cheng'), 'cx_echarts_vintage');

var option_ke_xia_zuo_ye_wan_cheng = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        showDelay: 0,  
        hideDelay: 0,  
        transitionDuration:0,   
        backgroundColor : 'rgba(52, 164, 255, .8)',  
        borderColor : 'rgba(52, 164, 255, 1)',  
        borderRadius : 6,  
        borderWidth: 1,  
        padding: 10    // [5, 10, 15, 20] 
    },
    grid: {
        x: 20,
        y: 5,
        x2: 30,
        y2: 5,
        containLabel: true
    },
    xAxis : [
        {
        	type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#188df0'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    ),
                    barBorderRadius:[1, 20, 20, 1]
                }
            },
            barWidth: '30%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

myChart_ke_xia_zuo_ye_wan_cheng.setOption(option_ke_xia_zuo_ye_wan_cheng);



// 访问量趋势（近24h）
// echarts_fang_wen_liang_qu_shi
var myChart_fang_wen_liang_qu_shi = echarts.init(document.getElementById('echarts_fang_wen_liang_qu_shi'), 'cx_echarts_vintage');

var a = ["16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]
var b = [2650, 2212, 1536, 1501, 1418, 1362, 1524, 1060, 689, 417, 238, 222, 232, 316, 689, 1180, 2040, 4001, 5644, 2992, 1612, 2092, 2697, 530]

var option_fang_wen_liang_qu_shi = {
    animation: false,
    title: {
        show: false
    },
    legend: {
        x: 0,
        y: 5,
        x2: 0,
        y2: 5,
        show: false
    },
    tooltip : {//鼠标悬浮弹窗提示  
       /*  trigger: 'axis' */  
        trigger : 'item',  
        show:true,  
        showDelay: 0,  
        hideDelay: 0,  
        transitionDuration:0,   
        backgroundColor : 'rgba(52, 164, 255, .8)',  
        borderColor : 'rgba(52, 164, 255, 1)',  
        borderRadius : 6,  
        borderWidth: 1,  
        padding: 10    // [5, 10, 15, 20]  
    },  
    toolbox: {
        left: 'center',
        itemSize: 25,
        top: 55
    },
    xAxis: {
        name: 'x',
        type: 'category',
        // boundaryGap: [0, 0],
        axisPointer: {
            value: '2016-10-7',
            snap: false,
            lineStyle: {
                color: 'rgba(52, 164, 255, .3)',
                opacity: 0.5,
                width: 1
            },
            label: {
                show: false,
                formatter: function (params) {
                    return ('时间（h）：'+ params.value);
                },
                backgroundColor: 'rgba(52, 164, 255, .3)'
            },
            handle: {
                show: true,
                color: 'rgba(52, 164, 255, .3)'
            }
        },
        splitLine: {
            show: false
        },
        data: a
    },
    yAxis: {
        name: 'y',
        type: 'value',
        // axisTick: {
            // inside: true
        // },
        // splitLine: {
            // show: false
        // },
        axisLine: {
        	show: false
        },
        axisLabel: {
            inside: true,
            formatter: '{value}\n'
        },
        z: 10
    },
    grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 40
    },
    series: [
        {
            name:'模拟数据',
            type:'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            sampling: 'average',
            lineStyle: {
            	width: 3
            },
            itemStyle: {
                normal: {
                    color: 'rgba(50, 161, 238, 1)',
                    shadowColor: 'rgba(50, 161, 238, .3)',
                    shadowOffsetY: 1,
                    shadowOffsetX: 1
                }
            },
            markLine: {
            	lineStyle: {
            		width: 0
            	}
            },
            stack: 'a',
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(52, 164, 255, .1)'
                    }, {
                        offset: 1,
                        color: 'rgba(52, 164, 255, .1)'
                    }])
                }
            },
            data: b
        }
    ]
};


myChart_fang_wen_liang_qu_shi.setOption(option_fang_wen_liang_qu_shi);
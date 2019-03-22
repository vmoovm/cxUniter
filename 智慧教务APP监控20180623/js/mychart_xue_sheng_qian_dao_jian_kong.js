// 学生签到整体趋势图
// echarts_zheng_ti_qu_shi
var myChart_zheng_ti_qu_shi = echarts.init(document.getElementById('echarts_zheng_ti_qu_shi'), 'cx_echarts_vintage');

var base = +new Date(2016, 9, 3);
var oneDay = 24 * 3600 * 1000;
var valueBase = Math.random() * 300;
var data = [];

for (var i = 1; i < 10; i++) {
    var now = new Date(base += oneDay);
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');

    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
    valueBase <= 0 && (valueBase = Math.random() * 300);
    data.push([dayStr, valueBase]);
}

var option_zheng_ti_qu_shi = {
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
    tooltip: {
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
        type: 'time',
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
                    return echarts.format.formatTime('yyyy-MM-dd', params.value);
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
        }
    },
    yAxis: {
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
    dataZoom: [{
        type: 'inside',
        throttle: 50
    }],
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
            data: data
        }
    ]
};


myChart_zheng_ti_qu_shi.setOption(option_zheng_ti_qu_shi);


// 课程类型出勤分析
// echarts_ke_cheng_lei_xing
var myChart_ke_cheng_lei_xing = echarts.init(document.getElementById('echarts_ke_cheng_lei_xing'), 'cx_echarts_vintage');

var base = +new Date(2016, 9, 3);
var oneDay = 24 * 3600 * 1000;
var valueBase3 = Math.random() * 300;
var valueBase4 = Math.random() * 50;
var data3 = [];
var data4 = [];

for (var i = 1; i < 10; i++) {
    var now = new Date(base += oneDay);
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');

    valueBase3 = Math.round((Math.random() - 0.5) * 20 + valueBase3);
    valueBase3 <= 0 && (valueBase3 = Math.random() * 300);
    data3.push([dayStr, valueBase3]);

    valueBase4 = Math.round((Math.random() - 0.5) * 20 + valueBase4);
    valueBase4 <= 0 && (valueBase4 = Math.random() * 50);
    data4.push([dayStr, valueBase4]);
}

var option_ke_cheng_lei_xing = {
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
    tooltip: {
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
        type: 'time',
        // boundaryGap: [0, 0],
        axisPointer: {
            value: '2016-10-7',
            snap: false,
            lineStyle: {
                color: 'rgba(52, 164, 255, .4)',
                opacity: 0.5,
                width: 1
            },
            label: {
                show: false,
                formatter: function (params) {
                    return echarts.format.formatTime('yyyy-MM-dd', params.value);
                },
                backgroundColor: 'rgba(52, 164, 255, .4)'
            },
            handle: {
                show: true,
                color: 'rgba(52, 164, 255, .4)'
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
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
    dataZoom: [{
        type: 'inside',
        throttle: 50
    }],
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
            // markLine: {
            	// lineStyle: {
            		// width: 0
            	// }
            // },
            // stack: 'a',
            // areaStyle: {
                // normal: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        // offset: 0,
                        // color: '#8ec6ad'
                    // }, {
                        // offset: 1,
                        // color: '#8ec6ad'
                    // }])
                // }
            // },
            data: data3
        },
        {
            name:'模拟数据',
            type:'line',
            smooth:true,
            stack: 'a',
            symbol: 'circle',
            symbolSize: 6,
            sampling: 'average',
            lineStyle: {
            	width: 3
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255, 136, 89, 1)',
                    shadowColor: 'rgba(255, 136, 89, .3)',
                    shadowOffsetY: 1,
                    shadowOffsetX: 1
                }
            },
            // areaStyle: {
                // normal: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        // offset: 0,
                        // color: '#d68262'
                    // }, {
                        // offset: 1,
                        // color: '#ffe'
                    // }])
                // }
            // },
            data: data4
        }
    ]
};


myChart_ke_cheng_lei_xing.setOption(option_ke_cheng_lei_xing);

// 不同年级出勤分析
// echarts_bu_tong_nian_ji
var myChart_bu_tong_nian_ji = echarts.init(document.getElementById('echarts_bu_tong_nian_ji'), 'cx_echarts_vintage');

var option_bu_tong_nian_ji = {
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
            data : ['3月', '4月', '5月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            axisLine: {
            	show: false
            }
        }
    ],
    series : [
        {
            name:'直接访问1',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          	{offset: 0, color: '#51b1ff'},
                            {offset: 1, color: '#35a4ff'}
                            
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '10%',
            barMaxWidth: '10%', //最大宽度
            data:[110, 52, 200]
        },
        {
            name:'直接访问2',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        	{offset: 0, color: '#f0a3a3'},
                          	{offset: 1, color: '#ee9797'}
                            
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '10%',
            barMaxWidth: '10%', //最大宽度
            data:[10, 82, 334]
        },
        {
            name:'直接访问3',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#6fcdb7'},
                            {offset: 1, color: '#69cbb3'}
                            
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '10%',
            barMaxWidth: '10%', //最大宽度
            data:[10, 72, 200]
        },
        {
            name:'直接访问4',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#fee9bc'},
                            {offset: 1, color: '#f9c244'}
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '10%',
            barMaxWidth: '10%', //最大宽度
            data:[10, 52, 120]
        }
    ]
};

myChart_bu_tong_nian_ji.setOption(option_bu_tong_nian_ji);

// 各院系课程类型出勤分析
// echarts_ge_yuan_xi_ke_cheng
var myChart_ge_yuan_xi_ke_cheng = echarts.init(document.getElementById('echarts_ge_yuan_xi_ke_cheng'), 'cx_echarts_vintage');

var option_ge_yuan_xi_ke_cheng = {
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

myChart_ge_yuan_xi_ke_cheng.setOption(option_ge_yuan_xi_ke_cheng);

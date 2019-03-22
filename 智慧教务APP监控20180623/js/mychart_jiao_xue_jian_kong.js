// 老师上课情况
// echarts_xue_xi_zhong_duan_zhan_bi
var myChart_lao_shi_shang_ke = echarts.init(document.getElementById('echarts_lao_shi_shang_ke'), 'cx_echarts_vintage');
var option_lao_shi_shang_ke = {
    title : {
    	show: false
    },
    tooltip : {
        trigger: 'item',
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
        padding: 10,    // [5, 10, 15, 20] 
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : '2%',
        y : '2%',
        x2 : '2%',
        y2 : '2%',
        show: false,
        data:['未上课老师','上课老师','异常数']
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius: ['50%', '90%'],
            roseType : 'radius',
            startAngle: 30, 
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'未上课老师'},
                {value:8, name:'上课老师'},
                {value:3, name:'异常数'},
            ]
        }
    ]
};

myChart_lao_shi_shang_ke.setOption(option_lao_shi_shang_ke);

// 课堂活动发放情况
// echarts_ke_tang_huo_dong_fa_fang
var myChart_ke_tang_huo_dong_fa_fang = echarts.init(document.getElementById('echarts_ke_tang_huo_dong_fa_fang'), 'cx_echarts_vintage');

var option_ke_tang_huo_dong_fa_fang = {
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
            type : 'value',
            axisLine: {
            	show: false
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
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#8fcdfc'},
                            {offset: 0.8, color: '#36a5ff'},
                            {offset: 1, color: '#36a5ff'}
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '30%',
            data:[10, 52, 200, 334, 390, 330, 220]
        },
        {
            name:'直接访问',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#f5f5f5'},
                            {offset: 0.8, color: '#d2d2d2'},
                            {offset: 1, color: '#d2d2d2'}
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

myChart_ke_tang_huo_dong_fa_fang.setOption(option_ke_tang_huo_dong_fa_fang);


// 课下作业布置情况
// echarts_ke_xia_zuo_ye_bu_zhi
var myChart_ke_xia_zuo_ye_bu_zhi = echarts.init(document.getElementById('echarts_ke_xia_zuo_ye_bu_zhi'), 'cx_echarts_vintage');

var option_ke_xia_zuo_ye_bu_zhi = {
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
        x: 10,
        y: 25,
        x2: 30,
        y2: 5,
        containLabel: true
    },
    xAxis : [
	    {
	        type : 'category',
	        data : ['发布作业', '测验', '考试情况'],
	        axisTick: {
	            alignWithLabel: true
	        },
	        axisLine: {show: false}
	        
	    }
    ],
    yAxis : [
	    {
	    	type : 'value',
	    	show:false,
	    	axisLine: {show: false},
	    }
    ],
    series : [
        {
            name:'48adff',
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    color: '#48adff',
                    label : {show: true, position: 'top', fontSize: 14}
                }
            },
            data:[10, 52, 200]
        },
        {
            name:'直接访问',
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    color: '#d2d2d2',
                    label : {show: true, position: 'top', fontSize: 14}
                }
            },
            data:[390, 330, 220]
        }
    ]
};

myChart_ke_xia_zuo_ye_bu_zhi.setOption(option_ke_xia_zuo_ye_bu_zhi);

// 课下作业批阅情况
// echarts_ke_xia_zuo_ye_pi_yue
var mychart_ke_xia_zuo_ye_pi_yue = echarts.init(document.getElementById('echarts_ke_xia_zuo_ye_pi_yue'), 'cx_echarts_vintage');

var option_ke_xia_zuo_ye_pi_yue = {
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
        y: 25,
        x2: 30,
        y2: 5,
        containLabel: true
    },
    xAxis : [
	    {
	        type : 'category',
	        data : ['发布作业', '测验', '考试情况'],
	        axisTick: {
	            alignWithLabel: true
	        }
	    }
    ],
    yAxis : [
	    {
	    	type : 'value',
	    	show: false
	    }
    ],
    series : [
        {
            name:'48adff',
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    color: '#48adff',
                    label : {show: true, position: 'top', fontSize: 14}
                }
            },
            data:[10, 52, 200]
        },
        {
            name:'直接访问',
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    color: '#d2d2d2',
                    label : {show: true, position: 'top', fontSize: 14}
                }
            },
            data:[390, 330, 220]
        }
    ]
};

mychart_ke_xia_zuo_ye_pi_yue.setOption(option_ke_xia_zuo_ye_pi_yue);



// 本周访问量趋势图
// echarts_ben_zhou_fang_wen_liang
var myChart_ben_zhou_fang_wen_liang = echarts.init(document.getElementById('echarts_ben_zhou_fang_wen_liang'), 'cx_echarts_vintage');

var option_ben_zhou_fang_wen_liang = {
    // color: ['#3398DB'],
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
            type : 'value',
            axisLine: {show: false}
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
                            {offset: 0, color: '#8fcdfc'},
                            {offset: 0.8, color: '#36a5ff'},
                            {offset: 1, color: '#36a5ff'}
                        ]
                    ),
                    barBorderRadius:[20, 20, 1, 1]
                }
            },
            barWidth: '30%',
            data:[10, 52, 200, 334, 390, 330, 220]
        },
        {
            name:'直接访问',
            type:'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#fee9bc'},
                            {offset: 0.8, color: '#f9c651'},
                            {offset: 1, color: '#f9c244'}
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

myChart_ben_zhou_fang_wen_liang.setOption(option_ben_zhou_fang_wen_liang);


// 今日教师、学生讨论数对比
// echarts_jiao_shi_xue_sheng_ping_lun_shu
var myChart_jiao_shi_xue_sheng_ping_lun_shu = echarts.init(document.getElementById('echarts_jiao_shi_xue_sheng_ping_lun_shu'), 'cx_echarts_vintage');
option_jiao_shi_xue_sheng_ping_lun_shu = {
    tooltip: {
        trigger: 'item',
        showDelay: 0,  
        hideDelay: 0,  
        transitionDuration:0,   
        backgroundColor : 'rgba(52, 164, 255, .8)',  
        borderColor : 'rgba(52, 164, 255, 1)',  
        borderRadius : 6,  
        borderWidth: 1,  
        padding: 10,    // [5, 10, 15, 20] 
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show: false,
        data:['老师发帖数','学生回帖数','学生发帖数','老师回帖数']
    },
    color: ['rgba(0, 153, 255, 1)', 'rgba(249, 190, 32, 1)', 'rgba(0, 153, 255, .6)', 'rgba(249, 190, 32, .6)'],
    series: [
        {
            name:'学习通统计',
            type:'pie',
            selectedMode: 'multiple',
            radius: [0, '50%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:135, name:'老师发帖数'},
                {value:1048, name:'老师回帖数'}
            ]
        },
        {
            name:'学习通统计',
            type:'pie',
            radius: ['50.5%', '90%'],
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {peeeee|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#ff0000',
                    // borderWidth: 1,
                    show: false,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#333',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#f00',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                        	color: '#0f0',
                            fontSize: 16,
                            lineHeight: 33
                        },
                        peeeee: {
                            color: '#eee',
                            backgroundColor: '#cc00af',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:379, name:'学生发帖数'},
                {value:635, name:'学生回帖数'}
            ]
        }
    ]
};

myChart_jiao_shi_xue_sheng_ping_lun_shu.setOption(option_jiao_shi_xue_sheng_ping_lun_shu);
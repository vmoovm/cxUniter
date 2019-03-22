// echarts_zi_yuan_fen_lei
// 资源分类图
var myChart_zi_yuan_fen_lei = echarts.init(document.getElementById('echarts_zi_yuan_fen_lei'), 'cx_echarts_vintage');

var option_zi_yuan_fen_lei = {
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
        orient: 'vertical',
        x: 'left',
        show: false,
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

myChart_zi_yuan_fen_lei.setOption(option_zi_yuan_fen_lei);

// 课程资源排名
// echarts_ke_cheng_zi_yuan_pai_ming
var myChart_ke_cheng_zi_yuan_pai_ming = echarts.init(document.getElementById('echarts_ke_cheng_zi_yuan_pai_ming'), 'cx_echarts_vintage');

var option_ke_cheng_zi_yuan_pai_ming = {
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

myChart_ke_cheng_zi_yuan_pai_ming.setOption(option_ke_cheng_zi_yuan_pai_ming);
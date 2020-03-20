
var historydata = threedata_recviced;
var dom = document.getElementById("fenxi1");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    title: {
        text: '',
        textStyle: {
            color: '#000',
            fontSize: 18,

        },


        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            },

        },
        x: 'left',
        textStyle: {
            fontSize: 14
        }

    },
    legend: {
        data: ['确诊数量', '疑似数量', '死亡数量', '治愈数量', '疑似增量'],
          // x: 'right',
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    grid: {
        left: '6%',
        right: '6%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: [historydata[6].date.replace("2020-","").replace("2020-",""), historydata[5].date.replace("2020-",""), historydata[4].date.replace("2020-",""), historydata[3].date.replace("2020-",""), historydata[2].date.replace("2020-",""), historydata[1].date.replace("2020-",""), historydata[0].date.replace("2020-","")],
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {

                formatter: function () {

                    return "";

                },
            },
        },

    ],
    series: [
        {
            name: '确诊数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [historydata[6].confirmedNum, historydata[5].confirmedNum, historydata[4].confirmedNum, historydata[3].confirmedNum, historydata[2].confirmedNum, historydata[1].confirmedNum, historydata[0].confirmedNum],

        },
        {
            name: '疑似数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [historydata[6].suspectedNum, historydata[5].suspectedNum, historydata[4].suspectedNum, historydata[3].suspectedNum, historydata[2].suspectedNum, historydata[1].suspectedNum, historydata[0].suspectedNum],

        },
        {
            name: '死亡数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [historydata[6].deathsNum, historydata[5].deathsNum, historydata[4].deathsNum, historydata[3].deathsNum, historydata[2].deathsNum, historydata[1].deathsNum, historydata[0].deathsNum],

        },
        {
            name: '治愈数量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [historydata[6].curesNum, historydata[5].curesNum, historydata[4].curesNum, historydata[3].curesNum, historydata[2].curesNum, historydata[1].curesNum, historydata[0].curesNum],

        },
        {
            name: '疑似增量',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [historydata[6].suspectedIncr, historydata[5].suspectedIncr, historydata[4].suspectedIncr, historydata[3].suspectedIncr, historydata[2].suspectedIncr, historydata[1].suspectedIncr, historydata[0].suspectedIncr],

        }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}


// $(".lunbotu").each(function () {
//     var overalltemp=overall.hbFeiHbTrendChart[j];
//
//     var urlurl=overalltemp["imgUrl"];
//
//     $(this).attr('src',urlurl);
//     j = j + 1;
//
// });
//
//
// var k=0;
// $(".carousel-caption").each(function () {
//     var overalltemp=overall.hbFeiHbTrendChart[k];
//
//     var tit=overalltemp["title"];
//
//     $(this).html(tit);
//     k = k + 1;
//
// });


setInterval(function () {
    document.getElementById("time").innerHTML = new Date().toLocaleString();
}, 1000)
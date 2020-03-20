console.log(threedata_recviced)
var historydata = threedata_recviced;
var dom3 = document.getElementById("fenxi3");
var myChart3 = echarts.init(dom3);

var xData = [historydata[9].date.replace("2020-",""),historydata[8].date.replace("2020-",""),historydata[7].date.replace("2020-",""),historydata[6].date.replace("2020-",""), historydata[5].date.replace("2020-",""), historydata[4].date.replace("2020-",""), historydata[3].date.replace("2020-",""), historydata[2].date.replace("2020-",""), historydata[1].date.replace("2020-",""), historydata[0].date.replace("2020-","")],


    option = {
        backgroundColor: "#344b58",
        "title": {
            "text": "确诊与疑似",

            x: "4%",

            textStyle: {
                color: '#fff',
                fontSize: '22'
            },
            subtextStyle: {
                color: '#90979c',
                fontSize: '16',

            },
        },
        "tooltip": {
            "trigger": "axis",
            "axisPointer": {
                "type": "shadow",
                textStyle: {
                    color: "#fff"
                }

            },
        },
        "grid": {
            "borderWidth": 0,
            "top": 110,
            "bottom": 95,
            textStyle: {
                color: "#fff"
            }
        },
        "legend": {
            x: '4%',
            top: '8%',
            textStyle: {
                color: '#90979c',
            },
            "data": ['疑似', '确诊', '总数']
        },


        "calculable": true,
        "xAxis": [{
            "type": "category",
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "splitLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "data": xData,
        }],
        "yAxis": [{
            "type": "value",
            "splitLine": {
                "show": false
            },
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "axisTick": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "splitArea": {
                "show": false
            },

        }],
        "dataZoom": [{
            "show": true,
            "height": 30,
            "xAxisIndex": [
                0
            ],
            bottom: 30,
            "start": 30,
            "end": 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c"


        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 30,
            "end": 100
        }],
        "series": [{
            "name": "疑似",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 35,
            "barGap": "10%",
            "itemStyle": {
                "normal": {
                    "color": "rgba(255,144,128,1)",
                    "label": {
                        "show": true,
                        "textStyle": {
                            "color": "#fff"
                        },
                        "position": "inside",
                        formatter: function (p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": [historydata[9].suspectedNum, historydata[8].suspectedNum,historydata[7].suspectedNum, historydata[6].suspectedNum, historydata[5].suspectedNum, historydata[4].suspectedNum, historydata[3].suspectedNum, historydata[2].suspectedNum, historydata[1].suspectedNum, historydata[0].suspectedNum],

        },

            {
                "name": "确诊",
                "type": "bar",
                "stack": "总量",
                "itemStyle": {
                    "normal": {
                        "color": "rgba(0,191,183,1)",
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "inside",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": [historydata[9].confirmedNum, historydata[8].confirmedNum, historydata[7].confirmedNum, historydata[6].confirmedNum, historydata[5].confirmedNum, historydata[4].confirmedNum, historydata[3].confirmedNum, historydata[2].confirmedNum, historydata[1].confirmedNum, historydata[0].confirmedNum],


            }, {
                "name": "总数",
                "type": "line",
                symbolSize: 10,
                symbol: 'circle',
                "itemStyle": {
                    "normal": {
                        "color": "rgba(252,230,48,1)",
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": [
                    historydata[9].suspectedNum + historydata[6].confirmedNum,
                    historydata[8].suspectedNum + historydata[6].confirmedNum,
                    historydata[7].suspectedNum + historydata[6].confirmedNum,
                    historydata[6].suspectedNum + historydata[6].confirmedNum,
                    historydata[5].suspectedNum + historydata[5].confirmedNum,
                    historydata[4].suspectedNum + historydata[4].confirmedNum,
                    historydata[3].suspectedNum + historydata[3].confirmedNum,
                    historydata[2].suspectedNum + historydata[2].confirmedNum,
                    historydata[1].suspectedNum + historydata[1].confirmedNum,
                    historydata[0].suspectedNum + historydata[0].confirmedNum,
                ]
            },
        ]
    }

if (option && typeof option === "object") {
    myChart3.setOption(option, true);
}

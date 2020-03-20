// var quezh = 887;
var quezh = quanguo.confirmedCount;
var xiancun=quanguo.currentConfirmedCount
var yisi = quanguo.suspectedCount;
var zhzh = quanguo.seriousCount;
var siwang = quanguo.deadCount;
var zhiyu = quanguo.curedCount;


var quezhzengjia = quanguo.confirmedIncr;
var xiancunquezh=quanguo.currentConfirmedIncr
var yisizengjia = quanguo.suspectedIncr;
var zhiyuzengjia = quanguo.curedIncr;
var siwangzengjia = quanguo.deadIncr;
var zhzhzengjia = quanguo.seriousIncr;


var shuzu = [quezh,yisi,zhzh,siwang,zhiyu];
var shuzu2 = [quezhzengjia,yisizengjia,zhzhzengjia,siwangzengjia,zhiyuzengjia]

var jjj = 0;
$("#shouyeshuju .renshu").each(function () {

    $(this).html(shuzu[jjj])
    jjj = jjj + 1;

});


var kkk = 0;
$("#shouyeshuju .zj").each(function () {

    $(this).html(shuzu2[kkk])
    kkk = kkk + 1;

});
var yuanshishuju = singledata;


// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('container2'));

// 指定图表的配置项和数据
var option2 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['确诊','疑似','治愈','重症','死亡']
    },
    series: [{
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0,'30%'],

        label: {
            position: 'inner'
        },
        labelLine: {
            show: false
        },
        data: [{
            value: yisi,
            name: '疑似',

        },
            {
                value: quezh,
                name: '确诊'
            },

        ]
    },
        {
            name: '',
            type: 'pie',
            radius: ['40%','55%'],
            label: {
                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                // formatter: '{b|{b}：}{c}  {per|{d}%}  ',

                backgroundColor: 'white',
                // borderColor: '#aaa',
                // borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {

                    b: {
                        fontSize: 16,
                        lineHeight: 16
                    },
                    per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2,2],
                        borderRadius: 2
                    }
                }
            },
            data: [{
                value: quezh,
                name: '确诊'
            },
                {
                    value: yisi,
                    name: '疑似'
                },
                {
                    value: zhiyu,
                    name: '治愈'
                },
                {
                    value: zhzh,
                    name: '重症'
                },

                {
                    value: siwang,
                    name: '死亡'
                },

            ]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);


var dom1 = document.getElementById("container1");
var myChart1 = echarts.init(dom1);
var app = {};
option1 = null;

var name_title = "新型冠状病毒疫情实时监控图"
var subname = ''
var nameColor = "red"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 15
var mapName = 'china'


var yuanshishuju22222 = [];

for (var ii = 0; ii < yuanshishuju.length; ii++) {
    var a = yuanshishuju[ii].name;
    if (a) {
        yuanshishuju22222.push({
            name: yuanshishuju[ii].name,
            value: yuanshishuju[ii].value[0].value,
        });
    }
}


var data = yuanshishuju22222;

var geoCoordMap = {};
var toolTipData = yuanshishuju;

/*获取地图数据*/
myChart1.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart1.hideLoading();
mapFeatures.forEach(function (v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    // geoCoordMap[name] = v.properties.cp;
    geoCoordMap[name] = v.properties.cp;
});


// myChart1.showLoading();
// var mapFeaturesworld = echarts.getMap(mapName).geoJson.features;
// myChart1.hideLoading();
// mapFeaturesworld.forEach(function (v) {
//     // 地区名称
//     var nameworld = v.properties.name;
//     console.log(nameworld)
//     // 地区经纬度
//     // geoCoordMap[name] = v.properties.cp;
//     if (nameworld == 'China') {

//         var mapFeatures = echarts.getMap('china').geoJson.features;
//          mapFeatures.forEach(function (v) {
//         // 地区名称
//         var name = v.properties.name;
//         // 地区经纬度
//         // geoCoordMap[name] = v.properties.cp;
//         geoCoordMap[name] = v.properties.cp;

//     })


//     }


// });


var max = 480,
    min = 9; // todo
var maxSize4Pin = 100,
    minSize4Pin = 20;

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    // console.log(res);
    return res;
};
option1 = {
    title: {
        text: name_title,
        subtext: subname,
        padding: 40,
        x: 'center',

        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle: {
            fontSize: subname_fontSize,
            fontFamily: name_fontFamily,
            color: nameColor,
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            if (typeof (params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for (var i = 0; i < toolTipData.length; i++) {
                    if (params.name == toolTipData[i].name) {
                        toolTiphtml += toolTipData[i].name + ':<br>'
                        for (var j = 0; j < toolTipData[i].value.length; j++) {
                            toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j]
                                .value + "<br>"
                        }
                    }
                }

                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for (var i = 0; i < toolTipData.length; i++) {
                    if (params.name == toolTipData[i].name) {
                        toolTiphtml += toolTipData[i].name + ':<br>'
                        for (var j = 0; j < toolTipData[i].value.length; j++) {
                            toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j]
                                .value + "<br>"
                        }
                    }
                }

                return toolTiphtml;
            }
        }
    },
    // legend: {
    //     orient: 'vertical',
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['credit_pm2.5'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    visualMap: {
        show: true,
        min: 0,
        max: 50,
        left: 'left',
        top: 'bottom',
        text: ['高','低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ['#00467F','green','yellow','#C0C0C0','red'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: [] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿

        }
    },
    /*工具按钮组*/
    // toolbox: {
    //     show: true,
    //     orient: 'vertical',
    //     left: 'right',
    //     top: 'center',
    //     feature: {
    //         dataView: {
    //             readOnly: false
    //         },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [{
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function (val) {
            return val[2] / 10000;
            // console.log(val)
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#05C3F9'
            }
        }
    },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function (val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return (a * val[2] + b) / 1;
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            // data: convertData(data),
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a,b) {
                return b.value - a.value;
            }).slice(0,5)),
            symbolSize: function (val) {
                return val[2] / 1500;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },

    ]
};
myChart1.setOption(option1);
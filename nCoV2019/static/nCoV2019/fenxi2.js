
var dom2 = document.getElementById("fenxi2");
var myChart22 = echarts.init(dom2);
var option;
//声明jsonp函数
function jsonp(url, callback, callbackname){ //给系统中创建一个全局变量，叫做callbackname，指向callback函数名
	//定义一个处理Jsonp返回数据的回调函数
	window[callbackname] = callback;
	//创建一个script节点
	var script = document.createElement("script");
	    script.src = url;
	    script.type = "text/javascript";
	document.getElementsByTagName("body")[0].appendChild(script); //将创建的新节点添加到BOM树上
	setTimeout(function(){
		document.body.removeChild(script); //为了不污染页面，把script拿掉
	}, 500);
}

var jsonpURL ='https://m.look.360.cn/events/feiyanTrend?sv=&version=&market=&device=2&net=4&stype=&scene=&sub_scene=&refer_scene=&refer_subscene=&f=jsonp&_=1581431223974&callback=jsonp2&callback=jsonp2';
//调用jsonp函数发送jsonp请求的callback
jsonp(jsonpURL, function(data){
	var chartsJSON = data.data.timeline; // 发送请求成功后开始执行，data是请求成功后，返回的数据
    //console.log(chartsJSON);
	var dateTime = [],		//日期
	    diagnosed_add = [], //新增确诊
	    suspected_add = [], //新增疑似
	    cured_add = [],     //新增治愈
	    died_add = [];      //新增死亡

	function sortNum(a, b) {
	    return a.diagnosed - b.diagnosed
	}
	chartsJSON.reverse(); //排序

	//for循环chartsJSON
	for (var i = 5; i < chartsJSON.length-1; i++) {
	    tempdata=chartsJSON[i].total.dateTime;
		dateTime.push(tempdata.replace('2020-',''));
	    diagnosed_add.push(chartsJSON[i].total.diagnosed_add);
	    suspected_add.push(chartsJSON[i].total.suspected_add);
	    cured_add.push(chartsJSON[i].total.cured_add);
	    died_add.push(chartsJSON[i].total.died_add);
	};

    const mydate = new Date();
    var jsonMonth = mydate.getMonth()+1,
    	subDay = mydate.getDate()-1; //当前减去一天
    subDay < 10 ? subDay = "0"+subDay : subDay = subDay;
    var subDate = mydate.getFullYear() + "年"+ jsonMonth +"月"+ subDay +"日";
    var subFunc = '截止: '+subDate;

    //基于准备好的dom，初始化echarts实例
    option = {
        backgroundColor: '#f8f8f8', //背景色
        title: {
            text: '',
            textStyle: {
                color: '#000',
                fontSize: 18
            },
            itemGap: 5,
            // subtext: subFunc,
    		subtextStyle: {
    			color: '#333',
                fontSize: 14,
                rich: {
    		        a: {
    		            color: 'red',
                		fontSize: 15
    		        },
    		        b: {
    		            color: '#ff6600',
                		fontSize: 15
    		        },
    		        c: {
    		            color: 'rgb(17, 191, 199)',
                		fontSize: 15
    		        },
    		        d: {
    		            color: 'gray',
                		fontSize: 15
    		        }
    		    }
    		},
    		x: 'center'
        },
        tooltip: {
            trigger: 'axis', //axis , item
            axisPointer: {
                type: 'line', //'line' | 'cross' | 'shadow' | 'none
                lineStyle: {
                    color: '#c9caca',
                    width: 1,
                    type: 'dotted'
                },
                label: {
                    backgroundColor: '#6a7985'
                },
            },
            x: 'center',
            textStyle: {
                fontSize: 14
            }
        },
        grid: {
            top: '10%',
            right: '6%',
            bottom: '5%',
            left: '5%'
        },
        legend: {
            data: ['新增确诊','新增疑似','新增治愈','新增死亡'],
            x: 'center'
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                rotate: 0,
                interval: 0, //类目间隔 设置为 1，表示(隔一个标签显示一个标签)
                textStyle: {
                    color: '#333',
                    fontSize: 10
                },
                formatter: '{value}'
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                     width: 4
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(102,102,102,.1)', //纵向网格线颜色
                    width: 1,
                    type: 'dashed'
                }
            },
            axisTick: {
                show: true //坐标轴小标记
            },
            data: dateTime //载入横坐标数据
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#333',
                    fontSize: 12
                },
                formatter: '{value}'
            },
            splitNumber: 4, //y轴刻度设置(值越大刻度越小)
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    width: 1
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(102,102,102,.1)', //横向网格线颜色
                    width: 1,
                    type: 'dashed'
                }
            }
        },
        color: ['rgb(255, 53, 55)', 'rgb(255, 160, 25)', 'rgb(17, 191, 199)', 'rgba(77, 80, 84, 0.7)'],
        series: [
    	    {
    	        name: '新增确诊',
    	        type: 'line', //line
    	        symbol: 'pin', //曲线点样式 'emptyCircle', circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    	        symbolSize: 12, //曲线点大小
    	        label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
    	        lineStyle: {
    	            normal: {
    	                width: 2
    	            }
    	        },
    	        smooth: true,
    	        data: diagnosed_add //载入数据
    	    },
    	    {
    	        name: '新增疑似',
    	        type: 'line', //line
    	        symbol: 'pin', //曲线点样式 'emptyCircle', circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    	        symbolSize: 12, //曲线点大小
    	        label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
    	        lineStyle: {
    	            normal: {
    	                width: 2
    	            }
    	        },
    	        smooth: true,
    	        data: suspected_add //载入数据
    	    },
    	    {
    	        name: '新增治愈',
    	        type: 'line', //line
    	        symbol: 'pin', //曲线点样式 'emptyCircle', circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    	        symbolSize: 12, //曲线点大小
    	        label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
    	        lineStyle: {
    	            normal: {
    	                width: 2
    	            }
    	        },
    	        smooth: true,
    	        data: cured_add //载入数据
    	    },
    	    {
    	        name: '新增死亡',
    	        type: 'line', //line
    	        symbol: 'pin', //曲线点样式 'emptyCircle', circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    	        symbolSize: 12, //曲线点大小
    	        label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
    	        lineStyle: {
    	            normal: {
    	                width: 2
    	            }
    	        },
    	        smooth: true,
    	        data: died_add //载入数据
    	    }
        ]
    };

    //使用刚指定的配置项和数据显示图表。
    myChart22.setOption(option);

	var app = {
        currentIndex: -1,
    };
    setInterval(function () {
        var dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart22.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });

        app.currentIndex = (app.currentIndex + 1) % dataLen;

        // 高亮当前图形
        myChart22.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });

        // 显示 tooltip
        myChart22.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });

    }, 3000);

},"jsonp2");


myChart22.setOption(option, true);

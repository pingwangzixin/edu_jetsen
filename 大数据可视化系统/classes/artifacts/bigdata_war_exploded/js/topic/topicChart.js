
/**
 * 区域的资源数据
 * @param {Object} params
 * @param {Object} areaData
 */
var myChart5 = echarts.init(document.getElementById('shitibingtu')); //试题并状图
var myChart6 = echarts.init(document.getElementById('shitizhutu')); //试题柱状图



var areaname = [];
var areadata = [];

dataJsonTopic(url);
 function dataJsonTopic(url) {
	 
        	//var url = userIp+'jeuc/api/sys/userStatistics/findUserActive?areaId='+areaId;
        	$.getJSON(url,function(data){
        		var areaname = data.areaResource.areaName; //区域名称
                var areadata = data.areaResource.areaCount; //区域数据
                
        		
                //试题饼状图
                option5 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['单选', '多选', '判断'],
                        show:false,
                    },
                    series: [{
                        name: '试题类型',
                        type: 'pie',
                        radius: ['50%', '70%'],
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
                        data: [{
                                value: 23,
                                name: '单选'
                            },
                            {
                                value: 44,
                                name: '多选'
                            },
                            {
                                value: 55,
                                name: '判断'
                            }
                        ]
                    }]
                };
                
                //试题饼状图
                option6 = {
                    title: {
                        x: 'center',
                        text: '',
                        subtext: '',
                        link: ''
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        x:0,
                        x2:0,
                        y: 80,
                        y2: 60
                    },
                    xAxis: [{
                        type: 'category',
                        show: false,
                        //区域的名称
                        data: areaname
                    }],
                    yAxis: [{
                        type: 'value',
                        show: false
                    }],
                    series: [{
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#e65b29', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
                                }
                            }
                        },
                        //区域的数据
                        data: areadata,
                    }]
                };
        		myChart5.setOption(option5);
        		myChart6.setOption(option6);
        	});
        	
        }
 
 
 //根据窗口大小自适应图表
// window.addEventListener("resize", function() {
//     myChart5.resize();
//     myChart6.resize();
// });
 
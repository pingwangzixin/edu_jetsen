
/**
 * 区域的资源数据
 * @param {Object} params
 * @param {Object} areaData
 */

var myChart3 = echarts.init(document.getElementById('resouce'));
var myChart4 = echarts.init(document.getElementById('resouceclass'));


var areaname = [];
var areadata = [];
dataJsonResource(url);
 function dataJsonResource(url) {
        	//var url = userIp+'jeuc/api/sys/userStatistics/findUserActive?areaId='+areaId;
        	$.getJSON(url,function(data){
        		var areaname = data.areaResource.areaName; //区域名称
                var areadata = data.areaResource.areaCount; //区域数据

        		 //资源总量图标3
                option3 = {
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
                        y: 100,
                        y2: 60,
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

                //资源类型图表4
                option4 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        data: ['试卷', '试题', '课件'],
                        textStyle: {
                            color: '#fff' // 主标题文字颜色
                        },
                    },
                    series: [{
                        name: '资源类型',
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
                                value: 335,
                                name: '试卷'
                            },
                            {
                                value: 310,
                                name: '试题'
                            },
                            {
                                value: 234,
                                name: '课件'
                            }
                        ]
                    }]
                };
        		myChart3.setOption(option3,true);
        		myChart4.setOption(option4,true);
        	});
        	
        }
 
 
 //根据窗口大小自适应图表
 window.addEventListener("resize", function() {
     myChart3.resize();
     myChart4.resize();
 });
 
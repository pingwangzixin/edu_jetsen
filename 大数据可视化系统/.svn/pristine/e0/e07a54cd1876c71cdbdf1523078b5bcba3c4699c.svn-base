
/**
 * 区域的资源数据
 * @param {Object} params
 * @param {Object} areaData
 */

var myChart7 = echarts.init(document.getElementById('zuoyebingtu')); //作业饼状图
var myChart8 = echarts.init(document.getElementById('zuoyezhutu')); //作业饼状图


var areaname = [];
var areadata = [];

dataJsonHomework(url);
function dataJsonHomework(url) {
        	//var url = userIp+'jeuc/api/sys/userStatistics/findUserActive?areaId='+areaId;
        	$.getJSON(url,function(data){
        		var areaname = data.areaResource.areaName; //区域名称
                var areadata = data.areaResource.areaCount; //区域数据

                //作业类型饼状图
                option7 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['教师下发', '学生提交'],
                        show:false,
                    },
                    series: [{
                        name: '访问来源',
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
                                value: 32,
                                name: '教师下发'
                            },
                            {
                                value: 31,
                                name: '学生提交业'
                            }
                        ]
                    }]
                };
                
                //作业饼状图
                option8 = {
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
        		myChart7.setOption(option7,true);
        		myChart8.setOption(option8,true);
        	});
        	
        }
 
 
 //根据窗口大小自适应图表
// window.addEventListener("resize", function() {
//     myChart7.resize();
//     myChart8.resize();
// });
// 
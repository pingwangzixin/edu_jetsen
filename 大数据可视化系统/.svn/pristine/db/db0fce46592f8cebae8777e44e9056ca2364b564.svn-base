/**
 * 用户的数据统计
 * @param {Object} areaId
 */
//function getUserData(areaId){

var myChart1 = echarts.init(document.getElementById('leixing'));
var myChart2 = echarts.init(document.getElementById('sexpercent'));

var areaname = [];
var areadata = [];

dataJsonUser(url);
 function dataJsonUser(url) {
        	//var url = userIp+'jeuc/api/sys/userStatistics/findUserActive?areaId='+areaId;
        	$.getJSON(url,function(data){
        		var areaname = data.areaResource.areaName; //区域名称
                var areadata = data.areaResource.areaCount; //区域数据
                $(".areaId").text(data.name);
                console.log(data)
                var regTotUser = data.userNum + ""; //总人数
                var newTotnum = []
                //循环追加人数
                $("#totuser").children().remove();
                for (var i = 0; i < regTotUser.length; i++) {
                    newTotnum.push(regTotUser[i]);
                    $("#totuser").append('<li>' + newTotnum[i] + '</li>')
                }

                var resouceNum = data.resouceNum + "";
                var newResoucenum = []
                $("#totrece").children().remove();
                for (var i = 0; i < resouceNum.length; i++) {
                    newResoucenum.push(resouceNum[i]);
                    $("#totrece").append('<li>' + newResoucenum[i] + '</li>')
                }

                var userClass = data.userList;

                var teacheNum = data.userList[0].value;
                var studentNum = data.userList[1].value;
                var parentNum = data.userList[2].value;
                $("#count-number").html(teacheNum)
                $("#count-number2").html(studentNum)
                $("#count-number3").html(parentNum)
        		
        		
        		//教师、家长、学生比例图表1
                option1 = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            color: '#fff', // 主标题文字颜色
                            fontSize: 14,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#28ac5d', '#e65656', '#15a9ff'],
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        data: ['教师', '学生', '家长'],
                        textStyle: {
                            color: '#fff' // 主标题文字颜色
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: false
                            },
                            dataView: {
                                show: false,
                                readOnly: false
                            },
                            magicType: {
                                show: false,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    calculable: true,
                    series: [{
                        name: '用户数量',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        //添加用户人数饼图
                        data: userClass
                    }]
                };

        		//男女用户比例图标2
                option2 = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            color: '#fff', // 主标题文字颜色
                            fontSize: 14,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#28ac5d', '#e65656', '#15a9ff'],
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        data: ['男', '女'],
                        textStyle: {
                            color: '#fff', // 主标题文字颜色
                        },
                    },
                    series: [{
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: 335,
                                name: '男'
                            },
                            {
                                value: 310,
                                name: '女'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
        		myChart1.setOption(option1);
        		myChart2.setOption(option2);
        	});
        	
        }
 
 
 //根据窗口大小自适应图表
 window.addEventListener("resize", function() {
     myChart1.resize();
     myChart2.resize();
 });
 
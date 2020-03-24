
// 用户的数据校级统计
function showSchoolUserCount(code, name){
	$(".areaId").text(name);
	var url = userOfficeUrl+code;
	$.getJSON(url,function(result){
		var data = result.data;
		var teacheNum = data.teaRegisterNo;
        var studentNum = data.stuRegisterNo;
        var parentNum = data.parentRegisterNo; 

        $("#count-number").html(teacheNum)
        $("#count-number2").html(studentNum)
        $("#count-number3").html(parentNum)
	});
}

/**
 * 用户的数据统计
 * @param {Object} areaId
 */

//var myChart1 = echarts.init(document.getElementById('leixing'));
//var myChart2 = echarts.init(document.getElementById('sexpercent'));
var myChart1;
function dataJsonUser(url, name) {
	$(".areaId").text(name);
	myChart1 = echarts.init(document.getElementById('leixing'));
	$.getJSON(url,function(result){
		var data = result.data;
		 var teacheNum = data.teaRegisterNo;
         var studentNum = data.stuRegisterNo;
         var parentNum = data.parentRegisterNo; 
         
         teaCount = teacheNum;
         stuCount = studentNum;
         parCount = parentNum;
         
         var regTotUser = teacheNum+studentNum + parentNum+""; //总人数
		 var newTotnum = []
        //循环追加人数
        $("#totuser").children().remove();
        for (var i = 0; i < regTotUser.length; i++) {
            newTotnum.push(regTotUser[i]);
            $("#totuser").append('<li>' + newTotnum[i] + '</li>')
        }

        var userClass = [
        				 {"name":"教师","value":teacheNum},
        				 {"name":"学生","value":studentNum},
        				 {"name":"家长","value":parentNum}
        ];

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
        myChart1.setOption(option1);
		//男女用户比例图标2
//        option2 = {
//            title: {
//                text: '',
//                subtext: '',
//                x: 'center',
//                textStyle: {
//                    color: '#fff', // 主标题文字颜色
//                    fontSize: 14,
//                },
//            },
//            tooltip: {
//                trigger: 'item',
//                formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            color: ['#28ac5d', '#e65656', '#15a9ff'],
//            legend: {
//                orient: 'vertical',
//                x: 'left',
//                y: 'center',
//                data: ['男', '女'],
//                textStyle: {
//                    color: '#fff', // 主标题文字颜色
//                },
//            },
//            series: [{
//                labelLine: {
//                    normal: {
//                        show: false
//                    }
//                },
//                name: '访问来源',
//                type: 'pie',
//                radius: '55%',
//                center: ['50%', '60%'],
//                data: [{
//                        value: manAmount,
//                        name: '男'
//                    },
//                    {
//                        value: womanAmount,
//                        name: '女'
//                    }
//                ],
//                itemStyle: {
//                    emphasis: {
//                        shadowBlur: 10,
//                        shadowOffsetX: 0,
//                        shadowColor: 'rgba(0, 0, 0, 0.5)'
//                    }
//                }
//            }]
//        };
//		myChart2.setOption(option2);
	});
	
}

//导入的用户统计展示
function importUser(data){
	myChart1 = echarts.init(document.getElementById('leixing'));
	
	$("#count-number").html(data.teacherCount);
	$("#count-number2").html(data.studentCount);
	$("#count-number3").html(data.pareantCount);
    
    teaCount = data.teacherCount;
    stuCount = data.studentCount;
    parCount = data.pareantCount;
    
    var count = data.count+"";
	 $("#totuser").html("");
    for (var i = 0; i < count.length; i++) {
        $("#totuser").append('<li>' + count[i] + '</li>')
    }
    var areaCount = data.areaCount+"";
    $("#totarea").html("");
    for (var i = 0; i < areaCount.length; i++) {
    	$("#totarea").append('<li>' + areaCount[i] + '</li>')
    }
    var schoolCount = data.schoolCount+"";
    $("#totschool").html("");
    for (var i = 0; i < schoolCount.length; i++) {
    	$("#totschool").append('<li>' + schoolCount[i] + '</li>')
    }
    
    var userClass = [
    				 {"name":"教师","value":data.teacherCount},
    				 {"name":"学生","value":data.studentCount},
    				 {"name":"家长","value":data.pareantCount}
    ];
    
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
    setTimeout(function(){
		myChart1.setOption(option1);
    }, 100);
}
 
 
 //根据窗口大小自适应图表
 window.addEventListener("resize", function() {
     myChart1.resize();
//     myChart2.resize();
 });
 

/**
 * 区域的资源数据
 * @param {Object} params
 * @param {Object} areaData
 */


//作业校级统计
function showHomeworkSubject(jurl, code){
	var url = homeworkUrl+code+"/-1";
	var nameArray = [];
	var countArray = [];
	$.ajax({url:url,async:false,success:function(result){
		var data = result.data;
		for ( var i in data.subjectList) {
			if(data.subjectList[i].count!=0){
				nameArray.push(data.subjectList[i].subjectName);
				countArray.push(data.subjectList[i].count);
			}
		}
	}});
	chart_column('#chart3', '作业统计图', nameArray, countArray, '#f1b82e');
}
var myChart7;
var myChart8;
function dataJsonHomework(jurl,code,name) {
	myChart7 = echarts.init(document.getElementById('zuoyebingtu')); //作业饼状图
	myChart8 = echarts.init(document.getElementById('zuoyezhutu')); //作业柱状图
	var areaname = [];
	var areadata = [];
	var homeworkData = [];
	var studentSum = 0;
	var teacherSum = 0;
	var sum = 0;
	
	var url = jurl+code+"/-1";
	$.ajax({url:url,async:false,success:function(result){
		var jdata = result.data;
		for ( var i in jdata.areaOrGrade) {
			if(jdata.areaOrGrade[i].count!=0){
				areaname.push(jdata.areaOrGrade[i].areaName);
				areadata.push(jdata.areaOrGrade[i].count);
				var mydata = {};
				mydata.name = jdata.areaOrGrade[i].areaName;
				mydata.value = jdata.areaOrGrade[i].count;
				sum += jdata.areaOrGrade[i].count;
				homeworkData.push(mydata);
			}
		}
		if(jdata.stuSubmit.length>0){
			studentSum = jdata.stuSubmit[0].count;
		}
		if(jdata.teaSend.length>0){
			teacherSum = jdata.teaSend[0].count;
		}
		console.log(homeworkData);
		console.log(areadata);
		//给总量赋值
		$("#homeworkSum").text(sum);
		//课堂饼状图
		//作业类型饼状图
		option7 = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				x : 'center',
				data : [ '教师下发', '学生提交' ],
				show : false,
			},
			series : [ {
				name : '访问来源',
				type : 'pie',
				radius : [ '50%', '70%' ],
				avoidLabelOverlap : false,
				label : {
					normal : {
						show : false,
						position : 'center'
					},
					emphasis : {
						show : true,
						textStyle : {
							fontSize : '30',
							fontWeight : 'bold'
						}
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : [ {
					value : teacherSum,
					name : '教师下发'
				}, {
					value : studentSum,
					name : '学生提交'
				} ]
			} ]
		};

		// 作业柱状图
		option8 = {
			title : {
				x : 'center',
				text : '',
				subtext : '',
				link : ''
			},
			tooltip : {
				trigger : 'item'
			},
			toolbox : {
				show : false,
				feature : {
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			grid : {
				borderWidth : 0,
				x : 0,
				x2 : 0,
				y : 80,
				y2 : 60
			},
			xAxis : [ {
				type : 'category',
				show : false,
				// 区域的名称
				data : areaname
			} ],
			yAxis : [ {
				type : 'value',
				show : false
			} ],
			series : [ {
				name : '',
				type : 'bar',
				itemStyle : {
					normal : {
						color : function(params) {
							// build a color map as your need.
							var colorList = [ '#e65b29', '#B5C334', '#FCCE10',
									'#E87C25', '#27727B', '#FE8463', '#9BCA63',
									'#FAD860', '#F3A43B', '#60C0DD', '#D7504B',
									'#C6E579', '#F4E001', '#F0805A', '#26C0C0' ];
							return colorList[params.dataIndex]
						},
						label : {
							show : true,
							position : 'top',
							formatter : '{b}\n{c}'
						}
					}
				},
				// 区域的数据
				data : areadata,
			} ]
		};
		setTimeout(function(){
			myChart7.setOption(option7,true);
			myChart8.setOption(option8,true);
	    }, 100);
	}});
	
	
}
//导入的作业统计展示
function importHomework(data) {
	myChart7 = echarts.init(document.getElementById('zuoyebingtu')); //作业饼状图
	myChart8 = echarts.init(document.getElementById('zuoyezhutu')); //作业柱状图
	var areaname = [];
	var areadata = [];
	var homeworkData = [];
	var studentSum = 0;
	var teacherSum = 0;
	var sum = data.count;
	var co = 0;
	for (var i in data.children) {
		if(co>=20){
			break;
		}
		if(data.children[i].count!=0){
			co++;
			areaname.push(data.children[i].name);
			areadata.push(data.children[i].count);
			var mydata = {};
			mydata.name = data.children[i].name;
			mydata.value = data.children[i].count;
			homeworkData.push(mydata);
		}
	}
	studentSum = data.stuSubmit;
	teacherSum = data.teacherSend;
	console.log(homeworkData);
	console.log(areadata);
	//给总量赋值
	$("#homeworkSum").text(sum);
	setHomeworkCharts(teacherSum, studentSum, areaname, areadata);
}

function setHomeworkCharts(teacherSum, studentSum, areaname, areadata){
	var data2 = {};
	if(areadata.length>5){
		data2 = {
				show: true,
				realtime: true,
				y: 246,
				height: 10,
				start: 0,
				end: 40,
				
		}
	}else{
		data2 = {};
	}
	//作业类型饼状图
	option7 = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				x : 'left',
				data : [ '教师下发', '学生提交' ],
				show : false,
			},
			series : [ {
				name : '访问来源',
				type : 'pie',
				radius : [ '50%', '70%' ],
				avoidLabelOverlap : false,
				label : {
					normal : {
						show : false,
						position : 'center'
					},
					emphasis : {
						show : true,
						textStyle : {
							fontSize : '30',
							fontWeight : 'bold'
						}
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : [ {
					value : teacherSum,
					name : '教师下发'
				}, {
					value : studentSum,
					name : '学生提交'
				} ]
			} ]
	};
	
	// 作业柱状图
	option8 = {
			title : {
				x : 'center',
				text : '',
				subtext : '',
				link : ''
			},
			tooltip : {
				trigger : 'item'
			},
			toolbox : {
				show : false,
				feature : {
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			grid : {
				borderWidth : 0,
				x : 0,
				x2 : 0,
				y : 80,
				y2 : 60
			},
			xAxis : [ {
				type : 'category',
				show : false,
				// 区域的名称
				data : areaname
			} ],
			yAxis : [ {
				type : 'value',
				show : false
			} ],
			dataZoom: data2,
			series : [ {
				name : '',
				type : 'bar',
				itemStyle : {
					normal : {
						color : function(params) {
							// build a color map as your need.
							var colorList = [ '#e65b29', '#B5C334', '#FCCE10',
							                  '#E87C25', '#27727B', '#FE8463', '#9BCA63',
							                  '#FAD860', '#F3A43B', '#60C0DD', '#D7504B',
							                  '#C6E579', '#F4E001', '#F0805A', '#26C0C0' ];
							return colorList[params.dataIndex]
						},
						label : {
							show : true,
							position : 'top',
							formatter : '{b}\n{c}'
						}
					}
				},
				// 区域的数据
				data : areadata,
			} ]
	};
	setTimeout(function(){
		myChart7.setOption(option7,true);
		myChart8.setOption(option8,true);
    }, 100);
}
 
 //根据窗口大小自适应图表
 window.addEventListener("resize", function() {
     myChart7.resize();
     myChart8.resize();
 });
 
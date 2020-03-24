
//课堂记录校级统计图
function showLessonSubject(jurl, code){
	var url = jurl+"/lesson/subjectGrade?schoolYear=2018&id="+code;
//	var url = "http://198.9.6.179:8000/lesson/subjectGrade?id=125";
	var nameArray = [];
	var countArray = [];
	$.ajax({url:url,async:false,success:function(result){
		var data = result.data;
		for ( var i in data.subject) {
			if(data.subject[i].count!=0){
				nameArray.push(data.subject[i].subject);
				countArray.push(data.subject[i].count);
			}
		}
	}});
	chart_column('#chart4', '课堂记录统计图', nameArray, countArray, '#f06e23');
}

/**
 * @desc查询课堂统计数据
 * @param jurl
 * @returns
 */
var myChart19;
var myChart20;
function dataJsonLesson(jurl,code,name) {
	myChart19 = echarts.init(document.getElementById('lessonbingtu')); //作业饼状图
	myChart20 = echarts.init(document.getElementById('lessonzhutu')); //作业饼状图
	var areaname = [];
	var areadata = [];
	var lessondata = [];
	var mytype= "";
	var url = '';
	if(type == 0){
		url = jurl;
	}else{
		if (type == 2){
			mytype = 'province';
		}else if (type == 3){
			mytype = 'city';
		}else if (type == 1){
			mytype = "china"
		}
		url = jurl+"?type="+mytype+"&id="+code+"&schoolYear=2018";
	}
	var sum = 0;
	$.ajax({url:url,async:false,success:function(jdata){
		for (var i in jdata.data.all) {
			if(jdata.data.all[i].count!=0){
				areaname.push(jdata.data.all[i].name);
				areadata.push(jdata.data.all[i].totle);
				var mydata = {};
				mydata.name=jdata.data.all[i].name;
				mydata.value = jdata.data.all[i].totle;
				sum += jdata.data.all[i].totle;
				lessondata.push(mydata);
			}
		}
		$("#lesson_type").text(jdata.data.type);
	}});
	//给总量赋值
	$(".lesson_lanzi_midd").text(sum);
	setLessonCharts(lessondata, areaname, areadata);
	
}
//导入的课堂记录统计展示
function importLesson(data) {
	myChart19 = echarts.init(document.getElementById('lessonbingtu')); //作业饼状图
	myChart20 = echarts.init(document.getElementById('lessonzhutu')); //作业饼状图
	var areaname = [];
	var areadata = [];
	var lessondata = [];
	var mytype= "";
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
			mydata.name=data.children[i].name;
			mydata.value = data.children[i].count;
			lessondata.push(mydata);
		}
	}
	$("#lesson_type").text("");
	//给总量赋值
	$(".lesson_lanzi_midd").text(sum);
	setLessonCharts(lessondata, areaname, areadata);
}

function setLessonCharts(lessondata, areaname, areadata){
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
	//课堂类型饼状图
	option19 = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['教研活动', '教案备课'],
				show:false,
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: ['50%', '70%'],
//				radius: ['30%', '50%'],
//				center: ['50%', '70%'],
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
//				itemStyle:{
//					normal:{
//						labelLine:{
//							length:1
//						}
//					}
//				},
				labelLine: {
				
					normal: {
						show: false,
						
					}
				},
				data: lessondata
			}]
	};
	
	//课堂柱状图
	option20 = {
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
			dataZoom: data2,
			series: [{
				name: '',
				type: 'bar',
//				barWidth :20,//柱图宽度
//				barGap:"30%",
//                barCategoryGap :'200%',//柱图间距

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
						},
					
					}
				},
				//区域的数据
				data: areadata
			}]
	};
	setTimeout(function(){
		myChart19.setOption(option19,true);
		myChart20.setOption(option20,true);
    }, 100);
}
 
 //根据窗口大小自适应图表
// window.addEventListener("resize", function() {
//     myChart7.resize();
//     myChart8.resize();
// });
// 
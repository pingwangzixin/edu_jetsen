/**
 * 区域的资源数据
 * 
 * @param {Object}
 *            params
 * @param {Object}
 *            areaData
 */
var myChart29;
var myChart30;
function dataJsonTeach(taUrl, tpUrl, code,name) {
	myChart29 = echarts.init(document.getElementById('jiaoyanbingtu')); // 教研饼状图
	myChart30 = echarts.init(document.getElementById('jiaoyanzhutu')); // 教研柱状图
	if (code == 'china') {
		code = '1';
	}
	var areaname = [];
	var areadata = [];
	var list = [];
	var teachingdata = [];
	var myType = "";
	if(type == 0){
		myType = "";
	}else if(type == 1){
		myType = 'china';
	}else if(type == 2){
		myType = 'province';
	}else if(type == 3){
		myType = 'city';
	}
	taUrl = taUrl+code+"?type="+myType;
	tpUrl = tpUrl+code+"?type="+myType;
	var sum = 0;
	var jiaoyan = 0;
	// 教研
	$.ajax({
		url : taUrl,
		async : false,
		success : function(jdata) {
			if(jdata.ret == 200){
				for ( var i in jdata.data.subset) {
					var obj = {};
					obj.name = jdata.data.subset[i].name;
					obj.value = jdata.data.subset[i].totlenum;
					obj.id = jdata.data.subset[i].id;
					list.push(obj);
					jiaoyan += jdata.data.subset[i].totlenum;
				}
			}
		}
	});
	var jiaoyandata = {};
	jiaoyandata.name = '教研活动';
	jiaoyandata.value = jiaoyan;
	teachingdata.push(jiaoyandata);

	// 教案
	var jiaoan = 0;
	var noList = [];
	$.ajax({
		url : tpUrl,
		async : false,
		success : function(jdata) {
			if(jdata.ret == 200){
				for ( var i in jdata.data.subset) {
					// 重复地区 活动量叠加
					var stringify=JSON.stringify(list);
					var index = stringify.indexOf(jdata.data.subset[i].id);
					if (index >= 0) {
						for ( var j in list) {
							var element = list[j];
							if (element.name == jdata.data.subset[i].name) {
								element.value = list[j].value
										+ jdata.data.subset[i].resnum;
								jiaoan += jdata.data.subset[i].resnum;
							}
						}
					} else {
						var obj = {};
						obj.name = jdata.data.subset[i].name;
						obj.value = jdata.data.subset[i].resnum;
						noList.push(obj);
						jiaoan += jdata.data.subset[i].resnum;
					}
				}
				$("#teach_type").text(jdata.data.type);
			}
		}
	});
	for ( var i in noList) {
		list.push(noList[i]);
	}
	for ( var i in list) {
		if(i<5){
			areaname.push(list[i].name);
			areadata.push(list[i].value);
		}
	}
	var jiaoandata = {};
	jiaoandata.name = '教案备课';
	jiaoandata.value = jiaoan;
	teachingdata.push(jiaoandata);
	sum = jiaoyan + jiaoan;
	// 给总量赋值
	$(".teaching_lanzi_midd").text(sum);
	setTeachCharts(teachingdata, areaname, areadata);
}

//导入的教研统计展示
function importTeach(data, name) {
	var areaname = [];
	var areadata = [];
	var list = [];
	var teachingdata = [];
	var sum = data.count;
	var jiaoyan = data.activeCount;
	var jiaoyandata = {};
	jiaoyandata.name = '教研活动';
	jiaoyandata.value = jiaoyan;
	teachingdata.push(jiaoyandata);
	
	// 教案
	var jiaoan = data.prepareCount;
	var jiaoandata = {};
	jiaoandata.name = '教案备课';
	jiaoandata.value = jiaoan;
	teachingdata.push(jiaoandata);
	// 给总量赋值
	$(".teaching_lanzi_midd").text(sum);
	
	
	// 教研
	var co = 0;
	for (var i in data.children) {
		if(co>=20){
			break;
		}
		if(data.children[i].count!=0){
			co++;
			var obj = {};
			obj.name = data.children[i].name;
			obj.value = data.children[i].count;
			obj.id = data.children[i].code;
			list.push(obj);
		}
	}
	for ( var i in list) {
		areaname.push(list[i].name);
		areadata.push(list[i].value);
	}
	
	myChart29 = echarts.init(document.getElementById('jiaoyanbingtu')); // 教研饼状图
	myChart30 = echarts.init(document.getElementById('jiaoyanzhutu')); // 教研柱状图
		
	setTeachCharts(teachingdata, areaname, areadata);
}

function setTeachCharts(teachingdata, areaname, areadata){
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
	
	// 教研类型饼状图
	option29 = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : [ '教研活动', '教案备课' ],
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
			data : teachingdata
		} ]
	};
	// 教研饼状图
	option30 = {
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
						var colorList = [ '#e65b29', '#B5C334',
								'#FCCE10', '#E87C25', '#27727B',
								'#FE8463', '#9BCA63', '#FAD860',
								'#F3A43B', '#60C0DD', '#D7504B',
								'#C6E579', '#F4E001', '#F0805A',
								'#26C0C0' ];
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
		myChart29.setOption(option29,true);
		myChart30.setOption(option30,true);
    }, 100);
}
// 根据窗口大小自适应图表
// window.addEventListener("resize", function() {
// myChart9.resize();
// myChart10.resize();
// });

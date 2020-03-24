
var areaname = [];
var areadata = [];

function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x*100)/100;
    return f;
}

function showQuestionSubject(jurl, code){
	var url = jurl +"//resource/quzYear?areaId="+code;
	var nameArray = [];
	var countArray = [];
	$.ajax({url:url,async:false,success:function(result){
		if(result.code=="200"){
			var data = result.data;
			for ( var i in data.list) {
				if(data.list[i].quz!=0){
					nameArray.push(data.list[i].subjectName);
					countArray.push(data.list[i].quz);
				}
			}
		}
	}});
	chart_column('#chart2', '试题统计图', nameArray, countArray, '#3dccae');
}

// dataJsonTopic(url);
var myChart5;
var myChart6;
function dataJsonTopic(url) {
	myChart5 = echarts.init(document.getElementById('shitibingtu')); //试题并状图
	myChart6 = echarts.init(document.getElementById('shitizhutu')); //试题柱状图

	$.getJSON(url,function(data){
        var arr1 = new Array();
        var arr2 = new Array();
        if(data.ret == 200){
        	$.each( data.data.areaList.list, function(i, n){
        		if(n.quz!=0){
        			arr1.push(n.areaname)
        			arr2.push(n.quz)
        		}
            });
        }
        var areaname = arr1; //区域数据
        var areadata = arr2;



        var num = 0;



        var resourceTypeData = new Array();
        var resourceTypeLegend = new Array();
        var series = new Array();
        if(data.ret == 200){
        	$.each( data.data.typeList, function(i, n){
                num += parseInt(n.value);
                var map = {};
                map['value']=parseInt(n.value);
                map['name']=n.name;
                resourceTypeData.push(map);
            });
        }
        

        $("#questionSum").html(num);
        if(data.ret == 200){
        	$.each( data.data.typeList, function(i, n){
        		resourceTypeLegend.push(n.name);
        		if(num == 0){
        			series.push(toDecimal(100/resourceTypeData.length*100)+"%");
        		}else {
        			series.push(toDecimal(n.value/num*100)+"%");
        		}
        	});
        }
        
        setTpoicCharts(resourceTypeLegend, resourceTypeData, areaname, areadata);
	});
}
//导入的试题统计展示
function importQuestion(data) {
	myChart5 = echarts.init(document.getElementById('shitibingtu')); //试题并状图
	myChart6 = echarts.init(document.getElementById('shitizhutu')); //试题柱状图
	
	var arr1 = new Array();
	var arr2 = new Array();
	var co = 0;
	$.each( data.children, function(i, n){
		if(co<20){
			if(n.count!=0){
				co++;
				arr1.push(n.name)
				arr2.push(n.count)
			}
		}
	});
	var areaname = arr1; //区域数据
	var areadata = arr2;
	
	//总数
	var num = data.count;
	
	var resourceTypeData = new Array();
	var resourceTypeLegend = new Array();
	var series = new Array();
	$.each( data.typeArray, function(i, n){
		var map = {};
		map['value']=parseInt(n.count);
		map['name']=n.subjectOrTypeName;
		resourceTypeData.push(map);
	});
	
	
	$("#questionSum").html(num);
	$.each( data.typeArray, function(i, n){
		resourceTypeLegend.push(n.subjectOrTypeName);
		if(num == 0){
			series.push(toDecimal(100/resourceTypeData.length*100)+"%");
		}else {
			series.push(toDecimal(n.count/num*100)+"%");
		}
	});
	setTpoicCharts(resourceTypeLegend, resourceTypeData, areaname, areadata);
}

function setTpoicCharts(resourceTypeLegend, resourceTypeData, areaname, areadata){
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
	

	//试题饼状图
	option5 = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: resourceTypeLegend,
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
				data: resourceTypeData
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
			dataZoom: data2,
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
	
	console.log(JSON.stringify(option5))
	console.log(JSON.stringify(option5))
	setTimeout(function(){
		myChart5.setOption(option5,true);
		myChart6.setOption(option6,true);
    }, 100);
}
 
 //根据窗口大小自适应图表
// window.addEventListener("resize", function() {
//     myChart5.resize();
//     myChart6.resize();
// });
 
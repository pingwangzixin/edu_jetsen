
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

//资源校级统计图
function showResourceSubject(jurl, code){
	jurl = jurl + "//resource/resourceYear?areaId="+code;
	var nameArray = [];
	var countArray = [];
	$.ajax({url:jurl,async:false,success:function(result){
		if(result.code=="200"){
			var data = result.data;
			for ( var i in data.list) {
				if(data.list[i].counter!=0){
					nameArray.push(data.list[i].subjectName);
					countArray.push(data.list[i].counter);
				}
			}
		}
	}});
	chart_column('#chart1', '资源统计图', nameArray, countArray, '#1f7ce6');
}

// dataJsonResource(url);
var myChart3;
var myChart4;
function dataJsonResource(url) {
	myChart3 = echarts.init(document.getElementById('resouce'));
	myChart4 = echarts.init(document.getElementById('resouceclass'));
	$.getJSON(url,function(data){
        var arr1 = new Array();
        var arr2 = new Array();
        if(data.ret == 200){
        	$.each( data.data.areaList.list, function(i, n){
                arr1.push(n.areaname)
                arr2.push(n.resource)
            });
        }
        
        var areaname = arr1; //区域数据
        var areadata = arr2;

        var countHtml = "";
        if(data.ret == 200){
        	 var countArr = data.data.areaList.count.resourceCounter.toString().split('');
             for (var i=0;i<countArr.length;i++){
                 countHtml += "<li>"+countArr[i]+"</li>";
             }
        }

        $("#totrece").html(countHtml);

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
        	
        	$.each( data.data.typeList, function(i, n){
                resourceTypeLegend.push(n.name);
                if(num == 0){
                    series.push(toDecimal(100/resourceTypeData.length*100)+"%");
                }else {
                    series.push(toDecimal(n.value/num*100)+"%");
                }
            });
        }
        setResourceCharts(resourceTypeLegend, resourceTypeData, areaname, areadata);
	});
        	
}
 
//导入的资源统计展示
function importResource(data){
	myChart3 = echarts.init(document.getElementById('resouce'));
	myChart4 = echarts.init(document.getElementById('resouceclass'));
	
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
    var countHtml = "";
	 var countArr = data.count+"";
     for (var i=0;i<countArr.length;i++){
         countHtml += "<li>"+countArr[i]+"</li>";
     }

    $("#totrece").html(countHtml);
    //总数
    var num = data.count;
    
    var resourceTypeData = new Array();
    var resourceTypeLegend = new Array();
    var series = new Array();
	$.each(data.typeArray, function(i, n){
        var map = {};
        map['value']=parseInt(n.count);
        map['name']=n.subjectOrTypeName;
        resourceTypeData.push(map);
    });
	
	$.each( data.typeArray, function(i, n){
        resourceTypeLegend.push(n.subjectOrTypeName);
        if(num == 0){
            series.push(toDecimal(100/resourceTypeData.length*100)+"%");
        }else {
            series.push(toDecimal(n.value/num*100)+"%");
        }
    });

	setResourceCharts(resourceTypeLegend, resourceTypeData, areaname, areadata);
}
function setResourceCharts(resourceTypeLegend, resourceTypeData, areaname, areadata){
	console.log("资源",areaname)
	var data2 = {};
	if(areadata.length>5){
		console.log("资源",areadata)
		data2 ={
				show: true,
				realtime: true,
				y: 150,
				height: 10,
				start: 0,
				end: 40,
		}
	}else{
		data2 = {};
	}
	
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
            y: 80,
//            y: 100,
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
            data: resourceTypeLegend,
            textStyle: {
                color: '#fff' // 主标题文字颜色
            },
        },
        series: [{
            name: '资源类型',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['60%', '50%'],   //饼状图坐标
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

    console.log(JSON.stringify(option4))
    console.log(JSON.stringify(option3))
    setTimeout(function(){
    	myChart3.setOption(option3,true);
    	myChart4.setOption(option4,true);
    }, 100);
}
 //根据窗口大小自适应图表
// window.addEventListener("resize", function() {
//	 myChart3.resize();
//	 myChart4.resize();
// });
 
app.controller('evaluateStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
	$scope.variablePacket = {
	      subjectData:[         //科目数据 
	            {
	               id:"1",
	              "name":"思想品德和公民素养"
	            },
	            {
	               id:"2",
	              "name":"学业水平和学习素养"
	            },
	            {
	               id:"3",
	              "name":"身体和心理健康水平"
	            },
	            {
	               id:"4",
	              "name":"兴趣特长及审美素养 "
	            },
	            {
	               id:"5",
	              "name":"社会实践和动手能力"
	            }
	       ],
	       subjectIndex:0,//科目选中下标
	       countynav:false,//区域显示状态
	       schoolnav:false,//学校显示状态
	       countyname:false,//区域名称
	       schoolname:false,//学校名称
	       quanguo:true
	  };
	
	//获取学期数据
	$scope.team=$("#teamName").find(":selected").val();
	$scope.variablePacket.evalSuZhiName = $scope.variablePacket.subjectData[0].name;
	//从接口中获取学年
	$scope.year='';
	$.ajax({
		type:"get",
		url:jeucIp+"ea/office/getStuYearList",
		async:false,
		success:function(jdata){
			if(jdata.ret == 200){
				$scope.variablePacket.schoolYear = jdata.data;
				$scope.year=jdata.data[0].id;
				console.log($scope.year);
			}
		}
	});
	
	//根据当前用户进来的有角色判断，需按角色查询显示//session中scope的值：1234代表省市区校，0代表全国
 	var session_Obj = JSON.parse(sessionStorage.getItem("managerSearch"));
 	var session_scope =session_Obj.scope ;
 	
	
	$scope.variablePacket.activeid =$stateParams.activeid;//路由切换状态
   
	$scope.subjectTab=function(index){         //切换科目
		 $scope.variablePacket.subjectIndex=index;
		 $scope.variablePacket.evalSuZhiName = $scope.variablePacket.subjectData[index].name;
		 console.log( $scope.variablePacket.subjectData[index].name);
		 findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,$scope.variablePacket.type,$scope.variablePacket.id);
		 //$scope.cityData();
		 $scope.$apply();
	};
	$scope.cityData=function(){
		 $scope.variablePacket.tableData ={
		 	 "name": "市",            //名称
			 "type": "city",         //类型
			 "id": 1,
			  data:[
			      {
			      	 "id":"1",
			      	 "name":"海淀区",   //区名称
			      	 "Apeople":"226",  //人数
			      	 "Aratio":"33%",   //占比
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      },
			       {
			      	 "id":"2",
			      	 "name":"昌平区",
			      	 "Apeople":"226",
			      	 "Aratio":"33%",
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      }
			 ]
		 	
		 	
		 };
		  
	 };
	$scope.cityData();        
	$scope.schoolData=function(){
		 $scope.variablePacket.tableData ={
		 	 "name": "学校",            //名称
			 "type": "school",         //类型
			 "id": 1,
			  data:[
			      {
			      	 "id":"1",
			      	 "name":"第一中学",   //学校名称
			      	 "Apeople":"26",  //人数
			      	 "Aratio":"33%",   //占比
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      },
			       {
			      	 "id":"2",
			      	 "name":"第二中学",
			      	 "Apeople":"26",
			      	 "Aratio":"30%",
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      }
			 ]
		 	
		 	
		 };
		  
	 };        
	$scope.classData=function(){
		 $scope.variablePacket.tableData ={
		 	 "name": "班级",            //名称
			 "type": "class",           //类型
			 "id": 1,
			  data:[
			      {
			      	 "id":"1",
			      	 "name":"七年级",//班级名称
			      	 "group":"class", //年级与众不同,加以区分
			      	"Apeople":"26",  //人数
			      	 "Aratio":"33%",   //占比
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      },
			       {
			      	 "id":"2",
			      	 "name":"(1)班",   //班级名称
			      	 "Apeople":"26",  //人数
			      	 "Aratio":"33%",   //占比
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      },
			       {
			      	 "id":"3",
			      	 "name":"(2)班",
			      	 "Apeople":"26",
			      	 "Aratio":"30%",
			      	 "Bpeople":"220",
			      	 "Bratio":"30%",
			      	 "Cpeople":"113",
			      	 "Cratio":"18%",
			      	 "Dpeople":"26",
			      	 "Dratio":"3%",

			      }
			 ]
		 	
		 	
		 };
		  
	 };        

$scope.areaTab=function(type,name,id){//区域切换
		$scope.variablePacket.id = id;
		$scope.variablePacket.type = type;
	     if(type == "1"){
	     	$scope.variablePacket.quanguo=true;
	     	$scope.variablePacket.provincenav=true;
		 	$scope.variablePacket.provincename=name;
		 	$scope.variablePacket.provinceId=id;
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);
		 	$scope.cityData();
	     };	     
		 if(type=="2"){
		 	$scope.variablePacket.quanguo=true;
	     	$scope.variablePacket.provincenav=true;
		 	$scope.variablePacket.citynav=true;
		 	$scope.variablePacket.cityname=name;
		 	$scope.variablePacket.cityId=id;
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);
		 	$scope.cityData();
		 };
		 if(type == "3"){
	     	$scope.variablePacket.countynav=true;
		 	$scope.variablePacket.countyname=name;
		 	$scope.variablePacket.countyId=id;
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);
		 	$scope.cityData();
	     };
		 if(type=="4"){
		 	 $scope.variablePacket.schoolnav=true;
		 	 $scope.variablePacket.schoolname=name;
		 	  $scope.variablePacket.schoolId=id;
		 	 findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);		 	
		 	 $scope.classData();
		 };
}; 
$scope.areaNav=function(type, id, name){      //区域导航切换
	$scope.variablePacket.id = id;
	$scope.variablePacket.type = type;
		 if(type=="0"){
		 	$scope.variablePacket.quanguo=true;	
		 	$scope.variablePacket.provincenav=false;
		 	$scope.variablePacket.citynav=false;
		 	$scope.variablePacket.countynav=false;
		 	$scope.variablePacket.schoolnav=false;
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);
		 	$scope.cityData();
		 }else if(type=="1"){
		 	$scope.variablePacket.quanguo=true;
	     	$scope.variablePacket.provincenav=true;
		 	$scope.variablePacket.provincename=name;
		 	$scope.variablePacket.citynav=false;
		 	$scope.variablePacket.countynav=false;
		 	$scope.variablePacket.schoolnav=false;
		 	$scope.variablePacket.cityname="";
		 	$scope.variablePacket.countyname="";
		 	$scope.variablePacket.schoolname="";
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id);
		 	$scope.cityData();
		 }else if(type=="2"){
		 	$scope.variablePacket.quanguo=false;
	     	$scope.variablePacket.provincenav=false;
		 	$scope.variablePacket.citynav=true;
		 	$scope.variablePacket.countynav=false;
		 	$scope.variablePacket.schoolnav=false;
		 	$scope.variablePacket.cityname=name;
		 	$scope.variablePacket.countyname="";
		 	$scope.variablePacket.schoolname="";
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id); 
		 	$scope.cityData();
		 }else if(type=="3"){
		 	$scope.variablePacket.quanguo=true;
	     	$scope.variablePacket.provincenav=true;
		 	$scope.variablePacket.citynav=true;
		 	$scope.variablePacket.countynav=true;
		 	$scope.variablePacket.schoolnav=false;
		 	$scope.variablePacket.countyname=name;
		 	$scope.variablePacket.schoolname="";
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id); 
		 	$scope.cityData();
		 }else if(type=="4"){
		 	$scope.variablePacket.quanguo=true;
	     	$scope.variablePacket.provincenav=true;
		 	$scope.variablePacket.citynav=true;
		 	$scope.variablePacket.countynav=true;
		 	$scope.variablePacket.schoolnav=true;
		 	$scope.variablePacket.schoolname=name;
		 	findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,type,id); 
		 	$scope.cityData();
		 }else{
		 	return;
		 }
	};
	 //以下echart
	 $scope.chart_column_stack_data = {
								"categories": ["慧源高复学校", "金榜高复", "无锡市第一中学", "无锡市辅仁高级中学", "无锡市青山高级中学", "江苏省梅村高级中学", "无锡市市北高级中学", "无锡市第一女子中学(高中部)", "无锡市第三高级中学", "无锡市第六高级中学", "无锡市大桥实验学校", "私立无锡光华学校高中部", "无锡市运河实验中学", "无锡外国语学校", "江苏省天一中学", "江苏省锡东高级中学", "江苏省怀仁中学", "江苏省锡山高级中学", "无锡市洛社高级中学", "无锡市玉祁高级中学", "无锡市堰桥高级中学", "江苏省太湖高级中学", "无锡市立人高级中学"],
								"ytitle": "比率",
								"totalName": "总人数",
								"units": "人",
								"data": [{
									"name": "A",
									"color": "#48bd7e",
									"level": 1,
									"data": [{
										"y": 39.47,
										"num": 30,
										"count": 76
									}, {
										"y": 59.38,
										"num": 212,
										"count": 357
									}, {
										"y": 77.29,
										"num": 456,
										"count": 590
									}, {
										"y": 73.88,
										"num": 430,
										"count": 582
									}, {
										"y": 5.84,
										"num": 26,
										"count": 445
									}, {
										"y": 82.6,
										"num": 508,
										"count": 615
									}, {
										"y": 44.04,
										"num": 255,
										"count": 579
									}, {
										"y": 19.61,
										"num": 50,
										"count": 255
									}, {
										"y": 45.23,
										"num": 147,
										"count": 325
									}, {
										"y": 9.68,
										"num": 48,
										"count": 496
									}, {
										"y": 98.13,
										"num": 105,
										"count": 107
									}, {
										"y": 0,
										"num": 0,
										"count": 66
									}, {
										"y": 1.52,
										"num": 1,
										"count": 66
									}, {
										"y": 60,
										"num": 45,
										"count": 75
									}, {
										"y": 87.53,
										"num": 667,
										"count": 762
									}, {
										"y": 43.93,
										"num": 315,
										"count": 717
									}, {
										"y": 25.81,
										"num": 144,
										"count": 558
									}, {
										"y": 83.38,
										"num": 617,
										"count": 740
									}, {
										"y": 52.72,
										"num": 300,
										"count": 569
									}, {
										"y": 48.81,
										"num": 205,
										"count": 420
									}, {
										"y": 6.39,
										"num": 20,
										"count": 313
									}, {
										"y": 42.6,
										"num": 239,
										"count": 561
									}, {
										"y": 0.37,
										"num": 1,
										"count": 273
									}]
								}, {
									"name": "B",
									"color": "#46a2d2",
									"level": 2,
									"data": [{
										"y": 36.84,
										"num": 28,
										"count": 76
									}, {
										"y": 30.53,
										"num": 109,
										"count": 357
									}, {
										"y": 21.02,
										"num": 124,
										"count": 590
									}, {
										"y": 23.02,
										"num": 134,
										"count": 582
									}, {
										"y": 40,
										"num": 178,
										"count": 445
									}, {
										"y": 16.26,
										"num": 100,
										"count": 615
									}, {
										"y": 46.8,
										"num": 271,
										"count": 579
									}, {
										"y": 54.51,
										"num": 139,
										"count": 255
									}, {
										"y": 42.46,
										"num": 138,
										"count": 325
									}, {
										"y": 41.53,
										"num": 206,
										"count": 496
									}, {
										"y": 1.87,
										"num": 2,
										"count": 107
									}, {
										"y": 0,
										"num": 0,
										"count": 66
									}, {
										"y": 16.67,
										"num": 11,
										"count": 66
									}, {
										"y": 34.67,
										"num": 26,
										"count": 75
									}, {
										"y": 11.15,
										"num": 85,
										"count": 762
									}, {
										"y": 40.86,
										"num": 293,
										"count": 717
									}, {
										"y": 56.63,
										"num": 316,
										"count": 558
									}, {
										"y": 14.46,
										"num": 107,
										"count": 740
									}, {
										"y": 37.43,
										"num": 213,
										"count": 569
									}, {
										"y": 44.29,
										"num": 186,
										"count": 420
									}, {
										"y": 33.87,
										"num": 106,
										"count": 313
									}, {
										"y": 37.97,
										"num": 213,
										"count": 561
									}, {
										"y": 12.82,
										"num": 35,
										"count": 273
									}]
								}, {
									"name": "C",
									"color": "#f4b242",
									"level": 3,
									"data": [{
										"y": 19.74,
										"num": 15,
										"count": 76
									}, {
										"y": 9.24,
										"num": 33,
										"count": 357
									}, {
										"y": 1.69,
										"num": 10,
										"count": 590
									}, {
										"y": 2.75,
										"num": 16,
										"count": 582
									}, {
										"y": 43.6,
										"num": 194,
										"count": 445
									}, {
										"y": 1.14,
										"num": 7,
										"count": 615
									}, {
										"y": 8.64,
										"num": 50,
										"count": 579
									}, {
										"y": 25.49,
										"num": 65,
										"count": 255
									}, {
										"y": 12,
										"num": 39,
										"count": 325
									}, {
										"y": 45.16,
										"num": 224,
										"count": 496
									}, {
										"y": 0,
										"num": 0,
										"count": 107
									}, {
										"y": 12.12,
										"num": 8,
										"count": 66
									}, {
										"y": 45.45,
										"num": 30,
										"count": 66
									}, {
										"y": 5.33,
										"num": 4,
										"count": 75
									}, {
										"y": 1.31,
										"num": 10,
										"count": 762
									}, {
										"y": 13.81,
										"num": 99,
										"count": 717
									}, {
										"y": 16.13,
										"num": 90,
										"count": 558
									}, {
										"y": 2.16,
										"num": 16,
										"count": 740
									}, {
										"y": 9.31,
										"num": 53,
										"count": 569
									}, {
										"y": 6.9,
										"num": 29,
										"count": 420
									}, {
										"y": 50.48,
										"num": 158,
										"count": 313
									}, {
										"y": 18.54,
										"num": 104,
										"count": 561
									}, {
										"y": 47.99,
										"num": 131,
										"count": 273
									}]
								}, {
									"name": "D",
									"color": "#f46765",
									"level": 4,
									"data": [{
										"y": 3.95,
										"num": 3,
										"count": 76
									}, {
										"y": 0.84,
										"num": 3,
										"count": 357
									}, {
										"y": 0,
										"num": 0,
										"count": 590
									}, {
										"y": 0.34,
										"num": 2,
										"count": 582
									}, {
										"y": 10.56,
										"num": 47,
										"count": 445
									}, {
										"y": 0,
										"num": 0,
										"count": 615
									}, {
										"y": 0.52,
										"num": 3,
										"count": 579
									}, {
										"y": 0.39,
										"num": 1,
										"count": 255
									}, {
										"y": 0.31,
										"num": 1,
										"count": 325
									}, {
										"y": 3.63,
										"num": 18,
										"count": 496
									}, {
										"y": 0,
										"num": 0,
										"count": 107
									}, {
										"y": 87.88,
										"num": 58,
										"count": 66
									}, {
										"y": 36.36,
										"num": 24,
										"count": 66
									}, {
										"y": 0,
										"num": 0,
										"count": 75
									}, {
										"y": 0,
										"num": 0,
										"count": 762
									}, {
										"y": 1.39,
										"num": 10,
										"count": 717
									}, {
										"y": 1.43,
										"num": 8,
										"count": 558
									}, {
										"y": 0,
										"num": 0,
										"count": 740
									}, {
										"y": 0.53,
										"num": 3,
										"count": 569
									}, {
										"y": 0,
										"num": 0,
										"count": 420
									}, {
										"y": 9.27,
										"num": 29,
										"count": 313
									}, {
										"y": 0.89,
										"num": 5,
										"count": 561
									}, {
										"y": 38.83,
										"num": 106,
										"count": 273
									}]
								}]
							};
							chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false);

							initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

							$('.chart-column-legends.stack-2 > span').click(function() {
								legendUpdate($(this), $('.chart-column-stack-2'), $scope.chart_column_stack_data.data, true);
							});
							
	if(session_scope == 1){
 		$scope.areaNav(session_scope,session_Obj.provinceId,session_Obj.provinceName); 		
 	}else if(session_scope == 2){
 		$scope.areaNav(session_scope,session_Obj.cityId,session_Obj.cityName);
 	}else if(session_scope == 3){
 		$scope.variablePacket.id = session_Obj.countyId;
 		$scope.variablePacket.type = "3";
 		$scope.variablePacket.quanguo = false;
 		$scope.findCityCount(session_Obj.countyId,'city',session_Obj.countyName); 
 	}else if(session_scope == 4){
 		$scope.variablePacket.id = session_Obj.officeId;
 		$scope.variablePacket.type = "4";
 		$scope.variablePacket.quanguo = false;
 		$scope.findCityCount(session_Obj.officeId,'county',session_Obj.officeName); 
 	}else{
 		//全国
 		$scope.variablePacket.quanguo = true;
 		findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,0,"");
 	}
	
	//查询课堂全国的数据
	function findData(schoolYear,team,evalWeiduName,type,id) {
		$http.get(interfaceIpAddr+'suzhi/findAll?type='+type+'&schoolYear='+schoolYear+'&team='+team+'&evalWeiduName='+evalWeiduName+'&id='+id).success(function(jdata) {
			var ret = jdata.ret;
			var mycategories = [];
			var dataAll = [];
			var dataJsonA = {};
			var dataJsonB = {};
			var dataJsonC = {};
			var dataJsonD = {};
			var dataA = [];
			var dataB = [];
			var dataC = [];
			var dataD = [];
			var alltableData={};
			var tableData = [];
			if(ret == 200){
				angular.forEach(jdata.data.all, function(e, i) {
					var sum = e.levela+e.levelb+e.levelc+e.leveld;
					mycategories.push(e.name);
					//给A值
					var levela = {};
					levela.y = e.levela;
					levela.num = e.levela;
					levela.count = sum;
					dataA.push(levela);
					
					//给B值
					var levelb = {};
					levelb.y = e.levelb;
					levelb.num = e.levelb;
					levelb.count = sum;
					dataB.push(levelb);
					
					//给C值
					var levelc = {};
					levelc.y = e.levelc;
					levelc.num = e.levelc;
					levelc.count = sum;
					dataC.push(levelc);
					
					//给D值
					var leveld = {};
					leveld.y = e.leveld;
					leveld.num = e.leveld;
					leveld.count = sum;
					dataD.push(leveld);
					
					var tableDataJson = {};
					tableDataJson.id = e.id;
					tableDataJson.name = e.name
					
					tableDataJson.Apeople = e.levela;
					tableDataJson.Bpeople = e.levelb;
					tableDataJson.Cpeople = e.levelc;
					tableDataJson.Dpeople = e.leveld;
					tableDataJson.Aratio = Math.round(e.levela/sum*100)+'%';
					tableDataJson.Bratio = Math.round(e.levelb/sum*100)+'%';
					tableDataJson.Cratio = Math.round(e.levelc/sum*100)+'%';
					tableDataJson.Dratio = Math.round(e.leveld/sum*100)+'%';
					if(type == "4"){
						tableDataJson.group='class';
					}
					console.log("tableDataJson===="+tableDataJson+"tableDataJson.group===="+tableDataJson.group)
					tableData.push(tableDataJson);
					//年级列表需要添加标志
					if(type == "4"){
						//添加班级列表项
						angular.forEach(e.classes, function(ee, j) {
							var sum2 = ee.levela+ee.levelb+ee.levelc+ee.leveld;
							var tableDataJson2 = {};
							tableDataJson2.id = ee.id;
							tableDataJson2.name = ee.name
							tableDataJson2.Apeople = ee.levela;
							tableDataJson2.Bpeople = ee.levelb;
							tableDataJson2.Cpeople = ee.levelc;
							tableDataJson2.Dpeople = ee.leveld;
							tableDataJson2.Aratio = Math.round(ee.levela/sum2*100)+'%';
							tableDataJson2.Bratio = Math.round(ee.levelb/sum2*100)+'%';
							tableDataJson2.Cratio = Math.round(ee.levelc/sum2*100)+'%';
							tableDataJson2.Dratio = Math.round(ee.leveld/sum2*100)+'%';
							tableData.push(tableDataJson2);
						});
					}
					
				});
				console.log(mycategories);
				$scope.chart_column_stack_data.categories = mycategories;
				
				dataJsonA.name = "A";
				dataJsonA.color = "#81D470";
				dataJsonA.level = 1;
				dataJsonA.data = dataA;
				
				dataJsonB.name = "B";
				dataJsonB.color = "#7CB5EC";
				dataJsonB.level = 2;
				dataJsonB.data = dataB;
				
				dataJsonC.name = "C";
				dataJsonC.color = "#F7A35C";
				dataJsonC.level = 3;
				dataJsonC.data = dataC;
				
				dataJsonD.name = "D";
				dataJsonD.color = "#F15C80";
				dataJsonD.level = 4;
				dataJsonD.data = dataD;
				
				dataAll.push(dataJsonD);
				dataAll.push(dataJsonC);
				dataAll.push(dataJsonB);
				dataAll.push(dataJsonA);
				console.log(dataAll);
				$scope.chart_column_stack_data.data = dataAll;
				
			    alltableData.name="名称";
			    alltableData.type=jdata.data.type;
			    if(type == "4"){
			    	alltableData.type="class";
			    }
			    alltableData.id=id;
			    console.log("tableData==="+tableData);
			    alltableData.data=tableData;
			    $scope.variablePacket.tableData = alltableData;

				chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false);

				initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

				
			}
			
		});
	}
	
	//切换学年时数据重新加载
	$scope.selectChange = function(n) {
		findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,$scope.variablePacket.type,$scope.variablePacket.id);
		$scope.cityData();
	}
	
	
	
	//切换学年时数据重新加载
	$("#teamName").change(function(){
		$scope.team = $(this).find(":selected").val();
		findData($scope.year,$scope.team,$scope.variablePacket.evalSuZhiName,$scope.variablePacket.type,$scope.variablePacket.id);
		$scope.cityData();
	});
	
}]);


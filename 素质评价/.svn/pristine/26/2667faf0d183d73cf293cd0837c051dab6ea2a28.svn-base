app.controller('teacherPersonalCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//默认学期为上学期
	var data="";
	var month = "";
	var year = "";
	$scope.term = $location.$$search.term||"上学期";
	//所带班级集合
	$scope.gradeList = [];
	$scope.gradeList1 = [];
 	//班级学生
 	$scope.stuList = {};
 	//模拟角色
	$scope.roles = [];
 	//变量包
	$scope.chooseTermVariable = {
		status : true,
		horn : false,
		list : false,
		type : 0,
		gradeState : $location.$$search.index || 0,
		roleState : $location.$$search.roleIndex || 0,
		teacherIn : 0,
		date:'2018-08-30',
		dateStatus:false,
		termActive : $location.$$search.term == '下学期' ? 1 : 0  //学期取值
	};
	getData();
	function getData(){
		$.ajax({
		type:"OPTIONS",
		url:"/",
		async : false,
		complete:function(x){
			//alert(x.getResponseHeader("Date"))//Wed, 27 Dec 2017 08:56:17 GMT  得到时间格式
			console.info(x.getResponseHeader("Date"));
			 data=new Date(x.getResponseHeader("Date"));//实例化时间
			 month=data.getMonth()+1;
			 year = data.getFullYear()+1;
			 
			 if($scope.term=="上学期"){
			 	if(month==9||month==10||month==11||month==12){
					$scope.chooseTermVariable.date=year+"-2-27";
					getDataStatus();
			 	}else if(month==1||month==2){
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-2-27";
			 		getDataStatus();
			 	}else{
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-2-27";
			 		$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}
			 	
			 }
			  if($scope.term=="下学期"){
			 	if(month==9||month==10||month==11||month==12){
					$scope.chooseTermVariable.date=year+"-8-31";
					$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}else if(month==1||month==2) {
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-8-31";
			 		$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}else{
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-8-31";
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 		getDataStatus();
			 	}
			 	
			 }
			//date=data;
			//alert(data.getFullYear());//得到当前的年份
			//alert(data.getMonth());//得到当前的年份
			}
	})
	}
	
	
	
	
	
	//登录用户信息
 	$scope.gradeInfo = JSON.parse(sessionStorage.getItem('user'));
 	//sessionStorage.setItem('user',angular.toJson($scope.gradeInfo));
 	var teaRole = JSON.parse(sessionStorage.getItem('user')).teacherInfo.teaRole;
	var strs= new Array(); //定义一数组 
	strs = teaRole.split(",");
	if(strs.indexOf("校领导")!=-1||strs.indexOf("德育主任")!=-1||strs.indexOf("工会主席")!=-1||strs.indexOf("校长")!=-1||strs.indexOf("书记")!=-1||strs.indexOf("教研员")!=-1||strs.indexOf("教务主任")!=-1){
		$scope.roles.push({name:'校领导',role:"校领导",src:""});
	}
	for (i=0;i<strs.length ;i++ ){ 
		//alert(strs[i].indexOf("校长"));
		if(strs[i].indexOf("年级组长")!=-1){
			$scope.roles.push({name:'年级组长',role:strs[i],src:""});
		}
	}
	/*if(strs.indexOf("班主任")!=-1){
		$scope.roles.push({name:'班主任',role:"班主任",src:"wrap.teacherPersonal"});
	}*/
	if(strs.indexOf("任课教师")!=-1){
		$scope.roles.push({name:'任课教师',role:"任课老师",src:""});
	}
	
	if(teaRole.indexOf("市级应用管理员") !=-1 ){
		$scope.roles.push({name:'市级应用管理员',role:"市级应用管理员",src:""});
	}
	for (j=0;j<$scope.roles.length ;j++ ){
		if($scope.roles[j].name=="校领导"){
			$scope.roles[j].src="wrap.schoolLeaderPersonal({roleIndex:'"+j+"'})";
		}else if($scope.roles[j].name=="年级组长"){
			$scope.roles[j].src="wrap.schoolLeaderPersonal({roleIndex:'"+j+"',roleAllName:'"+$scope.roles[j].role+"'})";
		}else if($scope.roles[j].name=="任课教师"){
			$scope.roles[j].src="wrap.teacherPersonal({roleIndex:'"+j+"'})";
			$scope.chooseTermVariable.teacherIn = j;
		}else if($scope.roles[j].name=="市级应用管理员"){
			$scope.roles[j].src="wrap.cityLeaderPersonal({roleIndex:'"+j+"'})";
		}
		
		
	}
	//查询学生信息
	$scope.showIndex = function(a){
		sessionStorage.setItem('stuClassId',a.classId);
		sessionStorage.setItem("gradeName",a.subStages);
		sessionStorage.setItem("classNo",a.classNo)
		$http.post(requireIp + 'suZhiEvaluate/InstructorController/findStu.do',{
			gradeName:a.subStages,
			term:$scope.term,
			classId:a.classId
		}).success(function(data){
			console.log(JSON.parse(data).data)
			$scope.stuList = JSON.parse(data).data;
		}).error(function(e){
			console.log(e)
		});
	};
	
	
 	
 	//获取老师代课信息
 	var user = $scope.gradeInfo.teacherInfo;
 	var teachingInfo = user.teachingInfo
 	sessionStorage.setItem("teaName",user.teaName);
    sessionStorage.setItem("teaId",$scope.gradeInfo.userId);
 	//获取班级集合
 	Object.getOwnPropertyNames(teachingInfo).forEach(function(val,idx, array){
            teachingInfo[val]
            $scope.gradeList1.push(teachingInfo[val])
        }) 
    console.log($scope.gradeList1)
    //去重
	var hash = {}; 
	$scope.gradeList = $scope.gradeList1.reduce(function(item, next) { 
	hash[next.classId] ? '' : hash[next.classId] = true && item.push(next); 
		return item 
	}, [])
	
    console.log($scope.gradeList)
 	$scope.showIndex($scope.gradeList[$location.$$search.index]);
 	var gradeData = $scope.gradeList[$location.$$search.index];
 	//初始班级班级
	$scope.className = $scope.gradeList[$location.$$search.index].subStages+$scope.gradeList[$location.$$search.index].classNo+'班';
	
	//上一级返回存储地址
	$scope.prevPageNo = 'teacherPersonal';
	
	//查看报告按钮，新窗口打开
	var reportUrl = $state.href('wrap.report',{stuId:8});
 	$scope.viewReport = function (obj){
 		console.log(obj)
 		reportUrl = $state.href('wrap.report',{stuId:obj.stuId,classId:obj.stuClassId});
 		window.open(reportUrl,'_blank');
 	};
	
	
	function getDataStatus(){
		//规定时间
	var thisDate = new Date($scope.chooseTermVariable.date);
	/*var d = new Date();
	var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	var nowDate = new Date(now);*/
	//当前时间
	var xhr = null;
	if(window.XMLHttpRequest){
	xhr = new window.XMLHttpRequest();
	}else{
	xhr = new ActiveObject("Microsoft")
	}
	xhr.open("GET","/",false)
	xhr.send(null);
	var nowDate = xhr.getResponseHeader("Date");
	nowDate = new Date(nowDate);
	if(thisDate>nowDate){
		$scope.chooseTermVariable.dateStatus = true;
	}else{
		$scope.chooseTermVariable.dateStatus = false;
	}
	sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
	console.log($scope.chooseTermVariable.dateStatus)
	}
	
	//选择学期按钮
	$scope.chooseTermBtn = function (){
		if($scope.chooseTermVariable.status){
			$scope.chooseTermVariable.horn = true;
			$scope.chooseTermVariable.list = true;
			$scope.chooseTermVariable.status = false;
		}else{
			$scope.chooseTermVariable.horn = false;
			$scope.chooseTermVariable.list = false;
			$scope.chooseTermVariable.status = true;
		}
	};
	
	//点击页面其它位置 学期列表隐藏
	var termList = document.querySelector('.icon-jiantou2');
	$(document).on('click',function (e){
		var tar = e.target;
		if(tar != termList){
			$scope.$apply(function (){
				$scope.chooseTermVariable.horn = false;
				$scope.chooseTermVariable.list = false;
				$scope.chooseTermVariable.status = true;
			});
		}
	});
	
	//切换学期下拉
	$scope.chooseTerm = function (tar,i){
		$scope.term = angular.element(tar.target).html();
		sessionStorage.setItem("term",$scope.term);
		//console.log(angular.element(tar.target).html())
		//$scope.tconserm = 
		$scope.chooseTermVariable.termActive = i;
		if(i==0){
			
			if(month==9||month==10||month==11||month==12){
					$scope.chooseTermVariable.date=year+"-2-27";
					getDataStatus();
			 	}else if(month==1||month==2){
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-2-27";
			 		getDataStatus();
			 	}else{
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-2-27";
			 		$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}
		}else{
			if(month==9||month==10||month==11||month==12){
					$scope.chooseTermVariable.date=year+"-8-31";
					$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}else if(month==1||month==2) {
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-8-31";
			 		$scope.chooseTermVariable.dateStatus = false;
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 	}else{
			 		$scope.chooseTermVariable.date=data.getFullYear()+"-8-31";
			 		sessionStorage.setItem("dataState",$scope.chooseTermVariable.dateStatus)
			 		getDataStatus();
			 	}
		}
		

		$scope.showIndex(gradeData);
		pingZhu();
	};
	console.log($scope.term)
	sessionStorage.setItem("term",$scope.term);
	
	
	
	//角色切换
	$scope.roleChange = function (i){
		$scope.chooseTermVariable.roleState = i;
		if($scope.roles[i].role=="任课老师"){
//			$rootScope.userType = 'teacher';
			sessionStorage.setItem('userType', 'teacher');
		}else{
//			$rootScope.userType = 'leader';
			sessionStorage.setItem('userType', 'leader');
		}
	};
	
    //顶部切换年级班级
    $scope.gradeTab = function (i,tar,data){
    	//console.log($(".active").html())
    	sessionStorage.setItem('stuClassId',data.classId);
		sessionStorage.setItem("gradeName",data.subStages);
		sessionStorage.setItem("classNo",data.classNo)
    	sessionStorage.setItem("term",$scope.term);
    	$scope.chooseTermVariable.gradeState = i;
    	$scope.className = angular.element(tar.target).html();
		$scope.showIndex(data);
		
		gradeData = data;
		pingZhu();	
    };

	//评价进度，评价统计切换
	$scope.switchComment = function (i){
		$scope.chooseTermVariable.type = i;
	};
	
	 
	//评价进度变量包
	$scope.evaluateProgress = {
		upload : true,
		grade : true,
		teacher : false,
		oneself : false,
		parent : true,
		operate : true
	}
 	$scope.ccc=aaa;
	pingZhu();
	
	function pingZhu(){
		
		var classId = sessionStorage.getItem('stuClassId');
		var className = '('+sessionStorage.getItem('classNo')+')班';
		var gradeName = sessionStorage.getItem('gradeName');
		var term = sessionStorage.getItem('term');
		/*var classId = 'class_fb4c63799dcf4df18a48125930788e97';
		var className = '(1)班';
		var gradeName = '初一';
		var term = '上学期';*/
		//通过学校Id和年级名称查询班级
		$http.post(requireIp + 'teacher/leaDerController/findClassSuZhiData.do', {
			classId: classId,
			className: className,
			gradeName:gradeName,
			term: term
		}).success(function(data) {
	        console.info(data);        
	   		$scope.allData=data.data;
	   		
	   		//重新组装数据给图标
			$scope.teaJsData=JSON.stringify(data.data);
			//findTeaZhu(data.data);
			$scope.ccc();
		});
		console.log(classId+gradeName+term)
		$http.post(requireIp + 'teacher/leaDerController/stuSuZhiInfo.do', {
			classId: classId,
			gradeName:gradeName,
			term: term
		}).success(function(jdata) {
	        console.info(typeof jdata);
	       if(jdata!=""){
	       	 $scope.jdata3=JSON.parse(jdata);
	       }else{
	       	 $scope.jdata3=[];
	       }
	   		
		});
		
	}
	

	


	/*
	function findTeaZhu(jdata){
		/*setTimeout(function() {
		//allData = $("#teaJsData").html();
		//var jdata = eval('(' + allData + ')');
		console.info(111);
		console.info(jdata);
		var allList = new Array();
	    for(var m = 0; m < 4; m++){
			var o = new Object();
			if(m==0){
				var listOne = new Array();
				o.name="优秀";
				o.color="#32ba54";
				o.level=1;
				for(var k = 0; k < jdata.length; k++) {
					var b = new Object();
					b.y=((parseFloat((jdata[k].data)[0].countA))/
						(parseFloat((jdata[k].data)[0].countNum)))*100;
					b.num=parseInt((jdata[k].data)[0].countA);//优秀的人数
					b.count=parseInt((jdata[k].data)[0].countNum);//总人数
						listOne[k] = b;
				}
				o.data=listOne;
				allList.push(o);
			}
			if(m==1){
				var listOne = new Array();
				o.name="良好";
				o.color="#3598db";
				o.level=2;
				for(var k = 0; k < jdata.length; k++) {
					var b = new Object();
					b.y=((parseFloat((jdata[k].data)[0].countB))/
						(parseFloat((jdata[k].data)[0].countNum)))*100;
					b.num=parseInt((jdata[k].data)[0].countB);//优秀的人数
					b.count=parseInt((jdata[k].data)[0].countNum);//总人数
					listOne[k] = b;
				}
				o.data=listOne;
				allList.push(o);
			}
			if(m==2){
				var listOne = new Array();
				o.name="及格";
				o.color="#fdbc2a";
				o.level=3;
				for(var k = 0; k < jdata.length; k++) {
					var b = new Object();
					b.y=((parseFloat((jdata[k].data)[0].countC))/
						(parseFloat((jdata[k].data)[0].countNum)))*100;
					b.num=parseInt((jdata[k].data)[0].countC);//优秀的人数
					b.count=parseInt((jdata[k].data)[0].countNum);//总人数
					listOne[k] = b;
				}
				o.data=listOne;
				allList.push(o);
			}
			if(m==3){
				var listOne = new Array();
				o.name="不及格";
				o.color="#fb5252";
				o.level=4;
				for(var k = 0; k < jdata.length; k++) {
					var b = new Object();
					b.y=((parseFloat((jdata[k].data)[0].countD))/
					    (parseFloat((jdata[k].data)[0].countNum)))*100;
					b.num=parseInt((jdata[k].data)[0].countD);//优秀的人数
					b.count=parseInt((jdata[k].data)[0].countNum);//总人数
					listOne[k] = b;
			    }
				o.data=listOne;
				allList.push(o);
			}
		}
		console.info(allList);
			zyx_Data1.categories=["思想品德和公民素养", "学业水平和学习素养", "身体和心里健康水平", "兴趣特长及审美素养","社会实践和动手能力"];
		zyx_Data1.data=allList;	
		chart_column_stack('.chart1', zyx_Data1.title, zyx_Data1.categories, zyx_Data1.ytitle,zyx_Data1.data, zyx_Data1.totalName, zyx_Data1.units, false);
		
		initSingleColumnChart($('.chart1'), zyx_Data1.data);
		
		$('.chart-column-legend > span').on("click",function(){
				legendUpdate($(this), $('.chart1'), zyx_Data1.data, true);});
		
	}*/


}]);


	
	
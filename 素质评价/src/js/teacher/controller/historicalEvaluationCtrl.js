app.controller('historicalEvaluationCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//获取教师页面下标返回
	$scope.teacherIn = $location.$$search.roleIndex;
	
	//获取学期
	$scope.term = $location.$$search.term || '上学期';
		
	//获取上级页面年级下表
	$scope.index = $location.$$search.index;
	
   	var classId = sessionStorage.getItem('stuClassId');
	var className = '('+sessionStorage.getItem('classNo')+')班';
	var gradeName = sessionStorage.getItem('gradeName');
	
	
	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth()+1;
	var year="";
	var year1="";
	var year2="";
	
	$scope.schoolYears =[];
	
	if(gradeName=="初一"){
		if(nowMonth==9||nowMonth==10||nowMonth==11||nowMonth==12){
			var newYear=  parseInt(nowYear)+1;
			var year=nowYear+"-"+newYear+"学年";
		}else{
			var newYear=  parseInt(nowYear)-1;
			var year=newYear+"-"+nowYear+"学年";
		}
		//alert(year);
		$scope.schoolYears.push(year);
	}else if(gradeName=="初二"){
		if(nowMonth==9||nowMonth==10||nowMonth==11||nowMonth==12){
			var newYear=  parseInt(nowYear)+1;
			
			var xinyear =parseInt(nowYear)-1
			var year1=xinyear+"-"+nowYear+"学年";
			
			var year=nowYear+"-"+newYear+"学年";
		}else{
			var newYear=  parseInt(nowYear)-1;
			var xinyear =parseInt(newYear)-1
			var year1=xinyear+"-"+newYear+"学年";
			var year=newYear+"-"+nowYear+"学年";
		}
		//alert(year);
		$scope.schoolYears.push(year1);
		$scope.schoolYears.push(year);
	}else{
		if(nowMonth==9||nowMonth==10||nowMonth==11||nowMonth==12){
			var newYear=  parseInt(nowYear)+1;
			
			var xinyear =parseInt(nowYear)-1;
			var xiaoyear =parseInt(xinyear)-1;
			var year2=xiaoyear+"-"+xinyear+"学年";
			var year1=xinyear+"-"+nowYear+"学年";
			var year=nowYear+"-"+newYear+"学年";
		}else{
			var newYear=  parseInt(nowYear)-1;
			var xinyear =parseInt(newYear)-1;
			var xiaoyear =parseInt(xinyear)-1;
			var year2=xiaoyear+"-"+xinyear+"学年";
			var year1=xinyear+"-"+newYear+"学年";
			var year=newYear+"-"+nowYear+"学年";
		}
		//alert(year);
		$scope.schoolYears.push(year2);
		$scope.schoolYears.push(year1);
		$scope.schoolYears.push(year);
		
	}
	
	$scope.x=$scope.schoolYears[0];
	
	findClassData(($scope.schoolYears[0]).substring(0,($scope.schoolYears[0]).length-2));
	
	$scope.selectSchoolYear=function(x){
		//alert(x);
		var schoolYear = x.substring(0,x.length-2);
		//alert(schoolYear);
		findClassData(schoolYear)
	}
	
	function findClassData(schoolYear){
		
		
		$http.post(requireIp + 'teacher/leaDerController/stuSuZhiInfo.do', {
			classId: classId,
			gradeName:gradeName,
			schoolYear:schoolYear,
			term: '上学期'
		}).success(function(jdata) {
			console.info();
	        console.info(JSON.parse(jdata));
	        
	   		$scope.jdata=JSON.parse(jdata);
   		
		});
	
		$http.post(requireIp + 'teacher/leaDerController/stuSuZhiInfo.do', {
			classId: classId,
			gradeName:gradeName,
			schoolYear:schoolYear,
			term: '下学期'
		}).success(function(jdata) {
	        console.info(JSON.parse(jdata));
	        
	   		$scope.jdataXia=JSON.parse(jdata);
	   		
		});
	}
}]);


	
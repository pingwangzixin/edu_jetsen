
app.controller('wrapCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope',function($scope,$state,$timeout,$http,$location,$q,$rootScope) {
	
	$scope.userInfo = {};
	$scope.userName = "";
	$scope.schoolName = "";
	$scope.userInfo = JSON.parse(sessionStorage.getItem("user"))
	console.log($scope.userInfo)
	if($scope.userInfo.userRole=='tea'){
		$scope.userName = $scope.userInfo.teacherInfo.teaName
		$scope.schoolName = $scope.userInfo.teacherInfo.schoolName
	}else if($scope.userInfo.userRole=='stu'){
		$scope.userName = $scope.userInfo.studentInfo.stuName
		$scope.schoolName = $scope.userInfo.studentInfo.stuClassInfo.schoolName
	}else if($scope.userInfo.userRole=='parents'){
		$scope.userName = $scope.userInfo.parentsInfo.parentsName
		$scope.schoolName = $scope.userInfo.studentInfo.stuClassInfo.schoolName
	}
	console.log($scope.userName)
	$scope.tuichu = function(){
		$http.post(requireIp+'loginController/logout.do',{
			
		}).success(function(data){
			window.location.href=data;
		}).error(function(){
		})
	}
	/*var token = $location.$$search.token;
	if(token == null || token == "" || token == undefined){
		token = sessionStorage.getItem('token');
	}else{
		sessionStorage.setItem('token',token);
	}*/
	/*var token = '3fddf20d0edd5f5109ddfe85ecdfc513';
	var url = jeucIp+"/Api/UserInfo/getUser?token="+token+"&clientId="+clientid+"&clientSecret="+clientSecret;
//	var url = "http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaIdCard=100000200006090000"
	$http.get(url).success(function(res){
		if(res.ret != "1"){
			return ;
		}
		if(res.userRole == "tea"){
			sessionStorage.setItem("user",JSON.stringify(res));
			var odjs= JSON.stringify(res.teacherInfo);
			if((res.teacherInfo.teaRole.indexOf("校领导")!=-1)||(res.teacherInfo.teaRole.indexOf("年级组长")!=-1)){
				sessionStorage.setItem('userType','leader');
			}else{
				sessionStorage.setItem('userType','teacher');
			}
			
			
		}else if(res.userRole == "stu"){
			sessionStorage.setItem("user",JSON.stringify(res));
			sessionStorage.setItem('userType','student');
			
		}else{
			sessionStorage.setItem("user",JSON.stringify(res));
			sessionStorage.setItem('userType','student');
			
		}
//		alert(sessionStorage.getItem('userType'));
		$rootScope.userType = sessionStorage.getItem('userType');
		console.log($rootScope.userType)
	});
	
//	sessionStorage.setItem('userType','leader');
	

    console.log($rootScope.aaaa)
    $scope.$emit('ty',$rootScope.userType);
    $rootScope.aaaa = 666666666666;
    */
	
	
	//##################素质评价用户行为调用####################################
	
	var second = 0;
	var startTime,endTime;
	
	$.ajax({
		type:"get",
		url:eaIp+"/userStatistic/getCurrentTime",
		async:false,
		success:function(res){
			startTime=res.data.currentTime
		}
	});

	window.setInterval(function() {
		second++;
	}, 1000);



	/*结束时保存设备状态必须使用beforeunload*/
	window.onbeforeunload = function() {
		$.ajax({
			type:"get",
			url:eaIp+"/userStatistic/getCurrentTime",
			async:false,
			success:function(res){
				endTime=res.data.currentTime
			}
		});
		var userId ="";
		if($scope.userInfo.userRole == 'tea'){
			userId = $scope.userInfo.userRole+"_"+$scope.userInfo.teacherInfo.schoolId+"_"+$scope.userInfo.teacherInfo.teaId;
		}else{
			userId =$scope.userInfo.userRole+"_"+$scope.userInfo.studentInfo.stuClassInfo.schoolId+"_"+$scope.userInfo.teacherInfo.stuId;
		}
		 
		var dataArr = {
			'userId': userId,
			'moduleName': "suzhipingjia",
			'time': second + '秒',
			'startTime': startTime,
			'endTime': endTime,
		};
		var url = eaIp+"/behavior";
		$.ajax({
			type: "POST",
			url: url,
			async: false, //必须采用同步方法
			data: dataArr,
			success: function(res) {
				console.log(res)
			}
		});
	};
	//######################################################
}]);

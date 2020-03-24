app.controller('secondNavCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,templateServer,$stateParams) {
	//导航展示情况
	$scope.navShowDet = {
//		title : '谁谁谁的空间',	//最左侧标题
//		secondTitle : '首页',	//左侧标题旁边二级标题
		middleAdmin : false,	//中间的 机构、用户、角色管理  （布尔值：是否展示，true展示）
		goBackCloud : true		//右边的 捷成教育云返回 （布尔值：是否展示，true展示）
	};
	//导航参数获取
	$scope.$on('nav',function (event,data){
		$scope.navShowDet = data;
		concole.log($scope.navShowDet);
	});
	
	 
	
	
	var token = $stateParams.token;
	//通过token获取用户信息
	console.log(jeucIp + 'leaderLogin/findUserByToken?token='+token);
	//var mdjUrl = mdjIp+'/Api/SchoolInfo/getSchool?clientId='+clientId+'&clientSecret='+clientSecret+'&token='+token;
$http.get(jeucIp + 'leaderLogin/findUserByToken?token='+token).success(function(res)
			{
		console.log(res);
		if(res.ret=='1'){
			var userName = res.teacherInfo.teaTel;
			var jmhPassWord = res.teacherInfo.teaPassword;

			console.log(jeucIp + 'leaderLogin/login?userName='+userName+'&jmhPassWord='+jmhPassWord);
			$http.get(jeucIp + 'leaderLogin/login?userName='+userName+'&jmhPassWord='+jmhPassWord).success(function(res){
				 
			if(res.ret==200){
				console.log(res);
				var managerSearch = {
					userId: res.data.id,
					name : res.data.name,
					scope: res.data.scope,
					provinceId: res.data.provinceId,
					provinceName: res.data.provinceName,
					cityId: res.data.cityId,
					cityName: res.data.cityName,
					countyId: res.data.countyId,
					countyName: res.data.countyName,
					officeId: res.data.officeId,
					officeName: res.data.officeName,
					officeCode: res.data.officeCode
				}
				console.log(managerSearch);
				managerSearch = JSON.stringify(managerSearch);
				sessionStorage.setItem('managerSearch',managerSearch);
				$scope.name=JSON.parse(sessionStorage.getItem('managerSearch')).name;
			}else{
				//console.log("ID获取用户失败")
				alert("用户名或者密码错误");
				sessionStorage.clear();
				//window.parent.location.href = mdjIp;
			}
			
		})	
			
		}else{
		//	window.parent.location.href = mdjIp;
		}
	});
	

	
	
	
	
	
	
	$scope.logOut = function() {
		sessionStorage.clear();
		$state.go("entry");
		
	}

$scope.jinrujiuban = function() {
		 
		window.parent.location.href = olderLeaderIp;
	}

}]);
 
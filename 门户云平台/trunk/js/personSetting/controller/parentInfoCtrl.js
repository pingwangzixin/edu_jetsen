app.controller('parentInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//导航切换
	$scope.personalInfoState = 0;
//	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	$scope.state={
		add_zinv:false,
	}
	
	//验证
	$scope.Verification = function(ok){
		if(ok){
			alert('成功了')
		}
	}
	
	//变量包
	$scope.aggregate = {
		join : 0,
	};
	
	//个人信息，账户管理切换
	$scope.switchContent = function(i){
		$scope.aggregate.join = i;
	}
	
	//子女资料数据
	$scope.childrenData = [{
		"name":"六福",
		'id':"LS245748746759876",
		"school":"皇姑区第六小学皇姑区第六小学",
		"grade":"一年级",
		"class":"一班"
	},{
		"name":"赵艳",
		'id':"LS245748746759877",
		"school":"启蒙学校",
		"grade":"幼儿班",
		"class":"一班"
	},{
		"name":"李丹",
		'id':"LS245748746759878",
		"school":"圣诞节学校",
		"grade":"六年级",
		"class":"一班"
	}];
	
}]);


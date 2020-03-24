app.controller('applicationCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示
	$scope.$emit('nav',true);
	
	//有用户id
	var userId = sessionStorage.getItem('userId') || 0;
	
	//应用切换
	$scope.applicaionState = {
		all : true,
		website : false,
		tool : false,
		game : false
	};
	$scope.applicaionSwitch = function (state){
		angular.forEach($scope.applicaionState,function (v,i){
			$scope.applicaionState[i] = false;
		});
		$scope.applicaionState[state] = true;
	};
	
	//应用{params:}
	$http.get(requireIp + 'jeuc/api/sys/app?classifyId=-1').success(function (res){
		$scope.application = res.data.resList;
		angular.forEach($scope.application,function (v,i){
			v.star = [];
			for(var j=0;j<v.appGrade;j++){
				v.star.push(j);
			}
		});
	})
	
	//应用{params:}
	$http.get(requireIp + 'jeuc/api/sys/app?classifyIds=1').success(function (res){
		console.log(res);
		$scope.applicationWeb = res.data.resList;
		$scope.application = res.data.resList;
		angular.forEach($scope.application,function (v,i){
			v.star = [];
			for(var j=0;j<v.appGrade;j++){
				v.star.push(j);
			}
		});
	})//应用{params:}
	$http.get(requireIp + 'jeuc/api/sys/app?classifyIds=2').success(function (res){
		console.log(res);
		$scope.applicationGame = res.data.resList;
		$scope.application = res.data.resList;
		angular.forEach($scope.application,function (v,i){
			v.star = [];
			for(var j=0;j<v.appGrade;j++){
				v.star.push(j);
			}
		});
	})//应用{params:}
	$http.get(requireIp + 'jeuc/api/sys/app?classifyIds=3').success(function (res){
		console.log(res);
		$scope.applicationTool = res.data.resList;
		$scope.application = res.data.resList;
		angular.forEach($scope.application,function (v,i){
			v.star = [];
			for(var j=0;j<v.appGrade;j++){
				v.star.push(j);
			}
		});
	})
	
	$scope.appU = function(i){
		if(userId){
			window.open(i.appUrl+"&userId="+userId);
		}else{
			location.href = path + '#/login';
		}
	}
	

}]);
//新闻展示时间过滤器
app.filter('timeFilter',function(){
	return function(obj){
    	return obj.substr(0,10);
	}
});
app.filter('payFilter',function(){
	return function(obj){
		if(obj == 1){
			return "付费";
		}else{
			return "免费";
		}
	}
});

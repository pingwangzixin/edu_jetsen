app.controller('helpListCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示
	$scope.$emit('nav',true);
	
	//新手指南 常见问题
	$scope.state = {
		problem : 0,
		guide : 0
	}
	$scope.problemSwitch = function (i){
		$scope.state.problem = i;
	};
	$scope.guideSwitch = function (i){
		$scope.state.guide = i;
	};
	
	$scope.question = {};
	
	$http.get("file/help_json.js").success(function(data) {
         console.log(data);
         $scope.question = data;
	});
	
//	wrap.help.helpDetails
	$scope.questionInfo = function(ques){
		sessionStorage.setItem('ques',JSON.stringify(ques));
		$state.go("wrap.help.helpDetails");
	}
	
}]);

app.controller('helpDetailsCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示
	$scope.$emit('nav',true);
	
	$scope.ques = JSON.parse(sessionStorage.getItem('ques'));
	console.log($scope.ques);
}]);

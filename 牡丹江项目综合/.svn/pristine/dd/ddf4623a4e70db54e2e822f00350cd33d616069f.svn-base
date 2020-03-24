app.controller('topStudentListCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//返回按钮返回路径
	if($location.$$search.bestStuId == '' || $location.$$search.bestStuId == undefined){
		$scope.prevPath = 'wrap.' + $location.$$search.prevPage;
	}else{
		$scope.prevPath = 'wrap.publicEvaluation({bestStuId : '+$location.$$search.bestStuId+'})';
	}
	


}]);



	
app.controller('guideDelNewCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
		barArrShow : $stateParams.guidanceDetails == 'true' ? false : true,		//二级导航是否显示
		barArr : $stateParams.completionStatus == 'true' ? [{name : '完成情况',href : 'secondNav.guideDelNew.completionStatus'}] : [{name : '批阅导学',href : 'secondNav.guideDelNew.markingGuidance'},{name : '导学分析',href : 'secondNav.guideDelNew.guidanceAnalysis'}]	,	//二级导航
		backUrl : $stateParams.guidanceDetails == 'true' ? 'secondNav.guideList' : 'secondNav.guideDelNew.guidanceDetails({"guidanceDetails":true})'	//标题返回路径	
	};

	console.log($scope.variablePacket.barArrShow)
}]);


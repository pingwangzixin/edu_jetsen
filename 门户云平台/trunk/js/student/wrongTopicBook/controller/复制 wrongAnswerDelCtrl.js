app.controller('wrongAnswerDelCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//变量包
	$scope.variablePacket = {
		subjectArr : [{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'}],		//导航科目
		subjectActive : 0,				//导航学科默认选中高亮
	};
	
	//导航学科切换事件
	$scope.subjectTab = function (i){
		$scope.variablePacket.subjectActive = i;
	};
	
	
}]);
app.controller('completionStatusCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
		studyState : 0,
		defultStudyList : ['小黑伞','小黑伞','小黑d伞','小伞','小黑','小黑伞','小黑伞','小黑伞','小黑伞','小黑伞','小黑伞',]
	};
	
	//已学习/未学习状态切换
	$scope.studyStateFn = function (i){
		$scope.variablePacket.studyState = i;
	};
}]);


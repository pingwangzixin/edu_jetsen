app.controller('markingGuidanceCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
		stuList : {						
			notRead:[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			alreadyRead:[{name:'文学'},{name:'说的'},{name:'你丫的'}],
			noSub:[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		},							
	};
	
	//学生列表请求成功之后判断
	var borderLen = 0;
	angular.forEach($scope.variablePacket.stuList,function (e,i){
		borderLen += e.length;
		$scope.variablePacket.listBorder = borderLen % 2 ? false : true;
	});


}]);


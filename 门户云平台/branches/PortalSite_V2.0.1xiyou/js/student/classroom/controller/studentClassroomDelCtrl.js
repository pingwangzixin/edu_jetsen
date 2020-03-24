app.controller('studentClassroomDelCtrl',['$scope','$rootScope','$stateParams','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$rootScope,$stateParams,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课堂记录';
	
	//变量包
	$scope.variablePacket = {
		topShow : true,		//学生情况，以及导学内容显示
		barArr : [{name : '课堂内容',href : 'secondNav.studentClassroomDel.studentClassroomContent'},{name : '课堂表现',href : 'secondNav.studentClassroomDel.classroomPerformance'}],		//二级导航
        className:$stateParams.className,
        date:$stateParams.date
	};
	
	
}]);
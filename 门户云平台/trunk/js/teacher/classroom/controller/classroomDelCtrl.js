app.controller('classroomDelCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课堂记录';
	
	console.log($stateParams.className);
	//变量包
	$scope.variablePacket = {
		topShow : true,		//学生情况，以及导学内容显示
		barArr : [{name : '课堂内容',href : 'secondNav.classroomDel.classroomContent'},{name : '学生情况',href : 'secondNav.classroomDel.classroomStudentSituation'}],		//二级导航
		className:$stateParams.className,
		date:$stateParams.date

	};
	
}]);
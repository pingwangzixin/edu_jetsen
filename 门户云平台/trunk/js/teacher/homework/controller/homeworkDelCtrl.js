app.controller('homeworkDelCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	var teaExamInfo = JSON.parse(sessionStorage.getItem("teaExamInfo"))
	//变量包
	$scope.variablePacket = {
		/*barArr : [{name:'学生情况',href:'secondNav.homeworkDel.homeworkStudentSituation({state : "' + $location.$$search.state + '",type : "'+ $location.$$search.type + '"})'},{name:'练习分析',href:'secondNav.homeworkDel.practiceAnalysis({state : "' + $location.$$search.state + '",type : "'+ $location.$$search.type + '"})'}],				//导航*/
		barArr : [{name:'学生情况',href:'secondNav.homeworkDel.homeworkStudentSituation'},{name:'练习分析',href:'secondNav.homeworkDel.practiceAnalysis'}],				//导航
		examName:teaExamInfo.examName,
		examTime:teaExamInfo.examTime,
		className:teaExamInfo.className,
		remark:teaExamInfo.remark
	};
	
}]);
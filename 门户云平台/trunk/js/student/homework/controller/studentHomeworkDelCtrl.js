app.controller('studentHomeworkDelCtrl',['$scope','$state','$rootScope','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$state,$rootScope,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	var stuExamInfo = JSON.parse(sessionStorage.getItem("stuExamInfo"))
	var examId = stuExamInfo.examId;
	var stuId = stuExamInfo.stuId;
	var stuName = stuExamInfo.stuName;
	var classId = stuExamInfo.classId;
	var className = stuExamInfo.className;
	
	$scope.examInfo = {
		examName: JSON.parse(sessionStorage.getItem("stuExamInfo")).examName,
		examTime: JSON.parse(sessionStorage.getItem("stuExamInfo")).examTime,
		remark: JSON.parse(sessionStorage.getItem("stuExamInfo")).remark,
		className: JSON.parse(sessionStorage.getItem("stuExamInfo")).className
	}
	
	//变量包
	$scope.variablePacket = {
//		barArr : [{name:'练习内容',href:'secondNav.studentHomeworkDel.exerciseContent({state : "' + $location.$$search.state + '",type : "'+ $location.$$search.type + '"})'},{name:'练习分析',href:'secondNav.studentHomeworkDel.studentPracticeAnalysis({state : "' + $location.$$search.state + '",type : "'+ $location.$$search.type + '"})'}],				//导航
		barArr : [{name:'练习内容',href:'secondNav.studentHomeworkDel.exerciseContent'},{name:'练习分析',href:'secondNav.studentHomeworkDel.studentPracticeAnalysis'}],				//导航
	};
	
}]);
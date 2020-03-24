app.controller('inClassDelCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
//	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	//变量包
	$scope.variablePacket = {
		//公共参数，将后台查询回的参数赋值给当前变量
		name:'',//导学或者作业名称
		subjectName:'',//所属学科名称
		className:'',//作答对象名称
		/********************/
		guideId:'',//导学id
		guidanceSituation:{},//导学名字
		barArrShow : $stateParams.guidanceDetails == 'true' ? false : true,		//二级导航是否显示
//		barArr : ($stateParams.completionStatus == 'true' && $stateParams.type == 'guidance') ? [{name : '批阅导学',href : 'secondNav.inClassDel.inClassMarking'},{name : '导学分析',href : 'secondNav.inClassDel.inClassAnalysis'}]	: [{name : '批阅作业',href : 'secondNav.inClassDel.inClassMarking'},{name : '作业分析',href : 'secondNav.inClassDel.inClassAnalysis'}],	//二级导航
		barArr : [{name : '批阅试卷',href : 'secondNav.inClassDel.inClassMarking'},{name : '试卷分析',href : 'secondNav.inClassDel.inClassAnalysis'}],	//二级导航
		backUrl : $stateParams.guidanceDetails == 'false' ? 'secondNav.inClassDel.inClassDetails({"guidanceDetails":true})' : ($stateParams.type == 'guidance' ? 'secondNav.guideList({"stage":"'+$stateParams.stage+'"})' : 'secondNav.homeworkList({"stage":"'+$stateParams.stage+'"})'),	//标题返回路径
	};
	
/********************************导学****************************************/
	/**
	 * 根据导学id查询导学详情
	 * 郭峪诚
	 */
	$scope.guidanceList = function(guidanceId){
		$http.get(guidanceLearningIp + 'learn?id='+$scope.variablePacket.guideId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.guidanceSituation=data.data[0];
				$scope.variablePacket.name= $scope.variablePacket.guidanceSituation.guidanceLearn.name;
				$scope.variablePacket.subjectName= $scope.variablePacket.guidanceSituation.guidanceLearn.subjectName;
				console.log($scope.variablePacket.guidanceSituation);
			}
	    })
	}
/********************************导学****************************************/


	/**
	 * 判断是导学详情还是作业详情
	 * 郭峪诚
	 */
	if($stateParams.type == 'guidance'){
		console.log("导学详情");
		$scope.variablePacket.className= $location.$$search.className;
		$scope.variablePacket.guideId= $location.$$search.packjectId;
		$scope.guidanceList($scope.variablePacket.guideId);
	}else{
		console.log("作业详情");
		$scope.variablePacket.className= $location.$$search.className;
		$scope.variablePacket.name= $location.$$search.projectName;
		$scope.variablePacket.subjectName= $location.$$search.subjectName;
	}
}]);


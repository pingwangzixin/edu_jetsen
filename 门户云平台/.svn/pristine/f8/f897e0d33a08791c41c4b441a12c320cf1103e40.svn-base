app.controller('guideDelCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课前导学';


	//是否显示头部导航
	$scope.$on('faHeadBar',function (obj,data){
		$scope.variablePacket.topShow = data;
	});
	
	//变量包
	$scope.variablePacket = {
		className:'',
		guidanceSituation:{},
		topShow : true,		//学生情况，以及导学内容显示
		/*barArr : [{name : '学生情况',href : 'secondNav.guideDel.guideStudentSituation({resourceReturn : "' + $location.$$search.resourceReturn +'"})'},{name : '导学内容',href : 'secondNav.guideDel.guideContent({state : "echo",resourceReturn : "' + $location.$$search.resourceReturn + '"})'}]		//二级导航*/
		barArr : [{name : '学生情况',href : 'secondNav.guideDel.guideStudentSituation'},{name : '导学内容',href : 'secondNav.guideDel.guideContent'}]		//二级导航
	};
	
	$scope.variablePacket.className = $location.$$search.className;
	/**
	 * 根据导学id查询导学详情
	 */
	$scope.guidanceList = function(guidanceId){
		$http.get(guidanceLearningIp + 'learn?id='+guidanceId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.guidanceSituation=data.data[0];
				console.log($scope.variablePacket.guidanceSituation);
			}
	    })
	}
	
	$scope.guidanceList($location.$$search.guidanceId);
}]);
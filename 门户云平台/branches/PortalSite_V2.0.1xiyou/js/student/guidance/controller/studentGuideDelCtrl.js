app.controller('studentGuideDelCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课前导学';
	
	
	//变量包
	$scope.variablePacket = {
		guidanceSituation:{},
		/*barArr : $location.$$search.resourceReturn == 'true' ? [{name : '导学内容',href : 'secondNav.studentGuideDel.studentGuideContent({state : "' + $location.$$search.state + '",resourceReturn : "' + $location.$$search.resourceReturn + '"})'},{name : '回传资料',href : 'secondNav.studentGuideDel.studentGuideReturn({state : "' + $location.$$search.state + '",resourceReturn : "' + $location.$$search.resourceReturn + '"})'}] : [{name : '导学内容',href : 'secondNav.studentGuideDel.studentGuideContent({state : "' + $location.$$search.state + '",resourceReturn : "' + $location.$$search.resourceReturn + '"})'}] 	//二级导航*/
		barArr : $location.$$search.resourceReturn == 'true' ? [{name : '导学内容',href : 'secondNav.studentGuideDel.studentGuideContent'},{name : '回传资料',href : 'secondNav.studentGuideDel.studentGuideReturn'}] : [{name : '导学内容',href : 'secondNav.studentGuideDel.studentGuideContent'}] 	//二级导航
	};
	console.log($location.$$search);
	
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
	/**
	 * 加载列表
	 */
	$scope.guidanceList($location.$$search.guidanceId);
}]);
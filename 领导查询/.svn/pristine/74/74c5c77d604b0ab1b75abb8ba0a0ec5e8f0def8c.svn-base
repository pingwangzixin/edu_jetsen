app.controller('leftTreeCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
		// path : $location.path(),
		leftTreeShow : $location.$$url.indexOf('resourceManageResourcesDetails') == -1 ? true : false,
		data :   //导航菜单模拟数据
	    [
	        {
	            "id":1,
	            "label":"首页",
	            "url":"",
	            "icon":"icon-shouye-",
	            "childrenShow": $location.path().indexOf('indexList')!= -1 || false,
	            "secondActive":$location.path().indexOf('indexList')!= -1 || false,
	            "children":[
	            	{
	                    "id":"11",
	                    "label":"消息中心",
	                    "url":"secondNav.leftTree.indexList",
	                    "state":($location.path().indexOf('indexList')!= -1) || false,
	                    "children":[]
	                }
	            ]
	        },
	        {
	            "id":2,
	            "label":"数据分析与管理",
	            "url":"",
	            "icon":"icon-chaxun",
	            "childrenShow":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1 || $location.path().indexOf('resourceStatistics')!= -1 || $location.path().indexOf('guidanceStatistics')!= -1 || $location.path().indexOf('teachingStatistics')!= -1 || $location.path().indexOf('activeStatistics')!= -1)|| false,
	            "secondActive":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1 || $location.path().indexOf('resourceStatistics')!= -1 || $location.path().indexOf('guidanceStatistics')!= -1 || $location.path().indexOf('teachingStatistics')!= -1 || $location.path().indexOf('activeStatistics')!= -1)|| false,
	            "children":
	            [
	                {
	                    "id":"21",
	                    "label":"用户统计",
	                    "url":"secondNav.leftTree.leaderInquiryNav.userStatisticsWrap.userStatistics",
	                    "state":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1)|| false,
	                    "children":[]
	                },                
	                {
	                    "id":"22",
	                    "label":"教学统计",
	                    "url":"secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap.resourcesUpload",
	                    "state":($location.path().indexOf('resourcesStatisticsWrap')!= -1 || $location.path().indexOf('testQuestions')!= -1 || $location.path().indexOf('classroom')!= -1 || $location.path().indexOf('homework')!= -1 || $location.path().indexOf('evaluateWrap')!= -1 )|| false,
	                    "children":[]
	                },
	                {
	                    "id":"23",
	                    "label":"教研统计",
	                    "url":"secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap.teachingStatistics",
	                    "state":($location.path().indexOf('researchStatisticsWrap')!= -1)|| false,
	                    "children":[]
	                }
	            ]
	        },
	        {
	            "id":3,
	            "label":"教学管理",
	            "url":"",
	            "icon":"icon-diannao",
	            "childrenShow":($location.path().indexOf('resourceManage')!= -1 || $location.path().indexOf('evaluateManage')!= -1 || $location.path().indexOf('resourceManageResourcesDetails')!= -1)|| false,
	            "secondActive":($location.path().indexOf('resourceManage')!= -1 || $location.path().indexOf('evaluateManage')!= -1 || $location.path().indexOf('resourceManageResourcesDetails')!= -1)|| false,
	            "children":
	            [
	                {
	                    "id":"31",
	                    "label":"资源管理",
	                    "url":"secondNav.leftTree.resourceManage",
	                    "state":($location.path().indexOf('resourceManage')!= -1 || $location.path().indexOf('resourceManageResourcesDetails')!= -1)|| false,
	                    "children":[]
	                },                
	                {
	                    "id":"32",
	                    "label":"评价管理",
	                    "url":"secondNav.leftTree.evaluateManage",
	                    "state":($location.path().indexOf('evaluateManage')!= -1)||false,
	                    "children":[]
	                }
	            ]
	        },
	        {
	            "id":4,
	            "label":"教务管理",
	            "url":"",
	            "icon":"icon-print",
	            "childrenShow": $location.path().indexOf('classCardWrap')!= -1 || false,
	            "secondActive":$location.path().indexOf('classCardWrap')!= -1 || false,
	            "children":
	            [
	                {
	                    "id":"41",
	                    "label":"班牌管理",
	                    "url":"secondNav.leftTree.classCardWrap({'range':'school','nav':'school','type':'school'})",
	                    "state":($location.path().indexOf('classCardWrap')!= -1) || false,
	                    "children":[]
	                },
	                {
	                    "id":"42",
	                    "label":"排课管理",
	                    "url":"secondNav.leftTree.timetable",
	                    "state":($location.path().indexOf('timetable')!= -1) || false,
	                    "children":[]
	                }
	            ]
	        }
	    ]
    }
	$scope.two = function (pIndex,index){
		angular.forEach($scope.variablePacket.data,function (e,i){
			e.secondActive = false;
			if(e.children.length != 0){
				angular.forEach(e.children,function (even,index){
					even.state = false;
				});
			}
		});
		$scope.variablePacket.data[pIndex].secondActive = true;
		$scope.variablePacket.data[pIndex].children[index].state = true;
	};
}]);




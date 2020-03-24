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
	            "label":"领导查询",
	            "url":"",
	            "icon":"icon-chaxun",
	            "childrenShow":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1 || $location.path().indexOf('resourceStatistics')!= -1 || $location.path().indexOf('guidanceStatistics')!= -1 || $location.path().indexOf('teachingStatistics')!= -1 || $location.path().indexOf('activeStatistics')!= -1)|| false,
	            "secondActive":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1 || $location.path().indexOf('resourceStatistics')!= -1 || $location.path().indexOf('guidanceStatistics')!= -1 || $location.path().indexOf('teachingStatistics')!= -1 || $location.path().indexOf('activeStatistics')!= -1)|| false,
	            "children":
	            [
	                {
	                    "id":"21",
	                    "label":"用户统计",
	                    "url":"secondNav.leftTree.userStatistics",
	                    "state":($location.path().indexOf('userStatistics')!= -1 || $location.path().indexOf('userAnalysis')!= -1)|| false,
	                    "children":[]
	                },                
	                {
	                    "id":"22",
	                    "label":"教学统计",
	                    "url":"secondNav.leftTree.resourceStatistics",
	                    "state":($location.path().indexOf('resourceStatistics')!= -1 || $location.path().indexOf('guidanceStatistics')!= -1)|| false,
	                    "children":[]
	                },
	                {
	                    "id":"23",
	                    "label":"教研统计",
	                    "url":"secondNav.leftTree.activeStatistics",
	                    "state":($location.path().indexOf('teachingStatistics')!= -1 || $location.path().indexOf('activeStatistics')!= -1)|| false,
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

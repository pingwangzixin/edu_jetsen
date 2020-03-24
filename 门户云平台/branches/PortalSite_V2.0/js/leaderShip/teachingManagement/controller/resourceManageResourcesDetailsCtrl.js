app.controller('resourceManageResourcesDetailsCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$location','$rootScope', '$interval', 'templateServer', function($scope, $state, $stateParams, $timeout, $http, $location,$rootScope, $interval, templateServer) {
	// 变量包
	$scope.variablePacket = {                                     
		fine: angular.fromJson($stateParams.fine), //校精品 
		page: $stateParams.page, //主路由  
		resourcesIndex: $stateParams.resources, //返回资源选中状态
		formatIndex:$stateParams.format, //返回时格式选中状态
		sortIndex:$stateParams.sort, //返回时排序选中状态
		isDisplay:true,  //通过和打回是否显示  true隐藏  false显示
		amputate:false  //删除不显示
	};
	// 返回
	$scope.back = function() {
		$state.go($scope.variablePacket.page, {
			resources: $scope.variablePacket.resourcesIndex,
			format: $scope.variablePacket.formatIndex,
			sort:$scope.variablePacket.sortIndex
		})
	};
	$scope.goBack = function() {
		$state.go($scope.variablePacket.page, {
			format: $scope.variablePacket.formatIndex,
			sort:$scope.variablePacket.sortIndex
		})
	};
	// 点击通过 显示校精品
	$scope.adopt = function(index){
    		$scope.variablePacket.fine= true;
    		$scope.variablePacket.isDisplay = false;
    		$scope.variablePacket.amputate =true;
	}
	//删除数据跳转到列表页面
	$scope.delDate = function (index){
		$state.go('secondNav.leftTree.resourceManage.examineFine');
	};
	$scope.deleDate = function (index){
		$state.go('secondNav.leftTree.resourceManage.resourceManageList');
	};
}]);

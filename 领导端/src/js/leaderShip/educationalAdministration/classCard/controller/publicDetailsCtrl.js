app.controller('publicDetailsCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	   id:$stateParams.id, //列表页传递的参数id
    	   title:$stateParams.title, //列表页传递的参数标题
    	   state:$stateParams.state //接收传递的参数
    }
    //返回上一路由
    $scope.cancel = function(){
    	history.back();
    }
}]);
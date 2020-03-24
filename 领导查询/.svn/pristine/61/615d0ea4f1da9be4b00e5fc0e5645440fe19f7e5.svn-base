app.controller('classNoticeCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	range:$location.$$search.range,//学校还是班主任进入的角色
    	
    }
    //数据模拟
    $scope.publicityData = {
		publicity : [
	    	{id:'1',title:'运动会立即报名',time:'2017-07-07  08：23'},
	    	{id:'2',title:'运动会立即报名1',time:'2017-01-05  07：00'},
	    	{id:'3',title:'运动会立即报名2',time:'2017-07-07  08：23'},
	    	{id:'4',title:'运动会立即报名3',time:'2017-05-07  12：43'},
	    	{id:'5',title:'运动会立即报名4',time:'2017-07-07  08：03'},
	    	{id:'6',title:'运动会立即报名5',time:'2017-09-10  05：23'}
    	]
    }
    // 删除列表
    $scope.deleteData = function (i,type,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			console.log($scope.wranShow);
			$scope.publicityData[type].splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
		};
	};
}]);
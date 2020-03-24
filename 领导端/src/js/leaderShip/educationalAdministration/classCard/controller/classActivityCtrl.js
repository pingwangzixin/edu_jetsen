app.controller('classActivityCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	range:$location.$$search.range,//学校还是班主任进入的角色
		nav:$location.$$search.nav,//导航显示的角色
    	type : $stateParams.type,  //接收的参数
    	prompt:false  //删除弹框
    }
    //数据模拟
    $scope.publicityData = {
		publicity : [
	    	{id:'1',title:'运动会运动会立即报名运动会立即报名立即报名',time:'2017-07-07  08：23'},
	    	{id:'2',title:'运动会立即报名1',time:'2017-01-05  07：00'},
	    	{id:'3',title:'运动会立即报名2',time:'2017-07-07  08：23'},
	    	{id:'4',title:'运动会立即报名3',time:'2017-05-07  12：43'},
	    	{id:'5',title:'运动会立即报名4',time:'2017-07-07  08：03'},
	    	{id:'6',title:'运动会立即报名5',time:'2017-09-10  05：23'}
    	],
    	schoolActivity : [
	    	{id:'1',title:'运动会运动会立即报名运动会立即报名立即报名',time:'2017-07-07',read:'123'},
	    	{id:'2',title:'运动会立即报名1',time:'2017-01-05',read:'23'},
	    	{id:'3',title:'运动会立即报名2',time:'2017-07-07',read:'12'},
	    	{id:'4',title:'运动会立即报名3',time:'2017-05-07',read:'56'},
	    	{id:'5',title:'运动会立即报名4',time:'2017-07-07',read:'123'},
	    	{id:'6',title:'运动会立即报名5',time:'2017-09-10',read:'123'}
    	]
    }
    // 删除班级-特色活动列表
    $scope.deleteData = function (i,type,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			$scope.publicityData[type].splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
		};
	};
	 // 删除学校信息-学校活动列表
	 $scope.deleteData = function (i,type,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			$scope.publicityData[type].splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
		};
	};
    
}]);
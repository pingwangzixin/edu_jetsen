app.controller('classDemeanorCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	albumArr : [//相册模拟数据
			{name : '相册11111111111111111111相册相册',src:'ad_1.jp'},
			{name : '相册2',src:'teacherShow.jpg'},
			{name : '相册3',src:'ad_1.jpg'},
			{name : '相册4',src:'teacherShow.jpg'},
			{name : '相册5',src:'ad_1.jpg'},
			{name : '相册6',src:'teacherShow.jpg'},
			{name : '相册7',src:'ad_1.jpg'}
		],
		userType : $stateParams.range,  //判断角色：class为班主任，school为校领导
		userRights : $stateParams.nav,	//角色二级导航：class为班主任，school为校领导
		urlUser : ($stateParams.range == 'school' && $stateParams.nav == 'school') ? 'school' : 'class',   //编辑页面及详情页传递角色
		urlPower : $stateParams.range,		//管理员进入班级
    };
	
	//删除相册事件
	$scope.deleteAlbum = function (index){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			console.log($scope.wranShow)
			$scope.variablePacket.albumArr.splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true);
		};
	};
	
}]);
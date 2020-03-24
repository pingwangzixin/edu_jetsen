app.controller('teacherSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	
	//变量包
	$scope.variable = {
		myTerritory : 0,
		teachRole : 0
	};
	
	//角色
	$scope.roleWrap = [
		{name : '任课教师'},
		{name : '任课教师'},
		{name : '任课教师'},
		{name : '任课教师'}
	];
	//切换角色事件
	$scope.roleSwitch = function (i){
		$scope.variable.teachRole = i;
	};
	
	//公告通知
	$scope.noticeData = [
		{name : '李二狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李三狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李四狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李五狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
	];
	$scope.noticeData = $scope.noticeData.concat($scope.noticeData)
	

}]);


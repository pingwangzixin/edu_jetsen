app.controller('schoolLeaderPersonalCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//上一级返回存储地址
	$scope.prevPageNo = 'schoolLeaderPersonal';
	
	//学期列表状态
	$scope.chooseTermVariable = {
		status : true,
		horn : false,
		list : false
	};
	//选择学期按钮
	$scope.chooseTermBtn = function (){
		if($scope.chooseTermVariable.status){
			$scope.chooseTermVariable.horn = true;
			$scope.chooseTermVariable.list = true;
			$scope.chooseTermVariable.status = false;
		}else{
			$scope.chooseTermVariable.horn = false;
			$scope.chooseTermVariable.list = false;
			$scope.chooseTermVariable.status = true;
			
		}
	};
	
	//点击页面其它位置 学期列表隐藏
	var termList = document.querySelector('.icon-jiantou2');
	$(document).on('click',function (e){
		var tar = e.target;
		if(tar != termList){
			$scope.$apply(function (){
				$scope.chooseTermVariable.horn = false;
				$scope.chooseTermVariable.list = false;
				$scope.chooseTermVariable.status = true;
			});
		}
	});
	
	//切换学期下拉
	$scope.chooseTerm = function (tar,i){
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
	};
	
	
    //顶部切换年级班级
    $scope.gradeTab = function (tar){
    	console.log(tar)
    	angular.element(tar.target).addClass('active').siblings().removeClass('active');
    };
	
			       
	
	
	//年级优良率统计-获取数据
	$http.get('file/gradeStatistics.json').success(function(data){
		$scope.gradeData = data.data;
	})
	
	

}]);


	
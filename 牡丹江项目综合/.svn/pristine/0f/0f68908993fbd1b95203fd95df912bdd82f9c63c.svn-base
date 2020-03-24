app.controller('publicEvaluationCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//上一级返回存储地址
	$scope.prevPageNo = 'publicEvaluation';
	
	//返回按钮返回路径
	$scope.prevPath = 'wrap.' + $location.$$search.prevPage;


	//查看报告按钮，新窗口打开
	var reportUrl = $state.href('wrap.report',{stuId:8});
 	$scope.viewReport = function (){
 		window.open(reportUrl,'_blank');
 	};
 	 
 	//判断角色，控制页面展示
 	$scope.roleShow = {
 		bestStudent : {show : false,bestStuId : $location.$$search.bestStuId || ''},
 		teacher : {show : false,state : ''},
 		student : {show : false}
 	};
 	//学生id 用于页面切换及对应展示情况
// 	$scope.bestStuId = $location.$$search.bestStuId;
 	var userType = sessionStorage.getItem('userType');
 	$scope.roleShow.bestStudent.show = $scope.roleShow.bestStudent.bestStuId != '' ? true : false;
 	$scope.roleShow.teacher.show = userType == 'teacher' ? true : false;
 	$scope.roleShow.student.show = userType == 'student' ? true : false;
// 	$scope.teacherState = $location.$$search.state;
 	
	//等级切换状态
	$scope.resultsTab = function (tar){
		angular.element(tar.target).addClass('active').siblings().removeClass('active');	
	};

	//评价评语、评价类型切换
	$scope.evaluateState = {
		comment : 0,
		evaluationType : 0
	};
	//评价评语切换事件
	$scope.switchComment = function (i){
		$scope.evaluateState.comment = i;
	};
	//5种评价类型切换
	$scope.swicthType = function (i){
		$scope.evaluateState.evaluationType = i;
	};
	
	//定时提示框
	$scope.timer = function (tipColor,tipWord){
   		$scope.tipState.tipBox.tipRed = tipColor;
		$scope.tipState.tipBox.tipsWord = tipWord;
		$scope.tipState.tipBox.ifShow = true;
   		$timeout(function (){
   			$scope.tipState.tipBox.ifShow = false;
		},1000);
   	}
	
	//控制所有弹框
	$scope.tipState = {
		deleteBox : {ifShow : false,tipWord : '确认删除吗？'},
		tipBox : {ifShow : false,tipRed : false,tipWord : ''},
		upLoadBox : {ifShow : false,role : ''},
		checkBox : {ifShow : false,role : ''}
	};
	//删除资质、佐证事件
	$scope.deleteing = function (tar){
		tar.stopPropagation();
		$scope.tipState.deleteBox.ifShow = true;
		console.log(angular.element(tar.target).parents('li'))
//		var deleteIndex = angular.element(tar.target).parents('li').index();
		//确认删除事件
		$scope.deleteSure = function (){
			$scope.tipState.deleteBox.ifShow = false;
			angular.element(tar.target).parent().parent().remove();
			$scope.timer(false,'删除成功！');
		};
	};
	
	//上传资质、佐证弹框
	$scope.upLoad = function (str){
		$scope.tipState.upLoadBox.role = str;
		$scope.tipState.upLoadBox.ifShow = true;
	};
	
	//上传弹框内
	$scope.uploadTab = function (tar){
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
	};
	
	//上传弹框确认事件
	$scope.uploadSure = function (){
		$scope.tipState.upLoadBox.ifShow = false;
		$scope.timer(false,'上传成功！');
	};
	
	//查看资质、佐证弹框
	$scope.check = function (str){
		$scope.tipState.checkBox.role = str;
		$scope.tipState.checkBox.ifShow = true;
	};
	
	//保存弹框
	$scope.keep = function (){
		$scope.timer(false,'保存成功');
	};
	
	//评语提交
	$scope.commentSub = function (){
		$scope.timer(false,'提交成功');
	};
}]);

//点击左右移动查看更多
app.directive('showMore', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			
		},
		link: function(scope, element, attrs) {
			var moveBox = $(element).children('ul');
			var moveWidth = moveBox.children('li').width();
			var moveLength = moveBox.children('li').length - 5;
			var n = 0;
			
			$(element).siblings('.icon-zuojiantoubeijing').addClass('active');
			if(moveLength < 1){$(element).siblings('.icon-youjiantoubeijing').addClass('active');}
			
			if(moveLength > 0){
				$(element).siblings('i').on('click',function (){
					if($(this).hasClass('icon-zuojiantoubeijing')){
						n--;
						if(n >= 0){
							moveBox.stop().animate({'left':-(moveWidth * n)});
						}else{
							n = 0;
							moveBox.stop().animate({'left':0});
						}
						if(n <= 0){$(this).addClass('active')};
						if(n < moveLength){$(this).siblings('i').removeClass('active')};
					}else{
						n++;
						if(n < moveLength){
							moveBox.stop().animate({'left':-(moveWidth * n)});
						}else{
							n = moveLength;
							moveBox.stop().animate({'left':-(moveWidth * n)});
						}
						if(n > 0){$(this).siblings('i').removeClass('active')};
						if(n >= moveLength){$(this).addClass('active')};
					}
					console.log(n)
				});
			}
		}
	}
	
});
app.controller('DemeanorEditCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	photoBox : false,		//查看大图容器
		viewPhotoIndex : 0,		//大图下标
		moveWidth : 650,		//移动宽度
		moveLen : 0	,			//移动次数
		leftBtn : false,			//大图左按钮
		rightBtn : false,			//大图右按钮
		userRights : $stateParams.state,	//角色二级导航：class为班主任，school为校领导(导航栏标题)
    };
	console.log($scope.variablePacket.userRights)
	//照片模拟数据
	$scope.photoArr = [
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jp'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent1.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		/*{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.jpg'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'}*/
	];
	
	//删除照片事件
	$scope.deletePhoto = function (index){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.photoArr.splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true);
		};
	};
	
	//照片点击大图
	$scope.photoEnlarge = function (i){
		$scope.variablePacket.viewPhotoIndex = i;
		$scope.variablePacket.photoBox = true;
		if($scope.photoArr.length > 1){
			if(i>0 && i<$scope.photoArr.length - 2){
				$scope.variablePacket.leftBtn = true;
				$scope.variablePacket.rightBtn = true;
			}else if(i <= 0){
				$scope.variablePacket.leftBtn = false;
				$scope.variablePacket.rightBtn = true;
			}else if(i >= $scope.photoArr.length - 1){
				$scope.variablePacket.leftBtn = true;
				$scope.variablePacket.rightBtn = false;
			}
		}
		if(angular.element('.zy_pic_big_box ul')){
			$timeout(function (){
				angular.element('.zy_pic_big_box ul').css({left : -$scope.variablePacket.moveWidth * i});
			});
		}
	};
	
	//照片点击大图
	/*$scope.photoEnlarge = function (i){
		$scope.variablePacket.viewPhotoIndex = i;
		$scope.variablePacket.photoBox = true;
//		console.log($scope.variablePacket.moveLen-1)
		if($scope.photoArr.length > 1){
			if(i>0 && i<$scope.variablePacket.moveLen-1){
				$scope.variablePacket.leftBtn = true;
				$scope.variablePacket.rightBtn = true;
			}else if(i <= 0){
				$scope.variablePacket.leftBtn = false;
				$scope.variablePacket.rightBtn = true;
			}else if(i >= $scope.variablePacket.moveLen - 1){
				$scope.variablePacket.leftBtn = true;
				$scope.variablePacket.rightBtn = false;
			}
		}
		angular.element('.zy_pic_big_box ul').css({left : -$scope.variablePacket.moveWidth * i});
	};*/
	
}]);
//照片
app.directive('viewPhoto',function (){
	return {
		restrict:'EA',
		link : function (scope,element,attrs){
			if(scope.$last){
				scope.variablePacket.moveLen = element.parents('ul').children().length;
				var lenW = scope.variablePacket.moveLen * element.width();
//				scope.variablePacket.moveLen = parseInt(lenW / scope.variablePacket.moveWidth);
				element.parents('ul').css({width : lenW});
				//右点击
				element.parent().parent().next().on('click',function (){
					scope.variablePacket.viewPhotoIndex ++;
					if(scope.variablePacket.viewPhotoIndex >= scope.variablePacket.moveLen - 1){
						scope.variablePacket.viewPhotoIndex = scope.variablePacket.moveLen - 1;
						scope.$apply(function (){
							scope.variablePacket.rightBtn = false;
						});
					}else{
						scope.$apply(function (){
							scope.variablePacket.leftBtn = true;
						});
					}
					element.parent().stop().animate({left : -scope.variablePacket.moveWidth*scope.variablePacket.viewPhotoIndex},400);
				});
				//左点击
				console.log(element.parent().parent().prev())
				element.parent().parent().prev().on('click',function (){
					console.log(scope.variablePacket.viewPhotoIndex)
					scope.variablePacket.viewPhotoIndex --;
					if(scope.variablePacket.viewPhotoIndex <= 0){
						scope.variablePacket.viewPhotoIndex = 0;
						scope.$apply(function (){
							scope.variablePacket.leftBtn = false;
						});
					}else{
						scope.$apply(function (){
							scope.variablePacket.rightBtn = true;
						});
					}
					element.parent().stop().animate({left : -scope.variablePacket.moveWidth*scope.variablePacket.viewPhotoIndex},400);
				});
			}
		}
	};
});
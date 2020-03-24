app.controller('DemeanorDetailsCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	mainImg : 'ad_1.',	//默认大图
		BimgIndex : 0,		//照片大图默认src下标
		photoState : 0,		//小照片选中状态
		moveWidth : 656,	//小照片每页长度
		move : 0,			//小照片翻页次数
		moveLen : 0,		//小照片翻页总次数
		listToLeft : false, //小照片列表左按钮
		listToRight : false,//小照片列表右按钮
		userRights : $stateParams.state,	//角色二级导航：class为班主任，school为校领导(导航栏标题)
		userPower : $stateParams.power,  // 管理员进入班级 
    }

	//模拟相册数据
	$scope.album = [
		{name:'11111',src:'ad_1.jpg'},
		{name:'22222',src:'cs.jpg'},
		{name:'33333',src:'newsImg.'},
		{name:'44444',src:'zyx_starstudent_head.jpg'},
		{name:'55555',src:'zy_main_after.jpg'},
		{name:'66666',src:'teacherShow.jpg'},
		{name:'77777',src:'zyx-file.png'},
		{name:'88888',src:'zyx_xiala.png'},
		{name:'99999',src:'zyx_starstudent2.png'},
		{name:'10',src:'zyx_starstudent1.png'},
		{name:'11',src:'zyx_starstudent0.png'},
		{name:'12',src:'zyx_file_img.png'},
		{name:'13',src:'zyx_close.png'},
		{name:'14',src:'zy_verify_code.png'},
		{name:'15',src:'zy_username.png'},
		{name:'16',src:'zy_user.png'},
		{name:'17',src:'zy_password.png'},
		{name:'18',src:'zy_msg_center.png'},
		{name:'19',src:'zy_main.png'},
		{name:'20',src:'zy_main_after.jpg'},
		{name:'21',src:'zuoyezhongxin.png'},
		{name:'22',src:'zhinengpaike.png'},
		{name:'23',src:'you_like.png'},
		{name:'24',src:'xz.png'},
		{name:'25',src:'xueqingfenxi.png'},
		{name:'26',src:'xiaobenkecheng.png'},
		{name:'27',src:'xiangqi.png'},
		{name:'28',src:'wx_selected.png'},
		{name:'29',src:'wx_no_selct.png'},
		{name:'30',src:'wx_guanbi.png'},
		{name:'31',src:'wx_daoru.png'},
		{name:'32',src:'wx_bianji.png'},
		{name:'33',src:'wonde_big.png'},
		{name:'34',src:'wodekebiao.png'},
		{name:'35',src:'website_yes.png'},
		{name:'36',src:'website_no.png'},
		{name:'37',src:'website_icon.png'},
		{name:'38',src:'watching.png'},
		{name:'39',src:'watch_bg.png'},
		{name:'40',src:'upload_school_logo.png'},
		{name:'41',src:'university.png'},
		{name:'42',src:'tuixiangzi.png'},
		{name:'43',src:'triangleSchool.png'},
		{name:'44',src:'tool_no.png'},
		{name:'45',src:'tool_icon.png'},
		{name:'46',src:'tips_lamp.png'},
		{name:'47',src:'time_axis.png'},
		{name:'48',src:'time.png'},
		{name:'49',src:'Teachers.png'},
		{name:'50',src:'teacherRQ.png'}
		
	];
	//相册列表加载完成之后执行
	$scope.variablePacket.listToRight = $scope.album.length > 8 ? true : false;
	
	$scope.bigPicArr = [];
	
	//相册列表加载完 之后所有照片相关事件
	$scope.albumEvent = function (){
		var moveBox = angular.element('.zy_pic_little_box ul');
		var bigMove = angular.element('.zy_pic_big_box ul');
		
		//照片大图向右
		$scope.toRight = function (){
			$scope.variablePacket.BimgIndex ++ ;
			if($scope.variablePacket.BimgIndex >= $scope.album.length - 1) $scope.variablePacket.BimgIndex = $scope.album.length - 1;
			bigPic();
		};
		//照片大图向左
		$scope.toLeft = function (){
			$scope.variablePacket.BimgIndex -- ;
			if($scope.variablePacket.BimgIndex <= 0) $scope.variablePacket.BimgIndex = 0;
			bigPic();
		};
		
		function bigPic(){
			$scope.variablePacket.mainImg = $scope.album[$scope.variablePacket.BimgIndex].src;
			$scope.variablePacket.photoState = $scope.variablePacket.BimgIndex;
			$scope.variablePacket.move = Math.ceil(($scope.variablePacket.BimgIndex + 1) / 8 - 1);
			moveBox.stop().animate({left : -$scope.variablePacket.moveWidth*$scope.variablePacket.move},300);
			if($scope.variablePacket.move >= $scope.variablePacket.moveLen){
				$scope.variablePacket.listToRight = false;
			}else if($scope.variablePacket.move <= 0){
				$scope.variablePacket.listToLeft = false;
			}else{
				$scope.variablePacket.listToLeft = true;
				$scope.variablePacket.listToRight = true;
			}
		}
		
		//列表照片点击事件
		$scope.photoSel = function (i){
			$scope.variablePacket.photoState = i;
			$scope.variablePacket.BimgIndex = i;
			$scope.variablePacket.mainImg = $scope.album[i].src;
		};
		
		//列表照片滚动向右
		$scope.listToRight = function (){
			$scope.variablePacket.move ++;
			if($scope.variablePacket.move >= $scope.variablePacket.moveLen){
				$scope.variablePacket.move = $scope.variablePacket.moveLen;
				$scope.variablePacket.listToRight = false;
			}
			moveBox.stop().animate({left : -$scope.variablePacket.moveWidth*$scope.variablePacket.move},400);
			$scope.variablePacket.listToLeft = true;
		};
		//列表照片滚动向左
		$scope.listToLeft = function (){
			$scope.variablePacket.move --;
			if($scope.variablePacket.move <= 0){
				$scope.variablePacket.move = 0;
				$scope.variablePacket.listToLeft = false;
			}
			moveBox.stop().animate({left : -$scope.variablePacket.moveWidth*$scope.variablePacket.move},400);
			$scope.variablePacket.listToRight = true;
		};
	};
	
}]);
//相册
app.directive('viewAlbum',function (){
	return {
		restrict:'EA',
		link : function (scope,element,attrs){
			if(scope.$last){
//				var moveBox = angular.element('.zy_pic_little_box ul');
				var len = element.parents('ul').children().length;
				var lenW = len * (element.width() + 10);
				scope.variablePacket.moveLen = parseInt(lenW / scope.variablePacket.moveWidth);
				
				element.parents('ul').css({width : lenW});
				
				scope.$eval(attrs.viewAlbum);
				
				/*element.parent().parent().next().on('click',function (){
					scope.variablePacket.move ++;
					if(scope.variablePacket.move >= scope.variablePacket.moveLen){
						scope.variablePacket.move = scope.variablePacket.moveLen;
						scope.variablePacket.listToRight = false;
					}
					moveBox.stop().animate({left : -scope.variablePacket.moveWidth*scope.variablePacket.move},400);
					scope.$apply(function (){
						scope.variablePacket.listToLeft = true;
					});
				});
				element.parent().parent().prev().on('click',function (){
					scope.variablePacket.move --;
					console.log(scope.variablePacket.move)
					if(scope.variablePacket.move <= 0){
						scope.variablePacket.move = 0;
						scope.$apply(function (){
							scope.variablePacket.listToLeft = false;
						});
					}
					moveBox.stop().animate({left : -scope.variablePacket.moveWidth*scope.variablePacket.move},400);
					scope.variablePacket.listToRight = true;
				});*/
				
			}
			
		}
	};
});
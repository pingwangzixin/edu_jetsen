app.controller('albumDetailsCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','queryData',function($scope,$state,$timeout,$http,$location,$q,$rootScope,queryData) {
		//模拟相册数据
		$scope.album = [];
		//变量包
		$scope.variable = {
			photoId : $location.$$search.photoId,
			userId:sessionStorage.getItem("userId"),
			cuid:sessionStorage.getItem("cuid"),
			mainImg : 'ad_1.',	//默认大图
			BimgIndex : 0,		//照片大图默认src下标
			photoState : 0,		//小照片选中状态
			moveWidth : 656,	//小照片每页长度
			move : 0,			//小照片翻页次数
			moveLen : 0,		//小照片翻页总次数
			listToLeft : false, //小照片列表左按钮
			listToRight : false //小照片列表右按钮
		};
		$scope.editFlag = null;
		var cuid = sessionStorage.getItem("cuid");
		if(cuid==$scope.variable.userId){
			$scope.editFlag = false;//不隐藏
		}else{
			$scope.editFlag = true;//隐藏编辑按钮
		}
		var params = $scope.variable.photoId;
		
		var promise = queryData.getData(spaceJeucIp+"/jeuc/api/ea/eaSpacePhoto/photoDetails?photoId="+$scope.variable.photoId);
		console.log(promise);
		promise.then(function(data){
			if(data.ret==200){
				$scope.photoName = data.data.photoName;
				$scope.photoDesc = data.data.photoDesc;
				var photos = data.data.photos;
				if(photos!=""){
					angular.forEach(photos,function(data,index){
						var photo = {};
						photo.imageId = data.imageId;
						photo.src = data.filePath;
						$scope.album.push(photo);
					})
					$scope.variable.mainImg = $scope.album[0].src;
				}
			}
		});
		
		$scope.toList = function(){
			if(sessionStorage.userType == 1 ||sessionStorage.userType == 4){
				$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumList")
			}else{
				$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumList")
			}
		}
		
		$scope.bigPicArr = [];
		
		//相册列表加载完 之后所有照片相关事件
		$scope.albumEvent = function (){
			var moveBox = angular.element('.zy_pic_little_box ul');
			var bigMove = angular.element('.zy_pic_big_box ul');
			
			//照片大图向右
			$scope.toRight = function (){
				$scope.variable.BimgIndex ++ ;
				if($scope.variable.BimgIndex >= $scope.album.length ) $scope.variable.BimgIndex = 0;
				bigPic();
			};
			//照片大图向左
			$scope.toLeft = function (){
				$scope.variable.BimgIndex -- ;
				if($scope.variable.BimgIndex < 0)$scope.variable.BimgIndex = $scope.album.length-1;
				bigPic();
			};
			
			function bigPic(){
				$scope.variable.mainImg = $scope.album[$scope.variable.BimgIndex].src;
				$scope.variable.photoState = $scope.variable.BimgIndex;
				$scope.variable.move = Math.ceil(($scope.variable.BimgIndex + 1) / 8 - 1);
				moveBox.stop().animate({left : -$scope.variable.moveWidth*$scope.variable.move},300);
				if($scope.variable.move >= $scope.variable.moveLen){
					$scope.variable.listToRight = false;
				}else if($scope.variable.move <= 0){
					$scope.variable.listToLeft = false;
				}else{
					$scope.variable.listToLeft = true;
					$scope.variable.listToRight = true;
				}
			}
			
			//列表照片点击事件
			$scope.photoSel = function (i){
				$scope.variable.photoState = i;
				$scope.variable.BimgIndex = i;
				$scope.variable.mainImg = $scope.album[i].src;
			};
			
			//列表照片滚动向右
			$scope.listToRight = function (){
				$scope.variable.move ++;
				if($scope.variable.move >= $scope.variable.moveLen){
					$scope.variable.move = $scope.variable.moveLen;
					$scope.variable.listToRight = false;
				}
				moveBox.stop().animate({left : -$scope.variable.moveWidth*$scope.variable.move},400);
				$scope.variable.listToLeft = true;
			};
			//列表照片滚动向左
			$scope.listToLeft = function (){
				$scope.variable.move --;
				if($scope.variable.move <= 0){
					$scope.variable.move = 0;
					$scope.variable.listToLeft = false;
				}
				moveBox.stop().animate({left : -$scope.variable.moveWidth*$scope.variable.move},400);
				$scope.variable.listToRight = true;
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
				scope.variable.moveLen = parseInt(lenW / scope.variable.moveWidth);
				
//				element.parents('ul').css({width : lenW});
				
				scope.$eval(attrs.viewAlbum);
				
				/*element.parent().parent().next().on('click',function (){
					scope.variable.move ++;
					if(scope.variable.move >= scope.variable.moveLen){
						scope.variable.move = scope.variable.moveLen;
						scope.variable.listToRight = false;
					}
					moveBox.stop().animate({left : -scope.variable.moveWidth*scope.variable.move},400);
					scope.$apply(function (){
						scope.variable.listToLeft = true;
					});
				});
				element.parent().parent().prev().on('click',function (){
					scope.variable.move --;
					console.log(scope.variable.move)
					if(scope.variable.move <= 0){
						scope.variable.move = 0;
						scope.$apply(function (){
							scope.variable.listToLeft = false;
						});
					}
					moveBox.stop().animate({left : -scope.variable.moveWidth*scope.variable.move},400);
					scope.variable.listToRight = true;
				});*/
				
			}
			
		}
	};
});
app.controller('classPhotoEditCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//变量包
	$scope.variable = {
		state:$location.$$search.state,
		photoId:$location.$$search.photoId,
		newEnclosureId:[],
		enclosureId:[],
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		classId:sessionStorage.getItem("classId"),
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : '',			//提示框提示文字
		photoBox : false,		//查看大图容器
		viewPhotoIndex : 0,		//大图下标
		moveWidth : 650,		//移动宽度
		moveLen : 0	,			//移动次数
		leftBtn : true,		//大图左按钮
		rightBtn : true,	//大图右按钮
		tixbox:false
	};
	$scope.cancel=function(){
		$state.go('wrap.classSpace.classPhoto.classPhotoList');
	}
	//定时提示框事件 1500ms
	function tipBoxShow(succ,word){		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function (){
			$scope.variable.tipBox = false;
		},1500);
	}
	
	//照片模拟数据
	$scope.photoArr = [];
	//跳转到修改页面加载相册详情数据
	if($scope.variable.state==1){
		//加载数据
		var params = "photoId="+$scope.variable.photoId;
		$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpacePhoto/photoDetails?"+params)
		.success(function (data) {
			if(data.ret==200){
				$scope.photoName = data.data.photoName;
				$scope.ueditor = data.data.photoDesc;
				var photos = data.data.photos;
				if(photos!=""){
					angular.forEach(photos,function(data,index){
						var photo = {};
						photo.imageId = data.imageId;
						photo.src = data.filePath;
						$scope.photoArr.push(photo);
					})
				}
			}
	    });
	}
	
	$scope.filePhoto = function(me){
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		var file = me.files[0];
	    var fileName = file.name;
		var photo = {};
	    photo.name = fileName;
	    var index = null;
		fr.onload = function(){
		   photo.src= this.result;
           $scope.$apply(function (){
	     		index = $scope.photoArr.push(photo);
	     		index -= 1;
	     		
	       });
        }
		var fd = new FormData();
	    fd.append('file', file);
        fd.append("imageName",fileName);
        fd.append("createBy",$scope.variable.userId);
		$http({
    		url:spaceJeucIp + "/jeuc/api/ea/eaSpaceImage/uploadImage",
    		method:'POST',
    		data:fd,
    		headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
    	})
    	.success(function(res){
    		if($scope.variable.state==1){
    			$scope.variable.newEnclosureId.push(res.data.imageId);
    		}else{
    			$scope.variable.enclosureId.push(res.data.imageId);
    		}
    		$scope.photoArr[index].imageId = res.data.imageId;
    		$scope.photoArr[index].src = res.data.imagePath;
    	})
    	.error(function(e) {
			error(e)
		})
	}

	
	//删除照片事件
	$scope.deletePhoto = function (index,imageId){
		$scope.variable.deleteBox = true;
		
		//是否删除弹框确认事件
		$scope.sureDelete = function (){
			$scope.variable.deleteBox = false;
			tipBoxShow(true,'删除l');
			$scope.photoArr.splice(index,1);
			var params ='imageId='+imageId;
			$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceImage/deleteImageById?"+params)
			.success(function (data) {
				var imageIds = [];
				angular.forEach($scope.variable.enclosureId,function(data,index){
					if(data!=imageId){
						imageIds.push(data);
					}
				})
				$scope.variable.enclosureId = imageIds;
				tipBoxShow(true,'删除成功');      //删除成功的调用
		    });
		};
	};
	/**
	 * 创建相册或者修改相册
	 */
	$scope.save = function(ueditor){
		var params = {};
		params.relationId = $scope.variable.classId;
		params.photoName= $scope.photoName;
		params.photoDesc = $scope.ueditor;
		if (params.photoName!=undefined) {
				if($scope.variable.state==0){//创建相册
					params.imageIds= $scope.variable.enclosureId.join(",");
					params.createBy = $scope.variable.userId;
					$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/createSpacePhoto",params
				    ).success(function (data) {
				   		$state.go('wrap.classSpace.classPhoto.classPhotoList');
				    });
				}
				if($scope.variable.state==1){//修改相册
					params.id= $scope.variable.photoId;
					params.updateBy = $scope.variable.userId;
					params.imageIds = $scope.variable.newEnclosureId.join(",");
					$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/updateSpacePhoto",params
				    ).success(function (data) {
				   		$state.go('wrap.classSpace.classPhoto.classPhotoList');
				    });
				}
		} else{
		       $scope.variable.tixbox=true;
				$timeout(function(){
					$scope.variable.tixbox=false;
				},1000);
		}
	}
	
	//照片点击大图
	$scope.photoEnlarge = function (i){
		$scope.variable.viewPhotoIndex = i;
		$scope.variable.photoBox = true;
		console.log($scope.variable.moveLen-1)
		if(i>0 && i<$scope.variable.moveLen-1){
			$scope.variable.leftBtn = true;
			$scope.variable.rightBtn = true;
		}else if(i <= 0){
			$scope.variable.leftBtn = false;
			$scope.variable.rightBtn = true;
		}else if(i >= $scope.variable.moveLen - 1){
			$scope.variable.rightBtn = false;
		}
		angular.element('.zy_pic_big_box ul').css({left : -$scope.variable.moveWidth * i});
	};
	
}]);

//照片
app.directive('viewPhoto',function (){
	var flag = true
	return {
		restrict:'EA',
		link : function (scope,element,attrs){
			if(scope.$last){
				scope.variable.moveLen = element.parents('ul').children().length;
				var lenW = scope.variable.moveLen * element.width();
//				scope.variable.moveLen = parseInt(lenW / scope.variable.moveWidth);
				element.parents('ul').css({width : lenW});
//				scope.$eval(attrs.viewAlbum);
				//右点击
				if(!flag) return
				element.parent().parent().next().on('click',function (){
					scope.variable.viewPhotoIndex ++;
					if(scope.variable.viewPhotoIndex >= scope.variable.moveLen - 1){
						scope.variable.viewPhotoIndex = scope.variable.moveLen - 1;
						scope.$apply(function (){
							scope.variable.rightBtn = false;
						});
					}else{
						scope.$apply(function (){
							scope.variable.leftBtn = true;
						});
					}
					element.parent().stop().animate({left : -scope.variable.moveWidth*scope.variable.viewPhotoIndex},400);
				});
				//左点击
				element.parent().parent().prev().on('click',function (){
					scope.variable.viewPhotoIndex --;
					if(scope.variable.viewPhotoIndex <= 0){
						scope.variable.viewPhotoIndex = 0;
						scope.$apply(function (){
							scope.variable.leftBtn = false;
						});
					}else{
						scope.$apply(function (){
							scope.variable.rightBtn = true;
						});
					}
					element.parent().stop().animate({left : -scope.variable.moveWidth*scope.variable.viewPhotoIndex},400);
				});
				flag= false
			}
		}
	};
});
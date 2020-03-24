app.controller('albumEditCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', 'queryData', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, queryData) {
	$scope.variable = {
		state: $location.$$search.pageState,
		photoId: $location.$$search.photoId,
		newEnclosureId: [],
		enclosureId: [],
		// userId: 'a75e66cbd2a744feaa5068c11a77e787',
		 userId:sessionStorage.getItem("userId"),
		cuid: sessionStorage.getItem("cuid"),
		userType: 1,
		albumState: $state.params.pageState == 0 ? '创建相册' : '编辑相册',
		deleteBox: false,		//是否删除弹框
		tipBox: false,			//提示弹框
		tipSuccess: true,		//提示框正确图标为true，错误图标false
		tipWord: '',			//提示框提示文字
		photoBox: false,		//查看大图容器
		viewPhotoIndex: 0,		//大图下标
		moveWidth: 650,		//移动宽度
		moveLen: 0,			//移动次数
		leftBtn: true,		//大图左按钮
		rightBtn: true,	//大图右按钮
		tixbox: false
	};
	$scope.photoDecCount = 100;   //文本框剩余可输入字数
	$scope.photoLimit = true;      //相册允许查看
	$scope.photoLimitChange = function(flag){
		$scope.photoLimit = flag
	}

	$scope.cancel = function () {
		if ($scope.photoArr.length == 0) {
			var params = "photoId=" + $scope.variable.photoId;
			var promise = queryData.getData(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/deletePhoto?" + params);
			promise.then(function (data) {
				console.log(data);
			});
		}
		if (sessionStorage.getItem("userType") == 1) {
			$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumList")
		} else {
			$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumList")
		}
	}




	//照片模拟数据
	$scope.photoArr = [];
	//跳转到修改页面加载相册详情数据
	if ($scope.variable.state == 2) {
		//加载数据
		var params = "photoId=" + $scope.variable.photoId;

		var promise = queryData.getData(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/photoDetails?" + params);
		console.log(promise);
		promise.then(function (data) {
			console.log(data);
			if (data.ret == 200) {
				$scope.photoLimit = data.data.isShow == 0 ?true:false;
				console.log($scope.photoLimit,"当前是否显示")
				$scope.photoName = data.data.photoName;
				$scope.ueditor = data.data.photoDesc;
				$scope.photoDecCount = 100 - $scope.ueditor.length 
				var photos = data.data.photos;
				if (photos != "") {
					angular.forEach(photos, function (data, index) {
						var photo = {};
						photo.imageId = data.imageId;
						photo.src = data.filePath;
						$scope.photoArr.push(photo);
					})
				}
			}
		});
	}
// 照片上传事件
	$scope.filePhoto = function (me) {
		// tipBoxShows(true,'上传进行中'); 
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		var file = me.files[0];
		var fileName = file.name;
		console.log(fileName)
		var photo = {};
		photo.name = fileName;
		var index = null;
		fr.onload = function () {
			photo.src = this.result;
			$scope.$apply(function () {
				index = $scope.photoArr.push(photo);
				index -= 1;

			});
		}
		var fd = new FormData();
		fd.append('file', file);
		fd.append("imageName", fileName);
		fd.append("createBy", $scope.variable.userId);
	
		$http({
			url: spaceJeucIp + "/jeuc/api/ea/eaSpaceImage/uploadImage",
			method: 'POST',
			data: fd,
			headers: { 'Content-Type': undefined },
			transformRequest: angular.identity
		})
			.success(function (res) {
				console.log(res)
				if ($scope.variable.state == 2) {
					$scope.variable.newEnclosureId.push(res.data.imageId);
				} else {
					$scope.variable.enclosureId.push(res.data.imageId);
				}
				$scope.photoArr[index].imageId = res.data.imageId;
				$scope.photoArr[index].src = res.data.imagePath;
				//$scope.variable.tipBox = false;
				//tipBoxShow(true,'上传成功'); 
				console.log($scope.photoArr)
			})
			.error(function (e) {
				error(e)
			})
		

	}


	//删除照片事件
	$scope.deletePhoto = function (index, imageId) {
		$scope.$apply();
		$scope.variable.deleteBox = true;

		//是否删除弹框确认事件
		$scope.sureDelete = function () {
			$scope.variable.deleteBox = false;
			tipBoxShow(true, '删除');
			$scope.photoArr.splice(index, 1);
			var params = 'imageId=' + imageId;

			var promise = queryData.getData(spaceJeucIp + "/jeuc/api/ea/eaSpaceImage/deleteImageById?" + params);
			promise.then(function (data) {
				if (data.ret == 200) {
					$scope.photoName = data.data.photoName;
					$scope.ueditor = data.data.photoDesc;
					var photos = data.data.photos;
					if (photos != "") {
						angular.forEach(photos, function (data, index) {
							var photo = {};
							photo.imageId = data.imageId;
							photo.src = data.filePath;
							$scope.photoArr.push(photo);
						})
					}
				}
			});
		};
	};


	//  检测相册名称长度
	$scope.photoNameChange = function () {
		if ($scope.photoName.length > 20) {
			tipBoxShow(false, "相册名称不能超过20字")
			$scope.photoName = $scope.photoName.slice(0, 20)
		}
	}
	// 检测相册描述长度
	$scope.photoDecChange = function () {
		$scope.photoDecCount = 100 - $scope.ueditor.length >= 0 ? 100 - $scope.ueditor.length : 0;
		if ($scope.ueditor.length > 100) {
			tipBoxShow(false, "相册描述不能超过100字")
			$scope.ueditor = $scope.ueditor.slice(0, 100)
		}
	}
	/**
	 * 创建相册或者修改相册
	 */
	$scope.save = function (ueditor) {
		console.log("保存")
		if (!$scope.photoName) {
			tipBoxShow(false, "相册名不能为空")
			return
		}
		var params = {};
		params.relationId = $scope.variable.userId;
		params.photoName = $scope.photoName;
		params.photoDesc = $scope.ueditor;
		params.isShow =  $scope.photoLimit == true?0:1;
		console.log("修改了相册权限",params)
		if (params.photoName != undefined) {
			if ($scope.variable.state == 0) {//创建相册
				params.imageIds = $scope.variable.enclosureId.join(",");
				params.createBy = $scope.variable.userId;
				if ($scope.photoArr.length == 0) {
					tipBoxShow(true, '不允许存在空相册!');
				} else {
					$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/createSpacePhoto", params
					).success(function (data) {
						if (sessionStorage.userType == 1 ||sessionStorage.userType == 4) {
							$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumList")
						} else {
							$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumList")
						}
					});
				}
			}
			if ($scope.variable.state == 2) {//修改相册
				params.id = $scope.variable.photoId;
				params.updateBy = $scope.variable.userId;
				params.imageIds = $scope.variable.newEnclosureId.join(",");
				if ($scope.photoArr.length == 0) {
					tipBoxShow(true, '不允许存在空相册!');
				} else {
					$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/updateSpacePhoto", params
					).success(function (data) {
						if (sessionStorage.userType == 1 ||sessionStorage.userType == 4) {
							$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumList")
						} else {
							$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumList")
						}
					});
				}

			}
		}
	}

	//照片点击大图
	$scope.photoEnlarge = function (i) {
		$scope.variable.viewPhotoIndex = i;
		$scope.variable.photoBox = true;
		if (i > 0 && i < $scope.variable.moveLen - 1) {
			$scope.variable.leftBtn = true;
			$scope.variable.rightBtn = true;
		} else if (i <= 0) {
			$scope.variable.leftBtn = false;
			$scope.variable.rightBtn = true;
		} else if (i >= $scope.variable.moveLen - 1) {
			$scope.variable.rightBtn = false;
		}
		angular.element('.zy_pic_big_box ul').css({ left: -$scope.variable.moveWidth * i });
	};
	//上传中 3000ms
	function tipBoxShows(succ, word) {		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function () {
			$scope.variable.tipBox = false;
			tipBoxShow(true, '上传成功');
		}, 1000);
	}
	//定时提示框事件 1500ms
	function tipBoxShow(succ, word) {		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function () {
			$scope.variable.tipBox = false;
		}, 1500);
	}

}]);

//照片
app.directive('viewPhoto', function () {
	return {
		restrict: 'EA',
		link: function (scope, element, attrs) {
			if (scope.$last) {
				scope.variable.moveLen = element.parents('ul').children().length;
				var lenW = scope.variable.moveLen * element.width();
				//				scope.variable.moveLen = parseInt(lenW / scope.variable.moveWidth);
				element.parents('ul').css({ width: lenW });
				//				scope.$eval(attrs.viewAlbum);

				//右点击
				element.parent().parent().next().on('click', function () {
					console.log(scope.variable.viewPhotoIndex)
					scope.variable.viewPhotoIndex++;
					if (scope.variable.viewPhotoIndex >= scope.variable.moveLen - 1) {
						scope.variable.viewPhotoIndex = scope.variable.moveLen - 1;
						scope.$apply(function () {
							scope.variable.rightBtn = false;
						});
					} else {
						scope.$apply(function () {
							scope.variable.leftBtn = true;
						});
					}
					element.parent().stop().animate({ left: -scope.variable.moveWidth * scope.variable.viewPhotoIndex }, 400);
				});
				//左点击
				element.parent().parent().prev().on('click', function () {
					scope.variable.viewPhotoIndex--;
					if (scope.variable.viewPhotoIndex <= 0) {
						scope.variable.viewPhotoIndex = 0;
						scope.$apply(function () {
							scope.variable.leftBtn = false;
						});
					} else {
						scope.$apply(function () {
							scope.variable.rightBtn = true;
						});
					}
					element.parent().stop().animate({ left: -scope.variable.moveWidth * scope.variable.viewPhotoIndex }, 400);
				});
			}
		}
	};
});

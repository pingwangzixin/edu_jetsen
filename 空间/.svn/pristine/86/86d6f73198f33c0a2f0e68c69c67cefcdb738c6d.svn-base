app.controller('albumListCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', 'queryData', function ($scope, $state, $timeout, $http, $location, $interval, queryData) {
	$scope.variablePacket = {
		currentPage: 1,
		pageSize: 8
	}
	//变量包
	$scope.variable = {
		// userId: 'a75e66cbd2a744feaa5068c11a77e787',
		userId:sessionStorage.getItem("userId"),
		cuid: sessionStorage.getItem("cuid"),
		deleteBox: false,		//是否删除弹框
		tipBox: false,			//提示弹框
		tipSuccess: true,		//提示框正确图标为true，错误图标false
		tipWord: '',			//提示框提示文字
		editFlag: false,
		userType: sessionStorage.getItem("userType"),
		visiterFlag:sessionStorage.getItem("visiter")==1?false:true     //0查看自己空间,1查看他人空间
	};
	//根据登录的用户查询用户信息
	// $scope.$watch('$viewContentLoaded', function() {
	//  $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
	//  	if (data.ret==200) {
	//  		var data = data.data;
	// 		angular.forEach(data.userRoleInfo, function(response, index) {
	// 			$scope.roleName=response.roleName;
	// 		})
	//  	}
	//  })
	// })
	// if($scope.variable.userType=="1"){
	// 	$scope.variable.editFlag  = false;//不隐藏
	// }else{
	// 	$scope.variable.editFlag  = true;//隐藏编辑按钮
	// }
	//定时提示框事件 1500ms
	function tipBoxShow(succ, word) {		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function () {
			$scope.variable.tipBox = false;
		}, 1500);
	}
	//相册模拟数据
	$scope.albumArr = [];
	// 跳转到编辑页面
	$scope.toEdit = function(n,id){
		if(n == 0){
			if(sessionStorage.userType == 1 ||sessionStorage.userType == 4){
				$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumEdit",{pageState:n})
			}else{
				$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumEdit",{pageState:n})
			}
		}else{
			if(sessionStorage.userType == 1 ||sessionStorage.userType == 4){
				$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumEdit",{pageState:n,photoId:id})
			}else{
				$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumEdit",{pageState:n,photoId:id})
			}
		}
	
	}
	// 跳转到详情页面
	$scope.toDetail = function(id){
		console.log(sessionStorage.userType)
		if(sessionStorage.userType == 1 ||sessionStorage.userType == 4){
			
			$state.go("wrap.space.teacherSpace.teaAlbum.teaAlbumDetails",{photoId:id})
		}else{
			$state.go("wrap.space.studentSpace.stuAlbum.stuAlbumDetails",{photoId:id})
		}
	}

	//监听页数变换（每次变换$scope.variablePacket.pageNo都会变为最新的页数）
	$scope.$watch("variablePacket.currentPage", function (newVal, oldVal) {
		$scope.findData();
	})




	$scope.findData = function () {

		$scope.albumArr = [];
		var photoUrl = spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/photoList?relationId=" + $scope.variable.userId + "&currentPage=" + $scope.variablePacket.currentPage + "&pageSize=" + $scope.variablePacket.pageSize;
		if(sessionStorage.getItem("visiter")=='1')
		{
			photoUrl = photoUrl+"&isShow=0"
		}
		var promise = queryData.getData(photoUrl);
		console.log(promise);
		promise.then(function (data) {
			console.log(data);
			if (data.ret == 200) {
								var photoPageSize = Math.ceil(data.data.count/8);
								$scope.totalPageNumber = photoPageSize;
				//$scope.totalPageNumber = 2;
				var photos = data.data.photos;
				var stuYearList = data.data.stuYear;
				if (photos != undefined) {
					for (var i = 0; i < stuYearList.length; i++) {
						var stuYearGroup = {};
						var stuYear = stuYearList[i];
						stuYearGroup.stuYear = stuYear + '-' + (parseInt(stuYear) + 1)
						var list = []
						angular.forEach(photos, function (photo, index) {
							if (photo.year == stuYear) {
								var album = {};
								album.id = photo.id;
								album.name = photo.photoName;
								album.src = photo.photoCover;
								album.count = photo.count;
								album.createDate = photo.createDate.substring(0, 10);
								list.push(album);
							}
						})
						stuYearGroup.list = list;
						$scope.albumArr.push(stuYearGroup);
					}

				}
			}
		});
	}





	//删除相册事件
	$scope.deleteAlbum = function (index, photoId) {
		$scope.variable.deleteBox = true;
		//是否删除弹框确认事件
		$scope.sureDelete = function () {
			var params = "photoId=" + photoId;




			var promise = queryData.getData(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/deletePhoto?" + params);
			promise.then(function (data) {
				console.log(data);
				if (data.ret == 200) {
					$scope.variable.deleteBox = false;
					tipBoxShow(true, '删除成功');
					$scope.albumArr.splice(index, 1);
					window.location.reload();//刷新页面
				}
			});

		};
	};


}]);

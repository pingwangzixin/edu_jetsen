app.controller('schoolSpaceIndexCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($rootScope, $scope, $state, $timeout, $http, $location, $interval) {

	var userId = $location.search().userId;
	var userType = $location.search().userType;
	var token = $location.search().token;
	$scope.spaceEaIp = spaceEaIp ;
	
	$http.post(spaceJeucIp + '/jeuc/api/ea/eaSpaceIntroduce/openEaSpaceIntroduce', {
	 					openType: '1',
	 					relationId: sessionStorage.getItem("officeId"),
	 					createBy: sessionStorage.getItem("userId")


	 				}).success(function (res) {
	 					console.log(res)
	 					if (res.ret == 200) {
	 						console.log("ktcg")
	 					} else {
	 						console.log("ktsb")
	 					}
	 				}).error(function (e) {
	 					console.log("ktsb")
					})
	 			

	// $http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
	// 	if (data.ret == 200) {
	// 		for (var i = 0; i < data.data.userRole.length; i++) {
	// 			if (data.data.userRole[i].rid == '18') {
	// 				console.log(data.data.userRole[i].oid);
	// 				console.log(data.data.userRole[i].officeName);
	// 				sessionStorage.setItem("officeId", data.data.userRole[i].oid);
	// 				sessionStorage.setItem("userId", userId)
	// 				sessionStorage.setItem("userType", userType)

	// 				$http.post(spaceJeucIp + '/jeuc/api/ea/eaSpaceIntroduce/openEaSpaceIntroduce', {
	// 					openType: '1',
	// 					relationId: data.data.userRole[i].oid,
	// 					createBy: userId


	// 				}).success(function (res) {
	// 					console.log(res)
	// 					if (res.ret == 200) {
	// 						console.log("ktcg")
	// 					} else {
	// 						console.log("ktsb")
	// 					}
	// 				}).error(function (e) {
	// 					console.log("ktsb")
	// 				})
	// 			}
	// 		}
	// 		console.log(data.data.userRole);
	// 	}


	// });
	// sessionStorage.setItem("officeId", "office_5bc1afe9fde64fc08c0393c3b8985aea")
	// sessionStorage.setItem("userId", "d9bc5fb081714e8992576e20fcce920a")
	// sessionStorage.setItem("userType", 4)

	//定义变量
	$scope.variable = {
		officeId: sessionStorage.getItem("officeId"),
		userId: sessionStorage.getItem("userId"),
		userType: sessionStorage.getItem("userType"),
		goodSpaceState: ["班级", "老师", "学生"],		//优秀空间类型
		goodSpaceIndex: 0,				//优秀空间索引
		goodSpacePage: 0,				//优秀空间页数
		schoolImgList: [],     //学校风采数据
		spaceActiveInfo: [],      //空间动态数据

	};
	/**
	 * 空间动态             sortType=1&pageNumber=1&showNumber=5&state=0
	 */
	//http://218.9.54.193:8888/edu-comment/comment?sortType=1&pageNumber=1&showNumber=5&state=0
	var params = 'sortType=1&pageNumber=1&showNumber=5&state=0&schoolId='+sessionStorage.getItem("officeId");
	$http.get(edu_comment+ "/edu-comment/comment?" + params).success(function (data) {
		if (data.ret == 200) {
			let userIds = "";
			data.data.commentList.forEach((ele,index)=>{
				if(index == data.data.commentList.length-1){
					userIds += ele.commentUserId;
				}else{
					userIds += ele.commentUserId + ",";
				}
			});
		
			 $http.post(findUsers+ "?userIds="+userIds).success(function (res) {
				if(res.ret == 200){
					console.log(res.data)
					res.data.forEach((item,index)=>{
						data.data.commentList.forEach((child,idx)=>{
							if(child.commentUserId == item.id){
								child.userFace =  item.userFace
								child.sex =  item.sex
							}
						})
					})
					console.log(data.data.commentList)
					$timeout(function () {
						$scope.variable.spaceActiveInfo = data.data.commentList
						$scope.variable.spaceActiveInfo.forEach(element => {
							element.commentCreateDate = element.commentCreateDate.substring(5, 16)
						});
						$scope.$apply();
						var flag = $scope.variable.spaceActiveInfo.length > 4 ? true : false  //空间动态少于4条时将loop设为false
						var mySwiper = new Swiper('.swiper-container', {
							direction: 'vertical',			//纵向
							autoplay: 1000, // 速度
							autoplayDisableOnInteraction: false,	//用户操作swiper之后，是否禁止autoplay
							loop: flag,			//无缝轮播
							slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
						})
						//添加监听  鼠标移入暂停轮播
						$('.swiper-slide').mouseenter(function () {
							mySwiper.stopAutoplay();
						})
						$('.swiper-slide').mouseleave(function () {
							mySwiper.startAutoplay();
						})
					}, 0)
				}
			 })
		}
	})
	// 优秀空间切换
	$scope.nextFlag = false;
	$scope.prevFlag = false;
	$scope.goodSpaceStateChange = function (num) {
		if ($scope.variable.goodSpaceIndex == num) return
		$scope.nextFlag = false;
		$scope.prevFlag = false;
		$scope.variable.goodSpaceIndex = num;
		$scope.goodSpaceArr = num == 0 ? $scope.gradeList : num == 1 ? $scope.teaList : $scope.stuList;
		if ($scope.goodSpaceArr.length > 12) $scope.nextFlag = true;
		$scope.variable.goodSpacePage = 0;
		$scope.goodSpaceShowList = $scope.goodSpaceArr.slice(0, 12)
	}
	//优秀空间左右翻页
	$scope.showMoreSpace = function (direction) {
		//向左翻页
		if (direction == 0) {
			$scope.variable.goodSpacePage--
			$scope.goodSpaceShowList = $scope.goodSpaceArr.slice($scope.variable.goodSpacePage * 12, $scope.variable.goodSpacePage * 12 + 12)
			$scope.nextFlag = true;
			$scope.prevFlag = $scope.variable.goodSpacePage == 0 ? false : true;
		}
		//向右翻页
		if (direction == 1) {
			$scope.variable.goodSpacePage++
			$scope.goodSpaceShowList = $scope.goodSpaceArr.slice($scope.variable.goodSpacePage * 12, $scope.variable.goodSpacePage * 12 + 12)
			$scope.prevFlag = true;
			$scope.nextFlag = $scope.variable.goodSpacePage * 12 + 12 >= $scope.goodSpaceArr.length ? false : true;
		}
	}
	// 优秀班级
	$http.get(spaceEaIp + "/ea/api/ea/eaGrade?officeId="+$scope.variable.officeId).success(function (data) {
		if (data.ret == 200) {
			var arr = []
			data.data.forEach(item => {
				item.classes.forEach(child => {
					child.className = item.gradeName + child.className
					arr.push(child)
				})
			})
			$scope.gradeList = arr;
			$scope.goodSpaceArr = arr;
			$scope.goodSpaceShowList = $scope.gradeList.slice(0, 12)
			if ($scope.gradeList.length > 12) {
				$scope.nextFlag = true
			}
		}
	})
	// 优秀老师
	$http.get(spaceEaIp + "/ea/api/uc/ucUser?schoolId="+$scope.variable.officeId+"&delFlag=0&state=1&userType=1").success(function (data) {
		if (data.ret == 200) {
			$scope.teaList = data.data.list
		}
	})
	// 优秀学生
	$http.get(spaceEaIp + "/ea/api/uc/ucUser?schoolId="+$scope.variable.officeId+"&delFlag=0&state=1&userType=2").success(function (data) {
		if (data.ret == 200) {
			$scope.stuList = data.data.list
		}
	})

	//上传背景图
	$scope.uploadBg = function (e) {
		var fd = new FormData();
		var file = e.files[0];
		fd.append('file', file);
		fd.append('type', '0');
		fd.append("createBy", $scope.variable.userId);
		fd.append("officeId", $scope.variable.officeId);
		 fd.append("relationId",$scope.variable.officeId);
		console.log(file)
		$http({
			url: spaceJeucIp + "/jeuc/api/ea/eaSpaceEnclosure/uploadEnclosure",
			method: 'POST',
			data: fd,
			headers: { 'Content-Type': undefined },
			transformRequest: angular.identity
		})
			.success(function (res) {
				var params = {
					relationId: $scope.variable.officeId,
					type: 0,
					enclosureId: res.data.enclosureId,
					updateBy: $scope.variable.userId,
				};
				$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/updateBackGroundImage", params
				).success(function (res) {
					console.log(res)
					if(res.ret ==200){
						$state.reload();
					}
				});
			})
	}
	// $rootScope.bgFile = false;//上传背景隐藏
	if ($scope.variable.userType==4) {
		$scope.bgFile = true;//上传背景不隐藏
	} else{
		$scope.bgFile = false;//上传背景隐藏
	}
	//查询学校首页背景图片
	$scope.backGroundImagePath = './img/newsImg.jpg';       //默认背景
	var params = 'type=0' + '&relationId=' + $scope.variable.officeId;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce?" + params)
		.success(function (data) {
			if (data.ret == 200 && data.data != null) {
				$scope.id = data.data.id;
				$scope.content = data.data.content;
				if (data.data.imagePath == '') {
					$scope.backGroundImagePath = './img/newsImg.jpg';
				} else {
					$scope.backGroundImagePath = data.data.imagePath;
				}
			}

		});
	/**
	 * 查询学校介绍数据
	 */
	var params1 = 'type=3' + '&relationId=' + $scope.variable.officeId;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce?" + params1)
		.success(function (data) {
			if (data.ret == 200) {
				$scope.id = data.data.id;
				$('.zk_schoolIntroduceText').html(data.data.content);
				$scope.imagePath = data.data.imagePath;
			}
		});
	/**
	 * 查询学校资讯列表
	 */
	var params2 = 'type=7' + '&relationId=' + $scope.variable.officeId + "&pageNo=1&pageSize=5";
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/list?" + params2)
		.success(function (data) {
			if (data.ret == 200) {
				$scope.classNoticeList = data.data.list;
			}
		});

    /**
     * 学校风采
     */
	var params3 = "relationId=" + $scope.variable.officeId + "&currentPage=1&pageSize=6";
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpacePhoto/photoList?" + params3).success(function (data) {
		if (data.ret == 200) {
			$scope.variable.schoolImgList = data.data.photos;
		}
	})
}]);


// //省略号
// app.directive('ellipsis',function ($interval){
// 	return {
// 		link : function (scope, element, attrs){
// 			var maxLength = 150;
// 			if(element.text().length>maxLength){
// 				element.text(element.text().substring(0,maxLength));	
// 				element.html(element.text() + '...');
// 			}
// 		}
// 	}
// });

// //时间截取
app.filter("createDateFilter", function () {
	return function (createDate) {
		return createDate.substring(0, 10);
	}
});
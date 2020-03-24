app.controller('classSpaceIndexCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($scope, $state, $timeout, $http, $location, $interval) {
	var userId = $location.search().userId;
	var userType = $location.search().userType;
	$scope.spaceEaIp = spaceEaIp ;
    var ktClassId = $state.params.classId;
	if(ktClassId==null)
	{
		ktClassId = sessionStorage.getItem("classId");
	}
	$http.post(spaceJeucIp + '/jeuc/api/ea/eaSpaceIntroduce/openEaSpaceIntroduce', {
		openType: '2',
		relationId: ktClassId,
		createBy: sessionStorage.getItem("userId"),
		parentRelationId: sessionStorage.getItem("officeId")

	}).success(function(res) {
		if(res.ret == 200) {
			console.log("ktcg")
		} else {
			console.log("ktsb")
		}
	}).error(function(e) {
		console.log("ktsb")
	})

	//   $http.get(spaceEaIp + '/ea/api/uc/ucUser/'+userId+'/'+userType).success(function(data) {

	// 			console.log(spaceEaIp + '/ea/api/uc/ucUser/'+userId+'/'+userType);
	// 			if(data.ret==200){

	// 			 for(var i =0;i<data.data.userRole.length;i++)
	// 				 {
	// 				 	console.log(data.data.userRole[i].rid);

	//  				 	if(data.data.userRole[i].rid==1)
	// 				 	{
	// 				 		sessionStorage.setItem("officeId",data.data.userInfo.officeId);
	//  				 		sessionStorage.setItem("classId",data.data.userRole[i].cid);
	// 				 		sessionStorage.setItem("userId",userId);
	//  				 		sessionStorage.setItem("userType",userType);

	// 				 		console.log( "sssssss");
	// 				 		console.log(data.data.userRole[i].cid);
	// 				 	}
	// 				 }

	// 			}else{
	// 				console.log("aaaaa");
	// 			}
	//  	});
	//轮播图
	$scope.imgBox = [
		{ src: 'ad_1' },
		{ src: 'cs' },
		{ src: 'newsImg' }
	];


	// sessionStorage.setItem("cuid",'undefined')
	// sessionStorage.setItem("officeId",'office_a67f7f9e97f843968b9538729a8130a5')
	// sessionStorage.setItem("classId",'class_51d9606abf9840b18215226411c78e89')
	// sessionStorage.setItem("userId","a75e66cbd2a744feaa5068c11a77e787")
	// sessionStorage.setItem("userType",1)

	$scope.imgBox = $scope.imgBox.concat($scope.imgBox);
	$scope.variable = {
		classId:sessionStorage.getItem("classId"),
		userId: sessionStorage.getItem("userId"),
		userType: sessionStorage.getItem('userType'),
		goodSpaceState: ["教师", "学生"],		//优秀空间选项
		goodSpaceIndex: 0,						//当前优秀空间下标
		goodSpacePage: 0,				//优秀空间页数
		spaceActiveInfo: [],		//空间动态数据
	}
	//判断是否是访客进入    1、地址栏携带参数的而且不等于自己班级id   2、session存了是访客的      
	//如果是访客进入  就将classId  变为访客的classId

	if ($state.params.classId && $state.params.classId != sessionStorage.getItem("classId")) {
		sessionStorage.setItem("visiter", 1)
		sessionStorage.setItem("visiterClassId", $state.params.classId)
	}
	if (sessionStorage.getItem("visiter")==1) {
		$scope.variable.classId = sessionStorage.getItem('visiterClassId')
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
		$scope.variable.goodSpacePage
	}

	// 优秀空间切换
	$scope.nextFlag = false;
	$scope.prevFlag = false;
	$scope.goodSpaceStateChange = function (num) {
		if ($scope.variable.goodSpaceIndex == num) return
		$scope.nextFlag = false;
		$scope.prevFlag = false;
		$scope.variable.goodSpaceIndex = num;
		$scope.goodSpaceArr = num == 0 ? $scope.teaList : $scope.stuList;
		if ($scope.goodSpaceArr.length > 12) $scope.nextFlag = true;
		$scope.variable.goodSpacePage = 0;
		$scope.goodSpaceShowList = $scope.goodSpaceArr.slice(0, 12)
	}
 
 
	// 优秀老师    
	$http.get(spaceEaIp + "/ea/api/uc/ucUser?classId="+$scope.variable.classId+"&userType=1").success(function (data) {
 
		if (data.ret == 200) {
			$scope.teaList = data.data.list
			$scope.goodSpaceArr = $scope.teaList
			$scope.goodSpaceShowList = $scope.teaList.slice(0, 12)
			if ($scope.teaList.length > 12) {
				$scope.nextFlag = true
			}
		}
	})
 
	// 优秀学生
	$http.get(spaceEaIp + "/ea/api/uc/user?classId="+$scope.variable.classId).success(function (data) {
		if (data.ret == 200) {
			$scope.stuList = data.data.list
		}
	})
	//上传背景图
	$scope.bgFile = sessionStorage.classLeader == 1?true:false

	$scope.uploadBg = function (e) {
		var fd = new FormData();
		var file = e.files[0];
		fd.append('file', file);
		fd.append('type', '0');
		fd.append("createBy", $scope.variable.userId);
		fd.append("officeId", $scope.variable.classId);
		 fd.append("relationId",$scope.variable.classId);
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
					relationId: $scope.variable.classId,
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
	//查询班级首页背景图片
	$scope.backGroundImagePath = './img/newsImg.jpg';       //默认背景
	var params = 'type=0' + '&relationId=' + $scope.variable.classId;
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
	 * 班级介绍
	 */
	var params = 'type=4&' + 'relationId=' + $scope.variable.classId;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/?" + params).success(function (data) {
		if (data.ret == 200) {
			var classContent = data.data.content;
			$('.zk_class_introdeuceCont').html(classContent);
			$scope.classimagePath = data.data.imagePath;
		}

	})
	/**
	 * 班主任介绍
	 */
	var params = 'type=5&' + 'relationId=' + $scope.variable.classId;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/?" + params).success(function (data) {
		if (data.ret == 200) {
			var teacherContent = data.data.content;
			$('.zk_class_teaintrodeuceCont').html(teacherContent);
			$scope.teacherImagePath = data.data.imagePath;
		}
	})
	/**
	 * 空间动态             sortType=1&pageNumber=1&showNumber=5&state=0
	 */
	var params = 'sortType=1&pageNumber=1&showNumber=5&state=0&calssId='+$scope.variable.classId;
	$http.get(edu_comment + "/edu-comment/comment?" + params).success(function (data) {
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

	/**
	 * 查询班级公告列表
	 */
	var params = 'type=8&relationId=' + $scope.variable.classId + '&pageNo=1&pageSize=5';
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/list?" + params)
		.success(function (data) {
			if (data.ret == 200) {
				$scope.classNoticeList = data.data.list;
			}
		});

    /**
	 * 查询明星学生列表
	 */
	var params = 'type=6' + '&relationId=' + $scope.variable.classId;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/list?" + params)
		.success(function (data) {
			if (data.ret == 200) {
				$scope.starStudentList = data.data.list.slice(0, 3);
			}
		});

}]);

//轮播图
app.directive('carousel', function ($interval) {
	return {
		restrict: 'EA',
		replace: true,
		link: function (scope, element, attrs) {
			var scrollBox = element.parent();
			var toLeftBtn = scrollBox.prev();
			var toRightBtn = scrollBox.next();
			var w = 1200;
			var timer = null;
			if (scope.$last) {
				var moveLength = scrollBox.children().length;
				scrollBox.css({ 'width': moveLength * w, 'left': -w * moveLength / 2 });
				var i = 0;

				timer = $interval(init, 1000);

				$('.zy_carousel_wrap').on('mouseover', (scrollBox, toLeftBtn, toRightBtn), function () {
					$interval.cancel(timer);
				});
				$('.zy_carousel_wrap').on('mouseout', (scrollBox, toLeftBtn, toRightBtn), function () {
					timer = $interval(init, 1000);
				});

				function init() {
					toRightBtn.trigger('click');
				}

				toLeftBtn.on('click', function () {
					i = parseInt(scrollBox.css('left')) + w;
					move(i);
				});
				toRightBtn.on('click', function () {
					i = parseInt(scrollBox.css('left')) - w;
					move(i);
				});

				function move(i) {
					if (scrollBox.is(':animated')) {
						return;
					} else {
						scrollBox.stop().animate({ 'left': i }, 1000, function () {
							if (i == 0) {
								scrollBox.css({ 'left': -w * moveLength / 2 });
							} else if (i == (1 - moveLength) * w) {
								scrollBox.css({ 'left': w * (1 - moveLength / 2) });
							}
						});
					}
				}
			}
		}
	}
});

//省略号
app.directive('ellipsis', function ($interval) {
	return {
		scope: {
			maxLength: '='
		},
		link: function (scope, element, attrs) {
			//			console.log(scope.variable.classTeacherIntrduce)
			console.log(scope.maxLength)
			//			var maxLength = 150;
			if (element.text().length > scope.maxLength) {
				element.text(element.text().substring(0, scope.maxLength));
				element.html(element.text() + '...');
			}
		}
	}
});

//时间截取
app.filter("createDateFilter", function () {
	return function (createDate) {
		return createDate.substring(0, 10);
	}
});
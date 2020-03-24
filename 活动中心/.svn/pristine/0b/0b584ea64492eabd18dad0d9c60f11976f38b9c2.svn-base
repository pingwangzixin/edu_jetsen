app.controller('activityDetailCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$stateParams', '$rootScope', function($scope, $state, $timeout, $http, $location, $stateParams, $rootScope) {
	$scope.deIsShowImg = false; //已上传文件隐藏
	$scope.xzIsShowImg = false; //上传选择图片已上传隐藏
	$scope.showimg = true; //查看图片弹窗
	console.log($stateParams.activityId);
	//活动详情
	$scope.activityDetail = {};
	//分享
	$scope.ifShare = {
		share: false,
		shareTip: '分享',
		likedNum: 0
	};
	var fileArry = [];
	var userFileArr = [];
	$http.get(requireIp + "activity/activitycenter/findActivityCenter?activityId=" + $stateParams.activityId).success(function(data) {
		console.log(data);
		if(data.code == 200) {
			if(data.data.activityCenter.activityFile !="[]" && data.data.activityCenter.activityFile != "") {
				$.each(JSON.parse(data.data.activityCenter.activityFile), function(i,o) {
					if(i == 0){
						data.data.activityCenter.activityFile = resourceIp + "resource/" + o.substring(0, o.lastIndexOf("/") -   1);
					}
					
					var files = {};
					
					var suffix = o.substring(o.lastIndexOf("."), o.lastIndexOf("/") - 1);
					var relName = o.substring(o.lastIndexOf("/") + 1);
					var filen = relName + suffix;
					var oName = o.substring(0, o.lastIndexOf("/") - 1)
					files.edit_file = relName;
					//				$scope.filedownload = requireIp + "/teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					files.playFileName = o;
					files.filedownload = requireIp + "/teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					files.playName = oName+"//"+relName;
					userFileArr.push(files);
				});
				$scope.userfileLists = userFileArr;
				
			} else {
				data.data.activityCenter.activityFile = "./img/test1.jpg";
			}
			$scope.activityDetail = data.data.activityCenter;
			console.log(data.data.activityCenter);
			if(data.data.activityCenter.activityShared == "1") {
				$scope.ifShare.share = true;
				$scope.ifShare.shareTip = '取消分享';
			} else {
				$scope.ifShare.share = false;
				$scope.ifShare.shareTip = "分享";
			}
			if(data.data.activityCenter.assignMastersummaryFile != "" && data.data.activityCenter.assignMastersummaryFile != null) {
				//				$scope.playfile = data.data.activityCenter.assignMastersummaryFile;
				$.each(JSON.parse(data.data.activityCenter.assignMastersummaryFile), function(idx, data) {
					var files = {};
					var amfile = data;
					var suffix = amfile.substring(amfile.lastIndexOf("."), amfile.lastIndexOf("/") - 1);
					var relName = amfile.substring(amfile.lastIndexOf("/") + 1);
					var filen = relName + suffix;
					var oName = amfile.substring(0, amfile.lastIndexOf("/") - 1)
					files.edit_file = relName;
					//				$scope.filedownload = requireIp + "/teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					files.playFileName = data;
					files.filedownload = requireIp + "/teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					fileArry.push(files);
					if(relName != "") {
						$scope.deIsShowImg = true; //已上传文件显示
					}
				});
				$scope.fileLists = fileArry;
			}

		}
		//状态判断隐藏按钮
		if($scope.activityDetail.activityState == 2) {
			$scope.mastersummary = $scope.activityDetail.assignMastersummary;
			console.log($scope.activityDetail.assignMastersummary + '----------------------')
			console.log($scope.activityDetail.activityState + '---------------------');
			$("#isshow").attr("readonly", "readonly"); //教师总结活动输入框不可用
			$scope.hidebtn = true;
			$scope.ssss = true;
		}
		console.log($scope.activityDetail);
		/*if($scope.activityDetail.activityState==0){
			$scope.ifShare.share = false;
		}else{
			$scope.ifShare.share = true;
		}*/
	});

	$scope.clickShare = function() {
		var share = 1;
		if($scope.ifShare.share) {
			share = 0;
		}
		$http.post(requireIp + "activity/activitycenter/updateActivityShared", {
			activityId: $stateParams.activityId,
			shared: share
		}).success(function(data) {
			console.log(data);
			if(data.code == 200) {
				//成功
				if($scope.ifShare.share) {
					$scope.ifShare.share = false;
					$scope.ifShare.shareTip = '分享';
				} else {
					$scope.ifShare.share = true;
					$scope.ifShare.shareTip = '取消分享';
				}
			} else {
				//失败
				console.log("error");
				$scope.activityComment.great = great;
			}
		});

	}

	//学生完成情况
	$scope.studentType = 0;
	$scope.switchStudentType = function(i) {
		$scope.studentType = i;
	};

	$scope.styudentCompletion = {};
	$http.get(requireIp + "activity/activitycenter/getStyudentCompletion?activityId=" + $stateParams.activityId).success(function(data) {
		console.log(data);
		if(data.code == 200) {
			$scope.styudentCompletion = data.data;
		}
		console.log($scope.styudentCompletion);
	});
	$scope.imgDatas = {
		imgUrls: [],
		imgNames: []
	}

	//图片上传
	$scope.upload = function(e) {
		if($scope.imgDatas.imgUrls.length ==5){
        	$scope.tctips="最多可上传五张图片";
    		$timeout(function(){
	 			$scope.myshow=true;
	 		}, 0);
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		}, 1500);
	 		return;
		}
		var fd = new FormData();
		var file = $('#file')[0].files[0];
		fd.append("filename", file);
		if($.isEmptyObject(file)) {
			return;
		};
		fd.append("id", "tea_470_13110");
		$scope.fileName = file.name;
		console.log(file.name);
		for(var j = 0; j< $scope.imgDatas.imgNames.length ; j++){
        	console.log($scope.imgDatas.imgNames[j]);
			if(file.name == $scope.imgDatas.imgNames[j]){
	        	$scope.tctips="该附件已在列，不可重复上传";
		 		$timeout(function(){
	 				$scope.myshow=true;
	 			}, 0);
		 		$timeout(function(){
		 			$scope.myshow=false;
		 		}, 1500);
		 		$('#file').val('');
	 			return;
        	}
        }
		$("body").showLoading();
		$http({
			method: 'POST',
			url: requireIp + "activity/activitycenter/uploadImage",
			data: fd,
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(data) {
			console.log(data)
			if(data.message == "文件名不符合要求,操作失败!") {
				$scope.submitActivity.tipWord = '文件不符合要求';
				$scope.submitActivity.tipSrc = 'succeed';
				$scope.submitActivity.tip = true;
				$timeout(function() {
					$scope.submitActivity.tip = false;
				}, 2000);
			} else if(data.code == 200) {
				$scope.imgDatas.imgUrls.push(data.data.imgUrl);
				$scope.imgDatas.imgNames.push(file.name);
				console.log("$scope.imgDatas.imgUrls=" + angular.toJson($scope.imgDatas.imgUrls));
				console.log("$scope.imgDatas.imgNames=" + angular.toJson($scope.imgDatas.imgNames));
				$scope.imgUrl = data.data.imgUrl;
				$scope.imgName = file.name;
				$scope.xzIsShowImg = true //上传成功显示已上传文件
				$('#file').val('');
			} else {

			}
			$("body").hideLoading();
		}).error(function(e) {
			console.log(e)
			$("body").hideLoading();
		})
	}
	$scope.delImgData = function(index) {
		console.log($scope.imgDatas.imgUrls);
		$scope.imgDatas.imgUrls.splice(index, 1);
		$scope.imgDatas.imgNames.splice(index, 1);
		if($scope.imgDatas.imgNames.length <= 0){
        	$scope.xzIsShowImg = false;//不显示‘已上传文件’
        }
		$("#file").val("");
	}

	$scope.submitActivity = {
		popup: false,
		tip: false,
		tipWord: '',
		tipSrc: ''
	};
	$scope.imgUrl = '';
	//提交按钮
	$scope.subBtn = function() {
		$scope.submitActivity.popup = true;
	};
	//验证255字符
	$scope.checkText = function() {
		if($scope.activityDetail.assignMastersummary.length > 255) {
			$scope.submitActivity.popup = false;
			$scope.myshow = true;
			$scope.tctips = "活动总结仅可输入255字符"
			$timeout(function() {
				$scope.myshow = false;
			}, 1500)
			$scope.activityDetail.assignMastersummary = $scope.activityDetail.assignMastersummary.substr(0, 255);
		}
	};
	//结束并总结活动
	$scope.subSureBtn = function() {
		if($scope.activityDetail.assignMastersummary == null || $scope.activityDetail.assignMastersummary == "") {
			$scope.submitActivity.popup = false;
			$scope.myshow = true;
			$scope.tctips = "请填写活动总结内容"
			$timeout(function() {
				$scope.myshow = false;
			}, 1500)
		} else {
			$http({
				method: "POST",
				url: requireIp + "activity/activitycenter/updateAssignMastersummary",
				data: {
					assignMastersummary: $scope.activityDetail.assignMastersummary,
					activityId: $stateParams.activityId,
					assignMastersummaryFile: angular.toJson($scope.imgDatas.imgUrls)
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function(data) {
				console.log(data);
				console.log($scope.activityDetail);
				$scope.submitActivity.tipWord = '活动总结成功';
				$scope.submitActivity.tipSrc = 'succeed';
				$scope.submitActivity.tip = true;
				$timeout(function() {
					$scope.submitActivity.tip = false;
				}, 2000);

			});
			setTimeout(function() {
				$state.go('wrap.list.activityList');
			}, 800)
		}
	}

	$scope.studentActivity = {};
	$scope.studentActivityFiledownload = "";
	$scope.studentActivityFilename = "";
	
	$scope.StudentActivityComment = function(studentId) {
		var  imgs = [];
		var tupianNames = [];
		$scope.studentActivity = {};
		$http.get(requireIp + "activity/activitycenter/getStudentActivityComment?studentId=" + studentId + "&activityId=" + $stateParams.activityId).success(function(res) {
			if(res.code == 200) {
				$scope.studentActivity.comment = res.data.activityComment;
				$scope.studentActivity.stuname = res.data.assignStuname;
				if(res.data.assignFile != "[]" && res.data.assignFile != "" ) {
//					$('.Ydetail').clear();
					$.each(JSON.parse(res.data.assignFile), function(i,data) {
						var imgHtml = {};
						var  tupian = {};
					var amfile = data;
					var suffix = amfile.substring(amfile.lastIndexOf("."), amfile.lastIndexOf("/") - 1);
					var relName = amfile.substring(amfile.lastIndexOf("/") + 1);
					var filen = relName + suffix;
					var oName = amfile.substring(0, amfile.lastIndexOf("/") - 1)
					$scope.studentActivity.filename = relName;
					$scope.studentActivity.filedownload = requireIp + "teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					var fileName = data.substring(0, data.lastIndexOf("/") - 1)
					tupian.name = relName;
					tupian.ul = requireIp + "teacher/upload/downloadByPath.do?fileName=" + filen + "&oName=" + oName;
					tupianNames.push(tupian);
					if(relName !=""){
			    		$scope.stuIsShowImg=true;//已上传文件显示
			    	}
					var html = resourceIp + commonFileUrl + fileName;
					 imgs.push(html);
//					$("#stuImg").html(html);
					});
					$scope.imgsList = imgs;
					$scope.tupianList = tupianNames;
				}
			}
			$(".zy_student_feedback_box").show();
		});

	}

	$scope.closeStudentActivity = function() {
			$(".zy_student_feedback_box").hide();
			$scope.tupianList = [];
			console.log($scope.imgsList);
			
		}
	//通过下标获取需要显示图片的地址
	 $scope.showImgByIndex = function(index){
		console.log(index);
		var imgUrls = $scope.imgDatas.imgUrls[index]
		console.log(imgUrls)
		$scope.play(imgUrls);
	}  
		//图片预览
	$scope.play = function(playFile) {
		//http://127.0.0.1:8080/resource//activity/img/tea_470_13110_1512378005172.png
		//var playFile = "/activity/img/tea_470_13110_1512378046049.png//QQ图片20171201155931";
		var fileName = playFile.substring(0, playFile.lastIndexOf("/") - 1)
		$http({
			method: "GET",
			url: requireIp + "activity/activitycenter/getType",
			params: {
				fileName: fileName,
			}
		}).success(function(data) {
			console.log(data);
			if(data.type == "image") {
				$("#showplayer").html("");
				//			    $('.Ydetail').show();
				$scope.showimg = false;
				var html = "<img style='width:600px;position:static;' src='" + resourceIp + commonFileUrl + fileName + "'/>";
				$("#showplayer").html(html);
			}
		});

	}

	$scope.closeActivityCommentFile = function() {
		$(".zy_student_feedback_box").html("");
		$(".zy_feedback_file").hide();
	}
}]);

app.filter('activityStateFilter', function() {
	return function(obj) {
		if(obj == 0) {
			return "未开始";
		} else if(obj == 1) {
			return "进行中";
		} else if(obj == 2) {
			return "已结束";
		}
	}
});
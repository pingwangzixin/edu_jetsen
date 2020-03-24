app.controller('classStarStudentEditCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($scope, $state, $timeout, $http, $location, $interval) {
	$scope.config = {
		wordCount: true,
		maximumWords: 140,
	};
	//定义变量
	$scope.constants = {
		state: $location.$$search.state,
		id: $location.$$search.id,
		enclosureId: [],
		defaultImage: true,
		type: '6',
		userId: sessionStorage.getItem("userId"),
		cuid: sessionStorage.getItem("cuid"),
		classId: sessionStorage.getItem("classId"),
		filePage: true,//必须上传照片 true 为已上传
		tipBox: false,			//提示弹框
		tipSuccess: false,		//提示框默认状态， 
		filePath: "",//图片地址
	};
	// 学生简介长度检测
	$scope.mottoTextCount = 140
	$scope.classMottoTextChange = function () {
		$scope.mottoTextCount = 140 - $scope.ueditor.length >= 0 ? 140 - $scope.ueditor.length : 0;
		if ($scope.ueditor.length > 140) {
			tipBoxShow(false, "学生简介不能超过140字")
			$scope.ueditor = $scope.ueditor.slice(0, 140)
		}
	}
	//根据登录的用户查询用户信息
	$scope.$watch('$viewContentLoaded', function () {
		$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + sessionStorage.getItem("userId") + '/' + sessionStorage.getItem("userType")).success(function (data) {
			if (data.ret == 200) {
				var data = data.data;
				angular.forEach(data.userRoleInfo, function (response, index) {
					$scope.roleName = response.roleName;
				})
			}
		})
	})
	//根据登录的用户查询用户信息
	$scope.$watch('$viewContentLoaded', function () {
		$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + sessionStorage.getItem("userId") + '/' + sessionStorage.getItem("userType")).success(function (data) {
			if (data.ret == 200) {
				var data = data.data;
				angular.forEach(data.userRoleInfo, function (response, index) {
					$scope.roleName = response.roleName;
				})
			}
		})
	})
	$scope.editFlag = null;
	if ($scope.roleName = "班主任") {
		$scope.editFlag = false;//不隐藏
	} else {
		$scope.editFlag = true;//隐藏编辑按钮
	}
	if ($scope.constants.state == 1) {
		var params = 'type=' + $scope.constants.type + '&' + 'id=' + $scope.constants.id;
		$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?" + params).success(function (data) {
			if (data.data != null) {
				$scope.id = data.data.id;
				$scope.title = data.data.title;
				$scope.ueditor = data.data.content;
				$scope.mottoTextCount = 140 - data.data.content.length;
				$scope.constants.filePath = data.data.filePath;
				if (data.data.enclosure != "") {
					$scope.imagePath = data.data.enclosure.filePath;
				} else {
					$scope.constants.defaultImage = false;
				}
			}

		})
    }
     if($scope.constants.state==0){
     	$scope.constants.defaultImage = false;
     	$scope.imagePath="";
     }
      
    $scope.filePhoto  = function(me){
    	var imgFile = document.getElementById('FileInput').files[0];
    	$scope.imagePath=imgFile;
    	var fr = new FileReader();
    	fr.readAsDataURL(imgFile);
    	fr.onload = function(){
    		document.getElementById('FileImg').src = this.result;
    		var fd = new FormData();
	       	var file = me.files[0];
	       	fd.append('file', file);
	       	fd.append('type', $scope.constants.type);
	       	fd.append("createBy",$scope.constants.userId);
	       	fd.append("officeId",$scope.constants.classId);
	       	 fd.append("relationId",$scope.constants.classId);
           	$http({
	    		url:spaceJeucIp + "/jeuc/api/ea/eaSpaceEnclosure/uploadEnclosure",
	    		method:'POST',
	    		data:fd,
	    		headers: {'Content-Type':undefined},
	            transformRequest: angular.identity 
	    	})
	    	.success(function(res){
	    		$scope.constants.enclosureId = res.data.enclosureId;
	    		$scope.imagePath = res.data.filePath;
	    	})
	    	.error(function(e) {
				error(e)
			})
				.success(function (res) {
					$scope.constants.enclosureId = res.data.enclosureId;
					$scope.imagePath = res.data.filePath;
				})
				.error(function (e) {
					error(e)
				})
		}
	}
    /**
	 * 明星学生添加修改数据
	 */
	$scope.save = function (ueditor) {
		if (!$scope.ueditor || !$scope.title || !$scope.imagePath) {
			tipBoxShow(false, "请确保各项都不为空")
			return
		}
		// if ($scope.imagePath!="") {
		var params = {};
		params.type = $scope.constants.type;
		params.title = $scope.title;
		params.content = $scope.ueditor;
		params.enclosureId = $scope.constants.enclosureId;
		if ($scope.constants.state == 0) {//添加
			params.createBy = $scope.constants.userId;
			params.relationId = $scope.constants.classId;
			console.log("明星学生添加提交数据：" + JSON.stringify(params))
			$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/publishIntroduce", params
			).success(function (data) {
				$state.go('wrap.classSpace.classStarStudent.classStarStudentList');
			});
		}
		if ($scope.constants.state == 1) {//修改
			$scope.constants.tixbox = false;
			params.id = $scope.constants.id;
			params.updateBy = $scope.constants.userId;
			console.log("明星学生修改提交数据：" + JSON.stringify(params))
			$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/updateIntroduceById", params
			).success(function (data) {
				$state.go('wrap.classSpace.classStarStudent.classStarStudentList');
			});
		}
		// } 
		// else{
		// 		$scope.constants.tixbox=true;
		// 		$timeout(function(){
		// 			$scope.constants.tixbox=false;
		// 		},1000);
		// }
	}
	/**
	 * 取消修改班主任介绍
	 */
	$scope.cancel = function () {
		$state.go('wrap.classSpace.classStarStudent.classStarStudentList');
	}
	//定时提示框事件 1500ms
	function tipBoxShow(succ, word) {		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.constants.tipBox = true;
		$scope.constants.tipSuccess = succ;
		$scope.constants.tipWord = word;
		$timeout(function () {
			$scope.constants.tipBox = false;
		}, 1500);
	}

}]);

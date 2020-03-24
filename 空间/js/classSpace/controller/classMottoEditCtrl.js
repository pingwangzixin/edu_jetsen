app.controller('classMottoEditCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$window', function ($scope, $state, $timeout, $http, $location, $interval, $window) {
	//定义变量
	$scope.variable = {
		enclosureId: '',
		defaultImage: true,
		id: $location.$$search.id,
		type: '2',
		userId: sessionStorage.getItem("userId"),
		cuid: sessionStorage.getItem("cuid"),
		classId: sessionStorage.getItem("classId")
	};
	// 班训长度检测
	$scope.mottoTextCount = 26
	$scope.classMottoTextChange = function () {
		$scope.mottoTextCount = 26 - $scope.ueditor.length >= 0 ? 26 - $scope.ueditor.length : 0;
		if ($scope.ueditor.length > 26) {
			tipBoxShow(false, "班训长度不能超过26字")
			$scope.ueditor = $scope.ueditor.slice(0, 26)
		}
	}
	/**
	 * 查询班训数据
	 */
	//查询班训所需参数
	var params = 'type=' + $scope.variable.type + '&' + 'id=' + $scope.variable.id;
	$http.get(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?" + params).success(function (data) {
		if (data.data != null) {
			$scope.id = data.data.id;
			$scope.ueditor = data.data.content;
			$scope.mottoTextCount = 26 - data.data.content.length
			if (data.data.enclosure != "") {
				$scope.imagePath = data.data.enclosure.filePath;
			} else {
				$scope.variable.defaultImage = false;
			}
		}

	})
	/**
	 * 上传图片
	 */
	$scope.filePhoto = function (me) {
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.onload = function(){
           // 显示图片
           document.getElementById("FileImg").src = this.result;
           
           var fd = new FormData();
	       var file = me.files[0];
	       fd.append('file', file);
	       fd.append('type', $scope.variable.type);
	       fd.append("createBy",$scope.variable.userId);
	       fd.append("officeId",$scope.variable.classId);
	        fd.append("relationId",$scope.variable.classId);
           $http({
	    		url:spaceJeucIp + "/jeuc/api/ea/eaSpaceEnclosure/uploadEnclosure",
	    		method:'POST',
	    		data:fd,
	    		headers: {'Content-Type':undefined},
	            transformRequest: angular.identity 
	    	})
	    	.success(function(res){
	    		$scope.variable.enclosureId = res.data.enclosureId;
	    		$scope.imagePath = res.data.filePath;
	    	})
	    	.error(function(e) {
				error(e)
			})
				.success(function (res) {
					$scope.variable.enclosureId = res.data.enclosureId;
					$scope.imagePath = res.data.filePath;
				})
				.error(function (e) {
					error(e)
				})

		}

	}
	/**
	 * 班训修改数据
	 */
	$scope.save = function (ueditor) {
		if(!$scope.ueditor || !$scope.imagePath){
			tipBoxShow(false, "班训及图片不能为空")
			return
		}
		var params = {
			id: $scope.variable.id,
			type: $scope.variable.type,
			content: $scope.ueditor,
			enclosureId: $scope.variable.enclosureId,
			updateBy: $scope.variable.userId,
		};
		$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/updateIntroduceById", params
		).success(function (data) {
			if (data.ret == 200) {
				$state.go('wrap.classSpace.classMotto.classMottoShow');
			}
		});
	}

	/**
	 * 取消修改班训
	 */
	$scope.cancel = function () {
		$state.go('wrap.classSpace.classMotto.classMottoShow');
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

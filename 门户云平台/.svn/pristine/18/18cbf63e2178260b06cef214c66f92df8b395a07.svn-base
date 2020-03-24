app.controller('classIntroduceEditCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//定义变量
	$scope.variable = {
		enclosureId:'',
		defaultImage:true,
		type:'4',
		id:$location.$$search.id,
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		classId:sessionStorage.getItem("classId")
	};
	
	
	
	/**
	 * 查询班级介绍
	 */
	//查询班级介绍所需参数
	var params ='type='+$scope.variable.type+'&'+'id='+$scope.variable.id;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?"+params).success(function (data){
		if(data.data!=null){
			$scope.id = data.data.id;
			$scope.ueditor = data.data.content;
			if(data.data.enclosure!=""){
				$scope.imagePath = data.data.enclosure.filePath;
			}else{
				$scope.variable.defaultImage = false;
			}
		}
		
	})
	//上传图片
	$scope.filePhoto = function(me){
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
           	$http({
	    		url:jeucIp + "/ea/eaSpaceEnclosure/uploadEnclosure",
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
        }

	}
	/**
	 * 保存班级介绍修改数据
	 */
	$scope.save = function(ueditor){
		var params = {
		               id:$scope.id,
		               type:$scope.variable.type,
		               content:$scope.ueditor,
		               enclosureId:$scope.variable.enclosureId,
		               updateBy:$scope.variable.userId,
		            };
		console.log("班级介绍提交数据："+JSON.stringify(params))
		$http.post(jeucIp + "/ea/eaSpaceIntroduce/updateIntroduceById",params
	    ).success(function (data) {
	   		$state.go('classSpace.classIntroduce.classIntroduceShow');
	    });
	}
	/**
	 * 取消修改班级介绍
	 */
	$scope.cancel = function(){
		$state.go('classSpace.classIntroduce.classIntroduceShow');
	}
}]);

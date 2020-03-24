app.controller('classHeadTeacherEditCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//定义变量
	$scope.variable = {
		enclosureId:'',
		defaultImage:true,
		type:'5',
		id:$location.$$search.id,
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),	
		classId:sessionStorage.getItem("classId")
	};
	
	/**
	 * 查询班主任介绍
	 */
	//查询班主任介绍所需参数
	var params = 'id='+$scope.variable.id;
	$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?"+params).success(function (data){
		console.log("data.content=="+data.content);
		if(data.ret==200){
			$scope.id = data.data.id;
			$scope.ueditor = data.data.content;
			if(data.data.enclosure!=""){ 
				$scope.imagePath = data.data.enclosure.filePath;
			}else{
				$scope.variable.defaultImage = false;
			}
		}
	})
	$scope.filePhoto = function(me){
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.onload = function(){
			document.getElementById("FileImg").src = this.result;
			
			var fd = new FormData();
	       	var file = me.files[0];
	       	fd.append('file', file);
	       	fd.append('type', $scope.variable.type);
	       	fd.append("createBy",$scope.variable.userId);
	       	fd.append("officeId",$scope.variable.classId);
	       	 fd.append("relationId",$scope.variable.classId);
           	$http({
	    		url: spaceJeucIp + "/jeuc/api/ea/eaSpaceEnclosure/uploadEnclosure",
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
	 * 班主任介绍修改数据
	 */
	$scope.save = function(ueditor){
		var params = {
		               id:$scope.variable.id,
		               type:$scope.variable.type,
		               content:$scope.ueditor,
		               enclosureId:$scope.variable.enclosureId,
		               updateBy:$scope.variable.userId
		            };
//		var param ="id="+params.id+"&type="+params.type+"&title="+params.title+"&content="+params.content+"&enclosureId="+params.enclosureId+"&updateBy="+params.updateBy;	
//		console.log("班主任介绍编辑提交数据："+JSON.stringify(param))
		$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/updateIntroduceById?",params
	    ).success(function (data) {
	    	console.log(data);
	    	if (data.ret==200) {
	    		$state.go('wrap.classSpace.classHeadTeacher.classHeadTeacherShow');
	    	}
	    });
	}
	
	/**
	 * 取消修改班主任介绍
	 */
	$scope.cancel = function(){
		$state.go('wrap.classSpace.classHeadTeacher.classHeadTeacherShow');
	}
}]);

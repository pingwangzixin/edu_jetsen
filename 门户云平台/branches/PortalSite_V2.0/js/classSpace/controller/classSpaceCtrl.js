app.controller('classSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	if(sessionStorage.getItem("classId")==undefined){
		sessionStorage.setItem("classId",$location.$$search.classId);
	}else{
		classId = sessionStorage.getItem("classId");
		paramClassId = $location.$$search.classId
		if(classId!=paramClassId&&paramClassId!=undefined){
			sessionStorage.setItem("classId",paramClassId);
		}
	}
	if(sessionStorage.getItem("cuid")==undefined){
		sessionStorage.setItem("cuid",$location.$$search.cuid);
	}else{
		cuid = sessionStorage.getItem("cuid");
		paramCuid = $location.$$search.cuid
		if(cuid!=paramCuid&&paramCuid!=undefined){
			sessionStorage.setItem("cuid",paramCuid);
		}
	}
	
	//变量包
	$scope.commonVar = {
		defaultPage : 0,
		name:"",
		isInnovation:sessionStorage.getItem("isInnovation"),
		classId:sessionStorage.getItem("classId"),
		className:sessionStorage.getItem("className"),
		editFlag : false,
		userType: sessionStorage.getItem("userType"),
		userId:sessionStorage.getItem("userId"),
		type:5,
		enclosureId:"",
		backGroundImagePath:"",
	};
	// 是否显示班级首页图片上传按钮
	 if($scope.commonVar.userType=="1"){
			$scope.commonVar.editFlag = false;//不隐藏
		}else{
			$scope.commonVar.editFlag= true;//隐藏编辑按钮
		}
	
	
	if ($scope.commonVar.isInnovation==1){
		console.log("gyc1")
			//根据新高考学校iD查询学校信息
			$http.get(jeucIp+"/ea/office/"+sessionStorage.getItem("officeId"))
			.success(function (data) {
				if(data.ret==200){
					var data = data.data;
					$scope.officeName=data.name;
				}
				console.log("学校名称："+$scope.officeName);
			})
			var classId=$scope.commonVar.classId.toString()
			console.log(classId.indexOf("_"))
			if(classId.indexOf("_")>0){
				  $http.get(jeucIp+"/ea/class/"+sessionStorage.getItem("classId")).success(function(data){
				  	console.log(data) 
				  	if (data.ret==200) {
				  		$scope.commonVar.name=data.data.gradeName+"("+data.data.name+")班";
				  	}
				  	console.log("班级名称"+$scope.commonVar.name) 
				  })
			}else{
				$http.get(xingaokaoIp+"JetsenNewNEMT/newClass/"+sessionStorage.getItem("classId")).success(function (data) {
					if(data.code==200){
						var data = data.data;
						$scope.commonVar.name=data.name;
					}
					console.log("名称："+$scope.commonVar.name);	
				})
			}
			$http.get(jeucIp+"/uc/user/"+sessionStorage.getItem("userId")).success(function (data) {
					if(data.ret==200){
						var data = data.data;
						$scope.section = data.realname.substring(0,1);
						$scope.realname = data.realname;
						}
					});
	} else {
		console.log("gyc2")
				//页面加载完毕事件 
			$scope.$watch('$viewContentLoaded', function() {
				$http.get(jeucIp+"/ea/class/"+sessionStorage.getItem("classId")).success(function (data) {
					console.log(data)
					if(data.ret==200){
						
						var data = data.data;
						console.log(data.gradeName);
						console.log(data.name);
						$scope.realname = data.realname;
						$scope.officeName=data.officeName;
						$scope.commonVar.name=data.gradeName+"("+data.name+")"+"班"
						console.log("名称："+$scope.commonVar.name);	
						console.log("学校名称："+$scope.officeName);
					}
				})
		$http.get(jeucIp+"/uc/user/"+sessionStorage.getItem("userId")).success(function (data) {
					if(data.ret==200){
						var data = data.data;
						$scope.section = data.realname.substring(0,1);
						$scope.realname = data.realname;
						}
					});
		});
	}
	// 点击空间展示班级图片跳转到 该班级空间
	//导航
	$scope.spaceNav = [
	 	
		{name : '首页',href : 'classSpace.classSpaceIndex'},
		{name : '课程表',href : 'classSpace.classTimetables'},
		{name : '班训',href : 'classSpace.classMotto'},
		{name : '班级公告',href : 'classSpace.classNotice'},
		{name : '班主任介绍',href : 'classSpace.classHeadTeacher'},
		{name : '班级介绍',href : 'classSpace.classIntroduce'},
		{name : '明星学生',href : 'classSpace.classStarStudent'},
		{name : '班级风采',href : 'classSpace.classPhoto'}
	];
	
	//上传班级首页照片
	$scope.filePhoto = function(me){
		 
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.onload = function(){
            // 显示图片
//          document.getElementById("FileImg").src = this.result;
            console.log(123)
            var fd = new FormData();
	        var file = me.files[0];
	        fd.append('file', file);
	        fd.append('type', '0');
	        fd.append("createBy",$scope.commonVar.userId);
	        fd.append("classId",$scope.commonVar.classId);
            $http({
	    		url:jeucIp + "/ea/eaSpaceEnclosure/uploadEnclosure",
	    		method:'POST',
	    		data:fd,
	    		headers: {'Content-Type':undefined},
	            transformRequest: angular.identity 
	    	})
	    	.success(function(res){
	    		if(res.ret==200){
	    			$scope.commonVar.enclosureId = res.data.enclosureId;
	    			$scope.commonVar.backGroundImagePath=res.data.filePath;
		    		//保存背景图片与班级的关系
		    		var params = {
			               relationId:$scope.commonVar.classId,
			               type:0,
			               enclosureId:$scope.commonVar.enclosureId,
			               updateBy:$scope.commonVar.userId,
			            };
					$http.post(jeucIp + "/ea/eaSpaceIntroduce/updateBackGroundImage",params
				    ).success(function (data) {
				    	if(data.ret ==200){
				    		$state.reload();
				    	}
				    });
	    		}
	    	}).error(function(e) {
				error(e)
			})
        }
	}
}]);

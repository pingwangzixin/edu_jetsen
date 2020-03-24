app.controller('schoolSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
		//获取学校Id
	if (sessionStorage.getItem("officeId")==undefined) {
		sessionStorage.setItem('officeId',$state.params.officeId);
		console.log("接受到的学校ID：》》》》"+$state.params.officeId)
	} else{
		$scope.officeId = sessionStorage.getItem("officeId");
		console.log("接受到的学校ID：》》》》"+$scope.officeId)
	}
   $http.get(jeucIp+"/uc/user/"+sessionStorage.getItem("userId"))
	.success(function (data) {
		if(data.ret==200){
			var data = data.data;
			sessionStorage.setItem("officeId",data.officeId);
			$http.get(jeucIp+"/ea/office/"+sessionStorage.getItem("officeId"))
				.success(function (officeData) {
					if(officeData.ret==200){
					var officeData = officeData.data;
					$scope.officeName = officeData.name;
				}
			})
		}
	});
  
	//变量包
	$scope.commonVar = {
		type:0,
		enclosureId:'',
		userId:sessionStorage.getItem("userId"),
		officeId:sessionStorage.getItem("officeId"),
		defaultPage : 0,
		userType :sessionStorage.getItem("userType"),
		bgFile:false  	//上传背景隐藏
	};

	if ($scope.commonVar.userType=="4") {
		$scope.commonVar.bgFile = true;//上传背景不隐藏
	} else{
		$scope.commonVar.bgFile = false;//上传背景隐藏
	}
	//导航
	$scope.spaceNav = [
		{name : '首页',href : 'schoolSpace.schoolSpaceIndex'},
		{name : '校训',href : 'schoolSpace.schoolMotto'},
		{name : '学校介绍',href : 'schoolSpace.schoolIntro'},
		{name : '学校资讯',href : 'schoolSpace.schoolNews'},
		{name : '学校风采',href : 'schoolSpace.schoolPhoto'},
		{name : '空间展示',href : 'schoolSpace.schoolSpaceShow'}
	];
	$scope.filePhoto = function(me){
		var imgFile = document.getElementById('FileInput').files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.onload = function(){
            // 显示图片
//          document.getElementById("FileImg").src = this.result;
            
            var fd = new FormData();
	        var file = me.files[0];
	        fd.append('file', file);
	        fd.append('type', '0');
	        fd.append("createBy",$scope.commonVar.userId);
	        fd.append("officeId",$scope.commonVar.officeId);
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
		    		//保存背景图片与学校的关系
		    		var params = {
			               relationId:$scope.commonVar.officeId,
			               type:$scope.commonVar.type,
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
	    		
	    	})
	    	.error(function(e) {
				error(e)
			})
        }

	}
	$http.get(jeucIp+"/uc/user/"+sessionStorage.getItem("userId"))
	.success(function (data) {
		if(data.ret==200){
			var data = data.data;
			$scope.section = data.realname.substring(0,1);
			$scope.realname = data.realname;
		}
	});
}]);

app.controller('reportCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//返回按钮返回路径
	$scope.prevPath= 'wrap.' + $location.$$search.prevPage;
	
	//学生id
	$scope.stuId = $location.$$search.stuId;
	//班级id
	$scope.classId = $location.$$search.classId;
	$scope.imgState = false;
	//学生信息
	$scope.student = {};
	$http.post(requireIp+"teacher/suZhiController/findStuSuZhiInfo.do",{
		stuId:$scope.stuId,
		classId:$scope.classId
	}).success(function(msg){
		var obj = JSON.parse(msg);
		console.log(JSON.parse(msg))
		$scope.student.stuName = obj.stuInfo.stuName;
		$scope.student.sex = obj.stuInfo.sex;
		$scope.student.nation = obj.stuInfo.nation;
		$scope.student.birthDate = obj.stuInfo.birthDate;
		$scope.student.address = obj.stuInfo.address;
		$scope.student.phoneNumber = obj.stuInfo.phoneNumber;
		$scope.student.studyNo = obj.stuInfo.studyNo;
		$scope.student.className = obj.stuInfo.gradeName+obj.stuInfo.name;
		$scope.student.headmaster = obj.stuInfo.headmaster;
		if(obj.stuSuZhiInfo.length>0){
			$scope.weiduNameList = obj.stuSuZhiInfo[0].data.weiduName
		}else{
			$scope.weiduNameList = ['思想品德和公民素养','学业水平和学习素养','身体和心理健康水平','社会实践和动手能力','兴趣特长及审美素养'];
		}
		$scope.stuWeiduInfoList = obj.stuSuZhiInfo;
		$scope.pingYuList = obj.stuPy;
		if(obj.stuInfo.pic !=""){
			$scope.student.picUrl =resourceIp+'/resource/evaluate/'+ obj.stuInfo.pic;
			$scope.imgState=true;
		}
		
	}).error(function(e){
		console.log(e)
	})
	
	//上传
	$scope.picAction = function(self){
		console.log(123);
		files = self.files[0];
		console.log(files);
		var fd = new FormData();
		if(files){
	//			zjyNoticeFn('zjy-alert',true,100000,{img:'img/wonde_big.png',con:'正在上传,请稍候...'});
			fd.append('file', files);
			fd.append('stuId',$scope.stuId);
			fd.append('stuNo',$scope.student.studyNo);
			fd.append('stuName',$scope.student.stuName);
			$http({
				url: requireIp+"suZhiEvaluate/InstructorController/upload.do",
				method:'POST',
				data:fd,
				headers: {'Content-Type':undefined},
				transformRequest: angular.identity 
			})
			.success(function(res) {
				console.log("请求成功："+res);
				if(res!="0"){
					$scope.imgState=true;
					$scope.student.picUrl = resourceIp+'/resource/evaluate/'+res
					
				}else{
					console.log("失败");
				}
			})
			.error(function(e) {
	//				zjyNoticeFn('zjy-alert',true,1000,{img:'img/wonde_big.png',con:'上传失败'});
				console.log("请求失败："+e);
			});
		}
	};

}]);


	
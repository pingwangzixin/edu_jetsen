 app.controller('sharedLibraryStatisticsCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
		//个人信息       
	var user;
	var userId = "";
	var userRole = "";
	//获取年级
	$scope.grade = [];
	var gradeArray = [];
	var g = {};
	var call = {};
	var gradeIdArr = [];
	$scope.zanwu=true;
	$scope.findClassByTeaId = function(){
		$http.get(requireIp+"activity/activitycenter/findClassByTeaId?userId="+userId).success(function(data) {
//				$scope.grade=data.data[data.data.length-1];
				for(var i =0;i < data.data.length ; i++){
					var c = [];
					call = {};
					g = {};
					
					if(gradeArray.length !=0){
						for(var j = 0; j< gradeArray.length ; j++){
							if(data.data[i].gradeId != gradeArray[j].gradeId && $.inArray(data.data[i].gradeId,gradeIdArr) < 0){
								gradeIdArr.push(data.data[i].gradeId)
								g.gradeName = data.data[i].gradeName;
								g.gradeId = data.data[i].gradeId;
								call.classId=data.data[i].id;
								call.className = data.data[i].className;
								c.push(call);
								g.class = c;
								gradeArray.push(g);
								break;
							}else{
								if(data.data[i].gradeId != gradeArray[j].gradeId){
									continue;
								}
								c = gradeArray[j].class;
								
								call.classId=data.data[i].id;
								call.className = data.data[i].className;
								c.push(call);
								gradeArray[j].class = c;
							}
						}
					}else{
						g.gradeName = data.data[i].gradeName;
						g.gradeId = data.data[i].gradeId;
						call.classId=data.data[i].id;
						call.className = data.data[i].className;
						c.push(call);
						g.class = c;
						gradeArray.push(g);
					}
					
				}
				console.log(gradeArray);
				$scope.grade = gradeArray;
				$scope.className = gradeArray[0].class;
				console.log($scope.grade)
		});
	}
	
	
	$scope.personalMsg = {};
	var token = $location.$$search.token;
	if(token == null || token == "" || token == undefined){
		token = sessionStorage.getItem('token');
	}else{
		sessionStorage.setItem('token',token);
	}
	$scope.personalMsg.userFace = "./img/userPhoto.png";
	var url = jeucIp+"/Api/UserInfo/getUser?token="+token+"&clientId="+clientid+"&clientSecret="+clientS;
	$http.get(url).success(function(res){
		console.log(res)
		if(res.ret != "1"){
			return ;
		}
		var userType = 1;
		if(res.userRole == "tea"){
			user = res.teacherInfo;
			sessionStorage.setItem("user",JSON.stringify(res.teacherInfo));
			$scope.personalMsg.name = res.teacherInfo.teaName;
			$scope.personalMsg.role = res.teacherInfo.teaRole;
			$scope.personalMsg.school = res.teacherInfo.schoolName;
			if(!$.isEmptyObject(res.teacherInfo.teachingInfo)){
				$scope.personalMsg.class = res.teacherInfo.teachingInfo[1].subStages;
			}
			userType =1;
			userId = res.teacherInfo.teaId;
			userRole = res.teacherInfo.teaRole;
		}else{
			user = res.studentInfo;
			sessionStorage.setItem("user",JSON.stringify(res.studentInfo));
			$scope.personalMsg.name = res.studentInfo.stuName;
			$scope.personalMsg.role = "学生";
			$scope.personalMsg.school = res.studentInfo.stuClassInfo.schoolName;
			$scope.personalMsg.class= res.studentInfo.stuClassInfo.subStages
				$scope.personalMsg.classNo = res.studentInfo.stuClassInfo.classNo+"班";
			userType = 2;
			userId = res.studentInfo.stuId;
			userRole = "学生";
		}
		$http.get(jeucIp+"api/uc/ucUser/findUserInfoUserId?userId="+userId+"&userType="+userType).success(function(data){
			console.log(data);
			if(data.ret != 200){
				return ;
			}
			if(res.userRole=="tea") {
				if(data.data.userInfo.userFace != ""){
				$scope.personalMsg.userFace = data.data.userInfo.userFace ;
			  }else{
				$scope.personalMsg.userFace = "./img/userPhoto.png";
			  }
			}else{
				if(data.data.stuInfo.userFace !=""){
					$scope.personalMsg.userFace = data.data.stuInfo.userFace;
				}else{
					$scope.personalMsg.userFace = "./img/userPhoto.png";
				}
			}
		});
		$scope.$broadcast('usertype',res.userRole)
		sessionStorage.setItem("type",res.userRole);
	    $scope.showNav = res.userRole == 'tea' ? $scope.showNav =  true: $scope.showNav = false;
	    //获取年级信息
	    $scope.findClassByTeaId();
	    //获取列表
	    $scope.test();
	});
	

	//班级年级切换
	$scope.switchTab = function (tar){
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
	};
	
	//右侧表格吸顶效果
	var tableTop = $('.zy_sharedLibrary_number table').offset().top;
	angular.element(document).on('scroll',function (){
		var docTop = $(document).scrollTop();
		docTop >= tableTop ? $('.zy_sharedLibrary_number table').addClass('active') : $('.zy_sharedLibrary_number table').removeClass('active');
	});
	
	var classId = "";
	
	$scope.test=function(){
	$http.get(requireIp+"activity/activitycenter/findActivityListByCid?userId="+userId+"&classId="+classId).success(function(res){
		if(res.code != 200 || !res.data){
			$scope.zanwu=false;
			$scope.a = 0;
			$scope.b = 0;
			$scope.c = 0;
			$scope.d = 0;
			$scope.e = 0;
			return ;
		}
		$scope.a = res.data.sociologyCount;//社会实践课
		$scope.b = res.data.teamCount;//爱国与团队精神
		$scope.c = res.data.behaviorCount;//学生守则与行为规范
		$scope.d = res.data.artCount;//思想品德与艺术教育
		$scope.e = res.data.otherCount;//其他
		var newData =[];
		angular.forEach(res.data.lists, function(data,i,array){
			//data等价于array[index]
			var newActivity = {};
			switch (data.activityType){
				case 1:
					newActivity.type = "社会实践课";
					newActivity.class = "zy_education";
					break;
				case 2:
					newActivity.type = "爱国与团队精神";
					newActivity.class = "zy_habit";
					break;
				case 3:
					newActivity.type = "学生守则与行为规范";
					newActivity.class = "zy_law";
					break;
				case 4:
					newActivity.type = "思想品德与艺术教育";
					newActivity.class = "zy_character";
					break;
				default:
					newActivity.type = "其他";
					newActivity.class = "zy_other";
					break;
			}
			newActivity.id = data.activityId;
			newActivity.delete = true;
			if(!$.isEmptyObject(data.activityFile) && data.activityFile !="[]"){
				$.each(JSON.parse(data.activityFile), function(i,o) {
					newActivity.src = resourceIp + "resource/" + o.substring(0, o.lastIndexOf("/") -   1);
				});
				// newActivity.src = resourceIp+"resource/"+data.activityFile.substring(0,data.activityFile.lastIndexOf("/")-1);
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			newActivity.cont = data.activityDeman;
			newActivity.title = data.activityName;
			newActivity.time = data.activityStartdate +"~" +data.activityEnddate;
			newData.push(newActivity);
		});
		console.log(newData)
		$scope.myShareList= newData;
		$scope.zanwu=true;
	});
	
	}
	$scope.clazz = [];
	var grade = null;
	var a = null;
	var gradeList =[];
	var classList = [];
	
	$scope.sel=function(aa){
		classId =aa;
		$scope.test();
	}
	
	$scope.classList = function(gradeId){
		 for(var i = 0 ; i< gradeArray.length ;i++){
		 	if(gradeId == gradeArray[i].gradeId){
		 		$scope.className = gradeArray[i].class;
		 	}
		 }
	}
}]);



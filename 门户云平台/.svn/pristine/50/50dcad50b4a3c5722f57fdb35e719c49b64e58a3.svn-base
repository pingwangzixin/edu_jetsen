app.controller('secondNavCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航展示情况
	/*$scope.navShowDet = {
//		title : '谁谁谁的空间',	//最左侧标题
		secondTitle : '导学',	//左侧标题旁边二级标题
		middleAdmin : false,	//中间的 机构、用户、角色管理  （布尔值：是否展示，true展示）
		goBackCloud : true		//右边的 捷成教育云返回 （布尔值：是否展示，true展示）
	};*/
	//导航参数获取
	/*$scope.$on('nav',function (event,data){
		$scope.navShowDet = data;
	});*/

//	$http.get(requireIp + 'jeuc/api/uc/ucUser/'+sessionStorage.getItem('userId')+'/1').success(function(data, status, headers, config){  //status: 响应的状态码 headers: 一个函数  congfig: 请求的配置对象
//
//	}).error(function(){
//		
//	});


	if($location.$$path == '/secondNav'){
		if(sessionStorage.getItem('userType') == 1){	//教师
			if(sessionStorage.getItem('clientId') == '1'){
				$state.go('secondNav.resourceType');	//资源库
			}else if(sessionStorage.getItem('clientId') == '72'){
				$state.go('secondNav.questionBankType');	//题库
			}else if(sessionStorage.getItem('clientId') == '73'){	
				$state.go('secondNav.prepareLessonsList');	//备课
			}else if(sessionStorage.getItem('clientId') == '5'){	
				$state.go('secondNav.classroomList');		//课堂
			}else if(sessionStorage.getItem('clientId') == '4'){
				$state.go('secondNav.taskList');			//任务
			}else if(sessionStorage.getItem('clientId') == '74'){
				$state.go('secondNav.homeworkList');		//作业
			}else if(sessionStorage.getItem('clientId') == '71'){
				$state.go('secondNav.guideList');			//导学
			}else{
				$state.go('wrap.index');						//首页
			}
		}else{											//学生
            if(sessionStorage.getItem('clientId') == '1'){
                $state.go('secondNav.studentMyResource');	//资源库
            }else if(sessionStorage.getItem('clientId') == '5'){
				$state.go('secondNav.studentClassroomList');	//课堂
			}else if(sessionStorage.getItem('clientId') == '4'){
				$state.go('secondNav.studentTaskList');			//任务
			}else if(sessionStorage.getItem('clientId') == '74'){
				$state.go('secondNav.studentHomeworkList');		//作业
			}else if(sessionStorage.getItem('clientId') == '71'){
				$state.go('secondNav.studentGuideList');		//导学
			}else if(sessionStorage.getItem('clientId') == '75'){
				$state.go('secondNav.wrongAnswer');			//错题本
			}else{
				$state.go('wrap.index');							//首页
			}
		}
	}
	
	
//	console.log($location.$$path == '/secondNav/taskList')

	/*$http.get($stateParams.url+"&userId="+$stateParams.id).success(function (data){
		console.log(data)
		window.open($scope.application[index].href+"&userId="+userId,'_blank');
	});*/
	/*console.log(sessionStorage.getItem('userType'))
	if(sessionStorage.getItem('userType') == 1){
		$state.go('secondNav.guideList');
	}else{
		$state.go('secondNav.studentGuideList');
	}*/

}]);
 
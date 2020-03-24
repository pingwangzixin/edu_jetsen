app.controller('personalSpaceVisitorCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//获取所访问的用户id
	var homePageId = $location.$$search.id;
	console.log(homePageId);
	
	//导航显示
	$scope.$emit('nav',false);
	
	//
	$scope.person = {
		loginUserName:'', // 登录用户的名字
		dataState : true, //有无数据显示
		role:true //学生教师角色显示
	}
	console.log(sessionStorage.getItem("userId") == null || sessionStorage.getItem("userId") == undefined)
	
	function info($text,$state){
		$scope.homePage.layerText = $text;
		$scope.homePage.issuesuccess = $state;
		$scope.homePage.hintState = true;
		$timeout(function(){
			$scope.homePage.hintState = false;
		},1500);
	}
	//点赞、取消赞
	$scope.laudClick = function (i,commentId){
		if(sessionStorage.getItem("userId") == null || sessionStorage.getItem("userId") == undefined){
			$state.go('login');
		}else{
			if($scope.listdata[i].whetherDianZan == false){
				$scope.listdata[i].dianZanCount = $scope.listdata[i].dianZanCount + 1;
				$scope.listdata[i].whetherDianZan = true;
				//点赞提交
				$http.post(mySpaceIP + 'comment/dianZan',{commentId:commentId,userName:$scope.person.loginUserName,userId:sessionStorage.getItem("userId")}).success(function (data){
					console.log(data);
					if(data.ret != 200){
						info('点赞失败',false);
					}
			    })
//				info('点赞成功',true);
			}else{
				if($scope.listdata[i].dianZanCount == 0)$scope.listdata[i].dianZanCount = 0;
				$scope.listdata[i].dianZanCount = $scope.listdata[i].dianZanCount - 1;
				$scope.listdata[i].whetherDianZan = false;
				//取消点赞
				$http.post(mySpaceIP + 'comment/dianZanUpDate',{commentId:commentId,userId:sessionStorage.getItem("userId")}).success(function (data){
					console.log(data);
			    })
			}
		}
	};
	
//	获取说说动态
	$http.get(mySpaceIP + 'comment/findListTree',{params:{relatedArticleId:$location.search().id,sortType:'1',pageNumber:'1',showNumber:'10',loginUserId:sessionStorage.getItem("userId")}}).success(function (data){
    	console.log(data);
    	console.log(data.ret);
    	console.log(data.data);
    	console.log(data.data.commentList);
		if(data.ret==200){
			$scope.listdata = data.data.commentList;
		}else{
			$scope.dataState = false;
		}
			
    })
	console.log($location.search().id)
	console.log($location.search().type)
	//	获取当前人的信息
	$http.get(spaceEaIp + '/ea/api/uc/ucUser/'+$location.search().id+'/'+$location.search().type).success(function (data){
		console.log(data);
//  	console.log(data.data.userInfo.userFace);
		if(data.ret==200){
			if($location.search().type == 1){
				$scope.userName = data.data.userInfo.realname;
				console.log(data.data.userInfo.userType )
				$scope.officeName= data.data.userInfo.officeName;
				$scope.userFace = data.data.userInfo.userFace;
			}else if($location.search().type == 2){
				$scope.userName = data.data.stuInfo.realname;
				console.log(data.data.stuInfo.userType )
				$scope.person.role = false;
				$scope.officeName= data.data.stuInfo.officeName;
				$scope.userFace = data.data.stuInfo.userFace;
			}
			
		}
    })
	
//	获取登录人的信息
	$http.get(spaceEaIp + '/ea/api/uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function (data){
    	console.log(data.data);
		if(data.ret==200){
			if(sessionStorage.getItem("userType") == 1 || sessionStorage.getItem("userType") == 4 ){
				$scope.person.loginUserName = data.data.userInfo.realname;
			}else if(sessionStorage.getItem("userType") == 2){
				$scope.person.loginUserName = data.data.stuInfo.realname;
			}else if(sessionStorage.getItem("userType") == 3){
				$scope.person.loginUserName = data.data.parInfo.realname;
			}
		}
    })
}]);


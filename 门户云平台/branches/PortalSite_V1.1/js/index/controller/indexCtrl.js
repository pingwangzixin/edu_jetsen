app.controller('indexCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope','templateServer',function($scope,$state,$timeout,$http,$location,$interval,$rootScope,templateServer) {
	//导航显示
	$scope.$emit('nav',true);
	
	//是否已登录用户
	$scope.loggedIn = false;
	$scope.$emit('loggedIn',$scope.loggedIn);
	
	$scope.userInfo = {
		username : '',
		password : '',
		role : '',
		key : ''
	};
	$scope.userLoggedMsg = {
		showTips : false,
		errorTip : ''
	};
	
	//有用户id
	var userId = sessionStorage.getItem('userId') || '';

	//显示登录后模板
	if(userId){$scope.loggedIn = true;}
	
	//登录
	var regExp = /^([G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})$/;
	$scope.loginT = function (username,password,key){
		console.log(username,password,key)
		$http.get(requireIp + 'jeuc/api/uc/login?username='+username+'&password='+hex_md5(hex_md5(password))+'&key='+key).success(function(data) {
    		if(data.ret==200){
				sessionStorage.setItem('userId',data.data.id);
				sessionStorage.setItem('userType',data.data.userType);
				userId = sessionStorage.getItem('userId') || '';
				console.log($scope.application)
				//未登录前是否点击过应用
				var jumpPath = $location.$$search.jumpPath || '';
				var jump = null;
				if(jumpPath != ''){
					angular.forEach($scope.application,function (v,i){
						if(jumpPath == v.name){
							jump = function (index){
								window.open($scope.application[index].href+"&userId="+userId,'_blank');
							}
							jump(i);
						}
					});
				}
				$state.go('wrap.index',null,{reload:true});
    		}else{
    			$scope.userLoggedMsg.showTips = true;
    			$scope.userLoggedMsg.errorTip = '用户名或密码错误';
    		}
	    }).error(function(){
			$scope.userLoggedMsg.errorTip = '系统错误';
	    });
	}
	//地址栏有用户参数直接登录
	var parameter = '';
	if($location.$$search.username){
//		parameter = $location.$$search.username+"&role="+$location.$$search.role+"&key="+$location.$$search.key
		$scope.loginT($location.$$search.username,$location.$$search.role,$location.$$search.key);
	}
	
	if($location.$$search.qx == '1'){
//		$scope.wranShow('该角色无法进去',true);
		console.log('该角色无法进去')
		$state.go('wrap.index');
	}else if($location.$$search.qx == '2'){
//		$scope.wranShow('权限不足',true);
		console.log('权限不足0')
		$state.go('wrap.index');
	}
//	console.log(requireIp + 'jeuc/api/uc/login?username='+parameter)
	
	//回车登录事件
	$scope.loginEnter = function (e,username,password){
		var keycode = window.event?e.keyCode:e.which;
		if(keycode == 13){
			$scope.loginT(username,password);
		}
	};
	
	//登录后左侧二级导航
	$scope.loggedleftNav = [
		{name : '空间',href : '',icon : 'icon-kongjian',checked : true},
		{name : '班级',href : '',icon : 'icon-banji',checked : false},
		{name : '学校',href : '',icon : 'icon-xuexiao',checked : false},
	];
	
	//新闻列表
	$scope.news;
	$http.post(newsIp + "Teacher/msgcenter/findNewsList.do",{json:"{'cpage':1,'pageSize':10,'type':'0'}"}).success(function(data) {
        $scope.news = data.resultData;
        $scope.news = $scope.news.concat($scope.news);
        console.log($scope.news)
    });
    
  	$scope.tiaozhuannew = function(newss){
  		console.log(newss);
		sessionStorage.setItem('newss',JSON.stringify(newss));
		$state.go("wrap.new.newDetails");
  	}
  	
  	//新闻内容
  	$scope.renderFinish = function(){
	    var ocontent = document.querySelectorAll('.zy_new_content');
    	angular.forEach($scope.news,function (v,i){
      		ocontent [i].innerHTML = v.content;
    	});
    	$timeout(function (){
			var moveBox = $(".zy_new_list");
			var i = 0;
			var timer = null;
			var liHeight = moveBox.children('li').outerHeight(true);
			var liLength = moveBox.children('li').length / 2;
			function toUp(){
				if(parseInt(moveBox.css('margin-top')) > (-liHeight * liLength)){
					i++;
					moveBox.animate({
						marginTop : -liHeight * i + 'px'
					},'slow');
				}else{
					i = 0;
					moveBox.css('margin-top','0px');
				}
			}
			
			timer = setInterval(function (){
				toUp();
			},2000);
			
			moveBox.hover(function (){
				clearInterval(timer);
			},function (){
				clearInterval(timer);
				timer = setInterval(toUp,2000);
			});
		});
	};
  
	//空间展示
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=1").success(function(data) {
       $scope.spaceschool = data.data;
         console.log(data.data);
	});
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=4").success(function(data) {
         $scope.spaceclass = data.data;
         console.log(data.data);
	});
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=2").success(function(data) {
       $scope.spacetea = data.data;
         console.log(data.data);
	});
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=3").success(function(data) {
       $scope.spacestu = data.data;
         console.log(data.data);
	});
	
	//人数统计
	$scope.statistics = {
		total : {num : 0,p:"tot"},
		teacher : {num :0,p:"tea"},
		student : {num :0 ,p:"stu"},
		parent : {num : 0,p:"par"}
	}
	/*$http.get(requireIp + "jeuc/api/sys/userStatistics/findUserAmount?areaId=032f559f367a4d69acd2c675cbba06f0").success(function(data) {
		console.log("人数")
        console.log(data.data);
        $scope.statistics.total.num = data.data.amount;
        $scope.statistics.teacher.num = data.data.teacherAmount;
        $scope.statistics.student.num = data.data.studentAmount;
        $scope.statistics.parent.num = data.data.parentAmount;
        console.log($scope.statistics)
	});*/
	
	/*setTimeout(function (){
		$scope.statistics.total.num = 67;
        $scope.statistics.teacher.num = 8552;
        $scope.statistics.student.num = 300;
        $scope.statistics.parent.num = 1000;
        $scope.$broadcast('a',$scope.statistics);
	},2000);*/
	
	
	//登陆后左侧二级导航切换
	$scope.loggedleftNavTab = function(i){
		angular.forEach($scope.loggedleftNav,function (ele,index){
			ele.checked = false;
		});
		$scope.loggedleftNav[i].checked = true;
	};
	
	//门户管理按钮事件
	$scope.doorAdmin = false;
	$scope.doorAdminShow = function (){
		$scope.doorAdmin = !$scope.doorAdmin;
		$scope.$emit('adminShow',$scope.doorAdmin);
//		$scope.$broadcast('adminShow',$scope.doorAdmin);
		$scope.$on('doorAdminOut',function(event,data){
			$scope.doorAdmin = data;
		});
	};
	
	//应用{params:}
	$http.get(requireIp + 'jeuc/api/uc/ucMenu?parId=19').success(function (res){
		if(res.ret == 200){
			$scope.application = res.data;
//			console.log(res.data)
			if(userId){
				$scope.jump = function (index){
//					console.log($scope.application[index].href)
					sessionStorage.setItem('clientId',$scope.application[index].href.substring($scope.application[index].href.indexOf('clientId=')+9));
//					window.location.href = $scope.application[index].href+"&userId="+userId;
					window.open($scope.application[index].href+"&userId="+userId,'_blank');
//					$state.go('secondNav',{url:$scope.application[index].href,id:userId,name:$scope.application[index].name,index:index});
				}
			}else{
				$scope.jump = function (index){
					window.location.href  = path + '#/login?jumpPath='+$scope.application[index].name;
				}
			}
		}
	}).error(function (){
		
	});

	//空间展示 应用监控
	$scope.state = {
		space : 2,
		watching : 0
	};
	
	//学校空间跳转
	$scope.spacechoolClick = function (i){
		console.log(i)
		localStorage.setItem("officeId", i);
		$state.go('schoolSpace.schoolSpaceIndex');
	}
	//班级空间跳转
	$scope.spaceclassClick = function (i){
		console.log(i)
		localStorage.setItem("classId", i);
		$state.go('classSpace.classSpaceIndex');
	}
	//空间展示切换
	$scope.switchSpace = function (i){
		$scope.state.space = i;
	}
	//应用监控切换
	$scope.switchWatching = function (i){
		$scope.state.watching = i;
	}
	
	$http.post( newsIp+"Teacher/msgcenter/getManage.do").success(function(result) {
		templateServer.serStyleSet = angular.fromJson(result.data.theme);
		$rootScope.$broadcast('changeColor');
		templateServer.serLogoBox = angular.fromJson(result.data.logo);
		templateServer.serColumn = angular.fromJson(result.data.tab);
		templateServer.typesettingChoose = angular.fromJson(result.data.style);
		templateServer.assembly = angular.fromJson(result.data.tool);
		//显示组件
		$scope.pcassembly = templateServer.assembly;
	});
	$scope.$on('assembly',function (){
		$scope.pcassembly = templateServer.assembly;
		console.log($scope.pcassembly);
	});
	
	
	
	
	//进度条
	$scope.speed = {
		active : {progress : 0,color : '#399fdf',sp:0},
		open : {progress : 0,color : '#f97046',sp:0}
	};
	
	$http.get(requireIp + "jeuc/api//sys/userStatistics/findUserActive?areaId=360200").success(function(data) {
		if(data.data.registerAmount==0){
			$scope.speed.active.sp = 0;
			$scope.speed.open.sp = 0;
		}else{
			$scope.speed.active.sp = Math.ceil(data.data.activeAmount/data.data.registerAmount);
        	$scope.speed.open.sp = Math.ceil(data.data.registerAmount/data.data.Amount);
		}
	});
	
	//进度条事件
	console.log($scope.speed.active.progress)
	angular.element(document).bind('scroll',function (){
//		console.log($scope.pcassembly[3].checked)
		if($scope.pcassembly[3].checked == true && $('.zy_progress_chart').length){
			if(($(document).scrollTop() + $(window).height()) >= ($('.zy_progress_chart').offset().top + $('.zy_progress_chart').height() * 2)){
//				console.log($scope.speed.active.progress)
				$interval.cancel(timer);
				var timer = $interval(function (){
					$scope.speed.active.progress >= $scope.speed.active.sp ? $scope.speed.active.progress = $scope.speed.active.sp : $scope.speed.active.progress ++;
					$scope.speed.active.progress >= 80 ? $scope.speed.active.color = '#fff' : $scope.speed.active.color = '#399fdf';
					
					$scope.speed.open.progress >= $scope.speed.open.sp ? $scope.speed.open.progress = $scope.speed.open.sp : $scope.speed.open.progress ++;
					$scope.speed.open.progress >= 80 ? $scope.speed.open.color = '#fff' : $scope.speed.open.color = '#f97046';
					
				},30);
			}
		}
	})

}]);

//新闻无缝滚动
app.directive('seamlessRolling',function ($timeout){
	return {
		restrict : 'E',
		replace : true,
		scope : {
			news : "="		
		},
		template : '<li ng-repeat="newss in news" repeat-finish="renderFinish()"><h4><span ng-bind="newss.title"></span><i class="fr" ng-bind="newss.createTime|timeFilter"></i></h4><div class="zy_new_content"></div></li>',
		link : function (scope,ele,attrs){
			/*console.log(ele)
			$timeout(function (){
				var moveBox = $(ele).parent();
				var html = moveBox.html();
				var i = 0;
				var timer = null;
				var liHeight = moveBox.children('li').outerHeight(true);
				var liLength = moveBox.children('li').length;
				moveBox.html(html + html);
				
				function toUp(){
					if(parseInt(moveBox.css('margin-top')) > (-liHeight * liLength)){
						i++;
						moveBox.animate({
							marginTop : -liHeight * i + 'px'
						},'slow');
					}else{
						i = 0;
						moveBox.css('margin-top','0px');
					}
				}
				
				timer = setInterval(toUp,2000);
				
				moveBox.hover(function (){
					clearInterval(timer);
				},function (){
					clearInterval(timer);
					timer = setInterval(toUp,2000);
				});
			});*/
		}
	}
});

//新闻展示时间过滤器
app.filter('timeFilter',function(){
	return function(obj){
    	return obj.substr(0,10);
	}
});
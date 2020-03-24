app.controller('adminSpaceCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','templateServer',function($scope,$state,$timeout,$http,$location,$q,$rootScope,templateServer) {
    //活跃度
    $scope.activeInfo = [
        {title:"注册学校",
        num:1449,
        word:"所",
        },
        {title:"注册教师",
        num:48618,
        word:"人",
        },
        {title:"注册学生",
        num:62275,
        word:"人",
        },
        {title:"注册家长",
        num:62275,
        word:"人",
        },
    ] 
    //统计分析
    $scope.adminInfo = [
        {
            src:"../img/admin_fenxi.png",
            title:"统考分析",
            dec:"学情报告，精准教学"
        },
        {
            src:"./img/admin_dangan.png",
            title:"学生档案",
            dec:"数字存储，精准检索"
        },
        {
            src:"./img/admin_ziyuan.png",
            title:"资源中心",
            dec:"三级共建，错位分析"
        },
        {
            src:"./img/admin_teacher.png",
            title:"教师发展",
            dec:"信息整合，形成档案"
        },
        {
            src:"./img/admin_kaohe.png",
            title:"办学考核",
            dec:"基础建设，办学评价"
        },
    ]  
    //最近一周
    $scope.weekInfo = [
        {
            src:"./img/admin_work.png",
            num:"61",
            people:"1802"
        },
        {
            src:"./img/admin_beike.png",
            num:"62",
            people:"1222"
        },
        {
            src:"./img/admin_zhihui.png",
            num:"63",
            people:"0"
        },

    ]
    //用户信息
    $scope.userInfo = {
        userName:"",
        userRole:"",
    }

    
    



    var userId = sessionStorage.getItem('userId') || '';
    
	var userType = sessionStorage.getItem('userType') || '';
    if(!userId)$state.go('loginIndex')
		$http.get(requireIp + 'jeuc/api/uc/ucUser/'+userId+'/'+userType).success(function(data) {
            if(data.ret == 200){
                $scope.userInfo.userName = data.data.userInfo.realname
                var str = ""
                data.data.userRole.forEach(item => {
                    str += item.name+"     "
                });
                $scope.userInfo.userRole = str
                $scope.userInfo.loginName =  data.data.userInfo.loginName
 
                console.log(data)
            }
        }).error(function (){
			
        });
        
        $scope.loginOut = function (){
            sessionStorage.clear();
            $state.go('loginIndex')
        };



    	//跳转个人账户
	$scope.myAccount = function (){
		window.location.href = personalPath + 'jeuc-web/#/teacher_index/teacher_center' + '?username=' + $scope.userInfo.loginName;
    };
    //挑战到平台管理
    $scope.toPlat = function (){
        window.open("http://111.207.13.88:8031/#/secondNav/leftTree/leaderInquiryNav/userStatisticsWrap/userStatistics?uId="+userId); 
    };
    //跳转到云监控
    $scope.toMonitor = function (){
        window.open("http://111.207.13.88:8030/bigdata/"); 
    };
}]);
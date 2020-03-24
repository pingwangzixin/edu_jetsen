app.controller('classCardSecondNavCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	
    //变量包
    $scope.variablePacket = {
    	range:$location.$$search.range,//学校还是班主任进入的角色
    	nav:$location.$$search.nav,//导航显示的角色
    	schoolType:0,//学校--类型切换样式
    	classType:0,//班级--类型切换样式
    	classGrade:0,//班级--年级切换样式
    	classClass:0,//班级--班级切换样式
    }
    $scope.schoolTypeData = [
    	{'name':'校训','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classAtmosphere({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'学校简介','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classIntroduce({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'学校活动','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classActivity({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'校园风采','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classDemeanor({'type':'"+$scope.variablePacket.nav+"'})"},
    ]
    $scope.classTypeData = [
    	{'name':'班风','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classAtmosphere({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'班务公示','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classNotice"},
    	{'name':'班主任介绍','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.headmasterIntroduce"},
    	{'name':'班级介绍','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classIntroduce({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'明星学生','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.starStudent"},
    	{'name':'特色活动','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classActivity({'type':'"+$scope.variablePacket.nav+"'})"},
    	{'name':'班级风采','url':"secondNav.leftTree.classCardWrap.classCardSecondNav.classDemeanor({'type':'"+$scope.variablePacket.nav+"'})"},
    ]
     
    $scope.gradeData = [
    	{'name':'一年级'},
    	{'name':'二年级'},
    	{'name':'三年级'},
    	{'name':'四年级'},
    	{'name':'五年级'},
    	{'name':'六年级'},
    	{'name':'初一'},
    	{'name':'初二'},
    	{'name':'初三'},
    	{'name':'高一'},
    	{'name':'高二'},
    	{'name':'高三'},
    ]
    
     $scope.classData = [
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    	{'name':'（1）班'},
    ]
     
    
    
    $scope.schoolType = function(i){
    	$scope.variablePacket.schoolType = i ;
    }
    
    $scope.classType = function(i){
    	$scope.variablePacket.classType = i ;
    }
    
    $scope.gradeTab = function(i){
    	$scope.variablePacket.classGrade = i ;
    }
    
     $scope.classTab = function(i){
    	$scope.variablePacket.classClass = i ;
    }
}]);
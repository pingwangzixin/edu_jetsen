app.controller('indexListCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	data : [   //列表数据
		{id: 1, title: '系统消息',isMsg:1, data: [{id: 1, title: '三年级（2）班期末成绩',time:'2018-04 -28 00:24:46'}, {id: 2, title: '保定市教育和体育局关于2018年秋季申请认的通告',time:'2018-04 -28 00:24:46'}]}
		],
    	curr : 0   //初始化当前状态
    }
    var userId = "";
    
	if($location.search().token){
   		var token = $location.search().token;	
   		
   		$http.get(requireIp + '/jeuc/Api/UserInfo/getUser?clientId=333&clientSecret=846e309f8fc6f6c9975e3d360ef229ff&token=' + token).success(function(res){
   			if(res.ret==1){
				if(res.userRole=="manager"){
					userId = res.managerInfo.managerId
					
					$http.get(requireIp + '/jeuc/api/uc/user/' + userId).success(function(res){
						if(res.ret==200){
							
							var managerSearch = {
								userId: res.data.id,
								scope: res.data.userRole[0].scope,
								provinceId: res.data.provinceId,
								provinceName: res.data.provinceName,
								cityId: res.data.cityId,
								cityName: res.data.cityName,
								countyId: res.data.countyId,
								countyName: res.data.countyName,
								officeId: res.data.officeId,
								officeName: res.data.officeName
							}
							
							managerSearch = JSON.stringify(managerSearch);
							sessionStorage.setItem('managerSearch',managerSearch);
							
						}else{
							console.log("ID获取用户失败")
							sessionStorage.clear();
//	 						window.parent.location.href = backSpace;
						}
	   					
					})	
					
				}else if(res.userRole=="tea"){
					userId = res.teacherInfo.teaId
					
					$http.get(requireIp + '/jeuc/api/uc/user/' + userId).success(function(res){
	   					if(res.ret==200){
	   						if(res.data.userType=="4"){
	   							var managerSearch = {
									userId: res.data.id,
									scope: 4,
									provinceId: res.data.provinceId,
									provinceName: res.data.provinceName,
									cityId: res.data.cityId,
									cityName: res.data.cityName,
									countyId: res.data.countyId,
									countyName: res.data.countyName,
									officeId: res.data.officeId,
									officeName: res.data.officeName
								}
		   						
		   						managerSearch = JSON.stringify(managerSearch);
								sessionStorage.setItem('managerSearch',managerSearch);
	   						}else{
	   							console.log("身份不对")
	   							sessionStorage.clear();
//	 							window.parent.location.href = backSpace;
	   						}
	   						
	   						
						}
					})	
					
				}else{
					console.log("身份不对")
					sessionStorage.clear();
//	 				window.parent.location.href = backSpace;
				}
				
   			}else{
   				console.log("token未获取到用户")
   				sessionStorage.clear();
//	 			window.parent.location.href = backSpace;
   			}
   		})	
   		
   	}else{
   		if(!sessionStorage.getItem('managerSearch')){
   			console.log("没有token和session")
   			sessionStorage.clear();
//	 		window.parent.location.href = backSpace;	
   		}
   	}
	
	//给详情页面传参
	 $scope.indexList = function (listId) {
	 	var listId=listId.id;
//	 	console.log(listId);
        $state.go('secondNav.leftTree.indexListDetails', {id: listId}); 
    };
	
}])

app.controller('schoolPhotoListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//上传背景隐藏
	$rootScope.bgFile = false;
	$scope.ensconce=true;//是否显示编辑按钮 只有校领导可以修改学校风采
	//变量包
	$scope.variable = {
		officeId:sessionStorage.getItem("officeId"),
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : '',			//提示框提示文字
		userId:sessionStorage.getItem("userId"),
		userType:sessionStorage.getItem("userType")
	};
	console.log(sessionStorage.getItem("userType"));
//	//根据登录的用户查询用户信息
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRole, function(response,index) {
				$scope.variable.cuid=response.uid;
				})
		 	}
		 })
		 //学校管理员老师可以修改学校空间
			$scope.edFlig= "";		 
		 if ($scope.variable.userType=="4") {
		 	$scope.edFlig= false;//显示编辑按钮
		 } else{
		 	$scope.edFlig= true;//显示编辑按钮
		 }
	//定时提示框事件 1500ms
	function tipBoxShow(succ,word){		//1、boolean，是否为正确图标，正确传true。2、string，提示文字。
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function (){
			$scope.variable.tipBox = false;
		},1500);
	}
	
	//相册模拟数据
	$scope.albumArr = [];
	var params = "relationId="+$scope.variable.officeId;
	$http.get(jeucIp+"/ea/eaSpacePhoto/photoList?"+params).success(function (data){
		if(data.ret==200){
			var photos = data.data.photos;
			var stuYearList = data.data.stuYear;
			if(photos!=undefined){
				for(var i=0;i<stuYearList.length;i++){
					var stuYearGroup = {};
					var stuYear = stuYearList[i];
					stuYearGroup.stuYear = stuYear+'-'+(parseInt(stuYear)+1)
					var list = []
					angular.forEach(photos,function(photo,index){
						if(photo.year == stuYear){
							var album = {};
							album.id = photo.id;
							album.name = photo.photoName;
							album.src = photo.photoCover;
							album.count = photo.count;
							album.createDate = photo.createDate.substring(0,10);
							list.push(album);
						}
					})
					stuYearGroup.list = list;
					$scope.albumArr.push(stuYearGroup);
					console.log("$scope.albumArr=="+$scope.albumArr);
				}
				
			}
		}
	})
	
	//删除相册事件
	$scope.deleteAlbum = function (index,photoId){
		$scope.variable.deleteBox = true;
		//是否删除弹框确认事件
		$scope.sureDelete = function (){
			var params = "photoId="+photoId;
			console.log(params);
			$http.get(jeucIp+"/ea/eaSpacePhoto/deletePhoto?"+params).success(function (data){
			if(data.ret==200){
				$scope.variable.deleteBox = false;
				tipBoxShow(true,'删除成功');
				$scope.albumArr.splice(index,1);
				window.location.reload();//刷新页面
			}});
		};
	};
	
	
	
}]);

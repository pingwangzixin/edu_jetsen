app.controller('classPhotoListCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//变量包
	$scope.variable = {
		classId:sessionStorage.getItem("classId"),
		cuid:sessionStorage.getItem("cuid"),
		userId:sessionStorage.getItem("userId"),
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : '',			//提示框提示文字
		editFlag : false,
		userType:sessionStorage.getItem("userType"),
	};
	//根据登录的用户查询用户信息
		$scope.$watch('$viewContentLoaded', function() {
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRoleInfo, function(response, index) {
					$scope.roleName=response.roleName;
				})
		 	}
		 })
		})
		if($scope.variable.userType=="1"){
			$scope.variable.editFlag  = false;//不隐藏
		}else{
			$scope.variable.editFlag  = true;//隐藏编辑按钮
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
	$scope.albumArr = 
		[
		// {
		//      "stuYear": "2017-2018",
		//      "list": [
		//          {
		//              "id": "cc3d0a0cf9d548af9d4f6cff5ae54559",
		//              "createBy": "d0228cf73a144f778d6e0b9367b2f310",
		//              "createDate": "2018-03-27 10:06:01.000",
		//              "updateBy": "",
		//              "updateDate": "",
		//              "relationId": "class_b44c65f9047247a98c04fea920d110cf",
		//              "photoCover": "http://localhost:8080/resource/space/photo/2018-03-27/201803271006000484_明星学生_李萌.png",
		//              "photoName": "2017学年班级家长会现场",
		//              "photoDesc": "<p>2017学年班级家长会现场2017学年班级家长会现场2017学年班级家长会现场2017学年班级家长会现场2017学年班级家长会现场</p>",
		//              "vote": 0,
		//              "year": "2017",
		//              "imageIds": "",
		//              "count": 1,
		//              "photos": ""
		//          }
		//      ]
		//  },
		//  {
		//      "stuYear": "2015-2016",
		//      "list": [
		//          {
		//              "id": "973e3bf596d4416cb6d39b064585a6d9",
		//              "createBy": "d0228cf73a144f778d6e0b9367b2f310",
		//              "createDate": "2016-02-01 13:26:44.000",
		//              "updateBy": "",
		//              "updateDate": "",
		//              "relationId": "class_b44c65f9047247a98c04fea920d110cf",
		//              "photoCover": "http://localhost:8080/resource/space/photo/2016-02-01/201602011326340398_学校介绍.jpg",
		//              "photoName": "运动会02",
		//              "photoDesc": "<p>运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02运动会02</p>",
		//              "vote": 0,
		//              "year": "2015",
		//              "imageIds": "",
		//              "count": 3,
		//              "photos": ""
		//          },
		//          {
		//              "id": "425c925852f84c569e6241bedcf9cb64",
		//              "createBy": "d0228cf73a144f778d6e0b9367b2f310",
		//              "createDate": "2016-02-01 13:26:22.000",
		//              "updateBy": "",
		//              "updateDate": "",
		//              "relationId": "class_b44c65f9047247a98c04fea920d110cf",
		//              "photoCover": "http://localhost:8080/resource/space/photo/2016-02-01/201602011325340703_明星学生_李萌.png",
		//              "photoName": "运动会01",
		//              "photoDesc": "<p>运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01运动会01</p>",
		//              "vote": 0,
		//              "year": "2015",
		//              "imageIds": "",
		//              "count": 4,
		//              "photos": ""
		//          }
		//      ]
		//  }
		];
	var params = "relationId="+$scope.variable.classId;
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

app.controller('newsCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','queryData',function($scope,$state,$timeout,$http,$location,$q,$rootScope,queryData) {
	//变量
	$scope.variablePacket = {
		pageNo: 1,
		pageSize: 10,
		userId: '',
		type:"all",
		messageArray: [],
		noMessage:false
	}
	if(sessionStorage.getItem("userType")==3){
		$scope.variablePacket.userId = sessionStorage.getItem("stuId")==null?$location.search().userId:sessionStorage.getItem("stuId");
	}else{
		$scope.variablePacket.userId = sessionStorage.getItem("userId")==null?$location.search().userId:sessionStorage.getItem("userId");
	}

	
	$scope.$on('stuId', function(event, data) {  
		console.log(data)
		$scope.variablePacket.userId = data;
		$scope.findData();
	}); 
	
	//加载数据,获取消息列表
	$scope.findData = function() {
		//先清空数据
		$scope.variablePacket.messageArray = [];
		var params = {
			userId : $scope.variablePacket.userId,
			type : $scope.variablePacket.type,
			pageNo :$scope.variablePacket.pageNo,
			pageSize : $scope.variablePacket.pageSize
		}
		//查询消息列表
		var promise = queryData.getData(userMessageUrl, params);
		promise.then(function(result){
			console.log(result);
			if(result.ret == 200){
				var data = result.list;
				$scope.totalPageNumber = result.pageInfo.pageCount;
				if(data!=null && data.length>0){
					var messageArray = [];
					var object = {};
					var userIds = '';
					for(var i=0,len=data.length; i<len; i++) {
						userIds += "," + data[i].sendUserId;
						//用户id
						object.sendUserId = data[i].sendUserId;
						//姓名--性别
						if(data[i].sendUserId=='admin'){
							object.name = "管理员";
							object.sex = '男';
						}else{
							object.name = data[i].sendUserName==null?'':data[i].sendUserName;
							object.sex = data[i].sendUserSex;
						}
						//姓氏--消息前两位 教师、学生替换为下发者名称
						if(object.name!=''){
							object.surname = object.name.substring(0,1);
							if(object.name != "管理员"){
								object.message = object.name + data[i].businessName.substring(2);
							}else{
								object.message = data[i].businessName;
							}
						}else{
							object.surname = "无";
							object.message = data[i].businessName;
						}
						//用户头像
						object.userFace = '';
						//日期
						object.date = data[i].createDate;
						object.dateTime = data[i].createTime;
						//模块类型
						object.type = typeIdToName(data[i].businessType);
						//下发了哪些班级
						object.classList = data[i].classList;
						messageArray.push(object);
						//清空
						object = {};
					}
					userIds = userIds.substring(1);
					findUserFace(userIds, messageArray);
				}else{
					$scope.variablePacket.noMessage = true;
				}
			}else{
				console.log("查询失败");
				$scope.variablePacket.noMessage = true;
			}
		});
	}
	
	//补全用户头像
	function findUserFace(userIds, messageArray){
		//查询user信息，获取userFace
		var params = {
			userIds : userIds
		}
		var promise = queryData.postData(findUsers, params);
		promise.then(function(result){
			if(result.ret == 200){
				var data = result.data;
				for(var i=0,len=data.length; i<len; i++) {
					for(var j=0,leng=messageArray.length; j<leng; j++) {
						if(data[i].userFace != null && data[i].userFace != '' && data[i].id == messageArray[j].sendUserId){
							messageArray[j].userFace = spaceEaIp+'/resource/user/face/'+ data[i].userFace;
						}
					}
				}
			}
			$scope.variablePacket.messageArray = messageArray;
			$scope.variablePacket.noMessage = false;
		})
	}
	var isTrue = true;
	//监听页数变换
	$scope.$watch("variablePacket.pageNo", function(newVal, oldVal) {
		$scope.findData();
		isTrue = false;
	})
	if(isTrue){
		$scope.findData();
	}
	//业务类型：11代表资源；2代表教研；3代表作业；4代表评价；5代表课堂记录
	function typeIdToName(id) {
		switch(id) {
			case 1:
			case 11:
				name = "资源";
				break;
			case 2:
				name = "教研";
				break;
			case 3:
				name = "作业";
				break;
			case 4:
				name = "评价";
				break;
			case 5:
				name = "课堂记录";
				break;
			default:
				name = "其它";
		}
		return name;
	}
}]);
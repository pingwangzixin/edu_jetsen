app.controller('activityListCtrl',['$scope','$state','$timeout','$http','$location','$rootScope',function($scope,$state,$timeout,$http,$location,$rootScope) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
	
	$scope.classBut = true;
	$scope.sureIssuedBtn = true;
	if(teaRole.match("校领导")){
		$scope.classBut = false;
	}
	
	//控制日期选择范围
	Date.prototype.Format = function(fmt){ //author: meizz   
		var o = {   
			"M+" : this.getMonth()+1,                 //月份   
			"d+" : this.getDate(),                    //日   
			"h+" : this.getHours(),                   //小时   
			"m+" : this.getMinutes(),                 //分   
			"s+" : this.getSeconds(),                 //秒   
			"q+" : Math.floor((this.getMonth()+3)/3), //季度   
			"S"  : this.getMilliseconds()             //毫秒   
		 };   
		if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;   
	}
	$scope.mindataTime = new Date().Format("yyyy-MM-dd");
	console.log($scope.mindataTime)
	
	
	$http.get(requireIp+"activity/activitycenter/findActivityCenterList?activityCreateid="+teaId+"&activityCreatename="+teaRole).success(function(res){
		console.log(res);
		if(res.code != 200){
			$scope.n_y_data = true;
			return ;
		}
		
		if(res.data == null || res.data =="" || res.data <= 0){
			$scope.n_y_data = true;
			return ;
		}
		$scope.n_y_data = false;
		var newData =[];
		angular.forEach(res.data, function(data,i,array){
			//data等价于array[index]
			var newActivity = {};
			if(data.activityState == 0){
				newActivity.type = "未开始";
				newActivity.class ="zy_not_begin";
				newActivity.issued = true;
				newActivity.update = true;
				newActivity.delete = true;
			}else if(data.activityState == 1){
				newActivity.type = "进行中";
				newActivity.class ="zy_be_underway";
				newActivity.issued = false;
				newActivity.update = false;
				newActivity.delete = false;
			}else {
				newActivity.type = "已结束";
				newActivity.class ="zy_is_over";
				newActivity.issued = false;
				newActivity.update = false;
				newActivity.delete = true;
			}
			newActivity.id = data.activityId;
			var imgSrc = "";
			if(!$.isEmptyObject(data.activityFile)){
				$.each(JSON.parse(data.activityFile), function(i,o) {
					if(i == 0){
						 imgSrc = o.substring(0,o.lastIndexOf("/")-1);
						 return;
					}
				});
				console.log(imgSrc)
				newActivity.src = resourceIp+"resource/"+imgSrc;
				if($.isEmptyObject(imgSrc)){
					newActivity.src = "./img/test1.jpg";
				}
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			newActivity.cont = data.activityDeman;
			newActivity.title = data.activityName;
			newActivity.time = data.activityStartdate +"~" +data.activityEnddate;
 			if(data.activityShared == "1") {
 				newActivity.share = true;
 			newActivity.shareTip = '取消分享';
 			} else {
 				newActivity.share = false;
 				newActivity.shareTip = "分享";
 			}
			newData.push(newActivity);
		});
		console.log(newData)
		$scope.activityList= newData;
	});
	
	// 分享/取消分享
	$scope.clickShare = function(index) {
		var  activityId=  $scope.activityList[index].id;
		console.log(activityId)
		var share = 1;
		if($scope.activityList[index].share) {
			share = 0;
		}
		$http.post(requireIp + "activity/activitycenter/updateActivityShared", {
			activityId: activityId,
			shared: share
		}).success(function(data) {
			console.log(data);
			if(data.code == 200) {
				//成功
				if($scope.activityList[index].share) {
					$scope.activityList[index].share = false;
					$scope.activityList[index].shareTip = '分享';
				} else {
					$scope.activityList[index].share = true;
					$scope.activityList[index].shareTip = '取消分享';
				}
			} else {
				//失败
				console.log("error");
				$scope.activityComment.great = great;
			}
		});
            console.log($scope.ifShare )
	}
	
	//活动删除
	$scope.deleteActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : '',
		removeTar : null,
		id:'',
		flag:null
	};
	//删除按钮
	$scope.deleteBtn = function (tar,activityId,activityType){
		console.log(activityId);
		$scope.deleteActivity.id = activityId;
		if(activityType !='未开始'){
			$scope.deleteActivity.flag = '1';
		}else{
			$scope.deleteActivity.flag = null;
		}
		$scope.deleteActivity.popup = true;
		$scope.deleteActivity.removeTar = angular.element(tar.target).parents('li');
	};
	
	//确认删除
	$scope.deleteSureBtn = function (){
		if($scope.deleteActivity.id == ''){
			return ;
		}
		var url = requireIp+"activity/activitycenter/"+$scope.deleteActivity.id;
		if($scope.deleteActivity.flag != null){
			url+="?flag=1"
		}
		console.log(url)
		$http.delete(url).success(function(res){
			console.log(res);
		});
		$scope.deleteActivity.popup = false;
		
		$scope.deleteActivity.removeTar.remove();
		$scope.deleteActivity.tipWord = '删除成功';
		$scope.deleteActivity.tipSrc = 'succeed';
		$scope.deleteActivity.tip = true;
		$timeout(function (){
			$scope.deleteActivity.tip = false;
		},2000);
		
	};
	
	
	//下发至学生
	$scope.issued = {
		issuedBox : false,
		classList : false,
		selAllBtn : false,
		selAllBtnWord : '全选',
		selClassId : '',
		sureBtn : false,
		leaderBtn : false	//校领导按钮是否被点击
	};
	//选择班级
	$scope.issuedClass = [];
	$scope.userId="";
	$scope.userRole="";

	//保存下发
	$scope.sendParams = {
		"userId":teaId,
		"userRole":teaRole
	};
	
	//校领导活动下发
	$scope.findClassList = function(){
		$scope.issued.selClassId = '';	
		$scope.issued.leaderBtn = true;
		$scope.issued.selAllBtnWord = '全选';
		$scope.issued.selAllBtn = true;
		$scope.issued.sureBtn = false;
		$scope.issued.classList = true;
		//清空班全部下发的选中状态
		angular.forEach($scope.issuedClass,function (e,i){
			e.check = false;
		});
	}
	
	//根据用户id查询班级
	$scope.findIssuedClass = function(activityId){
		$scope.sendParams.activityId = activityId;
		$scope.issuedClass = [];
		$scope.issuedList = [];
		$scope.sendParams.classId = "";
		$scope.issued.issuedBox = true;
		$http.get(requireIp+"activity/activitycenter/findClassByTeaId?userId="+teaId).success(function(data) {
		    if(data.code==200){
		    	$scope.issuedClass=data.data;
		    	console.log($scope.issuedClass)
		    	angular.forEach($scope.issuedClass,function (ele,i){
					if( ! ele.beissued){
						beissuedLen ++;
					}
					if(! ele.beissued && ele.check){
						selectList.push(ele);
					}
				});
		    	console.log(beissuedLen)
		    }
		});
	}
	
	
	//学生列表
	$scope.issuedList = [];
	var selectList = [];
	var beissuedLen = 0;
	//根据班级id查询学生
	$scope.findIssuedList = function(classId){
		$scope.issued.leaderBtn = false;
		$scope.issued.classList = false;
		//清空班全部下发的选中状态
		angular.forEach($scope.issuedClass,function (e,i){
			e.check = false;
		});
		console.log($scope.issuedClass);
		$scope.issuedList = [];
		selectList = [];
		beissuedLen = 0;
		$scope.issued.sureBtn = false;
		$scope.issued.selAllBtn = false;
		$scope.issued.selAllBtnWord = '全选';
		$scope.sendParams.classId = classId;
		$scope.sendParams.className = $("#className").find("option:selected").text();
		if(classId!==null){
			$http.get(requireIp+"activity/activitycenter/findStuInfoByCid?classId="+classId+"&activityId="+$scope.sendParams.activityId).success(function(data) {
			    if(data.code==200){
			    	$scope.issuedList=data.data;
			    	if(data.data.length != 0){
			    		$scope.issued.selAllBtn = true;
			    	}
			    	angular.forEach($scope.issuedList,function (ele,i){
						if( ! ele.beissued){
							beissuedLen ++;
						}
						if(! ele.beissued && ele.check){
							selectList.push(ele);
						}
					});
			    }
			});
		}
	}
	
	//全选
	function selAllEvent(oArr){
		$scope.issued.sureBtn = true;
		selectList = [];
		console.log(oArr)
		if($scope.issued.selAllBtnWord == '全选'){
			$scope.issued.selAllBtnWord = '取消全选';
			angular.forEach(oArr,function (ele,i){
				if( ! ele.beissued){
					ele.check = true;
					selectList.push(ele);
				}
			});
		}else{
			$scope.issued.sureBtn = false;
			$scope.issued.selAllBtnWord = '全选';
			angular.forEach(oArr,function (ele,i){
				ele.check = false;
			});
			selectList = [];
		}
	}
	
	//全选
	var scRoleList = [];
	$scope.selAll = function (){
		scRoleList = [];
		if(teaRole.match("校领导")){
			if($scope.issued.leaderBtn){
				selAllEvent($scope.issuedClass);//校领导
				for(i=0;i<$scope.issuedClass.length;i++){
					var classId = $scope.issuedClass[i].id
					$http.get(requireIp+"activity/activitycenter/findStuInfoByCid?classId="+classId+"&activityId="+$scope.sendParams.activityId).success(function(data) {
					    if(data.code==200){
					    	//判断该班级下学生是否为空
					    	if(data.data.length!=0){
					    		scRoleList.push(data.data);
					    	}
					    }
					});
				}
				console.log(scRoleList)
			}else{
				selAllEvent($scope.issuedList);
			}
		}else{
			selAllEvent($scope.issuedList);//校领导，教师
		}
	};
	
	//多选
	function reverse (e,item){
		$scope.issued.sureBtn = true;
		item.check=!item.check;
		if( ! item.beissued && item.check){
			selectList.push(item);
		}else if( ! item.check){
			for(var i=0;i<selectList.length;i++){
				if(selectList[i] == item){
					selectList.splice(i,1);
					if(selectList.length == 0){
						$scope.issued.sureBtn = false;
					}
				}
			}
		}
		selectList.length == beissuedLen ? $scope.issued.selAllBtnWord = '取消全选' : $scope.issued.selAllBtnWord = '全选';
		console.log(beissuedLen)
		console.log(selectList.length)
	}
	
	//学生多选
	$scope.selIssued = function (e,item){
		reverse(e,item);
	};
	
	//班级多选
	claList = {
		 check:false,
		 beissued:false
	}
	$scope.duoxuanclass = function (e,claList){
		reverse(e,claList);
		scRoleList = [];
		//查询学生
		var classId = claList.id;
		var className = claList.name;
		$http.get(requireIp+"activity/activitycenter/findStuInfoByCid?classId="+classId+"&activityId="+$scope.sendParams.activityId).success(function(data) {
		    if(data.code==200){
		    	//判断该班级下学生是否为空
		    	if(data.data.length!=0){
		    		scRoleList.push(data.data);
		    	}
		    }
		});
		console.log(scRoleList)
	};

	
	//清空
	function empty(){
		selectList = [];
		scRoleList = [];
		$scope.issued.selAllBtn = false;
		$scope.issued.selAllBtnWord = '全选';
		$scope.issued.issuedBox = false;
		$scope.issued.classList = false;
		$scope.issued.selClassId = '';
		$scope.issuedList = [];
		$scope.issuedClass = [];
		/*angular.forEach($scope.issuedList,function (ele,i){
			if( ! ele.beissued){
				ele.check = false;
			}
		});
		angular.forEach($scope.issuedClass,function (ele,i){
			if( ! ele.beissued){
				ele.check = false;
			}
		});*/
	}

	//提示
	function tipsFn(word,src){
		$scope.deleteActivity.tip = true;
		$scope.deleteActivity.tipWord = word;
		$scope.deleteActivity.tipSrc = src;
		$timeout(function (){
	    	$scope.deleteActivity.tip = false;
	    },2000);
	}
	var sendFlag=true;
	
	//任课教师下发
	$scope.sendActivity = function(){
		if(sendFlag){
			sendFlag=false;
			$scope.sendParams.stuList = selectList;
			console.log(angular.toJson($scope.sendParams));
			$http.post(requireIp+"activity/activitycenter/sendActivityCenter",{"json":angular.toJson($scope.sendParams)}).success(function(data) {
			    	sendFlag=true;
			    if(data.code==200){
			    	empty();
			    	tipsFn('下发成功','succeed');
			    	$timeout(function (){
				    	location.reload();
				    },100);
			    }else{
			    	empty();
			    	tipsFn('下发失败','filed');
			    }
			});
		}
	}
	
	//确认下发
	$scope.sureIssuedBtn = function (){
		if(teaRole.match("校领导")){
			if($scope.issued.leaderBtn){
				for(i=0;i<scRoleList.length;i++){
					$scope.sendParams.stuList = scRoleList[i];
					//$scope.sendParams.className = "测试班级";
					console.log($scope.sendParams)
					$http.post(requireIp+"activity/activitycenter/sendActivityCenter",{"json":angular.toJson($scope.sendParams)}).success(function(data) {
					    if(data.code==200){
					    	empty();
					    	tipsFn('下发成功','succeed');
					    	$timeout(function (){
						    	location.reload();
						    },100);
					    }else{
					    	empty();
					    	tipsFn('下发失败','filed');
					    }
					});
				}
			}else{
				$scope.sendActivity();
			}
		}else{
			$scope.sendActivity();
		}
	};
	//取消下发
	$scope.canceIssuedBtn = function (){
		$scope.issued.sureBtn = false;
		empty();
		console.log(selectList)
	};

}]);


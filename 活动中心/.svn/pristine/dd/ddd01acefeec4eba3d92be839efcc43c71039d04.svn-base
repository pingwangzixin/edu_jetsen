app.controller('updateActivityCtrl',['$scope','$state','$timeout','$http','$location', '$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location, $stateParams,$rootScope) {
	$scope.upIsShowImg = false//更新隐藏以上传文件
	$scope.showimg = true;//隐藏点击图片显示框
	console.log($stateParams);
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	$scope.activity = {};
	$scope.imgUrl  = null;
	$http.get(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId).success(function(res){
		console.log(res);
		if(res.code == 200){
			$scope.activity = res.data.activityCenter;
			 if(res.data.activityCenter){
			 	$.each(JSON.parse(res.data.activityCenter.activityFile),function(i,data){
			 		  $scope.imgDatas.imgNames.push( data.substring(data.lastIndexOf("/")+1) );
			 		  $scope.imgDatas.imgUrls.push(data);
			 	})
			  	if(res.data.activityCenter.activityFile != "[]"){
				    $scope.upIsShowImg = true;//更新成功显示已上传文件
				}
			} 
		}
		console.log($scope.activity);
	});
	//活动类型
	$scope.selectType = $scope.activity.activityType;
	$scope.activityType = [
		{id : 1, name : '生命教育'},	
		{id : 2, name : '习惯养成'},	
		{id : 3, name : '法律法规'},	
		{id : 4, name : '思想品德'},	
		{id : 5,name : '其它'}
	];
	//活动类型切换
	$scope.changeType = function (i){
		$scope.activity.activityType =$scope.activityType[i].id;
	};
		//限制活动时间
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
//	//活动结束时间
//	$scope.activityOverTime = '';
	
	
	//提交活动
	$scope.submitActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : ''
	};
	//提交按钮
	$scope.subBtn = function (){
		$scope.submitActivity.popup = true;
	};
	
	 //验证255字符
	$scope.checkText = function () {
        if ($scope.activity.activityDeman.length > 255) {
	 		$scope.submitActivity.tipWord = '活动要求仅可输入255字符';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
	 		$scope.activity.activityDeman = $scope.activity.activityDeman.substr(0, 255);
        }
    };
	
	//确定按钮
	$scope.subSureBtn = function (){
		var params =  {};
		if($.isEmptyObject($scope.imgUrl)){
			params ={
				activityId:$scope.activity.activityId,
				activityName:$scope.activity.activityName,
				activityEnddate:$scope.activity.activityEnddate,
				activityType:$scope.activity.activityType,
				activityDeman:$scope.activity.activityDeman,
				activityFile:angular.toJson($scope.imgDatas.imgUrls)}
		}else{
			params ={
				activityId:$scope.activity.activityId,
				activityName:$scope.activity.activityName,
				activityEnddate:$scope.activity.activityEnddate,
				activityType:$scope.activity.activityType,
				activityDeman:$scope.activity.activityDeman,
				activityFile:angular.toJson($scope.imgDatas.imgUrls)}
		}
		console.log(params);
		$scope.submitActivity.popup = false;
		//提交验证
		if($scope.activity.activityName==null||$scope.activity.activityName==""){
			$scope.submitActivity.tipWord = '请补全活动名';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activity.activityEnddate==null||$scope.activity.activityEnddate==""){
			$scope.submitActivity.tipWord = '请选择活动日期';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activity.activityDeman==null||$scope.activity.activityDeman==""){
			$scope.submitActivity.tipWord = '请补全活动要求';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else{
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/addActivityCenter",    
		           data:params
		           ,
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			 }).success(function (data){
			 	console(data);
			 });
			$timeout(function (){
				 $state.go('wrap.list.activityList');
			},2000);
			$scope.submitActivity.tipWord = '提交成功';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},2000);
		}
	};
	
	$scope.imgDatas ={
		imgUrls:[],
		imgNames:[]
	}
	//图片上传
    $scope.upload = function (e) {
    		console.log($scope.imgDatas.imgNames)
    	if($scope.imgDatas.imgUrls.length ==5){
    		$scope.submitActivity.tipWord = '最多可上传五张图片';
    		$timeout(function(){
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			}, 0);
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1500);
	 		return;
		}
        var fd = new FormData();
        var file = $('#file')[0].files[0];
        fd.append("filename", file);
        if($.isEmptyObject(file)){
        	return;
        };
        console.log(fd);
            for(var j = 0; j< $scope.imgDatas.imgNames.length ; j++){
        	console.log($scope.imgDatas.imgNames[j]);
			if(file.name == $scope.imgDatas.imgNames[j]){
	        	$scope.submitActivity.tipWord="该附件已在列，不可重复上传";
		 		$timeout(function(){
		 			$scope.submitActivity.tipSrc = 'succeed';
	 				$scope.submitActivity.tip=true;
	 			}, 0);
		 		$timeout(function(){
		 			$scope.submitActivity.tip=false;
		 		}, 1500);
		 		$('#file').val('');
	 			return;
        	}
        }
        fd.append("id", teaId);
        $http({
        	method:'POST',
            url: requireIp+"activity/activitycenter/uploadImage",
            data: fd,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
            }).success( function ( data ){
                console.log(data)
                if(data.message == "文件名不符合要求,操作失败!"){
                	$scope.submitActivity.tipWord = '文件名不符合要求';
					$scope.submitActivity.tipSrc = 'succeed';
					$scope.submitActivity.tip = true;
					$timeout(function (){
						$scope.submitActivity.tip = false;
					},2000);
                }else if(data.code == 200){
                	$scope.imgDatas.imgUrls.push(data.data.imgUrl);
                    $scope.imgDatas.imgNames.push(file.name);
            	console.log("$scope.imgDatas.imgUrls="+angular.toJson($scope.imgDatas.imgUrls));
            	console.log("$scope.imgDatas.imgNames="+angular.toJson($scope.imgDatas.imgNames));
                   $scope.imgUrl = data.data.imgUrl; 
                   $scope.updateimgName = file.name;
                   $scope.upIsShowImg = true;//更新成功显示已上传文件
                   $('#file').val('');
                }else{
                    
                }
           }).error(function(e){
           		console.log(e)
           })
        }
		$scope.delImgData = function(index) {
		console.log($scope.imgDatas.imgUrls);
		$scope.imgDatas.imgUrls.splice(index, 1);
		$scope.imgDatas.imgNames.splice(index, 1);
		if($scope.imgDatas.imgNames.length <= 0){
        	$scope.upIsShowImg = false;//不显示‘已上传文件’
        }
		$("#file").val("");
	}
		
		$scope.preview = function(index) {
		var imgUrls = $scope.imgDatas.imgUrls[index]
		console.log(imgUrls)
		var fileName = imgUrls.substring(0, imgUrls.lastIndexOf("/") - 1)
		$http({
			method: "GET",
			url: requireIp + "activity/activitycenter/getType",
			params: {
				fileName: fileName,
			}
		}).success(function(data) {
			console.log(data);
			if(data.type == "image") {
				$("#showplayer").html("");
				$scope.showimg = false;
				var html = "<img style='width:600px;position:static;' src='" + resourceIp + commonFileUrl + fileName + "'/>";
				$("#showplayer").html(html);
			}
		});
	}
}]);


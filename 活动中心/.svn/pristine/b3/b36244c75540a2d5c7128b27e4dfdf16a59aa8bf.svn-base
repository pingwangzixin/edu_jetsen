app.controller('newActivityCtrl',['$scope','$state','$timeout','$http','$location','$rootScope',function($scope,$state,$timeout,$http,$location,$rootScope) {
	
	$scope.imgIsShow=false;//已上传文件隐藏
	$scope.showimg = true; //查看图片弹窗
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
//	var teaRole =user.teaRole.substring(0,user.teaRole.length-1);
	//活动类型
	$scope.selectType = 1;
	$scope.activityType = [
		{id : 1, name : '社会实践课'},	
		{id : 2, name : '爱国与团队精神'},	
		{id : 3, name : '学生守则与行为规范'},	
		{id : 4, name : '思想品德与艺术活动'},	
		{id : 5,name : '其它'}
	];
	//活动类型切换
	$scope.changeType = function (i){
		$scope.selectType =$scope.activityType[i].id;
	};
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
	//活动结束时间
	$scope.activityOverTime = '';

	
	//提交活动
	$scope.submitActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : ''
	};
	$scope.imgUrl = '';
	//提交按钮
	$scope.subBtn = function (){
		console.log($scope.activityOverTime)
		
		$scope.submitActivity.popup = true;
	};
	
	//验证255字符
	$scope.checkText = function () {
         if ($scope.activityDeman.length > 255) {
	 		$scope.myshow=true;
	 		$scope.tctips="活动要求仅可输入255字符"
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		},1500)
	 		$scope.activityDeman = $scope.activityDeman.substr(0, 255);
        }
    };
	
	
	//确定按钮
	$scope.subSureBtn = function (){
		console.log($scope.activityName);
		console.log($scope.selectType);
		//提交验证
		if($scope.activityName==null||$scope.activityName==""){
			$scope.submitActivity.tipWord = '请补全活动名称';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activityOverTime==null||$scope.activityOverTime==""){
			$scope.submitActivity.tipWord = '请选择活动日期';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activityDeman==null||$scope.activityDeman==""){
			$scope.submitActivity.tipWord = '请补全活动要求';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else{
			$("body").showLoading();
			var officeId = sessionStorage.getItem("officeId");
			var areaId =sessionStorage.getItem("areaId");
			var cityId =sessionStorage.getItem("cityId");
			var activityArea = officeId +"/"+areaId+"/"+cityId;
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/addActivityCenter",    
		            data: {activityName:$scope.activityName,activityEnddate:$scope.activityOverTime,
		            	activityType:$scope.selectType,activityDeman:$scope.activityDeman,
		            	activityFile: angular.toJson($scope.imgDatas.imgUrls),activityCreateid:teaId,activityCreatename:teaRole,activityArea:activityArea},
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			}).success(function (data){
			 	if(data.code==200){
					//成功
					console.log("success");
					$scope.submitActivity.popup = false;
					$scope.submitActivity.tipWord = '提交成功';
					$scope.submitActivity.tipSrc = 'succeed';
					$scope.submitActivity.tip = true;
					$timeout(function (){
						$scope.submitActivity.tip = false;
					},2000);
			    }else{
			    	//失败
			    	console.log("error");
			    	$scope.submitActivity.popup = false;
					$scope.submitActivity.tipWord = '提交失败';
					$scope.submitActivity.tipSrc = 'error';
					$scope.submitActivity.tip = true;
					$timeout(function (){
						$scope.submitActivity.tip = false;
					},2000);
			    }
			    $("body").hideLoading();
			});
			$timeout(function (){
				$state.go('wrap.list.activityList',{token : $rootScope.token});
			},800);
		}
	};
	
	
	//base64转换图片
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
//  function convertBase64UrlToBlob(dataURI){
//      var byteString;
//      if (dataURI.split(',')[0].indexOf('base64') >= 0)
//          byteString = atob(dataURI.split(',')[1]);
//      else
//          byteString = unescape(dataURI.split(',')[1]);
//      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//      var ia = new Uint8Array(byteString.length);
//      for (var i = 0; i < byteString.length; i++) {
//          ia[i] = byteString.charCodeAt(i);
//      }
//      return new Blob([ia], {
//          type: mimeString
//      });
//  }
	
	$scope.imgDatas ={
		imgUrls:[],
		imgNames:[]
	}
	//图片上传
    $scope.upload = function (e) {
        var fd = new FormData();
        var file = $('#file')[0].files[0];
        fd.append("filename", file);
        if($.isEmptyObject(file)){
        	return;
        };
        if($scope.imgDatas.imgUrls.length ==5){
        	$scope.tctips="最多可上传五张图片";
    		$timeout(function(){
	 			$scope.myshow=true;
	 		}, 0);
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		}, 1500);
	 		return;
		}
        fd.append("id", "tea_470_13110");
        $scope.fileName = file.name;
        console.log(file.name);
        for(var j = 0; j< $scope.imgDatas.imgNames.length ; j++){
        	console.log($scope.imgDatas.imgNames[j]);
			if(file.name == $scope.imgDatas.imgNames[j]){
	        	$scope.tctips="该附件已在列，不可重复上传";
		 		$timeout(function(){
	 				$scope.myshow=true;
	 			}, 0);
		 		$timeout(function(){
		 			$scope.myshow=false;
		 		}, 1500);
		 		$('#file').val('');
	 			return;
        	}
        }
         $("body").showLoading();
        $http({     
           method:'POST',
           url:requireIp+"activity/activitycenter/uploadImage",
           data: fd,
           headers: {'Content-Type':undefined},
           transformRequest: angular.identity 
           }).success( function ( data ){
                console.log(data)
                if(data.message == "文件名不符合要求,操作失败!"){
                	$scope.submitActivity.tipWord = '文件不符合要求';
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
                    $scope.imgName = file.name;
                    $scope.imgIsShow=true//上传成功显示已上传文件
                    $('#file').val('');
                }else{
                    
                }
        	    $("body").hideLoading();
           }).error(function(e){
           		console.log(e)
           		$("body").hideLoading();
           })
        }
	$scope.delImgData = function(index){
		console.log($scope.imgDatas.imgUrls);
		$scope.imgDatas.imgUrls.splice(index, 1);
        $scope.imgDatas.imgNames.splice(index, 1);
        if($scope.imgDatas.imgNames.length <= 0){
        	$scope.imgIsShow=false;//不显示‘已上传文件’
        }
        $("#file").val("");
	}
	
	//未保存前的图片预览
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


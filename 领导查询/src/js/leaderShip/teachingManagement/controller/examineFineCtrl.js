app.controller('examineFineCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state,$stateParams,$timeout,$http,$location,$interval) {
	var pid = "070a33c388f24f23b05d15adc0b8fd2e";
	var token = "29B5DF07F7FC514807CE5FBC12EA1506";
	$scope.createType = "11";
	$scope.resourceType = "";
	$scope.mr4 = "";
	$scope.state = "";
	$scope.sortType = "0";//排序
	$scope.pageNo = 1;
	$scope.pageSize = 10;
	$scope.userTypeList = [
		{id:"11",name:"教师"},
		{id:"12",name:"学生"},
		{id:"13",name:"家长"}
	]
	
	//变量包
    $scope.variablePacket = {
	    	formatIndex:0,    //格式切换默认索引
	    	sortIndex:0,      //排序切换默认索引
	    	//格式切换的数据
		format: [ ],
		resouceId:$stateParams.resouceId,
		sort: [   //排序切换的数据
				{name: "上传时间"},
				{name: "浏览数"},
				{name: "下载数"}
			]	
    };
    var resouceId = $scope.variablePacket.resouceId;
    $scope.resourceContent = { //资源文件列表信息
	    all: [
    			{
				id: 1,
				type: "ppt", //文件类型
				name: "五年级语文期末试卷", //文件名称
				uploader: "张三", //上传者
				site:'保定市第一小学', // 位置
				time: "2017-05-12", //上传时间
				browse: 35, //浏览数
				download: 34, //下载数
				src: "img/resources_ppt.png", //文件类型图标
				fine:false
			}
    		]
    };
	$scope.changeUserType = function(){
		var chengeitem = $scope.selectedItem;
		$scope.createType = chengeitem;
	}
	// 格式切换
	$scope.formatTab = function(index,resourceType){
		$scope.variablePacket.formatIndex = index;
		$scope.resourceType = resourceType;
		$scope.findResourceList();
	}
	// 排序切换
	$scope.sortTab = function(index){
		$scope.variablePacket.sortIndex = index;
		if(index==0){
			$scope.sortType = "0";
		}
		if(index==1){
			$scope.sortType = "1";
		}
		if(index==2){
			$scope.sortType = "3";
		}
		$scope.findResourceList();
	}
	//返回资源管理列表参数
	if($stateParams.resources != null && $stateParams.format != null && $stateParams.sort != null) { 
		$scope.variablePacket.resourcesIndex = $stateParams.resources;
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//返回审核精品列表参数
	if($stateParams.format != null&&$stateParams.sort != null) { 
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//点击通过
	$scope.adopt = function (index,type,resouceId,title){
		$scope.promptShow('已通过',true,title);
		$scope.delOk = function (){
			$http.get(resourcesIp+"/edu-resource/a/resource/mrs_rmi/updateLikeStatus?&likeStatus=3&token="+token+"&rid="+resouceId).success(function(response){
				if(response.ret==200 && response.result == 200){
					$scope.resourceContent[type].splice(index,1);
					$scope.variablePacket.prompt = false;
					$scope.wranShow('已通过',true,title);
				}else{
					$scope.variablePacket.prompt = false;
					$scope.wranShow('通过失败',true,title);
				}
			})
		};
	};
	//点击打回
	$scope.repulse = function (index,type,resouceId,title){
		$scope.promptShow('已通过',true,title);
		$scope.delOk = function (){
			$http.get(resourcesIp+"/edu-resource/a/resource/mrs_rmi/updateLikeStatus?&likeStatus=2&token="+token+"&rid="+resouceId).success(function(response){
				if(response.ret == 200 && response.result == 200){
					$scope.resourceContent[type].splice(index,1);
					$scope.variablePacket.prompt = false;
					$scope.wranShow('打回成功',true,title);
				}else{
					$scope.variablePacket.prompt = false;
					$scope.wranShow('打回失败',true,title);
				}
			})
		};
	};
	
	$http.get(resourcesIp+"/edu-resource/a/resource/mrs_rmi/getTypesByPid?pid="+pid+"&token="+token).success(
		function(response){
			if(response.ret==200){
				var result = response.result;
				var resouceTypeList = [];
				resouceTypeList.push({resourceType:"all",name:"全部"})
				angular.forEach(result,function(obj,index){
					var resultTypeObj = {};
					resultTypeObj.resourceType = obj.id;
					resultTypeObj.name = obj.name;
					resouceTypeList.push(resultTypeObj);
				});
				$scope.variablePacket.format = resouceTypeList;
			}
		}
	);

	$scope.findResourceList = function(){
		var baseUrl = "/edu-resource/a/resource/mrs_rmi/getResources?token="+token+"&mr4=1&pageNo="+$scope.pageNo+"&pageSize="+$scope.pageSize;
		var queryUrl = ""
		if($scope.createType!=""){
			queryUrl += queryUrl+"&createType="+$scope.createType;
		}
		if($scope.resourceType!=""){
			queryUrl += queryUrl+"&objId="+$scope.resourceType;
		}
		if($scope.state!=""){
			queryUrl += queryUrl+"&state="+$scope.state;
		}
		if($scope.sortType!=""){
			queryUrl += queryUrl+"&type="+$scope.sortType+"&order=1";
		}
		$http.get(resourcesIp+baseUrl+queryUrl).success(function(response){
			if(response.ret==200){
				var list = response.result.list;
				$scope.contentpageConfig.totalItems=response.result.count;
				var resourceContentAll = []
				angular.forEach(list,function(obj,index){
					var resouceObj = {};
					resouceObj.id = obj.id;
					resouceObj.type = $scope.getResoucePicName(obj.mr2);
					resouceObj.name = obj.title;
					resouceObj.uploader = obj.createUser;
					var arrayNames = obj.areaNames.split("//");
					resouceObj.site = arrayNames[arrayNames.length-2];
					resouceObj.time = obj.createDate;
					resouceObj.browse = obj.statistic.browse;
					resouceObj.download = obj.statistic.download;
					resouceObj.src = $scope.getResouceImage(obj.mr2);//文件类型图标
					resouceObj.fine =obj.mr4=="3"?true:false;
					resourceContentAll.push(resouceObj);
				})
				$scope.resourceContent.all = resourceContentAll;
			}
		})
	}
	//下载
	down_status = 0;
	$scope.downloadFile = function(resId,filename){
		var userId = sessionStorage.getItem("userId");
		url = resourcesIp + "/edu-resource/a/resource/mrs_rmi/downloadZip?token="+token;
		if(down_status == 1) {
			return false;
		}
		down_status = 1;
		setTimeout(function() {
			down_status = 0;
		}, 1000);
		var newName = filename+"_"+new Date();
		window.open(url + "&id=" + resId + "&fileName=" + newName);
	}
	$scope.getResouceImage = function(extension){
		var type = "";
		switch(extension){
			case "mp3" :
				type = "img/resources_mp4.png";
				break;
			case "mp4" :
				type = "img/resources_mp4.png";
				break;
			case "png" :
				type = "img/resources_pic.png";
				break;
			case "jpg" :
				type = "img/resources_pic.png";
				break;
			case "pdf" :
				type = "img/resources_pdf.png";
				break;
			case "ppt" :
				type = "img/resources_ppt.png";
				break;
			case "pptx" :
				type = "img/resources_ppt.png";
				break;
			case "doc" :
				type = "img/resources_word.png";
				break;
			case "docx":
				type = "img/resources_word.png";
				break;
			case "xls" :
				type = "img/resources_excal.png";
				break;
			case "xlsx":
				type = "img/resources_excal.png";
				break;
			default:
				type = "img/resources_word.png";
		}
		return type;
	}
	
	$scope.getResoucePicName = function(extension){
		var type = "";
		switch(extension){
			case "mp3" :
				type = "audio";
				break;
			case "mp4" :
				type = "video";
				break;
			case "png" :
				type = "picture";
				break;
			case "pdf" :
				type = "pdf";
				break;
			case "ppt" :
				type = "ppt";
				break;
			case "pptx" :
				type = "ppt";
				break;
			case "doc" :
				type = "word";
				break;
			case "docx":
				type = "word";
				break;
			case "xls" :
				type = "xls";
				break;
			case "xlsx":
				type = "xls";
				break;
			default:
				type = "word";
		}
		return type;
	}
	
	
	//页面加载执行查询全部
	$scope.findResourceList();
	// 分页组件
	$scope.contentpageConfig = {
		currentPage: 1,
		pagesLength:10,
		totalItems: 10,
		itemsPerPage: 10,
		perPageOptions: [5],
		onChange: function() {
			$scope.pageNo = $scope.contentpageConfig.currentPage;
			$scope.findResourceList();
			$scope.contentpageConfig.totalItems=$scope.resources.count;
		}
	}
}]);

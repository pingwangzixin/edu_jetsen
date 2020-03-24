app.controller('resourceManageResourcesDetailsCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$location','$rootScope', '$interval', 'templateServer', function($scope, $state, $stateParams, $timeout, $http, $location,$rootScope, $interval, templateServer) {
//	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = sessionStorage.getItem('scope');
	var token = "29B5DF07F7FC514807CE5FBC12EA1506";
	$scope.showTip = {
		"sh": true,
		"fullscreenShow": false
	}
	$scope.imageFlag = false;
	// 变量包
	$scope.variablePacket = {                                     
		fine: angular.fromJson($stateParams.fine), //校精品 
		page: $stateParams.page, //主路由  
		resourcesIndex: $stateParams.resources, //返回资源选中状态
		formatIndex:$stateParams.format, //返回时格式选中状态
		sortIndex:$stateParams.sort, //返回时排序选中状态
		isDisplay:true,  //通过和打回是否显示  true隐藏  false显示
		resouceId:$stateParams.resouceId,
		imgFlag:false,
		amputate:false, //删除不显示
		imgList:[],//图片显示集合
	};
	var resouceId = $scope.variablePacket.resouceId;
	if(scope==4){
    		$scope.variablePacket.isCityLevel = false;
    }else{
    		$scope.variablePacket.isCityLevel = true;
    }
	// 返回
	$scope.back = function() {
		$state.go($scope.variablePacket.page, {
			resources: $scope.variablePacket.resourcesIndex,
			format: $scope.variablePacket.formatIndex,
			sort:$scope.variablePacket.sortIndex
		})
	};
	$scope.goBack = function() {
		$state.go($scope.variablePacket.page, {
			format: $scope.variablePacket.formatIndex,
			sort:$scope.variablePacket.sortIndex
		})
	};
	// 点击通过 显示校精品
	$scope.adopt = function(index){
    		$scope.variablePacket.fine= true;
    		$scope.variablePacket.isDisplay = false;
    		$scope.variablePacket.amputate =true;
	}
	//删除数据跳转到列表页面
	$scope.deleDate1 = function (index,rid){
		$http.get(resourcesIp+"/edu-resource/a/resource/mrs_rmi/delete?token="+token+"&rid="+rid).success(function(response){
			if(response.ret==200){
				$state.go('secondNav.leftTree.resourceManage.resourceManageList');
			}else{
				alert("删除失败");
			}
		})
	};
	$scope.delDate2 = function (index,rid){
		$http.get(resourcesIp+"/edu-resource/a/resource/mrs_rmi/delete?token="+token+"&rid="+rid).success(function(response){
			if(response.ret==200){
				$state.go('secondNav.leftTree.resourceManage.examineFine');
			}else{
				alert("删除失败");
			}
		})
	};
	
//  文档--6c14796e7f8d42ee9a05406b35dc1645
//  图片--dc32dec6431e4810b7599210c256cb73
//	音频--0b24c06ef07044cfaf21616f5a1ef889
//  视频--67e51448a2ad4548ab83956453820eea


	$http({  
            method: "POST",  
            url: mdjEducationIp + 'MdjEducation/appRequest',
            contentType:"application/x-www-form-urlencoded",
            data: {
				serviceId: "res_FindByResId",
				param:'{"headers":{"paramters":{"id":"'+$stateParams.resouceId+'"},"ID":"res_FindByResId","ticket":"服务器票据","JSessionID":"0A1C4AB8E1059F70AC455A0B64B73240","date":"0","bodyType":"binary","encryptType":"","action":"post","status":"1:成功;0:失败"},"body":{"content":"通过了"}}'
		} }).success(function(data){
			console.log(data);
			if(data.body.content.resourceInfo.ret == 200){
				var result = data.body.content.resourceInfo.result;
				console.log(result);
				$scope.resouce = {};
				$scope.resouce.id = result.id;
				$scope.resouce.title = result.title;
				$scope.variablePacket.fine = result.mr4=="3"?true:false;
				$scope.resouce.createUser = result.createUser;
				$scope.resouce.areaName = result.areaNames.split("//")[result.areaNames.split("//").length-2];
				$scope.resouce.createDate = result.createDate;
				$scope.resouce.browse = result.statistic.browse;
				$scope.resouce.download = result.statistic.download;
				$scope.resouce.fileImage = $scope.getResouceImage(result.objId);
				console.log("文件类型："+result.objId);
				if(result.objId == 1 || result.objId == 8 || result.objId == 9){
					$(".commMusic").hide();
						 var fls=$scope.flashChecker();  
						 var s="";  
					 if(!fls.f){  
						 $(".loadFlashWrap").show();
					 }else{
						 $(".loadFlashWrap").remove();
						 if(result.mr7 == 1){
						 	$(".play").show();
							 $("#showplayer").css('padding-top','0px');
							 $(".commMusic").hide();
							 var vpath = data.body.content.iosPlay;
							 console.info(vpath);
							 var vpath1 = data.body.content.andrioPlay;
							 console.info(vpath1);
							 playerSTOP=jwplayer('showplayer').setup({
								 flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							        height:398,
							        width: "100%",
							        autostart: true,
							        playlist: [{
							            sources: [{file: vpath},{file: vpath1}]
							        }],
							    	androidhls:"true"
							 });
						 }else if(dataList.result.mr7 == 0){
							 $(".commMusic").hide();
							 $("#showplayer").css('padding-top','200px');
							 $("#showplayer").html("正在转码。。。请转码后观看或者"+"<a href='javascript:void(0)' onclick='down()'>下载</a>"+"后观看");
						 }else if(dataList.result.mr7 == 2){
							 $(".commMusic").hide();
							 $("#showplayer").css('padding-top','200px');
							 $("#showplayer").html("转码失败，请"+"<a href='javascript:void(0)' onclick='down()'>下载</a>"+"后观看");
						 }
					 }
				}else if(result.objId == 2){
					$(".commMusic").hide()
					$(".play").show();
					var fls=$scope.flashChecker();  
					var s="";  
					if(!fls.f){  
						//显示flash提醒
						$(".loadFlashWrap").show();
					}else{
						 //隐藏flash提醒
						$(".loadFlashWrap").remove();
						if(result.mr7==1){
							 $(".commMusic").hide();
							 $("#showplayer").css('padding-top','0px');
							 var vpath = data.body.content.iosPlay;
							 var vpath1= data.body.content.andrioPlay;
							 audioSTOP=jwplayer('showplayer').setup({
								flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
						        height:398,
						        width: "100%",
						        autostart: true,
						        playlist: [{sources: [{file: vpath},{ file: vpath1}]}],
						    		androidhls:"true"
							 });
						}else if(result.mr7 == 0){
							 $("#showplayer").css('padding-top','200px');
							 $(".commMusic").hide();
							 $("#showplayer").html("正在转码。。。请转码后欣赏或者"+"<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>"+"后欣赏");
						}else if(result.mr7 == 2){
							 $("#showplayer").css('padding-top','200px');
							 $(".commMusic").hide();
							 $("#showplayer").html("转码失败，请"+"<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>"+"后观看");
						}
					}
				}else{
					$(".play").hide();
					$(".commMusic").show();
					if(result.mr7 == 1){
						$("#FilePackage").css('padding-top','0px');
						$(".play").hide();
						console.log(data.body.content)
						console.log(data.body.content.imgList.readfileList)
						$scope.variablePacket.imgList = data.body.content.imgList.readfileList;
						console.log($scope.variablePacket.imgList)
					}else if(result.mr7 == 0){
						$("#FilePackage").css('padding-top','200px');
						$(".play").hide()
						$("#FilePackage").html("正在转码。。。请转码后欣赏或者"+"<a href='javascript:void(0)'  onclick='down()'>下载</a>"+"后欣赏");
					}else if(result.mr7 == 2){
						$("#FilePackage").css('padding-top','200px');
						$(".play").hide()
						$("#FilePackage").html("转码失败，请"+"<a href='javascript:void(0)' onclick='down()'>下载</a>"+"后欣赏");
					}
				}
			}
		});

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
			case "1" :
				type = "img/resources_mp4.png";
				break;
			case "2" :
				type = "img/resources_mp4.png";
				break;
			case "3" :
				type = "img/resources_pic.png";
				break;
			case "4" :
				type = "img/resources_pdf.png";
				break;
			case "5" :
				type = "img/resources_ppt.png";
				break;
			case "6" :
				type = "img/resources_word.png";
				break;
			case "7" :
				type = "img/resources_excal.png";
				break;
			case "8" :
				type = "img/resources_mp4.png";
				break;
			case "9":
				type = "img/resources_mp4.png";
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
	
	
	/**
	 * 看是否有flash插件
	 */
	 $scope.flashChecker = function() {  
		 var hasFlash=0;//是否安装了flash
		 var flashVersion=0;//flash版本
	   
		 if(document.all){  
			 var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
			 if(swf) {  
				 hasFlash=1;  
				 VSwf=swf.GetVariable("$version");  
				 flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);  
			 }  
		 }else{  
			 if (navigator.plugins && navigator.plugins.length > 0)  
			 {  
				 var swf=navigator.plugins["Shockwave Flash"];  
				 if (swf){  
					 hasFlash=1;  
					 var words = swf.description.split(" ");  
					 for (var i = 0; i < words.length; ++i) {  
						 if (isNaN(parseInt(words[i]))) continue;  
						 flashVersion = parseInt(words[i]);  
					 }  
				 }  
			 }  
		 }  
		 return {f:hasFlash,v:flashVersion};  
	 }  
}]);

 app.controller('resourcesDetailsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', function($scope, $state, $timeout, $http, $location) {
 	//导航显示
	$scope.$emit('nav',true);
 	
	var userId = sessionStorage.getItem('userId') || '';
	$("#userId").val(userId);
	//收藏弹窗
	$scope.scData= {
		div:false,
		success:false,
		error:false,
		msg:""
	}
	
	$scope.showTanChuang = function(div, success, error, msg){
		$scope.scData.success = success;
		$scope.scData.error = error;
		$scope.scData.msg = msg;
		$scope.scData.div = div;
		$timeout(function(){
			$scope.scData.div = false;
		},1500)
	}
	
	$scope.showTip = {
		"sh": true,
		"fullscreenShow": true
	}
	if(userId) {
		$scope.showTip.sh = false;
	} else {
		$scope.showTip.sh = true;

	}
	
	var resData = JSON.parse(sessionStorage.getItem('res'));
	//添加浏览量
	var visitParamters = {};
	visitParamters.resourceId = resData.id; 
	var visitParams = '{"headers":{"paramters":' + angular.toJson(visitParamters) + ',"ID":"res_saveVisit","ticket":"服务器票据","JSessionID":"9751932D989B3EEDD0047EA7146DEF33","date":"0","bodyType":"binary","encryptType":"","action":"post","status":"1:成功;0:失败"},"body":{"content":"通过了"}}';
	$.ajax({
		url: newsIp + "Teacher/appRequest",
		type: 'post',
		data: {
			"serviceId": "res_saveVisit",
			param: visitParams
		},
		dataType: 'json',
		cache: false,
		async: false,
		success: function(data) {
			console.log("添加浏览量：");
		}
	});
	//查询资源
	$scope.res;
	var url = resourcesIp_bd + "/edu-resource/a/resource/mrs_rmi/getById?token=29B5DF07F7FC514807CE5FBC12EA1506&id=" + resData.id;
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		cache: false,
		async: false,
		success: function(data) {
			$scope.res = data.result;
			
		}
	});
	if($scope.res==400){
		$scope.showTanChuang(true, false, true, "资源不存在");
		return false;
	}
	console.log($scope.res)
	var subjIds = $scope.res.subjIds
	console.log(subjIds);
	var slen = -1;
	var subjIds1 = "";
	if(subjIds!=undefined){
		slen = subjIds.lastIndexOf(",");
		subjIds1 =subjIds.substr(0, slen);
		slen = subjIds.indexOf(",");
		subjIds1 = subjIds.substr(slen+1, subjIds.length);
	}
	$scope.xgresource=[];
	// 资源库资源迁移   日期文件夹下存放资源
	var subName = $scope.res.createDate;
	var subnamePath = "";
	if(subName!=undefined){
		subnamePath = subName.split(' ')[0].replace(/\-/g, "") + "/";
	}
	var queryLen = 0;
	//查询相关资源
	$scope.getResourceList = function(subjectId){
		var paramters = {};
		//分页
		paramters.pageNo = 1;
		paramters.pageSize = 6;
		paramters.subjectID = subjectId;
		var params = '{"headers":{"paramters":' + angular.toJson(paramters) + ',"ID":"res_getResources","ticket":"服务器票据","JSessionID":"9751932D989B3EEDD0047EA7146DEF33","date":"0","bodyType":"binary","encryptType":"","action":"post","status":"1:成功;0:失败"},"body":{"content":"通过了"}}';

		console.log("查询资源列表:params=" + params);
		
		$.ajax({
			url: newsIp + "Teacher/appRequest",
			type: 'post',
			data: {
				"serviceId": "res_getResources",
				param: params
			},
			dataType: 'json',
			cache: false,
			async: false,
			success: function(data) {
				queryLen += 1;
				if(data.headers.status == "1") {
					var res = data.body.content.data;
					console.log(angular.toJson(res));
//					$scope.resourceList = res.list;
					if(res.list.length>=5){
						for(var i=0; i<6; i++){
							if(res.list[i].id!=resData.id){
								$scope.xgresource.push(res.list[i]);
							}
							if($scope.xgresource.length==5){
								break;	
							}
						}
						queryLen = 0;
					}else{
						if(queryLen<9){
							if(subjIds!=undefined){
								slen = subjIds1.lastIndexOf(",");
								if(slen>=0){
									subjIds1 = subjIds1.substr(0, slen);
									$scope.getResourceList(subjIds1);
								}else{
									queryLen = 0;
								}
							}else{
								queryLen = 0;
							}
						}
					}
				}
			}
		})
		
		/*//有参url
		var paramUrl = resourcesIp_bd+ "/edu-resource/a/resource/mrs_rmi/getResources?token=29B5DF07F7FC514807CE5FBC12EA1506&pageNo=1";
		paramUrl +="&pageSize="+pageSize;
		if(subjectId!=null&&subjectId!=""){
			paramUrl += "&subjectID="+subjectId;
		}
		$http.get(paramUrl).success(function(res) {
			console.log(res);
			if(res.ret == 200){
				for(var i=0,length=res.result.list.length; i<length; i++){
					$scope.xgresource.push(res.result.list[i]);
				}
				if(subjIds!=undefined&&$scope.xgresource.length<5){
					slen = subjIds1.lastIndexOf(",");
					subjIds2 = subjIds1.substr(slen+1);
					subjIds1 =subjIds1.substr(0, slen);
					$scope.getResourceList(5-$scope.xgresource.length, subjIds2);
				}
				console.log($scope.xgresource);
			}
		})*/
	}
	$scope.getResourceList(subjIds1);
	
	//回显学科
	var subjNames = $scope.res.subjNames;
	console.log(subjNames);
	$scope.subjectNameList = [];
	if(subjNames!=undefined){
		var obj = subjNames;
		var stopFlag = 0;
		for(var i=0; stopFlag==0; i++){
			var len = obj.indexOf("/");
			if(len!=-1){
				len1 = obj.indexOf("/");
				var	obj1 = obj.substr(0,len);
				obj = obj.substr(len+2);
				if(i == 1){
					$scope.subjectNameList.push(obj1);
				}else if(i > 1){
					$scope.subjectNameList.push(" > "+obj1);
				}
			}else{
				stopFlag=1;
			}
		}
    	console.log(angular.toJson($scope.subjectNameList));
	}
	
	//跳转资源详情页
	$scope.toResourcesDetails = function(res){
		sessionStorage.setItem('res', JSON.stringify(res));
		$state.go("wrap.resources.resourcesDetails", null, {
			reload: true
		});
	}
	
	var str = $scope.res.mr8;
	var strr = "";
	$("#titi").val($scope.res.title);
	$("#tzyresdata").val($scope.res.createDate);
	$("#resId").val($scope.res.id);
	if($scope.res.objId == 3) {
		$(".play").hide()
		$("#resName").val(str);
		var FolderName1 = $("#resName").val();
		str1 = FolderName1.substr(0, FolderName1.indexOf('.'));
		str2 = str1 + ".jpg";
		var FolderName = str2;
		console.info(str2);
	} else {
		$("#resName").val(str);
		strr = str.substr(0, str.indexOf('.'));
		html = "<input type='hidden' value='" + strr + "' id='resCode'>";
		$(".commSourDetailWrap").append(html);
		var FolderName = $("#resCode").val();
	}
	// 资源库资源迁移   日期文件夹下存放资源
	var subName = $scope.res.createDate;
	var subnamePath = subName.split(' ')[0].replace(/\-/g, "") + "/";

	var res_path_vm = "resource";
	var res_path_view_folder = "Preview";
	var res_down_folder = "Resource";
	var res_player_path = "rtmp://39.105.18.180:1935";
	var res_player_path1 = "http://39.105.18.180:1935";
	var res_player_floder = "vod5/_definst_";
	var res_player_mp4 = "mp4:";
	var res_player_mp3 = "mp3:";
	var server_ip = "http://39.105.18.180:";
	var server_port = "9004/";

	var pathmp4 = res_player_path + "/" + res_player_floder + "/" + res_player_mp4;
	var pathmp41 = res_player_path1 + "/" + res_player_floder + "/" + res_player_mp4;
	var pathmp3 = res_player_path + "/" + res_player_floder + "/" + res_player_mp3;
	var pathmp31 = "http://" + server_ip + server_port + "/" + res_path_vm + "/" + res_path_view_folder + "/";
	var moveFileState = "";

	//播放
	if($scope.res.objId == 1 || $scope.res.objId == 8 || $scope.res.objId == 9) {
		$scope.showTip.fullscreenShow = false;
		$(".zy_resources_detail_cont").hide();
		$("#showplayer").css('padding-top', '0px');
		var fls = flashChecker();
		console.log(fls)
		var s = "";
		if(!fls.f) {
			//显示flash提醒
			$(".loadFlashWrap").show();
		} else {
			//隐藏flash提醒
			$(".loadFlashWrap").remove();
			if($scope.res.mr7 == 1) {
				$(".zy_resources_detail_cont").hide();
				if($("#mr16").val() == 1) {
					if($("#moveFileState").val() == 'before') {
						var vpath = pathmp4 + subnamePath+strr + "_360.mp4";
						console.info(vpath);
						var vpath1 = pathmp41 +subnamePath+ strr + "_360.mp4/playlist.m3u8";
						console.info(vpath1);
					} else {
						var vpath = pathmp4 + subnamePath + strr + "_360.mp4";
						console.info(vpath);
						var vpath1 = pathmp41 + subnamePath + strr + "_360.mp4/playlist.m3u8";
						console.info(vpath1);
					}
				} else {
					var vpath = pathmp4 +subnamePath+ strr + "_360.mp4";
					console.info(vpath);
					var vpath1 = pathmp41 +subnamePath+ strr + "_360.mp4/playlist.m3u8";
					console.info(vpath1);
				}

				playerSTOP = jwplayer('showplayer').setup({
					flashplayer: "common/jwplayer11/jwplayer.flash.swf",
					//file: vpath,
					height: 398,
					width: "100%",
					autostart: true,
					playlist: [{
						sources: [{
							file: vpath
						}, {
							file: vpath1
						}]
					}],
					androidhls: "true"
				});
			} else if($scope.res.mr7 == 0) {
				$("#showplayer").css('padding-top', '200px');
				$(".zy_resources_detail_cont").hide();
				$("#showplayer").html("正在转码。。。请转码后观看或者" + "<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>" + "后观看");
			} else if($scope.res.mr7 == 2) {
				$("#showplayer").css('padding-top', '200px');
				$(".zy_resources_detail_cont").hide();
				$("#showplayer").html("转码失败，请" + "<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>" + "后观看");
			}
		}
	} else if($scope.res.objId == 2) {
		$scope.showTip.fullscreenShow = false;
		$(".zy_resources_detail_cont").hide()
		var fls = flashChecker();
		var s = "";
		if(!fls.f) {
			//显示flash提醒
			$(".loadFlashWrap").show();
		} else {
			//隐藏flash提醒
			$(".loadFlashWrap").remove();
			if($scope.res.mr7 == 1) {
				$("#showplayer").css('padding-top', '0px');
				$(".zy_resources_detail_cont").hide();
				if($("#mr16").val() == 1) {
					if($("#moveFileState").val() == 'before') {
						var vpath = $("#pathmp3").val() +subnamePath+ str;
						if(/(Android)/i.test(navigator.userAgent)) {
							var vpath1 = pathmp31 +subnamePath+ str;
						} else {
							var vpath1 = pathmp31 +subnamePath+ str + "/playlist.m3u8";
						}
					} else {
						var vpath = pathmp3 +subnamePath+ str;
						console.info(vpath);
						if(/(Android)/i.test(navigator.userAgent)) {
							var vpath1 = pathmp31 + subnamePath + str;
						} else {
							var vpath1 = pathmp31 + subnamePath + str + "/playlist.m3u8";
						}
						console.info(vpath1);
					}
				} else {
					var vpath = pathmp3 +subnamePath+ str;
					console.info(vpath);
					if(/(Android)/i.test(navigator.userAgent)) {
						var vpath1 = pathmp31 +subnamePath+ str;
					} else {
						var vpath1 = pathmp31 +subnamePath+ str + "/playlist.m3u8";
					}
					console.info(vpath1);
				}

				audioSTOP = jwplayer('showplayer').setup({
					flashplayer: "common/jwplayer11/jwplayer.flash.swf",
					height: 398,
					width: "100%",
					autostart: true,
					playlist: [{
						sources: [{
							file: vpath
						}, {
							file: vpath1
						}]
					}],
					androidhls: "true"
				});
			} else if($scope.res.mr7 == 0) {
				$(".zy_resources_detail_cont").hide();
				$("#showplayer").css('padding-top', '200px');
				$("#showplayer").html("正在转码。。。请转码后欣赏或者" + "<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>" + "后欣赏");
			} else if($scope.res.mr7 == 2) {
				$(".zy_resources_detail_cont").hide();
				$("#showplayer").css('padding-top', '200px');
				$("#showplayer").html("转码失败，请" + "<a href='javascript:void(0)' style='color:red' onclick='down()'>下载</a>" + "后观看");
			}
		}
	} else if($scope.res.objId == 3) {
		$scope.showTip.fullscreenShow = true;
		$(".play").hide()
		if($scope.res.mr7 == 1) {
			$("#FilePackage").css('padding-top', '0px');
			$(".play").hide()
			$.ajax({
				url: newsIp + 'Teacher/Xplayer/readFile.do?pathName=' + FolderName + '&mr16=' + $scope.res.mr16 + '&moveFileState=' + moveFileState + '&subnamePath=' + subnamePath,
				type: 'post',
				dataType: 'json',
				cache: false,
				async: false,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						html = "<img class='bigPic' src='" + data[i] + "'/>";
						$("#FilePackage").append(html);
					}
				}
			})
		} else if($scope.res.mr7 == 0) {
			$("#FilePackage").css('padding-top', '200px');
			$(".play").hide()
			$("#FilePackage").html("正在转码。。。请转码后欣赏或者" + "<a href='javascript:void(0)' onclick='down()'>下载</a>" + "后欣赏");
		} else if($scope.res.mr7 == 2) {
			$("#FilePackage").css('padding-top', '200px');
			$(".play").hide()
			$("#FilePackage").html("转码失败，请" + "<a href='javascript:void(0)' onclick='down()'>下载</a>" + "后欣赏");
		}
	} else {
		$scope.showTip.fullscreenShow = true;
		$(".play").hide()
		if($scope.res.mr7 == 1) {
			$("#FilePackage").css('padding-top', '0px');
			$(".play").hide()
			$.ajax({
				url: newsIp + 'Teacher/Xplayer/officeReadFile.do?pathName=' + FolderName + '&num=0&row=2&mr16=' + $scope.res.mr16 + '&moveFileState=' + moveFileState + '&subnamePath=' + subnamePath,
				type: 'post',
				dataType: 'json',
				cache: false,
				async: false,
				success: function(data) {
					if(data[0] == "ok") {
						for(var i = 1; i < data.length; i++) {
							html = "<img class='bigPic' src='" + data[i] + "'/>";
							$("#FilePackage").append(html);
						}
						return false;
					} else {
						for(var i = 0; i < data.length; i++) {
							html = "<img class='bigPic' src='" + data[i] + "'/>";
							$("#FilePackage").append(html);
						}
						htmlP = "<p class='jiaziaMore' onclick='more()'>点击加载更多<i></i></p>";
						$("#FilePackage").append(htmlP);
					}
				}
			})
		} else if($scope.res.mr7 == 0) {
			$scope.showTip.fullscreenShow = true;
			$("#FilePackage").css('padding-top', '200px');
			$(".play").hide()
			$("#FilePackage").html("正在转码。。。请转码后欣赏或者" + "<a href='javascript:void(0)' onclick='down()'>下载</a>" + "后欣赏");
		} else if($scope.res.mr7 == 2) {
			$scope.showTip.fullscreenShow = true;
			$("#FilePackage").css('padding-top', '200px');
			$(".play").hide()
			$("#FilePackage").html("转码失败，请" + "<a href='javascript:void(0)' onclick='down()'>下载</a>" + "后欣赏");
		}

	}

	$http.get(newsIp + "Teacher/Xplayer/findUserCollect.do?id=" + $scope.res.id + "&userId=" + userId).success(function(data) {
		$scope.res.col = data.data;
		console.log(data);
	});
	console.log($scope.res);

	$scope.colres = function(res) {
		if(res.col == false) {
			if(userId) { //		numAction("sub","-2");
				if(userId!=res.createBy){
					$http.get(newsIp + "Teacher/Xplayer/saveCollect.do?resourceId=" + $scope.res.id + "&userId=" + userId).success(function(data) {
						if(data.ret == 200) {
							res.col = true;
							$scope.showTanChuang(true, true, false, "收藏成功");
						} else {
							$scope.showTanChuang(true, false, true, "收藏失败");
						}
					});
				}else{
					$scope.showTanChuang(true, false, true,"自己的资源不能收藏");
				}
			} else {
				location.href = path + '#/login';
			}

		}
	}
}])

/**
 * 看是否有flash插件
 */
function flashChecker() {
	var hasFlash = 0; //是否安装了flash
	var flashVersion = 0; //flash版本

	if(document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if(swf) {
			hasFlash = 1;
			VSwf = swf.GetVariable("$version");
			flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		}
	} else {
		if(navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
				var words = swf.description.split(" ");
				for(var i = 0; i < words.length; ++i) {
					if(isNaN(parseInt(words[i]))) continue;
					flashVersion = parseInt(words[i]);
				}
			}
		}
	}
	return {
		f: hasFlash,
		v: flashVersion
	};
}

/**
 * 下载
 */
var down_status = 0;
var url = resourcesIp_bd + "edu-resource/a/resource/mrs_rmi/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506";

/**
 * 加载图片 
 */
var num = 0;
var row = 2;

function more() {
	$(".jiaziaMore").hide();
	var s = 3;
	row = row + s
	num = num + s
	console.info

	(row + "-----" + num)
	var FolderName = $("#resCode").val();
	var mr16 = "0";
	var subName = $("#tzyresdata").val();
	var subnamePath = subName.split(' ')[0].replace(/\-/g, "") + "/";
	//var subnamePath = "";
	var moveFileState = "";
	$.ajax({
		url: newsIp + 'Teacher/Xplayer/officeReadFile.do?pathName=' + FolderName + '&num=' + num + '&row=' + row + '&mr16=' + mr16 + '&moveFileState=' + moveFileState + '&subnamePath=' + subnamePath,
		type: 'post',
		dataType: 'json',
		cache: false,
		async: false,
		success: function(data) {
			if(data[0] == "ok") {
				for(var i = 1; i < data.length; i++) {
					html = "<img class='bigPic' src='" + data[i] + "'/>";
					$("#FilePackage").append(html);
				}
				return false;
			} else {
				for(var i = 0; i < data.length; i++) {
					html = "<img class='bigPic' src='" + data[i] + "'/>";
					$("#FilePackage").append(html);
				}
				htmlP = "<p class='jiaziaMore' onclick='more()'>点击加载更多<i></i></p>";
				$("#FilePackage").append(htmlP);
			}
		}
	})
}

var userId = $("#userId").val();
function down() {
	if(userId) { //		numAction("sub","-2");
		console.info(down_status);
		if(down_status == 1) {
			return false;
		}
		down_status = 1;
		setTimeout(function() {
			down_status = 0;
		}, 1000);
		//		var basePath = $("#basePath").val();
		var fileName = $("#resName").val();
		var newName = $("#titi").val();
		var thisDwn = $(".zy_icon_down").html();
		$(".zy_icon_down").html(thisDwn * 1 + (1 * 1));
		var date = new Date();
		this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		date = this.hour + "_" + this.minute + "_" + this.second;
		//		userId = $("#userId").val();
		//		creatUserId = $("#createUserId").val();
		//		creatUserType = $("#createUserType").val();
		//		console.info(userId +"------"+ creatUserId);
		//		if(creatUserId != userId ){
		//			$.ajax({
		//				url : 'integralSub.do?userId='+userId,
		//				type : 'get',
		//				dataType : 'json',
		//			})
		//			$.ajax({
		//				url : 'integralAdd.do?userId='+creatUserId+'&&userType='+creatUserType,
		//				type : 'get',
		//				dataType : 'json',
		//			})
		//		}
		window.open(url + "&id=" + $("#resId").val() + "&fileName=" + newName);
	} else {
		location.href = path + '#/login';
	}

}

//资源图片过滤器
app.filter('imgFilter', function() {
	return function(obj) {
		//  	console.log(obj)
		if(obj != undefined) {
			if(obj == "1") {
				return "./img/resources_mp4.png";
			} else if(obj == "2") {
				return "./img/resources_ear.png";
			} else if(obj == "3") {
				return "./img/resources_pic.png";
			} else if(obj == "5") {
				return "./img/resources_ppt.png";
			} else if(obj == "6") {
				return "./img/resources_word.png";
			} else if(obj == "7") {
				return "./img/resources_excal.png";
			} else if(obj == "8") {
				return "./img/resources_mp4.png";
			} else if(obj == "9") {
				return "./img/resources_mp4.png";
			} else if(obj == "10") {
				return "./img/resources_mp4.png";
			}
		} else {
			return;
		}
	}
});

//资源图片过滤器
app.filter('collectFilter', function() {
	return function(obj) {
		if(obj.col == false) {
			return "收藏";
		} else {
			return "已收藏";
		}
	}
});
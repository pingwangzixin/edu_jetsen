app.controller('studentGuideReturnCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {

	//变量包
	$scope.variablePacket = {
		resourceBox : false,			//查看资源详情弹框	
		resourceUpload : false,			//上传资源弹框
		resourceArr : [{name : '你是大头鬼是的撒'},{name : '222你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'}],		//资源列表
		loginUserId:$location.$$search.userId,
		stuBackResourceList:[],
		guidanceId:$location.$$search.guidanceId,
		uploadFileMessage:{},
		backState:'1',
		resourceType:'',
		resourceClassification:'0',
		defultSort:0,
		ProvingUsername:true,//资源名称验证
		clickResourceName:'',
		previewUrl:'',
		videoPath:'',
		audioPath:'',
		imagePath:'',
		pdfPath:'',
		backResourceType:'',
		convertState:'0',
		userMsg:{},
	};
	console.log($location.$$search.userId);
	//获取登录人信息
	$http.get(jeucIp + 'uc/user/'+$location.$$search.userId).success(function (data){
		if(data.ret == 200){
			$scope.variablePacket.userMsg = data.data;
			console.log($scope.variablePacket.userMsg);
		}
	})
	
	 
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
	 * 查询oss的资源展示路径
	 */
	$http.get(ossIp + 'filelog/getPreviewUrl').success(function (data){
			console.log(data);
			$scope.variablePacket.previewUrl=data.previewUrl+"/Thumbnail/";
    })
	
	//查看资源详情弹框
	var playerSTOP,audioSTOP;
	$scope.resourceBoxFn = function (ossid,resourceName,resourceType){
		$scope.variablePacket.resourceBox = true;
		$scope.variablePacket.clickResourceName=resourceName;
		if(ossid.indexOf("_")>0){
			ossid = ossid.substring(0,ossid.indexOf("_"));
		}
		console.log(ossid);
		console.log(resourceType);
		$http.get(ossIp + 'filelog/'+ossid).success(function (data){
			console.log(data);
			if(data.code == 200){
				$scope.variablePacket.convertState = data.data.state;
				if(resourceType == '1'){
					$scope.variablePacket.backResourceType = 'video';
					$scope.variablePacket.videoPath = data.data.previewUrl;
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$(".loadFlashWrap").show();
					} else {
						$(".loadFlashWrap").hide();
						console.log(data.data.pathmp4PC)
						console.log(data.data.pathmp4PAD)
						
						playerSTOP=jwplayer('showplayer').setup({
	                        flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
	                        height:520,
	                        width: "100%",
	                        autostart: true,
	                        playlist: [{
	                            sources: [{
	                                file: data.data.pathmp4PC
	                            },{
	                                file: data.data.pathmp4PAD
	                            }]
	                        }],
	                        androidhls:"true"
	                    });
					}
				}else if(resourceType == '2'){
					$scope.variablePacket.backResourceType = 'music';
					$scope.variablePacket.audioPath = data.data.previewUrl;
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$(".loadFlashWrap").show();
					} else {
						$(".loadFlashWrap").hide();
						console.log(data.data.pathmp3PC)
						console.log(data.data.pathmp3PAD)
						audioSTOP=jwplayer('showplayer').setup({
	                        flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
	                        height:520,
	                        width: "100%",
	                        autostart: true,
	                        playlist: [{
	                            sources: [{
	                                file: data.data.pathmp3PC
	                            },{
	                                file: data.data.pathmp3PAD
	                            }]
	                        }],
	                        androidhls:"true"
	                    });
					}
				}else if(resourceType == '3'){
					$(".loadFlashWrap").hide();
					$scope.variablePacket.backResourceType = 'pic';
					$scope.variablePacket.imagePath = data.data.previewUrl;
				}else{
					$(".loadFlashWrap").hide();
					$scope.variablePacket.backResourceType = 'pdf';
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
					console.log($scope.variablePacket.pdfPath)
				}
			}
	    })
	};
	
	
	//上传资源弹框
	$scope.resourceUploadFn = function (){
		$scope.variablePacket.resourceUpload = true;
//		$timeout(function () {
//	       $scope.initUpload();
//	   }, 100);
	};
	
	//删除资源
	$scope.delResource = function(e,i,id,resourceName){
		console.log(id);
		e.stopPropagation();
		$scope.promptShow('确认删除',false,resourceName);
		$scope.delOk = function(){
			$http.delete(guidanceLearningIp + 'resource?id='+id).success(function (data){
				console.log(data);
				if(data.ret == 200){
					$scope.variablePacket.stuBackResourceList.splice(i,1);
					$scope.variablePacket.prompt = false;
					$scope.wranShow('已删除',true);
				}
		    })
		}
		
		
	}
	
	/**
	 * 关闭弹窗刷新窗口
	 */
	$scope.closeBox =  function (){
		$scope.variablePacket.resourceUpload = false;
		$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$scope.variablePacket.guidanceId+'&&createBy='+$scope.variablePacket.loginUserId+'&&type=1').success(function (data){
	//		console.log(data);
			if(data.ret == 200){
	//			console.log(data.data);
				$scope.variablePacket.stuBackResourceList=data.data;
				angular.forEach(data.data,function(e,i){
					if($scope.variablePacket.stuBackResourceList[i].resourceType != 2){
						$scope.variablePacket.stuBackResourceList[i].thumPath=$scope.variablePacket.previewUrl+e.resourceDate+'/'+e.ossFileName+'.jpg';
					}else{
						$scope.variablePacket.stuBackResourceList[i].thumPath="img/audioDefultImage.png";
					}
				})
				console.log($scope.variablePacket.stuBackResourceList);
			}
	    })
	}
	
	/**
	 * 根据用户id查询回传的资源列表
	 */
	/**
	 * 根据用户id，导学id查询回传的资源
	 */
	$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$scope.variablePacket.guidanceId+'&&createBy='+$scope.variablePacket.loginUserId+'&&type=1').success(function (data){
//		console.log(data);
		if(data.ret == 200){
//			console.log(data.data);
			$scope.variablePacket.stuBackResourceList=data.data;
			angular.forEach(data.data,function(e,i){
				if($scope.variablePacket.stuBackResourceList[i].resourceType != 2){
					$scope.variablePacket.stuBackResourceList[i].thumPath=$scope.variablePacket.previewUrl+e.resourceDate+'/'+e.ossFileName+'.jpg';
				}else{
					$scope.variablePacket.stuBackResourceList[i].thumPath="img/audioDefultImage.png";
				}
			})
			console.log($scope.variablePacket.stuBackResourceList);
		}
    })
	
	/**
	 * 回传资源
	 */
	$scope.updateStudyState = function(resourceMes){
		var arrayObj = new Array(); //创建一个数组
		var resourceMes = {};
		resourceMes.guidanceLearningId = $scope.variablePacket.guidanceId;
		resourceMes.type = $scope.variablePacket.backState;
		resourceMes.resourceId = '';
		resourceMes.resourceDate=$scope.variablePacket.uploadFileMessage.createDateStr;
		resourceMes.resourceName=document.getElementById("backResourceName").value;
		resourceMes.resourceType=$scope.variablePacket.resourceType;
		console.log($scope.variablePacket.uploadFileMessage)
		resourceMes.resourceSize=$scope.variablePacket.uploadFileMessage.fileSizeStr;
		resourceMes.sort=$scope.variablePacket.defultSort;
		resourceMes.resourceClassification= $scope.variablePacket.resourceClassification;
		resourceMes.resourceAuthor=$scope.variablePacket.loginUserId;
		resourceMes.createBy=$scope.variablePacket.loginUserId;
		resourceMes.updateBy=$scope.variablePacket.loginUserId;
		resourceMes.ossFileName=$scope.variablePacket.uploadFileMessage.id;
//		arrayObj.push(resourceMes);
		resourceMes.classId=$scope.variablePacket.userMsg.classId;
		resourceMes.studentId=$scope.variablePacket.userMsg.id;
		console.log(resourceMes);
//		插入到列表开头
		$http.post(guidanceLearningIp + 'resource',resourceMes).success(function (data){
				console.log(data);
	    })
		console.log($scope.variablePacket.uploadFileMessage.fileName.indexOf("mp3"));
		if($scope.variablePacket.uploadFileMessage.fileName.indexOf("mp3") != -1){
			resourceMes.thumPath = "img/audioDefultImage.png";
		}else{
			resourceMes.thumPath = $scope.variablePacket.previewUrl+$scope.variablePacket.uploadFileMessage.createDateStr+'/'+$scope.variablePacket.uploadFileMessage.id+'.jpg';
		}
		$scope.variablePacket.stuBackResourceList.unshift(resourceMes);
	}
	
	//上传资源弹框提交按钮
	$scope.submitFn = function (){
		var resourceName = document.getElementById("backResourceName").value.replace(/(^\s*)|(\s*$)/g,"");
		console.log(document.getElementById("backResourceName").value);
		if(resourceName == undefined || resourceName == '' || resourceName== null){
			$scope.variablePacket.ProvingUsername=true;
		}else{
			$scope.variablePacket.ProvingUsername=false;
			$scope.shangchuan();
		}
	};
	
	//插入资源方法
	$scope.insertRes = function(file){
		console.info(file);
		$scope.variablePacket.resourceUpload = false;
		$scope.wranShow("上传成功！",true);
		$scope.$apply();
	}
	
$scope.initUpload = function(){
/**************************************************上传插件start******************************************************************/
	var userInfo = {
		userId: $scope.variablePacket.userId,
		objId : "",
		md5: "",
		namespace: "Resource"
	}; //用户会话信息
	var chunkSize = 5000 * 1024; //分块大小
	var uniqueFileName = null; //文件唯一标识符
	var md5Mark = null;
	var time = fmtDate();
	var format = "";

	function getServer(type) { //测试用，根据不同类型的后端返回对应的请求地址
		switch(type) {
			case "php":
				return "./serverPHP/fileUpload.php"
			case "node":
				return "http://192.168.9.113:3000/fileUpload";
			case "java":
				return ossIp+"fileUpload";
			case "dubbo":
				return "http://192.168.9.113:8888/fileUpload";
		}
	}

	var backEndUrl = getServer("java");

	WebUploader.Uploader.register({
		"before-send-file": "beforeSendFile",
		"before-send": "beforeSend",
		"after-send-file": "afterSendFile"
	}, {
		beforeSendFile: function(file) {
			//秒传验证
			var task = new $.Deferred();
			var start = new Date().getTime();
			(new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function(percentage) {
				console.log(percentage);
			}).then(function(val) {
				console.log("总耗时: " + ((new Date().getTime()) - start) / 1000);

				md5Mark = val;
				userInfo.md5 = val;
				file.lastModifiedDate = time;

				$.ajax({
					type: "POST",
					url: backEndUrl,
					data: {
						status: "md5Check",
						md5: val,
						namespace: "Resource"
					},
					cache: false,
					timeout: 1000 //todo 超时的话，只能认为该文件不曾上传过
						,
					dataType: "json"
				}).then(function(data, textStatus, jqXHR) {

					//console.log(data);

					if(data.ifExist) { //若存在，这返回失败给WebUploader，表明该文件不需要上传
						task.reject();

						uploader.skipFile(file);
						file.path = data.path;
						file.lastModifiedDate = time;
						UploadComlate(data.fileLog);
					} else {
						task.resolve();
						//拿到上传文件的唯一名称，用于断点续传
						uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
					}
				}, function(jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
					task.resolve();
					//拿到上传文件的唯一名称，用于断点续传
					uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
				});
			});
			return $.when(task);
		},
		beforeSend: function(block) {
			//分片验证是否已传过，用于断点续传
			var task = new $.Deferred();
			$.ajax({
				type: "POST",
				url: backEndUrl,
				data: {
					status: "chunkCheck",
					name: uniqueFileName,
					chunkIndex: block.chunk,
					size: block.end - block.start,
					lastModifiedDate: time,
					namespace: "Resource"
				},
				cache: false,
				timeout: 1000 //todo 超时的话，只能认为该分片未上传过
					,
				dataType: "json"
			}).then(function(data, textStatus, jqXHR) {
				if(data.ifExist) { //若存在，返回失败给WebUploader，表明该分块不需要上传
					task.reject();
				} else {
					task.resolve();
				}
			}, function(jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
				task.resolve();
			});

			return $.when(task);
		},
		afterSendFile: function(file) {
			var chunksTotal = 0;
			file.lastModifiedDate = time;
			if((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
				//合并请求
				var task = new $.Deferred();
				$.ajax({
					type: "POST",
					url: backEndUrl,
					data: {
						status: "chunksMerge",
						name: uniqueFileName,
						chunks: chunksTotal,
						ext: file.ext,
						md5: md5Mark,
						lastModifiedDate: time,
						filename: file.name,
						type: file.type,
						size: file.size,
						namespace: "Resource"
					},
					cache: false,
					dataType: "json"
				}).then(function(data, textStatus, jqXHR) {

					//todo 检查响应是否正常

					task.resolve();
					file.path = data.path;

					UploadComlate(data.fileLog);

				}, function(jqXHR, textStatus, errorThrown) {
					task.reject();
				});

				return $.when(task);
			} else {
				// UploadComlate(file);
			}
		}
	});

	var uploader = WebUploader.create({
		swf: "Uploader.swf",
		server: backEndUrl,
        pick: {
            id: "#picker",
            multiple: false		// 是否多文件上传
        },
		resize: false,
		dnd: "#theList",
		paste: document.body,
		disableGlobalDnd: true,
			  accept: {// 只允许选择图片文件格式
                    title: 'file',
                    // extensions: 'gif,jpg,jpeg',
                    // mimeTypes: 'image/!*'
                   extensions: 'doc,docx,mp3,flv,mp4,vob,rm,mkv,wmv,mpg,avi,f4v,mov,mpeg,3gp,jpg,jpeg,gif,png,ppt,pptx,xls,xlsx'
                }
			,
		thumb: {
			width: 100,
			height: 100,
			quality: 70,
			allowMagnify: true,
			crop: true
			//, type: "image/jpeg"
		}
		//				, compress: {
		//					quality: 90
		//					, allowMagnify: false
		//					, crop: false
		//					, preserveHeaders: true
		//					, noCompressIfLarger: true
		//					,compressSize: 100000
		//				}
		,
		compress: false,
		prepareNextFile: true,
		chunked: true,
		chunkSize: chunkSize,
		threads: true,
		formData: function() {
			return $.extend(true, {}, userInfo);
		},
		fileNumLimit: 1,
		fileSingleSizeLimit: 1000 * 1024 * 1024,
		duplicate: true
	});
	
	uploader.on("fileQueued", function(file) {
		$(".uploadFile").attr("style","display:none;")		// 上传成功后 隐藏加号 上传成功后 隐藏把文件拖拽到这里

		$("#theList").append('<li id="' + file.id + '">' +
			'<img /><span>' + file.name + '</span><span class="itemUpload">上传</span><span class="itemDel">删除</span>' +
			'<div class="percentage"></div>' +
			'</li>');				//<span class="itemStop">暂停</span>

		var $img = $("#" + file.id).find("img");

		uploader.makeThumb(file, function(error, src) {
			var html = $("#theList li").find("span").eq(0).html();
			var index = html.lastIndexOf(".");
			format = html.substring(index + 1,html.length).toLowerCase();
			var flag = true;
			switch(format) {
					case "docx":
					case "doc":
						src = "img/wendang.png";
						userInfo.objId = 6;
						break;
					case "mp3":
						src = "img/yinpin.png";
						userInfo.objId = 2;
						break;
					case "flv":
					case "mp4":
					case "vob":
					case "rm":
					case "mkv":
					case "wmv":
					case "mpg":
					case "avi":
					case "f4v":
					case "mov":
					case "mpeg":
					case "3gp":
						src = "img/shipin.png";
						userInfo.objId = 1;
						break;
					case 'jpg':
					case 'gif':
					case 'jpeg':
					case 'png':
                		src = "img/tupian.png";
                		userInfo.objId = 3;
                		break;
//		            case 'pdf':
//		                src= "img/resources_pdf.png";
//		                userInfo.objId = 4;
//		                break;
					case "pptx":
					case "ppt":
						src = "img/ppt.png";
						userInfo.objId = 5;
						break;
		            case 'xlsx':
		            case 'xls':
		                src = "img/excel.png";
		                userInfo.objId = 7;
		                break;
		            default:
		            	flag = false;
						break;
				};
           
           if(flag){
           		$scope.variablePacket.resourceType=userInfo.objId;
           		$img.attr("src", src);
				var img = $("#theList li img").clone();
				var itemDel = $("#theList li .itemDel").clone(true);
				$("#theList li").prepend("<div class='fileparent'></div>");
	
				$(".fileparent").append(img).append(itemDel);
				$("#theList li>img").remove();
				$("#theList li>.itemDel").remove();
           }else{
           	    warn("该格式不支持！");
           		$(".itemDel").click();
           }
		});

	});
	
	// 上传
	$scope.shangchuan = function() {
		console.log(document.getElementById("backResourceName").value);
		if(document.getElementById("backResourceName").value != null && document.getElementById("backResourceName").value != ""){
			console.log("可以上传")
			uploader.upload();
		}else {
			$scope.wranShow("请完善信息！",false);
		}
	
		//"上传"-->"暂停"
//		$(this).hide();
//		$(".itemStop").show();
		
	}

//		$("#theList").on("click", ".itemUpload", function() {
//			console.log("2")
//			uploader.upload();
//	
//			//"上传"-->"暂停"
//			$(this).hide();
//			$(".itemStop").show();
//		});

//	$("#theList").on("click", ".itemStop", function() {
//		uploader.stop(true);
//
//		//"暂停"-->"上传"
//		$(this).hide();
//		$(".itemUpload").show();
//	});

	//todo 如果要删除的文件正在上传（包括暂停），则需要发送给后端一个请求用来清除服务器端的缓存文件
	$("#theList").on("click", ".itemDel", function() {
		uploader.removeFile($(this).parents("li").attr("id"));  //从上传文件列表中删除
		$(this).parents("li").remove(); 						//从上传列表dom中删除
		$(".uploadFile").attr("style","display:block;")				// 删除后显示加号 上传成功后 显示把文件拖拽到这里
	});

	uploader.on("uploadProgress", function(file, percentage) {
		$("#" + file.id + " .percentage").text(parseInt(percentage * 100) + "%");
	});

	uploader.on('uploadSuccess', function(file, response) {
		if(response.status == 1) {
            UploadComlate(response.fileLog);
			return;
		}

		// $( '#'+file.id ).addClass('upload-state-done');
	});

	uploader.on("error", function(type) {
		if(type == "F_DUPLICATE") {
			warn("系统提示 请不要重复选择文件！");
		} else if(type == "Q_EXCEED_SIZE_LIMIT") {
			warn("系统提示"+"<span class='C6'>所选附件总大小</span>不可超过<span class='C6'>" + allMaxSize + "M</span>哦！<br>换个小点的文件吧！");
		} else if(type == "Q_TYPE_DENIED") {
			warn("系统仅支持doc,docx,mp3,flv,mp4,vob,rm,mkv,wmv,mpg,avi,f4v,mov,mpeg,3gp,jpg,jpeg,gif,png,ppt,pptx,xls,xlsx文件，其他类型不支持");
		} else if(type == "F_EXCEED_SIZE") {
			warn("单文件大小超过1G");
		}

	});

	function fmtDate() {
		var date = new Date();
		var y = 1900 + date.getYear();
		var m = "0" + (date.getMonth() + 1);
		var d = "0" + date.getDate();
		return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
	}

	function UploadComlate(file) {

		$("#" + file.id + " .percentage").text("上传完毕");
		$scope.variablePacket.uploadFileMessage=file;
		$scope.updateStudyState();
		$("#theList .itemDel").click();
//		$(".itemStop").hide();
		$("#wenjian").hide();
		$(".itemUpload").hide();
		$(".itemDel").hide();
	};
		/***********************************************************上传插件end*************************************************************************/
	}
//$scope.initUpload();

		//提示框
	function warn(title){
       $(".zmj_warn").show();
       $("#warntitle").html(title);
   	   setTimeout(function(){
   	   	 $(".zmj_warn").hide();
   	   },1500)
	};

$scope.initUpload();

}]);

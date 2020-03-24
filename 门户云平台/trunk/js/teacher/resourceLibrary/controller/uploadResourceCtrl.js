app.controller('uploadResourceCtrl', ['$rootScope','$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($rootScope,$scope, $state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源中心';
    
	$scope.variablePacket = {
		ProvingSubject: false, //学科验证
		ProvingChapter: false, //章节目录验证
		selectSubject : [],	   // 学科list
		subjectId :"",	       // 学科id
		resourceName :"",	   // 学科name
		keywords :"",	   	   // 学科关键字
		
		userId :JSON.parse(sessionStorage.getItem('managerSearch')).id,
		createUser:JSON.parse(sessionStorage.getItem('managerSearch')).realname,
		subjIds :"",
		subjNames:"",
		userType:JSON.parse(sessionStorage.getItem('managerSearch')).userType,
		areaIds : "",			// 区域id
		areaNames:"",			// 区域名称
		areaId :JSON.parse(sessionStorage.getItem('managerSearch')).cityId,
        areaName:JSON.parse(sessionStorage.getItem('managerSearch')).cityName,
        countyId:JSON.parse(sessionStorage.getItem('managerSearch')).countyId,
        countyName:JSON.parse(sessionStorage.getItem('managerSearch')).countyName,
        officeId:JSON.parse(sessionStorage.getItem('managerSearch')).officeId,
        officeName:JSON.parse(sessionStorage.getItem('managerSearch')).officeName,
        gradeJson :"",
        leftTreeShow : {					//左侧树展示
            teachingMaterial : true,		//版本选择框
            treeOne : false,					//版本选择框下的树
            treeKnowledgePoint : false,		//知识点树
            other : false,						//其他
        }
	};


	$scope.wranShow=function(texts,srcpic,title){    //上传成功或者失败提示
		$scope.variablePacket.warn =true;
		 $scope.variablePacket.warn_title = title || '';
		 $scope.variablePacket.warn_text = texts;
		 $scope.variablePacket.warn_src = srcpic;
		$timeout(function (){
			$scope.variablePacket.warn = false;
		},1500);
	};
   
	$scope.Subject = function(subject) { //学科验证
		$scope.variablePacket.subjectId = subject;
		if($scope.selectedSubject != undefined) {
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject == undefined) {
			$scope.variablePacket.ProvingSubject = true;
		}
        $scope.directiveState = false;
        $rootScope.initchoiceVersion();
	};
	$scope.verifySubject=function(){    //点击章节目录时先验证学科
		 
		 if($scope.selectedSubject==null){
		 	$scope.variablePacket.ProvingSubject = true;
		 }else{
		 	$scope.variablePacket.ProvingSubject = false;
		 };
		 if(angular.element('.titleSpan').find('em')[2].innerHTML=="节"){
		 	  $scope.variablePacket.ProvingChapter=true;
		 }else{
		 	  $scope.variablePacket.ProvingChapter=false;
		 };
	};
	$scope.focus=function(){        //验证章节
		 var em1=angular.element('.titleSpan').find('em')[0].innerHTML;
		 var em2=angular.element('.titleSpan').find('em')[1].innerHTML;
		 var em3=angular.element('.titleSpan').find('em')[2].innerHTML;
		 if(em1!="课本" && em2!="章" && em3!="节"){
		 	 $scope.variablePacket.ProvingChapter=false;
		 }else{
		 	 $scope.variablePacket.ProvingChapter=true;
		 };
	 
	};
	
	// 点击删除文件
//	$scope.remove = function(event) {
//		angular.element(event.target).parents(".uploadFiletype").remove();
//	};


	//  查询当前教师的 授课信息
    $http.get(zyxrequireIp + '/uc/user/'+$scope.variablePacket.userId).success(function(suc) {
        if(suc.ret == 200) {
        	$scope.variablePacket.userId = suc.data.id;
        	$scope.variablePacket.createUser = suc.data.realname;
        	var teaSubjectMap = {};
    		angular.forEach(suc.data.userCourse, function(data){
    			if(teaSubjectMap[data.subjectId] === undefined) {
					var subj = {
	                    id:data.subjectId,
	                    name :data.subjectName,
	                    vid :data.versionId,
	                    vname:data.versionName,
	                    lid :"level_"+data.stage,
	                    lname:getLeveName(data.stage),
	                    gname:data.gradeName,
	                    gid :data.gradeId,
	//                  gid:getGradeNo(data.gradeName),
	                    flag:1
	                };
	                $scope.variablePacket.selectSubject.push(subj);
	                teaSubjectMap[data.subjectId] = data;
    			}
            });
        }
    });
    
    // 获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    	$scope.variablePacket.gradeJson = gradeJson;
    	console.info($scope.variablePacket.gradeJson)
    };
    


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
		if($scope.selectedSubject!=null && $scope.variablePacket.ProvingChapter==false && $scope.variablePacket.resourceName!=null && $scope.variablePacket.resourceName!=""){
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
			warn("系统仅支持<br/>doc,docx,mp3,flv,mp4,vob,rm,mkv,wmv,mpg,avi,f4v,mov,mpeg,3gp,jpg,jpeg,gif,png,ppt,pptx,xls,xlsx<br/>文件,其他类型不支持");
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
		insert(file);
		$("#theList .itemDel").click();
//		$(".itemStop").hide();
		$("#wenjian").hide();
		$(".itemUpload").hide();
		$(".itemDel").hide();
	};

	// 添加资源
	function insert(file) {
		var subjectId = $scope.variablePacket.subjectId;	        				// 学科id
		var resourceName = $scope.variablePacket.resourceName;   					// 学科name
		var createBy = $scope.variablePacket.userId;								// 创建者id
		var createUser = $scope.variablePacket.createUser;							// 创建者名称
		var updateBy = $scope.variablePacket.userId;								// 修改者id
		var objId = userInfo.objId;
		var fileFormat = format;
		var byteSize = file.fileSize;
		var filesize = file.fileSizeStr;
		$scope.variablePacket.areaIds = "0"+","+$scope.variablePacket.areaId+","+$scope.variablePacket.countyId+","+$scope.variablePacket.officeId+","+"0";
		$scope.variablePacket.areaNames = "0"+"//"+$scope.variablePacket.areaName+"//"+$scope.variablePacket.countyName+"//"+$scope.variablePacket.officeName+"//"+"0";
		var params = {
			title:resourceName,
			objId:objId,
			fileFormat:fileFormat,
			fileSize:filesize,
			byteSize:byteSize,
			fileName:file.fileName,
			md5:file.md5,
			keywords:$scope.variablePacket.keywords,
			createType:$scope.variablePacket.userType,
			createBy:createBy,
			createUser:createUser,
			updateBy:updateBy,
			gradeJson:JSON.stringify($scope.variablePacket.gradeJson),
			subjIds:$scope.variablePacket.subjIds,
			subjNames:$scope.variablePacket.subjNames,
			areaCodes:$scope.variablePacket.areaIds,
			areaNames:$scope.variablePacket.areaNames
		}
    	$http.post(resourcesIp+"/a/resource",JSON.stringify(params),{headers: {'Content-Type': 'application/json'}})
		.success(function(res) {
			if(res.code == 200) {
				$scope.wranShow("上传成功！",true);
				$("#wenjian").show();
			}
		})
		.error(function(e) {
			$scope.wranShow("上传失败！",false);
		})
		
	}


	// 根据 学段 获取学段 名称
	function getLeveName(levelId) {
		var leveName = "";
			switch (levelId) {
				case "1":
					leveName = "小学";
					break;
				case "2":
				    leveName = "初中";
				    break;
				case "3":
				    leveName = "高中";
				    break;
			}
			return leveName;
	}

	//根据年级获取 年级段
	function getGradeNo(gradeName) {
		var gradeNo = "";
			switch (gradeName) {
				case "一年级":
					gradeNo = "1";
					break;
				case "二年级":
					gradeNo = "2";
					break;
				case "三年级":
					gradeNo = "3";
					break;
				case "四年级":
					gradeNo = "4";
					break;
				case "五年级":
					gradeNo = "5";
					break;
				case "六年级":
					gradeNo = "6";
					break;
				case "七年级":
					gradeNo = "7";
					break;
				case "八年级":
					gradeNo = "8";
					break;
				case "九年级":
					gradeNo = "9";
					break;
				case "初一":
					gradeNo = "7";
					break;
				case "初二":
					gradeNo = "8";
					break;
				case "初三":
					gradeNo = "9";
					break;
				case "高一":
					gradeNo = "10";
					break;
				case "高二":
					gradeNo = "11";
					break;
				case "高三":
					gradeNo = "12";
					break;	
				}
			return gradeNo;
	};
	//提示框
	function warn(title){
       $(".zmj_warn").show();
       $("#warntitle").html(title);
   	   setTimeout(function(){
   	   	 $(".zmj_warn").hide();
   	   },1500)
	};

	
}]);
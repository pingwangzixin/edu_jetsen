app.controller('taskStateContentCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	var stuTaskInfo = JSON.parse(sessionStorage.getItem("stuTaskInfo"))
	var examId = stuTaskInfo.examId;
	var stuId = stuTaskInfo.stuId;
	var stuName = stuTaskInfo.stuName;
	var classId = stuTaskInfo.classId;
	var uploadFlags = false;
	//变量包
	$scope.variablePacket = {
		prompt : false,		//确认删除弹框（固定字段，用到确认删除弹框的时候都得有）
//		answerEnclosureArr : [{name : '你会打死塑料袋健身卡法兰克福将收到了开发'},{name : '还说了句l'},{name : '爱上了肯德基按思路'},{name : '大于吃次奥与'}],		//我的回答附件列表
		answerEnclosureArr : [],
		listPageParam : $stateParams.state,		//列表页面状态参数（未提交、已提交、已批阅）
		answerContent: ""
	};
	
	//删除我的回答附件
	$scope.deleteEnclosure = function (i){
		$scope.promptShow('确定删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.answerEnclosureArr.splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true);
		}
	};
	
	$scope.examAndSubmit = {};
	//查询任务内容and学生回答
	$scope.findStuExamList= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId;
		if($scope.variablePacket.listPageParam!="unsubmitted"){
			url += "&stuId="+stuId;
		}
		$http.get(url).success(function(result) {
			if(result.ret==200){
				$scope.examAndSubmit = result.data;
				if($stateParams.state!="unsubmitted"){
					$scope.variablePacket.answerEnclosureArr = result.data.examSubmit.stuAttachmentList;
				}
			}
		});
	}
	$scope.findStuExamList();
	
	//校验附件是否存在
	$scope.checkDownUrl = function(url){
		if(url==undefined){
			$scope.wranShow('数据不存在!', false);
		}
	}	
	
	////提交学生回答
	$scope.submitFn = function (){
		console.log($scope.variablePacket.answerContent);
		var examSubmitObj = {};
		examSubmitObj.examId = examId;
		examSubmitObj.stuId = stuId;
		examSubmitObj.stuName = stuName;
		examSubmitObj.classId = classId;
		examSubmitObj.type = 1;
		examSubmitObj.startTime = $scope.examAndSubmit.stuStartTime;
		examSubmitObj.content = $scope.variablePacket.answerContent;
		var examSubmitJson = JSON.stringify(examSubmitObj);
		var attachmentJson = "";
		if($scope.variablePacket.answerEnclosureArr.length>0){
			attachmentJson = JSON.stringify($scope.variablePacket.answerEnclosureArr);
		}
		var params = {examSubmitJson:examSubmitJson, attachmentJson:attachmentJson};
		console.log(params);
		$http.post(lessonIp+"stuExam/stuExamSubmit", params).success(function(data) {
			if(data.ret==200){
				$scope.wranShow('提交成功',true);
				setTimeout(function(){
					$state.go('secondNav.studentTaskList');
				}, 1500);
			}else{
				$scope.wranShow('提交失败',false)
			}
		});
		
	};
	
	var userInfo = {userId: "kazaff", md5: "", namespace: "Resource"};   //用户会话信息
    var chunkSize = 5000 * 1024;        //分块大小
    var uniqueFileName = null;          //文件唯一标识符
    var md5Mark = null;
    var time = fmtDate();

    function getServer(type) {   //测试用，根据不同类型的后端返回对应的请求地址
        switch (type) {
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
        "before-send-file": "beforeSendFile"
        , "before-send": "beforeSend"
        , "after-send-file": "afterSendFile"
    }, {
        beforeSendFile: function (file) {
            //秒传验证
            var task = new $.Deferred();
            var start = new Date().getTime();
            (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                console.log(percentage);
            }).then(function (val) {
                console.log("总耗时: " + ((new Date().getTime()) - start) / 1000);

                md5Mark = val;
                userInfo.md5 = val;
                file.lastModifiedDate = time;

                $.ajax({
                    type: "POST"
                    , url: backEndUrl
                    , data: {
                        status: "md5Check"
                        , md5: val
                        , namespace: "Resource"
                    }
                    , cache: false
                    , timeout: 1000 //todo 超时的话，只能认为该文件不曾上传过
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {

                    //console.log(data);

                    if (data.ifExist) {   //若存在，这返回失败给WebUploader，表明该文件不需要上传
                        task.reject();

                        uploader.skipFile(file);
						file.fileId=data.fileLog.id;
                        file.path = data.fileLog.fileName;
                        file.lastModifiedDate = data.fileLog.createDateStr;
                        UploadComlate(file);
                    } else {
                        task.resolve();
                        //拿到上传文件的唯一名称，用于断点续传
                        uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
                    }
                }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                    task.resolve();
                    //拿到上传文件的唯一名称，用于断点续传
                    uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
                });
            });
            return $.when(task);
        }
        , beforeSend: function (block) {
            //分片验证是否已传过，用于断点续传
            var task = new $.Deferred();
            $.ajax({
                type: "POST"
                , url: backEndUrl
                , data: {
                    status: "chunkCheck"
                    , name: uniqueFileName
                    , chunkIndex: block.chunk
                    , size: block.end - block.start
                    , lastModifiedDate: time
                    , namespace: "Resource"
                }
                , cache: false
                , timeout: 1000 //todo 超时的话，只能认为该分片未上传过
                , dataType: "json"
            }).then(function (data, textStatus, jqXHR) {
                if (data.ifExist) {   //若存在，返回失败给WebUploader，表明该分块不需要上传
                    task.reject();
                } else {
                    task.resolve();
                }
            }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                task.resolve();
            });

            return $.when(task);
        }
        , afterSendFile: function (file) {
            console.log(file)
            var chunksTotal = 0;
            file.lastModifiedDate = time;
            if ((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
                //合并请求
                var task = new $.Deferred();
                $.ajax({
                    type: "POST"
                    , url: backEndUrl
                    , data: {
                        status: "chunksMerge"
                        , name: uniqueFileName
                        , chunks: chunksTotal
                        , ext: file.ext
                        , md5: md5Mark
                        , lastModifiedDate: time
                        , filename: file.name
                        , type: file.type
                        , size: file.size
                        , namespace: "Resource"
                    }
                    , cache: false
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {

                    //todo 检查响应是否正常
                    console.log(data)
                    console.log(textStatus)
                    console.log(jqXHR)

                    task.resolve();
                    file.path = data.path;
                    file.fileId = data.fileLog.id;

                    UploadComlate(file);

                }, function (jqXHR, textStatus, errorThrown) {
                    task.reject();
                });

                return $.when(task);
            } else {
            	uploadFlags = true;
                //看上传成功
            }
        }
    });

    var uploader = WebUploader.create({
        swf: "Uploader.swf"
        , server: backEndUrl
        , pick: "#picker"
        , resize: false
        , dnd: ""
        , paste: document.body
        , disableGlobalDnd: true
        ,accept: {// 只允许选择图片文件格式
            title: 'file',
//          extensions: 'png,jpg,jpeg',
//          mimeTypes: 'image/!*',
            extensions: 'vob,rm,mkv,wmv,mpg,avi,f4v,flv,mov,mpeg,3gp,mp4,mp3,jpg,jpeg,png,gif,doc,docx,xls,xlsx,ppt,pptx'
        }
        , thumb: {
            width: 100
            , height: 100
            , quality: 70
            , allowMagnify: true
            , crop: true
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
        , compress: false
        , prepareNextFile: true
        , chunked: true
        , chunkSize: chunkSize
        , threads: true
        , formData: function () {
            return $.extend(true, {}, userInfo);
        }
        , fileNumLimit: 10
        , fileSingleSizeLimit: 1000 * 1024 * 1024
        , duplicate: true
    });


    uploader.on("fileQueued", function (file) {
		uploader.upload();
    });

    uploader.on("uploadProgress", function (file, percentage) {
        $("#" + file.id + " .percentage").text(percentage * 100 + "%");
    });


    uploader.on('uploadSuccess', function (file, response) {
        console.log(file);
        console.log(response);
        if (response.status == 0) {
            alert(response.message);
            return;
        }else if(uploadFlags){
        	file.fileId = response.fileLog.id;
        	UploadComlate(file);
        	uploadFlags = false;
        }

        // $( '#'+file.id ).addClass('upload-state-done');
    });

    uploader.on("error", function (type) {
        if (type == "F_DUPLICATE") {
            alert("系统提示", "请不要重复选择文件！");
        } else if (type == "Q_EXCEED_SIZE_LIMIT") {
            alert("系统提示", "<span class='C6'>所选附件总大小</span>不可超过<span class='C6'>" + allMaxSize + "M</span>哦！<br>换个小点的文件吧！");
        } else if (type == "Q_TYPE_DENIED") {
            alert("文件类型不对");
        } else if (type == "F_EXCEED_SIZE") {
            alert("单文件大小超过1000");
        }

    });

    function fmtDate() {
        var date = new Date();
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
    }

	//上传成功
	function UploadComlate(file) {
		console.log(file.id+" / "+file.fileId+" / "+file.name);
		uploader.removeFile(file.id);
//		<img src="./img/resources_word.png" ng-if='i.Resource[0].ResourceSrc==0'/>
//		<img src="./img/resources_ppt.png" ng-if='i.Resource[0].ResourceSrc==1'/>
//		<img src="./img/resources_pic.png" ng-if='i.Resource[0].ResourceSrc==2'/>
//		<img src="./img/resources_excal.png" ng-if='i.Resource[0].ResourceSrc==3'/>
//		<img src="./img/resources_ear.png" ng-if='i.Resource[0].ResourceSrc==4'/> 
		var hz = file.name.substring(file.name.lastIndexOf('.')+1);
		console.log(hz);
		var type = "";
		switch(hz) {
			case "docx":
			case "doc":
				src = "img/wendang.png";
				type = 6;
				break;
			case "mp3":
				src = "img/yinpin.png";
				type = 2;
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
				type = 1;
				break;
			case 'jpg':
			case 'gif':
			case 'jpeg':
			case 'png':
				src = "img/tupian.png";
				type = 3;
				break;
			case 'pdf':
				src= "img/resources_pdf.png";
				type = 4;
				break;
			case "pptx":
			case "ppt":
				src = "img/ppt.png";
				type = 5;
				break;
			case 'xlsx':
			case 'xls':
				src = "img/excel.png";
				type = 7;
				break;
		};
		var fileData = {resourceId:file.fileId, name:file.name, type:type};
		$scope.variablePacket.answerEnclosureArr.push(fileData);
		console.log($scope.variablePacket.answerEnclosureArr);
		$scope.$digest();
	}
	
	
	
	//插入资源回显弹层--开启
	$scope.insertResource = function(resourceName) {
		if(resourceName.objId==undefined){
			$http.get(resourcesIp+'a/resource/'+resourceName.resourceId+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
		        if(data.code == 200){
					ossidse = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
					ossbj = data.data.objId;
					getossid(ossidse,ossbj,resourceName.ResourceTit);
		        }
			})
		}else{
			$scope.variablePacket.clickResourceName=resourceName.ResourceTit;
			$scope.variablePacket.insertResource = true;
			adaptionHeight();
			$scope.resourceBoxFn(resourceName.ossid,resourceName.ResourceTit,resourceName.objId);
		}
	}
	var ossidse = "";
	var ossbj = "";
	function getossid(ossidse,ossbj,ResourceTit) {
		$scope.variablePacket.clickResourceName=ResourceTit;
		$scope.variablePacket.insertResource = true;
		adaptionHeight();
		$scope.resourceBoxFn(ossidse,ResourceTit,ossbj);
	}
	
	
	//查看资源详情弹框
	var playerSTOP,audioSTOP;
	$scope.resourceBoxFn = function (ossid,resourceName,resourceType){
		var prewUrl = ossIp + 'filelog/'+ossid;
		$http.get(prewUrl).success(function (data){
			if(data.code == 200){
				$scope.variablePacket.convertState = data.data.state;
				if(resourceType == '1'){
					$scope.variablePacket.backResourceType = 'video';
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$scope.variablePacket.showplayer = true;
					} else {
						$scope.variablePacket.showplayer = false;
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
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$scope.variablePacket.showplayer = true;
					} else {
						$scope.variablePacket.showplayer = false;
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
					$scope.variablePacket.showplayer = false;
					$scope.variablePacket.backResourceType = 'pic';
					$scope.variablePacket.imagePath = data.data.previewUrl;
				}else{
					$scope.variablePacket.showplayer = false;
					$scope.variablePacket.backResourceType = 'pdf';
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
					console.log($scope.variablePacket.pdfPath)
				}
			}
	    })
	};
	
	//赋值弹层的自适应高度
	function adaptionHeight(){
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight,.addTestPaper').height(bigHeight - 275);
			angular.element('.addTestPaper').height(bigHeight-120);
			angular.element('.mlh_cont').height(bigHeight - 80);
			console.log(bigHeight)
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".addTestPaper").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".mlh_cont").mCustomScrollbar({//mlh
				mouseWheelPixels: 1000, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
		});
	}
	
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
	
	//插入资源回显弹层--关闭
	$scope.closeResource = function() {
		$scope.variablePacket.insertResource = false;
	}
}]);

app.filter('icon', function() {
    return function(type) {
        var icon = "";
        switch(type)
        {
            case '1':
                icon = "img/resources_mp4.png";
                break;
            case '2':
                icon = "img/resources_ear.png";
                break;
            case '3':
                icon = "img/resources_pic.png";
                break;
            case '4':
                icon = "img/resources_pdf.png";
                break;
            case '5':
                icon = "img/resources_ppt.png";
                break;
            case '6':
                icon = "img/resources_word.png";
                break;
            case '7':
                icon = "img/resources_excal.png";
                break;
            case '8':
                icon = "img/resources_mp4.png";
                break;
        }
        return icon;
    };
    
   
});
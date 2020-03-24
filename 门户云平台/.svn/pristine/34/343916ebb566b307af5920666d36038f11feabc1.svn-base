app.controller('reviewTaskCtrl', ['$scope','$rootScope','$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope,$rootScope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	//先取值
	var teaTaskInfo = JSON.parse(sessionStorage.getItem("teaTaskInfo"))
	var examId = teaTaskInfo.examId;
	var classId = teaTaskInfo.classId;
	var className = teaTaskInfo.className;
	
	$scope.stuInfo = {
		stuState:"",
		stuId:"",
		stuName:""
	}
	
	$scope.checkStuInfo = function(id, name, state){
		$scope.stuInfo.stuId = id;
		$scope.stuInfo.stuName = name;
		$scope.stuInfo.stuState = state;
		//查询任务详情
		$scope.findStuExamList();
	}
	

	//变量包
	$scope.variablePacket = {
		listBorder : false,				//列表最下面border 
		textearaWord : '',				//评价框文字
		inputtedWordNum : 0,			//评价框已输入文字
		limitWordNum: 25,				//评价框限制输入文字
		stuList : {						//学生列表
			notRead:[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			alreadyRead:[{name:'文学'},{name:'说的'},{name:'你丫的'}],
			noSub:[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		}					
	};
	
	$scope.findStu = function(){
		var url = lessonIp+"ExamCount/selectExamStu?examId="+examId+"&classId="+classId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuList.noSub = data.wtj;
				$scope.variablePacket.stuList.notRead = data.ytj;
				$scope.variablePacket.stuList.alreadyRead = data.ypg;
				if(data.ytj!=undefined){
					$scope.stuInfo.stuId = data.ytj[0].id;
					$scope.stuInfo.stuName = data.ytj[0].name;
					$scope.stuInfo.stuState = "submission";
				}else if(data.ypg!=undefined){
					$scope.stuInfo.stuId = data.ypg[0].id;
					$scope.stuInfo.stuName = data.ypg[0].name;
					$scope.stuInfo.stuState = "readyOver";
				}
				//查询任务详情
				$scope.findStuExamList();
			}
		});
	}
	$scope.findStu();
	
	$scope.examInfo = {
		name:"",	//任务名称
		time:"",	//2017-04-05 12:12至2017-04-07 12:12
		className:className,
		content:"",
		attachmentList:[],
		resourceList:[],
		examSubmitId:"",
		stuContent:"",
		stuAttachmentList:[],
		comment:""
	};
	//查询任务内容and学生回答
	$scope.findStuExamList= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId+"&stuId="+$scope.stuInfo.stuId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.examInfo.name = data.name;
				$scope.examInfo.time = data.startTime+"至"+data.endTime;
				$scope.examInfo.content = data.content;
				$scope.examInfo.attachmentList = data.attachmentList;
				$scope.examInfo.resourceList = data.resourceList;
				if($scope.stuInfo.stuId!=""){
					$scope.examInfo.examSubmitId = data.examSubmit.id;
					$scope.examInfo.stuContent = data.examSubmit.content;
					$scope.examInfo.stuAttachmentList = data.examSubmit.stuAttachmentList;
					$scope.examInfo.comment = data.examSubmit.comment==undefined?"":data.examSubmit.comment;
				}
				$scope.statisticsWord();
			}
		});
	}
	
	//校验附件是否存在
	$scope.checkDownUrl = function(url){
		if(url==undefined){
			$scope.wranShow('数据不存在!', false);
		}
	}
	
	///提交评语
	$scope.submitFn = function (){
		if($scope.variablePacket.inputtedWordNum <= 0){
			$scope.wranShow('请输入评价文字',false);
		}else{
			var params = {examId:examId, stuId: $scope.stuInfo.stuId,examSubmitId:$scope.examInfo.examSubmitId,
					type:1,comment:$scope.examInfo.comment};
			console.log(params);
			$http.post(lessonIp+"ExamCount/teaReadyOver", params).success(function(data) {
				if(data.ret==200){
					$scope.wranShow('批改成功',true);
					submitStuId = '';
					//重新刷新、查询学生
					$scope.findStu();
				}else{
					$scope.wranShow('批改失败',false);
				}
			});
		}
	};
	
	$scope.downLoad = function(id){
		$http.get(ossIp+"filelog/"+id).success(function(data) {
				if(data.code==200){
					var url = data.data.downUrl;
					window.open(url,'_blank');
				}else{
					$scope.wranShow('获取文件失败!', false);
				}
			});
	}
	
	//学生列表请求成功之后判断
	var borderLen = 0;
	angular.forEach($scope.variablePacket.stuList,function (e,i){
		borderLen += e.length;
		$scope.variablePacket.listBorder = borderLen % 2 ? false : true;
	});
	
	//评价输入框文字统计
	$scope.statisticsWord = function (){
		$scope.variablePacket.inputtedWordNum = $scope.examInfo.comment.length;
		if($scope.variablePacket.inputtedWordNum >= $scope.variablePacket.limitWordNum){
			$scope.variablePacket.inputtedWordNum = $scope.variablePacket.limitWordNum;
			$scope.examInfo.comment = $scope.examInfo.comment.substring(0,$scope.variablePacket.limitWordNum);
		}
	};
	
	    
	//插入资源回显弹层--开启
	$scope.insertResource = function(resourceName) {
		if(resourceName.objId==undefined){
			$http.get(resourcesIp+'/a/resource/'+resourceName.resourceId+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
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
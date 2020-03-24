app.controller('studentInClassDetailsCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
//	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	$scope.variablePacket = {
		state:$stateParams.state ,//notSubmitted未提交     notRead未批阅     haveRead已批阅
		type:$stateParams.type,//判断页面     guidance导学页面     homework作业页面
		backUrl : $stateParams.type == 'guidance' ? 'secondNav.studentGuideList({"stage":"'+$stateParams.stage+'"})' : 'secondNav.studentHomeworkList({"stage":"'+$stateParams.stage+'"})',//返回地址
		//卷库
		TestIndex: -1, //试卷默认选中
		testpaperBox_pic: true,
		testpaperBox_line: true,
		//资源
		ResourcesTypeShow_pic: false,
		ResourcesTypeShow_line: true,  
		ResLineIndex: -1, //页面--资源库资源条默认选中
		ResLineTab: 0, //页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType: "pic", //页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		titleName:"",//资源或试卷名称
		uploadImg:"", //点击上传图片时，题目信息
		classId:$location.$$search.classId,
		className:$location.$$search.className,
		subjectName:$location.$$search.subjectName,
		type:$location.$$search.type,
		packjectId:$location.$$search.packjectId,
		state:$location.$$search.state,
		guidanceSituation:{},
		name:'',//导学/作业名称
		chapterNames:'',//导学章节目录
		createDate:'',
		resourceName:'',
		finishState:true,//完成按钮，如果是为批阅和已批阅，那么按钮隐藏
		userId:sessionStorage.getItem("userId"),
		userName: JSON.parse(sessionStorage.getItem("managerSearch")).realname,
		stuState:0,
		assemblyId:'',
		submitFlag:true,//是否可以全部提交，如果有试卷未提交，赋值为false
		uploadQuestionIndex:-1,
		previewUrl:"",
		resourceUpload:false,
	};
	
	
//	//资源的切换
//	$scope.ResLineTab = function(index, typeSrc) {
//		$scope.variablePacket.ResLineIndex = index;
//		$scope.variablePacket.ResLineTab = index;
//		$scope.variablePacket.TestIndex = -1;
//		$scope.variablePacket.titleName=$scope.insertData[index].ResourceTit;
//		$scope.variablePacket.testpaperBox_pic = false; //试卷展示
//		$scope.variablePacket.ResourcesTypeShow_pic = true;//资源展示
//		if(typeSrc == 4) {
//			$scope.variablePacket.ResLineType = "music";
//		} else if(typeSrc == 5) {
//			$scope.variablePacket.ResLineType = "video";
//		} else {
//			$scope.variablePacket.ResLineType = "pic";
//		}
//	};
    //提交验证
    $scope.submitTest=function(){   //提交试卷提示
    	var num = 0;
		angular.forEach($scope.echoQuestion.single,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.judge,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			if(e.notLearnAnswer==''&&(e.img==null||e.img.length==0)){
				return num+=1
			}
		})
		if(num==0){
			$scope.delOk();
		}else{
			$scope.promptShow('确认提交？',false,'有'+ num +'道题未回答！');
		}
    };
	//提交试卷、存储进库
    $scope.delOk = function() {
		$scope.variablePacket.prompt = false;
 	 	var examSubmit = {};
		examSubmit.examId = $scope.variablePacket.packjectId;
		examSubmit.examAssemblyId = $scope.variablePacket.assemblyId;
		examSubmit.type=0;
		examSubmit.stuId = $scope.variablePacket.userId;
		examSubmit.stuName = $scope.variablePacket.userName;
		examSubmit.classId =  $scope.variablePacket.classId;
		examSubmit.startTime = $scope.examAssembly.stuStartTime;
		var questionArray = [];
		var questionObj = {};
		angular.forEach($scope.echoQuestion.single,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.judge,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.answerContent = e.notLearnAnswer;
			if(e.img!=null&&e.img.length>0){
				questionObj.answerImg = JSON.stringify(e.img);
			}
			questionArray.push(questionObj);
		})
		console.log(JSON.stringify(examSubmit));
		console.log(JSON.stringify(questionArray));
		var examSubmitJson = JSON.stringify(examSubmit);
		var submitConteJson = JSON.stringify(questionArray);
		var params = {examSubmitJson:examSubmitJson, submitConteJson:submitConteJson};
		console.log(JSON.stringify(params));
		$scope.variablePacket.prompt=false;
		$http.post(lessonIp+"stuExam/stuExamSubmit", params).success(function(data) {
			if(data.ret==200){
				$scope.wranShow('提交成功',true);
				$scope.variablePacket.stuState = 1;
				$scope.insertTest[$scope.variablePacket.TestIndex].stuState=1;
				$scope.getAssemblyInfo($scope.variablePacket.assemblyId);
			}else{
				$scope.wranShow('提交失败',false)
			}
		});
	}
	//试卷的切换
	$scope.TestTab = function(i, id, stuState) {
		$scope.variablePacket.TestIndex = i;
		$scope.variablePacket.ResLineIndex = -1;
		$scope.variablePacket.testpaperBox_pic = true; 
		$scope.variablePacket.ResourcesTypeShow_pic = false;
		console.log($scope.insertTest)
		$scope.variablePacket.titleName=$scope.insertTest[i].ResourceTit;
		$scope.variablePacket.stuState = stuState;
		//查询试卷
		$scope.getAssemblyInfo(id);
	};
	//上传图片
	$scope.filePhoto = function() {
		var index=$scope.variablePacket.uploadImg.Id;
		var imgFile = document.getElementsByClassName('FileInput')[index].files[0];
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.addEventListener("load", function(argument) {
			$scope.variablePacket.uploadImg.img.push(this.result);//给当前题目添加图片
            $scope.$apply();
		});
        
	};
	$scope.filePhotoParent=function(i){   //求点击上传图片的下标
		$scope.variablePacket.uploadImg=i;
	};
	$scope.deleteImg=function(i,$index){  //删除图片
		i.img.splice($index,1)
	};
	$scope.collectTab=function(i){  //收藏状态切换
		 i.collect=!i.collect;
		 $scope.stuCollection(i.id, i.collect);
		 
	};
	//循环完成后
	$scope.renderFinish = function() {
		//滚动条调用
		angular.element(".zyx_ResourcesTypeShow").mCustomScrollbar({
			mouseWheelPixels: 1000, //滚动速度
			theme: "3d-dark" //滚动条样式
		});
	};
	//页面/弹层--查看答案及解析
	$scope.lookAnswer = function(type, index, answer) {
		$scope.echoQuestion[type][index].AnswerShow=!answer;
	};

	
	/************************************   以下是模拟的假数据  ****************************************/

	//资源弹层数据
	$scope.insertData = [
//		{
//			ResourceTit: '00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
//			ResourceSrc: 0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
//			TypeSrc: [
//				{'Src': 'resources_middle.jpg'},
//				{'Src': 'newsImg.jpg'},
//				{'Src': 'ad_1.jpg'},
//				{'Src': 'banner.png'}
//			]
//		}, {
//			ResourceTit: '11五年级五年级五年级五年级五年级语文期末试卷.ppt',
//			ResourceSrc: 1,
//			TypeSrc: [
//				{'Src': 'resources_middle.jpg'},
//				{'Src': 'newsImg.jpg'},
//				{'Src': 'resources_main.jpg'},
//				{'Src': 'banner.png'}
//			]
//		}, {
//			ResourceTit: '22五年级五年级五年级五年级五年级语文期末试卷.ppt',
//			ResourceSrc: 2,
//			TypeSrc: [
//				{'Src': 'newsImg.jpg'}]
//		}, {
//			ResourceTit: '33五五年级五年级五年级五年级年级语文期末试卷.ppt',
//			ResourceSrc: 3,
//			TypeSrc: [
//				{'Src': 'banner.png'}]
//		}];
//	
//		//卷库弹层的数据
//		$scope.insertTest = [{
//			
//			ResourceTit: '111五年级语文期末试卷'
//	
//		}, {
//			ResourceTit: '222五年级语文期末试卷'
//			
//		}, {
//			
//			ResourceTit: '333五年级语文期末试卷'
//		}, {
//			
//			ResourceTit: '444五年级语文期末试卷'
//			
//		}
	];

	//习题的数据
	$scope.echoQuestion = {
//		//单选
//		single : [
//			{
//				Id:0, 
//				Type:'single', //题型
//				AnswerShow:false, //默认答案不显示
//				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
//				Answer:'B', //答案
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
//				myAnswer:'A',//已提交我的答案
//				icon:"error",//我的答案--图片
//				notLearnAnswer:"",//未提交时我的答案
//				collect:true //收藏状态，适用于导学
//			
//			},{
//				Id:1,
//				Type:'single',
//				AnswerShow:false,
//				queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//				Answer:'C',
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				myAnswer:'C',
//				icon:"correct",
//			    collect:false
//			},{
//				Id:2,
//				Type:'single',
//				AnswerShow:false,
//				queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//				Answer:'C',
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:'B',
//				icon:"correct",
//				notLearnAnswer:"",
//				collect:true
//			}
//			
//		],
//
//		//判断
//		judge : [
//			{
//				Id:0,
//				Type:'judge', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'111天上有2个太阳吗？', //题干
//				Answer:'对',//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:'错',//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//			    collect:true
//			},{
//				Id:1,
//				Type:'judge', 
//				AnswerShow:false,
//				queTit:'222你是谁？我是谁？是游戏吗？',
//				Answer:'对',
//				Analysis:'是是是是',
//				myAnswer:'对',
//				icon:"correct",
//				notLearnAnswer:"",//未提交时我的答案
//				collect:false
//			}
//		],
//		//简答
//		briefAnswer : [
//			{
//				Id:0,
//				Type:'briefAnswer', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'为什么李白特别钟情于庐山？', //题干
//				Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
//				postil:"继续努力",
//				notLearnAnswer:"",//未提交时我的答案
//				collect:true,
//				img:[]
//			},{
//				Id:1,
//				Type:'briefAnswer', 
//				AnswerShow:false,
//				queTit:'你是谁？我是谁？是游戏吗？',
//				Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis:'是是是是',
//				myAnswer:[{'daan':'山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视山原旷其盈视','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
//				postil:"继续努力",
//				notLearnAnswer:"",//未提交时我的答案
//				collect:true,
//				img:[]
//			},{
//				Id:2,
//				Type:'briefAnswer', 
//				AnswerShow:false,
//				queTit:'为什么李白特别钟情于庐山？',
//				Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis:'是是是是',
//				myAnswer:[{'daan':'山原旷其盈视','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
//				postil:"继续努力，哈哈哈。加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒,加油，你最棒。",
//				notLearnAnswer:"",//未提交时我的答案
//				collect:true,
//				img:["img/10.png"]
//			}
//		],
//		"comment":"考的不错，继续加油" //练习总评
		
	  
	};
   /************************************************作业*********************************************/
   $scope.getExamInfo = function(){
		$scope.insertData = [];
		$scope.insertTest = [];
		var url = lessonIp + 'stuExam/getExamInfo?examId='+$scope.variablePacket.packjectId+"&stuId="+$scope.variablePacket.userId
		$http.get(url).success(function(response){
			if(response.ret == 200){
				//资源
				$scope.variablePacket.name = response.data.name;
				$scope.variablePacket.chapterNames = response.data.treeNames;
				$scope.variablePacket.createDate = response.data.createTime;
				var resourceList = response.data.resourceList;
				if(resourceList != null && resourceList.length > 0){
					angular.forEach(resourceList, function(item,index){
						//item.id; item.examId; item.resourceId; item.name; item.type; item.userType; item.userId; item.resType; item.createTime;
						var resource = {};
						$http.get(resourcesIp+'/a/resource/'+item.resourceId+'?token='+token).success(function (data){
					        if(data.code == 200){
								resource.ossFileName = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
								resource.resourceId = item.resourceId;
								resource.resourceType = data.data.objId;
								resource.resourceName = item.name;
								$scope.insertData.push(resource);
								if(index==0){
									$scope.ResLineTab(0,$scope.insertData[0].resourceType,$scope.insertData[0].ossFileName)
								}
					        }
						})
					});
				} else {
					$scope.variablePacket.ResourcesTypeShow_line = false;
				}
				//试卷
				var examAssembly = response.data.examAssembly;
				if(examAssembly != null && examAssembly.length > 0){
					angular.forEach(examAssembly, function(item, index){
					    var test = {};
					    test.sign = false, //加减号
						test.ResourceTit = item.name; //标题
						test.num = index; //记录点击的第几个
						test.id = item.id;
						test.stuState = item.stuState;
						$scope.insertTest.push(test)
					});
					//首条试卷详情
					if(resourceList == null || resourceList.length == 0){
						$scope.variablePacket.stuState = examAssembly[0].stuState;
						$scope.variablePacket.TestIndex = 0;
						$scope.getAssemblyInfo(examAssembly[0].id);
					}
				} else {
					$scope.variablePacket.testpaperBox_line = false;
				}
			}
		});
	}
   //查询任务内容and学生回答
	$scope.getAssemblyInfo = function(assemblyId){
		$scope.variablePacket.assemblyId = assemblyId;
		var url = lessonIp+"stuExam/getAssemblyInfo?assemblyId="+assemblyId;
		if($scope.variablePacket.stuState!=0){
			url += "&stuId="+$scope.variablePacket.userId;
		}
		$scope.echoQuestion = {};
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var examAssembly = result.data;
				$scope.examAssembly = examAssembly;
				$scope.variablePacket.previewUrl = examAssembly.previewUrl;
				var questionMap = examAssembly.questionMap;
				$scope.variablePacket.assemblyName = examAssembly.name;
				for(var t=0,tlen=questionMap.length; t<tlen; t++){
					var key = questionMap[t].typeId;
					var questionList = questionMap[t].questions;
					var english = idToEnglish(key);
					var valueArray = [];
					var valueObject = {};
					for(var i=0; i<questionList.length; i++){
						valueObject = {};
						var question = questionList[i];
						//资源
						var resourceJson = question.resourceJson;
						var resourceFlag = false;
						var resourceArray = [];
						var resourceObject = {};
						if(resourceJson!=""&&resourceJson!="[]"){
							resourceFlag = true;
							var resourceList =  JSON.parse(resourceJson);//转换为json对象
							for(var j=0;j<resourceList.length;j++){
								resourceObject = {};
								var resource = resourceList[j];
								resourceObject.ResourceTit = resource.name;
								resourceObject.ResourceRid = resource.rid;
								resourceObject.ResourceSrc = resource.type;
								resourceArray.push(resourceObject);
							}
						}
						var answerShow = false;
						valueObject.Id = i;
						valueObject.id = question.qid;
						valueObject.submitContentId=question.submitContentId;
						valueObject.Type = english; //题型
						valueObject.CanResource = resourceFlag ;//是否显示资源
						valueObject.Resource = resourceArray; //插入带过来的资源数据
						valueObject.AnswerShow = answerShow; //默认答案不显示
						valueObject.queTit = question.body; //题干
						valueObject.Answer = checkAnswer(question.answer, key); //答案
						var img = [];
						for(var m=0; m<question.myAnswerImg.length; m++){
							var imgSrc = examAssembly.previewUrl+question.myAnswerImg[m];
							img.push(imgSrc);
						}
						valueObject.img = img;
						valueObject.Analysis = question.analysis;//解析
						valueObject.sort = question.sort;//排序
						valueObject.collect = question.collection==1?true:false;
						if($scope.variablePacket.stuState==0){
							valueObject.notLearnAnswer="";
						}else{
							valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
							valueObject.icon = question.icon;//我的答案--已学习图片
							valueObject.comment = question.comment;
						}
						valueArray.push(valueObject);
					}
					$scope.echoQuestion[english] = valueArray;
				}
				$scope.echoQuestion.comment = examAssembly.comment;
			}
		});
	}
   
   function idToEnglish(type){
		switch (type) {
            case "2":
            	return "single";
           		break;
       		case "1":
            	return "judge";
           		break;
            case "6":
            	return "briefAnswer";
           		break;
            default:
            	break;
        }
	}
   
   //校验答案格式
	function checkMyAnswer(myAnswer, icon, type, answer, state){
		switch (type) {
            case "2":
            case "6":
            	return myAnswer;
           		break;
       		case "1":
       			if(myAnswer=="T"){
       				return "正确"
       			}else if(myAnswer=="F"){
       				return "错误";
       			}else{
       				return "";
       			}
       			break;
            default:
            	break;
        }
	}
	//校验答案格式
	function checkAnswer(answer, type){
		switch (type) {
            case "2":
            case "6":
            	return answer;
           		break;
       		case "1":
       			if(answer=="T"){
       				return "正确"
       			}else if(answer=="F"){
       				return "错误";
       			}else{
       				return "";
       			}
       			break;
            default:
            	break;
        }
	}
	
	//作业类型学生完成
	$scope.stuAllSubmit = function(){
		$http.post(lessonIp + 'stuExam/stuAllSubmit?id='+$scope.variablePacket.packjectId+"&&stuId="+$scope.variablePacket.userId).success(function (data){
			if(data.ret == 200){
				$scope.wranShow('提交成功',true);
				$timeout(function(){$state.go("secondNav.studentHomeworkList",{stage:"inClass"})},1500)
			}
	    })
	}
	//学生收藏、取消收藏
	$scope.stuCollection = function(qid, collection){
		var params = {};
		params.stuId = $scope.variablePacket.userId;
		params.examId = $scope.variablePacket.packjectId;
		params.assemblyId = $scope.variablePacket.assemblyId;
		params.qid = qid;
		params.collection = collection==true?0:1;
		$http.post(lessonIp + 'wrongQuestion/stuCollection', params).success(function (data){
			var value = "取消收藏";
			if(collection){
				value = "收藏";
			}
			if(data.ret == 200){
				$scope.wranShow(value+'成功',true);
			}else{
				$scope.wranShow(value+'失败',false);
			}
	    })
	}
   /************************************************导学*********************************************/
   
   /**
	 * 根据导学id查询导学详情
	 */
	$scope.guidanceList = function(guidanceId){
		$http.get(guidanceLearningIp + 'learn?id='+guidanceId+'&studentId='+sessionStorage.getItem("userId")).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.guidanceSituation=data.data[0];
				console.log($scope.variablePacket.guidanceSituation);
				$scope.variablePacket.name= $scope.variablePacket.guidanceSituation.guidanceLearn.name;
				$scope.variablePacket.chapterNames=$scope.variablePacket.guidanceSituation.guidanceLearn.memoriesChapterNames;
				$scope.variablePacket.createDate=$scope.variablePacket.guidanceSituation.guidanceLearn.createDate;
				$scope.insertData = [];
				$scope.insertTest = [];
				//资源列表
				if($scope.variablePacket.guidanceSituation.guidanceResource.sendResource.resource.length > 0){
					$scope.insertData = $scope.variablePacket.guidanceSituation.guidanceResource.sendResource.resource;
					console.log($scope.insertData)
				}else{
					$scope.variablePacket.ResourcesTypeShow_line = false;
				}
				//试卷列表
				if($scope.variablePacket.guidanceSituation.guidanceResource.sendResource.testQuestionsResource.length > 0){
					var quz = [];
					quz= $scope.variablePacket.guidanceSituation.guidanceResource.sendResource.testQuestionsResource;
					console.log(quz)
					angular.forEach(quz, function(item, index){
						var test = {};
					    test.sign = false, //加减号
						test.ResourceTit = item.resourceName; //标题
						test.num = index; //记录点击的第几个
						test.id = item.ossFileName;
						test.stuState = item.studyState;
						$scope.insertTest.push(test);
						if(index == 0){
							$scope.TestTab(0,item.ossFileName,item.studyState);
						}
					});
					console.log($scope.insertTest)
				}else{
					if($scope.variablePacket.guidanceSituation.guidanceResource.sendResource.resource.length > 0){
						$scope.ResLineTab(0,$scope.insertData[0].resourceType,$scope.insertData[0].ossFileName)
					}
					$scope.variablePacket.testpaperBox_line = false;
				}
			}
	    })
	}
   
   
   /**
	 * 切换资源展示
	 * @param {Object} index
	 * @param {Object} typeSrc  资源类型
	 * @param {Object} ossFileName    oss中资源id
	 * 郭峪诚
	 */
	$scope.ResLineTab = function(index, typeSrc,ossFileName) {
		//试卷选中置为-1
		$scope.variablePacket.TestIndex = -1;
		
		$scope.variablePacket.testpaperBox_pic = false; 
		$scope.variablePacket.ResourcesTypeShow_pic = true;
		$scope.variablePacket.ResLineIndex = index;
		$scope.variablePacket.ResLineTab = index;
		//根据filename查询播放展示路径
		var ossId = ossFileName;
		if(ossFileName.indexOf("_360")>0){
			ossId = ossFileName.substring(0,ossFileName.indexOf("_"));
		}
		$http.get(ossIp + 'filelog/'+ossId).success(function (data){
			if(data.code == 200){
				console.log(data)
				$scope.variablePacket.resourceName = data.data.name;
				$scope.variablePacket.resourceDetail=data.data;
				$scope.variablePacket.convertState = data.data.state;
				console.log("转码状态："+$scope.variablePacket.convertState);
				console.log("文件类型："+typeSrc);
				if(typeSrc==2){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$("#showplayer").show();
					$scope.variablePacket.ResLineType = "music";
					var fls = flashChecker();
					console.log("flash提醒："+fls.f)
					if(fls.f==0) {
						//显示flash提醒
						$("#flashTest").show();
					} else {
						$("#flashTest").hide();
						console.log(data.data.pathmp3PC)
						console.log(data.data.pathmp3PAD)
						audioSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							//file: vpath,
							height: 398,
							width: "100%",
							autostart: true,
							playlist: [{
								sources: [{
									file: data.data.pathmp3PC
								}, {
									file: data.data.pathmp3PAD
								}]
							}],
							androidhls: "true"
						});
						audioSTOP.onComplete(function(){
							$(".jw-display-icon-container").css({"pointer-events":"none"});
						})
					}
				}else if(typeSrc==1 || typeSrc==8 || typeSrc==9){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$("#showplayer").show();
					var fls = flashChecker();
					console.log("视频播放")
					$scope.variablePacket.ResLineType = "video";
					$scope.variablePacket.videoPath = $scope.variablePacket.resourceDetail.previewUrl;
					if(fls.f==0) {
						//显示flash提醒
						$("#flashTest").show();
					} else {
						$("#flashTest").hide();
						console.log(data.data.pathmp4PC)
						console.log(data.data.pathmp4PAD)
						playerSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							//file: vpath,
							height: 398,
							width: "100%",
							autostart: true,
							playlist: [{
								sources: [{
									file: data.data.pathmp4PC
								}, {
									file: data.data.pathmp4PAD
								}]
							}],
							androidhls: "true"
						});
						playerSTOP.onComplete(function(){
							$(".jw-display-icon-container").css({"pointer-events":"none"});
						})
					}
				}else if(typeSrc==3){
					$("#pdfPlay").hide();
					$("#showplayer").hide();
					$("#tupian").show();
					$scope.variablePacket.ResLineType = "pic";
					$scope.variablePacket.imagePath = $scope.variablePacket.resourceDetail.previewUrl;
//					$scope.scrollbar();
					$("#flashTest").hide();
				}else{
					$("#tupian").hide();
					$("#showplayer").hide();
					$("#pdfPlay").show();
					$scope.variablePacket.ResLineType = "pdf";
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF;
					console.log("common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF);
					console.log($scope.variablePacket.pdfPath);
					$("#flashTest").hide();
				}
			}
	    })
	}
   
   /**
	 * 看是否有flash插件
	 * 郭峪诚
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
	 * 导学全部提交，后台接口
	 */
	$scope.updateAllDate = function(){
		$http.post(guidanceLearningIp + 'sendRecord?id='+$scope.variablePacket.packjectId+"&&studentId="+$scope.variablePacket.userId).success(function (data){
			console.log(data)
			if(data.ret == 200){
				$scope.wranShow('提交成功',true);
				$timeout(function(){$state.go("secondNav.studentGuideList",{stage:"inClass"})},1500)
			}
	    })
	}
   
    /************************************************公共*********************************************/
    console.log($scope.variablePacket.state)
    if($scope.variablePacket.state == 'notSubmitted'){
		$scope.variablePacket.finishState = true;
	}else{
		$scope.variablePacket.finishState = false;
	}
    if($scope.variablePacket.type == "guidance"){
   		console.log($scope.variablePacket.state)
   		$scope.guidanceList($scope.variablePacket.packjectId);
	}else{
   		console.log("作业详情")
   		$scope.getExamInfo();
    }
   
   /**
    * 全部提交
    */
    $scope.finishAll = function(){
   		//默认为true，可以提交
   		$scope.variablePacket.submitFlag = true;
	   	/**
	   	 * 判断是否以后试卷未提交
	   	 */
		if($scope.insertTest.length>0){
   			angular.forEach($scope.insertTest, function(item, index){
   				console.log(item.stuState)
				if(item.stuState == 0){
					$scope.variablePacket.submitFlag = false;
				}
			});
   		}
		/**
		 * 判断是否可以全部完成
		 */
		if($scope.variablePacket.submitFlag){
	   		if($scope.variablePacket.type == "guidance"){
	   			console.log("导学完成");
	   			$scope.updateAllDate();
		    }else{
		   		console.log("作业完成")
		   		$scope.stuAllSubmit();
		    }
		}else{
			$scope.wranShow('你有试卷未提交！', false);
		}
   }
   //*********************************上传************************************
   	//上传资源弹框
	$scope.resourceUploadFn = function (index){
		angular.element('.zy_resource_upload_box').css('display','block');
		$scope.variablePacket.resourceUpload = true;
		$scope.variablePacket.uploadQuestionIndex = index;
		$("#theList .itemDel").click();
		$(".itemStop").hide();
		$("#wenjian").hide();
		$(".itemUpload").hide();
		$(".itemDel").hide();
	};
	
	//上传资源弹框提交按钮
	$scope.submitFn = function (){
		uploader.upload();
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
//				UploadComlate(file);
			}
		}
	});

	var uploader = WebUploader.create({
		swf: "Uploader.swf",
		server: backEndUrl,
		pick: "#picker",
		resize: false,
		dnd: "#theList",
		paste: document.body,
		disableGlobalDnd: true,
		accept: {// 只允许选择图片文件格式
            title: 'file',
            extensions: 'png,jpg,jpeg',
            mimeTypes: 'image/!*'
//          extensions: 'vob,rm,mkv,wmv,mpg,avi,f4v,flv,mov,mpeg,3gp,mp4,mp3,jpg,jpeg,png,gif,doc,docx,xls,xlsx,ppt,pptx'
       },
		thumb: {
			width: 100,
			height: 100,
			quality: 70,
			allowMagnify: true,
			crop: true
			, type: "image/jpeg"
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
		$("#picker").attr("style","display:none;")		// 上传成功后 隐藏加号
		$("#wenjian").attr("style","display:none;")	

		$("#theList").html('<li id="' + file.id + '">' +
			'<img /><span>' + file.name + '</span><span class="itemUpload">上传</span><span class="itemStop">暂停</span><span class="itemDel">删除</span>' +
			'<div class="percentage"></div>' +
			'</li>');

		var $img = $("#" + file.id).find("img");

		uploader.makeThumb(file, function(error, src) {
			var html = $("#theList li").find("span").eq(0).html();
			var index = html.indexOf(".");
			format = html.slice(index + 1);
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
		            case 'pdf':
		                src= "img/resources_pdf.png";
		                userInfo.objId = 4;
		                break;
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
				};
           
			$img.attr("src", src);
			var img = $("#theList li img").clone();
			var itemDel = $("#theList li .itemDel").clone(true);
			$("#theList li").prepend("<div class='fileparent'></div>");

			$(".fileparent").append(img).append(itemDel);
			$("#theList li>img").remove();
			$("#theList li>.itemDel").remove();
		});

	});

//		$("#theList").on("click", ".itemUpload", function() {
//			console.log("2")
//			uploader.upload();
//	
//			//"上传"-->"暂停"
//			$(this).hide();
//			$(".itemStop").show();
//		});

	$("#theList").on("click", ".itemStop", function() {
		uploader.stop(true);

		//"暂停"-->"上传"
		$(this).hide();
		$(".itemUpload").show();
	});

	//todo 如果要删除的文件正在上传（包括暂停），则需要发送给后端一个请求用来清除服务器端的缓存文件
	$("#theList").on("click", ".itemDel", function() {
		uploader.removeFile($(this).parents("li").attr("id"));  //从上传文件列表中删除
		$(this).parents("li").remove(); 						//从上传列表dom中删除
		$("#picker").attr("style","display:block;")				// 删除后显示加号
		$("#wenjian").attr("style","display:block;")	
		
	});

	uploader.on("uploadProgress", function(file, percentage) {
		$("#" + file.id + " .percentage").text(percentage * 100 + "%");
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
			alert("系统提示", "请不要重复选择文件！");
		} else if(type == "Q_EXCEED_SIZE_LIMIT") {
			alert("系统提示", "<span class='C6'>所选附件总大小</span>不可超过<span class='C6'>" + allMaxSize + "M</span>哦！<br>换个小点的文件吧！");
		} else if(type == "Q_TYPE_DENIED") {
			alert("系统仅支持jpg,jpeg,png文件，其他类型不支持");
		} else if(type == "F_EXCEED_SIZE") {
			alert("单文件大小超过1G");
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
		var img = $scope.echoQuestion.briefAnswer[$scope.variablePacket.uploadQuestionIndex].img;
		img.push("/"+file.createDateStr+"/"+file.fileName);
		$("#theList .itemDel").click();
		$(".itemStop").hide();
		$("#wenjian").hide();
		$(".itemUpload").hide();
		$(".itemDel").hide();
		$scope.variablePacket.resourceUpload = false;
		$scope.$apply(); //手动刷新
	};
   
   
}]);


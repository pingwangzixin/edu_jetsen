app.controller('homeworkStudentSituationCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//先取值
	var examId = JSON.parse(sessionStorage.getItem("teaExamInfo")).examId;
	var classId = JSON.parse(sessionStorage.getItem("teaExamInfo")).classId;
	$scope.stuInfo = {
		stuId:"",
		stuName:"",
		stuState:"",
		examAssemblyName:""
	}
	//变量包
	$scope.variablePacket = {
		stuList : {						
			notRead:[],	//[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			alreadyRead:[],	//[{name:'文学'},{name:'说的'},{name:'你丫的'}],
			noSub:[]	//[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		},				//学生列表
		testState : $location.$$search.state,		//页面状态 underWay:进行中		Finished:已结束 
		testTYpe : $stateParams.type,//$location.$$search.type,		//exercises:习题		testPaper:习题		answerCard:答题卡
		titFixed:false,//吸顶样式
		queIndex:0,//8种题型的默认选中
		AnswerCardMask:false,//查看试卷添加遮盖层
		LookCardActive:false,//控制查看试卷后的图标
		LookAnswerCard:false,//试卷模块是否显示
		IfRelative:false,//是否相对定位
		ifLines:true//题型模块是否吸顶
	};
	
	//导学内容---习题的数据
	$scope.echoQuestion = {
//		//试卷信息
//		assembly:{},
//		//标题
//		title: [],
//		//单选
//		single : [
//			{
//				Id:0, 
//				Type:'single', //题型
//				AnswerShow:false, //默认答案不显示
//				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
//				Answer:'B', //答案
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
//				myAnswer:'A',//学生答案--选项
//				icon:"error",//学生答案--图片
//			}
//			
//		],
//		//多选
//		many : [
//			{
//				Id:0,
//				Type:'many', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
//				Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
//				myAnswer:['D','A'],//学生答案--选项
//				icon:"error",//学生答案--图片
//			}
//		],
//		//判断
//		judge : [
//			{
//				Id:0,
//				Type:'judge', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'111天上有2个太阳吗？', //题干
//				Answer:'错误',//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:'正确',//学生答案--选项
//				icon:"error",//学生答案--图片
//			},
//		],
//		//填空
//		fillIn : [
//			{
//				Id:0,
//				Type:'fillIn', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
//				Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。',//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//学生答案--选项
//			}
//		],
//		//材料
//		material : [
//			{
//				Id:0,
//				Type:'material', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'为什么李白特别钟情于庐山？', //题干
//				Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//---学生答案
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
//				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//---学生答案
//			}
//		],
//		//完形填空
//		clozeCloze : [
//			{
//				Id:0,
//				Type:'clozeCloze', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
//				Answer:[{daan:'A'},{daan:'B'}],//答案
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//---学生答案
//			}
//		],
//		//阅读理解
//		reading : [
//			{
//				Id:0,
//				Type:'reading', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
//				Analysis:'天上有一个太阳',//解析
//				myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],//---学生答案
//			}
//		]
	}
	
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
//				if($scope.stuInfo.stuId!=""){
				//查询作业详情
				$scope.findStuExamList();
//				}
				var classStuCount = 0;
				var subStuCount = 0;
				var noSubStuCount = 0;
				if(data.wtj!=undefined){
					classStuCount += data.wtj.length;
					noSubStuCount = data.wtj.length;
				}
				if(data.ytj!=undefined){
					classStuCount += data.ytj.length;
					subStuCount += data.ytj.length;
				}
				if(data.ypg!=undefined){
					classStuCount += data.ypg.length;
					subStuCount += data.ypg.length;
				}
				JSON.parse(sessionStorage.getItem("teaExamInfo")).submitInfo="班级情况（班级总人数："+classStuCount+"人    提交作业人数："+subStuCount+"人    未提交作业人数："+noSubStuCount+"人）";
			}
		});
	}
	
	//作业内容
	var examData = {};
	$scope.examSubmit = {};
	//查询任务内容and学生回答
	$scope.findStuExamList= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId;
		if($scope.stuInfo.stuId!=''){
			url += "&stuId="+$scope.stuInfo.stuId;
		}
		$http.get(url).success(function(result) {
			if(result.ret==200){
				examData = result.data;
				$scope.examSubmit = examData.examSubmit;
				var titles = "";
				if(examData.examType==0){
					var examQuestionMap = examData.examQuestionMap;
					for(var t=0,tlen=examQuestionMap.length; t<tlen; t++){
						var key = examQuestionMap[t].typeId;
						titles+=","+key;
						var questionList = examQuestionMap[t].questions;
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
							if($scope.variablePacket.state=="submission"){
								answerShow = true;
							}
							valueObject.Id = i;
							valueObject.id = question.qid;
							valueObject.submitContentId=question.submitContentId;
							valueObject.Type = english; //题型
							valueObject.type = key;
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = checkAnswer(question.answer, key); //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							if($scope.stuInfo.stuId!=''){
								valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
								valueObject.icon = question.icon;//我的答案--已学习图片
								valueObject.comment = question.comment;
							}
//							valueObject.myAnswer = question.myAnswer;//我的答案--已学习选项
//							valueObject.icon = question.icon;//我的答案--已学习图片
//							valueObject.notLearnAnswer ="";//未学习---答案
							valueArray.push(valueObject);
						}
						$scope.echoQuestion[english] = valueArray;
					}
					titles=titles.substring(1);
					$scope.echoQuestion.title = checkTitle(titles);
				}else if(examData.examType==1){
					var questionMap = examData.examAssembly.questionMap;
					$scope.stuInfo.examAssemblyName = examData.examAssembly.name;
					$scope.echoQuestion.assembly = examData.examAssembly;
					$scope.echoQuestion.title = checkTitle(questionMap);
					for(var t=0,tlen=questionMap.length; t<tlen; t++){
						var key = questionMap[t].typeId;
						titles+=","+key;
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
							if($scope.variablePacket.state=="submission"){
								answerShow = true;
							}
							valueObject.Id = i;
							valueObject.id = question.qid;
							valueObject.submitContentId=question.submitContentId;
							valueObject.Type = english; //题型
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = checkAnswer(question.answer, key); //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							if($scope.stuInfo.stuId!=''){
								valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
								valueObject.icon = question.icon;//我的答案--已学习图片
								valueObject.comment = question.comment;
							}
//							valueObject.myAnswer = question.myAnswer;//我的答案--已学习选项
//							valueObject.icon = question.icon;//我的答案--已学习图片
//							valueObject.notLearnAnswer ="";//未学习---答案
							valueArray.push(valueObject);
						}
						$scope.echoQuestion[english] = valueArray;
					}
					titles=titles.substring(1);
					$scope.echoQuestion.title = checkTitle(titles);
				}else if(examData.examType==2){
					console.log("答题卡");
					var questionImgList = examData.examAssembly.questionImgList;
					$scope.stuInfo.examAssemblyName = examData.examAssembly.name;
					var questionMap = examData.examAssembly.questionOptionMap;
					$scope.echoQuestion.assembly = examData.examAssembly;
					for(var t=0,tlen=questionMap.length; t<tlen; t++){
						var key = questionMap[t].typeId;
						titles+=","+key;
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
							if(resourceJson!=""&&resourceJson!="[]"&&resourceJson!=undefined){
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
							if($scope.variablePacket.state=="submission"){
								answerShow = true;
							}
							valueObject.Id = i;
							valueObject.id = question.id;
							valueObject.submitContentId=question.submitContentId;
							valueObject.Type = english; //题型
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = checkAnswer(question.answer, key); //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							if($scope.stuInfo.stuId!=''){
								valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
								valueObject.icon = question.icon;//我的答案--已学习图片
								valueObject.comment = question.comment;
							}								
//							valueObject.myAnswer = question.myAnswer;//我的答案--已学习选项
//							valueObject.icon = question.icon;//我的答案--已学习图片
//							valueObject.notLearnAnswer ="";//未学习---答案
							valueArray.push(valueObject);
						}
						$scope.echoQuestion[english] = valueArray;
					}
					titles=titles.substring(1);
					$scope.echoQuestion.title = checkTitle(titles);
				}
			}
		});
	}
	
	//查询学生
	$scope.findStu();
	
	$scope.checkStuInfo = function(id, name, state){
		$scope.stuInfo.stuId = id;
		$scope.stuInfo.stuName = name;
		$scope.stuInfo.stuState = state;
		$scope.findStuExamList();
	}
	var submitFlag = false;
	//提交批改
	$scope.submitReadyOver = function(){
		if(submitFlag){
			return false;
		}
		//是否全部主观题都批阅
		var readyOverFlag = false;
		
		var examSubmitId = $scope.examSubmit.id;
		var comment = $scope.examSubmit.comment;
		var questionArray = questionArray = [];
		//单选题
		angular.forEach($scope.echoQuestion.single,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//多选题
		angular.forEach($scope.echoQuestion.many,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//判断题
		angular.forEach($scope.echoQuestion.judge,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//填空题
		angular.forEach($scope.echoQuestion.fillIn,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			var icon = "";
			e.myAnswer.forEach(function(v){
				if(v.icon==null||v.icon==""){
					readyOverFlag = true;
				}
				icon+=","+v.icon;
			})
			icon = icon.substring(1);
			questionObj.score = icon;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//材料题
		angular.forEach($scope.echoQuestion.material,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			var icon = e.icon;
			if(icon==null||icon==""){
				readyOverFlag = true;
			}
			questionObj.score = icon;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//简答题
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			var icon = e.icon;
			if(icon==null||icon==""){
				readyOverFlag = true;
			}
			questionObj.score = icon;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//完形填空
		angular.forEach($scope.echoQuestion.clozeCloze,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		//阅读理解
		angular.forEach($scope.echoQuestion.reading,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.comment = e.comment;
			questionArray.push(questionObj);
		})
		if(readyOverFlag){
			$scope.wranShow('未批阅完，不能提交',false);
			return false;
		}
		submitFlag = true;
		console.log(examId+"/"+examSubmitId+"/0/"+comment);
		var quesionArrayJson = JSON.stringify(questionArray);
		var params = {examId:examId, stuId:$scope.stuInfo.stuId, examSubmitId:examSubmitId,type:0,comment:comment,
						quesionArrayJson:quesionArrayJson};
		$http.post(lessonIp+"ExamCount/teaReadyOver", params).success(function(data) {
			submitFlag = false;
			if(data.ret==200){
				$scope.wranShow('批阅成功',true);
				stuId = '';
				//重新刷新、查询学生
				$scope.findStu();
			}else{
				$scope.wranShow('批阅失败',false);
			}
		});
	}
	
	//学生列表请求成功之后判断
	var borderLen = 0;
	angular.forEach($scope.variablePacket.stuList,function (e,i){
		borderLen += e.length;
		$scope.variablePacket.listBorder = borderLen % 2 ? false : true;
	});
	
	//查看试卷
	$scope.LookCard = function(){
		$scope.variablePacket.LookCardActive = !$scope.variablePacket.LookCardActive;
		$scope.variablePacket.AnswerCardMask = !$scope.variablePacket.AnswerCardMask;
		$scope.variablePacket.LookAnswerCard = !$scope.variablePacket.LookAnswerCard;
		
		if($scope.variablePacket.LookAnswerCard){
			$scope.variablePacket.ifLines = false;
			$scope.variablePacket.IfRelative = true;
		}else{
			$scope.variablePacket.ifLines = true;
			$scope.variablePacket.IfRelative = false;
		}
		$timeout(function(){
			angular.element(".zyx_LookAnswerCard").mCustomScrollbar({
				mouseWheelPixels : 1000,
				theme: "3d-dark"
			});
		});
		
	}
	
	//客观题的答题选项
	$scope.markExam = function(obj,index,type,id){
		angular.element(obj.target).addClass('active').siblings().removeClass('active');
		var judgeResult = angular.element(obj.target).attr('value');
		if(type=="fillIn"){
			$scope.echoQuestion[type][id].myAnswer[index].icon = judgeResult;
		}else{
			$scope.echoQuestion[type][id].icon = judgeResult;
		}
	}
	
	//8种题型锚点
	$scope.jump = function(id) {
		$scope.variablePacket.queIndex = id;
		var top = 0 ;
		top = document.getElementById(id).offsetTop
		if($scope.variablePacket.titFixed){
			top = document.getElementById(id).offsetTop;
		}else{
			top = document.getElementById(id).offsetTop - 80;
		}
		angular.element("html,body").animate({"scrollTop":top},600)
	}

	//吸顶
	var Top = document.getElementById('zyx_lines').offsetTop+50;
	window.onscroll = function() {
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if($scope.variablePacket.ifLines){
			if(scrollT >= Top) {
				$scope.$apply(function() {
					$scope.variablePacket.titFixed = true;
				});
			} else {
				$scope.$apply(function() {
					$scope.variablePacket.titFixed = false;
				});
			}
		}
	};
	
	
	//查看答案及解析
	$scope.lookAnswerEcho = function(type,index,answer){
		$scope.echoQuestion[type][index].AnswerShow = answer ? false : true;
	}
	
	//填空题答案类型的转换
	$scope.fillInArr = [];
	angular.forEach($scope.echoQuestion.fillIn, function(e, i) {
		$scope.fillInArr.push($scope.echoQuestion.fillIn[i].Answer.split("|"));
	})

	//材料题答案类型的转换
	$scope.materialArr = [];
	angular.forEach($scope.echoQuestion.material, function(e, i) {
		$scope.materialArr.push($scope.echoQuestion.material[i].Answer.split("|"));
	})

	//简答题答案类型的转换
	$scope.briefAnswerArr = [];
	angular.forEach($scope.echoQuestion.briefAnswer, function(e, i) {
		$scope.briefAnswerArr.push($scope.echoQuestion.briefAnswer[i].Answer.split("|"));
	})
	
	
	
	function idToName(type){
		switch (type) {
            case "2":
            	return "单选题";
           		break;
       		case "4":
            	return "多选题";
           		break;
       		case "1":
            	return "判断题";
           		break;
       		case "3":
            	return "填空题";
           		break;
            case "8":
            	return "材料题";
            	break;
            case "6":
            	return "简答题";
           		break;
           	case "7":
            	return "完形填空";
           		break;
           	case "5":
            	return "阅读理解";
           		break;
            default:
            	break;
        }
	}
	
	function idToEnglish(type){
		switch (type) {
            case "2":
            	return "single";
           		break;
       		case "4":
            	return "many";
           		break;
       		case "1":
            	return "judge";
           		break;
       		case "3":
            	return "fillIn";
           		break;
            case "8":
            	return "material";
            	break;
            case "6":
            	return "briefAnswer";
           		break;
           	case "7":
            	return "clozeCloze";
           		break;
           	case "5":
            	return "reading";
           		break;
            default:
            	break;
        }
	}
	
 	function checkTitle(titleObje){
		var title = [];
		var typeObject = {};
		if(titleObje.indexOf("2")!=-1){
			typeObject = {};
			typeObject.id = "2";
			typeObject.name = "单选题";
			typeObject.Type = "single";
			typeObject.show = true;
			typeObject.index = 0;
			title.push(typeObject);
		}
		if(titleObje.indexOf("4")!=-1){
			typeObject = {};
			typeObject.id = "4";
			typeObject.name = "多选题";
			typeObject.Type = "many";
			typeObject.show = true;
			typeObject.index = 1;
			title.push(typeObject);
		}
		if(titleObje.indexOf("1")!=-1){
			typeObject = {};
			typeObject.id = "1";
			typeObject.name = "判断题";
			typeObject.Type = "judge";
			typeObject.show = true;
			typeObject.index = 2;
			title.push(typeObject);
		}
		if(titleObje.indexOf("3")!=-1){
			typeObject = {};
			typeObject.id = "3";
			typeObject.name = "填空题";
			typeObject.Type = "fillIn";
			typeObject.show = true;
			typeObject.index = 3;
			title.push(typeObject);
		}
		if(titleObje.indexOf("8")!=-1){
			typeObject = {};
			typeObject.id = "8";
			typeObject.name = "材料题";
			typeObject.Type = "material";
			typeObject.show = true;
			typeObject.index = 4;
			title.push(typeObject);
		}
		if(titleObje.indexOf("6")!=-1){
			typeObject = {};
			typeObject.id = "6";
			typeObject.name = "简答题";
			typeObject.Type = "briefAnswer";
			typeObject.show = true;
			typeObject.index = 5;
			title.push(typeObject);
		}
		if(titleObje.indexOf("7")!=-1){
			typeObject = {};
			typeObject.id = "7";
			typeObject.name = "完形填空";
			typeObject.Type = "clozeCloze";
			typeObject.show = true;
			typeObject.index = 6;
			title.push(typeObject);
		}
		if(titleObje.indexOf("5")!=-1){
			typeObject = {};
			typeObject.id = "5";
			typeObject.name = "阅读理解";
			typeObject.Type = "reading";
			typeObject.show = true;
			typeObject.index = 7;
			title.push(typeObject);
		}
		return title;
	}	
	//校验答案格式
	function checkMyAnswer(myAnswer, icon, type, answer){
		switch (type) {
            case "2":
            case "8":
            case "6":
            	return myAnswer;
           		break;
       		case "4":
       			return myAnswer.split(",");
       		case "1":
       			if(myAnswer=="T"){
       				return "正确"
       			}else if(myAnswer=="F"){
       				return "错误";
       			}else{
       				return "";
       			}
       			break;
       		case "3":
       			var asplit = answer.split("|");
       			var split = myAnswer.split("|");
       			var iconSplit = [];
       			if($scope.stuInfo.stuState=="readyOver"){
       				iconSplit = icon.split(",");
       			}
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<asplit.length; i++){
       				maObj = {};
       				if(split.length<=i){
       					maObj.daan = "";
       				}else{
       					maObj.daan = split[i];
       				}
       				if($scope.stuInfo.stuState=="readyOver"){
       					maObj.icon = iconSplit[i];
       				}else{
       					maObj.icon = "";
       				}
       				maArray.push(maObj);
       			}
            	return maArray;
			case "7":
           	case "5":
            	var split = myAnswer.split(",");
            	var iconSplit = icon.split(",");;
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<split.length; i++){
       				maObj = {};
       				maObj.daan = split[i];
       				maObj.icon = iconSplit[i];
       				maArray.push(maObj);
       			}
            	return maArray;
           		break;
            default:
            	break;
        }
	}
	//校验答案格式
	function checkAnswer(answer, type){
		switch (type) {
            case "2":
			case "8":
            case "6":
            	return answer;
           		break;
           	case "4":
           		return answer.split(",");
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
       		case "3":
       			var split = answer.split("|");
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<split.length; i++){
       				maObj = {};
       				maObj.daan = split[i];
       				maArray.push(maObj);
       			}
            	return maArray;
			case "7":
           	case "5":
            	var split = answer.split(",");
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<split.length; i++){
       				maObj = {};
       				maObj.daan = split[i];
       				maArray.push(maObj);
       			}
            	return maArray;
           		break;
            default:
            	break;
        }
	}
	
	
	 //插入资源回显弹层--开启
	$scope.insertResource = function(resourceName) {
		console.log(11111)
		if(resourceName.objId==undefined){
			$http.get(resourcesIp+'/a/resource/'+resourceName.ResourceRid+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
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
    return function(objId) {
        var icon = "";
        switch(objId)
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
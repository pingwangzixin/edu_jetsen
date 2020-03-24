app.controller('studentHomeworkDetailsTestPaperCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	
	//接收参数
	var stuExamInfo = JSON.parse(sessionStorage.getItem("stuExamInfo"))
	var examId = stuExamInfo.examId;
	var stuId = stuExamInfo.stuId;
	var stuName = stuExamInfo.stuName;
	var classId = stuExamInfo.classId;
	var className = stuExamInfo.className;
	//变量包
	$scope.variablePacket = {
		state:$stateParams.state,//unsubmitted：未提交；submission：已提交；
		type:$stateParams.type,//exercises:习题		testPaper:试卷
		titFixed:false,//吸顶样式
		queIndexEcho:0,//导学内容---8种题型的默认选中
		className:className,
		subTime:'',
		examName:''
	}
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
//				Type:'single',
//				CanResource:true,//是否显示资源
//				Resource: [{
//						ResourceTit: '粉红色的很费时间的方式粉红色的很费时间的方式粉红色的很费时间的方式',
//						ResourceSrc: 2,
//						ResourceNum: 2
//				}], //插入带过来的资源数据
//				AnswerShow:false,
//				AnswerShow:false, //默认答案不显示
//				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
//				Answer:'B', //答案
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节明细
//				myAnswer:'B',//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//				notLearnAnswer:""//未学习---答案
//			}
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
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:['D','A'],//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}//未学习---答案
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
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:'正确',//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//				notLearnAnswer:''//未学习---答案
//			}
//		],
//		//填空
//		fillIn : [
//			{
//				Id:0,
//				Type:'fillIn', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
//				Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//答案
//				Analysis:'天上有一个太阳',//解析
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
//				myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//我的答案--已学习选项
//				notLearnAnswer:''//未学习---答案
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
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
//				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
//				notLearnAnswer:''//未学习---答案
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
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
//				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
//				notLearnAnswer:''//未学习---答案
//			}
//		],
//		//完形填空
//		clozeCloze : [
//			{
//				Id:0,
//				Type:'clozeCloze', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
//				Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
//				Analysis:'天上有一个太阳',//解析
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
//				myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//已学习---我的答案
//				notLearnAnswer:[{daan:''},{daan:''}]//未学习---答案
//			}
//		],
//		//阅读理解
//		reading : [
//			{
//				Id:0,
//				Type:'reading', //题型
//				AnswerShow:false,//默认答案不显示
//				queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
//				Analysis:'天上有一个太阳',//解析
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
//				myAnswer:[
//					{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},
//					{'tit':'反对党的看法？','testDaan':'低分化的'},
//					{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}
//				],//已学习---我的答案
//				notLearnAnswer:[//未学习---答案
//					{tit:'说说你对未来的看法？',edit:'',editShow:true},
//					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:'',daanShow:true},
//					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:'',daanShow:true},
//					{tit:'你害怕鬼怪吗？',edit:'',editShow:true},
//					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:'',daanShow:true},
//					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:'',daanShow:true}
//				]
//			}
//		]
	}
	
	//作业内容
	var examData = {};
	//查询任务内容and学生回答
	$scope.findStuExamList= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId;
		if($stateParams.state!="unsubmitted"){
			url += "&stuId="+stuId;
		}
		$http.get(url).success(function(result) {
			if(result.ret==200){
				examData = result.data;
				$scope.variablePacket.examName = examData.name;
				$scope.variablePacket.subtime = examData.startTime+"至"+examData.endTime;
				$scope.variablePacket.remark = examData.remark;
				
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
							valueObject.Type = english; //题型
							valueObject.type = key;
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = question.answer; //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							if($scope.variablePacket.state=='unsubmitted'){
								valueObject.notLearnAnswer = checkNotLearnAnswer(question.optionNum, key);//未学习---答案
							}else{
								valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer, $stateParams.state)//我的答案--已学习选项
								valueObject.icon = question.icon;//我的答案--已学习图片
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
				}else{
					$scope.echoQuestion.assembly = examData.examAssembly;
					var questionMap = examData.examAssembly.questionMap;
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
							valueObject.Type = english; //题型
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = question.answer; //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							if($scope.variablePacket.state=='unsubmitted'){
								valueObject.notLearnAnswer = checkNotLearnAnswer(question.optionNum, key);//未学习---答案
							}else{
								valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer, $stateParams.state)//我的答案--已学习选项
								valueObject.icon = question.icon;//我的答案--已学习图片
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
	
	//保存
	$scope.delOk = function(){
		var examSubmit = {};
		examSubmit.examId = examData.id;
		examSubmit.type=0;
		examSubmit.stuId = stuId;
		examSubmit.stuName = stuName;
		examSubmit.classId = classId;
		examSubmit.startTime = examData.stuStartTime;
		var questionArray = [];
		var questionObj = {};
		angular.forEach($scope.echoQuestion.single,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.many,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			var answerContent = "";
			if(e.notLearnAnswer.daanA){
				answerContent+=",A";
			}
			if(e.notLearnAnswer.daanB){
				answerContent+=",B";
			}
			if(e.notLearnAnswer.daanC){
				answerContent+=",C";
			}
			if(e.notLearnAnswer.daanD){
				answerContent+=",D";
			}
			answerContent = answerContent.substring(1);
			questionObj.answerContent = answerContent;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.judge,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.fillIn,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.material,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			questionObj.answerContent = e.notLearnAnswer;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.clozeCloze,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			var answerContent = "";
			angular.forEach(e.notLearnAnswer,function(e){
				answerContent+=","+e.daan;
			})
			answerContent = answerContent.substring(1);
			questionObj.answerContent = answerContent;
			questionArray.push(questionObj);
		})
		angular.forEach($scope.echoQuestion.reading,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionObj.sort = e.sort;
			questionObj.type = e.type;
			var answerContent = "";
			angular.forEach(e.notLearnAnswer,function(e){
				answerContent+=","+e.daan;
			})
			answerContent = answerContent.substring(1);
			questionObj.answerContent = answerContent;
			questionArray.push(questionObj);
		})
		console.log(JSON.stringify(examSubmit));
		console.log(JSON.stringify(questionArray));
		var examSubmitJson = JSON.stringify(examSubmit);
		var submitConteJson = JSON.stringify(questionArray);
		var params = {examSubmitJson:examSubmitJson, submitConteJson:submitConteJson};
		$scope.variablePacket.prompt=false;
		$http.post(lessonIp+"stuExam/stuExamSubmit", params).success(function(data) {
			if(data.ret==200){
				$scope.wranShow('提交成功',true);
				setTimeout(function () {
                    $state.go('secondNav.studentHomeworkList',{reload:true});
                }, 1000)
			}else{
				$scope.wranShow('提交失败',false)
			}
		});
	}
	
	$scope.findStuExamList();
	console.log($scope.variablePacket.state)
	
	//填空题插入分割线
	$scope.insertVerticalLine = function(type, index) {
		$scope.echoQuestion[type][index].notLearnAnswer = $scope.echoQuestion[type][index].notLearnAnswer.replace("<p>","");
		$scope.echoQuestion[type][index].notLearnAnswer = $scope.echoQuestion[type][index].notLearnAnswer.replace("</p>","");
		$scope.echoQuestion[type][index].notLearnAnswer += ' | ';
		$scope.echoQuestion[type][index].notLearnAnswer = $scope.echoQuestion[type][index].notLearnAnswer.replace("<p>","");
		$scope.echoQuestion[type][index].notLearnAnswer = $scope.echoQuestion[type][index].notLearnAnswer.replace("</p>","");
		$scope.echoQuestion[type][index].notLearnAnswer = $scope.echoQuestion[type][index].notLearnAnswer.replace("<br/>","");
		console.log($scope.echoQuestion[type][index].notLearnAnswer)
	};
	
	//8种题型锚点
	$scope.jump = function(index) {
		var top = 0 ;
		if($scope.variablePacket.titFixed){
			top = document.getElementById(index).offsetTop;
			console.log(top)
		}else{
			top = document.getElementById(index).offsetTop - 80;
			console.log(top)
		}
		angular.element("html,body").animate({"scrollTop":top},600)
		$scope.variablePacket.queIndexEcho = index;
	}
	
	
	//吸顶
	var Top = document.getElementById('zyx_lines').offsetTop;
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if($scope.variablePacket.AddResources_show){
			if(scrollT >= (Top+616)) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}else{
			if(scrollT >= Top) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}
	};
	
	//导学内容---题型切换
	$scope.jumpEcho = function(index) {
		var topEcho=document.getElementById(index).offsetTop;
		angular.element("html,body").animate({"scrollTop":topEcho},600)
		$scope.variablePacket.queIndexEcho = index;
	}
	
	//导学内容---查看答案及解析
	$scope.lookAnswerEcho = function(type,index,answer){
		$scope.echoQuestion[type][index].AnswerShow = answer ? false : true;
	}
	
	//提交验证
	$scope.refer = function(){
		var num = 0;
		angular.forEach($scope.echoQuestion.single,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.many,function(e){
			if(e.notLearnAnswer.daanA==false && e.notLearnAnswer.daanB==false && e.notLearnAnswer.daanC==false && e.notLearnAnswer.daanD==false){
				 return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.judge,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.fillIn,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.material,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.clozeCloze,function(e){
			angular.forEach(e.notLearnAnswer,function(e){
				if(e.daan==''){
					return num+=1
				}
			})
		})
		angular.forEach($scope.echoQuestion.reading,function(e){
			angular.forEach(e.notLearnAnswer,function(e){
				if(e.daan==''){
					return num+=1
				}
			})
		})
		if(num==0){
			$scope.delOk();
//			$state.go('secondNav.studentGuideList');
		}else{
			$scope.promptShow('确认提交？',false,'有'+ num +'道题未回答！');
		}
	}
	
	//填空题答案类型的转换
	$scope.fillInArr = [];
	angular.forEach($scope.echoQuestion.fillIn, function(e, i) {
		$scope.fillInArr.push($scope.echoQuestion.fillIn[i].Answer.split("|"));
	})

	//材料题答案类型的转换
	$scope.materialArr = [];
	angular.forEach($scope.echoQuestion.material, function(e, i) {
		$scope.materialArr.push($scope.echoQuestion.material[i].Answer);
	})

	//简答题答案类型的转换
	$scope.briefAnswerArr = [];
	angular.forEach($scope.echoQuestion.briefAnswer, function(e, i) {
		$scope.briefAnswerArr.push($scope.echoQuestion.briefAnswer[i].Answer);
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
			title.push(typeObject);
		}
		if(titleObje.indexOf("4")!=-1){
			typeObject = {};
			typeObject.id = "4";
			typeObject.name = "多选题";
			typeObject.Type = "many";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("1")!=-1){
			typeObject = {};
			typeObject.id = "1";
			typeObject.name = "判断题";
			typeObject.Type = "judge";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("3")!=-1){
			typeObject = {};
			typeObject.id = "3";
			typeObject.name = "填空题";
			typeObject.Type = "fillIn";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("8")!=-1){
			typeObject = {};
			typeObject.id = "8";
			typeObject.name = "材料题";
			typeObject.Type = "material";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("6")!=-1){
			typeObject = {};
			typeObject.id = "6";
			typeObject.name = "简答题";
			typeObject.Type = "briefAnswer";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("7")!=-1){
			typeObject = {};
			typeObject.id = "7";
			typeObject.name = "完形填空";
			typeObject.Type = "clozeCloze";
			typeObject.show = true;
			title.push(typeObject);
		}
		if(titleObje.indexOf("5")!=-1){
			typeObject = {};
			typeObject.id = "5";
			typeObject.name = "阅读理解";
			typeObject.Type = "reading";
			typeObject.show = true;
			title.push(typeObject);
		}
		return title;
	}
	
	//校验答案格式
	function checkMyAnswer(myAnswer, icon, type, answer, state){
		switch (type) {
            case "2":
            case "8":
            case "6":
            	return myAnswer;
           		break;
       		case "4":
       			return myAnswer.split(",");
           		break;
       		case "3":
       			var asplit = answer.split("|");
       			var split = myAnswer.split("|");
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<asplit.length; i++){
       				maObj = {};
       				if(split.length<=i){
       					maObj.daan = "";
       				}else{
       					maObj.daan = split[i];
       				}
       				maObj.icon = "";
       				maArray.push(maObj);
       			}
            	return maArray;
       		case "1":
       			if(myAnswer=="T"){
       				return "正确"
       			}else if(myAnswer=="F"){
       				return "错误";
       			}else{
       				return "";
       			}
       			break;
			case "7":
           	case "5":
           		var asplit = answer.split(",");
            	var split = myAnswer.split(",");
            	var iconsplit = icon.split(",");
       			var maArray = [];
       			var maObj = {};
       			var icon = "";
       			for(var i=0; i<asplit.length; i++){
       				maObj = {};
       				icon = "";
       				if(split.length<=i){
       					maObj.daan = "";
       				}else{
       					maObj.daan = split[i];
       				}
       				if($scope.variablePacket.state=="submission"){
       					icon = iconsplit[i];
       				}
       				maObj.icon = icon;
       				maArray.push(maObj);
       			}
            	return maArray;
           		break;
            default:
            	break;
        }
	}
	//校验为答题，选项格式
	function checkNotLearnAnswer(optionNum, type){
		switch (type) {
            case "2":
            case "1":
            case "3":
            case "8":
            case "6":
            	return "";
           		break;
       		case "4":
            	return {daanA:false,daanB:false,daanC:false,daanD:false};
           		break;
           	case "7":
           	case "5":
            	var split = optionNum.split(",");
       			var qoArray = [];
       			var qoObj = {};
       			for(var i=0; i<split.length; i++){
       				qoObj = {};
       				qoObj.daan="";
       				qoArray.push(qoObj);
       			}
            	return qoArray;
           		break;
            default:
            	break;
        }
	}
	
	//插入资源回显弹层--开启
	$scope.insertResource = function(resourceName) {
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
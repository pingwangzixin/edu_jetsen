app.controller('exerciseContentCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$rootScope) {
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
		queIndexEcho:0,//8种题型的默认选中
		LookAnswerCard:false,//试卷模块是否显示
		IfRelative:false,//是否相对定位
		MarginTopTen:null,//添加margin-top样式
		examAssemblyName:'',
		questionImgList:[]
	}
	//导学内容---习题的数据
	$scope.echoQuestion = {
//		//标题
//		title: [],
//		//单选
//		single : [
//			{
//				Id:0, 
//				Type:'single', //题型
//				CanResource:true,//是否显示资源
//				Resource: [{
//						ResourceTit: '粉红色的很费时间的方式',
//						ResourceSrc: 0,
//						ResourceNum: 0
//				}], //插入带过来的资源数据
//				AnswerShow:false, //默认答案不显示
//				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
//				Answer:'B', //答案
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节明细
//				myAnswer:'A',//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//				notLearnAnswer:""//未学习---答案
//			},{
//				Id:1,
//				Type:'single',
//				CanResource:true,//是否显示资源
//				Resource: [{
//						ResourceTit: '粉红色的很费时间的方式',
//						ResourceSrc: 1,
//						ResourceNum: 1
//				}], //插入带过来的资源数据
//				AnswerShow:false,
//				queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//				Answer:'C',
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:'C',
//				icon:"correct",
//				notLearnAnswer:""
//			},{
//				Id:2,
//				Type:'single',
//				AnswerShow:false,
//				queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//				Answer:'C',
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:'B',
//				icon:"half",
//				notLearnAnswer:""
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
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:['D','A'],//我的答案--已学习选项
//				icon:"error",//我的答案--已学习图片
//				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}//未学习---答案
//			},{
//				Id:1,
//				Type:'many', 
//				AnswerShow:false,
//				queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//				Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:['A','C'],
//				icon:"correct",
//				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}
//			},{
//				Id:2,
//				Type:'many',
//				AnswerShow:false,
//				queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//				Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
//				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:['A','B','C'],
//				icon:"half",
//				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}
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
//			},{
//				Id:1,
//				Type:'judge', 
//				AnswerShow:false,
//				queTit:'222你是谁？我是谁？是游戏吗？',
//				Answer:'正确',
//				Analysis:'是是是是',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:'正确',
//				icon:"correct",
//				notLearnAnswer:''
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
//			},{
//				Id:1,
//				Type:'fillIn', 
//				AnswerShow:false,
//				queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', 
//				Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//答案
//				Analysis:'天上有一个太阳',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'},{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'}],
//				notLearnAnswer:''
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
//			},{
//				Id:1,
//				Type:'material', 
//				AnswerShow:false,
//				queTit:'你是谁？我是谁？是游戏吗？',
//				Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis:'是是是是',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
//				notLearnAnswer:''
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
//			},{
//				Id:1,
//				Type:'briefAnswer', 
//				AnswerShow:false,
//				queTit:'你是谁？我是谁？是游戏吗？',
//				Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis:'是是是是',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
//				notLearnAnswer:''
//			},{
//				Id:2,
//				Type:'briefAnswer', 
//				AnswerShow:false,
//				queTit:'为什么李白特别钟情于庐山？',
//				Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis:'是是是是',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
//				notLearnAnswer:''
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
//			},{
//				Id:1,
//				Type:'clozeCloze', 
//				AnswerShow:false,
//				queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", 
//				Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
//				Analysis:'地上有个月亮',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
//				notLearnAnswer:[{daan:''},{daan:''}]
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
//					{tit:'说说你对未来的看法？','testDaan':'低分化的','icon':'half'},
//					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},
//					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级','daan':'D','icon':'correct'},
//					{tit:'你害怕鬼怪吗？','testDaan':'大的飞洒发撒的发','icon':'error'},
//					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物','daan':'D','icon':'correct'},
//					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜','daan':'A','icon':'correct'}
//				],//我的答案
//				Answer:[
//					{'testDaan':'正确答案正确答案'},
//					{'daan':'C'},
//					{'daan':'A'},
//					{'testDaan':'正确答案正确答案'},
//					{'daan':'D'},
//					{'daan':'B'},
//				],//正确答案
//			},{
//				Id:1,
//				Type:'reading', 
//				AnswerShow:false,
//				queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
//				Analysis:'是是是是',
//				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
//				myAnswer:[
//					{tit:'说说你对未来的看法？','testDaan':'低分化的','icon':'half'},
//					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},
//					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级','daan':'D','icon':'correct'},
//					{tit:'你害怕鬼怪吗？','testDaan':'大的飞洒发撒的发','icon':'error'},
//					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物','daan':'D','icon':'correct'},
//					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜','daan':'A','icon':'correct'}
//				],
//				Answer:[
//					{'testDaan':'正确答案正确答案'},
//					{'daan':'C'},
//					{'daan':'A'},
//					{'testDaan':'正确答案正确答案'},
//					{'daan':'D'},
//					{'daan':'B'},
//				],
//			}
//		]
	}
	
	//作业内容
	var examData = {};
	$scope.examSubmit = {};
	//查询任务内容and学生回答
	$scope.findStuExamListQA= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId;
		if($stateParams.state!="unsubmitted"){
			url += "&stuId="+stuId;
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
							valueObject.id = question.id;
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
							valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
							valueObject.icon = question.icon;//我的答案--已学习图片
							valueObject.comment = question.comment;
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
					var questionMap = examData.examAssembly[0].questionMap;
					$scope.echoQuestion.assembly = examData.examAssembly[0];
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
							valueObject.id = question.id;
							valueObject.Type = english; //题型
							valueObject.type = key;//题型
							valueObject.CanResource = resourceFlag ;//是否显示资源
							valueObject.Resource = resourceArray; //插入带过来的资源数据
							valueObject.AnswerShow = answerShow; //默认答案不显示
							valueObject.queTit = question.body; //题干
							valueObject.Answer = checkAnswer(question.answer, key); //答案
							valueObject.Analysis = question.analysis;//解析
							valueObject.sort = question.sort;//排序
//							valueObject.Chapter =[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}];//章节明细
							valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
							valueObject.icon = question.icon;//我的答案--已学习图片
							valueObject.comment = question.comment;
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
	
	//查询任务内容and学生回答
	$scope.findStuExamListAC= function(){
		var url = lessonIp+"stuExam/getExamAndStuSubmit?examId="+examId+"&stuId="+stuId;;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				examData = result.data;
				$scope.examSubmit = examData.examSubmit;
				$scope.echoQuestion.assembly = examData.examAssembly[0];
				var titles = "";
				$scope.variablePacket.questionImgList = examData.examAssembly[0].questionImgList;
				var questionOptionMap = examData.examAssembly[0].questionOptionMap;
				for(var t=0,tlen=questionOptionMap.length; t<tlen; t++){
					var key = questionOptionMap[t].typeId;
					titles+=","+key;
					var questionList = questionOptionMap[t].questions;
					var english = idToEnglish(key);
					var valueArray = [];
					var valueObject = {};
					for(var i=0; i<questionList.length; i++){
						var question = questionList[i];
						var answerShow = false;
						valueObject = {};
						valueObject.Id = i;
						valueObject.id = question.id;
						valueObject.Type = english; //题型
						valueObject.type = key;//题型
						valueObject.sort = question.sort;//排序
						valueObject.Answer = checkAnswer(question.answer, key);//答案
						valueObject.Analysis = question.analysis;//解析
						valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
						valueObject.icon = question.icon;//我的答案--已学习图片
						valueObject.comment = question.comment;
						valueArray.push(valueObject);
					}
					$scope.echoQuestion[english] = valueArray;
				}
				titles=titles.substring(1);
				$scope.echoQuestion.title = checkTitle(titles);
			}
		});
	}
	if($stateParams.type=="answerCard"){
		$scope.findStuExamListAC();
	}else{
		$scope.findStuExamListQA();
	}
	
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
	
	//查看试卷
	$scope.LookCard = function(){
		$scope.variablePacket.LookCardActive = !$scope.variablePacket.LookCardActive;
		$scope.variablePacket.AnswerCardMask = !$scope.variablePacket.AnswerCardMask;
		$scope.variablePacket.LookAnswerCard = !$scope.variablePacket.LookAnswerCard;
		$scope.variablePacket.IfRelative = true;
		if($scope.variablePacket.LookAnswerCard){
			$scope.variablePacket.ifLines = false;
		}else{
			$scope.variablePacket.ifLines = true;
		}
		$timeout(function(){
			angular.element(".zyx_LookAnswerCard").mCustomScrollbar({
				mouseWheelPixels : 1000,
				theme: "3d-dark"
			});
		});
		
	}
	
	//吸顶
	if($scope.variablePacket.type=="testPaper" || $scope.variablePacket.type=="exercises"){
		$timeout(function(){
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
		})
	}
	
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
			typeObject.index = 4
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
   			case "3":
   				var asplit = answer.split("|");
   				var split = myAnswer.split("|");
            	var iconSplit = icon.split(",");
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<asplit.length; i++){
       				maObj = {};
       				if(split.length<=i){
       					maObj.daan = "";
       				}else{
       					maObj.daan = split[i];
       				}
       				maObj.icon = iconSplit[i];
       				maArray.push(maObj);
       			}
            	return maArray;
           		break;
           	case "7":
           	case "5":
           		var asplit = answer.split(",");
            	var split = myAnswer.split(",");
            	var iconSplit = icon.split(",");
       			var maArray = [];
       			var maObj = {};
       			for(var i=0; i<split.length; i++){
       				maObj = {};
       				if(split.length<=i){
       					maObj.daan = "";
       				}else{
       					maObj.daan = split[i];
       				}
       				maObj.icon = iconSplit[i];
       				maArray.push(maObj);
       			}
            	return maArray;
           		break;
            default:
            	break;
        }
	}
	//校验为答题，选项格式
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
            	break;
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
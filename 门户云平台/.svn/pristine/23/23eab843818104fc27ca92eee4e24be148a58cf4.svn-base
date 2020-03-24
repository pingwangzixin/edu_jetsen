app.controller('guideStudentSituationCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams) {

	//变量包
	$scope.variablePacket = {
		resource:true,//是否显示资源
		titFixed:false,//吸顶样式
		queIndexEcho:0,//导学内容---8种题型的默认选中
		EchoLineIndex:0,//导学内容---资源库资源条默认选中
		EchoLineTab:0,//导学内容---资源库资源条类型切换左侧图片跟随切换
		EchoLineType:"pic",//导学内容---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		Echotit:0,//导学内容---导学资源和提问交流默认选中
		askArry:[],//导学内容---提问交流的存储数组
		message:'',//导学内容---提问交流的提交的文字
		listBorder : false,											//列表最下面border 
		resourceReturn : $location.$$search.resourceReturn == 'true' ? true : false,				//根据是否需要回传资源现实不同模板
		studyState : 1,//默认是已学习状态												//已学习/未学习状态切换
		resourceBox : false,										//资源详情弹框
		stuList : {													//学生列表
			alreadylearned: [],//[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			unlearned: [],//[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		},
		guidanceId: $stateParams.guidanceId,
		classId:$stateParams.classId,
		className:$stateParams.className,
		isStudyOK:[],//已学习
		isStudyNO:[],//未学习
		defultStudyList:[],//默认学习列表
		stuBackResourceList:[],
		userName:'',
		clickResourceName:'',
		previewUrl:'',
		videoPath:'',
		audioPath:'',
		imagePath:'',
		pdfPath:'',
		backResourceType:'',
		fileNotExist:false,
		convertState:'0',
	};
	//学生列表请求成功之后判断
	var borderLen = 0;
	angular.forEach($scope.variablePacket.stuList,function (e,i){
		borderLen += e.length;
		$scope.variablePacket.listBorder = borderLen % 2 ? false : true;
	});
	
	/**
	 * 获取oss展示路径
	 */
	$http.get(ossIp + 'filelog/getPreviewUrl').success(function (data){
			console.log(data);
			$scope.variablePacket.previewUrl=data.previewUrl+"/Thumbnail/";
    })
	
	//已学习/未学习状态切换
	$scope.studyStateFn = function (i){
		$scope.variablePacket.defultStudyList=[];
		$scope.variablePacket.isStudyNO=[];
		$scope.variablePacket.isStudyOK=[];
		console.log($scope.variablePacket.guidanceId);
		$scope.variablePacket.studyState = i;
		$http.get(guidanceLearningIp + 'sendRecord/'+$scope.variablePacket.guidanceId+'/'+$scope.variablePacket.classId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				console.log(data.data);
				angular.forEach(data.data, function (each) {
					if(each.studyState == "0"){
						$scope.variablePacket.isStudyNO.push(each.studentName);
					}else{
						$scope.variablePacket.isStudyOK.push(each.studentName);
					}
				});
				console.log($scope.variablePacket.isStudyNO);
				console.log($scope.variablePacket.isStudyOK);
			}
	    })
		if(i==1){
			$scope.variablePacket.defultStudyList=$scope.variablePacket.isStudyOK;
		}else if(i==0){
			$scope.variablePacket.defultStudyList=$scope.variablePacket.isStudyNO;
		}
	};
	
	//查看资源详情弹框
	var playerSTOP,audioSTOP;
	$scope.resourceBoxFn = function (ossid,resourceName,resourceType){
		$scope.variablePacket.resourceBox = true;
		$scope.variablePacket.clickResourceName=resourceName;
		console.log(ossid);
		console.log(resourceType);
		if(ossid.indexOf("_")>0){
			ossid = ossid.substring(0,ossid.indexOf("_"));
		}
		$http.get(ossIp + 'filelog/'+ossid).success(function (data){
			console.log(data);
			if(data.code == 200){
				$scope.variablePacket.convertState = data.data.state;
				console.log($scope.variablePacket.convertState)
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
						playerSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							height: 520,
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
						audioSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							height: 520,
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
				}else if(resourceType == '3'){
					$(".loadFlashWrap").hide();
					$scope.variablePacket.backResourceType = 'pic';
					$scope.variablePacket.imagePath = data.data.previewUrl;
				}else{
					$(".loadFlashWrap").hide();
					$scope.variablePacket.backResourceType = 'pdf';
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
					console.log($scope.variablePacket.pdfPath)
					console.log($scope.variablePacket.convertState)
				}
			}
	    })
	};
	
	
	//zyx
	
	//8种题型锚点
	$scope.jumpEcho = function(index) {
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
	if($scope.variablePacket.resourceReturn){
		$scope.variablePacket.fileNotExist = false;
		//查询下发的学生状态情况
		$http.get(guidanceLearningIp + 'sendRecord/'+$scope.variablePacket.guidanceId+'/'+$scope.variablePacket.classId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				console.log(data.data);
				angular.forEach(data.data, function (each) {
//					console.log(each)
					if(each.studyState == "1"){
						$scope.variablePacket.stuList.alreadylearned.push(each);
					}else{
						$scope.variablePacket.stuList.unlearned.push(each);
					}
				});
				console.log($scope.variablePacket.stuList);
				console.log($scope.variablePacket.stuList.alreadylearned.length);
				console.log($scope.variablePacket.stuList.unlearned.length);
				if($scope.variablePacket.stuList.alreadylearned.length>0){
					console.log("默认选中第一个已经学习的同学--"+$scope.variablePacket.stuList.alreadylearned[0].studentName);
					$scope.variablePacket.userName=$scope.variablePacket.stuList.alreadylearned[0].studentName;
				}else{
					$scope.variablePacket.userName=$scope.variablePacket.stuList.unlearned[0].studentName;
				}
				console.log($scope.variablePacket.stuList.alreadylearned[0]);
				console.log($scope.variablePacket.stuList.alreadylearned[0].backState);
//				&& $scope.variablePacket.stuList.alreadylearned[0].backState == "1"
				if($scope.variablePacket.stuList.alreadylearned[0] != undefined  ){
					console.log("开始查询资源。。。");
					$scope.selectResourceByUserIdAndGuiId($scope.variablePacket.stuList.alreadylearned[0].studentId,$scope.variablePacket.stuList.alreadylearned[0].backState);
				}else{
					$scope.variablePacket.fileNotExist = true;
				}
			}
	    })
		
		$timeout(function(){
			var Top = angular.element(".zyx_lines").offset().top;
			window.onscroll = function (){
				var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if(scrollT >= Top) {
					$scope.$apply(function (){
						$scope.variablePacket.titFixed = true;
					});
				}else{
					$scope.$apply(function (){
						$scope.variablePacket.titFixed = false;
					});
				}
			};
		},10)
	}else{
		console.log($scope.variablePacket.resourceReturn);
		console.log($scope.variablePacket.classId);
		//点击不要回传的导学，进页面调取切换拦方法(已学习，未学习)
		$scope.studyStateFn(1);
	}
	
	
	
	
	//导学内容---查看答案及解析
	$scope.lookAnswerEcho = function(type,index,answer){
		$scope.echoQuestion[type][index].AnswerShow = answer ? false : true;
	}
	
	
	$scope.echoQuestion = {
		//标题
		title: [
			{"name":"单选题"},     
			{"name":"多选题"},
			{"name":"判断题"},
			{"name":"填空题"},
			{"name":"材料题"},
			{"name":"简答题"},
			{"name":"完形填空"},
			{"name":"阅读理解"}
		],
		//单选
		single : [
			{
				Id:0, 
				Type:'single', //题型
				AnswerShow:false, //默认答案不显示
				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
				Answer:'B', //答案
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节明细
				myAnswer:'A',//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:""//未学习---答案
			},{
				Id:1,
				Type:'single',
				AnswerShow:false,
				queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
				Answer:'C',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:'C',
				icon:"correct",
				notLearnAnswer:""
			},{
				Id:2,
				Type:'single',
				AnswerShow:false,
				queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
				Answer:'C',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:'B',
				icon:"half",
				notLearnAnswer:""
			}
			
		],
		//多选
		many : [
			{
				Id:0,
				Type:'many', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
				Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:['D','A'],//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}//未学习---答案
			},{
				Id:1,
				Type:'many', 
				AnswerShow:false,
				queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
				Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:['A','C'],
				icon:"correct",
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}
			},{
				Id:2,
				Type:'many',
				AnswerShow:false,
				queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
				Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:['A','B','C'],
				icon:"half",
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}
			}
		],
		//判断
		judge : [
			{
				Id:0,
				Type:'judge', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111天上有2个太阳吗？', //题干
				Answer:'错误',//答案
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:'正确',//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:''//未学习---答案
			},{
				Id:1,
				Type:'judge', 
				AnswerShow:false,
				queTit:'222你是谁？我是谁？是游戏吗？',
				Answer:'正确',
				Analysis:'是是是是',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:'正确',
				icon:"correct",
				notLearnAnswer:''
			}
		],
		//填空
		fillIn : [
			{
				Id:0,
				Type:'fillIn', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
				Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//答案
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
				myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//我的答案--已学习选项
				notLearnAnswer:''//未学习---答案
			},{
				Id:1,
				Type:'fillIn', 
				AnswerShow:false,
				queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', 
				Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//答案
				Analysis:'天上有一个太阳',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'},{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:''
			}
		],
		//材料
		material : [
			{
				Id:0,
				Type:'material', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'为什么李白特别钟情于庐山？', //题干
				Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:''//未学习---答案
			},{
				Id:1,
				Type:'material', 
				AnswerShow:false,
				queTit:'你是谁？我是谁？是游戏吗？',
				Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				Analysis:'是是是是',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:''
			}
		],
		//简答
		briefAnswer : [
			{
				Id:0,
				Type:'briefAnswer', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'为什么李白特别钟情于庐山？', //题干
				Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:''//未学习---答案
			},{
				Id:1,
				Type:'briefAnswer', 
				AnswerShow:false,
				queTit:'你是谁？我是谁？是游戏吗？',
				Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				Analysis:'是是是是',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:''
			},{
				Id:2,
				Type:'briefAnswer', 
				AnswerShow:false,
				queTit:'为什么李白特别钟情于庐山？',
				Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				Analysis:'是是是是',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:''
			}
		],
		//完形填空
		clozeCloze : [
			{
				Id:0,
				Type:'clozeCloze', //题型
				AnswerShow:false,//默认答案不显示
				queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
				Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
				myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:[{daan:''},{daan:''}]//未学习---答案
			},{
				Id:1,
				Type:'clozeCloze', 
				AnswerShow:false,
				queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", 
				Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
				Analysis:'地上有个月亮',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
				notLearnAnswer:[{daan:''},{daan:''}]
			}
		],
		//阅读理解
		reading : [
			{
				Id:0,
				Type:'reading', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
				fiveSmallTopic:[//5个小题
					{tit:'中国有几个民族？A.15  B.36  C.100 D.56',daan:'D'},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:'A'},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:'A'},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:'B'},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:'C'}
				],
				Analysis:'天上有一个太阳',//解析
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:[//未学习---答案
					{tit:'中国有几个民族？A.15  B.36  C.100 D.56',daan:''},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:''},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:''},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:''},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:''}
				]
			},{
				Id:1,
				Type:'reading', 
				AnswerShow:false,
				queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
				fiveSmallTopic:[
					{tit:'中国有几个民族？A.15  B.36  C.100 D.56',daan:'D'},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:'A'},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:'A'},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:'B'},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:'C'}
				],
				Analysis:'是是是是',
				Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
				notLearnAnswer:[
					{tit:'中国有几个民族？A.15  B.36  C.100 D.56',daan:''},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:''},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:''},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:''},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:''}
				]
			}
		]
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
	/**
	 * 根据用户id，导学id查询回传的资源
	 */
	$scope.selectResourceByUserIdAndGuiId=function(createUserId,backState){
//		if(backState=="1"){
			$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$scope.variablePacket.guidanceId+'&&createBy='+createUserId+'&&type=1').success(function (data){
				console.log(data);
				if(data.ret == 200){
					$scope.variablePacket.fileNotExist=false;
					console.log(data.data);
					$scope.variablePacket.stuBackResourceList=data.data;
					angular.forEach(data.data,function(e,i){
						if($scope.variablePacket.stuBackResourceList[i].resourceType != 2){
							$scope.variablePacket.stuBackResourceList[i].thumPath=$scope.variablePacket.previewUrl+e.resourceDate+'/'+e.ossFileName+'.jpg';
						}else{
							$scope.variablePacket.stuBackResourceList[i].thumPath="img/audioDefultImage.png";
						}
					})
				}else{
					$scope.variablePacket.stuBackResourceList=[];
					$scope.variablePacket.fileNotExist=true;
				}
		    })
//		}else{
//			$scope.variablePacket.stuBackResourceList=[];
//		}
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
	/**
	 * 点击每个人查看回传资源详情
	 * @param {Object} userId
	 */
	$scope.lookBackResource=function(userId,backState,stuName){
		$scope.variablePacket.userName=stuName;
		console.log("用户id："+userId+"---"+"导学id："+$scope.variablePacket.guidanceId);
		$scope.selectResourceByUserIdAndGuiId(userId,backState);
	}
}]);
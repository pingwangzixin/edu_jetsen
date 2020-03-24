app.controller('inClassDetailsCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {

	//变量包
	$scope.Testpaper = [];//试卷右侧列表的数据
	$scope.resource = []; //资源库的存储
	$scope.variablePacket = {
		eightSwitchOut: [
			{"name":"单选题",Type:'single',show:false},     
			{"name":"判断题",Type:'judge',show:false},
			{"name":"简答题",Type:'briefAnswer',show:false},
		],
		selectSubject: [
			{'name': '数学'}, 
			{'name': '语文'}, 
			{'name': '英语'}, 
			{'name': '政治'}
		],
		state: $stateParams.state, //new:布置导学	edit:复制导学
		//卷库
		TestIndex: 0, //试卷默认选中
		testpaperBox_pic: true,
		testpaperBox_line: true,
		//资源
		ResourcesTypeShow_pic: false,
		ResourcesTypeShow_line: true,
		ResLineIndex: -1, //页面--资源库资源条默认选中
		ResLineTab: 0, //页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType: "pic", //页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		type:$location.$$search.type,//类型，区分是导学还是作业
		packjectId:$location.$$search.packjectId,  //  导学id/作业id
		classId:$location.$$search.classId,  // 班级id
		assemblyId: null, //试卷ID
		guidanceSituation:{}, //导学包
		fileNotExist:false,//文件是否存在
		stuCount:0,
		submitCount:0,
	}
	
	//返回顶部
	$scope.zyx_blackTop = function(){
		$('html , body').animate({scrollTop: 0},'slow');
	}


	//页面/弹层--查看答案及解析
	$scope.lookAnswer = function(type, index, answer) {
		if($scope.variablePacket.insertChoiceAll) {
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		} else {
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}

	
	//页面--资源库列条上的删除
	$scope.delResLine = function(index, num, tit) {
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			$scope.insertData.splice(index, 1);
			$scope.wranShow('已删除', true, tit);
			angular.forEach($scope.insertData, function(e, i) {
				if(e.ResourceNum == num) {
					e.sign = false;
				}
			})
			if($scope.insertData.length == 0 && $scope.insertTest.length == 0) {
				$scope.variablePacket.AddResources_show = false;
			}
			if($scope.insertData.length == 0 && $scope.insertTest.length > 0) {
				$scope.variablePacket.ResourcesTypeShow_line = false;
				$scope.variablePacket.ResourcesTypeShow_pic = false;
				$scope.variablePacket.testpaperBox_pic = true;
				$scope.variablePacket.TestIndex = 0;
			}
			if($scope.variablePacket.ResLineIndex == index && $scope.insertData.length > 0) {
				if($scope.insertData[0].ResourceSrc == 4) {
					$scope.variablePacket.ResLineType = "music";
				} else if($scope.insertData[0].ResourceSrc == 5) {
					$scope.variablePacket.ResLineType = "video";
				} else {
					$scope.variablePacket.ResLineType = "pic";
				}
				$scope.variablePacket.ResLineIndex = 0;
				$scope.variablePacket.ResLineTab = 0;
			}
		}

	}

	//页面--资源库资源列条的切换
//	$scope.ResLineTab = function(index, typeSrc) {
//		$scope.variablePacket.ResLineIndex = index;
//		$scope.variablePacket.ResLineTab = index;
//		$scope.variablePacket.TestIndex = -1;
//		$scope.variablePacket.testpaperBox_pic = false; 
//		$scope.variablePacket.ResourcesTypeShow_pic = true;
//		if(typeSrc == 4) {
//			$scope.variablePacket.ResLineType = "music";
//		} else if(typeSrc == 5) {
//			$scope.variablePacket.ResLineType = "video";
//		} else {
//			$scope.variablePacket.ResLineType = "pic";
//		}
//	}


	//卷库列条的切换
	/*$scope.TestTab = function(i) {
		$scope.variablePacket.TestIndex = i;
		$scope.variablePacket.ResLineIndex = -1;
		$scope.variablePacket.testpaperBox_pic = true; 
		$scope.variablePacket.ResourcesTypeShow_pic = false;
	}*/
	
	//卷库列条上的删除
	$scope.delTestpaper = function(index, num, tit) {
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			$scope.variablePacket.TestIndex = 0;
			$scope.insertTest.splice(index, 1);
			$scope.wranShow('已删除', true, tit);
			angular.forEach($scope.insertTest, function(e, i) {
				if(e.num == num) {
					e.sign = false;
				}
			})
			if($scope.insertData.length == 0 && $scope.insertTest.length == 0) {
				$scope.variablePacket.AddResources_show = false;
			}
			if($scope.insertTest.length == 0 && $scope.insertData.length > 0 ) {
				$scope.variablePacket.testpaperBox_line = false;
				$scope.variablePacket.testpaperBox_pic = false;
				$scope.variablePacket.ResourcesTypeShow_pic = true;
				$scope.variablePacket.ResLineIndex = 0;
			}
		}

	}
	
	//循环完成后
	$scope.renderFinish = function() {
		//滚动条调用
		angular.element(".zyx_ResourcesTypeShow").mCustomScrollbar({
			mouseWheelPixels: 1000, //滚动速度
			theme: "3d-dark" //滚动条样式
		});
	}
	
	/************************************   以下是模拟的假数据  ****************************************/

	//资源弹层数据
	$scope.insertData = [{
		sign: false, //加减号
		ResourceNum: 0, //记录点击的第几个
		ResourceTit: '00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
		ResourceSrc: 0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
		name: '刘敏', //名字
		time: '2017-08-20', //时间
		size: '1049.02k', //内存大小
		TypeSrc: [
			{'Src': 'resources_middle.jpg'},
			{'Src': 'newsImg.jpg'},
			{'Src': 'ad_1.jpg'},
			{'Src': 'banner.png'}
		]
	}, {
		sign: false,
		ResourceNum: 1,
		ResourceTit: '11五年级五年级五年级五年级五年级语文期末试卷.ppt',
		ResourceSrc: 1,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [
			{'Src': 'resources_middle.jpg'},
			{'Src': 'newsImg.jpg'},
			{'Src': 'resources_main.jpg'},
			{'Src': 'banner.png'}
		]
	}, {
		sign: false,
		ResourceNum: 2,
		ResourceTit: '22五年级五年级五年级五年级五年级语文期末试卷.ppt',
		ResourceSrc: 2,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [
			{'Src': 'newsImg.jpg'}]
	}, {
		sign: false,
		ResourceNum: 3,
		ResourceTit: '33五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 3,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [
			{'Src': 'banner.png'}]
	}]

	//卷库弹层的数据
	$scope.insertTest = [{
		sign: false, //加减号
		ResourceTit: '111五年级语文期末试卷.ppt', //标题
		name: '刘敏', //，名字
		time: '2017-08-20', //时间
		size: '1049.02k', //内存大小
		source: '上传', //来源
		types: '课中卷', //类型
		num:0,//记录点击的第几个
	}, {
		sign: false,
		ResourceTit: '222五年级语文期末试卷.ppt',
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		source: '收藏',
		types: '课中卷',
		num:1,
	}, {
		sign: false,
		ResourceTit: '333五年级语文期末试卷.ppt',
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		source: '上传',
		types: '课中卷',
		num:2,
	}, {
		sign: false,
		ResourceTit: '444五年级语文期末试卷.ppt',
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		source: '上传',
		types: '课中卷',
		num:3,
	}]

	//卷库题型的数据
	$scope.questionBank = {
		Out: {
			//单选
			single: [{
					Id: 0,
					CanResource: false, //是否显示资源
					Resource: [{
						ResourceTit: '',
						ResourceSrc: 0,
						ResourceNum: 0
					}], //插入带过来的资源数据
					sign: false, //从题库选择的加减号
					Type: 'single', //题型
					AnswerShow: false, //默认答案不显示
					ResourceShow: false, //是否插入资源
					queTit: '111函数g（x） = f（x） - x +3的零点的集合为', //题干
					Answer: 'B', //答案
					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B', //解析
					Chapter: [{
						Onetit: '学科',
						Twotit: '课本',
						Threetit: '章节'
					}]
				}, {
					Id: 1,
					CanResource: false,
					Resource: [{
						ResourceTit: '',
						ResourceSrc: 0,
						ResourceNum: 0
					}],
					sign: false,
					Type: 'single',
					AnswerShow: false,
					ResourceShow: false,
					queTit: '222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
					Answer: 'C',
					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
					Chapter: [{
						Onetit: '学科',
						Twotit: '课本',
						Threetit: '章节'
					}]
				}, {
					Id: 2,
					CanResource: false,
					Resource: [{
						ResourceTit: '',
						ResourceSrc: 0,
						ResourceNum: 0
					}],
					ResourceSrc: 2,
					sign: false,
					Type: 'single',
					AnswerShow: false,
					ResourceShow: false,
					queTit: '333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
					Answer: 'C',
					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
					Chapter: [{
						Onetit: '学科',
						Twotit: '课本',
						Threetit: '章节'
					}]
				}

			],
			//判断
			judge: [{
				Id: 0,
				CanResource: false, //是否显示资源
				Resource: [{
					ResourceTit: '',
					ResourceSrc: 0,
					ResourceNum: 0
				}], //插入带过来的资源数据
				sign: false, //从题库选择的加减号
				Type: 'judge', //题型
				AnswerShow: false, //默认答案不显示
				ResourceShow: false, //是否显示插入资源
				queTit: '111天上有2个太阳吗？', //题干
				Answer: '错误', //答案
				Analysis: '天上有一个太阳', //解析
				Chapter: [{
					Onetit: '学科',
					Twotit: '课本',
					Threetit: '章节'
				}]
			}, {
				Id: 1,
				CanResource: false,
				Resource: [{
					ResourceTit: '',
					ResourceSrc: 0,
					ResourceNum: 0
				}],
				sign: false,
				Type: 'judge',
				AnswerShow: false,
				ResourceShow: false,
				queTit: '222你是谁？我是谁？是游戏吗？',
				Answer: '正确',
				Analysis: '是是是是',
				Chapter: [{
					Onetit: '学科',
					Twotit: '课本',
					Threetit: '章节'
				}]
			}],
			//简答
			briefAnswer: [{
				Id: 0,
				CanResource: false, //是否显示资源
				Resource: [{
					ResourceTit: '',
					ResourceSrc: 0,
					ResourceNum: 0
				}], //插入带过来的资源数据
				sign: false, //从题库选择的加减号
				Type: 'briefAnswer', //题型
				AnswerShow: false, //默认答案不显示
				ResourceShow: false, //是否显示插入资源
				queTit: '为什么李白特别钟情于庐山？', //题干
				Answer: '11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。', //答案
				Analysis: '天上有一个太阳', //解析
				Chapter: [{
					Onetit: '学科',
					Twotit: '课本',
					Threetit: '章节'
				}]
			}, {
				Id: 1,
				sign: false,
				CanResource: false,
				Resource: [{
					ResourceTit: '',
					ResourceSrc: 0,
					ResourceNum: 0
				}],
				Type: 'briefAnswer',
				AnswerShow: false,
				ResourceShow: false,
				queTit: '你是谁？我是谁？是游戏吗？',
				Answer: '22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				Analysis: '是是是是',
				Chapter: [{
					Onetit: '学科',
					Twotit: '课本',
					Threetit: '章节'
				}]
			}, {
				Id: 2,
				CanResource: false,
				Resource: [{
					ResourceTit: '',
					ResourceSrc: 0,
					ResourceNum: 0
				}],
				sign: false,
				Type: 'briefAnswer',
				AnswerShow: false,
				ResourceShow: false,
				queTit: '为什么李白特别钟情于庐山？',
				Answer: '33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				Analysis: '是是是是',
				Chapter: [{
					Onetit: '学科',
					Twotit: '课本',
					Threetit: '章节'
				}]
			}]

		}
	}

	//======================================================
	//历史数据清除
	$scope.insertData = [];
	$scope.insertTest = [];
	$scope.questionBank.Out = {};
	var examId = $scope.variablePacket.packjectId;
	var classId = $scope.variablePacket.classId;
	//右侧  资源  试卷  列表
	$scope.getExamInfo = function(){
		$scope.insertData = []; $scope.insertTest = [];
		$http.get(lessonIp + 'stuExam/getExamInfo?examId=' + examId + '&classId=' + classId).success(function(response){
			if(response.ret == 200){
				//资源
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
					        }
						})
						if(resource != null && resource != {}){
							$scope.insertData.push(resource);
						}
					});
				} else {
					$scope.variablePacket.ResourcesTypeShow_line = false;
				}
				//试卷
				var examAssembly = response.data.examAssembly;
				if(examAssembly != null && examAssembly.length > 0){
					angular.forEach(examAssembly, function(item, index){
						//item.id; item.examId; item.assemblyId; item.name; item.type; item.stuState;
						if(index == 0){
							//首条试卷ID
							$scope.assemblyId = item.id;
						}
					    var test = {};
					    test.sign = false, //加减号
						test.ResourceTit = item.name; //标题
						test.num = index; //记录点击的第几个
						test.id = item.id;
						$scope.insertTest.push(test)
					});
					//首条试卷详情
					$scope.assemblyInfo($scope.assemblyId);
				} else {
					if(resourceList != null && resourceList.length > 0){
						$scope.ResLineTab(0,$scope.insertData[0].resourceType,$scope.insertData[0].ossFileName)
					}
					$scope.variablePacket.testpaperBox_line = false;
				}
			}
		});
	}
	
	//卷库列条的切换
	$scope.TestTab = function(i, assemblyId) {
		$scope.variablePacket.TestIndex = i;
		$scope.variablePacket.ResLineIndex = -1;
		$scope.variablePacket.testpaperBox_pic = true; 
		$scope.variablePacket.ResourcesTypeShow_pic = false;
		$scope.assemblyInfo(assemblyId);
	}
	
	//试卷详情
	$scope.assemblyInfo = function(assemblyId){
		$scope.questionBank.Out = {};
		$scope.variablePacket.assemblyId = assemblyId;
		$http.get(lessonIp + 'stuExam/getAssemblyInfo?assemblyId=' + assemblyId+"&classId="+classId).success(function(response){
			if(response.ret == 200){
				var data = response.data;
				$scope.paperName = data.name;
				$scope.variablePacket.stuCount = data.stuCount;
				$scope.variablePacket.submitCount = data.submitCount;
				if(data.questionMap != null){
					angular.forEach(data.questionMap, function(item, index){
						var type = $scope.idToEnglish(item.typeId);
						if(item.typeId=="2"){
							$scope.variablePacket.eightSwitchOut[0].show = true;
						}else if(item.typeId=="1"){
							$scope.variablePacket.eightSwitchOut[1].show = true;
						}else if(item.typeId=="6"){
							$scope.variablePacket.eightSwitchOut[2].show = true;
						}
						var questionList = item.questions;
						var questionArray = [];
						angular.forEach(questionList, function(v, i){
							var questionObj = {};
							questionObj.Id = v.id;
							if(v.resourceJson != null && v.resourceJson != '' && v.resourceJson != '[]'){
								var resourceList = JSON.parse(v.resourceJson);
								questionObj.CanResource = true;
								questionObj.Resource = [];
								angular.forEach(resourceList,function(value, ii){
									var resourceObj = {};
									resourceObj.ResourceTit = value.name;
									resourceObj.ResourceRid = value.rid;
									resourceObj.ResourceSrc = value.type
									questionObj.Resource.push(resourceObj);
								});
							} else {
								questionObj.CanResource = false;
								questionObj.Resource = [{ResourceTit: '', ResourceSrc: 0, ResourceNum: 0}];
							}
							questionObj.sign = false;
							questionObj.Type = type;
							questionObj.AnswerShow = false;
							questionObj.ResourceShow = false;
							questionObj.queTit = v.body;
//							questionObj.Answer = v.answer;
							questionObj.Answer = checkAnswer(v.answer, item.typeId);
							questionObj.Analysis = v.analysis;
							//Chapter: [{Onetit: '学科', Twotit: '课本', Threetit: '章节'}]
							questionArray.push(questionObj);
						});
						$scope.questionBank.Out[type] = questionArray;
					});
				}
			}
		});
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
	
	//试卷类型转换工具
	$scope.idToEnglish = function(type){
		switch (type) {
			case "2": return "single"; break;
			case "4": return "many"; break;
			case "1": return "judge"; break;
			case "3": return "fillIn"; break;
			case "8": return "material"; break;
			case "6": return "briefAnswer"; break;
			case "7": return "clozeCloze"; break;
			case "5": return "reading"; break;
			default: break;
		}
	}
	
	
	
	
	
	
	
	
	
	
	/***************************************导学***************************************************/
	/**
	 * 根据导学id查询导学详情
	 */
	$scope.guidanceList = function(guidanceId){
		$http.get(guidanceLearningIp + 'learn?id='+guidanceId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.guidanceSituation=data.data[0];
				console.log($scope.variablePacket.guidanceSituation);
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
					angular.forEach(quz, function(item, index){
						if(index == 0){
							$scope.TestTab(0,item.ossFileName);
						}
						var test = {};
					    test.sign = false, //加减号
						test.ResourceTit = item.resourceName; //标题
						test.num = index; //记录点击的第几个
						test.id = item.ossFileName;
						$scope.insertTest.push(test);
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
	/***************************************导学***************************************************/
	
	
	
	
	
	/***************************************公共部分***************************************************/
	/**
	 * 判断是导学详情还是作业详情
	 * 郭峪诚
	 */
	if($scope.variablePacket.type == "guidance"){
		$scope.guidanceList($scope.variablePacket.packjectId);
		console.log("导学详情")
	}else{
		console.log("作业详情")
		$scope.getExamInfo();
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
	 * 切换资源展示
	 * @param {Object} index
	 * @param {Object} typeSrc  资源类型
	 * @param {Object} ossFileName    oss中资源id
	 * 郭峪诚
	 */
	$scope.ResLineTab = function(index, typeSrc,ossFileName) {
		$scope.variablePacket.testpaperBox_pic = false; 
		$scope.variablePacket.ResourcesTypeShow_pic = true;
		$scope.variablePacket.ResLineIndex = index;
		$scope.variablePacket.ResLineTab = index;
		$scope.variablePacket.TestIndex = -1;
		//根据filename查询播放展示路径
		var ossId = ossFileName;
		if(ossFileName.indexOf("_360")>0){
			ossId = ossFileName.substring(0,ossFileName.indexOf("_"));
		}
		$http.get(ossIp + 'filelog/'+ossId).success(function (data){
			if(data.code == 200){
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
					$scope.renderFinish();
					$("#pdfPlay").hide();
					$("#showplayer").hide();
					$("#tupian").show();
					$scope.variablePacket.ResLineType = "pic";
					$scope.variablePacket.imagePath = $scope.variablePacket.resourceDetail.previewUrl;
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
	/***************************************公共部分***************************************************/
	
	
	
}]);


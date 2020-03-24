app.controller('wrongAnswerCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '错题本';
	var stuId = sessionStorage.getItem("userId");
	//变量包
	$scope.variablePacket = {
		subjectArr : [],//[{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'},{name : '语文'}],		//导航科目
		subjectActive : 0,				//导航学科默认选中高亮
		wrongAnswerType : 0,			//答错的题、上传的题切换
		resourceBox : false,			//查看资源详情弹框	
		resourceUpload : false,			//上传资源弹框
		resourceArr : [],//[{name : '你是大头鬼是的撒'},{name : '222你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'},{name : '你是大头鬼是的撒'}],			//资源列表
		
		//zyx----2018.07.20
		eightSwitchOut: [ //弹层内8种题型
			{"id":"2","name":"单选题",Type:'single',show:false},     
			{"id":"4","name":"多选题",Type:'many',show:false},
			{"id":"1","name":"判断题",Type:'judge',show:false},
			{"id":"3","name":"填空题",Type:'fillIn',show:false},
			{"id":"8","name":"材料题",Type:'material',show:false},
			{"id":"6","name":"简答题",Type:'briefAnswer',show:false},
			{"id":"7","name":"完形填空",Type:'clozeCloze',show:false},
			{"id":"5","name":"阅读理解",Type:'reading',show:false}
		],
		insertChoice_eightType: 0, //8种题型的默认状态
		subjectId:'', //选择科目默认ID
		xuekeId:'',
		treeIds:'',
		stuId:stuId,
		gradeId:'',
		classId:'',
		sumCount:0,
		subjectId:'', //选择科目默认ID
		questionType:'2',
		uploadName:'',
		delQuestionId:'',//要删除的试题id
		uploadWrongName:'',
		uploadWrongFileName:'',
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,					//其他
		}
	
	};
	
	//获取学生信息
	$scope.findStuInfo= function(){
		var url = jeucIp+"uc/user/"+stuId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuName = data.realname;
				
				$scope.variablePacket.classId = data.classId;
				$scope.variablePacket.gradeId = data.gradeId;
				//查询学科
				$scope.findSubjectList();
			}
		});
	}
	$scope.findStuInfo();
	//获取科目
	$scope.findSubjectList= function(){
		var url = jeucIp+"edu/eduSubject?gradeId="+$scope.variablePacket.gradeId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				var dataArray = [];
				var dataObj = {};
				for(var i=0; i<data.length; i++){
					dataObj = {};
					dataObj.id=data[i].id;
					dataObj.name=data[i].name;
					dataArray.push(dataObj);
				}
				$scope.variablePacket.subjectArr = dataArray;
				if(dataArray.length>0){
					$scope.variablePacket.subjectId = dataArray[0].id;
					$scope.variablePacket.xuekeId = dataArray[0].id;
					console.log($scope.variablePacket.xuekeId)
					//查询任务列表
					$scope.findStuWrong();
				}
			}
		});
	}
	
	$scope.findStuWrong = function(){
		var url = lessonIp+"wrongQuestion/findStuWrong?studentId="+$scope.variablePacket.stuId;
		url+="&type="+$scope.variablePacket.wrongAnswerType;
		if($scope.variablePacket.questionType!=""){
			url+="&typeId="+$scope.variablePacket.questionType;
		}
		if($scope.variablePacket.subjectId!=""){
			url+="&subId="+$scope.variablePacket.subjectId;
		}
		if($scope.variablePacket.treeIds!=""){
			url+="&treeIds="+$scope.variablePacket.treeIds;
		}
		$scope.questionBank.In = {};
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var english = idToEnglish($scope.variablePacket.questionType);
				var data = result.data;
				if($scope.variablePacket.wrongAnswerType=="0"){
					var typeObj = {};
					//答错的题
					var valueObject = {};
					if(data==undefined){
						return false;
					}
					for(var i=0; i<data.length; i++){
						valueObject = {};
						question = data[i];
						var type = question.type;
						var typeArray = [];
						if($scope.questionBank.In[english]!=undefined){
							typeArray = $scope.questionBank.In[english];
						}
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
						valueObject.Id = i;
						valueObject.id = question.id;
						valueObject.Type = english; //题型
						valueObject.type = type;
						valueObject.CanResource = resourceFlag ;//是否显示资源
						valueObject.Resource = resourceArray; //插入带过来的资源数据
						valueObject.AnswerShow = false; //默认答案不显示
						valueObject.queTit = question.body; //题干
						valueObject.Answer = checkAnswer(question.answer, type); //答案
						valueObject.Analysis = question.analysis;//解析
						valueObject.sort = question.sort;//排序
						typeArray.push(valueObject);
						$scope.questionBank.In[english]=typeArray;
					}
					$scope.variablePacket.sumCount = $scope.questionBank.In[english].length;
				}else{
					//上传的题
					$scope.variablePacket.resourceArr = data;
				}
			}
		})
	}
	
	//校验为答题，选项格式
	function checkAnswer(answer, type){
		switch (type) {
            case "2":
            case "8":
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
       		case "4":
       			var obj = {
					daanA: false,
					daanB: false,
					daanC: false,
					daanD: false
				}
       			if(answer.indexOf("A")!=-1){
       				obj.daanA = true;
       			}
       			if(answer.indexOf("B")!=-1){
       				obj.daanB = true;
       			}
       			if(answer.indexOf("C")!=-1){
       				obj.daanC = true;
       			}
       			if(answer.indexOf("D")!=-1){
       				obj.daanD = true;
       			}
            	return obj;
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
       			var qoArray = [];
       			var qoObj = {};
       			for(var i=0; i<split.length; i++){
       				qoObj = {};
       				qoObj.daan=split[i];
       				qoArray.push(qoObj);
       			}
            	return qoArray;
           		break;
            default:
            	break;
        }
	}
	
	/**
	 * 查询导学的列表
	 */
	$scope.getGuidanceLearningList = function(pageSize,subjectId) {
	
	}
	// 根据左侧树查询
	$rootScope.findListByTree = function(subjectID,knowledge) {
		console.log(subjectID+" / "+knowledge);
		$scope.variablePacket.treeIds = subjectID;
		$scope.variablePacket.pageNo = 1;
		$scope.variablePacket.sumCount = 0;
		//查询任务列表
		$scope.findStuWrong();
	};
	// 根据左侧树全部查询（没什么用，就是清空树节点id，上面已经实现）
	$rootScope.findResAll  = function() {}
	
	/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		console.log(thisCharterIds);
	}
	
	//导航学科切换事件
	$scope.subjectTab = function (i,id){
		$scope.variablePacket.subjectActive = i;
		$scope.variablePacket.subjectId = id;
		$scope.variablePacket.xuekeId = id;
		$scope.variablePacket.treeIds = '';
		$scope.variablePacket.sumCount = 0;
		//查询任务列表
		$scope.findStuWrong();
	};
	
	//答错的题、上传的题切换
	$scope.wrongAnswerTypeTab = function (i){
		$scope.variablePacket.wrongAnswerType = i;
		$scope.variablePacket.questionType = '2';
		$scope.variablePacket.insertChoice_eightType = 0;
		$scope.variablePacket.sumCount = 0;
		//查询任务列表
		$scope.findStuWrong();
	};
	
	//查看资源详情弹框
	$scope.resourceBoxFn = function (name, fileName){
		$scope.variablePacket.uploadWrongName = name;
		$scope.variablePacket.uploadWrongFileName = fileName;
		$scope.variablePacket.resourceBox = true;
	};
	
	//上传资源弹框
	$scope.resourceUploadFn = function (){
		angular.element('.zy_resource_upload_box').css('display','block');
		$scope.variablePacket.resourceUpload = true;
	};
	
	//上传资源弹框提交按钮
	$scope.submitFn = function (){
		console.log($scope.variablePacket.uploadName);
		if($scope.variablePacket.uploadName!=null && $scope.variablePacket.uploadName!=""){
			console.log("可以上传")
			uploader.upload();
		}else {
			$scope.wranShow("请完善信息！",false);
			return false;
		}
	
//		//"上传"-->"暂停"
//		$(this).hide();
//		$(".itemStop").show();
	};
	
	//上传错题存库
	function insert(file) {
		var params = {};
		params.studentId = $scope.variablePacket.stuId;
		params.name = $scope.variablePacket.uploadName;
		params.fileName = "/"+file.createDateStr+"/"+file.fileName;
		console.log(params);
		$http.post(lessonIp+"wrongQuestion/uploadWrongQuestion", params).success(function(data) {
			if(data.ret==200){
				$scope.variablePacket.resourceUpload = false;
				$scope.wranShow('上传成功',true);
				$scope.variablePacket.uploadName = "";
				//重新查询学生错题
				$scope.findStuWrong();
			}else{
				$scope.wranShow('上传失败',false)
			}
		});
	}
		
	
	
	//zyx----2018.07.20
	//删除
	$scope.Del = function(type,index,number, id) {
		$scope.variablePacket.delQuestionId = id;
		$scope.promptShow('确认删除？', false, '' + $scope.variablePacket.eightSwitchOut[number].name + (index + 1) + '');
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			var url = lessonIp+"wrongQuestion/deleteWrong/"+$scope.variablePacket.delQuestionId;
			$http.delete(url).success(function(result) {
				if(result.ret==200){
					$scope.questionBank.In[type].splice(index, 1);
					$scope.wranShow('删除成功!', true, '' + $scope.variablePacket.eightSwitchOut[number].name + (index + 1) + '');
				}else{
					$scope.wranShow('删除失败!', false, '' + $scope.variablePacket.eightSwitchOut[number].name + (index + 1) + '');
				}
			});
		}
	}
	
	
	//删除资源
	$scope.delResource = function(e,i,id){
		$scope.variablePacket.delQuestionId = id;
		e.stopPropagation();
		$scope.promptShow('确认删除?',false,$scope.variablePacket.resourceArr[i].name);
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			var url = lessonIp+"wrongQuestion/deleteUpload/"+$scope.variablePacket.delQuestionId;
			$http.delete(url).success(function(result) {
				if(result.ret==200){
					$scope.wranShow('删除成功!', true, $scope.variablePacket.resourceArr[i].name);
					$scope.variablePacket.resourceArr.splice(i,1);
				}else{
					$scope.wranShow('删除失败!', false, $scope.variablePacket.resourceArr[i].name);
				}
			});
		}
	}
	
	//查看答案及解析、
	$scope.lookAnswer = function(type, index, answer) {
		$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
	}
	
	//8种题型的切换
	$scope.insertChoice_eightSwitchTab = function(index, typeId) {
		$scope.variablePacket.insertChoice_eightType = index;
		$scope.variablePacket.questionType = typeId;
		//查询任务列表
		$scope.findStuWrong();
	}
	
	//8种题型
	$scope.questionBank = {
		In: {
			//单选
//			single: [{
//					Id: 0,
//					CanResource: true, //是否显示资源
//					Resource: [{
//						ResourceTit: '收到货发生的符合',
//						ResourceSrc: 4,
//						ResourceNum: 0
//					}], //插入带过来的资源数据
//					Type: 'single', //题型
//					AnswerShow: true, //默认答案不显示
//					queTit: '111函数g（x） = f（x） - x +3的零点的集合为', //题干
//					Answer: 'B', //答案
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B', //解析
//					
//				}, {
//					Id: 1,
//					CanResource: false,
//					Resource: [{
//						ResourceTit: '',
//						ResourceSrc: 0,
//						ResourceNum: 0
//					}],
//					Type: 'single',
//					AnswerShow: false,
//					queTit: '222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//					Answer: 'C',
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//					
//				}, {
//					Id: 2,
//					CanResource: false,
//					Resource: [{
//						ResourceTit: '',
//						ResourceSrc: 0,
//						ResourceNum: 0
//					}],
//					Type: 'single',
//					AnswerShow: false,
//					queTit: '333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//					Answer: 'C',
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//					
//				}
//
//			],
//			//多选
//			many: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'many', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
//				Answer: {
//					daanA: true,
//					daanB: true,
//					daanC: false,
//					daanD: false
//				}, //答案
//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'many',
//				AnswerShow: false,
//				queTit: '222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//				Answer: {
//					daanA: false,
//					daanB: true,
//					daanC: true,
//					daanD: false
//				},
//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				
//			}, {
//				Id: 2,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'many',
//				AnswerShow: false,
//				queTit: '333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//				Answer: {
//					daanA: true,
//					daanB: false,
//					daanC: false,
//					daanD: true
//				},
//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//				
//			}],
//			//判断
//			judge: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'judge', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '111天上有2个太阳吗？', //题干
//				Answer: '错误', //答案
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'judge',
//				AnswerShow: false,
//				queTit: '222你是谁？我是谁？是游戏吗？',
//				Answer: '正确',
//				Analysis: '是是是是',
//				
//			}],
//			//填空
//			fillIn: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'fillIn', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
//				Answer: '11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。', //答案
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'fillIn',
//				AnswerShow: false,
//				queTit: '222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。',
//				Answer: '22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。', //答案
//				Analysis: '天上有一个太阳',
//				
//			}],
//			//材料
//			material: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'material', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '为什么李白特别钟情于庐山？', //题干
//				Answer: '暧暧远人村 | 川泽纡其骇瞩', //答案
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'material',
//				AnswerShow: false,
//				queTit: '你是谁？我是谁？是游戏吗？',
//				Answer: '暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis: '是是是是',
//				
//			}],
//			//简答
//			briefAnswer: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'briefAnswer', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '为什么李白特别钟情于庐山？', //题干
//				Answer: '11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。', //答案
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'briefAnswer',
//				AnswerShow: false,
//				queTit: '你是谁？我是谁？是游戏吗？',
//				Answer: '22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis: '是是是是',
//				
//			}, {
//				Id: 2,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'briefAnswer',
//				AnswerShow: false,
//				queTit: '为什么李白特别钟情于庐山？',
//				Answer: '33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis: '是是是是',
//				
//			}],
//			//完形填空
//			clozeCloze: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'clozeCloze', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: "天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
//				Answer: [{
//					daan: 'A'
//				}, {
//					daan: 'B'
//				}, {
//					daan: 'D'
//				}], //答案
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'clozeCloze',
//				AnswerShow: false,
//				queTit: "地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.",
//				Answer: [{
//					daan: 'C'
//				}, {
//					daan: 'B'
//				}, {
//					daan: 'D'
//				}],
//				Analysis: '地上有个月亮',
//				
//			}],
//			//阅读理解
//			reading: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				Type: 'reading', //题型
//				AnswerShow: false, //默认答案不显示
//				queTit: '11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
//				myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
//				Analysis: '天上有一个太阳', //解析
//				
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'reading',
//				AnswerShow: false,
//				queTit: '22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
//				myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
//				Analysis: '是是是是',
//				
//			}]
		}
	}

	
	$scope.renderFinish = function(){
		//填空题答案类型的转换
		$scope.fillInArr = [];
		angular.forEach($scope.questionBank.In.fillIn, function(e, i) {
			$scope.fillInArr.push($scope.questionBank.In.fillIn[i].Answer.split("|"));
		})
	
		//材料题答案类型的转换
		$scope.materialArr = [];
		angular.forEach($scope.questionBank.In.material, function(e, i) {
			$scope.materialArr.push($scope.questionBank.In.material[i].Answer.split("|"));
		})
	
		//简答题答案类型的转换
		$scope.briefAnswerArr = [];
		angular.forEach($scope.questionBank.In.briefAnswer, function(e, i) {
			$scope.briefAnswerArr.push($scope.questionBank.In.briefAnswer[i].Answer.split("|"));
		})
	}
	
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

		$("#theList").append('<li id="' + file.id + '">' +
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
		insert(file);
		$("#theList .itemDel").click();
		$(".itemStop").hide();
		$("#wenjian").hide();
		$(".itemUpload").hide();
		$(".itemDel").hide();
	};
	
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
			$scope.resourceBoxFn(resourceName.ossid,resourceName.ResourceTit,resourceName.objId);
		}
	}
	var ossidse = "";
	var ossbj = "";
	function getossid(ossidse,ossbj,ResourceTit) {
		$scope.variablePacket.clickResourceName=ResourceTit;
		$scope.variablePacket.insertResource = true;
		$scope.resourceBoxFn(ossidse,ResourceTit,ossbj);
		$timeout(function(){
			angular.element(".zy_resource_box_main").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
		})
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
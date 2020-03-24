app.controller('studentHomeworkDetailsAnswerCardCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	//接收参数
	var stuExamInfo = JSON.parse(sessionStorage.getItem("stuExamInfo"))
	var examId = stuExamInfo.examId;
	var examName = stuExamInfo.examName;
	var stuId = stuExamInfo.stuId;
	var stuName = stuExamInfo.stuName;
	var classId = stuExamInfo.classId;
	var className = stuExamInfo.className;
	
	//变量包
	$scope.variablePacket = {
		state:$stateParams.state,//unsubmitted：未提交；submission：已提交；
		type:$stateParams.type,//exercises:习题		testPaper:试卷
		changeWidth:false,//改变答题卡的宽度
		LookAnswerCard:false,//试卷模块是否显示
		IfRelative:false,//是否相对定位
		examId:examId,
		examName:'',
		remark:'',
		examTime:'',
		stuId:stuId,
		stuName:stuName,
		classId:classId,
		className:className,
		examAssemblyName:'',
		questionImgList:[]
	}
	
	//习题的数据
	$scope.echoQuestion = {
		//单选
		single : [
//			{
//				Id:0, 
//				Type:'single', //题型
//				myAnswer:'A',//我的答案--已提交选项
//				icon:"error",//我的答案--已提交图片
//				notLearnAnswer:""//未提交---答案
//			}
		],
		//多选
		many : [
//			{
//				Id:0,
//				Type:'many', //题型
//				myAnswer:'D,A',//我的答案--已提交选项
//				icon:"error",//我的答案--已提交图片
//				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false}//未提交---答案
//			}
		],
		//判断
		judge : [
//			{
//				Id:0,
//				Type:'judge', //题型
//				myAnswer:'正确',//我的答案--已提交选项
//				icon:"error",//我的答案--已提交图片
//				notLearnAnswer:''//未提交---答案
//			}
		],
		//填空
		fillIn : [
//			{
//				Id:0,
//				Type:'fillIn', //题型
//				myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//我的答案--已提交选项
//				notLearnAnswer:''//未提交---答案
//			}
		],
		//材料
		material : [
//			{
//				Id:0,
//				Type:'material', //题型
//				myAnswer:'暧暧远人村',//已提交---我的答案
//				icon:"error",//我的答案--已提交图片
//				notLearnAnswer:''//未提交---答案
//			}
		],
		//简答
		briefAnswer : [
//			{
//				Id:0,
//				Type:'briefAnswer', //题型
//				myAnswer:'暧暧远人村',//已提交---我的答案
//				icon:"error",//我的答案--已提交图片
//				notLearnAnswer:''//未提交---答案
//			}
		],
		//完形填空
		clozeCloze : [
//			{
//				Id:0,
//				Type:'clozeCloze', //题型
//				myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//已提交---我的答案
//				notLearnAnswer:[{daan:''},{daan:''}]//未提交---答案
//			},{
//				Id:1,
//				Type:'clozeCloze', 
//				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
//				notLearnAnswer:[{daan:''},{daan:''}]
//			}
		],
		//阅读理解
		reading : [
//			{
//				Id:1,
//				Type:'reading', 
//				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
//				notLearnAnswer:[{daan:''},{daan:''}]
//			}
		]
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
				$scope.variablePacket.remark = examData.remark;
				$scope.variablePacket.examTime = examData.startTime+"至"+examData.endTime;
				$scope.variablePacket.examAssemblyName = examData.examAssembly[0].name;
				$scope.variablePacket.questionImgList = examData.examAssembly[0].questionImgList;
				var questionOptionMap = examData.examAssembly[0].questionOptionMap;
				for(var t=0,tlen=questionOptionMap.length; t<tlen; t++){
					var key = questionOptionMap[t].typeId;
					var questionList = questionOptionMap[t].questions;
					var english = idToEnglish(key);
					var valueArray = [];
					var valueObject = {};
					//下标
					for(var i=0; i<questionList.length; i++){
						var question = questionList[i];
						var answerShow = false;
						if($scope.variablePacket.state=="submission"){
							answerShow = true;
						}
						valueObject = {};
						//下标
						valueObject.Id = i;
						//试题id
						valueObject.id = question.id;
						valueObject.Type = english; //题型
						valueObject.type = key;//题型
						valueObject.sort = question.sort;//排序
						valueObject.Answer = question.answer;//答案
						if($scope.variablePacket.state=='unsubmitted'){
							valueObject.notLearnAnswer = checkNotLearnAnswer(question.optionNum, key);//未学习---答案
						}else{
							valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, question.answer, $scope.variablePacket.state)//我的答案--已学习选项
							valueObject.icon = question.icon;//我的答案--已学习图片
						}
						valueArray.push(valueObject);
					}
					$scope.echoQuestion[english] = valueArray;
				}
			}
		});
	}
	$scope.findStuExamList();
	
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
	//保存
	$scope.delOk = function(){
		var examSubmit = {};
		examSubmit.examId = examId;
		examSubmit.type = 0;
		examSubmit.stuId = stuId;
		examSubmit.stuName = stuName;
		examSubmit.classId = classId;
		examSubmit.startTime = examData.stuStartTime;
		examSubmit.quizId = examData.quizId;
		var examAssemblyId = "";
		if(examData.examType>0){
			examAssemblyId = examData.examAssembly[0].id;
		}
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
		$http.post(lessonIp+"/stuExam/stuExamSubmit", params).success(function(data) {
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
	
	//点击答题卡变小
	$scope.changeSmall = function(){
		$scope.variablePacket.changeWidth = !$scope.variablePacket.changeWidth;
		if($scope.variablePacket.changeWidth){
			$timeout(function(){
				angular.element(".zyx_AddQuestion").mCustomScrollbar({
					mouseWheelPixels : 600,	//滚动速度
					theme: "3d-dark"			//滚动条样式
				});
			})
		}
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
	//校验答案格式
	function checkMyAnswer(myAnswer, icon, type, answer,state){
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
	
	$scope.scrollBar = function(){
		angular.element(".zyx_imgBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
	}
	
}]);
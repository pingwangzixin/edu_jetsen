app.controller('inClassMarkingCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	
	
	//zyx
	//变量包
	$scope.variablePacket = {
		stuList : {						
			notRead:[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			alreadyRead:[{name:'文学'},{name:'说的'},{name:'你丫的'}],
			noSub:[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		},
		eightSwitchOut: [
			{"name":"单选题",Type:'single',show:true},     
			{"name":"多选题",Type:'many',show:true},
			{"name":"判断题",Type:'judge',show:true},
			{"name":"填空题",Type:'fillIn',show:true},
			{"name":"材料题",Type:'material',show:true},
			{"name":"简答题",Type:'briefAnswer',show:true},
			{"name":"完形填空",Type:'clozeCloze',show:true},
			{"name":"阅读理解",Type:'reading',show:true}
		],
		selectSubject: [
			{'name': '数学'}, 
			{'name': '语文'}, 
			{'name': '英语'}, 
			{'name': '政治'}
		],
		state: $stateParams.state, //new:布置导学	edit:复制导学
		//卷库
		TestIndex: -1, //试卷默认选中
		testpaperBox_pic: true,
		testpaperBox_line: true,
		type: $stateParams.type,
		packjectId:$stateParams.packjectId,
		assemblyId: $stateParams.assemblyId,
		classId: $stateParams.classId,
		stuId:"",
		stuName:"",
		stuState:"",
		stuAssemblyName:"",
		imgLookState:false,  //查看图片弹框
		imgIndex:0,       //点击左右按钮用到的下标,
		imgLength:0,      //点击查看图片时,图片的长度
		imgSrc:"",  //查看图片的路径
		prevState:true, //左箭头禁用
	    nextState:false, //右箭头禁用
	};
	
	 $scope.imgData=[        //图片数据
           {id:1,src:"img/10.png"},
           {id:2,src:"img/zy_main_after.jpg"},
           {id:3,src:"img/zyx_delwram.png"}
     ];
	$scope.lookImg=function(i){  //查看图片
		  $scope.variablePacket.imgLookState=true;
		  $scope.variablePacket.imgIndex=i;
		  $scope.variablePacket.imgLength=$scope.imgData.length;
		  $scope.variablePacket.imgSrc= $scope.imgData[i].src;
		  $scope.arrows();
		  
	};
	$scope.close=function(){   //关闭图片查看弹框
		
		   $scope.variablePacket.imgLookState=false;
	};
	$scope.delete=function(i){  //删除图片
		$scope.promptShow('确定要删除吗？', false);
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功！',true);
			$scope.imgData.splice(i,1);
		};
		
	};
	
	$scope.prev=function(){    //上一张
		 if($scope.variablePacket.imgIndex>0){
		 	 $scope.variablePacket.imgIndex--;
		 	 $scope.variablePacket.imgSrc= $scope.imgData[$scope.variablePacket.imgIndex].src;
		 };
		 $scope.arrows();
		 
	};
	$scope.next=function(){   //下一张
		 if($scope.variablePacket.imgIndex<$scope.variablePacket.imgLength-1){
		 	 $scope.variablePacket.imgIndex++;
		 	 $scope.variablePacket.imgSrc= $scope.imgData[$scope.variablePacket.imgIndex].src;
		 };
		 $scope.arrows();
	};
	
	$scope.arrows=function(){  //控制左右按钮的禁用状态
		 if($scope.variablePacket.imgIndex==0){
		  	$scope.variablePacket.prevState=true;
		  }else{
		  	$scope.variablePacket.prevState=false;
		  };
		  if($scope.variablePacket.imgIndex==$scope.variablePacket.imgLength-1){
		  	$scope.variablePacket.nextState=true;
		  }else{
		  	$scope.variablePacket.nextState=false;
		  };
	};
	
	//返回顶部
	$scope.zyx_blackTop = function(){
		$('html , body').animate({scrollTop: 0},'slow');
	}
	
	//保存事件
	$scope.SaveButton = function(){
		$scope.promptShow('确认要提交保存吗？', false, '');
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.teaReadyOver();
		}
	}

	//查看答案及解析
	$scope.lookAnswer = function(type, index, answer) {
		if($scope.variablePacket.insertChoiceAll) {
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		} else {
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}
	
	//客观题的答题选项
	$scope.markExam = function(obj, index, value){
		angular.element(obj.target).addClass('active').siblings().removeClass('active');
		$scope.questionBank.Out.briefAnswer[index].icon = value;
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



	//卷库题型的数据
	$scope.questionBank = {
		Out: {
			//单选
			single: [{
				Id:0, 
				Type:'single', //题型
				AnswerShow:false, //默认答案不显示
				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				myAnswer:'A',//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:"",//未学习---答案
				Answer:'B', //正确答案
			},{
				Id:1,
				Type:'single',
				AnswerShow:false,
				queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:'C',
				icon:"correct",
				notLearnAnswer:"",
				Answer:'C',
			},{
				Id:2,
				Type:'single',
				AnswerShow:false,
				queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:'B',
				icon:"half",
				notLearnAnswer:"",
				Answer:'C',
			}],
			//判断
			judge: [
				{
					Id:0,
					Type:'judge', //题型
					AnswerShow:false,//默认答案不显示
					queTit:'111天上有2个太阳吗？', //题干
					Analysis:'天上有一个太阳',//解析
					myAnswer:'正确',//我的答案--已学习选项
					icon:"error",//我的答案--已学习图片
					notLearnAnswer:'',//未学习---答案
					Answer:'错误',//正确答案
				},{
					Id:1,
					Type:'judge', 
					AnswerShow:false,
					queTit:'222你是谁？我是谁？是游戏吗？',
					Analysis:'是是是是',
					myAnswer:'正确',
					icon:"correct",
					notLearnAnswer:'',
					Answer:'正确',
				}
			],
			//简答
			briefAnswer:  [
				{
					Id:0,
					Type:'briefAnswer', //题型
					AnswerShow:false,//默认答案不显示
					queTit:'为什么李白特别钟情于庐山？', //题干
					Analysis:'天上有一个太阳',//解析
					myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
					notLearnAnswer:'',//未学习---答案
					Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//正确答案
				},{
					Id:1,
					Type:'briefAnswer', 
					AnswerShow:false,
					queTit:'你是谁？我是谁？是游戏吗？',
					Analysis:'是是是是',
					myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
					notLearnAnswer:'',
					Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				},{
					Id:2,
					Type:'briefAnswer', 
					AnswerShow:false,
					queTit:'为什么李白特别钟情于庐山？',
					Analysis:'是是是是',
					myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
					notLearnAnswer:'',
					Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
				}
			]
		}
	}

	$scope.findStu = function(){
		var url = lessonIp+"ExamCount/selectExamStu?examId="+$scope.variablePacket.packjectId
			+"&assemblyId="+$scope.variablePacket.assemblyId
			+"&classId="+$scope.variablePacket.classId;
//		var url = lessonIp+"ExamCount/selectExamStu?examId=1e90547d96d847f9a7833d0c3313de4e"
//			+"&assemblyId=1db276f823cd46519f10bff4b1b220aa&classId=1635f23723264e0f919c6404f146715d";
		$scope.variablePacket.stuId = '';
		$scope.variablePacket.stuName = '';
		$scope.variablePacket.stuState = '';
		$scope.variablePacket.stuAssemblyName = '';
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuList.noSub = data.wtj;
				$scope.variablePacket.stuList.notRead = data.ytj;
				$scope.variablePacket.stuList.alreadyRead = data.ypg;
				
				if(data.ytj!=undefined&&data.ytj.length>0){
					$scope.variablePacket.stuId = data.ytj[0].id;
					$scope.variablePacket.stuName = data.ytj[0].name;
					$scope.variablePacket.stuState = data.ytj[0].state;
				}else if(data.ypg!=undefined&&data.ypg.length>0){
					$scope.variablePacket.stuId = data.ypg[0].id;
					$scope.variablePacket.stuName = data.ypg[0].name;
					$scope.variablePacket.stuState = data.ypg[0].state;
				}
				//查询作业详情
				$scope.getAssemblyInfo();
				
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
	
	$scope.clickStu = function(id, name, state){
		$scope.variablePacket.stuId = id;
		$scope.variablePacket.stuName = name;
		$scope.variablePacket.stuState = state;
		//查询学生回答
		$scope.getAssemblyInfo();
	}

	//查询任务内容and学生回答
	$scope.getAssemblyInfo = function(){
		var url = lessonIp+"stuExam/getAssemblyInfo?assemblyId="+$scope.variablePacket.assemblyId;
		if($scope.variablePacket.stuId!=''){
			url += "&stuId="+$scope.variablePacket.stuId;
			var typeName = "导学";
			if($scope.variablePacket.type=="homework"){
				typeName = "作业";
			}
			$scope.variablePacket.stuAssemblyName = $scope.variablePacket.stuName+"的"+typeName;
		}else{
			$scope.variablePacket.stuAssemblyName = '试卷详情';
		}
		$scope.questionBank.Out = {};
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var examAssembly = result.data;
				$scope.examAssembly = examAssembly;
				var titles = "";
				var questionMap = examAssembly.questionMap;
				$scope.variablePacket.assemblyName = examAssembly.name;
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
						if($scope.variablePacket.stuId!=''){
							valueObject.myAnswer = checkMyAnswer(question.myAnswer, question.icon, key, question.answer)//我的答案--已学习选项
							var img = [];
							for(var m=0; m<question.myAnswerImg.length; m++){
								var imgSrc = examAssembly.previewUrl+question.myAnswerImg[m];
								img.push(imgSrc);
							}
							valueObject.img = img;
							valueObject.icon = question.icon;//我的答案--已学习图片
							valueObject.comment = question.comment;
						}
						valueArray.push(valueObject);
					}
					$scope.questionBank.Out[english] = valueArray;
				}
				titles=titles.substring(1);
				$scope.variablePacket.eightSwitchOut = checkTitle(titles);
			}
		});
	}
	//调用查询学生
	$scope.findStu();
	
	var submitFlag = false;
	//提交批改
	$scope.teaReadyOver = function(){
		if(submitFlag){
			return false;
		}
		//是否全部主观题都批阅
		var readyOverFlag = false;
		
		var questionArray = questionArray = [];
		/*//单选题
		angular.forEach($scope.questionBank.Out.single,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionArray.push(questionObj);
		})
		//判断题
		angular.forEach($scope.questionBank.Out.judge,function(e){
			questionObj = {};
			questionObj.questionId = e.id;
			questionArray.push(questionObj);
		})*/
		//简答题
		angular.forEach($scope.questionBank.Out.briefAnswer,function(e){
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
		submitFlag = true;
		var quesionArrayJson = JSON.stringify(questionArray);
		var params = {examId:$scope.variablePacket.packjectId, assemblyId:$scope.variablePacket.assemblyId, 
						stuId:$scope.variablePacket.stuId, type:0, quesionArrayJson:quesionArrayJson};
		$http.post(lessonIp+"ExamCount/teaReadyOver", params).success(function(data) {
			submitFlag = false;
			if(data.ret==200){
				$scope.wranShow('批阅成功',true);
				//重新刷新、查询学生
				$scope.findStu();
			}else{
				$scope.wranShow('批阅失败',false);
			}
		});
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
		}else{
			typeObject = {};
			typeObject.id = "2";
			typeObject.name = "单选题";
			typeObject.Type = "single";
			typeObject.show = false;
			typeObject.index = 0;
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
		}else{
			typeObject = {};
			typeObject.id = "1";
			typeObject.name = "判断题";
			typeObject.Type = "judge";
			typeObject.show = false;
			typeObject.index = 2;
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
		}else{
			typeObject = {};
			typeObject.id = "6";
			typeObject.name = "简答题";
			typeObject.Type = "briefAnswer";
			typeObject.show = false;
			typeObject.index = 5;
			title.push(typeObject);
		}
		return title;
	}	
	//校验答案格式
	function checkMyAnswer(myAnswer, icon, type, answer){
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
}]);

//资源图标
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

//学生提交状态
app.filter('checkState', function() {
    return function(objId) {
        var value = "";
        switch(objId)
        {
            case '0':
                value = "未提交";
                break;
            case '1':
                value = "待批阅";
                break;
            case '2':
                value = "已批阅";
                break;
            default:
            	break;
        }
        return value;
    };
    

    
    
   
});
app.controller('studentHomeworkListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	//变量包
	$scope.variablePacket = {
		subjects : [],	//[{id:'yuwen',name:'语文'},{id:'shuxue',name:'数学'},{id:'yingyu',name:'英语'}], //科目选择
		curr : 0 , //初始化当前状态
		states:[{id:0,name:'未提交',state:'unsubmitted'},{id:1,name:'已提交',state:'submission'},{id:2,name:'已批阅',state:'readyOver'}],
		stateIndex:0, //状态索引
		state:"unsubmitted", //默认状态为未提交
		subjectId:'', //选择科目默认ID
		xuekeId:'',
		treeIds:'',
		stuId:sessionStorage.getItem('userId'),
		stuName:'',
		gradeId:'',
		classId:'',
		className:'',
		pageNo:1,
		pageSize:5,
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,					//其他
		}
	};
	
	//模拟科目资料数据
	$scope.subjectsData = [
//		{id:1,name:'习题习题习题习题习题习题习题习题',startTime:'2017-08-20',endTime:'2017-08-25',state:'unsubmitted',type:'exercises'},
//		{id:2,name:'习题习题习题习题习题习题习题习题',startTime:'2017-08-20',endTime:'2017-08-25',state:'submission',type:'exercises'},
//		{id:3,name:'习题习题习题习题习题习题习题习题',startTime:'2017-08-20',endTime:'2017-08-25',state:'readyOver',type:'exercises'},
//		{id:4,name:'组卷组卷组卷组卷组卷组卷组卷组卷',startTime:'2017-08-20',endTime:'2017-08-25',state:'unsubmitted',type:'testPaper'},
//		{id:5,name:'答题卡答题卡答题卡答题卡答题卡',startTime:'2017-08-20',endTime:'2017-08-25',state:'unsubmitted',type:'answerCard'},
//		{id:6,name:'组卷组卷组卷组卷组卷组卷组卷组卷',startTime:'2017-08-20',endTime:'2017-08-25',state:'submission',type:'testPaper'},
//		{id:7,name:'答题卡答题卡答题卡答题卡答题卡',startTime:'2017-08-20',endTime:'2017-08-25',state:'submission',type:'answerCard'},
//		{id:8,name:'组卷组卷组卷组卷组卷组卷组卷组卷',startTime:'2017-08-20',endTime:'2017-08-25',state:'readyOver',type:'testPaper'},
//		{id:9,name:'答题卡答题卡答题卡答题卡答题卡',startTime:'2017-08-20',endTime:'2017-08-25',state:'readyOver',type:'answerCard'}
	];		
	
	//获取学生id
//	var stuId = '956ff099a4ec463f9271a5df3aacba28';
	var state = 0;
	
	//获取学生信息
	$scope.findStuInfo= function(){
		var url = jeucIp+"uc/user/"+$scope.variablePacket.stuId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuName = data.realname;
				
				$scope.variablePacket.classId = data.classId;
				$scope.variablePacket.className = data.gradeName+data.className+"班";
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
				$scope.variablePacket.subjects = dataArray;
				if(dataArray.length>0){
					$scope.variablePacket.subjectId = dataArray[0].id;
					$scope.variablePacket.xuekeId = dataArray[0].id;
					//查询任务列表
					$scope.findStuExamList(false);
				}
			}
		});
	}
	
	var examArray = [];
	var oneTime = "";
	//获取任务列表
	$scope.findStuExamList = function(flag){
		var url = lessonIp+"stuExam/findStuExamList?type=0&stuId="+$scope.variablePacket.stuId
		+"&classId="+$scope.variablePacket.classId
		+"&state="+state
		+"&subId="+$scope.variablePacket.subjectId
		+"&treeIds="+$scope.variablePacket.treeIds
		+"&pageNo="+$scope.variablePacket.pageNo
		+"&pageSize="+$scope.variablePacket.pageSize;
		if(flag){
			url+="&oneTime="+oneTime;
		}
		$scope.subjectsData = examArray;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				var examObj = {};
				for (var i=0; i<data.length; i++) {
					oneTime = data[0].oneTime;
					examObj.id=data[i].id;
					examObj.name=data[i].name;
					examObj.startTime=data[i].startTime;
					examObj.endTime=data[i].endTime;
					examObj.remark=data[i].remark;
					examObj.state=checkStuState(data[i].stuState);
					var stateType = "";
					if(data[i].examType==0){
						stateType = "exercises";
					}else if(data[i].examType==1){
						stateType = "testPaper";
					}else if(data[i].examType==2){
						stateType = "answerCard";
					}
					examObj.type=stateType;
					examArray.push(examObj);
					examObj = {};
				}
				$scope.subjectsData = examArray;
			}
		});
	}
	
	/**
	 * 查询导学的列表
	 */
	$scope.getGuidanceLearningList = function(pageSize,subjectId) {
	
	}
	
	/**
	 * 加载更多
	 */
	$scope.jiazai = function(pageSize){
		$scope.variablePacket.pageNo+=1;
		$scope.findStuExamList(true);
	}	
	
	// 根据左侧树查询
	$rootScope.findListByTree = function(subjectID,knowledge) {
		console.log(subjectID+" / "+knowledge);
		$scope.variablePacket.treeIds = subjectID;
		$scope.variablePacket.pageNo = 1;
		examArray = [];
		//查询任务列表
		$scope.findStuExamList(false);
	};
	// 根据左侧树全部查询（没什么用，就是清空树节点id，上面已经实现）
	$rootScope.findResAll  = function() {}
	
	$scope.addParams = function(examId, url, type, examName, examTime, remark){
		var stuExamInfo = {};
		stuExamInfo.examId = examId;
		stuExamInfo.examName = examName;
		stuExamInfo.examTime = examTime;
		stuExamInfo.remark = remark;
		stuExamInfo.stuId = $scope.variablePacket.stuId
		stuExamInfo.stuName = $scope.variablePacket.stuName;
		stuExamInfo.classId = $scope.variablePacket.classId;
		stuExamInfo.className = $scope.variablePacket.className;
		stuExamInfo = JSON.stringify(stuExamInfo);
		sessionStorage.setItem('stuExamInfo', stuExamInfo);
		var param = {};
		param.state = $scope.variablePacket.state;
		param.type = type;
		$state.go(url, param, {reload:true});
	}
	
	// tab切换（学科切换）
	$scope.guideToggle=function(id,index){
		$scope.variablePacket.curr=index;
		$scope.variablePacket.subjectId = id;
		$scope.variablePacket.xuekeId = id;
		examArray = [];
		$scope.subjectsData = examArray;
		$scope.variablePacket.pageNo = 1;
		oneTime="";
		$scope.variablePacket.treeId = '';
		//查询任务列表
		$scope.findStuExamList(false);
	};
	
	// tab切换（状态切换）
	$scope.stateChange = function(subjectId,index,id,isLearn){
		$scope.variablePacket.stateIndex=index;
		$scope.variablePacket.state=isLearn;
		state = id;
		examArray = [];
		$scope.subjectsData = examArray;
		$scope.variablePacket.pageNo = 1;
		oneTime="";
		$scope.findStuExamList(false);
	}
	
	function checkStuState(state){
		if(state==1){
			return "submission";			
		}else if(state==2){
			return "readyOver";			
		}else{
			return "unsubmitted";
		}
	}
	function checkExamType(type){
		if(type==0){
			return "exercises";
		}else if(type==1){
			return "testPaper";			
		}else if(type==2){
			return "answerCard";			
		}
	}
	
	/*$rootScope.findAll = function(){
		$scope.variablePacket.selectType = 0;
		$scope.variablePacket.subjectId = null;
		$scope.getGuidanceLearningList(1,$scope.variablePacket.subjectId);
	}*/
	
	/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		console.log(thisCharterIds);
	}
	
}]);
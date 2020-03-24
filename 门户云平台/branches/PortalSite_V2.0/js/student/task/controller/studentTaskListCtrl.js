app.controller('studentTaskListCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	
	var state = 0;
	//变量包
	$scope.variablePacket = {
		subjects : [],	//[{id:'yuwen',name:'语文'},{id:'shuxue',name:'数学'},{id:'yingyu',name:'英语'}], //科目选择
		curr : 0 , //初始化当前状态
		states:[{id:0,name:'未提交',state:'unsubmitted'},{id:1,name:'已提交',state:'submission'},{id:2,name:'已批阅',state:'readyOver'}],
		stateIndex:0, //状态索引
		state:"unsubmitted", //默认状态为未提交
		subjectId:'', //选择科目默认ID
		stuId:sessionStorage.getItem('userId'),
		stuName:'',
		gradeId:'',
		classId:''
	};
	///模拟科目资料数据
	$scope.subjectsData = [
//		{id:1,name:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-25',state:'unsubmitted'},
//		{id:2,name:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-25',state:'submission'},
//		{id:3,name:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-25',state:'readyOver'},
	];	
	
	//获取学生信息
	$scope.findStuInfo= function(){
		var url = jeucIp+"uc/user/"+$scope.variablePacket.stuId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuName = data.realname;
				$scope.variablePacket.classId = data.classId;
				$scope.variablePacket.gradeId = data.gradeId;
				//查询任务列表
				$scope.findStuExamList();
			}
		});
	}
	$scope.findStuInfo();
	//获取学科
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
					//查询任务列表
					$scope.findStuExamList();
				}
			}
		});
	}
	
	//获取任务列表
	$scope.findStuExamList= function(){
		var url = lessonIp+"stuExam/findStuExamList?stuId="+$scope.variablePacket.stuId
		+"&classId="+$scope.variablePacket.classId
		+"&type=1&state="+state+"&pageNo=1&pageSize=5";
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				var dataArray = [];
				var dataObj = {};
				for(var i=0; i<data.length; i++){
					dataObj = {};
					dataObj.id=data[i].id;
					dataObj.name=data[i].name;
					dataObj.startTime=data[i].startTime;
					dataObj.endTime=data[i].endTime;
					dataObj.state=checkStuState(data[i].stuState);
					dataArray.push(dataObj);
				}
				$scope.subjectsData = dataArray;
			}
		});
	}
	
	// tab切换（学科切换）
	$scope.guideToggle=function(id,index){
		$scope.variablePacket.curr=index;
		$scope.variablePacket.subjectId = id;
		$scope.findStuExamList();
	};
	
	// tab切换（状态切换）
	$scope.stateChange = function(subjectId,index,isLearn, id){
		$scope.variablePacket.stateIndex=index;
		$scope.variablePacket.state=isLearn;
		state = id;
		$scope.findStuExamList();
	}
	
	$scope.addParams = function(examId){
		var stuTaskInfo = {};
		stuTaskInfo.examId = examId;
		stuTaskInfo.stuId = $scope.variablePacket.stuId;
		stuTaskInfo.stuName = $scope.variablePacket.stuName;
		stuTaskInfo.classId = $scope.variablePacket.classId;
		stuTaskInfo = JSON.stringify(stuTaskInfo);
		sessionStorage.setItem('stuTaskInfo', stuTaskInfo);
		$state.go('secondNav.taskStateContent',{state:$scope.variablePacket.state},{reload:true});
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
}]);
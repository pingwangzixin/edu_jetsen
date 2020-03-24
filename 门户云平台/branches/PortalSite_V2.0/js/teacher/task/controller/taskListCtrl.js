app.controller('taskListCtrl', ['$scope','$rootScope','$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope,$rootScope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	var userId = sessionStorage.getItem('userId');
	var userType = sessionStorage.getItem('userType');
	//跳转学生
	if(userType=="2"){
		$state.go('secondNav.studentTaskList');
		return false;
	}
	
	//变量包
	$scope.variablePacket = {
		subjects : [], // 选择科目
		subjectName : '语文', // 默认科目
		selectClass : [],  // 选择班级
		selectState : [{id:'1',name:'进行中',state:'isOngoing'},{id:'2',name:'未开始',state:'isStart'},{id:'3',name:'已结束',state:'isEnd'}],  // 选择状态
		subjectIndex : 0,  //学科索引
		classIndex : 0,  //班级索引
		stateIndex : 0,  //状态索引
		isOngoing:true,  //状态(进行中)
		isStart:false,   //状态(开始)
		isEnd:false,     //状态(结束)
		state : "isOngoing",  //默认状态
	};
	$scope.classSummary = {  //每个班级资料
		sevenClassOne : [
			/*{id:1,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-25',totalNum:24,complete:10,state:'isOngoing',isOngoing:true},
			{id:2,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-22',totalNum:20,complete:10,state:'isStart',isStart:true},
			{id:3,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:0,state:'isEnd',isEnd:true},
			{id:4,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true},
			{id:5,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-22',totalNum:20,complete:10,state:'isStart',isStart:true},
			{id:6,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:12,state:'isEnd',isEnd:true},
			{id:7,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true},
			{id:8,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:0,state:'isStart',isEnd:true},
			{id:9,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true},
			{id:10,title:'1六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-24',totalNum:24,complete:24,state:'isOngoing',isOngoing:true}*/
		]
	};	
	//获取不同科目
	$scope.getName = function(index,n){
		$scope.variablePacket.numPerPage = 3;
		$scope.variablePacket.subjectIndex = index;
		$scope.variablePacket.subjectName=n.name;
	};
	//作业状态
 	var stateId;
 	//var teacherId = "84d5f23a09a8494f9cb4046392fcea55";
 	var teacherId = sessionStorage.getItem('userId');//获取
 	$scope.puttask = function(index,name,id){
 		$state.go('secondNav.taskContent',{state:"echo",taskid:id});
 	}
 	//ui-sref="secondNav.taskContent({'state':'echo'},{'itemid':'value.id'},{'reload':'true'})"
	/**
    * 查询当前教师的 授课信息
    */
    $http.get(zyxrequireIp + '/uc/user/'+teacherId).success(function(suc) {
    	console.log($scope.variablePacket.subjectIndex);
    	$scope.variablePacket.selectSubject=[];
        if(suc.ret == 200) {
        	var data = suc.data;
        	//var subMapTem = {};
        	var claMapTem = {};
    		angular.forEach(data.userCourse, function(item){
    				/*if(typeof(subMapTem[item.subjectId])=="undefined"){
    				var subj = {
	                    id:item.subjectId,
	                    name :item.subjectName,
	                };
	                $scope.variablePacket.subjects.push(subj);
	               // console.info($scope.variablePacket.subjects);
	                subMapTem[item.subjectId] = subj;
    			}*/
    			if(typeof(claMapTem[item.classId])=="undefined"){
    				var clas = {
	                    classId:item.classId,
	                    name :item.gradeName+item.className+"班",
	                };
	                $scope.variablePacket.selectClass.push(clas);
	                //console.info($scope.variablePacket.selectClass);
	                claMapTem[item.classId] = clas;
    			}
            });
//           $scope.variablePacket.subjectName=$scope.variablePacket.subjects[0].name;
//           $scope.variablePacket.subjectId=$scope.variablePacket.subjects[0].id;
             $scope.variablePacket.classId=$scope.variablePacket.selectClass[0].classId;
             $scope.variablePacket.className=$scope.variablePacket.selectClass[0].name;
             $scope.variablePacket.state = "isOngoing"; 
        }
        
       $scope.selectexam = {};
		//科目id
	 	subId = $scope.variablePacket.subjectId;
	 	//班级id
	 	classId =$scope.variablePacket.classId;
	 	className =$scope.variablePacket.className;
	 	//作业状态
	 	stateId = $scope.variablePacket.selectState[$scope.variablePacket.stateIndex].id;
	 	$scope.selectexam.classId = classId;
	 	$scope.selectexam.className = className;
	 	$scope.selectinexam();
	    });
	
	//年级切换tab
	$scope.selectClassTab = function(n,classid, className){
		$scope.variablePacket.numPerPage = 3;
		$scope.variablePacket.classIndex = n;
		$scope.variablePacket.classId = classid;
		$scope.selectexam.classId=classid;
		$scope.selectexam.className=className;
		$scope.selectinexam();
	};
	$scope.variablePacket.typesstate = 1;
	//状态切换tab
	$scope.selectStateTab = function(m,n){
		$scope.variablePacket.typesstate = n+1;
		$scope.variablePacket.numPerPage = 3;
		$scope.variablePacket.state=m;
		$scope.variablePacket.stateIndex = n;
		if($scope.variablePacket.state=='isOngoing'){
			$scope.variablePacket.isOngoing=true;
			$scope.variablePacket.isStart=false;
			$scope.variablePacket.isEnd=false;
		}else if($scope.variablePacket.state=='isStart'){
			$scope.variablePacket.isOngoing=false;
			$scope.variablePacket.isStart=true;
			$scope.variablePacket.isEnd=false;
		}else{
			$scope.variablePacket.isOngoing=false;
			$scope.variablePacket.isStart=false;
			$scope.variablePacket.isEnd=true;
		}
		$scope.selectinexam();
	};
	
	$scope.variablePacket.numPerPage = 3;
	//查询任务列表方法
	$scope.selectinexam = function (){
		//var selectexams = JSON.stringify($scope.selectexam);
		var url = lessonIp+"ExamCount/selectExam?subId=";
		 $http.get(url + ""+"&classId="+$scope.selectexam.classId+"&stateId="+$scope.variablePacket.typesstate+"&teacherId="+teacherId+"&type="+"1"+"&currentPage=1"+"&numPerPage="+$scope.variablePacket.numPerPage).success(function (response) {
	    	var examjson = JSON.stringify(response);
	    	var examjsons = JSON.parse(examjson)
	    	var  state = "";
	    	if(examjsons.message=="success"&&examjsons.data!=undefined){
	    		$scope.variablePacket.jzgd=true;
	            $scope.classSummary.sevenClassOne = [];
	    		angular.forEach(examjsons.data, function(item){
	    			var starttime = item.startTime;
	    			var endTime = item.endTime;
	    			var  state = "";
	    			if($scope.variablePacket.typesstate==1){
	    				state = "isOngoing";
	    			}else if($scope.variablePacket.typesstate==2){
	    				state = "isStart";
	    			}else if($scope.variablePacket.typesstate==3){
	    				state = "isEnd";
	    			}
	    			var subj = {
	                    id:item.id,
	                    title :item.name,
	                    startTime:starttime.substring(0,10),
	                    endTime:endTime.substring(0,10),
	                    totalNum:item.list[0].count,
	                    complete:item.list[0].stucount,
	                    state:state,
	                    isStart:true,
	                    type:'answerCard'
	                };
	                $scope.classSummary.sevenClassOne.push(subj);
	    		})
	    	}else{
	    		$scope.variablePacket.jzgd=false;
	    		subj = {};
	    		$scope.classSummary.sevenClassOne = [];
	    		$scope.classSummary.sevenClassOne.push(subj);
	    	}
		});
	};
	///删除
	$scope.deleteData = function (i,type,title,id){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
		var url = lessonIp+"ExamCount/deleteExam?examId=";
		 $http.get(url + id+"&type="+"1"+"&classid="+$scope.selectexam.classId).success(function (response) {
		 	var examjson = JSON.stringify(response);
	    	var examjsons = JSON.parse(examjson)
	    	if(examjsons.ret==200){
	    		console.log($scope.wranShow);
				$scope.classSummary[type].splice(i,1);
				$scope.variablePacket.prompt = false;
				$scope.wranShow('删除成功',true,title);
				$scope.selectinexam();
	    	}
		 });
			
		};
	};
	
	$scope.deleteLb = function (){
			$scope.variablePacket.numPerPage = 	$scope.variablePacket.numPerPage+3;
			$scope.selectinexam();
	}
	
	
	$scope.addParams = function(examId, state, type){
		var teaTaskInfo = {};
		teaTaskInfo.examId = examId;
		teaTaskInfo.classId = $scope.selectexam.classId;
		teaTaskInfo.className = $scope.selectexam.className;
		teaTaskInfo = JSON.stringify(teaTaskInfo);
		sessionStorage.setItem('teaTaskInfo', teaTaskInfo);
		$state.go('secondNav.reviewTask',{state:state,type:type},{reload:true});
	}
	
}]);
app.controller('homeworkListCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll','$rootScope',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll,$rootScope) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	
	var teacherId = sessionStorage.getItem('userId');//获取
	//var teacherId = "84d5f23a09a8494f9cb4046392fcea55";
	var userType = sessionStorage.getItem('userType');
	//跳转学生
	if(userType=="2"){
		$state.go('secondNav.studentHomeworkList');
		return false;
	}
	
	//变量包
	$scope.variablePacket = {
		subjects : [], // 选择科目
		subjectName : '', // 默认科目
		subjectId :'',
		selectClass : [],  // 选择班级
		selectState : [{id:'1',name:'进行中',state:'isOngoing'},{id:'2',name:'未开始',state:'isStart'},{id:'3',name:'已结束',state:'isEnd'}],  // 选择状态
		subjectIndex : 0,  //学科索引
		classIndex : 0,  //班级索引
		stateIndex : 0,  //状态索引
		isOngoing:true,  //状态(进行中)
		isStart:false,   //状态(开始)
		isEnd:false,     //状态(结束)
		state : "",  //默认状态
		classifyIndex : 0, //分类索引
		guideBox : false,  //布置作业弹框状态
		classId:'',
		className:'',
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,					//其他
		},
		classify : [{id:1, name:'课中作业'},{id:0,name:'课后作业'}] // 选择类型
	};
	$scope.classSummary = {  //每个班级资料
		sevenClassOne : [
			/*{id:1,title:'六年级语文期末复习资料汇总--习题',startTime:'2017-08-20',endTime:'2017-08-25',totalNum:24,complete:10,state:'isOngoing',isOngoing:true,type:'exercises'},
			{id:2,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-22',totalNum:20,complete:10,state:'isStart',isStart:true,type:'exercises'},
			{id:3,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:0,state:'isEnd',isEnd:true,type:'exercises'},
			{id:4,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true,type:'testPaper'},
			{id:5,title:'六年级语文期末复习资料汇总--试卷',startTime:'2017-08-20',endTime:'2017-08-22',totalNum:20,complete:10,state:'isOngoing',isStart:true,type:'testPaper'},
			{id:6,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:12,state:'isEnd',isEnd:true,type:'testPaper'},
			{id:7,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true,type:'answerCard'},
			{id:8,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-21',totalNum:24,complete:0,state:'isEnd',isEnd:true,type:'answerCard'},
			{id:9,title:'六年级语文期末复习资料汇总',startTime:'2017-08-20',endTime:'2017-08-23',totalNum:14,complete:10,state:'isStart',isStart:true,type:'answerCard'},
			{id:10,title:'六年级语文期末复习资料汇总--答题卡',startTime:'2017-08-20',endTime:'2017-08-24',totalNum:24,complete:24,state:'isOngoing',isOngoing:true,type:'answerCard'}*/
		]
	};	
	//获取不同科目
	$scope.getName = function(index,n){
		$scope.variablePacket.subjectIndex = index;
		$scope.variablePacket.subjectName=n.name;
		$scope.variablePacket.subjectId=n.id;
		$scope.selectexam.subId=n.id;
		subId = $scope.selectexam.subId;
		$scope.selectinexam();
	};
	//布置作业弹框
	$scope.guideFn = function (){
		$scope.variablePacket.guideBox = true;
	};
	//年级切换tab
	$scope.selectClassTab = function(n,classid, name){
		$scope.variablePacket.numPerPage=3;
		$scope.variablePacket.classIndex = n;
		$scope.variablePacket.classId = classid;
		$scope.variablePacket.className = name;
		$scope.selectexam.classId=classid;
		$scope.selectinexam();
	};
	$scope.variablePacket.typesstate = 1;
	
	//分类切换tab
	$scope.selectClassifyTab = function(n){
		$scope.variablePacket.classifyIndex = n;
		$scope.selectinexam();
	};
	//状态切换tab
	$scope.selectStateTab = function(m,n){
		$scope.variablePacket.typesstate = n+1;
		$scope.variablePacket.numPerPage=3;
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
	
	  /**
	 * 获取左侧 id name	getGradeNo
	 */
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.practice.subjIds = ids;
    	$scope.practice.subjNames = names;
    	$scope.practice.gradeJson = gradeJson;
    };
    $scope.resParams = {};
    $rootScope.findListByTree = function(subjectID,knowledge) {
	  if(subjectID != ""){
	        $scope.resParams.subjectID = subjectID;
	  }
	  if(knowledge != ""){
	        $scope.resParams.knowledge = knowledge;
	  }
	$scope.variablePacket.numPerPage = 3;
	$scope.selectinexam();
};
	//删除
	$scope.deleteData = function (i,type,title,id){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.selectexam.classId;
		$scope.delOk = function (){
		var url = lessonIp+"ExamCount/deleteExam?examId=";
		 $http.get(url + id+"&type="+"0"+"&classid="+$scope.selectexam.classId).success(function (response) {
	    	if(response.ret==200){
	    		console.log($scope.wranShow);
				$scope.classSummary[type].splice(i,1);
				$scope.variablePacket.prompt = false;
				$scope.wranShow('删除成功',true,title);
				$scope.selectinexam();
	    	}
		 });
			
		};
	};
	//科目id
 	var subId = "";
 	//班级id
 	var classId;
 	//作业状态
 	var stateId;
	/**
    * 查询当前教师的 授课信息
    */
    $http.get(zyxrequireIp + '/uc/user/'+teacherId).success(function(suc) {
    	console.log($scope.variablePacket.subjectIndex);
    	$scope.variablePacket.selectSubject=[];
        if(suc.ret == 200) {
        	var data = suc.data;
        	var subMapTem = {};
        	var claMapTem = {};
    		angular.forEach(data.userCourse, function(item){
    				if(typeof(subMapTem[item.subjectId])=="undefined"){
    				var subj = {
	                    id:item.subjectId,
	                    name :item.subjectName,
	                };
	                $scope.variablePacket.subjects.push(subj);
	               // console.info($scope.variablePacket.subjects);
	                subMapTem[item.subjectId] = subj;
    			}
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
             $scope.variablePacket.subjectName=$scope.variablePacket.subjects[0].name;
             $scope.variablePacket.subjectId=$scope.variablePacket.subjects[0].id;
             $scope.variablePacket.classId=$scope.variablePacket.selectClass[0].classId;
             $scope.variablePacket.className = $scope.variablePacket.selectClass[0].name;
             $scope.variablePacket.state = "isOngoing"; 
        }
        
        $scope.selectexam = {};
		//科目id
//	 	subId = $scope.variablePacket.subjectId;
	 	//班级id
	 	classId =$scope.variablePacket.classId;
	 	$scope.selectexam.classId=$scope.variablePacket.classId;
	 	//作业状态
	 	stateId = $scope.variablePacket.selectState[$scope.variablePacket.stateIndex].id;
	 		$scope.selectinexam();
	    });
	    //列表
    $scope.variablePacket.currentPage = 1;
	$scope.variablePacket.numPerPage = 3;
	$scope.selectinexam = function (){
		//var selectexams = JSON.stringify($scope.selectexam);
		var url = lessonIp+"ExamCount/selectExam?";
		var eType = 1;
		if($scope.variablePacket.classifyIndex == 1){
			eType = 0;
		}
		 $http.get(url +"&classId="+$scope.selectexam.classId+"&stateId="+$scope.variablePacket.typesstate+"&teacherId="+teacherId+"&type="+"0"+"&treeids="+$scope.resParams.subjectID+"&currentPage="+$scope.variablePacket.currentPage+"&numPerPage="+$scope.variablePacket.numPerPage+"&eType="+eType).success(function (response) {
	    	var examjson = JSON.stringify(response);
	    	var examjsons = JSON.parse(examjson)
	    	var  state = "";
	    	if(examjsons.data!=undefined && examjsons.data.length > 0){
	    		$scope.variablePacket.jzgd=true;
	            $scope.classSummary.sevenClassOne = [];
	    		angular.forEach(examjsons.data, function(item){
	    			var starttime = item.startTime;
	    			var endTime = item.endTime;
	    			var createTime = item.createTime;
	    			var className = item.list[0].className;
	    			if($scope.variablePacket.typesstate==1){
	    				state = "isOngoing";
	    			}else if($scope.variablePacket.typesstate==2){
	    				state = "isStart";
	    			}else if($scope.variablePacket.typesstate==3){
	    				state = "isEnd";
	    			}
	    			console.log(item.list[0].className);
	    			console.log(item.list[0].count);
	    			console.log(item.list[0].stucount);
	    			var examType = "exercises";
	    			if(item.examType==1){
	    				examType = "testPaper";
	    			}else if(item.examType==2){
	    				examType = "answerCard";
	    			}
	    			var subj = {
	                    id:item.id,
	                    title :item.name,
	                    startTime:starttime,
	                    endTime:endTime,
	                    createTime:createTime,
	                    className:className,
	                    totalNum:item.list[0].count,
	                    complete:item.list[0].stucount,
	                    state:state,
	                    isStart:true,
	                    type:examType,
	                    remark:item.remark,
	                    subjectName:item.subjectName
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
		$scope.variablePacket.claid=$scope.variablePacket.selectClass[$scope.variablePacket.classIndex].classId;
	};
	//列表页加载更多
	$scope.putExam = function(){
		$scope.variablePacket.numPerPage=$scope.variablePacket.numPerPage+3;
		$scope.selectinexam();
		
	}
	$scope.addParams = function(examId, examName, startTime, endTime, remark, subjectName, state, type,stage){
		console.log(stage)
		var teaExamInfo = {};
		teaExamInfo.examId = examId;
		teaExamInfo.examName = examName;
		teaExamInfo.examTime = startTime+"至"+endTime;
		teaExamInfo.remark = remark;
		teaExamInfo.classId = $scope.variablePacket.classId;
		teaExamInfo.className = $scope.variablePacket.className;
		teaExamInfo = JSON.stringify(teaExamInfo);
		sessionStorage.setItem('teaExamInfo', teaExamInfo);
		if($scope.variablePacket.classifyIndex==1){
			$state.go('secondNav.homeworkDel',{state:state,type:type,stage:stage},{reload:true});
		}else{
			$state.go('secondNav.inClassDel.inClassDetails',{type:'homework',stage:stage,packjectId:examId,classId:$scope.variablePacket.classId,className:$scope.variablePacket.className,projectName:examName,subjectName:subjectName},{reload:true});
		}
	}
	//查询作业列表
	$scope.contentpageConfig={
		pagesLength:9,
		itemsPerPage: 10,
		perPageOptions: [5],
		currentPage:1,
		totalItems:0,
		onChange: function() {
			$scope.selectinexam();
		}
	};
	
		/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		/*console.log(thisCharterIds);
		$scope.variablePacket.selectType = 1;
		$scope.variablePacket.subjectID = thisCharterIds;
		$scope.getGuidanceLearningList(thisCharterIds,$scope.classSummary.classId,1);*/
		$scope.variablePacket.jzgd=false;
		subj = {};
		$scope.classSummary.sevenClassOne = [];
		$scope.classSummary.sevenClassOne.push(subj);
		$scope.variablePacket.guidamceListNotExist = true;
	}
	
}]);
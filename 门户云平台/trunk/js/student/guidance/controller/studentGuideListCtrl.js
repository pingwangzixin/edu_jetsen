app.controller('studentGuideListCtrl',['$rootScope','$scope','$state','$stateParams','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($rootScope,$scope,$state,$stateParams,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课前导学';
	
	
	//变量包
	$scope.variablePacket = {
		subjects : [{id:'yuwen',name:'语文'},{id:'shuxue',name:'数学'},{id:'yingyu',name:'英语'}], //科目选择
		curr : 0 , //初始化当前状态
		states:[{id:'0',name:'未学习',isLearn:false},{id:'1',name:'已学习',isLearn:true}],
		instates:[{id:'0',name:'未提交',uncommit:true},{id:'1',name:'未批阅',submitted:true},{id:'2',name:'已批阅',read:true}],
		stateIndex:0, //状态索引
		stateinIndex:0, //课中状态索引
		subjectId:'', //选择科目默认ID
		subjectName:'',//学科名称
		xuekeId:'',//学科id
		isLearnStatus:0,  //学习状态默认值
		state:'',  //默认参数
		resourceReturn:false, //默认不回传资料
		loginUserId:sessionStorage.getItem("userId"),//测试账号登录人的id
		guidanceId:'',//导学id
		studyState:'0',
		selectType:0,
		rows:5,
		pageNo:1,
		jiazai:true,
		gradeId:'',
		guidanceList:[],
		guidamceListNotExist:false,
		studyOK:[],//已经学习
		studyNO:[],//未学习
		classId:'',
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,//其他
		},
		thisCharterIds:'',
		classify : [{name:'课前导学'},{name:'课中导学'}], // 选择类型
		classifyIndex : $stateParams.stage == 'inClass' ? 1 : 0, //分类索引
		guideType : 0,//导学类型
		correctionState : 0,//批阅状态
		className:'',
	};
	// tab切换（学科切换）
	$scope.guideToggle=function(id,index,name){
		console.log("学科id"+id+"---"+index);
		$scope.variablePacket.curr=index;
		$scope.variablePacket.subjectId = id;
		$scope.variablePacket.subjectName = name;
		$scope.variablePacket.xuekeId = id;
		$scope.variablePacket.pageNo = 1;
		$scope.contentpageConfig.currentPage = 1;
		$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
	};
	//分类切换tab
	$scope.selectClassifyTab = function(n){
		console.log(n)
		$scope.variablePacket.classifyIndex = n;
		$scope.variablePacket.guideType = n;
		$scope.variablePacket.pageNo = 1;
		$scope.contentpageConfig.currentPage = 1;
		$scope.variablePacket.stateIndex=0;
		$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
	};
	//课中状态tab切换
	$scope.stateinChange = function(n){
		console.log(n)
		$scope.variablePacket.stateinIndex = n;
		$scope.variablePacket.pageNo = 1;
		$scope.contentpageConfig.currentPage = 1;
		if(n == 0 || n == 1 ){
			$scope.variablePacket.isLearnStatus = $scope.variablePacket.stateinIndex;
			$scope.variablePacket.correctionState = 0;
		}else{
			$scope.variablePacket.isLearnStatus = 1;
			$scope.variablePacket.correctionState = 1;
		}
		$scope.getGuidanceLearningList($scope.variablePacket.subjectId)
	};
	// tab切换（状态切换）
	$scope.stateChange = function(subjectId,index,isLearn,studyNoNum,StudyOkNum){
		console.log(index)
		$scope.variablePacket.guidamceListNotExist = false;
		$scope.variablePacket.jiazai=false;
		$scope.variablePacket.stateIndex=index;
		$scope.variablePacket.isLearnStatus=index;
		$scope.variablePacket.studyState=index;
		$scope.variablePacket.pageNo = 1;
		$scope.contentpageConfig.currentPage = 1;
		$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
	}
	//模拟科目资料数据
	$scope.subjectsData = {
//		yuwen : [
//			{id:1,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:false},
//			{id:2,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true},
//			{id:3,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false},
//			{id:4,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true},
//			{id:5,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false}
//		],
//		shuxue : [
//			{id:1,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false},
//			{id:2,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:false},
//			{id:3,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true}
//		],
//		yingyu : [
//			{id:1,title:'2六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:true},
//			{id:2,title:'2六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false}
//		]
	};	
	$scope.subjectsinData = [
//		{id:1,name:'习题习题习题习题习题习题习题习题',time:'2017-08-20',state:'unsubmitted'},
//		{id:2,name:'习题习题习题习题习题习题习题习题',time:'2017-08-20',state:'submission'},
//		{id:3,name:'习题习题习题习题习题习题习题习题',time:'2017-08-20',state:'readyOver'},
//		{id:4,name:'组卷组卷组卷组卷组卷组卷组卷组卷',time:'2017-08-20',state:'unsubmitted'},
//		{id:5,name:'答题卡答题卡答题卡答题卡答题卡',time:'2017-08-20',state:'unsubmitted'},
//		{id:6,name:'组卷组卷组卷组卷组卷组卷组卷组卷',time:'2017-08-20',state:'submission'},
//		{id:7,name:'答题卡答题卡答题卡答题卡答题卡',time:'2017-08-20',state:'submission'},
//		{id:8,name:'组卷组卷组卷组卷组卷组卷组卷组卷',time:'2017-08-20',state:'readyOver'},
//		{id:9,name:'答题卡答题卡答题卡答题卡答题卡',time:'2017-08-20',state:'readyOver'}
	];	
	
	//获取登录人的信息----初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (data){
		$scope.variablePacket.pageNo = 1;
		if(data.ret == 200){
			console.log(data);
			$scope.variablePacket.gradeId=data.data.gradeId;
			$scope.variablePacket.classId=data.data.classId;
			$scope.variablePacket.classaName = data.data.gradeName+"("+data.data.className+")班";
			$scope.findSubjectByGradeId();
		}
	})
	/**
	 * 根据年级id查询所有学科
	 */
	$scope.findSubjectByGradeId=function(){
		$http.get(jeucIp + 'edu/eduSubject?gradeId='+$scope.variablePacket.gradeId).success(function (data){
			if(data.ret == 200){
				console.log(data)
				$scope.variablePacket.subjects=data.data;
				$scope.variablePacket.subjectId=data.data[0].id;
				$scope.variablePacket.subjectName=data.data[0].name;
				$scope.variablePacket.xuekeId = data.data[0].id;
				$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
			}
		})
	}
	
	/**
	 * 改变学生的学习状态
	 */
	$scope.changeStudyState = function(loginUserId,guidanceId,classId){
		$http.put(guidanceLearningIp + 'sendRecord?studentId='+loginUserId+'&&guidanceLearningId='+guidanceId+'&&classId='+classId+"&&operationType=0").success(function (data){
			console.log("学习状态修改："+data);
	    })
	}
	
	/**
	 * 查询导学的列表
	 */
	$scope.getGuidanceLearningList = function(subjectId) { //文件类型头部切换
		if($scope.variablePacket.classifyIndex == 1){
			$scope.variablePacket.guideType = 1;
			console.log($scope.variablePacket.stateinIndex)
		}else{
			$scope.variablePacket.guideType = 0;
		}
		$http.get(guidanceLearningIp + 'sendRecord?studentId='+$scope.variablePacket.loginUserId+'&&memoriesChapterIds='+subjectId+'&&pageNo='+$scope.variablePacket.pageNo+'&&pageSize='+$scope.contentpageConfig.itemsPerPage+"&&selectType="+$scope.variablePacket.selectType+"&&guideType="+$scope.variablePacket.guideType+"&&studyState="+$scope.variablePacket.isLearnStatus+"&&correctionState="+$scope.variablePacket.correctionState).success(function (data){
			if(data.ret == 200){
				$scope.variablePacket.guidamceListNotExist=false;
				$scope.subjectsinData = data.data;
				$scope.contentpageConfig.totalItems = data.total;
			}else{
				$scope.subjectsinData = [];
				$scope.contentpageConfig.totalItems = 0;
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.guidamceListNotExist=true;
			}
	    })
	};
	
	$scope.updateState = function(guidanceId){
		console.log("导学id："+guidanceId+"--学生id："+$scope.variablePacket.loginUserId+"---班级id："+$scope.variablePacket.classId);
		$scope.changeStudyState($scope.variablePacket.loginUserId,guidanceId,$scope.variablePacket.classId);
	}
	
	$rootScope.findListByTree = function(subjectId,knowledge) { //文件类型头部切换
        pageNo =1;
        $scope.variablePacket.selectType = 0;
        var pobjId = "";
        if(subjectId == "" || subjectId == null && knowledge == "" || knowledge == null){
        	//刚开始默认查询第一个年级的导学
        	$scope.variablePacket.pageNo = 1;
        	$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
        }
        if(subjectId != ""){
        	$scope.variablePacket.pageNo = 1;
            $scope.variablePacket.subjectId = subjectId;
            $scope.getGuidanceLearningList($scope.variablePacket.subjectId);
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
    };
	
	$rootScope.findAll = function(){
		$scope.variablePacket.selectType = 0;
		$scope.variablePacket.subjectId = null;
		$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
	}
	//查询导学列表
	$scope.contentpageConfig={
		pagesLength:9,
		itemsPerPage: 10,
		perPageOptions: [5],
		currentPage:1,
		totalItems:0,
		onChange: function() {
			$scope.variablePacket.pageNo=this.currentPage;
			$scope.getGuidanceLearningList($scope.variablePacket.subjectId);
		}
	};
	/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		console.log(thisCharterIds);
		$scope.variablePacket.selectType = 1;
		$scope.variablePacket.thisCharterIds = thisCharterIds;
		$http.get(guidanceLearningIp + 'sendRecord?studentId='+$scope.variablePacket.loginUserId+'&&subjectId='+thisCharterIds+'&&pageSize=1&&pageNo='+$scope.contentpageConfig.itemsPerPage+"&&selectType="+$scope.variablePacket.selectType).success(function (data){
			if(data.ret == 200){
				console.log(data.data);
				$scope.variablePacket.guidamceListNotExist=false;
				$scope.variablePacket.guidanceList=$scope.variablePacket.guidanceList.concat(data.data);
				angular.forEach(data.data,function(e,i){
					if(e.studyState == 0){
						$scope.variablePacket.studyNO.push(e);
					}else if(e.studyState == 1){
						$scope.variablePacket.studyOK.push(e);
					}
				})
				if($scope.variablePacket.stateIndex == 0){
					if($scope.variablePacket.studyNO.length == 0){
						$scope.variablePacket.jiazai=false;
						$scope.variablePacket.guidamceListNotExist = true;
					}
				}else if($scope.variablePacket.stateIndex == 1){
					$scope.variablePacket.jiazai=true;
					if($scope.variablePacket.studyOK.length == 0){
						$scope.variablePacket.guidamceListNotExist = true;
					}
				}
			}else{
				$scope.variablePacket.jiazai=false;
			}
	    })
	}
}]);
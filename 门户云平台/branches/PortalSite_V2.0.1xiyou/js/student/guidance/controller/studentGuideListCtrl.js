app.controller('studentGuideListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课前导学';
	
	
	//变量包
	$scope.variablePacket = {
		subjects : [{id:'yuwen',name:'语文'},{id:'shuxue',name:'数学'},{id:'yingyu',name:'英语'}], //科目选择
		curr : 0 , //初始化当前状态
//		states:[{id:'0',name:'未学习',isLearn:false},{id:'1',name:'已学习',isLearn:true}],  //以前代码
		states:[{id:0,name:'未提交',state:'unsubmitted'},{id:1,name:'未批阅',state:'submission'},{id:2,name:'已批阅',state:'readyOver'}], //新加
		stateIndex:0, //状态索引
		subjectId:'', //选择科目默认ID
		xuekeId:'',//学科id
		isLearnStatus:0,  //学习状态默认值
		state:'',  //默认参数
		resourceReturn:false, //默认不回传资料
		loginUserId:sessionStorage.getItem("userId"),//测试账号登录人的id
		guidanceId:'',//导学id
		studyState:'0',
		selectType:0,
		rows:5,
		pageSize:1,
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
	};
	// tab切换（学科切换）
	$scope.guideToggle=function(id,index){
		console.log("学科id"+id+"---"+index);
		$scope.variablePacket.curr=index;
		$scope.variablePacket.subjectId = id;
		$scope.variablePacket.xuekeId = id;
		$scope.variablePacket.pageSize = 1;
		$scope.getGuidanceLearningList($scope.variablePacket.pageSize,$scope.variablePacket.subjectId);
	};
	
	// tab切换（状态切换）
	$scope.stateChange = function(subjectId,index,isLearn,studyNoNum,StudyOkNum){
		$scope.variablePacket.guidamceListNotExist = false;
		$scope.variablePacket.jiazai=true;
//		console.log(index);
//		console.log(studyNoNum);
//		console.log(StudyOkNum);
		$scope.variablePacket.stateIndex=index;
		$scope.variablePacket.isLearnStatus=index;
		$scope.variablePacket.studyState=index;
		if(index == 0){
			if(studyNoNum ==0 ){
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.guidamceListNotExist = true;
			}
		}else{
			if(StudyOkNum == 0){
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.guidamceListNotExist = true;
			}
		}
	}
	//模拟科目资料数据
	$scope.subjectsData = {
		yuwen : [
			{id:1,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:false},
			{id:2,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true},
			{id:3,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false},
			{id:4,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true},
			{id:5,title:'六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false}
		],
		shuxue : [
			{id:1,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false},
			{id:2,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:false},
			{id:3,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:true}
		],
		yingyu : [
			{id:1,title:'2六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:true,state:'learn',resourceReturn:true},
			{id:2,title:'2六年级语文期末复习资料汇总',time:'2017-08-20',isLearn:false,state:'notLearn',resourceReturn:false}
		]
	};	
	
//	sessionStorage.setItem("userId","297bdb645e1a419b949937a5d109ffda");
//	$scope.variablePacket.loginUserId = sessionStorage.getItem("userId");
	//获取登录人的信息----初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (data){
//		console.log(data);
		$scope.variablePacket.pageSize = 1;
		if(data.ret == 200){
//			console.log(data.data);
			$scope.variablePacket.gradeId=data.data.gradeId;
			$scope.variablePacket.classId=data.data.classId;
			$scope.findSubjectByGradeId();
		}
	})
	/**
	 * 根据年级id查询所有学科
	 */
	$scope.findSubjectByGradeId=function(){
		$http.get(jeucIp + 'edu/eduSubject?gradeId='+$scope.variablePacket.gradeId).success(function (data){
//			console.log(data);
			if(data.ret == 200){
//				console.log(data.data);
				$scope.variablePacket.subjects=data.data;
				$scope.variablePacket.subjectId=data.data[0].id;
				$scope.variablePacket.xuekeId = data.data[0].id;
//				初始化的学科
//				console.log($scope.variablePacket.subjectId);
				$scope.getGuidanceLearningList($scope.variablePacket.pageSize,$scope.variablePacket.subjectId);
//				$scope.guideToggle($scope.variablePacket.subjectId,0);
			}
		})
	}
	
	/**
	 * 改变学生的学习状态
	 */
	$scope.changeStudyState = function(loginUserId,guidanceId,classId){
		$http.put(guidanceLearningIp + 'sendRecord?studentId='+loginUserId+'&&guidanceLearningId='+guidanceId+'&&classId='+classId).success(function (data){
			console.log(data);
	    })
	}
	
	/**
	 * 根据导学id查询导学详情
	 */
	$scope.guidanceById = function(guidanceId){
		$http.get(guidanceLearningIp + 'learn?id='+$scope.variablePacket.guidanceId).success(function (data){
//			console.log(data);
	    })
	}
	
	
	/**
	 * 查询导学的列表
	 */
	$scope.getGuidanceLearningList = function(pageSize,subjectId) { //文件类型头部切换
		$http.get(guidanceLearningIp + 'sendRecord?studentId='+$scope.variablePacket.loginUserId+'&&subjectId='+subjectId+'&&pageSize='+pageSize+'&&rows='+$scope.variablePacket.rows+"&&selectType="+$scope.variablePacket.selectType).success(function (data){
			$scope.variablePacket.guidanceList=[];
			$scope.variablePacket.studyNO=[];
			$scope.variablePacket.studyOK=[];
			if(data.ret == 200){
//				console.log(data.data);
				$scope.variablePacket.guidamceListNotExist=false;
				$scope.variablePacket.guidanceList=data.data;
				angular.forEach(data.data,function(e,i){
					if(e.studyState == 0){
						$scope.variablePacket.studyNO.push(e);
					}else if(e.studyState == 1){
						$scope.variablePacket.studyOK.push(e);
					}
				})
//				console.log("未学习："+$scope.variablePacket.studyNO+",长度："+$scope.variablePacket.studyNO.length);
//				console.log("已学习："+$scope.variablePacket.studyOK+",长度："+$scope.variablePacket.studyOK.length);
//				console.log("162--"+$scope.variablePacket.stateIndex);
				if($scope.variablePacket.stateIndex == 0){
					if($scope.variablePacket.studyNO.length == 0){
						$scope.variablePacket.jiazai=false;
						$scope.variablePacket.guidamceListNotExist = true;
					}else{
						$scope.variablePacket.jiazai=true;
					}
				}else if($scope.variablePacket.stateIndex == 1){
					$scope.variablePacket.jiazai=true;
					if($scope.variablePacket.studyOK.length == 0){
						$scope.variablePacket.jiazai=false;
						$scope.variablePacket.guidamceListNotExist = true;
					}else{
						$scope.variablePacket.jiazai=true;
					}
				}
			}else{
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.guidamceListNotExist=true;
				$scope.variablePacket.guidanceList=[];
				$scope.variablePacket.studyNO=[];
				$scope.variablePacket.studyOK=[];
			}
//			console.log($scope.variablePacket.guidanceList);
	    })
	};
	
	$scope.updateState = function(guidanceId){
		console.log("导学id："+guidanceId+"--学生id："+$scope.variablePacket.loginUserId+"---班级id："+$scope.variablePacket.classId);
		$scope.changeStudyState($scope.variablePacket.loginUserId,guidanceId,$scope.variablePacket.classId);
	}
	
	$rootScope.findListByTree = function(subjectId,knowledge) { //文件类型头部切换
//		console.log("subjectId--"+subjectId+"---knowledge--"+knowledge);
        pageNo =1;
        $scope.variablePacket.selectType = 0;
        var pobjId = "";
        if(subjectId == "" || subjectId == null && knowledge == "" || knowledge == null){
//      	console.log("没有返回值，查询全部内容");
        	//刚开始默认查询第一个年级的导学
        	$scope.variablePacket.pageSize = 1;
        	$scope.getGuidanceLearningList($scope.variablePacket.pageSize,$scope.variablePacket.subjectId);
        }
        if(subjectId != ""){
        	$scope.variablePacket.pageSize = 1;
            $scope.variablePacket.subjectId = subjectId;
            $scope.getGuidanceLearningList($scope.variablePacket.pageSize,$scope.variablePacket.subjectId);
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
        //$scope.findResource($scope.variablePacket.title,pobjId,$scope.variablePacket.subjectId,$scope.variablePacket.knowledge);
    };
	
	/**
	 * 加载更多
	 */
	$scope.jiazai = function(pageSize){
		pageSize = pageSize+1;
		$scope.variablePacket.pageSize = pageSize;
		var sub;
		if($scope.variablePacket.selectType == 1){
			sub = $scope.variablePacket.thisCharterIds;
		}else{
			sub = $scope.variablePacket.subjectId;
		}
		$http.get(guidanceLearningIp + 'sendRecord?studentId='+$scope.variablePacket.loginUserId+'&&subjectId='+$scope.variablePacket.subjectId+'&&pageSize='+pageSize+'&&rows='+$scope.variablePacket.rows+"&&selectType="+$scope.variablePacket.selectType).success(function (data){
			if(data.ret == 200){
//				console.log(data.data);
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
	
	$rootScope.findAll = function(){
		$scope.variablePacket.selectType = 0;
		$scope.variablePacket.subjectId = null;
		$scope.getGuidanceLearningList(1,$scope.variablePacket.subjectId);
	}
	
	/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		console.log(thisCharterIds);
		$scope.variablePacket.selectType = 1;
		$scope.variablePacket.thisCharterIds = thisCharterIds;
		$http.get(guidanceLearningIp + 'sendRecord?studentId='+$scope.variablePacket.loginUserId+'&&subjectId='+thisCharterIds+'&&pageSize=1&&rows='+$scope.variablePacket.rows+"&&selectType="+$scope.variablePacket.selectType).success(function (data){
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
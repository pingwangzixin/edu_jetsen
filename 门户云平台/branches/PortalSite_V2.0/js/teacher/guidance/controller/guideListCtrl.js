app.controller('guideListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课前导学';
	
	
	
	//查个人相关的树
	$rootScope.treetype = "0";
	
	$scope.variablePacket = {
        total: 0, //文件类型头部选中下标
        title:"",
        objId:"",
        subjectID:"",
		pageSize: 1,
		filetypeHeadIndex: 0, //文件类型头部选中下标
		sortModuleIndex: 0, //分类模块选中下标
		publicity: false, //是否有公开按钮
		amend: false, //修改显示状态
		share: false, //分享显示状态
		down: true, //下载显示状态
		delete: false, //删除显示状态
		favorite: true, //收藏显示状态
		jiazai:true,
		sortModule: [{
				name: "全部"
			},
			{
				name: "上传"
			},
			{
				name: "分享"
			},
			{
				name: "收藏"
			}
		],
		filetypeHead: [],
		guidanceList: [
//			{id:1,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',totalNum:24,complete:10,isBack:true},
//			{id:2,title:'1六年级语文期末复习资料汇总',time:'2017-08-20',totalNum:20,complete:10,isBack:false},
//			{id:3,title:'2六年级语文期末复习资料汇总',time:'2017-08-20',totalNum:24,complete:0,isBack:false},
//			{id:4,title:'六年级语文期末复习资料汇总',time:'2017-08-20',totalNum:14,complete:10,isBack:false},
//			{id:5,title:'六年级语文期末复习资料汇总',time:'2017-08-20',totalNum:24,complete:24,isBack:false}
		],
		loginUserId:sessionStorage.getItem("userId"),//测试账号登录人的id
		selectType:0,
		guidamceListNotExist:false,
		classaName:[],
		subjects : [{name:'语文'},{name:'数学'},{name:'英语'},{name:'生物'}], // 选择科目
		subjectName : '', // 默认科目
		selectClass : [{id:'class_0b7111ec113c4ccfb528828be10c6c49',name:'七年(1)班'},{id:'class_0b7111ec113c4ccfb528828be10c6c491',name:'七年(2)班'},{id:'class_0b7111ec113c4ccfb528828be10c6c492',name:'七年(3)班'}],  // 选择班级
		classIndex : 0,  //班级索引
		subjectIndex : 0,  //学科索引
		isBack:false,    //是否回传
		userCourse:[],
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,					//其他
		}
	};

//	$scope.variablePacket.loginUserId = '736a7af816254b878f076984bf4cf2cb';
//	sessionStorage.setItem("loginUserId",$scope.variablePacket.loginUserId);
	/**
	 * 通过用户信息查询老师所教班级
	 */
	$http.get(jeucIp + 'ea/class?userId='+$scope.variablePacket.loginUserId).success(function (data){
		console.log(data);
		if(data.ret == 200){
			$scope.variablePacket.classaName = data.data;
			angular.forEach($scope.variablePacket.classaName,function(obj,index){
				$scope.variablePacket.classaName[index].active=false;
				$scope.variablePacket.classaName[index].name=$scope.variablePacket.classaName[index].gradeName+'('+$scope.variablePacket.classaName[index].className+')班';
			})
			$scope.classSummary.classId = $scope.variablePacket.classaName[0].classId;
			$scope.classSummary.className = $scope.variablePacket.classaName[0].name;
			$scope.getGuidanceLearningList(null,$scope.classSummary.classId,1);
		}
	})
	
	
	
	$scope.classSummary = {  //每个班级资料
		sevenClassOne : $scope.variablePacket.guidanceList,
		classId : '',
		className : '',
	};
	
	/**
	 * 查询导学的列表
	 */
	$scope.getGuidanceLearningList = function(subjectId,classId,pageSize) { //文件类型头部切换
		$http.get(guidanceLearningIp + 'learn?subjectId='+subjectId+"&&publishObjectIds="+classId+"&&pageSize="+pageSize+"&&selectType="+$scope.variablePacket.selectType+"&&createBy="+$scope.variablePacket.loginUserId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.guidamceListNotExist=false;
				$scope.variablePacket.jiazai=true;
				$scope.variablePacket.guidanceList=data.data;
				$scope.classSummary.sevenClassOne=data.data;
//				for (var i = 0; i < $scope.classSummary.sevenClassOne.length; i++) {
//					var m = [];
//					var classNames = $scope.classSummary.sevenClassOne[i].guidanceLearn.publishObjectNames.split(",");
//					var classIds = $scope.classSummary.sevenClassOne[i].guidanceLearn.publishObjectIds.split(",");
//					for (var s = 0; s < classNames.length; s++) {
//						if(classNames[s] != "" ){
//							var map = {}
//							map.classId=classIds[s];
//							map.className=classNames[s];
//							m.push(map);
//						}
//						$scope.classSummary.sevenClassOne[i].guidanceLearn.classMap = m;
//					}
//					console.log($scope.classSummary.sevenClassOne[i].guidanceLearn);
//				}
			}else{
				$scope.variablePacket.guidamceListNotExist=true;
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.pageSize = 1;
				$scope.variablePacket.guidanceList=[];
				$scope.classSummary.sevenClassOne=[];
			}
	    })
	};
	
	//获取登录人的信息---登录教师--初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (data){
		console.log(data);
		$scope.variablePacket.pageSize = 1;
		if(data.ret == 200){
			$scope.variablePacket.userCourse=data.data.userCourse;
			console.log($scope.variablePacket.userCourse);
//			$scope.variablePacket.subjectName=data.data.userCourse[0].subjectName;
			//查询导学列表
			//默认初始化加载第一个年级
//			console.log("当前年级id"+$scope.variablePacket.userCourse[0].classId);
//			console.log("当前页码"+$scope.variablePacket.pageSize)
//			$scope.getGuidanceLearningList(null,$scope.classSummary.classId.classId,1);
//			$scope.selectSubject($scope.variablePacket.loginUserId);
		}
	})
	
	/**
	 * 根据教师id查询授课
	 */
	$scope.selectSubject = function (userId){
		$http.get(jeucIp + 'ea/eaUserCourse/subject?uid='+userId).success(function (data){
//			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.userCourse=data.data;
//				console.log($scope.variablePacket.userCourse)
				$scope.variablePacket.subjectName=$scope.variablePacket.userCourse[0].subjectName;
				$scope.getGuidanceLearningList($scope.variablePacket.userCourse[0].subjectId,$scope.classSummary.classId,1);
			}
		})
	}
	
	//获取不同科目
	$scope.getName = function(index,n){
		$scope.variablePacket.subjectName=n.subjectName;
		$scope.variablePacket.subjectIndex = index;
	};
	
	//年级切换tab
	$scope.selectClassTab = function(n,classId,className){
		console.log("切换年级"+n+"--"+classId+"--"+className);
		$scope.variablePacket.classIndex = n;
		$scope.classSummary.classId=classId;
		$scope.classSummary.className=className;
		//根据年级查询导学--分页查询，默认是第一页
		$scope.getGuidanceLearningList($scope.variablePacket.subjectID,classId,1);
	};
	
	//删除
	$scope.deleteData = function (i,type,title,id){
		console.log(id)
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			console.log($scope.wranShow);
			$scope.classSummary[type].splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.delGuidanceLearn(id);
		};
	};
	
	
	
	$rootScope.findListByTree = function(subjectID,knowledge) { //文件类型头部切换
		console.log("subjectID--"+subjectID+"---knowledge--"+knowledge);
        pageNo =1;
        $scope.variablePacket.selectType = 0;
        var pobjId = "";
        if(subjectID == "" || subjectID == null && knowledge == "" || knowledge == null){
        	console.log("没有返回值，查询全部内容");
        	//刚开始默认查询第一个年级的导学
        	$scope.getGuidanceLearningList(null,$scope.classSummary.classId,1);
        }
        if(subjectID != ""){
            $scope.variablePacket.subjectID = subjectID;
            $scope.getGuidanceLearningList(subjectID,$scope.classSummary.classId,1);
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
        //$scope.findResource($scope.variablePacket.title,pobjId,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge);
    };
	
	
	
	/**
	 * 删除导学
	 */
	$scope.delGuidanceLearn = function(guidanceId){
		$http.delete(guidanceLearningIp + 'learn?id='+guidanceId).success(function (data){
			console.log(data);
			if(data.ret != 200){
				console.log("删除成功");
				$scope.wranShow('删除成功',true,title);
			}
	    })
	}
	
	/**
	 * 加载更多
	 */
	$scope.jiazai = function(pageSize){
		pageSize = pageSize+1;
		$scope.variablePacket.pageSize = pageSize;
		console.log($scope.classSummary.classId);
		//不用年级筛选
		$http.get(guidanceLearningIp + 'learn?subjectId='+$scope.variablePacket.subjectID+"&&publishObjectIds="+$scope.classSummary.classId+"&&pageSize="+pageSize+"&&selectType="+$scope.variablePacket.selectType+"&&createBy="+$scope.variablePacket.loginUserId).success(function (data){
			console.log(data);
			if(data.ret == 200){
				$scope.variablePacket.jiazai=true;
				$scope.variablePacket.guidanceList = $scope.variablePacket.guidanceList.concat(data.data);
				$scope.classSummary.sevenClassOne=$scope.variablePacket.guidanceList;
//				for (var i = 0; i < $scope.classSummary.sevenClassOne.length; i++) {
//					var m = [];
//					var classNames = $scope.classSummary.sevenClassOne[i].guidanceLearn.publishObjectNames.split(",");
//					var classIds = $scope.classSummary.sevenClassOne[i].guidanceLearn.publishObjectIds.split(",");
//					for (var s = 0; s < classNames.length; s++) {
//						if(classNames[s] != "" ){
//							var map = {}
//							map.classId=classIds[s];
//							map.className=classNames[s];
//							m.push(map);
//						}
//						$scope.classSummary.sevenClassOne[i].guidanceLearn.classMap = m;
//					}
//					console.log($scope.classSummary.sevenClassOne[i].guidanceLearn);
//				}
			}else{
				$scope.variablePacket.jiazai=false;
				$scope.variablePacket.pageSize = 1;
			}
	    })
	}
	
	/**
	 * 点击全部
	 */
	$rootScope.findAll = function(){
		$scope.variablePacket.selectType = 0;
		$scope.variablePacket.subjectID = null;
		$scope.getGuidanceLearningList(null,$scope.classSummary.classId,1);
	}
	
	/**
	 * 点击other
	 */
	$rootScope.others = function(thisCharterIds){
		console.log(thisCharterIds);
		$scope.variablePacket.selectType = 1;
		$scope.variablePacket.subjectID = thisCharterIds;
		$scope.getGuidanceLearningList(thisCharterIds,$scope.classSummary.classId,1);
	}
}]);
app.controller('schoolBasedQuestionBankCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','myQuzService','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,templateServer,myQuzService,$rootScope) {
	var userId = JSON.parse(sessionStorage.getItem('managerSearch')).id;
	
	//变量包
	$scope.variablePacket = {
		questionType : [],//[{name:'单选题'},{name:'多选题'},{name:'判断题'},{name:'填空题'},{name:'材料题'},{name:'简答题'},{name:'完形填空'},{name:'阅读理解'}],		//习题分类
		exercisesAndtest : 0,			//习题、试卷切换
		myQuestionTypeIndex : 0,		//全部、上传、分享、收藏切换
		questionTypeIndex : 0,			//习题类型切换
		exercisesNum : 0,			//习题数量
		testPaperNum : 0,				//试卷数量
		selectSubject : [{name:'生物',id:'1'},{name:'计算机',id:'2'},{name:'思想品德',id:'3'},{name:'美术',id:'4'},{name:'英语',id:'5'},{name:'计算机科学与艺术',id:'6'},{name:'行为学',id:'7'},{name:'社会劳动',id:'8'},{name:'化学',id:'9'},{name:'历史',id:'10'},{name:'体育',id:'11'},{name:'数学',id:'12'},{name:'语文',id:'13'},{name:'地理',id:'14'}],				//下拉列表教师科目
		selectedSubject : '12',			//下拉列表教师选中的科目
		selectGrade : [{grade:'一年级',id:'1'},{grade:'二年级',id:'2'},{grade:'三年级',id:'3'},{grade:'四年级',id:'4'},{grade:'五年级',id:'5'},{grade:'六年级',id:'6'},{grade:'七年级',id:'7'},{grade:'八年级',id:'8'},{grade:'九年级',id:'9'}],				//下拉列表学生年级
		selectedGrade : '5',			//下拉列表学生选中的年级
		selectClass : [{class:'一班',id:'1'},{class:'二班',id:'2'},{class:'三班',id:'3'},{class:'四班',id:'4'},{class:'五班',id:'5'},{class:'六班',id:'6'},{class:'十一班',id:'7'}],				//下拉列表学生班级
		selectedClass : '',			//下拉列表学生选中的班级
		SharePeopleArr : [{id:0,name:'小红帽子',state:false,disabled:true},{id:1,name:'小红帽子1',state:false,disabled:true},{id:2,name:'小红帽子2',state:false,disabled:false},{id:3,name:'小红帽子3',state:false,disabled:false},{id:4,name:'小红帽子4',state:false,disabled:false},{id:5,name:'小红帽子4',state:false,disabled:false},{id:6,name:'小红帽子4',state:false,disabled:false},{id:7,name:'小红帽子4',state:false,disabled:false},{id:8,name:'小红帽子4',state:false,disabled:false},{id:9,name:'小红帽子4',state:false,disabled:false},{id:10,name:'小红帽子4',state:false,disabled:false}],				//分享对（学生或教师）集合
		type:"",
		exType:"01",
		pageNo:1,
		areaCodes:JSON.parse(sessionStorage.getItem('managerSearch')).officeId,
		pageSize:10,
		leftTreeShow : {					//左侧树展示
			teachingMaterial : true,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
		loadShow:false,
		showTerminal : 0,		//试卷课中及PC展示
	};
	$rootScope.treetype = "1";
	$scope.exams = [];
	$scope.questionBank={single:[],many:[],judge:[],fill:[],material:[],answer:[],gestalt:[],read:[]};			// 数据
	var myfavMap= {};
	var myExamsfavMap= {};
	
	// 先查试题类型	 赋值给全局变量
	myQuzService.findQuzType(function(res){
		if(res.code == 200) {
			$scope.variablePacket.type = res.data[0].id;
			$scope.variablePacket.questionType = res.data;
			// 查询我的收藏
			$scope.findShareAndFavoutite($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);	
		}
	},function(e){
		console.info("试题类型 findQuzType:"+e);
	})
	
	//课中卷/PC卷切换事件
	$scope.showTerminalFn = function (i){
		$scope.variablePacket.showTerminal = i;
		if(i == 0) {
			$scope.variablePacket.exType = "01";
		}else {
			$scope.variablePacket.exType = "";
		}
		$scope.exams = [];
		$scope.findMyExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType);
	};
	
	//全部、上传、分享、收藏切换事件
	$scope.myQuestionTypeTab = function (i){
		$scope.variablePacket.myQuestionTypeIndex = i;
	};
	
	//习题类型切换事件
	$scope.questionTypeIndexTab = function (i,id){
		$scope.variablePacket.pageNo = 1;
		$scope.variablePacket.questionTypeIndex = i;
		$scope.variablePacket.type = id;
		$scope.getType($scope.variablePacket.type);
		// 查询我的收藏
		$scope.findShareAndFavoutite($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);	
	};
	
	//习题、试卷tab切换
	$scope.exercisesAndtestTab = function (i,j){
		$scope.variablePacket.exercisesAndtest = i;
		if(i==1){
			$scope.showTerminalFn($scope.variablePacket.showTerminal);
		}else {
			$scope.getType($scope.variablePacket.type);
			$scope.findShareAndFavoutite($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);
		}
	};
	
	//查看答案解析事件
	$scope.checkAnswer = function (i,b,type){
		$scope.questionBank[type][i].showAnswer = b ? false : true;
	};
	
	// 查询全部
	$rootScope.findResAll = function() {
		$scope.variablePacket.subjIds = "";
		$scope.exercisesAndtestTab($scope.variablePacket.exercisesAndtest,1);
	}
    // 获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names) {
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    };
	
    // 根据左侧树查询
    $rootScope.findListByTree = function(subjectID) {
        if(subjectID != ""){
            $scope.variablePacket.subjIds  = subjectID;
        }
        $scope.exercisesAndtestTab($scope.variablePacket.exercisesAndtest,0);
    };

	// 分页
    $scope.findQuzPage = function(j) {
    	var totalCount = 1;
    	if(j == 1){
    		totalCount = $scope.variablePacket.exercisesNum;
    	}else {
    		totalCount = $scope.variablePacket.testPaperNum;
    	}
    	var pageSize = $scope.variablePacket.pageSize;
    	pageNoCount = totalCount % pageSize == 0 ? totalCount / pageSize : Math.ceil(totalCount / pageSize);
        $scope.variablePacket.pageNo += 1;
        if($scope.variablePacket.pageNo > pageNoCount) {
        	$scope.variablePacket.pageNo = pageNoCount;
        	return ;
        }
        if(j==1){
        	$scope.findShareAndFavoutite($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);
		}else {
			$scope.findMyExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType);
		}
    };
	
	///////////////////////////////////////////////////////////////
	// 根据用户 查询我的收藏
	/**
	 * 判断加载更多
	 * @param {Object} code
	 * @param {Object} total
	 * @param {Object} pageSize
	 * @param {Object} pageNo
	 */
	$scope.judgeLoadShow = function(code,total,pageSize,pageNo){
		$scope.variablePacket.loadShow = false;
		if(code == 200){
			var totalPage = total%pageSize == 0?total/pageSize:Math.ceil(total/pageSize);
			if(pageNo < totalPage){
				$scope.variablePacket.loadShow = true;
			}
		}
	}
	
	
		// 我的全部
	$scope.findQuzAll = function(pageNo,pageSize,type,subjIds) {
		var params = {pageNo:pageNo,pageSize:pageSize,type:type,subjIds:subjIds,state:1,areaCodes:$scope.variablePacket.areaCodes};
		myQuzService.findQuz(params,function(res){
			if(res.code == 200) {
				$scope.variablePacket.exercisesNum = res.data.count;
				var ques = {};
				var quess = [];
				angular.forEach(res.data.list,function(e,i){
					ques = {};
					ques.collect = true;
					ques.showFav = true;
					if(typeof(myfavMap[e.id])!="undefined"){
						ques.collect = false;
						ques.quzFavId = myfavMap[e.id].id;
					}
					if(e.createBy == userId){
						ques.showFav = false;
					}
					ques.id = e.id;
					ques.type=e.type;
					ques.showAnswer = true;
					ques.edit = false;
					ques.jurisdiction = true;
					ques.body = e.body;
					ques.answer = e.answer;
					ques.analysis = e.analysis;
					quess.push(ques);
				})
				$scope.getSwitchQuzByType($scope.variablePacket.type,quess);
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.exercisesNum,pageSize,pageNo);
		},function(e){
			console.info("wode 试题 findQuz:"+e);
		})
	}
	
	// 查询我的收藏
	$scope.findShareAndFavoutite = function(pageNo,pageSize,type,subjIds) {
		// favType 0 收藏，1 分享 
		var params = {pageNo:pageNo,pageSize:pageSize,favType:0,type:type,subjIds:subjIds,createBy:userId};
		myQuzService.findShareAndFavoutite(params,function(res) {
			if(res.code == 200) {
				myfavMap = {};
				angular.forEach(res.data.list,function(e,i){
					myfavMap[e.quzResId]=e;
				})
			// 第一次 调用quz全部展示默认单选
			$scope.findQuzAll($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,subjIds)
			}
		},function(e){
			console.info("收藏分享 findShareAndFavoutite:"+e);
		})
	}
	
	/////////////////////////////////////////////////////////////
	
	// 校本试卷
	$scope.findExamList = function(pageNo,pageSize,subjIds,exType) {
		var params = {current:pageNo,size:pageSize,state:1,module:1,subjIds:subjIds,areaCodes:$scope.variablePacket.areaCodes,type:exType};
		myQuzService.getExamList(params,function(res) {
			if(res.code == 200) {
				$scope.variablePacket.testPaperNum = res.data.total;
				var list = res.data.records;
				angular.forEach(list,function(data){
					data.collect = true;
					data.favId = "";
					if(typeof(myExamsfavMap[data.id])!="undefined"){
						data.favId = myExamsfavMap[data.id].id;
						data.collect = false;
					}
					data.showFav = true;
					if(data.createBy == userId){
						data.showFav = false;
					}
				})
				$scope.exams = $scope.exams.concat(res.data.records);
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.testPaperNum,pageSize,pageNo);
		},function(e) {
			console.log("findExamList"+e)
		})
	}
	// 我的试卷收藏
	$scope.findMyExamList = function(pageNo,pageSize,subjIds,exType) {
		var params = {current:pageNo,size:pageSize,module:3,subjIds:subjIds,createBy:userId,type:exType};
		myQuzService.getExamList(params,function(res) {
			if(res.code == 200) {
				myExamsfavMap = {};
				angular.forEach(res.data.records,function(e,i){
					myExamsfavMap[e.favExamId]=e;
				})
				$scope.findExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType);
			}
		},function(e) {
			console.log("findMyExamList"+e)
		})
	}
	
	// 收藏试卷
	$scope.insertModel = function(exam) {
		if(exam.collect == false) { //删除 收藏
			myQuzService.deleteExam(exam.favId,function(res) {
				if(res.code == 200) {
					exam.collect = true;
					console.log("deleteExam"+res.code)
				}
			},function(e) {
				console.log("deleteExam"+e)
			})
		}else {
			exam.module = 3;
			var params = {examId:exam.id,model:exam.module,userId:userId};
			myQuzService.insertModel(params,function(res) {
				if(res.code == 200) {
					exam.collect = false;
					exam.favId = res.data.id;
					console.log("insertModel"+res.code)
				}
			},function(e) {
				console.log("insertModel"+e)
			})
		}
	}

	// 收藏试题
	$scope.adddelQuzFav = function(exam) {
		if(exam.collect) {
			var params = {type:0,userId:userId,id:exam.id};
			myQuzService.addQuzFav(params,function(res) {
				if(res.code == 200) {
					exam.collect = false;
					exam.quzFavId = res.data.id;
					console.log("addQuzFav"+res.code)
				}
			},function(e) {
				console.log("addQuzFav"+e)
			})
		}else {
			myQuzService.deleteQuzFav(exam.quzFavId,function(res) {
				if(res.code == 200) {
					exam.collect = true;
					console.log("deleteQuzFav"+res.code)
				}
			},function(e) {
				console.log("deleteQuzFav"+e)
			});
		}
	}
	
	//////////////////////////////////////////////////////////////

	$scope.getSwitchQuzByType = function(quztype,quess) {
		switch(parseInt(quztype)){
			case 2:
			  $scope.questionBank.single = $scope.questionBank.single.concat(quess);
			  break;
			case 4:
			   $scope.questionBank.many = $scope.questionBank.many.concat(quess);
			  break;
			case 1:
			  $scope.questionBank.judge = $scope.questionBank.judge.concat(quess);
			  break;
			case 3:
			  $scope.questionBank.fill = $scope.questionBank.fill.concat(quess);
			  break;
			case 8:
			  $scope.questionBank.material = $scope.questionBank.material.concat(quess);
			  break;
			case 6:
			  $scope.questionBank.answer = $scope.questionBank.answer.concat(quess);
			  break;
			case 7:
			  $scope.questionBank.gestalt = $scope.questionBank.gestalt.concat(quess);
			  break;
			case 5:
			  $scope.questionBank.read = $scope.questionBank.read.concat(quess);
			  break;
		}
	}
	
	$scope.getType = function(quztype) {
		switch(parseInt(quztype)){
			case 2:
			  $scope.questionBank.single = [];
			  break;
			case 4:
			   $scope.questionBank.many = [];
			  break;
			case 1:
			  $scope.questionBank.judge = [];
			  break;
			case 3:
			  $scope.questionBank.fill = [];
			  break;
			case 8:
			  $scope.questionBank.material = [];
			  break;
			case 6:
			  $scope.questionBank.answer = [];
			  break;
			case 7:
			  $scope.questionBank.gestalt = [];
			  break;
			case 5:
			  $scope.questionBank.read = [];
			  break;
		}
	}
	
}]);
app.filter('trust2Html', ['$sce',function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val); 
	};
}])

app.filter('timeFilter', function() {
	return function(obj) {
		return obj.substring(0,10)
	}
})
app.filter('moduleFilter', function() {
	return function(obj) {
		if(obj=="1"){
			return "上传";
		}else if(obj=="2"){
			return "分享";
			
		}else if(obj=="3"){
			return "收藏";
			
		}else{
			
			return "未知";
		}
	}
})


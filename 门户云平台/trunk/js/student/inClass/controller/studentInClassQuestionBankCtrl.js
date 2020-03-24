app.controller('studentInClassQuestionBankCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	//变量包
	$scope.variablePacket = {
		subjects : [{id:'yuwen',name:'语文'},{id:'shuxue',name:'数学'},{id:'yingyu',name:'英语'},{id:'wuli',name:'物理'},{id:'huaxue',name:'化学'},{id:'zhengzhi',name:'政治'}], //科目选择
		currCourseId : null , //初始化当前状态
		states:[{id:'1',name:'我的收藏'},{id:'0',name:'错题记录'},{id:'2',name:'复习错题'}],   //状态切换
		exercisesAndtest : 1,			//我的收藏/复习错题/错题记录切换
		leftTreeShow : {   //左侧树
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false		//知识点树
		},
		questionType : [{name:'单选题',state:true},{name:'多选题',state:true},{name:'判断题',state:true},{name:'填空题',state:true},{name:'材料题',state:true},{name:'简答题',state:true},{name:'完形填空',state:true},{name:'阅读理解',state:true}],		//习题分类
		questionTypeId : 0,			//习题类型切换
		exercisesNum : 12,			//习题数量
	};
	
	// tab切换（学科切换）
	/*$scope.guideToggle=function(courseId){
		$scope.variablePacket.currCourseId=courseId;
		$scope.variablePacket.exercisesAndtest = 1;
		$scope.variablePacket.questionTypeId = $scope.variablePacket.questionType[0].id;
		$scope.findStuWrong(studentId, courseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, page, pageSize);
	};*/
	//习题类型切换事件
	/*$scope.questionTypeIndexTab = function (questionId){
		$scope.variablePacket.questionTypeId = questionId;
	};*/
	
	//我的收藏/复习错题/错题记录tab切换
	/*$scope.exercisesAndtestTab = function (statesId){
		$scope.variablePacket.exercisesAndtest = statesId;
		$scope.variablePacket.questionTypeId = $scope.variablePacket.questionType[0].id;
		if(statesId==2){
			angular.forEach($scope.variablePacket.questionType, function(item,index){
			    if(item.name=='单选题' || item.name=='判断题'){
			    	item.state = true;
			    }else{
			    	item.state = false;
			    }
			    
			console.log(item.state);
			});
		}else{
			angular.forEach($scope.variablePacket.questionType, function(item,index){
			    item.state = true;
			});
		}
	};*/
	//收藏、取消收藏切换
	/*$scope.collectionFn = function (i,type){
		$scope.questionBank[type][i].collection = !$scope.questionBank[type][i].collection;
	}*/
	//查看答案解析事件
	$scope.checkAnswer = function (i,b,type){
		$scope.questionBank[type][i].showAnswer = b ? false : true;
	};
	//8种题型
	$scope.questionBank = {
		//单选
		single : [
			{id:111,showAnswer:false,collection:true,myAnswer:'A',edit:false},
			{id:222,showAnswer:false,collection:true,myAnswer:'A',edit:false},
			{id:333,showAnswer:false,collection:true,myAnswer:'A',edit:false},
			{id:444,showAnswer:false,collection:true,myAnswer:'A',edit:false}
		],
		//多选
		many : [
			{id:111,showAnswer:false,collection:true,myAnswer:'B',edit:false},
			{id:222,showAnswer:false,collection:true,myAnswer:'B',edit:false},
			{id:333,showAnswer:false,collection:true,myAnswer:'B',edit:false},
			{id:444,showAnswer:false,collection:true,myAnswer:'B',edit:false}
		],
		//判断
		judge : [
			{id:111,showAnswer:false,collection:true,myAnswer:'C',edit:false},
			{id:222,showAnswer:false,collection:true,myAnswer:'C',edit:false},
			{id:333,showAnswer:false,collection:true,myAnswer:'C',edit:false},
			{id:444,showAnswer:false,collection:true,myAnswer:'C',edit:false}
		],
		//填空
		fill : [
			{id:111,showAnswer:false,collection:true,answer:'尼奥啥都奥斯都是|爱神的箭lsa|撒抵抗力交三方|撒的',answerArr:[]},
			{id:222,showAnswer:false,collection:true,answer:'尼奥啥都奥斯都是|爱神的箭lsa|撒抵抗力交三方|撒的',answerArr:[]},
			{id:333,showAnswer:false,collection:true,answer:'尼奥啥都奥斯都是|爱神的箭lsa|撒抵抗力交三方|撒的',answerArr:[]},
			{id:444,showAnswer:false,collection:true,answer:'尼奥啥都奥斯都是|爱神的箭lsa|撒抵抗力交三方|撒的',answerArr:[]}
		],
		//材料
		material : [
			{id:111,showAnswer:false,collection:true},
			{id:222,showAnswer:false,collection:true},
			{id:333,showAnswer:false,collection:true},
			{id:444,showAnswer:false,collection:true}
		],
		//简答
		answer : [
			{id:111,showAnswer:false,collection:true},
			{id:222,showAnswer:false,collection:true},
			{id:333,showAnswer:false,ecollection:true},
			{id:444,showAnswer:false,collection:true}
		],
		//完形填空
		gestalt : [
		//完形填空选项
			{id:111,showAnswer:false,collection:true,list:[{option:'A'},{option:'C'},{},{option:'C'}]},
			{id:222,showAnswer:false,collection:true,list:[{option:'C'},{option:'D'}]},
			{id:333,showAnswer:false,collection:true,list:[{option:'A'},{}]},
			{id:444,showAnswer:false,collection:true,list:[{}]}
		],
		//阅读理解
		read : [
			{id:111,showAnswer:false,collection:true},
			{id:222,showAnswer:false,collection:true},
			{id:333,showAnswer:false,collection:true},
			{id:444,showAnswer:false,collection:true}
		]
	};
	
	//重新作答
	$scope.editQuestion = function (i,type){
		$scope.questionBank[type][i].edit = true;
		
	};
	//确认提交
	$scope.submitQuestion = function (i,type,question){
		var tag;
		if(question.notLearnAnswer == question.answer){
			tag = 1;
		}else{
			tag = 0;
		}
		$http.put(lessonIp + 'wrongQuestion/updateWrongQuestion?id='+question.id+'&tag='+tag+'&lastAnswer='+question.notLearnAnswer).success(function(response){
			if(response.ret == 200){
				$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
			}
		});
	};
	//查询题库列表
	// currentPage：当前页；totalItems：总记录数；itemsPerPage：每页记录数；perPageOptions：分页选项；onChange：当页码变更后自动触发的方法
	$scope.contentpageConfig={
		pagesLength:9,
		itemsPerPage: 2,
		perPageOptions: [5],
		currentPage:1,
		totalItems:0,
		onChange: function() {
			$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
		}
	};	
	
	//===============================================================
	$scope.variablePacket.subjects = [];
	$scope.variablePacket.questionType = [];
	$scope.questionBank = {};
	var stuId = sessionStorage.getItem("userId");
	//获取学生信息
	$scope.findStuInfo= function(stuId){
		var url = jeucIp+"uc/user/"+stuId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var data = result.data;
				$scope.variablePacket.stuName = data.realname;
				
				$scope.variablePacket.classId = data.classId;
				$scope.variablePacket.gradeId = data.gradeId;
				//查询学科
				$scope.findSubjectList($scope.variablePacket.gradeId);
			}
		});
	}
	$scope.findStuInfo(stuId);
	//获取科目
	$scope.findSubjectList= function(gradeId){
		$scope.variablePacket.subjects = [];
		var url = jeucIp+"edu/eduSubject?gradeId="+gradeId;
		$http.get(url).success(function(result) {
			if(result.ret==200){
				var courseArr = result.data;
				if(courseArr != null && courseArr.length > 0){
					for(var i=0; i<courseArr.length; i++){
						if(i == 0){
							$scope.variablePacket.currCourseId = courseArr[i].id;
						}
						var course = {};
						course.id = courseArr[i].id;
						course.name = courseArr[i].name;
						$scope.variablePacket.subjects.push(course);
					}
				}
				$scope.findQuzTypeList();
			}
		});
	}
	
	//题型
	$scope.findQuzTypeList = function(){
		$scope.variablePacket.questionType = [];
		var url = questionUrl + 'a/quzType';
		$http.get(url).success(function(resopnse) {
			if(resopnse.code==200){
				var questionList = resopnse.data;
				for(var i=0; i<questionList.length; i++){
					if(i == 0){
						$scope.variablePacket.questionTypeId = questionList[i].id;
					}
					var question = {};
					question.id = questionList[i].id;
					question.name = questionList[i].name;
					question.state = true;
					$scope.variablePacket.questionType.push(question);
				}
				$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
			}
		});
	}
	
	/**
	 * 获取题库
	 * @param {Object} studentId 学生id
	 * @param {Object} subjectId 科目id
	 * @param {Object} type 收藏1，错题0
	 * @param {Object} typeId 试题类型id
	 * @param {Object} treeIds 左侧树筛选
	 * @param {Object} page 页数
	 * @param {Object} pageSize 每页条数
	 */
	$scope.findStuWrong = function(studentId, subjectId, type, typeId, treeIds, page, pageSize){
		var url = lessonIp + 'wrongQuestion/findStuWrong?studentId=' + studentId + '&subId=' + subjectId +'&type=' + type +'&typeId=' + typeId +'&page=' + page + '&pageSize=' + pageSize;
		if(treeIds != null){
			url += '&treeIds=' + treeIds 
		}
		$http.get(url).success(function(resopnse) {
			if(resopnse.ret==200){
				$scope.variablePacket.exercisesNum = resopnse.total;
				$scope.contentpageConfig.totalItems = resopnse.total;
				var key = $scope.idToEnglish(typeId);
				$scope.questionBank[key] = [];
				angular.forEach(resopnse.data, function(v, i){
					var questionObj = {};
					questionObj.id = v.id;
					questionObj.showAnswer = false;
					questionObj.collection = true;
					questionObj.body = v.body;
					questionObj.answer = v.answer;
					questionObj.analysis = v.analysis;
					if(type == 0){
						questionObj.edit = false;
						if(v.lastAnswer == null || v.lastAnswer == ''){
							questionObj.myAnswer = v.stuAnswer;
						} else {
							questionObj.myAnswer = v.lastAnswer;
						}
					} 
					switch (key){
						case "single": case "many": case "judge": //{id:111,showAnswer:false,collection:true,myAnswer:'A',edit:false}
							
							break;
						case "material": case "answer": case "read":
							
							break;
						case "fill":
							
							break;
						case "gestalt":
							
							break;
						default:
							break;
					}
					$scope.questionBank[key].push(questionObj);
				});
			}
		});
	}
	
	//试卷类型转换工具
	$scope.idToEnglish = function(type){
		switch (type) {
			case "2": return "single"; break;
			case "4": return "many"; break;
			case "1": return "judge"; break;
			case "3": return "fill"; break;
			case "8": return "material"; break;
			case "6": return "answer"; break;
			case "7": return "gestalt"; break;
			case "5": return "read"; break;
			default: break;
		}
	}
	
	// tab切换（学科切换）
	$scope.guideToggle=function(courseId){
		$scope.variablePacket.currCourseId=courseId;
		$scope.variablePacket.exercisesAndtest = 1;
		$scope.contentpageConfig.currentPage = 1;
		$scope.variablePacket.questionTypeId = $scope.variablePacket.questionType[0].id;
		$scope.findStuWrong(stuId, courseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
	};
	
	//我的收藏/复习错题/错题记录tab切换
	$scope.exercisesAndtestTab = function (statesId){
		$scope.contentpageConfig.currentPage = 1;
		$scope.variablePacket.exercisesAndtest = statesId;
		$scope.variablePacket.questionTypeId = $scope.variablePacket.questionType[0].id;
		if(statesId==2){
			angular.forEach($scope.variablePacket.questionType, function(item,index){
			    if(item.name=='单选题' || item.name=='判断题'){
			    	item.state = true;
			    }else{
			    	item.state = false;
			    }
			    
			console.log(item.state);
			});
		}else{
			angular.forEach($scope.variablePacket.questionType, function(item,index){
			    item.state = true;
			});
		}
		$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
	};
	
	//习题类型切换事件
	$scope.questionTypeIndexTab = function (questionId){
		$scope.contentpageConfig.currentPage = 1;
		$scope.variablePacket.questionTypeId = questionId;
		$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
	};
	
	//收藏、取消收藏切换
	$scope.collectionFn = function (i,type,id){
//		$scope.questionBank[type][i].collection = !$scope.questionBank[type][i].collection;
		$http.delete(lessonIp + 'wrongQuestion/deleteWrong/' + id).success(function(){
			$scope.findStuWrong(stuId, $scope.variablePacket.currCourseId, $scope.variablePacket.exercisesAndtest != 2 ? $scope.variablePacket.exercisesAndtest : 0, $scope.variablePacket.questionTypeId, null, $scope.contentpageConfig.currentPage, $scope.contentpageConfig.itemsPerPage);
		});
	}
	
}]);


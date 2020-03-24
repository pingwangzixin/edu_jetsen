app.controller('myQuestionBankCtrl',["$rootScope",'$scope','$state','$timeout','$http','$location','$interval','templateServer','myQuzService',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,myQuzService) {
		var userId = sessionStorage.getItem('userId');
		//变量包
		$scope.variablePacket = {
			myQuestionType : [{name:'全部'},{name:'上传'},{name:'分享'},{name:'收藏'}],		//我的题库分类
			questionType : [],//[{name:'单选题'},{name:'多选题'},{name:'判断题'},{name:'填空题'},{name:'材料题'},{name:'简答题'},{name:'完形填空'},{name:'阅读理解'}],		//习题分类
			exercisesAndtest : 0,			//习题、试卷切换
			myQuestionTypeIndex : 0,		//全部、上传、分享、收藏切换
			questionTypeIndex : 0,			//习题类型切换
			exercisesNum : 0,			//习题数量
			testPaperNum : 0,				//试卷数量
			shareCase : false,				//分享弹层展示/隐藏
			shareIndex : 0,					//分享弹层教师、学生角色切换
			shareAllBtn : false,			//分享弹框全选按钮选中状态
			shareAllBtnShow : true,		//分享弹框全选按钮显示、隐藏状态
			shareBtn : false,				//分享弹框分享按钮
			selectSubject : [],//[{name:'生物',id:'1'},{name:'计算机',id:'2'},{name:'思想品德',id:'3'},{name:'美术',id:'4'},{name:'英语',id:'5'},{name:'计算机科学与艺术',id:'6'},{name:'行为学',id:'7'},{name:'社会劳动',id:'8'},{name:'化学',id:'9'},{name:'历史',id:'10'},{name:'体育',id:'11'},{name:'数学',id:'12'},{name:'语文',id:'13'},{name:'地理',id:'14'}],				//下拉列表教师科目
			selectedSubject : '12',			//下拉列表教师选中的科目
			selectGrade : [],//[{grade:'一年级',id:'1'},{grade:'二年级',id:'2'},{grade:'三年级',id:'3'},{grade:'四年级',id:'4'},{grade:'五年级',id:'5'},{grade:'六年级',id:'6'},{grade:'七年级',id:'7'},{grade:'八年级',id:'8'},{grade:'九年级',id:'9'}],				//下拉列表学生年级
			selectedGrade : '5',			//下拉列表学生选中的年级
			selectClass : [{class:'一班',id:'1'},{class:'二班',id:'2'},{class:'三班',id:'3'},{class:'四班',id:'4'},{class:'五班',id:'5'},{class:'六班',id:'6'},{class:'十一班',id:'7'}],				//下拉列表学生班级
			selectedClass : '',			//下拉列表学生选中的班级
			SharePeopleArr : [],//[{id:0,name:'小红帽子',state:false,disabled:true},{id:1,name:'小红帽子1',state:false,disabled:true},{id:2,name:'小红帽子2',state:false,disabled:false},{id:3,name:'小红帽子3',state:false,disabled:false},{id:4,name:'小红帽子4',state:false,disabled:false},{id:5,name:'小红帽子4',state:false,disabled:false},{id:6,name:'小红帽子4',state:false,disabled:false},{id:7,name:'小红帽子4',state:false,disabled:false},{id:8,name:'小红帽子4',state:false,disabled:false},{id:9,name:'小红帽子4',state:false,disabled:false},{id:10,name:'小红帽子4',state:false,disabled:false}],				//分享对（学生或教师）集合
			type :"",
			exType:"01",
			pageNo :1,
			pageSize:10,
			subjIds:"",
//			userType:"JSON.parse(sessionStorage.getItem('managerSearch')).userType",
//        	officeId:JSON.parse(sessionStorage.getItem('managerSearch')).officeId,
//			arrSubject:[],
			teacherList:[],
			sourceModel:0,
			leftTreeShow : {					//左侧树展示
				teachingMaterial : false,		//版本选择框
				treeOne : true,					//版本选择框下的树
				treeKnowledgePoint : false,		//知识点树
				other : false,						//其他
			},
			subjectTreeShow: {
				teachingMaterial: true, //版本选择框
				treeOne: false, //版本选择框下的树
				treeKnowledgePoint: false, //知识点树
				other: false,
			},
			loadShow:false,
			showTerminal : 0,		//试卷课中及PC展示
		};
	$scope.showSubjName = ['课本','章','节']	
	$scope.questionBank={single:[],many:[],judge:[],fill:[],material:[],answer:[],gestalt:[],read:[]};// 数据
		
	// 先查试题类型	 赋值给全局变量
	myQuzService.findQuzType(function(res){
		if(res.code == 200) {
			$scope.variablePacket.type = res.data[0].id;
			$scope.variablePacket.questionType = res.data;
			// 第一次 调用quz全部展示默认单选
			$scope.findQuzAll($scope.variablePacket.type,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
		}
	},function(e){
		console.info("试题类型 findQuzType:"+e);
	})
		
    $rootScope.treetype = "0";
    
    
    $scope.clearxiugai = function(){
        $rootScope.initchoiceVersion();
    }
    
    // 查询全部
	$rootScope.findResAll = function() {
		$scope.variablePacket.subjIds = "";
		$scope.getType($scope.variablePacket.type);	// 类型数组 置空
		$scope.myQuestionTypeTab(0,0);
	}
    // 根据左侧树查询
    $rootScope.findListByTree = function(subjectID) {
        if(subjectID != ""){
            $scope.variablePacket.subjIds = subjectID;
        }
        $scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,0);
    };
	
	//课中卷/PC卷切换事件
	$scope.showTerminalFn = function (i){
		$scope.variablePacket.showTerminal = i;
		if(i == 0) {
			$scope.variablePacket.exType = "01";
		}else {
			$scope.variablePacket.exType = "";
		}
		$scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,0);
	};
	
	//全部、上传、分享、收藏切换事件	（ exercisesAndtest :0.shiti 1.试卷）
	$scope.myQuestionTypeTab = function (i,j){
		$scope.variablePacket.myQuestionTypeIndex = i;
		if(j == 0) {
			$scope.exams = [];
			$scope.getType($scope.variablePacket.type);	// 类型数组 置空
			$scope.variablePacket.pageNo=1;
		}
		if($scope.variablePacket.exercisesAndtest == 0) {
			switch($scope.variablePacket.myQuestionTypeIndex){
				case 0:
				  	$scope.findQuzAll($scope.variablePacket.type,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds);
				  break;
				case 1:
					$scope.findQuz($scope.variablePacket.type,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds);
				  break;
				case 2:
					$scope.findShareAndFavoutite(1,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);
				  break;
				case 3:
					$scope.findShareAndFavoutite(0,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.type,$scope.variablePacket.subjIds);
				  break;
			}
		}else {
			switch($scope.variablePacket.myQuestionTypeIndex){
				case 0:
				  	$scope.findExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType);
				  break;
				case 1:
					$scope.findExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType,1);
				  break;
				case 2:
					$scope.findExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType,2);
				  break;
				case 3:
					$scope.findExamList($scope.variablePacket.pageNo,$scope.variablePacket.pageSize,$scope.variablePacket.subjIds,$scope.variablePacket.exType,3);
				  break;
			}
		}
	};
	
	// 分页
    $scope.findQuzPage = function(j) {
    	var totalCount = 1;
    	if(j == 1) {
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
        $scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,1);
    };
	
	//习题类型切换事件
	$scope.questionTypeIndexTab = function (i,id){
		$scope.variablePacket.pageNo = 1;
		$scope.variablePacket.questionTypeIndex = i;
		$scope.variablePacket.type = id;
		$scope.variablePacket.subjIds = "";
		$scope.getType($scope.variablePacket.type);	// 类型数组 置空
		$scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,0);
	};
	
	$scope.exams = [];
	
	//习题、试卷tab切换
	$scope.exercisesAndtestTab = function (i){
		$scope.variablePacket.exercisesAndtest = i;
		$scope.variablePacket.subjIds = "";
		if($scope.variablePacket.exercisesAndtest == 0){
			$scope.variablePacket.sourceModel = 0;
			$scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,i);
		}else {
			$scope.variablePacket.sourceModel = 1;
			$scope.showTerminalFn($scope.variablePacket.showTerminal);
		}
	};
	
	//查看答案解析事件
	$scope.checkAnswer = function (i,b,type){
		$scope.questionBank[type][i].showAnswer = b ? false : true;
	};
	
	//修改小题事件
	$scope.editQuestion = function (i,type,id){

		$scope.questionBank[type][i].edit = true;
		$scope.model = {};
		var values = ["A","B","C","D"];
		myQuzService.getQuzByid(id,function(res) {
			if(res.code == 200) {
				$scope.model.id = res.data[0].id;
				$scope.model.type= res.data[0].type;
				$scope.model.analysis = res.data[0].analysis;
				$scope.model.answer = res.data[0].answer;
				if(res.data[0].type == 4) {
					$scope.quzvalue=[];
                	angular.forEach(values,function(v){
            			value={};
                    	value.id = v;
                    	value.valueState = false;
                    	if(res.data[0].answer.indexOf(v)!=-1){
                    		value.valueState = true;
                    	}
                    	$scope.quzvalue.push(value);
                	})
				}
				$scope.model.body = res.data[0].body;
				var selectedSubject = res.data[0].subjIds.split(",")[2];
				var arr = res.data[0].subjNames.split("//");
				$scope.selectedSubject = selectedSubject;
				$scope.variablePacket.arrSubject=JSON.parse(sessionStorage.getItem('managerSearch')).arrSubject;
                angular.forEach($scope.variablePacket.arrSubject, function(data){
                	if(data.id == selectedSubject){
                        data.subjIds = res.data[0].subjIds;
                        data.subjNames = res.data[0].subjNames;
                        $scope.showSubjName = [arr[4],arr[5],arr[6]];
                        $scope.selectedSubject = data;
					}
                });
			}
		},function(e) {
			console.log("editQuestion"+e)
		})
		
	};
	
	$scope.updateQuz = function(model,i,index) {
		if(model.type == 5 || model.type == 7) {
			if(model.type == 7) {
				var optList = $scope.questionBank.gestalt[index].list;
			}else {
				var optList = $scope.questionBank.read[index].list;
			}
			model.answer = '';
			for(var n=0;n<optList.length;n++){
				model.answer+=optList[n].option+',';
			}
			model.answer = model.answer.substr(0,model.answer.length-1);
		}
		
		if(model.type==4){
			model.answer = '';
			var $item = angular.element('input[name="many'+model.id+'"]');
			for(var j=0;j<$item.length;j++){
				if($item[j].checked){
					model.answer +=  $item[j].value+',';
				}
			}
			model.answer = model.answer.substr(0,model.answer.length-1);
		}

		myQuzService.update({id:model.id,type:model.type,body:model.body,answer:model.answer,analysis:model.analysis,updateBy:userId,subjIds:$scope.variablePacket.subjIds,subjNames:$scope.variablePacket.subjNames},function(res){
			if(res.code == 200) {

				i.edit=false;
				i.body=model.body;
				i.answer=model.answer;
				i.analysis=model.analysis;
			}
		});
		
	}
	
    // 获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names) {
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    };
    
	
	//填空题input插入分割线
	$scope.insertLine = function (){
		$scope.model.answer += ' | ';
//		$('#s').focus();
	};
	/**
	 * 填空题插入填空
	 */
	$scope.insertBlanks = function(){
		$scope.model.body = $scope.model.body.replace('<br/></p>','</p>');
		$scope.model.body = $scope.model.body.substring(0,$scope.model.body.lastIndexOf("</p>")) +' __ '+'</p>';
	}
	
	//完形填空增加选项
	$scope.addOption = function (i,type){
		if($scope.questionBank[type][i].list.length < 20){
			$scope.questionBank[type][i].list.push({});
		}else{
			$scope.wranShow('至多添加20个选项',false);
		}
	};
	//完形填空减少选项
	$scope.deleteOption = function (i){
		if($scope.questionBank[type][i].list.length > 1){
			$scope.questionBank[type][i].list.pop();
		}else{
			$scope.wranShow('请至少保留一个选项',false,'aaa');
		}
	};
	//删除小题事件
	$scope.deleteQuestion = function (i,type,quz){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.prompt = false;
			if($scope.variablePacket.myQuestionTypeIndex == 0) {
				if(quz.sourceType == 1) {
					$scope.deleteQuz(quz.id,i,type);
				}else {
					$scope.deleteFav(quz.id,i,type);
				}
			}else if($scope.variablePacket.myQuestionTypeIndex == 1) {
				$scope.deleteQuz(quz.id,i,type);
			}else { // 删除 收藏分享
				$scope.deleteFav(quz.id,i,type);
			}
			$scope.wranShow('删除成功',true);
		};
	};
	
	// 1.删除试题
	$scope.deleteQuz = function(id,i,type) {
		myQuzService.deleteQuz(id,function(res){  // 删除 试题
			if(res.code == 200) {
				$scope.questionBank[type].splice(i,1);
				$scope.variablePacket.exercisesNum = $scope.variablePacket.exercisesNum - 1;
			}
		},function(e){
			console.log("deleteQuestion"+e)
		});
	}
	// 2.删除试题收藏 分享
	$scope.deleteFav = function(id,i,type) {
		myQuzService.deleteQuzFav(id,function(res){  // 删除试题收藏 分享
			if(res.code == 200) {
				$scope.questionBank[type].splice(i,1);
				$scope.variablePacket.exercisesNum = $scope.variablePacket.exercisesNum - 1;
			}
		},function(e){
			console.log("deleteQuestion"+e)
		});
	}
	
	//公开活取消切换 (修改资源的state 状态)
	$scope.openStateTab = function(item) { 
		if(item.state == 1) {
			myQuzService.update({id:item.id,state:0,updateBy:userId},function(res){
				item.state=0;
			});
		}else {
			myQuzService.update({id:item.id,state:1},function(res){
				item.state=1;
			});
		}
		
	};
	
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
	
	//、、、、、、、、、、、、、、、、、、、、
	// 我的全部
	$scope.findQuzAll = function(type,pageNo,pageSize,subjIds) {
		var params = {pageNo:pageNo,pageSize:pageSize,type:type,subjIds:subjIds,createBy:userId};
		myQuzService.findQuzAll(params,function(res){
			if(res.code == 200) {
				$scope.variablePacket.exercisesNum = res.data.count;
				var ques = {};
				var quess = [];
				angular.forEach(res.data.list,function(e,i){
					ques = {};
					ques.id = e.id;
					ques.quzResId = e.quzResId;
					ques.type=e.type;
					ques.showAnswer = true;
					ques.edit = false;
					ques.jurisdiction = true;
					ques.sourceType = e.sourceType;
					ques.state = e.state;
					ques.body = e.body;
					ques.answer = e.answer;
					ques.analysis = e.analysis;
					ques.list = [];
					if(e.type==5||e.type==7){
						var optArr = e.answer.split(',');
						for(var i=0;i<optArr.length;i++){
							ques.list.push({option:optArr[i]});
						}
					}
					quess.push(ques);
				})
				$scope.getSwitchQuzByType($scope.variablePacket.type,quess);
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.exercisesNum,pageSize,pageNo);
		},function(e){
			console.info("全部试题 findQuzAll:"+e);
		})
	}

	// 我的上传
	$scope.findQuz = function(type,pageNo,pageSize,subjIds) {
		var params = {pageNo:pageNo,pageSize:pageSize,type:type,subjIds:subjIds,createBy:userId};
		myQuzService.findQuz(params,function(res){
			if(res.code == 200) {
				$scope.variablePacket.exercisesNum = res.data.count;
				var ques = {};
				var quess = [];
				angular.forEach(res.data.list,function(e,i){
					ques = {};
					ques.id = e.id;
					ques.type=e.type;
					ques.showAnswer = true;
					ques.edit = false;
					ques.jurisdiction = true;
					ques.sourceType = e.sourceType;
					ques.state = e.state;
					ques.body = e.body;
					ques.answer = e.answer;
					ques.analysis = e.analysis;
					ques.list = [];
					if(e.type==5||e.type==7){
						var optArr = e.answer.split(',');
						for(var i=0;i<optArr.length;i++){
							ques.list.push({option:optArr[i]});
						}
					}
					quess.push(ques);
				})
				$scope.getSwitchQuzByType($scope.variablePacket.type,quess);
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.exercisesNum,pageSize,pageNo);
		},function(e){
			console.info("我的上传 findQuz:"+e);
		});
	}

	// 我的 收藏 分享
	$scope.findShareAndFavoutite = function(favType,pageNo,pageSize,type,subjIds) {
		// favType 0 收藏，1 分享 
		var params = {pageNo:pageNo,pageSize:pageSize,favType:favType,type:type,subjIds:subjIds,createBy:userId,state:0};
		myQuzService.findShareAndFavoutite(params,function(res) {
			if(res.code == 200) {
				$scope.variablePacket.exercisesNum = res.data.count;
				var ques = {};
				var quess = [];
				angular.forEach(res.data.list,function(e,i){
					ques = {};
					ques.id = e.id;
					ques.quzResId = e.quzResId;
					ques.type=e.type;
					ques.showAnswer = true;
					ques.edit = false;
					ques.jurisdiction = false;
					ques.sourceType = e.sourceType;
					ques.state = e.state;
					ques.body = e.body;
					ques.answer = e.answer;
					ques.analysis = e.analysis;
					quess.push(ques);
				})
				$scope.getSwitchQuzByType($scope.variablePacket.type,quess);
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.exercisesNum,pageSize,pageNo);
		},function(e){
			console.info("收藏分享 findShareAndFavoutite:"+e);
		})
	}

	// 试卷 
	// 1.试卷全部module不传
	// 2.我的上传module:1,
	// 3.我的分享module:2,
	// 4.我的收藏module:3,
	$scope.findExamList = function(pageNo,pageSize,subjIds,exType,module) {
		var params = {current:pageNo,size:pageSize,subjIds:subjIds,type:exType,module:module,createBy:userId};
		myQuzService.getExamList(params,function(res) {
			if(res.code == 200) {
				$scope.exams = $scope.exams.concat(res.data.records);
				$scope.variablePacket.testPaperNum = res.data.total;
			}
			$scope.judgeLoadShow(res.code,$scope.variablePacket.testPaperNum,pageSize,pageNo);
		},function(e) {
			console.log("findExamList"+e)
		})
	}
	
	//试卷公开活取消切换 (修改shijuan的state 状态)
	$scope.openStateExam = function(item) { 
		if(item.state == 1) {
			myQuzService.updateExam({id:item.id,state:0,updateBy:userId},function(res){
				item.state=0;
			});
		}else {
			myQuzService.updateExam({id:item.id,state:1,updateBy:userId},function(res){
				item.state=1;
			});
		}
		
	};
	
	// 删除试卷
	$scope.deleteExam = function (i,id){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.prompt = false;
			myQuzService.deleteExam(id,function(res){
				if(res.code == 200) {
					$scope.exams.splice(i,1);
					$scope.variablePacket.testPaperNum = $scope.variablePacket.testPaperNum - 1;
				}
			},function(e){
				console.log("deleteExam"+e)
			});
			$scope.wranShow('删除成功',true);
		};
	};
	
	
	//、、、、、、、、、、、、、、、、、、、、、
	// 下载
	$scope.downQuzAndExam = function(quz,type) {
		if(type == 1) {
			window.location.href=questionUrl+'/a/quz/downloadQuz?body='+quz.body+'&id='+quz.id+'&answer='+quz.answer+'&analysis='+quz.analysis;
		}else {
			window.location.href=questionUrl+'/exam/downloadExam?id='+quz.id;
		}
	}
	
	
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

	$scope.showQuz = function(quz) {
//		$scope.getStuList();
		$scope.getTeaList(quz);
	}
	
	// 分享弹框  查询 学生年级 班级
//	$scope.getStuList = function() {
//	    $http.get(jeucIps + '/ea/eaOffice?officeId=office_825306c73a69466090691d7a4b1b9e57&flag=0&state=1').success(function(suc) {
//	        if(suc.ret == 200) {
//	            $scope.variablePacket.selectSubject = suc.data.subjectList;
//	            var list = new Array();
//	            angular.forEach(suc.data.gradeList, function(data){
//	                var obj = {
//	                    id:data.id,
//	                    grade:data.name,
//	                }
//	                list.push(obj)
//	            });
//	            $scope.variablePacket.selectGrade = list;
//	        };
//	    });
//	}

	// 教师teaList  分享弹框  查询 教师学科 
	$scope.getTeaList = function(quz) {
        	$scope.variablePacket.userType = JSON.parse(sessionStorage.getItem('managerSearch')).userType;
        	$scope.variablePacket.state = JSON.parse(sessionStorage.getItem('managerSearch')).state;
       		$scope.variablePacket.officeId = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
	        var url = jeucIps + 'jeuc/api/uc/user?officeId='+$scope.variablePacket.officeId+'&delFlag=0&state='+$scope.variablePacket.state+'&userType='+$scope.variablePacket.userType;
	        $http.get(url).success(function(suc) {
	            if(suc.ret == 200) {
	                var list = new Array();
	                angular.forEach(suc.data.list, function(data){
	                	if(data.id != userId){
	                		var obj = {
		                        id:data.id,
		                        name:data.realname,
		                        state:false,
		                        disabled:false
		                    }
		                    list.push(obj)
	                	}
	                });
	              	if($scope.variablePacket.exercisesAndtest == 0){
					  	if($scope.variablePacket.myQuestionTypeIndex < 2 && quz.sourceType == "1") {
		              		$scope.variablePacket.quz = quz;
		              	}else {
		              		var res = {
		                      id:quz.quzResId,
		                      createBy:quz.createBy
		                  	}
		              		$scope.variablePacket.quz = res;
		              	}
	              	}else {
	              		if(quz.module == 1) {
		              		$scope.variablePacket.quz = quz;
		              	}else {
		              		var res = {
		                      id:quz.favExamId,
		                      createBy:quz.createBy
		                  	}
		              		$scope.variablePacket.quz = res;
		              	}
	              	}
	                
	                $scope.variablePacket.SharePeopleArr = list;
	                $scope.variablePacket.teacherList = list;
	                $scope.variablePacket.shareCase=true;
	                $scope.variablePacket.selectedSubject = "";
	            };
	        });
	}
	
}]);

app.filter('answerFilter', function() {
	return function(obj) {
		//  	console.log(obj)
		if(obj == "T") {
			return "对";
		} else {
			return "错";
		}
	}
});

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

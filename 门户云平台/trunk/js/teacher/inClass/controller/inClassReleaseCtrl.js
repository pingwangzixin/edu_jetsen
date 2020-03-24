app.controller('inClassReleaseCtrl', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$location', '$interval', 'templateServer', '$stateParams','myResourceService', function($scope, $rootScope, $state, $timeout, $http, $location, $interval, templateServer, $stateParams,myResourceService) {
	//导航相关设置（导航名称等）
	//	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	
	$scope.showFonts_new = function(){
		if($stateParams.type == 'guidance' && $stateParams.state == 'new'){
			return '课中导学'
		}else if($stateParams.type == 'homework' && $stateParams.state == 'new'){
			return '课中作业'
		}
	}
	$scope.showFonts_edit = function(){
		if($stateParams.type == 'guidance' && $stateParams.state == 'edit'){
			return '复制导学'
		}else if($stateParams.type == 'homework' && $stateParams.state == 'edit'){
			return '复制作业'
		}
	}
	
	//导学、作业名称
	$scope.showFonts_name = function(){
		if($stateParams.type == 'guidance'){
			return '导学名称'
		}else if($stateParams.type == 'homework'){
			return '作业名称'
		}
	}
	//导学、作业内容
	$scope.showFonts_content = function(){
		if($stateParams.type == 'guidance'){
			return '导学内容'
		}else if($stateParams.type == 'homework'){
			return '作业内容'
		}
	}
	//变量包
	$scope.Testpaper = [];//试卷右侧列表的数据
	$scope.resource = []; //资源库的存储
	$scope.variablePacket = {
		eightSwitchOut: [
			{"name":"单选题",Type:'single',show:false},     
			{"name":"判断题",Type:'judge',show:false},
			{"name":"简答题",Type:'briefAnswer',show:false},
		],
		threeSwitch: {
			'res':[
				{"name":"我的资源",id:'0'},
				{"name":"校本资源",id:'1'},
				{"name":"公共资源",id:'2'}
			],
			'que':[
				{"name":"我的题库"},
				{"name":"校本题库"},
				{"name":"公共题库"}
			],
			'test':[
				{"name":"我的卷库"},
				{"name":"校本卷库"}
			]
		},
		SelectType: [
			{"name":"全部"},
			{"name":"文档"},
			{"name":"视频"},
			{"name":"音频"},
			{"name":"图片"},
			{"name":"PPT"}
		],
		classaName: [
			{"name":"初一(1)班","active":false},
			{"name":"初一(2)班","active":false},
			{"name":"初一(3)班","active":false},
			{"name":"初一(4)班","active":false},
			{"name":"初一(4)班","active":false},
		],
		testpaperBox_pic: false,
		testpaperBox_line: false,
		ResourcesTypeShow_pic: false,
		ResourcesTypeShow_line: false,
		TestIndex: 0, //试卷默认选中
		selectSubject: [
			{'name': '数学'}, 
			{'name': '语文'}, 
			{'name': '英语'}, 
			{'name': '政治'}
		],
		state: $stateParams.state, //new:布置导学	edit:复制导学
		types: $stateParams.type, //guidance:导学   homework:作业
		queIndex: 0, //8种题型的默认选中
		ResLineIndex: 0, //页面--资源库资源条默认选中
		ResLineTab: 0, //页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType: "pic", //页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		titFixed: false, //吸顶样式
		delShow: true, //弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex: false, //弹层--层级提高一级；
		maskHeader: true, //弹层表头--true:从题库选择;false:插入资源
		insertChoiceAll: false, //弹出总开关
		insertChoice: '', //弹层主内容--添加资源：resources， 添加卷库：testpaper
		insertChoice_eightType: 0, //弹层--8种题型的默认选中
		insertChoice_selectType: 0, //弹层--插入的类型默认选中
		AddResources_show: false, //页面--资源库是否显示
		Chapter: [{Onetit: '学科',Twotit: '课本',Threetit: '章节'}], //章节默认
		leftTreeShow: { teachingMaterial: true},
		leftTreeShow1 : {					//左侧树展示
            teachingMaterial : true,		//版本选择框
            treeOne : true,					//版本选择框下的树
            treeKnowledgePoint : false,		//知识点树
            other : false,						//其他
        },
        leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
		Echotit: 0, //导学内容---导学资源和提问交流默认选中
		askArry: [], //导学内容---提问交流的存储数组
		message: '', //导学内容---提问交流的提交的文字
		MessageOff: false, //导学名称开关
		ProvingUsername: false, //导学名称验证
		UsernameMessage: '', //导学名称的文字
		SubjectOff: false, //学科验证开关
		ProvingSubject: false, //学科验证
		ProvingChapter: false, //章节目录验证
		ObjecOff: false, //发布对象开关
		ProvingObject: false, //发布对象验证
		ProvingContent: false, //导学内容验证
		memoriesChapterIds : '',//树ids
		memoriesChapterNames : '',//树names
		jiazaiRes:false,
		jiazaiAssembly:false,
		loginUserId : sessionStorage.getItem("userId"),
		loginUserName : JSON.parse(sessionStorage.getItem("managerSearch")).realname,
		resourceTypeGroup:'0',//0是资源，1是试题
		pageNo:1,//页数
		pageSize:4,//每页展示条数
		createFlag : false,//创建防重
	}
	//赋值弹层的自适应高度
	function adaptionHeight() {
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight,.addTestPaper').height(bigHeight - 275);
			angular.element('.addTestPaper').height(bigHeight - 120);
			//题型
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
			//资源
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
			//卷库
			angular.element(".addTestPaper").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
		});
	}
	//导学名称
	$scope.zyx_username = function() {
		console.log($scope.variablePacket.UsernameMessage)
		if($scope.variablePacket.UsernameMessage.length > 0) {
			$scope.variablePacket.ProvingUsername = false;
			$scope.variablePacket.MessageOff = true;
		}else{
			$scope.variablePacket.ProvingUsername = true;
			$scope.variablePacket.MessageOff = false;
		}
	}

	/**
	 * 如果是修改导学，查询导学信息
	 */
	$scope.editGuidacne = function(){
//		if($location.$$search.state == "edit"){
			console.log(!$scope.variablePacket.ProvingUsername)
			$http.get(guidanceLearningIp + 'learn?id='+$location.$$search.guidanceId).success(function (data){
				console.log(data)
				if(data.ret == 200){
					$scope.variablePacket.guidanceList = data.data[0];
					$scope.variablePacket.UsernameMessage = $scope.variablePacket.guidanceList.guidanceLearn.name;
//					$scope.variablePacket.ExplainMessage = $scope.variablePacket.guidanceList.guidanceLearn.descriprion;
					//树
					var selectedSubject = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds.split(",")[2];
		            $scope.variablePacket.subjectId = $scope.variablePacket.guidanceList.guidanceLearn.subjectId;
					$scope.variablePacket.subjectName = $scope.variablePacket.guidanceList.guidanceLearn.subjectName;
					$scope.variablePacket.memoriesChapterIds = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds;
    				$scope.variablePacket.memoriesChapterNames = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterNames;
		            $scope.variablePacket.subjIds = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds;
					$scope.variablePacket.subjNames = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterNames;
		            $rootScope.variableGlobal.libraryTitleBar = [$scope.variablePacket.subjNames.split("//")[4],$scope.variablePacket.subjNames.split("//")[5],$scope.variablePacket.subjNames.split("//")[6]]
		            $scope.variablePacket.Chapter[0].Onetit = $scope.variablePacket.subjNames.split("//")[4];
		            $scope.variablePacket.Chapter[0].Twotit = $scope.variablePacket.subjNames.split("//")[5];
		            $scope.variablePacket.Chapter[0].Threetit = $scope.variablePacket.subjNames.split("//")[6];
		            console.log( $scope.variablePacket.Chapter)
		            angular.forEach($scope.variablePacket.selectSubject, function(data){
		            	if(data.id == selectedSubject){
		                    data.subjIds = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds;
		                    data.subjNames = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterNames;
		                    $scope.selectedSubject = data;
						}
		            });
		            var arrayObj = new Array(); 
		            arrayObj = $scope.variablePacket.guidanceList.guidanceLearn.publishDetils;
		            angular.forEach($scope.variablePacket.classaName, function(d,i){
		            	angular.forEach(arrayObj, function(t,ii){
		            		if(t != ''){
		            			if(t.classId == d.classId){
									$scope.variablePacket.classaName[i].active=true;
		            			}
		            		}
		            	});
		            });
		            $scope.Answer=0;
		            if($scope.variablePacket.guidanceList.guidanceResource.sendResource.resource.length>0){
		            	$scope.resource=$scope.variablePacket.guidanceList.guidanceResource.sendResource.resource;
		            	$scope.variablePacket.ResourcesTypeShow_line = true;
		            	$scope.ResLineTab(0,$scope.variablePacket.guidanceList.guidanceResource.sendResource.resource[0].resourceType,$scope.variablePacket.guidanceList.guidanceResource.sendResource.resource[0].ossFileName);
		            }else{
		            	$scope.variablePacket.ResourcesTypeShow_line = false;
		            }
		            if($scope.variablePacket.guidanceList.guidanceResource.sendResource.testQuestionsResource.length>0){
		            	$scope.variablePacket.testpaperBox_line = true;
		            	$scope.Testpaper = [];
		            	$scope.Testpaper = $scope.variablePacket.guidanceList.guidanceResource.sendResource.testQuestionsResource;
						angular.forEach($scope.Testpaper,function(e,i){
							$scope.Testpaper[i].ResourceTit=$scope.Testpaper[i].resourceName;
							$scope.Testpaper[i].size=$scope.Testpaper[i].resourceSize;
							$scope.Testpaper[i].type=$scope.Testpaper[i].resourceType;
							$scope.Testpaper[i].id=$scope.Testpaper[i].resourceId;
						})
		            }else{
		            	$scope.variablePacket.testpaperBox_line = false;
		            }
		            $scope.Testpaper = $scope.variablePacket.guidanceList.guidanceResource.sendResource.testQuestionsResource;
		            $scope.variablePacket.AddResources_show = true;
				}
		    })
//		}
	}
	
	
	/**
	 * 根据用户id，导学id查询资源,不同state代表下发和回传
	 */
//	$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$location.$$search.guidanceId+'&&type=0').success(function (data){
//		if(data.ret == 200){
//			if(data.data)
//			$scope.resource=data.data;
//			console.log($scope.resource)
//			if(data.data.length>0){
//				$scope.variablePacket.fileNotExist=false;
//				$scope.ResLineTab(0,data.data[0].resourceType,data.data[0].ossFileName);
//			}else{
//				$scope.variablePacket.fileNotExist=true;
//			}
//		}
//  })
	
	/**
	 * 判断是创建导学还是复制导学
	 */
	if($location.$$search.state == "edit" && $location.$$search.type == "guidance"){
    	console.log("编辑课中导学")
		$scope.editGuidacne();
	}else{
    	$rootScope.variableGlobal.libraryTitleBar = ['课本','章','节'];
    }
	
	
	/**
	 * 根据用户id查询授课学科
	 * 郭峪诚
	 */
	$http.get(jeucIp + 'ea/eaUserCourse/subject?uid='+sessionStorage.getItem("userId")).success(function (suc){
		$scope.variablePacket.selectSubject = [];
		if(suc.ret == 200){
			console.log(suc.data)
			angular.forEach(suc.data, function(data){
				var subj = {
                    id:data.subjectId,
                    name :data.subjectName,
                };
				$scope.variablePacket.selectSubject.push(subj);
			})
		}
		console.log($scope.variablePacket.selectSubject);
	})
	
	/**
	 * 通过用户信息查询老师所教班级
	 * 郭峪诚
	 */
	$http.get(jeucIp + 'ea/class?userId='+sessionStorage.getItem("userId")).success(function (data){
		if(data.ret == 200){
			$scope.variablePacket.classaName = data.data;
			angular.forEach($scope.variablePacket.classaName,function(obj,index){
				if(index == 0){
					$scope.variablePacket.classaName[index].active=true;
				}else{
					$scope.variablePacket.classaName[index].active=false;
				}
				$scope.variablePacket.classaName[index].name=$scope.variablePacket.classaName[index].gradeName+'('+$scope.variablePacket.classaName[index].className+')班';
			})
		}
	})
	/**
	 * 获取树节点
	 * @param {Object} ids
	 * @param {Object} names
	 * @param {Object} gradeJson
	 * 郭峪诚
	 */
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.variablePacket.memoriesChapterIds = ids;
    	$scope.variablePacket.memoriesChapterNames = names;
    	$scope.variablePacket.gradeJson = gradeJson;
    	console.info(ids,names,gradeJson);
    };
	//发布对象
	$scope.classaNameTab = function(index) {
		$scope.variablePacket.classaName[index].active = !$scope.variablePacket.classaName[index].active;
		var activeArr = [];
		angular.forEach($scope.variablePacket.classaName, function(e) {
			this.push(e.active);
		}, activeArr);
		if(activeArr.indexOf(true) == -1) {
			$scope.variablePacket.ProvingObject = true;
			$scope.variablePacket.ObjecOff = true;
			console.log(activeArr)
		} else {
			$scope.variablePacket.ProvingObject = false;
			$scope.variablePacket.ObjecOff = false;
			console.log(activeArr)
		}
	}

	//学科验证
	$scope.Subject = function() {
		console.log($scope.selectedSubject);
		$scope.variablePacket.subjectId = $scope.selectedSubject.id;
		$scope.variablePacket.subjectName = $scope.selectedSubject.name;
		if($scope.selectedSubject != undefined) {
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject == undefined) {
			$scope.variablePacket.ProvingSubject = true;
		}
		$scope.variablePacket.Chapter[0].Onetit = "学科";
        $scope.variablePacket.Chapter[0].Twotit = "课本";
        $scope.variablePacket.Chapter[0].Threetit = "章节";
		$rootScope.initchoiceVersion();
	}
	//发布
	$scope.Verification = function(ok) {
		console.log($scope.Testpaper);
		console.log($scope.variablePacket.Chapter)
		var arrayObj = new Array();
		if(ok && (!$scope.variablePacket.ProvingUsername) && (!$scope.variablePacket.ProvingSubject) &&($scope.variablePacket.Chapter[0].Onetit != "学科" || $scope.variablePacket.Chapter[0].Twotit != "课本" || $scope.variablePacket.Chapter[0].Threetit != "章节")   && (!$scope.variablePacket.ProvingObject) && ($scope.variablePacket.AddResources_show)) {
			var classNames = "";
			var classIds = "";
			var gradeIds = "";
			var gradeNames = "";
			var guidanceName = $scope.variablePacket.UsernameMessage;
			var guidanceBackState = 0;
			var description = $scope.variablePacket.ExplainMessage;
			var chapterId = $scope.variablePacket.memoriesChapterIds;
			var chapterName = $scope.variablePacket.memoriesChapterNames;
			var createBy=$scope.variablePacket.loginUserId;
			var updateBy=$scope.variablePacket.loginUserId;
			var subjectId = $scope.variablePacket.subjectId;
			var subjectName = $scope.variablePacket.subjectName;
			//从选择的下发对象，获取下发对象id和对象名字
			angular.forEach($scope.variablePacket.classaName, function (each) { 
				if(each.active == true ){
					classNames += ","+each.name;
					classIds += ","+each.classId;
					gradeIds += ","+each.gradeId;
					gradeNames += ","+each.gradeName;
				}
			})
			if(classIds!=""){
				classIds = classIds.substring(1);
				classNames = classNames.substring(1);
				gradeIds = gradeIds.substring(1);
				gradeNames = gradeNames.substring(1);
			}
			//作业
			if($scope.variablePacket.types=="homework"){
				//资源
				if($scope.resource.length > 0){
					angular.forEach($scope.resource,function(e,i){
						var value = {};
						value.resourceId=$scope.resource[i].resourceId;
						value.ossFileName=$scope.resource[i].resourceName;
						value.name=$scope.resource[i].ResourceTit;
						value.objId=$scope.resource[i].resourceType;
						value.sourceAndEnclosure = 0;
						arrayObj.push(value);
					})
				}
				//试卷
				var assemblyIds = "";
				if($scope.Testpaper.length > 0){
					angular.forEach($scope.Testpaper,function(e,i){
						var value = {};
						assemblyIds += ","+$scope.Testpaper[i].id;
					})
				}
				assemblyIds = assemblyIds.substring(1);
				var examParams = {};
				examParams.eType = 1;
				examParams.examType = 1;
				examParams.examName = guidanceName;
				examParams.subjectId = subjectId;
				examParams.subjectName = subjectName;
				examParams.treeIds = chapterId;
				examParams.treeNames = chapterName;
				examParams.classs = classIds;
				examParams.classNames = classNames;
				examParams.gradeIds = gradeIds;
				examParams.gradeNames = gradeNames;
				examParams.teacherId = $scope.variablePacket.loginUserId;
				examParams.teacherName = $scope.variablePacket.loginUserName;
				examParams.officeId = JSON.parse(sessionStorage.getItem("managerSearch")).officeId;
				examParams.areaId = JSON.parse(sessionStorage.getItem("managerSearch")).cityId;
				examParams.addresid = assemblyIds;
				examParams.quessorts = JSON.stringify(arrayObj);
				//存储进库
				$scope.addExam(examParams);
			}else{
				console.log($scope.resource);
				if($scope.resource.length > 0){
					angular.forEach($scope.resource,function(e,i){
						var value = {};
						value.type='0';
						if($scope.resource[i].ResourceTit == "" || $scope.resource[i].ResourceTit == undefined){
							$scope.resource[i].ResourceTit = $scope.resource[i].resourceName;
						}
						if($scope.resource[i].size == "" || $scope.resource[i].size == undefined){
							$scope.resource[i].size = $scope.resource[i].resourceSize;
						}
						value.resourceName=$scope.resource[i].ResourceTit;
						value.resourceSize=$scope.resource[i].size;
						value.sort=i.toString();
						value.resourceClassification=$scope.variablePacket.resourceTypeGroup;
						value.resourceAuthor='';
						value.ossFileName=$scope.resource[i].ossFileName;
						value.resourceType=$scope.resource[i].resourceType;
						value.resourceId=$scope.resource[i].resourceId;
						arrayObj.push(value);
					})
				}
				if($scope.Testpaper.length > 0){
					angular.forEach($scope.Testpaper,function(e,i){
						var value = {};
						value.type='0';
						value.resourceName=$scope.Testpaper[i].ResourceTit;
						value.resourceSize=$scope.Testpaper[i].size;
						value.sort=i.toString();
						value.resourceClassification="1";
						value.resourceAuthor=$scope.Testpaper[i].name;
						value.ossFileName=$scope.Testpaper[i].id;
						value.resourceType=$scope.Testpaper[i].type;
						value.resourceId=$scope.Testpaper[i].id;
						arrayObj.push(value);
					})
				}
				console.log(angular.toJson(arrayObj))
				//调用添加导学的方法
				$scope.addGuidanceLearn(guidanceName,chapterId,chapterName,description,classNames,classIds,guidanceBackState,arrayObj,subjectId,subjectName);
				$scope.wranShow('验证成功!', true, '');
				$timeout(function() {
					$state.go("secondNav.guideList")
				}, 1500)
			}
		} else {
			if(!$scope.variablePacket.AddResources_show) {
				$scope.variablePacket.ProvingContent = true;
			}
			if(($scope.variablePacket.Chapter[0].Onetit == "学科") || ($scope.variablePacket.Chapter[0].Twotit == "课本") || ($scope.variablePacket.Chapter[0].Threetit == "章节")) {
				$scope.variablePacket.ProvingChapter = true;
			}
//			if(!$scope.variablePacket.ProvingUsername && !$scope.variablePacket.MessageOff) {
//				$scope.variablePacket.ProvingUsername = true;
//			}
			$scope.zyx_username();
			$scope.Subject();
			var activeArr = [];
			angular.forEach($scope.variablePacket.classaName, function(e) {
				this.push(e.active);
			}, activeArr)
			if(activeArr.indexOf(true) == -1) {
				$scope.variablePacket.ProvingObject = true;
				$scope.variablePacket.ObjecOff = true;
				console.log(activeArr)
			}
		}
	}
	
	/**
	 * 布置作业
	 * 郭军
	 */
	$scope.addExam = function(params){
		console.log(JSON.stringify(params));
		if($scope.variablePacket.createFlag){
			return false;
		}
		$scope.variablePacket.createFlag = true;
		$http.post(lessonIp+"ExamCount/addExamCount", params).success(function(result) {
			if(result.ret==200){
				$scope.wranShow('创建成功',true)
				setTimeout(function () {
                	$state.go('secondNav.homeworkList',{reload:true});
            	}, 1000);
			}else{
				$scope.variablePacket.createFlag = false;
				$scope.wranShow('创建失败',false)
			}
		});
	}
	

	/**
	 * 布置导学
	 * 郭峪诚
	 */
	$scope.addGuidanceLearn = function(name,chapterId,chapterName,description,sendObjectNames,sendObjectIds,backState,resourceJson,subjectId,subjectName){
		console.info(name,chapterId,chapterName,description,sendObjectNames,sendObjectIds,backState,angular.toJson(resourceJson),subjectId,subjectName);
//		var username = sessionStorage.getItem('username');
		var username = $scope.variablePacket.loginUserId;
		$http.post(guidanceLearningIp + 'learn',{name:name,guideType:1,memoriesChapterIds:chapterId,memoriesChapterNames:chapterName,subjectId:subjectId,subjectName:subjectName,descriprion:description,publishObjectNames:sendObjectNames,publishObjectIds:sendObjectIds,backType:backState,createBy:username,updateBy:username,resourceJson:angular.toJson(resourceJson)}).success(function (data){
			console.log(data);
			if(data.ret != 200){
				console.log("发布成功");
			}
	    })
	}
	//弹层--关闭
	$scope.closeMask = function() {
		$scope.variablePacket.insertChoiceAll = false;
	}

	//页面/弹层--查看答案及解析
	$scope.lookAnswer = function(type, index, answer) {
		if($scope.variablePacket.insertChoiceAll) {
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		} else {
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}
	/**
	 * 查询资源类型
	 * 郭峪诚
	 */
	var params = "";
	myResourceService.getResType(params,function(res){
		if(res.code == 200){
			$scope.variablePacket.SelectType = res.data;
			$scope.variablePacket.SelectType.unshift({"name":"全部","id":""});
			
		}else{
			$scope.variablePacket.SelectType = [];
		}
	},function(res){
		
	})
//	弹层----插入资源的类型切换
	$scope.insertChoice_selectTypeTab = function(index,id){
		console.log(index+"---"+id);
		$scope.variablePacket.insertChoice_selectType = index;
		console.log($scope.variablePacket.selectSubject[index]);
		$scope.resParams.objId = id;
		if($scope.variablePacket.maskHeader){
			console.log("试卷");
			$scope.variablePacket.pageNo=1;
			$scope.insertTest = [];
			$scope.getAddAssemblyList();
		}else{
			console.log("资源");
			$scope.getAddResource();
		}
	}
//	//页面--从资源库添加
//	$scope.addRes = function() {
//		$scope.variablePacket.leftTreeShow.teachingMaterial = false;
//		$scope.variablePacket.insertChoiceAll = true;
//		$scope.variablePacket.insertChoice = 'resources';
//		$scope.variablePacket.maskHeader = false;
//		adaptionHeight();
//		$scope.insert_Sign = function(index, num) {
//			$scope.insertData[index].sign = !$scope.insertData[index].sign;
//			if($scope.insertData[index].sign) {
//				$scope.variablePacket.ResLineIndex = 0; //当前高亮
//				$scope.variablePacket.TestIndex = -1;//取消卷库高亮
//				$scope.variablePacket.AddResources_show = true; //左侧整体框显示
//				$scope.variablePacket.ResourcesTypeShow_line = true;//资源显示
//				$scope.variablePacket.ResourcesTypeShow_pic = true;
//				$scope.variablePacket.testpaperBox_pic = false;
//				if($scope.Testpaper.length==0){
//					$scope.variablePacket.testpaperBox_line = false; //卷库右边隐藏
//				}else{
//					$scope.variablePacket.testpaperBox_line = true; //卷库右边显示
//				}
//				
//				var resObj = angular.copy($scope.insertData[index]);
//				$scope.resource.unshift(resObj);
//				
//				$scope.variablePacket.ProvingContent = false;
//				if($scope.resource[0].ResourceSrc == 4) {
//					$scope.variablePacket.ResLineType = "music";
//				} else if($scope.resource[0].ResourceSrc == 5) {
//					$scope.variablePacket.ResLineType = "video";
//				} else {
//					$scope.variablePacket.ResLineType = "pic";
//				}
//			} else {
//				angular.forEach($scope.resource, function(e, i) {
//					if(e.ResourceNum == num) {
//						$scope.resource.splice(i, 1);
//						if($scope.variablePacket.ResLineIndex == i && $scope.resource.length > 0) {
//							$scope.variablePacket.ResLineIndex = 0;
//							$scope.variablePacket.ResLineTab = 0;
//							if($scope.resource[0].ResourceSrc == 4) {
//								$scope.variablePacket.ResLineType = "music";
//							} else if($scope.resource[0].ResourceSrc == 5) {
//								$scope.variablePacket.ResLineType = "video";
//							} else {
//								$scope.variablePacket.ResLineType = "pic";
//							}
//						}
//					}
//					if($scope.resource.length == 0 && $scope.Testpaper.length == 0) {
//						$scope.variablePacket.AddResources_show = false;
//					}
//					if($scope.resource.length == 0) {
//						$scope.variablePacket.ResourcesTypeShow_line = false;
//						$scope.variablePacket.ResourcesTypeShow_pic = false;
//						$scope.variablePacket.testpaperBox_pic = true;
//						$scope.variablePacket.TestIndex = 0;
//					}
//				});
//
//			}
//
//		}
//	}
//弹层--我的题库，公共题库，校本题库切换
	$scope.insertChoice_threeSwitch = function(index,id){
		console.log(index+"---"+id);
		$scope.variablePacket.insertChoice_threeType = index;
		for(i in $scope.resParams){
			$scope.resParams[i] = '';
		}
		if(index!=0){
			$scope.variablePacket.delShow = false;
		}else{
			$scope.variablePacket.delShow = true;
			$scope.resParams.createBy = $scope.variablePacket.userId;
		}
		$rootScope.treetype = id;
		$scope.resParams.state = id;
		$scope.insertChoice_selectTypeTab(0,'');

		if(id=="0"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		}
		if(id=="1"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
        if(id=="2"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }

	}
// 根据左侧树查询
$rootScope.findListByTree = function(subjectID,knowledge) {
//  if(subjectID != ""){
        $scope.resParams.subjectID = subjectID;
//  }
//  if(knowledge != ""){
        $scope.resParams.knowledge = knowledge;
//  }
	if($scope.variablePacket.maskHeader){
		console.log("试卷");
		$scope.variablePacket.pageNo=1;
		$scope.insertTest = [];
		$scope.getAddAssemblyList();
	}else{
		console.log("资源");
		$scope.getAddResource();
	}
};
$scope.addRes = function(){
		$scope.variablePacket.insertChoice = 'resources';
        $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		$scope.variablePacket.insertChoiceAll=true;
		$scope.variablePacket.maskHeader=false;
		$scope.variablePacket.leftTreeShow.teachingMaterial = false;
		adaptionHeight();
		//初始化添加资源查询
		$scope.variablePacket.insertChoice_threeType = 0;
		$scope.variablePacket.insertChoice_selectType = 0;
		$rootScope.treetype = 0;
		$scope.addResCount = 0;
		console.log($scope.resource)
		for(i in $scope.resParams){
			$scope.resParams[i] = '';
		}
		//默认是我的资源
		$scope.resParams.state=0;
		$scope.addResMap = {};
		angular.forEach($scope.resource,function(e,i){
			$scope.addResMap[e.resourceId] = e;
		})
		$scope.getAddResource();
		$scope.insert_Sign = function(index,num) {
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
			var playerSTOP;
			if($scope.insertData[index].sign) {
				$scope.variablePacket.ResLineIndex = 0; //当前高亮
				$scope.variablePacket.TestIndex = -1;//取消卷库高亮
				$scope.variablePacket.AddResources_show = true;
				$scope.variablePacket.ResourcesTypeShow_line = true;//资源显示
				$scope.variablePacket.ResourcesTypeShow_pic = true;
				$scope.variablePacket.testpaperBox_pic = false;
				if($scope.Testpaper.length==0){
					$scope.variablePacket.testpaperBox_line = false; //卷库右边隐藏
				}else{
					$scope.variablePacket.testpaperBox_line = true; //卷库右边显示
				}
				var resObj = angular.copy($scope.insertData[index]);
				$scope.addResMap[resObj.resourceId] = resObj;
				$scope.resource.unshift(resObj);
				$scope.variablePacket.ProvingContent = false;
				console.log($scope.resource[0]);
				var ossId = $scope.resource[0].ossFileName;
				if($scope.resource[0].ossFileName.indexOf("_360")>0){
					ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
				}
				//根据filename查询播放展示路径
				$http.get(ossIp + 'filelog/'+ossId).success(function (data){
					console.log(data);
					$scope.variablePacket.convertState = data.data.state;
					if($scope.resource[0].resourceType==2){
						$("#pdfPlay").hide();
						$("#tupian").hide();
						$("#showplayer").show();
						$scope.variablePacket.ResLineType = "music";
//						$scope.variablePacket.audioPath = data.data.previewUrl;
						var fls = flashChecker();
						if(fls.f==0) {
							//显示flash提醒
							$("#flashTest").show();
						} else {
							$("#flashTest").hide();
							console.log(data.data.pathmp3PC)
							console.log(data.data.pathmp3PAD)
							audioSTOP = jwplayer('showplayer').setup({
								flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
								//file: vpath,
								height: 398,
								width: "100%",
								autostart: true,
								playlist: [{
									sources: [{
										file: data.data.pathmp3PC
									}, {
										file: data.data.pathmp3PAD
									}]
								}],
								androidhls: "true"
							});
							audioSTOP.onComplete(function(){
								$(".jw-display-icon-container").css({"pointer-events":"none"});
							})
						}
					}else if($scope.resource[0].resourceType==1 || $scope.resource[0].resourceType==8 || $scope.resource[0].resourceType==9){
						$("#pdfPlay").hide();
						$("#tupian").hide();
						$("#showplayer").show();
						console.log("播放视频")
						$scope.variablePacket.ResLineType = "video";
						$scope.variablePacket.videoPath = data.data.pathmp4PC;
						var fls = flashChecker();
						if(fls.f==0) {
							//显示flash提醒
							$("#flashTest").show();
						} else {
							$("#flashTest").hide();
							console.log(data.data.pathmp4PC)
							console.log(data.data.pathmp4PAD)
							playerSTOP = jwplayer('showplayer').setup({
								flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
								//file: vpath,
								height: 398,
								width: "100%",
								autostart: true,
								playlist: [{
									sources: [{
										file: data.data.pathmp4PC
									}, {
										file: data.data.pathmp4PAD
									}]
								}],
								androidhls: "true"
							});
							playerSTOP.onComplete(function(){
								$(".jw-display-icon-container").css({"pointer-events":"none"});
							})
						}
					}else if($scope.resource[0].resourceType==3){
						$scope.renderFinish();
						$("#pdfPlay").hide();
						$("#showplayer").hide();
						$("#tupian").show();
						$scope.variablePacket.ResLineType = "pic";
						$scope.variablePacket.imagePath = data.data.previewUrl;
						$("#flashTest").hide();
					}else{
						$("#tupian").hide();
						$("#showplayer").hide();
						$("#pdfPlay").show();
						$scope.variablePacket.ResLineType = "pdf";
						$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
						console.log("common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF);
						console.log($scope.variablePacket.pdfPath);
						$("#flashTest").hide();
					}
				})
			} else {
				delete $scope.addResMap[$scope.insertData[index].resourceId];
				angular.forEach($scope.resource,function(e,i){
					if (e.ResourceNum == num){
						$scope.resource.splice(i,1);
						if($scope.variablePacket.ResLineIndex == i && $scope.resource.length>0){
							$scope.variablePacket.ResLineIndex = 0;
							$scope.variablePacket.ResLineTab = 0;
							
							console.log($scope.resource[0].ossFileName);
							var ossId = $scope.resource[0].ossFileName;
							if($scope.resource[0].ossFileName.indexOf("_360")>0){
								ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
							}
							//根据filename查询播放展示路径
							$http.get(ossIp + 'filelog/'+ossId).success(function (data){
								if($scope.resource[0].resourceType==2){
									$("#pdfPlay").hide();
									$("#tupian").hide();
									$("#showplayer").show();
									$scope.variablePacket.ResLineType = "music";
//									$scope.variablePacket.audioPath = data.data.previewUrl;
									var fls = flashChecker();
									if(fls.f==0) {
										//显示flash提醒
										$("#flashTest").show();
									} else {
										$("#flashTest").hide();
										console.log(data.data.pathmp3PC)
										console.log(data.data.pathmp3PAD)
										audioSTOP = jwplayer('showplayer').setup({
											flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
											//file: vpath,
											height: 398,
											width: "100%",
											autostart: true,
											playlist: [{
												sources: [{
													file: data.data.pathmp3PC
												}, {
													file: data.data.pathmp3PAD
												}]
											}],
											androidhls: "true"
										});
										audioSTOP.onComplete(function(){
											$(".jw-display-icon-container").css({"pointer-events":"none"});
										})
									}
								}else if($scope.resource[0].resourceType==1 || $scope.resource[0].resourceType==8 || $scope.resource[0].resourceType==9){
									$("#pdfPlay").hide();
									$("#tupian").hide();
									$("#showplayer").show();
									$scope.variablePacket.ResLineType = "video";
									$scope.variablePacket.videoPath = data.data.previewUrl;
									var fls = flashChecker();
									if(fls.f==0) {
										//显示flash提醒
										$("#flashTest").show();
									} else {
										$("#flashTest").hide();
										console.log(data.data.pathmp4PC)
										console.log(data.data.pathmp4PAD)
										playerSTOP = jwplayer('showplayer').setup({
											flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
											//file: vpath,
											height: 398,
											width: "100%",
											autostart: true,
											playlist: [{
												sources: [{
													file: data.data.pathmp4PC
												}, {
													file: data.data.pathmp4PAD
												}]
											}],
											androidhls: "true"
										});
										playerSTOP.onComplete(function(){
											$(".jw-display-icon-container").css({"pointer-events":"none"});
										})
									}
								}else if($scope.resource[0].resourceType==3){
									$("#pdfPlay").hide();
									$("#showplayer").hide();
									$("#tupian").show();
									$scope.variablePacket.ResLineType = "pic";
									$scope.variablePacket.imagePath = data.data.previewUrl;
									$("#flashTest").hide();
								}else{
									$("#showplayer").hide();
									$("#tupian").hide();
									$("#pdfPlay").show();
									$scope.variablePacket.ResLineType = "pdf";
									$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
									console.log("common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF);
									console.log($scope.variablePacket.pdfPath);
									$("#flashTest").hide();
								}
							})
							if($scope.resource.length == 0 && $scope.Testpaper.length == 0) {
								$scope.variablePacket.AddResources_show = false;
							}
							if($scope.resource.length == 0) {
								console.log(830)
								$scope.variablePacket.ResourcesTypeShow_line = false;
								$scope.variablePacket.ResourcesTypeShow_pic = false;
								$scope.variablePacket.testpaperBox_pic = true;
								$scope.variablePacket.TestIndex = 0;
							}
						}
					}
					if($scope.resource.length == 0){
						$scope.variablePacket.AddResources_show = false;
					}
				});
				
			}
			
		}
	}

/**
 * 资源查询参数
 * 郭峪诚
 */
$scope.resParams = {
	objId:'',
	subjectID:'',
	knowledge:'',
	title:'',
	state:'',
	createBy:sessionStorage.getItem("userId"),
	pageNo:1,
}

/**
 * 查询资源
 * 郭峪诚
 */
$scope.getAddResource = function(){
	$scope.insertData = [];
	$scope.resParams.pageNo = 1;
	console.log($scope.resParams);
	if($rootScope.treetype == "0"){
        $scope.resParams.userId = sessionStorage.getItem("userId");
        $scope.resParams.state = "";
        myResourceService.getResourcesAll($scope.resParams,function(res){
//      		console.log(res1)
//      		res = res1.data
        		if(res.count<11){
					$scope.variablePacket.jiazaiRes = false;
				}
        		if(res.list.length<10){
                	$scope.variablePacket.jiazaiRes = false;
                }else{
                	$scope.variablePacket.jiazaiRes = true;
                }
                $scope.addResCount = res.count;
                angular.forEach(res.list,function(obj,index){
                    var resTem = {};
                    resTem.sign = $scope.addResMap[obj.id] == undefined?false:true;
                    resTem.ResourceNum = index;
                    resTem.resourceName = resTem.ResourceTit = obj.title;
                    resTem.resourceType = obj.objId;
                    resTem.ResourceSrc = obj.objId;
                    resTem.name = obj.createUser;
                    resTem.time = obj.createDate;
                    resTem.size = obj.fileSize;
                    resTem.resourceId = resTem.id = obj.id;
                    resTem.viewURL = obj.viewURL;
                    resTem.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
                    $scope.insertData.push(resTem);
                })
        },function(error){

        })
	}else{
		if($rootScope.treetype == "1"){
            $scope.resParams.areaCodes = $scope.variablePacket.officeId;
		}
        if($rootScope.treetype == "2"){
            $scope.resParams.areaCodes = "";
        }
        myResourceService.getResources($scope.resParams,function(res){
            if(res.code==200){
	        	if(res.data.count<11){
					$scope.variablePacket.jiazaiRes = false;
				}
	    		if(res.data.list.length<10){
	            	$scope.variablePacket.jiazaiRes = false;
	            }else{
	            	$scope.variablePacket.jiazaiRes = true;
	            }
                $scope.addResCount = res.data.count;
                angular.forEach(res.data.list,function(obj,index){
                    var resTem = {};
                    resTem.sign = $scope.addResMap[obj.id] == undefined?false:true;
                    resTem.ResourceNum = index;
                    resTem.resourceName = resTem.ResourceTit = obj.title;
                    resTem.resourceType = obj.objId;
                    resTem.ResourceSrc = obj.objId;
                    resTem.name = obj.createUser;
                    resTem.time = obj.createDate;
                    resTem.size = obj.fileSize;
                    resTem.resourceId = resTem.id = obj.id;
                    resTem.viewURL = obj.viewURL;
                    resTem.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
                    $scope.insertData.push(resTem);
                })
            }
        },function(error){

        })
	}
}
	
	/**
	 * 加载更多资源
	 * 郭峪诚
	 */
	$scope.jiazaiRes = function(){
		$scope.resParams.pageNo = $scope.resParams.pageNo+1;
		console.log("加载更多页码-----"+$scope.resParams.pageNo)
		//查询资源
		if($scope.variablePacket.insertChoice_threeType == "0"){
			myResourceService.getResourcesAll($scope.resParams,function(res){
	                $scope.addResCount = res.count;
	                //res = res.data
	                console.log(res)
	                console.log(res.length)
	                if(res.list.length<10){
	                	$scope.variablePacket.jiazaiRes = false;
	                }else{
	                	$scope.variablePacket.jiazaiRes = true;
	                }
	                angular.forEach(res.list,function(obj,index){
	                    var resTem = {};
	                    resTem.sign = $scope.addResMap[obj.id] == undefined?false:true;
	                    resTem.ResourceNum = index;
	                    resTem.resourceName = resTem.ResourceTit = obj.title;
	                    resTem.resourceType = obj.objId;
	                    resTem.ResourceSrc = obj.objId;
	                    resTem.name = obj.createUser;
	                    resTem.time = obj.createDate;
	                    resTem.size = obj.fileSize;
	                    resTem.resourceId = resTem.id = obj.id;
	                    resTem.viewURL = obj.viewURL;
	                    resTem.ossFileName = obj.fileName.substring(0,obj.fileName.lastIndexOf('.'));
	                    $scope.insertData.push(resTem);
	                })
	        },function(error){
				console.log(error);
	        })
		}else{
			myResourceService.getResources($scope.resParams,function(res){
	            if(res.code==200){
		        	if(res.data.count<11){
						$scope.variablePacket.jiazaiRes = false;
					}
		    		if(res.data.list.length<10){
		            	$scope.variablePacket.jiazaiRes = false;
		            }else{
		            	$scope.variablePacket.jiazaiRes = true;
		            }
	                $scope.addResCount = res.data.count;
	                angular.forEach(res.data.list,function(obj,index){
	                    var resTem = {};
	                    resTem.sign = $scope.addResMap[obj.id] == undefined?false:true;
	                    resTem.ResourceNum = index;
	                    resTem.resourceName = resTem.ResourceTit = obj.title;
	                    resTem.resourceType = obj.objId;
	                    resTem.ResourceSrc = obj.objId;
	                    resTem.name = obj.createUser;
	                    resTem.time = obj.createDate;
	                    resTem.size = obj.fileSize;
	                    resTem.resourceId = resTem.id = obj.id;
	                    resTem.viewURL = obj.viewURL;
	                    resTem.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
	                    $scope.insertData.push(resTem);
	                })
	            }
	        },function(error){
	
	        })
		}
	}
	//页面--资源库列条上的删除
	$scope.delResLine = function(index, num, tit) {
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			$scope.resource.splice(index, 1);
			$scope.wranShow('已删除', true, tit);
			angular.forEach($scope.insertData, function(e, i) {
				if(e.ResourceNum == num) {
					e.sign = false;
				}
			})
			if($scope.resource.length == 0 && $scope.Testpaper.length == 0) {
				$scope.variablePacket.AddResources_show = false;
			}
			if($scope.resource.length == 0 && $scope.Testpaper.length > 0) {
				$scope.variablePacket.ResourcesTypeShow_line = false;
				$scope.variablePacket.ResourcesTypeShow_pic = false;
				$scope.variablePacket.testpaperBox_pic = true;
				$scope.variablePacket.TestIndex = 0;
			}
			if($scope.variablePacket.ResLineIndex == index && $scope.resource.length > 0) {
				//根据filename查询播放展示路径
				var ossId = $scope.resource[0].ossFileName;
				if($scope.resource[0].ossFileName.indexOf("_360")>0){
					ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
				}
				$http.get(ossIp + 'filelog/'+ossId).success(function (data){
					if($scope.resource[0].resourceType==2){
						$("#pdfPlay").hide();
						$("#tupian").hide();
						$("#showplayer").show();
						$scope.variablePacket.ResLineType = "music";
//						$scope.variablePacket.audioPath = data.data.previewUrl;
						var fls = flashChecker();
						if(fls.f==0) {
							//显示flash提醒
							$("#flashTest").show();
						} else {
							$("#flashTest").hide();
							console.log(data.data.pathmp3PC)
							console.log(data.data.pathmp3PAD)
							audioSTOP = jwplayer('showplayer').setup({
								flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
								//file: vpath,
								height: 398,
								width: "100%",
								autostart: true,
								playlist: [{
									sources: [{
										file: data.data.pathmp3PC
									}, {
										file: data.data.pathmp3PAD
									}]
								}],
								androidhls: "true"
							});
							audioSTOP.onComplete(function(){
								$(".jw-display-icon-container").css({"pointer-events":"none"});
							})
						}
					}else if($scope.resource[0].resourceType==1 || $scope.resource[0].resourceType==8 || $scope.resource[0].resourceType==9){
						$("#pdfPlay").hide();
						$("#tupian").hide();
						$("#showplayer").show();
						$scope.variablePacket.ResLineType = "video";
						$scope.variablePacket.videoPath = data.data.previewUrl;
						if(fls.f==0) {
							//显示flash提醒
							$("#flashTest").show();
						} else {
							$("#flashTest").hide();
							console.log(data.data.pathmp4PC)
							console.log(data.data.pathmp4PAD)
							playerSTOP = jwplayer('showplayer').setup({
								flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
								//file: vpath,
								height: 398,
								width: "100%",
								autostart: true,
								playlist: [{
									sources: [{
										file: data.data.pathmp4PC
									}, {
										file: data.data.pathmp4PAD
									}]
								}],
								androidhls: "true"
							});
							playerSTOP.onComplete(function(){
								$(".jw-display-icon-container").css({"pointer-events":"none"});
							})
						}
					}else if($scope.resource[0].resourceType==3){
						$("#pdfPlay").hide();
						$("#showplayer").hide();
						$("#tupian").show();
						$scope.variablePacket.ResLineType = "pic";
						$scope.variablePacket.imagePath = data.data.previewUrl;
//						$scope.scrollbar();
						$("#flashTest").hide();
					}else{
						$("#showplayer").hide();
						$("#tupian").hide();
						$("#pdfPlay").show();
						$scope.variablePacket.ResLineType = "pdf";
						$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
						console.log("common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF);
						console.log($scope.variablePacket.pdfPath);
						$("#flashTest").hide();
					}
				})
				
				$scope.variablePacket.ResLineIndex = 0;
				$scope.variablePacket.ResLineTab = 0;
			}
		}

	}

	//页面--资源库资源列条的切换
//	$scope.ResLineTab = function(index, typeSrc) {
//		$scope.variablePacket.ResLineIndex = index;
//		$scope.variablePacket.ResLineTab = index;
//		$scope.variablePacket.TestIndex = -1;
//		$scope.variablePacket.testpaperBox_pic = false; 
//		$scope.variablePacket.ResourcesTypeShow_pic = true;
//		if(typeSrc == 4) {
//			$scope.variablePacket.ResLineType = "music";
//		} else if(typeSrc == 5) {
//			$scope.variablePacket.ResLineType = "video";
//		} else {
//			$scope.variablePacket.ResLineType = "pic";
//		}
//	}

	$scope.ResLineTab = function(index,typeSrc,ossFileName){
		$scope.variablePacket.ResourcesTypeShow_line = true;//资源显示
		$scope.variablePacket.TestIndex = -1;
		$scope.variablePacket.testpaperBox_pic = false; 
		$scope.variablePacket.ResourcesTypeShow_pic = true;
		$scope.variablePacket.ResLineIndex = index;
		$scope.variablePacket.ResLineTab = index;
		//根据filename查询播放展示路径
		var ossId = ossFileName;
		if(ossFileName.indexOf("_360")>0){
			ossId = ossFileName.substring(0,ossFileName.indexOf("_"));
		}
		$http.get(ossIp + 'filelog/'+ossId).success(function (data){
			if(data.code == 200){
				$scope.variablePacket.resourceDetail=data.data;
				$scope.variablePacket.convertState = data.data.state;
				console.log("转码状态："+$scope.variablePacket.convertState);
				console.log("文件类型："+typeSrc);
				if(typeSrc==2){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$("#showplayer").show();
					$scope.variablePacket.ResLineType = "music";
//					$scope.variablePacket.audioPath = $scope.variablePacket.resourceDetail.previewUrl;
					var fls = flashChecker();
					console.log("flash提醒："+fls.f)
					if(fls.f==0) {
						//显示flash提醒
						$("#flashTest").show();
					} else {
						$("#flashTest").hide();
						console.log(data.data.pathmp3PC)
						console.log(data.data.pathmp3PAD)
						audioSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							//file: vpath,
							height: 398,
							width: "100%",
							autostart: true,
							playlist: [{
								sources: [{
									file: data.data.pathmp3PC
								}, {
									file: data.data.pathmp3PAD
								}]
							}],
							androidhls: "true"
						});
						audioSTOP.onComplete(function(){
							$(".jw-display-icon-container").css({"pointer-events":"none"});
						})
					}
				}else if(typeSrc==1 || typeSrc==8 || typeSrc==9){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$("#showplayer").show();
					var fls = flashChecker();
					console.log("视频播放")
					$scope.variablePacket.ResLineType = "video";
					$scope.variablePacket.videoPath = $scope.variablePacket.resourceDetail.previewUrl;
					if(fls.f==0) {
						//显示flash提醒
						$("#flashTest").show();
					} else {
						$("#flashTest").hide();
						console.log(data.data.pathmp4PC)
						console.log(data.data.pathmp4PAD)
						playerSTOP = jwplayer('showplayer').setup({
							flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
							//file: vpath,
							height: 398,
							width: "100%",
							autostart: true,
							playlist: [{
								sources: [{
									file: data.data.pathmp4PC
								}, {
									file: data.data.pathmp4PAD
								}]
							}],
							androidhls: "true"
						});
						playerSTOP.onComplete(function(){
							$(".jw-display-icon-container").css({"pointer-events":"none"});
						})
					}
				}else if(typeSrc==3){
					$("#pdfPlay").hide();
					$("#showplayer").hide();
					$("#tupian").show();
					$scope.variablePacket.ResLineType = "pic";
					$scope.variablePacket.imagePath = $scope.variablePacket.resourceDetail.previewUrl;
					$scope.renderFinish();
					$("#flashTest").hide();
				}else{
					$("#tupian").hide();
					$("#showplayer").hide();
					$("#pdfPlay").show();
					$scope.variablePacket.ResLineType = "pdf";
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF;
					console.log("common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF);
					console.log($scope.variablePacket.pdfPath);
					$("#flashTest").hide();
				}
			}
	    })
	}

	//章节目录的回显验证
	$scope.Chapter = function() {
		$timeout(function() {
			$scope.$apply(function() {
				$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
				$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
				$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
			})
			if(($scope.variablePacket.Chapter[0].Onetit != "学科") || ($scope.variablePacket.Chapter[0].Twotit != "课本") || ($scope.variablePacket.Chapter[0].Threetit != "章节")) {
				$scope.variablePacket.ProvingChapter = false;
			}
		});
	}

	//添加试卷
	$scope.addTestPaper = function() {
		$scope.variablePacket.insertChoiceAll = true;
		$scope.variablePacket.insertChoice = "testpaper";
		$scope.variablePacket.maskHeader=true;
		$scope.variablePacket.insertChoice_threeType=0;
		//获取试卷
		$scope.variablePacket.pageNo=1;
		$scope.insertTest = [];
		$scope.getAddAssemblyList();
		adaptionHeight();
		//添加试卷--加减号
		$scope.TestPaper_Sign = function(index,id) {
			$scope.variablePacket.Plotting = false;
			$scope.insertTest[index].sign = !$scope.insertTest[index].sign;
			$scope.variablePacket.ProvingContent = false;
			//点击加号的事件
			if($scope.insertTest[index].sign) {
				$scope.insertTest[index].sign = true;
				$scope.variablePacket.AddResources_show = true; //资源整个大盒子
				$scope.variablePacket.testpaperBox_pic = true; //卷库左边是否显示
				$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
				$scope.variablePacket.ResourcesTypeShow_pic = false; //资源左边是否显示
				$scope.variablePacket.ResLineIndex = -1; //清空资源列条的选中
				$scope.variablePacket.TestIndex = 0; //默认卷子列条第一个选中
				
				var TestObj = angular.copy($scope.insertTest[index]);
				$scope.Testpaper.unshift(TestObj);
				if($scope.resource.length==0){
					$scope.variablePacket.ResourcesTypeShow_line = false; //资源右边是否显示
				}else{
					$scope.variablePacket.ResourcesTypeShow_line = true; //资源右边是否显示
				}
				//查询试卷详情
				$scope.getAssemblyInfo(id);
			} else {
				//点击减号的相关事件
				angular.forEach($scope.Testpaper, function(e, i) {
					if(e.id == id) {
						$scope.Testpaper.splice(i, 1);
						if($scope.variablePacket.TestIndex == i && $scope.Testpaper.length > 0) {
							$scope.variablePacket.TestIndex = 0;
						}
					}
					if($scope.resource.length == 0 && $scope.Testpaper.length == 0) {
						$scope.variablePacket.AddResources_show = false;
					}
					if($scope.Testpaper.length == 0) {
						$scope.variablePacket.ResourcesTypeShow_line = true;
						$scope.variablePacket.ResourcesTypeShow_pic = true;
						$scope.variablePacket.testpaperBox_pic = false;
						$scope.variablePacket.ResLineIndex = 0;
					}
				});
			}
		}
	}

	//获取试卷列表
	$scope.getAddAssemblyList = function(){
		console.log($scope.variablePacket.insertChoice_threeType);
		var ser = "exam?type=01&current="+$scope.variablePacket.pageNo+"&size="+$scope.variablePacket.pageSize;
		if($scope.variablePacket.insertChoice_threeType==0){
			ser += "&subjIds="+$scope.resParams.subjectID+"&createBy="+$scope.variablePacket.loginUserId
		}else if($scope.variablePacket.insertChoice_threeType==1){
			ser += "&state=1&module=1&areaCodes="+$scope.variablePacket.officeId;
		}
		$http.get(questionUrl+ser).success(function(data){
			$scope.variablePacket.jiazaiAssembly = false;
			if(data.code==200&&data.data.records.length>0){
				if(data.data.total>$scope.variablePacket.pageNo*$scope.variablePacket.pageSize){
					$scope.variablePacket.jiazaiAssembly = true;
				}
				angular.forEach(data.data.records,function(e,i){
					console.log(e)
					var rsues = {};
					rsues.type = "0";//"题库组卷";
					rsues.ResourceTit = e.name;
					for(var n=0; n<$scope.Testpaper.length; n++){
						if($scope.Testpaper[n].id==e.id){
							rsues.sign= true;
							break;
						}else{
							rsues.sign= false;
						}
					}
					rsues.name = e.createUser;
					rsues.id = e.id;
					rsues.time = e.createDate.substring(0,10);
					rsues.size = '1049.02k';
					rsues.source =  e.module;
					$scope.insertTest.push(rsues);
				})
			}	
		})
	}
	//试卷加载更多
	$scope.jiazaiAssembly = function(){
		$scope.variablePacket.pageNo = $scope.variablePacket.pageNo+1;
		$scope.getAddAssemblyList();
	}
	
	//查询试卷详情
	$scope.getAssemblyInfo = function(id){
		$http.get(questionUrl+"exam/"+id).success(function(result){
			if(result.code==200){
				var data = result.data;
				var questionList = data.questionList;
				$scope.variablePacket.assemblyName = data.name;
				var singleArray = [];
				var judgeArray = [];
				var briefAnswerArray = [];
				var valueObject = {};
				for(var i=0; i<questionList.length; i++){
					valueObject = {};
					var question = questionList[i];
					//资源
					var resourceJson = question.resourceJson;
					var resourceFlag = false;
					var resourceArray = [];
					var resourceObject = {};
					if(resourceJson!=""&&resourceJson!="[]"){
						resourceFlag = true;
						var resourceList =  JSON.parse(resourceJson);//转换为json对象
						for(var j=0;j<resourceList.length;j++){
							resourceObject = {};
							var resource = resourceList[j];
							resourceObject.ResourceTit = resource.name;
							resourceObject.ResourceRid = resource.rid;
							resourceObject.ResourceSrc = resource.type;
							resourceArray.push(resourceObject);
						}
					}
					valueObject.Id = i;
					valueObject.id = question.quzid;
					valueObject.CanResource = resourceFlag ;//是否显示资源
					valueObject.Resource = resourceArray; //插入带过来的资源数据
					valueObject.AnswerShow = false; //默认答案不显示
					valueObject.queTit = question.body; //题干
					valueObject.Answer = checkAnswer(question.answer, question.type); //答案
					valueObject.Analysis = question.analysis;//解析
					valueObject.sort = question.sort;//排序
					if(question.type=="2"){
						valueObject.Type = "single"; //题型
						singleArray.push(valueObject);
						$scope.variablePacket.eightSwitchOut[0].show = true;
					}else if(question.type=="1"){
						valueObject.Type = "judge"; //题型
						judgeArray.push(valueObject);
						$scope.variablePacket.eightSwitchOut[1].show = true;
					}else if(question.type=="6"){
						valueObject.Type = "briefAnswer"; //题型
						briefAnswerArray.push(valueObject);
						$scope.variablePacket.eightSwitchOut[2].show = true;
					}
				}
				$scope.questionBank.Out.single = singleArray;
				$scope.questionBank.Out.judge = judgeArray;
				$scope.questionBank.Out.briefAnswer = briefAnswerArray;
			}
		});
	}
	
	//校验答案格式
	function checkAnswer(answer, type){
		switch (type) {
            case "2":
            case "6":
            	return answer;
           		break;
       		case "1":
       			if(answer=="T"){
       				return "正确"
       			}else if(answer=="F"){
       				return "错误";
       			}else{
       				return "";
       			}
       			return answer;
       			break;
            default:
            	break;
        }
	}
	
	//卷库列条的切换
	$scope.TestTab = function(i, id) {
		console.log(id)
		$scope.variablePacket.TestIndex = i;
		$scope.variablePacket.ResLineIndex = -1;
		$scope.variablePacket.testpaperBox_pic = true; 
		$scope.variablePacket.ResourcesTypeShow_pic = false;
		//查询试卷详情
		$scope.getAssemblyInfo(id);
	}
	
	//卷库列条上的删除
	$scope.delTestpaper = function(index, num, tit) {
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			$scope.variablePacket.TestIndex = 0;
			$scope.Testpaper.splice(index, 1);
			$scope.wranShow('已删除', true, tit);
			/*angular.forEach($scope.insertTest, function(e, i) {
				if(e.num == num) {
					e.sign = false;
				}
			})*/
			if($scope.resource.length == 0 && $scope.Testpaper.length == 0) {
				$scope.variablePacket.AddResources_show = false;
			}
			if($scope.Testpaper.length == 0 && $scope.resource.length > 0 ) {
				$scope.variablePacket.testpaperBox_line = false;
				$scope.variablePacket.testpaperBox_pic = false;
				$scope.variablePacket.ResourcesTypeShow_pic = true;
				$scope.variablePacket.ResLineIndex = 0;
			}
		}

	}
	
	//循环完成后
	$scope.renderFinish = function() {
		//滚动条调用
		angular.element(".zyx_ResourcesTypeShow").mCustomScrollbar({
			mouseWheelPixels: 1000, //滚动速度
			theme: "3d-dark" //滚动条样式
		});
	}
	/************************************   以下是模拟的假数据  ****************************************/

	//资源弹层数据
	$scope.insertData = [{
		sign: false, //加减号
		ResourceNum: 0, //记录点击的第几个
		ResourceTit: '00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
		ResourceSrc: 0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
		name: '刘敏', //名字
		time: '2017-08-20', //时间
		size: '1049.02k', //内存大小
		TypeSrc: [{
				'Src': 'resources_middle.jpg'
			},
			{
				'Src': 'newsImg.jpg'
			},
			{
				'Src': 'ad_1.jpg'
			},
			{
				'Src': 'banner.png'
			}
		]
	}, {
		sign: false,
		ResourceNum: 1,
		ResourceTit: '11五年级五年级五年级五年级五年级语文期末试卷.ppt',
		ResourceSrc: 1,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [{
				'Src': 'resources_middle.jpg'
			},
			{
				'Src': 'newsImg.jpg'
			},
			{
				'Src': 'resources_main.jpg'
			},
			{
				'Src': 'banner.png'
			}
		]
	}, {
		sign: false,
		ResourceNum: 2,
		ResourceTit: '22五年级五年级五年级五年级五年级语文期末试卷.ppt',
		ResourceSrc: 2,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [{
			'Src': 'newsImg.jpg'
		}]
	}, {
		sign: false,
		ResourceNum: 3,
		ResourceTit: '33五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 3,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k',
		TypeSrc: [{
			'Src': 'banner.png'
		}]
	}, {
		sign: false,
		ResourceNum: 4,
		ResourceTit: '44五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 4,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k'
	}, {
		sign: false,
		ResourceNum: 5,
		ResourceTit: '55五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 5,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k'
	}, {
		sign: false,
		ResourceNum: 6,
		ResourceTit: '66五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 4,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k'
	}, {
		sign: false,
		ResourceNum: 7,
		ResourceTit: '77五五年级五年级五年级五年级年级语文期末试卷.ppt',
		ResourceSrc: 5,
		name: '刘敏',
		time: '2017-08-20',
		size: '1049.02k'
	}]

	//卷库弹层的数据
	$scope.insertTest = [
//		{
//			sign: false, //加减号
//			ResourceTit: '111五年级语文期末试卷.ppt', //标题
//			name: '刘敏', //，名字
//			time: '2017-08-20', //时间
//			size: '1049.02k', //内存大小
//			source: '上传', //来源
//			types: '课中卷', //类型
//			num:0,//记录点击的第几个
//		}, {
//			sign: false,
//			ResourceTit: '222五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '收藏',
//			types: '课中卷',
//			num:1,
//		}, {
//			sign: false,
//			ResourceTit: '333五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:2,
//		}, {
//			sign: false,
//			ResourceTit: '444五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:3,
//		}, {
//			sign: false,
//			ResourceTit: '555五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:4,
//		}, {
//			sign: false,
//			ResourceTit: '222五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:5,
//		}, {
//			sign: false,
//			ResourceTit: '444五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:6,
//		}, {
//			sign: false,
//			ResourceTit: '555五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:7,
//		}, {
//			sign: false,
//			ResourceTit: '222五年级语文期末试卷.ppt',
//			name: '刘敏',
//			time: '2017-08-20',
//			size: '1049.02k',
//			source: '上传',
//			types: '课中卷',
//			num:8,
//		}
	]

	//卷库题型的数据
	$scope.questionBank = {
		Out: {
//			//单选
//			single: [{
//					Id: 0,
//					CanResource: false, //是否显示资源
//					Resource: [{
//						ResourceTit: '',
//						ResourceSrc: 0,
//						ResourceNum: 0
//					}], //插入带过来的资源数据
//					sign: false, //从题库选择的加减号
//					Type: 'single', //题型
//					AnswerShow: false, //默认答案不显示
//					ResourceShow: false, //是否插入资源
//					queTit: '111函数g（x） = f（x） - x +3的零点的集合为', //题干
//					Answer: 'B', //答案
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B', //解析
//					Chapter: [{
//						Onetit: '学科',
//						Twotit: '课本',
//						Threetit: '章节'
//					}]
//				}, {
//					Id: 1,
//					CanResource: false,
//					Resource: [{
//						ResourceTit: '',
//						ResourceSrc: 0,
//						ResourceNum: 0
//					}],
//					sign: false,
//					Type: 'single',
//					AnswerShow: false,
//					ResourceShow: false,
//					queTit: '222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
//					Answer: 'C',
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//					Chapter: [{
//						Onetit: '学科',
//						Twotit: '课本',
//						Threetit: '章节'
//					}]
//				}, {
//					Id: 2,
//					CanResource: false,
//					Resource: [{
//						ResourceTit: '',
//						ResourceSrc: 0,
//						ResourceNum: 0
//					}],
//					ResourceSrc: 2,
//					sign: false,
//					Type: 'single',
//					AnswerShow: false,
//					ResourceShow: false,
//					queTit: '333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
//					Answer: 'C',
//					Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
//					Chapter: [{
//						Onetit: '学科',
//						Twotit: '课本',
//						Threetit: '章节'
//					}]
//				}
//
//			],
//			//判断
//			judge: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				sign: false, //从题库选择的加减号
//				Type: 'judge', //题型
//				AnswerShow: false, //默认答案不显示
//				ResourceShow: false, //是否显示插入资源
//				queTit: '111天上有2个太阳吗？', //题干
//				Answer: '错误', //答案
//				Analysis: '天上有一个太阳', //解析
//				Chapter: [{
//					Onetit: '学科',
//					Twotit: '课本',
//					Threetit: '章节'
//				}]
//			}, {
//				Id: 1,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				sign: false,
//				Type: 'judge',
//				AnswerShow: false,
//				ResourceShow: false,
//				queTit: '222你是谁？我是谁？是游戏吗？',
//				Answer: '正确',
//				Analysis: '是是是是',
//				Chapter: [{
//					Onetit: '学科',
//					Twotit: '课本',
//					Threetit: '章节'
//				}]
//			}],
//			//简答
//			briefAnswer: [{
//				Id: 0,
//				CanResource: false, //是否显示资源
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}], //插入带过来的资源数据
//				sign: false, //从题库选择的加减号
//				Type: 'briefAnswer', //题型
//				AnswerShow: false, //默认答案不显示
//				ResourceShow: false, //是否显示插入资源
//				queTit: '为什么李白特别钟情于庐山？', //题干
//				Answer: '11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。', //答案
//				Analysis: '天上有一个太阳', //解析
//				Chapter: [{
//					Onetit: '学科',
//					Twotit: '课本',
//					Threetit: '章节'
//				}]
//			}, {
//				Id: 1,
//				sign: false,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				Type: 'briefAnswer',
//				AnswerShow: false,
//				ResourceShow: false,
//				queTit: '你是谁？我是谁？是游戏吗？',
//				Answer: '22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis: '是是是是',
//				Chapter: [{
//					Onetit: '学科',
//					Twotit: '课本',
//					Threetit: '章节'
//				}]
//			}, {
//				Id: 2,
//				CanResource: false,
//				Resource: [{
//					ResourceTit: '',
//					ResourceSrc: 0,
//					ResourceNum: 0
//				}],
//				sign: false,
//				Type: 'briefAnswer',
//				AnswerShow: false,
//				ResourceShow: false,
//				queTit: '为什么李白特别钟情于庐山？',
//				Answer: '33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
//				Analysis: '是是是是',
//				Chapter: [{
//					Onetit: '学科',
//					Twotit: '课本',
//					Threetit: '章节'
//				}]
//			}]

		}
	}
	/**
	 * 看是否有flash插件\
	 * 郭峪诚
	 */
	function flashChecker() {
		var hasFlash = 0; //是否安装了flash
		var flashVersion = 0; //flash版本
	
		if(document.all) {
			var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if(swf) {
				hasFlash = 1;
				VSwf = swf.GetVariable("$version");
				flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
			}
		} else {
			if(navigator.plugins && navigator.plugins.length > 0) {
				var swf = navigator.plugins["Shockwave Flash"];
				if(swf) {
					hasFlash = 1;
					var words = swf.description.split(" ");
					for(var i = 0; i < words.length; ++i) {
						if(isNaN(parseInt(words[i]))) continue;
						flashVersion = parseInt(words[i]);
					}
				}
			}
		}
		return {
			f: hasFlash,
			v: flashVersion
		};
	}
	
}]);

//资源图标
app.filter('icon', function() {
    return function(objId) {
        var icon = "";
        switch(objId)
        {
            case '1':
                icon = "img/resources_mp4.png";
                break;
            case '2':
                icon = "img/resources_ear.png";
                break;
            case '3':
                icon = "img/resources_pic.png";
                break;
            case '4':
                icon = "img/resources_pdf.png";
                break;
            case '5':
                icon = "img/resources_ppt.png";
                break;
            case '6':
                icon = "img/resources_word.png";
                break;
            case '7':
                icon = "img/resources_excal.png";
                break;
            case '8':
                icon = "img/resources_mp4.png";
                break;
        }
        return icon;
    };
    
   
});
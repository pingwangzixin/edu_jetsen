app.controller('paperLibraryCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$http', '$location', '$anchorScroll', '$interval', 'templateServer', 'scrollbar', '$stateParams', 'myQuzService', 'myResourceService', function($rootScope, $scope, $state, $timeout, $http, $location, $anchorScroll, $interval, templateServer, scrollbar, $stateParams, myQuzService, myResourceService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	
	var userId = JSON.parse(sessionStorage.getItem('managerSearch')).id;
	//变量包
	$scope.variablePacket = {
		eightSwitchOut: [ //页面上展示的8种题型
			//			{"name":"单选题",Type:'single',show:false},     
			//			{"name":"多选题",Type:'many',show:false},
			//			{"name":"判断题",Type:'judge',show:false},
			//			{"name":"填空题",Type:'fillIn',show:false},
			//			{"name":"材料题",Type:'material',show:false},
			//			{"name":"简答题",Type:'briefAnswer',show:false},
			//			{"name":"完形填空",Type:'clozeCloze',show:false},
			//			{"name":"阅读理解",Type:'reading',show:false}
		],
		threeSwitch: [],
		resThreeSwitch: [{
				"name": "我的资源",
				id: ''
			},
			{
				"name": "校本资源",
				id: '1'
			},
			{
				"name": "公共资源",
				id: '2'
			}
		],
		quzThreeSwitch: [{
				"name": "我的题库",
				id: 0
			},
			{
				"name": "校本题库",
				id: 1
			},
			{
				"name": "公共题库",
				id: 2
			}
		],
		SelectType: [{
				"name": "全部"
			},
			{
				"name": "文档"
			},
			{
				"name": "视频"
			},
			{
				"name": "音频"
			},
			{
				"name": "图片"
			},
			{
				"name": "PPT"
			}
		],
		arrSubject: [{
			name: '英语',
			id: '1'
		}, {
			name: '数学',
			id: '2'
		}, {
			name: '逻辑',
			id: '3'
		}],
		
		state: $stateParams.state, // 题库组卷：test 	修改题库：revise
		delShow: true, //插入资源弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex: false, //弹层层级提高一级；
		titFixed: false, //吸顶样式
		maskHeader: true, //弹层表头--true:从题库选择;false:插入资源
		insertChoiceAll: false, //总弹出开关
		insertChoice: false, //弹层主内容--true:从题库选择;false:插入资源
		insertChoice_threeType: 0, //弹层--（我的题库，公共题库，校本题库的默认选择状态）
		insertChoice_eightType: 0, //弹层--8种题型的默认状态
		insertChoice_selectType: 0, //弹层--插入的类型默认状态
		insertResource: false, //插入资源回显弹出开关
		clickResourceName:'',
		Chapter: [{
			Onetit: '课本',
			Twotit: '章',
			Threetit: '节'
		}], //章节默认
		ProvingChapter: false, //章节目录验证
		UsernameOff: false, //导学名称验证开关
		ProvingUsername: false, //导学名称验证
		UsernameMessage: '', //导学名称的文字
		SubjectOff: false, //学科验证开关
		ProvingSubject: false, //学科验证
		ProvingQuestion: false, //学科验证
		
		ProvingContent:false,//试卷内容验证
		AddQuestion_show:false,//页面--题库题型是否显示
		
		type: "2",
		pageNo: 1,
		pageSize: 5,
		subjIds: '',
		quzNum: 0,
		leftTreeShow: { //左侧树展示
			teachingMaterial: false, //版本选择框
			treeOne: true, //版本选择框下的树
			treeKnowledgePoint: false, //知识点树
			other: false, //其他
		},
		subjectTreeShow: {
			teachingMaterial: true, //版本选择框
			treeOne: false, //版本选择框下的树
			treeKnowledgePoint: false, //知识点树
			other: false,
		},
		queTypeMap: {},
		queSelMap: {},
		queTypeDefault: '',
		resSelque: {},
		insertDialogType: 'question',
		quzTotalPage:1,
		resTotalPage:1,
		examId : $stateParams.testId,
		subMapTem:{},
		libraryTitleBar:['课本','章','节']	,
		showplayer : true //浏览器flash提示
	}
	$scope.questionBank = {
		In: {
			//单选
			single: [],
			//多选
			many: [],
			//判断
			judge: [],
			//填空
			fillIn: [],
			//材料
			material: [],
			//简答
			briefAnswer: [],
			//完形填空
			clozeCloze: [],
			//阅读理解
			reading: []
		},
		//从题库添加后的展示8种题型的数据
		Out: {
			single: [],
			many: [],
			judge: [],
			fillIn: [],
			material: [],
			briefAnswer: [],
			clozeCloze: [],
			reading: []
		}
	}
	
	$rootScope.treetype = "0";
	
	$scope.changeSub = function(item){
		$scope.selectedSubject = item;
	}

	/**
	 * 查询试题参数
	 */
	$scope.quzParams = {
		pageSize: $scope.variablePacket.pageSize,
		pageNo: $scope.variablePacket.pageNo,
		createBy:userId,
		areaCodes:'',
		type: '',
		subjIds: '',
		state: ''
	}

	//赋值弹层的自适应高度
	function adaptionHeight() {
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight').height(bigHeight - 270);
			angular.element('.mlh_cont').height(bigHeight - 80);
			console.log(bigHeight)
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
			angular.element(".mlh_cont").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "3d-dark" //滚动条样式
			});
		});
	}
	//导学名称
	$scope.zyx_username = function() {
		if(typeof($scope.variablePacket.UsernameMessage) != "undefined") {
			$scope.variablePacket.ProvingUsername = false;
			$scope.variablePacket.UsernameOff = true;
		} else {
			$scope.variablePacket.ProvingUsername = true;
		}
	}
	//学科验证
	$scope.Subject = function() {
		if($scope.selectedSubject != undefined) {
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject == undefined) {
			console.log($scope.selectedSubject)
			$scope.variablePacket.ProvingSubject = true;
		}
	}
	
	 //点击章节目录时先验证学科
	$scope.verifySubject=function(){
		 if($scope.selectedSubject==null){
		 	$scope.variablePacket.ProvingSubject = true;
		 }else{
		 	$scope.variablePacket.ProvingSubject = false;
		 };
		 if(angular.element('.titleSpan').find('em')[2].innerHTML=="节"){
		 	  $scope.variablePacket.ProvingChapter=true;
		 }else{
		 	  $scope.variablePacket.ProvingChapter=false;
		 };
	};

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
	
	/**
	 * 上传试卷按钮
	 */
	$scope.uploadExam = function(){
		if($stateParams.state == 'revise'){
			$scope.VerificationUpdate();
		}else{
			$scope.Verification();
		}
		
	}

	/**
	 * 新增上传
	 */
	$scope.Verification = function() {
		if((!$scope.variablePacket.ProvingSubject) && ($scope.params.subjIds != "") && (!$scope.variablePacket.ProvingUsername) && ($scope.variablePacket.AddResources_show)) {
			var queArr = [];
			for(var key in $scope.questionBank.Out) {
				var queItem = $scope.questionBank.Out[key];
				if(queItem.length > 0) {
					for(var i = 0; i < queItem.length; i++) {
						var queObj = {};
						queObj.questionId = queItem[i].Id;
						queObj.subjNames = queItem[i].subjNames;
						if(queItem[i].ResourceShow) {
							var resArr = [];
							for(var r = 0; r < queItem[i].Resource.length; r++) {
								var resObj = queItem[i].Resource[r];
								resArr.push({
									rid: resObj.ResourceId,
									name: resObj.ResourceTit,
									type: resObj.ResourceType,
									ossFileName:resObj.ossFileName
								});

							}
							queObj.resourceJson = JSON.stringify(resArr);
						}
						queArr.push(queObj);
					}
				}

			}

			if(queArr.length == 0) {
				$scope.variablePacket.ProvingQuestion = true;
				return;
			}

			$scope.variablePacket.ProvingQuestion = false;

			$scope.params.questionJson = JSON.stringify(queArr);
			$scope.params.name = $scope.variablePacket.UsernameMessage;
			
			//插入试卷
			myQuzService.insertExam($scope.params,function(resJson){
				if(resJson.code == 200) {
					$scope.wranShow('添加成功', true);
					$timeout(function (){
						$state.go('secondNav.questionBankType');
					},1500);
				}
			},function(){
				
			})
		} else {
			if(($scope.variablePacket.Chapter[0].Onetit == "课本") || ($scope.variablePacket.Chapter[0].Twotit == "章") || ($scope.variablePacket.Chapter[0].Threetit == "节")) {
				$scope.variablePacket.ProvingChapter = true;
			}
			if(!$scope.variablePacket.ProvingUsername && !$scope.variablePacket.UsernameOff) {
				$scope.variablePacket.ProvingUsername = true;
			}
			if(!$scope.variablePacket.ProvingSubject && !$scope.variablePacket.SubjectOff) {
				$scope.variablePacket.ProvingSubject = true;
			}
			if(!$scope.variablePacket.AddQuestion_show){
				$scope.variablePacket.ProvingContent = true;
			}
		}
	}
	
	
	/**
	 * 修改上传
	 */
	$scope.VerificationUpdate = function() {
		if((!$scope.variablePacket.ProvingSubject) && ($scope.params.subjIds != "") && (!$scope.variablePacket.ProvingUsername)) {
			var queArr = [];
			for(var key in $scope.questionBank.Out) {
				var queItem = $scope.questionBank.Out[key];
				if(queItem.length > 0) {
					for(var i = 0; i < queItem.length; i++) {
						var queObj = {};
						queObj.questionId = queItem[i].Id;
						queObj.answer = queItem[i].Answer;
						queObj.type = queItem[i].typeId;
						queObj.optionNum = queItem[i].optionNum;
						queObj.analysis = queItem[i].Analysis;
						queObj.body = queItem[i].queTit;
						queObj.subjNames = queItem[i].subjNames;
						if(queItem[i].ResourceShow) {
							var resArr = [];
							for(var r = 0; r < queItem[i].Resource.length; r++) {
								var resObj = queItem[i].Resource[r];
								resArr.push({
									rid: resObj.ResourceId,
									name: resObj.ResourceTit,
									type: resObj.ResourceType,
									ossFileName:resObj.ossFileName
								});

							}
							queObj.resourceJson = JSON.stringify(resArr);
						}
						queArr.push(queObj);
					}
				}

			}

			if(queArr.length == 0) {
				$scope.variablePacket.ProvingQuestion = true;
				return;
			}

			$scope.variablePacket.ProvingQuestion = false;

			$scope.params.questionJson = JSON.stringify(queArr);
			$scope.params.name = $scope.variablePacket.UsernameMessage;
			$scope.params.id = $scope.variablePacket.examId;
			
			myQuzService.updateExam($scope.params,function(resJson){
				if(resJson.code == 200) {
					$scope.wranShow('修改成功', true);
					$timeout(function (){
						$state.go('secondNav.questionBankType');
					},1500);
				}
			},function(){
				
			})
		} else {
			if(($scope.variablePacket.Chapter[0].Onetit == "课本") || ($scope.variablePacket.Chapter[0].Twotit == "章") || ($scope.variablePacket.Chapter[0].Threetit == "节")) {
				$scope.variablePacket.ProvingChapter = true;
			}
			if(!$scope.variablePacket.ProvingUsername && !$scope.variablePacket.UsernameOff) {
				$scope.variablePacket.ProvingUsername = true;
			}
			if(!$scope.variablePacket.ProvingSubject && !$scope.variablePacket.SubjectOff) {
				$scope.variablePacket.ProvingSubject = true;
			}
		}
	}

	//页面--题目的删除
	$scope.Del = function(type, index, id, number) {
		$scope.promptShow('确认删除？', false, '' + $scope.variablePacket.eightSwitchOut[number].name + (index + 1) + '');
		$scope.delOk = function() {

			$scope.variablePacket.prompt = false;
			$scope.questionBank.Out[type].splice(index, 1);
			// $scope.variablePacket.eightSwitchOut[number].name + (index + 1) 
			$scope.wranShow('已删除', false, '');
			if($scope.questionBank.Out[type].length == 0) {
				$scope.variablePacket.eightSwitchOut[number].show = false;
			}
			//取消添加
			$scope.variablePacket.queSelMap[id] = false;
			//			$scope.questionBank.In[type][id].sign = false;
		}
	}

	//页面--资源列条上的删除
	$scope.delResource = function(item, index) {
		var resItem = item.Resource[0];
		var tit = resItem.ResourceTit;
		var type = item.Type;
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.prompt = false;
			$scope.questionBank.Out[type][index].CanResource = false;
			$scope.questionBank.Out[type][index].ResourceShow = false;
//			$scope.questionBank.In[type][index].CanResource = false;
			$scope.wranShow('已删除', true, tit);
		}
		if($scope.variablePacket.insertChoiceAll) {
			$scope.variablePacket.maskZindex = true;
		} else {
			$scope.variablePacket.maskZindex = false;
		}
	}

	//页面--题目的上移
	$scope.MoveUp = function(type, index) {
		var TopObj = angular.copy($scope.questionBank.Out[type][index - 1]);
		$scope.questionBank.Out[type][index - 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = TopObj;
	}

	//页面--题目的下移
	$scope.MoveDown = function(type, index) {
		var BootomObj = angular.copy($scope.questionBank.Out[type][index + 1]);
		$scope.questionBank.Out[type][index + 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = BootomObj;
	}

	//页面---题目的修改
	$scope.Modify = function(type, index) {
		$scope.questionBank.Out[type][index].CanEdit = !$scope.questionBank.Out[type][index].CanEdit;
		$scope.questionBank.Out[type][index].oldData = angular.copy($scope.questionBank.Out[type][index],$scope.questionBank.Out[type][index].oldData);
	}

	//页面--题目的插入资源
	$scope.Charu = function(type, i) {
		$scope.variablePacket.insertDialogType = 'resource';
		$scope.variablePacket.threeSwitch = $scope.variablePacket.resThreeSwitch;
		$scope.variablePacket.insertChoiceAll = true; //总弹出
		$scope.variablePacket.insertChoice = false; //控制是插入资源还是从题库添加
		$scope.variablePacket.maskHeader = false; //页面的8种题型
		$scope.variablePacket.resSelque = $scope.questionBank.Out[type][i];
		$scope.insertChoice_ThreeSwitch(0, '');
		adaptionHeight();
		//插入资源弹层里的加减号
		$scope.insert_Sign = function(index, id) {
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
			if($scope.insertData[index].sign) {
				$scope.questionBank.Out[type][i].CanResource = true;
				$scope.questionBank.Out[type][i].AnswerShow = true;
				$scope.questionBank.Out[type][i].ResourceShow = true;
				$scope.questionBank.Out[type][i].Resource[0].ResourceTit = $scope.insertData[index].ResourceTit;
				$scope.questionBank.Out[type][i].Resource[0].ResourceSrc = $scope.insertData[index].ResourceSrc;
				$scope.questionBank.Out[type][i].Resource[0].ResourceType = $scope.insertData[index].ResourceType;
				$scope.questionBank.Out[type][i].Resource[0].ResourceNum = $scope.insertData[index].ResourceNum;
				$scope.questionBank.Out[type][i].Resource[0].ResourceId = $scope.insertData[index].id;
				$scope.questionBank.Out[type][i].Resource[0].ossFileName = $scope.insertData[index].ossFileName;
//				$scope.questionBank.In[type][i].CanResource = true;
				$scope.questionBank.In[type][i].Resource[0].ResourceTit = $scope.insertData[index].ResourceTit;
				$scope.questionBank.In[type][i].Resource[0].ResourceSrc = $scope.insertData[index].ResourceSrc;
				angular.forEach($scope.insertData, function(e, i) {
					$scope.insertData[i].sign = false;
				});
				$scope.insertData[index].sign = true;
			} else {
				$scope.questionBank.Out[type][i].CanResource = false;
				$scope.questionBank.Out[type][i].AnswerShow = false;
				$scope.questionBank.Out[type][i].ResourceShow = false;
//				$scope.questionBank.In[type][i].CanResource = false;
			}
		}
		//		if($scope.questionBank.Out[type][i].CanResource) {
		//			angular.forEach($scope.insertData, function(e, i) {
		//				$scope.insertData[i].sign = false;
		//			});
		//			$scope.insertData[$scope.questionBank.Out[type][i].Resource[0].ResourceNum].sign = true;
		//		} else {
		//			angular.forEach($scope.insertData, function(e, i) {
		//				$scope.insertData[i].sign = false;
		//			});
		//
		//		}

	}

	//页面/弹层--查看答案及解析、
	$scope.lookAnswer = function(type, index, answer) {
		if($scope.variablePacket.insertChoiceAll) {
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		} else {
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}

	//弹层--我的题库，公共题库，校本题库切换
	$scope.insertChoice_ThreeSwitch = function(index, id) {
		$scope.variablePacket.insertChoice_threeType = index;
		$rootScope.treetype = index+"";
		if(index=="0"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		}
		if(index=="1"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
        if(index=="2"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
		if($scope.variablePacket.insertDialogType == 'question') {
			$scope.questionBankTab(index);
		} else {
			$scope.resBankTab(index, id);
		}

	}

	/**
	 * 资源库标签切换
	 * @param {Object} index
	 * @param {Object} id
	 */
	$scope.resBankTab = function(index, id) {
		for(i in $scope.resParams) {
			$scope.resParams[i] = '';
		}
		if(index == 0) {
			$scope.variablePacket.delShow = true;
			delete $scope.resParams.createBy;
			delete $scope.resParams.areaCodes;
			delete $scope.resParams.state ;
			$scope.resParams.userId = userId;
		} else if(index == 1) {
			$scope.variablePacket.delShow = false;
			delete $scope.resParams.userId;
			$scope.resParams.areaCodes = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
			$scope.resParams.state = '1';
		} else {
			$scope.variablePacket.delShow = false;
			delete $scope.resParams.userId;
			delete $scope.resParams.areaCodes;
			$scope.resParams.state = '2';
			
		}
		$scope.resParams.title = '';
		$scope.resParams.pageNo = $scope.variablePacket.pageNo;
		$scope.resParams.pageSize = $scope.variablePacket.pageSize;
		$scope.insertChoice_selectTypeTab(0, '');
	}

	/**
	 * 题库标签切换
	 * @param {Object} index
	 */
	$scope.questionBankTab = function(index) {
		$scope.quzParams.type = $scope.variablePacket.queTypeDefault;
		$scope.variablePacket.insertChoice_eightType = 0;
		$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
		$scope.quzParams.pageSize = $scope.variablePacket.pageSize;
		$scope.getType($scope.quzParams.type);
		if(index == 0) {
			$scope.variablePacket.delShow = true;
			$scope.quzParams.areaCodes = "";
			$scope.quzParams.state = '';
			$scope.quzParams.createBy = userId;
		} else if(index == 1) {
			$scope.variablePacket.delShow = false;
			$scope.quzParams.areaCodes = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
			$scope.quzParams.state = '1';
			$scope.quzParams.createBy = '';
		} else {
			$scope.variablePacket.delShow = false;
			$scope.quzParams.areaCodes = "";
			$scope.quzParams.state = '2';
			$scope.quzParams.createBy = '';
		}
		$scope.findQuzAll();
	}

	//弹层----8种题型的切换
	$scope.insertChoice_eightSwitchTab = function(index, id) {
		$scope.variablePacket.insertChoice_eightType = index;
		$scope.quzParams.type = id;
		$scope.getType($scope.quzParams.type); // 类型数组 置空
		$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
		$scope.findQuzAll();
		//		$scope.insertChoice_threeSwitch($scope.variablePacket.insertChoice_threeType);
	}

	//弹层----插入资源的类型切换
	$scope.insertChoice_selectTypeTab = function(index, id) {
		$scope.variablePacket.insertChoice_selectType = index;
		$scope.resParams.objId = id;
		$scope.getAddResource();
	}

	/**
	 * 格式化类型
	 * @param {Object} name
	 */
	$scope.formtType = function(name) {
		var type = '';
		switch(name) {
			case '单选题':
				type = 'single';
				break;
			case '多选题':
				type = 'many';
				break;
			case '判断题':
				type = 'judge';
				break;
			case '填空题':
				type = 'fillIn';
				break;
			case '材料题':
				type = 'material';
				break;
			case '简答题':
				type = 'briefAnswer';
				break;
			case '完形填空':
				type = 'clozeCloze';
				break;
			case '阅读理解':
				type = 'reading';
				break;
			default:
				break;
		}
		return type;
	}

	/**
	 * 查询试题类型
	 */
	$scope.findQuzType = function() {
		myQuzService.findQuzType(function(res) {
			if(res.code == 200) {
				angular.forEach(res.data, function(data) {
					data.show = false;
					data.Type = $scope.formtType(data.name);
					$scope.variablePacket.queTypeMap[data.id] = $scope.formtType(data.name);
				})
				$scope.quzParams.type = res.data[0].id;
				$scope.variablePacket.queTypeDefault = res.data[0].id;
				$scope.variablePacket.eightSwitchOut = res.data;
				// 第一次 调用quz全部展示默认单选
				$scope.findQuzAll();
			}
		}, function(e) {
			console.info("试题类型 findQuzType:" + e);
		})
	}

	$scope.findQuzType();
	//页面--从题库添加
	$scope.addTopice = function() {
		$scope.variablePacket.insertDialogType = 'question';
		$scope.variablePacket.AddQuestion_show = true;
		$scope.variablePacket.threeSwitch = $scope.variablePacket.quzThreeSwitch;
		$scope.variablePacket.insertChoiceAll = true;
		$scope.variablePacket.insertChoice = true;
		$scope.variablePacket.maskHeader = true;
		adaptionHeight();
		$scope.insertChoice_ThreeSwitch(0, 0);
		//查询资源
		//		$scope.findQuzAll();
		//弹层---题库选择弹层里的加减号
		$scope.topic_Sign = function(type, id, index, number) {
			$scope.questionBank.In[type][index].sign = !$scope.questionBank.In[type][index].sign;
			angular.forEach($scope.variablePacket.eightSwitchOut, function(e, i) {
				if(e.Type == type) {
					$scope.variablePacket.eightSwitchOut[i].show = true;
					$location.hash(type);
					$anchorScroll();
				}
			});
			if($scope.questionBank.In[type][index].sign) {
				$scope.variablePacket.queSelMap[id] = true;
				$scope.variablePacket.ProvingContent = false;
				var Obj = angular.copy($scope.questionBank.In[type][index]);
				$scope.variablePacket.queIndex = number; // 控制最后点击的题型高亮
				$scope.questionBank.Out[type].push(Obj);
			} else {
				$scope.variablePacket.queSelMap[id] = false;
				angular.forEach($scope.questionBank.Out[type], function(e, i) {
					if(e.Id == id) {
						$scope.questionBank.Out[type].splice(i, 1);
					}
					if($scope.questionBank.Out[type].length == 0) {
						$scope.variablePacket.eightSwitchOut[number].show = false;
					}
				});
			}
		}
	}

	//弹层--关闭
	$scope.closeMask = function() {
		$scope.variablePacket.insertChoiceAll = false;
	}
	//插入资源回显弹层--开启
	$scope.insertResource = function(resource) {
		$scope.variablePacket.clickResourceName=resource.ResourceTit;
		$scope.variablePacket.insertResource = true;
		adaptionHeight();
		$scope.resourceBoxFn(resource.ossFileName,resource.ResourceTit,resource.ResourceType);
	}
	
	/**
	 * 看是否有flash插件
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

	
	//查看资源详情弹框
	var playerSTOP,audioSTOP;
	$scope.resourceBoxFn = function (ossid,resourceName,resourceType){
		var prewUrl = ossIp + 'filelog/'+ossid;
		$http.get(prewUrl).success(function (data){
			if(data.code == 200){
				$scope.variablePacket.convertState = data.data.state;
				if(resourceType == '1'){
					$scope.variablePacket.backResourceType = 'video';
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$scope.variablePacket.showplayer = true;
					} else {
						$scope.variablePacket.showplayer = false;
						playerSTOP=jwplayer('showplayer').setup({
	                        flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
	                        height:520,
	                        width: "100%",
	                        autostart: true,
	                        playlist: [{
	                            sources: [{
	                                file: data.data.pathmp4PC
	                            },{
	                                file: data.data.pathmp4PAD
	                            }]
	                        }],
	                        androidhls:"true"
	                    });
					}
				}else if(resourceType == '2'){
					$scope.variablePacket.backResourceType = 'music';
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$scope.variablePacket.showplayer = true;
					} else {
						$scope.variablePacket.showplayer = false;
						audioSTOP=jwplayer('showplayer').setup({
	                        flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
	                        height:520,
	                        width: "100%",
	                        autostart: true,
	                        playlist: [{
	                            sources: [{
	                                file: data.data.pathmp3PC
	                            },{
	                                file: data.data.pathmp3PAD
	                            }]
	                        }],
	                        androidhls:"true"
	                    });
					}
				}else if(resourceType == '3'){
					$scope.variablePacket.showplayer = false;
					$scope.variablePacket.backResourceType = 'pic';
					$scope.variablePacket.imagePath = data.data.previewUrl;
				}else{
					$scope.variablePacket.showplayer = false;
					$scope.variablePacket.backResourceType = 'pdf';
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
					console.log($scope.variablePacket.pdfPath)
				}
			}
	    })
	};
	
	
	//插入资源回显弹层--关闭
	$scope.closeResource = function() {
		$scope.variablePacket.insertResource = false;
	}
	//填空题插入分割线
	$scope.insertVerticalLine = function(type, index) {
		$scope.questionBank.Out[type][index].Answer += ' | ';
	};

	//插入填空线
	$scope.ready = function(editor) {
		$scope.insertTransverseLine = function() {
			var values = '<span class="bottomLine"></span>';
			editor.execCommand('insertHtml', values)
		}
	}

	//完形填空、阅读理解增加选项
	$scope.addOption = function(index,type) {
		if($scope.questionBank.Out[type][index].list.length < 20) {
			$scope.questionBank.Out[type][index].list.push({});
		} else {
			$scope.wranShow('至多添加20个选项！', false);
		}
	};

	//完形填空、阅读理解减少选项
	$scope.deleteOption = function(index,type) {
		if($scope.questionBank.Out[type][index].list.length > 1) {
			$scope.questionBank.Out[type][index].list.pop();
		} else {
			$scope.wranShow('请至少保留一个选项！', false);
		}
	};
	
	/**
    * 多选题答题卡处理
    * @param {Object} index
    * @param {Object} type
    */
   $scope.cardMany = function(index,type){
   		var $item =angular.element('input[name="'+type+index+'"]');
		var answer = '';
		var answerArr = [];
		$scope.questionBank.Out[type][index].optionNum = $item.length;
		$scope.questionBank.Out[type][index].Answer = '';
		var optArr = [];
		for(var i=0;i<$item.length;i++){
			var optTem = {id:$item[i].value,checked:false};
			if($item[i].checked){
				answer +=  $item[i].value+',';
				answerArr.push($item[i].value);
				optTem.checked = true;
			}
			optArr.push(optTem);
		}
		$scope.questionBank.Out[type][index].optArr = optArr;
		if(answer != ''){
			$scope.questionBank.Out[type][index].Answer = answer.substring(0,answer.length-1);
			$scope.questionBank.Out[type][index].answerArr = answerArr;
		}
   }
   
   /**
    * 完型填空和阅读理解答题卡处理
    * @param {Object} item
    */
   $scope.cardGestaltRead = function(type,index){
   		var item = $scope.questionBank.Out[type][index];
   		var optList = item.list;
		var answer = '';
		var optionNum = '';
		var answerNotNull = true;
		for(var i=0;i<optList.length;i++){
			if(optList[i].option === undefined){
				item.answer = undefined;
				answerNotNull = false;
				break;
			}else{
				answer +=  optList[i].option+',';
				optionNum += angular.element('input[name="'+type+index+i+'"]').length+',';
			}
		}
		if(answerNotNull){
			item.Answer = answer.substring(0,answer.length-1);
			item.optionNum = optionNum.substring(0,optionNum.length-1);
		}
   }

	//修改的确认按钮
	$scope.confirm = function(type, index) {
		switch (type){
   			//单选题
   			case 'single':
   				$scope.questionBank.Out[type][index].optionNum = angular.element('input[name="'+type+index+'"]').length;
   				break;
   			//多选题
   			case 'many':
   				$scope.cardMany(index,type);
   				break;
   			//判断题	
   			case 'judge':
   			$scope.questionBank.Out[type][index].optionNum = angular.element('input[name="'+type+index+'"]').length;
   				break;
   			//填空题
   			case 'fillIn':
	   			if($scope.questionBank.Out[type][index].answer!==undefined){
	   				$scope.questionBank.Out[type][index].answerArr = $scope.questionBank.Out[type][index].answer.split('|');
	   				$scope.questionBank.Out[type][index].optionNum = $scope.questionBank.Out[type][index].answer.split('|').length;
	   			}
   				break;
   			//材料题
   			case 'material':
   			//简答题
   			case 'briefAnswer':
   				$scope.questionBank.Out[type][index].optionNum = '1'
   				break;
   			//完型填空
   			case 'clozeCloze':
   			//阅读理解
   			case 'reading':
   				 $scope.cardGestaltRead(type,index);
   				break;
   			default:
   				break;
   		}
		
		//校验修改题干不能为空
   		if($scope.questionBank.Out[type][index].queTit===undefined||$scope.questionBank.Out[type][index].queTit==""){
   			$scope.questionBank.Out[type][index].titleWarn = true;
   			return;
   		}else{
   			$scope.questionBank.Out[type][index].titleWarn = false;
   		}
   		
   		
		//校验修改答案不能为空
   		if($scope.questionBank.Out[type][index].Answer===undefined||$scope.questionBank.Out[type][index].Answer==""){
   			$scope.questionBank.Out[type][index].answerWarn = true;
   			return;
   		}else{
   			$scope.questionBank.Out[type][index].answerWarn = false;
   		}
		$scope.questionBank.Out[type][index].CanEdit = false;
	}
	
	//修改的取消按钮
	$scope.cancelBtn = function(type,index){
		$scope.questionBank.Out[type][index] = $scope.questionBank.Out[type][index].oldData;
		$scope.questionBank.Out[type][index].CanEdit = false;
	}

	//8种题型
	//	$scope.questionBank = {
	//		In: {
	//			//单选
	//			single: [{
	//					Id: 0,
	//					CanEdit: false, //是否可以修改编辑
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
	//					CanEdit: false,
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
	//					CanEdit: false,
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
	//			//多选
	//			many: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
	//				CanResource: false, //是否显示资源
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}], //插入带过来的资源数据
	//				sign: false, //从题库选择的加减号
	//				Type: 'many', //题型
	//				AnswerShow: false, //默认答案不显示
	//				ResourceShow: false, //是否显示插入资源
	//				queTit: '111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
	//				Answer: {
	//					daanA: true,
	//					daanB: true,
	//					daanC: false,
	//					daanD: false
	//				}, //答案
	//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B', //解析
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 1,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'many',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: '222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
	//				Answer: {
	//					daanA: false,
	//					daanB: true,
	//					daanC: true,
	//					daanD: false
	//				},
	//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 2,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'many',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: '333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
	//				Answer: {
	//					daanA: true,
	//					daanB: false,
	//					daanC: false,
	//					daanD: true
	//				},
	//				Analysis: '由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}],
	//			//判断
	//			judge: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
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
	//				CanEdit: false,
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
	//			//填空
	//			fillIn: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
	//				CanResource: false, //是否显示资源
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}], //插入带过来的资源数据
	//				sign: false, //从题库选择的加减号
	//				Type: 'fillIn', //题型
	//				AnswerShow: false, //默认答案不显示
	//				ResourceShow: false, //是否显示插入资源
	//				queTit: '111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
	//				Answer: '11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。', //答案
	//				Analysis: '天上有一个太阳', //解析
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 1,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'fillIn',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: '222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。',
	//				Answer: '22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。', //答案
	//				Analysis: '天上有一个太阳',
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}],
	//			//材料
	//			material: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
	//				CanResource: false, //是否显示资源
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}], //插入带过来的资源数据
	//				sign: false, //从题库选择的加减号
	//				Type: 'material', //题型
	//				AnswerShow: false, //默认答案不显示
	//				ResourceShow: false, //是否显示插入资源
	//				queTit: '为什么李白特别钟情于庐山？', //题干
	//				Answer: '暧暧远人村 | 川泽纡其骇瞩', //答案
	//				Analysis: '天上有一个太阳', //解析
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 1,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'material',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: '你是谁？我是谁？是游戏吗？',
	//				Answer: '暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
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
	//				CanEdit: false, //是否可以修改编辑
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
	//				CanEdit: false,
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
	//				CanEdit: false,
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
	//			}],
	//			//完形填空
	//			clozeCloze: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
	//				CanResource: false, //是否显示资源
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}], //插入带过来的资源数据
	//				sign: false, //从题库选择的加减号
	//				Type: 'clozeCloze', //题型
	//				AnswerShow: false, //默认答案不显示
	//				ResourceShow: false, //是否显示插入资源
	//				queTit: "天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
	//				Answer: [{
	//					daan: 'A'
	//				}, {
	//					daan: 'B'
	//				}, {
	//					daan: 'D'
	//				}], //答案
	//				Analysis: '天上有一个太阳', //解析
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 1,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'clozeCloze',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: "地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.",
	//				Answer: [{
	//					daan: 'C'
	//				}, {
	//					daan: 'B'
	//				}, {
	//					daan: 'D'
	//				}],
	//				Analysis: '地上有个月亮',
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}],
	//			//阅读理解
	//			reading: [{
	//				Id: 0,
	//				CanEdit: false, //是否可以修改编辑
	//				CanResource: false, //是否显示资源
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}], //插入带过来的资源数据
	//				sign: false, //从题库选择的加减号
	//				Type: 'reading', //题型
	//				AnswerShow: false, //默认答案不显示
	//				ResourceShow: false, //是否显示插入资源
	//				queTit: '11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
	//				myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
	//				Analysis: '天上有一个太阳', //解析
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}, {
	//				Id: 1,
	//				CanEdit: false,
	//				CanResource: false,
	//				Resource: [{
	//					ResourceTit: '',
	//					ResourceSrc: 0,
	//					ResourceNum: 0
	//				}],
	//				sign: false,
	//				Type: 'reading',
	//				AnswerShow: false,
	//				ResourceShow: false,
	//				queTit: '22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
	//				myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
	//				Analysis: '是是是是',
	//				Chapter: [{
	//					Onetit: '学科',
	//					Twotit: '课本',
	//					Threetit: '章节'
	//				}]
	//			}]
	//		},
	//		//从题库添加后的展示8种题型的数据
	//		Out: {
	//			single: [],
	//			many: [],
	//			judge: [],
	//			fillIn: [],
	//			material: [],
	//			briefAnswer: [],
	//			clozeCloze: [],
	//			reading: []
	//		}
	//	}

	//插入的数据
	$scope.insertData = [
		/*{
				sign: false, //加减号
				ResourceNum: 0, //记录点击的第几个
				ResourceTit: '111五年级语文期末试卷.ppt', //标题
				ResourceSrc: 0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐
				name: '刘敏', //，名字
				time: '2017-08-20', //时间
				size: '1049.02k' //内存大小
			}*/
	]

	$scope.renderFinish = function() {
		//填空题答案类型的转换
		$scope.fillInArr = [];
		angular.forEach($scope.questionBank.In.fillIn, function(e, i) {
			$scope.fillInArr.push($scope.questionBank.In.fillIn[i].Answer.split("|"));
		})

		//材料题答案类型的转换
		$scope.materialArr = [];
		angular.forEach($scope.questionBank.In.material, function(e, i) {
			$scope.materialArr.push($scope.questionBank.In.material[i].Answer.split("|"));
		})

		//简答题答案类型的转换
		$scope.briefAnswerArr = [];
		angular.forEach($scope.questionBank.In.briefAnswer, function(e, i) {
			$scope.briefAnswerArr.push($scope.questionBank.In.briefAnswer[i].Answer.split("|"));
		})
	}

	/******************************************************************************zxl**************************************************************************/
	//参数
	$scope.params = {
		areaCodes: '',
		areaNames: '',
		createUser: '',
		createBy: userId,
		type: 0,
		subjIds: '',
		subjNames: '',
		gradeJson: '',
		questionJson: '',
		name: '',
		id:''
	}

	/**
	 * 资源参数
	 */
	$scope.resParams = {
		objId: '',
		subjectID: '',
		knowledge: '',
		state: '',
		userId:'',
		title:''
	}

	//资源数量
	$scope.addResCount = 0;
	
	/**
	 * 左侧树查询全部
	 */
	$rootScope.findAll = function(){
		if($scope.variablePacket.insertChoice){
			$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
    		$scope.quzParams.subjIds = '';
    		$scope.findQuzAll();
    	}else{
    		$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
    		$scope.resParams.subjectID = '';
			$scope.getAddResource();
    	}
	}
	
	
	/**
	 * 据左侧树查询
	 */
    $rootScope.findListByTree = function(subjectID,knowledge) {
    	if($scope.variablePacket.insertChoice){
    		$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
    		$scope.quzParams.subjIds = subjectID;
    		$scope.findQuzAll();
    	}else{
    		$scope.quzParams.pageNo = $scope.variablePacket.pageNo;
    		$scope.resParams.subjectID = subjectID;
			$scope.getAddResource();
    	}
    };

	/**
	 * 资源类型
	 */
	var params = "070a33c388f24f23b05d15adc0b8fd2e";
	myResourceService.getResType(params, function(res) {
		if(res.code == 200) {
			$scope.variablePacket.SelectType = res.data;
			$scope.variablePacket.SelectType.unshift({
				"name": "全部",
				"id": ""
			});

		} else {
			$scope.variablePacket.SelectType = [];
		}
	}, function(res) {

	})

	//查询资源
	$scope.getAddResource = function(optType) {
		if(optType != 'paging') {
			$scope.insertData = [];
		}else{
			$scope.resParams.pageNo+=1;
		}
		
		if($scope.variablePacket.insertChoice_threeType == 0) {
			myResourceService.getResourcesAll($scope.resParams, function(res) {
				$scope.addResCount = res.count;
				$scope.variablePacket.resTotalPage = res.count % $scope.resParams.pageSize == 0 ? res.count / $scope.resParams.pageSize : Math.ceil(res.count / $scope.resParams.pageSize);
				angular.forEach(res.list, function(obj, index) {
					var resTem = {};
					resTem.sign = false;
					if($scope.variablePacket.resSelque.CanResource && $scope.variablePacket.resSelque.Resource[0].ResourceId == obj.id) {
						resTem.sign = true;
					}
					resTem.ResourceNum = index;
					resTem.ResourceName = resTem.ResourceTit = obj.title;
					resTem.ResourceType = obj.objId;
					resTem.ResourceSrc = obj.objId;
					resTem.fileName = obj.fileName;
					resTem.name = obj.createUser;
					resTem.time = obj.createDate;
					resTem.size = obj.fileSize;
					resTem.ResourceId = resTem.id = obj.id;
					resTem.viewURL = obj.viewURL;
					resTem.ossFileName = obj.fileName.substr(0, obj.fileName.lastIndexOf('.'));
					$scope.insertData.push(resTem);
				})
			}, function(error) {
	
			})
		}else {
			myResourceService.getResources($scope.resParams, function(res) {
				if(res.code == 200) {
					$scope.addResCount = res.data.count;
					$scope.variablePacket.resTotalPage = res.data.count % $scope.resParams.pageSize == 0 ? res.data.count / $scope.resParams.pageSize : Math.ceil(res.data.count / $scope.resParams.pageSize);
					angular.forEach(res.data.list, function(obj, index) {
						var resTem = {};
						resTem.sign = false;
						if($scope.variablePacket.resSelque.CanResource && $scope.variablePacket.resSelque.Resource[0].ResourceId == obj.id) {
							resTem.sign = true;
						}
						resTem.ResourceNum = index;
						resTem.ResourceName = resTem.ResourceTit = obj.title;
						resTem.ResourceType = obj.objId;
						resTem.ResourceSrc = obj.objId;
						resTem.name = obj.createUser;
						resTem.time = obj.createDate;
						resTem.size = obj.fileSize;
						resTem.ResourceId = resTem.id = obj.id;
						resTem.viewURL = obj.viewURL;
						resTem.ossFileName = obj.fileName.substr(0, obj.fileName.lastIndexOf('.'));
						resTem.fileName = obj.fileName;
						$scope.insertData.push(resTem);
					})
				}
			}, function(error) {
	
			})
		}
	}

	/**
    * 切换科目时将章节目录置空
    */
    $scope.clearxiugai = function(sub){
    	$scope.selectedSubject = sub;
    	if($scope.selectedSubject != null){
    		$scope.selectedSubject.subjIds = "";
			$scope.selectedSubject.subjNames = "";
    	}
        $rootScope.initchoiceVersion();
    }

	/**
	 * 查询当前教师的 授课信息
	 */
	$scope.findTeaCourse = function(){
		$http.get(zyxrequireIp + '/uc/user/' + userId).success(function(suc) {
			$scope.variablePacket.arrSubject = [];
			if(suc.ret == 200) {
				var data = suc.data;
				$scope.params.createBy = data.id;
				$scope.params.createUser = data.realname;
				$scope.params.areaCodes = "0" + "," + data.cityId + "," + data.countyId + "," + data.officeId + "," + "0";
				$scope.params.areaNames = "0" + "//" + data.cityName + "//" + data.countyName + "//" + data.officeName + "//" + "0";
				angular.forEach(data.userCourse, function(item) {
					if(typeof($scope.variablePacket.subMapTem[item.subjectId]) == "undefined") {
						var subj = {
							id: item.subjectId,
							name: item.subjectName,
							vid: item.versionId,
							vname: item.versionName,
							gname: item.gradeName,
							gid: getGradeNo(item.gradeName),
							lid: "level_" + item.stage,
							lname: getLeveName(item.stage),
							areaId: data.cityId,
							areaName: data.cityName,
							countyId: data.countyId,
							countyName: data.countyName,
							officeId: data.officeId,
							officeName: data.officeName
	
						};
						$scope.variablePacket.arrSubject.push(subj);
						$scope.variablePacket.subMapTem[item.subjectId] = subj;
					}
	
				});
				
				//修改是初始化加载试卷信息
				if($scope.variablePacket.state == 'revise'){
					$scope.findExamById();
			
				}
			}
		});
	}
	
	//初始化查询教师授课
	$scope.findTeaCourse();
	/**
	 * 根据试卷Id查询试卷
	 */
	$scope.findExamById = function(){
		myQuzService.getExamById($scope.variablePacket.examId,function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				$scope.selectedSubject = $scope.variablePacket.subMapTem[data.subjIds.split(",")[2]];
				$scope.selectedSubject.subjIds = data.subjIds;
                $scope.selectedSubject.subjNames = data.subjNames;
				$scope.variablePacket.UsernameMessage = data.name;
				var queTypeMap = {}
				angular.forEach(data.questionList,function(item,index){
					if(item.type != ""){
						var type = $scope.variablePacket.queTypeMap[item.type];
						$scope.questionBank.Out[type].push($scope.appendQuzObj(item,'out'));
						if(queTypeMap[item.type]===undefined){
							queTypeMap[item.type] = true;
						}
					}
		        });
				angular.forEach($scope.variablePacket.eightSwitchOut,function(item,index){
					if(queTypeMap[item.id]){
						item.show = true;
					}
				})
				var arr = data.subjNames.split('//');
				$scope.variablePacket.libraryTitleBar =[arr[4],arr[5],arr[6]];
				$scope.params.subjIds = data.subjIds;
				$scope.params.subjNames = data.subjNames;
			}
		},function(){
			
		})
	}

	/**
	 * 获取左侧 id name	getGradeNo
	 */
	$rootScope.getTreeByIdsNames = function(ids, names, gradeJson) {
		$scope.params.subjIds = ids;
		$scope.params.subjNames = names;
		$scope.params.gradeJson = gradeJson;
	};

	/**
	 * 根据年级获取 年级段
	 */
	function getGradeNo(gradeName) {
		var gradeNo = "";
		switch(gradeName) {
			case "一年级":
				gradeNo = "1";
				break;
			case "二年级":
				gradeNo = "2";
				break;
			case "三年级":
				gradeNo = "3";
				break;
			case "四年级":
				gradeNo = "4";
				break;
			case "五年级":
				gradeNo = "5";
				break;
			case "六年级":
				gradeNo = "6";
				break;
			case "七年级":
				gradeNo = "7";
				break;
			case "八年级":
				gradeNo = "8";
				break;
			case "九年级":
				gradeNo = "9";
				break;
			case "初一":
				gradeNo = "7";
				break;
			case "初二":
				gradeNo = "8";
				break;
			case "初三":
				gradeNo = "9";
				break;
			case "高一":
				gradeNo = "10";
				break;
			case "高二":
				gradeNo = "11";
				break;
			case "高三":
				gradeNo = "12";
				break;
		}
		return gradeNo;
	}

	// 根据 学段 获取学段 名称
	function getLeveName(levelId) {
		var leveName = "";
		switch(levelId) {
			case "1":
				leveName = "小学";
				break;
			case "2":
				leveName = "初中";
				break;
			case "3":
				leveName = "高中";
				break;
		}
		return leveName;
	}

	// 查询我的试题类型

	//习题类型切换事件
	//	$scope.jump = function (i,id){
	//		$scope.variablePacket.pageNo = 1;
	//		$scope.variablePacket.questionTypeIndex = i;
	//		$scope.variablePacket.type = id;
	//		$scope.getType($scope.variablePacket.type);	// 类型数组 置空
	//		$scope.myQuestionTypeTab($scope.variablePacket.myQuestionTypeIndex,0);
	//	};

	/**
	 * 查询试题
	 */
	$scope.findQuzAll = function(optType) {
		if(optType != 'paging') {
			$scope.getType($scope.quzParams.type);
		}else{
			$scope.quzParams.pageNo+=1;
		}
		if($scope.variablePacket.insertChoice_threeType == 0) {
			myQuzService.findQuzAll($scope.quzParams, function(res) {
				if(res.code == 200) {
					$scope.variablePacket.quzNum = res.data.count;
					$scope.variablePacket.quzTotalPage = res.data.count % $scope.quzParams.pageSize == 0 ? res.data.count / $scope.quzParams.pageSize : Math.ceil(res.data.count / $scope.quzParams.pageSize);
					var quess = [];
					angular.forEach(res.data.list, function(e, i) {
						quess.push($scope.appendQuzObj(e));
					})
					$scope.getSwitchQuzByType($scope.quzParams.type, quess);
				} else {
					$scope.variablePacket.quzNum = 0;
				}
			}, function(e) {
				console.info("全部试题 findQuzAll:" + e);
			})
		}else {
			myQuzService.findQuz($scope.quzParams, function(res) {
				if(res.code == 200) {
					$scope.variablePacket.quzNum = res.data.count;
					$scope.variablePacket.quzTotalPage = res.data.count % $scope.quzParams.pageSize == 0 ? res.data.count / $scope.quzParams.pageSize : Math.ceil(res.data.count / $scope.quzParams.pageSize);
					var quess = [];
					angular.forEach(res.data.list, function(e, i) {
						quess.push($scope.appendQuzObj(e));
					})
					$scope.getSwitchQuzByType($scope.quzParams.type, quess);
				} else {
					$scope.variablePacket.quzNum = 0;
				}
			}, function(e) {
				console.info("全部试题 findQuzAll:" + e);
			})
		}
	}
	
	/**
	 * 拼接试题对象
	 * @param {Object} e
	 */
	$scope.appendQuzObj = function(e,type){
		var ques = {};
		if(e.sourceType > 1) {
			ques.Id = e.quzResId;
		}else {
			ques.Id = e.id;
		}
		
		ques.CanEdit = false; //是否可以修改编辑
		ques.CanResource = false; //是否显示资源
		ques.answerWarn = false;
		ques.titleWarn = false;
		var resObj = {
			ResourceId:'',
			ResourceType:'',
			ResourceTit: '',
			ResourceSrc: 0,
			ResourceNum: 0
		}
		ques.ResourceShow = false; //是否插入资源
		if(e.resourceJson !== undefined&&e.resourceJson != ""){
			var res = JSON.parse(e.resourceJson)[0];
			resObj.ResourceId = res.rid;
			resObj.ResourceType  = res.type;
			resObj.ResourceTit = res.name;
			resObj.ossFileName = res.ossFileName;
			ques.CanResource = true;
			ques.ResourceShow = true;
		}
		ques.Resource = [resObj]; //插入带过来的资源数据
		if(type == 'out'){
			$scope.variablePacket.queSelMap[e.quzId] = true;
			ques.subjNames = e.subjNames;
			ques.Id = e.quzId;
		}else{
			if(e.subjNames !== undefined && e.subjNames != ""){
				ques.subjNames = $scope.formatSubjNames(e.subjNames);
			}
		}
		//从题库选择的加减号
		ques.sign = $scope.variablePacket.queSelMap[e.id] === undefined ? false : $scope.variablePacket.queSelMap[e.id];
		ques.Type = $scope.variablePacket.queTypeMap[e.type]; //题型英文
		ques.typeId = e.type; //题型Id
		ques.AnswerShow = false; //默认答案不显示
		ques.queTit = e.body; //题干
		ques.Answer = e.answer; //答案
		ques.Analysis = e.analysis; //解析
		ques.optionNum = e.optionNum;//选项数量
		$scope.aswerAnalysis( $scope.variablePacket.queTypeMap[e.type],e.answer,ques);
		ques.sourceType = e.sourceType;
		ques.state = e.state;
		return ques;
	}
	
	/**
	 * 格式化科目信息
	 * @param {Object} subjNames
	 */
	$scope.formatSubjNames = function(subjNames){
		var subArr = subjNames.split('//');
		var subjStr = '';
		for(var n=4;n<subArr.length;n++){
			subjStr += subArr[n]+'/';
		}
		return subjStr.substring(0,subjStr.length-1);
	}
	
	$scope.optLetter = ['A','B','C','D','E','F','G','H'];
	
	/**
	 * 修改答案解析
	 * @param {Object} type
	 * @param {Object} answer
	 */
	$scope.aswerAnalysis = function(type,answer,ques){
		switch (type){
   			//单选题
   			case 'single':
   				break;
   			//多选题
   			case 'many':
   				ques.AnswerArr = [];
   				for (var i=0;i<ques.optionNum;i++) {
   					var maTem = {id:$scope.optLetter[i],checked:false};
   					if(answer.indexOf($scope.optLetter[i])!=-1){
   						maTem.checked = true;
   					}
   					ques.AnswerArr.push(maTem);
   				}
   				break;
   			//判断题	
   			case 'judge':
   				break;
   			//填空题
   			case 'fillIn':
   				break;
   			//材料题
   			case 'material':
   			//简答题
   			case 'briefAnswer':
   				break;
   			//完型填空
   			case 'clozeCloze':
   			//阅读理解
   			case 'reading':
   				ques.list = [];
   				angular.forEach(answer.split(","),function(item,index){
   					var optMap = {option:item};
   					ques.list.push(optMap);
   				})
   				break;
   			default:
   				break;
   		}
	}

	/**
	 * 分页拼接试题
	 * @param {Object} quztype
	 * @param {Object} quess
	 */
	$scope.getSwitchQuzByType = function(quztype, quess) {
		switch(parseInt(quztype)) {
			case 2:
				$scope.questionBank.In.single = $scope.questionBank.In.single.concat(quess);
				break;
			case 4:
				$scope.questionBank.In.many = $scope.questionBank.In.many.concat(quess);
				break;
			case 1:
				$scope.questionBank.In.judge = $scope.questionBank.In.judge.concat(quess);
				break;
			case 3:
				$scope.questionBank.In.fillIn = $scope.questionBank.In.fillIn.concat(quess);
				break;
			case 8:
				$scope.questionBank.In.material = $scope.questionBank.In.material.concat(quess);
				break;
			case 6:
				$scope.questionBank.In.briefAnswer = $scope.questionBank.In.briefAnswer.concat(quess);
				break;
			case 7:
				$scope.questionBank.In.clozeCloze = $scope.questionBank.In.clozeCloze.concat(quess);
				break;
			case 5:
				$scope.questionBank.In.reading = $scope.questionBank.In.reading.concat(quess);
				break;
		}
	}

	/**
	 * 置空试题列
	 * @param {Object} quztype
	 */
	$scope.getType = function(quztype) {
		switch(parseInt(quztype)) {
			case 2:
				$scope.questionBank.In.single = [];
				break;
			case 4:
				$scope.questionBank.In.many = [];
				break;
			case 1:
				$scope.questionBank.In.judge = [];
				break;
			case 3:
				$scope.questionBank.In.fillIn = [];
				break;
			case 8:
				$scope.questionBank.In.material = [];
				break;
			case 6:
				$scope.questionBank.In.briefAnswer = [];
				break;
			case 7:
				$scope.questionBank.In.clozeCloze = [];
				break;
			case 5:
				$scope.questionBank.In.reading = [];
				break;
		}
	}

}]);
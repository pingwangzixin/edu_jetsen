app.controller('evaluateReleaseCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', function($scope, $state, $stateParams, $timeout, $http, $location, $interval) {
	//变量包
	$scope.variablePacket = {
		//下发评价弹框变量数据
		evaluate: {
			evaluateBox: false, //下发评价弹框
			arrGrade: [{
				name: '一年级',
				id: '1'
			}, {
				name: '三年级',
				id: '2'
			}, {
				name: '五年级',
				id: '3'
			}], //年级数据
			arrSubject: [{
				name: '英语',
				id: '1'
			}, {
				name: '数学',
				id: '2'
			}, {
				name: '逻辑',
				id: '3'
			}], //学科数据
			arrStandard: [{
				name: '可以',
				id: '1'
			}, {
				name: '不可以',
				id: '2'
			}], //评价标准数据
			arrSchool: { //学校数据
				belongedActive: -1, //区域选中状态
				schoolNameActive: 0, //具体学校名称选中状态
				schoolList: false, //学校列表展开项
				schoolListData: true, //学校列表是否有数据
				schoolListCheckbox: false, //学校列表全选状态
				belonged: [], //所属区域
				schoolName: [] //具体学校名称
			},
			arrTime: [{
				name: '上学期',
				id: '上学期'
			}, {
				name: '下学期',
				id: '下学期'
			}], //时间数据
			verifyGrade: false, //验证年级
			verifySubject: false, //验证学科
			verifyStandard: false, //验证评价标准
			verifySchool: false, //验证学校
			verifyTime: false, //验证评价时间
			verifyTimes: false, //验证评价次数
			defaultGrade: '', //年级默认值
			defaultSubject: '', //学科默认值
			defaultStandard: '', //评价标准默认值
			defaultTime: '', //评价时间默认值
			defaultTimes: -1, //评价次数默认值
			gradeOptions: false, //年级选择框
			subjectOptions: false, //学科选择框
			schoolOptions: false, //学校选择框
			StandardOptions: false, //评价标准选择框

		},

	};
	$scope.gradeCheckNode = [];
	$scope.subjectCheckNode = [];
	$scope.schoolNodes = [];
	$scope.standerCheckNode = [];
	$scope.schoolCheckNode = [];
	$scope.StandardCheckNode=[];
	$scope.chuanSchoolCheckedNode=[];//提交时候传的学校数据
	$scope.userGroupId = "";
	$scope.gradeNames = "";
	$scope.subjectNames = "";
	$scope.StandardIds = "";
	$scope.userRole="";
	$scope.schoolId="";
	var zTreeObj = null; //树对象
	//登陆后获取用户信息
    var user=JSON.parse(sessionStorage.getItem('managerSearch'));
    //alert(user);
    //console.info(user);
    var scope=user.scope;
    if(scope==4){
    	$scope.schoolId= user.officeId;
    	$scope.userGroupId=user.officeCode;
    }
    if(scope==3){
    	$scope.userGroupId=user.countyId;
    }
	function Ztree(clickType) {
		setTimeout(function() {
			var setting = {
				check: {
					enable: true
				},
				view: {
					showLine: true, //显示节点之间的连线。
					selectedMulti: false //允许同时选中多个节点。
				},
				data: {
					simpleData: {
						enable: true, //使用简单数据模式
						idKey: "id", //节点数据中保存唯一标识的属性名称
						pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称
					}
				},
				callback: {
					onAsyncSuccess: zTreeOnAsyncSuccess
				}

			};

			function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
				alert(event, treeId, treeNode, msg);
			};

			var clssName = {
				tree: clickType + 'Tree', //树id
				allTrueBtn: clickType + 'CheckAllTrue', //全选钮
				allFalseBtn: clickType + 'CheckAllFalse', //反选钮
			}
			var nodes;
			if(clickType == "grade") {
				if(scope==4){//说明是校领导
					nodes = [{
						id: "1",
						parentId: "0",
						name: "一年级"
					},
					{
						id: "2",
						parentId: "0",
						name: "二年级"
					},
					{
						id: "3",
						parentId: "0",
						name: "三年级"
					},
					{
						id: "4",
						parentId: "0",
						name: "四年级"
					},
					{
						id: "5",
						parentId: "0",
						name: "五年级"
					},
					{
						id: "6",
						parentId: "0",
						name: "六年级"
					},
					{
						id: "7",
						parentId: "0",
						name: "初一"
					},
					{
						id: "8",
						parentId: "0",
						name: "初二"
					},
					{
						id: "9",
						parentId: "0",
						name: "初三"
					},
					{
						id: "10",
						parentId: "0",
						name: "校本课程"
					},
					];
				}else{
					nodes = [{
						id: "1",
						parentId: "0",
						name: "一年级"
					},
					{
						id: "2",
						parentId: "0",
						name: "二年级"
					},
					{
						id: "3",
						parentId: "0",
						name: "三年级"
					},
					{
						id: "4",
						parentId: "0",
						name: "四年级"
					},
					{
						id: "5",
						parentId: "0",
						name: "五年级"
					},
					{
						id: "6",
						parentId: "0",
						name: "六年级"
					},
					];
				}
				
				var tree = $.fn.zTree.init($('#' + clssName.tree), setting, nodes);
				zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
				//var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());	
				$scope.scrollBar(clickType);
			}
			if(clickType == "subject") {

				//获取学科
				$http.post(suzhiIp + '/EvaluationManagerContr/getSubject.do', {
					grade: $scope.gradeNames,
					schoolId:$scope.schoolId
				}).success(function(data) {
					//console.info(data.data);
					//$scope.sujectNodes=data.data;
					nodes = data.data;
					var tree = $.fn.zTree.init($('#' + clssName.tree), setting, nodes);
					zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
					//var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
					$scope.scrollBar(clickType);
				});

			}
			if(clickType == "school") {
				//获取学科
				$http.post(suzhiIp + '/EvaluationManagerContr/findUserGroup.do', {
					userGroupId: $scope.userGroupId
				}).success(function(data) {
					//console.info(data);
					nodes = data;
					var tree = $.fn.zTree.init($('#' + clssName.tree), setting, nodes);
					//					tree.expandAll(tree);
					zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
					//var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
					$scope.scrollBar(clickType);

				});
			}
			if(clickType == "Standard") {
				//alert($scope.variablePacket.evaluate.defaultTime);
				//getEvaluatesBySchool.do   本校的方法
				if(scope==4){//校领导
					$http.post(suzhiIp + '/EvaluationManagerContr/getEvaluatesBySchool.do', {//校级的方法
						grade: $scope.gradeNames,
						term: $scope.variablePacket.evaluate.defaultTime,
						subject: $scope.subjectNames,
						schoolId:$scope.schoolId
					}).success(function(data) {
						//console.info(data);
						nodes = data;
						var tree = $.fn.zTree.init($('#' + clssName.tree), setting, nodes);
						//					tree.expandAll(tree);
						zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
						//var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
						$scope.scrollBar(clickType);
	
					});
				}else{
					$http.post(suzhiIp + '/EvaluationManagerContr/getEvaluates.do', {//市级的方法
						grade: $scope.gradeNames,
						term: $scope.variablePacket.evaluate.defaultTime,
						subject: $scope.subjectNames
					}).success(function(data) {
						//console.info(data);
						nodes = data;
						var tree = $.fn.zTree.init($('#' + clssName.tree), setting, nodes);
						//					tree.expandAll(tree);
						zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
						//var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
						$scope.scrollBar(clickType);
	
					});
				}
			}

			function checkNode(e) {
				var zTree = $.fn.zTree.getZTreeObj(clssName.tree),
					type = e.data.type,
					nodes = zTree.getSelectedNodes();
				if(type.indexOf("All") < 0 && nodes.length == 0) {
					alert("请先选择一个节点");
				}
				if(type == clssName.allTrueBtn) {
					zTree.checkAllNodes(true);
					$('#' + clssName.allFalseBtn).show();
					$('#' + clssName.allTrueBtn).hide();
				} else if(type == clssName.allFalseBtn) {
					zTree.checkAllNodes(false);
					$('#' + clssName.allFalseBtn).hide();
					$('#' + clssName.allTrueBtn).show();
				}
			}
			$("#" + clssName.allTrueBtn).bind("click", {
				type: clssName.allTrueBtn
			}, checkNode);
			$("#" + clssName.allFalseBtn).bind("click", {
				type: clssName.allFalseBtn
			}, checkNode);

		});

	}
	//点击取消关闭box
	$scope.removeBox = function(type) {
		$scope.variablePacket.evaluate[type + 'Options'] = false;
	}
	//点击确定回显选择的年级、学科、学校、标准
	$scope.takeValue = function(type) {
		var checkedNode = zTreeObj.getCheckedNodes(true);
		//console.info(checkedNode);
		if(type=="school"){
			$scope.chuanSchoolCheckedNode=checkedNode;
		}
		var fArray = []; //父级数组
		angular.forEach(checkedNode, function(value, index) {
			var o = new Object(); //父级对象
			if(value.level == "0") {
				var zArray = []; //子级数组
				o.id = value.id;
				o.name = value.name;
				//fArray.push(o);
				angular.forEach(checkedNode, function(value, index) {
					if(o.id == value.parentId) {
						var z = new Object(); //子集对象
						z.id = value.id;
						z.name = value.name;
						zArray.push(z);
					}
				})
				o.children = zArray;
				fArray.push(o);
			}
		})
		var checkedNode = fArray;
		//console.info(checkedNode);
		if(type == "grade") {
			if(checkedNode != "") {
				$scope.gradeNames="";
				$scope.gradeCheckNode = checkedNode;
				for(var i = 0; i < checkedNode.length; i++) {
					$scope.gradeNames += checkedNode[i].name + ",";
				}
				//alert($scope.gradeNames);
			} else {
				$scope.gradeNames = "";
			}
		}
		if(type == "subject") {
			if(checkedNode != "") {
				$scope.subjectNames="";
				$scope.subjectCheckNode = checkedNode;
				for(var i = 0; i < checkedNode.length; i++) {
					for(var j = 0; j < checkedNode[i].children.length; j++) {
						//alert(checkedNode[i].children[j].name);
						$scope.subjectNames += checkedNode[i].name+checkedNode[i].children[j].name + ",";
					}
				}
				//alert($scope.subjectNames);
			} else {
				$scope.subjectNames = "";
			}

		}
		if(type == "school") {
			$scope.schoolCheckNode = checkedNode;
		}
		if(type=="Standard"){
			if(checkedNode != "") {
				$scope.StandardIds="";
				$scope.StandardCheckNode = checkedNode;
				for(var i = 0; i < checkedNode.length; i++) {
					$scope.StandardIds += checkedNode[i].id+"|"+checkedNode[i].name + ",";
				}
				//alert($scope.gradeNames);
			} else {
				$scope.StandardIds = "";
			}
			
		}
		$scope.bitChoose();
		$scope.variablePacket.evaluate[type + 'Options'] = false;

	};

	//年级、学科、学校回显调用
	$scope.renderFinish = function(type) {
		$scope.scrollBar(type);
	};

	//导入试卷及答题卡滚动条调用
	$scope.scrollBar = function(type) {
		$timeout(function() {
			angular.element("#" + type + "Tree").mCustomScrollbar({
				mouseWheelPixels: 300, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
		}, 1500);
	};

	//  Ztree()

	//年级、学科、学校 选择按钮点击事件
	$scope.chooseOptions = function(type) {
		$scope.bitChoose();
		if($scope.variablePacket.evaluate[type + 'Options']) {
			$scope.variablePacket.evaluate[type + 'Options'] = false;
		} else {
			$scope.variablePacket.evaluate[type + 'Options'] = true;
			Ztree(type);
			//$scope.scrollBar(type);
		}
		//$scope.variablePacket.evaluate[type+'Options'] = !$scope.variablePacket.evaluate[type+'Options'];
	};

	//评价次数单选事件
	$scope.evaluationTimesFn = function(i) {
		$scope.variablePacket.evaluate.defaultTimes = i;
		$scope.variablePacket.evaluate.verifyTimes = false;
		//alert($scope.variablePacket.evaluate.defaultTimes);
	};
	//点击下发
	$scope.addEvaluateBtn = function(){
		$scope.bitChoose();
		var nodes = $scope.chuanSchoolCheckedNode;
		var pjlxArray = [];
		for(var i=0;i<nodes.length;i++){
			if(scope==4){//校领导
				if(nodes[i].level==0){
					var o = new Object();
					o.id=nodes[i].id;
					o.name=nodes[i].name;
					pjlxArray.push(o);
				}
			}else{
				if(nodes[i].level!=0){
					var o = new Object();
					o.id=nodes[i].id;
					o.name=nodes[i].name;
					pjlxArray.push(o);
				}
			}
		}
		if($scope.gradeNames!=""&&$scope.subjectNames!=""&&$scope.variablePacket.evaluate.defaultTimes!=-1&&pjlxArray != false&&$scope.variablePacket.evaluate.defaultTime!=""&&$scope.variablePacket.evaluate.defaultTimes!=-1){
				var jsonStr = JSON.stringify(pjlxArray);
				$http.post(suzhiIp + '/EvaluationManagerContr/createPJForTeacher.do', {
					pjlxArray:jsonStr,
					pid:$scope.StandardIds,
					grade: $scope.gradeNames,
					count:$scope.variablePacket.evaluate.defaultTimes,
					subject: $scope.subjectNames,
					term: $scope.variablePacket.evaluate.defaultTime
				}).success(function(data) {
					//alert(data);
					if(data=="1"){
						$scope.wranShow('下发成功',true);
						location.reload();
					}else{
						$scope.wranShow('下发失败',true);
					}
				});		
		}else{
			$scope.bitChoose();
		}
		
			 
		
	}
	$scope.changeTerm =function(){
		$scope.bitChoose();
	}
	//判断各级别是否选择了参数
	$scope.bitChoose = function(){
		if($scope.gradeNames==""){
			$scope.variablePacket.evaluate.verifyGrade=true;
		}else{
			$scope.variablePacket.evaluate.verifyGrade=false;
			if($scope.subjectNames==""){
				$scope.variablePacket.evaluate.verifySubject=true;
			}else{
				$scope.variablePacket.evaluate.verifySubject=false;
				if($scope.schoolCheckNode==""||$scope.schoolCheckNode=="[]"){
					$scope.variablePacket.evaluate.verifySchool=true;
				}else{
					$scope.variablePacket.evaluate.verifySchool=false;
					if($scope.variablePacket.evaluate.defaultTime==""){
						$scope.variablePacket.evaluate.verifyTime=true;
					}else{
						$scope.variablePacket.evaluate.verifyTime=false;
						if($scope.StandardIds==""){
							$scope.variablePacket.evaluate.verifyStandard=true;
						}else{
							$scope.variablePacket.evaluate.verifyStandard=false;
							if($scope.variablePacket.evaluate.defaultTimes==-1){
								$scope.variablePacket.evaluate.verifyTimes=true;
							}else{
								$scope.variablePacket.evaluate.verifyTimes=false;
								
							}
						}
					}
				}
			}
		}
	}

}]);
app.controller('evaluateReleaseCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state,$stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
		//下发评价弹框变量数据
		evaluate : {							
			evaluateBox : false,					//下发评价弹框
			arrGrade : [{name:'一年级',id:'1'},{name:'三年级',id:'2'},{name:'五年级',id:'3'}],	//年级数据
			arrSubject : [{name:'英语',id:'1'},{name:'数学',id:'2'},{name:'逻辑',id:'3'}],	//学科数据
			arrStandard : [{name:'可以',id:'1'},{name:'不可以',id:'2'}],	//评价标准数据
			arrSchool : {						//学校数据
				belongedActive : -1,				//区域选中状态
				schoolNameActive : 0,			//具体学校名称选中状态
				schoolList : false,				//学校列表展开项
				schoolListData : true,			//学校列表是否有数据
				schoolListCheckbox : false,		//学校列表全选状态
				belonged : [{name:'所有学校',id:'1'},{name:'直属市',id:'2'},{name:'啥的境况属市',id:'2'},{name:'啥的境况属市',id:'2'},{name:'啥的境况属市',id:'2'}],		//所属区域
				schoolName : [{name:'小说的啊小雪',id:'2',active:false},{name:'大的骄傲是到了看见按时发了',id:'1',active:false},{name:'小说的啊小雪',id:'2',active:false},{name:'大的骄傲是到了看见按时发了',id:'1',active:false},{name:'小说的啊小雪',id:'2',active:false}]		//具体学校名称
			},	
			arrTime : [{name:'上学期',id:'1'},{name:'下学期',id:'2'}],	//时间数据
			verifyGrade : false,				//验证年级
			verifySubject : false,				//验证学科
			verifyStandard : false,				//验证评价标准
			verifySchool : false,				//验证学校
			verifyTime : false,					//验证评价时间
			verifyTimes : false,				//验证评价次数
			defaultGrade : '',					//年级默认值
			defaultSubject : '',				//学科默认值
			defaultStandard : '',				//评价标准默认值
			defaultTime : '',					//评价时间默认值
			defaultTimes : -1,					//评价次数默认值
			gradeOptions : false, 				//年级选择框
			subjectOptions : false, 				//学科选择框
			schoolOptions : false, 					//学校选择框


		},

    };
    
    var zTreeObj = null;	//树对象
    function Ztree(clickType){
		setTimeout(function(){
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
						pIdKey: "pId", //节点数据中保存其父节点唯一标识的属性名称
						rootPId: "" //用于修正根节点父节点数据 默认值：null
					}
				}
			};
			
			var clssName = {
				tree : clickType + 'Tree',	//树id
				allTrueBtn : clickType + 'CheckAllTrue',	//全选钮
				allFalseBtn : clickType + 'CheckAllFalse',	//反选钮
			}
			
			var nodes = [{
					id: "1",
					pId: "0",
					name: "山西省"
				},
				{
					id: "2",
					pId: "0",
					name: "河北省"
				},
				{
					id: "3",
					pId: "0",
					name: "内蒙省"
				},
				{
					id: "4",
					pId: "0",
					name: "吉林省"
				},
				{
					id: "11",
					pId: "1",
					name: "大同市"
				},
				{
					id: "12",
					pId: "1",
					name: "朔州市"
				},
				{
					id: "21",
					pId: "2",
					name: "石家庄"
				},
				{
					id: "22",
					pId: "2",
					name: "唐山市"
				},
				{
					id: "31",
					pId: "3",
					name: "赤峰市"
				},
				{
					id: "32",
					pId: "3",
					name: "呼市"
				},
				{
					id: "41",
					pId: "4",
					name: "长春市"
				},
				{
					id: "42",
					pId: "4",
					name: "四平市"
				},
				{
					id: "43",
					pId: "4",
					name: "辽源市"
				},
				{
					id: "111",
					pId: "11",
					name: "浑源县"
				},
				{
					id: "112",
					pId: "11",
					name: "阳高县"
				},
				{
					id: "121",
					pId: "12",
					name: "山阴县"
				},
				{
					id: "122",
					pId: "12",
					name: "应县"
				}
			];
			var tree = $.fn.zTree.init($('#'+ clssName.tree), setting, nodes);
			tree.expandAll(tree);
	
			zTreeObj = $.fn.zTree.getZTreeObj(clssName.tree); //那个树对象
			console.log(zTreeObj)
			var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
	
			function checkNode(e) {
				var zTree = $.fn.zTree.getZTreeObj(clssName.tree),
					type = e.data.type,
					nodes = zTree.getSelectedNodes();
				if(type.indexOf("All") < 0 && nodes.length == 0) {
					alert("请先选择一个节点");
				}
				if(type == clssName.allTrueBtn) {
					zTree.checkAllNodes(true);
					$('#'+clssName.allFalseBtn).show();
					$('#'+clssName.allTrueBtn).hide();
				} else if(type == clssName.allFalseBtn) {
					zTree.checkAllNodes(false);
					$('#'+clssName.allFalseBtn).hide();
					$('#'+clssName.allTrueBtn).show();
				}
			}
			$("#"+clssName.allTrueBtn).bind("click", {
				type: clssName.allTrueBtn
			}, checkNode);
			$("#"+clssName.allFalseBtn).bind("click", {
				type: clssName.allFalseBtn
			}, checkNode);
			
			
		});
		
	}
    
    $scope.takeValue = function (type){
    	var checkedNode = zTreeObj.getCheckedNodes(true);
		console.log(checkedNode);
		$scope.variablePacket.evaluate[type+'Options'] = false;
    };
    
    //导入试卷及答题卡滚动条调用
	$scope.scrollBar = function (type){
		$timeout(function (){
			angular.element("#"+type+"Tree").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "dark-thin"			//滚动条样式
			});
		});
	};
    
//  Ztree()

	//年级、学科、学校 选择按钮点击事件
	$scope.chooseOptions = function (type){
		if($scope.variablePacket.evaluate[type+'Options']){
			$scope.variablePacket.evaluate[type+'Options'] = false;
		}else{
			$scope.variablePacket.evaluate[type+'Options'] = true;
			Ztree(type);
			$scope.scrollBar(type);
		}
//		$scope.variablePacket.evaluate[type+'Options'] = !$scope.variablePacket.evaluate[type+'Options'];
	};

	//评价次数单选事件
	$scope.evaluationTimesFn = function (i){
		$scope.variablePacket.evaluate.defaultTimes = i;
		$scope.variablePacket.evaluate.verifyTimes = false;
	};
	
}]);


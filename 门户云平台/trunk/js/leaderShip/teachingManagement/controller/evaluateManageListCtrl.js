app.controller('evaluateManageListCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	
	//变量包
    $scope.variablePacket = {
    	//添加标准弹框变量数据
		standard : {							
			criterionBox :false,					//添加标准弹框
			arrGrade : [{name:'一年级',id:'1'},{name:'三年级',id:'2'},{name:'五年级',id:'3'}],	//年级数据
			arrSubject : [{name:'英语',id:'1'},{name:'数学',id:'2'},{name:'逻辑',id:'3'}],	//学科数据
			arrStandard : [{name:'可以',id:'1'},{name:'不可以',id:'2'}],	//评价标准数据
			verifyGrade : false,				//验证年级
			verifySubject : false,				//验证学科
			verifyStandard : false,				//验证评价标准
			verifyFile : false,					//验证上传Excel
			defaultGrade : '',					//年级默认值
			defaultSubject : '',				//学科默认值
			defaultStandard : '',				//评价标准默认值
			defaultFile : '事发后撒的佛圣诞节在新东方说的 ',		//上传的excel
		},
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
			defaultTimes : -1,				//评价次数默认值
		},
    };
    
    //添加标准弹框事件
    $scope.criterionBoxFn = function (){
    	$scope.variablePacket.standard.criterionBox = true;
    };
    
    //下发评价弹框事件
    $scope.evaluateBoxFn = function (){
    	$scope.variablePacket.evaluate.evaluateBox = true;
    };
    
    //添加标准弹--删除添加标准附件
    $scope.evaluationAppendixFn = function (i,type){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.defaultFile = '';
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true);
		};
	};
	
	//下发评价弹框--评价次数单选事件
	$scope.evaluationTimesFn = function (i){
		$scope.variablePacket.evaluate.defaultTimes = i;
		$scope.variablePacket.evaluate.verifyTimes = false;
	};
	
	//js变量
	var varpage = {
		checkLength : 0,		//已选长度
	};
	//下发评价框--学校--区域单选事件
	$scope.belongedActiveFn = function (i){
		$scope.variablePacket.evaluate.arrSchool.belongedActive = i;
//		$scope.variablePacket.evaluate.arrSchool.schoolList = i == 0 ? false : true;
		if(i == 0){
			$scope.variablePacket.evaluate.arrSchool.schoolList = false;
			$scope.variablePacket.evaluate.verifySchool = false;
		}else{
			$scope.variablePacket.evaluate.arrSchool.schoolList = true;
		}
		varpage.checkLength = 0;	
		$scope.variablePacket.evaluate.arrSchool.schoolListCheckbox = false;
		angular.forEach($scope.variablePacket.evaluate.arrSchool.schoolName,function (e,i){
			e.active = false;				
		});
	};
	
	$scope.scrollBar = function (){
		$timeout(function (){
			angular.element(".zy_school_name_list ul").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
		})
	};
	
	//下发评价框--学校--学校列表全选事件
	$scope.schoolListCheckboxAllFn = function (){
		$scope.variablePacket.evaluate.arrSchool.schoolListCheckbox = !$scope.variablePacket.evaluate.arrSchool.schoolListCheckbox;
		if($scope.variablePacket.evaluate.arrSchool.schoolListCheckbox){
			angular.forEach($scope.variablePacket.evaluate.arrSchool.schoolName,function (e,i){
				e.active = true;				
			});
			varpage.checkLength = $scope.variablePacket.evaluate.arrSchool.schoolName.length;
		}else{
			angular.forEach($scope.variablePacket.evaluate.arrSchool.schoolName,function (e,i){
				e.active = false;				
			});
			varpage.checkLength = 0;			
		}
		$scope.variablePacket.evaluate.verifySchool = varpage.checkLength <= 0 ? true : false;
	};
	
	//下发评价框--学校--学校列表多选事件
	$scope.schoolListCheckboxFn = function (i){
		$scope.variablePacket.evaluate.arrSchool.schoolName[i].active = !$scope.variablePacket.evaluate.arrSchool.schoolName[i].active;
		$scope.variablePacket.evaluate.arrSchool.schoolName[i].active ? varpage.checkLength++ : varpage.checkLength--;	
		$scope.variablePacket.evaluate.verifySchool = varpage.checkLength <= 0 ? true : false;
		$scope.variablePacket.evaluate.arrSchool.schoolListCheckbox = varpage.checkLength == $scope.variablePacket.evaluate.arrSchool.schoolName.length ? true : false;
	};
    
	//添加标准弹框--年级、学科、评价标准逐条验证提醒/下发评价弹框----年级、学科、评价标准、评价时间
	$scope.changeVerify = function (frame,type){
		if($scope.variablePacket[frame]['default' + type] == null || $scope.variablePacket[frame]['default' + type] == ''){
			$scope.variablePacket[frame]['verify' + type] = true;
		}else{
			$scope.variablePacket[frame]['verify' + type]= false;
		}
	};
	
	//添加标准提交按钮
	$scope.addStandardBtn = function (){
		if($scope.variablePacket.standard.defaultGrade == '' || $scope.variablePacket.standard.defaultGrade == null){
			$scope.variablePacket.standard.verifyGrade = true;
		}else if($scope.variablePacket.standard.defaultSubject == '' || $scope.variablePacket.standard.defaultSubject == null){
			$scope.variablePacket.standard.verifySubject = true;
		}else if($scope.variablePacket.standard.defaultStandard == '' || $scope.variablePacket.standard.defaultStandard == null){
			$scope.variablePacket.standard.verifyStandard = true;
		}else if($scope.variablePacket.standard.defaultFile == ''){
			$scope.variablePacket.standard.verifyFile = true;
		}else{
			$scope.variablePacket.standard.criterionBox = false;
			$scope.variablePacket.standard.defaultGrade = '';			
			$scope.variablePacket.standard.defaultSubject = '';					
			$scope.variablePacket.standard.defaultStandard = '';
			$scope.wranShow('添加成功',true);
		}
	};
	
	//
	$scope.addEvaluateBtn = function (){
		console.log(varpage.checkLength)
		if($scope.variablePacket.evaluate.defaultGrade == '' || $scope.variablePacket.evaluate.defaultGrade == null){
			$scope.variablePacket.evaluate.verifyGrade = true;
		}else if($scope.variablePacket.evaluate.defaultSubject == '' || $scope.variablePacket.evaluate.defaultSubject == null){
			$scope.variablePacket.evaluate.verifySubject = true;
		}else if($scope.variablePacket.evaluate.defaultStandard == '' || $scope.variablePacket.evaluate.defaultStandard == null){
			$scope.variablePacket.evaluate.verifyStandard = true;
		}else if($scope.variablePacket.evaluate.arrSchool.belongedActive < 0){		//学校区域
			$scope.variablePacket.evaluate.verifySchool = true;
		}else if($scope.variablePacket.evaluate.arrSchool.belongedActive > 0 && $scope.variablePacket.evaluate.arrSchool.schoolListData && varpage.checkLength <= 0){		//学校区域下学校列表
			$scope.variablePacket.evaluate.verifySchool = true;
		}else if($scope.variablePacket.evaluate.defaultTime == '' || $scope.variablePacket.evaluate.defaultTime == null){		
			$scope.variablePacket.evaluate.verifyTime = true;
		}else if($scope.variablePacket.evaluate.defaultTimes < 0 || $scope.variablePacket.evaluate.defaultTimes == null){		
			$scope.variablePacket.evaluate.verifyTimes = true;
		}else{
			$scope.variablePacket.evaluate.evaluateBox = false;
			$scope.variablePacket.evaluate.defaultGrade = '';			
			$scope.variablePacket.evaluate.defaultSubject = '';					
			$scope.variablePacket.evaluate.defaultStandard = '';
			$scope.variablePacket.evaluate.defaultTime = '';
			
			$scope.wranShow('添加成功',true);
		}
	};

}]);

app.controller('evaluateManageListCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	
	//变量包
    $scope.variablePacket = {
    	//添加标准弹框变量数据
		standard : {							
			criterionBox :false,					//添加标准弹框
			arrGrade : [],	//年级数据
			arrSubject : [],	//学科数据
			arrStandard : [],	//评价标准数据
			arrStandardTerm:[{name:'上学期',id:'上学期'},{name:'下学期',id:'下学期'}],
			verifyGrade : false,				//验证年级
			verifySubject : false,				//验证学科
			verifyTerm : false,					//验证学期
			verifyStandard : false,				//验证评价标准
			verifyFile : false,					//验证上传Excel
			defaultGrade : '',					//年级默认值
			defaultSubject : '',				//学科默认值
			defaultStandard : '',				//评价标准默认值
			defaultFile : '',					//上传的excel
			defaultTerm:'',//学期
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
    $scope.userRole="市领导";
    $scope.schoolId= "";
    $scope.gradeName="";
    $scope.subjectName="";
    $scope.standardName="";
    $scope.gradeList=[];
    $scope.subjectList=[];
    $scope.evaluateList=[];
    $scope.term="上学期";
    $scope.termList=[{id:'上学期',name:"上学期"},
    				 {id:'下学期',name:"下学期"}];
    $scope.standardList=[{id:'学业发展水平',name:"学业发展水平"},
    					 {id:'身心发展水平',name:"身心发展水平"},
    					 {id:'品德发展水平',name:"品德发展水平"},
    					 {id:'兴趣特长养成',name:"兴趣特长养成"}];
    if($scope.userRole="市领导"){//市级别的
		$scope.gradeList = [{id:'一年级',name:"一年级"},
							{id:'二年级',name:"二年级"},
							{id:'三年级',name:"三年级"},
							{id:'四年级',name:"四年级"},
							{id:'五年级',name:"五年级"},
							{id:'六年级',name:"六年级"},
							];
		
    }else{
    	$scope.gradeList = [{id:'一年级',name:"一年级"},
							{id:'二年级',name:"二年级"},
							{id:'三年级',name:"三年级"},
							{id:'四年级',name:"四年级"},
							{id:'五年级',name:"五年级"},
							{id:'六年级',name:"六年级"},
							{id:'初一',name:"初一"},
							{id:'初二',name:"初二"},
							{id:'初三',name:"初三"},
							];
							
		$scope.schoolId="";//获取校级管理员的学校Id
    }
    findEvaluateList();
    //点击年级
    $scope.changeGrade = function (){
		//alert($scope.gradeName);
		findSubject($scope.gradeName);
	};
    //通过年级获取年级下的学科
    function findSubject(gradeName){
    	//alert(gradeName);
    	if(gradeName=="校本课程"){
    		$http.post(suzhiIp + '/EvaluationManagerContr/getXiaoBen.do', {
				grade: gradeName
			}).success(function(data) {
				//console.info(data);
				if(data != null && data != ""){
					$scope.variablePacket.standard.arrSubject=data;
				}
			});
    		
    	}else{
    		//获取年级
			$http.post(suzhiIp + '/EvaluationManagerContr/getSubjectExcel.do', {
				grade: gradeName
			}).success(function(data) {
				//console.info(data);
				if(data != null && data != ""){
					$scope.subjectList=data;
					$scope.variablePacket.standard.arrSubject=data;
				}
			});
    	}
	}
    //点击查询
    $scope.changeFind = function(){
    	//console.log($scope.subjectName)
    	findEvaluateList();
    }
    //查找列表的方法
    function findEvaluateList(){
    	$http.post(suzhiIp + '/EvaluationManagerContr/findEvaluateList.do', {
	    		term:$scope.term,	
				gradeName: $scope.gradeName,
				subjectName:$scope.subjectName,
				standardName:$scope.standardName,
				schoolId:$scope.schoolId
		}).success(function(data) {
				//console.info(data);
				$scope.evaluateList=data;
		});	
    }

    //添加标准弹框事件
    $scope.criterionBoxFn = function (){
    	$scope.variablePacket.standard.criterionBox = true;
    	$scope.variablePacket.standard.arrGrade=$scope.gradeList;
    	
    };
    //添加标准里面的点击年级
    $scope.changeStandardGrade = function(frame,type){
    	//alert($scope.variablePacket.standard.defaultGrade);
    	findSubject($scope.variablePacket.standard.defaultGrade);
    	$scope.changeVerify(frame,type);
    }
    //添加标准里面的学期
    $scope.changeStandardTerm = function(frame,type){
    	
    	$scope.changeVerify(frame,type);
    };
    //添加标准里面的标准
    $scope.changeStandard = function(frame,type){
    	
    	$scope.changeVerify(frame,type);
    };
   
    //
    $scope.changeStandardSubject = function(frame,type){
    	var subject =$scope.variablePacket.standard.defaultSubject;
    	if("体育"==subject||"心理"==subject||"身心发展"==subject){
			$scope.variablePacket.standard.arrStandard=[{id:"身心发展水平",name:"身心发展水平"}];
		}else{
			if("兴趣养成"==subject){
				$scope.variablePacket.standard.arrStandard=[{id:"兴趣特长养成",name:"兴趣特长养成"}];
			}else{
				if("品德发展"==subject){
					$scope.variablePacket.standard.arrStandard=[{id:"品德发展水平",name:"品德发展水平"}];
				}else{
					$scope.variablePacket.standard.arrStandard=[{id:"学业发展水平",name:"学业发展水平"}];
				}
			}
		}
		$scope.changeVerify(frame,type);
    }
    
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
				theme: "dark-thin"			//滚动条样式
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
		//alert(111);
		
		
	};
	//点击打开文件触发
	$scope.fileChanged = function(ele){
		var form = new FormData();
       	var file = document.getElementById("file").files[0];
       	$scope.variablePacket.standard.defaultFile=file.name;
       	if($scope.variablePacket.standard.defaultFile!=""){
       		$scope.variablePacket.standard.verifyFile=false;
       	}
       	$scope.$apply();
       	//alert(file.name);
	}
	
	//添加标准提交按钮
	$scope.addStandardBtn = function (){
		
		/*alert($scope.variablePacket.standard.defaultGrade);
		alert($scope.variablePacket.standard.defaultSubject);
		alert($scope.variablePacket.standard.defaultStandardTerm);
		alert($scope.variablePacket.standard.defaultStandard);*/
		var selectGrade=$scope.variablePacket.standard.defaultGrade;
		var selectSubject=$scope.variablePacket.standard.defaultSubject;
		var selectTerm=$scope.variablePacket.standard.defaultTerm;
		var selectStandard=$scope.variablePacket.standard.defaultStandard;
		var selectFile = $scope.variablePacket.standard.defaultFile;
		if(selectGrade==""){
			//alert("请选择年级");
			$scope.variablePacket.standard.verifyGrade=true;
			return;
		}else{
			$scope.variablePacket.standard.verifyGrade=false;
		}
		if(selectSubject==""){
			//alert("请选择学科");
			$scope.variablePacket.standard.verifySubject=true;
			return;
		}else{
			$scope.variablePacket.standard.verifySubject=false;
		}
		if(selectTerm==""){
			//alert("请选择学期");
			$scope.variablePacket.standard.verifyTerm=true;
			return;
		}else{
			$scope.variablePacket.standard.verifyTerm=false;
		}
		if(selectStandard==""){
			//alert("请选择标准");
			$scope.variablePacket.standard.verifyStandard=true;
			return;
		}else{
			$scope.variablePacket.standard.verifyStandard=false;
		}
		if(selectFile==""){
			$scope.variablePacket.standard.verifyFile=true;
			return;
		}else{
			$scope.variablePacket.standard.verifyFile=false;
		}
		var zong="";
		if($scope.userRole=="市领导"){
			zong = selectGrade+"("+selectTerm+")"+selectSubject+selectStandard;
		}else{
			zong = "本校"+selectGrade+"("+selectTerm+")"+selectSubject+selectStandard;
		}
		if($scope.userRole=="市领导"){
			findEvaluateByName(zong);
		}else{
			var form = new FormData();
       		var file = document.getElementById("file").files[0];
        	//$scope.variablePacket.standard.defaultFile=file.name;
        	form.append('file', file);
        	$http({
            	method: 'POST',
            	url: suzhiIp + 					'EvaluationManagerContr/schoolAddExcel.do?subject='+encodeURI(encodeURI(selectSubject)								)					+'&zong='+encodeURI(encodeURI(zong))+'&schoolId='+schoolId+'',
            	data: form,
           		headers: {'Content-Type': undefined},
            	transformRequest: angular.identity
        	}).success(function (data) {
            	if(data=="1"){
             		$scope.wranShow('添加成功',true);
            	}else{
             		$scope.wranShow('请选择正确的表格再导入',true);
            	}
        	}).error(function (data) {
            	console.log('upload fail');
        	})  
		}
	};
	//如果是市级领导要导入评价查看库里是否有
	function findEvaluateByName(name){
		$http.post(suzhiIp + 'EvaluationManagerContr/findevaluateByname.do', {
			zong: name
		}).success(function(data) {
			//console.info(data);
			if(data=="1"){
				$scope.wranShow('此内容已经存在',true);
			}else{
				$scope.addStandardBtn();
			}
		});
	}
}]);

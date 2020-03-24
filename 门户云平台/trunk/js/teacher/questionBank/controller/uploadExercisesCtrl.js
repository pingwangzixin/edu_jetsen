app.controller('uploadExercisesCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
    //导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	
	//变量包
	$scope.variablePacket = {
		questionType : [],		//习题分类
		questionTypeIndex : 0,			//习题类型切换
		fillInput : '',			//填空题插入分割线的input
		gestalt : [{}],	
	 	leftTreeShow : {					//左侧树展示
            teachingMaterial : true,		//版本选择框
            treeOne : false,					//版本选择框下的树
            treeKnowledgePoint : false,		//知识点树
            other : false,						//其他
       },
       multiAnswer:'',
       typeName:'',
       stemWarn:false,
       clozeOptNum:1,
       readOptNum:5,
       userId : JSON.parse(sessionStorage.getItem('managerSearch')).id,
       selectedSubject :'',
       treeSubject:{},
       subMapTem:{}
	};
	
	//习题对象
	$scope.example= {
		stem:'',
		analysis:'',
		answer:''
	}
	

	//参数
	$scope.params = {
		areaCodes:'',
		areaNames:'',
		body:'',
		type:'',
		createUser:'',
		createBy:'',
		subjIds:'',
		subjNames:'',
		gradeJson:'',
		analysis:'',
		answer:'',
		optionNum :''
	}
	
	/**
	 * 查询题型
	 */
	$http.get(questionUrl+"a/quzType?token=29B5DF07F7FC514807CE5FBC12EA1506").success(function (data) {
	 	var datas = data.data;
	 	var list = [];
	 	var json = {};
	 	for (var e=0;e<datas.length;e++) {
	 		json.id  = datas[e].id;
	 		json.name = datas[e].name;
	 		list.push(json);
	 		json = {};
	 	}
	 	$scope.params.type = datas[0].id;
	 	$scope.variablePacket.questionType =list;
    });
    
    /**
     * 选择学科
     * @param {Object} subId
     */
    $scope.changeSubject = function(subId){
    	if(typeof(subId)=="undefined"|| subId == null){
    		$scope.variablePacket.subjectWarn = true;
    		$scope.variablePacket.selectedSubject=null;
    	}else{
    		$scope.variablePacket.treeSubject = $scope.variablePacket.subMapTem[subId];
    		$scope.variablePacket.subjectWarn = false;
    	}
        $rootScope.initchoiceVersion();
    }
    
   /**
    * 查询当前教师的 授课信息
    */
    $http.get(zyxrequireIp + '/uc/user/'+$scope.variablePacket.userId).success(function(suc) {
    	$scope.variablePacket.selectSubject=[];
        if(suc.ret == 200) {
        	var data = suc.data;
        	$scope.params.createBy = data.id;
        	$scope.params.createUser = data.realname;
        	$scope.params.areaCodes =data.cityId+","+data.countyId+","+data.officeId;
			$scope.params.areaNames = data.cityName+"//"+data.countyName+"//"+data.officeName;
//			console.info($scope.params);
    		angular.forEach(data.userCourse, function(item){
    			if(typeof($scope.variablePacket.subMapTem[item.subjectId])=="undefined"){
    				var subj = {
	                    id:item.subjectId,
	                    name :item.subjectName,
	                    vid :item.versionId,
	                    vname:item.versionName,
	                    gname:item.gradeName,
	                    gid:getGradeNo(item.gradeName),
	                    lid :"level_"+item.stage,
	                    lname:getLeveName(item.stage),
	                    areaId :data.cityId,
	                    areaName:data.cityName,
	                    countyId:data.countyId,
	                    countyName:data.countyName,
	                    officeId:data.officeId,
	                    officeName:data.officeName
	                    
	                };
	                $scope.variablePacket.selectSubject.push(subj);
	                $scope.variablePacket.subMapTem[item.subjectId] = subj;
    			}
                
            });
        }
    });
    
    /**
     * 根据年级获取 年级段
     */
	function getGradeNo(gradeName) {
		var gradeNo = "";
			switch (gradeName) {
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
			switch (levelId) {
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
	
	/**
	 * 获取左侧 id name	getGradeNo
	 */
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.params.subjIds = ids;
    	$scope.params.subjNames = names;
    	$scope.params.gradeJson = gradeJson;
    };
	

	/**
	 * 警示框函数（定时自动关闭）
	 * @param {Object} texts   //参数一：第二行文字，大字;
	 * @param {Object} srcpic  //参数二：感叹图片为false，对勾的图片是true;
	 * @param {Object} title   //参数三：第一行文字，小字（没有可不传参）;
	 */
	function wranShow(texts,srcpic,title){	
		$scope.variablePacket.warn = true;
		$scope.variablePacket.warn_title = title || '';
		$scope.variablePacket.warn_text = texts;
		$scope.variablePacket.warn_src = srcpic;
		$timeout(function (){
			$scope.variablePacket.warn = false;
		},1500);
	}
	
	/**
	 * 习题类型切换事件
	 */
	$scope.questionTypeIndexTab = function (i){
		$scope.variablePacket.questionTypeIndex = i;
		var types = $scope.variablePacket.questionType;
		$scope.variablePacket.typeName = types[i].name;
		$scope.params.type = types[i].id;
		
		$scope.initExample();
	};
	
	/**
	 * 填空题input插入分割线
	 */
	$scope.insertLine = function (){
		$scope.example.answer += ' | ';
//		$('#s').focus();
	};
	
	/**
	 * 填空题插入填空
	 */
	$scope.insertBlanks = function(){
		$scope.example.stem = $scope.example.stem.replace('<br/></p>','</p>');
		$scope.example.stem = $scope.example.stem.substring(0,$scope.example.stem.lastIndexOf("</p>")) +' __ '+'</p>';
	}
	
	/**
	 * 完形填空增加选项
	 */
	$scope.addOption = function (){
		if($scope.variablePacket.gestalt.length < 20){
			$scope.variablePacket.gestalt.push({});
		}else{
			wranShow('至多添加20个选项',false);
		}
	};
	
	/**
	 * 完形填空减少选项
	 */
	$scope.deleteOption = function (){
		if($scope.variablePacket.gestalt.length > 1){
			$scope.variablePacket.gestalt.pop();
		}else{
			wranShow('请至少保留一个选项',false,'aaa');
		}
	};
	
	/**
	 * 完型填空，阅读理解 答案拼接
	 * @param {Object} inputName
	 */
	$scope.clozeRead = function(inputName){
		var optNum = '';
		$scope.example.answer = '';
		var clozeOptNum = $scope.variablePacket.gestalt.length;
		var optNull = false;
		for(var i=0;i<clozeOptNum;i++){
			var clozeOpt = typeof($scope.variablePacket.gestalt[i].option)=="undefined"?'':$scope.variablePacket.gestalt[i].option;
			if(clozeOpt!=""){
				if(i==clozeOptNum-1){
					optNum+=angular.element('input[name="'+inputName+i+'"]').length;
					$scope.example.answer +=  clozeOpt;
				}else{
					optNum+=angular.element('input[name="'+inputName+i+'"]').length+',';
					$scope.example.answer +=  clozeOpt+',';
				}
			}else{
				optNull = true;
				break;
			}
		}
		if(optNull){
			$scope.example.answer = '';
		}
		return optNum;
	}
	
    /**
     * 保存试题
     */
    $scope.saveQuz = function(){
    	//习题类型index
    	var qusTypeIndex = $scope.variablePacket.questionTypeIndex;
    	var optNum = 0;
    	var body = {};
    	switch (qusTypeIndex){
    		case 0:
    			optNum = angular.element('input[name="single"]').length;
    			break;
    		case 1:
    			var $item = angular.element('input[name="multi"]');
    			optNum = $item.length;
    			$scope.example.answer = '';
    			for(var i=0;i<optNum;i++){
    				if($item[i].checked){
    					$scope.example.answer +=  $item[i].value+',';
    				}
    			}
				if($scope.example.answer != ''){
    				$scope.example.answer = $scope.example.answer.substring(0,$scope.example.answer.length-1);
    			}
    			break;
    		case 2:
    			optNum = angular.element('input[name="judge"]').length;
    			break;
    		case 3:
    			optNum = $scope.example.answer.split("|").length;
    			break;
    		case 4:
    			optNum = 1;
    			break;
    		case 5:
    			optNum = 1;
    			break;
    		case 6:
    			optNum = $scope.clozeRead('cloze');
    			break;
    		case 7:
    			/*body.options= [];
    			for(var i=1;i<=$scope.variablePacket.readOptNum;i++){
    				var optObj =$scope['read'+i];
    				if(optObj.question!=''&&optObj.answer!=''){
    					optObj.optNum = angular.element('input[name="read'+i+'"]').length;
    					body.options.push(optObj);
    				}
    			}
    			optNum = body.options.length;
    			$scope.example.answer = '';*/
    			optNum = $scope.clozeRead('read');
    			
    			break;
    		default:
    			break;
    	}
    	
    	//校验题干
    	if($scope.example.stem == ''){
    		$scope.variablePacket.stemWarn = true;
    		return;
    	}
    	$scope.variablePacket.stemWarn = false;
    	
    	//校验答案
    	if($scope.example.answer == ''){
    		$scope.variablePacket.answerWarn = true;
    		return;
    	}
    	
    /*	if(qusTypeIndex==7&&body.options.length == 0){
    		$scope.variablePacket.answerWarn = true;
    		return;
    	}*/
    	$scope.variablePacket.answerWarn = false;
    	
    	//校验学科
    	if(typeof($scope.variablePacket.selectedSubject)=="undefined" || $scope.variablePacket.selectedSubject == null){
    		$scope.variablePacket.subjectWarn = true;
    		return;
    	}
    	$scope.variablePacket.subjectWarn = false;
    	
    	//校验章节
    	if($scope.params.subjIds == ''){
    		$scope.variablePacket.chapterWarn = true;
    		return;
    	}
    	$scope.variablePacket.chapterWarn = false;
    	
    	//题干
    	$scope.params.body=$scope.example.stem;
		//解析
		$scope.params.analysis=$scope.example.analysis;
		//答案
		$scope.params.answer=$scope.example.answer;
		//选项数量
		$scope.params.optionNum = optNum;
		//保存试题方法
		$http.post(questionUrl+'/a/quz',JSON.stringify($scope.params),{headers:{'Content-Type':'application/json'}}).success(function(resJson){
			if(resJson.code == 200){
				$scope.wranShow('添加成功',true);
				//添加完成后清除页面信息
				$scope.initExample();
			}
		})
    }
    
    /**
     * 生成给定数字数的数组
     * @param {Object} num
     */
    $scope.newNumArr = function(num){
    	for(var i=1;i<=num;i++){
    		$scope['read'+i] = {question:'',answer:'',optNum:0};
    	}
    }
    
    /**
	 * 初始化习题对象
	 */
	$scope.initExample = function(){
		
		$scope.params.body = '';
		$scope.params.analysis = '';
		$scope.params.answer = '';
		$scope.params.optionNum = '';
		$scope.params.subjIds = '';
		$scope.variablePacket.selectedSubject = '';
		$scope.variablePacket.stemWarn = false;
		$scope.variablePacket.answerWarn = false;
		$scope.variablePacket.chapterWarn = false;
		$scope.variablePacket.subjectWarn = false;
		$scope.variablePacket.gestalt = [{}];
		var $item = angular.element('input[name="multi"]');
		angular.forEach($item,function(value,key){
			$item[key].checked = false;
		})
		angular.forEach($scope.example,function(value,key){
			$scope.example[key] = '';
		})
		$rootScope.clear.p(); 
		$scope.newNumArr($scope.variablePacket.readOptNum);
	}
	
	
	//点击章节目录时先验证学科
	$scope.verifySubject=function(){
		 if($scope.variablePacket.selectedSubject==null || $scope.variablePacket.selectedSubject==""){
		 	$scope.variablePacket.subjectWarn = true;
		 }else{
		 	$scope.variablePacket.subjectWarn = false;
		 };
		 if(angular.element('.titleSpan').find('em')[2].innerHTML=="节"){
		 	 $scope.variablePacket.chapterWarn =true;
		 }else{
		 	  $scope.variablePacket.chapterWarn =false;
		 };
	};
//	$scope.initExample();
}]);



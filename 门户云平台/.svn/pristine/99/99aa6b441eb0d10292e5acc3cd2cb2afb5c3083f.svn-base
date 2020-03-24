app.controller('answerCardCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','myQuzService',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,myQuzService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	
	//导航显示
	$scope.navShowDet = {
		title : '王小小的空间',	//最左侧标题
		secondTitle : '是来看大家好',	//左侧标题旁边二级标题
		middleAdmin : false,	//中间的 机构、用户、角色管理  （布尔值：是否展示，true展示）
		goBackCloud : true		//右边的 捷成教育云返回 （布尔值：是否展示，true展示）
	};
	$scope.$emit('nav',$scope.navShowDet);
	//以上放最上面
	
	//变量包
	$scope.variablePacket={
		state : $stateParams.state,	//新建页面new，查看see，编辑edit
		questionTypeIndex : 0,			//习题类型切换
		questionType : [{name:'单选题',tit:''},{name:'多选题',tit:''},{name:'判断题',tit:''},{name:'填空题',tit:''},{name:'材料题',tit:''},{name:'简答题',tit:''},{name:'完形填空',tit:''},{name:'阅读理解',tit:''}],									//习题分类、大题题号
		titFix : false,					//导入试卷、答题卡标题窗口定位
		floatBox : false,				//题型选项小浮窗
		floatBoxPos : false,			//题型选项小浮窗位置
		floatBoxPos : false,			//题型选项小浮窗位置
		floatBoxText : '展开选项',			//题型选项小浮窗文字提示
		switchOption : -1,				//题型小浮窗题型切换
		optionPointLeft : false,		//题型小浮窗左箭头控制
//		optionPointRight : $scope.variablePacket.questionType.length > 6 ? true : false,		//题型小浮窗右箭头控制
		optionPointRight : true,		//题型小浮窗右箭头控制
		fullScreen:true,  				//全屏按钮样式切换
		picLineShow:true ,//左侧图片未上传展示
		leftTreeShow : {					//左侧树展示
			teachingMaterial : true,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
       typeMap:{},  //试题类型Map
       typeIdForEnMap :{}, //试题Id转英文Map
       paramsListMap:{imgList:[],optList:[]}, //上传参数列表Map  imgList为上传图片list  optList为答题卡选项list
       manyOptArr:[], //多选题选项数组
       cancel:'del',//取消按钮类型 默认 为删除操作
       ProvingName:false, //试卷名称校验
       ProvingSubject:false,//学科校验
       ProvingChapter:false,//章节校验
       ProvingPic:false,//图片校验
       ProvingAnswerCard:false,//答题卡校验
       examId : $stateParams.testId, //试卷Id  
       subMapTem:{}, //学科Map 用于回显学科时使用
       callBackTypeArr:[],  //回显题型列表
       defaultOptNum :4, //默认选项数量
       libraryTitleBar:['课本','章','节'],
       examName:'',
       createUser:'',
       createDate:''
       
	}
	
	//页面图片展示集合
	$scope.picdata = [];
    
    //选项数组
   $scope.optLetter = ['A','B','C','D','E','F','G','H'];
   
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
   
   //多选题默认选项拼接
   for(var i=0;i<$scope.variablePacket.defaultOptNum;i++){
   		var maTem = {id:$scope.optLetter[i],checked:false};
   		$scope.variablePacket.manyOptArr.push(maTem);
   }
 /************************************************************************zxl********************************************************************/
    var createBy = JSON.parse(sessionStorage.getItem('managerSearch')).id;
    
    /**
     * 查询试卷
     */
    $scope.findExamById = function(){
    	myQuzService.getExamById($scope.variablePacket.examId,function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				$scope.variablePacket.examName = data.name;
				$scope.variablePacket.createUser = data.createUser;
				$scope.variablePacket.createDate = data.createDate;
                if($scope.variablePacket.state != "see"){
                    $scope.selectedSubject = $scope.variablePacket.subMapTem[data.subjIds.split(",")[2]];
                    $scope.selectedSubject.subjIds = data.subjIds;
                    $scope.selectedSubject.subjNames = data.subjNames;
                }
				$scope.params.name = data.name;
				$scope.params.subjIds = data.subjIds;
				$scope.params.subjNames = data.subjNames;
				var arr = data.subjNames.split('//');
				$scope.variablePacket.libraryTitleBar =[arr[4],arr[5],arr[6]];
				var imgList = data.imgList;
				angular.forEach(imgList,function(imgTem,index){
					$scope.picdata.push({src:uploadPreviewUrl+imgTem.name});
					$scope.variablePacket.paramsListMap.imgList.push({name:imgTem.name});
				})
				if($scope.picdata.length>0){
					$scope.variablePacket.picLineShow =false;
				}
				
				var otpList = data.optList;
				var typeMapTem = {};
				angular.forEach(otpList,function(optTem,index){
					var typeEn = $scope.variablePacket.typeIdForEnMap[optTem.type];
					if(typeMapTem[typeEn]===undefined){
						$scope.variablePacket.callBackTypeArr.push(typeEn);
						typeMapTem[typeEn] = typeEn;
					}
					optTem.showAnswer=false;
					optTem.edit=false;
					optTem.typeName=$scope.variablePacket.typeMap[optTem.type];
					optTem.cancel=$scope.variablePacket.cancel;
					$scope.updateAnswerCardShowFormat(optTem,typeEn); 
					$scope.questionBank[typeEn].push(optTem);
				})
				//答题卡回显
				$scope.cardCallBack();
			}
		},function(){
			
		})
    }
    
    
    /**
    * 修改答题卡回显
    * @param {Object} index
    * @param {Object} type
    */
   $scope.updateAnswerCardShowFormat = function(item,type){
   		switch (type){
   			//单选题
   			case 'single':
   				break;
   			//多选题
   			case 'many':
   				 $scope.cardManyUpdateShow(item);
   				break;
   			//判断题	
   			case 'judge':
   				break;
   			//填空题
   			case 'fill':
	   			if(item.answer!==undefined&&item.answer!=""){
	   				item.answerArr = item.answer.split('|');
	   			}
   				break;
   			//材料题
   			case 'material':
   			//简答题
   			case 'answer':
   				break;
   			//完型填空
   			case 'gestalt':
   			//阅读理解
   			case 'read':
   				$scope.cardGesReadUpdateShow(item);
   				break;
   			default:
   				break;
   		}
   }
   
   	/**
   	 * 多选题回显答案处理
   	 * @param {Object} item
   	 */
    $scope.cardManyUpdateShow = function(item){
    	item.optArr = [];
    	item.answerArr = [];
    	for(var i=0;i<item.optionNum;i++){
    		var optTem = {id:$scope.optLetter[i],checked:false};
			if(item.answer.indexOf($scope.optLetter[i])!=-1){
				optTem.checked = true;
				item.answerArr.push($scope.optLetter[i]);
			}
			item.optArr.push(optTem);
    	}
    }
    /**
     * 阅读理解和完型填空答案回显处理
     * @param {Object} item
     */
    $scope.cardGesReadUpdateShow = function(item){
    	item.list = [];
		angular.forEach(item.answer.split(","),function(itemTem,index){
			var optMap = {option:itemTem};
			item.list.push(optMap);
		})
    }
    
   	//上传参数
	$scope.params = {
		areaCodes:'',
		areaNames:'',
		createUser:'',
		createBy:createBy,
		type:'1',
		subjIds:'',
		subjNames:'',
		answer:'',
		name:''
	}
   	//学科验证
	$scope.Subject = function(){
		if($scope.selectedSubject!=undefined){
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject==undefined){
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
	
	/**
	 * 查询老师授课方法
	 */
	$scope.findTeaCourse = function(){
		 $http.get(zyxrequireIp + '/uc/user/'+createBy).success(function(suc) {
	    	$scope.variablePacket.arrSubject=[];
	        if(suc.ret == 200) {
	        	var data = suc.data;
	        	$scope.params.createBy = data.id;
	        	$scope.params.createUser = data.realname;
	        	$scope.params.areaCodes = "0"+","+data.cityId+","+data.countyId+","+data.officeId+","+"0";
				$scope.params.areaNames = "0"+"//"+data.cityName+"//"+data.countyName+"//"+data.officeName+"//"+"0";
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
		                $scope.variablePacket.arrSubject.push(subj);
		                $scope.variablePacket.subMapTem[item.subjectId] = subj;
	    			}
	            });
	            
	        }
	     	//修改时初始化加载试卷信息
			if($scope.variablePacket.state != 'new'){
				$scope.findExamById();
			}
	    },function(){
	    	//修改时初始化加载试卷信息
			if($scope.variablePacket.state != 'new'){
				$scope.findExamById();
			}
	    });
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
	 * 查询题型
	 */
	$scope.findQueType = function (){
		$http.get(questionUrl+"a/quzType?token=29B5DF07F7FC514807CE5FBC12EA1506").success(function (data) {
		 	var datas = data.data;
		 	var json = {};
		 	for (var e=0;e<datas.length;e++) {
		 		$scope.variablePacket.typeMap[datas[e].name] = datas[e].id;
		 		$scope.variablePacket.typeMap[datas[e].id] = datas[e].name;
		 		$scope.variablePacket.typeMap[$scope.formatType(datas[e].name)] = datas[e].id;
		 		$scope.variablePacket.typeIdForEnMap[datas[e].id] = $scope.formatType(datas[e].name);
		 	}
		 	//查询教师授课
		 	$scope.findTeaCourse();
	    });
	}
	
	//默认加载查询题型
	$scope.findQueType();
    
    /**
	 * 格式化类型
	 * @param {Object} name
	 */
	$scope.formatType = function(name) {
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
				type = 'fill';
				break;
			case '材料题':
				type = 'material';
				break;
			case '简答题':
				type = 'answer';
				break;
			case '完形填空':
				type = 'gestalt';
				break;
			case '阅读理解':
				type = 'read';
				break;
			default:
				break;
		}
		return type;
	}
	
   /**
    * 上传图片
    * @param {Object} files
    */
   $scope.imgUpload = function(files){
   		var imgFile = files[0];
   	  	var data = new FormData();      //以下为像后台提交图片数据
	    data.append('file', imgFile);
	    data.append('namespace', 'Resource');
	    data.append('name', imgFile.name);
	    data.append('filename', imgFile.name);
	    data.append('lastModifiedDate',  $scope.fmtDate());
	    var format  = imgFile.name.substring(imgFile.name.lastIndexOf('.')+1,imgFile.name.length);
	    $http({
	        method: 'post',
	        url: ossIp+uploadUrl,
	        data:data,
	        headers: {'Content-Type': undefined},
	        transformRequest: angular.identity
	    }).success(function(data) {
	        if(data.status == 1){
	        	if(format == 'doc' || format == 'docx'){
	        		$scope.findTransPic(data.fileLog.id);
	        	}else{
	        		var fr = new FileReader();
					fr.readAsDataURL(imgFile);
		        	fr.addEventListener("load", function(argument) {
						$scope.picdata.push({src:this.result});
						$scope.imgError=false;
						$scope.variablePacket.picLineShow =false;
						$scope.$apply();
					});
					$scope.variablePacket.paramsListMap.imgList.push({name:"/"+data.lastModifiedDate+"/"+data.path.split(".")[0]+'.jpg'});
	        	}
				angular.element('input[type="file"]').val("");
//				$timeout(function(){
//					var imgUrl = uploadIp+uploadPreviewUrl+"/"+data.lastModifiedDate+"/"+data.path.split(".")[0]+'.jpg';
//					$scope.picdata.push({src:imgUrl});
//				},500)
//				$scope.variablePacket.picLineShow =false;
        		
	        }
	    })
   	
   	
   }
   
   /**
    * 查询文档转码图片
    */
   $scope.findTransPic = function(id){
   		$http({
    			method:'get',
    			url:transcodingUrl+id,
    		}).success(function(resJson){
    			if(resJson.code==200){
    				var state = resJson.data.state; 
    				if(state == '0'){
    					$timeout(function(){
    						$scope.findTransPic(id);
    					},1000);
    				}else if(state == '1'){
    					var docImgList = resJson.data.previewUrl.list;
    					angular.forEach(docImgList,function(docImgItem,index){
	    					$scope.picdata.push({src:docImgItem});
	    					var nameList = docImgItem.split('/');
	    					var nameTem = '';
	    					for(var i=4;i<nameList.length;i++){
	    						nameTem+='/'+nameList[i];
	    					}
	    					$scope.variablePacket.paramsListMap.imgList.push({name:nameTem});
	    				})
    					$scope.variablePacket.picLineShow =false;
    				}else{
    					$scope.wranShow('上传失败请重新上传',true);
    				}
    			}
    		})
   }
   
   /**
    * 格式化时间方法
    */
    $scope.fmtDate = function() {
        var date = new Date();
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
    }
    
   /**
    * 多选题答题卡处理
    * @param {Object} index
    * @param {Object} type
    */
   $scope.cardMany = function(index,type){
   		var $item = angular.element('input[name="many'+index+'"]');
		var answer = '';
		var answerArr = [];
		$scope.questionBank[type][index].optionNum = $item.length;
		$scope.questionBank[type][index].answer = '';
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
		$scope.questionBank[type][index].optArr = optArr;
		if(answer != ''){
			$scope.questionBank[type][index].answer = answer.substring(0,answer.length-1);
			$scope.questionBank[type][index].answerArr = answerArr;
		}
   }
   
   /**
    * 完型填空和阅读理解答题卡处理
    * @param {Object} item
    */
   $scope.cardGestaltRead = function(type,index){
   		var item = $scope.questionBank[type][index];
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
			item.answer = answer.substring(0,answer.length-1);
			item.optionNum = optionNum.substring(0,optionNum.length-1);
		}
   }
   
   /**
    * 答题卡确定按钮
    * @param {Object} index
    * @param {Object} type
    */
   $scope.answerCardSureBtn = function(index,type){
   		switch (type){
   			//单选题
   			case 'single':
   				$scope.questionBank[type][index].optionNum = angular.element('input[name="'+type+index+'"]').length;
   				break;
   			//多选题
   			case 'many':
   				 $scope.cardMany(index,type);
   				break;
   			//判断题	
   			case 'judge':
   			$scope.questionBank[type][index].optionNum = angular.element('input[name="'+type+index+'"]').length;
   				break;
   			//填空题
   			case 'fill':
	   			if($scope.questionBank[type][index].answer!==undefined){
	   				$scope.questionBank[type][index].answerArr = $scope.questionBank[type][index].answer.split('|');
	   				$scope.questionBank[type][index].optionNum = $scope.questionBank[type][index].answer.split('|').length;
	   			}
   				break;
   			//材料题
   			case 'material':
   			//简答题
   			case 'answer':
   				$scope.questionBank[type][index].optionNum = '1'
   				break;
   			//完型填空
   			case 'gestalt':
   			//阅读理解
   			case 'read':
   				 $scope.cardGestaltRead(type,index);
   				break;
   			default:
   				break;
   		}
   		$scope.questionBank[type][index].type = $scope.variablePacket.typeMap[type];
   		if($scope.questionBank[type][index].answer===undefined||$scope.questionBank[type][index].answer==""){
   			$scope.questionBank[type][index].answerWarn = true;
   			return;
   		}
   		$scope.questionBank[type][index].edit=false
   }
   
   /**
    * 上传试题
    */
   $scope.uploadExam = function(){
   		//校验学科
    	if(typeof($scope.selectedSubject)=="undefined"|| $scope.selectedSubject == null){
    		$scope.variablePacket.ProvingSubject = true;
    		return;
    	}
    	$scope.variablePacket.ProvingSubject = false;
    	
    	//校验章节
    	if($scope.params.subjIds == ''){
    		$scope.variablePacket.ProvingChapter = true;
    		return;
    	}
    	$scope.variablePacket.ProvingChapter = false;
    	
    	//校验章节
    	if($scope.params.name == ''){
    		$scope.variablePacket.ProvingName = true;
    		return;
    	}
    	$scope.variablePacket.ProvingName = false;
    	
    	//校验图片
    	if($scope.variablePacket.paramsListMap.imgList.length==0){
    		$scope.variablePacket.ProvingPic = true;
    		return;
    	}
    	$scope.variablePacket.ProvingPic = false;
    	
   		$scope.variablePacket.paramsListMap.optList = [];
   		
   		angular.element('.zy_question_card > .zy_type_pack ');
   		
   		
   		var typeOrderList = [];
   		var $typeItem = angular.element('.zy_question_card').children('.zy_type_pack');
   		angular.forEach($typeItem,function($item,index){
   			typeOrderList.push($typeItem.eq(index).attr('ng-attr-type'));
   		})
   		
   		//循环获取答题卡答案及解析
   		var optFlag = true;
   		angular.forEach(typeOrderList,function(key,index){
   			var optItem = $scope.questionBank[key];
   			if(optItem.length>0){
   				for(var i=0;i<optItem.length;i++){
   					if(optItem[i].answer === undefined){
   						optFlag = false;
   						break;
   					}else{
   						var optObj = {};
	   					optObj.answer = optItem[i].answer;
	   					optObj.optionNum = optItem[i].optionNum;
			   			optObj.analysis = optItem[i].analysis;
			   			optObj.type = optItem[i].type;
			   			$scope.variablePacket.paramsListMap.optList.push(optObj);
   					}
   				}
   			}
   		})
   		//校验答题卡
    	if($scope.variablePacket.paramsListMap.optList.length==0|| !optFlag){
    		$scope.variablePacket.ProvingAnswerCard = true;
    		return;
    	}
    	$scope.variablePacket.ProvingAnswerCard = false;
    	
   		$scope.params.questionJson = JSON.stringify($scope.variablePacket.paramsListMap);
   		
   		if($scope.variablePacket.state == 'edit'){
   			$scope.params.id = $scope.variablePacket.examId;
   			//修改试题方法
	   		myQuzService.updateExam($scope.params,function(resJson){
	   			if(resJson.code == 200){
					$scope.wranShow('修改成功',true);
					$state.go('secondNav.questionBankType');
				}
	   		})
   			
   		}else{
   			//保存试题方法
	   		myQuzService.insertExam($scope.params,function(resJson){
	   			if(resJson.code == 200){
					$scope.wranShow('添加成功',true);
					$state.go('secondNav.questionBankType');
				}
	   		})
   		}
   }
   
   /**
	 * 填空题input插入分割线
	 */
	$scope.insertLine = function (index){
		if($scope.questionBank.fill[index].answer === undefined){
			$scope.questionBank.fill[index].answer = '';
		}
		$scope.questionBank.fill[index].answer += ' | ';
	};
	
 /************************************************************************zxl--end********************************************************************/
    
	//拖拽
    $scope.sortableOptions = {
    	start: function(e,ui) {
    	 	$(ui.item).css({
    	 		'transform':'scale(0.1)',
    	 		'border':'border:2px solid red'
    	 	});
    	},
        update: function(e, ui) {
            $timeout(function() {
                var resArr = [];
                for (var i = 0; i < $scope.data.length; i++) {
                    resArr.push($scope.data[i].i);
                }
            })
        },
        stop: function(e, ui) {
           $(ui.item).css({
    	 		'transform':'scale(1)',
    	 		'border':'border:2px solid #cdd0d2'
    	 	});
        }
    }
    
	//左边照片删除移入事件
	$scope.mouseoverPic = function(obj){
		angular.element(obj.currentTarget).find('span').css('display','block')
	}
	//左边照片删除移出事件
	$scope.mouseleavePic = function(obj){
		angular.element(obj.currentTarget).find('span').css('display','none')
	}
	//左边照片删除事件
	$scope.delPic = function(obj,index){
		$scope.promptShow('确认删除',false,'');
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			angular.element(obj.target).parents('li').remove();
			$scope.wranShow('已删除',false,'');
			$scope.variablePacket.paramsListMap.imgList.splice(index,1);
			$scope.picdata.splice(index,1);
		  	if($scope.variablePacket.paramsListMap.imgList.length==0){
		    	$scope.variablePacket.picLineShow =true;
		    }
		}
	}
	
	//左边照片全屏事件
	$scope.fullScreen = function(obj){
		if(angular.element(obj.target).hasClass('icon-quanping1')){
			$scope.variablePacket.fullScreen = false;
			angular.element(obj.target).parents('.zyx_Cardtitle').css('width','1200px');
			angular.element(obj.target).parents('.zyx_picture').css('width','1200px').next('.zyx_question').css('display','none');
		}else{
			$scope.variablePacket.fullScreen = true;
			angular.element(obj.target).parents('.zyx_Cardtitle').css('width','700px');
			angular.element(obj.target).parents('.zyx_picture').css('width','700px').next('.zyx_question').css('display','block');
		}
	}
	
	//右边查看答案解析事件
	$scope.checkAnswer = function (i,b,type){
		$scope.questionBank[type][i].showAnswer = b ? false : true;
	};
	
	//右边修改小题事件
	$scope.editQuestion = function (i,type){
		$scope.questionBank[type][i].cancel = 'update';	
		$scope.questionBank[type][i].oldData = angular.copy($scope.questionBank[type][i],$scope.questionBank[type][i].oldData);
		$scope.questionBank[type][i].edit = true;		
	};
	
	//右边完形填空增加选项
	$scope.addOption = function (i,type){
		if($scope.questionBank[type][i].list.length < 20){
			$scope.questionBank[type][i].list.push({});
		}else{
			$scope.wranShow('至多添加20个选项',false);
		}
	};
	//右边完形填空减少选项
	$scope.deleteOption = function (i,type){
		if($scope.questionBank[type][i].list.length > 1){
			$scope.questionBank[type][i].list.pop();
		}else{
			$scope.wranShow('请至少保留一个选项',false);
		}
	};
	
	//右边删除小题事件
	$scope.deleteQuestion = function (i,type,tar){
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			if($scope.questionBank[type].length == 1){
				angular.element(tar.target).parents('.zy_type_pack').remove();
				for(var j=0;j<answerCardvariable.questionTypeIndex.length;j++){
					if(answerCardvariable.questionTypeIndex[j] == angular.element(tar.target).parents('.zy_type_pack').find('h4 span').text()){
						answerCardvariable.questionTypeIndex.splice(j,1);
					}
					for(var k=0;k<$scope.variablePacket.questionType.length;k++){
						if($scope.variablePacket.questionType[k].name == answerCardvariable.questionTypeIndex[j]){
							$scope.variablePacket.questionType[k].tit = answerCardvariable.answerTitleNumArr[j] + '、';
						}
					}
				}
			}
			$scope.questionBank[type].splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true);
		};
	};
	
	/**
	 * 取消按钮
	 * @param {Object} i
	 * @param {Object} type
	 * @param {Object} tar
	 */
	$scope.cancelBtn = function(btnType,i,type,tar){
		if('del' == btnType){
			if($scope.questionBank[type].length == 1){
				angular.element(tar.target).parents('.zy_type_pack').remove();
				for(var j=0;j<answerCardvariable.questionTypeIndex.length;j++){
					if(answerCardvariable.questionTypeIndex[j] == angular.element(tar.target).parents('.zy_type_pack').find('h4 span').text()){
						answerCardvariable.questionTypeIndex.splice(j,1);
					}
					for(var k=0;k<$scope.variablePacket.questionType.length;k++){
						if($scope.variablePacket.questionType[k].name == answerCardvariable.questionTypeIndex[j]){
							$scope.variablePacket.questionType[k].tit = answerCardvariable.answerTitleNumArr[j] + '、';
						}
					}
				}
			}
			$scope.questionBank[type].splice(i,1);
			$scope.variablePacket.prompt = false;
		}else{
			$scope.questionBank[type][i].edit = false;	
			$scope.questionBank[type][i]=$scope.questionBank[type][i].oldData;
		}
	}
	
	//吸顶条
	/*window.onscroll = function() {
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrollT >= Top) {
			rObj.style.position = 'fixed';
			rObj.style.top = 0;
//			rObj.style.bottom = 0;
			
			console.log(rObj.parentNode.parentNode)
			rObj.parentNode.parentNode.style.marginTop = '50px';
//			rObj.parents('.zyx_question').css({'margin-top':50});
			Cardtitle.style.position = 'fixed';
			Cardtitle.style.top = 0;
			
//			console.log($(window).height())
//			$("#question").height($(window).height())
//			$.mCustomScrollbar.defaults.scrollButtons.enable = true;
//			$("#question").mCustomScrollbar({
//				theme: "3d-dark"
//			});
		} else{
			rObj.style.position = 'static';
			rObj.style.zIndex = 1;
			Cardtitle.style.position = 'relative';
			Cardtitle.style.zIndex = 1;
		}
	}*/
	
	
	//导入试卷及答题卡滚动条调用
	$scope.scrollBar = function (){
		angular.element("#picture ul").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		angular.element(".zy_question_scroll_bar").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
	};
	$scope.scrollBar();

//	console.log($(document).height()-$(window).height())	
	//文档-窗口=需要滚动的文档+20=到底部的距离		
	//20怎么来的 我也不知道 所有分辨率都加20，推测是浏览器顶部导航？？
	//吸顶效果
	var Top = document.getElementById('zyx_CardtitleLeft').offsetTop + 250;
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		console.log(Top)
		//试卷答题卡吸顶
		if(scrollT >= Top) {
			$scope.$apply(function (){
				$scope.variablePacket.titFix = true;
			})
		}else{
			$scope.$apply(function (){
				$scope.variablePacket.titFix = false;
			});
		}
		//题型浮窗窗口定位、父级定位切换
		//这个180我也不造怎么来的... 规律（流汗）
		//50是根据页面结构需要留出来的距离
		if(scrollT+180-50 >= $(document).height()-$(window).height()){
			$scope.$apply(function (){
				$scope.variablePacket.floatBoxPos = true;
			});
		}else{
			$scope.$apply(function (){
				$scope.variablePacket.floatBoxPos = false;
			});
		}
	};
	
	//右边题型浮窗隐藏显示
	$scope.switchOptionsBox = function (){
		if($scope.variablePacket.floatBox){
			$scope.variablePacket.floatBox = false;
			$scope.variablePacket.floatBoxText = '收起选项';
			$scope.variablePacket.optionPointLeft = false;
			$scope.variablePacket.optionPointRight = true;
		}else{
			$scope.variablePacket.floatBox = true;
			$scope.variablePacket.floatBoxText = '展开选项';
		}
	};

	//判断新建页面/回显页面
	if($scope.variablePacket.state != 'new'){
		//8种题型回显
		$scope.questionBank = {
			//阅读理解
			read : [
			],
			//多选
			many : [
			],
			//填空
			fill : [
			],
			//单选
			single : [
			],
			//判断
			judge : [
			],
			//材料
			material : [
			],
			//简答
			answer : [
			],
			//完形填空
			gestalt : [
			]
		};
	}else{
		//8种题型创建
		$scope.questionBank = {
			//单选
			single : [
			],
			//多选
			many : [
			],
			//判断
			judge : [
			],
			//填空
			fill : [
			],
			//材料
			material : [
			],
			//简答
			answer : [
			],
			//完形填空
			gestalt : [
			],
			//阅读理解
			read : [
			]
		};
	}
	
	//填空题静态展示字符串切分为数组
	angular.forEach($scope.questionBank.fill,function (e,i){
		e.answerArr = e.answer.split('|');
	});
	
	//题型结构模板
	var typeStructure = {
		single : `<!--单选题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.single[$index].edit}" ng-repeat="i in questionBank.single">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index + 1">1</b>
							<span>单选题</span>
						</p> 
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.single[$index].edit && variablePacket.state!='see'">
							<li ng-click="editQuestion($index,'single')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'single',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.single[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<ul class="clearfix">
									<li ng-class="{'active': questionBank.single[$index].answer == 'A'}">A</li>
									<li ng-class="{'active': questionBank.single[$index].answer == 'B'}">B</li>
									<li ng-class="{'active': questionBank.single[$index].answer == 'C'}">C</li>
									<li ng-class="{'active': questionBank.single[$index].answer == 'D'}">D</li>
								</ul>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.single[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.single[$index].showAnswer,'single')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.single[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.single[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.single[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<b ng-if="questionBank.single[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请选择答案</span>
									</b>
								</p>
								<ul class="zy_option_election clearfix">
									{{i.option}}
									<li>
										<input type="radio" name="{{'single'+$index}}" id="{{'single_a'+$index}}" ng-model="questionBank.single[$index].answer" value="A" />
										<label for="{{'single_a'+$index}}">A</label>
									</li>
									<li>
										<input type="radio" name="{{'single'+$index}}" id="{{'single_b'+$index}}" ng-model="questionBank.single[$index].answer" value="B" />
										<label for="{{'single_b'+$index}}">B</label>
									</li>
									<li>
										<input type="radio" name="{{'single'+$index}}" id="{{'single_c'+$index}}" ng-model="questionBank.single[$index].answer" value="C" />
										<label for="{{'single_c'+$index}}">C</label>
									</li>
									<li>
										<input type="radio" name="{{'single'+$index}}" id="{{'single_d'+$index}}" ng-model="questionBank.single[$index].answer" value="D" />
										<label for="{{'single_d'+$index}}">D</label>
									</li>
								</ul>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.single[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'single')">确认</button>
							<button ng-if="questionBank.single[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'single',$event)">取消</button>
							<button ng-if="questionBank.single[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'single',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--单选题-->`,
		many : `<!--多选题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.many[$index].edit}" ng-repeat="i in questionBank.many">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>多选题</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.many[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'many')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'many',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.many[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<ul class="clearfix">
									<li ng-repeat = "i in questionBank.many[$index].optArr" ng-bind="i.id" ng-class="{'active': i.checked}"></li>
								</ul>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.many[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.many[$index].showAnswer,'many')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.many[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html = "questionBank.many[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.many[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<b ng-if="questionBank.many[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请选择答案</span>
									</b>
								</p>
								<ul class="zy_option_election clearfix">
									<li ng-repeat="i in questionBank.many[$index].optArr">
										<input ng-checked="i.checked" type="checkbox" name="{{'many'+$parent.$index}}" id="{{'many_'+i.id+$parent.$index}}" value="{{i.id}}" />
										<label for="{{'many_'+i.id+$parent.$index}}" ng-bind="i.id"></label>
									</li>
								</ul>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.many[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'many')">确认</button>
							<button ng-if="questionBank.many[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'many',$event)">取消</button>
							<button ng-if="questionBank.many[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'many',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--多选题-->`,
		judge : `<!--判断题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.judge[$index].edit}" ng-repeat="i in questionBank.judge">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>判断题</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.judge[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'judge')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'judge',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.judge[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<ul class="clearfix">
									<li ng-class="{'active': questionBank.judge[$index].answer == 'T'}">对</li>
									<li ng-class="{'active': questionBank.judge[$index].answer == 'F'}">错</li>
								</ul>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.judge[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.judge[$index].showAnswer,'judge')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.judge[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html='questionBank.judge[$index].analysis | trustHtml'></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.judge[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<b ng-if="questionBank.judge[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请选择答案</span>
									</b>
								</p>
								<ul class="zy_option_election clearfix">
									<li>
										<input type="radio" name="{{'judge'+$index}}" id="{{'judge_T'+$index}}" ng-model="questionBank.judge[$index].answer" value="T" />
										<label for="{{'judge_T'+$index}}">对</label>
									</li>
									<li>
										<input type="radio" name="{{'judge'+$index}}" id="{{'judge_F'+$index}}" ng-model="questionBank.judge[$index].answer" value="F" />
										<label for="{{'judge_F'+$index}}">错</label>
									</li>
								</ul>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.judge[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click = "answerCardSureBtn($index,'judge')">确认</button>
							<button ng-if="questionBank.judge[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'judge',$event)">取消</button>
							<button ng-if="questionBank.judge[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'judge',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>	
				<!--判断题-->`,
		fill : `<!--填空题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.fill[$index].edit}" ng-repeat="i in questionBank.fill">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>填空题</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.fill[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'fill')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'fill',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.fill[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_sub">
								<div ng-repeat="j in questionBank.fill[$index].answerArr">
									<span ng-bind="'('+($index+1)+')'"></span>
									<p ng-bind="j"></p>
								</div>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.fill[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.fill[$index].showAnswer,'fill')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.fill[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.fill[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.fill[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<span ng-click="insertLine($index)">插入分割线</span>
									<b>(多个答案之间请点击插入分割线按钮)</b>
								</p>
								<b ng-if="questionBank.fill[$index].answerWarn" >
									<i class="iconfont icon-gantanhao"></i>
									<span>请输入答案</span>
								</b>
								<input type="text" name="" id="" value="" ng-model="questionBank.fill[$index].answer" />
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.fill[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'fill')">确认</button>
							<button ng-if="questionBank.fill[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'fill',$event)">取消</button>
							<button ng-if="questionBank.fill[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'fill',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--填空题-->`,
		material : `<!--材料题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.material[$index].edit}" ng-repeat="i in questionBank.material">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1">1</b>
							<span>材料题</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.material[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'material')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'material',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.material[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_sub" ng-bind-html="questionBank.material[$index].answer | trustHtml"> 
								1.已已知（x）是定义在R上的义在R上的义在R上的义在R上的奇函数，当x≥0时，f（x）=x2 - 3x，则函数g（x） =f（x） - x+3的零点的集合为（）
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.material[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.material[$index].showAnswer,'material')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.material[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.material[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.material[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<b ng-if="questionBank.material[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请填写答案</span>
									</b>
								</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.material[$index].answer'></div>
								</div>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.material[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'material')">确认</button>
							<button ng-if="questionBank.material[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'material',$event)">取消</button>
							<button ng-if="questionBank.material[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'material',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--材料题-->`,
		answer : `<!--简答题-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.answer[$index].edit}" ng-repeat="i in questionBank.answer">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>简答题</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.answer[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'answer')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'answer',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.answer[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_sub" ng-bind-html="questionBank.answer[$index].answer | trustHtml">
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.answer[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.answer[$index].showAnswer,'answer')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.answer[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.answer[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.answer[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<b ng-if="questionBank.answer[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请填写答案</span>
									</b>
								</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.answer[$index].answer'></div>
								</div>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.answer[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'answer')">确认</button>
							<button ng-if="questionBank.answer[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'answer',$event)">取消</button>
							<button ng-if="questionBank.answer[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'answer',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--简答题-->`,
		gestalt : `<!--完形填空-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.gestalt[$index].edit}" ng-repeat="i in questionBank.gestalt">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>完形填空</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.gestalt[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'gestalt')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'gestalt',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.gestalt[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<div class="zy_small_question_option_gestalt clearfix" ng-repeat="o in questionBank.gestalt[$index].list">
									<b class="fl"  ng-bind="'('+($index+1)+')'"></b>
									<ul class="clearfix fl">
										<li ng-class="{'active': o.option == 'A'}">A</li>
										<li ng-class="{'active': o.option == 'B'}">B</li>
										<li ng-class="{'active': o.option == 'C'}">C</li>
										<li ng-class="{'active': o.option == 'D'}">D</li>
									</ul>
								</div>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.gestalt[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.gestalt[$index].showAnswer,'gestalt')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.gestalt[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.gestalt[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.gestalt[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<span ng-click="addOption($index,'gestalt')">增加选项<i class="iconfont icon-tianjia"></i></span>
									<span ng-click="deleteOption($index,'gestalt')">减少选项<i class="iconfont icon-jianshao"></i></span>
									<b ng-if="questionBank.gestalt[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请选择答案</span>
									</b>
								</p>
								<div class="zy_gestalt_answer_edit_wrap">
									<div class="zy_gestalt_answer_strip clearfix" ng-repeat="j in i.list">
										<b class="fl"  ng-bind="'('+($index+1)+')'"></b>
										<ul class="zy_option_election clearfix fl">
											<li>
												<input type="radio" name="{{'gestalt'+$parent.$index+$index}}" ng-attr-name="{{'gestalt'+$parent.$index+$index}}" ng-attr-id="{{'a'+$parent.$index+$index}}" ng-model="j.option" value="A" />
												<label ng-attr-for="{{'a'+$parent.$index+$index}}">A</label>
											</li>
											<li>
												<input type="radio" name="{{'gestalt'+$parent.$index+$index}}" ng-attr-name="{{'gestalt'+$parent.$index+$index}}" ng-attr-id="{{'b'+$parent.$index+$index}}" ng-model="j.option" value="B" />
												<label ng-attr-for="{{'b'+$parent.$index+$index}}">B</label>
											</li>
											<li>
												<input type="radio" name="{{'gestalt'+$parent.$index+$index}}" ng-attr-name="{{'gestalt'+$parent.$index+$index}}" ng-attr-id="{{'c'+$parent.$index+$index}}" ng-model="j.option" value="C" />
												<label ng-attr-for="{{'c'+$parent.$index+$index}}">C</label>
											</li>
											<li>
												<input type="radio" name="{{'gestalt'+$parent.$index+$index}}" ng-attr-name="{{'gestalt'+$parent.$index+$index}}" ng-attr-id="{{'d'+$parent.$index+$index}}" ng-model="j.option" value="D" />
												<label ng-attr-for="{{'d'+$parent.$index+$index}}">D</label>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.gestalt[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'gestalt')">确认</button>
							<button ng-if="questionBank.gestalt[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'gestalt',$event)">取消</button>
							<button ng-if="questionBank.gestalt[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'gestalt',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--完形填空-->`,
		read : `<!--阅读理解-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.read[$index].edit}" ng-repeat="i in questionBank.read">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>阅读理解</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.read[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'read')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'read',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.read[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<div class="zy_small_question_option_gestalt clearfix" ng-repeat="o in questionBank.read[$index].list">
									<b class="fl"  ng-bind="'('+($index+1)+')'"></b>
									<ul class="clearfix fl">
										<li ng-class="{'active': o.option == 'A'}">A</li>
										<li ng-class="{'active': o.option == 'B'}">B</li>
										<li ng-class="{'active': o.option == 'C'}">C</li>
										<li ng-class="{'active': o.option == 'D'}">D</li>
									</ul>
								</div>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.read[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.read[$index].showAnswer,'read')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.read[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.read[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.read[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
									<span ng-click="addOption($index,'read')">增加选项<i class="iconfont icon-tianjia"></i></span>
									<span ng-click="deleteOption($index,'read')">减少选项<i class="iconfont icon-jianshao"></i></span>
									<b ng-if="questionBank.read[$index].answerWarn" >
										<i class="iconfont icon-gantanhao"></i>
										<span>请选择答案</span>
									</b>
								</p>
								<div class="zy_gestalt_answer_edit_wrap">
									<div class="zy_gestalt_answer_strip clearfix" ng-repeat="j in i.list">
										<b class="fl"  ng-bind="'('+($index+1)+')'"></b>
										<ul class="zy_option_election clearfix fl">
											<li>
												<input type="radio" name="{{'read'+$parent.$index+$index}}" ng-attr-name="{{'read'+$parent.$index+$index}}" ng-attr-id="{{'reada'+$parent.$index+$index}}" ng-model="j.option" value="A" />
												<label ng-attr-for="{{'reada'+$parent.$index+$index}}">A</label>
											</li>
											<li>
												<input type="radio" name="{{'read'+$parent.$index+$index}}" ng-attr-name="{{'read'+$parent.$index+$index}}" ng-attr-id="{{'readb'+$parent.$index+$index}}" ng-model="j.option" value="B" />
												<label ng-attr-for="{{'readb'+$parent.$index+$index}}">B</label>
											</li>
											<li>
												<input type="radio" name="{{'read'+$parent.$index+$index}}" ng-attr-name="{{'read'+$parent.$index+$index}}" ng-attr-id="{{'readc'+$parent.$index+$index}}" ng-model="j.option" value="C" />
												<label ng-attr-for="{{'readc'+$parent.$index+$index}}">C</label>
											</li>
											<li>
												<input type="radio" name="{{'read'+$parent.$index+$index}}" ng-attr-name="{{'read'+$parent.$index+$index}}" ng-attr-id="{{'readd'+$parent.$index+$index}}" ng-model="j.option" value="D" />
												<label ng-attr-for="{{'readd'+$parent.$index+$index}}">D</label>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.read[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'read')">确认</button>
							<button ng-if="questionBank.read[$index].cancel=='del'" ng-click="cancelBtn('del',$index,'read',$event)">取消</button>
							<button ng-if="questionBank.read[$index].cancel=='update'" ng-click="cancelBtn('update',$index,'read',$event)">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--阅读理解-->`
		/*read : `<!--阅读理解-->
				<li class="zy_question_examples toggle" ng-class="{'active':questionBank.read[$index].edit}" ng-repeat="i in questionBank.read">
					<div class="zy_small_question_tit clearfix">
						<p class="fl">
							<b ng-bind="$index+1"></b>
							<span>阅读理解</span>
						</p>
						<ul class="zy_operation_list fr toggle" ng-if="!questionBank.read[$index].edit && variablePacket.state!='see'"">
							<li ng-click="editQuestion($index,'read')"><i class="iconfont icon-bianji"></i>修改</li>
							<li ng-click="deleteQuestion($index,'read',$event)"><i class="iconfont icon-shanchu"></i>删除</li>
						</ul>
					</div>
					<!--不可编辑部分-->
					<div class="zy_small_question_main toggle" ng-if="!questionBank.read[$index].edit">
						<div class="zy_small_question_stem">
							<div class="zy_small_question_option">
								<div class="zy_small_question_option_gestalt clearfix">
									<b class="fl">(1)</b>
									<ul class="clearfix fl">
										<li>A</li>
										<li>B</li>
										<li>C</li>
										<li>D</li>
									</ul>
								</div>
								<div class="zy_small_question_option_gestalt clearfix">
									<b class="fl">(1)</b>
									<ul class="clearfix fl">
										<li>A</li>
										<li>B</li>
										<li>C</li>
										<li>D</li>
									</ul>
								</div>
							</div>
							<div class="zy_view_answer">
								<p ng-class="{'active':questionBank.read[$index].showAnswer}"
									ng-click="checkAnswer($index,questionBank.read[$index].showAnswer,'read')">
									<span>查看答案及解析</span>
									<i class="iconfont icon-arrow_you"></i>
								</p>
							</div>
						</div>
						<div class="zy_small_question_answer toggle" ng-if="questionBank.read[$index].showAnswer">
							<div class="zy_small_question_analysis_box">
								<p>解析</p>
								<div class="" ng-bind-html="questionBank.read[$index].analysis | trustHtml"></div>
							</div>
						</div>
					</div>
					<!--不可编辑部分-->
					<!--可编辑部分-->
					<div class="zy_small_question_main_edit toggle" ng-if="questionBank.read[$index].edit">
						<div class="zy_small_question_answer_edit">
							<div class="zy_small_question_answer_box_edit">
								<p>
									答案<i class="star">*</i>
								</p>
								<div class="zy_read_answer_edit_wrap">
									<div class="zy_read_answer_strip clearfix">
										<b class="fl">(1)</b>
										<ul class="zy_option_election fl">
											<li>
												<input type="radio" name="single" id="pp" value="" />
												<label for="pp">A</label>
											</li>
											<li>
												<input type="radio" name="single" id="oo" value="" />
												<label for="oo">B</label>
											</li>
											<li>
												<input type="radio" name="single" id="ii" value="" />
												<label for="ii">C</label>
											</li>
											<li>
												<input type="radio" name="single" id="uu" value="" />
												<label for="uu">D</label>
											</li>
										</ul>
									</div>
									<div class="zy_read_answer_strip clearfix">
										<b class="fl">(2)</b>
										<ul class="zy_option_election fl">
											<li>
												<input type="radio" name="single" id="pp" value="" />
												<label for="pp">A</label>
											</li>
											<li>
												<input type="radio" name="single" id="oo" value="" />
												<label for="oo">B</label>
											</li>
											<li>
												<input type="radio" name="single" id="ii" value="" />
												<label for="ii">C</label>
											</li>
											<li>
												<input type="radio" name="single" id="uu" value="" />
												<label for="uu">D</label>
											</li>
										</ul>
									</div>
									<div class="zy_read_answer_strip clearfix">
										<b class="fl">(3)</b>
										<ul class="zy_option_election fl">
											<li>
												<input type="radio" name="single" id="pp" value="" />
												<label for="pp">A</label>
											</li>
											<li>
												<input type="radio" name="single" id="oo" value="" />
												<label for="oo">B</label>
											</li>
											<li>
												<input type="radio" name="single" id="ii" value="" />
												<label for="ii">C</label>
											</li>
											<li>
												<input type="radio" name="single" id="uu" value="" />
												<label for="uu">D</label>
											</li>
										</ul>
									</div>
									<div class="zy_read_answer_strip clearfix">
										<b class="fl">(4)</b>
										<ul class="zy_option_election fl">
											<li>
												<input type="radio" name="single" id="pp" value="" />
												<label for="pp">A</label>
											</li>
											<li>
												<input type="radio" name="single" id="oo" value="" />
												<label for="oo">B</label>
											</li>
											<li>
												<input type="radio" name="single" id="ii" value="" />
												<label for="ii">C</label>
											</li>
											<li>
												<input type="radio" name="single" id="uu" value="" />
												<label for="uu">D</label>
											</li>
										</ul>
									</div>
									<div class="zy_read_answer_strip clearfix">
										<b class="fl">(5)</b>
										<ul class="zy_option_election fl">
											<li>
												<input type="radio" name="single" id="pp" value="" />
												<label for="pp">A</label>
											</li>
											<li>
												<input type="radio" name="single" id="oo" value="" />
												<label for="oo">B</label>
											</li>
											<li>
												<input type="radio" name="single" id="ii" value="" />
												<label for="ii">C</label>
											</li>
											<li>
												<input type="radio" name="single" id="uu" value="" />
												<label for="uu">D</label>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="zy_small_question_analysis_box_edit">
								<p>解析</p>
								<div class="zyx_setHeight">
									<div class="ueditor" ng-model='questionBank.read[$index].analysis'></div>
								</div>
							</div>
						</div>
						<div class="zy_small_question_edit_btn">
							<button ng-click="answerCardSureBtn($index,'gestalt')">确认</button>
							<button ng-click="questionBank.read[$index].edit=false">取消</button>
						</div>
					</div>
					<!--可编辑部分-->
				</li>
				<!--阅读理解-->`*/
	};
	
	//题型结构数据解析
	/*var typeDate = {
		single : $compile(typeStructure.single)($scope),
		many : $compile(typeStructure.many)($scope),
		judge : $compile(typeStructure.judge)($scope),
		fill : $compile(typeStructure.fill)($scope),
		material : $compile(typeStructure.material)($scope),
		answer : $compile(typeStructure.answer)($scope),
		gestalt : $compile(typeStructure.gestalt)($scope),
		read : $compile(typeStructure.read)($scope)
	};*/
	
	//右边题型浮窗题型切换
	var answerCardvariable = {
		typeStructureBox : angular.element('.zy_question_card'),		//插入结构父级
		answerTitleNumArr : ['一','二','三','四','五','六','七','八'],		//答题卡创建答题序号数组
		questionTypeIndex : []											//大题顺序数组、序号
		
	};
	
	/**
	 * 答题卡回显
	 */
	$scope.cardCallBack = function(){
		angular.forEach($scope.variablePacket.callBackTypeArr,function (e,i){
		 if($scope.questionBank[e].length!=0){
			switch (e){
				case 'single':
					if(answerCardvariable.typeStructureBox.children('.zy_single_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="single" class="zy_type_pack zy_single_pack"><h4><b ng-bind="variablePacket.questionType[0].tit"></b><span>单选题</span></h4><ul class="zy_question_type_details zy_type_single"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_single_pack').children('ul').append($compile(typeStructure.single)($scope));	
						answerCardvariable.questionTypeIndex.push('单选题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[0].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[0].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'many':
					if(answerCardvariable.typeStructureBox.children('.zy_many_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="many" class="zy_type_pack zy_many_pack"><h4><b ng-bind="variablePacket.questionType[1].tit"></b><span>多选题</span></h4><ul class="zy_question_type_details zy_type_many"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_many_pack').children('ul').append($compile(typeStructure.many)($scope));				
						answerCardvariable.questionTypeIndex.push('多选题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[1].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[1].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'judge':
					if(answerCardvariable.typeStructureBox.children('.zy_judge_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="judge" class="zy_type_pack zy_judge_pack"><h4><b ng-bind="variablePacket.questionType[2].tit"></b><span>判断题</span></h4><ul class="zy_question_type_details zy_type_judge"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_judge_pack').children('ul').append($compile(typeStructure.judge)($scope));				
						answerCardvariable.questionTypeIndex.push('判断题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[2].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[2].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'fill':
					if(answerCardvariable.typeStructureBox.children('.zy_fill_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="fill"  class="zy_type_pack zy_fill_pack"><h4><b ng-bind="variablePacket.questionType[3].tit"></b><span>填空题</span></h4><ul class="zy_question_type_details zy_type_fill"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_fill_pack').children('ul').append($compile(typeStructure.fill)($scope));				
						answerCardvariable.questionTypeIndex.push('填空题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[3].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[3].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'material':
					if(answerCardvariable.typeStructureBox.children('.zy_material_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="material"  class="zy_type_pack zy_material_pack"><h4><b ng-bind="variablePacket.questionType[4].tit"></b><span>材料题</span></h4><ul class="zy_question_type_details zy_type_material"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_material_pack').children('ul').append($compile(typeStructure.material)($scope));		
						answerCardvariable.questionTypeIndex.push('材料题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[4].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[4].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'answer':
					if(answerCardvariable.typeStructureBox.children('.zy_answer_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="answer"  class="zy_type_pack zy_answer_pack"><h4><b ng-bind="variablePacket.questionType[5].tit"></b><span>简答题</span></h4><ul class="zy_question_type_details zy_type_answer"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_answer_pack').children('ul').append($compile(typeStructure.answer)($scope));				
						answerCardvariable.questionTypeIndex.push('简答题');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[5].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[5].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'gestalt':
					if(answerCardvariable.typeStructureBox.children('.zy_gestalt_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="gestalt"  class="zy_type_pack zy_gestalt_pack"><h4><b ng-bind="variablePacket.questionType[6].tit"></b><span>完形填空</span></h4><ul class="zy_question_type_details zy_type_gestalt"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_gestalt_pack').children('ul').append($compile(typeStructure.gestalt)($scope));				
						answerCardvariable.questionTypeIndex.push('完形填空');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[6].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[6].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				case 'read':
					if(answerCardvariable.typeStructureBox.children('.zy_read_pack').length == 0){
						answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="read" class="zy_type_pack zy_read_pack"><h4><b ng-bind="variablePacket.questionType[7].tit"></b><span>阅读理解</span></h4><ul class="zy_question_type_details zy_type_read"></ul></div>')($scope));
						answerCardvariable.typeStructureBox.children('.zy_read_pack').children('ul').append($compile(typeStructure.read)($scope));				
						answerCardvariable.questionTypeIndex.push('阅读理解');
						for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
							if($scope.variablePacket.questionType[7].name == answerCardvariable.questionTypeIndex[i]){
								$scope.variablePacket.questionType[7].tit = answerCardvariable.answerTitleNumArr[i] + '、';
							}
						}
					}
					break;
				
				default:
					break;
			}
		}
			
		});
		
	}
	
	//点击题型添加小题
	$scope.switchOptions = function (i,ele){
		$scope.variablePacket.switchOption = i;
		
		if(answerCardvariable.questionTypeIndex.indexOf(ele.target.innerHTML) == -1){
			answerCardvariable.questionTypeIndex.push(ele.target.innerHTML);
			for(var i=0;i<answerCardvariable.questionTypeIndex.length;i++){
				for(var k=0;k<$scope.variablePacket.questionType.length;k++){
					if($scope.variablePacket.questionType[k].name == answerCardvariable.questionTypeIndex[i]){
						$scope.variablePacket.questionType[k].tit = answerCardvariable.answerTitleNumArr[i] + '、';
					}
				}
			}
		}
		
		switch (ele.target.innerHTML){
			case '单选题':
				if(answerCardvariable.typeStructureBox.children('.zy_single_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="single" class="zy_type_pack zy_single_pack"><h4><b ng-bind="variablePacket.questionType[0].tit"></b><span>单选题</span></h4><ul class="zy_question_type_details zy_type_single"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_single_pack').children('ul').append($compile(typeStructure.single)($scope));	
					$scope.questionBank.single.push({id:25,showAnswer:true,edit:true,option : '',typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_single_pack').length){
					$scope.questionBank.single.push({id:64,showAnswer:true,edit:true,option : '',typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '多选题':
				if(answerCardvariable.typeStructureBox.children('.zy_many_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="many"  class="zy_type_pack zy_many_pack"><h4><b ng-bind="variablePacket.questionType[1].tit"></b><span>多选题</span></h4><ul class="zy_question_type_details zy_type_many"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_many_pack').children('ul').append($compile(typeStructure.many)($scope));				
					$scope.questionBank.many.push({id:111,showAnswer:true,edit:true,option : {a : true,b:true,c:false,d:true},typeName : ele.target.innerHTML,optArr:$scope.variablePacket.manyOptArr,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_many_pack').length){
					$scope.questionBank.many.push({id:111,showAnswer:true,edit:true,option : {a : true,b:true,c:false,d:true},typeName : ele.target.innerHTML,optArr:$scope.variablePacket.manyOptArr,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '判断题':
				if(answerCardvariable.typeStructureBox.children('.zy_judge_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="judge"  class="zy_type_pack zy_judge_pack"><h4><b ng-bind="variablePacket.questionType[2].tit"></b><span>判断题</span></h4><ul class="zy_question_type_details zy_type_judge"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_judge_pack').children('ul').append($compile(typeStructure.judge)($scope));				
					$scope.questionBank.judge.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_judge_pack').length){
					$scope.questionBank.judge.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '填空题':
				if(answerCardvariable.typeStructureBox.children('.zy_fill_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="fill" class="zy_type_pack zy_fill_pack"><h4><b ng-bind="variablePacket.questionType[3].tit"></b><span>填空题</span></h4><ul class="zy_question_type_details zy_type_fill"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_fill_pack').children('ul').append($compile(typeStructure.fill)($scope));				
					$scope.questionBank.fill.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_fill_pack').length){
					$scope.questionBank.fill.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '材料题':
				if(answerCardvariable.typeStructureBox.children('.zy_material_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="material" class="zy_type_pack zy_material_pack"><h4><b ng-bind="variablePacket.questionType[4].tit"></b><span>材料题</span></h4><ul class="zy_question_type_details zy_type_material"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_material_pack').children('ul').append($compile(typeStructure.material)($scope));				
					$scope.questionBank.material.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_material_pack').length){
					$scope.questionBank.material.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '简答题':
				if(answerCardvariable.typeStructureBox.children('.zy_answer_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="answer" class="zy_type_pack zy_answer_pack"><h4><b ng-bind="variablePacket.questionType[5].tit"></b><span>简答题</span></h4><ul class="zy_question_type_details zy_type_answer"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_answer_pack').children('ul').append($compile(typeStructure.answer)($scope));				
					$scope.questionBank.answer.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_answer_pack').length){
					$scope.questionBank.answer.push({id:111,showAnswer:true,edit:true,typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '完形填空':
				if(answerCardvariable.typeStructureBox.children('.zy_gestalt_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="gestalt" class="zy_type_pack zy_gestalt_pack"><h4><b ng-bind="variablePacket.questionType[6].tit"></b><span>完形填空</span></h4><ul class="zy_question_type_details zy_type_gestalt"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_gestalt_pack').children('ul').append($compile(typeStructure.gestalt)($scope));				
					$scope.questionBank.gestalt.push({id:111,showAnswer:true,edit:true,list:[{}],typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_gestalt_pack').length){
					$scope.questionBank.gestalt.push({id:111,showAnswer:true,edit:true,list:[{}],typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				break;
			case '阅读理解':
				if(answerCardvariable.typeStructureBox.children('.zy_read_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div ng-attr-type="read" class="zy_type_pack zy_read_pack"><h4><b ng-bind="variablePacket.questionType[7].tit"></b><span>阅读理解</span></h4><ul class="zy_question_type_details zy_type_read"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_read_pack').children('ul').append($compile(typeStructure.read)($scope));				
					$scope.questionBank.read.push({id:111,showAnswer:true,edit:true,list:[{}],typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}else if(answerCardvariable.typeStructureBox.children('.zy_read_pack').length){
					$scope.questionBank.read.push({id:111,showAnswer:true,edit:true,list:[{}],typeName : ele.target.innerHTML,cancel:$scope.variablePacket.cancel});
				}
				/*if(answerCardvariable.typeStructureBox.children('.zy_read_pack').length == 0){
					answerCardvariable.typeStructureBox.append($compile('<div class="zy_type_pack zy_read_pack"><h4><b ng-bind="variablePacket.questionType[7].tit"></b><span>阅读理解</span></h4><ul class="zy_question_type_details zy_type_read"></ul></div>')($scope));
					answerCardvariable.typeStructureBox.children('.zy_read_pack').children('ul').append($compile(typeStructure.read)($scope));				
					$scope.questionBank.read.push({id:111,showAnswer:true,edit:true});
				}else if(answerCardvariable.typeStructureBox.children('.zy_read_pack').length){
					$scope.questionBank.read.push({id:111,showAnswer:true,edit:true});
				}*/
				break;
			
			default:
				break;
		}
	};
	
}]);

//右边题型浮窗题型左右翻页
app.directive('moreOption',function (){
	return { 
		restrict : 'EA', 
		scope: {
			variablePacket: '='
		},
		link : function (scope, ele, attr){
			var floatVariable ={
				moveBox : null,					//移动对象
				childrenLen : 0,				//移动对象子级
				wholeScreenWidth : 74*6,		//移动整屏宽度
				moveLen : 0,					//可移动次数
				noWholeNum : 0,					//最后一屏非整屏时子级数量
				go : 0							//左右变量
			};
			floatVariable.moveBox = angular.element('.zy_type_box ul');
			floatVariable.childrenLen = floatVariable.moveBox.children().length;
			floatVariable.moveLen = Math.floor((floatVariable.childrenLen - 6) / 6);
			floatVariable.noWholeNum = floatVariable.childrenLen % 6;
			
			floatVariable.moveBox.css({width  : 74 * floatVariable.childrenLen});
			
			ele.on('click',function (){
//				 scope.$digest();
				console.log(scope.variablePacket.optionPointLeft)
				console.log(scope.variablePacket.optionPointRight)
				if(ele.hasClass('icon-youhua')){			//右边
					if(floatVariable.noWholeNum == 0){		//整屏
						if(floatVariable.go < floatVariable.moveLen){
							floatVariable.go++;
							floatVariable.moveBox.stop().animate({left : -floatVariable.wholeScreenWidth*floatVariable.go},500);
							if(floatVariable.go == floatVariable.moveLen){
								scope.$apply(function (){
									scope.variablePacket.optionPointLeft = true;
									scope.variablePacket.optionPointRight = false;
								});
							}
						}
					}else{		//非整屏
						if(floatVariable.go < floatVariable.moveLen){
							floatVariable.go++;
							floatVariable.moveBox.stop().animate({left : -floatVariable.wholeScreenWidth*floatVariable.go},500);
						}else if(floatVariable.go == floatVariable.moveLen){			//(-floatVariable.wholeScreenWidth)
							floatVariable.moveBox.stop().animate({left : -floatVariable.wholeScreenWidth*floatVariable.go + (-74*floatVariable.noWholeNum)},500);
							scope.$apply(function (){
								scope.variablePacket.optionPointLeft = true;
								scope.variablePacket.optionPointRight = false;
							});
						}
					}
				}else{		//左边
					if(floatVariable.noWholeNum == 0){		//整屏
						if(floatVariable.go >= 1){
							floatVariable.go--;
							floatVariable.moveBox.stop().animate({left : -floatVariable.wholeScreenWidth*floatVariable.go},500);
							if(floatVariable.go == 0){
								scope.$apply(function (){
									scope.variablePacket.optionPointLeft = false;
									scope.variablePacket.optionPointRight = true;
								});
							}	
						}
					}else{		//非整屏
						if(floatVariable.go >= 0){						//(-floatVariable.wholeScreenWidth)
							floatVariable.moveBox.stop().animate({left : -floatVariable.wholeScreenWidth*floatVariable.go - (-74*floatVariable.noWholeNum)},500);
							floatVariable.go--;
							if(floatVariable.go < 0){
								floatVariable.go = 0;
								floatVariable.moveBox.stop().animate({left : 0},500);
								scope.$apply(function (){
									scope.variablePacket.optionPointLeft = false;
									scope.variablePacket.optionPointRight = true;
								});
							}
						}
					}
					
				}
			});
			
		}
	};
	
});


/*app.directive('windowScroll', function() { 
	restrict : 'EA', 
	scope: {
		variablePacket: '='
	},
    return function(scope, elm, attr) {    
        // 内层DIV的滚动加载    
//      var raw = elm[0];    
        elm.bind('scroll', function() {   
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {   
                scope.$apply(attr.whenScrolled);    
            };    
        });    
    };    
});   
*/
//滚动条调用
//scrollbar.scroollAction("question","questionUl","scrollDiv");

//滚动条调用
/*app.directive('repeatFinish',function($timeout){
    return {
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    //滚动条
					$.mCustomScrollbar.defaults.scrollButtons.enable = true;
					$("#picture,#question").mCustomScrollbar({
						theme: "3d-dark"
					});
                });
            }
        }
    }
})*/
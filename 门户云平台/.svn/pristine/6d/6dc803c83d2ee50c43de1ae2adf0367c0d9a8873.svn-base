app.controller('guideContentCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll','myResourceService',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll,myResourceService) {
	//判断是否要显示父级头部导航
	if($stateParams.state != 'echo'){
		$scope.$emit('faHeadBar',false);
	}else{
		$scope.$emit('faHeadBar',true);
	}
	//查个人相关的树
	$rootScope.treetype = "0";
	//变量包
	$scope.variablePacket = {
		eightSwitchOut:[ 
			{"name":"单选题",Type:'single',show:false},     
			{"name":"多选题",Type:'many',show:false},
			{"name":"判断题",Type:'judge',show:false},
			{"name":"填空题",Type:'fillIn',show:false},
			{"name":"材料题",Type:'material',show:false},
			{"name":"简答题",Type:'briefAnswer',show:false},
			{"name":"完形填空",Type:'clozeCloze',show:false},
			{"name":"阅读理解",Type:'reading',show:false}
		],  
		threeSwitch:[    
			{"name":"我的资源",id:'0'},
			{"name":"校本资源",id:'1'},
			{"name":"公共资源",id:'2'}
		],
		SelectType : [],
		classaName:[
			{"name":"初一(1)班","id":"class_1","active":false},
			{"name":"初一(2)班","id":"class_2","active":false},
			{"name":"初一(3)班","id":"class_3","active":false},
			{"name":"初一(4)班","id":"class_4","active":false},
			{"name":"初一(5)班","id":"class_5","active":false},
		],
		arrSubject : [{name:'英语',id:'1'},{name:'数学',id:'2'},{name:'逻辑',id:'3'}],
		state:$stateParams.state,//new:布置导学	edit:复制导学	echo:导学内容
		queIndex: 0, //8种题型的默认选中
		ResLineIndex:0,//页面--资源库资源条默认选中
		ResLineTab:0,//页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType:"pic",//页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		titFixed:false,//吸顶样式
		delShow:true,//弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex:false,//弹层--层级提高一级；
		maskHeader:true,//弹层表头--true:从题库选择;false:插入资源
		insertChoiceAll:false,//弹出总开关
		insertChoice:false,//弹层主内容--true:从题库选择;false:插入资源
		insertChoice_threeType:0,//弹层--我的题库，公共题库，校本题库的默认选中
		insertChoice_eightType:0,//弹层--8种题型的默认选中
		insertChoice_selectType:0,//弹层--插入的类型默认选中
		eightSwitchOut_show:false,//页面--8种题型显示条是否显示
		AddResources_show:false,//页面--资源库是否显示
		Chapter:[{Onetit:'课本',Twotit:'章',Threetit:'节'}],//章节默认
		Echotit:0,//导学内容---导学资源和提问交流默认选中
		askArry:[],//导学内容---提问交流的存储数组
		message:'',//导学内容---提问交流的提交的文字
		jiazaiCommentBut:false,
		MessageOff:false,//导学名称开关
		ProvingUsername:false,//导学名称验证
		UsernameMessage:'',//导学名称的文字
		ProvingChapter:false,//章节目录验证
		/*
		ExplainOff:false,//导学说明开关
		ExplainMessage:'',//导学说明的文字
		ProvingExplain:false,//导学说明验证
		*/
		ObjecOff:false,//发布对象开关
		ProvingObject:false,//发布对象验证
		SexOff:false,//学生回传开关
		ProvingSex:false,//学生回传验证
		ProvingContent:false,//导学内容验证
		SubjectOff:false,//学科验证开关
		ProvingSubject:false,//学科验证
		guidanceId:$location.$$search.guidanceId,
		pageSize:1,
		pageShowNum:10,
		commentState:'0',//0是评论，1是回复
		commentJdgmentResource:'0',//评论时上传的资源与否
		commentReviewRating:'0',//评论星级
		loginUserId:sessionStorage.getItem("userId"),
		loginUserName:'',
		loginUserFace:'',
		userId : sessionStorage.getItem('userId'),
		resourceDetail:{},
		videoPath:'',
		audioPath:'',
		imagePath:'',
		pdfPath:'',
		fileNotExist:false,
		jiazaiRes:false,
		userCourse:'',
		subjectName:'',
		selectSubject :[],	   // 学科list
		areaIds : "",			// 区域id
		areaNames:"",			// 区域名称
		areaId :"",
        areaName:"",
        countyId:"",
        countyName:"",
        officeId:"",
        officeName:"",
        gradeJson :"",
        subjIds:'',
        subjNames:'',
        resourceTypeGroup:'0',//0是资源，1是试题
        resourceToAdd:[],
        guidanceList:[],
        convertState:'',//转码状态
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
		}
	}




    $scope.Answer="1";
	//赋值弹层的自适应高度
	function adaptionHeight(){
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight').height(bigHeight - 275);
//			console.log(bigHeight)
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
		});
	}
	
/*************************************zxl**************************************************************/
$scope.addResMap = {};
//弹层--资源数据
$scope.insertData = [
//	{
//		sign:false, //加减号
//		ResourceNum:0,//记录点击的第几个
//		ResourceTit:'00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
//		ResourceSrc:0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
//		name:'刘敏', //名字
//		time:'2017-08-20',//时间
//		size:'1049.02k',//内存大小
//		TypeSrc:[
//			{'Src':'resources_middle.jpg'},
//			{'Src':'newsImg.jpg'},
//			{'Src':'ad_1.jpg'},
//			{'Src':'banner.png'}
//		]
//	}
]

//console.log($location.$$search);

/**
 * 资源查询参数
 */

$scope.resParams = {
	objId:'',
	subjectID:'',
	knowledge:'',
	title:'',
	state:'',
	createBy:$scope.variablePacket.loginUserId,
	pageNo:1,
}
$scope.addResCount = 0;
	//获取登录人的信息---登录教师--初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (suc){
//		console.log(suc);
		$scope.zyx_radio();
		$scope.variablePacket.pageSize = 1;
		if(suc.ret == 200){
			$scope.variablePacket.userId = suc.data.id;
        	$scope.variablePacket.createUser = suc.data.realname;
    		angular.forEach(suc.data.userCourse, function(data){
                var subj = {
                    id:data.subjectId,
                    name :data.subjectName,
                    vid :data.versionId,
                    vname:data.versionName,
                    lid :"level_"+data.stage,
                    lname:getLeveName(data.stage),
                    gname:data.gradeName,
                    gid :data.gradeId,
//                  gid:getGradeNo(data.gradeName),
                    flag:1
                    
                };

                    $scope.variablePacket.areaId = suc.data.cityId;
                    $scope.variablePacket.areaName = suc.data.cityName;
                    $scope.variablePacket.countyId = suc.data.countyId;
                    $scope.variablePacket.countyName = suc.data.countyName;
                    $scope.variablePacket.officeId = suc.data.officeId;
                    $scope.variablePacket.officeName = suc.data.officeName;
//              $scope.variablePacket.selectSubject.push(subj);
//				$scope.getSubject();
//              console.log($scope.variablePacket.selectSubject);
                if($location.$$search.state == "edit"){
                	$scope.editGuidacne();
                }else{
                	$rootScope.variableGlobal.libraryTitleBar = ['课本','章','节'];
                }
            });
		}
	})
	
	/**
	 * 获取学科
	 */
	$http.get(jeucIp + 'ea/eaUserCourse/subject?uid='+$scope.variablePacket.loginUserId).success(function (suc){
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
	 * 如果是修改导学，查询导学信息
	 */
	$scope.editGuidacne = function(){
//		if($location.$$search.state == "edit"){
			$http.get(guidanceLearningIp + 'learn?id='+$location.$$search.guidanceId).success(function (data){
				if(data.ret == 200){
					$scope.variablePacket.guidanceList = data.data[0];
					$scope.variablePacket.UsernameMessage = $scope.variablePacket.guidanceList.guidanceLearn.name;
					$scope.variablePacket.ExplainMessage = $scope.variablePacket.guidanceList.guidanceLearn.descriprion;
					//树
					var selectedSubject = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds.split(",")[2];
		            $scope.variablePacket.subjectId = $scope.variablePacket.guidanceList.guidanceLearn.subjectId;
					$scope.variablePacket.subjectName = $scope.variablePacket.guidanceList.guidanceLearn.subjectName;
		            $scope.variablePacket.subjIds = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterIds;
					$scope.variablePacket.subjNames = $scope.variablePacket.guidanceList.guidanceLearn.memoriesChapterNames;
		            $rootScope.variableGlobal.libraryTitleBar = [$scope.variablePacket.subjNames.split("//")[4],$scope.variablePacket.subjNames.split("//")[5],$scope.variablePacket.subjNames.split("//")[6]]
		            $scope.variablePacket.Chapter[0].Onetit = $scope.variablePacket.subjNames.split("//")[4];
		            $scope.variablePacket.Chapter[0].Twotit = $scope.variablePacket.subjNames.split("//")[5];
		            $scope.variablePacket.Chapter[0].Threetit = $scope.variablePacket.subjNames.split("//")[6];
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
		            $scope.Answer=$scope.variablePacket.guidanceList.guidanceLearn.backType;
//		            $scope.resource = [];
//		            $scope.resource = $scope.variablePacket.guidanceList.guidanceResource.sendResource;
		            $scope.variablePacket.AddResources_show = true;
				}
		    })
//		}
	}
	
	/**
	 * 通过用户信息查询老师所教班级
	 */
	$http.get(jeucIp + 'ea/class?userId='+$scope.variablePacket.loginUserId).success(function (data){
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
// 资源类型
var params = "070a33c388f24f23b05d15adc0b8fd2e";
myResourceService.getResType(params,function(res){
	if(res.code == 200){
		$scope.variablePacket.SelectType = res.data;
		$scope.variablePacket.SelectType.unshift({"name":"全部","id":""});
		
	}else{
		$scope.variablePacket.SelectType = [];
	}
},function(res){
	
})
  // 获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
//  	if(names.indexOf("//") != -1){
//  		为了防止树节点本来就带逗号.采取用
//  		names = names.toString().replace(/\/\//g,',');
//  	}
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    	$scope.variablePacket.gradeJson = gradeJson;
    	console.info(ids,names,gradeJson);
    };
//查询资源
$scope.getAddResource = function(){
	$scope.insertData = [];
	$scope.variablePacket.pageSize=1;
	$scope.resParams.pageNo = 1;
	console.log($scope.resParams);
	if($rootScope.treetype == "0"){
        $scope.resParams.userId = sessionStorage.getItem("userId");
        $scope.resParams.state = "";
        myResourceService.getResourcesAll($scope.resParams,function(res){
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

// 根据左侧树查询
$rootScope.findListByTree = function(subjectID,knowledge) {
//  if(subjectID != ""){
        $scope.resParams.subjectID = subjectID;
//  }
//  if(knowledge != ""){
        $scope.resParams.knowledge = knowledge;
//  }
    $scope.getAddResource();
};
/**
 * 查询全部资源
 */
$rootScope.findResAll = function(){
	$scope.resParams.objId='';
	$scope.resParams.subjectID='';
	$scope.resParams.knowledge='';
	$scope.resParams.title='';
	$scope.resParams.state=0;
	$scope.resParams.createBy=$scope.variablePacket.userId;
	$scope.getAddResource();
}
/*************************************zxl**************************************************************/
	
	$scope.variablePacket.loginUserId=sessionStorage.getItem("userId");
	//获取登录人的信息---登录教师--初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (data){
//		console.log(data);
//		console.log($scope.variablePacket.loginUserId);
		if(data.ret == 200){
			$scope.variablePacket.loginUserName=data.data.realname;
			$scope.variablePacket.loginUserFace=data.data.userFace;
		}
	})
	
	//学生回传
	$scope.zyx_radio = function(){
		$scope.variablePacket.ProvingSex = false;
		$scope.variablePacket.SexOff = true;
	}
	//导学说明
	/*$scope.zyx_Explain = function(){
		if($scope.variablePacket.ExplainMessage.length>0){
			$scope.variablePacket.ProvingExplain = false;
			$scope.variablePacket.ExplainOff = true;
		}
	}*/
	//导学名称
	$scope.zyx_username = function(){
		if($scope.variablePacket.UsernameMessage.length>0){
			$scope.variablePacket.ProvingUsername = false;
			$scope.variablePacket.MessageOff = true;
		}
	}
	
	//学科验证
	$scope.Subject = function(){
		console.log($scope.selectedSubject);
		$scope.variablePacket.subjectId = $scope.selectedSubject.id;
		$scope.variablePacket.subjectName = $scope.selectedSubject.name;
		if($scope.selectedSubject!=undefined){
//			$rootScope.variableGlobal.libraryTitleBar = ['课本','章','节'];
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject==undefined){
//			console.log($scope.selectedSubject)
			$scope.variablePacket.ProvingSubject = true;
		}
		$scope.variablePacket.Chapter[0].Onetit = "学科";
        $scope.variablePacket.Chapter[0].Twotit = "课本";
        $scope.variablePacket.Chapter[0].Threetit = "章节";
		$rootScope.initchoiceVersion();
	}
	/**
	 * 验证
	 */
	$scope.validForm = function(){
		$scope.zyx_radio();
		//$scope.zyx_Explain();
		$scope.zyx_username();
		$scope.Subject();
		$scope.Chapter();
	}
	
	//章节目录的回显验证
	$scope.Chapter = function(){
		$timeout(function(){
			$scope.$apply(function(){
				$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
				$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
				$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
				if(($scope.variablePacket.Chapter[0].Onetit!="课本") || ($scope.variablePacket.Chapter[0].Twotit!="章") || ($scope.variablePacket.Chapter[0].Threetit!="节")){
					$scope.variablePacket.ProvingChapter = false;
//					console.log($scope.variablePacket.Chapter[0].Onetit);
//					console.log($scope.variablePacket.Chapter[0].Twotit);
//					console.log($scope.variablePacket.Chapter[0].Threetit);
				}
			})
		});
		
		
	}
	
	//发布对象
	$scope.classaNameTab = function(index){
		$scope.variablePacket.classaName[index].active = !$scope.variablePacket.classaName[index].active;
		var activeArr = [];
		angular.forEach($scope.variablePacket.classaName,function(e){
			this.push(e.active);
		},activeArr);
		if(activeArr.indexOf(true)==-1){
			$scope.variablePacket.ProvingObject = true;
			$scope.variablePacket.ObjecOff = true;
//			console.log(activeArr)
		}else{
			$scope.variablePacket.ProvingObject = false;
			$scope.variablePacket.ObjecOff = false;
//			console.log(activeArr)
		}
	}
	
	
	//发布
	$scope.variablePacket.loginUserId=sessionStorage.getItem("userId");
	$scope.Verification = function(ok){
		console.log($scope.selectedSubject);
		var arrayObj = new Array();
		//$scope.validForm();
		$timeout(function(){
			if(ok && (!$scope.variablePacket.ProvingUsername) && (!$scope.variablePacket.ProvingSubject) && ($scope.variablePacket.Chapter[0].Onetit != "学科" || $scope.variablePacket.Chapter[0].Twotit != "课本" || $scope.variablePacket.Chapter[0].Threetit != "章节")   &&  (!$scope.variablePacket.ProvingSex) &&  (!$scope.variablePacket.ProvingObject) && ( $scope.variablePacket.eightSwitchOut_show || $scope.variablePacket.AddResources_show)){
				var classNames = "";
				var classIds = "";
				var guidanceName = $scope.variablePacket.UsernameMessage;
				var guidanceBackState = $scope.Answer;
				var description = $scope.variablePacket.ExplainMessage;
				var chapterId = $scope.variablePacket.subjIds;
				var chapterName = $scope.variablePacket.subjNames;
				var createBy=$scope.variablePacket.loginUserId;
				var updateBy=$scope.variablePacket.loginUserId;
				var subjectId = $scope.variablePacket.subjectId;
				var subjectName = $scope.variablePacket.subjectName;
				//从选择的下发对象，获取下发对象id和对象名字
				angular.forEach($scope.variablePacket.classaName, function (each) { 
					if(each.active == true ){
						classNames += each.name+",";
						classIds += each.classId+",";
					}
				})
				console.log($scope.resource);
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
					value.sort='0';
					value.resourceClassification=$scope.variablePacket.resourceTypeGroup;
					value.resourceAuthor='';
					value.ossFileName=$scope.resource[i].ossFileName;
					value.resourceType=$scope.resource[i].resourceType;
					value.resourceId=$scope.resource[i].resourceId;
					arrayObj.push(value);
				})
//				console.log(angular.toJson(arrayObj))
				//调用添加导学的方法
				$scope.addGuidanceLearn(guidanceName,chapterId,chapterName,description,classNames,classIds,$scope.Answer,arrayObj,subjectId,subjectName);
				$scope.wranShow('发布成功!',true,'');
				$timeout(function(){$state.go("secondNav.guideList")},1500)
			}else{
				if(!$scope.variablePacket.eightSwitchOut_show && !$scope.variablePacket.AddResources_show){
					$scope.variablePacket.ProvingContent = true;
				}
				$timeout(function(){
					$scope.$apply(function(){
						$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
						$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
						$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
						if(($scope.variablePacket.Chapter[0].Onetit=="课本") || ($scope.variablePacket.Chapter[0].Twotit=="章") || ($scope.variablePacket.Chapter[0].Threetit=="节")){
							$scope.variablePacket.ProvingChapter = true;
						}
					})
				});
				if(!$scope.variablePacket.ProvingSex && !$scope.variablePacket.SexOff){
					$scope.variablePacket.ProvingSex = true;
				}
				/*
				if(!$scope.variablePacket.ProvingExplain && !$scope.variablePacket.ExplainOff){
					$scope.variablePacket.ProvingExplain = true;
				}
				*/
				$scope.zyx_username();
				var activeArr = [];
				angular.forEach($scope.variablePacket.classaName,function(e){
					this.push(e.active);
				},activeArr)
				if(activeArr.indexOf(true)==-1){
					$scope.variablePacket.ProvingObject = true;
					$scope.variablePacket.ObjecOff = true;
					console.log(activeArr)
				}
				console.log($scope.selectedSubject);
				if($scope.selectedSubject!=undefined){
					$scope.variablePacket.ProvingSubject = false;
				}
				if($scope.selectedSubject==undefined){
					$scope.variablePacket.ProvingSubject = true;
				}
//				if(!$scope.variablePacket.ProvingSubject && !$scope.variablePacket.SubjectOff){
//					$scope.variablePacket.ProvingSubject = true;
//				}
			}
		},100)
	}
	
	
	/**
	 * 布置导学
	 */
	$scope.addGuidanceLearn = function(name,chapterId,chapterName,description,sendObjectNames,sendObjectIds,backState,resourceJson,subjectId,subjectName){
		console.info(name,chapterId,chapterName,description,sendObjectNames,sendObjectIds,backState,angular.toJson(resourceJson),subjectId,subjectName);
//		var username = sessionStorage.getItem('username');
		var username = $scope.variablePacket.loginUserId;
		$http.post(guidanceLearningIp + 'learn',{name:name,guideType:0,memoriesChapterIds:chapterId,memoriesChapterNames:chapterName,subjectId:subjectId,subjectName:subjectName,descriprion:description,publishObjectNames:sendObjectNames,publishObjectIds:sendObjectIds,backType:backState,createBy:username,updateBy:username,resourceJson:angular.toJson(resourceJson)}).success(function (data){
			console.log(data);
			if(data.ret != 200){
				console.log("发布成功");
			}
	    })
	}
    
	
	//弹层--关闭
	$scope.closeMask = function(){
		$scope.variablePacket.insertChoiceAll=false;
	}
	
	//页面--题目的删除
	$scope.Del = function(type,index,id,number){
		$scope.promptShow('确认删除？',false,''+ $scope.variablePacket.eightSwitchOut[number].name + (index+1) +'');
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.questionBank.Out[type].splice(index,1);
			$scope.wranShow('已删除',true,''+ $scope.variablePacket.eightSwitchOut[number].name + (index+1) +'');
			if($scope.questionBank.Out[type].length == 0){
				$scope.variablePacket.eightSwitchOut[number].show = false;
			}
			if($scope.variablePacket.state=='new'|| $scope.variablePacket.state=='edit'){
				$scope.questionBank.In[type][id].sign = false;
			}
			var hasTrue = [];
			angular.forEach($scope.variablePacket.eightSwitchOut,function(e,i){
				this.push(e.show);
			}, hasTrue);
			if(hasTrue.indexOf(true)==-1){
				$scope.variablePacket.eightSwitchOut_show = false;
			}
		}
	}
	
	
	//页面--题目的上移
	$scope.MoveUp = function(type,index){
		var TopObj = angular.copy($scope.questionBank.Out[type][index - 1]);
		$scope.questionBank.Out[type][index - 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = TopObj;
	}
	
	//页面--题目的下移
	$scope.MoveDown = function(type,index){
		var BootomObj = angular.copy($scope.questionBank.Out[type][index + 1]);
		$scope.questionBank.Out[type][index + 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = BootomObj;
	}
	
	
	//页面/弹层--查看答案及解析
	$scope.lookAnswer = function(type,index,answer){
		if($scope.variablePacket.insertChoiceAll){
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		}else{
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}
	
	//页面---8种题型锚点
	$scope.jump = function(id,index) {
		var top = 0 ;
		if($scope.variablePacket.titFixed){
			top = document.getElementById(id).offsetTop;
//			console.log(top)
		}else{
			top = document.getElementById(id).offsetTop - 80;
//			console.log(top)
		}
		angular.element("html,body").animate({"scrollTop":top},600)
		$scope.variablePacket.queIndex = index;
	}
	
	//页面--吸顶
	$scope.Top = 0;
	if($scope.variablePacket.state=='echo' && $scope.Top==0){
		$timeout(function(){
			$scope.Top = angular.element(".zyx_lines").offset().top;
			$scope.Top = $scope.Top - 616 ;
			console.log($scope.Top)
		},10)
	}
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if($scope.variablePacket.AddResources_show){
			if(scrollT >= ($scope.Top + 616)) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}else{
			if(scrollT >= $scope.Top) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}
	};
	
	
	//弹层--我的题库，公共题库，校本题库切换
	$scope.insertChoice_threeSwitch = function(index,id){
		console.log(id);
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
	
	//弹层----8种题型的切换
	$scope.insertChoice_eightSwitchTab = function(index){
		$scope.variablePacket.insertChoice_eightType = index;
	}
	
	//弹层----插入资源的类型切换
	$scope.insertChoice_selectTypeTab = function(index,id){
		$scope.variablePacket.insertChoice_selectType = index;
		$scope.resParams.objId = id;
		$scope.getAddResource();
	}
	
	/**
	 * 加载更多资源
	 * @param {Object} pageSize
	 */
	$scope.jiazaiRes = function(pageSize){
		pageSize = pageSize+1;
		console.log("加载更多页码-----"+pageSize)
		$scope.resParams.pageNo = pageSize;
		$scope.variablePacket.pageSize = pageSize;
		//查询资源
		if($scope.variablePacket.insertChoice_threeType == "0"){
			myResourceService.getResourcesAll($scope.resParams,function(res){
	                $scope.addResCount = res.count;
	                console.log(res)
	                console.log(res.list.length)
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
	
	//页面--从题库添加
	$scope.addTopice = function(){
		$scope.variablePacket.insertChoiceAll=true;
		$scope.variablePacket.insertChoice=true;
		$scope.variablePacket.maskHeader=true;
		adaptionHeight();
		$scope.topic_Sign = function(type,id,index,number){
			$scope.questionBank.In[type][index].sign = !$scope.questionBank.In[type][index].sign;
			angular.forEach($scope.variablePacket.eightSwitchOut,function (e,i){
				if(e.Type == type){
					$scope.variablePacket.eightSwitchOut[i].show = true;
					$location.hash(type);
					$anchorScroll();
				}
			});
			if($scope.questionBank.In[type][index].sign){
				var Obj = angular.copy($scope.questionBank.In[type][index]);
				$scope.variablePacket.queIndex = number; // 控制最后点击的题型高亮
				$scope.questionBank.Out[type].push(Obj);
				$scope.variablePacket.eightSwitchOut_show = true;
				$scope.variablePacket.ProvingContent = false;
				$timeout(function(){
					if($scope.Top==0){
						$scope.Top = angular.element(".zyx_lines").offset().top;
						console.log($scope.Top)
					}
				})
			}else{
				angular.forEach($scope.questionBank.Out[type],function(e,i){
					if (e.Id==id){
						$scope.questionBank.Out[type].splice(i,1);
					}
					if($scope.questionBank.Out[type].length == 0){
						$scope.variablePacket.eightSwitchOut[number].show = false;
					}
				});
				var hasTrue = [];
				angular.forEach($scope.variablePacket.eightSwitchOut,function(e,i){
					this.push(e.show);
				}, hasTrue);
				if(hasTrue.indexOf(true)==-1){
					$scope.variablePacket.eightSwitchOut_show = false;
				}
			}
		}
	}
	
	/**
	 * 根据用户id，导学id查询资源,不同state代表下发和回传
	 */
	$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$location.$$search.guidanceId+'&&type=0').success(function (data){
//		console.log(data);
		if(data.ret == 200){
//			console.log(data.data);
			$scope.resource=data.data;
//			console.log(data.data.length)
			if(data.data.length>0){
				$scope.variablePacket.fileNotExist=false;
//				console.log(data.data[0].resourceType,data.data[0].ossFileName)
				$scope.ResLineTab(0,data.data[0].resourceType,data.data[0].ossFileName);
//				$scope.scrollbar();
			}else{
				$scope.variablePacket.fileNotExist=true;
			}
		}
    })
	
	
	//页面--从资源库添加
	$scope.addRes = function(){

        $scope.variablePacket.leftTreeShow.teachingMaterial = false;

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
		
		$scope.variablePacket.insertChoiceAll=true;
		$scope.variablePacket.insertChoice=false;
		$scope.variablePacket.maskHeader=false;
		adaptionHeight();
		$scope.insert_Sign = function(index,num) {
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
			var playerSTOP;
			if($scope.insertData[index].sign) {
				$scope.variablePacket.AddResources_show = true;
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
						}
					}
					if($scope.resource.length == 0){
						$scope.variablePacket.AddResources_show = false;
					}
				});
				
			}
			
		}
	}
	
	//页面--资源库列条上的删除
	$scope.delResLine = function(index,num,tit,id){
		$scope.promptShow('确认删除？',false,tit);
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.resource.splice(index,1);
			$scope.wranShow('已删除',true,tit);
			angular.forEach($scope.insertData,function(e,i){
				if(e.ResourceNum == num){
					e.sign = false;
				}
			})
			if($scope.resource.length == 0){
				$scope.variablePacket.AddResources_show = false;
			}
			console.log($scope.variablePacket.ResLineIndex )
			console.log($scope.resource.length)
			console.log(index)
			if($scope.variablePacket.ResLineIndex == index && $scope.resource.length>0){
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
	$scope.ResLineTab = function(index,typeSrc,ossFileName){
//		console.log(typeSrc);
//		console.log(ossFileName);
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
	
	//导学内容---导学资源和提问交流
	$scope.EchotitTab = function(i){
		$scope.variablePacket.Echotit = i;
		$scope.variablePacket.guidanceId= $location.$$search.guidanceId;
		$scope.variablePacket.pageSize = 1;
		if(i==1){
			console.log($location.$$search)
			//调用评论接口  sortType 排序类型（1标识时间排序(倒叙-默认)  2标识时间排序(正序) 3标识按（点赞数）倒叙   4   是点赞数正序
			$http.get(mySpaceIP + 'comment?relatedArticleId='+$location.$$search.guidanceId+"&&sortType=1 &&pageNumber="+$scope.variablePacket.pageSize+"&&showNumber="+$scope.variablePacket.pageShowNum).success(function (data){
				console.log(data.data.commentList.length);
				if(data.ret == 200){
					if(data.data.commentList.length>0){
						$scope.variablePacket.jiazaiCommentBut = true;
						console.log(data.data.commentList);
						$scope.variablePacket.askArry=data.data.commentList;
						angular.forEach(data.data.commentList,function(e,i){
							$http.get(jeucIp + 'uc/user/'+e.commentUserId).success(function (data){
								if(data.ret==200){
									console.log(data.data.userFace);
									$scope.variablePacket.askArry[i].userFace=data.data.userFace;
								}else{
									$scope.variablePacket.askArry[i].userFace='http://111.207.13.88:8881/resource/user/face/default.jpg';
								}
						    })
						})
					}else{
						$scope.variablePacket.jiazaiCommentBut = false;
						$scope.variablePacket.askArry=[];
					}
				}
		    })
		}else{
			console.log("导学资源");
		}
	}
	
	
	/**
	 * 加载更多
	 */
	$scope.jiazaiComment = function(pageSize){
		pageSize = pageSize+1;
		$scope.variablePacket.pageSize = pageSize;
		console.log(pageSize);
		$http.get(mySpaceIP + 'comment?relatedArticleId='+$location.$$search.guidanceId+"&&sortType=1 &&pageNumber="+pageSize+"&&showNumber="+$scope.variablePacket.pageShowNum).success(function (data){
			console.log(data.data.commentList.length);
			if(data.ret == 200){
				if(data.data.commentList.length>0){
					$scope.variablePacket.jiazaiCommentBut = true;
					$scope.variablePacket.askArry=$scope.variablePacket.askArry.concat(data.data.commentList);
					console.log($scope.variablePacket.askArry);
					angular.forEach(data.data.commentList,function(e,i){
						var s = i+((pageSize-1) * $scope.variablePacket.pageShowNum);
						$http.get(jeucIp + 'uc/user/'+e.commentUserId).success(function (data){
							if(data.ret==200){
								console.log(data.data.userFace);
								$scope.variablePacket.askArry[s].userFace=data.data.userFace;
							}else{
								$scope.variablePacket.askArry[s].userFace='http://111.207.13.88:8881/resource/user/face/default.jpg';
							}
					    })
					})
					console.log($scope.variablePacket.askArry);
				}else{
					$scope.variablePacket.jiazaiCommentBut = false;
				}
			}
	    })
	}
	
	
	//导学说明---字数限制
	$scope.messageSize = function() {
		if($scope.variablePacket.ExplainMessage == ''){
			return 0
		}else if($scope.variablePacket.ExplainMessage.length<255){
			return $scope.variablePacket.ExplainMessage.length
		}else{
			return 255
		}
	};
	
	//提问交流---字数限制
	$scope.messageNum = function() {
		if($scope.variablePacket.message == ''){
			return 0
		}else if($scope.variablePacket.message.length<255){
			return $scope.variablePacket.message.length
		}else{
			return 255
		}
	};
	
	//导学内容--提问按钮
	$scope.askButton = function() {
		var news = {};
		var times = new Date();
		Date.prototype.Years = function(formatStr){   
	        var str = formatStr;   
		    var Week = ['日','一','二','三','四','五','六']; 
		    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
		    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
		    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
		    str=str.replace(/w|W/g,Week[this.getDay()]);   
		    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
		    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
		    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
		    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
		    return str;   
		}
//		news.askImg = './img/tuixiangzi.png';
		console.log(times.Years("yyyy-MM-dd hh:mm:ss"));
		news.commentUserName = $scope.variablePacket.loginUserName;
		news.commentUserId = $scope.variablePacket.loginUserId;
		news.userFace = $scope.variablePacket.loginUserFace;
		news.state = $scope.variablePacket.commentState;
		news.content = $scope.variablePacket.message;
		news.commentUpdateDate = times.Years("yyyy-MM-dd hh:mm:ss")
		news.relatedArticleId = $scope.variablePacket.guidanceId;
		news.judgmentResource = $scope.variablePacket.commentJdgmentResource;
		news.reviewRating = $scope.variablePacket.commentReviewRating;
		console.log(news);
//		news.askYears = times.Years("yyyy-MM-dd");
//		news.askTime = times.Years("hh:mm:ss");
		$scope.variablePacket.askArry.unshift(news);
		$scope.variablePacket.message = '';
		$http.post(mySpaceIP + 'comment',news).success(function (data){
				console.log(data);
	    })
		
	};

	//根据页面不同赋值数据
	var trans = '';  //“|”的转换
	if($scope.variablePacket.state=='echo'){
		trans = 'Out';
		//页面--习题数据
		$scope.questionBank = {
			Out:{
				//单选
				single : [
					{
						Id:0, 
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'single', //题型
						AnswerShow:false, //默认答案不显示
						ResourceShow:false,//是否插入资源
						queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
						Answer:'B', //答案
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false, 
						Type:'single',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
						Answer:'C',
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						ResourceSrc:2, 
						sign:false, 
						Type:'single',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
						Answer:'C',
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
					
				],
				//多选
				many : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'many', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
						Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'many', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
						Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'many',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
						Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//判断
				judge : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'judge', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111天上有2个太阳吗？', //题干
						Answer:'错误',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'judge', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222你是谁？我是谁？是游戏吗？',
						Answer:'正确',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//填空
				fillIn : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'fillIn', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
						Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'fillIn', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', 
						Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//答案
						Analysis:'天上有一个太阳',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//材料
				material : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'material', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'为什么李白特别钟情于庐山？', //题干
						Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'material', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'你是谁？我是谁？是游戏吗？',
						Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//简答
				briefAnswer : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'briefAnswer', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'为什么李白特别钟情于庐山？', //题干
						Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						sign:false,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						Type:'briefAnswer', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'你是谁？我是谁？是游戏吗？',
						Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'briefAnswer', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'为什么李白特别钟情于庐山？',
						Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//完形填空
				clozeCloze : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'clozeCloze', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
						Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'clozeCloze', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", 
						Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
						Analysis:'地上有个月亮',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//阅读理解
				reading : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'reading', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
						myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'reading', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
						myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				]
			}
		}
		$scope.resource = $scope.insertData;
		$scope.variablePacket.AddResources_show = true;
		$scope.variablePacket.eightSwitchOut_show = true;
		angular.forEach($scope.variablePacket.eightSwitchOut,function (e,i){
			$scope.variablePacket.eightSwitchOut[i].show = true;
		});
		
	}else{
		trans = 'In';
		//习题数据
		$scope.questionBank = {
			In:{
				//单选
				single : [
					{
						Id:0, 
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'single', //题型
						AnswerShow:false, //默认答案不显示
						ResourceShow:false,//是否插入资源
						queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
						Answer:'B', //答案
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false, 
						Type:'single',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
						Answer:'C',
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						ResourceSrc:2, 
						sign:false, 
						Type:'single',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
						Answer:'C',
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
					
				],
				//多选
				many : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'many', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
						Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'many', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
						Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'many',
						AnswerShow:false,
						ResourceShow:false,
						queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
						Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
						Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//判断
				judge : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'judge', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111天上有2个太阳吗？', //题干
						Answer:'错误',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'judge', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222你是谁？我是谁？是游戏吗？',
						Answer:'正确',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//填空
				fillIn : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false, //从题库选择的加减号
						Type:'fillIn', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
						Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'fillIn', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', 
						Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//答案
						Analysis:'天上有一个太阳',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//材料
				material : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'material', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'为什么李白特别钟情于庐山？', //题干
						Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'material', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'你是谁？我是谁？是游戏吗？',
						Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//简答
				briefAnswer : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'briefAnswer', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'为什么李白特别钟情于庐山？', //题干
						Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						sign:false,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						Type:'briefAnswer', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'你是谁？我是谁？是游戏吗？',
						Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:2,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'briefAnswer', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'为什么李白特别钟情于庐山？',
						Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//完形填空
				clozeCloze : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'clozeCloze', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
						Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}], 
						sign:false,
						Type:'clozeCloze', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", 
						Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
						Analysis:'地上有个月亮',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				],
				//阅读理解
				reading : [
					{
						Id:0,
						CanResource:false,//是否显示资源
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],//插入带过来的资源数据
						sign:false,//从题库选择的加减号
						Type:'reading', //题型
						AnswerShow:false,//默认答案不显示
						ResourceShow:false,//是否显示插入资源
						queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
						myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
						Analysis:'天上有一个太阳',//解析
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					},{
						Id:1,
						CanResource:false,
						Resource:[{ResourceTit:'',ResourceSrc:0,ResourceNum:0}],
						sign:false,
						Type:'reading', 
						AnswerShow:false,
						ResourceShow:false,
						queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
						myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
						Analysis:'是是是是',
						Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}]
					}
				]
			},
			//从题库添加后的展示8种题型的数据
			Out:{single:[],many:[],judge:[],fillIn:[],material:[],briefAnswer:[],clozeCloze:[],reading:[]}
		}
		$scope.resource = []; //资源库的存储
		$scope.variablePacket.AddResources_show = false;
		$scope.variablePacket.eightSwitchOut_show = false;
		angular.forEach($scope.variablePacket.eightSwitchOut,function (e,i){
			$scope.variablePacket.eightSwitchOut[i].show = false;
		});
		
		
	}
	
	
	
	
	
	//循环完成后
	$scope.renderFinish = function(){
		//填空题答案类型的转换
		$scope.fillInArr = [];
		angular.forEach($scope.questionBank[trans].fillIn, function(e, i) {
			$scope.fillInArr.push($scope.questionBank[trans].fillIn[i].Answer.split("|"));
		})
	
		//材料题答案类型的转换
		$scope.materialArr = [];
		angular.forEach($scope.questionBank[trans].material, function(e, i) {
			$scope.materialArr.push($scope.questionBank[trans].material[i].Answer.split("|"));
		})
	
		//简答题答案类型的转换
		$scope.briefAnswerArr = [];
		angular.forEach($scope.questionBank[trans].briefAnswer, function(e, i) {
			$scope.briefAnswerArr.push($scope.questionBank[trans].briefAnswer[i].Answer.split("|"));
		})
		
		angular.element(".zyx_askBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
		
		angular.element(".zyx_ResourcesTypeShow").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		
		angular.element(".zyx_resBox").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
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



	
}]);


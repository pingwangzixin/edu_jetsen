app.controller('prepareLessonsContentCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll','myResourceService',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll,myResourceService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '在线备课';
	
	//查个人相关的树
	$rootScope.treetype = "0";
//	$rootScope.variableGlobal.libraryTitleBar = ['xie','zjh','ss']
	//变量包
	$scope.variablePacket = {
		eightSwitchOut:[   //页面上展示的8种题型
			{"name":"单选题",Type:'single',show:false,"id":2},     
			{"name":"判断题",Type:'judge',show:false,"id":1},
			{"name":"简答题",Type:'briefAnswer',show:false},
		],  
		threeSwitch:{
			'res':[
				{"name":"我的资源",id:'0'},
				{"name":"校本资源",id:'1'},
				{"name":"公共资源",id:'2'}
			],
			'que':[
				{"name":"我的题库",id:'0'},
				{"name":"校本题库",id:'1'},
				{"name":"公共题库",id:'2'}
			],
			'test':[
				{"name":"我的卷库",id:'0'},
				{"name":"校本卷库",id:'1'}
				//{"name":"公共卷库",id:'2'}
			]
		},
		testpaperBox_pic:false,
		testpaperBox_line:false,
		ResourcesTypeShow_pic:false,
		ResourcesTypeShow_line:false,
		Test:[],//试卷的数据
		TestIndex:0,//试卷默认选中
		
		SelectType : [],
		selectedSubject :[],	   // 学科list
		state:$stateParams.state,//new:创建备课		edit:编辑备课		echo：查看备课
		pId:$stateParams.id,
		queIndex: 0, //8种题型的默认选中
		classIndex:-1,//页面--发布对象的班级默认选中
		ResLineIndex:0,//页面--资源库资源条默认选中
		ResLineTab:0,//页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType:"pic",//页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		titFixed:false,//吸顶样式
		delShow:true,//弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex:false,//弹层--层级提高一级；
		maskHeader:true,//弹层表头--true:从题库选择;false:插入资源
		insertChoice:'',//弹层主内容--添加资源：resources， 添加卷库：testpaper
		insertChoice_threeType:0,//弹层--我的题库，公共题库，校本题库的默认选中
		insertChoice_eightType:0,//弹层--8种题型的默认选中
		insertChoice_selectType:0,//弹层--插入的类型默认选中
		eightSwitchOut_show:false,//页面--8种题型显示条是否显示
		AddResources_show:$stateParams.state == 'new' ? false : true,//页面--资源库是否显示
		Chapter:[{Onetit:'课本',Twotit:'章',Threetit:'节'}],//章节默认
		Echotit:0,//导学内容---导学资源和提问交流默认选中
		askArry:[],//导学内容---提问交流的存储数组
		message:'',//导学内容---提问交流的提交的文字
		pageNo:1,
		pageSize:10,
		UsernameOff:false,//导学名称验证开关
		ProvingUsername:false,//导学名称验证
		UsernameMessage:'',//导学名称的文字
		SubjectOff:false,//学科验证开关
		ProvingSubject:false,//学科验证
		ProvingChapter:false,//章节目录验证
		ProvingContent:false,//导学内容验证
		userId : sessionStorage.getItem('userId'),//"37d4d64e06eb4695be69a8a129973627"
		createUser:'',
		gradeJson :"",
        subjIds:'',
        subjNames:'',
        areaId :"",
        areaName:"",
        countyId:"",
        countyName:"",
        officeId:"",
        officeName:"",
        selectSubject:[],
        myState:"",//判断是资源弹层还是试题弹层1代表资源弹层，0代表试题库弹层
        leftTreeShow : {					//左侧树展示
			teachingMaterial : true,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
        leftTreeShow_open : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
	}
	
	//赋值弹层的自适应高度
	function adaptionHeight(){
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight,.addTestPaper').height(bigHeight - 275);
			angular.element('.addTestPaper').height(bigHeight-120);
			//题型
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			//资源
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			//卷库
			angular.element(".addTestPaper").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
		});
	}
	
	/*************************************zxl**************************************************************/
$scope.addResMap = {};
$scope.addResQuizMap = {};
$scope.addTestPareMap = {};
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
//弹层试题资源数据
$scope.insertQuizData =[];
/**
 * 资源查询参数
 */
$scope.resParams = {
	objId:'',
	subjectID:'',
	knowledge:'',
	keywords:'',
	state:'',
	createBy:$scope.variablePacket.userId
	
}
$scope.addResCount = 0;

/**
 * 资源试题查询参数
 */
//默认查询我的试题
$scope.resQuesParams = {
	subjIds:'',
	knowledge:'',
	keywords:'',
	state:0,
	type:1,
	createBy:$scope.variablePacket.userId
}

//默认查询我的试卷
$scope.resTestPareParams = {
	subjIds:'',
	knowledge:'',
	keywords:'',
	state:0,
	type:1,
	createBy:$scope.variablePacket.userId
}
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
	//##############################根据学科查询章节目录  ---start---###################################//
	 /**
	 * 查询当前老师授课
	 */
	$http.get(jeucIp + 'ea/eaUserCourse/subject?uid='+$scope.variablePacket.userId).success(function (suc){
		if(suc.ret == 200){
			console.log(suc.data)
			angular.forEach(suc.data, function(data){
				var subj = {
                    id:data.subjectId,
                    name :data.subjectName,
                };
				$scope.variablePacket.selectSubject.push(subj);
				console.log($scope.variablePacket.selectSubject);
			})
		}
		//console.log($scope.variablePacket.selectSubject);
		if($location.$$search.state != "new"){
            	$scope.editPrepare();
        }
	})
	
	

 	//获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    	$scope.variablePacket.gradeJson = gradeJson;
    	console.info(ids,names,gradeJson);
    };
    
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
	
	//##############################根据学科查询章节目录  ---end---###################################//
    //展示资源框
	function resourceDetail(typeSrc,ossId){
		$http.get(ossIp + 'filelog/'+ossId).success(function (data){
			if(data.code == 200){
				$scope.variablePacket.AddResources_show = true;//资源整个大盒子
				$scope.variablePacket.testpaperBox_pic = false; //卷库左边是否显示
				$scope.variablePacket.ResourcesTypeShow_pic = true;//资源左边是否显示
				$scope.variablePacket.ResourcesTypeShow_line = true;//资源右边是否显示
				//有试题列表
				if($scope.insertTest.length > 0){
					$scope.variablePacket.eightSwitchOut_show = true;//题型是否显示
					$scope.variablePacket.TestIndex = -1; //默认卷子列条第一个选中
					$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
				}else{
					$scope.variablePacket.eightSwitchOut_show = false;//题型是否显示
					$scope.variablePacket.testpaperBox_line = false; //卷库右边是否显示
				}
				//$scope.variablePacket.ResLineIndex = 0;//清空资源列条的选中
				
				$scope.flashTfShow = false;
				$scope.variablePacket.resourceDetail=data;
				$scope.variablePacket.convertState = data.data.state;
				console.log("转码状态："+$scope.variablePacket.convertState);
				console.log("文件类型："+typeSrc);
				if(typeSrc==2){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$scope.variablePacket.ResLineType = "music";
//					$scope.variablePacket.audioPath = $scope.variablePacket.resourceDetail.previewUrl;
					var fls = flashChecker();
					console.log("flash提醒："+fls.f)
					if(fls.f==0) {
						//显示flash提醒
						$scope.flashTfShow = true;
					} else {
						$scope.flashTfShow = false;
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
					}
				}else if(typeSrc==1 || typeSrc==8 || typeSrc==9){
					$("#pdfPlay").hide();
					$("#tupian").hide();					
					$scope.variablePacket.ResLineType = "video";
					var fls = flashChecker();
					console.log("视频播放")
					$scope.variablePacket.videoPath = data.data.previewUrl;
					if(fls.f==0) {
						//显示flash提醒
						$scope.flashTfShow = true;
					} else {
						$scope.flashTfShow = false;
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
					}
				}else if(typeSrc==3){
					$("#pdfPlay").hide();
					$("#showplayer").hide();
					$("#tupian").show();
					$scope.variablePacket.ResLineType = "pic";
					$scope.variablePacket.imagePath = data.data.previewUrl;
//					$scope.scrollbar();
					$scope.flashTfShow = false;
				}else{
					$("#tupian").hide();
					$("#showplayer").hide();
					$("#pdfPlay").show();
					$scope.variablePacket.ResLineType = "pdf";
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF;
					console.log("common/generic/web/viewer.html?file="+data.data.previewUrl.pathPDF);
					$scope.flashTfShow = false;
				}
				scrollBar();
			}
	    })
	}
	
	
	//查询资源
	$scope.getAddResource = function(){
		if($scope.variablePacket.pageNo == 1){
			$scope.insertData = [];
		}		
		$scope.resParams.pageNo = $scope.variablePacket.pageNo;		
		
		if($rootScope.treetype == "0"){
		    //默认加载
		    $scope.variablePacket.leftTreeShow_open.teachingMaterial = false;
	        $scope.resParams.userId = sessionStorage.getItem("userId");
	        $scope.resParams.state = "";
	        myResourceService.getResourcesAll($scope.resParams,function(res){
	        		if(res.list.length == 0){
	        			$scope.insertData = [];
	        		}
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
	                    resTem.resourceType = obj.fileFormat;
	                    resTem.ResourceSrc = obj.objId;
	                    resTem.name = obj.createUser;
	                    resTem.time = obj.createDate;
	                    resTem.size = obj.fileSize;
	                    resTem.resourceId = resTem.id = obj.id;
	                    resTem.viewURL = obj.viewURL;
	                    resTem.subjIds = obj.subjIds;
						resTem.subjNames = obj.subjNames;
						resTem.objId = obj.objId;
	                    resTem.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
	                    $scope.insertData.push(resTem);
	                })
	        },function(error){
	
	        })
		}else{
			$scope.variablePacket.leftTreeShow_open.teachingMaterial = true;
			if($rootScope.treetype == "1"){
	            $scope.resParams.areaCodes = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
			}
	        if($rootScope.treetype == "2"){
	            $scope.resParams.areaCodes = "";
	            $scope.resParams.userId = "";
	        }	
	        myResourceService.getResources($scope.resParams,function(res){
	            if(res.code==200){
	            	if(res.data.list.length == 0){
	        			$scope.insertData = [];
	        		}
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
	                    resTem.resourceType = obj.fileFormat;
	                    resTem.ResourceSrc = obj.objId;
	                    resTem.name = obj.createUser;
	                    resTem.time = obj.createDate;
	                    resTem.size = obj.fileSize;
	                    resTem.resourceId = resTem.id = obj.id;
	                    resTem.viewURL = obj.viewURL;
	                    resTem.subjIds = obj.subjIds;
						resTem.subjNames = obj.subjNames;
						resTem.objId = obj.objId;
	                    resTem.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
	                    $scope.insertData.push(resTem);
	                })
	            }
	        },function(error){
	
	        })
		}
	}

	//编辑或是查看备课详情
	$scope.editPrepare = function(){
		//修改时显示资源列表
        $scope.variablePacket.AddResources_show = true;
		$http.get(prepareServerIp+'/prepare/'+$scope.variablePacket.pId).success(function (jdata){
			var resData = [];
			var ques_single_Data = [];
			var ques_judge_Data = [];
			$scope.backTit = jdata.data.title;
			$scope.variablePacket.UsernameMessage = jdata.data.title;
			if(jdata.data.subjectId)
			{
				$scope.variablePacket.selectSubjectId = jdata.data.subjectId;
				//树
				var selectedSubject = jdata.data.subjectId;
	            
	            $scope.variablePacket.subjIds = jdata.data.chapterIds;
				$scope.variablePacket.subjNames = jdata.data.chapters;
	            $rootScope.variableGlobal.libraryTitleBar = [$scope.variablePacket.subjNames.split("//")[4],$scope.variablePacket.subjNames.split("//")[5],$scope.variablePacket.subjNames.split("//")[6]]
	            $scope.variablePacket.Chapter[0].Onetit = $scope.variablePacket.subjNames.split("//")[4];
	            $scope.variablePacket.Chapter[0].Twotit = $scope.variablePacket.subjNames.split("//")[5];
	            $scope.variablePacket.Chapter[0].Threetit = $scope.variablePacket.subjNames.split("//")[6];
	            console.log($rootScope.variableGlobal.libraryTitleBar);
	            angular.forEach($scope.variablePacket.selectSubject, function(subData){
			    	console.log(subData.id+"----"+selectedSubject)
	            	if(subData.id == selectedSubject){
	                    subData.subjIds = jdata.data.subjectId;
	                    subData.subjNames = jdata.data.subject;
	                    $scope.selectedSubject = subData;
					}
	            });
			}
			


			angular.forEach(jdata.data.resources,function(obj,i){
				var resourceObj = {};
				resourceObj.id = obj.prepare_res_id;				
				resourceObj.sign = true;
				//resourceObj.ResourceNum = obj.prepare_res_sort;
				resourceObj.ResourceNum = i;
				resourceObj.resourceName = resourceObj.ResourceTit = obj.title;
				resourceObj.resourceType = obj.fileFormat;
				resourceObj.ResourceSrc = obj.objId;
				resourceObj.name = obj.createUser;
				resourceObj.time = obj.createDate;
				resourceObj.size = obj.fileSize;
				resourceObj.resourceId = obj.id;
				resourceObj.viewURL = obj.viewURL;
				resourceObj.subjIds = obj.subjIds;
				resourceObj.subjNames = obj.subjNames;
				resourceObj.objId = obj.objId;
				resourceObj.ossFileName = obj.fileName.substr(0,obj.fileName.lastIndexOf('.'));
				

				//显示默认第一个资源数据
				resData.push(resourceObj);
				$scope.addResMap[resourceObj.resourceId] = resourceObj;
				if(i == 0){
					//根据filename查询播放展示路径
					var ossId = resourceObj.ossFileName;
					if(resourceObj.ossFileName.indexOf("_")>0){
						ossId = resourceObj.ossFileName.substring(0,resourceObj.ossFileName.indexOf("_"));
					}
					//默认资源列表第一个显示
					$scope.variablePacket.resourcesIndex = 0;
					resourceDetail(resourceObj.ResourceSrc,ossId);
				}
				
			});
			$scope.resource = resData;
			$scope.insertData =resData;
			
			//组织试卷
			angular.forEach(jdata.data.exams,function(e,i){
				var testPare = {};
           		testPare.id = e.prepare_res_id;
           		testPare.resourceId = e.id;
           		testPare.num = i;
           		testPare.type = "test";
           		testPare.sign = $scope.addTestPareMap[e.resourceId] == undefined?false:true;
           		testPare.ResourceTit = testPare.name = e.name;
           		testPare.subjIds = e.subjIds;
				testPare.subjNames = e.subjNames;
           		testPare.size = "";
           		$scope.insertTest.push(testPare);
           		$scope.addTestPareMap[testPare.resourceId] = testPare;
           		$scope.variablePacket.Test.push(testPare);
			});
			if($scope.insertTest.length > 0 && $scope.resource.length == 0){
				$scope.variablePacket.eightSwitchOut_show = true;//题型是否显示
				$scope.variablePacket.testpaperBox_pic = true; //卷库左边是否显示
				$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
				$scope.variablePacket.testPareName = $scope.insertTest[0].ResourceTit;
				$scope.testPaperDetail($scope.insertTest[0].resourceId);
			}else{
				$scope.variablePacket.eightSwitchOut_show = false;//题型是否显示
			}
	    });
	}

	// 根据左侧树查询
	$rootScope.findListByTree = function(subjectID,knowledge) {
	    if(subjectID != ""){
	        $scope.resParams.subjectID = subjectID;
	        $scope.resQuesParams.subjIds = subjectID;
	    }
	    if(knowledge != ""){
	        $scope.resParams.knowledge = knowledge;
	        $scope.resQuesParams.knowledge = knowledge;
	    }
	    if($scope.variablePacket.myState == 1){
	    	 $scope.getAddResource();
	    }else{
	    	$scope.addTestPaper();
	    }
	};

	//滚动条调用
	$scope.scrollbar = function(){
		$timeout(function(){
			angular.element(".zyx_ResLinePic").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
		})
	}

	//查询资源试题
	$scope.getAddQuiz = function(){
		console.log($scope.resQuesParams.subjIds);
		//8种题型的切换type切换使用下标控制
		var type = $scope.variablePacket.insertChoice_eightType==0 ? 2 : 1 ;
		console.log($scope.variablePacket.subjIds +	$scope.variablePacket.subjNames + 	$scope.variablePacket.gradeJson )
		var url="";
		if($scope.resQuesParams.state == 0){
			url = "a/quz/quzAll?createBy="+sessionStorage.getItem('userId')+"&pageNo="+$scope.variablePacket.pageNo+"&type="+type+"&subjIds="+$scope.resQuesParams.subjIds;
		}else{
			url = "a/quz/getQuzFile?pageNo="+$scope.variablePacket.pageNo+"&state="+$scope.resQuesParams.state+"&type="+type+"&subjIds="+$scope.resQuesParams.subjIds;
			if($scope.resQuesParams.state==1){
				url +="&areaCodes="+JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
			}
		}
		//默认加载单选题
		var quess = [];
		var judge = [];
		$http.get(questionUrl+url).success(function(data){
			$scope.variablePacket.questionCount = data.data.count;
			if(data.data.count<11){
				$scope.variablePacket.jiazaiQuiz = false;
			}
    		if(data.data.list.length<10){
            	$scope.variablePacket.jiazaiQuiz = false;
            }else{
            	$scope.variablePacket.jiazaiQuiz = true;
            }
			//单选题组织数据
			if(type == 2){
				angular.forEach(data.data.list,function(e,i){
					console.log(e)
					var ques = {};
					ques.Id = e.id;
					if(e.sourceType == 1){
                        ques.question_id = e.id;
					}else{
						ques.question_id = e.quzResId;
					}
					ques.CanResource = false;
					ques.Resource = [{ResourceTit: '',
								ResourceSrc: 0,
								ResourceNum: 0}];
					//从题库选择的加减号
					ques.sign = $scope.addResQuizMap[ques.question_id] == undefined?false:true;
					ques.Type = 'single'; //题型
					ques.AnswerShow = false; //默认答案不显示
					ques.ResourceShow = false; //是否插入资源
					ques.queTit = e.body; //题干
					ques.Answer = e.answer; //答案
					ques.Analysis = e.analysis;//解析
					ques.Chapter = [{
						Onetit: e.subjNames.split("//")[2],
						Twotit: e.subjNames.split("//")[3],
						Threetit: e.subjNames.split("//")[4]
					}];
					ques.subjIds = e.subjIds;
					ques.subjNames = e.subjNames;
					ques.objId = e.type;
					quess.push(ques);
					console.log(quess);					
				})
				console.log(quess)
				
				$scope.questionBank.In.single = quess;					
			}else{
				//判断题组织数据
				angular.forEach(data.data.list,function(e,i){				
					var ques = {};
					ques.Id = e.id;
					if(e.sourceType == 1){
                        ques.question_id = e.id;
					}else{
						ques.question_id = e.quzResId;
					}
					ques.CanResource = false;
					ques.Resource = [{ResourceTit:e.title,
								ResourceSrc: 0,
								ResourceNum: 0}];
					//从题库选择的加减号
					ques.sign = $scope.addResQuizMap[ques.Id] == undefined?false:true;
					ques.Type = 'judge'; //题型
					ques.AnswerShow = false; //默认答案不显示
					ques.ResourceShow = false; //是否插入资源
					ques.queTit = e.body; //题干
					ques.Answer = e.answer; //答案
					ques.Analysis = e.analysis;//解析
					ques.subjIds = e.subjIds;
					ques.subjNames = e.subjNames;
					ques.objId = e.type;
					ques.Chapter = [{
						Onetit: e.subjNames.split("//")[2],
						Twotit: e.subjNames.split("//")[3],
						Threetit: e.subjNames.split("//")[4]
					}];
					judge.push(ques);
					console.log(judge);					
				})
				$scope.questionBank.In.judge = judge;	
			}
			
		})
	}
/*************************************zxl**************************************************************/
	
	//导学名称
	$scope.zyx_username = function(){
		if($scope.variablePacket.UsernameMessage.length>0){
			$scope.variablePacket.ProvingUsername = false;
			$scope.variablePacket.UsernameOff = true;
		}
	}
	
	//学科验证
	$scope.Subject = function(){
		console.log($scope.selectedSubject)
		$rootScope.initchoiceVersion();
		if($scope.selectedSubject!=undefined){
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject==undefined){
			console.log($scope.selectedSubject)
			$scope.variablePacket.ProvingSubject = true;
		}
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
					console.log($scope.variablePacket.Chapter[0].Onetit);
					console.log($scope.variablePacket.Chapter[0].Twotit);
					console.log($scope.variablePacket.Chapter[0].Threetit);
				}
			})
		});
		
		
	}
	
	//总验证保存创建备课
	$scope.Verification = function(ok){
		if(ok &&  (!$scope.variablePacket.ProvingUsername) && (!$scope.variablePacket.ProvingSubject)  && ($scope.variablePacket.Chapter[0].Onetit!="课本" && $scope.variablePacket.Chapter[0].Twotit!="章" && $scope.variablePacket.Chapter[0].Threetit!="节") && ($scope.variablePacket.eightSwitchOut_show || $scope.variablePacket.AddResources_show)){
			var id="";
			if($scope.variablePacket.state == 'edit'){
				id = $scope.variablePacket.pId;
			}
			
			//获取资源列表
			var resAll = [];
			angular.forEach($scope.resource, function(res,i){
				res.type="0";
				resAll.push(res);
			});
			
			//拿试卷数据
			angular.forEach($scope.variablePacket.Test, function(test,i){
				var res = {};
				res.type="2";				
				res.id = test.id;
				res.resourceId = test.resourceId;
				res.resourceName = test.ResourceTit;
				res.resourceType = test.type;
				res.subjIds = test.subjIds;
				res.subjNames = test.subjNames;
				res.size = 0;
				res.objId = test.source;
				resAll.push(res);
			});
			
			/*angular.forEach($scope.questionBank.Out.judge, function(res,i){
				var judgeData = {};
				judgeData.type="1";
				judgeData.id=res.Id;
				judgeData.resourceId=res.question_id;
				judgeData.ResourceNum = i;
				judgeData.resourceName=res.queTit;
				judgeData.resourceType="judge";
				judgeData.size="0";
				judgeData.resType = res.subjIds;
				judgeData.subjIds = res.subjIds;
				judgeData.subjNames = res.subjNames;
				judgeData.objId = res.objId;
				resAll.push(judgeData);
			});
			angular.forEach($scope.questionBank.Out.single, function(res,i){
				var single = {};
				single.type="1";
				single.id=res.Id;
				single.ResourceNum = i;
				single.resourceId=res.question_id;
				single.resourceName=res.queTit;
				single.resourceType="single";
				single.size="0";
				single.subjIds = res.subjIds;
				single.subjNames = res.subjNames;
				single.objId = res.objId;
				resAll.push(single);
			});*/
			//获取试题列表
			//验证成功获取数据			
	        var data = {
			    "id": id,
			    "teaid": $scope.variablePacket.userId,
			    "title": $scope.variablePacket.UsernameMessage,
			    "teaName": JSON.parse(sessionStorage.getItem('managerSearch')).realname,
			    "resources": resAll,			    
			    "subject": $scope.selectedSubject.name,
			    "subjectId": $scope.selectedSubject.id,
			    "chapterNames": $scope.variablePacket.subjNames,
			    "chapterIds": $scope.variablePacket.subjIds,
			    "oneTit": $scope.variablePacket.Chapter[0].Onetit,
			    "twoTit": $scope.variablePacket.Chapter[0].Twotit,
			    "threeTit": $scope.variablePacket.Chapter[0].Threetit
			}
	        
	        var dataParam = {
	        	"data":angular.toJson(data)	        	
	        };
	        console.log(dataParam)
	        $http.post(prepareServerIp+'/prepare',dataParam).success(function (data){
	        	if(data.ret == 200){
	        		if($scope.variablePacket.state == 'new'){
	        			$scope.wranShow('备课创建成功!',true,'');
	        		}else{
	        			$scope.wranShow('备课修改成功!',true,'');
	        		}
	        		
					$timeout(function(){$state.go("secondNav.prepareLessonsList")},1500)
	        	}else{
	        		$scope.wranShow('操作失败!',true,'');
	        	}
	        })
		}else{
			if(!$scope.variablePacket.eightSwitchOut_show && !$scope.variablePacket.AddResources_show){
				$scope.variablePacket.ProvingContent = true;
			}
			if(($scope.variablePacket.Chapter[0].Onetit=="课本") || ($scope.variablePacket.Chapter[0].Twotit=="章") || ($scope.variablePacket.Chapter[0].Threetit=="节")){
				$scope.variablePacket.ProvingChapter = true;
			}
			if(!$scope.variablePacket.ProvingUsername && !$scope.variablePacket.UsernameOff){
				$scope.variablePacket.ProvingUsername = true;
			}
			if(!$scope.variablePacket.ProvingSubject && !$scope.variablePacket.SubjectOff){
				$scope.variablePacket.ProvingSubject = true;
			}
		}
	}

	
	//返回的标题
	$timeout(function(){
		$scope.backTit = angular.element('.zyx_ResLine span.active').html();
	})
	
	
	//弹层--关闭
	$scope.closeMask = function(){
		$scope.resQuesParams.subjIds = "";
		$scope.variablePacket.pageNo = 1 ;
		$scope.resTestPareParams.state=0;
		$scope.variablePacket.insertChoiceAll=false;
	}
	
	//页面--题目的删除
	$scope.Del = function(type,index,id,number){
		$scope.promptShow('确认删除？',false,''+ $scope.variablePacket.eightSwitchOut[number].name + (index+1) +'');
		$scope.delOk = function(){
			//删除资源data
			$http.delete(prepareServerIp+'/prepare/res/'+id).success(function (jdata){
			});
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
			console.log(top)
		}else{
			top = document.getElementById(id).offsetTop - 80;
			console.log(top)
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
		$scope.variablePacket.insertChoice_threeType = index;
		for(i in $scope.resParams){
			$scope.resParams[i] = '';
		}
		if(index!=0){
			$scope.variablePacket.delShow = false;			
			$scope.variablePacket.leftTreeShow_open.teachingMaterial = true;
		}else{
			$scope.variablePacket.delShow = true;			
			$scope.variablePacket.leftTreeShow_open.teachingMaterial = false;
		}
		$rootScope.treetype = id;
		$scope.variablePacket.pageNo=1;
		$scope.resParams.state = id;		
		$scope.resQuesParams.state = id;
		$scope.resTestPareParams.state = id;
		
		if($scope.variablePacket.myState == 1){
			$scope.insertChoice_selectTypeTab(0,"");
		}else{
			$scope.insertChoice_selectTestPareTypeTab(index,id);
		}
	}
	
	//弹层----8种题型的切换
	$scope.insertChoice_eightSwitchTab = function(index){
		$scope.variablePacket.insertChoice_eightType = index;
		$scope.variablePacket.pageNo=1;
		$scope.getAddQuiz();
	}
	
	//弹层----插入资源的类型切换
	$scope.insertChoice_selectTypeTab = function(index,id){
		$scope.variablePacket.insertChoice_selectType = index;
		$scope.resParams.objId = id;
		$scope.getAddResource();
	}
	
	//弹层----插入试题资源的类型切换
	$scope.insertChoice_selectquizTypeTab = function(index,id){
		$scope.variablePacket.insertChoice_selectType = index;
		$scope.resQuesParams.type = "";
		$scope.resQuesParams.state = id;
		$scope.getAddQuiz();
	}
	
	//弹层----插入试卷的类型切换
	$scope.insertChoice_selectTestPareTypeTab = function(index,id){
		$scope.resTestPareParams.type = "";
		$scope.resTestPareParams.state = id;
		$scope.addTestPaper();
	}
	//页面--从题库添加
	$scope.addTopice = function(){	
		$scope.variablePacket.myState = 0;
		$scope.variablePacket.insertChoiceAll=true;
		$scope.variablePacket.insertChoice=true;
		$scope.variablePacket.maskHeader=true;
		$scope.variablePacket.insertChoice_eightType = 0;	
		$scope.resQuesParams.subjIds="";
//		$scope.resQuesParams.state=0;

		//赋值弹层的自适应高度
		adaptionHeight();
		//弹层---题库选择弹层里的加减号
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
			}
		}
       	$scope.getAddQuiz();	
	}
	
	//页面--从资源库添加
	$scope.addRes = function(){
		$scope.variablePacket.myState = 1 ;
		//初始化添加资源查询
		$scope.variablePacket.insertChoice_threeType = 0;
		$scope.variablePacket.insertChoice_selectType = 0;
		$rootScope.treetype = 0;
		$scope.addResCount = 0;
		for(i in $scope.resParams){
			$scope.resParams[i] = '';
		}
		$scope.addResMap = {};
		angular.forEach($scope.resource,function(e,i){
			$scope.addResMap[e.resourceId] = e;
		})
		$scope.getAddResource();
		
		$scope.variablePacket.insertChoiceAll=true;
		$scope.variablePacket.insertChoice = 'resources';
		$scope.variablePacket.maskHeader=false;
		
		adaptionHeight();
		$scope.insert_Sign = function(index,num) {
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
			var playerSTOP;
			if($scope.insertData[index].sign) {
				$scope.variablePacket.AddResources_show = true;
				$scope.variablePacket.ResourcesTypeShow_pic = true;
				$scope.variablePacket.ResourcesTypeShow_line = true;
				$scope.variablePacket.TestIndex = -1;
				var resObj = angular.copy($scope.insertData[index]);
				$scope.addResMap[resObj.resourceId] = resObj;
				$scope.resource.unshift(resObj);
				$scope.variablePacket.ProvingContent = false;
				console.log($scope.resource[0]);
				var ossId = $scope.resource[0].ossFileName;
				if($scope.resource[0].ossFileName.indexOf("_")>0){
					ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
				}
				//根据filename查询播放展示路径
				resourceDetail($scope.resource[0].ResourceSrc,ossId);				
			} else {
				delete $scope.addResMap[$scope.insertData[index].resourceId];
				angular.forEach($scope.resource,function(e,i){
					if (e.ResourceNum == num){
						$scope.resource.splice(i,1);
						if($scope.variablePacket.ResLineIndex == i && $scope.resource.length>0){
							$scope.variablePacket.ResLineIndex = 0;
							$scope.variablePacket.ResLineTab = 0;
							
							console.log($scope.resource[0].ossFileName);
							//根据filename查询播放展示路径
							var ossId = $scope.resource[0].ossFileName;
							if($scope.resource[0].ossFileName.indexOf("_")>0){
								ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
							}
							resourceDetail($scope.resource[0].ResourceSrc,ossId);
						}
					}
					if($scope.resource.length == 0){
						$scope.variablePacket.AddResources_show = false;
					}
				});
				
			}
			
		}
	}
	
	//页面--资源库列条上的删除type=0资源，type=2试卷
	$scope.delResLine = function(index,num,tit,id,type){
		$scope.promptShow('确认删除？',false,tit);
		$scope.delOk = function(){
			//删除资源data
			$http.delete(prepareServerIp+'/prepare/res/'+id).success(function (jdata){
			});
			$scope.variablePacket.prompt = false;
			if(type == 0){
				$scope.resource.splice(index,1);
				angular.forEach($scope.insertData,function(e,i){
				if(e.ResourceNum == num){
					e.sign = false;
				}
			})
			}else{
				delete $scope.addTestPareMap[id];
				$scope.variablePacket.Test.splice(index,1);
				$scope.insertTest.splice(index,1);				
				angular.forEach($scope.insertTest,function(e,i){
					if(e.num == num){
						e.sign = false;
					}
				})
			}
			$scope.wranShow('已删除',false,tit);
			
			//删除资源
			if(type == 0){
				if($scope.resource.length > 0){
					//显示资源页面
					$scope.variablePacket.ResourcesTypeShow_pic = true;//资源左边是否显示
					$scope.variablePacket.ResourcesTypeShow_line = true;//资源右边是否显示
				}else{
					$scope.variablePacket.ResourcesTypeShow_pic = false;//资源左边是否显示
					$scope.variablePacket.ResourcesTypeShow_line = false;//资源右边是否显示
					if($scope.variablePacket.Test.length > 0){
						$scope.variablePacket.eightSwitchOut_show = true;//题型是否显示
						$scope.variablePacket.testpaperBox_pic = true; //卷库左边是否显示
						$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
					}else{
						$scope.variablePacket.AddResources_show = false;
					}
				}
			}else{
				if($scope.variablePacket.Test.length > 0){
						$scope.variablePacket.eightSwitchOut_show = true;//题型是否显示
						$scope.variablePacket.testpaperBox_pic = true; //卷库左边是否显示
						$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
				}else{
					$scope.variablePacket.eightSwitchOut_show = false;//题型是否显示
					$scope.variablePacket.testpaperBox_pic = false; //卷库左边是否显示
					$scope.variablePacket.testpaperBox_line = false; //卷库右边是否显示
					if($scope.resource.length > 0){
						//显示资源页面
						$scope.variablePacket.ResourcesTypeShow_pic = true;//资源左边是否显示
						$scope.variablePacket.ResourcesTypeShow_line = true;//资源右边是否显示
					}else{
						$scope.variablePacket.AddResources_show = false;
					}
				}
			}
						
			if($scope.variablePacket.ResLineIndex == index && $scope.resource.length>0){
				//根据filename查询播放展示路径
				var ossId = $scope.resource[0].ossFileName;
				if($scope.resource[0].ossFileName.indexOf("_")>0){
					ossId = $scope.resource[0].ossFileName.substring(0,$scope.resource[0].ossFileName.indexOf("_"));
				}
				resourceDetail($scope.resource[0].ResourceSrc,ossId);
				
				$scope.variablePacket.ResLineIndex = 0;
				$scope.variablePacket.ResLineTab = 0;
			}	
			if($scope.variablePacket.ResLineIndex == -1 && $scope.variablePacket.Test.length>0){
				//显示试卷内容
				var name = $scope.variablePacket.Test[0].name;
				$scope.variablePacket.TestIndex = 0;
				//$scope.variablePacket.TestTab = 0;
				$scope.variablePacket.testPareName = name;
				$scope.testPaperDetail($scope.variablePacket.Test[0].resourceId);	
			}
		}
		
	}
	
	
	//页面--资源库资源列条的切换
	$scope.ResLineTab = function(index,objdata){
		var typeSrc = objdata.ResourceSrc;
		console.log(typeSrc);
		$scope.variablePacket.ResLineIndex = index;
		$scope.variablePacket.ResLineTab = index;
		scrollBar();
		//根据filename查询播放展示路径
		var ossId = objdata.ossFileName;
		if(objdata.ossFileName.indexOf("_")>0){
			ossId = objdata.ossFileName.substring(0,objdata.ossFileName.indexOf("_"));
		}
		resourceDetail(objdata.ResourceSrc,ossId);
	
	}
	
	
	
	
	
	//滚动条调用
	$scope.renderFinish = function(){
		angular.element(".zyx_AddResources_left").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		angular.element(".zyx_askBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
	}
	
	
	
	//弹层--资源数据
	/*$scope.insertData = [
		{
			sign:false, //加减号
			ResourceNum:0,//记录点击的第几个
			ResourceTit:'00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
			ResourceSrc:0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
			name:'刘敏', //名字
			time:'2017-08-20',//时间
			size:'1049.02k',//内存大小
			TypeSrc:[
				{'Src':'resources_middle.jpg'},
				{'Src':'newsImg.jpg'},
				{'Src':'ad_1.jpg'},
				{'Src':'banner.png'}
			]
		},{
			sign:false, 
			ResourceNum:1,
			ResourceTit:'11五年级五年级五年级五年级五年级语文期末试卷.ppt',
			ResourceSrc:1,
			name:'刘敏', 
			time:'2017-08-20',
			size:'1049.02k',
			TypeSrc:[
				{'Src':'resources_middle.jpg'},
				{'Src':'newsImg.jpg'},
				{'Src':'resources_main.jpg'},
				{'Src':'banner.png'}
			]
		},{
			sign:false, 
			ResourceNum:2,
			ResourceTit:'22五年级五年级五年级五年级五年级语文期末试卷.ppt', 
			ResourceSrc:2, 
			name:'刘敏', 
			time:'2017-08-20',
			size:'1049.02k' ,
			TypeSrc:[
				{'Src':'newsImg.jpg'}
			]
		},{
			sign:false, 
			ResourceNum:3,
			ResourceTit:'33五五年级五年级五年级五年级年级语文期末试卷.ppt', 
			ResourceSrc:3, 
			name:'刘敏', 
			time:'2017-08-20', 
			size:'1049.02k' ,
			TypeSrc:[
				{'Src':'banner.png'}
			]
		},{
			sign:false,
			ResourceNum:4,
			ResourceTit:'44五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:4,
			name:'刘敏',
			time:'2017-08-20',
			size:'1049.02k' 
		},{
			sign:false,
			ResourceNum:5,
			ResourceTit:'55五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:5,
			name:'刘敏',
			time:'2017-08-20',
			size:'1049.02k' 
		},{
			sign:false,
			ResourceNum:6,
			ResourceTit:'66五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:4,
			name:'刘敏',
			time:'2017-08-20',
			size:'1049.02k' 
		},{
			sign:false,
			ResourceNum:7,
			ResourceTit:'77五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:5,
			name:'刘敏',
			time:'2017-08-20',
			size:'1049.02k' 
		}
	]*/
	
	
	//根据页面不同赋值数据
	var trans = '';  //“|”的转换
	if($scope.variablePacket.state=='echo'){
		trans = 'Out';
		//页面--习题数据
		$scope.questionBank = {
			In:{
				//单选
				single : [],
				//判断
				judge : [],
				//多选
				many : [],
				//填空
				fillIn : [],
				//材料
				material : [],
				//简答
				briefAnswer : [],
				//完形填空
				clozeCloze : [],
				//阅读理解
				reading : []
			},
			//从题库添加后的展示8种题型的数据
			Out:{single:[],judge:[],many:[],fillIn:[],material:[],briefAnswer:[],clozeCloze:[],reading:[]}
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
				single : [],
				//判断
				judge : [],
				//多选
				many : [],
				//填空
				fillIn : [],
				//材料
				material : [],
				//简答
				briefAnswer : [],
				//完形填空
				clozeCloze : [],
				//阅读理解
				reading : []
			},
			//从题库添加后的展示8种题型的数据
			Out:{single:[],judge:[],many:[],fillIn:[],material:[],briefAnswer:[],clozeCloze:[],reading:[]}
		}
		$scope.resource = []; //资源库的存储
		$scope.variablePacket.AddResources_show = false;
		$scope.variablePacket.eightSwitchOut_show = false;
		angular.forEach($scope.variablePacket.eightSwitchOut,function (e,i){
			$scope.variablePacket.eightSwitchOut[i].show = false;
		});
	}
	
	/**
	 * 加载更多资源
	 * @param {Object} pageSize
	 */
	$scope.jiazaiRes = function(pageNo){
		pageNo = pageNo+1;
		console.log("加载更多页码-----"+pageNo)
		$scope.resParams.pageNo = pageNo;
		$scope.variablePacket.pageNo = pageNo;
		//查询资源
		$scope.getAddResource();
	}
	
	/**
	 * 加载更多试卷
	 * @param {Object} pageSize
	 */
	$scope.jiazaiTest = function(pageNo){
		pageNo = pageNo+1;
		console.log("加载更多页码-----"+pageNo)
		$scope.resTestPareParams.pageNo = pageNo;
		$scope.variablePacket.pageNo = pageNo;
		//查询试卷
		$scope.addTestPaper();
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
		
	}
	
	

	function scrollBar(){
		//滚动条调用
		angular.element(".zyx_AddResources_left").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		angular.element(".zyx_askBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
		angular.element(".zyx_ResLineBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
	}
	scrollBar();
	
	
	
		/*****************************************************   卷库的相关js   ****************************************************/

	//添加试卷--数据
	$scope.insertTest = [];
	
	//添加试卷
	$scope.addTestPaper = function(){
		if($scope.variablePacket.pageNo == 1){
			$scope.insertTest = [];
		}
		$scope.variablePacket.insertChoiceAll = true;
		$scope.variablePacket.insertChoice = "testpaper";
		$scope.variablePacket.myState = 0;
		adaptionHeight();
		console.log($scope.resTestPareParams.state);
		var url = "/exam?module=1&state="+$scope.resTestPareParams.state+"&subjIds="+$scope.resQuesParams.subjIds+"&current="+$scope.variablePacket.pageNo+"&type=01";
		if($scope.resTestPareParams.state == 0){
			 $scope.variablePacket.insertChoice_threeType = 0;
			 $scope.variablePacket.leftTreeShow_open.teachingMaterial = false;
			url += "&createBy="+sessionStorage.getItem('userId');
		}else if($scope.resTestPareParams.state == 1){
			 $scope.variablePacket.leftTreeShow_open.teachingMaterial = true;
			url +="&areaCodes="+JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
		}
		
		$http.get(questionUrl+url).success(function(data){
			
			$scope.variablePacket.questionCount = data.data.total;
			if(data.data.total<11){
				$scope.variablePacket.jiazaiTest= false;
			}
    		if(data.data.records.length<10){
            	$scope.variablePacket.jiazaiTest = false;
            }else{
            	$scope.variablePacket.jiazaiTest = true;
            }
           angular.forEach(data.data.records,function(e,i){
           		var testPare = {};
           		testPare.id = testPare.resourceId = e.id;
           		testPare.num = i;
           		testPare.type = "test";
           		testPare.sign = $scope.addTestPareMap[e.id] == undefined?false:true;
           		testPare.ResourceTit = e.name;
           		testPare.name = e.name;
           		testPare.time = e.createDate;
           		testPare.subjIds = e.subjIds;
				testPare.subjNames = e.subjNames;
           		testPare.size = "";
           		testPare.source = e.module;
           		$scope.insertTest.push(testPare);
           });            
			
		})
		//添加试卷--加减号
		$scope.TestPaper_Sign = function(index){
			$scope.variablePacket.Plotting = false; 
			$scope.insertTest[index].sign = !$scope.insertTest[index].sign;
			$scope.variablePacket.ProvingContent = false;
			if($scope.insertTest[index].type == 'test'){
				if($scope.insertTest[index].sign){
					var resObj = angular.copy($scope.insertTest[index]);
					$scope.addTestPareMap[resObj.id] = resObj;
					$scope.variablePacket.Test.unshift(resObj);
					$scope.insertTest[index].sign = true;					
					
					$scope.variablePacket.TestIndex = 0; //默认卷子列条第一个选中
					$scope.testPaperDetail($scope.insertTest[index].resourceId);
				}else{
					console.log("由减号变加号")
					delete $scope.addTestPareMap[$scope.insertTest[index].id];
					$scope.variablePacket.testPareName = "";
					console.log($scope.variablePacket.Test);
					angular.forEach($scope.variablePacket.Test,function(e,i){
						if (e.num == index){
							$scope.variablePacket.Test.splice(i,1);
							console.log($scope.variablePacket.Test);
						}
					});
					//$scope.variablePacket.Test.remove();
					angular.forEach($scope.variablePacket.eightSwitchOut,function(e){
						e.show = false;
					})
					$scope.questionBank.Out = {
						single: [],
						judge: [],
						briefAnswer: [],
					}
				}
			}
		}
	}
	
	
	//根据试卷Id，显示试卷详情数据
	$scope.testPaperDetail = function(id){
		//获取试卷详情
		var testPareDetailurl = "/exam/"+id;
		var judgeArr = [];
		var singleArr = [];
		var briefAnswerArr = [];
		$http.get(questionUrl+testPareDetailurl).success(function(data){
			if(data.code == 200){
				$("#pdfPlay").hide();
				$("#tupian").hide();
				$("#showplayer").hide();
				$scope.variablePacket.TestIndex = 0;
				angular.forEach($scope.variablePacket.eightSwitchOut,function(e){
					e.show = true;
				})
				$scope.variablePacket.testPareName = data.data.name;				
				$scope.variablePacket.AddResources_show = true;//资源整个大盒子
				$scope.variablePacket.eightSwitchOut_show = true;//题型是否显示
				$scope.variablePacket.testpaperBox_pic = true; //卷库左边是否显示
				$scope.variablePacket.testpaperBox_line = true; //卷库右边是否显示
				$scope.variablePacket.ResourcesTypeShow_pic = false;//资源左边是否显示
				if($scope.insertData.length > 0){
					$scope.variablePacket.ResLineIndex = -1;//清空资源列条的选中
					$scope.variablePacket.ResourcesTypeShow_line = true;//资源右侧显示
				}else{
					$scope.variablePacket.ResourcesTypeShow_line = false;//资源右侧显示
				}
				angular.forEach(data.data.questionList,function(e,i){
					//1是判断，2是单选题，6是简答题
					if(e.type == 1){
						var judgeInfo = {};
						judgeInfo.id = e.id;
						judgeInfo.sign = false;
						judgeInfo.Type = "judge";
						judgeInfo.AnswerShow =false;
						judgeInfo.queTit = e.body;
						judgeInfo.Answer = e.answer;
						judgeInfo.Analysis = e.analysis;
						judgeArr.push(judgeInfo);
					}else if (e.type == 2){
						var singleInfo = {};
						singleInfo.id = e.id;
						singleInfo.sign = false;
						singleInfo.Type = "single";
						singleInfo.AnswerShow =false;
						singleInfo.queTit = e.body;
						singleInfo.Answer = e.answer;
						singleInfo.Analysis = e.analysis;
						singleArr.push(singleInfo);
					}else if (e.type == 6){
						var briefAnswerInfo = {};
						briefAnswerInfo.id = e.id;
						briefAnswerInfo.sign = false;
						briefAnswerInfo.Type = "briefAnswer";
						briefAnswerInfo.AnswerShow =false;
						briefAnswerInfo.queTit = e.body;
						briefAnswerInfo.Answer = e.answer;
						briefAnswerInfo.Analysis = e.analysis;
						briefAnswerArr.push(briefAnswerInfo);
					}
		        })
			}
			
			//试卷数据
			if(singleArr.length > 0){
				$scope.questionBank.Out.single = singleArr;
				$scope.variablePacket.eightSwitchOut[0].show = true;//题型是否显示
			}else{
				$scope.variablePacket.eightSwitchOut[0].show = false;//题型是否显示
			}
			if(judgeArr.length > 0){
				$scope.questionBank.Out.judge = judgeArr;
				$scope.variablePacket.eightSwitchOut[1].show = true;//题型是否显示
			}else{
				$scope.variablePacket.eightSwitchOut[1].show = false;//题型是否显示
			}
			if(briefAnswerArr.length > 0){
				$scope.questionBank.Out.briefAnswer = briefAnswerArr;
				$scope.variablePacket.eightSwitchOut[2].show = true;//题型是否显示
			}else{
				$scope.variablePacket.eightSwitchOut[2].show = false;//题型是否显示
			}
		});
	}
	
	//卷子列条的切换
	$scope.TestTab = function(i,obj){
		$scope.variablePacket.TestIndex = i;
		$scope.variablePacket.testPareName = obj.ResourceTit;
		$scope.testPaperDetail(obj.resourceId);
	}
	

	/*****************************************************   卷库的相关js   ****************************************************/
	//资源全部
	$rootScope.findAll = $rootScope.findResAll = function(){
		console.log($scope.variablePacket.insertChoice_threeType);
		console.log($rootScope.treetype);
		console.log($scope.variablePacket.myState);
		$scope.resParams.subjectID = "";
		if($scope.variablePacket.myState == 1){
			$scope.insertChoice_selectTypeTab(0,$rootScope.treetype);
		}else{
			$scope.insertChoice_selectTestPareTypeTab(0,$rootScope.treetype);
		}		
	}
	
	//试卷全部
	 $scope.findAll = function(){
		console.log($scope.variablePacket.insertChoice_threeType);
		console.log($rootScope.treetype);
		console.log($scope.variablePacket.myState);
		$scope.resTestPareParams.subjIds = "";
		if($scope.variablePacket.myState == 1){
			$scope.insertChoice_selectTypeTab(0,$rootScope.treetype);
		}else{
			$scope.insertChoice_selectTestPareTypeTab(0,$rootScope.treetype);
		}		
	}
}]);


app.controller('practiceContentCtrl', ['$scope','$rootScope','$state', '$timeout', '$http', '$location', '$anchorScroll', '$interval', 'templateServer', 'scrollbar', '$stateParams','$rootScope','myResourceService', function($scope,$rootScope,$state, $timeout, $http, $location, $anchorScroll, $interval, templateServer, scrollbar, $stateParams,$rootScope,myResourceService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '作业';
	
	//$rootScope.treetype = "0";
	var signArr=[];
	//var teacherId = "84d5f23a09a8494f9cb4046392fcea55";
	var teacherId = sessionStorage.getItem('userId');//获取
	//http://192.168.9.120:7400/a/quzType?token=29B5DF07F7FC514807CE5FBC12EA1506
	$http.get(questionUrl+"a/quzType?token="+token).success(function(data){
		var quesType = {};
		var quesTypes = [];
		angular.forEach(data.data,function(e,i){
			quesType = {};
			quesType.id = e.id;
			quesType.Id = i;
			quesType.name = e.name;
			quesType.show = false;
			if(e.name=="单选题"){
				quesType.Type = "single";
			}else if(e.name=="多选题"){
				quesType.Type = "many";
			}else if(e.name=="判断题"){
				quesType.Type = "judge";
			}else if(e.name=="填空题"){
				quesType.Type = "fillIn";
			}else if(e.name=="材料题"){
				quesType.Type = "material";
			}else if(e.name=="简答题"){
				quesType.Type = "briefAnswer";
			}else if(e.name=="完形填空"){
				quesType.Type = "clozeCloze";
			}else if(e.name=="阅读理解"){
				quesType.Type = "reading";
			}
			quesTypes.push(quesType);
		})
		console.log(quesTypes);
		$scope.variablePacket.eightSwitchOut = quesTypes;
		$scope.variablePacket.type = data.data[0].id;
	})
	//变量包
	$scope.variablePacket = {
		eightSwitchOut: [ //页面上展示的8种题型
			{"name":"单选题",Type:'single',show:false},     
			{"name":"多选题",Type:'many',show:false},
			{"name":"判断题",Type:'judge',show:false},
			{"name":"填空题",Type:'fillIn',show:false},
			{"name":"材料题",Type:'material',show:false},
			{"name":"简答题",Type:'briefAnswer',show:false},
			{"name":"完形填空",Type:'clozeCloze',show:false},
			{"name":"阅读理解",Type:'reading',show:false}
		],
		threeSwitch: [
			{"name":"我的题库"},
			{"name":"校本题库"},
			{"name":"公共题库"}
		],
		SelectType: [
			{"name":"全部"},
			{"name":"视频"},
			{"name":"音频"},
			{"name":"图片"},
			{"name":"PPT"},
			{"name":"WORD"},
			{"name":"EXCEL"}
			
		],
		classaName:[
			
		],
		arrSubject : [],
		state: $stateParams.state, //new:布置练习		edit:编辑练习		echo：复制练习
		delShow: true, //插入资源弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex: false, //弹层层级提高一级；
		titFixed: false, //吸顶样式
		testPaperTit:false,//试卷标题
		Plotting:true,//上下移，删除等是否显示
		LookCard:false,//查看答题卡是否显示
		LookCardActive:false,//控制查看答题卡后图标
		LookAnswerCard:false,//答题卡模块是否显示
		AnswerCardMask:false,//查看答题卡添加遮盖层
		insertChoiceAll:false,//总弹出开关
		insertChoice: null, //弹层主内容--添加习题：topic  添加试卷：testPaper   插入资源：resources
		insertChoice_threeType: 0, //弹层--（我的题库，公共题库，校本题库的默认选择状态）
		insertChoice_eightType: 0, //弹层--8种题型的默认状态
		insertChoice_selectType: 0, //弹层--插入的类型默认状态
		Chapter:[{Onetit:'课本',Twotit:'章',Threetit:'节'}],//章节默认
		eightSwitchOut_show:$timeout(function(){$scope.questionBank.Out==[]?false:true}),//页面--8种题型显示条是否显示
		banOne:false,//添加习题禁止点击
		banTwo:false,//添加试卷禁止点击
		MessageOff:false,//练习名称开关
		ProvingUsername:false,//练习名称验证
		UsernameMessage:'',//练习名称的文字
		ProvingChapter:false,//章节目录验证
		ExplainOff:false,//练习说明开关
		ExplainMessage:'',//练习说明的文字
		ProvingExplain:false,//练习说明验证
		ObjecOff:false,//发布对象开关
		ProvingObject:false,//发布对象验证
		ProvingDate:false,//作答时间验证
		DateOff:false,//作答时间开关
		ProvingContent:false,//练习内容验证
		SubjectOff:false,//学科验证开关
		ProvingSubject:false,//学科验证
		insertResource: false, //插入资源回显弹出开关
		clickResourceName:'',  
		type:2,
		questionCount:0,
		leftTreeShow : {					//左侧树展示
            teachingMaterial : true,		//版本选择框
            treeOne : true,					//版本选择框下的树
            treeKnowledgePoint : false,		//知识点树
            other : false,						//其他
      }
	}
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
	//赋值弹层的自适应高度
	function adaptionHeight(){
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight,.addTestPaper').height(bigHeight - 275);
			angular.element('.addTestPaper').height(bigHeight-120);
			angular.element('.mlh_cont').height(bigHeight - 80);
			console.log(bigHeight)
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".addTestPaper").mCustomScrollbar({
				mouseWheelPixels : 1000,	//滚动速度
				theme: "3d-dark"			//滚动条样式
			});
			angular.element(".mlh_cont").mCustomScrollbar({//mlh
				mouseWheelPixels: 1000, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
		});
	}
	//插入资源回显弹层--开启
	$scope.insertResource = function(resourceName) {
		if(resourceName.objId==undefined){
			$http.get(resourcesIp+'/a/resource/'+resourceName.rid+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
		        if(data.code == 200){
					ossidse = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
					ossbj = data.data.objId;
					getossid(ossidse,ossbj,resourceName.ResourceTit);
		        }
			})
		}else{
			$scope.variablePacket.clickResourceName=resourceName.ResourceTit;
			$scope.variablePacket.insertResource = true;
			adaptionHeight();
			$scope.resourceBoxFn(resourceName.ossid,resourceName.ResourceTit,resourceName.objId);
		}
	}
	var ossidse = "";
	var ossbj = "";
	function getossid(ossidse,ossbj,ResourceTit) {
		$scope.variablePacket.clickResourceName=ResourceTit;
		$scope.variablePacket.insertResource = true;
		adaptionHeight();
		$scope.resourceBoxFn(ossidse,ResourceTit,ossbj);
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
						console.log(data.data.pathmp4PC)
						console.log(data.data.pathmp4PAD)
						
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
						console.log(data.data.pathmp3PC)
						console.log(data.data.pathmp3PAD)
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
	//双日历
	$scope.ChangeDate = function(){
		fcount = 0;
		//时间 $scope.variablePacket.selectDate
		$scope.variablePacket.selectDate = $(".timer").val();
		if($scope.variablePacket.selectDate.length>0){
			$scope.variablePacket.ProvingDate = false;
			
			$scope.variablePacket.ProvingOff = true;
		}else{
			$scope.variablePacket.ProvingDate = true;
		}
	}
	
	
	//导学说明
	$scope.zyx_Explain = function(){
		fcount= 0;
		if($scope.variablePacket.ExplainMessage.length>0){
			$scope.variablePacket.ProvingExplain = false;
			$scope.variablePacket.ExplainOff = true;
		}
	}
	
	//导学名称
	$scope.zyx_username = function(){
		fcount = 0;
		if($scope.variablePacket.UsernameMessage.length>0){
				//作业名称验证Verification
		    var urls = lessonIp+"ExamCount/selectNamecount?name=";
			$http.get(urls+$scope.variablePacket.UsernameMessage).success(function (response) {
				if(response.flag=="0"){
					$scope.variablePacket.Texeam =  false;
				}else{
					$scope.variablePacket.Texeam =  true;
				}
			})
			$scope.variablePacket.ProvingUsername = false;
			$scope.variablePacket.MessageOff = true;
		}
	}
	$timeout(function(){
		$scope.zyx_username();
		
	},2000)
	
	//学科验证
	$scope.Subject = function(){
		fcount = 0;
		if($scope.selectedSubject!=undefined){
			$scope.variablePacket.ProvingSubject = false;
			$scope.variablePacket.SubjectOff = true;
		}
		if($scope.selectedSubject==undefined){
			console.log($scope.selectedSubject)
			$scope.variablePacket.ProvingSubject = true;
		}
		$rootScope.initchoiceVersion();
	};
	//章节目录的回显验证
	$scope.Chapter = function(){
		fcount = 0;
		$timeout(function(){
			$scope.$apply(function(){
				$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
				$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
				$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
			})
			if(($scope.variablePacket.Chapter[0].Onetit!="课本") || ($scope.variablePacket.Chapter[0].Twotit!="章") || ($scope.variablePacket.Chapter[0].Threetit!="节")){
				$scope.variablePacket.ProvingChapter = false;
			}
		});
	}
	var subs = [];
	/**
    * 查询当前教师的 授课信息
    */
    $http.get(zyxrequireIp + '/uc/user/'+teacherId).success(function(suc) {
    	$scope.variablePacket.selectSubject=[];
    	$scope.variablePacket.classTonames=[];
        if(suc.ret == 200) {
        	var data = suc.data;
        	$scope.requs.userId = data.id;
        	$scope.requs.realname = data.realname;
        	console.log(data);
        	var subMapTem = {};
        	var claMapTem = {};
        	$scope.variablePacket.officeId = data.officeId;
    		angular.forEach(data.userCourse, function(item){
    			if(typeof(subMapTem[item.subjectId])=="undefined"){
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
	                $scope.variablePacket.selectSubject.push(subj);
	                subs = $scope.variablePacket.arrSubject;
	                console.info($scope.variablePacket.arrSubject);
	                subMapTem[item.subjectId] = subj;
    			}
    			if(typeof(claMapTem[item.classId])=="undefined"){
    				var clas = {
	                    classId:item.classId,
	                    name :item.gradeName+item.className+"班",
	                };
	                $scope.variablePacket.classaName.push(clas);
	                console.info($scope.variablePacket.classaName);
	                claMapTem[item.classId] = clas;
    			}
                
            });
        }
    });
   
    $scope.variablePacket.quessortstype=10;
    //复制
    setTimeout(function(){
    	if($stateParams.quesid!=null&&$stateParams.quesid!=undefined&&$stateParams.quesid!=""){
		$http.get(lessonIp+"ExamCount/cocpExam?examId="+$stateParams.quesid).success(function(data){
			console.log(data);
			var datas = data.data;
			if(data.message=="success"){
				if($stateParams.state=="edit"){
					//作业名称
					$scope.variablePacket.UsernameMessage = "编辑"+datas.name;
				}else{
					//作业名称
					$scope.variablePacket.UsernameMessage = "复制"+datas.name;
				}
				//作业说明
				$scope.variablePacket.ExplainMessage = datas.remark;
				//时间
				$scope.variablePacket.selectDate = datas.startTime+"至"+datas.endTime;
				//树ids
				$scope.practice.subjIds=datas.treeIds;
				//树names
				$scope.practice.treeNames=datas.treeNames
				//科目名称
				//var subs = $scope.variablePacket.arrSubject;
				angular.forEach(subs,function(e){
					if(e.id==datas.subjectId){
						$scope.selectedSubject = e;
					}
				})
				$scope.practice.subjNames = $scope.practice.treeNames;
				$(".titleSpan em").eq(0).html($scope.practice.treeNames.split("//").slice(-3)[0]);
				$(".titleSpan em").eq(1).html($scope.practice.treeNames.split("//").slice(-3)[1]);
				$(".titleSpan em").eq(2).html($scope.practice.treeNames.split("//").slice(-3)[2]);
				$scope.variablePacket.Chapter[0].Onetit=$scope.practice.treeNames.split("//").slice(-3)[0];
				$scope.variablePacket.Chapter[0].Twotit=$scope.practice.treeNames.split("//").slice(-3)[1];
				$scope.variablePacket.Chapter[0].Threetit=$scope.practice.treeNames.split("//").slice(-3)[2];
				
				var examType = datas.examType;
				$scope.variablePacket.quessortstype=examType;
				$scope.variablePacket.examType = examType;
				//0试题，1试卷，2答题卡
				if(examType==0){
					//$scope.variablePacket.eightSwitchOut_show = true;
					//$scope.Top = angular.element(".zyx_lines").offset().top;
					$scope.variablePacket.banOne = false;
					$scope.variablePacket.banTwo = true;
					var yypepp = "";
					angular.forEach(datas.examQuestionMap,function(e){
					angular.forEach(e.questions,function(i,r){
					var qu = {};	
					qu.queTit = i.body;
					signArr.push(i.qid);
					if(i.type=="1"){
						if(qu.Answer=="T"){
							qu.Answer = "正确";
						}else if(qu.Answer=="F"){
							qu.Answer = "错误";
						}
					}else{
						qu.Answer = i.answer;
					}
				
					qu.Analysis = i.analysis;
					qu.id = i.qid;
					qu.Id = r;
					qu.sign = true;
					qu.queTit = i.body;;
					qu.Chapter = [{
						"Onetit":"",
						"Threetit": "",
						"Twotit": ""
					}];
					var ser = JSON.parse(i.resourceJson);
					console.log(ser[0])
					if(ser.length==0){
						qu.CanResource=false;
					}else{
						$scope.variablePacket.myziid = ser[0].rid;
						if(JSON.parse(i.resourceJson)[0].name==""){
							qu.CanResource=false;
						}else{
							var ossidse1 = "";
							var ossbj1 = "";
							$http.get(resourcesIp+'/a/resource/'+JSON.parse(i.resourceJson)[0].rid+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
						        if(data.code == 200){
									ossidse1 = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
									ossbj1 = data.data.objId;
									qu.CanResource=true;
									qu.Resource=[{
										"ResourceNum": 0,
										"ResourceSrc": ossbj1,
										"ResourceTit": JSON.parse(i.resourceJson)[0].name,
										"rid":JSON.parse(i.resourceJson)[0].rid,
										"type":ossbj1
									}];
						        }
							})
							
						}
					}
					
					
					if(i.type=="2"){
						yypepp = 'single';
					}else if(i.type=="4"){
						yypepp = 'many'; 
					}else if(i.type=="1"){
						yypepp = 'judge'; 
					}else if(i.type=="3"){
						yypepp = 'fillIn'; 
					}else if(i.type=="8"){
						yypepp = 'material'; 
					}else if(i.type=="6"){
						yypepp = 'briefAnswer'; 
					}else if(i.type=="7"){
						yypepp = 'clozeCloze'; 
					}else if(i.type=="5"){
						yypepp = 'reading'; 
					}
					angular.forEach($scope.variablePacket.eightSwitchOut,function(ss){
						if(ss.Type==yypepp){
							ss.show=true;
						}
					})
					qu.Type = yypepp;
					$scope.questionBank.Out[yypepp].push(qu);
					
					})
				})
					//组卷
				}else if(examType==1){
					$scope.variablePacket.delShows = false;
					$scope.variablePacket.banTwo = false;
					$scope.variablePacket.banOne = true;
					$scope.variablePacket.paperid = datas.examAssembly.assemblyId;
					$scope.variablePacket.addresid =  datas.examAssembly.assemblyId;
					$scope.variablePacket.AnswerCardMask = true;
					//试卷标题
					$scope.variablePacket.testPaperTit = true;
					//试卷名称
					$scope.testname = datas.examAssembly.name;
					var questionMap = datas.examAssembly.questionMap;
					var count = 0;
					angular.forEach(questionMap,function(e){
						angular.forEach(e.questions,function(s,i){
						var json1 = {};
						json1.Resource = [];
						if(s.resourceJson==""){
							var jsontemp = {};
							jsontemp.ResourceTit = "";
							jsontemp.ResourceSrc = 0;
							jsontemp.ResourceNum = 0;
							json1.Resource.push(jsontemp);
							json1.CanResource = false;
						}else{
							var jsontemp = {};
							json1.CanResource = true;
							if(JSON.parse(s.resourceJson)[0].ossFileName.lastIndexOf('.')!=-1){
								jsontemp.ossid =JSON.parse(s.resourceJson)[0].ossFileName.substr(0, JSON.parse(s.resourceJson)[0].ossFileName.lastIndexOf('.'));
							}else{
								jsontemp.ossid = JSON.parse(s.resourceJson)[0].ossFileName;
							}
							jsontemp.ResourceTit =JSON.parse(s.resourceJson)[0].name;
							jsontemp.ResourceSrc = JSON.parse(s.resourceJson)[0].type;
							jsontemp.ResourceNum = 0;
							jsontemp.ResourceId = JSON.parse(s.resourceJson)[0].rid;
							jsontemp.objId = JSON.parse(s.resourceJson)[0].type;
							json1.Resource.push(jsontemp);
						}
						json1.Id = i;
						json1.id = s.id;
						json1.sign = false;
					    json1.AnswerShow=false;
					    json1.ResourceShow=false;
					    json1.queTit=s.body;
					    if(s.answer=="T"){
					    	json1.Answer="正确";
					    }else{
					    	json1.Answer="错误";
					    }
					    if(s.analysis!=""&&s.analysis!=undefined){
					    	var b = s.analysis;
					    	json1.Analysis=b;
					    }else{
					    	json1.Analysis="没有解析"
					    }
					    json1.Chapter = [];
						var jsontemp = {};
						jsontemp.Onetit = "学科";
						jsontemp.Twotit = "课本";
						jsontemp.Threetit = "章节";
						json1.Chapter.push(jsontemp);
						if(s.type=="2"){
							json1.Type = "single";
							$scope.questionBank.Out.single.push(json1);
						}else if(s.type=="4"){
							json1.Type = "many";
							$scope.questionBank.Out.many.push(json1);
						}else if(s.type=="1"){
							json1.Type = "judge";
							$scope.questionBank.Out.judge.push(json1);
						}else if(s.type=="3"){
							json1.Type = "fillIn";
							$scope.questionBank.Out.fillIn.push(json1);
						}else if(s.type=="8"){
							json1.Type = "material";
							$scope.questionBank.Out.material.push(json1);
						}else if(s.type=="6"){
							json1.Type = "briefAnswer";
							$scope.questionBank.Out.briefAnswer.push(json1);
						}else if(s.type=="7"){
							json1.Type = "clozeCloze";
							$scope.questionBank.Out.clozeCloze.push(json1);
						}else if(s.type=="5"){
							json1.Type = "reading";
							$scope.questionBank.Out.reading.push(json1);
						}
					})
					})
					//答题卡试卷
				}else if(examType==2){
					$scope.variablePacket.banTwo = false;
					$scope.variablePacket.banOne = true;
					//试卷图片
					var ims = [];
					//试卷id
					$scope.variablePacket.addresid =  datas.examAssembly.assemblyId;
					$scope.variablePacket.paperid = datas.examAssembly.assemblyId;
					//图片
					//var quesionImgList = ;
					//答题卡
					var questionOptionMap = datas.examAssembly.questionOptionMap
					angular.forEach(datas.examAssembly.questionImgList,function(m){
						ims.push(uploadPreviewUrl+m.name);
					})
					$scope.variablePacket.quesionImgList=ims;
					$scope.questionBank.In.single = [];
					$scope.questionBank.In.many = [];
					$scope.questionBank.In.judge = [];
					$scope.questionBank.In.fillIn = [];
					$scope.questionBank.In.material = [];
					$scope.questionBank.In.briefAnswer = [];
					$scope.questionBank.In.clozeCloze = [];
					$scope.questionBank.In.reading = [];
					angular.forEach(questionOptionMap,function(s){
					angular.forEach(s.questions,function(e){
						var swer = {}
						//swer.Type = parseInt(e.type);
						if(e.type=="2"){
							swer.Type = 'single';
							swer.Answer = e.answer;
						}else if(e.type=="4"){
							var Answer={};
							swer.Type = 'many'; 
							var manyanw = e.answer.split(",");
							angular.forEach(manyanw,function(r){
								if(r=='A'){
									Answer.daanA = true;
								}else if(r=='B'){
									Answer.daanB = true;
								}else if(r=='C'){
									Answer.daanC = true;
								}else if(r=='D'){
									Answer.daanD = true;
								}
							})
							swer.Answer = Answer;
						}else if(e.type=="1"){
							swer.Type = 'judge'; 
							if(e.answer=="T"){
					    		swer.Answer="正确";
						    }else{
						    	swer.Answer="错误";
						    }
						}else if(e.type=="3"){
							var Answer=[];
							swer.Type = 'fillIn'; 
							var fillInanw = e.answer.split("|");
							angular.forEach(fillInanw,function(r){
								Answer.push(r);
							})
							swer.Answer = Answer;
						}else if(e.type=="8"){
							swer.Type = 'material'; 
							swer.Answer = e.answer;
						}else if(e.type=="6"){
							swer.Type = 'briefAnswer'; 
							swer.Answer = e.answer;
							//json1.Type = "briefAnswer";
						}else if(e.type=="7"){
							swer.Type = 'clozeCloze'; 
							var optList = [];
							var clozeClozenanw = e.answer.split(",");
							angular.forEach(clozeClozenanw,function(r){
								optList.push(r);
							})
							swer.optList = optList;
						}else if(e.type=="5"){
							swer.Type = 'reading'; 
							var optList = [];
							var readinganw = e.answer.split(",");
							angular.forEach(readinganw,function(r){
								optList.push(r);
							})
							swer.optList = optList;
						}
						swer.Analysis = e.analysis;
						swer.AnswerShow = false;
						$scope.getSwitchQuzByType(swer.Type,swer);
					})
				})
					$scope.variablePacket.LookCard = true;
					//试卷标题
					$scope.variablePacket.testPaperTit = true;
					//试卷名称
					$scope.testname = datas.examAssembly.name;
				}
			}
			console.log(data);
			
		})
	
    }
    },500)
    
    
    
    
    $scope.practice = {};
    $scope.resParams = {};
    // 根据左侧树查询
$rootScope.findListByTree = function(subjectID,knowledge) {
	$scope.variablePacket.zjpageSize=8;
	$scope.variablePacket.sjpageSizes=8;
	$scope.variablePacket.pageSizes=3;
	  if(subjectID != ""){
	        $scope.resParams.subjectID = subjectID;
	  }
	  if(knowledge != ""){
	        $scope.resParams.knowledge = knowledge;
	  }
  	
    if($scope.variablePacket.qufen==0){
	    //加载试题
	    $scope.insertChoice_eightSwitchTab($scope.variablePacket.type,$scope.variablePacket.statequ);
    }else if($scope.variablePacket.qufen==1){
    	$rootScope.treetype = 0;
    	//加载试卷
		$scope.exempng();
    }else if($scope.variablePacket.qufen==2){
    	$rootScope.treetype = 0;
    	//加载资源
    	$scope.insertzy();
    }
    
};
    /**
	 * 获取左侧 id name	getGradeNo
	 */
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.practice.subjIds = ids;
    	$scope.practice.subjNames = names;
    	$scope.practice.gradeJson = gradeJson;
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
	//$scope.variablePacket.ProvingChapter = true;
/*	//章节目录的回显验证
	$scope.Chapter = function(){
		$timeout(function(){
			$scope.$apply(function(){
				$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
				$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
				$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
			})
			if(($scope.variablePacket.Chapter[0].Onetit!="课本") || ($scope.variablePacket.Chapter[0].Twotit!="章") || ($scope.variablePacket.Chapter[0].Threetit!="节")){
				$scope.variablePacket.ProvingChapter = false;
			}
		});
	}*/
	
	//发布对象
	$scope.classaNameTab = function(index){
		fcount = 0;
		$scope.variablePacket.classaName[index].active = !$scope.variablePacket.classaName[index].active;
		var activeArr = [];
		angular.forEach($scope.variablePacket.classaName,function(e){
			this.push(e.active);
		},activeArr);
		if(activeArr.indexOf(true)==-1){
			$scope.variablePacket.ProvingObject = true;
			$scope.variablePacket.ObjecOff = true;
		}else{
			$scope.variablePacket.ProvingObject = false;
			$scope.variablePacket.ObjecOff = false;
		}
	}
	$scope.requs = {};
	//测试发布
	$scope.Release = function(){
		$scope.zyx_username();
		if($scope.variablePacket.Texeam == true){
			return false;
		}
		var count = 0;
		console.log($scope.variablePacket.eightSwitchOut);
		console.log($scope.questionBank.Out);
		$scope.variablePacket.quessorts = [];
		var quessort = {};
		var quessorts = [];
		var indexFlag = {};
		var indexFlags = [];
		angular.forEach($scope.variablePacket.eightSwitchOut,function(e,i){
			indexFlag = {};
			if($scope.variablePacket.quessortstype==1){
				indexFlag.id = e.id;
				indexFlag.index = i;
				indexFlags.push(indexFlag);
			}else{
				if(e.show==true){
					indexFlag.id = e.id;
					indexFlag.index = i;
					indexFlags.push(indexFlag);
				}
			}
			
		});
		console.log(indexFlags)
		angular.forEach(indexFlags,function(e,i){
			var tixing;
			if(e.index==0){
				tixing = "single";
			}else if(e.index==1){
				tixing = "many";
			}else if(e.index==2){
				tixing = "judge";
			}else if(e.index==3){
				tixing = "fillIn";
			}else if(e.index==4){
				tixing = "material";
			}else if(e.index==5){
				tixing = "briefAnswer";
			}else if(e.index==6){
				tixing = "clozeCloze";
			}else if(e.index==7){
				tixing = "reading";
			}
			angular.forEach($scope.questionBank.Out[tixing],function(ee,ii){
				count++;
				quessort = {};
				quessort.bigId = e.id;
				quessort.bigSort = i+1;
				quessort.qid = ee.id;
				quessort.sort = count;//ii+1;
				if(ee.Resource!=undefined){
					quessort.rid  = ee.Resource[0].rid;
					if(ee.Resource[0].type==undefined){
						quessort.type = ee.Resource[0].objId;
					}else{
						quessort.type = ee.Resource[0].type;
					}
					quessort.name  = ee.Resource[0].ResourceTit;
				}else{
					quessort.name  =  "";
				}
				if(quessort.rid==undefined){
					quessort.rid = "";
				}
				if(quessort.type==undefined){
					quessort.type ="";
				}
				quessorts.push(quessort);
			});
		});
		$scope.variablePacket.quessorts = quessorts;
		//测试名称
		var examName = $scope.variablePacket.UsernameMessage;
		//获取学科id和名称
		var examsubject = $scope.selectedSubject;
		var subjectName = examsubject.name;
		var subjectId = examsubject.id;
		//章节树ids
		var treeIds = $scope.practice.subjIds;
		//章节树names
		var treeNames=$scope.practice.subjNames;
		//习题说明
		var remark = $scope.variablePacket.ExplainMessage;
		//时间
		var toTime = $scope.variablePacket.selectDate;
		//班级
		var toClass = $scope.variablePacket.classaName;
		var classs = "";
		var classNames = "";
		angular.forEach(toClass,function(e){
			if(e.active==true){
				classs += e.classId+",";
				classNames += e.name+",";
			}
		});
		var teacherId = $scope.requs.userId;
        var teacherName = $scope.requs.realname;
		var type = "0";
		var state = "1";
		var content = "";
		var typeex = $scope.variablePacket.examType;
		var asid = $scope.variablePacket.addresid;
		var examsubject = JSON.stringify(examsubject);
		var quessorts = JSON.stringify(quessorts);
		var params = {examName:examName,examsubject:examsubject,subjectName:subjectName,subjectId:subjectId,
			treeIds:treeIds,treeNames:treeNames,remark:remark,toTime:toTime,
			classs:classs,classNames:classNames,quessorts:quessorts,types:type,teacherName:teacherName
		,teacherId:teacherId,content:content,examType: typeex,addresid:asid,state:state};
		$http.post(lessonIp+"ExamCount/addExamCount", params).success(function(response) {
			if(response.ret==200){
				if($stateParams.state=="edit"){
					var url = lessonIp+"ExamCount/deleteExam?examId=";
					$http.get(url + $stateParams.quesid+"&type="+"0"+"&classid="+"").success(function (response) {
					 	var examjson = JSON.stringify(response);
				    	var examjsons = JSON.parse(examjson)
				    	if(examjsons.ret==200){
				    		$state.go('secondNav.homeworkList');
				    	}
					});
				}else{
					$state.go('secondNav.homeworkList');
				}
			}else{
				fcount=0;
				$scope.wranShow('提交失败',false)
			}
		});
	}
	var fcount = 0;
	//发布
	$scope.Verification = function(ok){
		fcount++;
		for(var i in $scope.questionBank.Out){
       	   	 if($scope.questionBank.Out[i].length){
       	   	 	$scope.variablePacket.eightSwitchOut_show=true;
       	   	 }
       	   	 
       	 };
       	 var arr=[];
       	 angular.forEach($scope.variablePacket.classaName,function(e){
       	 	  arr.push(e.active);
       	 });
       	 if(arr.indexOf(true)!=-1){
       	 	   	$scope.variablePacket.ProvingObject=false;
       	 }else{
       	 		$scope.variablePacket.ProvingObject=true;
       	 };
		if(ok && (!$scope.variablePacket.ProvingUsername)&& (!$scope.variablePacket.Texeam) && (!$scope.variablePacket.ProvingSubject) && ($scope.variablePacket.Chapter[0].Onetit!="课本" && $scope.variablePacket.Chapter[0].Twotit!="章" && $scope.variablePacket.Chapter[0].Threetit!="节") && (!$scope.variablePacket.ProvingExplain) &&  (!$scope.variablePacket.ProvingObject) && (!$scope.variablePacket.ProvingDate) && ( $scope.variablePacket.eightSwitchOut_show || $scope.variablePacket.LookCard)){
			$scope.wranShow('验证成功!',true,'');
			
			//alert(111)
			if(fcount==1){
				$scope.Release();
			}
			///$scope.Release();
			//$timeout(function(){$state.go("secondNav.guideList")},1500)
		}else{
//			if(!$scope.variablePacket.eightSwitchOut_show & !$scope.variablePacket.LookCard){
//				console.log($scope.variablePacket.eightSwitchOut_show);
//				console.log($scope.variablePacket.LookCard)
//				$scope.variablePacket.ProvingContent = true;
//			}
       	   
           
            
			if(($scope.variablePacket.Chapter[0].Onetit=="课本") || ($scope.variablePacket.Chapter[0].Twotit=="章") || ($scope.variablePacket.Chapter[0].Threetit=="节")){
				
				$scope.variablePacket.ProvingChapter = true;
			}
			if(!$scope.variablePacket.ProvingExplain && !$scope.variablePacket.ExplainOff){
				$scope.variablePacket.ProvingExplain = true;
			}
		
			if(!$scope.variablePacket.ProvingUsername && !$scope.variablePacket.MessageOff){
				
				$scope.variablePacket.ProvingUsername = true;
		
			};
			$scope.zyx_username();
			$scope.Subject();
			$scope.Chapter();
			$scope.zyx_Explain();
			$scope.ChangeDate();
			
			var activeArr = [];
			angular.forEach($scope.variablePacket.classaName,function(e){
				this.push(e.active);
			},activeArr)
			if(activeArr.indexOf(true)==-1){
				$scope.variablePacket.ProvingObject = true;
				$scope.variablePacket.ObjecOff = true;
			}
//			if(!$scope.variablePacket.ProvingDate && !$scope.variablePacket.DateOff){
//				console.log(5555)
//				$scope.variablePacket.ProvingDate = true;
//				$scope.variablePacket.DateOff = true;
//			}
           
			if(!$scope.variablePacket.ProvingSubject && !$scope.variablePacket.SubjectOff){
				$scope.variablePacket.ProvingSubject = true;
			}
		}
	}
	var delIndex = 0;
	//题目的删除
	$scope.Del = function(type, index, id, number,qid) {
		delIndex = index;
		$scope.promptShow('确认删除？',false,''+ $scope.variablePacket.eightSwitchOut[number].name  +'');
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.questionBank.Out[type].splice(delIndex,1);
			/*var index=signArr.indexOf(qid);
	   	    if(index!=-1){
	   	   	   signArr.splice(index,1)
	   	    }*/
			var index=signArr.indexOf(qid);
	   	    if(index!=-1){
	   	   	   signArr.splice(index,1)
	   	    }
			$scope.wranShow('已删除',false,''+ $scope.variablePacket.eightSwitchOut[number].name  +'');
			if($scope.questionBank.Out[type].length == 0){
				$scope.variablePacket.eightSwitchOut[number].show = false;
			}
			//$scope.questionBank.In[type][id].sign = false;
			var hasTrue = [];
			angular.forEach($scope.variablePacket.eightSwitchOut,function(e,i){
				this.push(e.show);
			}, hasTrue);
			if(hasTrue.indexOf(true)==-1){
				$scope.variablePacket.eightSwitchOut_show = false;
				$scope.variablePacket.banTwo = false;
				doubleEvent();
			}
		}
	}
	
	$('p').addClass('.active')
	

	//资源列条上的删除
	$scope.delResource = function(tit, type, index) {
		$scope.promptShow('确认删除？', false, tit);
		$scope.delOk = function() {
			$scope.variablePacket.myziid = "";
			$scope.variablePacket.prompt = false;
			$scope.questionBank.Out[type][index].CanResource = false;
			$scope.questionBank.Out[type][index].Resource = [];
			$scope.questionBank.In[index].CanResource = false;
			//$scope.questionBank.In[index][type].Resource = [];
			$scope.wranShow('已删除', false, tit);
			//$scope.variablePacket.myziid = "";
		}
		if($scope.variablePacket.insertChoiceAll) {
			$scope.variablePacket.maskZindex = true;
		} else {
			$scope.variablePacket.maskZindex = false;
		}
	}

	//上移
	$scope.MoveUp = function(type, index) {
		var TopObj = angular.copy($scope.questionBank.Out[type][index - 1]);
		$scope.questionBank.Out[type][index - 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = TopObj;
	}

	//下移
	$scope.MoveDown = function(type, index) {
		var BootomObj = angular.copy($scope.questionBank.Out[type][index + 1]);
		$scope.questionBank.Out[type][index + 1] = $scope.questionBank.Out[type][index];
		$scope.questionBank.Out[type][index] = BootomObj;
	}
	$scope.variablePacket.myziid = "";
	//var zyarr = [];
	//插入资源
	$scope.Charu = function(type, i,o) {
		$scope.variablePacket.insertChoice_threeType=0;
		$scope.variablePacket.statequ = 0;
		console.log(o);
		if(o.Resource!=undefined&&o.Resource[0]!=undefined){
			$scope.variablePacket.myziid = o.Resource[0].rid;
		}
		$scope.insertzy();
		$scope.variablePacket.qufen=2;
		$scope.variablePacket.insertChoiceAll = true;
		$scope.variablePacket.insertChoice = "resources"; 
		$scope.variablePacket.threeSwitch = [{"name":"我的资源"},{"name":"校本资源"},{"name":"公共资源"}];
		adaptionHeight();
		//插入资源--加减号
		$scope.insert_Sign = function(index) {
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
		
			if($scope.insertData[index].sign) {
				if(o.Resource!=undefined&&o.Resource[0]!=undefined){
					$scope.variablePacket.myziid = o.Resource[0].rid
				}
				$scope.questionBank.Out[type][i].CanResource = true;
				
				if($scope.questionBank.Out[type][i].Resource==undefined||$scope.questionBank.Out[type][i].Resource.length==0){
					$scope.questionBank.Out[type][i].Resource = [];
					var sertr = {};
					sertr.ResourceTit = $scope.insertData[index].ResourceTit;
					sertr.ResourceSrc = $scope.insertData[index].objId;
					sertr.ResourceNum = $scope.insertData[index].ResourceNum;
					sertr.rid = $scope.insertData[index].id;
					sertr.objId = $scope.insertData[index].objId;
					sertr.ossid = $scope.insertData[index].ossid;
					sertr.sourceType = $scope.insertData[index].sourceType;
					$scope.questionBank.Out[type][i].Resource.push(sertr);
				}else{
					$scope.questionBank.Out[type][i].Resource[0].ResourceTit = $scope.insertData[index].ResourceTit;
					$scope.questionBank.Out[type][i].Resource[0].ResourceSrc = $scope.insertData[index].objId;
					$scope.questionBank.Out[type][i].Resource[0].ResourceNum = $scope.insertData[index].ResourceNum;
					$scope.questionBank.Out[type][i].Resource[0].rid = $scope.insertData[index].id;
					$scope.questionBank.Out[type][i].Resource[0].objId = $scope.insertData[index].objId;
					$scope.questionBank.Out[type][i].Resource[0].ossid = $scope.insertData[index].ossid;
					$scope.questionBank.Out[type][i].Resource[0].sourceType = $scope.insertData[index].sourceType;
				}
				$scope.questionBank.In[i].CanResource = true;
				$scope.questionBank.In[i].ResourceTit = $scope.insertData[index].ResourceTit;
				$scope.questionBank.In[i].ResourceSrc = $scope.insertData[index].ResourceSrc;
				angular.forEach($scope.insertData, function(e, i) {
					$scope.insertData[i].sign = false;
				});
				$scope.insertData[$scope.questionBank.Out[type][i].Resource[0].ResourceNum-1].sign = true;
			} else {
				$scope.variablePacket.myziid = "";
				$scope.insertzy();
				$scope.questionBank.Out[type][i].CanResource = false;
				$scope.questionBank.In[i].CanResource = false;
			}
		}
		if($scope.questionBank.Out[type][i].CanResource) {
			angular.forEach($scope.insertData, function(e, i) {
				$scope.insertData[i].sign = false;
			});
			$scope.insertData[$scope.questionBank.Out[type][i].Resource[0].ResourceNum].sign = true;
		} else {
			angular.forEach($scope.insertData, function(e, i) {
				$scope.insertData[i].sign = false;
			});
	
		}
	}
	
	//试卷删除
	$scope.delTest = function(){
		$scope.promptShow('确认删除该试卷吗？',false,'');
		$scope.delOk = function(){
			$scope.variablePacket.paperid = "";	
			$scope.variablePacket.prompt = false;
			angular.forEach($scope.insertTest,function(e){
				e.sign = false;
			});
			$scope.variablePacket.testPaperTit = false; 
			$scope.variablePacket.eightSwitchOut_show = false;
			if(!$scope.variablePacket.testPaperTit){ 
				$scope.variablePacket.banOne = false;
				doubleEvent();
			}
			$scope.variablePacket.LookCard = false;
			angular.forEach($scope.variablePacket.eightSwitchOut,function(e){
				e.show = false;
			})
			$scope.questionBank.Out = {
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
	}
	
	doubleEvent();
	function doubleEvent(){
		if(!$scope.variablePacket.banOne){
			//添加习题
			$scope.addTopice = function() {
				$scope.variablePacket.delShows = true;
				$scope.variablePacket.leftTreeShow.teachingMaterial = false;
				$scope.variablePacket.insertChoice_threeType = 0;
				$scope.variablePacket.statequ = 0;
				fcount = 0;
				//$scope.variablePacket.leftTreeShow.teachingMaterial = false;
				$scope.insertChoice_eightSwitchTab(2,0);
				$scope.variablePacket.qufen = 0;
				$scope.variablePacket.insertChoiceAll=true;
				$scope.variablePacket.insertChoice="topic";
				$scope.variablePacket.threeSwitch = [{"name":"我的题库"},{"name":"校本题库"},{"name":"公共题库"}];
				adaptionHeight();
			}
		}else{
			$scope.addTopice = null;
		}
		if(!$scope.variablePacket.banTwo){
			//添加试卷
			$scope.addTestPaper = function(){
				$scope.variablePacket.delShows = false;
				$scope.variablePacket.leftTreeShow.teachingMaterial = false;
				$scope.variablePacket.insertChoice_threeType = 0;
				$scope.variablePacket.statequ = 0;
				fcount = 0;
				$scope.exempng();
				$scope.variablePacket.qufen = 1;
				$scope.variablePacket.insertChoiceAll=true;
				$scope.variablePacket.insertChoice="testPaper";
				$scope.variablePacket.threeSwitch = [{"name":"我的卷库"},{"name":"校本卷库"},{"name":"公共卷库"}];
				adaptionHeight();
			}
		}else{
			$scope.addTestPaper = null;
		}
	}
	//答题卡
	function reTest(){
		
		$scope.variablePacket.testPaperTit = false; 
		$scope.variablePacket.eightSwitchOut_show = false;
		$scope.variablePacket.examType = "2";
		$http.get(questionUrl+"exam/"+$scope.variablePacket.addresid).success(function(resJson){
				var oplist = resJson.data.optList;
				$scope.questionBank.In.single = [];
				$scope.questionBank.In.many = [];
				$scope.questionBank.In.judge = [];
				$scope.questionBank.In.fillIn = [];
				$scope.questionBank.In.material = [];
				$scope.questionBank.In.briefAnswer = [];
				$scope.questionBank.In.clozeCloze = [];
				$scope.questionBank.In.reading = [];
				angular.forEach(oplist,function(e){
					var swer = {}
					//swer.Type = parseInt(e.type);
					if(e.type=="2"){
						swer.Type = 'single';
						swer.Answer = e.answer;
					}else if(e.type=="4"){
						var Answer={};
						swer.Type = 'many'; 
						var manyanw = e.answer.split(",");
						angular.forEach(manyanw,function(r){
							if(r=='A'){
								Answer.daanA = true;
							}else if(r=='B'){
								Answer.daanB = true;
							}else if(r=='C'){
								Answer.daanC = true;
							}else if(r=='D'){
								Answer.daanD = true;
							}
						})
						swer.Answer = Answer;
					}else if(e.type=="1"){
						swer.Type = 'judge'; 
						if(e.answer=="T"){
							swer.Answer = "正确";
						}else{
							swer.Answer = "错误";
						}
					}else if(e.type=="3"){
						var Answer=[];
						swer.Type = 'fillIn'; 
						var fillInanw = e.answer.split("|");
						angular.forEach(fillInanw,function(r){
							Answer.push(r);
						})
						swer.Answer = Answer;
					}else if(e.type=="8"){
						swer.Type = 'material'; 
						swer.Answer = e.answer;
					}else if(e.type=="6"){
						swer.Type = 'briefAnswer'; 
						swer.Answer = e.answer;
						//json1.Type = "briefAnswer";
					}else if(e.type=="7"){
						swer.Type = 'clozeCloze'; 
						var optList = [];
						var clozeClozenanw = e.answer.split(",");
						angular.forEach(clozeClozenanw,function(r){
							optList.push(r);
						})
						swer.optList = optList;
					}else if(e.type=="5"){
						swer.Type = 'reading'; 
						var optList = [];
						var readinganw = e.answer.split(",");
						angular.forEach(readinganw,function(r){
							optList.push(r);
						})
						swer.optList = optList;
					}
					swer.Analysis = e.analysis;
					swer.AnswerShow = false;
					$scope.getSwitchQuzByType(swer.Type,swer);
				})
				
				var imglist = resJson.data.imgList;
				var list = [];
				var testid = imglist[0].id;
				var testexamId = imglist[0].examId;
				$scope.testname = resJson.data.name;
				$scope.variablePacket.LookCard = true;
				angular.forEach(imglist,function(q){
					$scope.variablePacket.testimg = uploadPreviewUrl+q.name;
					list.push($scope.variablePacket.testimg);
				})
				$scope.variablePacket.quesionImgList = list;
		})
		if(!$scope.variablePacket.testPaperTit){ 
			$scope.variablePacket.banOne = false;
			doubleEvent();
		}
		angular.forEach($scope.variablePacket.eightSwitchOut,function(e){
			e.show = false;
		})
		$scope.questionBank.Out = {
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
	$scope.nav1 = [];
	var mapType = {};
	//组卷
	function adTest(){
		$scope.variablePacket.examType = "1";
		$http.get(questionUrl+"a/quzType?token="+token)
		.success(function(res){
			if(res.code == 200) {
			console.info(res.data);
			for(var i = 0;i < res.data.length;i ++) {
				var typeTem = {"type":res.data[i].name,data:[]};
				 $scope.nav1.push(typeTem);
				 mapType[res.data[i].id] = i;
			}
			$http.get(questionUrl+"exam/"+$scope.variablePacket.addresid).success(function(resJson){
				if(resJson.code == 200) {
					angular.forEach(resJson.data.questionList,function(quz,i) {
						var json1 = {};
						json1.Resource = [];
						if(quz.resourceJson==""){
							var jsontemp = {};
							jsontemp.ResourceTit = "";
							jsontemp.ResourceSrc = 0;
							jsontemp.ResourceNum = 0;
							json1.Resource.push(jsontemp);
							json1.CanResource = false;
						}else{
							var jsontemp = {};
							json1.CanResource = true;
							if(JSON.parse(quz.resourceJson)[0].ossFileName.lastIndexOf('.')!=-1){
								jsontemp.ossid =JSON.parse(quz.resourceJson)[0].ossFileName.substr(0, JSON.parse(quz.resourceJson)[0].ossFileName.lastIndexOf('.'));
							}else{
								jsontemp.ossid = JSON.parse(quz.resourceJson)[0].ossFileName;
							}
							jsontemp.ResourceTit =JSON.parse(quz.resourceJson)[0].name;
							jsontemp.ResourceSrc = JSON.parse(quz.resourceJson)[0].type;
							jsontemp.ResourceNum = 0;
							jsontemp.ResourceId = JSON.parse(quz.resourceJson)[0].rid;
							jsontemp.objId = JSON.parse(quz.resourceJson)[0].type;
							json1.Resource.push(jsontemp);
						}
						json1.Id = i;
						json1.id = quz.id;
					    json1.sign = false;
					    json1.AnswerShow=false;
					    json1.ResourceShow=false;
					    json1.queTit=quz.body;
					    if(quz.answer=="T"){
					    	json1.Answer="正确";
					    }else if(quz.answer=="F"){
					    	json1.Answer="错误";
					    }else{
					    	json1.Answer=quz.answer;
					    }
					    json1.Analysis=quz.analysis;
					    json1.Chapter = [];
						var jsontemp = {};
						jsontemp.Onetit = "学科";
						jsontemp.Twotit = "课本";
						jsontemp.Threetit = "章节";
						json1.Chapter.push(jsontemp);
						if(quz.type=="2"){
							json1.Type = "single";
							$scope.questionBank.Out.single.push(json1);
						}else if(quz.type=="4"){
							json1.Type = "many";
							$scope.questionBank.Out.many.push(json1);
						}else if(quz.type=="1"){
							json1.Type = "judge";
							$scope.questionBank.Out.judge.push(json1);
						}else if(quz.type=="3"){
							json1.Type = "fillIn";
							$scope.questionBank.Out.fillIn.push(json1);
						}else if(quz.type=="8"){
							json1.Type = "material";
							$scope.questionBank.Out.material.push(json1);
						}else if(quz.type=="6"){
							json1.Type = "briefAnswer";
							$scope.questionBank.Out.briefAnswer.push(json1);
						}else if(quz.type=="7"){
							json1.Type = "clozeCloze";
							$scope.questionBank.Out.clozeCloze.push(json1);
						}else if(quz.type=="5"){
							json1.Type = "reading";
							$scope.questionBank.Out.reading.push(json1);
						}
					})
				}
			})
		}
		})
		.error(function(e) {
			error(e)
		})
		//$scope.variablePacket.addresid
		
		$scope.variablePacket.queIndex = -1;
		$scope.variablePacket.testPaperTit = true; //试卷标题
		$scope.variablePacket.eightSwitchOut_show = true; //8种题型标题
		if($scope.variablePacket.testPaperTit){ //禁止点击习题
			$scope.variablePacket.banOne = true;
			doubleEvent();
		}
		/*$timeout(function(){ //获取吸顶高度
			if($scope.Top==0){
				$scope.Top = angular.element(".zyx_lines").offset().top;
				console.log($scope.Top)
			}
		})*/
		angular.forEach($scope.variablePacket.eightSwitchOut,function(e){
			e.show = true;
		})
		
		//试卷数据
		$scope.questionBank.Out = {
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



	$scope.variablePacket.paperid = "";
	//添加试卷--加减号
	$scope.TestPaper_Sign = function(index){
		console.log($scope.insertTest)
		$scope.variablePacket.Plotting = false; 
		
		$scope.insertTest[index].sign = !$scope.insertTest[index].sign;
		$scope.variablePacket.ProvingContent = false;
		console.log($scope.insertTest[index].type)
		if($scope.insertTest[index].type == '0'){
			if($scope.insertTest[index].sign){
				$scope.variablePacket.paperid=$scope.insertTest[index].id; 
				console.log($scope.insertTest)
				angular.forEach($scope.insertTest, function(e, i) {
					$scope.insertTest[i].sign = false;
				});
				$scope.insertTest[index].sign = true;
				$scope.variablePacket.addresid = $scope.insertTest[index].id;
				$scope.variablePacket.LookCard = false;
				adTest();
			}else{
				$scope.variablePacket.paperid = "";			
				reTest();
			}
		}
		if($scope.insertTest[index].type == '1'){
			if($scope.insertTest[index].sign){
				$scope.variablePacket.paperid=$scope.insertTest[index].id; 
				console.log($scope.insertTest)
				angular.forEach($scope.insertTest, function(e, i) {
					$scope.insertTest[i].sign = false;
				});
				$scope.insertTest[index].sign = true;
				$scope.variablePacket.addresid = $scope.insertTest[index].id;
				reTest();
				$scope.variablePacket.testPaperTit = true; 
				$scope.variablePacket.LookCard = true;
				if($scope.variablePacket.testPaperTit){ 
					$scope.variablePacket.banOne = true;
					doubleEvent();
				}
			}else{
				$scope.variablePacket.paperid = "";			
				$scope.variablePacket.testPaperTit = false; 
				$scope.variablePacket.addresid = $scope.insertTest[index].id;
				$scope.variablePacket.LookCard = false;
				if(!$scope.variablePacket.testPaperTit){ 
					$scope.variablePacket.banOne = false;
					doubleEvent();
				}
			}
			 
		}
		$timeout(function(){
			angular.element(".zyx_LookAnswerCard").mCustomScrollbar({
				mouseWheelPixels : 1000,
				theme: "3d-dark"
			});
		})
	}
   
	//添加习题--加减号
	$scope.topic_Sign = function(type,id,index,number,qid){
		$scope.variablePacket.Plotting = true; 
		$scope.variablePacket.examType = "0";
		$scope.questionBank.In[type][index].sign = !$scope.questionBank.In[type][index].sign;
		console.log(qid)
		if($scope.questionBank.In[type][index].sign){
	   	   signArr.push(qid);
	    }else{
	   	   var  index=signArr.indexOf(qid);
	   	   if(index!=-1){
	   	   	  signArr.splice(index,1)
	   	   }
	    };

		angular.forEach($scope.variablePacket.eightSwitchOut,function (e,i){
			if(e.Type == type){
				$scope.variablePacket.eightSwitchOut[i].show = true;
				$anchorScroll();
			}
		});
		if($scope.questionBank.In[type][index].sign){
			var Obj = angular.copy($scope.questionBank.In[type][index]);
			$scope.variablePacket.queIndex = number; 
			$scope.questionBank.Out[type].push(Obj);
			$scope.variablePacket.eightSwitchOut_show = true;
			$scope.variablePacket.ProvingContent = false;
			if($scope.variablePacket.eightSwitchOut_show){
				$scope.variablePacket.banTwo = true;
			}
			doubleEvent();
			/*$timeout(function(){
				if($scope.Top==0){
					$scope.Top = angular.element(".zyx_lines").offset().top;
					console.log($scope.Top)
				}
			})*/
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
				$scope.variablePacket.banTwo = false;
			}
		}
	}
	
	//查看答题卡
	$scope.LookCard = function(){
		$scope.variablePacket.LookCardActive = !$scope.variablePacket.LookCardActive;
		$scope.variablePacket.AnswerCardMask = !$scope.variablePacket.AnswerCardMask;
		$scope.variablePacket.LookAnswerCard = !$scope.variablePacket.LookAnswerCard;
		$timeout(function(){
			angular.element(".zyx_LookAnswerCard").mCustomScrollbar({
				mouseWheelPixels : 1000,
				theme: "3d-dark"
			});
		})
	}
	
	//查看解析
	$scope.lookAnalysis = function(type, index, answer) {
		$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
	}
	
	//查看答案及解析
	$scope.lookAnswer = function(type, index, answer) {
		if($scope.variablePacket.insertChoiceAll) {
			$scope.questionBank.In[type][index].AnswerShow = answer ? false : true;
		} else {
			$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
		}
	}

	//8种题型锚点
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
	
/*	//吸顶
	$scope.Top = 0;
	//$scope.Top = angular.element(".zyx_lines").offset().top;
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		console.log(scrollT+","+$scope.Top)
		if(scrollT >= $scope.Top) {
			$scope.$apply(function (){
				$scope.variablePacket.titFixed = true;
			});
		}else{
			$scope.$apply(function (){
				$scope.variablePacket.titFixed = false;
			});
		}
	};*/

	//我的题库，公共题库，校本题库切换(弹层)
	$scope.insertChoice_threeSwitch = function(index,name) {
		//$scope.variablePacket.insertChoice_eightType = 0;
		$scope.variablePacket.insertChoice_threeType=index;
		if(index=="0"){
			$scope.variablePacket.statequ = 0;
            $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		}
		if(index=="1"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
            $scope.variablePacket.statequ = 1;
            $scope.insertChoice_eightSwitchTab("2",0);
        }
        if(index=="2"){
        	$scope.variablePacket.statequ = 2;
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
            $scope.insertChoice_eightSwitchTab("2",0);
        }
		$rootScope.treetype = index+"";
		//$rootScope.selectNode = [];
		//$rootScope.treeShow.treeOne = false;
		/*if(index=="0"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		}
		if(index=="1"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
        if(index=="2"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }*/
		$scope.variablePacket.zjpageSize=8;
		$scope.variablePacket.sjpageSizes=8;
		$scope.variablePacket.pageSizes=3;
		//$scope.variablePacket.insertChoice_threeType = 0;
		if(index != 0) {
			$scope.variablePacket.delShow = false;
		} else {
			$scope.variablePacket.delShow = true;
		}
		$scope.variablePacket.statequ = index;
		if($scope.variablePacket.qufen==0){
			//加载试题
			$scope.insertChoice_eightSwitchTab("2",0);
		}else if($scope.variablePacket.qufen==1){
			$rootScope.treetype = 0;
			//加载试卷
			$scope.exempng();
		}else if($scope.variablePacket.qufen==2){
			$rootScope.treetype = 0;
			//加载资源
    		$scope.insertzy();
		}
	}
	$scope.variablePacket.ressele = "";
	//资源检索
  	$scope.selectres=function(i){
  		$scope.variablePacket.zjpageSize=8;
  		$scope.variablePacket.ressele = i;
  	 	alert(i)
  	 	$scope.insertzy();
  	}
  	
	var eightType = ['single','many','judge','fillIn','material','briefAnswer','clozeCloze','reading'];
	//8种题型的切换(弹层)
	$scope.variablePacket.pageSizes=3;
	//默认单选题类型
	$scope.variablePacket.type = 2;
	//$scope.variablePacket.insertChoice_eightType = 0;
	$scope.insertChoice_eightSwitchTab = function(id,index) {
		console.log(id,index)
		console.log($scope.variablePacket.eightSwitchOut)
		quess = [];
		$scope.variablePacket.type = id;
		$scope.variablePacket.insertChoice_eightType = index;
		if($scope.variablePacket.statequ==undefined){
			$scope.variablePacket.statequ = 0;
		}
		if($scope.resParams.subjectID==undefined){
			$scope.resParams.subjectID = "";
		}
		if($scope.variablePacket.statequ==0){
			var ser = "/a/quz/quzAll?type="+$scope.variablePacket.type+"&pageNo=1&pageSize="+$scope.variablePacket.pageSizes+"&token="+token+"&subjIds="+$scope.resParams.subjectID+"&createBy="+teacherId;
		}else if($scope.variablePacket.statequ==1){
			var ser = "a/quz?type="+$scope.variablePacket.type+"&pageNo=1&pageSize="+$scope.variablePacket.pageSizes+"&token="+token+"&areaCodes="+$scope.variablePacket.officeId+"&state="+$scope.variablePacket.statequ;
		}else{
			var ser = "a/quz?type="+$scope.variablePacket.type+"&pageNo=1&pageSize="+$scope.variablePacket.pageSizes+"&token="+token+"&state="+$scope.variablePacket.statequ;
		}
		$http.get(questionUrl+ser).success(function(data){
			$scope.variablePacket.questionCount = data.data.count;
			console.log(data.data.list)
			if(data.data.count<3){
				$scope.variablePacket.jzgd=false;
			}else{
				$scope.variablePacket.jzgd=true;
			}
			angular.forEach(data.data.list,function(e,i){
				console.log(e)
				swer = {};
				ques={};
				ques.Id =i;
				if($scope.variablePacket.statequ==0){
					if(e.sourceType!=undefined&&e.sourceType!=""){
						if(e.sourceType=="1"){
							ques.id = e.id;
						}else{
							ques.id = e.quzResId;
						}
					}
				}else{
					ques.id = e.id;
				}
				console.log(typeof ques.id)
				console.log(signArr)
				ques.CanResource = false;
				ques.Resource = [{ResourceTit: '',
							ResourceSrc: 0,
							ResourceNum: 0}];
				if(signArr.indexOf(ques.id)!=-1){
					 ques.sign = true;//从题库选择的加减号
				}else{
					 ques.sign=false;
				};
				ques.Type = eightType[index]; //题型
				ques.AnswerShow = false; //默认答案不显示
				ques.ResourceShow = false; //是否插入资源
				ques.queTit = e.body; //题干
				if(ques.Type=="judge"){
					if(e.answer=="T"){
						ques.Answer = "正确";
					}else{
						ques.Answer = "错误";
					}
				}else{
					ques.Answer = e.answer; //答案
				}
				ques.Analysis = e.analysis;//解析
				if(typeof(e.subjNames)=="string"){
					ques.Chapter = [{
						Onetit: e.subjNames.split("//")[2],
						Twotit: e.subjNames.split("//")[3],
						Threetit: e.subjNames.split("//")[4]
					}];
				}else{
					ques.Chapter = [{
						Onetit: e.subjNames[0].split("//")[2],
						Twotit: e.subjNames[0].split("//")[3],
						Threetit: e.subjNames[0].split("//")[4]
					}];
				}
				
				quess.push(ques);
				console.log(quess)
			})
			$scope.questionBank.In[eightType[index]] = quess;
			console.log(quess)
			quess = [];
		})
	}

	//类的型切换(弹层)
	$scope.insertChoice_selectTypeTab = function(index,name) {
		$scope.variablePacket.zjpageSize=8;
		$scope.variablePacket.insertChoice_selectType = index;
		if(name=="视频"){
			$scope.variablePacket.objId="1";
		}else if(name=="音频"){
			$scope.variablePacket.objId="2";
		}else if(name=="图片"){
			$scope.variablePacket.objId="3";
		}else if(name=="PPT"){
			$scope.variablePacket.objId="5";
		}else if(name=="WORD"){
			$scope.variablePacket.objId="6";
		}else if(name=="EXCEL"){
			$scope.variablePacket.objId="7";
		}else if(name=="全部"){
			$scope.variablePacket.objId="";
		}
		$scope.insertzy();
	}

	$scope.selectsou = function(){
		$scope.variablePacket.textsou = $scope.text1;
	}
	//弹层关闭
	$scope.closeMask = function() {
		$scope.variablePacket.insertChoiceAll = false;
		$scope.variablePacket.leftTreeShow.teachingMaterial = true;
		//$rootScope.treeShow.teachingMaterial = true;
	}

	
	//默认加载单选题
	var ques = {};
	var quess = [];
	if($scope.variablePacket.statequ==undefined){
			$scope.variablePacket.statequ = 0;
		}
		if($scope.resParams.subjectID==undefined){
			$scope.resParams.subjectID = "";
	}
	//8种题型--数据
	$scope.questionBank = {
		In: {
			//单选
			single: [{}],
			//多选
			many: [{}],
			//判断
			judge: [{}],
			//填空
			fillIn: [{}, {}],
			//材料
			material: [{}, {}],
			//简答
			briefAnswer: [{}, {}, {}],
			//完形填空
			clozeCloze: [{}],
			//阅读理解
			reading: [{}]
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
	$scope.variablePacket.zjpageSize=8;
	//查询资源
	$scope.insertzy = function(){
		if($scope.variablePacket.statequ==0){
			var surl = "/a/resource/getResourcesAll?pageNo=1&pageSize="+$scope.variablePacket.zjpageSize+"&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele+"&createBy="+teacherId+"&userId="+teacherId;
			//我的资源state不传
		}else if($scope.variablePacket.statequ==1){
			var surl = "/a/resource?pageNo=1&pageSize="+$scope.variablePacket.zjpageSize+"&state="+$scope.variablePacket.statequ+"&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele+"&areaCodes="+$scope.variablePacket.officeId;
		}else{
			var surl = "/a/resource?pageNo=1&pageSize="+$scope.variablePacket.zjpageSize+"&state="+$scope.variablePacket.statequ+"&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele;
		}
		$http.get(questionUrl+surl).success(function(data){
			insertziyuan = [];
			var count = 0;
			if($scope.variablePacket.statequ==0){
				var datas = data.count;
				if(datas>3){
					$scope.variablePacket.jzgd1 = true;
				}else{
					$scope.variablePacket.jzgd1 = false;
				}
				var lists = data.list
			}else{
				var datas = data.data.count;
				if(datas!=0){
					$scope.variablePacket.jzgd1 = true;
				}else{
					$scope.variablePacket.jzgd1 = false;
				}
				var lists = data.data.list
			}
			$scope.rescount = datas;
			angular.forEach(lists,function(e,i){
			count++;
			console.log(e)
			var ziyuan = {};
			if($scope.variablePacket.myziid!=undefined){
				if($scope.variablePacket.myziid==e.id){
					ziyuan.sign = true;
				}else{
					ziyuan.sign = false;
				}
			}else{
				ziyuan.sign = false;
			}
			ziyuan.ResourceNum = count;
			ziyuan.ResourceTit = e.title;
			ziyuan.ResourceSrc = e.objId;
			ziyuan.name = e.createUser;
			ziyuan.time = e.createDate.substring(0,10);
			if(e.fileName==undefined){
				ziyuan.ossid = "";
			}else{
				ziyuan.ossid =e.fileName.substr(0, e.fileName.lastIndexOf('.'));
			}
			ziyuan.size = e.fileSize;
			ziyuan.objId = e.objId;
			ziyuan.id = e.id;//sourceType
			ziyuan.sourceType = e.sourceType;
			insertziyuan.push(ziyuan);
		})
			console.log(quess)
			$scope.insertData= insertziyuan;
			$scope.questionBank.In = insertziyuan;
		})
	}
	var insertziyuan = [];
	if($scope.variablePacket.statequ==undefined){
			$scope.variablePacket.statequ = 0;
		}
		if($scope.resParams.subjectID==undefined){
			$scope.resParams.subjectID = "";
	}
		if($scope.variablePacket.objId==undefined){
			$scope.variablePacket.objId = "";
	}
	//插入资源--数据
	$scope.insertData = [
	{}, {}, {}, {}, {}, {}, {}, {}]
	$scope.variablePacket.sjpageSizes=8;
	//加载试卷
	$scope.exempng = function(){
		console.log($scope.variablePacket.insertChoice_threeType);
		if($scope.variablePacket.statequ==0){
			var ser = "exam?current=1&size="+$scope.variablePacket.sjpageSizes+"&subjIds="+$scope.resParams.subjectID+"&createBy="+teacherId
		}else if($scope.variablePacket.statequ==1){
			var ser = "exam?current=1&size="+$scope.variablePacket.sjpageSizes+"&state="+$scope.variablePacket.statequ+"&current=1&module=1&areaCodes="+$scope.variablePacket.officeId;
		}else{
			var ser = "exam?current=1&size="+$scope.variablePacket.sjpageSizes+"&state="+$scope.variablePacket.statequ;
		}
		$http.get(questionUrl+ser).success(function(data){
			if(data.data.records.length>3){
				$scope.variablePacket.jzgd2 = true;
			}else{
				$scope.variablePacket.jzgd2 = false;
			}
		scoquess = [];
		angular.forEach(data.data.records,function(e,i){
			console.log(e)
			var rsues = {};
			if(e.type=="0"){
				rsues.type = "0";//"题库组卷";
			}else{
				rsues.type = "1";//"导入试卷";
			}
			rsues.ResourceTit = e.name;
			if($scope.variablePacket.paperid==e.id){
				rsues.sign= true;
			}else{
				rsues.sign= false;
			}
			rsues.name = e.createUser;
			rsues.id = e.id;
			rsues.time = e.createDate.substring(0,10);
			rsues.size = '1049.02k';
			rsues.source =  e.module;
			scoquess.push(rsues);
		})
			
			console.log(quess)
			$scope.insertTest= scoquess;
	})
	}
	var scoquess = [];
	if($scope.variablePacket.statequ==undefined){
			$scope.variablePacket.statequ = 0;
		}
		if($scope.resParams.subjectID==undefined){
			$scope.resParams.subjectID = "";
	}
	//添加试卷--数据
	$scope.insertTest = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
	
	var trans = 'Out'; 
	$scope.renderFinish =function(type){
		if($scope.variablePacket.insertChoiceAll || $scope.variablePacket.LookAnswerCard){
			trans = 'In';
		}else{
			trans = 'Out';
		}
		$scope[type+'Arr'] = [];
		angular.forEach($scope.questionBank[trans][type], function(e, i) {
			if($scope.questionBank[trans][type][i].Answer!=undefined){
				$scope[type+'Arr'].push($scope.questionBank[trans][type][i].Answer.split("|"));
			}
			console.log()
			
		})
	}
		
	$scope.getSwitchQuzByType = function(quztype, quess) {
		switch(quztype) {
			case "single":
				$scope.questionBank.In.single.push(quess);
				break;
			case "many":
				$scope.questionBank.In.many.push(quess);
				break;
			case "judge":
				$scope.questionBank.In.judge.push(quess);
				break;
			case "fillIn":
				$scope.questionBank.In.fillIn.push(quess);
				break;
			case "material":
				$scope.questionBank.In.material.push(quess);
				break;
			case "briefAnswer":
				$scope.questionBank.In.briefAnswer.push(quess);
				break;
			case "clozeCloze":
				$scope.questionBank.In.clozeCloze.push(quess);
				break;
			case "reading":
				$scope.questionBank.In.reading.push(quess);
				break;
		}
	}
	//试题加载更多
	$scope.selecSt = function() {
		$scope.variablePacket.pageSizes= $scope.variablePacket.pageSizes+3;
		$scope.insertChoice_eightSwitchTab($scope.variablePacket.type,$scope.variablePacket.insertChoice_eightType);
	}
	//试卷加载更多
	$scope.selecSj = function() {
		$scope.variablePacket.sjpageSizes= $scope.variablePacket.sjpageSizes+8;
		$scope.exempng();
	}
	//资源加载更多
	$scope.selecZy = function() {
		$scope.variablePacket.zjpageSize= $scope.variablePacket.zjpageSize+8;
		$scope.insertzy();
	}
}]);



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
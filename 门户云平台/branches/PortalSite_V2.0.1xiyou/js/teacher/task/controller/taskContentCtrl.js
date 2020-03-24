app.controller('taskContentCtrl', ['$scope','$rootScope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer','$rootScope','myResourceService', function($scope,$rootScope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer,$rootScope,myResourceService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	$rootScope.treetype = "0";
	//var teacherId = "84d5f23a09a8494f9cb4046392fcea55";
	var teacherId = sessionStorage.getItem('userId');//获取
	//变量包
	$scope.variablePacket = {
		taskName : '', // 任务名称文字
		selectDate:'',  // 日期选择默认
		classArry:[],  // 发布对象定义的空数组
		taskCont:'',   //任务内容文字
		state:$stateParams.state,//new:布置任务	edit:编辑任务	echo:复制任务
		classIndex:-1,//页面--发布对象的班级默认选中
		ResLineIndex:0,//页面--资源库资源条默认选中
		delShow:true,//弹层--我的题库资源上的删除显示，校本题库和公共题库不显示
		maskZindex:false,//弹层--层级提高一级；
		maskHeader:true,//弹层表头--true:从题库选择;false:插入资源
		insertChoiceAll:false,//弹出框总框设置参数
		insertChoice_threeType:0,//弹层--我的题库，公共题库，校本题库的默认选中
		insertChoice_selectType:0,//弹层--插入的类型默认选中
		AddResources_show:false,//页面--资源库是否显示
		UploadFile_show:true,//页面--上传文件是否显示
		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节默认
		threeSwitch:[    
			{"name":"我的资源"},
			{"name":"校本资源"},
			{"name":"公共资源"}
		],
		SelectType : [
			{"name":"全部"},
			{"name":"视频"},
			{"name":"音频"},
			{"name":"图片"},
			{"name":"PPT"},
			{"name":"WORD"},
			{"name":"EXCEL"}
		],
		className:[
			/*{"name":"初一(1)班"},
			{"name":"初一(2)班"},
			{"name":"初一(3)班"},
			{"name":"初一(4)班"}*/
		],
		uploadFile:[
			/*{'ResourceSrc':'0',"name":"2016—2017学年六年级语文...",'ResourceNum':0},
			{'ResourceSrc':'1',"name":"2015—2017学年六年级语文...",'ResourceNum':1},
			{'ResourceSrc':'2',"name":"2016—2017学年六年级语文...",'ResourceNum':2},
			{'ResourceSrc':'3',"name":"2015—2017学年六年级语文...",'ResourceNum':3},
			{'ResourceSrc':'4',"name":"2016—2017学年六年级语文...",'ResourceNum':4}*/
		],
		Echotit:0,//任务内容---导学资源默认选中
		ProvingOff:false,//验证开关
		ProvingTaskname:false,//任务名称验证
		ProvingChapter:false,//章节目录验证
		ProvingDate:false,//作答时间验证
		ProvingObject:false,//发布对象验证
		ProvingTaskcont:false,//任务内容验证
//		leftTreeShow : {					//左侧树展示
//          teachingMaterial : true,		//版本选择框
//          treeOne : true,					//版本选择框下的树
//          treeKnowledgePoint : false,		//知识点树
//          other : false,						//其他
//      }
		leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,						//其他
		},
        treeShow : {					//左侧树展示
            teachingMaterial : true,		//版本选择框
            treeOne : true,					//版本选择框下的树
            treeKnowledgePoint : false,		//知识点树
            other : false,						//其他
        },
	}
	console.log($scope.variablePacket.classIndex)
	/**
    * 查询当前教师的 授课信息
    */
   	$scope.requs = {};
 
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
	                
	                $scope.variablePacket.selectSubject.push(subj);
	                subMapTem[item.subjectId] = subj;
    			}
    			if(typeof(claMapTem[item.classId])=="undefined"){
    				var clas = {
	                    classId:item.classId,
	                    name :item.gradeName+item.className+"班",
	                };
	   
	                $scope.variablePacket.className.push(clas);
	                claMapTem[item.classId] = clas;
    			}
                
            });
        }
    });
    //复制
      	setTimeout(function(){
   		   	if($stateParams.taskid!=null&&$stateParams.taskid!=undefined&&$stateParams.taskid!=""){
		$http.get(lessonIp+"ExamCount/cocpExam?examId="+$stateParams.taskid).success(function(data){
			if(data.message=="success"){
				var datas = data.data;
				$scope.variablePacket.taskName = "复制"+datas.name;
				$scope.variablePacket.selectDate = datas.startTime+"至"+datas.endTime;
				$scope.variablePacket.taskCont = datas.content;
				var  sour = [];
				var count = 100;
				angular.forEach(datas.attachmentList,function(e,i){
					//附件
					var fileData = {
						objId:e.type,
						ResourceTit:e.name,
						id:e.resourceId,
						resourceId:e.resourceId,
						name:e.name,
						ResourceSrc: "2",
						sourceAndEnclosure:e.resType,
						sourceType: "1",
						time: e.createTime,
						sign:true
						};
					$scope.variablePacket.uploadFile.push(fileData);
				})
				
				//资源
				angular.forEach(datas.resourceList,function(e,i){
					var  sou = {};
					//sou.sign = true;
					sou.ResourceNum = count;
					sou.ResourceSrc= "3";
					sou.ResourceTit = e.name;
					sou.id = e.resourceId;
					sou.objId=e.type;
					sou.Id = i;
					zylist.push(e.resourceId);
					sou.name= e.name;
					sou.resourceId = e.resourceId;
					sou.size= "0";
					sou.time= "2018-11-22";
					sou.sourceType = e.type;
					sou.sourceAndEnclosure = e.resType;
					//sou.ResourceNum = count;
					
					count++;
					sour.push(sou);
					console.log(sour)
				})
				$scope.resource=sour;
				console.log($scope.resource)
				$scope.variablePacket.AddResources_show=true;
			}
			console.log(data);
			
		})
	}
   		 
   	},0)

	//赋值弹层的自适应高度
	function adaptionHeight(){
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight').height(bigHeight - 275);
			console.log(bigHeight)
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
	//双日历
	$scope.ChangeDate = function(){
		$scope.variablePacket.selectDate = $("#time").val();
		if($scope.variablePacket.selectDate.length>0){
			$scope.variablePacket.ProvingDate = false;
			$scope.variablePacket.ProvingOff = true;
		}
	}
	// 任务内容
	$scope.mlh_taskCont = function(){
		if($scope.variablePacket.taskCont.length>0){
			$scope.variablePacket.ProvingTaskcont = false;
			$scope.variablePacket.ProvingOff = true;
		}
	}
	//发布对象的班级切换
	$scope.classaNameTab = function(index,name,id){
		$scope.variablePacket.classcname=name;
		$scope.variablePacket.classcId=id;
		$scope.variablePacket.classIndex = index;
		$scope.variablePacket.ProvingObject = false;
	}
	//任务名称
	$scope.mlh_taskName = function(){
		if($scope.variablePacket.taskName.length>0){
			//作业名称验证Verification
		    var urls = lessonIp+"ExamCount/selectNamecount?name=";
			$http.get(urls+$scope.variablePacket.taskName).success(function (response) {
				if(response.flag=="0"){
					$scope.variablePacket.Texeam =  false;
				}else{
					$scope.variablePacket.Texeam =  true;
				}
			})
			$scope.variablePacket.ProvingTaskname = false;
			$scope.variablePacket.ProvingOff = true;
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
	
	$scope.resParams = {};
    // 根据左侧树查询
	$rootScope.findListByTree = function(subjectID,knowledge) {
			if(subjectID != ""){
			    $scope.resParams.subjectID = subjectID;
			}
			if(knowledge != ""){
			    $scope.resParams.knowledge = knowledge;
			}
			$scope.insertzy();
		   /* if($scope.variablePacket.qufen==0){
			    //加载试题
			    $scope.insertChoice_eightSwitchTab($scope.variablePacket.type,$scope.variablePacket.statequ);
		    }else if($scope.variablePacket.qufen==1){
		    	//加载试卷
				$scope.exempng();
		    }else if($scope.variablePacket.qufen==2){
		    	//加载资源
		    	
		    }*/
    
	};
	if($scope.variablePacket.statequ==undefined){
			$scope.variablePacket.statequ = 0;
	}
	if($scope.resParams.subjectID==undefined){
			$scope.resParams.subjectID = "";
	}
	if($scope.variablePacket.objId==undefined){
			$scope.variablePacket.objId = "";
	}
	if($scope.variablePacket.ressele==undefined){
			$scope.variablePacket.ressele = "";
	}
	//查询资源
	$scope.insertzy = function(){
		
		if($scope.variablePacket.statequ==0){
			var surl = "/a/resource/getResourcesAll?pageNo=1&pageSize=1000&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele+"&createBy="+teacherId+"&userId="+teacherId;
			//我的资源state不传
		}else if($scope.variablePacket.statequ==1){
			var surl = "/a/resource?pageNo=1&pageSize=1000"+"&state="+$scope.variablePacket.statequ+"&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele+"&areaCodes="+$scope.variablePacket.officeId;
		}else{
			var surl = "/a/resource?pageNo=1&pageSize=1000"+"&state="+$scope.variablePacket.statequ+"&subjectID="+$scope.resParams.subjectID+"&objId="+$scope.variablePacket.objId+"&title="+$scope.variablePacket.ressele;
		}
		$http.get(questionUrl+surl).success(function(data){
			insertziyuan = [];
			var count = 0;
			if($scope.variablePacket.statequ==0){
				var datas = data.count;
				var lists = data.list
			}else{
				var datas = data.data.count;
				var lists = data.data.list
			}
			$scope.variablePacket.numbers=datas;
			angular.forEach(lists,function(e,i){
			count++;
			console.log(e)
			var ziyuan = {};
			console.log(zylist);
			
			if(zylist.indexOf(e.id)!=-1){
				
				ziyuan.sign = true;
			}else{
				ziyuan.sign = false;
			};
			ziyuan.ResourceNum = count;
			ziyuan.ResourceTit = e.title;
			ziyuan.ResourceSrc = e.objId;
			ziyuan.resourceId = e.id;
			ziyuan.name = e.createUser;
			ziyuan.time = e.createDate.substring(0,10);
			ziyuan.size = e.fileSize;
			ziyuan.objId = e.objId;
			ziyuan.id = e.id;
			ziyuan.Id = i;
			ziyuan.sourceType = e.sourceType;
			ziyuan.sourceAndEnclosure = 0;
			insertziyuan.push(ziyuan);
		})
			$scope.insertData= insertziyuan;
		})
	}
    /**
	 * 获取左侧 id name	getGradeNo
	 */
    $rootScope.getTreeByIdsNames = function(ids,names,gradeJson) {
    	$scope.practice.subjIds = ids;
    	$scope.practice.subjNames = names;
    	$scope.practice.gradeJson = gradeJson;
    };
    
    
    
	//任务发布
	$scope.addexamrw = function(){
		//$scope.mlh_taskName();
		if($scope.variablePacket.Texeam == true){
			return false;
		}
		var taskName = $scope.variablePacket.taskName;
		var selectDate = $scope.variablePacket.selectDate;
		var taskCont = $scope.variablePacket.taskCont;
		
		var quessorts1 = $scope.variablePacket.uploadFile;
		var sd = {};
		var arr = [];
		//angular = 
		angular.forEach($scope.resource,function(e){
			if(arr.indexOf(e.id)==-1){
				arr.push(e.id)
				sd = {}
				sd.name = e.ResourceTit;
				sd.resourceId = e.id;
				sd.objId = e.objId;
				sd.sourceAndEnclosure = e.sourceAndEnclosure;
				quessorts1.push(sd);
			}
		})
		
		var quessorts = JSON.stringify(quessorts1);
		//班级
		var classNames = $scope.variablePacket.classcname;
		var toClass = $scope.variablePacket.classcId;
		var examsubject = "";
	
		var subjectName = "";
		var subjectId = "";
		var treeIds = "";
		var treeName = "";
		var remark = "";
		var types = "1";
		var teacherName = $scope.requs.realname;
		var teacherId =$scope.requs.userId;
		var examType = "";
		var params = {examName:taskName, examsubject:examsubject,subjectName:subjectName,subjectId:subjectId,treeIds:treeIds,treeName:treeName,
		remark:remark,toTime:selectDate,classs:toClass,classNames:classNames,quessorts:quessorts,types:types,teacherName:teacherName,teacherId:teacherId,
		content:taskCont,examType:examType};
		$http.post(lessonIp+"ExamCount/addExamCount", params).success(function(response) {
			if(response.ret==200){
				$timeout(function(){$state.go("secondNav.taskList")},1500)
			}else{
				$scope.wranShow('提交失败',false)
			}
		});
	}
	
	//验证
	$scope.Verification = function(ok){
		 var urls = lessonIp+"ExamCount/selectNamecount?name=";
		$http.get(urls+$scope.variablePacket.taskName).success(function (response) {
			if(response.flag=="0"){
				$scope.variablePacket.Texeam =  false;
			}else{
				$scope.variablePacket.Texeam =  true;
			}
		})
		if($scope.variablePacket.taskName.length>0){
			$scope.variablePacket.ProvingTaskname = false;
		}else{
			$scope.variablePacket.ProvingTaskname = true;
		}
		console.log(ok)
		console.log($scope.variablePacket.AddResources_show)
		/*if(ok && (!$scope.variablePacket.AddResources_show) && ($scope.variablePacket.classIndex!=-1) && ($scope.variablePacket.Chapter[0].Onetit!="学科" || $scope.variablePacket.Chapter[0].Twotit!="课本" || $scope.variablePacket.Chapter[0].Threetit!="章节") && (!$scope.variablePacket.ProvingDate) && (!$scope.variablePacket.ProvingTaskcont) &&  (!$scope.variablePacket.ProvingTaskname) && (!$scope.variablePacket.Texeam) ){*/
		if(ok &&(!$scope.variablePacket.Texeam)&&($scope.variablePacket.classIndex!=-1) && (!$scope.variablePacket.ProvingDate) && (!$scope.variablePacket.ProvingTaskcont) &&  (!$scope.variablePacket.ProvingTaskname) && (!$scope.variablePacket.Texeam) ){
			console.log(11111)
			$scope.addexamrw();
			$scope.wranShow('验证成功!',true,'');
			//$timeout(function(){$state.go("secondNav.taskList")},1500)
		}else{
			if(!$scope.variablePacket.AddResources_show || (!$scope.variablePacket.ProvingTaskcont&& !$scope.variablePacket.ProvingOff)){
				$scope.variablePacket.ProvingTaskcont = true;
			}
			if($scope.variablePacket.classIndex==-1){
				$scope.variablePacket.ProvingObject = true;
			}
			if(($scope.variablePacket.Chapter[0].Onetit=="学科") || ($scope.variablePacket.Chapter[0].Twotit=="课本") || ($scope.variablePacket.Chapter[0].Threetit=="章节")){
				$scope.variablePacket.ProvingChapter = true;
			}
			if(!$scope.variablePacket.ProvingDate && !$scope.variablePacket.ProvingOff){
				$scope.variablePacket.ProvingDate = true;
			}
			if(!$scope.variablePacket.ProvingTaskname && !$scope.variablePacket.ProvingOff){
				$scope.variablePacket.ProvingTaskname = true;
			}
			$scope.mlh_taskName();
			$scope.ChangeDate();
			$scope.mlh_taskCont();
		}
	}
	
	//页面--上传文件的删除
	$scope.uploadFile = function (i,index,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			$scope.variablePacket.uploadFile.splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
			if($scope.variablePacket.uploadFile.length == 0){
					$scope.variablePacket.UploadFile_show = false;
			}
		};
	};
	//弹层--我的题库，公共题库，校本题库切换
	$scope.insertChoice_threeSwitch = function(index,id){
		$scope.variablePacket.insertChoice_threeType = index;
		if(index!=0){
			$scope.variablePacket.delShow = false;
		}else{
			$scope.variablePacket.delShow = true;
		}
		$scope.variablePacket.statequ = index;
		$scope.insertzy();
		if(index=="0"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = false;
		}
		if(index=="1"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
        if(index=="2"){
            $scope.variablePacket.leftTreeShow.teachingMaterial = true;
        }
		
	}
	
	///弹层----插入资源的类型切换
	$scope.insertChoice_selectTypeTab = function(index,name){
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
	
	$scope.variablePacket.ressele = "";
	//资源检索
  	$scope.selectres=function(i){
  		$scope.variablePacket.ressele = i;
  	 	//alert(i)
  	 	$scope.insertzy();
  	}
  	var zylist = [];
	//页面--从资源库添加
	$scope.addRes = function(){
		
		$scope.insertzy();
		$scope.variablePacket.insertChoiceAll=true;
		adaptionHeight();
		$scope.insert_Sign = function(index,num,o) {
			console.log(o)
			$scope.insertData[index].sign = !$scope.insertData[index].sign;
			if($scope.insertData[index].sign) {
				zylist.push(o.id);
				console.log(zylist);
				$scope.variablePacket.AddResources_show = true;
				var resObj = angular.copy($scope.insertData[index]);
				$scope.resource.unshift(resObj);
				$scope.variablePacket.ProvingContent = false;
			} else {
				zylist.splice(zylist.indexOf(o.id),1)
				angular.forEach($scope.resource,function(e,i){
					if (e.ResourceNum == num){
						$scope.resource.splice(i,1);
						if($scope.variablePacket.ResLineIndex == i && $scope.resource.length>0){
							$scope.variablePacket.ResLineIndex = 0;
							$scope.variablePacket.ResLineTab = 0;
						}
					}
					if($scope.resource.length == 0){
						$scope.variablePacket.AddResources_show = false;
						$scope.variablePacket.ProvingOff = true;
					}
				});
				
			}
			
		}
	}
	
	//弹层--关闭
	$scope.closeMask = function(){
		$scope.variablePacket.insertChoiceAll=false;
	}
	
	
	//页面--资源库列条上的删除
	$scope.delResLine = function(index,num,tit,id){
		zylist.splice(zylist.indexOf(id),1)
		$scope.promptShow('确认删除',false,tit);
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.resource.splice(index,1);
			$scope.wranShow('已删除',false,tit);
			angular.forEach($scope.insertData,function(e,i){
				if(e.ResourceNum == num){
					e.sign = false;
				}
			})
			if($scope.resource.length == 0){
				$scope.variablePacket.AddResources_show = false;
			}
		}
		
	}
	console.log($scope.resource)
	//章节目录的回显验证
	$scope.Chapter = function(){
		$timeout(function(){
			$scope.$apply(function(){
				$scope.variablePacket.Chapter[0].Onetit = angular.element('.titleSpan').find('em')[0].innerHTML;
				$scope.variablePacket.Chapter[0].Twotit = angular.element('.titleSpan').find('em')[1].innerHTML;
				$scope.variablePacket.Chapter[0].Threetit = angular.element('.titleSpan').find('em')[2].innerHTML;
			})
		});
	}
	
	//弹层--资源数据
	$scope.insertData = []
	
	//根据页面不同赋值数据
	if($scope.variablePacket.state==''){
		$scope.resource = $scope.insertData;
		$scope.variablePacket.AddResources_show = true;
		
	}else{
		$scope.resource = [];
		$scope.variablePacket.AddResources_show = false;
	}
	
var uploadFlags = false;
var userInfo = {userId: "kazaff", md5: "", namespace: "Resource"};   //用户会话信息
    var chunkSize = 5000 * 1024;        //分块大小
    var uniqueFileName = null;          //文件唯一标识符
    var md5Mark = null;
    var time = fmtDate();

    function getServer(type) {   //测试用，根据不同类型的后端返回对应的请求地址
        switch (type) {
            case "php":
                return "./serverPHP/fileUpload.php"
            case "node":
                return "http://192.168.9.113:3000/fileUpload";
            case "java":
                return ossIp + 'fileUpload/';
            case "dubbo":
                return "http://192.168.9.113:8888/fileUpload";
        }
    }

    var backEndUrl = getServer("java");

    WebUploader.Uploader.register({
        "before-send-file": "beforeSendFile"
        , "before-send": "beforeSend"
        , "after-send-file": "afterSendFile"
    }, {
        beforeSendFile: function (file) {
            //秒传验证
            var task = new $.Deferred();
            var start = new Date().getTime();
            (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                console.log(percentage);
            }).then(function (val) {
                console.log("总耗时: " + ((new Date().getTime()) - start) / 1000);

                md5Mark = val;
                userInfo.md5 = val;
                file.lastModifiedDate = time;

                $.ajax({
                    type: "POST"
                    , url: backEndUrl
                    , data: {
                        status: "md5Check"
                        , md5: val
                        , namespace: "Resource"
                    }
                    , cache: false
                    , timeout: 1000 //todo 超时的话，只能认为该文件不曾上传过
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {

                    //console.log(data);

                    if (data.ifExist) {   //若存在，这返回失败给WebUploader，表明该文件不需要上传
                        task.reject();

                        uploader.skipFile(file);
						file.fileId=data.fileLog.id;
                        file.path = data.fileLog.fileName;
                        file.lastModifiedDate = data.fileLog.createDateStr;
                        UploadComlate(file);
                    } else {
                        task.resolve();
                        //拿到上传文件的唯一名称，用于断点续传
                        uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
                    }
                }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                    task.resolve();
                    //拿到上传文件的唯一名称，用于断点续传
                    uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size);
                });
            });
            return $.when(task);
        }
        , beforeSend: function (block) {
            //分片验证是否已传过，用于断点续传
            var task = new $.Deferred();
            $.ajax({
                type: "POST"
                , url: backEndUrl
                , data: {
                    status: "chunkCheck"
                    , name: uniqueFileName
                    , chunkIndex: block.chunk
                    , size: block.end - block.start
                    , lastModifiedDate: time
                    , namespace: "Resource"
                }
                , cache: false
                , timeout: 1000 //todo 超时的话，只能认为该分片未上传过
                , dataType: "json"
            }).then(function (data, textStatus, jqXHR) {
                if (data.ifExist) {   //若存在，返回失败给WebUploader，表明该分块不需要上传
                    task.reject();
                } else {
                    task.resolve();
                }
            }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                task.resolve();
            });

            return $.when(task);
        }
        , afterSendFile: function (file) {
            console.log(file)
            var chunksTotal = 0;
            file.lastModifiedDate = time;
            if ((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
                //合并请求
                var task = new $.Deferred();
                $.ajax({
                    type: "POST"
                    , url: backEndUrl
                    , data: {
                        status: "chunksMerge"
                        , name: uniqueFileName
                        , chunks: chunksTotal
                        , ext: file.ext
                        , md5: md5Mark
                        , lastModifiedDate: time
                        , filename: file.name
                        , type: file.type
                        , size: file.size
                        , namespace: "Resource"
                    }
                    , cache: false
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {

                    //todo 检查响应是否正常
                    console.log(data)
                    console.log(textStatus)
                    console.log(jqXHR)

                    task.resolve();
                    file.path = data.path;
					file.fileId = data.fileLog.id;
                    UploadComlate(file);

                }, function (jqXHR, textStatus, errorThrown) {
                    task.reject();
                });

                return $.when(task);
            } else {
            	uploadFlags = true;
              //  UploadComlate(file);
            }
        }
    });

    var uploader = WebUploader.create({
        swf: "Uploader.swf"
        , server: backEndUrl
        , pick: "#picker"
        , resize: false
        , dnd: ""
        , paste: document.body
        , disableGlobalDnd: true
        ,accept: {// 只允许选择图片文件格式
            title: 'file',
//          extensions: 'png,jpg,jpeg',
//          mimeTypes: 'image/!*',
            extensions: 'vob,rm,mkv,wmv,mpg,avi,f4v,flv,mov,mpeg,3gp,mp4,mp3,jpg,jpeg,png,gif,doc,docx,xls,xlsx,ppt,pptx'
        }
        , thumb: {
            width: 100
            , height: 100
            , quality: 70
            , allowMagnify: true
            , crop: true
            //, type: "image/jpeg"
        }
//				, compress: {
//					quality: 90
//					, allowMagnify: false
//					, crop: false
//					, preserveHeaders: true
//					, noCompressIfLarger: true
//					,compressSize: 100000
//				}
        , compress: false
        , prepareNextFile: true
        , chunked: true
        , chunkSize: chunkSize
        , threads: true
        , formData: function () {
            return $.extend(true, {}, userInfo);
        }
        , fileNumLimit: 10
        , fileSingleSizeLimit: 1000 * 1024 * 1024
        , duplicate: true
    });


    uploader.on("fileQueued", function (file) {
		uploader.upload();
    });

    uploader.on("uploadProgress", function (file, percentage) {
        $("#" + file.id + " .percentage").text(percentage * 100 + "%");
    });


    uploader.on('uploadSuccess', function (file, response) {
        console.log(file);
        console.log(response);
        if (response.status == 0) {
            alert(response.message);
            return;
        }else if(uploadFlags){
        	file.fileId = response.fileLog.id;
        	UploadComlate(file);
        	uploadFlags = false;
        }

        // $( '#'+file.id ).addClass('upload-state-done');
    });

    uploader.on("error", function (type) {
        if (type == "F_DUPLICATE") {
            alert("系统提示", "请不要重复选择文件！");
        } else if (type == "Q_EXCEED_SIZE_LIMIT") {
            alert("系统提示", "<span class='C6'>所选附件总大小</span>不可超过<span class='C6'>" + allMaxSize + "M</span>哦！<br>换个小点的文件吧！");
        } else if (type == "Q_TYPE_DENIED") {
            alert("文件类型不对");
        } else if (type == "F_EXCEED_SIZE") {
            alert("单文件大小超过1000");
        }

    });

    function fmtDate() {
        var date = new Date();
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
    }

	//上传成功
	function UploadComlate(file) {
		console.log(file.id+" / "+file.fileId+" / "+file.name);
		uploader.removeFile(file.id);
//		<img src="./img/resources_word.png" ng-if='i.Resource[0].ResourceSrc==0'/>
//		<img src="./img/resources_ppt.png" ng-if='i.Resource[0].ResourceSrc==1'/>
//		<img src="./img/resources_pic.png" ng-if='i.Resource[0].ResourceSrc==2'/>
//		<img src="./img/resources_excal.png" ng-if='i.Resource[0].ResourceSrc==3'/>
//		<img src="./img/resources_ear.png" ng-if='i.Resource[0].ResourceSrc==4'/> 
		var hz = file.name.substring(file.name.lastIndexOf('.')+1);
		console.log(hz);
		var type = "";
		switch(hz) {
			case "docx":
			case "DOCX":
			case "doc":
			case "DOC":
				src = "img/wendang.png";
				type = 6;
				break;
			case "mp3":
			case "MP3":
				src = "img/yinpin.png";
				type = 2;
				break;
			case "flv":
			case "FLV":
			case "mp4":
			case "MP4":
			case "vob":
			case "VOB":
			case "rm":
			case "RM":
			case "mkv":
			case "MKV":
			case "wmv":
			case "WMV":
			case "mpg":
			case "MPG":
			case "avi":
			case "AVI":
			case "f4v":
			case "F4V":
			case "mov":
			case "MOV":
			case "mpeg":
			case "MPEG":
			case "3gp":
			case "3GP":
				src = "img/shipin.png";
				type = 1;
				break;
			case 'jpg':
			case 'JPG':
			case 'gif':
			case 'GIF':
			case 'jpeg':
			case 'JPEG':
			case 'png':
			case 'PNG':
				src = "img/tupian.png";
				type = 3;
				break;
			case 'pdf':
			case 'PDF':
				src= "img/resources_pdf.png";
				type = 4;
				break;
			case "pptx":
			case "PPTX":
			case "ppt":
			case "PPT":
				src = "img/ppt.png";
				type = 5;
				break;
			case 'xlsx':
			case 'XLSX':
			case 'xls':
			case 'XLS':
				src = "img/excel.png";
				type = 7;
				break;
		};
		//var fileData = {resourceId:file.fileId, name:file.name, type:type};
		var fileData = {resourceId:file.fileId, name:file.name, type:type,ResourceSrc:type,objId:type+"",sourceAndEnclosure:"1",ResourceTit:file.name};
		$scope.variablePacket.UploadFile_show = true;
		$scope.variablePacket.uploadFile.push(fileData);
		$scope.$digest();
	}
	
	
	
	
	
	
	
	
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
app.controller('studentMyResource', ['$rootScope','$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer','myResourceService', function($rootScope,$scope, $state, $stateParams, $timeout, $http, $location, $interval, templateServer,myResourceService) {
    //导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源中心';
    
    $scope.showSubjName = ['课本','章','节']
    $scope.variablePacket ={
     	 subjectIndex:0,//选中科目下标
     	 sourceIndex:0,  //选中来源类型下标
     	 typeIndex:0,    //选中资源类型名称
     	 amendState:false, //修改资源按钮显示状态（上传资源可以修改）
     	 amendpopState:false, //修改资源弹框状态
     	 downpopState:false,  //下载弹框显示状态
     	 downtitle:"",    //下载资源标题
         xuekeId:'',//学科id
         loginUserId:sessionStorage.getItem("userId"),//测试账号登录人的id
     	 shareCase: false, 				//分享弹框显示状态
		shareIndex : 0,					//分享弹层教师、学生角色切换
		shareAllBtn : false,			//分享弹框全选按钮选中状态
		shareAllBtnShow : true,		//分享弹框全选按钮显示、隐藏状态
		shareBtn : false,               //分享弹框分享按钮
        pageNo:1,
        pageSize:6,
        loadShow:false,
		prompt:false,    //是否显示-提示框
		warn:false,     //是否显示-警示框
         leftTreeShow : {					//左侧树展示
             teachingMaterial : false,		//版本选择框
             treeOne : true,					//版本选择框下的树
             treeKnowledgePoint : false,		//知识点树
             other : false,//其他
         },
         treeShow : {					//左侧树展示
             teachingMaterial : true,		//版本选择框
             treeOne : true,					//版本选择框下的树
             treeKnowledgePoint : false,		//知识点树
             other : false,						//其他
         }
     };
     $scope.subjectData=[         //科目数据
          {"id":1,"name":"语文"},
          {"id":2,"name":"数学"},
          {"id":3,"name":"英语"}
      
      ];
      $scope.sourceData=[         //来源类型数据
          {"id":1,"name":"全部"},
          {"id":2,"name":"上传"},
          {"id":3,"name":"分享"}
      
      ];
      $scope.typeData=[         //资源类型数据
          {"id":1,"name":"全部",type:"all"},
          {"id":2,"name":"文档",type:"word"},
          {"id":3,"name":"视频",type:"video"},
          {"id":4,"name":"音频",type:"audio"},
          {"id":5,"name":"图片",type:"pic"},
          {"id":6,"name":"ppt",type:"ppt"}

      ];


    //获取登录人的信息----初始化加载
    $http.get(jeucIp + 'uc/ucUser/'+$scope.variablePacket.loginUserId+"/2").success(function (data){
//		console.log(data);
        $scope.variablePacket.pageNo = 1;
        if(data.ret == 200){
//			console.log(data.data);
            $scope.variablePacket.gradeNo=data.data.stuInfo.gradeNo;
            $scope.variablePacket.gradeId=data.data.stuInfo.gradeId;
            $scope.variablePacket.classId=data.data.stuInfo.classId;
            $scope.user = data.data;
            $scope.findSubjectByGradeId();

        }
    })

    // 资源类型
    var params = "070a33c388f24f23b05d15adc0b8fd2e";
    $http.get(resourcesIp+"/a/resource/resType?pid="+params)
        .success(function(res) {
            $scope.typeData = res.data;
            $scope.typeData.unshift({"name":"全部","id":""})
            $scope.variablePacket.type="";
        })
        .error(function(e) {
            error(e)
        })

    $scope.Subject = function(subject) { //学科验证

        $scope.variablePacket.subjectId = subject;
        $scope.selectedSubject.subjIds = "";
        $scope.selectedSubject.subjNames = "";
        if(subject!=null) {
            $scope.variablePacket.ProvingSubject = false;
            $scope.variablePacket.SubjectOff = true;
        }
        if(subject==null) {
            $scope.variablePacket.ProvingSubject = true;
        }
    };

    // 根据左侧树查询
    $rootScope.findListByTree = function(subjectID,knowledge) {
        $scope.variablePacket.pageNo = 1;
        $scope.variablePacket.subjectID = subjectID;
        $scope.variablePacket.knowledge = knowledge;
        var str = "";
        if($scope.variablePacket.subjectID == ""){
            str = $scope.variablePacket.xuekeId
        }else{
            str = $scope.variablePacket.subjectID
        }
        $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",str,$scope.variablePacket.knowledge,$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
    };

    $scope.findList = function(index,objId,title,subjectID,knowledge,pageNo,pageSize,findType) {
        if(findType != 'page'){
            $scope.filetypeContent = [];
        }
        if(index == 1) {			// 我的上传
            var params = {pageNo:pageNo,pageSize:pageSize,objId:objId,title:title,subjectID:subjectID,knowledge:knowledge,createBy:$scope.variablePacket.loginUserId};
            myResourceService.getResources(params,function(res){
                if(res.code == 200){
                    $scope.variablePacket.total = res.data.count;
                    $scope.judgeLoadShow(res.code,$scope.variablePacket.total,pageNo,pageSize);
                    $scope.filetypeContent = $scope.filetypeContent.concat(res.data.list);
                }else{
                    $scope.variablePacket.total = 0;
                    $scope.filetypeContent = [];
                }
            },function(res){

            })
        }else if(index == 2) {		// 分享
            var params = {current:pageNo,size:pageSize,objId:objId,type:"3",classId:$scope.variablePacket.classId,resourceTitle:title,subjIds:subjectID,knowledge:knowledge};
            myResourceService.getShare(params,function(res){
                if(res.code == 200){
                    $scope.variablePacket.total = res.data.total;
                    $scope.judgeLoadShow(res.code,$scope.variablePacket.total,pageNo,pageSize);
                    $scope.filetypeContent = $scope.filetypeContent.concat(res.data.records);
                }else{
                    $scope.variablePacket.total = 0;
                    $scope.filetypeContent = [];
                }
            },function(res){

            })
        }else {						// 全部资源
            var params = {current:pageNo,size:pageSize,objId:objId,title:title,subjIds:subjectID,knowledge:knowledge,userId:$scope.variablePacket.loginUserId,order:$scope.variablePacket.order};
            $http.get(resourcesIp+"/a/resource/favShareByStu",{params:params})
                .success(function(res) {
                    if(res.data.records.length > 0){
                        $scope.variablePacket.total = res.data.total;
                        $scope.judgeLoadShow("200",$scope.variablePacket.total,pageNo,pageSize);
                        $scope.filetypeContent = $scope.filetypeContent.concat(res.data.records);
                    }else{
                        $scope.variablePacket.total = res.data.total;
                        $scope.filetypeContent = [];
                    }
                })
                .error(function(e) {
                    error(e)
                })
        }
    }

    /**
     * 根据年级id查询所有学科
     */
    $scope.findSubjectByGradeId=function(){
        $http.get(jeucIp + 'edu/eduSubject?gradeId='+$scope.variablePacket.gradeId).success(function (data){
//			console.log(data);
            if(data.ret == 200){
//				console.log(data.data);
                $scope.subjectData=data.data;
                $scope.variablePacket.subjectId=data.data[0].id;
                $scope.variablePacket.xuekeId = data.data[0].id;
//				初始化的学科
//				console.log($scope.variablePacket.subjectId);
                $scope.findList("0","","",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
//				$scope.guideToggle($scope.variablePacket.subjectId,0);
            }
        })
    }

      $scope.subjectTab=function (i,id) {       //切换科目
          $scope.variablePacket.pageNo = 1;
      	 $scope.variablePacket.subjectIndex=i;
          $scope.variablePacket.xuekeId = id;
          $scope.variablePacket.pageNo = 1;
          $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
      };
	  $scope.sourceTab=function (i) {      //切换来源类型
          $scope.variablePacket.pageNo = 1;
      	 $scope.variablePacket.sourceIndex=i;
      	 if(i==1){
      	 	 $scope.variablePacket.amendState=true;
      	 }else{
      	 	 $scope.variablePacket.amendState=false;
      	 };
          $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
      };
       $scope.typeTab=function (i,id) {      //切换资源类型
           $scope.variablePacket.pageNo = 1;
      	 $scope.variablePacket.typeIndex=i;
      	 $scope.variablePacket.type=id;
           $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
      };
     
      $scope.resourceData={
      	      "all":[
      	          {"id":1,"title":"一年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":2,"title":"二年级期末考试.mp4","name":"李四","time":"2018-03-28","size":"1049.03k","type":"1"},
      	          {"id":3,"title":"三年级期末考试.mp3","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	          {"id":4,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          {"id":5,"title":"五年级期末考试.ppt","name":"张三","time":"2018-02-28","size":"1049.03k","type":"5"}
   
      	       ],
      	       "word":[
      	          {"id":1,"title":"一年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":2,"title":"二年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},
      	          {"id":3,"title":"三年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":4,"title":"四年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"}
      	         
      	       ],
      	       "video":[
      	          {"id":1,"title":"三年级期末考试.mp4","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	          {"id":2,"title":"三年级期末考试.mp4","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	         
      	       ],
      	       "audio":[
      	            {"id":3,"title":"三年级期末考试.mp3","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"}
      	       ],
      	       "pic":[
      	          
      	          {"id":1,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          {"id":2,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          
      	         
      	       ],
      	       "ppt":[
      	          {"id":1,"title":"五年级期末考试.ppt","name":"张三","time":"2018-02-28","size":"1049.03k","type":"5"}
      	         
      	       ]
      };
      $scope.Del = function(i,title) {   //删除
		    $scope.promptShow('确认删除吗？',false,title);
			$scope.delOk = function (){
					$scope.variablePacket.prompt = false;
					if($scope.variablePacket.sourceIndex == "1"){
                        myResourceService.deleteResource(i.id,function(res){
                            if(res.code == 200){
                                $scope.variablePacket.prompt = false;
                                $scope.wranShow('已删除',false,title);
                                $timeout(function () {
                                    $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
                                }, 900);
                            }
                        },function(res){

                        })
                    }else if($scope.variablePacket.sourceIndex == "2"){
                        myResourceService.deleteShare(i.id,function(res){
                            if(res.code == 200){
                                $scope.variablePacket.prompt = false;
                                $scope.wranShow('删除成功',true);
                                $timeout(function () {
                                    $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
                                }, 900);
                            }
                        },function(res){

                        })
                    }else{
                        if("2" ==  i.sourceType){
                            myResourceService.deleteShare(i.id,function(res){
                                if(res.code == 200){
                                    $scope.variablePacket.prompt = false;
                                    $scope.wranShow('删除成功',true);
                                    $timeout(function () {
                                        $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
                                    }, 900);
                                }
                            },function(res){

                            })
                        }
                        if("1" ==  i.sourceType){
                            myResourceService.deleteResource(i.id,function(res){
                                if(res.code == 200){
                                    $scope.variablePacket.prompt = false;
                                    $scope.wranShow('已删除',false,title);
                                    $timeout(function () {
                                        $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize);
                                    }, 900);
                                }
                            },function(res){

                            })
                        }
                    }
			};
        };

    $scope.stateTab=function(i){               //调转路由

        if( $scope.variablePacket.sourceIndex== 1){
            if('resourceId' in i){
                $state.go("secondNav.resourceDtealis",{"id":i.resourceId,"showShareStu":true,"page":"secondNav.resourceType.myResource"})
            }else{
                $state.go("secondNav.resourceDtealis",{"id":i.id,"showShareStu":true,"page":"secondNav.resourceType.myResource"})
            };
        }
        if( $scope.variablePacket.sourceIndex== 2){
            if('resourceId' in i){
                $state.go("secondNav.resourceDtealis",{"id":i.resourceId,"showShareStu":false,"page":"secondNav.resourceType.myResource"})
            }else{
                $state.go("secondNav.resourceDtealis",{"id":i.id,"showShareStu":false,"page":"secondNav.resourceType.myResource"})
            };
        }
        if( $scope.variablePacket.sourceIndex== 0){
            if('resourceId' in i){
                if(i.sourceType == "1"){
                    $state.go("secondNav.resourceDtealis",{"id":i.resourceId,"showShareStu":true,"page":"secondNav.resourceType.myResource"})
                }else{
                    $state.go("secondNav.resourceDtealis",{"id":i.resourceId,"showShareStu":false,"page":"secondNav.resourceType.myResource"})
                }
            }else{
                if(i.sourceType == "1"){
                    $state.go("secondNav.resourceDtealis",{"id":i.id,"showShareStu":true,"page":"secondNav.resourceType.myResource"})
                }else{
                    $state.go("secondNav.resourceDtealis",{"id":i.id,"showShareStu":false,"page":"secondNav.resourceType.myResource"})
                }

            };
        }

    }

    // 分页
    $scope.findResourcePage = function() {
        var totalCount = $scope.variablePacket.total;
        pageNoCount = totalCount % $scope.variablePacket.pageSize == 0 ? totalCount / $scope.variablePacket.pageSize : Math.ceil(totalCount / $scope.variablePacket.pageSize);
        var pageNo = $scope.variablePacket.pageNo;
        pageNo+=1;
        if(pageNo > pageNoCount) {
            pageNo = pageNoCount;
            return ;
        }
        $scope.variablePacket.pageNo = pageNo;
        $scope.findList($scope.variablePacket.sourceIndex,$scope.variablePacket.type,"",$scope.variablePacket.xuekeId,"",$scope.variablePacket.pageNo,$scope.variablePacket.pageSize,'page');
    };
        $scope.showShare=function(i){  //分享
            $scope.promptShow('确认要分享吗？',false,"资源分享");
            $scope.delOk = function (){
                $scope.variablePacket.prompt = false;
                var subjIds = i.subjIds.split(",");
                $http.get(zyxrequireIp + '/edu/eduTextbook?levelId='+subjIds[1]+"&subjectId="+subjIds[2]+"&versionId="+subjIds[3]+"&id="+subjIds[4]).success(function(suc) {
                    if(suc.ret == 200) {
                        if(suc.data.length == 0){
                            $scope.wranShow('资源科目信息不正确',false,"资源共享");
                            return;
                        }
                        var gradeNo = suc.data[0].gradeNo;
                        if(gradeNo != $scope.variablePacket.gradeNo){
                            $scope.wranShow('请共享当前年级的资源',false,"资源共享");
                            return;
                        }

                        var subjectId = i.subjIds.split(",")[2];
                        $http.get(jeucIps+"jeuc/api/uc/user?userType=1&delFlag=0&state=1&classId="+$scope.user.stuInfo.classId +"&subjectId="+subjectId)
                            .success(function(user) {
                                if(user.data.list.length == 0){
                                    $scope.wranShow('无对应任何老师',false,"资源共享");
                                }else{
                                    var userId = user.data.list[0].id;
                                    $http.post(resourcesIp+"/a/resource/share?userId="+userId+"&type=3&resourceIds="+i.id+"&fromUserId="+$scope.variablePacket.loginUserId+"&classId="+$scope.user.stuInfo.classId+"&className="+$scope.user.stuInfo.gradeName+"("+$scope.user.stuInfo.className+")班")
                                        .success(function(data) {
                                            
                                            if(data.msg == '操作成功'){
                                            	$scope.wranShow(data.msg,true,"资源共享");
                                            }else{
                                            	$scope.wranShow(data.msg,false,"资源共享");
                                            }
                                        })
                                        .error(function(e) {
                                            error(e)
                                        })
                                }
                            })
                            .error(function(e) {
                                error(e)
                            })
                    }
                });


            };
        };


    $scope.updateResource = function() {
        var title = $scope.variablePacket.resourceName;
        var keywords = $scope.variablePacket.keywords;

        if($scope.selectedSubject!=null && $scope.variablePacket.resourceName!=null && $scope.variablePacket.resourceName!=""){
            myResourceService.update({id:$scope.variablePacket.resId,title:title,keywords:keywords,subjIds:$scope.variablePacket.subjIds,subjNames:$scope.variablePacket.subjNames,updateBy:$scope.variablePacket.loginUserId,userId:$scope.variablePacket.loginUserId},function(res){
                if(res.code == 200){
                    $scope.variablePacket.amendpopState=false
                    $timeout(function () {
                        $scope.findList($scope.variablePacket.sortModuleIndex);
                    }, 900);
                    $scope.wranShow('修改成功！',true);
                }
            });
        }else {
            $scope.wranShow("请完善信息！",false);
        }

    }


    $scope.getUpdateResById = function(id) {
        $scope.variablePacket.amendpopState=true
        $scope.variablePacket.resId=id;
        myResourceService.findResById(id,function(res){
            if(res.code == 200){
                $scope.variablePacket.resourceName = res.data.title;
                $scope.variablePacket.keywords = res.data.keywords;
                var selectedSubject = res.data.subjIds.split(",")[2];
                var arr = res.data.subjNames.split("//");
                $scope.variablePacket.arrSubject = $scope.subjectData;
                angular.forEach($scope.subjectData, function(data){
                    if(data.id == selectedSubject){
                        data.subjIds = res.data.subjIds;
                        data.subjNames = res.data.subjNames;
                        $scope.showSubjName = [arr[4],arr[5],arr[6]];
                        $scope.selectedSubject = data;
                    }
                });
            }
        },function(res){

        })
    };
         $scope.closeTan = function(){   //关闭修改弹框
               $scope.variablePacket.amendpopState=false;
	     };
	     $scope.download = function(i){   //关闭修改弹框
             if($scope.variablePacket.sourceIndex == "1"){
                 window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+i.title+'&id='+i.id,'_blank');
             }else if($scope.variablePacket.sourceIndex == "2"){
                 window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+i.resourceTitle+'&id='+i.resourceId,'_blank');
             }else{
                 if("2" ==  i.sourceType){
                     window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+i.resourceTitle+'&id='+i.resourceId,'_blank');
                 }
                 if("1" ==  i.sourceType){
                     window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+i.title+'&id='+i.id,'_blank');
                 }
             }
	     };
	    $scope.closedownPop=function(){ //关闭下载弹框
	    	  $scope.variablePacket.downpopState=false; 
	    };
       
	$scope.judgeLoadShow = function(code,total,pageSize,pageNo){
		$scope.variablePacket.loadShow = false;
		if(code == 200){
			var totalPage = total%pageSize == 0?total/pageSize:Math.ceil(total/pageSize);
			if(pageNo < totalPage){
				$scope.variablePacket.loadShow = true;
			}
		}
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
        }
        return icon;
    };
  
});
app.controller('myResourceCtrl', ["$rootScope",'$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer','myResourceService', function($rootScope,$scope, $state, $stateParams, $timeout, $http, $location, $interval, templateServer,myResourceService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源中心';
    
    var userId = sessionStorage.getItem('userId');
    var pageNo = 1;
    var pageSize = 6;
    $scope.showSubjName = ['课本','章','节']

	$scope.variablePacket = {
		total: 0, //文件类型头部选中下标
		loadShow:false,
        title:"",
        objId:"",
        subjectID:"",
        knowledge:"",
        // state:JSON.parse(sessionStorage.getItem('managerSearch')).state,
        // userType:JSON.parse(sessionStorage.getItem('managerSearch')).userType,
        // officeId:JSON.parse(sessionStorage.getItem('managerSearch')).officeId,
        inx:0,
		ProvingSubject: false, //学科验证
		ProvingChapter: false, //章节目录验证
		share: true, 					//分享图标是否显示 
		sortModuleIndex: 0, 			//分类模块选中下标
		filetypeHeadIndex: 0, 			//文件类型头部选中下标
		publicity: true, 				//是否有公开按钮
		shareCase: false, 				//分享弹框显示状态
		shareIndex : 0,					//分享弹层教师、学生角色切换
		shareAllBtn : false,			//分享弹框全选按钮选中状态
		shareAllBtnShow : true,		//分享弹框全选按钮显示、隐藏状态
		shareBtn : false,				//分享弹框分享按钮
		selectSubject : [],				//下拉列表教师科目
		selectedSubject : '12',			//下拉列表教师选中的科目
		selectGrade : [],				//下拉列表学生年级
		selectedGrade : '5',			//下拉列表学生选中的年级
		selectClass : [],				//下拉列表学生班级
		selectedClass : '',				//下拉列表学生选中的班级
		SharePeopleArr : [],			//分享对（学生或教师）集合
		teacherList:[],
		sortModule: [{
				name: "全部"
			},
			{
				name: "上传"
			},
			{
				name: "分享"
			},
			{
				name: "收藏"
			}
		],
//		modification:false,
		filetypeHead: [],
		resourceName :"",	   // 学科name
		keywords :"",
		resId:"",
	    amendpopState:false    ,      //修改弹框资源显示状态
	    arrSubject:"",
	    shareType:"1",
	    classId:'',
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
        roleIndex:0, //分享 选中角色下标
        classIndex:0, //分享  选中班级下标
        roleData:[    //分享角色数据
                {name:"教师"},
                {name:"学生"}
          ]

	};
	  $scope.roleTab=function(i){    //切换角色
	  	pageNo = 1;
	  	if(i == 0) {
	  		$scope.variablePacket.shareType = 1;
	  	}else{
	  		$scope.classData = []; // 清空班级
	  		var classMap = {};
	  		var infoList = JSON.parse(sessionStorage.getItem('managerSearch')).arrSubject;
    		angular.forEach(infoList, function(data){
    			if(classMap[data.cid] === undefined) {
    				var classInfo = {
	                    id:data.cid,
	                    name:data.cname,
	                    flag:0
	                };
	                $scope.classData.push(classInfo);
	                classMap[data.cid] = data;
    			}
            });
            $scope.classData.unshift({"name":"全部","id":""})
	  		$scope.variablePacket.shareType = 3;
	  	}
	  	$scope.variablePacket.roleIndex=i;
	  	$scope.findList($scope.variablePacket.sortModuleIndex,$scope.variablePacket.objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize,'');
	  };
	  $scope.classTab=function(index,i){   //切换班级
	  	 pageNo = 1;
	  	 $scope.variablePacket.classIndex=index;
	  	 $scope.variablePacket.classId=i.id;
	  	 $scope.findList($scope.variablePacket.sortModuleIndex,$scope.variablePacket.objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize,'');
	  };
//  $http.get(zyxrequireIp + '/uc/user/'+userId).success(function(suc) {
//  		angular.forEach(suc.data.userCourse, function(data){
//              var subj = {
//                  id:data.subjectId,
//                  name :data.subjectName,
//                  vid :data.versionId,
//                  vname:data.versionName,
//                  lid :"level_"+data.stage,
//                  lname:getLeveName(data.stage),
//                  flag:0
//              };
//              $scope.variablePacket.arrSubject.push(subj);
//          });
//  });
	$scope.filetypeContent = [];
	$scope.stateTab=function(i){               //调转路由
		  if('resourceId' in i){
		  	  $state.go("secondNav.resourceDtealis",{"id":i.resourceId,"page":"secondNav.resourceType.myResource"})
		  }else{
		       $state.go("secondNav.resourceDtealis",{"id":i.id,"page":"secondNav.resourceType.myResource"})
		  };
		
	}
	
    $rootScope.treetype = "0";
    $scope.findResourceList = function(objId,subjectID,knowledge) { //文件类型头部切换 objId
        pageNo =1;
        var pobjId = "";
        if(objId != ""){
            $scope.variablePacket.filetypeHeadIndex = objId;
            pobjId =objId;
            if(objId == "-1"){
                pobjId = "";
            }
        }
        if(subjectID != ""){
            $scope.variablePacket.subjectID = subjectID;
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
        $scope.findList($scope.variablePacket.filetypeHeadIndex,pobjId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge);
    };
    
	
	$scope.sortModuleTab = function(index) { //分类模块部切换
		$scope.variablePacket.sortModuleIndex = index;
		$scope.variablePacket.filetypeHeadIndex = 0;
		pageNo = 1;
		if(index == 2 || index == 3) {
			$scope.variablePacket.publicity = false;
			$scope.findList(index,$scope.variablePacket.objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize);
		} else {
			$scope.variablePacket.publicity = true;
			$scope.findList(index,$scope.variablePacket.objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize);
		};

	};
	$scope.filetypeHeadState = function(index,objId) { //文件类型头部切换
		$scope.variablePacket.filetypeHeadIndex = index;
		$scope.variablePacket.objId = objId;
		pageNo = 1;
		$scope.findList($scope.variablePacket.sortModuleIndex,objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize);
	};
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

//   $scope.verifySubject=function(){    //点击章节目录时先验证学科
//		 
//		 if($scope.selectedSubject==null){
//		 	$scope.variablePacket.ProvingSubject = true;
//		 }else{
//		 	$scope.variablePacket.ProvingSubject = false;
//		 };
//		 if(angular.element('.titleSpan').find('em')[2].innerHTML=="节"){
//		 	  $scope.variablePacket.ProvingChapter=true;
//		 }else{
//		 	  $scope.variablePacket.ProvingChapter=false;
//		 };
//	};
	
	$scope.focus=function(){        //验证章节
		 var em1=angular.element('.titleSpan').eq(1).find('em')[0].innerHTML;
		 var em2=angular.element('.titleSpan').eq(1).find('em')[1].innerHTML;
		 var em3=angular.element('.titleSpan').eq(1).find('em')[2].innerHTML;
		 if(em1!="课本" && em2!="章" && em3!="节"){
		 	 $scope.variablePacket.ProvingChapter=false;

		 }else{
		 	 $scope.variablePacket.ProvingChapter=true;
		 };
	};
	
	$scope.addPrepare = function(item) {
		console.info(item)
		if(item.syncState == 1) {
			item.syncState = 0;
		}else {
			item.syncState = 1;
		}
		var params = {id:item.id,state:item.syncState};
		if(item.sourceType == 1) {
			myResourceService.addSync(params,function(res) {
				if(res.code == 200) {
					console.log("addSync"+res.code)
				}
			},function(e) {
				console.log("addSync"+e)
			})
		}else {
			if(item.sourceType == 3 || $scope.variablePacket.sortModuleIndex == 3) {
				myResourceService.addfavSync(params,function(res) {
					if(res.code == 200) {
						console.log("addfavSync"+res.code)
					}
				},function(e) {
					console.log("addfavSync"+e)
				})
			}else {
				myResourceService.addShareSync(params,function(res) {
					if(res.code == 200) {
						console.log("addShareSync"+res.code)
					}
				},function(e) {
					console.log("addShareSync"+e)
				})
			}

		}
	}
	
	//公开活取消切换 (修改资源的state 状态)
	$scope.openStateTab = function(item) { 
		if(item.state == 1) {
			myResourceService.update({id:item.id,state:0},function(res){
				item.state=0;
			});
		}else {
			myResourceService.update({id:item.id,state:1},function(res){
				item.state=1;
			});
		}
		
	};

	$scope.findList = function(index,objId,title,subjectID,knowledge,pageNo,pageSize,findType) {
		if(findType != 'page'){
			$scope.filetypeContent = [];
		}
		if(index == 1) {			// 我的上传
			var params = {pageNo:pageNo,pageSize:pageSize,objId:objId,title:title,subjectID:subjectID,knowledge:knowledge,createBy:userId};
			myResourceService.getResources(params,function(res){
				if(res.code == 200){
					$scope.variablePacket.total = res.data.count;
					$scope.judgeLoadShow(res.code,$scope.variablePacket.total,pageNo,pageSize);
					$scope.filetypeContent = $scope.filetypeContent.concat(res.data.list);
				}else{
					$scope.variablePacket.total = 0;
					$scope.variablePacket.loadShow = false;
					$scope.filetypeContent = [];
				}
			},function(res){
				
			})
		}else if(index == 2) {		// 分享
			var params = {current:pageNo,size:pageSize,objId:objId,userId:userId,type:$scope.variablePacket.shareType,resourceTitle:title,subjIds:subjectID,knowledge:knowledge,classId:$scope.variablePacket.classId};
			myResourceService.getShare(params,function(res){
				if(res.code == 200){
					$scope.variablePacket.total = res.data.total;
					$scope.judgeLoadShow(res.code,$scope.variablePacket.total,pageNo,pageSize);
					$scope.filetypeContent = $scope.filetypeContent.concat(res.data.records);
				}else{
					$scope.variablePacket.total = 0;
					$scope.variablePacket.loadShow = false;
					$scope.filetypeContent = [];
				}
			},function(res){
				
			})
		}else if(index == 3) {		// 收藏
			var params = {current:pageNo,size:pageSize,objId:objId,userId:userId,resourceTitle:title,subjIds:subjectID,knowledge:knowledge};
			myResourceService.getFavorites(params,function(res){
				if(res.code == 200){
					$scope.variablePacket.total = res.data.total;
					$scope.judgeLoadShow(res.code,$scope.variablePacket.total,pageNo,pageSize);
					$scope.filetypeContent = $scope.filetypeContent.concat(res.data.records);
				}else{
					$scope.variablePacket.total = 0;
					$scope.variablePacket.loadShow = false;
					$scope.filetypeContent = [];
				}
			},function(res){
				
			})
		}else {						// 全部资源	
			var params = {pageNo:pageNo,pageSize:pageSize,objId:objId,title:title,subjectID:subjectID,knowledge:knowledge,userId:userId,order:$scope.variablePacket.order};
			myResourceService.getResourcesAll(params,function(res){
				if(res.list.length > 0){
					$scope.variablePacket.total = res.count;
					$scope.judgeLoadShow(200,$scope.variablePacket.total,pageNo,pageSize);
					$scope.filetypeContent = $scope.filetypeContent.concat(res.list);
				}else{
					$scope.variablePacket.total = res.count;
					$scope.variablePacket.loadShow = false;
					$scope.filetypeContent = [];
				}
			},function(res){
				
			})
		}
	}
	
	
	$scope.findList("0","","","","",pageNo,pageSize);
	$rootScope.findResAll = function(){
		$scope.variablePacket.filetypeHeadIndex = 0;
		$scope.variablePacket.objId = "";
		$scope.variablePacket.title = "";
		$scope.findList($scope.variablePacket.sortModuleIndex,"","","","",pageNo,pageSize);
	}

	// 资源类型
	var params = "070a33c388f24f23b05d15adc0b8fd2e";
	myResourceService.getResType(params,function(res){
		if(res.code == 200){
			$scope.variablePacket.filetypeHead = res.data;
			$scope.variablePacket.filetypeHead.unshift({"name":"全部","id":""})
		}else{
			$scope.variablePacket.filetypeHead = [];
		}
	},function(res){
		
	})
		
		
	//删除资源
	$scope.Del = function(i, index) {
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			if($scope.variablePacket.sortModuleIndex == 0) {
				if(i.sourceType == 1) {
					$scope.deleteResource(i.id,index);
				}
				if(i.sourceType == 2) {
					$scope.deleteFav(i.id,index);
				}
				if(i.sourceType == 3) {
					$scope.deleteShare(i.id,index);
				}
			}
			if($scope.variablePacket.sortModuleIndex == 1) {
				$scope.deleteResource(i.id,index);
			}
			if($scope.variablePacket.sortModuleIndex == 3) {
				$scope.deleteFav(i.id,index);
			}
			if($scope.variablePacket.sortModuleIndex == 2) {
				$scope.deleteShare(i.id,index);
			}
		};
	};
	// 1.删除资源
	$scope.deleteResource = function(id,index) {
		myResourceService.deleteResource(id,function(res){
			if(res.code == 200){
				$scope.filetypeContent.splice(index,1);
				$scope.variablePacket.total = $scope.variablePacket.total - 1;
				$scope.variablePacket.prompt = false;
				$scope.wranShow('删除成功',true);
			}
		},function(res){
			
		})
	}
	// 2.删除收藏
	$scope.deleteFav = function(id,index) {
		myResourceService.deleteFavorites(id,function(res){
			if(res.code == 200){
				$scope.filetypeContent.splice(index,1);
				$scope.variablePacket.total = $scope.variablePacket.total - 1;
				$scope.variablePacket.prompt = false;
				$scope.wranShow('删除成功',true);
			}
		},function(res){
		
		})
	}
	// 3.删除分享
	$scope.deleteShare = function(id,index) {
		myResourceService.deleteShare(id,function(res){
			if(res.code == 200){
				$scope.filetypeContent.splice(index,1);
				$scope.variablePacket.total = $scope.variablePacket.total - 1;
				$scope.variablePacket.prompt = false;
				$scope.wranShow('删除成功',true);
			}
		},function(res){
		
		})
	}
	
	
    /**
     * 下载资源
     * @param id
     * @param fileName		resourcesIp
     */
    $scope.download = function(id,fileName) {
    	window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+fileName+'&id='+id,'_blank');
    };
	
	// 分页
    $scope.findResourcePage = function() {
    	var totalCount = $scope.variablePacket.total;
    	pageNoCount = totalCount % pageSize == 0 ? totalCount / pageSize : Math.ceil(totalCount / pageSize);
        pageNo+=1;
        if(pageNo > pageNoCount) {
        	pageNo = pageNoCount;
        	return ;
        }
        var title = $scope.variablePacket.title;
        var objId = "";
        if($scope.variablePacket.filetypeHeadIndex != 0) {
        	objId = $scope.variablePacket.objId;
        }
        var subjectID = $scope.variablePacket.subjectID;
        var knowledge = $scope.variablePacket.knowledge;
        if($scope.variablePacket.sortModuleIndex == 2 || $scope.variablePacket.sortModuleIndex == 3) {
			$scope.variablePacket.publicity = false;
			$scope.findList($scope.variablePacket.sortModuleIndex,objId,title,subjectID,knowledge,pageNo,pageSize,'page');
		} else {
			$scope.variablePacket.publicity = true;
			$scope.findList($scope.variablePacket.sortModuleIndex,objId,title,subjectID,knowledge,pageNo,pageSize,'page');
		};
    };
    
    //搜索查询		index,objId,title,subjectID,knowledge,pageNo,pageSize
    $scope.findTitle = function() { 
    	if($scope.variablePacket.filetypeHeadIndex == 0) {
    		$scope.variablePacket.objId = "";
    	}else {
    		$scope.variablePacket.objId = $scope.variablePacket.filetypeHeadIndex;
    	}
        $scope.findList($scope.variablePacket.sortModuleIndex,$scope.variablePacket.objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize);

    };
    
    // 分享弹框  查询 教师学科  zyxrequireIp
    $scope.showShare = function(resource){
        $scope.variablePacket.state = JSON.parse(sessionStorage.getItem('managerSearch')).state;
        $scope.variablePacket.userType = JSON.parse(sessionStorage.getItem('managerSearch')).userType;
        $scope.variablePacket.officeId = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
        var url = zyxrequireIp + '/uc/user?officeId='+$scope.variablePacket.officeId+'&delFlag=0&state='+$scope.variablePacket.state+'&userType='+$scope.variablePacket.userType;
        $http.get(url).success(function(suc) {
            if(suc.ret == 200) {
                var list = new Array();
                angular.forEach(suc.data.list, function(data){
                	if(data.id != userId){
                		var obj = {
	                        id:data.id,
	                        name:data.realname,
	                        state:false,
	                        disabled:false
	                    }
	                    list.push(obj)
                	}
                });
                if($scope.variablePacket.sortModuleIndex < 2 && resource.sourceType == "1") {
                	$scope.variablePacket.resource = resource;
                }else {
                	var res = {
                        id:resource.resourceId,
                        createBy:resource.createBy
                    }
                	$scope.variablePacket.resource = res;
                }
                $scope.variablePacket.SharePeopleArr = list;
                $scope.variablePacket.teacherList = list;
                $scope.variablePacket.shareCase=true;
                $scope.variablePacket.selectedSubject = "";
            };
        });
	}
    
   	// 分享弹框  查询 学生年级 班级
//  $http.get(zyxrequireIp + '/ea/eaOffice?officeId='+$scope.variablePacket.officeId+'&flag=0&state='+$scope.variablePacket.state).success(function(suc) {
//      if(suc.ret == 200) {
//          $scope.variablePacket.selectSubject = suc.data.subjectList;
//          var list = new Array();
//          angular.forEach(suc.data.gradeList, function(data){
//              var obj = {
//                  id:data.id,
//                  grade:data.name,
//              }
//              list.push(obj)
//          });
//          $scope.variablePacket.selectGrade = list;
//      };
//  });

	// 根据左侧树查询
    $rootScope.findListByTree = function(subjectID,knowledge) {
        pageNo =1;
        var objId = $scope.variablePacket.objId;
        var pobjId = "";
        if(objId != ""){
            $scope.variablePacket.filetypeHeadIndex = objId;
            pobjId =objId;
            if(objId == "-1"){
                pobjId = "";
            }
        }
		$scope.variablePacket.subjectID = subjectID;
		$scope.variablePacket.knowledge = knowledge;
        $scope.findList($scope.variablePacket.sortModuleIndex,objId,$scope.variablePacket.title,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge,pageNo,pageSize);
    };
    
    
    // 修改 回显
    $scope.getUpdateResById = function(id) {
    	$scope.variablePacket.amendpopState=true
    	$scope.variablePacket.resId=id;
    	myResourceService.findResById(id,function(res){
			if(res.code == 200){
				$scope.variablePacket.resourceName = res.data.title;
				$scope.variablePacket.keywords = res.data.keywords;
                var selectedSubject = res.data.subjIds.split(",")[2];
                var arr = res.data.subjNames.split("//");
                $scope.variablePacket.arrSubject = JSON.parse(sessionStorage.getItem('managerSearch')).arrSubject;
                angular.forEach($scope.variablePacket.arrSubject, function(data){
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
    
        // 获取左侧 id name	getGradeNo
    $rootScope.getTreeByIdsNames = function(ids,names) {
    	$scope.variablePacket.subjIds = ids;
    	$scope.variablePacket.subjNames = names;
    };

    $scope.clearxiugai = function(){
        $rootScope.initchoiceVersion();
    }

    $scope.closeTan = function(){
        $scope.variablePacket.amendpopState=false;
	}

    // 修改资源
    $scope.updateResource = function() {
    	var title = $scope.variablePacket.resourceName;
		var keywords = $scope.variablePacket.keywords;

		if($scope.selectedSubject!=null && $scope.variablePacket.ProvingChapter==false && $scope.variablePacket.resourceName!=null && $scope.variablePacket.resourceName!=""){
			myResourceService.update({id:$scope.variablePacket.resId,title:title,keywords:keywords,subjIds:$scope.variablePacket.subjIds,subjNames:$scope.variablePacket.subjNames,updateBy:userId,userId:userId},function(res){
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
    
	$scope.judgeLoadShow = function(code,total,pageSize,pageNo){
		$scope.variablePacket.loadShow = false;
		if(code == 200){
			var totalPage = total%pageSize == 0?total/pageSize:Math.ceil(total/pageSize);
			if(pageNo < totalPage){
				$scope.variablePacket.loadShow = true;
			}
		}
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

	//根据年级获取 年级段
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
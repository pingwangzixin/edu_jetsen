app.controller('prepareLessonsListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '在线备课';
	
	
	$scope.subjectList=[];

	//变量包
	$scope.variablePacket = {
		userId : sessionStorage.getItem('userId'),//"37d4d64e06eb4695be69a8a129973627"
		createUser:'',
		gradeJson :"",
        subjIds:'',
        subjNames:'',
        areaId :"",
        areaName:"",
        countyId:"",
        filetypeContent:[],
        countyName:"",
        officeId:"",
        officeName:"", 
        jiazai:true,
        pageSize: 10,
        pageNo:1,
        subject:"",//默认选中科目
	 	subjectIndex:0,  //选中科目显下标
	 	leftTreeShow : {					//左侧树展示
			teachingMaterial : false,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : true,					//其他
		}
	}
	//##############################根据学科查询章节目录  ---start---###################################//
	//查询当前教师的 授课信息
    $http.get(jeucIp + '/uc/user/'+$scope.variablePacket.userId).success(function(suc) {
        if(suc.ret == 200) {
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
               
           		$scope.subjectList.push(subj);
            });
             $scope.variablePacket.subject = $scope.subjectList[0].name;
        }
    });


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
	

    $scope.subjectTab=function(i,$index){         //科目选择
    	 $scope.variablePacket.subjectIndex=$index;
    	 $scope.variablePacket.subject=i.name;
    	 
    };
	/*$scope.filetypeContent =[
	       {
				id: 1,
				type: "ppt", //文件类型
				name: "考试试卷.ppt", //文件名称
				uploader: "张三", //上传者
				time: "2017-02-03", //上传时间
				size: "11115.k", //文件大小
				prepare: true, //是否备课
				src: "img/resources_ppt.png" //ppt文件类型图标
			},
			{
				id: 2,
				type: "word",
				name: "考试试卷哈哈哈哈.word",
				uploader: "张三疯",
				time: "2018-03-03",
				size: "11112.k",
				prepare: true, 
				src: "img/resources_word.png"  //word文件图标
			},
			{
				id: 3,
				type: "video",
				name: "考试试卷.video",
				uploader: "张三",
				time: "2017-03-03",
				size: "11111.k",
				prepare:false, 
				src: "img/resources_video.png"  //视频文件图标
			},
			{
				id: 4,
				type: "pic",
				name: "考试试卷.pic",
				uploader: "李四",
				time: "2017-03-06",
				size: "11111.k",
				prepare: true, 
				src: "img/resources_pic.png" //图片文件图标
			},
			{
				id: 5,
				type: "audio",
				name: "考试试卷.audio",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_ear.png" //音频文件图标
			},
			{
				id: 6,
				type: "excal",
				name: "考试成绩统计表.excal",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_excal.png" //excal文件图标
			},
			{
				id: 6,
				type: "package",
				name: "考试成绩统计表.备课包",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_package.png" //文件包文件图标
			}
		
			
	];*/
	
	//查询备课包列表
	$scope.findPrepareList = function(){		
		var chapterIds = "";
		if($scope.variablePacket.subjectID){
			chapterIds = $scope.variablePacket.subjectID;
		}
		$http.get(prepareServerIp + '/prepare?teaId='+$scope.variablePacket.userId+'&chapterIds='+chapterIds+'&pageNo='+$scope.variablePacket.pageNo+"&pageSize="+$scope.variablePacket.pageSize).success(function(suc) {
	        if(suc.ret == 200) {
	        	if(suc.data){
	        		angular.forEach(suc.data,function(e,i){
		        		var mypackage = {};
						mypackage.id = e.id;
						mypackage.type = "package";
						mypackage.name = e.title;
						mypackage.uploader = e.teaName;
						mypackage.time = e.createTime;
						mypackage.prepare = e.state == 1 ? true : false,
						mypackage.src = "img/resources_package.png";
						$scope.variablePacket.filetypeContent.push(mypackage);
					});
					//如果当前查询的数据不够时，不显示数据加载
					if(suc.data.length < $scope.variablePacket.pageSize){
						$scope.variablePacket.jiazai=false;
					}
	        	}else{
	        		$scope.variablePacket.jiazai=false;
	        	}
	        }else{
	        	$scope.variablePacket.jiazai=false;
				$scope.variablePacket.pageSize = 1;
				$scope.variablePacket.filetypeContent = [];
	        }
	    });
	}
	
	$scope.findPrepareList();
	
	/**
	 * 加载更多
	 */
	$scope.jiazai = function(pageNo){
		pageNo = pageNo+1;
		$scope.variablePacket.pageNo = pageNo;		
		$scope.findPrepareList();
	}
	
	$rootScope.findListByTree = function(subjectID,knowledge) { //文件类型头部切换
		console.log("subjectID--"+subjectID+"---knowledge--"+knowledge);
        pageNo =1;
        $scope.variablePacket.selectType = 0;
        var pobjId = "";
        if(subjectID == "" || subjectID == null && knowledge == "" || knowledge == null){
        	console.log("没有返回值，查询全部内容");
        	//刚开始默认查询第一个年级的导学
        	$scope.getGuidanceLearningList(null,$scope.classSummary.classId,1);
        }
        if(subjectID != ""){
            $scope.variablePacket.subjectID = subjectID;
            $scope.findPrepareList();
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
        //$scope.findResource($scope.variablePacket.title,pobjId,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge);
    };
	//删除备课表列表
	$scope.delPrepareList = function(id){
		$http.delete(prepareServerIp + '/prepare/'+id).success(function() {
	      console.log(id+"已删除") ;
	    });
	}
	
	
	$scope.prepareStateTab = function(item) { //备课状态切换
		item.prepare = !item.prepare;	
		var state = item.prepare == true ? 1 : 0;
		var data='{"id":'+item.id+',"state":'+state+'}';
		$http.put(prepareServerIp + '/prepare?data='+data).success(function() {
	    });
	};
	$scope.Del = function(i,id) {         //删除
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.filetypeContent.splice(i,1);
			$scope.variablePacket.prompt = false;
			$scope.delPrepareList(id);
			$scope.wranShow('删除成功',true);
		};
	};
	$scope.stateSkip=function(i){//进入资源详情页
		 if(i.type!="package"){ //判断是不是文件包类型
		 	 $state.go("secondNav.prepareLessonsResourcesDetails",{item:i.id}); 
		 }else{
		 	 $state.go("secondNav.prepareLessonsContent",{state:'echo',id:i.id}); 
		 };
		
		 
	};
	// 分页组件
	$scope.contentpageConfig = {
		currentPage: 1,
		pagesLength:15,
		totalItems: 20,
		itemsPerPage: 10,
		perPageOptions: [5],
		onChange: function() {
			
		}
	};
}]);
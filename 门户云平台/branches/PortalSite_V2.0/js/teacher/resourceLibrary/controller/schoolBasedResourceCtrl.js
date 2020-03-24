app.controller('schoolBasedResourceCtrl', ['$rootScope','$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($rootScope,$scope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源中心';
    
	var userId = sessionStorage.getItem('userId');
	var gfavList = [];
	var pageNo = 1;
	var pageSize = 7;

    $scope.selectedSubject = "";

	$scope.variablePacket = {

        total: 0, //文件类型头部选中下标
        loadShow:false,
        title:"",
        objId:"",
        subjectID:"",
        knowledge:"",
        officeId:"",
		filetypeHeadIndex: 5, //文件类型头部选中下标
		sortModuleIndex: 0, //分类模块选中下标
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
		filetypeHead: [],
		leftTreeShow : {					//左侧树展示
			teachingMaterial : true,		//版本选择框
			treeOne : true,					//版本选择框下的树
			treeKnowledgePoint : false,		//知识点树
			other : false,					//其他
		}
	};
	

    $http.get(resourcesIp+'/a/resource/resType?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
        if(data.code == 200){
            var arr = data.data;
            arr.unshift({"name":"全部","id":"-1"});
            $scope.variablePacket.filetypeHead = arr;
            //查询资源库
            $scope.getFavList();

        }else{
        	console.log(resourcesIp+"/a/resource/resType获取失败");
        }
    })
   

    $scope.getFavList = function(){
        $http.get(resourcesIp+'a/resource/favorites?pageSize=9000000&token='+token+"&userId="+userId).success(function (data){
            if(data.code == 200){
                gfavList = data.data.records;
                $scope.findResourceList("-1","","");
            }else{
                console.log(resourcesIp+"/a/resource/favorites获取失败");
            }
        })
	};

    $rootScope.treetype = "1";

    $rootScope.findListByTree = function(subjectID,knowledge) { //文件类型头部切换
        pageNo =1;
        var objId = $scope.variablePacket.filetypeHeadIndex;
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
        $scope.findResource($scope.variablePacket.title,pobjId,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge);
    };

    $scope.findResourceList = function(objId,subjectID,knowledge) { //文件类型头部切换
        pageNo =1;
        var pobjId = $scope.variablePacket.filetypeHeadIndex;
        if(objId != ""){
            $scope.variablePacket.filetypeHeadIndex = objId;
            pobjId =objId;
            if(objId == "-1"){
                pobjId = "";
            }
        }else {
        	pobjId = objId;
        }
        if(subjectID != ""){
            $scope.variablePacket.subjectID = subjectID;
        }
        if(knowledge != ""){
            $scope.variablePacket.knowledge = knowledge;
        }
        $scope.findResource($scope.variablePacket.title,pobjId,$scope.variablePacket.subjectID,$scope.variablePacket.knowledge);
    };

    $scope.findResourcePage = function() { //文件类型头部切换
    	var totalCount = $scope.variablePacket.total;
    	pageNoCount = totalCount % pageSize == 0 ? totalCount / pageSize : Math.ceil(totalCount / pageSize);
        pageNo+=1;
        if(pageNo > pageNoCount) {
        	pageNo = pageNoCount;
        	return ;
        }
        var title = $scope.variablePacket.title;
		var objId =$scope.variablePacket.filetypeHeadIndex;
        var pobjId = "";
        if(objId != ""){
            $scope.variablePacket.filetypeHeadIndex = objId;
            pobjId =objId;
            if(objId == "-1"){
                pobjId = "";
            }
        }
		var subjectID = $scope.variablePacket.subjectID;
        var knowledge = $scope.variablePacket.knowledge;
        $http.get(resourcesIp+'a/resource?state=1&pageNo='+pageNo+'&pageSize=7&token='+token+"&title="+title+"&objId="+pobjId+"&subjectID="+subjectID+"&knowledge="+knowledge+"&areaCodes="+$scope.variablePacket.officeId).success(function (data){
            if(data.code == 200){
                $scope.variablePacket.total = data.data.count;
                var list = data.data.list;
                angular.forEach(list, function(data){
                	data.showFav = false;
                	if(data.createBy == userId){
						data.showFav = true;
					}
                    data.collect = false;
                    angular.forEach(gfavList, function(fdata){
                        if(data.id == fdata.resourceId){
                            data.collect = true;
                            data.collectId = fdata.id;
                        }
                    });
                    $scope.data.push(data);
                });
                $scope.judgeLoadShow(data.code,$scope.variablePacket.total,pageNo,pageSize);
            }else{
                console.log(resourcesIp+"/a/resource获取失败");
            }
        })
    };

	//查询资源
        $scope.findResource = function(title,objId,subjectID,knowledge) { //文件类型头部切换
        $scope.variablePacket.officeId = JSON.parse(sessionStorage.getItem('managerSearch')).officeId;
        $http.get(resourcesIp+'a/resource?state=1&pageNo='+pageNo+'&pageSize=7&token='+token+"&title="+title+"&objId="+objId+"&subjectID="+subjectID+"&knowledge="+knowledge+"&areaCodes="+$scope.variablePacket.officeId).success(function (data){
            if(data.code == 200){
                $scope.variablePacket.total = data.data.count;
                var list = data.data.list;
                angular.forEach(list, function(data){
                	data.showFav = false;
                	if(data.createBy == userId){
						data.showFav = true;
					}
                    data.collect = false;
                    angular.forEach(gfavList, function(fdata){
                    	if(data.id == fdata.resourceId){
                            data.collect = true;
                            data.collectId = fdata.id;
						}
                    });
                });
                $scope.data = data.data.list;
                $scope.judgeLoadShow(data.code,$scope.variablePacket.total,pageNo,pageSize);
            }else{
                console.log(resourcesIp+"/a/resource获取失败");
            }
        })
    };
	$scope.openStateTab = function(item, event) { //公开活取消切换
		i.open = !i.open;
	};
	$scope.collectTab = function(i) { //收藏状态切换
		i.collect = !i.collect;
		if (i.collect){
            $scope.collect(i);
		}else{
            $scope.deleteCollect(i);
		}
	};

    /**
	 * 下载资源
     * @param id
     * @param fileName
     */
    $scope.download = function(id,fileName) {
        window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+fileName+'&id='+id,'_blank');
    };


    /**
     * 收藏资源
     * @param id
     * @param fileName
     */
    $scope.collect = function(i) {
    	var data = {
    		"token":"29B5DF07F7FC514807CE5FBC12EA1506",
            "authorIds":i.createBy,
            "resourceIds":i.id,
            "userId":userId
		};
        $http.post(resourcesIp+'a/resource/favorites',data).success(function (data){
            if(data.code == 200){
                gfavList = data.data;
                i.collect = true;
                i.collectId = gfavList[0];
            }else{
                console.log(resourcesIp+"/a/resource/favorites添加失败");
            }
        })
    };



    /**
     * 删除收藏资源
     * @param id
     * @param fileName
     */
    $scope.deleteCollect = function(i) {
        $http.delete(resourcesIp+'a/resource/favorites?token=29B5DF07F7FC514807CE5FBC12EA1506&ids='+i.collectId).success(function (data){
            if(data.code == 200){
                i.collect = false;
            }else{
                console.log(resourcesIp+"/a/resource/favorites删除失败");
            }
        })
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
            case '8':
                icon = "img/resources_mp4.png";
                break;
        }
        return icon;
    };
});




app.filter('dateformat', function() {
    return function(date) {
        return date.substring(0,10);
    };
});

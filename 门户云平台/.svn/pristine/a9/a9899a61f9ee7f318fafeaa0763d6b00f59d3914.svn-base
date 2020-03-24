app.controller('resourceDtealisCtrl', ['$scope','$rootScope','$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope, $rootScope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源中心';
    
	$scope.variablePacket = {
		share: true, //分享图标是否显示 
		favorite: true, //收藏图标是否显示
		shareCase: false, //分享弹框显示状态
		shareIndex : 0,					//分享弹层教师、学生角色切换
		shareAllBtn : false,			//分享弹框全选按钮
		shareBtn : false,				//分享弹框分享按钮
		selectSubject : [],				//下拉列表教师科目
		selectedSubject : '12',			//下拉列表教师选中的科目
		selectGrade : [],				//下拉列表学生年级
        shareAllBtnShow : true,		//分享弹框全选按钮显示、隐藏状态
		selectedGrade : '5',			//下拉列表学生选中的年级
		selectClass : [],				//下拉列表学生班级
		selectedClass : '',			//下拉列表学生选中的班级
		SharePeopleArr : [],				//分享对（学生或教师）集合
		page: $stateParams.page, //主路由    
		collect:angular.fromJson($stateParams.collect),
        teacherList:[],
        officeId:JSON.parse(sessionStorage.getItem('managerSearch')).officeId,
        userType:JSON.parse(sessionStorage.getItem('managerSearch')).userType,
        resource:null,
        showShareStu:$stateParams.showShareStu,
        state:"0"
	};

	if($scope.variablePacket.showShareStu == "true"){
//获取登录人的信息----初始化加载
        $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+"/2").success(function (data){
//		console.log(data);
            $scope.variablePacket.pageNo = 1;
            if(data.ret == 200){
//			console.log(data.data);
                $scope.variablePacket.gradeNo=data.data.stuInfo.gradeNo;
                $scope.variablePacket.gradeId=data.data.stuInfo.gradeId;
                $scope.variablePacket.classId=data.data.stuInfo.classId;
                $scope.user = data.data;
            }
        })
    }

   
	var id = $stateParams.id;
    var gfavList = [];
    var userId = JSON.parse(sessionStorage.getItem('managerSearch')).id;
    var playerSTOP,audioSTOP;
	$http.get(resourcesIp+'a/resource/favorites?pageSize=9000000&token='+token+"&userId="+userId+"&v=" + Math.random()).success(function (data){
		if(data.code == 200){
			gfavList = data.data.records;
            /**
             * 获取资源详情
             */
            $http.get(resourcesIp+'/a/resource/'+id+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
                if(data.code == 200){
                	$scope.variablePacket.resource = data.data;
					$scope.resource = data.data;
                    angular.forEach(gfavList, function(fdata){
                        if($scope.resource.id == fdata.resourceId){
                            $scope.resource.collectId = fdata.id;
                            $scope.resource.collect = $scope.variablePacket.collect;
                        }
                    });
                   	
                    $scope.resource.ossId = data.data.fileName.substring(0,data.data.fileName.indexOf("."))
                    $scope.showResource($scope.resource.ossId);
                }else{
                    console.log(resourcesIp+"/a/resource/"+id+"获取失败");
                }
            })
		}else{
			console.log(resourcesIp+"/a/resource/favorites获取失败");
		}
	})

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

    $http.get(zyxrequireIp + '/ea/eaOffice?officeId='+$scope.variablePacket.officeId+'&flag=0&state=1').success(function(suc) {
        if(suc.ret == 200) {
            $scope.variablePacket.selectSubject = suc.data.subjectList;
            var list = new Array();
            angular.forEach(suc.data.gradeList, function(data){
                var obj = {
                    id:data.id,
                    grade:data.name,
                }
                list.push(obj)
            });
            $scope.variablePacket.selectGrade = list;
        };
    });

    $scope.showResource = function(ossId){



        
        var objId = $scope.resource.objId;
        //视频
        if(objId == "1" || objId == "8"){

            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                    $scope.variablePacket.state = suc.data.state;
                    var fls=flashChecker();
                    if(fls.f){
                        playerSTOP=jwplayer('showplayer').setup({
                            flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                            height:700,
                            width: "100%",
                            autostart: true,
                            playlist: [{
                                sources: [{
                                    file: suc.data.pathmp4PC
                                },{
                                    file: suc.data.pathmp4PAD
                                }]
                            }],
                            androidhls:"true"
                        });
                    }

                };
            });

        }
        //音频
        if(objId == "2"){
                $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                    if(suc.code == 200) {
                        var fls=flashChecker();
                        if(fls.f){
                            $scope.variablePacket.state = suc.data.state;
                            audioSTOP=jwplayer('showplayer').setup({
                                flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                                height:398,
                                width: "100%",
                                autostart: true,
                                playlist: [{
                                    sources: [{
                                        file: suc.data.pathmp3PC
                                    },{
                                        file: suc.data.pathmp3PAD
                                    }]
                                }],
                                androidhls:"true"
                            });
                        }
                    };
                });


        }
        //图片
        if(objId == "3"){
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                    $scope.variablePacket.state = suc.data.state;
                    $("#images").attr("src",suc.data.previewUrl);
                };
            });
        }
        //文档
        if(objId == "5"||objId == "6"||objId == "7"){
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                    $scope.variablePacket.state = suc.data.state;
                    $("#pdfshow").attr("src","common/generic/web/viewer.html?file="+suc.data.previewUrl.pathPDF);
                };
            });

        }
    }


    $scope.showShare = function(){
        var url = zyxrequireIp + '/uc/user?officeId='+$scope.variablePacket.officeId+'&delFlag=0&state=1&userType='+$scope.variablePacket.userType;
        $http.get(url).success(function(suc) {
            if(suc.ret == 200) {
                var list = new Array();
                angular.forEach(suc.data.list, function(data){
                    var obj = {
                        id:data.id,
                        name:data.realname,
                        state:false,
                        disabled:false
                    }
                    list.push(obj)
                });
                $scope.variablePacket.SharePeopleArr = list;
                $scope.variablePacket.teacherList = list;
                $scope.variablePacket.shareCase=true;
                $scope.variablePacket.selectedSubject = "";
            };
        });
	}



	if($stateParams.page == "secondNav.resourceType.myResource") { //判断显示图标
		$scope.variablePacket.favorite = false;
	} else {
		$scope.variablePacket.share = false;
	};
  
	
    $scope.collectTab = function() { //收藏状态切换
		 $scope.variablePacket.collect=!$scope.variablePacket.collect;
		 $scope.resource.collect = $scope.variablePacket.collect;
        if ($scope.resource.collect){
            $scope.collect($scope.resource);
        }else{
            $scope.deleteCollect($scope.resource);
        }
	};
	$scope.back = function() { //返回上一步
        window.history.go(-1)
	};

    /**
     * 下载资源
     * @param id
     * @param fileName
     */
    $scope.download = function(id,fileName) {
        window.open(resourcesIp+'a/resource/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506&fileName='+fileName+'&id='+id,'_blank');
    };


    $scope.showShare1=function(){  //分享
        var i = $scope.variablePacket.resource;
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
                                        $scope.wranShow(data.msg,false,"资源共享");
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

    /**
     * 删除资源
     * @param id
     */
    $scope.delete = function(id) {
        $http.delete(resourcesIp+'a/resource?rids='+id+'&token=29B5DF07F7FC514807CE5FBC12EA1506').success(function (data){
            if(data.code == 200){

            }else{
                console.log(resourcesIp+"/a/resource/favorites删除失败");
            }
        })
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
                gfavList = data.data.list;
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
        if ( date != undefined){
            return date.substring(0,10);
        }
    };
});



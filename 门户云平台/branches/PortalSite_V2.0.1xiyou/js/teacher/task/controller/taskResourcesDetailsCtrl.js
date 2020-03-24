app.controller('taskResourcesDetailsCtrl', ['$scope','$rootScope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope,$rootScope,$state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '学科任务';
	
	//变量包
	$scope.variablePacket = {
		state:$stateParams.state,//word:文档	 ppt:ppt  video：视频   audio：音频  picture:图片
		state:$stateParams.resid,//资源id
		state:$stateParams.type//资源0附件1
	}
	var objId = "";
	/**
     * 获取资源详情
     */
   /* if($stateParams.type=="1"){
    	$http.get(resourcesIp+'/a/resource/'+$stateParams.resid+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
        if(data.code == 200){
			var sour = data.data;
			$scope.resource = data.data;
			//var zyurl = sour.downUrl+sour.fileFormat;
			console.log(sour)
			//console.log(zyurl)
			$scope.resource.ossId = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
			$scope.showResource($scope.resource.ossId);
			$scope.names = sour.title;
			
        }else{
            console.log(resourcesIp+"/a/resource/"+id+"获取失败");
        }
    })
    }else{
    	$scope.showResource($stateParams.resid);
    }*/
    
	
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
	$scope.showResource = function(ossId){
        //视频
        if(objId == "1" || objId == "8"){
        	$scope.variablePacket.types='video';
            flashChecker();
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                    $scope.variablePacket.types = suc.data.state;
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
                };
            });

        }
        //音频
        if(objId == "2"){
            flashChecker();
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                	$scope.variablePacket.types='audio';
                    //$scope.variablePacket.state = suc.data.state;
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
                };
            });
        }
        //图片
        if(objId == "3"){
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                	$scope.variablePacket.types='picture';
                   // $("#images").attr("src",suc.data.previewUrl);
                   $scope.ressource = suc.data.previewUrl;
                };
            });
        }
        //文档
        if(objId == "5"||objId == "6"||objId == "7"){
            $http.get(ossIp + 'filelog/'+ossId).success(function(suc) {
                if(suc.code == 200) {
                	$scope.variablePacket.types='word';
                    //$("#pdfshow").attr("src","common/generic/web/viewer.html?file="+suc.data.previewUrl.pathPDF);
                    $scope.ressource = suc.data.thumbnailUrl;
                };
            });

        }
    }
	
	/**
     * 获取资源详情
     */
    if($stateParams.type=="0"){
    	$http.get(resourcesIp+'/a/resource/'+$stateParams.resid+'?token='+token+"&pid=070a33c388f24f23b05d15adc0b8fd2e").success(function (data){
        if(data.code == 200){
			var sour = data.data;
			$scope.resource = data.data;
			objId = $scope.resource.objId;
			//var zyurl = sour.downUrl+sour.fileFormat;
			console.log(sour)
			//console.log(zyurl)
			$scope.resource.ossId = data.data.fileName.substring(0,data.data.fileName.indexOf("."));
			$scope.showResource($scope.resource.ossId);
			$scope.names = sour.title;
			
        }else{
            console.log(resourcesIp+"/a/resource/"+id+"获取失败");
        }
    })
    }else{
    	objId = $stateParams.state;
    	$scope.showResource($stateParams.resid);
    	
    }
	
	
	
	//返回上一页面
	$scope.goBack = function(){  
    	window.history.back();  
	};
}]);
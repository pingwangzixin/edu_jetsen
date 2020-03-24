app.controller('testAssemblyCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','$anchorScroll','myQuzService','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,$anchorScroll,myQuzService,$stateParams) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	var mapType = {};
	var typeList = [];			
	$scope.nav1 = [];
	var params = {examId:$stateParams.testId};
	
	/**
	 * 变量
	 */
	$scope.variablePacket = {
		insertResource : false,
		clickResourceName:'',
		
	}
	
	//插入资源回显弹层--开启
	$scope.insertResource = function(resource) {
		$scope.variablePacket.clickResourceName=resource.name;
		$scope.variablePacket.insertResource = true;
		adaptionHeight();
		$scope.resourceBoxFn(resource.ossFileName,resource.name,resource.type);
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
//		var prewUrl = 'http://111.207.13.88:8290/filelog/57a4bc4f699c4f978e742bc5b0784091';
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
	
	//赋值弹层的自适应高度
	function adaptionHeight() {
		$timeout(function() {
			var bigHeight = angular.element('.zyx_insert_choice .gy_con').height();
			angular.element('.insertLineAll,.zyx_allEight').height(bigHeight - 270);
			angular.element('.mlh_cont').height(bigHeight - 80);
			console.log(bigHeight)
			angular.element(".zyx_allEight").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
			angular.element(".insertLineAll").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
			angular.element(".mlh_cont").mCustomScrollbar({
				mouseWheelPixels: 1000, //滚动速度
				theme: "dark-thin" //滚动条样式
			});
		});
	}
	
	
	//插入资源回显弹层--关闭
	$scope.closeResource = function() {
		$scope.variablePacket.insertResource = false;
	}
	
	/**
     * 查询试卷
     */
    $scope.findExamById = function(){
    	myQuzService.getExamById($stateParams.testId,function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				$scope.examName = data.name;
				$scope.createUser = data.createUser;
				$scope.createDate = data.createDate;
				
				angular.forEach(data.questionList,function(quz) {
					quz.resources = {};
					quz.resState=false;
					if(quz.type == "1"){
						quz.answer = quz.answer=="T"?"对":"错"
					}
					if(quz.resourceJson != "" && quz.resourceJson != null) {
						quz.resState = true;
						quz.resources = JSON.parse(quz.resourceJson);
					}
					$scope.nav1[mapType[quz.type]].data.push(quz);
					$scope.nav1[mapType[quz.type]].show = true;
				})
				 //默认状态
			    $scope.flag = 0;
			    $scope.states = new Object();
			    angular.forEach($scope.nav1, function(i, index){
			    	$scope.states[index] = new Object();
			    	$scope.states[index].m = new Array();
			    	$scope.states[index].checked = new Array();
			    	$scope.states[index].close_all = true;
			    	angular.forEach(i.data, function(i, _index){
			    		$scope.states[index].m[_index] = true;
			    		$scope.states[index].checked.push(_index);
			    	});
			    });
			}
		},function(){
			
		})
    }
    
	// 先查试题类型	 赋值给全局变量
	myQuzService.findQuzType(function(res){
		if(res.code == 200) {
			for(var i = 0;i < res.data.length;i ++) {
				var typeTem = {"type":res.data[i].name,data:[],show:false};
				 $scope.nav1.push(typeTem);
				 mapType[res.data[i].id] = i;
			}
			
			$scope.findExamById();
		}
	},function(e){
		console.info("试题类型 findQuzType:"+e);
	})

  //查看答案及解析
  $scope.closeOne = function (outerIndex, index) {
    if($scope.states[outerIndex].m[index]){
      $scope.states[outerIndex].m[index] = false;
      var index = $scope.states[outerIndex].checked.indexOf(index);
      if(index != -1){
        $scope.states[outerIndex].checked.splice(index, 1);
      }
    } else {
      $scope.states[outerIndex].m[index] = true;
      $scope.states[outerIndex].checked.push(index);
    }
    if($scope.nav1[outerIndex].data.length === $scope.states[outerIndex].checked.length){
      $scope.close_all = true;
    }
    if($scope.states[outerIndex].checked.length <= 0){
      $scope.close_all = false;
    }
  }
    //导航头切换
    $scope.tab1 = function (i) {
      $scope.flag = i;
      // 将location.hash的值设置为你想要滚动到的元素的id
      $location.hash(i);
      // 调用 $anchorScroll()
      $anchorScroll();
    }
    $scope.tab1($scope.flag);
	
	//导航置顶
	window.onscroll = function(){
		var nav1 = document.getElementsByClassName('ls_nav1')[0];
		var top = document.getElementById('title1').offsetTop;
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrollT >= top){
			nav1.classList.add('fixed')
		} else {
			nav1.classList.remove('fixed')
		}
	}
	
	//滚动选中
	/*var Window = angular.element(window);
	Window.on('scroll', function() {
		var Navs = angular.element('.ls_nav1 li'), // 导航
		Sections = angular.element('.ls_main'), // 模块
		NavLength = Navs.length - 1;
		var ScrollTop = Window.scrollTop() + 50;
		for(var Len = NavLength; Len > -1; Len--) {
			var that = Sections.eq(Len);
			if(ScrollTop >= that.offset().top) {
				Navs.removeClass('ls_active').eq(Len).addClass('ls_active');
				break;
			}
		}
	});*/
}]);

app.controller('studentGuideContentCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
		state:$stateParams.state,//learn：已学习；notLearn：未学习；
		titFixed:false,//吸顶样式
		queIndexEcho:0,//导学内容---8种题型的默认选中
		EchoLineIndex:0,//导学内容---资源库资源条默认选中
		EchoLineTab:0,//导学内容---资源库资源条类型切换左侧图片跟随切换
		EchoLineType:"pic",//导学内容---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		Echotit:0,//导学内容---导学资源和提问交流默认选中
		askArry:[],//导学内容---提问交流的存储数组
		message:'',//导学内容---提问交流的提交的文字
		guidanceId:$location.$$search.guidanceId,
		pageSize:1,
		pageShowNum:10,
		commentState:'0',//0是评论，1是回复
		commentJdgmentResource:'0',//评论时上传的资源与否
		commentReviewRating:'0',//评论星级
		loginUserId:$location.$$search.userId,
		loginUserName:'',
		loginUserFace:'',
		resourceList:[],
		videoPath:'',
		audioPath:'',
		imagePath:'',
		pdfPath:'',
		resourceDetail:{},
		jiazaiCommentBut:false,
	}
	
	$scope.variablePacket.loginUserId=$location.$$search.userId;
	//获取登录人的信息---登录教师--初始化加载
	$http.get(jeucIp + 'uc/user/'+$scope.variablePacket.loginUserId).success(function (data){
		console.log(data);
		if(data.ret == 200){
			$scope.variablePacket.loginUserName=data.data.realname;
			$scope.variablePacket.loginUserFace=data.data.userFace;
		}
	})
	//8种题型锚点
	$scope.jump = function(index) {
		var top = 0 ;
		if($scope.variablePacket.titFixed){
			top = document.getElementById(index).offsetTop;
			console.log(top)
		}else{
			top = document.getElementById(index).offsetTop - 80;
			console.log(top)
		}
		angular.element("html,body").animate({"scrollTop":top},600)
		$scope.variablePacket.queIndexEcho = index;
	}
	
	
	//吸顶
	var Top = document.getElementById('zyx_lines').offsetTop;
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if($scope.variablePacket.AddResources_show){
			if(scrollT >= (Top+616)) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}else{
			if(scrollT >= Top) {
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
	
	
	//导学内容--资源库资源列条的切换
	$scope.EchoLineTab = function(index,typeSrc,ossFileName){
		console.log(index);
		console.log(typeSrc);
		if(ossFileName.indexOf("_")>0){
			ossFileName = ossFileName.substring(0,ossFileName.indexOf("_"));
		}
		console.log(ossFileName);
		$scope.variablePacket.EchoLineIndex = index;
		$scope.variablePacket.EchoLineTab = index;
		//根据filename查询播放展示路径
		$http.get(ossIp + 'filelog/'+ossFileName).success(function (data){
			console.log(data);
			if(data.code == 200){
				$scope.variablePacket.convertState = data.data.state;
				$scope.variablePacket.resourceDetail=data.data;
				console.log($scope.variablePacket.resourceDetail);
				if(typeSrc==2){
					$("#pdfPlay").hide();
					$("#tupian").hide();
					$("#showplayer").show()
					$scope.variablePacket.EchoLineType = "music";
					$scope.variablePacket.audioPath = $scope.variablePacket.resourceDetail.previewUrl;
					var fls = flashChecker();
					if(!fls.f) {
						//显示flash提醒
						$(".loadFlashWrap").show();
					} else {
						$(".loadFlashWrap").remove();
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
					$("#showplayer").show()
					$scope.variablePacket.EchoLineType = "video";
					$scope.variablePacket.videoPath = $scope.variablePacket.resourceDetail.previewUrl;
					var fls = flashChecker();
						if(!fls.f) {
							//显示flash提醒
							$(".loadFlashWrap").show();
						} else {
							$(".loadFlashWrap").remove();
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
					$("#tupian").show();
					$("#showplayer").hide()
					$scope.variablePacket.EchoLineType = "pic";
					$scope.variablePacket.imagePath = $scope.variablePacket.resourceDetail.previewUrl;
				}else{
					$("#pdfPlay").show();
					$("#tupian").hide();
					$("#showplayer").hide()
					$scope.variablePacket.EchoLineType = "pdf";
					$scope.variablePacket.pdfPath = "common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF;
					console.log("common/generic/web/viewer.html?file="+$scope.variablePacket.resourceDetail.previewUrl.pathPDF);
					console.log($scope.variablePacket.pdfPath);
				}
			}
	    })
	}
	
	//导学内容--资源库列条上的删除
	$scope.delEchoLine = function(index,num,tit){
		$scope.promptShow('确认删除？',false,tit);
		$scope.delOk = function(){
			$scope.variablePacket.prompt = false;
			$scope.echoData.splice(index,1);
			$scope.wranShow('已删除',false,tit);
			if($scope.variablePacket.EchoLineIndex == index && $scope.echoData.length>0){
				if($scope.echoData[0].ResourceSrc==4){
					$scope.variablePacket.EchoLineType = "music";
				}else if($scope.echoData[0].ResourceSrc==5){
					$scope.variablePacket.EchoLineType = "video";
				}else{
					$scope.variablePacket.EchoLineType = "pic";
				}
				$scope.variablePacket.EchoLineIndex = 0;
				$scope.variablePacket.EchoLineTab = 0;
			}
		}
	}
	
	
	
	//导学内容---查看答案及解析
	$scope.lookAnswerEcho = function(type,index,answer){
		$scope.echoQuestion[type][index].AnswerShow = answer ? false : true;
	}
	
	//导学内容---导学资源和提问交流
	$scope.EchotitTab = function(i){
		$scope.variablePacket.Echotit = i;
		console.log(i)
		if(i==1){
			console.log($location.$$search)
			//调用评论接口  sortType 排序类型（1标识时间排序(倒叙-默认)  2标识时间排序(正序) 3标识按（点赞数）倒叙   4   是点赞数正序
			$http.get(mySpaceIP + 'comment?relatedArticleId='+$location.$$search.guidanceId+"&&sortType=1 &&pageNumber="+$scope.variablePacket.pageSize+"&&showNumber="+$scope.variablePacket.pageShowNum).success(function (data){
				console.log(data.data.commentList.length);
				if(data.ret == 200){
					if(data.data.commentList.length>0){
						$scope.variablePacket.jiazaiCommentBut = true;
						console.log(data.data.commentList);
						$scope.variablePacket.askArry=data.data.commentList;
						angular.forEach(data.data.commentList,function(e,i){
							$http.get(jeucIp + 'uc/user/'+e.commentUserId).success(function (data){
								if(data.ret==200){
									console.log(data.data.userFace);
									$scope.variablePacket.askArry[i].userFace=data.data.userFace;
								}else{
									$scope.variablePacket.askArry[i].userFace='http://111.207.13.88:8881/resource/user/face/default.jpg';
								}
						    })
						})
					}else{
						$scope.variablePacket.jiazaiCommentBut = false;
						$scope.variablePacket.askArry=[];
					}
				}
		    })
		}else{
			console.log("导学资源");
		}
	}
	
	
	/**
	 * 加载更多
	 */
	$scope.jiazaiComment = function(pageSize){
		pageSize = pageSize+1;
		$scope.variablePacket.pageSize = pageSize;
		console.log(pageSize);
		$http.get(mySpaceIP + 'comment?relatedArticleId='+$location.$$search.guidanceId+"&&sortType=1 &&pageNumber="+pageSize+"&&showNumber="+$scope.variablePacket.pageShowNum).success(function (data){
			console.log(data.data.commentList.length);
			if(data.ret == 200){
				if(data.data.commentList.length>0){
					$scope.variablePacket.jiazaiCommentBut = true;
					$scope.variablePacket.askArry=$scope.variablePacket.askArry.concat(data.data.commentList);
					console.log($scope.variablePacket.askArry);
					angular.forEach(data.data.commentList,function(e,i){
						var s = i+((pageSize-1) * $scope.variablePacket.pageShowNum);
						$http.get(jeucIp + 'uc/user/'+e.commentUserId).success(function (data){
							if(data.ret==200){
								console.log(data.data.userFace);
								$scope.variablePacket.askArry[s].userFace=data.data.userFace;
							}else{
								$scope.variablePacket.askArry[s].userFace='http://111.207.13.88:8881/resource/user/face/default.jpg';
							}
					    })
					})
					console.log($scope.variablePacket.askArry);
				}else{
					$scope.variablePacket.jiazaiCommentBut = false;
				}
			}
	    })
	}
	
	//导学内容--提问按钮
	$scope.askButton = function() {
		var news = {};
		var times = new Date();
		Date.prototype.Years = function(formatStr){   
	        var str = formatStr;   
		    var Week = ['日','一','二','三','四','五','六']; 
		    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
		    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
		    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
		    str=str.replace(/w|W/g,Week[this.getDay()]);   
		    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
		    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
		    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
		    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
		    return str;   
		}
		console.log(times.Years("yyyy-MM-dd hh:mm:ss"));
		console.log($scope.variablePacket.loginUserName)
		console.log($scope.variablePacket.loginUserId)
		console.log($scope.variablePacket.loginUserFace)
		news.commentUserName = $scope.variablePacket.loginUserName;
		news.commentUserId = $scope.variablePacket.loginUserId;
		news.userFace = $scope.variablePacket.loginUserFace;
		news.state = $scope.variablePacket.commentState;
		news.content = $scope.variablePacket.message;
		news.commentUpdateDate = times.Years("yyyy-MM-dd hh:mm:ss")
		news.relatedArticleId = $scope.variablePacket.guidanceId;
		news.judgmentResource = $scope.variablePacket.commentJdgmentResource;
		news.reviewRating = $scope.variablePacket.commentReviewRating;
		console.log(news);
		$scope.variablePacket.askArry.unshift(news);
		$scope.variablePacket.message = '';
		$http.post(mySpaceIP + 'comment',news).success(function (data){
				console.log(data);
	    })
		
	};
	
	//提交验证
	$scope.refer = function(){
		var num = 0;
		angular.forEach($scope.echoQuestion.single,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.many,function(e){
			if(e.notLearnAnswer.daanA==false && e.notLearnAnswer.daanB==false && e.notLearnAnswer.daanC==false && e.notLearnAnswer.daanD==false){
				 return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.judge,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.fillIn,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.material,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.briefAnswer,function(e){
			if(e.notLearnAnswer==''){
				return num+=1
			}
		})
		angular.forEach($scope.echoQuestion.clozeCloze,function(e){
			angular.forEach(e.notLearnAnswer,function(e){
				if(e.daan==''){
					return num+=1
				}
			})
		})
		angular.forEach($scope.echoQuestion.reading,function(e){
			angular.forEach(e.notLearnAnswer,function(e){
				if(e.daan==''){
					return num+=1
				}
			})
		})
		if(num==0){
			$state.go('secondNav.studentGuideList');
		}else{
			$scope.promptShow('确认提交？',false,'有'+ num +'道题未回答！');
		}
	}
	
	console.log($location.$$search);
	
	/**
	 * 根据用户id，导学id查询不同类型的资源资源，分为回传和下发
	 */
	$http.get(guidanceLearningIp + 'resource?guidanceLearningId='+$location.$$search.guidanceId+'&&type=0').success(function (data){
		console.log(data);
		if(data.ret == 200){
			$scope.variablePacket.resourceList=data.data;
			console.log($scope.variablePacket.resourceList);
			console.log($scope.variablePacket.resourceList.length);
			if($scope.variablePacket.resourceList.length>0){
				$scope.EchoLineTab(0,$scope.variablePacket.resourceList[0].resourceType,$scope.variablePacket.resourceList[0].ossFileName);
			}
		}
    })
	
	/**
	 * 查看资源详情
	 */
	$scope.seeResource=function(resourceId){
		$http.get(resourcesIp + '/a/resource/'+resourceId+'?token='+token).success(function (data){
			console.log(data);
	    })
	}
	
	
	//导学内容--资源的数据
	$scope.echoData = [
		{
			ResourceNum:0,//记录点击的第几个
			ResourceTit:'00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
			ResourceSrc:0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
			TypeSrc:[
				{'Src':'resources_middle.jpg'},
				{'Src':'newsImg.jpg'},
				{'Src':'ad_1.jpg'},
				{'Src':'banner.png'}
			]
		},{
			ResourceNum:1,
			ResourceTit:'11五年级五年级五年级五年级五年级语文期末试卷.ppt',
			ResourceSrc:1,
			TypeSrc:[
				{'Src':'resources_middle.jpg'},
				{'Src':'newsImg.jpg'},
				{'Src':'resources_main.jpg'},
				{'Src':'banner.png'}
			]
		},{
			ResourceNum:2,
			ResourceTit:'22五年级五年级五年级五年级五年级语文期末试卷.ppt', 
			ResourceSrc:2, 
			TypeSrc:[
				{'Src':'newsImg.jpg'}
			]
		},{
			ResourceNum:3,
			ResourceTit:'33五五年级五年级五年级五年级年级语文期末试卷.ppt', 
			ResourceSrc:3, 
			TypeSrc:[
				{'Src':'banner.png'}
			]
		},{
			ResourceNum:4,
			ResourceTit:'44五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:4,
		},{
			ResourceNum:5,
			ResourceTit:'55五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:5,
		},{
			ResourceNum:6,
			ResourceTit:'66五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:4,
		},{
			ResourceNum:7,
			ResourceTit:'77五五年级五年级五年级五年级年级语文期末试卷.ppt',
			ResourceSrc:5,
		}
	]
	
	
	//导学内容---习题的数据
	$scope.echoQuestion = {
		//标题
		title: [
			{"name":"单选题"},     
			{"name":"多选题"},
			{"name":"判断题"},
			{"name":"填空题"},
			{"name":"材料题"},
			{"name":"简答题"},
			{"name":"完形填空"},
			{"name":"阅读理解"}
		],
		//单选
		single : [
			{
				Id:0, 
				Type:'single', //题型
				AnswerShow:false, //默认答案不显示
				queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				myAnswer:'A',//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:"",//未学习---答案
				Answer:'B', //正确答案
			},{
				Id:1,
				Type:'single',
				AnswerShow:false,
				queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:'C',
				icon:"correct",
				notLearnAnswer:"",
				Answer:'C',
			},{
				Id:2,
				Type:'single',
				AnswerShow:false,
				queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:'B',
				icon:"half",
				notLearnAnswer:"",
				Answer:'C',
			}
			
		],
		//多选
		many : [
			{
				Id:0,
				Type:'many', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				myAnswer:['D','A'],//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false},//未学习---答案
				Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//正确答案
			},{
				Id:1,
				Type:'many', 
				AnswerShow:false,
				queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:['A','C'],
				icon:"correct",
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false},
				Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
			},{
				Id:2,
				Type:'many',
				AnswerShow:false,
				queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
				Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
				myAnswer:['A','B','C'],
				icon:"half",
				notLearnAnswer:{daanA:false,daanB:false,daanC:false,daanD:false},
				Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
			}
		],
		//判断
		judge : [
			{
				Id:0,
				Type:'judge', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111天上有2个太阳吗？', //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:'正确',//我的答案--已学习选项
				icon:"error",//我的答案--已学习图片
				notLearnAnswer:'',//未学习---答案
				Answer:'错误',//正确答案
			},{
				Id:1,
				Type:'judge', 
				AnswerShow:false,
				queTit:'222你是谁？我是谁？是游戏吗？',
				Analysis:'是是是是',
				myAnswer:'正确',
				icon:"correct",
				notLearnAnswer:'',
				Answer:'正确',
			}
		],
		//填空
		fillIn : [
			{
				Id:0,
				Type:'fillIn', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//我的答案--已学习选项
				notLearnAnswer:'',//未学习---答案
				Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//正确答案
			},{
				Id:1,
				Type:'fillIn', 
				AnswerShow:false,
				queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', 
				Analysis:'天上有一个太阳',
				myAnswer:[{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'},{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:'',
				Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//正确答案
			}
		],
		//材料
		material : [
			{
				Id:0,
				Type:'material', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'为什么李白特别钟情于庐山？', //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:'',//未学习---答案
				Answer:'暧暧远人村 | 川泽纡其骇瞩',//正确答案
			},{
				Id:1,
				Type:'material', 
				AnswerShow:false,
				queTit:'你是谁？我是谁？是游戏吗？',
				Analysis:'是是是是',
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:'',
				Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
			}
		],
		//简答
		briefAnswer : [
			{
				Id:0,
				Type:'briefAnswer', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'为什么李白特别钟情于庐山？', //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:'',//未学习---答案
				Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//正确答案
			},{
				Id:1,
				Type:'briefAnswer', 
				AnswerShow:false,
				queTit:'你是谁？我是谁？是游戏吗？',
				Analysis:'是是是是',
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:'',
				Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
			},{
				Id:2,
				Type:'briefAnswer', 
				AnswerShow:false,
				queTit:'为什么李白特别钟情于庐山？',
				Analysis:'是是是是',
				myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
				notLearnAnswer:'',
				Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
			}
		],
		//完形填空
		clozeCloze : [
			{
				Id:0,
				Type:'clozeCloze', //题型
				AnswerShow:false,//默认答案不显示
				queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//已学习---我的答案
				notLearnAnswer:[{daan:''},{daan:''}],//未学习---答案
				Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//正确答案
			},{
				Id:1,
				Type:'clozeCloze', 
				AnswerShow:false,
				queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", 
				Analysis:'地上有个月亮',
				myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
				notLearnAnswer:[{daan:''},{daan:''}],
				Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
			}
		],
		//阅读理解
		reading : [
			{
				Id:0,
				Type:'reading', //题型
				AnswerShow:false,//默认答案不显示
				queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
				Analysis:'天上有一个太阳',//解析
				myAnswer:[
					{tit:'说说你对未来的看法？','testDaan':'低分化的','icon':'half'},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级','daan':'D','icon':'correct'},
					{tit:'你害怕鬼怪吗？','testDaan':'大的飞洒发撒的发','icon':'error'},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物','daan':'D','icon':'correct'},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜','daan':'A','icon':'correct'}
				],//已学习
				notLearnAnswer:[
					{tit:'说说你对未来的看法？',edit:'',editShow:true},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:'',daanShow:true},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:'',daanShow:true},
					{tit:'你害怕鬼怪吗？',edit:'',editShow:true},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:'',daanShow:true},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:'',daanShow:true}
				],//未学习
				Answer:[
					{'testDaan':'正确答案正确答案'},
					{'daan':'C'},
					{'daan':'A'},
					{'testDaan':'正确答案正确答案'},
					{'daan':'D'},
					{'daan':'B'},
				],//正确答案
			},{
				Id:1,
				Type:'reading', 
				AnswerShow:false,
				queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
				Analysis:'是是是是',
				myAnswer:[
					{tit:'说说你对未来的看法？','testDaan':'低分化的','icon':'half'},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级','daan':'D','icon':'correct'},
					{tit:'你害怕鬼怪吗？','testDaan':'大的飞洒发撒的发','icon':'error'},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物','daan':'D','icon':'correct'},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜','daan':'A','icon':'correct'}
				],
				notLearnAnswer:[
					{tit:'说说你对未来的看法？',edit:'',editShow:true},
					{tit:'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道',daan:'',daanShow:true},
					{tit:'北极熊生活在哪里？A.北极  B.南极  C.东极 D.西级',daan:'',daanShow:true},
					{tit:'你害怕鬼怪吗？',edit:'',editShow:true},
					{tit:'熊猫是国家保护动物吗？A.谁知道呢 B. 是  C. 不是 D. 不是动物',daan:'',daanShow:true},
					{tit:'你喜欢动画片吗？A.谁知道呢 B. 不喜欢  C. 喜欢  D. 你猜',daan:'',daanShow:true}
				],
				Answer:[
					{'testDaan':'正确答案正确答案'},
					{'daan':'C'},
					{'daan':'A'},
					{'testDaan':'正确答案正确答案'},
					{'daan':'D'},
					{'daan':'B'},
				],
			}
		]
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
		angular.forEach($scope.echoQuestion.fillIn, function(e, i) {
			$scope.fillInArr.push($scope.echoQuestion.fillIn[i].Answer.split("|"));
		})
	
		//材料题答案类型的转换
		$scope.materialArr = [];
		angular.forEach($scope.echoQuestion.material, function(e, i) {
			$scope.materialArr.push($scope.echoQuestion.material[i].Answer.split("|"));
		})
	
		//简答题答案类型的转换
		$scope.briefAnswerArr = [];
		angular.forEach($scope.echoQuestion.briefAnswer, function(e, i) {
			$scope.briefAnswerArr.push($scope.echoQuestion.briefAnswer[i].Answer.split("|"));
		})
		
		
		angular.element(".zyx_AddResources_left").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		
		angular.element(".zyx_askBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
		
		angular.element(".zyx_resBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
		
	}
	
}]);


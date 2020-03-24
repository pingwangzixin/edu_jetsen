app.controller('classroomContentCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll','classroomService',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll,classroomService) {

	var userInfo = angular.fromJson(sessionStorage.getItem("userInfo"));
	//变量包
	$scope.variablePacket = {
		eightSwitchOut:[   //页面上展示的8种题型
            /** {"name":"单选题",Type:'single'},
             {"name":"多选题",Type:'many'},
			 {"name":"判断题",Type:'judge'},

			 {"name":"填空题",Type:'fillIn'},
			 {"name":"材料题",Type:'material'},

			{"name":"简答题",Type:'briefAnswer'}
           ,
			 {"name":"完形填空",Type:'clozeCloze'},
			{"name":"阅读理解",Type:'reading'}  */
		],
		queIndex: 0, //8种题型的默认选中
		ResLineIndex:-1,//页面--资源库资源条默认选中
		ResLineTab:0,//页面--资源库资源条类型切换左侧图片跟随切换
		ResLineType:"video",//页面---资源库左侧展示，pic:图片展示；music：音乐展示；video：视频展示
		titFixed:false,//吸顶样式
		AddResources_show:true,//资源模块
		eightSwitchOut_show:false,//页面--8种题型显示条是否显示
		Echotit:0,//导学内容---导学资源和提问交流默认选中
		askArry:[],//导学内容---提问交流的存储数组
		message:'',//导学内容---提问交流的提交的文字
		Record:[],//课堂实录数据
		RecordIndex:0,//课堂实录默认选中
		Test:[],//课堂测试题的数据
		TestIndex:0,//课堂测试默认选中
        testFlag:true,
		recordVideoId:0
	}
	console.log($stateParams.id);
	var params={lessonId:$stateParams.id,pageNo:1,pageSize:10,isFlag:"yes"};
    classroomService.lessonOne(params,function (res) {
    	
    	angular.element(".zyx_ResLineBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});

    	angular.forEach(res,function (o,j) {
			if($.isEmptyObject(o.videoList)){
				return;
			}
			var indexI= 1;
			angular.forEach(o.videoList,function (v,i) {
                var recordVo = {};
                var resVo = {};
                var test ={};
				if (v.thumbnail == "screencast"){
                    recordVo.id = v.id;
                    recordVo.name=indexI++;
                    recordVo.fileName=v.filename;
                    recordVo.httpUrl=v.httpUrl;
                    recordVo.rtmpUrl=v.rtmpUrl;
                    recordVo.downloadPath = v.downloadPath
                    $scope.variablePacket.Record.push(recordVo);
				}else if(v.type == "quz"){
					//测试题
                    test.name = v.filename;
                    test.ResourceTit = v.filename;
                    test.id = v.id;
                    test.lessonId=v.lessonRecordId;
                    test.jsonQuz = v.jsonQuz;
                    test.downloadPath = v.downloadPath
                    $scope.variablePacket.Test.push(test);
				}else if(v.type == "document"){
                    resVo.ResourceNum = v.id
                    resVo.ResourceTit = v.filename;
                    resVo.TypeSrc = v.imgs;
                    resVo.downloadPath = v.downloadPath;
                    var suffix = v.filename.substring(v.filename.lastIndexOf(".")+1);
					if(suffix.toLowerCase()=="doc" || suffix.toLowerCase()=="docx" ){
                        resVo.ResourceSrc = 0;
					}else if(suffix.toLowerCase()=="ppt" || suffix.toLowerCase()=="pptx"){
                        resVo.ResourceSrc = 1;
					}else if(suffix.toLowerCase()=="xlsx" || suffix.toLowerCase()=="xls"){
                    	resVo.ResourceSrc = 3;
                	}
                    $scope.insertData.push(resVo);
				}else if (v.type == "image"){
                    resVo.ResourceNum = v.id
                    resVo.ResourceTit = v.filename;
                    resVo.ResourceSrc = 2;
                    resVo.TypeSrc = v.imgs;
                    resVo.downloadPath = v.downloadPath
                    $scope.insertData.push(resVo);
				}else if(v.type == "audio"){
                    resVo.ResourceNum = v.id
                    resVo.ResourceTit = v.filename;
                    resVo.ResourceSrc = 4;
                    resVo.httpUrl=v.httpUrl;
                    resVo.rtmpUrl=v.rtmpUrl;
                    resVo.downloadPath = v.downloadPath
                    $scope.insertData.push(resVo);
				}else{
                    resVo.ResourceNum = v.id
                    resVo.ResourceTit = v.filename;
                    resVo.ResourceSrc = 5;
                    resVo.httpUrl=v.httpUrl;
                    resVo.rtmpUrl=v.rtmpUrl;
                    resVo.downloadPath = v.downloadPath
                    $scope.insertData.push(resVo);
				}


            });

            console.log(o);
            console.log(j);
        });
    	if($scope.variablePacket.Record.length > 0){
            $scope.RecordTab(0,$scope.variablePacket.Record[0]);
		}else{
            $scope.ResLineTab(0,$scope.insertData[0].ResourceSrc);
		}
		if($scope.variablePacket.Test.length > 0){
            $scope.TestTab(0,$scope.variablePacket.Test[0])
		}else{
            $scope.variablePacket.testFlag = false;
		}

    });
	//下载
	$scope.Upload = function(e,o){
		console.log(o);
		angular.element(e.target).addClass('active');
        window.open(o.downloadPath+"?filename="+o.ResourceTit,"_blank");

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
	//实录
	$scope.RecordTab = function(i,o){
		$scope.variablePacket.RecordIndex = i;
		$scope.variablePacket.ResLineType = "video";
		$scope.variablePacket.ResLineIndex = -1;
		console.log(o);
        $scope.variablePacket.recordVideoId = o.id;
        var fls=flashChecker();
		if(fls.f){
            jwplayer('recordVideo').setup({
                flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                width: 800,
                height: 600,
                autostart: 'true',
                playlist: [{
                    image: "/assets/myPoster.jpg",
                    sources: [{
                        file: o.httpUrl

                    }, {
                        file: o.rtmpUrl
                    }]
                }],
                androidhls: "true"
            });
		}


	}


	
	//测试
	$scope.TestTab = function(i,obj){
		if(!$.isEmptyObject(obj.jsonQuz)){
            $scope.variablePacket.eightSwitchOut=[];
            $scope.questionBank.Out.single = [];
            $scope.questionBank.Out.judge = [];
            $scope.questionBank.Out.briefAnswer = [];
            var data = angular.fromJson(obj.jsonQuz);
            console.log(data);
            angular.forEach(data,function (o,j) {
            	var test = {};
            	var single = {};
            	var judge = {};
            	var briefAnswer = {};
				switch (o.taxonomy){
					case "multichoice":
                        test= {"name":"单选题",Type:'single'}
                        single.Id = j;
                        single.Type = 'single';
                        single.AnswerShow=false,
                        single.queTit = o.content;
                        // if(o.options.length > 0){
                        	// var textStr = "";
                         //   angular.forEach(o.options,function (x,i) {
                         //       textStr+=x.name+x.text;
                         //   })
                         //    single.queTit = o.content+textStr;
						// }
                        single.Answer = o.correct;
                        single.Analysis = o.detail;
                        $scope.questionBank.Out.single.push(single);
						break;
					case "truefalse":
						test ={"name":"判断题",Type:'judge'};
                        judge.Id=j;
                        judge.Type='judge';
                        judge.AnswerShow=false;
                        judge.queTit = o.content;
                        if(o.correct == "1"){
                            judge.Answer = "正确";
						}else{
                            judge.Answer = "错误";
						}
                        judge.Analysis = o.detail;
                        $scope.questionBank.Out.judge.push(judge);
						break;
					case "long_answer":
						test = {"name":"简答题",Type:'briefAnswer'};
                        briefAnswer.Id=0;
                        briefAnswer.Type = "briefAnswer";
                        briefAnswer.AnswerShow = false;
                        briefAnswer.queTit = o.content;
                        briefAnswer.Answer = o.correct;
                        briefAnswer.Analysis = o.detail;
                        $scope.questionBank.Out.briefAnswer.push(briefAnswer);
						break;
				}
                if(JSON.stringify($scope.variablePacket.eightSwitchOut).indexOf(JSON.stringify(test)) < 0){
                    $scope.variablePacket.eightSwitchOut.push(test);
                }
            });
		}
        console.log( $scope.questionBank.Out.briefAnswer);
		$scope.variablePacket.TestIndex = i;
	}
	
	//查看答案及解析
	$scope.lookAnswer = function(type,index,answer){
		$scope.questionBank.Out[type][index].AnswerShow = answer ? false : true;
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
	
	//吸顶
	$scope.Top = angular.element(".zyx_lines").offset().top;
	window.onscroll = function (){
		var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if($scope.variablePacket.AddResources_show){
			if(scrollT >= ($scope.Top + 616)) {
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = true;
				});
			}else{
				$scope.$apply(function (){
					$scope.variablePacket.titFixed = false;
				});
			}
		}else{
			if(scrollT >= $scope.Top) {
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
	
	//资源库资源列条的切换
	$scope.ResLineTab = function(index,typeSrc,o){
		$scope.variablePacket.ResLineIndex = index;
		$scope.variablePacket.ResLineTab = index;
		$scope.variablePacket.RecordIndex = -1;
		if(typeSrc==4 || typeSrc==5){
            $scope.variablePacket.ResLineType = "video";
            var fls=flashChecker();
            if(fls.f) {
                jwplayer('recordVideo').setup({
                    flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                    width: 800,
                    height: 600,
                    autostart: 'true',
                    playlist: [{
                        image: "/assets/myPoster.jpg",
                        sources: [{
                            file: o.httpUrl

                        }, {
                            file: o.rtmpUrl
                        }]
                    }],
                    androidhls: "true"
                });
            }
		}else{
			$scope.variablePacket.ResLineType = "pic";
		}
	}
	
	
	//导学资源和提问交流
	$scope.EchotitTab = function(i){
		$scope.variablePacket.Echotit = i;
        var id = $scope.variablePacket.recordVideoId;
		if(i == 1 && !$.isEmptyObject(id)){
           var param={lessonId:id,pageNo:1,pageSize:10,isFlag:"yes"};
            $scope.variablePacket.askArry = [];
            classroomService.lessonComment(param,function (res) {
                console.log(res);
                angular.forEach(res,function (o,k) {
					var news = {};

                    news.askImg = o.user_img;
                    news.askName = o.user_name+' ：';
                    news.askText = o.content;
                    news.askYears = o.createtime;
                    $scope.variablePacket.askArry.unshift(news);
                })
            },function (err) {

            })
		}
	}
	
	//提问按钮
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
		news.askImg = './img/tuixiangzi.png';
		news.askName = '张燕霞 ：';
		news.askText = $scope.variablePacket.message;
		news.askImg = userInfo.userFace;
        news.askName = userInfo.realname+" : "
		news.askYears = times.Years("yyyy-MM-dd");
		news.askTime = times.Years("hh:mm:ss");
		$scope.variablePacket.askArry.unshift(news);
		$scope.variablePacket.message = ''

		var commentParams={userId:userInfo.id,userName:userInfo.realname,resourceId:$scope.variablePacket.recordVideoId,content:news.askText,userImg:userInfo.userFace};
        classroomService.putLessonComment(commentParams,function (res) {
            console.log(res);
        },function (err) {

        })
	};
	

	
	//资源数据
	$scope.insertData = [];
	/*
	*
	 {
	 sign:false, //加减号
	 ResourceNum:0,//记录点击的第几个
	 ResourceTit:'00五年级五年级五年级五年级五年级语文期末试卷.ppt', //标题
	 ResourceSrc:0, //类型图片--类型显示  0：word；1：ppt；2：图片；3：excal：4：音乐,5：视频
	 name:'刘敏', //名字
	 time:'2017-08-20',//时间
	 size:'1049.02k',//内存大小
	 TypeSrc:[
	 {'Src':'resources_middle.jpg'},
	 {'Src':'newsImg.jpg'},
	 {'Src':'ad_1.jpg'},
	 {'Src':'banner.png'}
	 ]
	*

	* */
	
	
	//习题数据
	$scope.questionBank = {
		Out:{
			//单选
			single : [
				// {
				// 	Id:0,
				// 	Type:'single', //题型
				// 	AnswerShow:false, //默认答案不显示
				// 	queTit:'<b>111函数g（x） = f（x） - x +3的零点的集合为</b>', //题干
				// 	Answer:'B', //答案
				// 	Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
				//
				// }
				
			],
			//多选
			// many : [
			// 	{
			// 		Id:0,
			// 		Type:'many', //题型
			// 		AnswerShow:false,//默认答案不显示
			// 		queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
			// 		Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
			// 		Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
			//
			// 	}
			// ],
			//判断
			judge : [
				// {
				// 	Id:0,
				// 	Type:'judge', //题型
				// 	AnswerShow:false,//默认答案不显示
				// 	queTit:'111天上有2个太阳吗？', //题干
				// 	Answer:'错误',//答案
				// 	Analysis:'天上有一个太阳',//解析
				//
				// }
			],
			//填空
			// fillIn : [
			// 	{
			// 		Id:0,
			// 		Type:'fillIn', //题型
			// 		AnswerShow:false,//默认答案不显示
			// 		queTit:'111在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。', //题干
			// 		Answer:'11山原旷其盈视，川泽纡其骇瞩.|11暧暧远人村，依依墟里烟。| 11暧暧远人村，依依墟里烟。',//答案
			// 		Analysis:'天上有一个太阳',//解析
			//
			// 	}
			// ],
			//材料
			// material : [
			// 	{
			// 		Id:0,
			// 		Type:'material', //题型
			// 		AnswerShow:false,//默认答案不显示
			// 		queTit:'为什么李白特别钟情于庐山？', //题干
			// 		Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
			// 		Analysis:'天上有一个太阳',//解析
			//
			// 	}
			// ],
			//简答
			briefAnswer : [
				// {
				// 	Id:0,
				// 	Type:'briefAnswer', //题型
				// 	AnswerShow:false,//默认答案不显示
				// 	queTit:'为什么李白特别钟情于庐山？', //题干
				// 	Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
				// 	Analysis:'天上有一个太阳',//解析
				//
				// }
			]
			// //完形填空
			// clozeCloze : [
			// 	{
			// 		Id:0,
			// 		Type:'clozeCloze', //题型
			// 		AnswerShow:false,//默认答案不显示
			// 		queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
			// 		Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
			// 		Analysis:'天上有一个太阳',//解析
			//
			// 	},{
			// 		Id:1,
			// 		Type:'clozeCloze',
			// 		AnswerShow:false,
			// 		queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.",
			// 		Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
			// 		Analysis:'地上有个月亮',
			//
			// 	}
			// ],
			// //阅读理解
			// reading : [
			// 	{
			// 		Id:0,
			// 		Type:'reading', //题型
			// 		AnswerShow:false,//默认答案不显示
			// 		queTit:'11111111111111111111111111111111111111111111111111111111阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙', //题干
			// 		myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
			// 		Analysis:'天上有一个太阳',//解析
			//
			// 	},{
			// 		Id:1,
			// 		Type:'reading',
			// 		AnswerShow:false,
			// 		queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
			// 		myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
			// 		Analysis:'是是是是',
			//
			// 	}
			// ]
		}
	}

	

	//循环完成后
	var trans = 'Out';
	$scope.renderFinish = function(){
		//填空题答案类型的转换
		$scope.fillInArr = [];
		angular.forEach($scope.questionBank[trans].fillIn, function(e, i) {
			$scope.fillInArr.push($scope.questionBank[trans].fillIn[i].Answer.split("|"));
		})
	
		//材料题答案类型的转换
		$scope.materialArr = [];
		angular.forEach($scope.questionBank[trans].material, function(e, i) {
			$scope.materialArr.push($scope.questionBank[trans].material[i].Answer.split("|"));
		})
	
		//简答题答案类型的转换
		$scope.briefAnswerArr = [];
		angular.forEach($scope.questionBank[trans].briefAnswer, function(e, i) {
			$scope.briefAnswerArr.push($scope.questionBank[trans].briefAnswer[i].Answer.split("|"));
		})
		
		//滚动条调用
		angular.element(".zyx_AddResources_left").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "3d-dark"			//滚动条样式
		});
		angular.element(".zyx_askBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
		angular.element(".zyx_ResLineBox").mCustomScrollbar({
			mouseWheelPixels : 1000,
			theme: "3d-dark"
		});
	}
	
	
}]);


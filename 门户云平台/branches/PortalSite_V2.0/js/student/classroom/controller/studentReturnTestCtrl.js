app.controller('studentReturnTestCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课堂记录';
	
	
	//导学内容---查看答案及解析
	$scope.lookAnswerEcho = function(type,index,answer){
		$scope.echoQuestion[type][index].AnswerShow = answer ? false : true;
	}
    $scope.echoQuestion = {
        //标题
        title: [
            // {"name":"单选题"},
            // {"name":"多选题"},
            // {"name":"判断题"},
            // {"name":"填空题"},
            // {"name":"材料题"},
            // {"name":"简答题"},
            // {"name":"完形填空"},
            // {"name":"阅读理解"}
        ],
        //单选
        single : [
            // {
            //     Id:0,
            //     Type:'single', //题型
            //     AnswerShow:false, //默认答案不显示
            //     queTit:'111函数g（x） = f（x） - x +3的零点的集合为', //题干
            //     Answer:'B', //答案
            //     Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节明细
            //     myAnswer:'A',//我的答案--已学习选项
            //     icon:"error",//我的答案--已学习图片
            // },{
            //     Id:1,
            //     Type:'single',
            //     AnswerShow:false,
            //     queTit:'222定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
            //     Answer:'C',
            //     Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:'C',
            //     icon:"correct",
            // },{
            //     Id:2,
            //     Type:'single',
            //     AnswerShow:false,
            //     queTit:'333由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
            //     Answer:'C',
            //     Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:'B',
            //     icon:"half",
            // }

        ],
        // //多选
        // many : [
        // 	{
        // 		Id:0,
        // 		Type:'many', //题型
        // 		AnswerShow:false,//默认答案不显示
        // 		queTit:'111多选A.   {1,.3}    B.  {-3，-1，1，3}    C.  {2-7，1，3}    D.  {-2-7,1,3}', //题干
        // 		Answer:{daanA:true,daanB:true,daanC:false,daanD:false},//答案
        // 		Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',//解析
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:['D','A'],//我的答案--已学习选项
        // 		icon:"error",//我的答案--已学习图片
        // 	},{
        // 		Id:1,
        // 		Type:'many',
        // 		AnswerShow:false,
        // 		queTit:'222多选定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数定义在R上的奇函数',
        // 		Answer:{daanA:false,daanB:true,daanC:true,daanD:false},
        // 		Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:['A','C'],
        // 		icon:"correct",
        // 	},{
        // 		Id:2,
        // 		Type:'many',
        // 		AnswerShow:false,
        // 		queTit:'333多选由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选B',
        // 		Answer:{daanA:true,daanB:false,daanC:false,daanD:true},
        // 		Analysis:'由题意可得：A∪∪B={1，2，4，6}，∴（A∪B）∩C={1,2,4},所以选C',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:['A','B','C'],
        // 		icon:"half",
        // 	}
        // ],
        //判断
        judge : [
            // {
            //     Id:0,
            //     Type:'judge', //题型
            //     AnswerShow:false,//默认答案不显示
            //     queTit:'111天上有2个太阳吗？', //题干
            //     Answer:'错误',//答案
            //     Analysis:'天上有一个太阳',//解析
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:'正确',//我的答案--已学习选项
            //     icon:"error",//我的答案--已学习图片
            // },{
            //     Id:1,
            //     Type:'judge',
            //     AnswerShow:false,
            //     queTit:'222你是谁？我是谁？是游戏吗？',
            //     Answer:'正确',
            //     Analysis:'是是是是',
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:'正确',
            //     icon:"correct",
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
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
        // 		myAnswer:[{'daan':'好地方','icon':'error'},{'daan':'东风东方','icon':'correct'}],//我的答案--已学习选项
        // 	},{
        // 		Id:1,
        // 		Type:'fillIn',
        // 		AnswerShow:false,
        // 		queTit:'222在横线处补写恰当的语句勤奋是点燃智慧的火把。（1）———————。懒惰者，永远不会在事业上有所建树，永远不会使自己变得聪明起来。唯有勤奋者，才能在知识海洋里猎取到真智实才，才能不断地开拓知识领域，获得知识的酬报，使自己变得聪明起来。高尔基说过：“天才出于勤奋”。这就是说，（2）——————。',
        // 		Answer:'22山原旷其盈视，川泽纡其骇瞩.| 22暧暧远人村，依依墟里烟。| 22暧暧远人村，依依墟里烟。',//答案
        // 		Analysis:'天上有一个太阳',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:[{'daan':'22山原旷其盈视22山原旷其盈视22山原旷其盈视22山原旷其盈视，川泽纡其骇瞩','icon':'correct'},{'daan':'22山原旷其盈视，川泽纡其骇瞩','icon':'correct'}],
        // 	}
        // ],
        // //材料
        // material : [
        // 	{
        // 		Id:0,
        // 		Type:'material', //题型
        // 		AnswerShow:false,//默认答案不显示
        // 		queTit:'为什么李白特别钟情于庐山？', //题干
        // 		Answer:'暧暧远人村 | 川泽纡其骇瞩',//答案
        // 		Analysis:'天上有一个太阳',//解析
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
        // 		myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
        // 	},{
        // 		Id:1,
        // 		Type:'material',
        // 		AnswerShow:false,
        // 		queTit:'你是谁？我是谁？是游戏吗？',
        // 		Answer:'暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
        // 		Analysis:'是是是是',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
        // 	}
        // ],
        //简答
        briefAnswer : [
            // {
            //     Id:0,
            //     Type:'briefAnswer', //题型
            //     AnswerShow:false,//默认答案不显示
            //     queTit:'为什么李白特别钟情于庐山？', //题干
            //     Answer:'11暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',//答案
            //     Analysis:'天上有一个太阳',//解析
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
            //     myAnswer:[{'daan':'暧暧远人村','icon':'error'},{'daan':'川泽纡其骇瞩','icon':'correct'}],//已学习---我的答案
            // },{
            //     Id:1,
            //     Type:'briefAnswer',
            //     AnswerShow:false,
            //     queTit:'你是谁？我是谁？是游戏吗？',
            //     Answer:'22暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
            //     Analysis:'是是是是',
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
            // },{
            //     Id:2,
            //     Type:'briefAnswer',
            //     AnswerShow:false,
            //     queTit:'为什么李白特别钟情于庐山？',
            //     Answer:'33暧暧远人村，依依墟里烟。 | 山原旷其盈视，川泽纡其骇瞩。',
            //     Analysis:'是是是是',
            //     Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
            //     myAnswer:[{'daan':'山原旷其盈视','icon':'half'},{'daan':'川泽纡其骇瞩','icon':'correct'}],
            // }
        ],
        // //完形填空
        // clozeCloze : [
        // 	{
        // 		Id:0,
        // 		Type:'clozeCloze', //题型
        // 		AnswerShow:false,//默认答案不显示
        // 		queTit:"天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳天上有一个太阳queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.", //题干
        // 		Answer:[{daan:'A'},{daan:'B'},{daan:'D'}],//答案
        // 		Analysis:'天上有一个太阳',//解析
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
        // 		myAnswer:[{'daan':'A','icon':'half'},{'daan':'B','icon':'correct'}],//已学习---我的答案
        // 	},{
        // 		Id:1,
        // 		Type:'clozeCloze',
        // 		AnswerShow:false,
        // 		queTit:"地上有个月亮queTit:'All parents love their children.Many parents want their kids to（1）____well-known people when they（2）____.Most of them want their kids to live better than others.Many of them (3)_____their kids will be singers or actors. Actors and singers canmoney easily in our country.When they appear in the advertisement,they will get money which a farmer or a worker can't make all his life.",
        // 		Answer:[{daan:'C'},{daan:'B'},{daan:'D'}],
        // 		Analysis:'地上有个月亮',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 		myAnswer:[{'daan':'C','icon':'half'},{'daan':'D','icon':'correct'}],
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
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],//章节
        // 	},{
        // 		Id:1,
        // 		Type:'reading',
        // 		AnswerShow:false,
        // 		queTit:'22222阅读以下文章，回答问题（孔子）说：“治理国家要用礼，可是他（子路）的话毫不谦让，所以（我）笑他。难道冉求讲的不是国家大事吗？怎么见得方圆六七十里或五六十里就不是国家了呢？难道公西赤讲的不是国家大事吗？宗庙祭祀，诸侯会盟和朝见天子，不是诸侯国间的大事那又是什么呢？如果公西华只能给诸侯做一个小相，那么谁能做大事呢？”(1) 孔子要表达的意思？ A   欣赏子路 B   欣赏冉有 C   欣赏公西华 D   欣赏曾皙',
        // 		myAnswer:[{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'C','icon':'half'},{'tit':'反对党的看法？','testDaan':'低分化的','icon':'half'},{'tit':'span是什么标签？A. 行内 B. 行内快  C. 块元素 D. 不知道','daan':'D','icon':'correct'}],
        // 		Analysis:'是是是是',
        // 		Chapter:[{Onetit:'学科',Twotit:'课本',Threetit:'章节'}],
        // 	}
        // ]
    }

    var jsonQuz = sessionStorage.getItem("jsonQuzSes");
    if(!$.isEmptyObject(jsonQuz)){
        var data = angular.fromJson(jsonQuz);
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
                    //     var textStr = "";
                    //     angular.forEach(o.options,function (x,i) {
                    //         textStr+=x.name+x.text;
                    //     })
                    //     single.queTit = o.content+textStr;
                    // }
                    single.Answer = o.correct;
                    single.Analysis = o.detail;
                    single.myAnswer = o.myAnswer;
                    $scope.echoQuestion.single.push(single);
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
                    judge.myAnswer = o.myAnswer;
                    $scope.echoQuestion.judge.push(judge);
                    break;
                case "long_answer":
                    test = {"name":"简答题",Type:'briefAnswer'};
                    briefAnswer.Id=0;
                    briefAnswer.Type = "briefAnswer";
                    briefAnswer.AnswerShow = false;
                    briefAnswer.queTit = o.content;
                    briefAnswer.Answer = o.correct;
                    briefAnswer.Analysis = o.detail;
                    briefAnswer.myAnswer = o.myAnswer;
                    $scope.echoQuestion.briefAnswer.push(briefAnswer);
                    break;
            }
            if(JSON.stringify($scope.echoQuestion.title).indexOf(JSON.stringify(test)) < 0){
                $scope.echoQuestion.title.push(test);
            }
        });

        sessionStorage.removeItem("jsonQuzSes");
    }
	//导学内容---习题的数据

	
	
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
	
	
	
}]);
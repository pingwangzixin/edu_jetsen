app.controller('classroomStudentSituationCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll','classroomService',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll,classroomService) {

	console.log($stateParams.id);
	//变量包
	$scope.variablePacket = {
		stuName:'',
		stuEvalId:'',
		listBorder : false,				//列表最下面border 
		classState : 1,					//课堂评价状态默认值说
		resourceBox : false,			//资源详情弹框
		textearaWord : '',				//评价框文字
		inputtedWordNum : 0,			//评价框已输入文字
		limitWordNum: 255,				//评价框限制输入文字
		stuList : {						//学生列表
			normal:[{name:'张涂涂'},{name:'尔雅字'},{name:'飞了'}],
			excellent:[{name:'文学'},{name:'说的'},{name:'你丫的'}],
			poor:[{name:'碎蛋涂'},{name:'胡说字'},{name:'胡说字'},{name:'有过'}]
		},
		stuRes:[],
        resourceVo:{},
        filename:"",
        /** 学生评语保存 */
        stuWord:"",
        stuIndex:0
	};
	//请求学生信息
	var params = {classId:$stateParams.classId,lessonId:$stateParams.id};
	console.log(params);
	classroomService.getLessonStu(params,function (res) {
        $scope.variablePacket.stuList = res;
        console.log(res);

        //学生列表请求成功之后判断
        var borderLen = 0;
        angular.forEach($scope.variablePacket.stuList,function (e,i){

        	if(borderLen == 0 && e.length !=0){
                $scope.variablePacket.stuName = e[0].name;
                $scope.variablePacket.stuEvalId =e[0].id;
                $scope.variablePacket.classState = e[0].state;
                $scope.variablePacket.textearaWord = $.isEmptyObject(e[0].content) ?"":e[0].content;
                //传入参数classID,为了让学生有测试题的数据。
                var p = {lessonId:$stateParams.id,id:e[0].stuId,isFlag:"yes",classId:$stateParams.classId}
                httpStuRes(p);
			}
            borderLen += e.length;
            $scope.variablePacket.listBorder = borderLen % 2 ? false : true;
            console.log(e);

        });


    },function (err) {

    });


	function httpStuRes(params){
        classroomService.stuResource(params,function (res) {
			console.log(res);
            $scope.variablePacket.stuRes = [];
			angular.forEach(res,function (o,j) {
                var stuResVo = {};
                stuResVo.id = o.id;
                stuResVo.filename= o.filename;
				stuResVo.imgs = o.imgs;
				stuResVo.thumbnaiImg = o.thumbnaiImg;
                stuResVo.type = o.type;
                stuResVo.jsonQuz = o.jsonQuz;
                stuResVo.httpUrl = o.httpUrl;
                stuResVo.rtmpUrl = o.rtmpUrl;

                $scope.variablePacket.stuRes.push(stuResVo);
            })
        },function (err) {

        });
	}

	
	//课堂状态切换
	$scope.classStateFn = function (i){
		$scope.variablePacket.classState = i;
		var param = {status:i};
        setData($scope.variablePacket.stuIndex);

		classroomService.stuSituation($scope.variablePacket.stuEvalId,param,function (res) {

        },function (err) {

        })
	};
	
    /**
	 * 学生信息切换
     */
    $scope.stuInfo = function (i,obj,x) {
		console.log(obj);
        $scope.variablePacket.stuName = obj.name;
        $scope.variablePacket.stuEvalId =obj.id;
        $scope.variablePacket.classState = obj.state;
        $scope.variablePacket.textearaWord = $.isEmptyObject(obj.content) ?"":obj.content;
        /** 用于保存评语改变后的数据 */
        $scope.variablePacket.stuIndex = x;

        var p = {lessonId:$stateParams.id,id:obj.stuId,isFlag:"yes",classId:$stateParams.classId}
        httpStuRes(p);
    };
    
    
    $scope.returnTest = function (o) {
        sessionStorage.setItem("jsonQuzSes",o);
        $state.go("secondNav.returnTest");
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
	//资源弹框展示
	$scope.resourceBoxFn = function (i){
		$scope.variablePacket.resourceBox = true;
        $scope.variablePacket.filename = i.filename;
        $scope.variablePacket.resourceVo = i;
        console.log(i)
        if(i.type == "video" || i.type == "audio"){
            var fls=flashChecker();
            if(fls.f) {
                jwplayer('videoFlash').setup({
                    flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                    width: 800,
                    height: 600,
                    autostart: 'true',
                    playlist: [{
                        image: "/assets/myPoster.jpg",
                        sources: [{
                            file: i.rtmpUrl
                        }, {
                            file: i.httpUrl
                        }]
                    }],
                    androidhls: "true"
                });
            }
        }

	};

	//评价输入框文字统计
	$scope.statisticsWord = function (){
		$scope.variablePacket.inputtedWordNum = $scope.variablePacket.textearaWord.length;
		if($scope.variablePacket.inputtedWordNum >= $scope.variablePacket.limitWordNum){
			$scope.variablePacket.inputtedWordNum = $scope.variablePacket.limitWordNum;
			$scope.variablePacket.textearaWord = $scope.variablePacket.textearaWord.substring(0,$scope.variablePacket.limitWordNum);
		}
	};
	
	//提交评语
	$scope.submitWord = function (){
		if($scope.variablePacket.inputtedWordNum <= 0){
			$scope.wranShow('请输入评价文字',false);
		}else{

            setData($scope.variablePacket.stuIndex);
			var param = {context:$scope.variablePacket.textearaWord}
            classroomService.stuSituation($scope.variablePacket.stuEvalId,param,function (res) {

            },function (err) {
				console.log(err);
            })
			$scope.wranShow('提交成功',true);
		}
	};
    function setData(x){
        switch (x){
            case 0:
                var objData =  forEachStuList($scope.variablePacket.stuList.normal);
                $scope.variablePacket.stuList.normal = objData;
                break;
            case 1:
                var objData =  forEachStuList($scope.variablePacket.stuList.excellent);
                $scope.variablePacket.stuList.excellent = objData;
                break;
            case 2:
                var objData =   forEachStuList($scope.variablePacket.stuList.poor);
                $scope.variablePacket.stuList.poor = objData;
                break;
            default:;
        }
    }
	function forEachStuList(data){
        angular.forEach(data,function (o,i) {
            if(o.id  == $scope.variablePacket.stuEvalId){
                o.state = $scope.variablePacket.classState;
                switch ($scope.variablePacket.classState){
                    case 0:
                        $("#"+$scope.variablePacket.stuEvalId).text("优秀");
                        break;
                    case 1:
                        $("#"+$scope.variablePacket.stuEvalId).text("正常");
                        break;
                    case 2:
                        $("#"+$scope.variablePacket.stuEvalId).text("较差");
                        break;
                    default:;
                }
                o.content =  $scope.variablePacket.textearaWord;
            }
        })
        return data;
    }
	
}]);
app.controller('classroomPerformanceCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','stuClassroomService','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,stuClassroomService,$stateParams) {
    var userInfo = angular.fromJson(sessionStorage.getItem("userInfo"));
	//变量包
	$scope.variablePacket = {
		resourceBox : false,			//资源详情弹框
		stuVo:{},
        stuRes:[],
        filename:'',
        resourceVo:{}
	};
    var params = {classId:$stateParams.classId,lessonId:$stateParams.id,id:userInfo.id};
    stuClassroomService.getLessonStu(params,function (res) {
        console.log();
        if(res.length > 0){

            $scope.variablePacket.stuVo.stuName = res[0].stu_name;
            $scope.variablePacket.stuVo.vcontent = res[0].vcontent;
            if(res[0].eval_flag == 1){
                $scope.variablePacket.stuVo.flag = "正常";
			}else if(res[0].eval_flag == 0){
                $scope.variablePacket.stuVo.flag = "优秀";
			}else{
                $scope.variablePacket.stuVo.flag = "较差";
			}
            $scope.variablePacket.stuVo.stuId = res[0].stu_id;
		}
    },function (err) {

    })
	//资源弹框展示
	$scope.resourceBoxFn = function (i){
		$scope.variablePacket.resourceBox = true;
        $scope.variablePacket.filename = i.filename;
        $scope.variablePacket.resourceVo = i;
        console.log(i)
        if(i.type == "video" || i.type == "audio"){
            jwplayer('videoFlash').setup({
                flashplayer: "common/jwplayer-7.7.4/jwplayer.flash.swf",
                width:800,
                height:600,
                autostart: 'true',
                playlist: [{
                    sources: [{
                        file: i.httpUrl

                    },{
                        file: i.rtmpUrl
                    }]
                }],
                androidhls:"true"
            });
        }
	};
    var p = {lessonId:$stateParams.id,classId:$stateParams.classId,id:userInfo.id,isFlag:"yes"}
    httpStuRes(p);
    $scope.returnTestStu = function (o) {
        sessionStorage.setItem("jsonQuzSes",o);
        $state.go("secondNav.studentReturnTest")
    }
    function httpStuRes(params){
        $scope.variablePacket.stuRes = [];
        stuClassroomService.stuResource(params,function (res) {
            console.log(res);
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
	
}]);
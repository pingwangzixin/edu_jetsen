app.controller('studentClassroomListCtrl', ['$scope','$rootScope','$state', '$timeout', '$http', '$location', '$interval', 'templateServer', 'scrollbar', '$sce', '$compile','stuClassroomService', function($scope,$rootScope,$state, $timeout, $http, $location, $interval, templateServer, scrollbar, $sce, $compile,stuClassroomService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课堂记录';
	
    var userId = sessionStorage.getItem("userId");
    /**
     * 根据token 获取用户信息
     */
    $scope.findUserByToken = function (userId) {
        if(!$.isEmptyObject(userId)){
        	var def = $.Deferred();
            // var tokenParams = {token:token};
            stuClassroomService.getUserByToken(userId,function (user) {
                def.resolve(user);
            },function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    /**
     * 异步执行完后执行
     */
    $scope.findUserByToken(userId).done(function (user) {
        var param = {classId:user.classId,pageNo:1,pageSize:10};
        $scope.findLessonByInfo(param);
        var p = {gradeId:user.gradeId};
        $scope.findSubjectByGradeId(p);
        $scope.userInfo = angular.fromJson(sessionStorage.getItem("userInfo"));
    }).fail(function (err) {
        console.log(err);
    })
    /**
     *  查询课堂记录  根据班级id
     * @param param
     */
    $scope.findLessonByInfo = function (param) {
        // var param={classId:res.classId,pageNo:1,pageSize:10};
        stuClassroomService.lessonList(param,function (res) {
            $scope.memoir=res;
        },function (err) {
            console.log(err);
        })
    }
    $scope.subjectList = [ //科目
        // {
        //     id: 1,
        //     name: "数学"
        // }
    ];
    /**
     * 根据年级查询学科~
     * @param param
     */
    $scope.findSubjectByGradeId  = function (param) {
        stuClassroomService.findUserSubject(param,function (data) {
            angular.forEach(data,function (o,j) {
                var subject = {};
                subject.id=o.id;
                subject.name=o.name;
                $scope.subjectList.push(subject);
            })
            $scope.variablePacket.subject = $scope.subjectList[0].name;
            console.log(data);
        },function (err) {
            console.log(err);
        })
    }

    console.log(token);


	$scope.variablePacket = {
		subjectIndex: 0, //选中科目下标
		subject: "", //默认选中科目
		date: dateline(), //日历上的默认日期(当前日期)
		dataIndex: 0, //所要显示数据的起始下标
		sum: 1, //一次显示几天的
		count: 1, //滚动条到底部计数
		wrongState:false,   //定义没有资源时图片显示状态
		correctState:true   //定义有资源时的显示状态
		
	};

	$scope.subjectTab = function(i, $index) { //科目选择
		$scope.variablePacket.subjectIndex = $index;
		$scope.variablePacket.subject = i.name;
        var p={classId:$scope.userInfo.classId,pageNo:1,pageSize:10,subject:i.name};

        $scope.findLessonByInfo(p);
	};


	$scope.memoir = [ //实录数据
		// {
		// 	id: 1,
		// 	date: "2018-07-20", //日期
		// 	week: "星期二", //星期几
		// 	data: [{
		// 			grade: "六年级（1）班", //班级
		// 			time: "08:06", //时间
		// 			subject: "语文", //科目
		// 			knowledge: [{
		// 					img: "img/resources_video.png", //视频图标
		// 					name: "古代诗歌鉴赏" //资源名称
		// 				},
		// 				{
		// 					img: "img/resources_word.png", //word文档类型
		// 					name: "四大名著——西游记"
		// 				},
		// 				{
		// 					img: "img/resources_video.png", //视频图标
		// 					name: "古代诗歌鉴赏" //资源名称
		// 				},
		// 				{
		// 					img: "img/resources_word.png", //word文档类型
		// 					name: "四大名著——西游记"
		// 				},
		// 				{
		// 					img: "img/resources_video.png", //视频图标
		// 					name: "古代诗歌鉴赏" //资源名称
		// 				},
		// 				{
		// 					img: "img/resources_word.png", //word文档类型
		// 					name: "四大名著——西游记"
		// 				},
		// 				{
		// 					img: "img/resources_video.png", //视频图标
		// 					name: "古代诗歌鉴赏" //资源名称
		// 				},
		// 				{
		// 					img: "img/resources_word.png", //word文档类型
		// 					name: "四大名著——西游记"
		// 				}
        //
		// 			]
		// 		}
        //
		// 	]
		// }

	];
    $scope.dateCheck = function (param) {
        var def =$.Deferred();
        stuClassroomService.dateLessonMonth(param,function (jdata) {
            def.resolve(jdata);

        },function (err) {
            def.reject(err);
        })
        return def.promise();
    }
	// $scope.memoirCopy = $scope.memoir.concat().slice($scope.variablePacket.dataIndex, $scope.variablePacket.dataIndex + $scope.variablePacket.sum); //复制一份数据，因为后面要根据日历上的日期来展示数据

    $scope.calendar = function() { //日历
        laydate({
            elem: '#calendar' //实例化日期插件
        });

        var subject =$scope.variablePacket.subject;
        var param = {classId:$scope.userInfo.classId};

        console.log(param);
        if(!$.isEmptyObject(subject)){
            param.subject = subject;
        }
        reminder(param);
        $("#laydate_YY").click(function() { //点击年
            $("#laydate_ys li").click(function() {
                reminder(param);

            });
        });
        $("#laydate_ms span").click(function() { //点击月份
            reminder(param);
        });
        $(".laydate_tab").click(function() { //点击左右上下箭头
            reminder(param);
            $("#laydate_ys li").click(function() {
                reminder(param);
            });
        });
        $("#laydate_table tbody td").click(function() { //点击有提示的日期，页面上只展示该日期的内容。
            if($(this).hasClass('active')){
                $scope.variablePacket.correctState=true;
                $scope.variablePacket.wrongState=false;
                var date = $("#calendar").text();
                $scope.variablePacket.date = date;
                var p={classId:$scope.userInfo.classId,pageNo:1,pageSize:10,dateTime:date,subject:subject};
                angular.element(".zmj_classroomlist_content").mCustomScrollbar("destroy");
                $scope.renderFinish();
                $scope.findLessonByInfo(p);
            }else{
                $scope.variablePacket.correctState=false;
                $scope.variablePacket.wrongState=true;
            };
            $scope.$apply(); //手动刷新
        });
        $("#laydate_today").click(function () {
            $scope.variablePacket.correctState=true;
            $scope.variablePacket.wrongState=false;
            var date = $("#calendar").text();
            $scope.variablePacket.date = date;
            var p={classId:$scope.userInfo.classId,pageNo:1,pageSize:10,dateTime:date,subject:subject};
            angular.element(".zmj_classroomlist_content").mCustomScrollbar("destroy");
            $scope.renderFinish();
            $scope.findLessonByInfo(p);
        })
    };

    $scope.renderFinish = function() { //滚动条
        angular.element(".zmj_classroomlist_content").mCustomScrollbar({
            mouseWheelPixels: 500, //滚动速度
            theme: "3d-dark", //滚动条样式
            callbacks: {
                onTotalScroll: function() {
                    $scope.variablePacket.sum = $scope.variablePacket.sum + 1;

                    var subject =$scope.variablePacket.subject;
                    var renderParam = {classId:$scope.userInfo.classId,pageNo: 1,pageSize:10*$scope.variablePacket.sum};
                    if(!$.isEmptyObject(subject)){
                        renderParam.subject = subject;
                    }
                    var date = $("#calendar").text();
                    if(!$.isEmptyObject(date)){
                        renderParam.dateTime = date;
                    }
                    $scope.findLessonByInfo(renderParam);
                    // $scope.findLessonByInfo = function (param) {
                    //     // var param={classId:res.classId,pageNo:1,pageSize:10};
                    //     stuClassroomService.lessonList(param,function (res) {
                    //         $scope.memoir=res;
                    //     },function (err) {
                    //         console.log(err);
                    //     })
                    // }
                    // $scope.memoirCopy = $scope.memoir.slice($scope.variablePacket.dataIndex, $scope.variablePacket.dataIndex + $scope.variablePacket.sum);
                    var top = parseFloat($(".mCSB_container").css("top")) - 80 + "px";
                    $(".mCSB_container").css("top", top);
                    $scope.$apply(); //手动刷新
                }
            }
        });

    };

    function dateline() { //此乃为了得到当前的日期,后台可以带过来一个日期）
        var dates = new Date();
        var year = dates.getFullYear();
        var month = dates.getMonth() + 1;
        var day = dates.getDate();
        if(month < 10) {
            month = "0" + month;
        };
        if(day < 10) {
            day = "0" + day;
        };
        var str = year + "-" + month + "-" + day;
        return str;

    };

    function reminder(param) { //在日历上做相对应的日期提示
        var year = $("#laydate_y").val().slice(0, -1); //获取年
        var month = $("#laydate_m").val().slice(0, -1); //获取月
        var dd = $(".laydate_table .laydate_click").text();
        if(dd < 10){
        	dd="0"+dd;
		}
        var time = year + "-" + month + "-"+dd;
        var ym = year + "-" + month;
        var tds = $("tbody td"); //获取所有的日;
        console.log(time);
        param.dateTime = time;
        console.log(param);
        $scope.dateCheck(param).done(function (res) {
            console.log(res);
            angular.forEach(res,function (o,j) {
                if(ym == o.startTime.slice(0, 7)) {
                    for(var j = 0, length = tds.length; j < length; j++) {
                        if(tds.eq(j).html() < 10) {
                            tds.eq(j).data("value", "0" + tds.eq(j).html());
                        } else {
                            tds.eq(j).data("value", tds.eq(j).html())
                        };
                        if(tds.eq(j).hasClass("laydate_nothis") == false && tds.eq(j).data("value") == o.startTime.slice(-2)) {
                            tds.eq(j).addClass("active");
                            if($scope.variablePacket.subject !="全部"){
                                tds.eq(j).append('<span>' + $scope.variablePacket.subject + '</span>');
                            }
                        };
                    };

                };
            })
        }).fail(function (err) {

        })


    };
}]);
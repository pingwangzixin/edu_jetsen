app.controller('classroomListCtrl', ['$scope','$rootScope','$state','$timeout', '$http', '$location', '$interval', 'templateServer', 'scrollbar', '$sce', '$compile', '$stateParams', '$anchorScroll','classroomService', function($scope,$rootScope,$state, $timeout, $http, $location, $interval, templateServer, scrollbar, $sce, $compile, $stateParams, $anchorScroll,classroomService) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '课堂记录';
	
    var userId = sessionStorage.getItem("userId");

	//根据token获取用户信息，使用$.Deferred()解决异步数据问题
    $scope.defGetUserByToken = function (userId) {
        if(!$.isEmptyObject(userId)){
            var tokenParams = {token:token};
            var def = $.Deferred();
            classroomService.getUserByToken(userId,tokenParams,function (user) {
                def.resolve(user);
            },function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    //当defGetUserByToken 方法走完之后在进行的方法，课堂数据读取
    $scope.defGetUserByToken(userId).done(function (user) {
		console.log(user);
        var param={id:user.id,pageNo:1,pageSize:10};
        $scope.getLessonByUser(param);
        $scope.userInfo = angular.fromJson(sessionStorage.getItem("userInfo"));
        $scope.fillSubjectAndGrade(user);
    }).fail(function (err) {
		console.log(err);
    })

	$scope.getLessonByUser = function (param) {
        classroomService.lessonList(param,function (res) {
            $scope.memoir=res;
        },function (err) {
            console.log(err);
        })
    }
	
    $scope.subjectList = [ //科目
        {
            id: "",
            name: "全部"
        }
    ];
    $scope.variablePacket = {
        subjectIndex: 0, //选中科目下标
        subject: $scope.subjectList[0].name, //默认选中科目
        gradeIndex: 0, //选中班级下标
        grade:"",
        date: dateline(), //日历上的默认日期(当前日期)
        dataIndex: 0, //所要显示数据的起始下标
        sum: 1, //一次显示页数
        count: 1, //滚动条到底部计数
        wrongState:false,   //定义没有资源时图片显示状态
        correctState:true   //定义有资源时的显示状态

    };
    $scope.grade = [ //班级
        {
            id: "",
            name: "全部"
        }

    ];

    $scope.fillSubjectAndGrade = function (params) {
        if(!$.isEmptyObject(params)){
            angular.forEach(params.userCourse,function (o,j) {
                var subject = {};
                subject.id=o.subjectId;
                subject.name=o.subjectName;
                if(angular.toJson($scope.subjectList).indexOf(angular.toJson(subject)) < 0){
                    $scope.subjectList.push(subject);
                }
                var gradeVo = {};
                gradeVo.id=o.classId;
                gradeVo.name=o.gradeName+"("+o.className+")班";
                if(angular.toJson($scope.grade).indexOf(angular.toJson(gradeVo)) < 0){
                    $scope.grade.push(gradeVo);
                }

            });
        }
    }










	$scope.subjectTab = function(i, $index) { //科目选择
		console.log($index);
		$scope.variablePacket.subjectIndex = $index;
		$scope.variablePacket.subject = i.name;
		var param = {id:userId,pageNo:1,pageSize:10,classId:$scope.variablePacket.grade};
		if(i.name != "全部"){
            param.subject = i.name;
		}else{
            $("#calendar").text("");
        }
        var date = $("#calendar").text();
        if(!$.isEmptyObject(date)){
            param.dateTime = date;
        }
        memoirRes(param);

	};
	$scope.gradeTab = function(i,$index) { //班级选择
        $scope.variablePacket.gradeIndex = $index;
        var param = {id:userId,pageNo:1,pageSize:10};
        param.classId=i.id;
        $scope.variablePacket.grade = i.id;


        if($scope.variablePacket.subject!="全部"){
            param.subject=$scope.variablePacket.subject;
        }else{
            $("#calendar").text("");
        }
        var date = $("#calendar").text();
        if(!$.isEmptyObject(date)){
            param.dateTime = date;
        }
        memoirRes(param);

	};

	function memoirRes(param){
        classroomService.lessonList(param,function (res) {
            if(res.length != 0){
                $scope.variablePacket.correctState=true;
                $scope.variablePacket.wrongState=false;
            }else{
                $scope.variablePacket.correctState=false;
                $scope.variablePacket.wrongState=true;
            }

            $scope.memoir=res;
        },function (err) {
            console.log(err);
        })
    }
	$scope.dateCheck = function (param) {
        var def =$.Deferred();
		classroomService.dateLessonMonth(param,function (jdata) {
            def.resolve(jdata);

        },function (err) {
            def.reject(err);
        })
		return def.promise();
    }



	//$scope.memoirCopy = $scope.memoir.concat().slice($scope.variablePacket.dataIndex, $scope.variablePacket.dataIndex + $scope.variablePacket.sum); //复制一份数据，因为后面要根据日历上的日期来展示数据



	//因为angualr有controller，为了使功能正常故采用jq
	$scope.calendar = function() { //日历
		laydate({
			elem: '#calendar' //实例化日期插件
		});


        var cparam = {id:userId};
     
        if(!$.isEmptyObject($scope.variablePacket.subject) && $scope.variablePacket.subject != "全部"){
            cparam.subject =$scope.variablePacket.subject;
        }else{
              $scope.variablePacket.subject = "";
        }
        if(!$.isEmptyObject($scope.variablePacket.grade) && $scope.variablePacket.grade != "0"){
            cparam.classId =$scope.variablePacket.grade;
        }
        reminder(cparam);
		$("#laydate_YY").click(function() { //点击年
			$("#laydate_ys li").click(function() {
                console.log($scope.classId)
				reminder(cparam);

			});
		});
		$("#laydate_ms span").click(function() { //点击月份
           
            reminder(cparam);
		});
		$(".laydate_tab").click(function() { //点击左右上下箭头
           
            reminder(cparam);
			$("#laydate_ys li").click(function() {
                
                reminder(cparam);
			});
		});
		$("#laydate_table tbody td").click(function() { //点击有提示的日期，页面上只展示该日期的内容。
			if($(this).hasClass('active')){
				$scope.variablePacket.correctState=true;
				$scope.variablePacket.wrongState=false;
				var date = $("#calendar").text();
                $scope.variablePacket.date = date;
                classId = $scope.variablePacket.grade;
                var p={id:userId,pageNo:1,pageSize:10,dateTime:date,subject:subject,classId:classId};
                angular.element(".zmj_classroomlist_content").mCustomScrollbar("destroy");
                $scope.renderFinish();
                $scope.getLessonByUser(p);
					
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
            var p={id:userId,pageNo:1,pageSize:10,dateTime:date,subject:subject,classId:classId};
            angular.element(".zmj_classroomlist_content").mCustomScrollbar("destroy");
            $scope.renderFinish();
            $scope.getLessonByUser(p);
        })
	};

	$scope.renderFinish = function() { //滚动条
		angular.element(".zmj_classroomlist_content").mCustomScrollbar({
			mouseWheelPixels: 500, //滚动速度
			theme: "3d-dark", //滚动条样式
			callbacks: {　　　　
				onTotalScroll: function() {
                    $scope.variablePacket.sum = $scope.variablePacket.sum + 1;
                    var renderParam = {id:userId,pageNo: 1,pageSize:10*$scope.variablePacket.sum};
                    var subject = $scope.variablePacket.subject;
                    if(!$.isEmptyObject(subject) && subject != "全部"){
                        renderParam.subject = subject;
                    }
                    var date = $("#calendar").text();
                    if(!$.isEmptyObject(date)){
                        renderParam.dateTime = date;
                    }
                    var classId = $scope.grade[$scope.variablePacket.gradeIndex].id;
                    if(!$.isEmptyObject(classId) && classId != "0"){
                        renderParam.classId = classId;
                    }
                    $scope.getLessonByUser(renderParam);
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

	function reminder(cparam) { //在日历上做相对应的日期提示
		var year = $("#laydate_y").val().slice(0, -1); //获取年
		var month = $("#laydate_m").val().slice(0, -1); //获取月
		var dd = $(".laydate_table .laydate_click").text();
        if(dd < 10){
            dd="0"+dd;
        }
		var time = year + "-" + month + "-"+dd;

        var ym = year + "-" + month;
		var tds = $("tbody td"); //获取所有的日;
        cparam.dateTime = time;
        $scope.dateCheck(cparam).done(function (res) {
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
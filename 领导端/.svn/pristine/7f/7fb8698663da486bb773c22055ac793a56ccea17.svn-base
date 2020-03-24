app.controller('testQuestionsCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval, $stateParams) {

	//变量包
    $scope.variablePacket = {
    	xueduanrange: [],    // 学段
		xueduanelect: true,  //学段 全部
		xueduantype: 5,
		typeIfShow:false, //类型收起展开的切换
		switchIndex:0,//按类型和按学科切换
		tabIndex:0,//按区县和按角色切换
		name:"牡丹江市",//市区县学校等文字切换表格内容中表头内容的改变
		personalData:false,//控制学生个人页面需要显示的变量
		studentUserIndex:0,//控制学生个人页面--用户切换的索引
		studentGradeIndex:0,//控制学生个人页面--年级切换的索引
		studentSubjectIndex:0,//控制学生个人页面--学科切换的索引
        studentUserValue:"1",
        studentGradeValue:"",
        studentSubjectValue:"",
		periodIndex:0,//按学科-学段切换的索引
        yearid:"",
        areaId:"",
        cityarea:{},
        countyarea:{},
        schoolarea:{},
        level:"",
		subjArr:[],
		subjData:[],
        getStuYearList:[{"name":"全部","id":""},{"name":"2018年","id":"2018"},{"name":"2017年","id":"2017"},{"name":"2016年","id":"2016"}]
    };

    $scope.changeData = {
        'type':'city',
        //资源量统计表-按区县
        'tabledata_area':[
        ],
        //资源量统计表-按角色
        'tabledata_user':[
        ]
    };

    var roleTypeArr = new Array("1","2","3");

    var getStuYearList = sessionStorage.getItem('getStuYearList');
    if(getStuYearList == null){
        $http.get(jeucIps+'ea/api/statistics/getStuYearList').success(function (data){
            if(data.ret == "200"){
                var stuYearList = [{"name":"全部","id":""}];
                angular.forEach(data.data,function(e,i){
                    stuYearList.push({"name":e.id+"年","id":e.id})
                })
                $scope.variablePacket.getStuYearList = stuYearList;
                sessionStorage.setItem("getStuYearList",JSON.stringify(stuYearList));
            }
        })
    }else{
        $scope.variablePacket.getStuYearList = $.parseJSON(getStuYearList);;
    }

    //资源统计接口
    var resourceStatistic = interfaceIpAddr+"/resource/";




    //学段数据
	$scope.variablePacket.xueduanrange = [{
		"id": "level_1",
		"name": "小学"
	}, {
		"id": "level_2",
		"name": "初中"
	}, {
		"id": "level_3",
		"name": "高中"
	}, {
        "id": "level_5",
        "name": "教育局"
    }];
	//全选
	$scope.xueduanall = function() {
		$scope.variablePacket.xueduanelect = true;
		$scope.variablePacket.xueduantype = 5;
        $scope.variablePacket.level = "";
        $scope.getQuz();
	}
    //学段切换
	$scope.changexueduan = function(n) {
		$scope.variablePacket.xueduantype = n;
		$scope.variablePacket.xueduanelect = false;
        $scope.variablePacket.level = n;
        if(n == "level_5"){
            $scope.getQuz1();
        }else{
            $scope.getQuz();
        }

	}
	

	//类型收起展开的切换
	$scope.typeIfShow = function(){
		$scope.variablePacket.typeIfShow = !$scope.variablePacket.typeIfShow; 
	}

	//按区县和按角色切换
	$scope.switchTable = function(i){
		$scope.variablePacket.tabIndex = i;
	}
	
	//年级的切换
	$scope.studentGradeTab = function(i,obj){
		$scope.variablePacket.studentGradeIndex = i;
        if(obj.name == "全部"){
            $scope.variablePacket.studentGradeValue = "";
        }else{
            $scope.variablePacket.studentGradeValue = obj.name;
        }
        $scope.getSchoolUser();
	}
	
	//学科的切换
	$scope.studentSubjectTab = function(i,obj){
		$scope.variablePacket.studentSubjectIndex = i;
        if(obj.name == "全部"){
            $scope.variablePacket.studentSubjectValue = "";
        }else{
            $scope.variablePacket.studentSubjectValue = obj.name;
        }
        $scope.getSchoolUser();
	}
	
	//学段的切换
	$scope.periodTab = function(i){
		$scope.variablePacket.periodIndex = i;
	}

    $("#stuYear").change(function () {
        $scope.variablePacket.yearid = $(this).val();
        $scope.getQuz();
    })


    $scope.getQuz1 = function(){
        //改变学科柱状图
            $scope.chartData = {
                "categories": ["数学", "语文", "体育", "美术", "英语", "音乐", "信息技术", "品德", "科学", "综合实践", "地方课", "物理", "政治", "心理", "历史", "生物", "地理", "化学", "品德发展", "兴趣养成", "身心发展", "思想品德", "生命教育", "通用技术", "技术", "劳技", "人文", "校本课程", "语言", "健康", "社会", "人文与社会", "品德与社会", "物联网"],
                "ytitle": "数量",
                "data": [{
                    'color':'#e06978',
                    "data": [54611, 42339, 33358, 29864, 29771, 29522, 28728, 27972, 26885,26542, 26057, 13992, 13961, 13943, 3868, 3687, 3594, 3323, 1791, 1771, 1551, 1479, 1091, 840, 637, 618, 574, 540, 483, 333, 298, 287, 168, 166]
                }]
            };
            chart_column('#changeSubjectColumn',  $scope.chartData.categories,  $scope.chartData.ytitle,  $scope.chartData.data);
            $scope.typeData = [{"dataThead":[{"name":"数学"},{"name":"语文"},{"name":"体育"},{"name":"美术"},{"name":"英语"},{"name":"音乐"},{"name":"信息技术"},{"name":"品德"}],"dataTbody":[{"type":54611},{"type":42339},{"type":33358},{"type":29864},{"type":29771},{"type":29522},{"type":28728},{"type":27972}]},{"dataThead":[{"name":"科学"},{"name":"综合实践"},{"name":"地方课"},{"name":"物理"},{"name":"政治"},{"name":"心理"},{"name":"历史"},{"name":"生物"}],"dataTbody":[{"type":26885},{"type":26542},{"type":26057},{"type":13992},{"type":13961},{"type":13943},{"type":3868},{"type":3687}]},{"dataThead":[{"name":"地理"},{"name":"化学"},{"name":"品德发展"},{"name":"兴趣养成"},{"name":"身心发展"},{"name":"思想品德"},{"name":"生命教育"},{"name":"通用技术"}],"dataTbody":[{"type":3594},{"type":3323},{"type":1791},{"type":1771},{"type":1551},{"type":1479},{"type":1091},{"type":840}]},{"dataThead":[{"name":"技术"},{"name":"劳技"},{"name":"人文"},{"name":"校本课程"},{"name":"语言"},{"name":"健康"},{"name":"社会"},{"name":"人文与社会"}],"dataTbody":[{"type":637},{"type":618},{"type":574},{"type":540},{"type":483},{"type":333},{"type":298},{"type":287}]},{"dataThead":[{"name":"品德与社会"},{"name":"物联网"}],"dataTbody":[{"type":168},{"type":166}]}];
    }

    $scope.getQuz = function(){
        $http.get(resourceStatistic+'quzYear?areaId='+$scope.variablePacket.areaId+"&level="+$scope.variablePacket.level+"&stuyear="+$scope.variablePacket.yearid).success(function (data){
            if(data.code == 200){
                var categories = [];
                var quzdata = [];
                var dataThead = [];
                var dataTbody = [];

                var tablelist = [];
                angular.forEach(data.data.list,function(e,j){
                    categories.push(e.subjectName);
                    quzdata.push(e.quz);
                    dataThead.push({'name':e.subjectName});
                    dataTbody.push({'type':e.quz});
					if(j%8 == 7){
						var obj = {};
						obj.dataThead = dataThead;
						obj.dataTbody = dataTbody;
						dataThead = [];
						dataTbody = [];
						tablelist.push(obj)
					}
                })
				if(dataThead.length > 0){
                    var obj = {};
                    obj.dataThead = dataThead;
                    obj.dataTbody = dataTbody;
                    tablelist.push(obj)
				}
                //改变学科柱状图
                $scope.chartData = {
                    "categories": categories,
                    "ytitle": "数量",
                    "data": [{
                        'color':'#e06978',
                        "data": quzdata
                    }]
                };
                chart_column('#changeSubjectColumn',  $scope.chartData.categories,  $scope.chartData.ytitle,  $scope.chartData.data);
                $scope.typeData = tablelist;
            }else{
                //改变学科柱状图
                $scope.chartData = {
                    "categories": [],
                    "ytitle": "数量",
                    "data": [{
                        'color':'#e06978',
                        "data": []
                    }]
                };
                chart_column('#changeSubjectColumn',  $scope.chartData.categories,  $scope.chartData.ytitle,  $scope.chartData.data);
                $scope.typeData = [];
			}
        })
    }
	
	
	//市级的数据
	$scope.city = function() {
        $scope.changeData.type = "city";
        $scope.getQuz();

        $http.get(resourceStatistic+'areaYear?parentAreaId='+$scope.variablePacket.areaId).success(function (data){
            if(data.code == 200){
                $scope.changeData.tabledata_area = data.data.list;
                $scope.changeData.resourceCounter = data.data.count.quzCounter;
            }
        })

        $http.get(resourceStatistic+'roleYear?areaId='+$scope.variablePacket.areaId+'&stuyear='+$scope.variablePacket.yearid).success(function (data){
            if(data.code == "200"){
                var tlevelArr = new Array();

                var totalsmall = 0;
                var totalmiddle = 0;
                var totalhigh = 0;
                var totalchild = 0;

                var teacherTotal = 0;
                var stuTotal = 0;
                var parentTotal = 0;

                var data1 = new Array();
                var data2 = new Array();
                var data3 = new Array();
                var data4 = new Array();

                var set1 = new Set();
                var set2 = new Set();
                angular.forEach(data.data.list,function(e3,k){
                    set1.add(e3.levelId);
                    set2.add(e3.levelName);
                })
                var arr1 = [];
                var arr2 = [];
                for (var x of set1) { // 遍历Set
                    if(x == "level_1"){
                        arr1[0] = x;
                    }
                    if(x == "level_2"){
                        arr1[1] = x;
                    }
                    if(x == "level_3"){
                        arr1[2] = x;
                    }
                    if(x == "level_0"){
                        arr1[3] = x;
                    }
                }
                for (var x of set2) { // 遍历Set
                    if(x == "小学"){
                        arr2[0] = x;
                    }
                    if(x == "初中"){
                        arr2[1] = x;
                    }
                    if(x == "高中"){
                        arr2[2] = x;
                    }
                    if(x == "幼儿园"){
                        arr2[3] = x;
                    }
                }
                levelArr = arr1;
                levelNameArr = arr2;

                angular.forEach(roleTypeArr,function(e1,i){
                    var roleType = e1;
                    var obj = {};
                    angular.forEach(levelArr,function(e2,j){
                        var levelId = e2;
                        angular.forEach(data.data.list,function(e3,k){
                            var tlevelId = e3.levelId;
                            var tlevelName = e3.levelName;
                            var trolename = e3.rolename;
                            var troleType = e3.roleType;
                            var tresource = e3.quz;
                            if(roleType == troleType && levelId == tlevelId){
                                obj.name = trolename;
                                var color = "";
                                if("1" == roleType){
                                    color = "#46a2d2";
                                }
                                if("2" == roleType){
                                    color = "#f46765";
                                }
                                if("3" == roleType){
                                    color = "#f4b242";
                                }
                                if(levelId == "level_1"){
                                    obj.small = tresource;
                                    totalsmall += parseInt(tresource)

                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data1.push(temp);

                                }
                                if(levelId == "level_2"){
                                    obj.middle = tresource;
                                    totalmiddle += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data2.push(temp);
                                }
                                if(levelId == "level_3"){
                                    obj.high = tresource;
                                    totalhigh += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data3.push(temp);
                                }
                                if(levelId == "level_0"){
                                    obj.child = tresource;
                                    totalchild += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data4.push(temp);
                                }
                            }
                        })
                    })
                    if(i == 0){
                        if (typeof (obj.small) != "undefined") {
                            teacherTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            teacherTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            teacherTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            teacherTotal += obj.child;
                        }
                    }
                    if(i == 1){
                        if (typeof (obj.small) != "undefined") {
                            stuTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            stuTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            stuTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            stuTotal += obj.child;
                        }
                    }
                    if(i == 2){
                        if (typeof (obj.small) != "undefined") {
                            parentTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            parentTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            parentTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            parentTotal += obj.child;
                        }
                    }
                    tlevelArr.push(obj);
                })

                $scope.changeData.total = teacherTotal + stuTotal + parentTotal;
                $scope.changeData.tabledata_user = [{"name":"教师","total":teacherTotal},{"name":"学生","total":stuTotal},{"name":"家长","total":parentTotal}];
            }
        })
	};



	
	//区县级的数据
	$scope.county = function() {
        $scope.changeData.type = "county";

        $scope.getQuz();

        $scope.changeData.resourceCounter = 0;
        $http.get(resourceStatistic+'areaYear?parentAreaId='+$scope.variablePacket.areaId).success(function (data){
            if(data.code == 200){
                $scope.changeData.tabledata_area = data.data.list;
                $scope.changeData.resourceCounter = data.data.count.quzCounter;
            }
        })


        $http.get(resourceStatistic+'roleYear?areaId='+$scope.variablePacket.areaId+'&stuyear='+$scope.variablePacket.yearid).success(function (data){
            if(data.code == "200"){
                var tlevelArr = new Array();

                var totalsmall = 0;
                var totalmiddle = 0;
                var totalhigh = 0;
                var totalchild = 0;

                var teacherTotal = 0;
                var stuTotal = 0;
                var parentTotal = 0;

                var data1 = new Array();
                var data2 = new Array();
                var data3 = new Array();
                var data4 = new Array();

                var set1 = new Set();
                var set2 = new Set();
                angular.forEach(data.data.list,function(e3,k){
                    set1.add(e3.levelId);
                    set2.add(e3.levelName);
                })
                var arr1 = [];
                var arr2 = [];
                for (var x of set1) { // 遍历Set
                    if(x == "level_1"){
                        arr1[0] = x;
                    }
                    if(x == "level_2"){
                        arr1[1] = x;
                    }
                    if(x == "level_3"){
                        arr1[2] = x;
                    }
                    if(x == "level_0"){
                        arr1[3] = x;
                    }
                }
                for (var x of set2) { // 遍历Set
                    if(x == "小学"){
                        arr2[0] = x;
                    }
                    if(x == "初中"){
                        arr2[1] = x;
                    }
                    if(x == "高中"){
                        arr2[2] = x;
                    }
                    if(x == "幼儿园"){
                        arr2[3] = x;
                    }
                }
                levelArr = arr1;
                levelNameArr = arr2;

                angular.forEach(roleTypeArr,function(e1,i){
                    var roleType = e1;
                    var obj = {};
                    angular.forEach(levelArr,function(e2,j){
                        var levelId = e2;
                        angular.forEach(data.data.list,function(e3,k){
                            var tlevelId = e3.levelId;
                            var tlevelName = e3.levelName;
                            var trolename = e3.rolename;
                            var troleType = e3.roleType;
                            var tresource = e3.quz;
                            if(roleType == troleType && levelId == tlevelId){
                                obj.name = trolename;
                                var color = "";
                                if("1" == roleType){
                                    color = "#46a2d2";
                                }
                                if("2" == roleType){
                                    color = "#f46765";
                                }
                                if("3" == roleType){
                                    color = "#f4b242";
                                }
                                if(levelId == "level_1"){
                                    obj.small = tresource;
                                    totalsmall += parseInt(tresource)

                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data1.push(temp);

                                }
                                if(levelId == "level_2"){
                                    obj.middle = tresource;
                                    totalmiddle += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data2.push(temp);
                                }
                                if(levelId == "level_3"){
                                    obj.high = tresource;
                                    totalhigh += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data3.push(temp);
                                }
                                if(levelId == "level_0"){
                                    obj.child = tresource;
                                    totalchild += parseInt(tresource)
                                    var temp = {};
                                    temp.name = trolename;
                                    temp.y = tresource;
                                    temp.color = color;
                                    data4.push(temp);
                                }
                            }
                        })
                    })
                    if(i == 0){
                        if (typeof (obj.small) != "undefined") {
                            teacherTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            teacherTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            teacherTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            teacherTotal += obj.child;
                        }
                    }
                    if(i == 1){
                        if (typeof (obj.small) != "undefined") {
                            stuTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            stuTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            stuTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            stuTotal += obj.child;
                        }
                    }
                    if(i == 2){
                        if (typeof (obj.small) != "undefined") {
                            parentTotal += obj.small;
                        }
                        if (typeof (obj.middle) != "undefined") {
                            parentTotal += obj.middle;
                        }
                        if (typeof (obj.high) != "undefined") {
                            parentTotal += obj.high;
                        }
                        if (typeof (obj.child) != "undefined") {
                            parentTotal += obj.child;
                        }
                    }
                    tlevelArr.push(obj);
                })

                // $scope.changeData.total = teacherTotal + stuTotal + parentTotal;
                // $scope.changeData.tabledata_user = [{"name":"教师","total":teacherTotal},{"name":"学生","total":stuTotal},{"name":"家长","total":parentTotal}];
            }
        })

	};
	
	
	//学校的数据
	$scope.school = function() {
        $scope.changeData.type = 'school';
        $scope.getQuz();

		$scope.changeData = {
			'type':'school',
			//用户，年级，学科数据
			'lineData':{
				'user' : [{'name':'教师',"id":"1"},{'name':'学生',"id":"2"},{'name':'家长',"id":"3"}],
				'grade' : [],
				'subject' : []
			},
			//资源量统计表-按区县
			'tabledata_area':[
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 0,
				},{
					'id':1,
					"name": "学生",
					"totle": 0,
				},{
					'id':2,
					"name": "家长",
					"totle": 0,
				}
			],
		};

        $http.get(jeucIps+'ea/api/statistics/eaOffice?officeId='+$scope.variablePacket.areaId).success(function (data){
            if(data.ret == 200){
                $scope.variablePacket.studentGradeIndex = 0;
                $scope.variablePacket.studentSubjectIndex = 0;
                $scope.variablePacket.studentUserIndex = 0;
                $scope.variablePacket.studentUserValue = "1";
                $scope.variablePacket.studentGradeValue = "";
                $scope.variablePacket.studentSubjectValue = "";

                var subjectList = data.data.subjectList;
                var gradeList = data.data.gradeList;
                subjectList.unshift({"name":"全部"})
                gradeList.unshift({"name":"全部"})
                $scope.changeData.lineData.grade = gradeList;
                $scope.changeData.lineData.subject = subjectList;

                var schoolLevelList = data.data.schoolLevelList;


                $scope.variablePacket.xueduanrange = data.data.schoolLevelList;
            }
        })
        $scope.getSchoolUser();
	};


	$rootScope.breadNav = function(i){

        if(scope > i){
            return ;
        }

	    var type = "";
        var area = {"areaname":"牡丹江市","areaId":"231000"};
	    if(i == 2){

        $scope.variablePacket.xueduanrange = [{
            "id": "level_1",
            "name": "小学"
        }, {
            "id": "level_2",
            "name": "初中"
        }, {
            "id": "level_3",
            "name": "高中"
        }, {
            "id": "level_5",
            "name": "教育局"
        }];

            $scope.variablePacket.personalData = false;
            $scope.variablePacket.name = area.areaname;

            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $rootScope.variableGlobal.crumbs.countynav = false;

            $rootScope.variableGlobal.crumbs.cityname = area.areaname;
            $rootScope.variableGlobal.crumbs.citynav = true;
            $scope.variableGlobal.crumbs.cityId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;
            $scope.variablePacket.cityarea = area;
            $scope.city();
        }
        if(i == 3){
            type = "city";
            area = $scope.variablePacket.countyarea;
        }
        if(i == 4){
            type = "county";
            area = $scope.variablePacket.schoolarea;
        }
        if(type=='city'){
            $scope.variablePacket.xueduanrange = [{
                "id": "level_1",
                "name": "小学"
            }, {
                "id": "level_2",
                "name": "初中"
            }, {
                "id": "level_3",
                "name": "高中"
            }];

            $scope.variablePacket.personalData = false;
            $scope.variablePacket.name = area.areaname;

            $rootScope.variableGlobal.crumbs.schoolnav = false;

            $rootScope.variableGlobal.crumbs.countyname = area.areaname;
            $rootScope.variableGlobal.crumbs.countynav = true;
            $scope.variableGlobal.crumbs.countyId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;
            $scope.variablePacket.countyarea = area;

            $scope.county()
        }else if(type=='county'){

            $scope.variablePacket.personalData = true;
            $scope.variablePacket.name = area.areaname;

            $rootScope.variableGlobal.crumbs.schoolname = area.areaname;
            $rootScope.variableGlobal.crumbs.schoolnav = true;
            $scope.variableGlobal.crumbs.officeCode = area.areaId;
            $scope.variableGlobal.crumbs.officeId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;
            $scope.variablePacket.schoolarea = area;

            $scope.school();
        }
    }

    $scope.getSchoolUser = function () {
        if($scope.variablePacket.studentUserValue == 1){
            $http.get(jeucIps+'ea/api/eaClassTeach/findTeaInforByAll?gradeName='+$scope.variablePacket.studentGradeValue+'&courseName='+$scope.variablePacket.studentSubjectValue+'&schoolId='+$scope.variablePacket.areaId).success(function (data){
                if(data.status == 200){
                    var userList = data.data;
                    $http.get(resourceStatistic+'userYear?areaId='+$scope.variablePacket.areaId+'&userType='+$scope.variablePacket.studentUserValue).success(function (data){
                        if(data.code == 200){
                            var userdata = [];
                            var resourceCounter = 0;
                            angular.forEach(userList,function(e1,i){
                                var obj = {"quz":"0","areaname":e1.teacherName};
                                $.each(data.data.list,function(i,n){
                                    if (e1.teacherId == n.userId) {
                                        obj.quz = n.quz;
                                        resourceCounter += n.quz;
                                        return false;
                                    }
                                });
                                userdata.push(obj)
                            })
                            $scope.changeData.tabledata_area = userdata;
                            $scope.changeData.resourceCounter = resourceCounter;
                        }
                    })
                }
            })
        }
        if($scope.variablePacket.studentUserValue == 2){
            $http.get(jeucIps+'ea/api/userStatistic/findUserListByOId?gradeName='+$scope.variablePacket.studentGradeValue+'&schoolId='+$scope.variablePacket.areaId+'&&userType='+$scope.variablePacket.studentUserValue).success(function (data){
                if(data.ret == 200){
                    var userList = data.data.list;
                    $http.get(resourceStatistic+'userYear?areaId='+$scope.variablePacket.areaId+'&userType='+$scope.variablePacket.studentUserValue).success(function (data){
                        if(data.code == 200){
                            var userdata = [];
                            var resourceCounter = 0;
                            angular.forEach(userList,function(e1,i){
                                var obj ={
                                    "name": e1.realName,
                                    'class':e1.className,
                                    "totle": 0,
                                };
                                $.each(data.data.list,function(i,n){
                                    if (e1.id == n.userId) {
                                        obj.totle = n.quz;
                                        resourceCounter += n.quz;
                                        return false;
                                    }
                                });
                                userdata.push(obj)
                            })
                            $scope.changeData.tabledata_area = userdata;
                            $scope.changeData.resourceCounter = resourceCounter;
                        }
                    })
                }
            })
        }
        if($scope.variablePacket.studentUserValue == 3){
            $http.get(jeucIps+'ea/api/userStatistic/findUserListByOId?gradeName='+$scope.variablePacket.studentGradeValue+'&schoolId='+$scope.variablePacket.areaId+'&&userType='+$scope.variablePacket.studentUserValue).success(function (data){
                if(data.ret == 200){
                    var userList = data.data.list;
                    $http.get(resourceStatistic+'userYear?areaId='+$scope.variablePacket.areaId+'&userType='+$scope.variablePacket.studentUserValue).success(function (data){
                        if(data.code == 200){
                            var userdata = [];
                            var resourceCounter = 0;
                            angular.forEach(userList,function(e1,i){
                                var obj ={
                                    "name": e1.realname,
                                    'class':e1.className,
                                    "totle": 0,
                                };
                                $.each(data.data.list,function(i,n){
                                    if (e1.id == n.userId) {
                                        obj.totle = n.quz;
                                        resourceCounter += n.quz;
                                        return false;
                                    }
                                });
                                userdata.push(obj)
                            })
                            $scope.changeData.tabledata_area = userdata;
                            $scope.changeData.resourceCounter = resourceCounter;
                        }
                    })
                }
            })
        }

    }
	
	
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.changeData.tabledata_area;
		vm.tabledata_user = $scope.changeData.tabledata_user;
		vm.OptionsOne = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[1,'desc']//第一个不排序,默认降序
		}
		vm.OptionsTwo = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0,1], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[2,'desc']//第一个不排序,默认降序
		}
		//按区县表格里的点击事件
		$scope.findNext = function(i,type){
			if(type=='city'){
				$scope.variablePacket.personalData = false;
				$scope.variablePacket.name = i.areaname;

                $rootScope.variableGlobal.crumbs.countyname = i.areaname;
                $rootScope.variableGlobal.crumbs.countynav = true;
                $scope.variableGlobal.crumbs.countyId = i.areaId;
                $scope.variablePacket.areaId = i.areaId;
                $scope.variablePacket.countyarea = i;

				$scope.county()
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
			}else if(type=='county'){
				$scope.variablePacket.personalData = true;
				$scope.variablePacket.name = i.areaname;

                $rootScope.variableGlobal.crumbs.schoolname = i.areaname;
                $rootScope.variableGlobal.crumbs.schoolnav = true;
                $scope.variableGlobal.crumbs.officeCode = i.areaId;
                $scope.variableGlobal.crumbs.officeId = i.areaId;
                $scope.variablePacket.areaId = i.areaId;
                $scope.variablePacket.schoolarea = i;

                $scope.changeData.tabledata_area = [];
                $scope.changeData.resourceCounter = [];

				$scope.school();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
			}else{
				// if($scope.variablePacket.studentUserIndex==0){
				// 	$state.go('secondNav.personalResources',{'user':'teacher'});
				// }else{
				// 	$state.go('secondNav.personalResources',{'user':'student'});
				// }
			}
		}
		
		//用户的切换
		$scope.studentUserTab = function(i,obj){
			$scope.variablePacket.studentUserIndex = i;
			if(i!=0){
				$scope.variablePacket.tabIndex = -1;
			}else{
				$scope.variablePacket.tabIndex = 0;
			}
			vm.tabledata_area = $scope.changeData.tabledata_area;
			vm.tabledata_user = $scope.changeData.tabledata_user;

            $scope.changeData.tabledata_area = [];

            $scope.variablePacket.studentGradeIndex = 0;
            $scope.variablePacket.studentSubjectIndex = 0;
            $scope.variablePacket.studentGradeValue = "";
            $scope.variablePacket.studentSubjectValue = "";

            $scope.variablePacket.studentUserValue = obj.id;
            $scope.getSchoolUser();
		}
	});


    var str = sessionStorage.getItem('managerSearch');
    var jsonO = $.parseJSON( str );
    var scope = jsonO.scope;
    if(scope == 2){

        $scope.variablePacket.personalData = false;
        $scope.variablePacket.name = jsonO.cityName;

        $rootScope.variableGlobal.crumbs.cityname = jsonO.cityName;
        $rootScope.variableGlobal.crumbs.citynav = true;
        $scope.variablePacket.areaId = jsonO.cityId;
        $scope.changeData.type = "city";
        if(scope == 2){
            $scope.city();
        }
    }
    if(scope == 3){

        $scope.variablePacket.personalData = false;
        $scope.variablePacket.name = jsonO.countyName;

        $rootScope.variableGlobal.crumbs.countyname = jsonO.countyName;
        $rootScope.variableGlobal.crumbs.countynav = true;
        $scope.variablePacket.areaId = jsonO.countyId;
        $scope.changeData.type = "county";

        $scope.variablePacket.countyarea = {"areaId":$scope.variablePacket.areaId,"areaname":jsonO.countyName};

        if(scope == 3){
            $scope.county();
        }
    }
    if(scope == 4){

        $scope.variablePacket.personalData = true;
        $scope.variablePacket.name = jsonO.officeName;

        $rootScope.variableGlobal.crumbs.schoolname = jsonO.officeName;
        $rootScope.variableGlobal.crumbs.schoolnav = true;
        $scope.variablePacket.areaId = jsonO.officeCode;
        $scope.changeData.type = "school";

        $scope.variablePacket.schoolarea = {"areaId":$scope.variablePacket.areaId,"areaname":jsonO.officeName};

        if(scope == 4){
            $scope.school();
        }
    }
	
}]);

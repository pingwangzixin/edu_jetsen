app.controller('resourcesUploadCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,$stateParams) {



	//变量包 
    $scope.variablePacket = {
    	changeColor:true,//表格第一列文字是否变蓝色
		studyIfShow:false, //学段收起展开的切换
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
		periodIndex:6,//按学科-学段切换的索引
        areaId:"", //区域
        yearid:"",
        cityarea:{},
        countyarea:{},
        schoolarea:{},
		levelSelect:"level_1",
        levelJson:[{"id":"level_1","name":"小学"},{"id":"level_2","name":"初中"},{"id":"level_3","name":"高中"},{"id":"level_0","name":"幼儿园"}],
        tableArea:{
            "resourceCounter":0,
            'tabledata_area':[
            ]},
        tableArea:{tabledata_user:[{"name":"教师","total":""},{"name":"学生","total":""},{"name":"家长","total":""}]},
        type:"city",
        getStuYearList:[{"name":"全部","id":""},{"name":"2018年","id":"2018"},{"name":"2017年","id":"2017"},{"name":"2016年","id":"2016"}]
    };

    //资源统计接口
    var resourceStatistic = interfaceIpAddr+"/resource/";



	var levelArr = new Array("level_1","level_2","level_3","level_0");
    var levelNameArr = new Array("小学","初中","高中","幼儿园");
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



    $rootScope.breadNav = function(i){
        $scope.variablePacket.switchIndex = 0;
        $scope.variablePacket.periodIndex = "6";

        if(scope > i){
            return ;
        }

        var type = "";
        var area = {"areaname":"牡丹江市","areaId":"231000"};
        if(i == 2){
            $scope.variablePacket.personalData = false;
            $scope.variablePacket.name = area.areaname;

            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $rootScope.variableGlobal.crumbs.countynav = false;

            $rootScope.variableGlobal.crumbs.cityname = area.areaname;
            $rootScope.variableGlobal.crumbs.citynav = true;
            $scope.variableGlobal.crumbs.cityId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;
            $scope.variablePacket.cityarea = area;

            $scope.variablePacket.type = "city";
            $scope.variablePacket.cityarea = area;
            $scope.city();

        }
        if(i == 3){
            type = "city";
            area = $scope.variablePacket.countyarea;

            $scope.variablePacket.type = "county";
        }
        if(i == 4){
            type = "county";
            area = $scope.variablePacket.schoolarea;
            $scope.variablePacket.type = "school";
        }
        $scope.variablePacket.areaId = area.areaId;
        if(type=='city'){
            $scope.variablePacket.personalData = false;
            $scope.variablePacket.name = area.areaname;

            $rootScope.variableGlobal.crumbs.schoolnav = false;

            $rootScope.variableGlobal.crumbs.countyname = area.areaname;
            $rootScope.variableGlobal.crumbs.countynav = true;
            $scope.variableGlobal.crumbs.countyId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;

            $scope.variablePacket.type = "county"
            // $scope.init(i.areaId);
            $scope.city();

        }else if(type=='county'){
            $scope.variablePacket.personalData = true;
            $scope.variablePacket.name = area.areaname;
            $scope.school();

            $rootScope.variableGlobal.crumbs.schoolname = area.areaname;
            $rootScope.variableGlobal.crumbs.schoolnav = true;
            $scope.variableGlobal.crumbs.officeCode = area.areaId;
            $scope.variableGlobal.crumbs.officeId = area.areaId;
            $scope.variablePacket.areaId = area.areaId;

            $scope.variablePacket.type = "school"


        }else{
            // if($scope.variablePacket.studentUserIndex==0){
            //     $state.go('secondNav.personalResources',{'user':'teacher'});
            // }else{
            //     $state.go('secondNav.personalResources',{'user':'student'});
            // }
        }
    }

	
	//学段收起展开的切换
	$scope.studyIfShow = function(){
		$scope.variablePacket.studyIfShow = !$scope.variablePacket.studyIfShow;
	}
	
	//类型收起展开的切换
	$scope.typeIfShow = function(){
		$scope.variablePacket.typeIfShow = !$scope.variablePacket.typeIfShow; 
	}
	
	//按类型和按学科切换
	$scope.switchTab = function(i){
		$scope.variablePacket.switchIndex = i;
		if(i==0){
			$timeout(function() {
				$scope.changeTypeColumn();
			}, 1000)
		}else if(i==1){
			$timeout(function() {
				$scope.changeSubjectColumn();
			}, 1000)
		}
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
	$scope.periodTab = function(i,obj){
		$scope.variablePacket.periodIndex = i;

		var level = "";
		if(obj != ""){
            level = obj.id;
        }

        $http.get(resourceStatistic+'resourceYear?areaId='+$scope.variablePacket.areaId+"&level="+level).success(function (data){
            var subjArr = [];
            var subjNum = [];
            var subjlist = [];
            if(data.code == 200){

                var subjTempArr = [];
                var subjTempNum = [];

                angular.forEach(data.data.list,function(e,j){
                    subjTempArr.push(e.subjectName);
                    subjTempNum.push(e.counter);
                    if(j%8 == 7){
                        var obj = {};
                        obj.subjTempArr = subjTempArr;
                        obj.subjTempNum = subjTempNum;
                        subjTempArr = [];
                        subjTempNum = [];
                        subjlist.push(obj);
                    }
                    subjArr.push(e.subjectName);
                    subjNum.push(e.counter);
                })
                if(subjTempArr.length > 0){
                    var obj = {};
                    obj.subjTempArr = subjTempArr;
                    obj.subjTempNum = subjTempNum;
                    // tablelist.push(obj)
                }
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;

            }else{
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;
            }
            $scope.changeSubjectColumn();
        })


	}

    $scope.chartData = {
        "categories": ["文档", "视频", "音频", "PDF", "EXCEL", "图片", "微课", "其他"],
        "ytitle": "数量",
        "data": [{
            'color':'#46a2d2',
            "data": [0, 0, 0, 0, 0, 0,0,0]
        }]
    };

    $scope.columnBarArr = {
        "target": ".columnBar",
        "categories": levelNameArr,
        "data": [{
            "data": [{
                "y": 0,
                "color": "#48bd7e"
            }, {
                "y": 0,
                "color": "#48bd7e"
            }, {
                "y": 0,
                "color": "#48bd7e"
            }, {
                "y": 0,
                "color": "#48bd7e"
            }]
        }],
        "labels": true
    };


    $scope.pieSolidArr = {
        "target": ".pieSolid",
        "title": "",
        "enabled":true,
        "data": [{
            type: 'pie',
            data: [
                {
                    'name':'教师',
                    'y':0,
                    'color':'#46a2d2',
                },
                {
                    'name':'学生',
                    'y':0,
                    'color':'#f46765',
                },
                {
                    'name':'家长',
                    'y':0,
                    'color':'#f4b242',
                },
            ]
        }],
        "labels": true
    };


    //横向柱状图
    $scope.columnBar = function(){
        chart_column_bar($scope.columnBarArr);
    };
    //实心饼图
    $scope.pieSolid = function(){
        pie_solid($scope.pieSolidArr)
    };



    //按类型柱状图
    $scope.changeTypeColumn = function() {
        chart_column('#changeTypeColumn', $scope.chartData.categories, $scope.chartData.ytitle, $scope.chartData.data);
    };


    //按学科柱状图
    $scope.changeSubjectColumn = function() {
        chart_column('#changeSubjectColumn', $scope.subjData.categories, $scope.subjData.ytitle, $scope.subjData.data);
    };

	//市级的数据
	$scope.city = function() {

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
                            var tresource = e3.resource;
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

                $scope.variablePacket.teacherTotal = teacherTotal;
                $scope.variablePacket.stuTotal = stuTotal;
                $scope.variablePacket.parentTotal = parentTotal;
                $scope.variablePacket.total = teacherTotal + stuTotal + parentTotal;
                $scope.variablePacket.tableArea.tabledata_user = [{"name":"教师","total":teacherTotal},{"name":"学生","total":stuTotal},{"name":"家长","total":parentTotal}];

                var data = new Array();
                var temarr = [];
                var dataThead = [{'name':'学段'}];

                var obj = {};

                angular.forEach(levelArr,function(e,i){
                    if(i == 0){
                        $scope.variablePacket.levelSelect = e+"";
                    }
                    if(e == "level_1"){
                        obj.small = totalsmall;
                        data.push({"y":obj.small,"color":"#48bd7e"})
                        temarr.push({"id":"level_1","name":"小学"})
                        dataThead.push({'name':'小学'});

                    }
                    if(e == "level_2"){
                        obj.middle = totalmiddle;
                        data.push({"y":obj.middle,"color":"#48bd7e"})
                        temarr.push({"id":"level_2","name":"初中"})
                        dataThead.push({'name':'初中'});

                    }
                    if(e == "level_3"){
                        obj.high = totalhigh;
                        data.push({"y":obj.high,"color":"#48bd7e"})
                        temarr.push({"id":"level_3","name":"高中"})
                        dataThead.push({'name':'高中'});

                    }
                    if(e == "level_0"){
                        obj.child = totalchild;
                        data.push({"y":obj.child,"color":"#48bd7e"})
                        temarr.push({"id":"level_0","name":"幼儿园"})
                        dataThead.push({'name':'幼儿园'});
                    }
                })


                obj.name = "共计";
                tlevelArr.unshift(obj);
                $scope.variablePacket.levelJson = temarr;
                $scope.changeData.studyData.dataTbody = tlevelArr;
                $scope.changeData.studyData.dataThead = dataThead;


                $scope.columnBarArr.data[0].data = data;
                $scope.columnBarArr.categories = levelNameArr;


                $scope.mapObj = new Map();
                $scope.mapObj.set("level_1", data1);
                $scope.mapObj.set("level_2", data2);
                $scope.mapObj.set("level_3", data3);
                $scope.mapObj.set("level_0", data4);
                $scope.pieSolidArr.data[0].data = $scope.mapObj.get('level_1');
                $scope.columnBar();
                $scope.pieSolid();
            }
        })


        $http.get(resourceStatistic+'resourceTypeYear?areaId='+$scope.variablePacket.areaId).success(function (data){
            if(data.code == 200){
                var subjectArr = [];
                var subjectNum = [];
                angular.forEach(data.data.list,function(e,j){
                    subjectArr.push(e.name);
                    subjectNum.push(e.count);
                })
                $scope.chartData.categories = subjectArr;
                $scope.chartData.data[0].data = subjectNum;
                $scope.datanum = subjectNum;
                $scope.changeTypeColumn();
            }
        })


        $http.get(resourceStatistic+'resourceYear?areaId='+$scope.variablePacket.areaId).success(function (data){
            var subjArr = [];
            var subjNum = [];
            var subjlist = [];
            if(data.code == 200){

                var subjTempArr = [];
                var subjTempNum = [];

                angular.forEach(data.data.list,function(e,j){
                    subjTempArr.push(e.subjectName);
                    subjTempNum.push(e.counter);
                    if(j%8 == 7){
                        var obj = {};
                        obj.subjTempArr = subjTempArr;
                        obj.subjTempNum = subjTempNum;
                        subjTempArr = [];
                        subjTempNum = [];
                        subjlist.push(obj);
                    }
                    subjArr.push(e.subjectName);
                    subjNum.push(e.counter);
                })
                if(subjTempArr.length > 0){
                    var obj = {};
                    obj.subjTempArr = subjTempArr;
                    obj.subjTempNum = subjTempNum;
                    // tablelist.push(obj)
                }
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;

            }else{
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;
            }
        })


        $http.get(resourceStatistic+'areaYear?parentAreaId='+$scope.variablePacket.areaId).success(function (data){
            if(data.code == 200){
                $scope.variablePacket.tableArea.tabledata_area = data.data.list;
                $scope.variablePacket.tableArea.resourceCounter = data.data.count.resourceCounter;
            }
        })




        $scope.subjData = {
            "categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
            "ytitle": "数量",
            "data": [{
                'color':'#46a2d2',
                "data": [0,0,0,0,0,0,0,0]
            }]
        };


		//数据汇总
		$scope.changeData = {
			//类型
			'type':'city',
			//资源量统计图-表格
			'studyData':{
				'dataThead' : [{'name':'学段'},{'name':'小学'},{'name':'初中'},{'name':'高中'},{'name':'幼儿园'}],
				'dataTbody' : [
					{'name':'共计','small':1,'middle':0,"high":0,"child":0,"post":0},
					{'name':'教师','small':0,'middle':0,"high":0,"child":0,"post":0},
					{'name':'学生','small':0,'middle':0,"high":0,"child":0,"post":0},
					{'name':'家长','small':0,'middle':0,"high":0,"child":0,"post":0},

				],
			},
			//按类型表格数据
			'typeData':{
				'dataThead' : [{'name':'类型'},{'name':'文档'},{'name':'视频'},{'name':'音频'},{'name':'PDF'},{'name':'EXCEL'},{'name':'图片'},{'name':'微课'},{'name':'其他'}],
				'dataTbody' : [
					{'name':'资源量','type1':310,'type2':310,"type3":310,"type4":310,"type5":310,"type6":310,"type7":310,"type8":310},
				],
			},
			//按学科表格数据
			'subjectData':{
				'dataThead' : [{'name':'学科'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
				'dataTbody' : [
					{'name':'资源量','type1':310,'type2':310,"type3":310,"type4":310,"type5":310,"type6":310,"type7":310,"type8":310},
				],
			},
			'period':[{'name':'全部1'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
			//资源量统计表-按区县
			'tabledata_area':[
				{
					'id':0,
					"name": "市直属",
					"totle": 84,
				},{
					'id':1,
					"name": "西安区",
					"totle": 10,
				},{
					'id':2,
					"name": "东安区",
					"totle": 54,
				},{
					'id':3,
					"name": "林口县",
					"totle": 63,
				}
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 54,
				},{
					'id':1,
					"name": "学生",
					"totle": 2,
				},{
					'id':2,
					"name": "家长",
					"totle": 7,
				}
			]
		};
	};
	
	//区县级的数据
	$scope.county = function() {
		//横向柱状图
		$scope.columnBar = function(){
			var columnBarArr = {
				"target": ".columnBar",
				"categories": ["小学", "初中", "高中", "幼儿园", "职业院校"],
				"data": [{
					"data": [{
						"y": 109,
						"color": "#48bd7e"
					}, {
						"y": 101,
						"color": "#48bd7e"
					}, {
						"y": 11,
						"color": "#48bd7e"
					}, {
						"y": 14,
						"color": "#48bd7e"
					}, {
						"y": 9,
						"color": "#48bd7e"
					}]
				}],
				"labels": true
			};
		    chart_column_bar(columnBarArr);
		};
		//实心饼图
		$scope.pieSolid = function(){
			var pieSolidArr = {
				"target": ".pieSolid",
				"title": "",
				"enabled":false,
				"data": [{
					type: 'pie',
					data: [
						{
							'name':'教师',
							'y':80,
							'color':'#46a2d2',
						},
						{
							'name':'学生',
							'y':20,
							'color':'#f46765',
						},
						{
							'name':'家长',
							'y':30,
							'color':'#f4b242',
						},
					]
				}],
				"labels": true
			};
			pie_solid(pieSolidArr)
		};
		//按类型柱状图
		$scope.changeTypeColumn = function() {
			var chartData = {
				"categories": ["文档", "视频", "音频", "PDF", "EXCEL", "图片", "微课", "其他"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [45, 22, 88, 46, 85, 66,87,99]
				}]
			};
			chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//按学科柱状图
		$scope.changeSubjectColumn = function() {
			var chartData = {
				"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [99,71,16,96,5,66,87,45]
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//数据汇总
		$scope.changeData = {
			'type':'county',
			//资源量统计图-表格
			'studyData':{
				'dataThead' : [{'name':'学段'},{'name':'小学'},{'name':'初中'},{'name':'高中'},{'name':'幼儿园'},{'name':'职业院校'}],
				'dataTbody' : [
					{'name':'教师','small':320,'middle':320,"high":320,"child":320,"post":320},
					{'name':'学生','small':320,'middle':320,"high":320,"child":320,"post":320},
					{'name':'家长','small':320,'middle':320,"high":320,"child":320,"post":320},
				],
			},
			//按类型表格数据
			'typeData':{
				'dataThead' : [{'name':'类型'},{'name':'文档'},{'name':'视频'},{'name':'音频'},{'name':'PDF'},{'name':'EXCEL'},{'name':'图片'},{'name':'微课'},{'name':'其他'}],
				'dataTbody' : [
					{'name':'资源量','type1':325,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			//按学科表格数据
			'subjectData':{
				'dataThead' : [{'name':'学科'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
				'dataTbody' : [
					{'name':'资源量','type1':325,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			'period':[{'name':'全部2'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
			//资源量统计表-按区县
			'tabledata_area':[
				{
					'id':0,
					"name": "实验中学",
					"totle": 33,
				},{
					'id':1,
					"name": "第一中学",
					"totle": 12,
				},{
					'id':2,
					"name": "第二中学",
					"totle": 42,
				},{
					'id':3,
					"name": "第三中学",
					"totle":5,
				}
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 460,
				},{
					'id':1,
					"name": "学生",
					"totle": 40,
				},{
					'id':2,
					"name": "家长",
					"totle": 60,
				}
			],
		};

	};
	
	
	//学校的数据
	$scope.school = function() {

        $scope.variablePacket.tableArea.tabledata_area = [];
        $scope.variablePacket.tableArea.resourceCounter = [];
        $scope.subjData = {
            "categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
            "ytitle": "数量",
            "data": [{
                'color':'#46a2d2',
                "data": [0,0,0,0,0,0,0,0]
            }]
        };

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
                            var tresource = e3.resource;
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

                $scope.variablePacket.teacherTotal = teacherTotal;
                $scope.variablePacket.stuTotal = stuTotal;
                $scope.variablePacket.parentTotal = parentTotal;
                $scope.variablePacket.total = teacherTotal + stuTotal + parentTotal;
                $scope.variablePacket.tableArea.tabledata_user = [{"name":"教师","total":teacherTotal},{"name":"学生","total":stuTotal},{"name":"家长","total":parentTotal}];

                var data = new Array();
                var temarr = [];
                var dataThead = [{'name':'学段'}];

                var obj = {};

                angular.forEach(levelArr,function(e,i){
                    if(i == 0){
                        $scope.variablePacket.levelSelect = e+"";
                    }
                    if(e == "level_1"){
                        data.push({"y":obj.small,"color":"#48bd7e"})
                        temarr.push({"id":"level_1","name":"小学"})
                        dataThead.push({'name':'小学'});
                        obj.small = totalsmall;
                    }
                    if(e == "level_2"){
                        data.push({"y":obj.middle,"color":"#48bd7e"})
                        temarr.push({"id":"level_2","name":"初中"})
                        dataThead.push({'name':'初中'});
                        obj.middle = totalmiddle;
                    }
                    if(e == "level_3"){
                        data.push({"y":obj.high,"color":"#48bd7e"})
                        temarr.push({"id":"level_3","name":"高中"})
                        dataThead.push({'name':'高中'});
                        obj.high = totalhigh;
                    }
                    if(e == "level_0"){
                        data.push({"y":obj.child,"color":"#48bd7e"})
                        temarr.push({"id":"level_0","name":"幼儿园"})
                        dataThead.push({'name':'幼儿园'});
                        obj.child = totalchild;
                    }
                })


                obj.name = "共计";
                tlevelArr.unshift(obj);
                $scope.variablePacket.levelJson = temarr;
                $scope.changeData.studyData.dataTbody = tlevelArr;
                $scope.changeData.studyData.dataThead = dataThead;


                $scope.columnBarArr.data[0].data = data;
                $scope.columnBarArr.categories = levelNameArr;


                $scope.mapObj = new Map();
                $scope.mapObj.set("level_1", data1);
                $scope.mapObj.set("level_2", data2);
                $scope.mapObj.set("level_3", data3);
                $scope.mapObj.set("level_0", data4);
                $scope.variablePacket.levelSelect = $scope.variablePacket.levelJson[0].id;
                $scope.pieSolidArr.data[0].data = $scope.mapObj.get($scope.variablePacket.levelJson[0].id);
                $scope.columnBar();
                $scope.pieSolid();
            }
        })


        $http.get(resourceStatistic+'resourceTypeYear?areaId='+$scope.variablePacket.areaId).success(function (data){
            if(data.code == 200){
                var subjectArr = [];
                var subjectNum = [];
                angular.forEach(data.data.list,function(e,j){
                    subjectArr.push(e.name);
                    subjectNum.push(e.count);
                })
                $scope.chartData.categories = subjectArr;
                $scope.chartData.data[0].data = subjectNum;
                $scope.datanum = subjectNum;
                $scope.changeTypeColumn();
            }
        })


        $http.get(resourceStatistic+'resourceYear?areaId='+$scope.variablePacket.areaId).success(function (data){
            var subjArr = [];
            var subjNum = [];

            var subjlist = [];
            if(data.code == 200){
                var subjTempArr = [];
                var subjTempNum = [];

                angular.forEach(data.data.list,function(e,j){
                    subjTempArr.push(e.subjectName);
                    subjTempNum.push(e.counter);
                    if(j%8 == 7){
                        var obj = {};
                        obj.subjTempArr = subjTempArr;
                        obj.subjTempNum = subjTempNum;
                        subjTempArr = [];
                        subjTempNum = [];
                        subjlist.push(obj);
                    }
                    subjArr.push(e.subjectName);
                    subjNum.push(e.counter);
                })
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;

            }else{
                $scope.subjData.categories = subjArr;
                $scope.subjData.data[0].data = subjNum;
                $scope.subjData.subjlist = subjlist;
            }
        })



		//数据汇总
		$scope.changeData = {
			'type':'school',
			//资源量统计图-表格
			'studyData':{
				dataTbody : [
					{'name':'教师','num':320},
					{'name':'学生','num':302},
					{'name':'家长','num':310},
				],
			},
			//用户，年级，学科数据
			'lineData':{
				'user' : [{'name':'教师',"id":"1"},{'name':'学生',"id":"2"},{'name':'家长',"id":"3"}],
				'grade' : [],
				'subject' : []
			},
			//资源量统计表-按区县
			'tabledata_area':[
			],
            resourceCounter:0
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
            }
        })

        $scope.getSchoolUser();


	};

    $scope.levelClick = function(){
        var level = $scope.variablePacket.levelSelect;
        $scope.pieSolidArr.data[0].data = $scope.mapObj.get(level);
        $scope.pieSolid();
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
                                var obj = {"resource":"0","areaname":e1.teacherName};
                                $.each(data.data.list,function(i,n){
                                    if (e1.teacherId == n.userId) {
                                        obj.resource = n.resource;
                                        resourceCounter += n.resource;
                                        return false;
                                    }
                                });
                                userdata.push(obj)
                            })
                            $scope.variablePacket.tableArea.tabledata_area = userdata;
                            $scope.variablePacket.tableArea.resourceCounter = resourceCounter;
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
                                        obj.totle = n.resource;
                                        resourceCounter += n.resource;
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
                                        obj.totle = n.resource;
                                        resourceCounter += n.resource;
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
			paging: false,
			info: false,
			searching: false, 
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0,1],
				orderable: false
			}],
			order:[2,'desc']
		}
		//按区县表格里的点击事件
		$scope.findNext = function(i,type){

            $scope.variablePacket.switchIndex = 0;

            $scope.variablePacket.periodIndex = "6";

            $scope.variablePacket.areaId = i.areaId;
			if(type=='city'){
				$scope.variablePacket.personalData = false;
				$scope.variablePacket.changeColor = true;
				$scope.variablePacket.name = i.areaname;

                $rootScope.variableGlobal.crumbs.countyname = i.areaname;
                $rootScope.variableGlobal.crumbs.countynav = true;
                $scope.variableGlobal.crumbs.countyId = i.areaId;
                $scope.variablePacket.areaId = i.areaId;
                $scope.variablePacket.countyarea = i;

                $scope.variablePacket.type = "county"
                // $scope.init(i.areaId);
				$scope.city();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
			}else if(type=='county'){
				$scope.variablePacket.personalData = true;
				$scope.variablePacket.changeColor = false;
				$scope.variablePacket.name = i.areaname;

				$scope.school();
				
				
                $rootScope.variableGlobal.crumbs.schoolname = i.areaname;
                $rootScope.variableGlobal.crumbs.schoolnav = true;
                $scope.variableGlobal.crumbs.officeCode = i.areaId;
                $scope.variableGlobal.crumbs.officeId = i.areaId;
                $scope.variablePacket.areaId = i.areaId;
                $scope.variablePacket.schoolarea = i;

                $scope.variablePacket.type = "school"

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

            $scope.variablePacket.studentGradeIndex = 0;
            $scope.variablePacket.studentSubjectIndex = 0;
            $scope.variablePacket.studentGradeValue = "";
            $scope.variablePacket.studentSubjectValue = "";

            $scope.variablePacket.studentUserValue = obj.id;
            $scope.getSchoolUser();
		}





        $timeout(function() {



            $("#level").change(function () {
                var level = $(this).val();
                $scope.pieSolidArr.data[0].data = $scope.mapObj.get(level);
                $timeout(function() {
                    $scope.pieSolid();
                }, 1000)

            });

            $("#stuYear").change(function () {
                $scope.variablePacket.yearid = $(this).val();
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
                                    var tresource = e3.resource;
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





                        $scope.variablePacket.teacherTotal = teacherTotal;
                        $scope.variablePacket.stuTotal = stuTotal;
                        $scope.variablePacket.parentTotal = parentTotal;
                        $scope.variablePacket.total = teacherTotal + stuTotal + parentTotal;
                        $scope.variablePacket.tableArea.tabledata_user = [{"name":"教师","total":teacherTotal},{"name":"学生","total":stuTotal},{"name":"家长","total":parentTotal}];

                        var data = new Array();
                        var temarr = [];
                        var dataThead = [{'name':'学段'}];

                        var obj = {};

                        angular.forEach(levelArr,function(e,i){
                            if(i == 0){
                                $scope.variablePacket.levelSelect = e;
                            }
                            if(e == "level_1"){
                                obj.small = totalsmall;
                                data.push({"y":obj.small,"color":"#48bd7e"})
                                temarr.push({"id":"level_1","name":"小学"})
                                dataThead.push({'name':'小学'});

                            }
                            if(e == "level_2"){
                                obj.middle = totalmiddle;
                                data.push({"y":obj.middle,"color":"#48bd7e"})
                                temarr.push({"id":"level_2","name":"初中"})
                                dataThead.push({'name':'初中'});

                            }
                            if(e == "level_3"){
                                obj.high = totalhigh;
                                data.push({"y":obj.high,"color":"#48bd7e"})
                                temarr.push({"id":"level_3","name":"高中"})
                                dataThead.push({'name':'高中'});

                            }
                            if(e == "level_0"){
                                obj.child = totalchild;
                                data.push({"y":obj.child,"color":"#48bd7e"})
                                temarr.push({"id":"level_0","name":"幼儿园"})
                                dataThead.push({'name':'幼儿园'});

                            }
                        })


                        obj.name = "共计";
                        tlevelArr.unshift(obj);
                        $scope.variablePacket.levelJson = temarr;
                        $scope.changeData.studyData.dataTbody = tlevelArr;
                        $scope.changeData.studyData.dataThead = dataThead;


                        $scope.columnBarArr.data[0].data = data;
                        $scope.columnBarArr.categories = levelNameArr;


                        $scope.mapObj = new Map();
                        $scope.mapObj.set("level_1", data1);
                        $scope.mapObj.set("level_2", data2);
                        $scope.mapObj.set("level_3", data3);
                        $scope.mapObj.set("level_0", data4);
                        $scope.pieSolidArr.data[0].data = $scope.mapObj.get('level_1');

                        $scope.pieSolid();
                        $scope.columnBar();
                    }
                })

            });
        }, 1000)


	});


    var str = sessionStorage.getItem('managerSearch');
    var jsonO = $.parseJSON( str );
    var scope = jsonO.scope;
    if(scope == 2){

        $scope.variablePacket.personalData = false;
        $scope.variablePacket.name = jsonO.cityName;

        $rootScope.variableGlobal.crumbs.cityname = jsonO.cityName;
        $rootScope.variableGlobal.crumbs.citynav = true;
        $scope.variableGlobal.crumbs.cityId = jsonO.cityId;
        $scope.variablePacket.areaId = jsonO.cityId;
        $scope.variablePacket.type = "city";
        if(scope == 2){
            $scope.city()

        }

    }
    if(scope == 3){

        $scope.variablePacket.personalData = false;
        $scope.variablePacket.name = jsonO.countyName;

        $rootScope.variableGlobal.crumbs.countyname = jsonO.countyName;
        $rootScope.variableGlobal.crumbs.countynav = true;
        $scope.variableGlobal.crumbs.countyId = jsonO.countyId;
        $scope.variablePacket.areaId = jsonO.countyId;
        $scope.variablePacket.type = "county";

        $scope.variablePacket.countyarea = {"areaId":$scope.variablePacket.areaId,"areaname":jsonO.countyName};

        if(scope == 3){
            $scope.city()

        }
    }
    if(scope == 4){

        $scope.variablePacket.personalData = true;
        $scope.variablePacket.name = jsonO.officeName;

        $rootScope.variableGlobal.crumbs.schoolname = jsonO.officeName;
        $rootScope.variableGlobal.crumbs.schoolnav = true;
        $scope.variableGlobal.crumbs.officeCode = jsonO.officeCode;
        $scope.variableGlobal.crumbs.officeId = jsonO.officeId;
        $scope.variablePacket.areaId = jsonO.officeCode;
        $scope.variablePacket.type = "school";

        $scope.variablePacket.schoolarea = {"areaId":$scope.variablePacket.areaId,"areaname":jsonO.officeName};

        if(scope == 4){
            $scope.school()

        }
    }


    //判断个人资源详情页面返回调用的数据
    // if($stateParams.tableData == "person"){
    //     // $scope.school();
    //     $scope.variablePacket.personalData = true;
    //     $timeout(function() {
    //         $scope.pieSolid();
    //         $scope.changeTypeColumn();
    //     }, 300)
    // }else{
    //     // $scope.city();
    //     $scope.variablePacket.personalData = false;
    //     // $timeout(function() {
    //     //     $scope.columnBar();
    //     //     $scope.pieSolid();
    //     //     $scope.changeTypeColumn();
    //     // }, 300)
    // }

}]);



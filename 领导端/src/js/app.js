var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ui.sortable', 'ui.tree', 'ng.ueditor', 'me-lazyload', 'datatables']);

app.run(['$rootScope', '$location', '$state', '$http', function($rootScope, $location, $state, $window, $http) {
	//用户在各个模块停留时间统计开始——————————————————————
	var second, startTime, endTime;
	$rootScope.$on('$viewContentLoaded', function() {
		$.ajax({
			type: "get",
			url: jeucIp + "userStatistic/getCurrentTime",
			async: false,
			success: function(res) {
				startTime = res.data.currentTime
			}
		});
	});

	function getStopTime() {
		$.ajax({
			type: "get",
			url: jeucIp + "/getCurrentTime",
			async: false,
			success: function(res) {
				endTime = res.data.currentTime
			}
		});
		var dataArr = {
			'stopTimes': (endTime - startTime) / 1000 + '秒',
			'startTime': startTime,
			'endTime': endTime
		};
		console.log(dataArr)

		$.ajax({
			type: "post",
			url: jeucIp + "behavior",
			async: false,
			data: dataArr,
			dataType: 'json',
			success: function(data) {
				console.log(data)

			}
		});
	}

	//	$rootScope.$on('$stateChangeSuccess', function() {
	//		getStopTime()
	//	});

	window.onbeforeunload = function() {
		getStopTime()
	};
	//用户在各个模块停留时间统计结束——————————————————————

	window.onload = function() {
		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 50);
		//		  history.pushState(null, null, document.URL);
		//		window.addEventListener('popstate', function() {
		//			history.pushState(null, null, document.URL);
		//		});
	}

	//全局变量
	$rootScope.variableGlobal = {
		titleBar: ['学科', '课本', '章节'], //适用于导学等模块
		libraryTitleBar: ['课本', '章', '节'] //资源库、题库习题编辑时的title（为了区别于左侧树）
	};

	//判断角色 进入我的空间
	var userType = sessionStorage.getItem('userType');

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name == 'user') { //系统管理 用户权限
			$state.go('user.teacher');
		} else if(toState.name == 'wrap.new') { //门户 新闻列表页
			$state.go('wrap.new.newList');
		} else if(toState.name == 'wrap.resources') { //门户 资源首页
			$state.go('wrap.resources.resourcesIndex');
		} else if(toState.name == 'wrap.help') { //门户 帮助列表页
			$state.go('wrap.help.helpList');
		} else if(toState.name == 'secondNav.space') { //个人空间区分教师、学生
			if(userType == 1) {
				$state.go('secondNav.space.teacherSpace');
			} else if(userType == 2) {
				$state.go('secondNav.space.studentSpace');
			}
		} else if(toState.name == 'classSpace') { //班级空间 首页
			$state.go('classSpace.classSpaceIndex');
		} else if(toState.name == 'classSpace.classMotto') { //班级空间 班训展示
			$state.go('classSpace.classMotto.classMottoShow');
		} else if(toState.name == 'classSpace.classPhoto') { //班级空间 照片列表
			$state.go('classSpace.classPhoto.classPhotoList');
		} else if(toState.name == 'classSpace.classNotice') { //班级空间 班级公告列表
			$state.go('classSpace.classNotice.classNoticeList');
		} else if(toState.name == 'classSpace.classHeadTeacher') { //班级空间 班主任介绍
			$state.go('classSpace.classHeadTeacher.classHeadTeacherShow');
		} else if(toState.name == 'classSpace.classIntroduce') { //班级空间 班级介绍
			$state.go('classSpace.classIntroduce.classIntroduceShow');
		} else if(toState.name == 'classSpace.classStarStudent') { //班级空间 明星学生
			$state.go('classSpace.classStarStudent.classStarStudentList');
		} else if(toState.name == 'schoolSpace') { //学校空间-首页
			$state.go('schoolSpace.schoolSpaceIndex');
		} else if(toState.name == 'schoolSpace.schoolMotto') { //学校空间-校训展示
			$state.go('schoolSpace.schoolMotto.schoolMottoShow');
		} else if(toState.name == 'schoolSpace.schoolIntro') { //学校空间-学校介绍展示
			$state.go('schoolSpace.schoolIntro.schoolIntroShow');
		} else if(toState.name == 'schoolSpace.schoolNews') { //学校空间-学校资讯展示
			$state.go('schoolSpace.schoolNews.schoolNewsList');
		} else if(toState.name == 'schoolSpace.schoolPhoto') { //学校空间-学校风采展示
			$state.go('schoolSpace.schoolPhoto.schoolPhotoList');
		} else if(toState.name == 'schoolSpaceShow') { //学校空间-学校空间展示
			$state.go('schoolSpace.schoolSpaceShow');
		} else if(toState.name == 'secondNav.questionBankType') { //题库——默认我的题库页面
			$state.go('secondNav.questionBankType.myQuestionBank');
		} else if(toState.name == 'secondNav.resourceType') { //资源库——默认我的资源库页面
			$state.go('secondNav.resourceType.myResource');
		} else if(toState.name == 'secondNav.guideDel') { //教师导学——默认学生情况页面
			$state.go('secondNav.guideDel.guideStudentSituation');
		} else if(toState.name == 'secondNav.studentGuideDel') { //学生导学——默认导学内容页面
			$state.go('secondNav.studentGuideDel.studentGuideContent');
		} else if(toState.name == 'secondNav.homeworkDel') { //教师作业——默认学生情况页面
			$state.go('secondNav.homeworkDel.homeworkStudentSituation');
		} else if(toState.name == 'secondNav.studentHomeworkDel') { //学生作业——默认练习内容页面
			$state.go('secondNav.studentHomeworkDel.exerciseContent');
		} else if(toState.name == 'secondNav.leftTree.resourceManage') { //领导端-资源管理-默认到资源列表页面
			$state.go('secondNav.leftTree.resourceManage.resourceManageList');
		} else if(toState.name == 'secondNav.leftTree.evaluateManage') { //领导端-评价管理-默认到评价列表页面
			$state.go('secondNav.leftTree.evaluateManage.evaluateManageList');
		} else if(toState.name == 'secondNav.leftTree.classCardWrap') { //领导端-班牌管理-默认到班风页面
			$state.go('secondNav.leftTree.classCardWrap.classCardSecondNav.classAtmosphere');
		} else if(toState.name == 'secondNav.leftTree.classCardWrap.classCardSecondNav') { //领导端-班牌管理-默认到班风页面
			$state.go('secondNav.leftTree.classCardWrap.classCardSecondNav.classAtmosphere');
		} else if(toState.name == 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap') { //领导端-资源统计-默认上传统计页面
			$state.go('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap.resourcesUpload');
		} else if(toState.name == 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap') { //领导端-评价统计-默认素质评价统计页面
			$state.go('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap.qualityEvaluate');
		}
		//		console.log(event, toState, toParams)
		//		console.log(fromState, fromParams)
	})
}]);

app.factory('UserInterceptor', ["$q", "$rootScope", function($q, $rootScope) {
	return {
		request: function(config) {
			console.log(config)
			config.headers["TOKEN"] = '12312312';
			return config;
		},
	};
}]);

app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", "$httpProvider", "$locationProvider",
	function($provide, $compileProvider, $controllerProvider, $filterProvider, $httpProvider, $locationProvider) {
		// $httpProvider.interceptors.push('UserInterceptor');
		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service = $provide.service;
		app.constant = $provide.constant;
		//转化post请求传参-------------------------------------------------
		$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		$httpProvider.defaults.transformRequest = [function(data) {
			var param = function(obj) {
				var query = '';
				var name, value, fullSubName, subName, subValue, innerObj, i;
				for(name in obj) {
					value = obj[name];
					if(value instanceof Array) {
						for(i = 0; i < value.length; ++i) {
							subValue = value[i];
							fullSubName = name + '[' + i + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if(value instanceof Object) {
						for(subName in value) {
							subValue = value[subName];
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if(value !== undefined && value !== null) {
						query += encodeURIComponent(name) + '=' +
							encodeURIComponent(value) + '&';
					}
				}
				return query.length ? query.substr(0, query.length - 1) : query;
			};
			return angular.isObject(data) && String(data) !== '[object File]' ?
				param(data) :
				data;
		}];
		//转化post请求传参------------------------------------------------------
	}
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/entry');
	$stateProvider
		.state('wrap', {
			url: "/wrap",
			templateUrl: 'tpl/wrap.html',
			controller: "wrapCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/wrapCtrl.js");
				}]
			}
		})

		//以下门户
		.state('wrap.index', { //首页
			url: "/index",
			templateUrl: 'tpl/index/index.html',
			controller: "indexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
				}]
			}
		})
		.state('login', { //登录
			url: "/login",
			templateUrl: 'tpl/index/login.html',
			controller: "indexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
				}]
			}
		})
		.state('register', { //注册
			url: "/register",
			templateUrl: 'tpl/index/register.html',
			controller: "registerCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/registerCtrl.js");
				}]
			}
		})
		.state('wrap.resources', { //资源
			url: "/resources",
			templateUrl: 'tpl/resources/resources.html',
			//			resolve: {
			//				deps: ["$ocLazyLoad", function($ocLazyLoad) {
			//					return $ocLazyLoad.load(["js/common/jwplayer-7.7.4/polyfills.base64.js", "js/common/jwplayer-7.7.4/jwplayer.js", "js/common/jwplayer-7.7.4/polyfills.promise.js", "js/common/jwplayer-7.7.4/polyfills.vttrenderer.js","js/common/jwplayer-7.7.4/provider.cast.js", "js/common/jwplayer-7.7.4/provider.caterpillar.js", "js/common/jwplayer-7.7.4/provider.flash.js", "js/common/jwplayer-7.7.4/provider.html5.js", "js/common/jwplayer-7.7.4/provider.shaka.js", "js/common/jwplayer-7.7.4/provider.youtube.js", "js/common/jwplayer-7.7.4/vttparser.js"]);
			//				}]
			//			}

		})
		.state('wrap.resources.resourcesIndex', { //资源首页
			url: "/resourcesIndex",
			templateUrl: 'tpl/resources/resourcesIndex.html',
			controller: "resourcesIndexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesIndexCtrl.js");
				}]
			}
		})
		.state('wrap.resources.resourcesSecondLevel', { //资源二级
			url: "/resourcesSecondLevel",
			templateUrl: 'tpl/resources/resourcesSecondLevel.html',
			controller: "resourcesSecondLevelCtrl",
			params: {
				'studySection': null,
				'resRea': null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesSecondLevelCtrl.js");
				}]
			}
		})
		.state('wrap.resources.resourcesDetails', { //资源详情
			url: "/resourcesDetails",
			templateUrl: 'tpl/resources/resourcesDetails.html',
			controller: "resourcesDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesDetailsCtrl.js");
				}]
			}
		})
		.state('wrap.application', { //应用
			url: "/application",
			templateUrl: 'tpl/application/application.html',
			controller: "applicationCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/application/controller/applicationCtrl.js");
				}]
			}
		})
		//多页面
		.state('wrap.new', { //消息
			url: "/new",
			templateUrl: 'tpl/news/new.html'
		})
		.state('wrap.new.newList', { //消息列表
			url: "/newList",
			templateUrl: 'tpl/news/newList.html',
			controller: "newListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/news/controller/newListCtrl.js");
				}]
			}
		})
		.state('wrap.new.newDetails', { //消息详情
			url: "/newDetails",
			templateUrl: 'tpl/news/newDetails.html',
			controller: "newDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/news/controller/newDetailsCtrl.js");
				}]
			}
		})

		//单页面
		/*.state('wrap.news',{		//消息
		    url: "/news",
		    templateUrl : 'tpl/news/news.html',
		    controller:"newsCtrl",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load("js/news/controller/newsCtrl.js");
		        }]
		    }
		})*/

		.state('wrap.help', { //帮助
			url: "/help",
			templateUrl: 'tpl/help/help.html'
		})
		.state('wrap.help.helpList', { //帮助列表
			url: "/helpList",
			templateUrl: 'tpl/help/helpList.html',
			controller: "helpListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/help/controller/helpListCtrl.js");
				}]
			}
		})
		.state('wrap.help.helpDetails', { //帮助详情
			url: "/helpDetails",
			templateUrl: 'tpl/help/helpDetails.html',
			controller: "helpDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/help/controller/helpDetailsCtrl.js");
				}]
			}
		})
		.state('wrap.RQCode', { //校讯通
			url: "/RQCode",
			templateUrl: 'tpl/schoolPaper/RQCode.html',
			controller: "RQCodeCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolPaper/controller/RQCodeCtrl.js");
				}]
			}
		})
		//门户结束

		//以下教务
		.state('organization', { //系统管理——机构管理
			url: "/organization",
			templateUrl: 'tpl/userCenter/organization.html',
			controller: "organizationCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/organizationCtrl.js");
				}]
			}
		})
		.state('role', { //系统管理——角色权限
			url: "/role",
			templateUrl: 'tpl/userCenter/role.html',
			controller: "roleCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/roleCtrl.js");
				}]
			}
		})
		.state('user', { //系统管理——用户权限
			url: "/user",
			templateUrl: 'tpl/userCenter/user.html',
			controller: "userCtrl",
			//          params : {'user' : 0},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userCtrl.js");
				}]
			}
		})
		.state('user.teacher', { //系统管理——用户权限——教师
			url: "/user_teacher",
			templateUrl: 'tpl/userCenter/user_teacher.html',
			controller: "userTeacherCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userTeacherCtrl.js");
				}]
			}
		})
		.state('user.student', { //系统管理——用户权限——学生
			url: "/user_student",
			templateUrl: 'tpl/userCenter/user_student.html',
			controller: "userStudentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userStudentCtrl.js");
				}]
			}
		})
		.state('user.parent', { //系统管理——用户权限——家长
			url: "/user_parent",
			templateUrl: 'tpl/userCenter/user_parent.html',
			controller: "userParentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userParentCtrl.js");
				}]
			}
		})
		.state('teachingMaterial', { //基础设置--教材管理
			url: "/teachingMaterial",
			templateUrl: 'tpl/basicSettings/teachingMaterial.html',
			controller: "teachingMaterialCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/teachingMaterialCtrl.js");
				}]
			}
		})
		.state('schoolManagement', { //基础设置--学校管理
			url: "/schoolManagement",
			templateUrl: 'tpl/basicSettings/schoolManagement.html',
			controller: "schoolManagementCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/schoolManagementCtrl.js");
				}]
			}
		})
		.state('classctrl', { //基础管理--班级管理
			url: "/classctrl",
			templateUrl: 'tpl/basicSettings/classctrl.html',
			controller: "classctrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/classctrl.js");
				}]
			}
		})
		.state('xuekectrl', { //基础管理--学科管理
			url: "/xuekectrl",
			templateUrl: 'tpl/basicSettings/xuekectrl.html',
			controller: "xuekectrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/xuekectrl.js");
				}]
			}
		})
		.state('classroomctrl', { //基础管理--任课管理
			url: "/classroomctrl",
			templateUrl: 'tpl/basicSettings/classRoom.html',
			controller: "classroomctrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/classroomctrl.js");
				}]
			}
		})
		.state('managerInfo', { //个人设置--管理者
			url: "/managerInfo",
			templateUrl: 'tpl/personSetting/managerInfo.html',
			controller: "managerInfoCtrl",
			params: {
				status: 0
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/personSetting/controller/managerInfoCtrl.js");
				}]
			}
		})
		.state('teacherInfo', { //个人设置--教师
			url: "/teacherInfo",
			templateUrl: 'tpl/personSetting/teacherInfo.html',
			controller: "teacherInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/personSetting/controller/teacherInfoCtrl.js");
				}]
			}
		})
		.state('parentInfo', { //个人设置--家长
			url: "/parentInfo",
			templateUrl: 'tpl/personSetting/parentInfo.html',
			controller: "parentInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/personSetting/controller/parentInfoCtrl.js");
				}]
			}
		})
		.state('studentInfo', { //个人设置--学生
			url: "/studentInfo",
			templateUrl: 'tpl/personSetting/studentInfo.html',
			controller: "studentInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/personSetting/controller/studentInfoCtrl.js");
				}]
			}
		})
		.state('successInfo', { //个人设置--修改成功
			url: "/successInfo",
			templateUrl: 'tpl/personSetting/successInfo.html',
			controller: "successInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/personSetting/controller/successInfoCtrl.js");
				}]
			}
		})
		//教务结束

		.state('secondNav', { //深蓝色导航--个人设置、我的空间等使用
			url: "/secondNav",
			templateUrl: 'tpl/secondNav.html',
			controller: "secondNavCtrl",
			params: {
				token: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/secondNavCtrl.js");
				}]
			}
		})

		//以下个人空间
		.state('secondNav.space', { //我的空间
			url: "/space",
			templateUrl: 'tpl/mySpace/space.html'
		})
		.state('secondNav.space.teacherSpace', { //我的空间--教师
			url: "/teacherSpace",
			templateUrl: 'tpl/mySpace/teacherSpace.html',
			controller: "teacherSpaceCtrl",
			params: {
				userId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/teacherSpaceCtrl.js");
				}]
			}
		})
		.state('secondNav.space.studentSpace', { //我的空间--学生
			url: "/studentSpace",
			templateUrl: 'tpl/mySpace/studentSpace.html',
			controller: "studentSpaceCtrl",
			params: {
				userId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/studentSpaceCtrl.js");
				}]
			}
		})
		.state('wrap.personalSpaceVisitor', { //个人空间--访客
			url: "/personalSpaceVisitor",
			templateUrl: 'tpl/mySpace/personalSpaceVisitor.html',
			controller: "personalSpaceVisitorCtrl",
			params: {
				'id': '',
				'type': ''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/personalSpaceVisitorCtrl.js");
				}]
			}
		})
		.state('secondNav.homePage', { //我的主页--教师学生
			url: "/homePage",
			templateUrl: 'tpl/mySpace/homePage.html',
			controller: "homePageCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/homePageCtrl.js");
				}]
			}
		})
		//个人空间结束

		//以下学校空间
		.state('schoolSpace', { //学校空间头部导航
			url: "/schoolSpace",
			templateUrl: 'tpl/schoolSpace/schoolSpace.html',
			controller: "schoolSpaceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceCtrl.js");
				}]
			}
		})

		.state('schoolSpace.schoolSpaceIndex', { //学校空间首页
			url: "/schoolSpaceIndex",
			templateUrl: 'tpl/schoolSpace/schoolSpaceIndex.html',
			controller: "schoolSpaceIndexCtrl",
			params: {
				schoolId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceIndexCtrl.js");
				}]
			}
		})
		.state('schoolSpace.schoolMotto', { //学校校训父级页面
			url: "/schoolMotto",
			templateUrl: 'tpl/schoolSpace/schoolMotto.html'
		})
		.state('schoolSpace.schoolMotto.schoolMottoShow', { //学校校训展示
			url: "/schoolMottoShow",
			templateUrl: 'tpl/schoolSpace/schoolMottoShow.html',
			controller: "schoolMottoShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolMottoShowCtrl.js");
				}]
			}
		})
		.state('schoolSpace.schoolMotto.schoolMottoEdit', { //学校校训编辑
			url: "/schoolMottoEdit",
			templateUrl: 'tpl/schoolSpace/schoolMottoEdit.html',
			controller: "schoolMottoEditCtrl",
			params: {
				'id': ''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolMottoEditCtrl.js");
				}]
			}
		})
		.state('schoolSpace.schoolIntro', { //学校介绍父级页面
			url: "/schoolIntro",
			templateUrl: 'tpl/schoolSpace/schoolIntro.html'
		})
		.state('schoolSpace.schoolIntro.schoolIntroShow', { //学校介绍展示
			url: "/schoolIntroShow",
			templateUrl: 'tpl/schoolSpace/schoolIntroShow.html',
			controller: "schoolIntroShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolIntroShowCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolIntro.schoolIntroEdit", { //学校介绍编辑
			url: "/schoolIntroEdit",
			templateUrl: "tpl/schoolSpace/schoolIntroEdit.html",
			controller: "schoolIntroEditCtrl",
			params: {
				'id': ''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolIntroEditCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolNews", { //学校资讯父级页面
			url: "/schoolNews",
			templateUrl: "tpl/schoolSpace/schoolNews.html"
		})
		.state("schoolSpace.schoolNews.schoolNewsList", { //学校资讯展示列表
			url: "/schoolNewsList",
			templateUrl: "tpl/schoolSpace/schoolNewsList.html",
			controller: "schoolNewsListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsListCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolNews.schoolNewsEdit", { //学校资讯编辑
			url: "/schoolNewsEdit",
			templateUrl: "tpl/schoolSpace/schoolNewsEdit.html",
			controller: "schoolNewsEditCtrl",
			params: {
				state: 0,
				noticeId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsEditCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolNews.schoolNewsDetails", { //学校资讯详情
			url: "/schoolNewsDetails",
			templateUrl: "tpl/schoolSpace/schoolNewsDetails.html",
			controller: "schoolNewsDetailsCtrl",
			params: {
				noticeId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsDetailsCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolPhoto", { //学校风采父级页面
			url: "/schoolPhoto",
			templateUrl: "tpl/schoolSpace/schoolPhoto.html"
		})
		.state("schoolSpace.schoolPhoto.schoolPhotoList", { //学校风采列表
			url: "/schoolPhotoList",
			templateUrl: "tpl/schoolSpace/schoolPhotoList.html",
			controller: "schoolPhotoListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoListCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolPhoto.schoolPhotoEdit", { //学校风采编辑
			url: "/schoolPhotoEdit",
			templateUrl: "tpl/schoolSpace/schoolPhotoEdit.html",
			controller: "schoolPhotoEditCtrl",
			params: {
				state: 0,
				photoId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoEditCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolPhoto.schoolPhotoDetails", { //学校风采详情
			url: "/schoolPhotoDetails",
			templateUrl: "tpl/schoolSpace/schoolPhotoDetails.html",
			controller: "schoolPhotoDetailsCtrl",
			params: {
				photoId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoDetailsCtrl.js");
				}]
			}
		})
		.state("schoolSpace.schoolSpaceShow", { //学校空间展示
			url: "/schoolSpaceShow",
			templateUrl: "tpl/schoolSpace/schoolSpaceShow.html",
			controller: "schoolSpaceShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceShowCtrl.js");
				}]
			}
		})
		//学校空间结束

		//以下班级空间
		.state('classSpace', { //班级空间头部导航
			url: "/classSpace",
			templateUrl: 'tpl/classSpace/classSpace.html',
			controller: "classSpaceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classSpaceCtrl.js");
				}]
			}
		})
		.state('classSpace.classSpaceIndex', { //班级空间首页
			url: "/classSpaceIndex",
			templateUrl: 'tpl/classSpace/classSpaceIndex.html',
			controller: "classSpaceIndexCtrl",
			params: {
				classId: null,
				cuid: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classSpaceIndexCtrl.js");
				}]
			}
		})
		.state('classSpace.classTimetables', { //课程表
			url: "/classTimetables",
			templateUrl: 'tpl/classSpace/classTimetables.html',
			controller: "classTimetablesCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classTimetablesCtrl.js");
				}]
			}
		})
		.state('classSpace.classMotto', { //班训父级页面
			url: "/classMotto",
			templateUrl: 'tpl/classSpace/classMotto.html'
		})
		.state('classSpace.classMotto.classMottoShow', { //班训展示
			url: "/classMottoShow",
			templateUrl: 'tpl/classSpace/classMottoShow.html',
			controller: "classMottoShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classMottoShowCtrl.js");
				}]
			}
		})
		.state('classSpace.classMotto.classMottoEdit', { //班训编辑
			url: "/classMottoEdit",
			templateUrl: 'tpl/classSpace/classMottoEdit.html',
			controller: "classMottoEditCtrl",
			params: {
				id: 0
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classMottoEditCtrl.js");
				}]
			}
		})
		.state('classSpace.classPhoto', { //班级照片父级页面
			url: "/classPhoto",
			templateUrl: 'tpl/classSpace/classPhoto.html'
		})
		.state('classSpace.classPhoto.classPhotoList', { //班级照片列表
			url: "/classPhotoList",
			templateUrl: 'tpl/classSpace/classPhotoList.html',
			controller: "classPhotoListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoListCtrl.js");
				}]
			}
		})
		.state('classSpace.classPhoto.classPhotoDetails', { //班级照片详情
			url: "/classPhotoDetails",
			templateUrl: 'tpl/classSpace/classPhotoDetails.html',
			controller: "classPhotoDetailsCtrl",
			params: {
				photoId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoDetailsCtrl.js");
				}]
			}
		})
		.state('classSpace.classPhoto.classPhotoEdit', { //班级照片新增、编辑
			url: "/classPhotoEdit",
			templateUrl: 'tpl/classSpace/classPhotoEdit.html',
			controller: "classPhotoEditCtrl",
			params: {
				state: 0,
				photoId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoEditCtrl.js");
				}]
			}
		})
		.state('classSpace.classNotice', { //班级公告父级页面
			url: "/classNotice",
			templateUrl: 'tpl/classSpace/classNotice.html'
		})
		.state('classSpace.classNotice.classNoticeList', { //班级公告列表
			url: "/classNoticeList",
			templateUrl: 'tpl/classSpace/classNoticeList.html',
			controller: "classNoticeListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classNoticeListCtrl.js");
				}]
			}
		})
		.state('classSpace.classNotice.classNoticeDetails', { //班级公告详情
			url: "/classNoticeDetails",
			templateUrl: 'tpl/classSpace/classNoticeDetails.html',
			controller: "classNoticeDetailsCtrl",
			params: {
				noticeId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classNoticeDetailsCtrl.js");
				}]
			}
		})
		.state('classSpace.classNotice.classNoticeEdit', { //班级公告编辑
			url: "/classNoticeEdit",
			templateUrl: 'tpl/classSpace/classNoticeEdit.html',
			controller: "classNoticeEditCtrl",
			params: {
				state: 0,
				noticeId: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classNoticeEditCtrl.js");
				}]
			}
		})
		.state('classSpace.classHeadTeacher', { //班主任介绍父级页面
			url: "/classHeadTeacher",
			templateUrl: 'tpl/classSpace/classHeadTeacher.html'
		})
		.state('classSpace.classHeadTeacher.classHeadTeacherShow', { //班主任介绍展示
			url: "/classHeadTeacherShow",
			templateUrl: 'tpl/classSpace/classHeadTeacherShow.html',
			controller: "classHeadTeacherShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classHeadTeacherShowCtrl.js");
				}]
			}
		})
		.state('classSpace.classHeadTeacher.classHeadTeacherEdit', { //班主任介绍编辑
			url: "/classHeadTeacherEdit",
			templateUrl: 'tpl/classSpace/classHeadTeacherEdit.html',
			controller: "classHeadTeacherEditCtrl",
			params: {
				id: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classHeadTeacherEditCtrl.js");
				}]
			}
		})
		.state('classSpace.classIntroduce', { //班级介绍父级页面
			url: "/classIntroduce",
			templateUrl: 'tpl/classSpace/classIntroduce.html'
		})
		.state('classSpace.classIntroduce.classIntroduceShow', { //班级介绍展示
			url: "/classIntroduceShow",
			templateUrl: 'tpl/classSpace/classIntroduceShow.html',
			controller: "classIntroduceShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classIntroduceShowCtrl.js");
				}]
			}
		})
		.state('classSpace.classIntroduce.classIntroduceEdit', { //班级介绍编辑
			url: "/classIntroduceEdit",
			templateUrl: 'tpl/classSpace/classIntroduceEdit.html',
			controller: "classIntroduceEditCtrl",
			params: {
				id: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classIntroduceEditCtrl.js");
				}]
			}
		})
		.state('classSpace.classStarStudent', { //明星学生父级页面
			url: "/classStarStudent",
			templateUrl: 'tpl/classSpace/classStarStudent.html'
		})
		.state('classSpace.classStarStudent.classStarStudentList', { //明星学生展示
			url: "/classStarStudentList",
			templateUrl: 'tpl/classSpace/classStarStudentList.html',
			controller: "classStarStudentListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classStarStudentListCtrl.js");
				}]
			}
		})
		.state('classSpace.classStarStudent.classStarStudentEdit', { //明星学生新增、编辑
			url: "/classStarStudentEdit",
			templateUrl: 'tpl/classSpace/classStarStudentEdit.html',
			controller: "classStarStudentEditCtrl",
			params: {
				state: 0,
				id: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classStarStudentEditCtrl.js");
				}]
			}
		})
		//班级空间结束

		//以下教师端资源库
		.state('secondNav.resourceType', { //我的、校本、公共资源父级
			url: "/resourceType",
			templateUrl: 'tpl/teacher/resourceLibrary/resourceType.html'
		})
		.state('secondNav.resourceType.myResource', { //我的资源
			url: "/myResource",
			templateUrl: 'tpl/teacher/resourceLibrary/myResource.html',
			controller: "myResourceCtrl",
			params: {
				item: null, //分类
				type: null, //类型
				amend: null //是否可修改
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load(["js/teacher/resourceLibrary/service/myResourceService.js", "js/teacher/resourceLibrary/controller/myResourceCtrl.js"]);
				}]
			}
		})
		.state('secondNav.resourceType.schoolBasedResource', { //校本资源
			url: "/schoolBasedResource",
			templateUrl: 'tpl/teacher/resourceLibrary/schoolBasedResource.html',
			controller: "schoolBasedResourceCtrl",
			params: {
				type: null

			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/resourceLibrary/controller/schoolBasedResourceCtrl.js");
				}]
			}
		})
		.state('secondNav.resourceType.publicResource', { //公共资源
			url: "/publicResource",
			templateUrl: 'tpl/teacher/resourceLibrary/publicResource.html',
			controller: "publicResourceCtrl",
			params: {
				type: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/resourceLibrary/controller/publicResourceCtrl.js");
				}]
			}
		})
		.state('secondNav.resourceDtealis', { //查看资源详情
			url: "/resourceDtealis",
			templateUrl: 'tpl/teacher/resourceLibrary/resourceDtealis.html',
			controller: "resourceDtealisCtrl",
			params: {
				page: null, //主路由
				item: null, //分类模块
				type: null, //文档类型
				collect: null, //收藏状态
				id: null //资源id
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/resourceLibrary/controller/resourceDtealisCtrl.js");
				}]
			}
		})
		.state('secondNav.uploadResource', { //上传资源
			url: "/uploadResource",
			templateUrl: 'tpl/teacher/resourceLibrary/uploadResource.html',
			controller: "uploadResourceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/resourceLibrary/controller/uploadResourceCtrl.js");
				}]
			}
		})
		//教师端资源库结束

		//以下教师端题库
		.state('secondNav.questionBankType', { //我的、校本、公共题库父级
			url: "/questionBankType",
			templateUrl: 'tpl/teacher/questionBank/questionBankType.html',
			controller: "questionBankTypeCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/questionBankTypeCtrl.js");
				}]
			}
		})
		.state('secondNav.questionBankType.myQuestionBank', { //我的题库
			url: "/myQuestionBank",
			templateUrl: 'tpl/teacher/questionBank/myQuestionBank.html',
			controller: "myQuestionBankCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/myQuestionBankCtrl.js");
				}]
			}
		})
		.state('secondNav.questionBankType.schoolBasedQuestionBank', { //校本题库
			url: "/schoolBasedQuestionBank",
			templateUrl: 'tpl/teacher/questionBank/schoolBasedQuestionBank.html',
			controller: "schoolBasedQuestionBankCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/schoolBasedQuestionBankCtrl.js");
				}]
			}
		})
		.state('secondNav.questionBankType.publicQuestionBank', { //公共题库
			url: "/publicQuestionBank",
			templateUrl: 'tpl/teacher/questionBank/publicQuestionBank.html',
			controller: "publicQuestionBankCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/publicQuestionBankCtrl.js");
				}]
			}
		})
		.state('secondNav.uploadExercises', { //创建试题————上传习题
			url: "/uploadExercises",
			templateUrl: 'tpl/teacher/questionBank/uploadExercises.html',
			controller: "uploadExercisesCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/uploadExercisesCtrl.js");
				}]
			}
		})
		.state('secondNav.paperLibrary', { //创建试题————题库组卷/修改题库
			url: "/paperLibrary",
			templateUrl: 'tpl/teacher/questionBank/paperLibrary.html',
			controller: "paperLibraryCtrl",
			params: {
				state: "revise" //题库组卷：test 	修改题库：revise
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/paperLibraryCtrl.js");
				}]
			}
		})
		.state('secondNav.importTestPaper', { //创建试题————导入试卷/修改试卷
			url: "/importTestPaper",
			templateUrl: 'tpl/teacher/questionBank/importTestPaper.html',
			controller: "importTestPaperCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/importTestPaperCtrl.js");
				}]
			}
		})
		.state('secondNav.testAssembly', { //查看————组卷
			url: "/testAssembly",
			templateUrl: 'tpl/teacher/questionBank/testAssembly.html',
			controller: "testAssemblyCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/testAssemblyCtrl.js");
				}]
			}
		})
		.state('secondNav.answerCard', { //查看————答题卡
			url: "/answerCard",
			templateUrl: 'tpl/teacher/questionBank/answerCard.html',
			controller: "answerCardCtrl",
			params: {
				state: 'new' //新建：new	查看及编辑：edit
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/questionBank/controller/answerCardCtrl.js");
				}]
			}
		})
		//教师端题库结束

		//以下教师端备课
		.state('secondNav.prepareLessonsList', { //备课列表
			url: "/prepareLessonsList",
			templateUrl: 'tpl/teacher/prepareLessons/prepareLessonsList.html',
			controller: "prepareLessonsListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/prepareLessons/controller/prepareLessonsListCtrl.js");
				}]
			}
		})
		.state('secondNav.prepareLessonsContent', { //创建备课/编辑备课/查看备课
			url: "/prepareLessonsContent",
			templateUrl: 'tpl/teacher/prepareLessons/prepareLessonsContent.html',
			controller: "prepareLessonsContentCtrl",
			params: {
				state: null //new:创建备课		edit:编辑备课		echo：查看备课
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/prepareLessons/controller/prepareLessonsContentCtrl.js");
				}]
			}
		})
		.state('secondNav.prepareLessonsResourcesDetails', { //资源详情(备课)
			url: "/prepareLessonsResourcesDetails",
			templateUrl: 'tpl/teacher/prepareLessons/prepareLessonsResourcesDetails.html',
			controller: "prepareLessonsResourcesDetailsCtrl",
			params: {
				item: null //列表的详细信息
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/prepareLessons/controller/prepareLessonsResourcesDetailsCtrl.js");
				}]
			}
		})
		//教师端备课结束

		//以下教师端课堂
		.state('secondNav.classroomList', { //课堂列表
			url: "/classroomList",
			templateUrl: 'tpl/teacher/classroom/classroomList.html',
			controller: "classroomListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/classroom/controller/classroomListCtrl.js");
				}]
			}
		})
		.state('secondNav.classroomDel', { //课堂内容/学生情况父级页面
			url: "/classroomDel",
			templateUrl: 'tpl/teacher/classroom/classroomDel.html',
			controller: "classroomDelCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/classroom/controller/classroomDelCtrl.js");
				}]
			}
		})
		.state('secondNav.classroomDel.classroomContent', { //课堂内容
			url: "/classroomContent",
			templateUrl: 'tpl/teacher/classroom/classroomContent.html',
			controller: "classroomContentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/classroom/controller/classroomContentCtrl.js");
				}]
			}
		})
		.state('secondNav.classroomDel.classroomStudentSituation', { //学生情况
			url: "/classroomStudentSituation",
			templateUrl: 'tpl/teacher/classroom/classroomStudentSituation.html',
			controller: "classroomStudentSituationCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/classroom/controller/classroomStudentSituationCtrl.js");
				}]
			}
		})
		.state('secondNav.returnTest', { //回传试题
			url: "/returnTest",
			templateUrl: 'tpl/teacher/classroom/returnTest.html',
			controller: "returnTestCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/classroom/controller/returnTestCtrl.js");
				}]
			}
		})
		//教师端课堂结束

		//以下学生端课堂
		.state('secondNav.studentClassroomList', { //课堂列表
			url: "/studentClassroomList",
			templateUrl: 'tpl/student/classroom/studentClassroomList.html',
			controller: "studentClassroomListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/classroom/controller/studentClassroomListCtrl.js");
				}]
			}
		})
		.state('secondNav.studentClassroomDel', { //课堂内容/课堂表现父级页面
			url: "/studentClassroomDel",
			templateUrl: 'tpl/student/classroom/studentClassroomDel.html',
			controller: "studentClassroomDelCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/classroom/controller/studentClassroomDelCtrl.js");
				}]
			}
		})
		.state('secondNav.studentClassroomDel.studentClassroomContent', { //课堂内容
			url: "/studentClassroomContent",
			templateUrl: 'tpl/student/classroom/studentClassroomContent.html',
			controller: "studentClassroomContentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/classroom/controller/studentClassroomContentCtrl.js");
				}]
			}
		})
		.state('secondNav.studentClassroomDel.classroomPerformance', { //课堂表现
			url: "/classroomPerformance",
			templateUrl: 'tpl/student/classroom/classroomPerformance.html',
			controller: "classroomPerformanceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/classroom/controller/classroomPerformanceCtrl.js");
				}]
			}
		})
		.state('secondNav.studentReturnTest', { //回传试题
			url: "/studentReturnTest",
			templateUrl: 'tpl/student/classroom/studentReturnTest.html',
			controller: "studentReturnTestCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/classroom/controller/studentReturnTestCtrl.js");
				}]
			}
		})
		//学生端课堂结束

		//以下教师端任务
		.state('secondNav.taskList', { //任务列表
			url: "/taskList",
			templateUrl: 'tpl/teacher/task/taskList.html',
			controller: "taskListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/task/controller/taskListCtrl.js");
				}]
			}
		})
		.state('secondNav.taskContent', { //布置任务/编辑任务/复制任务
			url: "/taskContent",
			templateUrl: 'tpl/teacher/task/taskContent.html',
			controller: "taskContentCtrl",
			params: {
				state: null //new:布置任务		edit:编辑任务		echo：复制任务
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/task/controller/taskContentCtrl.js");
				}]
			}
		})
		.state('secondNav.reviewTask', { //批阅查看任务
			url: "/reviewTask",
			templateUrl: 'tpl/teacher/task/reviewTask.html',
			controller: "reviewTaskCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/task/controller/reviewTaskCtrl.js");
				}]
			}
		})
		.state('secondNav.taskResourcesDetails', { //资源详情(任务)
			url: "/taskResourcesDetails",
			templateUrl: 'tpl/teacher/task/taskResourcesDetails.html',
			controller: "taskResourcesDetailsCtrl",
			params: {
				state: 'word' //word:文档	 ppt:ppt  video：视频   audio：音频  picture:图片
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/task/controller/taskResourcesDetailsCtrl.js");
				}]
			}
		})
		//教师端任务结束

		//以下学生端任务
		.state('secondNav.studentTaskList', { //任课列表
			url: "/studentTaskList",
			templateUrl: 'tpl/student/task/studentTaskList.html',
			controller: "studentTaskListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/task/controller/studentTaskListCtrl.js");
				}]
			}
		})
		.state('secondNav.taskStateContent', { //任务内容
			url: "/taskStateContent",
			templateUrl: 'tpl/student/task/taskStateContent.html',
			controller: "taskStateContentCtrl",
			params: {
				state: null //unsubmitted:未提交		submission:已提交		readyOver：已批阅
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/task/controller/taskStateContentCtrl.js");
				}]
			}
		})
		.state('secondNav.studentTaskResourcesDetails', { //资源详情(学生任务)
			url: "/studentTaskResourcesDetails",
			templateUrl: 'tpl/student/task/studentTaskResourcesDetails.html',
			controller: "studentTaskResourcesDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/task/controller/studentTaskResourcesDetailsCtrl.js");
				}]
			}
		})
		//学生端任务结束

		//以下教师端作业
		.state('secondNav.homeworkList', { //作业列表
			url: "/homeworkList",
			templateUrl: 'tpl/teacher/homework/homeworkList.html',
			controller: "homeworkListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/homework/controller/homeworkListCtrl.js");
				}]
			}
		})
		.state('secondNav.practiceContent', { //布置作业/编辑作业/复制作业
			url: "/practiceContent",
			templateUrl: 'tpl/teacher/homework/practiceContent.html',
			controller: "practiceContentCtrl",
			params: {
				state: 'new' //new:布置作业		edit:编辑作业		echo：复制作业
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/homework/controller/practiceContentCtrl.js");
				}]
			}
		})
		.state('secondNav.homeworkDel', { //学生情况、练习分析父级
			url: "/homeworkDel",
			templateUrl: 'tpl/teacher/homework/homeworkDel.html',
			controller: "homeworkDelCtrl",
			params: {
				state: null, //underWay:进行中		Finished:已结束	
				type: null //exercises:习题		testPaper:试卷		answerCard:答题卡
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/homework/controller/homeworkDelCtrl.js");
				}]
			}
		})
		.state('secondNav.homeworkDel.homeworkStudentSituation', { //学生情况
			url: "/homeworkStudentSituation",
			templateUrl: 'tpl/teacher/homework/homeworkStudentSituation.html',
			controller: "homeworkStudentSituationCtrl",
			/*params:{
				state : null,		//underWay:进行中		Finished:已结束	
				type : null			//exercises:习题		testPaper:试卷		answerCard:答题卡
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/homework/controller/homeworkStudentSituationCtrl.js");
				}]
			}
		})
		.state('secondNav.homeworkDel.practiceAnalysis', { //练习分析
			url: "/practiceAnalysis",
			templateUrl: 'tpl/teacher/homework/practiceAnalysis.html',
			controller: "practiceAnalysisCtrl",
			/*params:{
				state : null,		//underWay:进行中		Finished:已结束		
				type : null			//exercises:习题		testPaper:试卷		answerCard:答题卡
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/homework/controller/practiceAnalysisCtrl.js");
				}]
			}
		})
		//教师端作业结束

		//以下学生端作业
		.state('secondNav.studentHomeworkList', { //作业列表
			url: "/studentHomeworkList",
			templateUrl: 'tpl/student/homework/studentHomeworkList.html',
			controller: "studentHomeworkListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/homework/controller/studentHomeworkListCtrl.js");
				}]
			}
		})
		.state('secondNav.studentHomeworkDel', { //练习内容、练习分析父级
			url: "/studentHomeworkDel",
			templateUrl: 'tpl/student/homework/studentHomeworkDel.html',
			controller: "studentHomeworkDelCtrl",
			params: {
				state: null, //unsubmitted:未提交		submission:已提交		readyOver：已批阅
				type: null //exercises:习题		testPaper:试卷		answerCard:答题卡
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/homework/controller/studentHomeworkDelCtrl.js");
				}]
			}
		})
		.state('secondNav.studentHomeworkDel.exerciseContent', { //练习内容
			url: "/exerciseContent",
			templateUrl: 'tpl/student/homework/exerciseContent.html',
			controller: "exerciseContentCtrl",
			/*params:{
				state : null,		//unsubmitted:未提交		submission:已提交		readyOver：已批阅
				type : null			//exercises:习题		testPaper:试卷		answerCard:答题卡
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/homework/controller/exerciseContentCtrl.js");
				}]
			}
		})
		.state('secondNav.studentHomeworkDel.studentPracticeAnalysis', { //练习分析
			url: "/studentPracticeAnalysis",
			templateUrl: 'tpl/student/homework/studentPracticeAnalysis.html',
			controller: "studentPracticeAnalysisCtrl",
			/*params:{
				state : null,		//unsubmitted:未提交		submission:已提交		readyOver：已批阅
				type : null			//exercises:习题		testPaper:试卷		answerCard:答题卡
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/homework/controller/studentPracticeAnalysisCtrl.js");
				}]
			}
		})
		//学生端作业结束

		//以下教师端导学
		.state('secondNav.guideList', { //导学列表
			url: "/guideList",
			templateUrl: 'tpl/teacher/guidance/guideList.html',
			controller: "guideListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/guidance/controller/guideListCtrl.js");
				}]
			}
		})
		.state('secondNav.guideDel', { //学生情况/导学内容父级页面
			url: "/guideDel",
			templateUrl: 'tpl/teacher/guidance/guideDel.html',
			controller: "guideDelCtrl",
			params: {
				guidanceId: null, //导学id
				classId: null, //班级id
				state: null, //new:布置导学		edit:复制导学		echo：导学内容
				className: null, //班级名字
				resourceReturn: null //true 需要回传 	false无需回传
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/guidance/controller/guideDelCtrl.js");
				}]
			}
		})
		.state('secondNav.guideDel.guideStudentSituation', { //学生情况
			url: "/guideStudentSituation",
			templateUrl: 'tpl/teacher/guidance/guideStudentSituation.html',
			controller: "guideStudentSituationCtrl",
			/*params:{
				resourceReturn : null		//true 需要回传 	false无需回传
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/guidance/controller/guideStudentSituationCtrl.js");
				}]
			}
		})
		.state('secondNav.guideDel.guideContent', { //导学内容/布置导学/复制导学
			url: "/guideContent",
			templateUrl: 'tpl/teacher/guidance/guideContent.html',
			controller: "guideContentCtrl",
			/*params:{
				state : null,		//new:布置导学		edit:复制导学		echo：导学内容
				resourceReturn : null				//学生情况页面是否需要回传存值
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/guidance/controller/guideContentCtrl.js");
				}]
			}
		})
		//教师端导学结束

		//以下学生端导学
		.state('secondNav.studentGuideList', { //导学列表
			url: "/studentGuideList",
			templateUrl: 'tpl/student/guidance/studentGuideList.html',
			controller: "studentGuideListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/guidance/controller/studentGuideListCtrl.js");
				}]
			}
		})
		.state('secondNav.studentGuideDel', { //导学内容/回传资料父级页面
			url: "/studentGuideDel",
			templateUrl: 'tpl/student/guidance/studentGuideDel.html',
			controller: "studentGuideDelCtrl",
			params: {
				guidanceId: null, //导学id
				classId: null, //班级id
				state: null, //导学内容页面未学习、已学习状态存值
				resourceReturn: null //true 需要回传 	false无需回传
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/guidance/controller/studentGuideDelCtrl.js");
				}]
			}
		})
		.state('secondNav.studentGuideDel.studentGuideReturn', { //回传资料
			url: "/studentGuideReturn",
			templateUrl: 'tpl/student/guidance/studentGuideReturn.html',
			controller: "studentGuideReturnCtrl",
			/*params:{
				state:null,							//导学内容页面未学习、已学习状态存值
				resourceReturn : null				//是否需要回传
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/guidance/controller/studentGuideReturnCtrl.js");
				}]
			}
		})
		.state('secondNav.studentGuideDel.studentGuideContent', { //导学内容
			url: "/studentGuideContent",
			templateUrl: 'tpl/student/guidance/studentGuideContent.html',
			controller: "studentGuideContentCtrl",
			/*params:{
				state:null,			//已学习、未学习状态切换 （true，false）
				resourceReturn : null				//回传资料页面 是否需要回传
			},*/
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/guidance/controller/studentGuideContentCtrl.js");
				}]
			}
		})
		//学生端导学结束

		//以下学生端错题本
		.state('secondNav.wrongAnswerDel', { //答错的题、上传的题父级页面
			url: "/wrongAnswerDel",
			templateUrl: 'tpl/student/wrongTopicBook/wrongAnswerDel.html',
			controller: "wrongAnswerDelCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/wrongTopicBook/controller/wrongAnswerDelCtrl.js");
				}]
			}
		})
		.state('secondNav.wrongAnswerDel.wrongAnswer', { //答错的题
			url: "/wrongAnswer",
			templateUrl: 'tpl/student/wrongTopicBook/wrongAnswer.html',
			controller: "wrongAnswerCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/wrongTopicBook/controller/wrongAnswerCtrl.js");
				}]
			}
		})
		.state('secondNav.wrongAnswerDel.uploadQuestion', { //上传的题
			url: "/uploadQuestion",
			templateUrl: 'tpl/student/wrongTopicBook/uploadQuestion.html',
			controller: "uploadQuestionCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/wrongTopicBook/controller/uploadQuestionCtrl.js");
				}]
			}
		})
		.state('secondNav.wrongAnswer', { //答错的题和上传的题（同一个页面，同一个梦想）
			url: "/wrongAnswer",
			templateUrl: 'tpl/student/wrongTopicBook/wrongAnswer.html',
			controller: "wrongAnswerCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/wrongTopicBook/controller/wrongAnswerCtrl.js");
				}]
			}
		})
		//学生端错题本结束

		//领导端开始
		.state('secondNav.leftTree', { //左侧树
			url: "/leftTree",
			templateUrl: 'tpl/leaderShip/leftTree.html',
			controller: "leftTreeCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leftTreeCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.indexList', { //首页列表
			url: "/indexList",
			templateUrl: 'tpl/leaderShip/index/indexList.html',
			controller: "indexListCtrl",
			params: {
				id: null,
				userName: null,
				passWord: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/index/controller/indexListCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.indexListDetails', { //首页列表详情页
			url: "/indexListDetails",
			templateUrl: 'tpl/leaderShip/index/indexListDetails.html',
			controller: "indexListDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/index/controller/indexListDetailsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav', { //<<领导查询>>共用部分导航
			url: "/leaderInquiryNav",
			templateUrl: 'tpl/leaderShip/leaderInquiry/leaderInquiryNav.html',
			controller: "leaderInquiryNavCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/leaderInquiryNavCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.userStatisticsWrap', { //<<领导查询>>共用部分导航
			url: "/userStatisticsWrap",
			templateUrl: 'tpl/leaderShip/leaderInquiry/userStatistics/userStatisticsWrap.html',
			controller: "userStatisticsWrapCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/userStatistics/userStatisticsWrapCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.userStatisticsWrap.userStatistics', { //领导查询————用户统计————注册用户统计
			url: "/userStatistics",
			templateUrl: 'tpl/leaderShip/leaderInquiry/userStatistics/registeredUser/userStatistics.html',
			controller: "userStatisticsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/userStatistics/registeredUser/controller/userStatisticsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.userStatisticsWrap.userAnalysis', { //领导查询————用户统计————用户行为分析
			url: "/userAnalysis",
			templateUrl: 'tpl/leaderShip/leaderInquiry/userStatistics/userBehavior/userAnalysis.html',
			controller: "userAnalysisCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/userStatistics/userBehavior/controller/userAnalysisCtrl.js");
				}]
			}
		})

		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav', { //领导查询————教学统计导航页
			url: "/teachingStatisticsNav",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/teachingStatisticsNav.html',
			controller: "teachingStatisticsNavCtrl",
			params: {

			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/teachingStatisticsNavCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap', { //领导查询————教学统计————资源统计————上传教师、下发统计父级页
			url: "/resourcesStatisticsWrap",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/resources/resourcesStatisticsWrap.html'
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap.resourcesUpload', { //领导查询————教学统计————资源统计————上传
			url: "/resourcesUpload",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/resources/resourcesUpload.html',
			params: {
				tableData: null, //person:个人，
			},
			controller: "resourcesUploadCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/resources/controller/resourcesUploadCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap.resourcesGrant', { //领导查询————教学统计————资源统计————下发
			url: "/resourcesGrant",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/resources/resourcesGrant.html',
			controller: "resourcesGrantCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/resources/controller/resourcesGrantCtrl.js");
				}]
			}
		})
		.state('secondNav.personalResources', { //领导查询————教学统计————资源统计————个人资源详情
			url: "/personalResources",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/resources/personalResources.html',
			controller: "personalResourcesCtrl",
			params: {
				user: null, //teacher:教师，student：学生，
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/resources/controller/personalResourcesCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.testQuestions', { //领导查询————教学统计————试题统计
			url: "/testQuestions",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/testQuestions/testQuestions.html',
			controller: "testQuestionsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/testQuestions/controller/testQuestionsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.classroom', { //领导查询————教学统计————课堂统计
			url: "/classroom",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/classroom/classroom.html',
			controller: "classroomCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/classroom/controller/classroomCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.homework', { //领导查询————教学统计————作业统计
			url: "/homework",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/homework/homework.html',
			controller: "homeworkCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/homework/controller/homeworkCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap', { //领导查询————教学统计————评价统计————综合评价统计/素质评价统计父级页
			url: "/evaluateWrap",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/evaluate/evaluateWrap.html',
			controller: "evaluateWrapCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/evaluate/controller/evaluateWrapCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap.comprehensiveEvaluate', { //领导查询————教学统计————评价统计————综合评价统计
			url: "/comprehensiveEvaluate",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/evaluate/comprehensiveEvaluate.html',
			controller: "comprehensiveEvaluateCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/evaluate/controller/comprehensiveEvaluateCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap.qualityEvaluate', { //领导查询————教学统计————评价统计————素质评价统计
			url: "/qualityEvaluate",
			templateUrl: 'tpl/leaderShip/leaderInquiry/teachingStatistics/evaluate/qualityEvaluate.html',
			controller: "qualityEvaluateCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/teachingStatistics/evaluate/controller/qualityEvaluateCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap', { //领导查询————教研统计————活动统计、教案统计父级
			url: "/researchStatisticsWrap",
			templateUrl: 'tpl/leaderShip/leaderInquiry/researchStatistics/researchStatisticsWrap.html',
			controller: "researchStatisticsWrapCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/researchStatistics/researchStatisticsWrapCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap.activeStatistics', { //领导查询————教研统计————活动统计
			url: "/activeStatistics",
			templateUrl: 'tpl/leaderShip/leaderInquiry/researchStatistics/activity/activeStatistics.html',
			controller: "activeStatisticsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/researchStatistics/activity/controller/activeStatisticsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap.teachingStatistics', { //领导查询————教研统计————教案统计
			url: "/teachingStatistics",
			templateUrl: 'tpl/leaderShip/leaderInquiry/researchStatistics/teachingCase/teachingStatistics.html',
			controller: "teachingStatisticsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/leaderInquiry/researchStatistics/teachingCase/controller/teachingStatisticsCtrl.js");
				}]
			}
		})
		.state('entry', { //登录
			url: "/entry",
			templateUrl: 'tpl/leaderShip/entry.html',
			controller: "entryCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/entryCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.resourceManage', { //领导查询————教学管理————资源管理、审核精品、资源详情父级
			url: "/resourceManage",
			templateUrl: 'tpl/leaderShip/teachingManagement/resourceManage.html'
		})
		.state('secondNav.leftTree.resourceManage.resourceManageList', { //领导查询————教学管理————资源管理列表
			url: "/resourceManageList",
			templateUrl: 'tpl/leaderShip/teachingManagement/resourceManageList.html',
			controller: "resourceManageListCtrl",
			params: {
				resources: null, //资源
				sort: null, //排序
				format: null, //格式
				fine: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/resourceManageListCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.resourceManage.examineFine', { //领导查询————教学管理————审核精品列表
			url: "/examineFine",
			templateUrl: 'tpl/leaderShip/teachingManagement/examineFine.html',
			controller: "examineFineCtrl",
			params: {
				sort: null, //排序
				format: null, //格式
				fine: null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/examineFineCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.resourceManageResourcesDetails', { //领导查询————教学管理————资源详情（教学管理）
			url: "/resourceManageResourcesDetails",
			templateUrl: 'tpl/leaderShip/teachingManagement/resourceManageResourcesDetails.html',
			controller: "resourceManageResourcesDetailsCtrl",
			params: {
				page: null, //主路由
				resources: null, //资源
				format: null, //格式
				sort: null, //排序
				resouceId: null, //资源id
				fine: null //校精品
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/resourceManageResourcesDetailsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.evaluateManage', { //领导查询————教学管理————评价管理列表、评价标准详情父级
			url: "/evaluateManage",
			templateUrl: 'tpl/leaderShip/teachingManagement/evaluateManage.html'
		})
		.state('secondNav.leftTree.evaluateManage.evaluateManageList', { //领导查询————教学管理————评价管理列表
			url: "/evaluateManageList",
			templateUrl: 'tpl/leaderShip/teachingManagement/evaluateManageList.html',
			controller: "evaluateManageListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/evaluateManageListCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.evaluateManage.evaluateRelease', { //领导查询————教学管理————评价管理列表————下发评价
			url: "/evaluateRelease",
			templateUrl: 'tpl/leaderShip/teachingManagement/evaluateRelease.html',
			controller: "evaluateReleaseCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/evaluateReleaseCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.evaluateManage.standardAdd', { //领导查询————教学管理————评价管理列表————添加标准
			url: "/standardAdd",
			templateUrl: 'tpl/leaderShip/teachingManagement/standardAdd.html',
			controller: "standardAddCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/standardAddCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.evaluateManage.evaluateCriterionDetails', { //领导查询————教学管理————评价标准详情
			url: "/evaluateCriterionDetails",
			templateUrl: 'tpl/leaderShip/teachingManagement/evaluateCriterionDetails.html',
			controller: "evaluateCriterionDetailsCtrl",
			params: {
				id: null, //数据id
				gradeName: null, //年级名称
				subjectName: null, //学科名称
				content: null, //内容
				term: null, //学期
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/teachingManagement/controller/evaluateCriterionDetailsCtrl.js");
				}]
			}
		})
		//班牌管理开始 
		.state('secondNav.leftTree.classCardWrap', { //班牌管理--（班级/学习）导航
			url: "/classCardWrap",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classCardWrap.html',
			controller: "classCardWrapCtrl",
			params: {
				range: null, //进入的角色--school是学校管理权限 	 class是班主任权限
				nav: null, //控制学校和班级导航切换--school是学校管理导航 		class是班主任导航
				type: null, //控制类型切换--scholl是学校管理导航 		class是班主任导航
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classCardWrapCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav', { //班牌管理--二级分类
			url: "/classCardSecondNav",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classCardSecondNav.html',
			controller: "classCardSecondNavCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classCardSecondNavCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.classAtmosphere', { //班风/校训
			url: "/classAtmosphere",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classAtmosphere.html',
			controller: "classAtmosphereCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classAtmosphereCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.classNotice', { //班务公示
			url: "/classNotice",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classNotice.html',
			controller: "classNoticeCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classNoticeCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.headmasterIntroduce', { //班主任介绍
			url: "/headmasterIntroduce",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/headmasterIntroduce.html',
			controller: "headmasterIntroduceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/headmasterIntroduceCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.classIntroduce', { //班级介绍/学校简介
			url: "/classIntroduce",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classIntroduce.html',
			controller: "classIntroduceCtrl",
			params: {
				type: null, //scholl是学校 	 class是班主任
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classIntroduceCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.starStudent', { //明星学生
			url: "/starStudent",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/starStudent.html',
			controller: "starStudentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/starStudentCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.classActivity', { //特色活动/学校活动
			url: "/classActivity",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classActivity.html',
			controller: "classActivityCtrl",
			params: {
				type: null //scholl是学校 	 class是班主任
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classActivityCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.classCardWrap.classCardSecondNav.classDemeanor', { //班级风采/校园风采
			url: "/classDemeanor",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/classDemeanor.html',
			controller: "classDemeanorCtrl",
			params: {
				type: null, //scholl是学校 	 class是班主任
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/classDemeanorCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.DemeanorEdit', { //创建/编辑风采
			url: "/DemeanorEdit",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/DemeanorEdit.html',
			controller: "DemeanorEditCtrl",
			params: {
				state: null, //scholl是学校 	 class是班主任
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/DemeanorEditCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.DemeanorDetails', { //风采详情
			url: "/DemeanorDetails",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/DemeanorDetails.html',
			controller: "DemeanorDetailsCtrl",
			params: {
				state: null, //scholl是学校 	 class是班主任
				power: null, //school校管理员进入班级 class班主任进入班级
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/DemeanorDetailsCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.publicEdit', { //班务公示编辑，特色活动的创建/编辑，学校活动创建/编辑
			url: "/publicEdit",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/publicEdit.html',
			controller: "publicEditCtrl",
			params: {
				name: 'establish', //establish:创建    edit:编辑
				state: 'classNotice' //classNotice：班务公示  classActivity：特色活动   schoolActivity：学校活动
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/publicEditCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.publicDetails', { //班务公示详情/特色活动详情/学校活动详情
			url: "/publicDetails",
			templateUrl: 'tpl/leaderShip/educationalAdministration/classCard/publicDetails.html',
			controller: "publicDetailsCtrl",
			params: {
				id: null, //传递列表id
				title: null, //传递列表标题
				state: 'classNotice' //classNotice:班务公示详情 classActivity：特色活动 schoolActivity：学校活动
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/classCard/controller/publicDetailsCtrl.js");
				}]
			}
		})
		//班牌管理结束

		//排课管理开始
		.state('secondNav.leftTree.timetable', { //排课跳转页
			url: "/timetable",
			templateUrl: 'tpl/leaderShip/educationalAdministration/timeTable/timetable.html',
			controller: "timetableCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/timeTable/controller/timetableCtrl.js");
				}]
			}
		})
		//排课管理结束

		//安全管理开始
		.state('secondNav.leftTree.publicNav', { //<<领导查询>>共用部分导航
			url: "/publicNav",
			templateUrl: 'tpl/leaderShip/educationalAdministration/safe/publicNav.html',
			controller: "publicNavCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/safe/controller/publicNavCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.publicNav.safeIndex', { //安全管理-首页
			url: "/safeIndex",
			templateUrl: 'tpl/leaderShip/educationalAdministration/safe/safeIndex.html',
			controller: "safeIndexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/safe/controller/safeIndexCtrl.js");
				}]
			}
		})
		.state('secondNav.leftTree.publicNav.safeMore', { //安全管理-更多
			url: "/safeMore",
			templateUrl: 'tpl/leaderShip/educationalAdministration/safe/safeMore.html',
			controller: "safeMoreCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/leaderShip/educationalAdministration/safe/controller/safeMoreCtrl.js");
				}]
			}
		})
	//安全管理结束

	//领导端结束

}]);

//图片加载失败替换
app.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if(attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
});

//底部
/*app.directive('zFooter', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			content: '='
		},
		template: '<footer><p><span>主办：北京捷成世纪科技股份有限公司</span><span>承办：北京捷成世纪科技股份有限公司</span><span>技术支持：北京捷成世纪科技股份有限公司</span></p><p>Copyright©2014-2017jetsen.com.cn All Rights Reserved</p></footer>',
		link: function(scope, element, attrs) {
			
		}
	}
});*/

//底部新
app.directive('zFooter', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			content: '='
		},
		template: '<footer class="footer_end"><p>©Copyright 2004-2018 北京捷成世纪科技股份有限公司 保留所有权利</p><p>京ICP证 05020513号 - 京公网安备 11010802011761 - Designed by Jetsen</p><p class="zy_support">技术支持：北京捷成世纪科技股份有限公司&nbsp; &nbsp;<img src="./img/jetsen_logo.png"></p><p class="jx_bottom_fw mt10"><a href="http://www.12377.cn/" target="_blank"><img src="http://www.jxeduyun.com/App.ResourceCloud/Src/apps/changyan/_static/common/images/jx_footer_pic01.png" alt="不良信息举报中心"></a><a href="http://www.cyberpolice.cn/wfjb/" target="_blank"><img src="http://www.jxeduyun.com/App.ResourceCloud/Src/apps/changyan/_static/common/images/jx_footer_pic02.png" alt="网络110报警服务"></a></p></footer>',
		link: function(scope, element, attrs) {
			//			
		}
	}
});

//人数统计
app.directive('zScore', function($timeout, $http) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			cont: '=cont'
		},
		template: '<div class="z_numlist"><ul><li ng-repeat="i in length track by $index"><div class="ullist"><p>0</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p></div></li></ul></div>',
		link: function(scope, element, attrs) {
			//      	console.log(element)
			//      	$timeout(function (){
			/*console.log(scope.cont)
            	scope.cont.fontSize = scope.cont.fontSize ? scope.cont.fontSize : 24;
            	scope.length = new Array(scope.cont.num.toString().length);*/
			//      	});
			//			console.log($watch)

			/*var aaa = scope.$watch(function(newValue,oldValue){
//              vm.name = $scope.name;
//				console.log(newValue,oldValue)
				return scope.cont; 
            },function (){
//          	console.log(scope.cont)
            });*/
			//			console.log(aaa)
			$http.get(requireIp + "jeuc/api/sys/userStatistics/findUserAmount?areaId=360200").success(function(data) {
				console.log("人数")
				console.log(data.data);
				if(scope.cont.p == "tot") {
					scope.cont.num = data.data.amount;
				} else if(scope.cont.p == "tea") {
					scope.cont.num = data.data.teacherAmount;
				} else if(scope.cont.p == "stu") {
					scope.cont.num = data.data.studentAmount;
				} else if(scope.cont.p == "par") {
					scope.cont.num = data.data.parentAmount;
				}
				scope.cont.fontSize = scope.cont.fontSize ? scope.cont.fontSize : 24;
				scope.length = new Array(scope.cont.num.toString().length);
				console.log(scope.cont)
				console.log(scope.length)

				angular.element(document).bind('scroll', function() {
					if($('.zy_watch_list').length && ($(document).scrollTop() + $(window).height()) >= $('.zy_watch_list').offset().top) {
						clearInterval(timer);
						var timer = setTimeout(function() {
							//console.log(scope.cont.num)
							var arrNum = scope.cont.num.toString().split('');
							var oul = element[0].querySelectorAll('.ullist');
							//var arrUl = Array.prototype.slice.call(oul);
							var arrUl = [].slice.call(oul);
							//[].slice.call(oul).forEach(function(v,i){
							arrUl.forEach(function(v, i) {
								arrUl[i].style.top = -scope.cont.fontSize * parseInt(arrNum[i]) + 'px'
							})
						}.bind(this));
					}
				});
			});

		}
	}
});

//门户管理 模板
app.directive('templateSet', function(templateServer) {
	return {
		restrice: 'CE',
		replace: true,
		templateUrl: './tpl/sharedTemplate/templateSetting.html',
		controller: 'templateSettingCtrl'
	}
});

//导学、课堂、作业页面导航条
app.directive('wxNav', function($state) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "./tpl/sharedTemplate/wxnav.html",
		link: function(scope, element) {
			scope.guidannavlist = [{
					"id": 0,
					"name": "资源统计"
				},
				//              {
				//                  "id": 1,
				//                  "name": "导学统计"
				//              },
				{
					"id": 2,
					"name": "课堂统计"
				},
				{
					"id": 3,
					"name": "作业统计"
				},
				{
					"id": 4,
					"name": "评价统计"
				}

			];
			scope.addCls = function(name) {
				if(name == "资源统计") {
					$state.go('secondNav.leftTree.resourceStatistics', {
						activeid: '0'
					});
				}
				//              if (name =="导学统计") {
				//                  $state.go('secondNav.leftTree.guidanceStatistics', {
				//                      state: "daoxue",
				//                      activeid: '1'
				//                  });
				//              }

				if(name == "课堂统计") {
					$state.go('secondNav.leftTree.guidanceStatistics', {
						state: "ketang",
						activeid: '2'
					});
				}

				if(name == "作业统计") {
					$state.go('secondNav.leftTree.guidanceStatistics', {
						state: "zuoye",
						activeid: '3'
					});
				}
				if(name == "评价统计") {
					$state.go('secondNav.leftTree.evaluateStatistics', {

						activeid: '4'
					});
				}
			}
		}
	}

});

//共用头部(除门户外)
app.directive('system', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: './tpl/sharedTemplate/navsecond.html',
		//		template: '<div class="zy_admin_set"><div class="zy_set_wrap_bg"><div class="zy_set_wrap"><div class="zy_set_bar clearfix"><div class="fl"><span class="zy_bar_big_tit" ng-bind="nav.title"></span><span class="zy_bar_tit" ng-bind="nav.secondTitle"></span></div><ul class="fl" ng-show="nav.middleAdmin"><li class="fl" ui-sref="organization" ui-sref-active="active">机构管理</li><li class="fl" ui-sref="user" ui-sref-active="active">用户管理</li><li class="fl" ui-sref="role" ui-sref-active="active">角色权限</li></ul><p class="zy_set_users fr"><i>李</i><span>李朋霖老师</span></p><div class="zy_more_platform fr" ng-show="nav.goBackCloud"><span class="fl"><i class="iconfont icon-shouye"></i><a ui-sref="wrap.index">捷成教育云平台</a></span></div></div></div></div></div>',
		scope: {
			nav: '=',
		},
		link: function(scope, element, attrs) {
			$timeout(function() {
				//				console.log(scope.nav)
			})

			scope.loginOut = function() {
				sessionStorage.clear();
				window.parent.location.href = backSpace;
			}

		}
	}
});

//repeat 加载完之后
app.directive('repeatFinish', function($timeout) {
	return {
		link: function(scope, element, attr) {
			if(scope.$last == true) {
				scope.$eval(attr.repeatFinish);
			}
		}
	}
});

//无缝滚动
app.directive('seamlessRolling', function($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		link: function(scope, ele, attrs) {
			if(scope.$last == true) {
				$timeout(function() {
					var moveBox = $(ele).parent();
					var html = moveBox.html();
					var i = 0;
					var timer = null;
					var liHeight = moveBox.children().outerHeight(true);
					var liLength = moveBox.children().length / 2;
					//					moveBox.html(html + html);

					function toUp() {
						if(parseInt(moveBox.css('margin-top')) > (-liHeight * liLength)) {
							i++;
							moveBox.animate({
								marginTop: -liHeight * i + 'px'
							}, 'slow');
						} else {
							i = 0;
							moveBox.css('margin-top', '0px');
						}
					}

					timer = setInterval(toUp, 2500);

					moveBox.hover(function() {
						clearInterval(timer);
					}, function() {
						clearInterval(timer);
						timer = setInterval(toUp, 2500);
					});
				});
			}
		}
	}
});

//身份证号码验证
app.factory('IDCheck', function() {
	function checkID(ID) {
		//		console.log(ID);
		if(typeof ID !== 'string') return '非法字符串';
		var city = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		};
		var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
		var d = new Date(birthday);
		var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
		var currentTime = new Date().getTime();
		var time = d.getTime();
		var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		var sum = 0,
			i, residue;
		//if(!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证';
		if(!/^\d{17}(\d|x)$/i.test(ID)) return false;
		//if(city[ID.substr(0,2)] === undefined) return "非法地区";
		if(city[ID.substr(0, 2)] === undefined) return false;
		//if(time >= currentTime || birthday !== newBirthday) return '非法生日';
		if(time >= currentTime || birthday !== newBirthday) return false;
		for(i = 0; i < 17; i++) {
			sum += ID.substr(i, 1) * arrInt[i];
		}
		residue = arrCh[sum % 11];
		//if (residue !== ID.substr(17, 1)) return '非法身份证哦';
		if(residue !== ID.substr(17, 1)) return false;
		console.log(city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女"))
		return city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女");
		return true;
	}
	return {
		checkID: checkID
	}

});

//兼容滚动条
app.service('scrollbar', function() {
	function bind(obj, type, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		if(node.addEventListener) {
			node.addEventListener(type, handler, false);
		} else if(node.attachEvent) {
			node.attachEvent('on' + type, handler);
		} else {
			node['on' + type] = handler;
		}
	}

	function mouseWheel(obj, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		bind(node, 'mousewheel', function(event) {
			var data = -getWheelData(event);
			handler(data);
			if(document.all) {
				window.event.returnValue = false;
			} else {
				event.preventDefault();
			}
		});
		//火狐
		bind(node, 'DOMMouseScroll', function(event) {
			var data = getWheelData(event);
			handler(data);
			event.preventDefault();
		});

		function getWheelData(event) {
			var e = event || window.event;
			return e.wheelDelta ? e.wheelDelta : e.detail * 40;
		}
	}

	function addScroll() {
		this.init.apply(this, arguments);
	}
	addScroll.prototype = {
		init: function(mainBox, contentBox, className) {
			var mainBox = document.getElementById(mainBox);
			var contentBox = document.getElementById(contentBox);
			var scrollDiv = this._createScroll(mainBox, className, contentBox);
			this._resizeScorll(scrollDiv, mainBox, contentBox);
			this._tragScroll(scrollDiv, mainBox, contentBox);
			this._wheelChange(scrollDiv, mainBox, contentBox);
			this._clickScroll(scrollDiv, mainBox, contentBox);
		},
		//创建滚动条
		_createScroll: function(mainBox, className, contentBox) {

			var _scrollBox = document.createElement('div')
			var _scroll = document.createElement('div');
			var span = document.createElement('span');
			_scrollBox.className = "scrollwrap";
			_scrollBox.appendChild(_scroll);
			_scroll.appendChild(span);
			_scroll.className = className;
			var scroll = mainBox.getElementsByClassName("scrollwrap");
			var length = scroll.length;
			contentBox.style.position = "";
			if(length) {
				for(var i = length - 1; i >= 0; i--) {
					mainBox.removeChild(scroll[i]);

				}
			};
			if(contentBox.offsetHeight > mainBox.offsetHeight) {
				contentBox.style.position = "absolute";
				mainBox.appendChild(_scrollBox);
			};

			_scroll.ondragstart = function() {
				return false;
			}
			return _scroll;
		},
		//调整滚动条
		_resizeScorll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var conHeight = contentBox.offsetHeight;
			var _width = mainBox.clientWidth;
			var _height = mainBox.clientHeight;
			var _scrollWidth = element.offsetWidth;
			var _left = _width - _scrollWidth;
			p.style.width = _scrollWidth + "px";
			p.style.height = _height + "px";
			p.style.left = _left + "px";
			p.style.position = "absolute";
			p.style.background = "#ccc";

			//contentBox.style.width = (mainBox.offsetWidth - _scrollWidth) + "px";
			var _scrollHeight = parseInt(_height * (_height / conHeight));
			if(_scrollHeight >= mainBox.clientHeight) {
				element.parentNode.style.display = "none";
			}
			element.style.height = _scrollHeight + "px";
		},
		//拖动滚动条
		_tragScroll: function(element, mainBox, contentBox) {
			var mainHeight = mainBox.clientHeight;
			element.onmousedown = function(event) {
				var _this = this;
				var _scrollTop = element.offsetTop;
				var e = event || window.event;
				var top = e.clientY;
				document.onmousemove = scrollGo;
				document.onmouseup = function(event) {
					this.onmousemove = null;
				}

				function scrollGo(event) {
					var e = event || window.event;
					var _top = e.clientY;
					var _t = _top - top + _scrollTop;
					if(_t > (mainHeight - element.offsetHeight)) {
						_t = mainHeight - element.offsetHeight;
					}
					if(_t <= 0) {
						_t = 0;
					}
					element.style.top = _t + "px";
					contentBox.style.top = -_t * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _t;
				}
			}
			element.onmouseover = function() {
				this.style.background = "#444";
			}
			element.onmouseout = function() {
				this.style.background = "#666";
			}
		},
		//鼠标滚轮滚动，滚动条滚动
		_wheelChange: function(element, mainBox, contentBox) {
			var node = typeof mainBox == "string" ? $(mainBox) : mainBox;
			var flag = 0,
				rate = 0,
				wheelFlag = 0,
				_this = this;
			if(node) {
				mouseWheel(node, function(data) {
					wheelFlag += data;
					if(_this._wheelData >= 0) {
						flag = _this._wheelData;
						element.style.top = flag + "px";
						wheelFlag = _this._wheelData * 12;
						_this._wheelData = -1;
					} else {
						flag = wheelFlag / 12;
					}
					if(flag <= 0) {
						flag = 0;
						wheelFlag = 0;
					}
					if(flag >= (mainBox.offsetHeight - element.offsetHeight)) {
						flag = (mainBox.clientHeight - element.offsetHeight);
						wheelFlag = (mainBox.clientHeight - element.offsetHeight) * 12;
					}
					element.style.top = flag + "px";
					contentBox.style.top = -flag * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
				});
			}
		},
		_clickScroll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var _this = this;
			p.onclick = function(event) {
				var e = event || window.event;
				var t = e.target || e.srcElement;
				var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
				var top = mainBox.offsetTop;
				var _top = e.clientY + sTop - top - element.offsetHeight / 2;
				if(_top <= 0) {
					_top = 0;
				}
				if(_top >= (mainBox.clientHeight - element.offsetHeight)) {
					_top = mainBox.clientHeight - element.offsetHeight;
				}
				if(t != element) {
					element.style.top = _top + "px";
					contentBox.style.top = -_top * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _top;
				}
			}
		}
	};
	this.scroollAction = function(mainBox, contentBox, className) {

		new addScroll(mainBox, contentBox, className);
	}
});

//确认框以及提示框（题库、资源库）
app.directive('promptBox', function($timeout) {
	return {
		restrict: 'EA',
		//		replace : false,
		scope: {
			variablePacket: '=',
			promptShow: '=',
			wranShow: '=',
			delOk: '=',
			maskZindex: '='
		},
		template: `<!--确认框-->
					<div class="gy_del_down zyx_delPrompt" ng-if='variablePacket.prompt' ng-class={'active':maskZindex}>
					    <div class="gy_hide"></div>
					    <div class="gy_con">
					    	<div class="zyx_tit clearfix">
					    		<span class="fl">提示框</span>
					    		<img class="fr" src="./img/delete.png" ng-click='variablePacket.prompt=false' />
					    	</div>
					    	<div class="zyx_con clearfix">
					    		<img src="./img/zyx_delwram.png" ng-if='!variablePacket.prompt_src'/> 
					    		<img src="./img/zyx_duigouwram.png" ng-if='variablePacket.prompt_src'/> 
					    		<ul>
					    			<li ng-bind='variablePacket.prompt_title'></li>
					    			<li ng-bind='variablePacket.prompt_text'></li>
					    		</ul>
					    	</div>
					    	<div class="zyx_btn">
					    		<span ng-click='variablePacket.prompt=false'>取消</span>
					    		<span ng-click='delOk()'>确认</span>
					    	</div>
						</div>
					</div>
					<!--提示框-->
					<div class="gy_del_down zyx_warn" ng-if='variablePacket.warn' ng-class={'active':maskZindex}>
					    <div class="gy_hide"></div>
					    <div class="gy_con">
					    	<div class="zyx_con">
					    		<img src="./img/zyx_delwram.png" ng-if='!variablePacket.warn_src'/> <!--感叹号-->
					    		<img src="./img/zyx_duigouwram.png" ng-if='variablePacket.warn_src'/> <!--对勾-->
					    		<ul>
					    			<li ng-bind='variablePacket.warn_title'></li>
					    			<li ng-bind='variablePacket.warn_text'></li>
					    		</ul>
					    	</div>
						</div>
					</div>`,
		controller: function($scope) {
			//			this.aaa = 123;
		},
		link: function(scope, ele, attrs) {
			/*提示框变量参数
				prompt:false,    //是否显示-提示框
				warn:false,      //是否显示-警示框
				warn_src:false,  //警示框的感叹图片为false，对勾的图片是true；
				warn_title:'',   //警示框的文件名字
				warn_text:'',    //警示框的提示文字
				prompt_src:false,//提示框的感叹图片为false，对勾的图片是true；
				prompt_title:'', //提示框的文件名字
				prompt_text:''   //提示框的提示文字
			*/

			//警示框函数（定时自动关闭）
			//参数一：第二行文字，大字;
			//参数二：感叹图片为false，对勾的图片是true;
			//参数三：第一行文字，小字（没有可不传参）;
			scope.wranShow = function(texts, srcpic, title) {
				scope.variablePacket.warn = true;
				scope.variablePacket.warn_title = title || '';
				scope.variablePacket.warn_text = texts;
				scope.variablePacket.warn_src = srcpic;
				$timeout(function() {
					scope.variablePacket.warn = false;
				}, 1500);
			}
			//提示框函数（手动操作关闭）
			//参数一：第二行文字，大字; 
			//参数二：感叹图片为false，对勾的图片是true;
			//参数三：第一行文字，小字（没有可不传参）;
			scope.promptShow = function(texts, srcpic, title) {
				scope.variablePacket.prompt = true;
				scope.variablePacket.prompt_title = title || '';
				scope.variablePacket.prompt_text = texts;
				scope.variablePacket.prompt_src = srcpic;
			}
		}

	};
});

//分享弹框（资源库、题库）
app.directive('shareBox', function($http) {
	return {
		restrict: 'EA',
		replace: false,
		//		require : '^?ccc',
		scope: {
			variablePacket: '=',
			wranShow: '=',
			shareShow: '=',
			resource: '='
		},
		template: `<div class="gy_del_down zy_share_box" ng-if="variablePacket.shareCase">
					    <div class="gy_hide"></div>
					    <div class="gy_con">
					    	<div class="zy_share_tit">
					    		<b>分享</b>
					    		<i class="iconfont icon-guanbi1 fr" ng-click="closeCase()"></i>
					    	</div>
					    	<div class="zy_share_object_choose">
					    		<span ng-class="{'active':variablePacket.shareIndex==0}" ng-click="shareTab(0)">分享给老师</span>
					    		<span ng-class="{'active':variablePacket.shareIndex==1}" ng-click="shareTab(1)">分享给学生</span>
					    	</div>
					    	<div class="zy_share_object_box">
					    		<div class="zy_object_coordinate">
					    			<div class="zy_select_choose" ng-if="variablePacket.shareIndex==0">
					    				选择学科：
					    				<select name="" ng-model="variablePacket.selectedSubject" ng-options="i.id as i.name for i in variablePacket.selectSubject" ng-change="getTeacher()" >
					    					<option value="">请选择学科</option>
					    				</select>
					    			</div>
					    			<div class="zy_select_choose" ng-if="variablePacket.shareIndex==1">
					    				选择年级：
					    				<select id="gradeId" ng-change="getClass()" name="" ng-model="variablePacket.selectedGrade" ng-options="i.id as i.grade for i in variablePacket.selectGrade">
					    					<option value="">请选择年级</option>
					    				</select>
					    				选择班级：
					    				<select id="classId" name="" ng-model="variablePacket.selectedClass" ng-options="i.id as i.class for i in variablePacket.selectClass" ng-change="getTeacher()">
					    					<option value="">请选择班级</option>
					    				</select>
					    			</div>
					    		</div>
					    		<div class="zy_object_all">
					    			<div ng-class="{'active':variablePacket.shareAllBtn}"><label for="all" ng-if="variablePacket.shareAllBtnShow" ng-click="shareSelectAll(variablePacket.shareAllBtn)"><input type="checkbox" name="all" id="all" ng-model="variablePacket.shareAllBtn" value=""/>全选</label></div>
					    			<div class="zy_objec_aggregate">
					    				<ul class="clearfix">
					    					<li class="fl" ng-class="{'active':i.state,'active_state':i.disabled}" ng-repeat="i in variablePacket.SharePeopleArr">
					    						<input type="checkbox" name="" ng-attr-id="{{i.id}}" ng-disabled="i.disabled" ng-model="i.state" value="" ng-click="shareSelectOne($index,$event,i.state)" /><label ng-attr-for="{{i.id}}" ng-bind="i.name"></label>
					    					</li>
					    				</ul>
					    			</div>
					    		</div>
					    	</div>
					    	<div class="zy_btn_group">
					    		<button ng-if="variablePacket.shareBtn" ng-click="shareSuccess()">分享</button>
					    	</div>
						</div>
					</div>`,
		link: function(scope, ele, attrs, Fctr) {
			//分享弹框展示
			scope.shareShow = function() {
				scope.variablePacket.shareCase = true;
				//默认展示教师列表
				scope.variablePacket.shareIndex = 0;
				scope.variablePacket.SharePeopleArr = [];
				scope.variablePacket.shareAllBtnShow = scope.variablePacket.SharePeopleArr.length ? true : false;
			};
			scope.getTeacher = function() {
				var subjectId = scope.variablePacket.selectedSubject;
				var url = zyxrequireIp + '/uc/user?officeId=office_86316e3f8e14462d99e465836a6ba186&delFlag=0&state=1&userType=1';
				//              scope.variablePacket.shareIndex
				if(scope.variablePacket.shareIndex == "0") {
					if(subjectId != null) {
						url += "&subjectId=" + subjectId;
					}
				}
				if(scope.variablePacket.shareIndex == "1") {
					var gradeId = scope.variablePacket.selectedGrade;
					var classId = scope.variablePacket.selectedClass;
					if(gradeId != null) {
						url += "&gradeId=" + gradeId;
					}
					if(classId != null) {
						url += "&classId=" + classId;
					}
				}

				$http.get(url).success(function(suc) {
					if(suc.ret == 200) {
						var list = new Array();
						angular.forEach(suc.data.list, function(data) {
							var obj = {
								id: data.id,
								name: data.realname,
								state: false,
								disabled: false
							}
							list.push(obj)
						});
						scope.variablePacket.SharePeopleArr = list;
						scope.variablePacket.shareAllBtnShow = scope.variablePacket.SharePeopleArr.length ? true : false;
					};
				});

			}

			scope.getClass = function() {
				var gradeId = scope.variablePacket.selectedGrade;
				$http.get(zyxrequireIp + '/ea/eaClass?gradeId=' + gradeId).success(function(suc) {
					if(suc.ret == 200) {
						var list = new Array();
						angular.forEach(suc.data, function(data) {
							var obj = {
								id: data.id,
								class: data.name + "班",
							}
							list.push(obj)
						});
						scope.variablePacket.selectClass = list;
					};
				});
			}

			//分享按钮成功提示
			scope.shareSuccess = function() {
				scope.variablePacket.shareCase = false;

				var userId = "";
				console.log(scope.variablePacket.SharePeopleArr)
				angular.forEach(scope.variablePacket.SharePeopleArr, function(data) {
					if(data.state) {
						userId += data.id + ",";
					}
				});
				var url = resourcesIp + "/a/resource/share?token=29B5DF07F7FC514807CE5FBC12EA1506";
				url += "&userId=" + userId;
				url += "&type=" + scope.variablePacket.shareIndex;
				url += "&resourceIds=" + scope.variablePacket.resource.id;
				url += "&authorIds=" + scope.variablePacket.resource.createBy;
				var classId = scope.variablePacket.selectedClass;
				if(classId != null) {
					url += "&classId=" + classId;
					var className = $("#classId").find("option:selected").text();
					var gradeId = $("#gradeId").find("option:selected").text();
					console.log(className)
					console.log(gradeId)
					url += "&className=" + gradeId + className;
				}
				$http.post(url).success(function(suc) {
					if(suc.code == 200) {
						scope.wranShow('分享成功', false);
					};
				});
				clearAll();
			};
			//关闭按钮
			scope.closeCase = function() {
				clearAll();
				scope.variablePacket.shareCase = false;
			};
			//弹框多选变量
			var varpage = {
				disabledNo: 0, //不能选的数量
				checkedNum: 0 //多选数量
			};
			//分享弹框已分享过的样式展示
			function disabledNoFn() {
				angular.forEach(scope.variablePacket.SharePeopleArr, function(e, i) {
					if(e.disabled) {
						e.state = true;
						varpage.disabledNo++;
					}
				});
			}
			disabledNoFn();
			//清空状态（全选按钮/已勾选数量/禁止勾选数量/分享按按钮/数据列表）
			function clearAll() {
				scope.variablePacket.shareAllBtn = false;
				varpage.checkedNum = 0;
				varpage.disabledNo = 0;
				scope.variablePacket.shareBtn = false;
				scope.variablePacket.SharePeopleArr = [];
			}

			//分享对象切换（学生、教师）
			scope.shareTab = function(i) {
				scope.variablePacket.shareIndex = i;
				clearAll();
				if(i) { //学生
					scope.variablePacket.SharePeopleArr = [];
					disabledNoFn();
					scope.variablePacket.selectedGrade = null;
					scope.variablePacket.selectedClass = null;
				} else { //教师
					scope.variablePacket.SharePeopleArr = scope.variablePacket.teacherList;
					scope.variablePacket.selectedSubject = null;
					disabledNoFn();
				}
				scope.variablePacket.shareAllBtnShow = scope.variablePacket.SharePeopleArr.length ? true : false;
				angular.forEach(scope.variablePacket.SharePeopleArr, function(e, i) {
					e.state = false;
				});
			};

			//分享框全选/反选事件
			scope.shareSelectAll = function(allState) {
				console.log(scope.variablePacket.shareBtn)
				if(allState) {
					angular.forEach(scope.variablePacket.SharePeopleArr, function(e, i) {
						e.state = true;
						varpage.checkedNum = scope.variablePacket.SharePeopleArr.length - varpage.disabledNo;
						scope.variablePacket.shareBtn = true;
					});
				} else {
					angular.forEach(scope.variablePacket.SharePeopleArr, function(e, i) {
						if(e.disabled == false) {
							e.state = false;
						}
					});
					varpage.checkedNum = 0;
					scope.variablePacket.shareBtn = false;
				}
			};
			//分享框多选事件
			scope.shareSelectOne = function(i, ele, state) {
				state ? varpage.checkedNum++ : varpage.checkedNum--;
				if(varpage.checkedNum == scope.variablePacket.SharePeopleArr.length - varpage.disabledNo) {
					scope.variablePacket.shareAllBtn = true;
				} else {
					scope.variablePacket.shareAllBtn = false;
				}
				scope.variablePacket.shareBtn = varpage.checkedNum ? true : false;
			};
		}
	};
});

/*app.service('scrollbar',function(){
	function bind(obj, type, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		if(node.addEventListener) {
			node.addEventListener(type, handler, false);
		} else if(node.attachEvent) {
			node.attachEvent('on' + type, handler);
		} else {
			node['on' + type] = handler;
		}
	}

	function mouseWheel(obj, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		bind(node, 'mousewheel', function(event) {
			var data = -getWheelData(event);
			handler(data);
			if(document.all) {
				window.event.returnValue = false;
			} else {
				event.preventDefault();
			}
		});
		//火狐
		bind(node, 'DOMMouseScroll', function(event) {
			var data = getWheelData(event);
			handler(data);
			event.preventDefault();
		});

		function getWheelData(event) {
			var e = event || window.event;
			return e.wheelDelta ? e.wheelDelta : e.detail * 40;
		}
	}

	function addScroll() {
		this.init.apply(this, arguments);
	}
	addScroll.prototype = {
		init: function(mainBox, contentBox, className) {
			var mainBox = document.getElementById(mainBox);
			var contentBox = document.getElementById(contentBox);
			var scrollDiv = this._createScroll(mainBox, className);
			this._resizeScorll(scrollDiv, mainBox, contentBox);
			this._tragScroll(scrollDiv, mainBox, contentBox);
			this._wheelChange(scrollDiv, mainBox, contentBox);
			this._clickScroll(scrollDiv, mainBox, contentBox);
		},
		//创建滚动条
		_createScroll: function(mainBox, className) {
			var _scrollBox = document.createElement('div')
			var _scroll = document.createElement('div');
			var span = document.createElement('span');
			_scrollBox.appendChild(_scroll);
			_scroll.appendChild(span);
			_scroll.className = className;
			mainBox.appendChild(_scrollBox);
			_scroll.ondragstart = function() {
				return false;
			}
			return _scroll;
		},
		//调整滚动条
		_resizeScorll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var conHeight = contentBox.offsetHeight;
			var _width = mainBox.clientWidth;
			var _height = mainBox.clientHeight;
			var _scrollWidth = element.offsetWidth;
			var _left = _width - _scrollWidth;
			p.style.width = _scrollWidth + "px";
			p.style.height = _height + "px";
			p.style.left = _left + "px";
			p.style.position = "absolute";
			p.style.background = "#ccc";
			p.className = 'scrollwrap';
			contentBox.style.width = (mainBox.offsetWidth - _scrollWidth) + "px";
			var _scrollHeight = parseInt(_height * (_height / conHeight));
			if(_scrollHeight >= mainBox.clientHeight) {
				element.parentNode.style.display = "none";
			}
			element.style.height = _scrollHeight + "px";
		},
		//拖动滚动条
		_tragScroll: function(element, mainBox, contentBox) {
			var mainHeight = mainBox.clientHeight;
			element.onmousedown = function(event) {
				var _this = this;
				var _scrollTop = element.offsetTop;
				var e = event || window.event;
				var top = e.clientY;
				document.onmousemove = scrollGo;
				document.onmouseup = function(event) {
					this.onmousemove = null;
				}

				function scrollGo(event) {
					var e = event || window.event;
					var _top = e.clientY;
					var _t = _top - top + _scrollTop;
					if(_t > (mainHeight - element.offsetHeight)) {
						_t = mainHeight - element.offsetHeight;
					}
					if(_t <= 0) {
						_t = 0;
					}
					element.style.top = _t + "px";
					contentBox.style.top = -_t * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _t;
				}
			}
			element.onmouseover = function() {
				this.style.background = "#444";
			}
			element.onmouseout = function() {
				this.style.background = "#666";
			}
		},
		//鼠标滚轮滚动，滚动条滚动
		_wheelChange: function(element, mainBox, contentBox) {
			var node = typeof mainBox == "string" ? $(mainBox) : mainBox;
			var flag = 0,
				rate = 0,
				wheelFlag = 0,
				_this = this;
			if(node) {
				mouseWheel(node, function(data) {
					wheelFlag += data;
					if(_this._wheelData >= 0) {
						flag = _this._wheelData;
						element.style.top = flag + "px";
						wheelFlag = _this._wheelData * 12;
						_this._wheelData = -1;
					} else {
						flag = wheelFlag / 12;
					}
					if(flag <= 0) {
						flag = 0;
						wheelFlag = 0;
					}
					if(flag >= (mainBox.offsetHeight - element.offsetHeight)) {
						flag = (mainBox.clientHeight - element.offsetHeight);
						wheelFlag = (mainBox.clientHeight - element.offsetHeight) * 12;
					}
					element.style.top = flag + "px";
					contentBox.style.top = -flag * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
				});
			}
		},
		_clickScroll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var _this = this;
			p.onclick = function(event) {
				var e = event || window.event;
				var t = e.target || e.srcElement;
				var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
				var top = mainBox.offsetTop;
				var _top = e.clientY + sTop - top - element.offsetHeight / 2;
				if(_top <= 0) {
					_top = 0;
				}
				if(_top >= (mainBox.clientHeight - element.offsetHeight)) {
					_top = mainBox.clientHeight - element.offsetHeight;
				}
				if(t != element) {
					element.style.top = _top + "px";
					contentBox.style.top = -_top * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _top;
				}
			}
		}
	};
	this.scroollAction = function(mainBox, contentBox, className){
		new addScroll(mainBox, contentBox, className);
	}
})*/
//分页组件
app.directive('zjyPagination', function() {
	return {
		restrict: 'EA',
		template: '<div class="page-list">' +
			'<ul class="handle_paging clearfix">' +
			'<li  ng-class="{disabled: conf.currentPage == 1}" ng-click="Page(1)">首页</li>' +
			'<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()">< 上一页</li>' +
			//        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">第一页</li>'+
			'<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
			'ng-click="changeCurrentPage(item)">' +
			'<span>{{ item }}</span>' +
			'</li>' +
			'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()">下一页 ></li>' +
			'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="Page(conf.numberOfPages)">尾页</li>' +
			//        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i></li>' +
			'</ul>' +
			'<span>共<b ng-bind="conf.numberOfPages"></b>页</span>' +
			'<span>到<input type="text" ng-model="pageCount" ng-blur="pageGo()"/>页</span>' +
			'</div>',
		replace: true,
		scope: {
			conf: '='
		},
		link: function(scope, element, attrs) {
			var conf = scope.conf;
			var defaultPagesLength = 15;
			var defaultPerPageOptions = [5, 10, 15, 20, 30, 50];
			var defaultPerPage = 5;
			if(conf.pagesLength) {
				// 判断一下分页长度
				conf.pagesLength = parseInt(conf.pagesLength, 10);
				if(!conf.pagesLength) {
					conf.pagesLength = defaultPagesLength;
				}
				// 分页长度必须为奇数，如果传偶数时，自动处理
				if(conf.pagesLength % 2 === 0) {
					conf.pagesLength += 1;
				}
			} else {
				conf.pagesLength = defaultPagesLength
			}
			// 分页选项可调整每页显示的条数
			if(!conf.perPageOptions) {
				conf.perPageOptions = defaultPagesLength;
			}
			// pageList数组
			function getPagination(newValue, oldValue) {
				// conf.currentPage
				if(conf.currentPage) {
					conf.currentPage = parseInt(scope.conf.currentPage, 10);
				}
				if(!conf.currentPage) {
					conf.currentPage = 1;
				}
				// conf.totalItems
				if(conf.totalItems) {
					conf.totalItems = parseInt(conf.totalItems, 10);
				}
				// conf.totalItems
				if(!conf.totalItems) {
					conf.totalItems = 0;
					return;
				}
				if(conf.itemsPerPage) {
					conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
				}
				if(!conf.itemsPerPage) {
					conf.itemsPerPage = defaultPerPage;
				}
				conf.numberOfPages = Math.ceil(conf.totalItems / conf.itemsPerPage);
				// 如果分页总数>0，并且当前页大于分页总数

				if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages) {
					scope.conf.currentPage = scope.conf.numberOfPages;
				}
				// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
				var perPageOptionsLength = scope.conf.perPageOptions.length;
				// 定义状态
				var perPageOptionsStatus;
				for(var i = 0; i < perPageOptionsLength; i++) {
					if(conf.perPageOptions[i] == conf.itemsPerPage) {
						perPageOptionsStatus = true;
					}
				}
				// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
				if(!perPageOptionsStatus) {
					conf.perPageOptions.push(conf.itemsPerPage);
				}
				// 对选项进行sort
				conf.perPageOptions.sort(function(a, b) {
					return a - b
				});
				// 页码相关
				scope.pageList = [];
				if(conf.numberOfPages <= conf.pagesLength) {
					// 判断总页数如果小于等于分页的长度，若小于则直接显示
					for(i = 1; i <= conf.numberOfPages; i++) {
						scope.pageList.push(i);
					}
				} else {
					// 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
					// 计算中心偏移量
					var offset = (conf.pagesLength - 1) / 2;
					if(conf.currentPage <= offset) {
						// 左边没有...
						for(i = 1; i <= offset + 1; i++) {
							scope.pageList.push(i);
						}
					} else if(conf.currentPage > conf.numberOfPages - offset) {
						for(i = offset + 1; i >= 1; i--) {
							scope.pageList.push(conf.numberOfPages - i);
						}
					} else {
						// 最后一种情况，两边都有...
						for(i = Math.ceil(offset / 2); i >= 1; i--) {
							scope.pageList.push(conf.currentPage - i);
						}
						scope.pageList.push(conf.currentPage);
						for(i = 1; i <= offset / 2; i++) {
							scope.pageList.push(conf.currentPage + i);
						}
					}
				}
				scope.$parent.conf = conf;
			};
			scope.Page = function(page) {
				conf.currentPage = page;
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				};
			};
			scope.pageGo = function() {
				if(scope.pageCount < 1) {
					scope.pageCount = 1;
				};
				if(scope.pageCount > conf.numberOfPages) {
					scope.pageCount = conf.numberOfPages;
				};
				conf.currentPage = scope.pageCount;
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				};

			};
			scope.prevPage = function() {
				if(conf.currentPage == 1) {
					return false;
				}
				if(conf.currentPage > 1) {
					conf.currentPage -= 1;
				}
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				}
			};
			// nextPage
			scope.nextPage = function() {
				if(conf.currentPage == conf.numberOfPages) {
					return false;
				}
				if(conf.currentPage < conf.numberOfPages) {
					conf.currentPage += 1;
				}
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				}
			};
			// 变更当前页
			scope.changeCurrentPage = function(item) {
				if(item == '...') {
					return;
				} else {
					if(conf.currentPage == item) {
						return;
					}
					conf.currentPage = item;
					getPagination();
					// conf.onChange()函数
					if(conf.onChange) {
						conf.onChange(item);
					}
				}
			};
			// 修改每页展示的条数
			scope.changeItemsPerPage = function() {
				// 一发展示条数变更，当前页将重置为1
				conf.currentPage = 1;
				getPagination();
				// conf.onChange()函数
				if(conf.onChange) {
					conf.onChange();
				}
			};
			// 跳转页
			scope.jumpToPage = function() {
				num = scope.jumpPageNum;
				if(num.match(/\d+/)) {
					num = parseInt(num, 10);
					if(num && num != conf.currentPage) {
						if(num > conf.numberOfPages) {
							num = conf.numberOfPages;
						}
						// 跳转
						conf.currentPage = num;
						getPagination();
						// conf.onChange()函数
						if(conf.onChange) {
							conf.onChange();
						}
						scope.jumpPageNum = '';
					}
				}
			};
			scope.jumpPageKeyUp = function(e) {
				var keycode = window.event ? e.keyCode : e.which;
				if(keycode == 13) {
					scope.jumpToPage();
				}
			}
			scope.$watch('conf.totalItems', function(value, oldValue) {
				// 在无值或值相等的时候，去执行onChange事件
				if(!value || value == oldValue) {
					if(conf.onChange) {
						// conf.onChange();
					}
				}
				getPagination();
			})
		}
	}
});

//日期组件
app.directive('zjyLaydate', function($timeout) {
	return {
		require: '?ngModel',
		restrict: 'ECA',
		scope: {
			ngModel: '=',
			maxDate: '@',
			minDate: '@'
		},
		link: function(scope, element, attr, ngModel) {
			var _date = null,
				_config = {};
			$timeout(function() {
				// 初始化参数
				_config = {
					elem: '#' + attr.id,
					format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
					max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '',
					min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
					choose: function(data) {
						scope.$apply(setViewValue);

					},
					clear: function() {
						ngModel.$setViewValue(null);

					}
				};
				_date = laydate(_config);
				// 监听日期最大值
				if(attr.hasOwnProperty('maxDate')) {
					attr.$observe('maxDate', function(val) {
						_config.max = val;
					})
				}
				// 监听日期最小值
				if(attr.hasOwnProperty('minDate')) {
					attr.$observe('minDate', function(val) {
						_config.min = val;
					})
				}
				ngModel.$render = function() {
					element.val(ngModel.$viewValue || '');
				};

				element.on('blur keyup change', function() {
					scope.$apply(setViewValue);
				});
				setViewValue();

				function setViewValue() {
					var val = element.val();
					ngModel.$setViewValue(val);
				}
			}, 0);
		}
	};
});

var zNodes = [{
		id: 2,
		pId: 0,
		name: "五年级上五年级上五年级上五年级上五年级上",
		t: "五年级上五年级上五年级上五年级上五年级上"
	},
	{
		id: 21,
		pId: 2,
		name: "数学上册数学上册数学上册数学上册数学上册数学上册",
		t: "数学上册数学上册数学上册数学上册数学上册数学上册",
	},
	{
		id: 211,
		pId: 21,
		name: "第一单元第一单元第一单元第一单元第一单元",
		t: "第一单元第一单元第一单元第一单元第一单元",
	},
	{
		id: 212,
		pId: 21,
		name: "第二单元",
		t: "第二单元",
	},
	{
		id: 213,
		pId: 21,
		name: "第三单元",
		t: "第三单元",
	},
	{
		id: 214,
		pId: 21,
		name: "第四单元",
		t: "第四单元",
	},
	{
		id: 22,
		pId: 2,
		name: "数学下册",
		t: "数学下册",
	},
	{
		id: 221,
		pId: 22,
		name: "第一单元",
		t: "第一单元",
	},
	{
		id: 222,
		pId: 22,
		name: "第二单元",
		t: "第二单元",
	},
	{
		id: 223,
		pId: 22,
		name: "第三单元",
		t: "第三单元",
	},
	{
		id: 224,
		pId: 22,
		name: "第四单元",
		t: "第四单元",
	},

	{
		id: 3,
		pId: 0,
		name: "五年级下",
		t: "五年级下",
	},
	{
		id: 31,
		pId: 3,
		name: "数学上册",
		t: "数学上册",
	},
	{
		id: 311,
		pId: 31,
		name: "第一单元",
		t: "第一单元",
	},
	{
		id: 312,
		pId: 31,
		name: "第二单元",
		t: "第二单元",
	},
	{
		id: 313,
		pId: 31,
		name: "第三单元",
		t: "第三单元",
	},
	{
		id: 314,
		pId: 31,
		name: "第四单元",
		t: "第四单元",
	},
	{
		id: 32,
		pId: 3,
		name: "数学下册",
		t: "数学下册",
	},
	{
		id: 321,
		pId: 32,
		name: "第一单元",
		t: "第一单元",
	},
	{
		id: 322,
		pId: 32,
		name: "第二单元",
		t: "第二单元",
	},
	{
		id: 323,
		pId: 32,
		name: "第三单元",
		t: "第三单元",
	},
	{
		id: 324,
		pId: 32,
		name: "第四单元",
		t: "第四单元",
	},

];

var funsubjTree;
var funkonwledgeTree;
var levelSet = new Set();
var subjectSet = new Set();
var subjectMap = new Map();
var versionMap = new Map();

var zyxrequireIp = 'http://192.168.9.98:80/jeuc/api';
app.directive("choiceVersion", function($http, scrollbar, $rootScope) {
	return {
		restrict: 'EA',
		templateUrl: './tpl/sharedTemplate/choice-version.html',
		replace: true,
		scope: {
			titleBar: '='
		},
		controller: function($scope) {
			//用于监测数据渲染判断高度来显示滚动条
			$scope.$on('ngPFinished', function(ngRepeatFinishedEvent) {
				scrollbar.scroollAction("zyx_grade_mainbox", "zyx_grade_contentbox", "scrollDiv");

			});
			$scope.$on('ngCFinished', function(ngRepeatFinishedEvent) {
				scrollbar.scroollAction("zyx_Subject_mainbox", "zyx_Subject_contentbox", "scrollDiv");

			});
			$scope.$on('ngDFinished', function(ngRepeatFinishedEvent) {
				scrollbar.scroollAction("zyx_version_mainbox", "zyx_version_contentbox", "scrollDiv");
			});
		},
		link: function(scope, ele, attr) {
			var treetype = $rootScope.treetype;

			//左侧树版本上面的标题
			scope.titleShow = false;
			if(scope.titleBar) {
				scope.p = scope.titleBar[0];
				scope.c = scope.titleBar[1];
				scope.d = scope.titleBar[2];
				scope.titleShow = false;
			} else {
				scope.p = "学段";
				scope.c = "科目";
				scope.d = "版本";
				scope.titleShow = true;
			}
			//定义所要渲染的数据
			scope.Subject = "";
			scope.version = "";
			//定义显示状态
			scope.directiveState = false;
			//定义没有数据时；
			scope.Subjectlength = true;
			scope.versionlength = true;

			var Hobj = angular.element(ele).find('h3');
			Hobj.click(function() {
				if(scope.directiveState) {
					scope.directiveState = false;
				} else {
					scope.directiveState = true;
					if(treetype == "0") {
						$http.get(zyxrequireIp + '/uc/user/3ffa6282d1314eb2a23c821a52eca14f').success(function(suc) {
							if(suc.ret == 200) {

								var levelArr = new Array();

								angular.forEach(suc.data.userCourse, function(data) {
									levelSet.add("level_" + data.stage);
									subjectSet.add("level_" + data.stage + data.subjectId);
								});
								angular.forEach(levelSet, function(ldata) {
									var subjectArr = new Array();
									angular.forEach(suc.data.userCourse, function(data) {
										if(ldata == "level_" + data.stage) {
											var subjObj = {
												id: data.subjectId,
												name: data.subjectName
											};
											subjectArr.push(subjObj);
										}
									});
									subjectMap.set(ldata, subjectArr);
									var name = "";
									if(ldata == "level_1") {
										name = "小学";
									}
									if(ldata == "level_2") {
										name = "初中";
									}
									if(ldata == "level_3") {
										name = "高中";
									}
									var levelObj = {
										id: ldata,
										name: name
									};
									levelArr.push(levelObj)
								});
								angular.forEach(subjectSet, function(ldata) {
									var versionArr = new Array();
									angular.forEach(suc.data.userCourse, function(data) {
										var subj = "level_" + data.stage + data.subjectId;
										if(ldata == subj) {
											var versionObj = {
												id: data.versionId,
												name: data.versionName
											};
											versionArr.push(versionObj);
										}
									});
									versionMap.set(ldata, versionArr);
								});
								scope.grade = levelArr;
							};
						});
					}

					if(treetype == "1") {
						$http.get(zyxrequireIp + '/ea/eaOffice?officeId=office_86316e3f8e14462d99e465836a6ba186&flag=0&state=1').success(function(suc) {
							if(suc.ret == 200) {
								scope.grade = suc.data.schoolLevelList;
							};
						});
					}
					if(treetype == "2") {
						$http.get(zyxrequireIp + '/edu/eduLevel').success(function(suc) {
							if(suc.ret == 200) {
								scope.grade = suc.data;
							};
						});
					}

				}
				scope.$apply(); //手动刷新
			});

			//监听数据变化来判断图片是否显示
			scope.$watch("Subject", function() {
				if(scope.Subject.length > 0) {
					scope.Subjectlength = false;
				} else {
					scope.Subjectlength = true;
					var main_subject = document.getElementById("zyx_Subject_mainbox");
					if(main_subject != null) {
						var scroll_subject = main_subject.getElementsByClassName("scrollwrap");

						main_subject.removeChild(scroll_subject[0])
					};

				};
			});
			scope.$watch("version", function() {
				if(!scope.version) {
					scope.versionlength = true;
					var main_version = document.getElementById("zyx_version_mainbox");
					if(main_version != null) {
						var scroll_version = main_version.getElementsByClassName("scrollwrap");

						if(scroll_version.length) {
							main_version.removeChild(scroll_version[0]);
						};
					};
				} else {
					scope.versionlength = false;
				}
			});
			scope.findAll = function() {
				$rootScope.findListByTree("", "");
				scope.clear.p();
				funkonwledgeTree(new Array())
				funsubjTree(new Array())
			}
			scope.set = {
				//处理年级
				p: function(p) {
					if(scope.titleBar) {
						scope.c = scope.titleBar[1];
						scope.d = scope.titleBar[2];
					} else {
						scope.c = "科目";
						scope.d = "版本";
					}
					scope.p = p.name;
					scope.version = null;
					scope.levelId = p.id;
					//点击学段查学科
					$rootScope.findListByTree(scope.levelId, "");
					//treetype  0  个人资源中心树用   1 校本资源用     2 公共资源用
					if(treetype == "0") {
						scope.Subject = subjectMap.get(p.id);
					} else {
						$http.get(zyxrequireIp + '/edu/eduSubject?officeId=office_86316e3f8e14462d99e465836a6ba186').success(function(suc) {
							if(suc.ret == 200) {
								scope.Subject = suc.data;
							} else {
								scope.Subject = "";
							};
						});
					}
				},
				//处理科目
				c: function(c) {
					scope.version = null;
					if(scope.titleBar) {
						scope.d = scope.titleBar[2];
					} else {
						scope.d = "版本";
					}
					scope.c = c.name;
					scope.subjectId = c.id;
					//点击科目查版本
					$rootScope.findListByTree(scope.levelId + "," + scope.subjectId, "");
					//treetype  0  个人资源中心树用   1 校本资源用     2 公共资源用
					if(treetype == "0") {
						scope.version = versionMap.get(scope.levelId + scope.subjectId);
					} else {

						$http.get(zyxrequireIp + '/edu/eduVersion?subjectId=' + scope.subjectId + '&levelId=' + scope.levelId + '&areaId=').success(function(suc) {
							if(suc.ret == 200) {
								scope.version = suc.data;
							}
						});
					}

					$http.get(zyxrequireIp + '/edu/knowledge?subjectId=' + scope.subjectId + '&levelId=' + scope.levelId + '&isChildren=-1').success(function(suc) {
						if(suc.ret == 200) {
							zNodes = suc.data;
							var arr = [];
							angular.forEach(zNodes, function(data) {
								var obj = {
									id: data.id,
									name: data.name,
									pId: data.parentId
								};
								arr.push(obj);
							});
							funkonwledgeTree(arr)
						}
					});
				},
				//处理版本
				d: function(d) {
					scope.d = d.name;
					scope.versionId = d.id;
					scope.directiveState = false;
					//点击版本查侧别
					$rootScope.findListByTree(scope.levelId + "," + scope.subjectId + "," + scope.versionId, "");
					$http.get(zyxrequireIp + '/edu/eduTextbook?subjectId=' + scope.subjectId + '&levelId=' + scope.levelId + '&versionId=' + scope.versionId + "&isChapter=1").success(function(suc) {
						if(suc.ret == 200) {
							zNodes = suc.data;
							// console.log(scope.test)
							funsubjTree(zNodes)
						}
					});

				}
			};
			/*点击清空*/
			scope.clear = {
				p: function() {
					if(scope.titleBar) {
						scope.p = scope.titleBar[0];
						scope.c = scope.titleBar[1];
						scope.d = scope.titleBar[2];
					} else {
						scope.p = "学段";
						scope.c = "科目";
						scope.d = "版本";
					}
					scope.Subject = "";
					scope.version = "";
				},
				c: function() {
					if(scope.titleBar) {
						scope.c = scope.titleBar[1];
						scope.d = scope.titleBar[2];
					} else {
						scope.c = "科目";
						scope.d = "版本";
					}
					scope.version = "";
					scope.versionName = scope.p;
					scope.districtState = true;
				},
				d: function() {
					if(scope.titleBar) {
						scope.d = scope.titleBar[2];
					} else {
						scope.d = "版本";
					}
				}
			};
		}
	}
});

//用于派发监听事件
app.directive('choiceTree', function($timeout) {
	return {
		restrict: 'EA',
		scope: {
			type: "="
		},
		templateUrl: './tpl/sharedTemplate/choice-tree.html',
		replace: true
	};
});

//树结构封装页面
app.directive('onFinishRenderFilters', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			if(scope.$last === true) {
				var module = "ng" + attr.onFinishRenderFilters + "Finished";
				$timeout(function() {
					scope.$emit(module);
				}, 100);
			}
		}
	};
});

//年级版本--树结构数据
app.directive('treeOne', function($rootScope) {
	return {
		require: '?ngModel',
		restrict: 'EA',
		scope: {
			type: '=',
		},
		link: function($scope, element, attrs, ngModel) {
			var curMenu = null,
				zTree_Menu = null;
			var setting = {
				view: {
					showLine: true,
					showIcon: false,
					selectedMulti: false,
					dblClickExpand: true //控制收展

				},
				data: {
					key: {
						title: "t"
					},
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: function onClick(e, treeId, node) {
						var ids = getKnowledgeIds(node);
						$rootScope.findListByTree(ids, "");
						//						alert("Do what you want to do!");
					},
					beforeClick: function beforeClick(treeId, node) {
						if(node.isParent) {
							if(node.level === 0) {
								zTree_Menu.expandNode(node);
								if(!node.open) {
									return false;
								}
								var pNode = curMenu;
								while(pNode && pNode.level !== 0) {
									pNode = pNode.getParentNode();
								}
								if(pNode !== node) {
									var a = $("#" + pNode.tId + "_a");
									a.removeClass("cur");
									zTree_Menu.expandNode(pNode, false);
								}
								a = $("#" + node.tId + "_a");
								a.addClass("cur");

								var isOpen = false;
								for(var i = 0, l = node.children.length; i < l; i++) {
									if(node.children[i].open) {
										isOpen = true;
										break;
									}
								}
								if(isOpen) {
									zTree_Menu.expandNode(node, true);
									curMenu = node;
								} else {
									zTree_Menu.expandNode(node.children[0].isParent ? node.children[0] : node, true);
									curMenu = node.children[0];
								}
							} else {
								zTree_Menu.expandNode(node);
							}
						}
						return !node.isParent;
					},
					beforeExpand: function beforeExpand(treeId, node) {
						if(node.isParent) {
							if(node.level === 0) {
								var pNode = curMenu;
								while(pNode && pNode.level !== 0) {
									pNode = pNode.getParentNode();
								}
								if(pNode !== node) {
									var a = $("#" + pNode.tId + "_a");
									a.removeClass("cur");
									zTree_Menu.expandNode(pNode, false);
								}
								a = $("#" + node.tId + "_a");
								a.addClass("cur");
								var isOpen = false;
								for(var i = 0, l = node.children.length; i < l; i++) {
									if(node.children[i].open) {
										isOpen = true;
										break;
									}
								}
								if(isOpen) {
									zTree_Menu.expandNode(node, true);
									curMenu = node;
								} else {
									zTree_Menu.expandNode(node.children[0].isParent ? node.children[0] : node, true);
									curMenu = node.children[0];
								}
							} else {
								zTree_Menu.expandNode(node);
							}
						}
						return !node.isParent;
					}
				}
			};

			/*
						$(document).ready(function(){
							$.fn.zTree.init($("#treeOne"), setting, zNodes);
							zTree_Menu = $.fn.zTree.getZTreeObj("treeOne");
							curMenu = zTree_Menu.getNodes()[0];
							zTree_Menu.selectNode(curMenu);
							var a = $("#" + zTree_Menu.getNodes()[0].tId + "_a");
							a.addClass("cur");

							$(document).on('click','#treeOne .node_name',function(){
								$('#treeOne .node_name').parent().removeClass('curSelectedNode');
								$(this).parent().addClass('curSelectedNode');
							});
						});*/

			funsubjTree = function(zNodes) {
				$.fn.zTree.init($("#treeOne"), setting, zNodes);
				zTree_Menu = $.fn.zTree.getZTreeObj("treeOne");
				curMenu = zTree_Menu.getNodes()[0];
				zTree_Menu.selectNode(curMenu);
				var a = $("#" + zTree_Menu.getNodes()[0].tId + "_a");
				a.addClass("cur");

				$(document).on('click', '#treeOne .node_name', function() {
					$('#treeOne .node_name').parent().removeClass('curSelectedNode');
					$(this).parent().addClass('curSelectedNode');
				});
			}

		}
	};
});

function getKnowledgeIds(node) {
	var ids = node.id;
	if(node.level != 0) {
		console.log(ids);
		ids = getKnowledgeIds(node.getParentNode()) + "," + ids;
	}
	return ids;
}

//知识点--树结构数据
app.directive('treeTwo', function($rootScope) {
	return {
		require: '?ngModel',
		restrict: 'EA',
		link: function($scope, element, attrs, controller) {
			var curMenu = null,
				zTree_Menu = null;
			var setting = {
				view: {
					showLine: true,
					showIcon: false,
					selectedMulti: false,
					dblClickExpand: true
				},
				data: {
					key: {
						title: "t"
					},
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: function onClick(e, treeId, node) {
						var ids = getKnowledgeIds(node);
						$rootScope.findListByTree("", ids);
						//						alert("Do what you want to do!");
					},
					beforeClick: function beforeClick(treeId, node) {
						if(node.isParent) {
							if(node.level === 0) {
								zTree_Menu.expandNode(node);
								if(!node.open) {
									return false;
								}
								var pNode = curMenu;
								while(pNode && pNode.level !== 0) {
									pNode = pNode.getParentNode();
								}
								if(pNode !== node) {
									var a = $("#" + pNode.tId + "_a");
									a.removeClass("cur");
									zTree_Menu.expandNode(pNode, false);
								}
								a = $("#" + node.tId + "_a");
								a.addClass("cur");

								var isOpen = false;
								for(var i = 0, l = node.children.length; i < l; i++) {
									if(node.children[i].open) {
										isOpen = true;
										break;
									}
								}
								if(isOpen) {
									zTree_Menu.expandNode(node, true);
									curMenu = node;
								} else {
									zTree_Menu.expandNode(node.children[0].isParent ? node.children[0] : node, true);
									curMenu = node.children[0];
								}
							} else {
								zTree_Menu.expandNode(node);
							}
						}
						return !node.isParent;
					},
					beforeExpand: function beforeExpand(treeId, node) {
						if(node.isParent) {
							if(node.level === 0) {
								var pNode = curMenu;
								while(pNode && pNode.level !== 0) {
									pNode = pNode.getParentNode();
								}
								if(pNode !== node) {
									var a = $("#" + pNode.tId + "_a");
									a.removeClass("cur");
									zTree_Menu.expandNode(pNode, false);
								}
								a = $("#" + node.tId + "_a");
								a.addClass("cur");
								var isOpen = false;
								for(var i = 0, l = node.children.length; i < l; i++) {
									if(node.children[i].open) {
										isOpen = true;
										break;
									}
								}
								if(isOpen) {
									zTree_Menu.expandNode(node, true);
									curMenu = node;
								} else {
									zTree_Menu.expandNode(node.children[0].isParent ? node.children[0] : node, true);
									curMenu = node.children[0];
								}
							} else {
								zTree_Menu.expandNode(node);
							}
						}
						return !node.isParent;
					}
				}
			};

			funkonwledgeTree = function(zNodes) {
				$.fn.zTree.init($("#treeTwo"), setting, zNodes);
				zTree_Menu = $.fn.zTree.getZTreeObj("treeTwo");
				curMenu = zTree_Menu.getNodes()[0];
				zTree_Menu.selectNode(curMenu);
				var a = $("#" + zTree_Menu.getNodes()[0].tId + "_a");
				a.addClass("cur");

				$(document).on('click', '#treeTwo .node_name', function() {
					$('#treeTwo .node_name').parent().removeClass('curSelectedNode');
					$(this).parent().addClass('curSelectedNode');
				});
			}

		}
	};
});

//全国联动
app.directive("selectAddress", function($http, $timeout, scrollbar) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "./tpl/sharedTemplate/selectarea.html",
		link: function(scope, element) {
			scope.scrollbar = scrollbar.scroollAction;
			scope.county = "区县";
			scope.school = "学校";
			//定义所要渲染的数据
			scope.schoolData = "";
			//定义显示状态
			scope.directiveState = false;
			//定义没有数据时；
			scope.schoolempty= true;

			scope.revealstate = function() {
				var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
				var scopeValue = managerSearch.scope;
				if(scopeValue == 2) {
					areaCode = managerSearch.cityId
				} else if(scopeValue == 3) {
					areaCode = managerSearch.countyId
				} else if(scopeValue == 4) {
					areaCode = managerSearch.officeId
				}
				scope.directiveState = true;
				$http.post(jeucIp + 'eaArea/findChildByCode', {
					code: areaCode
				}).success(function(suc) {
					if(suc.ret == 200) {
						scope.countyData = suc.data;
					};
				});
			};

			document.body.addEventListener('click', function(e) {
				$timeout(function(e) {
					scope.directiveState = false;
				});

			}, false);
			var areaone = document.getElementsByClassName("areaone");
			for(var i = 0; i < areaone.length; i++) {
				areaone[i].addEventListener('click', function(e) {
					e.stopPropagation();
				}, false);
			};
			scope.$on('ngCFinished', function(ngRepeatFinishedEvent) {
				scope.scrollbar("zmj_county_mainbox", "zmj_county_contentbox", "draw");

			});
            scope.$on('ngSFinished', function(ngRepeatFinishedEvent) {
				scope.scrollbar("zmj_school_mainbox", "zmj_school_contentbox", "draw");

			});
			

			//监听数据变化来判断图片是否显示
			scope.$watch("schoolData", function() {
				if(scope.schoolData.length > 0) {
					scope.schoolempty = false;
				} else {
					scope.schoolempty = true;
					var main = document.getElementById("zmj_school_mainbox") ? document.getElementById("zmj_school_mainbox") : null;
					var scroll = main ? main.getElementsByClassName("scrollwrap") : null;
					scroll ? main.removeChild(scroll[0]) : null;
				};
			});

			/* 请求其他数据*/
			scope.set = {
				county: function(item) { //点击区县
					scope.county = item.name;
					$http.post(jeucIp + '/schoolInfo/findAllSchoolByarea', {
						areaId: item.id
					}).success(function(suc) {
						if(suc.status == 200) {
							scope.schoolData = suc.data; //学校数据
						};
					});
				},
				school: function(item) { //点击学校
					scope.school = item.name;															
					scope.schoolname = item.name;
				    scope.directiveState = false;
					console.log(item.id)//学校的id
					
				}

			};
			/*点击清空*/
			scope.clear = {
				county: function() {
					scope.county = "区县";
					scope.school = "学校";
					scope.schoolData = "";

				}
			};
		}

	}

});
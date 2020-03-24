var app = angular.module('app', ['ngSanitize','ui.router', 'oc.lazyLoad', 'ngAnimate', 'ui.sortable', 'ui.tree','ng.ueditor']);

app.run(['$rootScope', '$location', '$state', function($rootScope, $location, $state) {
	$rootScope.$on('$locationChangeSuccess', function(a, b, fromState) {
		/*window.scrollTo(100, 100);
		console.log(document)
		console.log($(document).scrollTop())
		console.log(document.documentElement.scrollTop)
		console.log(document.body.scrollTop)
		console.log(document.querySelector('div').scrollTop)
		console.log(document.querySelectorAll('div')[0].scrollTop)
		console.log(window.scrollTo())
		console.log($)*/

		//		$(document).scrollTop(0);
		//		document.documentElement.scrollTop==0;
//		$location.hash('top');
	});
   //判断角色 进入我的空间
	var userType = sessionStorage.getItem('userType');

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//		console.log(toState)
		if(toState.name == 'wrap.space') { 						//个人空间区分教师、学生
			if(userType == 1) {
				$state.go('wrap.space.teacherSpace');
			}else if(userType == 2) {
				$state.go('wrap.space.studentSpace');
			}
		}else if(toState.name == 'wrap.space.teacherSpace') { 				//个人空间---消息
			$state.go('wrap.space.teacherSpace.teaNews');
		}else if(toState.name == 'wrap.space.studentSpace') { 				//个人空间---消息
			$state.go('wrap.space.studentSpace.stuNews');
		}else if(toState.name == 'wrap.space.teacherSpace.teaAlbum') { 				//个人空间---相册列表（教师）
			$state.go('wrap.space.teacherSpace.teaAlbum.teaAlbumList');
		}else if(toState.name == 'wrap.space.studentSpace.stuAlbum') { 				//个人空间---相册列表（学生）
			$state.go('wrap.space.studentSpace.stuAlbum.stuAlbumList');
		}else if(toState.name == 'wrap.classSpace') { 							//班级空间 首页
			$state.go('wrap.classSpace.classSpaceIndex');
		}else if(toState.name == 'wrap.classSpace.classMotto') { 				//班级空间 班训展示
			$state.go('wrap.classSpace.classMotto.classMottoShow');
		}else if(toState.name == 'wrap.classSpace.classPhoto') { 				//班级空间 照片列表
			$state.go('wrap.classSpace.classPhoto.classPhotoList');
		}else if(toState.name == 'wrap.classSpace.classNotice') { 				//班级空间 班级公告列表
			$state.go('wrap.classSpace.classNotice.classNoticeList');
		}else if(toState.name == 'wrap.classSpace.classHeadTeacher') {			//班级空间 班主任介绍
			$state.go('wrap.classSpace.classHeadTeacher.classHeadTeacherShow');
		}else if(toState.name == 'wrap.classSpace.classIntroduce') { 			//班级空间 班级介绍
			$state.go('wrap.classSpace.classIntroduce.classIntroduceShow');
		}else if(toState.name == 'wrap.classSpace.classStarStudent') { 			//班级空间 明星学生
			$state.go('wrap.classSpace.classStarStudent.classStarStudentList');
		}else if(toState.name == 'wrap.schoolSpace'){							//学校空间-首页
			$state.go('wrap.schoolSpace.schoolSpaceIndex');
		}else if(toState.name == 'wrap.schoolSpace.schoolMotto'){ 				//学校空间-校训展示
			$state.go('wrap.schoolSpace.schoolMotto.schoolMottoShow');
		}else if(toState.name == 'wrap.schoolSpace.schoolIntro'){  				//学校空间-学校介绍展示
			$state.go('wrap.schoolSpace.schoolIntro.schoolIntroShow');
		}else if(toState.name == 'wrap.schoolSpace.schoolNews'){  				//学校空间-学校资讯展示
			$state.go('wrap.schoolSpace.schoolNews.schoolNewsList');
		}else if(toState.name == 'wrap.schoolSpace.schoolPhoto'){  				//学校空间-学校风采展示
			$state.go('wrap.schoolSpace.schoolPhoto.schoolPhotoList');
		}else if(toState.name == 'wrap.schoolSpaceShow'){  						//学校空间-学校空间展示
			$state.go('wrap.schoolSpace.schoolSpaceShow');
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
	$urlRouterProvider.otherwise('/wrap/space/teacherSpace/teaNews');
//	$urlRouterProvider.otherwise('/wrap/index');
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
		.state('secondNav', { //深蓝色导航--个人设置、我的空间等使用
			url: "/secondNav",
			templateUrl: 'tpl/secondNav.html',
			controller: "secondNavCtrl",
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
			params : {
				userId : null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/teacherSpaceCtrl2.js");
				}]
			}
		})
		.state('secondNav.space.studentSpace', { //我的空间--学生
			url: "/studentSpace",
			templateUrl: 'tpl/mySpace/studentSpace.html',
			controller: "studentSpaceCtrl",
			params : {
				userId : null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/studentSpaceCtrl2.js");
				}]
			}
		})
		//个人空间首页新版本
		.state('wrap.space', { //我的空间
			url: "/space",
			templateUrl: 'tpl/mySpace/space.html'
		})
		.state('wrap.space.teacherSpace', { //我的空间--教师
			url: "/teacherSpace",
			templateUrl: 'tpl/mySpace/teacherSpace.html',
			controller: "teacherSpaceCtrl",
			params : {
				userId : null,
				userType : null,
				token : null,
				id : null,
				type:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/teacherSpaceCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaNews', { //我的空间--教师--消息
			url: "/teaNews",
			templateUrl: 'tpl/mySpace/news.html',
			controller: "newsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/newsCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaDaily', { //我的空间--教师--日志
			url: "/teaDaily",
			templateUrl: 'tpl/mySpace/daily.html',
			controller: "dailyCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/dailyCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaResources', { //我的空间--教师--资源
			url: "/teaResources",
			templateUrl: 'tpl/mySpace/resources.html',
			controller: "resourcesCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/resourcesCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaAlbum', { //我的空间--教师--相册
			url: "/teaAlbum",
			templateUrl: 'tpl/mySpace/album.html',
			/*controller: "albumCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumCtrl.js");
				}]
			}*/
		})
		.state('wrap.space.teacherSpace.teaAlbum.teaAlbumList', { //我的空间--教师--相册列表
			url: "/teaAlbumList",
			templateUrl: 'tpl/mySpace/albumList.html',
			controller: "albumListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumListCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaAlbum.teaAlbumEdit', { //我的空间--教师--相册编辑
			url: "/teaAlbumEdit",
			templateUrl: 'tpl/mySpace/albumEdit.html',
			controller: "albumEditCtrl",
			params:{
				pageState : 0,
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumEditCtrl.js");
				}]
			}
		})
		.state('wrap.space.teacherSpace.teaAlbum.teaAlbumDetails', { //我的空间--教师--相册详情
			url: "/teaAlbumDetails",
			templateUrl: 'tpl/mySpace/albumDetails.html',
			controller: "albumDetailsCtrl",
			params:{
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumDetailsCtrl.js");
				}]
			}
		})
		.state('adminSpace', { //我的空间--管理员
			url: "/adiminSpace",
			templateUrl: 'tpl/mySpace/adminSpace.html',
			controller: "adminSpaceCtrl",
			params : {
				userId : null,
				userType : null,
				token : null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/adminSpaceCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace', { //我的空间--学生
			url: "/studentSpace",
			templateUrl: 'tpl/mySpace/studentSpace.html',
			controller: "studentSpaceCtrl",
			params : {
				userId : null,
				userType : null,
				token : null,
				id : null,
				type:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/studentSpaceCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuNews', { //我的空间--学生--消息
			url: "/stuNews",
			templateUrl: 'tpl/mySpace/news.html',
			controller: "newsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/newsCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuDaily', { //我的空间--学生--日志
			url: "/stuDaily",
			templateUrl: 'tpl/mySpace/daily.html',
			controller: "dailyCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/dailyCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuResources', { //我的空间--学生--资源
			url: "/stuResources",
			templateUrl: 'tpl/mySpace/resources.html',
			controller: "resourcesCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/resourcesCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuAlbum', { //我的空间--学生--相册
			url: "/stuAlbum",
			templateUrl: 'tpl/mySpace/album.html',
			/*controller: "albumCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumCtrl.js");
				}]
			}*/
		})
		.state('wrap.space.studentSpace.stuAlbum.stuAlbumList', { //我的空间--学生--相册列表
			url: "/stuAlbumList",
			templateUrl: 'tpl/mySpace/albumList.html',
			controller: "albumListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumListCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuAlbum.stuAlbumEdit', { //我的空间--学生--相册编辑
			url: "/stuAlbumEdit",
			templateUrl: 'tpl/mySpace/albumEdit.html',
			controller: "albumEditCtrl",
			params:{
				pageState : null,
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumEditCtrl.js");
				}]
			}
		})
		.state('wrap.space.studentSpace.stuAlbum.stuAlbumDetails', { //我的空间--学生--相册详情
			url: "/stuAlbumDetails",
			templateUrl: 'tpl/mySpace/albumDetails.html',
			controller: "albumDetailsCtrl",		
			params:{
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/mySpace/controller/albumDetailsCtrl.js");
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
		.state('wrap.schoolSpace', { //学校空间头部导航
			url: "/schoolSpace",
			templateUrl: 'tpl/schoolSpace/schoolSpace.html',
			controller: "schoolSpaceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceCtrl.js");
				}]
			}
		})
		
		.state('wrap.schoolSpace.schoolSpaceIndex', { //学校空间首页
			url: "/schoolSpaceIndex",
			templateUrl: 'tpl/schoolSpace/schoolSpaceIndex.html',
			controller: "schoolSpaceIndexCtrl",
			params:{
				schoolId : null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceIndexCtrl.js");
				}]
			}
		})
		.state('wrap.schoolSpace.schoolMotto', { //学校校训父级页面
			url: "/schoolMotto",
			templateUrl: 'tpl/schoolSpace/schoolMotto.html'
		})
		.state('wrap.schoolSpace.schoolMotto.schoolMottoShow', { //学校校训展示
			url: "/schoolMottoShow",
			templateUrl: 'tpl/schoolSpace/schoolMottoShow.html',
			controller: "schoolMottoShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolMottoShowCtrl.js");
				}]
			}
		})
		.state('wrap.schoolSpace.schoolMotto.schoolMottoEdit', { //学校校训编辑
			url: "/schoolMottoEdit",
			templateUrl: 'tpl/schoolSpace/schoolMottoEdit.html',
			controller: "schoolMottoEditCtrl",
			params : {'id' : ''},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolMottoEditCtrl.js");
				}]
			}
		})
		.state('wrap.schoolSpace.schoolIntro',{ //学校介绍父级页面
			url:"/schoolIntro",
			templateUrl:'tpl/schoolSpace/schoolIntro.html'
		})
		.state('wrap.schoolSpace.schoolIntro.schoolIntroShow', { //学校介绍展示
			url: "/schoolIntroShow",
			templateUrl: 'tpl/schoolSpace/schoolIntroShow.html',
			controller: "schoolIntroShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolIntroShowCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolIntro.schoolIntroEdit",{//学校介绍编辑
			url:"/schoolIntroEdit",
			templateUrl:"tpl/schoolSpace/schoolIntroEdit.html",
			controller:"schoolIntroEditCtrl",
			params : {'id' : ''},
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolIntroEditCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolNews",{ //学校资讯父级页面
			url:"/schoolNews",
			templateUrl:"tpl/schoolSpace/schoolNews.html"
		})
		.state("wrap.schoolSpace.schoolNews.schoolNewsList",{ //学校资讯展示列表
			url:"/schoolNewsList",
			templateUrl:"tpl/schoolSpace/schoolNewsList.html",
			controller:"schoolNewsListCtrl",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsListCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolNews.schoolNewsEdit",{ //学校资讯编辑
			url:"/schoolNewsEdit",
			templateUrl:"tpl/schoolSpace/schoolNewsEdit.html",
			controller:"schoolNewsEditCtrl",
			params:{
				state:0,
				noticeId:null
			},
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsEditCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolNews.schoolNewsDetails",{//学校资讯详情
			url:"/schoolNewsDetails",
			templateUrl:"tpl/schoolSpace/schoolNewsDetails.html",
			controller:"schoolNewsDetailsCtrl",
			params:{
				noticeId:null
			},
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolNewsDetailsCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolPhoto",{//学校风采父级页面
			url:"/schoolPhoto",
			templateUrl:"tpl/schoolSpace/schoolPhoto.html"
		})
		.state("wrap.schoolSpace.schoolPhoto.schoolPhotoList",{//学校风采列表
			url:"/schoolPhotoList",
			templateUrl:"tpl/schoolSpace/schoolPhotoList.html",
			controller:"schoolPhotoListCtrl",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoListCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolPhoto.schoolPhotoEdit",{//学校风采编辑
			url:"/schoolPhotoEdit",
			templateUrl:"tpl/schoolSpace/schoolPhotoEdit.html",
			controller:"schoolPhotoEditCtrl",
			params:{
				state : 0,
				photoId:null
			},
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoEditCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolPhoto.schoolPhotoDetails",{//学校风采详情
			url:"/schoolPhotoDetails",
			templateUrl:"tpl/schoolSpace/schoolPhotoDetails.html",
			controller:"schoolPhotoDetailsCtrl",
			params:{
				photoId:null
			},
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolPhotoDetailsCtrl.js");
				}]
			}
		})
		.state("wrap.schoolSpace.schoolSpaceShow",{//学校空间展示
			url:"/schoolSpaceShow",
			templateUrl:"tpl/schoolSpace/schoolSpaceShow.html",
			controller:"schoolSpaceShowCtrl",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load("js/schoolSpace/controller/schoolSpaceShowCtrl.js");
				}]
			}
		})
		//学校空间结束
		
		//以下班级空间
		.state('wrap.classSpace', { //班级空间头部导航
			url: "/classSpace",
			templateUrl: 'tpl/classSpace/classSpace.html',
			controller: "classSpaceCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classSpaceCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classSpaceIndex', { //班级空间首页
			url: "/classSpaceIndex",
			templateUrl: 'tpl/classSpace/classSpaceIndex.html',
			controller: "classSpaceIndexCtrl",
			params:{
				classId : null,
				cuid : null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classSpaceIndexCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classTimetables', { //课程表
			url: "/classTimetables",
			templateUrl: 'tpl/classSpace/classTimetables.html',
			controller: "classTimetablesCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classTimetablesCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classMotto', { //班训父级页面
			url: "/classMotto",
			templateUrl: 'tpl/classSpace/classMotto.html'
		})
		.state('wrap.classSpace.classMotto.classMottoShow', { //班训展示
			url: "/classMottoShow",
			templateUrl: 'tpl/classSpace/classMottoShow.html',
			controller: "classMottoShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classMottoShowCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classMotto.classMottoEdit', { //班训编辑
			url: "/classMottoEdit",
			templateUrl: 'tpl/classSpace/classMottoEdit.html',
			controller: "classMottoEditCtrl",
			params:{
				id : 0
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classMottoEditCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classPhoto', { //班级照片父级页面
			url: "/classPhoto",
			templateUrl: 'tpl/classSpace/classPhoto.html'
		})
		.state('wrap.classSpace.classPhoto.classPhotoList', { //班级照片列表
			url: "/classPhotoList",
			templateUrl: 'tpl/classSpace/classPhotoList.html',
			controller: "classPhotoListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoListCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classPhoto.classPhotoDetails', { //班级照片详情
			url: "/classPhotoDetails",
			templateUrl: 'tpl/classSpace/classPhotoDetails.html',
			controller: "classPhotoDetailsCtrl",
			params:{
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoDetailsCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classPhoto.classPhotoEdit', { //班级照片新增、编辑
			url: "/classPhotoEdit",
			templateUrl: 'tpl/classSpace/classPhotoEdit.html',
			controller: "classPhotoEditCtrl",
			params:{
				state : 0,
				photoId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classPhotoEditCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classNotice', { //班级公告父级页面
			url: "/classNotice",
			templateUrl: 'tpl/classSpace/classNotice.html'
		})
		.state('wrap.classSpace.classNotice.classNoticeList', { //班级公告列表
			url: "/classNoticeList",
			templateUrl: 'tpl/classSpace/classNoticeList.html',
			controller: "classNoticeListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classNoticeListCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classNotice.classNoticeDetails', { //班级公告详情
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
		.state('wrap.classSpace.classNotice.classNoticeEdit', { //班级公告编辑
			url: "/classNoticeEdit",
			templateUrl: 'tpl/classSpace/classNoticeEdit.html',
			controller: "classNoticeEditCtrl",
			params:{
				state:0,
				noticeId:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classNoticeEditCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classHeadTeacher', { //班主任介绍父级页面
			url: "/classHeadTeacher",
			templateUrl: 'tpl/classSpace/classHeadTeacher.html'
		})
		.state('wrap.classSpace.classHeadTeacher.classHeadTeacherShow', { //班主任介绍展示
			url: "/classHeadTeacherShow",
			templateUrl: 'tpl/classSpace/classHeadTeacherShow.html',
			controller: "classHeadTeacherShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classHeadTeacherShowCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classHeadTeacher.classHeadTeacherEdit', { //班主任介绍编辑
			url: "/classHeadTeacherEdit",
			templateUrl: 'tpl/classSpace/classHeadTeacherEdit.html',
			controller: "classHeadTeacherEditCtrl",
			params:{
				id:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classHeadTeacherEditCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classIntroduce', { //班级介绍父级页面
			url: "/classIntroduce",
			templateUrl: 'tpl/classSpace/classIntroduce.html'
		})
		.state('wrap.classSpace.classIntroduce.classIntroduceShow', { //班级介绍展示
			url: "/classIntroduceShow",
			templateUrl: 'tpl/classSpace/classIntroduceShow.html',
			controller: "classIntroduceShowCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classIntroduceShowCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classIntroduce.classIntroduceEdit', { //班级介绍编辑
			url: "/classIntroduceEdit",
			templateUrl: 'tpl/classSpace/classIntroduceEdit.html',
			controller: "classIntroduceEditCtrl",
			params:{
				id:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classIntroduceEditCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classStarStudent', { //明星学生父级页面
			url: "/classStarStudent",
			templateUrl: 'tpl/classSpace/classStarStudent.html'
		})
		.state('wrap.classSpace.classStarStudent.classStarStudentList', { //明星学生展示
			url: "/classStarStudentList",
			templateUrl: 'tpl/classSpace/classStarStudentList.html',
			controller: "classStarStudentListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classStarStudentListCtrl.js");
				}]
			}
		})
		.state('wrap.classSpace.classStarStudent.classStarStudentEdit', { //明星学生新增、编辑
			url: "/classStarStudentEdit",
			templateUrl: 'tpl/classSpace/classStarStudentEdit.html',
			controller: "classStarStudentEditCtrl",
			params:{
				state:0,
				id:null
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/classSpace/controller/classStarStudentEditCtrl.js");
				}]
			}
		})
		//班级空间结束
		

		
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
		template: '<footer class="footer_end"><p>Copyright ©2013-2019 北京捷成世纪科技股份有限公司 保留所有权利</p><p>京ICP证 05020513号 - 京公网安备 11010802011761 - Designed by Jetsen</p><p class="zy_support">技术支持：北京捷成世纪科技股份有限公司&nbsp; &nbsp;<img src="./img/jetsen_logo.png"></p><p class="jx_bottom_fw mt10"><p>联系我们：010-61736000</p><a href="http://www.12377.cn/" target="_blank"><img src="http://www.jxeduyun.com/App.ResourceCloud/Src/apps/changyan/_static/common/images/jx_footer_pic01.png" alt="不良信息举报中心"></a><a href="http://www.cyberpolice.cn/wfjb/" target="_blank"><img src="http://www.jxeduyun.com/App.ResourceCloud/Src/apps/changyan/_static/common/images/jx_footer_pic02.png" alt="网络110报警服务" class="policeImg"></a></p></footer>',
		link: function(scope, element, attrs) {
			//			
		}
	}
});

//分页器
app.directive('paging', function($timeout) {
	return {
		restrict: 'E',
		templateUrl: "tpl/part/paging.html",
		replace: true,
		scope: {
			totalPageNumber: "=page",
			index: "=callback"
		},
		link: function(scope, element, attrs) {
			scope.$watch("totalPageNumber", function(newVal, oldVal) {
				console.log(newVal)
				scope.ww = [];
				for (let i = 1; i <= newVal; i++) {
					scope.ww.push(i)
				}
				console.log(scope.ww)
			})
			scope.index = 1;
			scope.pageChange = function(i) {
				scope.index = i;
				// scope.aaa(scope.index);

			}
			scope.nextPage = function(type) {
				if (type == "减") {
					if (scope.index == 1) {
						scope.index = 1;
					} else {
						scope.index -= 1;
					}
				} else {
					if (scope.index == scope.totalPageNumber) {
						scope.index = scope.totalPageNumber;
					} else {
						scope.index += 1;
					}
				}
			}
			scope.page = function(type) {
				if (type == '首页') {
					scope.index = 1;
				} else {
					scope.index = scope.totalPageNumber;
				}
			}
		}
	}
});


//repeat 加载完之后
app.directive('repeatFinish', function($timeout) {
	return {
		link: function(scope, element, attr) {
			//          console.log(scope.$index)
			if(scope.$last == true) {
				//              $timeout(function (){
				console.log('ng-repeat执行完毕');
				scope.$eval(attr.repeatFinish);
				//					scope.$emit('ngRepeatFinished');
				//              },50);
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
	this.scroollAction = function(mainBox, contentBox, className) {
		new addScroll(mainBox, contentBox, className);
	}
})

//分页组件
app.directive('zjyPagination', function() {
	return {
		restrict: 'EA',
		template: '<div class="page-list">' +
			'<ul class="handle_paging clearfix" ng-show="conf.totalItems > 0">' +
			
			'<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><i class="iconfont icon-mjiantou-copy"></i>＜</li>' +
			//        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">第一页</li>'+
			'<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
			'ng-click="changeCurrentPage(item)">' +
			'<span>{{ item }}</span>' +
			'</li>' +
			'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i>＞</li>' +
			
			//        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i></li>' +
			'</ul>' +
			'<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
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
			}
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
app.filter('trustHtml', function ($sce) { //解释html标签
    return function (input) {
    	console.log(input)
        return $sce.trustAsHtml(input);
    }
});

app.factory("queryData", ['$http', '$q', function ($http, $q) {
        var resultData = {};
        /* get方法获取数据 */
        resultData.getData = function (url, params) {
        	var deferred = $q.defer();  // 声明延后执行，表示要去监控后面的执行
            /* get方法获取数据 */
            $http.get(url, {params: params}).success(function (data) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
            }).error(function (data, status) {
                deferred.reject(data);  // 声明执行失败，即服务器返回错误
                if (status == 401 || status == -1) {
//                  window.location.href = "../index.html"
                }
               /* else {
                    alert(status + " 错误");
                }*/
                return false;
            });
            return deferred.promise;  // 返回承诺，这里并不是最终数据，而是访问最终数据的API 
        };
        /* post方法默认参数在fromData中 */
        resultData.postData = function (url, data, headers) {
        	var deferred = $q.defer();  // 声明延后执行，表示要去监控后面的执行
            /* post方法获取数据 */
            headers = headers == null ? {'Content-Type': 'application/x-www-form-urlencoded'} : headers;
            $http.post(url, data, {headers: headers}).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
//                  window.location.href = "../index.html"
                }
                else {
                    alert(status + " 错误");
                }
                return false;
            });
            return deferred.promise;
        };
        return resultData;
}]);


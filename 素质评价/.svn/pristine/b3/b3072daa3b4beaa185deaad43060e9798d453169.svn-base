var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ui.sortable', 'ui.tree']);

//sessionStorage.setItem('userType','leader');
//sessionStorage.setItem('userType','teacher');
//sessionStorage.setItem('userType','student');	

app.run(['$rootScope', '$location', '$state', '$http', function($rootScope, $location, $state, $http) {
	$rootScope.$on('$locationChangeSuccess', function(a, b, fromState) {
		window.scrollTo(0, 0);
	});
	
//	$rootScope.userType = sessionStorage.getItem('userType') || '';
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		//var token = 'e36fd08e91bcb610db7119031a0ad60f';
		var token = $location.$$search.token;	
		var token = '6690abfa58ab0066c86f1bada23c9b85';	
		if(sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == "" || sessionStorage.getItem("user") == undefined){
		var url = requireIp+"loginController/MdjLogin.do?token="+token;
		//var url = requireIp+"loginController/MdjLogin.do?token=50e690a106f9a8007cec554f0ea0dc71";
		$http.get(url).success(function(res) {
			console.log(res)
			res=JSON.parse(res);
			if(res.ret != "1") {
				return;
			}
			if(res.userRole == "tea") {
				sessionStorage.setItem("user", JSON.stringify(res));
				var odjs = JSON.stringify(res.teacherInfo);
				if((res.teacherInfo.teaRole.indexOf("校领导") != -1) || (res.teacherInfo.teaRole.indexOf("年级组长") !=-1)||(res.teacherInfo.teaRole.indexOf("校长") != -1)||(res.teacherInfo.teaRole.indexOf("德育主任") != -1)||(res.teacherInfo.teaRole.indexOf("工会主席") != -1)||(res.teacherInfo.teaRole.indexOf("书记") != -1)||(res.teacherInfo.teaRole.indexOf("教研员") != -1)||(res.teacherInfo.teaRole.indexOf("教务主任") != -1)) {
//					$rootScope.userType = $rootScope.userType || 'leader'
					sessionStorage.setItem('userType', 'leader');
				} else {
//					$rootScope.userType = $rootScope.userType || 'teacher'
					sessionStorage.setItem('userType', 'teacher');
				}
			}else if(res.userRole == "stu") {
					sessionStorage.setItem("user", JSON.stringify(res));
					sessionStorage.setItem('userType', 'student');
	
			} else {
					sessionStorage.setItem("user", JSON.stringify(res));
					sessionStorage.setItem('userType', 'student');
			}
				var userType = sessionStorage.getItem('userType');
				if(toState.name == 'roleWrap') {
					if(userType == 'leader') {
						$state.go('wrap.schoolLeaderPersonal');
					} else if(userType == 'teacher') {
						$state.go('wrap.teacherPersonal');
					} else {
						$state.go('wrap.publicEvaluation');
					}
				}
			});
			}
	})
}]);
app.filter('reverse', function() { 
    return function(text) {
        return text+"班"
    }
});
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
	//	$urlRouterProvider.otherwise('/wrap/index');
	$urlRouterProvider.otherwise('/roleWrap');
	$stateProvider
		.state('roleWrap', {
			url: "/roleWrap",
			templateUrl: 'tpl/roleWrap.html',
		})
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
		.state('wrap.schoolLeaderPersonal', { //校领导、年级组长首页
			url: "/schoolLeaderPersonal",
			templateUrl: 'tpl/teacher/schoolLeaderPersonal.html',
			controller: "schoolLeaderPersonalCtrl",
			params:{
				roleIndex:0,
				roleAllName:'',
				index:0,
				term:''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/controller/schoolLeaderPersonalCtrl.js");
				}]
			}
		})
		.state('wrap.teacherPersonal', { //班主任、任课教师首页
			url: "/teacherPersonal",
			templateUrl: 'tpl/teacher/teacherPersonal.html',
			controller: "teacherPersonalCtrl",
			params:{
				index:0,
				roleIndex:null,
				term:""
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/controller/teacherPersonalCtrl.js");
				}]
			}
		})
		.state('wrap.historicalEvaluation', { //班主任、任课教师历史评价
			url: "/historicalEvaluation",
			templateUrl: 'tpl/teacher/historicalEvaluation.html',
			controller: "historicalEvaluationCtrl",
			params: {
				index:0,
				roleIndex:0,
				term:''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/controller/historicalEvaluationCtrl.js");
				}]
			}
		})
		.state('wrap.publicEvaluation', { //共用 优秀学生，班主任、任课教师编辑及查看，学生家长查看。评价评语页面
			url: "/publicEvaluation",
			templateUrl: 'tpl/publicPage/publicEvaluation.html',
			controller: "publicEvaluationCtrl",
			params: {
				prevPage: '',
				state: '',
				stuId: '',
				bestStuId: '',
				gradeName: '',
				classId:'',
				term:'',
				stuName:'',
				index:0,
				roleIndex:0
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/publicPage/controller/publicEvaluationCtrl.js");
				}]
			}
		})
		/*.state('wrap.studentPersonal', { //学生首页
			url: "/studentPersonal",
			templateUrl: 'tpl/student/studentPersonal.html',
			controller: "studentPersonalCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/student/controller/studentPersonalCtrl.js");
				}]
			}
		})*/
		.state('wrap.topStudentList', { //优秀学生榜单
			url: "/topStudentList",
			templateUrl: 'tpl/publicPage/topStudentList.html',
			controller: "topStudentListCtrl",
			params: {
				prevPage: '',
				bestStuId: '',
				gradeName: '',
				classId:'',
				term:'',
				stuName:'',
				index:0,
				roleIndex:0,
				roleAllName:''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/publicPage/controller/topStudentListCtrl.js");
				}]
			}
		})
		.state('wrap.report', { //查看报告
			url: "/report",
			templateUrl: 'tpl/publicPage/report.html',
			controller: "reportCtrl",
			params: {
				stuId: '',
				classId:''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/publicPage/controller/reportCtrl.js");
				}]
			}
		})
		.state('wrap.evaluationCriterion', { //评价标准
			url: "/evaluationCriterion",
			templateUrl: 'tpl/publicPage/evaluationCriterion.html',
			controller: "evaluationCriterionCtrl",
			params: {
				prevPage: '',
				roleIndex : 0,
				roleAllName : '',
				index:0,
				term:''
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/publicPage/controller/evaluationCriterionCtrl.js");
				}]
			}
		})
		//2019.04.02
		.state('wrap.cityLeaderPersonal', { //市领导页面素质评价导入导出
			url: "/cityLeaderPersonal",
			templateUrl: 'tpl/teacher/cityLeaderPersonal.html',
			controller: "cityLeaderPersonalCtrl",
			params: {
				roleIndex : 0,
				/*prevPage: '',
				roleAllName : '',
				index:0,
				term:''*/
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/teacher/controller/cityLeaderPersonalCtrl.js");
				}]
			}
		})
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

//repeat 加载完之后
app.directive('repeatFinish', function($timeout) {
	return {
		link: function(scope, element, attr) {
			if(scope.$last == true) {
				console.log('ng-repeat执行完毕');
				scope.$eval(attr.repeatFinish);
			}
		}
	}
});

//优秀学生榜单入口
app.directive('topList', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			page: '=',
			best: '=',
			index:'=',
			roleIndex: '=',
			roleAllName:'=',
			term:'='
		},
		template: '<div class="zy_top_list_enter" ui-sref="wrap.topStudentList({prevPage:page,bestStuId:best,index:index,roleIndex:roleIndex,roleAllName:roleAllName,term:term})"><img src="./img/door_top_list.png" /><span>2017-2018</span></div>',
		link: function(scope, element, attrs) {
			console.log(scope.page)
			//			console.log(scope.best)
		}
	}
})

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
			'<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">首页</li>' +
			'<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><i class="iconfont icon-mjiantou-copy"></i>＜</li>' +
			//        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">第一页</li>'+
			'<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
			'ng-click="changeCurrentPage(item)">' +
			'<span>{{ item }}</span>' +
			'</li>' +
			'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i>＞</li>' +
			'<li class="lastpage" style="padding:0 5px;white-space: nowrap;width: auto;" ng-click="changeCurrentPage(conf.numberOfPages)">尾页</li>' +
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
			var defaultPagesLength = 9;
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
						scope.pageList.push('...');
						scope.pageList.push(conf.numberOfPages);
					} else if(conf.currentPage > conf.numberOfPages - offset) {
						scope.pageList.push(1);
						scope.pageList.push('...');
						for(i = offset + 1; i >= 1; i--) {
							scope.pageList.push(conf.numberOfPages - i);
						}
						scope.pageList.push(conf.numberOfPages);
					} else {
						// 最后一种情况，两边都有...
						scope.pageList.push(1);
						scope.pageList.push('...');

						for(i = Math.ceil(offset / 2); i >= 1; i--) {
							scope.pageList.push(conf.currentPage - i);
						}
						scope.pageList.push(conf.currentPage);
						for(i = 1; i <= offset / 2; i++) {
							scope.pageList.push(conf.currentPage + i);
						}

						scope.pageList.push('...');
						scope.pageList.push(conf.numberOfPages);
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
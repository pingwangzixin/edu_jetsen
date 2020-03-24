app.controller('resourcesSecondLevelCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$stateParams', function($scope, $state, $timeout, $http, $location, $stateParams) {
	//导航显示
	$scope.$emit('nav',true);
	
	var userId = sessionStorage.getItem('userId') || '';
	
	//查询资源列表参数
	$scope.queryParam = {
		//		学段id
		levelId: "",
		//		学科id
		subjectId: "",
		//		版本id
		versionId: "",
		treeSubjectIds: "",
		//		资源格式id
		resTypeId: "",
		//		关键字搜索
		keyword: "",
		//		排序type
		type: 0
	}
	
	$scope.scData= {
		div:false,
		success:false,
		error:false,
		msg:""
	}
	
	$scope.resRea = $stateParams.resRea;
//	$scope.resRea = JSON.parse(sessionStorage.getItem('resRea'));
	if($scope.resRea!=""){
		$scope.queryParam.keyword = $scope.resRea;
	}
	//每一行的更多按钮
	$scope.moreBtn = [false, false, false];
	// 分页组件
	$scope.contentpageConfig = {
		currentPage: 1,
		pagesLength: 15,
		totalItems: 0,
		itemsPerPage: 10,
		perPageOptions: [5],
		onChange: function() {
			//查询资源列表
			$scope.getResourceList();
		}
	}
	$scope.lilength = 0;

	//资源列表集合
	$scope.resourceList;
	//查询资源列表
	$scope.getResourceList = function() {
		var paramters = {};
		if(userId){
			paramters.teacherId = userId;
		}
		if($scope.queryParam.treeSubjectIds == "") {
			//学段、学科、版本ids
			var lsvIds = "";
			if($scope.queryParam.levelId != "") {
				lsvIds += $scope.queryParam.levelId;
				if($scope.queryParam.subjectId != "") {
					lsvIds += "," + $scope.queryParam.subjectId;
					if($scope.queryParam.versionId != "") {
						lsvIds += "," + $scope.queryParam.versionId;
					}
				}
			}
			//学段、学科、版本
			if(lsvIds != "") {
				if(lsvIds.indexOf(",")>-1){
					paramters.subjectIDArr = lsvIds;
				}else{
					paramters.subjectID = lsvIds;
				}
			}
		} else {
			//左侧树节点id
			if($scope.queryParam.treeSubjectIds.indexOf(",")>-1){
				paramters.subjectIDArr = $scope.queryParam.treeSubjectIds;
			}else{
				paramters.subjectID = $scope.queryParam.treeSubjectIds;
			}
		}
		//分页
		paramters.pageNo = $scope.contentpageConfig.currentPage;
		paramters.pageSize = $scope.contentpageConfig.itemsPerPage;
		//排序，默认为0，按时间排序
		paramters.order = 1;
		paramters.type = $scope.queryParam.type;
		//资源格式
		if($scope.queryParam.resTypeId != "") {
			paramters.objId = $scope.queryParam.resTypeId;
		}
		//关键字搜索
		if($scope.queryParam.keyword != "") {
			paramters.keywords = $scope.queryParam.keyword;
		}
		var params = '{"headers":{"paramters":' + angular.toJson(paramters) + ',"ID":"res_getResources","ticket":"服务器票据","JSessionID":"9751932D989B3EEDD0047EA7146DEF33","date":"0","bodyType":"binary","encryptType":"","action":"post","status":"1:成功;0:失败"},"body":{"content":"通过了"}}';

		console.log("查询资源列表:params=" + params);

		$.ajax({
			url: newsIp + "Teacher/appRequest",
			type: 'post',
			data: {
				"serviceId": "res_getResources",
				param: params
			},
			dataType: 'json',
			cache: false,
			async: false,
			success: function(data) {
				if(data.headers.status == "1") {
					var res = data.body.content.data;
					console.log(angular.toJson(res));
					$scope.contentpageConfig.totalItems = res.totalCount;
					$scope.resourceList = res.list;
					$scope.lilength = res.list.length;
					console.log($scope.resourceList);
				} else {
					$scope.contentpageConfig.totalItems = 0;
					$scope.resourceList = [];
					$scope.lilength = 0;
				}
			}
		})
	}
	
	//学科list
	$scope.subList;
	//版本list
	$scope.versionList;
	//点击学段查询学科
	$scope.clickLevel = function(tar, level) {
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
		//清空左侧树
		$scope.data = [];
		$scope.queryParam.treeSubjectIds = "";
		$scope.queryParam.subjectId = "";
		$scope.queryParam.versionId = "";
		//清空学科
		$scope.subject = [];
		//清空版本
		$scope.versionList = [];
		//每一行的更多按钮
		$scope.moreBtn = [false, false, false];
		angular.element(tar.target).parents('li').nextAll().find('.zy_more_box').animate({
			height: '42px'
		}, 200);
		angular.element(tar.target).parents('li').nextAll().find('.zy_resources_screen_more').removeClass('active');
		if("AllSchool" != level){
			if("primarySchool" == level || "level_1" == level){
			$scope.queryParam.levelId = "level_1";
			}else if("juniorMiddleSchool" == level || "level_2" == level){
				$scope.queryParam.levelId = "level_2";
			}else if("highSchool" == level || "level_3" == level){
				$scope.queryParam.levelId = "level_3";
			}
			$http.get(requireIp + 'jeuc/api/edu/eduSubject?leveId='+$scope.queryParam.levelId+"&areaId=").success(function(res) {
				console.log(res);
				$scope.subList = res.data;
			})
			//重置分页
	    	$scope.contentpageConfig.currentPage = 1;
		}
		//查询资源列表
		$scope.getResourceList();
	}

	//点击资源格式
	$scope.clickResType = function(tar, type) {
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
		//资源格式id
		if("all" == type) {
			$scope.queryParam.resTypeId = "";
		} else {
			$scope.queryParam.resTypeId = type;
		}
		//重置分页
		$scope.contentpageConfig.currentPage = 1;
		//查询资源列表
		$scope.getResourceList();
	}

	//获取从哪个学段点击进入
	var studySection = $stateParams.studySection;
	//选择默认学段
	$scope.clickLevel("", studySection);
	//资源格式
	$scope.resType;
	$http.get(resourcesIp + 'edu-resource/a/resource/mrs_rmi/getTypesByPid?pid=070a33c388f24f23b05d15adc0b8fd2e&token=29B5DF07F7FC514807CE5FBC12EA1506').success(function(res) {
		console.log(res);
		$scope.resType = res.result;
		console.log($scope.resType);
	});
	//点击学科查询版本
	$scope.clickSub = function(tar, subjectId) {
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
		//清空左侧树
		$scope.data = [];
		$scope.queryParam.treeSubjectIds = "";
		$scope.queryParam.versionId = "";
		//清空版本
		$scope.versionList = [];
		//版本的更多按钮
		$scope.moreBtn[2] = false;
		angular.element(tar.target).parents('li').nextAll().find('.zy_more_box').animate({
			height: '42px'
		}, 200);
		angular.element(tar.target).parents('li').nextAll().find('.zy_resources_screen_more').removeClass('active');
		//学科id
		$scope.queryParam.subjectId = subjectId;
		//根据学段和学科查询版本
		//		http://192.168.9.98:80/jeuc/api/edu/eduVersion?subjectId=1&levelId=1
		$http.get(requireIp + 'jeuc/api/edu/eduVersion?subjectId=' + subjectId + "&levelId=" + $scope.queryParam.levelId+"&areaId=").success(function(res) {
			console.log(res);
			$scope.versionList = res.data;
		})
		//重置分页
		$scope.contentpageConfig.currentPage = 1;
		//查询资源列表
		$scope.getResourceList();
	}

	//点击版本
	$scope.clickVersion = function(tar, versuibId) {
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
		//清空左侧树
		$scope.data = [];
		$scope.queryParam.treeSubjectIds = "";
		//版本id
		$scope.queryParam.versionId = versuibId;
		//重置分页
		$scope.contentpageConfig.currentPage = 1;
		//查询资源列表
		$scope.getResourceList();
		//触发查询树
		$scope.showtree($scope.queryParam.levelId, $scope.queryParam.subjectId, $scope.queryParam.versionId);
	}

	//点击左侧树进行查询
	$scope.selectsTree = function(node) {
		//console.log(node);
		$scope.queryParam.treeSubjectIds = node.id;
		//重置分页
		$scope.contentpageConfig.currentPage = 1;
		//查询资源列表
		$scope.getResourceList();
		$http({
				url: requireIp + "jeuc/api/edu/eduTextbook?id=" + node.id,
				method: 'GET'
			})
			.success(function(subjects) {
				if(subjects.ret == 200) {
					console.log(subjects);
					console.log(objects);
					var obj = angular.fromJson(subjects.data);
					var objArr = angular.fromJson(obj);
					for (var i = 0; i < objects.length; i++) {
						if(subjects.data.length==0){
							return;
						}else if(objects[i].id==subjects.data.id){
							objects[i].nodes = [];
							angular.forEach(objArr.children, function(nodes, index, array) {
								objects[i].nodes.push({
										"id": array[index].id,
										"title": array[index].name,
										"nodes": array[index].children,
										"icon": true
									});
									var objects1 = objects[i].nodes[index];
									/*var qu = objects1.nodes[i].nodes;*/
									if(objects1.length != 0 && objects1 != undefined) {
										for(var e = 0; e < objects1.nodes.length; e++) {
											var str = objects1.nodes[e];
											objects1.nodes[e].id = str.id;
											objects1.nodes[e].title = str.name;
											objects1.nodes[e].nodes = str.children;
											objects1.nodes[e].icon = false;
											delete str.children;
											delete str.name;
											delete str.children;
											delete str.pId;
											delete str.num;
											var qu = objects1.nodes[e].nodes;
											if(qu.length != 0 && qu != undefined) {
												for(var q = 0; q < qu.length; q++) {
													var que = qu[q];
													qu[q].id = que.id;
													qu[q].title = que.name;
													qu[q].nodes = que.children;
													qu[q].icon = false;
													delete que.children;
													delete que.name;
													delete que.children;
													delete que.pId;
													delete que.num;
													var least = qu[q].nodes
													if(least != undefined && least.length != 0) {
														//var leasts = least[i]
														for(var w = 0; w < least.length; w++) {
															var leasts = least[w];
															least[w].id = leasts.id;
															least[w].title = leasts.name;
															least[w].nodes = leasts.children;
															least[w].icon = false;
															delete leasts.children;
															delete leasts.name;
															delete leasts.children;
															delete leasts.pId;
															delete leasts.num;
															var least2 = least[w].nodes
															if(least2 != undefined && least2.length != 0) {
																for(var r = 0; r < least2.length; r++) {
																	var leasts2 = least2[r];
																	least2[r].id = leasts2.id;
																	least2[r].title = leasts2.name;
																	least2[r].nodes = leasts2.children;
																	least2[r].icon = false;
																	delete leasts2.children;
																	delete leasts2.name;
																	delete leasts2.children;
																	delete leasts2.pId;
																	delete leasts2.num;
																}
															}
														}
													}
												}
											}
										}
									}
								
							})
						}
						}
					$scope.data = Array.from(objects);
					}
					
			})
	}

	//关键字搜索回车事件
	$scope.mySearchKeyup = function(e) {
		var keycode = window.event ? e.keyCode : e.which;
		if(keycode == 13) {
			//重置分页
			$scope.contentpageConfig.currentPage = 1;
			//查询资源列表
			$scope.getResourceList();
		}
	}

	//跳转资源详情页
	$scope.toResourcesDetails = function(res) {
		console.log(res);
		/*var url = resourcesIp + "/edu-resource/a/resource/mrs_rmi/getById?token=29B5DF07F7FC514807CE5FBC12EA1506&id=" + res.id;
		$http.get(url).success(function(data) {
			res = data.result;
		});*/
		sessionStorage.setItem('res', JSON.stringify(res));
		$state.go("wrap.resources.resourcesDetails");

	}
	//收藏
	$scope.colres = function(res) {
		console.log(res.statistic.collect);
		if(res.collectCount == false) {
			if(userId) {
				if(userId!=res.createBy){
					$http.get(newsIp + "Teacher/Xplayer/saveCollect.do?resourceId=" + res.id + "&userId=" + userId).success(function(data) {
						if(data.ret == 200) {
							$scope.showTanChuang(true, true, false, "收藏成功");
							//查询资源列表
							$scope.getResourceList();
						} else {
							$scope.showTanChuang(true, false, true, "收藏失败");
						}
					});
				}else{
					$scope.showTanChuang(true, false, true, "自己的资源不能收藏");
				}
			}else{
				location.href = path + '#/login';
			}
		}
	}

	$scope.showTanChuang = function(div, success, error, msg){
		$scope.scData.success = success;
		$scope.scData.error = error;
		$scope.scData.msg = msg;
		$scope.scData.div = div;
		$timeout(function(){
			$scope.scData.div = false;
		},1500)
	}

	/**
	 * 下载
	 */
	var down_status = 0;
	var url = resourcesIp+"edu-resource/a/resource/mrs_rmi/downloadRes?token=29B5DF07F7FC514807CE5FBC12EA1506";
	$scope.down = function(resource) {
		if(userId) { //		numAction("sub","-2");
			console.info(down_status);
			if(down_status == 1) {
				return false;
			}
			down_status = 1;
			setTimeout(function() {
				down_status = 0;
			}, 1000);
			//		var basePath = $("#basePath").val();
			var fileName = resource.mr8;
			var newName = resource.title;
			var date = new Date();
			this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			date = this.hour + "_" + this.minute + "_" + this.second;
			window.open(url + "&id=" + resource.id + "&fileName=" + newName);
		} else {
			location.href = path + '#/login';;
		}

	}

	//页面上单选事件
	$scope.clickReorder = function(tar, type) {
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
		$scope.queryParam.type = type;
		//重置分页
		$scope.contentpageConfig.currentPage = 1;
		//查询资源列表
		$scope.getResourceList();
	};

	//学段数据
	$scope.studySection = [{
			id: 'level_1',
			name: '小学',
			checked: false
		},
		{
			id: 'level_2',
			name: '初中',
			checked: false
		},
		{
			id: 'level_3',
			name: '高中',
			checked: false
		}
		/*,
				{
					id: '5646',
					name: '大学',
					checked: false
				}*/
	];

	//当前学段状态
	angular.forEach($scope.studySection, function(e, i) {
		e.checked = false;
		switch(studySection) {
			case 'primarySchool':
				$scope.studySection[0].checked = true;
				break;
			case 'juniorMiddleSchool':
				$scope.studySection[1].checked = true;
				break;
			case 'highSchool':
				$scope.studySection[2].checked = true;
				break;
				/*case 'university':
					$scope.studySection[4].checked = true;
					break;*/
			default:
				break;
		}
	});

	//学科数据
	$scope.subject = [{
			id: '5646',
			name: '全部',
			checked: true
		},
		{
			id: '5646',
			name: '小学',
			checked: false
		},
		{
			id: '5646',
			name: '初中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},

		{
			id: '5646',
			name: '小学',
			checked: false
		},
		{
			id: '5646',
			name: '初中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},
		{
			id: '5646',
			name: '小学',
			checked: false
		},
		{
			id: '5646',
			name: '初中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},
		{
			id: '5646',
			name: '小学',
			checked: false
		},
		{
			id: '5646',
			name: '初中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},
		{
			id: '5646',
			name: '小学',
			checked: false
		},
		{
			id: '5646',
			name: '初中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},
		{
			id: '5646',
			name: '高中',
			checked: false
		},

		{
			id: '5646',
			name: '大学',
			checked: false
		}
	];

	//展示更多下拉
	$scope.showMore = function(tar) {
		var height = angular.element(tar.target).siblings().children('div').children('ul').height();
		if(angular.element(tar.target).hasClass('active')) {
			console.log('you')
			angular.element(tar.target).removeClass('active');
			angular.element(tar.target).siblings().children('div').stop().animate({
				height: '42px'
			}, 200);
		} else {
			console.log('meiyou')
			angular.element(tar.target).addClass('active');
			angular.element(tar.target).siblings().children('div').stop().animate({
				height: height
			}, 200);
		}
	};

	//学段、学科、版本都加载完之后
	$scope.moreBtnShow = function(num) {
		$timeout(function() {
			angular.forEach(angular.element('.zy_resources_screen .zy_resources_screen_line>div'), function(ele, i) {
				//	   		console.log($(ele).width())

				if(num == i) {
					if($(ele).width() >= 1000) {
						console.log('大了')
						//					$scope.$apply(function() {
						$scope.moreBtn[i] = true;
						//						console.log($scope.moreBtn)
						//					});
					}
				}
			});
		})
	}

	//查科目
	var objects = {};
	var nodes1 = {};
	$scope.data = [];
	$scope.showtree = function(levelId, subjectId, versuibId) {
		$http({
				//url: requireIp + "jeuc/api/edu/eduTextbook?levelId=" + levelId + "&subjectId=" + subjectId + "&versionId=" + versuibId + "&isChapter=true",
				url: requireIp + "jeuc/api/edu/eduTextbook?levelId=" + levelId + "&subjectId=" + subjectId + "&versionId=" + versuibId,
				method: 'GET'
			})
			.success(function(subjects) {
				if(subjects.ret == 200) {
					var nodes = []
					nodes.id=111;
					//console.log(subjects);
						var obj = angular.fromJson(subjects.data);
					var objArr = angular.fromJson(obj);
					objects = [];
					angular.forEach(objArr, function(nodes, index, array) {
						objects.push({
							"id": array[index].id,
							"title": array[index].levelName + array[index].subjectName + array[index].name,
							"nodes": nodes,
							"name": array[index].name,
							"versionId": array[index].versionId
						});
					});
					$scope.data = Array.from(objects);
					/*
					var obj = angular.fromJson(subjects.data);
					var objArr = angular.fromJson(obj);
					objects = [];
					angular.forEach(objArr, function(nodes, index, array) {
						objects.push({
							"id": array[index].id,
							"title": array[index].levelName + array[index].subjectName + array[index].name,
							"nodes": array[index].children
						});
						var objects1 = objects[index];

						for(var i = 0; i < objects1.nodes.length; i++) {
							var str = objects1.nodes[i];
							objects1.nodes[i].id = str.id;
							objects1.nodes[i].title = str.name;
							objects1.nodes[i].nodes = str.children;
							objects1.nodes[i].icon = true;
							delete str.children;
							delete str.name;
							delete str.children;
							delete str.pId;
							delete str.num;
							var qu = objects1.nodes[i].nodes;
							if(qu.length != 0 && qu != undefined) {

								//var que = qu[i];
								for(var q = 0; q < qu.length; q++) {
									var que = qu[q];
									qu[q].id = que.id;
									qu[q].title = que.name;
									qu[q].nodes = que.children;
									qu[q].icon = false;
									delete que.children;
									delete que.name;
									delete que.children;
									delete que.pId;
									delete que.num;
									var least = qu[q].nodes
									if(least != undefined && least.length != 0) {
										//var leasts = least[i]
										for(var w = 0; w < least.length; w++) {
											var leasts = least[w];
											least[w].id = leasts.id;
											least[w].title = leasts.name;
											least[w].nodes = leasts.children;
											least[w].icon = false;
											delete leasts.children;
											delete leasts.name;
											delete leasts.children;
											delete leasts.pId;
											delete leasts.num;
											var least1 = least[w].nodes
											if(least1 != undefined && least1.length != 0) {
												//var leasts = least[i]
												for(var e = 0; e < least1.length; e++) {
													var leasts1 = least1[e];
													least1[e].id = leasts1.id;
													least1[e].title = leasts1.name;
													least1[e].nodes = leasts1.children;
													least1[e].icon = false;
													delete leasts1.children;
													delete leasts1.name;
													delete leasts1.children;
													delete leasts1.pId;
													delete leasts1.num;
													var least2 = least1[e].nodes
													if(least2 != undefined && least2.length != 0) {
														//var leasts = least[i]
														for(var r = 0; r < least2.length; r++) {
															var leasts2 = least2[r];
															least2[r].id = leasts2.id;
															least2[r].title = leasts2.name;
															least2[r].nodes = leasts2.children;
															least2[r].icon = false;
															delete leasts2.children;
															delete leasts2.name;
															delete leasts2.children;
															delete leasts2.pId;
															delete leasts2.num;
														}
													}
												}
											}
										}
									}
								}
							}

						}
					});
					console.log(objects);
					$scope.data = Array.from(objects);
					console.log($scope.data)
				*/} else {
					console.log("查询失败");
				}
			})
			.error(function(e) {
				console.log("请求失败：" + e);
			});
	}
	
	$scope.aaa = 1;
}]);

//去重复过滤器
app.filter('unique', function() {
	return function(collection, keyname) {
		var output = [],
			keys = [];

		angular.forEach(collection, function(item) {
			var key = item[keyname];
			if(keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			}
		});

		return output;
	};
});

//滚动条调用
app.directive('ulwrapFinish', function(scrollbar) {
	return {
		/*	scope : {
				ulHeight : '='
			},*/
		link: function(scope, element, attr) {
			//      	console.log(scope.ulHeight)
			if(scope.$last == true) {
				//          	console.log(scope.$last)
				//          	console.log(element.parent().parent()[0].offsetHeight)
				//          	console.log(document.querySelector('#addressul'))
				//          	console.log(document.querySelector('#addressul').style.height)

				setTimeout(function() {
					console.log(element.parent()[0].offsetHeight)
					if(element.parent().parent()[0].offsetHeight < element.parent()[0].offsetHeight) {
						scrollbar.scroollAction('addresswrap', 'addressul', 'scrollDiv');
					}
				});

			}
		}
	}
})

//左侧树
app.directive('leftTree', function($timeout, scrollbar) {
	return {
		restrict: 'EA',
		replace: true,
		/*scope: {
//			conf: '='
		},*/
		link: function(scope, element, attrs) {

			function defaultShowFirst() {
				/*$('.zy_resources_tree_structure').children().first().children('.zy_bookopen').css('opacity','1');
				$('.zy_resources_tree_structure').children().first().children('.zy_bookclose').css('opacity','0');
				$('.zy_resources_tree_structure').children().first().children('.cxv').children('ul').show();
				$('.zy_resources_tree_structure').children().first().children('.cxv').children('ul').children().first().children('h3').addClass('active');*/
			}
			//			defaultShowFirst();

			//			console.log(element)
			element.on('click', function(e) {
				//滚动条
				if(document.querySelector('.zy_resources_tree').offsetHeight < document.querySelector('.zy_resources_tree_structure').offsetHeight) {
					scrollbar.scroollAction('addresswrap', 'addressul', 'scrollDiv');
				}

				if($(this).next().children().length) {
					console.log('有')
					//					console.log($(this).prev().prop('tagName'))
					$(this).next().toggle(200, function() {
						if($(this).next()[0].style.display == 'block') {
							if($(this).parent().hasClass('cxv')) {
								$(this).addClass('active').parents('li').siblings().children('.cxv').children('h3').removeClass('active');
								$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
							} else if($(this).prev().prop('tagName') == 'DIV') {
								console.log('第一层开');
								$(this).addClass('active').parent().siblings().children('h3').removeClass('active').next().hide(200).find('h3').removeClass('active');
								$(this).parent().siblings().children('.icon_wrap').children('.zy_bookopen').stop().animate({
									opacity: '0'
								}, 200).siblings('.zy_bookclose').stop().animate({
									opacity: '1'
								}, 200);
								$(this).prev('div').children('.zy_bookopen').stop().animate({
									opacity: '1'
								}, 200).siblings('.zy_bookclose').stop().animate({
									opacity: '0'
								}, 200);
							} else {
								console.log('else')
								$(this).parents('li').children('.icon_wrap').next('h3').removeClass('active').next('ul').find('h3').removeClass('active');
								$(this).addClass('active');
							}
						} else {
							if($(this).parent().hasClass('cxv')) {
								$(this).removeClass('active');
							} else if($(this).prev().prop('tagName') == 'DIV') {
								console.log('第一层关');
								$(this).next().find('h3').removeClass('active');
								$(this).removeClass('active').prev('div').children('.zy_bookopen').stop().animate({
									opacity: '0'
								}, 200).siblings('.zy_bookclose').stop().animate({
									opacity: '1'
								}, 200);
							} else {
								console.log('else')
								$(this).parents('li').children('.icon_wrap').next('h3').removeClass('active').next('ul').find('h3').removeClass('active');
								$(this).addClass('active');
							}
						}
					}.bind(this));
				} else {
					console.log('木有');
					if($(this).parent().hasClass('cxv')) {
						$(this).parents('li').siblings().children('.cxv').children('h3').removeClass('active');
						$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
					} else if($(this).prev().prop('tagName') == 'DIV') {
						$(this).addClass('active').parent().siblings().children('h3').removeClass('active').next().hide(200).find('h3').removeClass('active');
						$(this).parent().siblings().children('.icon_wrap').children('.zy_bookopen').stop().animate({
							opacity: '0'
						}, 200).siblings('.zy_bookclose').stop().animate({
							opacity: '1'
						}, 200);
						$(this).prev('div').children('.zy_bookopen').stop().animate({
							opacity: '1'
						}, 200).siblings('.zy_bookclose').stop().animate({
							opacity: '0'
						}, 200);
					} else {
						$(this).parents('li').children('.icon_wrap').next('h3').removeClass('active').next('ul').find('h3').removeClass('active');
						$(this).addClass('active');
					}
				}
			});
		}
	}
});

//已收藏、为收藏
app.filter('collectName', function() {
	return function(col) {
		if(col) {
			return "已收藏";
		} else {
			return "收藏";
		}
	}
})

//资源图片过滤器
app.filter('typeImgFilter', function() {
	return function(obj) {
		if(obj != undefined) {
			if(obj == "1") {
				return "./img/resources_mp4 _super_big.png";
			} else if(obj == "2") {
				return "./img/resources_ear_super_big.png";
			} else if(obj == "3") {
				return "./img/resources_pic_super_big.png";
			} else if(obj == "5") {
				return "./img/resources_ppt_super_big.png";
			} else if(obj == "6") {
				return "./img/resources_word_super_big.png";
			} else if(obj == "7") {
				return "./img/resources_excal_super_bg.png";
			} else if(obj == "8" || obj == "9" || obj == "10") {
				return "./img/resources_mp4 _super_big.png";
			}
		} else {
			return;
		}
	}
});

//自定义版本截取
app.filter('cutVersion', function() {
	return function(obj) {
		if(obj != undefined) {
			//	    	console.log(obj);
			var len1 = obj.indexOf("/");
			var obj = obj.substr(len1 + 2)
			//	    	console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(len1 + 2)
			//	    	console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(len1 + 2)
			//	    	console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(0, len1)
			//	    	console.log(obj);
			return obj;
		}
	}
})

//自定义学校截取
app.filter('cutSchool', function() {
	return function(obj) {
		if(obj != undefined) {
			var len1 = obj.indexOf("/");
			var obj = obj.substr(len1 + 2)
			//  		console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(len1 + 2)
			//  		console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(len1 + 2)
			//  		console.log(obj);
			len1 = obj.indexOf("/");
			obj = obj.substr(0, len1)
			//	    	console.log(obj);
			return obj;
		}
	}
})
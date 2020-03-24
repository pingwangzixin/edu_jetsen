app.controller('resourceManageListCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', function($scope, $state, $stateParams, $timeout, $http, $location, $interval) {
	//var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'));
	var scope = managerSearch.scope;
	//变量包
	$scope.createType = "11";
	$scope.resourceType = "";
	$scope.mr4 = "";
	$scope.state = "";
	$scope.objId = "";
	$scope.sortType = "0";
	$scope.mr9 = ""; //年级名称
	$scope.subjectID = ""; //学科编号
	$scope.pageNo = 1;
	$scope.pageSize = 10;
	$scope.areaNames = "";
	var pid = "070a33c388f24f23b05d15adc0b8fd2e";
	var token = "29B5DF07F7FC514807CE5FBC12EA1506";
	$scope.variablePacket = {
		schoolId: "",
		gradeName: "",
		areaId: "",
		userGenre: true, //根据角色进入是否显示联动选项
		resourcesIndex: 0, //资源切换默认索引
		formatIndex: 0, //格式切换默认索引
		sortIndex: 0, //排序切换默认索引
		isCityLevel: true, //市级角色 true,校级角色false
		resources: [ //资源切换的数据
			{
				resourceState: "resourceAllState",
				value: "",
				name: "全部"
			},
			{
				resourceState: "resourceOpenState",
				value: "3",
				name: "公开资源"
			},
			{
				resourceState: "resourceFineState",
				value: "3",
				name: "精品资源"
			},
			{
				resourceState: "resourceSmallState",
				value: "9",
				name: "微课大赛"
			}
		],
		//格式切换的数据
		format: [],
		//排序切换的数据
		sort: [{
				name: "上传时间"
			},
			{
				name: "浏览数"
			},
			{
				name: "下载数"
			}
		]
	};

	if(scope == '2') {
		$scope.variablePacket.isCityLevel = true;
		$scope.areaCode = managerSearch.cityId;
	} else if(scope == '3') {
		$scope.areaCode = managerSearch.countyId;
		$scope.$watch('$viewContentLoaded', function() {
			$http.get(jeucIp + "eaArea/getAreaNameById?areaCode=" + $scope.areaCode).success(function(data) {
				if(data.status == 200) {
					angular.forEach(data.data, function(response, index) {
						$scope.id = data.data.id;
					})
				}
			})
		});
	} else if(scope == '4') {
		$scope.variablePacket.isCityLevel = false;
		$scope.areaCode = managerSearch.officeCode;
		//根据学校编号查询年级列表
		$scope.variablePacket.schoolId = managerSearch.officeId;
		$http.get(jeucIp + "/schoolInfo/findGradeBySchoolId?schoolId=" + $scope.variablePacket.schoolId).success(function(data) {
			if(data.status == 200) {
				$scope.gradeList = [];
				angular.forEach(data.data, function(response, index) {
					var gradeObj = {};
					gradeObj.gradeId = response.id;
					gradeObj.gradeName = response.name;
					$scope.gradeList.push(gradeObj);
				})
			}
		})

		$scope.changeGrade = function(obj) {
			$scope.variablePacket.gradeName = obj.gradeName;
			$scope.mr9 = obj.gradeId;
			$scope.findResourceList();
			//根据年级查询学科
			$http.get(jeucIp + "/eaCourseInfor/findCourseBySidAndGname?GradeName=" + $scope.variablePacket.gradeName + "&schoolId=" + $scope.variablePacket.schoolId).success(function(data) {
				if(data.status == 200) {
					$scope.subjectList = [];
					angular.forEach(data.data, function(response, index) {
						var subjectObj = {};
						subjectObj.subjectId = response.courseId;
						subjectObj.subjectName = response.courseName;
						$scope.subjectList.push(subjectObj);

					})
				}
			})

		};
		//根据年级查询学科列表  
		/*$scope.createType = "11";
			$scope.mr4 = "";
			$scope.state = "";
			$scope.objId = "";
			$scope.mr9 = ""; //年级名称
			$scope.subjectID = ""; //学科编号
		 * */
	}
	var schoolId = managerSearch.officeId;
	$scope.changeSubject = function(obj) {
		$scope.subjectID = obj.subjectId;
		$scope.findResourceList();
	}
	$scope.userTypeList = [{
			id: "11",
			name: "教师"
		},
		{
			id: "12",
			name: "学生"
		},
		{
			id: "13",
			name: "家长"
		}
	]
	$scope.changeUserType = function(createType) {
		$scope.createType = createType;
		$scope.findResourceList();
	}

	$scope.resourceContent = { //资源文件列表信息
		all: [
			//  			{
			//				id: 1,
			//				type: "ppt", //文件类型
			//				name: "五年级语文期末试卷", //文件名称
			//				uploader: "张三", //上传者
			//				site:'保定市第一小学', // 位置
			//				time: "2017-05-12", //上传时间
			//				browse: 35, //浏览数
			//				download: 34, //下载数
			//				src: "img/resources_ppt.png", //文件类型图标
			//				fine:true   //校精品（true 显示 、false 不显示）
			//			}
		]
	};
	// 资源切换
	$scope.resourcesTab = function(index, state, value) {
		$scope.variablePacket.resourcesIndex = index;
		$scope.variablePacket.resourceStates = state;
		$scope.contentpageConfig.currentPage = 1
		$scope.pageNo = 1;

		if(state == "resourceAllState") { //全部资源
			$scope.state = "";
			$scope.mr4 = "";
			$scope.objId = "";
		}
		if(state == "resourceOpenState") { //公开资源
			$scope.state = value;
			$scope.mr4 = "";
			$scope.objId = "";
		}
		if(state == "resourceFineState") { //精品资源
			$scope.mr4 = value;
			$scope.state = "";
			$scope.objId = "";
		}
		if(state == "resourceSmallState") { //微课大赛
			$scope.objId = value;
			$scope.state = "";
			$scope.mr4 = "";
		}
		$scope.resourceContent.all = [];
		$scope.findResourceList();
	}
	// 格式切换
	$scope.formatTab = function(index, resourceType) {
		$scope.variablePacket.formatIndex = index;
		$scope.resourceType = resourceType;
		$scope.contentpageConfig.currentPage = 1
		$scope.pageNo = 1;
		$scope.findResourceList();

	}
	// 排序切换
	$scope.sortTab = function(index) {
		$scope.variablePacket.sortIndex = index;
		if(index == 0) {
			$scope.sortType = "0";
		}
		if(index == 1) {
			$scope.sortType = "1";
		}
		if(index == 2) {
			$scope.sortType = "3";
		}
		$scope.findResourceList();
	}
	//返回参数
	if($stateParams.resources != null && $stateParams.format != null && $stateParams.sort != null) {
		$scope.variablePacket.resourcesIndex = $stateParams.resources;
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//删除列表项
	$scope.delDate = function(index, type, rid, title) {
		$scope.promptShow('确认删除吗？', false, title);
		$scope.delOk = function() {
			$http.get(resourcesIp + "/edu-resource/a/resource/mrs_rmi/delete?token=" + token + "&rid=" + rid).success(function(response) {
				if(response.ret == 200 && response.result == 200) {
					$scope.resourceContent[type].splice(index, 1);
					$scope.variablePacket.prompt = false;
					$scope.wranShow('删除成功', true, title);
				} else {
					$scope.wranShow('删除失败', true, title);
				}
			})
		};
	};
	//查询资源格式列表
	$http.get(resourcesIp + "/edu-resource/a/resource/mrs_rmi/getTypesByPid?pid=" + pid + "&token=" + token).success(
		function(response) {
			if(response.ret == 200) {
				var result = response.result;
				var resouceTypeList = [];
				resouceTypeList.push({
					resourceType: "all",
					name: "全部"
				})
				angular.forEach(result, function(obj, index) {
					var resultTypeObj = {};
					resultTypeObj.resourceType = obj.id;
					resultTypeObj.name = obj.name;
					resouceTypeList.push(resultTypeObj);
				});
				$scope.variablePacket.format = resouceTypeList;
			}
		}
	);

	//查询资源
	$scope.findResourceList = function() {
		var baseUrl = "/edu-resource/a/resource/mrs_rmi/getResources?token=" + token + "&pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + "&createType=" + $scope.createType
		var queryUrl = ""
		if($scope.resourceType != "" && $scope.resourceType != "all") {
			queryUrl += queryUrl + "&objId=" + $scope.resourceType;
		}
		if($scope.objId != "") {
			queryUrl += queryUrl + "&objId=" + $scope.objId;
		}
		if($scope.mr4 != "") {
			queryUrl += queryUrl + "&mr4=" + $scope.mr4;
		}
		if($scope.state != "") {
			queryUrl += queryUrl + "&state=" + $scope.state;
		}
		if($scope.sortType != "") {
			queryUrl += queryUrl + "&type=" + $scope.sortType + "&order=1";
		}
		if($scope.subjectID != "") {
			queryUrl += queryUrl + "&subjectID=" + $scope.subjectID;
		}
		if($scope.mr9 != "") { //年级名称
			queryUrl += queryUrl + "&mr9=" + $scope.mr9;
		}
		//123456789
		queryUrl += "&areaCodes=" + $scope.areaCode;
		$http.get(resourcesIp + baseUrl + queryUrl).success(function(response) {
			if(response.ret == 200) {
				var list = response.result.list;
				$scope.contentpageConfig.totalItems = response.result.count;
				var resourceContentAll = []
				angular.forEach(list, function(obj, index) {
					var resouceObj = {};
					resouceObj.id = obj.id;
					resouceObj.type = $scope.getResoucePicName(obj.mr2);
					resouceObj.name = obj.title;
					resouceObj.uploader = obj.createUser;
					var arrayNames = obj.areaNames.split("//");
					resouceObj.site = arrayNames[arrayNames.length - 2];
					resouceObj.time = obj.createDate;
					resouceObj.browse = obj.statistic.browse;
					resouceObj.download = obj.statistic.download;
					resouceObj.updateBy = obj.updateBy;
					resouceObj.src = $scope.getResouceImage(obj.objId); //文件类型图标
					resouceObj.fine = obj.mr4 == "3" ? true : false;
					resourceContentAll.push(resouceObj);
				})
				$scope.resourceContent.all = resourceContentAll;
			}
		})
	}
	//下载
	down_status = 0;
	$scope.downloadFile = function(resId, filename) {
		var userId = sessionStorage.getItem("userId");
		url = resourcesIp + "/edu-resource/a/resource/mrs_rmi/downloadRes?token=" + token;
		if(down_status == 1) {
			return false;
		}
		down_status = 1;
		setTimeout(function() {
			down_status = 0;
		}, 1000);
		var newName = filename;
		window.open(url + "&id=" + resId + "&fileName=" + newName);
	}
	$scope.getResouceImage = function(extension) {
		var type = "";
		switch(extension) {
			case "1":
				type = "img/resources_mp4.png";
				break;
			case "2":
				type = "img/resources_ear.png";
				break;
			case "3":
				type = "img/resources_pic.png";
				break;
			case "4":
				type = "img/resources_pdf.png";
				break;
			case "5":
				type = "img/resources_ppt.png";
				break;
			case "6":
				type = "img/resources_word.png";
				break;
			case "7":
				type = "img/resources_excal.png";
				break;
			case "8":
				type = "img/resources_mp4.png";
				break;
			case "9":
				type = "img/resources_mp4.png";
				break;
			default:
				type = "img/resources_word.png";
		}
		return type;
	}

	$scope.getResoucePicName = function(extension) {
		var type = "";
		switch(extension) {
			case "mp3":
				type = "audio";
				break;
			case "mp4":
				type = "video";
				break;
			case "png":
				type = "picture";
				break;
			case "pdf":
				type = "pdf";
				break;
			case "ppt":
				type = "ppt";
				break;
			case "pptx":
				type = "ppt";
				break;
			case "doc":
				type = "word";
				break;
			case "docx":
				type = "word";
				break;
			case "xls":
				type = "xls";
				break;
			case "xlsx":
				type = "xls";
				break;
			default:
				type = "word";
		}
		return type;
	}
	//查询需要审核的资源数
	var requestUrl = resourcesIp + "/edu-resource/a/resource/mrs_rmi/getResources?token=" + token + "&mr4=1&createType=" + $scope.createType + "&areaCodes=" + $scope.areaCode;
	$http.get(requestUrl).success(function(response) {
		if(response.ret == 200) {
			$scope.shenhejingpin = response.result.count;
		}
	})

	//页面加载执行查询全部
	$scope.findResourceList();

	// 分页组件
	$scope.contentpageConfig = {
		currentPage: 1,
		pagesLength: 10,
		totalItems: 10,
		itemsPerPage: 10,
		perPageOptions: [5],
		onChange: function() {
			$scope.pageNo = $scope.contentpageConfig.currentPage;
			$scope.findResourceList();
		}
	}

}]);
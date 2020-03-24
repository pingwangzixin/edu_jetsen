app.controller('resourcesCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', 'queryData', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, queryData) {
  /** 变量  begin==========================================================================*/
  $scope.resType = "私有资源";
  $scope.resourceTypeArr = [{id:'',name:'全部'}]  //资源类型
  $scope.resourceTypeId = '';    //资源类型索引
  $scope.state = $scope.otherSpace != 1 ? '0' : '3'; ; //0未公开 3已公开
  $scope.search= "";      //搜索框内容
  $scope.userId = $scope.otherSpace != 1 ? sessionStorage.getItem('userId') : $scope.otherUserId;  //用户ID
  $scope.otherUserId = 'tea_534_2709';
  $scope.userType = sessionStorage.getItem('userType'); //用户角色
  $scope.otherUserName = sessionStorage.getItem("userName");
  $scope.otherSpace = sessionStorage.getItem("visiter");      //0查看自己空间,1查看他人空间
  $scope.resTopBg = "./img/zk_res_topbg1.png";    //资源顶部小箭头背景图
  $scope.resTableData = []; //资源列表
  $scope.variablePacke={
  	pageNo:1,
  	pageSize:10
  };
  $scope.totalPageNumber = 0;
  
  /** 变量  end=============================================================================*/



	/** 页面逻辑  begin==========================================================================*/
	//获取资源类型调用
	getResourceTypes();
	//获取资源调用
	getResources(null, $scope.userId, $scope.state, null, $scope.variablePacke.pageNo, $scope.variablePacke.pageSize, 1);
  /**
   * 资源类型索引切换
   * @param {String} objId
   */
  $scope.subChange = function (objId) {
  	$scope.variablePacke.pageNo = 1;
  	$scope.resourceTypeId = objId;
  	getResources(objId, $scope.userId, $scope.state, $scope.search, $scope.variablePacke.pageNo, $scope.variablePacke.pageSize, 1);
  };
  
  /**
   * 公开私有资源切换
   * @param {String} str
   */
  $scope.typeChange = function (str) {
  	$scope.resourceTypeId = '';    //资源类型初始化
  	$scope.search= "";      //搜索框内容初始化
  	$scope.variablePacke.pageNo = 1;
  	if(str == '私有资源'){
  		$scope.resTopBg = "./img/zk_res_topbg1.png";
  		$scope.state = 0;
  	} else {
  		$scope.state = 3;
  		$scope.resTopBg = "./img/zk_res_topbg2.png";
  	}
    $scope.resType = str;
    getResources(null, $scope.userId, $scope.state, null, $scope.variablePacke.pageNo, $scope.variablePacke.pageSize, 1);
  };
  
  /**
   * 搜索
   * @param {String} search
   */
  $scope.searchHandle = function (search) {
  	$scope.variablePacke.pageNo = 1;
    getResources($scope.resourceTypeId, $scope.userId, $scope.state, search, $scope.variablePacke.pageNo, $scope.variablePacke.pageSize, 1);
  };
  
  /**
   * 资源播放
   * @param {String} resourceId
   */
  $scope.player = function(resourceId){
  	var url = teacherUrl + "/pageController/autoResPlay.do?userId="+$scope.userId+"&resId="+resourceId+"&headsort=1";
  	switch ($scope.userType){
  		case '1'://教师
  			window.open(url + '&userType=1', "_blank"); 
  			break;
  		case '2'://学生
  			window.open(url + '&userType=0', "_blank"); 
  			break;
  		case '3'://家长
  			window.open(url + '&userType=2', "_blank"); 
  			break;
  		default:
  			break;
  	}
  }
  
  /** 页面逻辑  end==========================================================================*/
 
 
 
  /** 接口数据  begin==========================================================================*/
  /**
   * 获取资源类型
   */
  function getResourceTypes(){
  	var typeUrl = resoureUrl + '/a/resource/mrs_rmi/getTypesByPid';
	  var typeParams = {
	  	'pid': '070a33c388f24f23b05d15adc0b8fd2e',
	  	'token': '29B5DF07F7FC514807CE5FBC12EA1506'
	  }
	  queryData.postData(typeUrl, typeParams).then(function(data){
	  	if(data.ret == 200){
	  		$scope.resourceTypeArr = $scope.resourceTypeArr.concat(data.result);
	  	}
	  });
  }
  
  /**
   * 通过条件赛选资源列表
   * @param {String} objId 资源类型
   * @param {String} userIds 资源作者
   * @param {String} title 资源名称
   * @param {number} pageNo 页码
   * @param {number} pageSize 页面大小
   * @param {number} order 排序
   */
  function getResources(objId, userIds, state, title, pageNo, pageSize, order){
  	var url = resoureUrl + '/a/resource/mrs_rmi/getResources';
  	var params = {
  		'token':'29B5DF07F7FC514807CE5FBC12EA1506',
			'objId':objId,
			'userIds':userIds,
			'state':state,
			'title':title,
			'pageNo':pageNo,
			'pageSize':pageSize,
			'order':order
  	};
  	if(userIds != null && userIds != ''){
  		params.usage = '1';
  	} else {
  		params.indexType = '2';
  		params.state = 3;
  	}
  	var promise = queryData.postData(url, params);
  	promise.then(function(data){
  		if(data.ret == 200){
  			$scope.resTableData = data.result.list;
				$scope.totalPageNumber = parseInt((data.result.count + $scope.variablePacke.pageSize - 1) /  $scope.variablePacke.pageSize);
  			console.log($scope.totalPageNumber);
  		}
  	},function(data){
  		console.log(data)
  	});
  }
  
	/** 接口数据  end==========================================================================*/
	
	
	/** 监听 begin==============================================================================*/
	$scope.$watch("variablePacke.pageNo", function(newVal, oldVal) {
	  $scope.aaaaa = getResources($scope.resourceTypeId, $scope.userId, $scope.state, $scope.search, $scope.variablePacke.pageNo, $scope.variablePacke.pageSize, 1);
	})
	/** 监听 end==============================================================================*/
}]);
app.controller('schoolNewsListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//上传背景隐藏
	$rootScope.bgFile = false;
	$scope.ensconce=true;//是否显示编辑按钮 只有校领导可以修改学校资讯
	//变量包
	$scope.variable = {
		type:'7',
		officeId:sessionStorage.getItem("officeId"),
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : ''	,		//提示框提示文字
		userId:sessionStorage.getItem("userId"),
		userType:sessionStorage.getItem("userType")
//		cuid:""
	};
	console.log(sessionStorage.getItem("userType"));
//	//根据登录的用户查询用户信息
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRole, function(response,index) {
				$scope.variable.cuid=response.uid;
				})
		 	}
		 })
		 //学校管理员老师可以修改学校空间
			$scope.edFlig= "";		 
		 if ($scope.variable.userType=="4") {
		 	$scope.edFlig= false;//显示编辑按钮
		 } else{
		 	$scope.edFlig= true;//显示编辑按钮
		 }
	//定时提示框事件 1500ms
	function tipBoxShow(succ,word){		
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function (){
			$scope.variable.tipBox = false;
		},1500);
	}
	 
	//班级公告列表
	$scope.classNoticeList = []
	//分页
	var pageSize = 10;
	$scope.classNoticeListBtn = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 15,
        itemsPerPage : pageSize,
        perPageOptions: [15],
	    onChange: function () {
	     	var currentPage = this.currentPage;
	     	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.officeId+"&pageNo="+currentPage+"&pageSize="+this.itemsPerPage;
	    	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
			.success(function (data) {
			if(data.ret==200){
				$scope.classNoticeList = data.data.list;
				$scope.classNoticeListBtn.totalItems = data.data.count;
				$scope.classNoticeListBtn.currentPage = data.data.pageNo;
			}
    	});
	    }
    }
	
	/**
	 * 查询学校资讯列表
	 */
	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.officeId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
	.success(function (data) {
		if(data.ret==200){
			$scope.classNoticeList = data.data.list;
			$scope.classNoticeListBtn.totalItems = data.data.count;
			$scope.classNoticeListBtn.currentPage = data.data.pageNo;
		}
    });
	    //删除事件
		$scope.classNoticeListDel = function(i,id){
			$scope.variable.deleteBox = true;
			//是否删除弹框确认事件
			$scope.sureDelete = function (){
				$scope.variable.deleteBox = false;
				$http.get(jeucIp+"/ea/eaSpaceIntroduce/deleteEaSpaceIntroduce?id="+id+"&type="+$scope.variable.type)
				.success(function (data) {
					if(data.ret==200){
						$scope.classNoticeList.splice(i,1);
						tipBoxShow(true,'删除成功');      //删除成功的调用
					$scope.classNoticeListBtn.totalItems--;
					}else{
						tipBoxShow(false,'删除失败')
					}
				});
			};
			
		}
	
}]);

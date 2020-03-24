app.controller('classNoticeListCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//上传背景显示
	$rootScope.bgFileClass = false;
	
	//变量包
	$scope.variable = {
		type:'8',
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		classId:sessionStorage.getItem("classId"),
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : '',			//提示框提示文字
		editFlag : false,
		userType:sessionStorage.getItem("userType"),
	};
	//根据登录的用户查询用户信息
		$scope.$watch('$viewContentLoaded', function() {
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRoleInfo, function(response, index) {
					$scope.roleName=response.roleName;
				})
		 	}
		 })
		})
		if($scope.variable.userType=="1"){
			$scope.variable.editFlag = false;//不隐藏
		}else{
			$scope.variable.editFlag= true;//隐藏编辑按钮
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
			
			      //删除成功的调用
			//tipBoxShow(false,'删除失败');   //删除失败的调用
		};
		
		
		
	}
	

	
	//分页
	var pageSize = 10;
	$scope.classNoticeListBtn = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
	    onChange: function () {
	     	var currentPage = this.currentPage;
	     	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.classId+"&pageNo="+currentPage+"&pageSize="+this.itemsPerPage;
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
	 * 查询班级公告列表
	 */
	$scope.$watch('$viewContentLoaded', function() {
 	$scope.classNoticeList = []
		var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.classId;
		$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
		.success(function (data) {
//			console.log(data);
			if(data.ret==200){
				 var classBulletin= data.data.list;
				angular.forEach(classBulletin, function(response, index) {
						var classticeList=[];
						classticeList.id=response.id;
						classticeList.totalItems=response.count;
						classticeList.currentPage=response.pageNo;
						classticeList.title=response.title;
						classticeList.content=response.content;
						classticeList.createDate=response.createDate;
						classticeList.readCount=response.readCount;
//						console.log("班级公告详情id====="+classticeList.id);
						$scope.classNoticeList.push(classticeList);
						$scope.classNoticeList.readCount=response.readCount;
						$scope.classNoticeListBtn.totalItems = data.data.count;
						$scope.classNoticeListBtn.currentPage = data.data.pageNo;
				}) 
			}
  	 	})
		
		
			console.log("班级公告列表："+$scope.classNoticeList);
			//判断班级公告的读取状态
			if ($scope.classNoticeList.readCount==0) {
				$scope.msgName="未读";
			}else{
				$scope.msgName="已读";
			}
	});
	
}]);

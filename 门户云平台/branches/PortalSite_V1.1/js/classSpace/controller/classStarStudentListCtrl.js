app.controller('classStarStudentListCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//变量包
	$scope.variable = {
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : '',			//提示框提示文字
		type:'6',
		cuid:sessionStorage.getItem("cuid"),
		userId:sessionStorage.getItem("userId"),
		classId:sessionStorage.getItem("classId"),
		userType:sessionStorage.getItem("userType"),
		editFlag : false,
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
			$scope.variable.editFlag = true;//隐藏编辑按钮
		}
	//学生列表数据
	$scope.classStarStudentList = [];
	//定时提示框事件 1500ms
	function tipBoxShow(succ,word){		
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function (){
			$scope.variable.tipBox = false;
		},10);
	}
	
	//删除列表中单挑数据的事件
	$scope.classStarStudentDel = function(i,id){
		$scope.variable.deleteBox = true;
		//是否删除弹框确认事件
		$scope.sureDelete = function (){
			$scope.variable.deleteBox = false;
			$http.get(jeucIp+"/ea/eaSpaceIntroduce/deleteEaSpaceIntroduce?id="+id+"&type="+$scope.variable.type)
			.success(function (data) {
				if(data.ret==200){
					$scope.classStarStudentList.splice(i,1);
					tipBoxShow(true,'删除成功');      //删除成功的调用
				}else{
					tipBoxShow(false,'删除失败')
				}
			});
		};
		
	}	
	
	
	
	/**
	 * 查询明星学生列表
	 */
	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.classId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
	.success(function (data) {
		if(data.ret==200){
			var list = data.data.list;
			angular.forEach(list,function(data,index){
				var classStarStudent = {};
				classStarStudent.id=data.id;
				classStarStudent.headImg=data.imagePath;
				classStarStudent.introduce=data.content;
				classStarStudent.name = data.title;
				if((index+1) % 3==1){
					classStarStudent.SrcImg='zyx_starstudent0'
				}
				if((index+1)%3==2){
					classStarStudent.SrcImg='zyx_starstudent1'
				}
				if((index+1)%3==0){
					classStarStudent.SrcImg='zyx_starstudent2'
				}
				$scope.classStarStudentList.push(classStarStudent);
			})
		}
    });
    
    //学生信息简介内容去除标签
    $scope.stuCont = function (){
    	var stuDetails = $('.zyx_studentShow>p');
    	angular.forEach($scope.classStarStudentList,function (v,i){
    		stuDetails.eq(i).html(v.introduce);
    	});
    };
    
}]);

app.controller('schoolSpaceShowCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//上传背景隐藏
	$rootScope.bgFile = false;
	$scope.state = 0;
	$scope.varPack = {
		showIndex : 0,//切换的索引
		isInnovation : 0,
	}
	//空间展示-班级
	$scope.gradeList = [];
	var officeId=sessionStorage.getItem("officeId");
	//分页
	var pageSize = 12;
	$scope.classNoticeListBtn = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
	    onChange: function () {
	    	$scope.gradeList = [];
	     	var currentPage = this.currentPage;
	     	if($scope.state==0){
	     		var params = '';
				params = params+'parentRelationId='+'&officeId='+officeId+'&pageNo='+currentPage+'&pageSize='+pageSize;
				$http.get(jeucIp+"/ea/eaSpaceIntroduce/findSpaceClassList?"+params)
				 .success(function (data) {
					var list = data.data.list;
					angular.forEach(list,function(grade,index){
						var gradeObj = {};
						gradeObj.gradeName = grade.className;
						if(grade.imagePath == null || grade.imagePath == undefined  || grade.imagePath == ''){
							console.log("图片为空，给默认图片")
							gradeObj.srcName = "./img/default.jpg";
						}else{
							gradeObj.srcName = grade.imagePath;
						}
						gradeObj.classId= grade.relationId;
						gradeObj.cuid = grade.cuid;
						$scope.gradeList.push(gradeObj);
					})
					$scope.classNoticeListBtn.totalItems = data.data.count;
					$scope.classNoticeListBtn.currentPage = data.data.pageNo;
			     });
			}
	    }
	    
    }
	
	
	//查询班级空间列表
	var officeId=sessionStorage.getItem("officeId");
	$scope.queryGradeList = function(officeId,pageNo,pageSize,keyword){
		$scope.classFlag = false;//默认班级空间搜索按钮不隐藏，其他隐藏
		$scope.teacherFlag = true;
		$scope.studentFlag = true;
		var params = '';
		params = params+'parentRelationId='+officeId+"&isInnovation="+$scope.varPack.isInnovation;
		if(pageNo!=undefined && pageSize!=undefined){
			params = params+'&pageNo='+pageNo+'&pageSize='+pageSize
		}
		if(keyword!=undefined){
			params = params+'&keyword='+keyword;
		}
		$http.get(jeucIp+"/ea/eaSpaceIntroduce/findSpaceClassList?"+params)
		 .success(function (data) {
			var list = data.data.list;
			angular.forEach(list,function(grade,index){
				var gradeObj = {};
				gradeObj.gradeName = grade.className;
				if(grade.imagePath == null || grade.imagePath == undefined  || grade.imagePath == ''){
					console.log("图片为空，给默认图片")
					gradeObj.srcName = "./img/default.jpg";
				}else{
					gradeObj.srcName = grade.imagePath;
				}
				gradeObj.classId= grade.relationId;
				gradeObj.cuid = grade.cuid;
				$scope.gradeList.push(gradeObj);
			})
			$scope.classNoticeListBtn.totalItems = data.data.count;
			$scope.classNoticeListBtn.currentPage = data.data.pageNo;
			$scope.classNoticeListBtn.pageSize = data.data.pageSize;
	     });
	}
	$scope.queryGradeList(officeId,1,12);
	//空间展示-老师
	//根据学校Id查询老师列表 
	$scope.teacherList = [];
	var officeId=sessionStorage.getItem("officeId");
	$scope.queryTeacherList=function(officeId,pageNo,pageSize,keyword){
		$scope.classFlag = false;//默认班级空间搜索按钮不隐藏，其他隐藏
		$scope.teacherFlag = true;
		$scope.studentFlag = true;
		//alert("点击事件执行......");
		var params = '';
		params =params+'officeId='+officeId+"&userType="+"1"+"&delFlag=0&state=1";
		if(pageNo!=undefined && pageSize!=undefined){
			params = params+'&pageNo='+pageNo+'&pageSize='+pageSize
		}
		if(keyword!=undefined){
			params = params+'&keyword='+keyword;
		}
		$http.get(zyxrequireIp+'/uc/user?'+params).success(function(data){
			if(data.ret==200){
				var list = data.data.list;
			angular.forEach(list,function(response,index ){
				console.log();
				var teacherObj={};
				teacherObj.teacherName=response.realname;
				teacherObj.roleName=response .roleName;
				teacherObj.sex=response .sex;
				teacherObj.srcName =response .userFace;
				$scope.teacherList.push(teacherObj);
			})
			}
			$scope.classNoticeListBtn.totalItems = data.data.count;
			$scope.classNoticeListBtn.currentPage = data.data.pageNo;
			$scope.classNoticeListBtn.pageSize = data.data.pageSize;
		})
	}
	
	//空间展示-学生
	var officeId=sessionStorage.getItem("officeId");
	$scope.studentList = [];
	$scope.queryStudentList=function(officeId,pageNo,pageSize,keyword){
		$scope.classFlag = false;//默认班级空间搜索按钮不隐藏，其他隐藏
		$scope.teacherFlag = true;
		$scope.studentFlag = true;
//		alert("点击事件执行......");
		var params = '';
		params =params+'officeId='+officeId+"&userType="+"2"+"&delFlag=0&state=1";
		if(pageNo!=undefined && pageSize!=undefined){
			params = params+'&pageNo='+pageNo+'&pageSize='+pageSize
		}
		if(keyword!=undefined){
			params = params+'&keyword='+keyword;
		}
	$http.get(zyxrequireIp+'/uc/user?'+params).success(function(data){
		$scope.classFlag = false;//默认班级空间搜索按钮不隐藏，其他隐藏
		$scope.teacherFlag = true;
		$scope.studentFlag = true;
			if(data.ret==200){
				var data  = data.data;
				
				angular.forEach(data.list,function(response,index){
					var studentObj={};
				studentObj.gradeName= response.gradeName;
				studentObj.studentName= response.realname;
				studentObj.sex= response.sex;
				studentObj.className = response.className;
				studentObj.srcName=response.userFace;
				console.log("学生照片："+response.userFace);
				$scope.studentList.push(studentObj);
			})
			console.log($scope.studentList);
			}
			$scope.classNoticeListBtn.totalItems = data.count;
			$scope.classNoticeListBtn.currentPage = data.pageNo;
			$scope.classNoticeListBtn.pageSize = data.pageSize;
		})
	} 
	$scope.tabShow = function(i){
		$scope.varPack.showIndex = i;
		if(i==0){//切换班级查询
			$scope.state = 0;
			$scope.gradeList = [];
			$scope.queryGradeList(officeId,1,12);
		}
		if(i==1){//切换教师查询
			$scope.state = 1;//空间展示-老师
			$scope.teacherList = [];
			$scope.queryTeacherList(officeId,1,12);
		}
		if(i==2){//切换学生查询
			$scope.state = 2;
			//空间展示-学生
			$scope.studentList = [];
			$scope.queryStudentList(officeId,1,12);
		}
	}
	$scope.search = function(i){
		if(i==0){//班级空间查询
			$scope.gradeList = [];
			$scope.queryGradeList(officeId,1,12,$scope.keyword);
		}
		if(i==1){//教师空间查询
			//空间展示-老师
			$scope.teacherList = [];
			$scope.queryTeacherList(officeId,1,12,$scope.keyword);
		}
		if(i==2){//学生空间查询
			//空间展示-学生
			$scope.studentList = [];
			$scope.queryStudentList(officeId,1,12,$scope.keyword);
		}
	}
}]);

app.controller('schoolSpaceIndexCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//定义变量
	$scope.variable = {
		officeId:sessionStorage.getItem("officeId"),
		userId:sessionStorage.getItem("userId"),
		userType:sessionStorage.getItem("userType")
	};
	$scope.varPack = {
		showIndex : 0, //切换的索引
		isInnovation:sessionStorage.getItem("isInnovation"),
	}
	$rootScope.bgFile = false;//上传背景隐藏
	if ($scope.variable.userType=="4") {
		$rootScope.bgFile = true;//上传背景不隐藏
	} else{
		$rootScope.bgFile = false;//上传背景隐藏
	}
	//学校资讯
	$scope.classNoticeList = [];
	//学校风采
	$scope.sixgridList = [];
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
		})
	} 
	
 		//查询班级空间列表
		$scope.gradeList = [];
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
			gradeObj.srcName = grade.imagePath;
			gradeObj.classId= grade.relationId;
			gradeObj.cuid = grade.cuid;
			$scope.gradeList.push(gradeObj);
			})
	     });
	}
	//调用初始化加载班级空间列表
	$scope.queryGradeList(officeId,1,12);
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
	
	 
	$scope.backGroundImagePath = "";
	
	var params ='type=0'+'&relationId='+$scope.variable.officeId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params)
	.success(function (data) {
		if(data.ret==200&&data.data!=null){
			$scope.id = data.data.id;
			$scope.content =data.data.content;
			if(data.data.imagePath==''){
	    		$scope.backGroundImagePath = "";
	    	}else{
	    		$scope.backGroundImagePath = data.data.imagePath;
	    	}
		}
		
    });
	
	/**
	 * 查询学校介绍数据
	 */
	var params1='type=3'+'&relationId='+$scope.variable.officeId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params1).success(function (data) {
		$scope.id = data.data.id;
//		$scope.content =data.data.content;
		$('.zyx_schoolSpaceIndex .zy_introduce_cont>div').html(data.data.content);
		$scope.imagePath = data.data.imagePath;
     });
     /**
      * 查询学校资讯列表
      */
	var params2 ='type=7'+'&relationId='+$scope.variable.officeId+"&pageNo=1&pageSize=5";
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params2)
	.success(function (data) {
		if(data.ret==200){
			$scope.classNoticeList = data.data.list;
		}
    });
    
    /**
     * 学校风采
     */
    var params3 = "relationId="+$scope.variable.officeId+"&currentPage=1&pageSize=6";
	$http.get(jeucIp+"/ea/eaSpacePhoto/photoList?"+params3).success(function (data){
		if(data.ret==200){
			var photos = data.data.photos;
			if(photos!=undefined){
				angular.forEach(photos,function(photo,index){
					var photoObj = {};
					photoObj.titName = photo.photoName;
					photoObj.srcName = photo.photoCover;
					$scope.sixgridList.push(photoObj);
				})
			}
		}
	})
	
	 
		//模仿hover
	$scope.hoverOn = function(obj){
		angular.element(obj.target).parents('.zyx_Sixgrid_img').addClass('hover');
	}
	$scope.hoverOff = function(obj){
		angular.element(obj.target).parents('.zyx_Sixgrid_img').removeClass('hover');
	}
}]);


//省略号
app.directive('ellipsis',function ($interval){
	return {
		link : function (scope, element, attrs){
			var maxLength = 150;
			if(element.text().length>maxLength){
				element.text(element.text().substring(0,maxLength));	
				element.html(element.text() + '...');
			}
		}
	}
});

//时间截取
app.filter("createDateFilter", function () {
    return function (createDate) {
        return createDate.substring(0,10);
    }
});
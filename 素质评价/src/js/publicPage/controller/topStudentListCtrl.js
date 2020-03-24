app.controller('topStudentListCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	console.log($location.$$search.index)
	
	//返回按钮返回路径
	if($location.$$search.bestStuId == '' || $location.$$search.bestStuId == undefined){
		$scope.prevPath = 'wrap.' + $location.$$search.prevPage + '({roleIndex:' + $location.$$search.roleIndex + ',roleAllName:"' + $location.$$search.roleAllName + '",term:"' + $location.$$search.term + '",index:' + $location.$$search.index +'})';
	}else{
		$scope.prevPath = 
		'wrap.publicEvaluation({bestStuId : "'+$location.$$search.bestStuId+'",gradeName :"'+$location.$$search.gradeName+'",classId:"'+$location.$$search.classId+'",term:"'+$location.$$search.term+'",stuName:"'+$location.$$search.stuName+'"})';
	}
	
	var user = JSON.parse(sessionStorage.getItem('user'));
	
	var schoolId;
	if(user.userRole=="stu"){
		
	  schoolId=user.studentInfo.stuClassInfo.schoolId;
	  
	}else if(user.userRole=="tea"){
		
	 schoolId=user.teacherInfo.teaSchoolId;
		
	}else if(user.userRole=="parents"){
	
	 schoolId=user.studentInfo.stuClassInfo.schoolId;
	}
	
	//获取本学校的所有优秀学生(上学期)
	$http.post(requireIp + '/teacher/leaDerController/findGoodStuList.do', {
		schoolId: schoolId,
		term:"上学期"
	}).success(function(data) {
		console.info(JSON.parse(data));
		$scope.gradeList=JSON.parse(data);
	});
	
	//获取本学校的所有优秀学生(下学期)
	$http.post(requireIp + '/teacher/leaDerController/findGoodStuList.do', {
		schoolId: schoolId,
		term:"下学期"
	}).success(function(data) {
		console.info(JSON.parse(data));
		$scope.gradeList1=JSON.parse(data);
	});
}]);


/*app.filter('clafilter', function() {
	return function(obj) {//obj是年级名字
		alert(obj);
		//return obj;
		var user = JSON.parse(sessionStorage.getItem('user'));
		//学校Id
		var schoolId=user.teacherInfo.teaSchoolId;
		console.info("过滤器里面的"+schoolId);
		var wuditzy ;
		$.ajax({
			url : requireIp+'teacher/leaDerController/findClassBySchoolIdAndGradeName.do',
			type : 'post',
			data : {schoolId: schoolId,
				gradeName: obj},
			dataType : 'json',
			cache : false,
			async : false,
			success : function(jdata) {
				var data = JSON.parse(jdata);
				wuditzy = data.classInfo;
			},error:function(){
				alert(1111111);
			}
	});
	
	return wuditzy;

	}
});
app.filter('banfilter', function() {
	return function(obj) {//obj是年级名字
		
	return "("+obj+")班";

	}
});
*/

	


app.controller('classSpaceCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($scope, $state, $timeout, $http, $location, $interval) {
	// if(sessionStorage.getItem("classId")==undefined){
	// 	sessionStorage.setItem("classId",$location.$$search.classId);
	// }else{
	// 	classId = sessionStorage.getItem("classId");
	// 	paramClassId = $location.$$search.classId
	// 	if(classId!=paramClassId&&paramClassId!=undefined){
	// 		sessionStorage.setItem("classId",paramClassId);
	// 	}
	// }
	// if(sessionStorage.getItem("cuid")==undefined){
	// 	sessionStorage.setItem("cuid",$location.$$search.cuid);
	// }else{
	// 	cuid = sessionStorage.getItem("cuid");
	// 	paramCuid = $location.$$search.cuid
	// 	if(cuid!=paramCuid&&paramCuid!=undefined){
	// 		sessionStorage.setItem("cuid",paramCuid);
	// 	}
	// }
	// $http.get(spaceEaIp+"/ea/api/ea/office/"+sessionStorage.getItem("officeId"))
	// .success(function (data) {
	// 	if(data.ret==200){
	// 		var data = data.data;
	// 		$scope.officeName = data.name;
	// 	}
	// })
	// http://218.9.54.48:8888/ea/api/ea/class/111
	var classId = $location.$$search.classId||sessionStorage.getItem("classId")
	$http.get(spaceEaIp+"/ea/api/ea/class/"+classId)
	.success(function (data) {
		// if(data.ret==200){
			console.log(data)
			$scope.className = data.data.gradeName + data.data.name
			// sessionStorage.setItem("cuid",'a;a87fba80a06493d9728a3c05c70442c');//data.classAdviser
		// }
	})
	//变量包
	$scope.commonVar = {
		defaultPage: 0,
		name: "",
		//		edFlag : false,//返回学校空间按钮
		//		userType:sessionStorage.getItem("userType"),
	};
	//	if($scope.commonVar.userType=="4"){
	//			$scope.commonVar.edFlag  = false;//不隐藏
	//		}else{
	//			$scope.commonVar.edFlag  = true;//隐藏返回学校空间按钮
	//		}
	//页面加载完毕事件 
	// $scope.$watch('$viewContentLoaded', function () {
	// 	$http.get(spaceEaIp + "/ea/api/ea/class/" + sessionStorage.getItem("classId")).success(function (data) {
	// 		if (data.ret == 200) {
	// 			var data = data.data;
	// 			console.log(data.gradeName);
	// 			console.log(data.name);
	// 			$scope.realname = data.realname;
	// 			$scope.schoolName = data.officeName;
	// 			$scope.commonVar.name = data.gradeName + "(" + data.name + ")"
	// 			console.log("名称：" + $scope.commonVar.name);
	// 		}
	// 	})
	// 	$http.get(spaceEaIp + "/ea/api/uc/user/" + sessionStorage.getItem("userId"))
	// 		.success(function (data) {
	// 			if (data.ret == 200) {
	// 				var data = data.data;
	// 				$scope.section = data.realname.substring(0, 1);
	// 				$scope.realname = data.realname;
	// 			}
	// 		});
	// });
	// 点击空间展示班级图片跳转到 该班级空间
	//导航
	$scope.spaceNav = [

		{ name: '首页', href: 'wrap.classSpace.classSpaceIndex' },
		// {name : '课程表',href : 'wrap.classSpace.classTimetables'},
		{ name: '班训', href: 'wrap.classSpace.classMotto' },
		{ name: '班级公告', href: 'wrap.classSpace.classNotice' },
		{ name: '班主任介绍', href: 'wrap.classSpace.classHeadTeacher' },
		{ name: '班级介绍', href: 'wrap.classSpace.classIntroduce' },
		{ name: '明星学生', href: 'wrap.classSpace.classStarStudent' },
		{ name: '班级风采', href: 'wrap.classSpace.classPhoto' }
	];

}]);

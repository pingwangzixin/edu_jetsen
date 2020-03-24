app.controller('schoolNewsDetailsCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval',function($rootScope,$scope,$state,$timeout,$http,$location,$interval) {
	
	//上传背景隐藏
	$rootScope.bgFile = false;
	
	//附件列表
	$scope.classNoticeAcce = []
	$scope.variable = {
		type:'7',
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		id:$location.$$search.noticeId,
	};
	$scope.schoolNoticList=[];
	var params = "id="+$scope.variable.id;
	$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?"+params)
	.success(function (data) {
			if(data.ret==200){
			if (data.data.enclosures!="") {
				var enclList=  data.data.enclosures;
				
				angular.forEach(enclList,function(resposne,index){
				var schoolList={};
				schoolList.enclosureName=resposne.enclosureName;
				schoolList.enclosureId=resposne.enclosureId;
				schoolList.enclosureType=resposne.enclosureType;
				schoolList.enclosurePath=resposne.filePath;
				console.log(schoolList)
				$scope.schoolNoticList.push(schoolList);
			})
				console.log($scope.classNoticeAcce)
			}
			$scope.classNotice=data.data;
			$scope.ueditor = data.data.content;
//			var enclosures = data.data.enclosures;
				var obj = {};
				obj.fileId =data.data.id;
				obj.Classname = icon(data.enclosureType);
				obj.name = data.data.enclosureName;
				obj.enclosurePath = data.filePath;
				obj.enclosureName=data.data.enclosures.enclosureName;
				// 获取某个时间格式的时间戳
				var stringTime = data.data.createDate;
				var timestamp2 = Date.parse(new Date(stringTime ));
				var timestamp= timestamp2 /1000;
				console.log(stringTime + "的时间戳为：" + timestamp2);
				var timestamp =new Date(timestamp2);
				var year = timestamp.getFullYear();//获取完整的年份
				var month = timestamp.getMonth()+1;//获取月份
				var today = timestamp.getDate();//获取月中某一日
				obj.createDate=	year+"年"+month+"月"+today+"日";
				$scope.classNoticeAcce.push(obj);
				console.log(year+"年"+month+"月"+today+"日");
				//增加已读数量
				var param = {id:$scope.variable.id};
				$http.post(spaceJeucIp + "/jeuc/api/ea/eaSpaceIntroduce/addReadCount",params).success(function (data) {});
		}
    });
    
    
    function icon(enclosureType){
		 if(enclosureType=="1"){
		 	return "icon-word";
		 }else if(enclosureType=="2"){
		 	return "icon-dashboard_excel";
		 }else if(enclosureType=="3"){
		 	return "icon-ppt1";
		 }else if(enclosureType=="4"){
		 	return "";
		 }else if(enclosureType=="5"){
		 	return "icon-techreport-";
		 }else{
		 	return "";
		 }
		 
	}
	//附件列表
//	$scope.classNoticeAcce = [{
//		'Classname':'icon-word',
//		'name':'1班级空间我的班级空间班级空间我的班级空间班级空间我的班级空间'
//	},{
//		'Classname':'icon-techreport-',
//		'name':'2班级空间我的班级空间班级空间我的班级空间班级空间我的班级空间'
//	},{
//		'Classname':'icon-ppt1',
//		'name':'3班级空间我的班级空间班级空间我的班级空间班级空间我的班级空间'
//	},{
//		'Classname':'icon-dashboard_excel',
//		'name':'4班级空间我的班级空间班级空间我的班级空间班级空间我的班级空间'
//	}]
//	
	
}]);

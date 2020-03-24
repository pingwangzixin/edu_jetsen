app.controller('classNoticeEditCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//定义变量
	$scope.constants = {
		enclosureId:[],
		newEnclosureId:[],
		type:'8',
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		classId:sessionStorage.getItem("classId"),
	};
		//变量包
	$scope.variable = {
		deleteBox : false,		//是否删除弹框
		tipBox : false,			//提示弹框
		tipSuccess : true,		//提示框正确图标为true，错误图标false
		tipWord : ''			//提示框提示文字
	};
	
	//定时提示框事件 1500ms
	function tipBoxShow(succ,word){		
		$scope.variable.tipBox = true;
		$scope.variable.tipSuccess = succ;
		$scope.variable.tipWord = word;
		$timeout(function (){
			$scope.variable.tipBox = false;
		},1500);
	}
	//附件列表
	$scope.classNoticeAcce = []
	//获取url里定义的参数
	$scope.state = $location.$$search.state; 
	if($scope.state==1){//查询数据回填
		$scope.noticeId = $location.$$search.noticeId; 
		var params ='id='+$scope.noticeId;
		$http.get(jeucIp+"/ea/eaSpaceIntroduce/findIntroduceByIdWithEnclosure?"+params)
		.success(function (data) {
			if (data.ret==200) {
				$scope.title = data.data.title;
				$scope.ueditor =data.data.content;
				var enclosures = data.data.enclosures;
				if(enclosures!=""){
					angular.forEach(enclosures,function(data,index){
						var obj = {};
						obj.fileId = data.enclosureId;
						$scope.constants.enclosureId.push(data.enclosureId);
						obj.Classname = icon(data.enclosureType);
						obj.name = data.enclosureName;
						obj.enclosurePath = data.filePath
						$scope.classNoticeAcce.push(obj);
					})
				}
			}
	    });
	}
 
	//删除
	$scope.classNoticeAcceDel = function(i,fileId){
		$scope.variable.deleteBox = true;
		$scope.sureDelete = function(){
			//删除上传附件
			var params ='type='+$scope.constants.type+'&enclosureId='+fileId;
			$http.get(jeucIp+"/ea/eaSpaceIntroduceEnclosure/deleteEnclosureById?"+params)
			.success(function (data) {
				var fileIds = [];
				angular.forEach($scope.constants.enclosureIds,function(data,index){
					if(data!=fileId){
						fileIds.push(data);
					}
				})
				$scope.constants.enclosureIds = fileIds;
				$scope.variable.deleteBox = false;
				$scope.classNoticeAcce.splice(i,1);
				tipBoxShow(true,'删除成功');      //删除成功的调用
		    });
		}
	}
	/**
	 *上传附件
	 */
	$scope.fileUpload=function(me){
	    var file = me.files[0];
	    var fileName = file.name;
	    var classNoticeAcce = {};
	    classNoticeAcce.Classname = iconBySuffix(me);
	    classNoticeAcce.name = fileName;
	    var index = null;
	    $scope.$apply(function (){
	     	index = $scope.classNoticeAcce.push(classNoticeAcce)-1;
	    });
	    var fd = new FormData();
	    fd.append('file', file);
        fd.append('type', $scope.constants.type);
        fd.append("officeId",$scope.constants.classId);
        fd.append("createBy",$scope.constants.createBy);
	 	$http({
    		url:jeucIp + "/ea/eaSpaceEnclosure/uploadEnclosure",
    		method:'POST',
    		data:fd,
    		headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
    	})
    	.success(function(res){
    		if (res.ret==200) {
    				if($scope.state==1){
    			$scope.constants.newEnclosureId.push(res.data.enclosureId);
    		}else{
    			$scope.constants.enclosureId.push(res.data.enclosureId);
    		}
    		$scope.classNoticeAcce[index].fileId = res.data.enclosureId;
    		$scope.classNoticeAcce[index].imagePath = res.data.filePath;
    		}
    	}).error(function(e) {
			error(e)
		})
	}
	/**
	 * 发布班级公告（新增）(ueditor)
	 */
	$scope.publish=function(ueditor){
		if($scope.state==0){
		var params = {
		               type:$scope.constants.type,
		               title:$scope.title,
		               content:$scope.ueditor,
		               enclosureId:$scope.constants.enclosureId.join(","),
		               createBy:$scope.constants.userId,
		               relationId:$scope.constants.classId
		            };
		$http.post(jeucIp+"/ea/eaSpaceIntroduce/publishIntroduce?",params).success(function (data) {
		   		console.log(data);
		   		if (data.ret==200) {
		   			$state.go('classSpace.classNotice.classNoticeList');
		   		}
		    });
		   }
	}
	/**
	 * 修改班级公告（保存） 
	 */
	$scope.save = function(ueditor){
		if($scope.state==1){
			var params = {
				id:$scope.noticeId,
				type:$scope.constants.type,
				title:$scope.title,
				content:$scope.ueditor,
				enclosureId:$scope.constants.newEnclosureId.join(","),
				updateBy:$scope.constants.userId,
				relationId:$scope.constants.classId
			}
//			var param1 ="id="+params.id+"&type="+params.type+"&title="+params.title+"&content="+params.content+"&enclosureId="+params.enclosureId+"&updateBy="+params.updateBy;			
			$http.post(jeucIp + "/ea/eaSpaceIntroduce/updateIntroduceById?",params)
			.success(function (data) {
		   			console.log(data);
		   			if (data.ret==200) {
		   			$state.go('classSpace.classNotice.classNoticeList');
		   		}
		    });
		}
	}
	/**
	 * 取消
	 */
	$scope.cancel = function(){
		$state.go('classSpace.classNotice.classNoticeList');
	}
//	var upFileName = $("#fileToUpload").val();
//	var index1=upFileName.lastIndexOf(".");
//	var index2=upFileName.length;
//	var suffix=upFileName.substring(index1+1,index2);//后缀名
	
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
	/**
	 * 通过上传文件后缀获取附件icon图片
	 */
	function iconBySuffix(obj){
		 var word = [".docx",".doc"];
		 var image =[".gif",".jpeg",".jpg",".png",".svg"];
		 var ppt =[".pptx",".ppt"];
		 var excel = [".xlsx",".xls"];
		 
		 var filesuffix = obj.value.substring(obj.value.lastIndexOf('.'));
		 if($.inArray(filesuffix,word)!=-1){
		 	return "icon-word";
		 }else if($.inArray(filesuffix,image)!=-1){
		 	return "icon-techreport-";
		 }else if($.inArray(filesuffix,ppt)!=-1){
		 	return "icon-ppt1";
		 }else if($.inArray(filesuffix,excel)!=-1){
		 	return "icon-dashboard_excel";
		 }else{
		 	return "";
		 }
		 
	}
}]);

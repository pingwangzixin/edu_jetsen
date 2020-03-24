app.controller('inClassAnalysisCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
		examId : JSON.parse(sessionStorage.getItem("teaExamInfo")).examId,
		assemblyId: $stateParams.assemblyId,
		classId : JSON.parse(sessionStorage.getItem("teaExamInfo")).classId					
	};

	//8种题型
	$scope.questionBank = {
		//单选
		single : [
			{id:444}
		],
		//多选
		many : [
			{id:444}
		],
		//判断
		judge : [
			{id:444}
		],
		//填空
		fill : [
//			{id:444,showAnswer:true,answer:'尼奥啥都奥斯都是|爱神的箭lsa|撒抵抗力交三方|撒的',answerArr:[]}
			{id:444}
		],
		//材料
		material : [
			{id:444}
		],
		//简答
		answer : [
			{id:444}
		],
		//完形填空
		gestalt : [
		//完形填空选项
//			{id:111,showAnswer:true,list:[{option:'A'},{option:'C'},{},{option:'C'}]},
//			{id:333,showAnswer:true,list:[{option:'A'},{}]},
			{id:444}
		],
		//阅读理解
		read : [
			{id:444}
		]
	};


	$scope.findExamCount = function(){
		var url = lessonIp+"stuExam/examCount?examId="+$scope.variablePacket.examId
				+"&assemblyId="+$scope.variablePacket.assemblyId
				+"&classId="+$scope.variablePacket.classId;
//		var url = lessonIp+"stuExam/examCount?examId=1e90547d96d847f9a7833d0c3313de4e"
//				+"&assemblyId=1db276f823cd46519f10bff4b1b220aa"
//				+"&classId=1635f23723264e0f919c6404f146715d";
		$http.get(url).success(function(result) {
			var correctRateTable = [];
			if(result.ret==200){
				var data = result.data;
				var obj = {};
				for(var i=0,len=data.length; i<len; i++){
					obj.titNum=checkTypeNum(data[i].typeSort);
					obj.littleTitNum=data[i].sort;
					obj.type=data[i].typeName;
					obj.correctRate=data[i].correctRate;
					obj.number=data[i].errorCount;
					correctRateTable.push(obj);
					obj = {};
//					obj.lessHalf:true;
				}
			}
				$scope.variablePacket.correctRateTable = correctRateTable;
		})
	}
	
	$scope.findExamCount();
	
	function checkTypeNum(sort){
		 switch (sort) {
            case 1:
                return "一、";
            case 2:
                return "二、";
            case 3:
                return "三、";
            case 4:
                return "四、";
            case 5:
                return "五、";
            case 6:
                return "六、";
            case 7:
                return "七、";
            case 8:
                return "八、";
        }
	}
}]);


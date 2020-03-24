app.controller('guidanceAnalysisCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//变量包
	$scope.variablePacket = {
									
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

	
}]);


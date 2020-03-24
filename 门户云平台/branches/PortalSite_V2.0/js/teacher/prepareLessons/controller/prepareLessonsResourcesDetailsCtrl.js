app.controller('prepareLessonsResourcesDetailsCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile','$stateParams','$anchorScroll',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile,$stateParams,$anchorScroll) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '在线备课';
	
	
	$scope.variablePacket={
		item:$stateParams.item,
  	}; 
  	$scope.filetypeContent =[
	       {
				id: 1,
				type: "ppt", //文件类型
				name: "考试试卷.ppt", //文件名称
				uploader: "张三", //上传者
				time: "2017-02-03", //上传时间
				size: "11115.k", //文件大小
				prepare: true, //是否备课
				src: "img/resources_ppt.png" //ppt文件类型图标
			},
			{
				id: 2,
				type: "word",
				name: "考试试卷哈哈哈哈.word",
				uploader: "张三疯",
				time: "2018-03-03",
				size: "11112.k",
				prepare: true, 
				src: "img/resources_word.png"  //word文件图标
			},
			{
				id: 3,
				type: "video",
				name: "考试试卷.video",
				uploader: "张三",
				time: "2017-03-03",
				size: "11111.k",
				prepare:false, 
				src: "img/resources_video.png"  //视频文件图标
			},
			{
				id: 4,
				type: "pic",
				name: "考试试卷.pic",
				uploader: "李四",
				time: "2017-03-06",
				size: "11111.k",
				prepare: true, 
				src: "img/resources_pic.png" //图片文件图标
			},
			{
				id: 5,
				type: "audio",
				name: "考试试卷.audio",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_ear.png" //音频文件图标
			},
			{
				id: 6,
				type: "excal",
				name: "考试成绩统计表.excal",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_excal.png" //excal文件图标
			},
			{
				id: 6,
				type: "package",
				name: "考试成绩统计表.备课包",
				uploader: "李四狗",
				time: "2016-03-06",
				size: "11121.k",
				prepare: true, 
				src: "img/resources_package.png" //文件包文件图标
			}
			
	];
   $scope.filetypedetails=[$scope.filetypeContent[$scope.variablePacket.item]];//根据接收过来的id来确定头部所要显示的信息
  $scope.Del = function(i) {         //删除
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$state.go("secondNav.prepareLessonsList");
		};
	
	};
	
}]);
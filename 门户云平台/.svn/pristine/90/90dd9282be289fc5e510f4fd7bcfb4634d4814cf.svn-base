app.controller('examineFineCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state,$stateParams,$timeout,$http,$location,$interval) {
	
	//变量包
    $scope.variablePacket = {
    	formatIndex:0,    //格式切换默认索引
    	sortIndex:0,      //排序切换默认索引
		format: [  //格式切换的数据
			{
				resourceType:"all",
				name: "全部"
			},
			{
				resourceType:"picture",
				name: "图片"
			},
			{
				resourceType:"word",
				name: "文档"
			},
			{
				resourceType:"video",
				name: "视频"
			},
			{
				resourceType:"audio",
				name: "音频"
			},
			{
				resourceType:"PPT",
				name: "PPT"
			}
		],
		sort: [   //排序切换的数据
			{
				name: "上传时间"
			},
			{
				name: "浏览数"
			},
			{
				name: "下载数"
			}
		]
		
    };
    $scope.resourceContent = { //资源文件列表信息
	    all: [
    		{
				id: 1,
				type: "ppt", //文件类型
				name: "五年级语文期末试卷", //文件名称
				uploader: "张三", //上传者
				site:'保定市第一小学', // 位置
				time: "2017-05-12", //上传时间
				browse: 35, //浏览数
				download: 34, //下载数
				src: "img/resources_ppt.png", //文件类型图标
				fine:false
			},
			{
				id: 2,
				type: "word",
				name: "五年级语文期末试卷",
				uploader: "李四",
				site:'保定市第一小学', 
				time: "2017-03-23",
				browse: 305, 
				download: 55,
				src: "img/resources_word.png",
				fine:false

			},
			{
				id: 3,
				type: "video",
				name: "考试试卷",
				site:'保定市第一小学', 
				uploader: "王五",
				time: "2017-01-09",
				browse: 245, 
				download: 45,
				src: "img/resources_mp4.png",
				fine:false
			},
			{
				id: 4,
				type: "audio",
				name: "考试试卷下哈哈哈去",
				site:'保定市第一小学', 
				uploader: "张三",
				time: "2017-02-03",
				browse: 451, 
				download: 35,
				src: "img/resources_ear.png",
				fine:false
			},
			{
				id: 5,
				type: "picture",
				name: "考试试卷",
				site:'保定市第一小学', 
				uploader: "张三",
				time: "2017-05-03",
				browse: 45, 
				download: 35,
				src: "img/resources_pic.png",
				fine:false
			},
			{
				id: 6,
				type: "ppt",
				name: "考试试卷呵呵哒",
				site:'保定市第一小学', 
				uploader: "张三",
				time: "2017-03-01",
				browse: 35, 
				download: 34,
				src: "img/resources_ppt.png",
				fine:false
			}
	
		],
		word: [{
			id: 1,
			type: "word",
			name: "五年级语文期末试卷",
			uploader: "李四",
			site:'保定市第一小学', 
			time: "2017-03-23",
			browse: 305, 
			download: 55,
			src: "img/resources_word.png"
		}
		],
		video: [{
				id: 1,
				type: "video",
				name: "考试试卷",
				site:'保定市第一小学', 
				uploader: "王五",
				time: "2017-01-09",
				browse: 245, 
				download: 45,
				src: "img/resources_mp4.png"
			}

		],
		voice: [{
				id: 1,
				type: "audio",
				name: "考试试卷下哈哈哈去",
				site:'保定市第一小学', 
				uploader: "张三",
				time: "2017-02-03",
				browse: 451, 
				download: 35,
				src: "img/resources_ear.png"
			}

		],
		pic: [{
				id: 1,
				type: "picture",
				name: "考试试卷",
				site:'保定市第一小学', 
				uploader: "张三",
				time: "2017-05-03",
				browse: 45, 
				download: 35,
				src: "img/resources_pic.png"
			}

		],
		ppt: [{
				id: 1,
				type: "PPT",
				name: "五年级语文期末试卷",
				uploader: "李四",
				site:'保定市第一小学', 
				time: "2017-03-23",
				browse: 305, 
				download: 55,
				src: "img/resources_ppt.png"
			}

		]
	};
	// 格式切换
	$scope.formatTab = function(index){
		$scope.variablePacket.formatIndex = index;
	}
	// 排序切换
	$scope.sortTab = function(index){
		$scope.variablePacket.sortIndex = index;
	}
	//返回资源管理列表参数
	if($stateParams.resources != null && $stateParams.format != null && $stateParams.sort != null) { 
		$scope.variablePacket.resourcesIndex = $stateParams.resources;
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//返回审核精品列表参数
	if($stateParams.format != null&&$stateParams.sort != null) { 
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//点击通过
	$scope.adopt = function (index,type,title){
		$scope.promptShow('已通过',true,title);
		$scope.delOk = function (){
			$scope.resourceContent[type].splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('已通过',true,title);
		};
	};
	//点击打回
	$scope.repulse = function (index,type,title){
		$scope.promptShow('已通过',true,title);
		$scope.delOk = function (){
			$scope.resourceContent[type].splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('已通过',true,title);
		};
	};

}]);

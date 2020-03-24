app.controller('resourceManageListCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state,$stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	resourcesIndex:0, //资源切换默认索引
    	formatIndex:0,    //格式切换默认索引
    	sortIndex:0,      //排序切换默认索引
		isCityLevel:false, //市级角色 true,校级角色false
		resources: [  //资源切换的数据
			{
				resourceState:"resourceAllState",
				name: "全部"
			},
			{
				resourceState:"resourceOpenState",
				name: "公开资源"
			},
			{
				resourceState:"resourceFineState",
				name: "精品资源"
			},
			{
				resourceState:"resourceSmallState",
				name: "微课大赛"
			}
		],
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
				fine:true   //校精品（true 显示 、false 不显示）
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
				fine:true
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
				fine:true
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
				fine:true
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
			src: "img/resources_word.png",
			fine:false
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
				src: "img/resources_mp4.png",
				fine:true
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
				src: "img/resources_ear.png",
				fine:true
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
				src: "img/resources_pic.png",
				fine:true
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
				src: "img/resources_ppt.png",
				fine:false
			}

		]
	};
	// 资源切换
	$scope.resourcesTab = function(index,state){
		$scope.variablePacket.resourcesIndex = index;
		$scope.variablePacket.resourceStates = state;
	}
	// 格式切换
	$scope.formatTab = function(index){
		$scope.variablePacket.formatIndex = index;
	}
	// 排序切换
	$scope.sortTab = function(index){
		$scope.variablePacket.sortIndex = index;
	}
	//返回参数
	if($stateParams.resources != null&&$stateParams.format != null&&$stateParams.sort != null) { 
		$scope.variablePacket.resourcesIndex = $stateParams.resources;
		$scope.variablePacket.formatIndex = $stateParams.format;
		$scope.variablePacket.sortIndex = $stateParams.sort;
	};
	//删除列表项
	$scope.delDate = function (index,type,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			$scope.resourceContent[type].splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
		};
	};
    
    
    // 分页组件
	$scope.contentpageConfig = {
		currentPage: 1,
		pagesLength:15,
		totalItems: 20,
		itemsPerPage: 10,
		perPageOptions: [5],
		onChange: function() {
			
		}
	}
	
	
}]);


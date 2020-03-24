app.controller('personalResourcesCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,$stateParams) {

	//变量包
    $scope.variablePacket = {
    	selected:'', //定义选择得学年
    	statesIndex:'', //定义按钮切换
    	teacherResources:$stateParams.user, //教师资源显示
		studyYear:[  //学年数据模拟
			{id:'1',name:'2011-2012学年'},
			{id:'2',name:'2013-2014学年'},
			{id:'3',name:'2015-2016学年'},
			{id:'4',name:'2017-2018学年'}
		],
		PersonalInformation:[  //表格数据模拟
			{id:'1',name:'王立志',role:'教师',upload:'1',lower:'10'}
		],
		Resources:[  //资源数据模拟
			{id:'1',name:'五年级语文期末试卷',src:'img/resources_ppt.png',fine:true,size:'1282.02k',time:'2017-08-20'},
			{id:'2',name:'2016-2017学年六年总复习',src:'img/resources_video.png',fine:false,size:'1102.02k',time:'2017-05-20'},
			{id:'3',name:'2016—2017学年六年级]复习计划',src:'img/resources_ear.png',fine:true,size:'12.02k',time:'2017-02-21'},
			{id:'4',name:'唐诗鉴赏视频',src:'img/resources_pic.png',fine:false,size:'122.02k',time:'2017-05-20'},
			{id:'5',name:'二胡音乐赏析',src:'img/resources_excal.png',fine:false,size:'182.02k',time:'2017-07-20'}
		]
    };
    $scope.variablePacket.selected='1';//id的值，区分类型
    $scope.variablePacket.selected=$scope.variablePacket.studyYear[0].id;//默认取第一个值:'2011-2012学年'
    //切换上传下发按钮
    $scope.changestate = function($index){
    	$scope.variablePacket.statesIndex = $index;
    }
    //返回上一路由
    $scope.back = function(){
    	history.back();
    }
}]);

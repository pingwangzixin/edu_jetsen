app.service('templateServer',['$rootScope','$http',function($rootScope,$http){
//	console.log(this)
//	console.log($http)
	/*
	//logo
	this.serLogoBox = [
		{path : 'img/logo_place.png'},
		{path : 'img/jetsen_logo.png'}
	];
	
	//风格
	this.serStyleSet = [
		{partClass : 'zy_tidewater_blue',name : '潮水蓝',checked : true,styleClass : 'whole_style_blue',bigBg : 'blue_pic',timePic : 'blue_time'},
		{partClass : 'zy_emerald_green',name : '翡翠绿',checked : false,styleClass : 'whole_style_green',bigBg : 'green_pic',timePic : 'green_time'}
//		{partClass : 'zy_Lavender',name : '熏衣紫',checked : false,styleClass : 'whole_style_violet',bigBg : 'violet_pic',timePic : 'violet_time'},
//		{partClass : 'zy_pearl_red',name : '珍珠红',checked : false,styleClass : 'whole_style_red',bigBg : 'red_pic',timePic : 'red_time'}
	];
	
	//板式---排版
	this.typesettingChoose = [ 
		{img : 'plate1',name: '板式一',checked : true},
//		{img : 'plate2',name: '板式二',checked : false}
//		{img : 'plate3',name: '板式三',checked : false}
	];
	
	//导航栏
	this.serColumn = [
		{name : '首页',href : 'wrap.index',checked : true},
		{name : '资源',href : 'wrap.resources',checked : true},
		{name : '应用',href : 'wrap.application',checked : true},
		{name : '消息',href : 'wrap.new',checked : true},
		{name : '帮助',href : 'wrap.help',checked : true},
		{name : '校讯通',href : 'wrap.RQCode',checked : true}
	];
	
	//组件
	this.assembly = [
		{imgChecked : 'application_yes',imgUnchecked : 'application_no',name : '应用',checked : true},
		{imgChecked : 'message_yes',imgUnchecked : 'message_no',name : '消息中心',checked : true},
		{imgChecked : 'space_yes',imgUnchecked : 'space_no',name : '空间展示',checked : true},
		{imgChecked : 'monitor_yes',imgUnchecked : 'monitor_no',name : '应用监控',checked : true}
	];
	*/
	this.serLogoBox = [];
	this.serStyleSet = [];
	this.typesettingChoose = [];
	this.serColumn = [];
	this.assembly = [];
}]);
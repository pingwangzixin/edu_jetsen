
app.controller('loginIndexCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', 'templateServer', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, templateServer) {
	//导航显示


	$timeout(function () {
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 2500,		//是否自动轮播及间隔时间
			loop: false,		//是否无缝轮播
			autoplayDisableOnInteraction: false,	//用户操作是否停止轮播	
			autoplayStopOnLast:true,		//轮播到最后一张停止（loop模式下无效）
			pagination: '.swiper-pagination',
			paginationClickable: true,		//分页器空值图片切换
			
		})
	}, 0);
	//用户信息
	$scope.userInfo = {
		username: "",
		password: "",
		isUser: true,
	};
	//主体数据
	$scope.loginData = {
		//登录页主体部分的数据
		contentData: [
			{
				img: "img/loginCont1.png",
				title: "智慧课堂",
				dec: "打造智能、高效的课堂教学形态",
				bgDec: ["轻星级教学应用、常态化立体数据采集，助力课堂讲评、教学反思，提升教学效果。", "线上线下结合，多终端协同，创造泛在学习环境，提升学生自主学习能力。"],
				bgImg: "img/blueBg.png",

			},
			{
				img: "img/loginCont2.png",
				title: "智慧教学",
				dec: "贯穿教学全流程，为学校提供一站式教学服务",
				bgDec: ["信息化教学的新境界，是在教学过程中借助信息化技术手段，使学生迅速、灵活、正确的理解知识和提升解决问题能力的教学模式。", "包含资源库、课程中心、考试分析、学情分析、综合素质评价、学生成长档案、体质健康等七个板块。"],
				bgImg: "img/greenBg.png",

			},
			{
				img: "img/loginCont3.png",
				title: "学情分析",
				dec: "动态采集学情数据，形成多维分析报告",
				bgDec: ["利用平台优势，让家长和学生随时了解学生在年级班级中的学习状况，进行学生成绩的质量分析和跟踪。随时获得有效的质是反馈信息。", "从多维度、多视角对整体班级的实力状况进行综合分析，及时进行教学反思和教学评价。"],
				bgImg: "img/blueBg.png",

			},
			{
				img: "img/loginCont4.png",
				title: "智慧排课",
				dec: "自动化教务排课，降低老师排课、调课难度",
				bgDec: ["自动化教务排课管理，直观清晰高效快捷，适用于小学初中高中的教务排课管理，校务人员通过设置教学任务及排课规则，对教学进度、要求及课时分布进行智能编排。"],
				bgImg: "img/greenBg.png",

			},
			{
				img: "img/loginCont5.png",
				title: "智慧班牌",
				dec: "丰富校园文化生活，助力智慧校园建设",
				bgDec: ["捷成电子班牌解决方案通过液晶显示班牌，实时显示班级风采，并进行动态数据采集。", "通过平台发布信息，提供了一个小范围的、有指向性的、信息是较多、更新频率即时的信息载体，能够加强班级文化建设和班级风采展示，提供了教师、家长在学校与学生沟通的新方式。"],
				bgImg: "img/blueBg.png",

			},
			{
				img: "img/loginCont6.png",
				title: "智慧管理",
				dec: "全面解决办公、教学、教务等方面的管理需求",
				bgDec: ["以大数据能力平台为基础，构建区、校两级教育管理与决策的分析体系和指标模型。", "完成区校教学及管理数据的有效治理；实现区、校教育信息化应用的有效监管和可视展现；促进区校教育信息化的深入常态应用；并进一步促进教育数据资产化和数据应用生态闭环。"],
				bgImg: "img/greenBg.png",

			},

		],
		//二维码放下面数组里
		codeData: [
			{
				index: 0,
				img: 'img/iosT1.png',
				imgSrc: "img/iosT.png",
				hoverImg: "img/iosT1.png",
				downImg: "img/iosT1.png",
				downText: "IOS教师端下载"
			},
			{
				index: 1,
				img: 'img/iosP.png',
				imgSrc: "img/iosP.png",
				hoverImg: "img/iosP1.png",
				downImg: "img/iosP1.png",
				downText: "IOS家长端下载"
			},
			{
				index: 2,
				img: 'img/androidT.png',
				imgSrc: "img/androidT.png",
				hoverImg: "img/androidT1.png",
				downImg: "img/androidT1.png",
				downText: "Android教师端下载"
			},
			{
				index: 3,
				img: 'img/androidP.png',
				imgSrc: "img/androidP.png",
				hoverImg: "img/androidP1.png",
				downImg: "img/androidP1.png",
				downText: "Android家长端下载"
			},
		],
		//默认显示二维码
		downInfo: {
			imgSrc: "img/teacherRQ.png",
			text: "IOS教师端下载"
		},
	};
	//登录错误信息
	$scope.userLoggedMsg = {
		showTips : false,
		errorTip : ''
	};
	//点击切换不同的二维码
	$scope.imgChange = function (index) {
		$scope.loginData.codeData.forEach(item => {
			item.img = item.imgSrc
		});
		$scope.loginData.codeData[index].img = $scope.loginData.codeData[index].hoverImg;
		$scope.loginData.downInfo.imgSrc = $scope.loginData.codeData[index].downImg;
		$scope.loginData.downInfo.text = $scope.loginData.codeData[index].downText;
	};
	//用户登录
	$scope.userChange = function () {
		$scope.userInfo.isUser = true
	};
	//管理员登录
	$scope.manageChange = function () {
		$scope.userInfo.isUser = false      
	};

	//点击登录按钮
	$scope.login = function (index) {
		if ($scope.userInfo.isUser) {	//用户登录
			key = ""
			$http.get(requireIp + 'jeuc/api/uc/login?username=' + $scope.userInfo.username + '&password=' + hex_md5(hex_md5($scope.userInfo.password)) + '&key=' + key).success(function (data) {
				if (data.ret == 200) {
					sessionStorage.setItem('userId', data.data.id);
					sessionStorage.setItem('userType', data.data.userType);
					userId = sessionStorage.getItem('userId') || '';
					if (data.data.userType == 1) {
						$state.go('wrap.space.teacherSpace');
					} else if (data.data.userType == 2 || data.data.userType == 3) {
						$state.go('wrap.space.studentSpace');
					}else {
					$scope.userInfo.username = "";
					$scope.userInfo.password = '';
					$scope.userLoggedMsg.showTips = true;
					$scope.userLoggedMsg.errorTip = '用户名或密码错误!';

				}
			}
			}).error(function () {
				$scope.userInfo.username = "";
					$scope.userInfo.password = '';
				// $scope.userLoggedMsg.errorTip = '系统错误';
			});
		} else {	//管理员登录
			key = ""
			$http.get(requireIp + 'jeuc/api/uc/login?username=' + $scope.userInfo.username + '&password=' + hex_md5(hex_md5($scope.userInfo.password)) + '&key=' + key).success(function (data) {
				if (data.ret == 200) {
					sessionStorage.setItem('userId', data.data.id);
					sessionStorage.setItem('userType', data.data.userType);
					userId = sessionStorage.getItem('userId') || '';
					if (data.data.userType == 4) {
						$state.go('adminSpace');
					}
				}
			}).error(function () {
				$scope.userInfo.username = "";
				$scope.userInfo.password = '';
				// $scope.userLoggedMsg.errorTip = '系统错误';
			});
		}
	}

}]);


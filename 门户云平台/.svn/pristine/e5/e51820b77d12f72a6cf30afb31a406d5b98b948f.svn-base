app.controller('classSpaceIndexCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//上传背景显示
	$rootScope.bgFileClass = true;
	
	//轮播图
	$scope.imgBox = [
		{src : 'ad_1'},
		{src : 'cs'},
		{src : 'newsImg'}
	];
	$scope.imgBox = $scope.imgBox.concat($scope.imgBox);

	$scope.variable={
		classId:sessionStorage.getItem("classId"),
		cuid:sessionStorage.getItem("cuid"),
		userId:sessionStorage.getItem("userId"),
		classIntrduce : 150,
		classTeacherIntrduce : 150,
		topStudentIntrduce : 20,
		isInnovation:"",
		officeId:sessionStorage.getItem("officeId"),
		enclosureId:sessionStorage.getItem("enclosureId"),
		enclosureType:sessionStorage.getItem("enclosureType"),
		show:false,// 是否显示周日 默认隐藏
	 	ensconce:true,//是否显示周六  
	}
	
		//查询班级首页背景图片 
	 		$scope.backGroundImagePath = "";
			var params ='type=0'+'&relationId='+$scope.variable.classId;
			$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params).success(function (data) {
				if(data.ret==200&&data.data!=null){
					$scope.id = data.data.id;
					$scope.content =data.data.content;
					if(data.data.imagePath==''){
			    		$scope.backGroundImagePath = "./img/ad_1.jpg";
			    	}else{
			    		$scope.backGroundImagePath = data.data.imagePath;
			    	}
				}
	    });
	/**
	 * 班级介绍
	 */
	var params ='type=4&'+'relationId='+$scope.variable.classId;
		$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params).success(function (data){
			if(data.ret==200){
				var classContent = data.data.content;
				console.log($('.zy_class_introduce zy_introduce_cont>div'))
				$('.zy_class_introduce .zy_introduce_cont>div').html(classContent);
				$scope.classimagePath = data.data.imagePath;
			}
		})
	/**
	 * 班级介绍
	 */
	var params ='type=5&'+'relationId='+$scope.variable.classId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/?"+params).success(function (data){
		if(data.ret==200){
			var teacherContent = data.data.content;
			$('.teacherIntroduce').html(teacherContent);
			$scope.teacherImagePath = data.data.imagePath;
		}
	})
	
	/**
	 * 查询班级公告列表
	 */
	var params ='type=8&relationId='+$scope.variable.classId+'&pageNo=1&pageSize=5';
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
	.success(function (data) {
		if(data.ret==200){
			$scope.classNoticeList = data.data.list;
		}
    });
    
    /**
	 * 查询明星学生列表
	 */
	var params ='type=6'+'&relationId='+$scope.variable.classId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/list?"+params)
	.success(function (data) {
		if(data.ret==200){
			$scope.starStudentList = data.data.list;
			console.log($scope.starStudentList);
		}
    });
    
	$scope.amCourseList=[];
	$scope.pmCourseList=[]
	var classId = $scope.variable.classId.toString();
	 
	if(	classId.indexOf("_")>0){
		$scope.variable.isInnovation="0";
		console.log($scope.variable.isInnovation)
	}else{
		$scope.variable.isInnovation="1";
		console.log($scope.variable.isInnovation)
	}
	 
	var params ='classId='+sessionStorage.getItem("classId")+"&isInnovation="+$scope.variable.isInnovation;
	console.log(params);
	$http.get(jeucIp+"/ea/eaSpaceIntroduce/lookCourseSchedule?"+params)
	.success(function (data) {
		if(data.ret==200){
			var dayNum = data.data.courseInfo.dayNum;//共计几天课
			 if (dayNum==7) {//不隐藏周六周日
			 		$scope.variable.show=true; 
			 		$scope.variable.ensconce=false
			 }else if(dayNum<=6){//隐藏周日
			 		$scope.variable.show=false;
			 }else if(dayNum<6){//周六周日都隐藏
			 	scope.variable.show=false; 
			 	$scope.variable.ensconce=true;
			 	
			 }
			$scope.dayNum = [];
			for(var i=1;i<=dayNum;i++){
				$scope.dayNum.push(getWeek(i));
			}
			var weekLesson = data.data.weekLesson;
			var amnoon = data.data.courseInfo.amnoon;//上午课时节数
			var classNum = data.data.courseInfo.classNum;
			/**
			 * 上午课表
			 */
			for(var i=1;i<=amnoon;i++){
				var course = {};
				angular.forEach(weekLesson,function(lession,index){
//					console.log(lession)
//					console.log(lession.lessonNum+"----"+i)
					if(lession.lessonNum==i){
						course.lessionNum = getClassHour(lession.lessonNum);
						if(lession.weekNum==1){
							course.Monday = lession.subjectName;
						}
						if(lession.weekNum==2){
							course.Tuesday = lession.subjectName;
						}
						if(lession.weekNum==3){
							course.Wednesday = lession.subjectName;
						}
						if(lession.weekNum==4){
							course.Thursday = lession.subjectName;
						}
						if(lession.weekNum==5){
							course.Friday = lession.subjectName;
						}
						if(lession.weekNum==6){
							course.Saturday = lession.subjectName;
						}
						if(lession.weekNum==6){
							course.Sunday = lession.subjectName;
						}
					}
					
				});
				$scope.amCourseList.push(course);
			}
			/**
			 * 下午课表
			 */
			for(var i=1;i<=classNum-amnoon;i++){
				var course = {};
				angular.forEach(weekLesson,function(lession,index){
					if((lession.lessonNum-amnoon)==i){
						course.lessionNum = getClassHour(lession.lessonNum);
						if(lession.weekNum==1){
							course.Monday = lession.subjectName;
						}
						if(lession.weekNum==2){
							course.Tuesday = lession.subjectName;
						}
						if(lession.weekNum==3){
							course.Wednesday = lession.subjectName;
						}
						if(lession.weekNum==4){
							course.Thursday = lession.subjectName;
						}
						if(lession.weekNum==5){
							course.Friday = lession.subjectName;
						}
						if(lession.weekNum==6){
							course.Saturday = lession.subjectName;
						}
						if(lession.weekNum==6){
							course.Sunday = lession.subjectName;
						}
					}
					
				});
				$scope.pmCourseList.push(course);
			}
		}
    });
//	
	function getWeek(obj){
		if(obj==1){
			return "星期一";
		}
		if(obj==2){
			return "星期二";
		}
		if(obj==3){
			return "星期三";
		}
		if(obj==4){
			return "星期四";
		}
		if(obj==5){
			return "星期五";
		}
		if(obj==6){
			return "星期六";
		}
		if(obj==7){
			return "星期日";
		}
		
	}
	function getClassHour(obj){
		if(obj=='1'){
			return "第一节";
		}
		if(obj=='2'){
			return "第二节";
		}
		if(obj=='3'){
			return "第三节";
		}
		if(obj=='4'){
			return "第四节";
		}
		if(obj=='5'){
			return "第五节";
		}
		if(obj=='6'){
			return "第六节";
		}
		if(obj=='7'){
			return "第七节";
		}
		if(obj=='8'){
			return "第八节";
		}
	}
}]);

//轮播图
app.directive('carousel',function ($interval){
	return {
		restrict: 'EA',
		replace: true,
		link: function(scope, element, attrs) {
			var scrollBox = element.parent();
			var toLeftBtn = scrollBox.prev();
			var toRightBtn = scrollBox.next();
			var w = 1200;
			var timer = null;
			if(scope.$last){
				var moveLength = scrollBox.children().length;
				scrollBox.css({'width':moveLength*w,'left':-w*moveLength/2});
				var i = 0;
				
				timer = $interval(init,1000);
				
				$('.zy_carousel_wrap').on('mouseover',(scrollBox,toLeftBtn,toRightBtn),function (){
					$interval.cancel(timer);
				});
				$('.zy_carousel_wrap').on('mouseout',(scrollBox,toLeftBtn,toRightBtn),function (){
					timer = $interval(init,1000);
				});
				
				function init(){
					toRightBtn.trigger('click');
				}
				
				toLeftBtn.on('click',function (){
					i = parseInt(scrollBox.css('left'))+w;
					move(i);
				});
				toRightBtn.on('click',function (){
			   		i = parseInt(scrollBox.css('left'))-w;
			   		move(i);
				});
				
				function move(i){
					if(scrollBox.is(':animated')){ 
				    	return;
				   	}else{
						scrollBox.stop().animate({'left':i},1000,function (){
				   			if(i==0){
				   				scrollBox.css({'left':-w*moveLength/2});
				   			}else if(i==(1-moveLength)*w){
				   				scrollBox.css({'left':w*(1-moveLength/2)});
				   			}
				   		});
				   	}
				}
			}
		}
	}
});

//省略号
app.directive('ellipsis',function ($interval){
	return {
		scope : {
			maxLength : '='
		},
		link : function (scope, element, attrs){
//			console.log(scope.variable.classTeacherIntrduce)
			console.log(scope.maxLength)
//			var maxLength = 150;
			if(element.text().length>scope.maxLength){
				element.text(element.text().substring(0,scope.maxLength));	
				element.html(element.text() + '...');
			}
		}
	}
});

//时间截取
app.filter("createDateFilter", function () {
    return function (createDate) {
        return createDate.substring(0,10);
    }
});
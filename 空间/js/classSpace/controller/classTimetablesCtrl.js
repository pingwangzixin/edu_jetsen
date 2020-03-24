app.controller('classTimetablesCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {

	$scope.amCourseList=[];
	$scope.pmCourseList=[]
	var params ='classId='+sessionStorage.getItem("classId")+"&isInnovation=0";
	$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceIntroduce/lookCourseSchedule?"+params)
	.success(function (data) {
		if(data.ret==200){
			var dayNum = data.data.courseInfo.dayNum;//共计几天课
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
						if(lession.weekNum==7){
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

app.controller('publicEvaluationCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//用户信息
	//学生id
	var stuId = "";
	//状态码
	var state = "";
	
	//时间（时间有效期）
	var dateState = "";
	$scope.user = {
		//年级
		gradeName :  "",
		//学期
		term : '',
		//班级
		classId : "",
		//学生数据信息
		userData : [],
		//学生资质
		stuPro : [],
		//学生佐证
		teaPro : [],
		//评价老师
		evalAuthorName:'',
		//教师评语
		teaComment:'',
		//学生自评
		selComment:'',
		//家长评语
		homeComment:'',
		//用户id
		userId:'',
		//用户姓名
		userName:'',
		//学生姓名
		stuName:''
	}
	
	//上传附件列表长度
	$scope.fileLength = {
		tea : 0,
		stu : 0
	};
	
	$scope.term = "上学期";
	$.ajax({
		type:"OPTIONS",
		url:"/",
		async : false,
		complete:function(x){
			//alert(x.getResponseHeader("Date"))//Wed, 27 Dec 2017 08:56:17 GMT  得到时间格式
			console.info(x.getResponseHeader("Date"));
			var data=new Date(x.getResponseHeader("Date"));//实例化时间
			var month=data.getMonth()+1;
			if(month==9||month==10||month==11||month==12||month==1||month==2){//上学期
				$scope.term="上学期";
			}else{//下学期
				$scope.term="下学期";
			}
			//date=data;
			//alert(data.getFullYear());//得到当前的年份
			//alert(data.getMonth());//得到当前的年份
			}
	})
	
	
	
	
	$scope.schoolId="";
	$scope.userInfo = {}
	//用户信息
	var bestStuId = $location.$$search.bestStuId;
	if(bestStuId=='null'||bestStuId==null||bestStuId==''){
		$scope.userInfo = JSON.parse(sessionStorage.getItem("user"));
	}else{
		$scope.userInfo.userRole=='stu';
	}
	console.log($scope.userInfo)
	//角色为代课老师或者班主任
	if($scope.userInfo.userRole=='tea'){
		//学校Id
		$scope.schoolId = $scope.userInfo.teacherInfo.teaSchoolId;
		$scope.user.gradeName = sessionStorage.getItem("gradeName");
		$scope.user.term = sessionStorage.getItem("term");
		$scope.user.classId = sessionStorage.getItem("stuClassId");
		$scope.user.userId = sessionStorage.getItem("teaId");
		$scope.user.userName = sessionStorage.getItem('teaName');
		$scope.user.stuName = $location.$$search.stuName
		stuId = $location.$$search.stuId
		//状态码
		state = $location.$$search.state;
		//时间（时间有效期）
		dateState = sessionStorage.getItem("dataState");
	}else if($scope.userInfo.userRole=='stu'){
		if(bestStuId=='null'||bestStuId==null||bestStuId==''){
			$scope.user.userId = $scope.userInfo.studentInfo.stuId;
			stuId = $scope.userInfo.studentInfo.stuId;
			$scope.user.stuName = $scope.userInfo.studentInfo.stuName
			$scope.user.term = $scope.term;
			$scope.user.gradeName = $scope.userInfo.studentInfo.stuClassInfo.subStages;
			$scope.user.classId = $scope.userInfo.studentInfo.stuClassInfo.classId;
			$scope.userGradeTerm=$scope.user.gradeName+"("+$scope.user.term+")";
			
		}else{
			$scope.user.userId = bestStuId;
			stuId = bestStuId;
			$scope.user.term = $location.$$search.term;
			$scope.user.gradeName =  $location.$$search.gradeName;
			$scope.user.classId = $location.$$search.classId;
			$scope.user.stuName = $location.$$search.stuName;
			$scope.userGradeTerm=$scope.user.gradeName+"("+$scope.user.term+")";
	}
		
		$http.post(requireIp + 'suZhiEvaluate/InstructorController/findStuPingJiaByStu.do',{
			gradeName:$scope.user.gradeName,
			term:$scope.user.term,
			classId:$scope.user.classId,
			stuId:stuId
		}).success(function(data){
			$scope.stuList = data;
		}).error(function(e){
		});
	}else if($scope.userInfo.userRole =='parents'){
		$scope.user.userId = $scope.userInfo.parentsInfo.parentsId;
		stuId = $scope.userInfo.studentInfo.stuId;
		$scope.user.stuName = $scope.userInfo.studentInfo.stuName;
		$scope.user.term = $scope.term;
		$scope.user.gradeName = $scope.userInfo.studentInfo.stuClassInfo.subStages;
		$scope.user.classId = $scope.userInfo.studentInfo.stuClassInfo.classId;
		$scope.userGradeTerm=$scope.user.gradeName+"("+$scope.user.term+")";
		$http.post(requireIp + 'suZhiEvaluate/InstructorController/findStuPingJiaByStu.do',{
			gradeName:$scope.user.gradeName,
			term:$scope.user.term,
			classId:$scope.user.classId,
			stuId:stuId
		}).success(function(data){
			$scope.stuList = data;
		}).error(function(e){
		});
	}else{
		stuId = $location.$$search.bestStuId;
		$scope.user.term = $location.$$search.term;
		$scope.user.gradeName = $location.$$search.gradeName;
		$scope.user.classId = $location.$$search.classId;
		$http.post(requireIp + 'suZhiEvaluate/InstructorController/findStuPingJiaByStu.do',{
			gradeName:$scope.user.gradeName,
			term:$scope.user.term,
			classId:$scope.user.classId,
			stuId:stuId
		}).success(function(data){
			console.log(data)
			$scope.stuList = data;
		}).error(function(e){
		});
	}
	if($scope.user.term=="上学期"){
		$scope.data="2-27"
	}else{
		$scope.data="8-31"
	}
	$("#stuId").val(stuId);
	//维度集合
	$scope.weiDuList = {};
	//默认维度第一个标示
	$scope.weiDuState = 0;
	//维度名称
	$scope.weiDuName = "";
	//维度Id
	$scope.weiDuId = "";
	//提交数据
	$scope.saveData = {};
	//资质名称
	$scope.ziZhiName = "";
	$scope.ziZhiName1 = "";
	//资质地址
	$scope.ziZhiUrl = "";
	//upload地址
	$scope.uploadUrl = "tpl/publicPage/upload.html";
	//防止重复提交变量
	$scope.flag = true;
 	 
 	//判断角色，控制页面展示
 	$scope.roleShow = {
 		bestStudent : {show : false,bestStuId : $location.$$search.bestStuId || ''},	//优秀学生页面，优秀学生id
 		teacher : {show : false,state : '',grade : 'B'},								//班主任、教师页面，state状态(see,edit),grade为ABCD等级展示，默认编辑状态
 		student : {show : false,deadline : false}										//学生家长页面，deadline截止时间，true为已截止
 	};
 	
 	//学生id 用于页面切换及对应展示情况
 	var userType = sessionStorage.getItem('userType');
 	$scope.roleShow.bestStudent.show = $scope.roleShow.bestStudent.bestStuId != '' ? true : false;
 	$scope.roleShow.teacher.state = $location.$$search.state;
 	$scope.roleShow.teacher.show = userType == 'teacher' ? true : false;
 	$scope.roleShow.student.show = userType == 'student' ? true : false;
	
	//上一级返回存储地址
	$scope.prevPageNo = 'publicEvaluation';
	//资质类型
	$scope.ziZhiType = ['活动','证书','待提高','其他'];
	//返回按钮返回路径
	$scope.prevPath = 'wrap.' + $location.$$search.prevPage + '({index :'+ $location.$$search.index +',roleIndex :'+$location.$$search.roleIndex+',term :"'+$location.$$search.term+'"})';
	//返回按钮返回优秀学生榜单路径
	$scope.goodStudentPath = 'wrap.topStudentList({bestStuId : "'+$scope.roleShow.bestStudent.bestStuId+'",gradeName :"'+$location.$$search.gradeName+'",classId:"'+$location.$$search.classId+'",term:"'+$location.$$search.term+'",stuName:"'+$location.$$search.stuName+'"})';
	
	//查看报告按钮，新窗口打开
	var reportUrl = $state.href('wrap.report',{stuId:stuId});
 	$scope.viewReport = function (){
 		window.open(reportUrl,'_blank');
 	};
 	
 	
 	$scope.locUrl = resourceIp+'/resource/evaluate/';
 	
 	//查询评价维度
 	$http.post(requireIp+"suZhiEvaluate/InstructorController/findWeiDu.do",{
 		gradeName:$scope.user.gradeName,
 		term:$scope.user.term
 	}).success(function(data){
 		$scope.weiDuList = data;
 		shouStuData ($scope.weiDuList[0].id);
 		$scope.weiDuId = $scope.weiDuList[0].id;
 		$scope.weiDuName = $scope.weiDuList[0].content;
 	}).error(function(e){});
	
 	
 	function shouStuData (weiduId){
 		$http.post(requireIp+'suZhiEvaluate/InstructorController/findSuZhiInfoByStu.do',{
 		stuId:stuId,
 		evalWeiDuId:weiduId,
 		classId:$scope.user.classId
 	}).success(function(data){
 		console.log(data)
 		if(data.data[0].children[0].state=='1'){
 			$scope.user.evalAuthorName = data.data[0].evalAuthorName.substring(0,data.data[0].evalAuthorName.length-1)
 			$scope.roleShow.teacher.grade = data.data[0].level;
 		}else{
 			$scope.user.evalAuthorName = '';
 			$scope.roleShow.teacher.grade = 'B';
 		}
 		$scope.user.stuPro = data.data[0].stuProve;
 		$scope.user.teaPro = data.data[0].teaProve;
 		$scope.fileLength.tea = $scope.user.teaPro.length;
 		$scope.fileLength.stu = $scope.user.stuPro.length;
 		console.log($scope.user.teaPro)
 		
 		angular.forEach($scope.user.teaPro,function (e,i){
// 			console.log(e.state)
 			if(e.state != 0){
				$scope.timerT = $interval(function (){
					$http.post(requireIp+'suZhiEvaluate/InstructorController/findZiZhiState.do',{
 						id:e.id
 					}).success(function(data){
// 						console.log(e.state)
 						if(data.state == 0){
 							$timeout(function (){
 								e.state =data.state;
 							},500);
// 							console.log($scope.user.teaPro)
 							$interval.cancel($scope.timerT);
 						}
 					})
				},300);
			}
		});
		angular.forEach($scope.user.stuPro,function (e,i){
 			console.log(e.state)
 			if(e.state != 0){
				$scope.timerT = $interval(function (){
					$http.post(requireIp+'suZhiEvaluate/InstructorController/findZiZhiState.do',{
 						id:e.id
 					}).success(function(data){
 						if(data.state == 0){
 							$timeout(function (){
 								e.state =data.state;
 							},500);
 							$interval.cancel($scope.timerT);
 						}
 					})
				},300);
			}
		});
		
 		for (var i = 0; i < data.data.length; i++) {
 			var evalbiaoxian = data.data[i].children
 			for(var j = 0;j<evalbiaoxian.length;j++){
 			var split = evalbiaoxian[j].column1.substring(0,evalbiaoxian[j].column1.length-5).split('</br>');
 			data.data[i].children[j].column1= split;
 			}
 			
 		}
 		$scope.user.userData =  data.data;
 		$scope.user.teaComment = data.py.shiping;
 		$scope.user.selComment = data.py.ziping;
 		$scope.user.homeComment = data.py.jiaping;
 	}).error(function(e){
 	})
 	}
 	
 	
 	
	//等级切换状态
	$scope.resultsTab = function (tar,stu,type){
		stu.dafen = type;
		angular.element(tar.target).addClass('active').siblings().removeClass('active');	
	};

	//评价评语、评价类型切换
	$scope.evaluateState = {
		comment : 0,
		evaluationType : 0
	};
	//评价评语切换事件
	$scope.switchComment = function (i){
		$scope.evaluateState.comment = i;
	};
	//5种评价类型切换
	$scope.swicthType = function (i,weidu){
		$scope.weiDuState = i;
		$scope.weiDuName = weidu.content;
		$scope.weiDuId = weidu.id;
		shouStuData (weidu.id)
	};
	
	//定时提示框
	$scope.timer = function (tipColor,tipWord){
   		$scope.tipState.tipBox.tipRed = tipColor;
		$scope.tipState.tipBox.tipsWord = tipWord;
		$scope.tipState.tipBox.ifShow = true;
   		$timeout(function (){
   			$scope.tipState.tipBox.ifShow = false;
		},1000);
   	}
	
	//控制所有弹框
	$scope.tipState = {
		deleteBox : {ifShow : false,tipWord : '确认删除吗？'},
		tipBox : {ifShow : false,tipRed : false,tipWord : ''},
		upLoadBox : {ifShow : false,role : ''},
		checkBox : {ifShow : false,role : ''}
	};
	//删除资质、佐证事件
	$scope.deleteing = function (tar,obj){
		tar.stopPropagation();
		console.log(obj)
		var upload = obj.uploadId;
		if($scope.userInfo.userRole=='stu'||$scope.userInfo.userRole=='parents'){
			$scope.tipState.deleteBox.ifShow = true;
		}else{
			if(upload==$scope.user.userId){
				$scope.tipState.deleteBox.ifShow = true;
			}else{
				$scope.tipState.deleteBox.ifShow = false;
				$scope.timer(true,'您无法删除！');
			}
		}
//		var deleteIndex = angular.element(tar.target).parents('li').index();
		
		
		//确认删除事件
		$scope.deleteSure = function (){
			$http.post(requireIp+"suZhiEvaluate/InstructorController/deleteZiZhi.do",{
				id:obj.id
			}).success(function(msg){
				if(msg=='1'){
					$scope.tipState.deleteBox.ifShow = false;
					angular.element(tar.target).parent().parent().remove();
					$scope.timer(false,'删除成功！');
					$state.reload();
				}else{
					$scope.tipState.deleteBox.ifShow = false;
					$scope.timer(true,'删除失败！');
				}
			}).error(function(e){
				$scope.tipState.deleteBox.ifShow = false;
				$scope.timer(true,'删除失败！');
			});
			
		};
	};
	
	//上传资质、佐证弹框
	$scope.upLoad = function (str){
		
		$('#uploadResource').attr('src','tpl/publicPage/upload.html');
		$("#ziZhiName1").val("");
		
		$scope.flag = true;
		//默认上传rootId
		$scope.saveData.rootId = $scope.weiDuList[$scope.weiDuState].rootId;
		//默认上传维度Id
		$scope.saveData.weiDuId = $scope.weiDuList[$scope.weiDuState].id;
		//默认上传维度名称
		$scope.saveData.weiDuName = $scope.weiDuList[$scope.weiDuState].content;
		//默认上传资质类型
		$scope.saveData.ziZhiType = $scope.ziZhiType[$scope.weiDuState];
		$scope.tipState.upLoadBox.role = str;
		$scope.tipState.upLoadBox.ifShow = true;
	};
	
	//上传弹框内
	$scope.uploadTab = function (tar,obj){
		$scope.saveData.rootId = obj.rootId;
		//勾选上传维度Id
		$scope.saveData.weiDuId = obj.id;
		//勾选上传维度名称
		$scope.saveData.weiDuName = obj.content;
		
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
	};
	
	//上传弹框内-资质类型
	$scope.uploadTypeTab = function (tar,obj){
		//勾选上传资质类型
		$scope.saveData.ziZhiType =obj;
		angular.element(tar.target).addClass('active').siblings().removeClass('active');
	};
	
	//上传弹框确认事件
	$scope.uploadSure = function (){
		$scope.flag = false;
		//学生id
		$scope.saveData.stuId = stuId;
		//学生班级
		$scope.saveData.classId = $scope.user.classId;
		//上传的资质名称
		$scope.saveData.uploadZiZhiName = $("#ziZhiName1").val();
		//资质/佐证
		$scope.saveData.ziZhiNameUploaderType=$scope.userInfo.userRole;
		//上传者
		$scope.saveData.ziZhiNameUploaderId=$scope.user.userId;
		var fileMessage = window.frames["uploadResource"].document.getElementById("uploadJsonStr").value;
		if(fileMessage ==""){
			$scope.timer(false,'请上传资质！');
			$scope.flag = true;
		}else{
			$scope.saveData.url = JSON.parse(fileMessage)[0].newfilename
			$http.post(requireIp+'teacher/suZhiController/saveZiZhi.do',{json:angular.toJson($scope.saveData)}).success(function(data){
			if(data==1){
				if($scope.saveData.ziZhiNameUploaderType == 'tea'){
					console.log($scope.fileLength.tea)
					if($scope.fileLength.tea >= 5){
//						console.log('》5')
//						$('.zy_teacher_upload .zy_evaluate_upload_con>i.icon-youjiantoubeijing').removeClass('active');
					}
					$('.zy_teacher_upload .zy_example_list>ul').css({'left':0});
				}else{
					console.log($scope.fileLength.stu)
					$('.zy_student_upload .zy_example_list>ul').css({'left':0});
				}
				
				$scope.tipState.upLoadBox.ifShow = false;
				$scope.timer(false,'上传成功！');
				
				//angular.element('.fl li')[0].addClass('active').siblings().removeClass('active');
				shouStuData ($scope.weiDuList[$scope.weiDuState].id);
				//$("#uploadResource").contentWindow.location.reload(true);
				//document.all.ifrmname.document.location.reload()
			}else{
//				$scope.tipState.upLoadBox.ifShow = false;
				$scope.timer(true,'请完善资质名称！');
			}
		}).error(function(){
			$scope.tipState.upLoadBox.ifShow = false;
			$scope.timer(false,'上传失败！');
			
		})
		}
		
		
		
	};
	
	//查看资质、佐证弹框
	$scope.check = function (str){
		//根据id查询
		
		$scope.ziZhiName = str.zizhiName;
		$scope.typeState = true;
		$scope.imgListState = false;
		if(str.url.indexOf('.mp4')>-1){
			$scope.typeState = false;
		}
		var state = '1';
		$http.post(requireIp+'suZhiEvaluate/InstructorController/findZiZhiState.do',{
			id:str.id
		}).success(function(data){
			state = data.state;
		if(state=='0'){
			if(str.url.indexOf('.')>-1){
				$scope.ziZhiUrl = str.url;
			}else{
				//获取文档的路径
				$http.post(requireIp+'suZhiEvaluate/InstructorController/readZyImg.do',{imgUrl:str.url}).success(function(data){
					console.log(data)
					$scope.ziZhiUrl = data.imgUrl+'/';
					$scope.imgList = data.fileNameList;
					$scope.imgListState = true;
				})
			}
			
		}else if(state =='2'){
			$scope.timer(true,'正在转码！！');
			$scope.tipState.checkBox.ifShow = false;
		}else{
			$scope.timer(true,'转码失败！！');
			$scope.tipState.checkBox.ifShow = false;
		}
		}).error(function(e){
			$scope.timer(true,'转码失败！！');
			$scope.tipState.checkBox.ifShow = false;
		})
		$scope.tipState.checkBox.role = str;
		$scope.tipState.checkBox.ifShow = true;
	};
	//关闭弹框
	$scope.closeCheckBox = function(){
		$scope.tipState.checkBox.ifShow = false;
		var myVideo = document.getElementsByTagName('video')[0];
		myVideo.pause();
	}
	//保存弹框
	$scope.keep = function (){
		//打分数据
		$scope.saveData.evalData = $scope.user.userData;
		//学生id
		$scope.saveData.stuId = stuId;
		//维度id
		$scope.saveData.weiDuId = $scope.weiDuId;
		//维度名称
		$scope.saveData.weiDuName = $scope.weiDuName;
		//评价人id
		$scope.saveData.userId = $scope.user.userId;
		//评价人信息
		if($scope.user.evalAuthorName.indexOf($scope.user.userName)<0&&$scope.user.evalAuthorName!=""){
			$scope.saveData.evalName = $scope.user.userName+','+$scope.user.evalAuthorName+',';
		}else{
			$scope.saveData.evalName = $scope.user.userName+',';
		}
		//学生班级id
		$scope.saveData.classId = $scope.user.classId;
		//评语-教师评语
		$scope.saveData.teaComment = $scope.user.teaComment;
		//评语-学生评语
		$scope.saveData.selComment = $scope.user.selComment;
		//评语-家长评语
		$scope.saveData.homeComment = $scope.user.homeComment;
		//角色
		$scope.saveData.userType = $scope.userInfo.userRole;
		//维度等级
		var a= 0; 
		var b = 0; 
		var c = 0; 
		for (var i = 0; i < $scope.user.userData.length; i++) {
			var children = $scope.user.userData[i].children;
			for(var j = 0;j<children.length;j++){
				if(children[j].dafen =='a'){
				a++;
			}else if(children[j].dafen =='b'|| children[j].dafen==undefined){
				b++;
			}else{
				c++;
			}
			}
		}
		//维度等级
		if(b==a+b+c){
			$scope.saveData.level = 'B';
		}else if(c==1){
			$scope.saveData.level = 'C';
		}else if(c>1){
			$scope.saveData.level = 'D';
		}else{
			$scope.saveData.level = 'A';
		}
		$http.post(requireIp+'suZhiEvaluate/InstructorController/save.do',{jsonArray:angular.toJson($scope.saveData)}).success(function(data){
			if(data=='1'){
				$scope.timer(false,'保存成功');
				shouStuData($scope.saveData.weiDuId);
				//保存成功，刷新缓存
				flushRedis();
			}else{
				$scope.timer(true,'保存失败');
			}
			
		}).error(function(e){
			$scope.timer(true,'保存失败');
		})
	};
	
	//评语提交
	$scope.commentSub = function (){
		$scope.timer(false,'提交成功');
	};
	//异步刷新缓存
	function flushRedis(){
		
		$.ajax({
			url : requireIp + 'teacher/leaDerController/findRedisData.do',
			type : 'post',
			data : {schoolId: $scope.schoolId,
					gradeName: $scope.user.gradeName,
					term: $scope.user.term},
			dataType : 'json',
			cache : false,
			async : true,
			success : function(jdata) {
				alert("更新缓存成功");
			}
		});
	};
	
}]);

//点击左右移动查看更多
app.directive('showMore', function() {
	return {
		restrict: 'EA',
		replace: true,
		/*scope: {
			
		},*/
		link: function(scope, element, attrs) {
			console.log(element)
			scope.$last = scope.$last;
			if(scope.$last == true){
				console.log(attrs.len)
				var n = 0;
				var moveBox = $(element).parent();
				var moveWidth = moveBox.children('li').width();
//				var moveLength = moveBox.children('li').length - 5;
				var moveLength = attrs.len - 5;
				console.log(n,moveLength)
//				$(element).parents('.zy_example_list').siblings('.icon-zuojiantoubeijing').addClass('active');
//				if(moveLength < 1){$(element).parents('.zy_example_list').siblings('.icon-youjiantoubeijing').addClass('active');}
				
				if(moveLength > 0){
					$(element).parents('.zy_example_list').siblings('i').on('click',function (){
						if($(this).hasClass('icon-zuojiantoubeijing')){
							n--;
							if(n >= 0){
								moveBox.stop().animate({'left':-(moveWidth * n)});
							}else{
								n = 0;
								moveBox.stop().animate({'left':0});
							}
							console.log(n,moveLength);
//							if(n == 0){$(this).addClass('active')};
//							if(n < moveLength){$(this).siblings('i').removeClass('active')};
						}else{
							n++;
							if(n < moveLength){
								moveBox.stop().animate({'left':-(moveWidth * n)});
							}else{
								n = moveLength;
								moveBox.stop().animate({'left':-(moveWidth * n)});
							}
							if(n > 0){$(this).siblings('i').removeClass('active')};
							console.log(n,moveLength);
//							if(n >= moveLength){$(this).addClass('active')}
//							else{$(this).removeClass('active')}
						}
					});
				}
			}
		}
	}
	
});
	/*function table_colspan(table_id, table_rownum, table_maxcolnum) {
 		
	if (table_maxcolnum == void 0) {
		table_maxcolnum = 0;
	}
	table_firsttd = "";
	table_currenttd = "";
	table_SpanNum = 0;
	$(table_id + " tr:nth-child(" + table_rownum + ")").each(function(i) {
		table_Obj = $(this).children();
		console.log(table_Obj)
		table_Obj.each(function(i) {
			if (i == 0) {
				table_firsttd = $(this);
				table_SpanNum = 1;
			} else if ((table_maxcolnum > 0) && (i > table_maxcolnum)) {
				return "";
			} else {
				table_currenttd = $(this);
				if (table_firsttd.text() == table_currenttd.text()) {
					table_SpanNum++;
					table_currenttd.hide(); //remove();
					table_firsttd.attr("colSpan", table_SpanNum);
				} else {
					table_firsttd = $(this);
					table_SpanNum = 1;
				}
			}
		});
	});
} 
	for (i = 1; i < 10; i++) {
				table_colspan("table", i, 9);
			}*/
/*//合并相同的列
function table_rowspan(cishu,size) {
	var demo = new mergeRowsCell('table');
	for (i = 0; i < cishu+2 ; i++) {
			demo.merge(0,i);
	} 	
}
table_rowspan(7,0);*/
function _w_table_colspan(_w_table_id, _w_table_rownum, _w_table_maxcolnum) {  
        if (_w_table_maxcolnum == void 0) { _w_table_maxcolnum = 0; }  
        _w_table_firsttd = "";  
        _w_table_currenttd = "";  
        _w_table_SpanNum = 0;  
        $(_w_table_id + " tr:nth-child(" + _w_table_rownum + ")").each(function (i) {  
            _w_table_Obj = $(this).children();  
            _w_table_Obj.each(function (i) {  
                if (i == 0) {  
                    _w_table_firsttd = $(this);  
                    _w_table_SpanNum = 1;  
                } else if ((_w_table_maxcolnum > 0) && (i > _w_table_maxcolnum)) {  
                    return "";  
                } else {  
                    _w_table_currenttd = $(this);  
                    if (_w_table_firsttd.text() == _w_table_currenttd.text()) {  
                        _w_table_SpanNum++;  
                        _w_table_currenttd.hide(); //remove();  
                        _w_table_firsttd.attr("colSpan", _w_table_SpanNum);  
                    } else {  
                        _w_table_firsttd = $(this);  
                        _w_table_SpanNum = 1;  
                    }  
                }  
            });  
        });  
    }  
    
_w_table_colspan('#table',1,4);

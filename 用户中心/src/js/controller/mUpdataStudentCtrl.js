app.controller("mUpdataStudentCtrl", ['$scope', '$http', '$stateParams', 'loginService','$state', function($scope, $http, $stateParams, loginService,$state) {
	$scope.user = {}
	//从session中取用户id和用户类型和学校id
	$scope.user.uid = $stateParams.studentCard; //用户id

	$scope.user.userType = 2; //用户类型
	/*var schoolId = {
		id: JSON.parse(sessionStorage.getItem('userObj')).oid
	}*/
	
	var schoolId = '';
	
	//查询学生信息
	loginService.studentMsg({
		userId: $scope.user.uid,
		userType: $scope.user.userType
	}, function(res) {
//		console.log(res.data.stuInfo.officeId)
		schoolId = res.data.stuInfo.officeId;
		
		$scope.user = res.data.stuInfo;
		$scope.user.nianjiData = res.data.stuInfo.gradeId;
		$scope.user.banjiData = res.data.stuInfo.classId;
		$scope.scoolName = res.data.stuInfo.officeName;
		$scope.realname = res.data.stuInfo.realname;
		$scope.stuNo = res.data.stuInfo.stuNo;
		$scope.sex = res.data.stuInfo.sex;
		$scope.userNation = res.data.stuInfo.userNation;
		$scope.birthday = res.data.stuInfo.birthday;
		$scope.classId = res.data.stuInfo.classId;
		$scope.deviceName = res.data.stuInfo.deviceName;
		$scope.groupName = res.data.stuInfo.groupName;
		$scope.grouping = res.data.stuInfo.groupId;
		//把日期字符串截取成数字格式
		if($scope.birthday || $scope.birthday == '0000-00-00') {
			var year = parseInt($scope.birthday.substr(0, 4)) + '年';
			var month = parseInt($scope.birthday.substr(5, 7)) + '月';
			var fulldate = parseInt($scope.birthday.substr(8, 10)) + '日';
		}
		$scope.selected = (function() {
			if(year) {
				for(var i = 0; i < listArr.length; i++) {
					if(year == listArr[i].name) {
						return listArr[i]
					}
				}
			}
		})();
		$scope.selected2 = (function() {
			if($scope.selected && month) {
				for(var i = 0; i < $scope.selected.month.length; i++) {
					if(month == $scope.selected.month[i].name) {
						return $scope.selected.month[i]
					}
				}
			}
		})();
		$scope.selected3 = (function() {
			if($scope.selected2 && fulldate) {
				for(var i = 0; i < $scope.selected2.fullDate.length; i++) {
					if(fulldate == $scope.selected2.fullDate[i].name) {
						return $scope.selected2.fullDate[i]
					}
				}
			}
		})();
		
		//根据学校id查询学校年级
		$http.post(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
			officeId: schoolId
		}).success(function(res) {
			$scope.nianjiData = res.data;
		})
	
		$scope.selClass = function() {
			$http.post(requireIp + "/ea/eaClass/findClassInfoByGid", {
				gradeId: $scope.user.nianjiData
			}).success(function(res) {
				$scope.banjiData = res.data;
				console.log($scope.banjiData)
			});
		}

		//根据年级id查询学校年级
		$http.post(requireIp + "/ea/eaClass/findClassInfoByGid", {
			gradeId: $scope.user.nianjiData
		}).success(function(res) {
			$scope.banjiData = res.data;
		});

		//通过班级ID获取分组
		$http.post(requireIp + "/uc/ucGroup/findGroupByClassId", {
			classId: $scope.classId
		}).success(function(res) {
			$scope.fenzus = res.data;
		})
	}, function(e) {});
	
	
	//获取民族
	$http.get("file/nation.json").success(function(data) {
		$scope.nationData = data.data;
	});
	
	//修改班级的点击事件
    $scope.selClassid=function(n){
        console.log(n);
        //通过班级ID获取分组
        $http.post(requireIp + "/uc/ucGroup/findGroupByClassId", {
            classId: n
        }).success(function(res) {
            $scope.fenzus = res.data;
        })
    }

	//添加分组
	$scope.tjfenzu = function(event) {
		angular.element(event.target).addClass("wx_none").siblings("span").removeClass("wx_none");

		//保存分组
		$scope.baocun = function(event) {
			//获取组名
			$scope.groupName = angular.element(event.target).siblings("span.wx_ycsrk").children("input").val();

			console.log($scope.groupName)

			$scope.creatuser = sessionStorage.getItem("userId")
			//非空验证
			var reg = /^\s+$/;
			if(reg.test($scope.groupName) == true) {
				$(".wx_erro_tc").show();
				$(".wx_erro_tc .gy_con span").html("组名不能为空");
				setTimeout(function() {
					$(".wx_erro_tc").hide();
				}, 2000)
				return;
			}
			if($scope.groupName == "") {
				$(".wx_erro_tc").show();
				$(".wx_erro_tc .gy_con span").html("请输入分组名称");
				setTimeout(function() {
					$(".wx_erro_tc").hide();
				}, 2000)
			} else {
				//通过后台接口添加分组
				$http.post(requireIp + "/uc/ucGroup/addClassGroup", {
					groupName: $scope.groupName,
					createBy: $scope.creatuser,
					classId: $scope.classId
				}).success(function(res) {

					if(res.ret == '200') {
						$(".zy_warningBox").show();
						$(".zy_warningBox .gy_con i").html("添加成功");
                        
						setTimeout(function() {
                            angular.element(event.target).addClass("wx_none").siblings("span").addClass("wx_none").siblings("span.add").removeClass("wx_none");
                            $(".zy_warningBox").hide();
                            console.log($scope.classId)
                            //通过班级ID获取分组
                            $http.post(requireIp + "/uc/ucGroup/findGroupByClassId", {
                                classId: $scope.classId
                            }).success(function(res) {
                                $scope.fenzus = res.data;
                            })
						}, 1500)
					} else {
						$(".wx_erro_tc").show();
						$(".wx_erro_tc .gy_con span").html(res.message);
						setTimeout(function() {
							$(".wx_erro_tc").hide();
						}, 2000)
					}
				}).error(function(res) {
					console.log(res)
				})
			}
		}
		//取消分组
		$scope.fangqi = function(event) {
			angular.element(event.target).addClass("wx_none").siblings("span").addClass("wx_none").siblings("span.add").removeClass("wx_none");
		}
	}

	//日期下拉change
	$scope.selectedChange = function() {
		$scope.selected3 = null;
		$scope.selected2 = null;
	}
	$scope.list = [];
	var currentYear = new Date().getFullYear();
	var ayn = 0;
	var byn = 25;
	for(i = (currentYear + ayn); i > (currentYear - byn); i--) {
		var objYear = {
			"name": i + '年',
			month: []
		};
		for(var j = 1; j <= 12; j++) {
			var objMonth = {
				"name": j + '月',
				fullDate: []
			};
			var dPrevDate = new Date(i, j, 0);
			var daysInMonth = dPrevDate.getDate();
			for(var k = 1; k <= parseInt(daysInMonth); k++) {
				var objDate = {
					"name": k + '日'
				};
				objMonth.fullDate.push(objDate)
			}
			objYear.month.push(objMonth)
		}
		$scope.list.push(objYear)
	};
	var listArr = $scope.list;

	

	//修改学生信息
	$scope.xgxsxx = function() {

		if($scope.user.banjiData == null || $scope.user.nianjiData == null) {
			$(".tijiaosbtc").show();
			$(".tijiaosbtc .gy_con i").html("请选择年级和班级");
			setTimeout(function() {
				$(".tijiaosbtc").hide();
			}, 1500)
			return;
		}
		
		var reg=/^[0-9]*$/
		
		if(reg.test($scope.deviceName)==false){
			$(".tijiaosbtc").show();
			$(".tijiaosbtc .gy_con i").html("设备名称只能为数字")
			setTimeout(function() {
				$(".tijiaosbtc").hide();
			}, 1500);
			return;
		}

		if($scope.realname == "" || $scope.sex == "" || $scope.user.nianjiData == "" || $scope.stuNo == "") {
			$(".tijiaosbtc").show();
			$(".tijiaosbtc .gy_con i").html("提交失败，请输入必填信息")
			setTimeout(function() {
				$(".tijiaosbtc").hide();
			}, 1500);
			return;
		} else {
			if(!$scope.selected) {
				var yearSub = 0000;
				var monthSub = 00;
				var fulldateSub = 00;
				$scope.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
			} else if(!$scope.selected2) {
				$(".tijiaosbtc").show();
				$(".tijiaosbtc .gy_con i").html("请选择月份");
				setTimeout(function() {
					$(".tijiaosbtc").hide();
				}, 1500)
				return;
			} else if(!$scope.selected3) {
				$(".tijiaosbtc").show();
				$(".tijiaosbtc .gy_con i").html("请选择日期");
				setTimeout(function() {
					$(".tijiaosbtc").hide();
				}, 1500)
				return;
			} else {
				var yearSub = $scope.selected.name;
				var monthSub = $scope.selected2.name;
				var fulldateSub = $scope.selected3.name;
				yearSub = yearSub.replace('年', '')
				monthSub = monthSub.replace('月', '')
				fulldateSub = fulldateSub.replace('日', '')
				$scope.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
			}
			$scope.creatuser = sessionStorage.getItem("userId")
			$http.post(requireIp + '/uc/ucUser/updateStuInfoByTea', {
				id: $scope.user.id,
				stuNo: $scope.stuNo,
				realname: $scope.realname,
				sex: $scope.sex,
				classId: $scope.user.banjiData,
				gradeId: $scope.user.nianjiData,
				userNation: $scope.userNation,
				birthday: $scope.birthday,
				deviceName: $scope.deviceName,
				groupId: $scope.grouping,
				createBy: $scope.creatuser
			}).success(function(res) {
				console.log(res)
				if(res.ret == 200) {
					$(".tijiaocgtc").show();
					$(".tijiaocgtc .gy_con i").html("提交成功")
					setTimeout(function() {
						$(".tijiaocgtc").hide();
						$state.go('teacher_index.student_handle')
					}, 1000)
				} else {
					$(".tijiaosbtc").show();
					$(".tijiaosbtc .gy_con i").html(res.message)
					setTimeout(function() {
						$(".tijiaosbtc").hide();
					}, 1000)
				}
			}).error(function(e) {
				$(".tijiaosbtc").show();
				$(".tijiaosbtc .gy_con i").html("提交失败")
				setTimeout(function() {
					$(".tijiaosbtc").hide();
				}, 1000)
			})

		}
	}
}])
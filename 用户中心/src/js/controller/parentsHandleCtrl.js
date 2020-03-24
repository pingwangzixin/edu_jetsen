app.controller('parentsHandleCtrl', ['$scope', '$timeout', '$http', 'loginService','$state', function($scope, $timeout, $http, loginService,$state) {
	// sessionStorage.setItem('tableChange',0);
	if(sessionStorage.getItem('tableChangeP') == null) {
		sessionStorage.setItem('tableChangeP', 0)
	}
	var pageSize = 10;
	if(sessionStorage.getItem('userObj')) {
		var teachStatus = JSON.parse(sessionStorage.getItem('userObj')).teachStatus || null;
	} else {
		var teachStatus = null;
	}

	var teachMain = {
		teaId: sessionStorage.getItem('userId')

	}

	//学校id
	$scope.xuexiaoId = ""

	//    officeid

	var oid = JSON.parse(sessionStorage.getItem('userObj')).oid;
	console.log(oid)
	//管理者角色
	if(teachStatus == 1) {

	} else {
		var scopeRole = JSON.parse(sessionStorage.getItem('scope'));
	}

	var areaId = sessionStorage.getItem('areaId'); //市领导市ID
	var userAreaId = sessionStorage.getItem('userAreaId'); //区领导的区域id

	console.log(userAreaId)

	console.log(teachMain.teaId)
	$scope.state = {
		headTab: sessionStorage.getItem('tableChangeP'), //判断头部选项卡
		gradeState: "", //判断年级
		classState: "", //判断班级
		allchecked: false, //家长注册-判断是否选中
		allStopchecked: false, //家长注册-判断是否选中
		allcheckedRecover: false, //回收-判断是否选中
		warningShow: false,
		parentsOnlineCount: 0,
		deletStatus: false,
		imgNotice: 'img/wonde_big.png',
		sureDeletContent: '确认删除所选家长？',
		amendState: teachStatus,
		AddState: false,
		addParetName: '', //家长姓名
		addParentNumber: '', //家长手机
		addStudentName: '', //学生姓名
		addStudentNumber: '', //学生学籍号
		modelDown: requireIp,
		usertypeState: 0,
		manageStatus: false,
		addjztc: false,
		repeatstate:false
	};
	$scope.state.usertypeState = sessionStorage.getItem('userType') || 0;
	$scope.state.scopestate = sessionStorage.getItem('scope') || 0;
	$scope.state.teachStatus= JSON.parse(sessionStorage.getItem('userObj')).teachStatus;
	//数据
	$scope.parentsList = {
		checkboxArr: [],
		checkboxStopArr: [],
		checkboxReArr: [],
		gradeList: [],
		classList: [
			//          {name:'全部',id:'all'},
		],
		tableMsgList: [],
		tableMsgStop: [],
		tableMsgListRecover: []
	}
	//点击hide删除弹窗
	$scope.gbtc = function() {
		$scope.state.deletStatus = false;
	};
	//点击新增显示
	$scope.addParentInfo = function(status) {
		switch(status) {
			case 'add':
				$scope.state.AddState = true;
				break;
			case 'cancel':
				$scope.state.AddState = false;
				break;
		}
	}
	//确认新增
	$scope.sureAddParent = function() {
		var regExpStu = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		var regExpPhone = /^1[34578]\d{9}$/;
		if($scope.state.addParetName == '') {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请输入家长姓名!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		} else if($scope.state.addParentNumber == '' || !regExpPhone.test($scope.state.addParentNumber)) {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请输入符合规则的手机号!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		} else if($scope.state.addStudentName == '') {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请输入学生姓名!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		} else if($scope.state.addStudentNumber == '' || !regExpStu.test($scope.state.addStudentNumber)) {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请输入符合规则的国网学籍号!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		};
		loginService.getAddParentList({
			realname: $scope.state.addParetName,
			userMobile: $scope.state.addParentNumber,
			stuName: $scope.state.addStudentName,
			stuNo: $scope.state.addStudentNumber,
			createBy: teachMain.teaId
		}, function(res) {
			console.log(res);
			if(res.ret == 200) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = res.message;
				$scope.state.addParetName = '';
				$scope.state.addParentNumber = '';
				$scope.state.addStudentName = '';
				$scope.state.addStudentNumber = '';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000);
				// 家长在线
				var addpar = {
					areaId: "",
					officeId:"",
					gradeId: $scope.state.gradeState,
					classId: $scope.state.classState,
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2 ||scopeRole == 3) {
					addpar.areaId = areaId;
				}else{
					addpar.officeId=oid;
				}

				loginService.getParentList(addpar, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 0) {
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 800);
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;
					} else if(res.ret == 400) {
						$scope.parentsList.tableMsgList = [];
						$scope.state.parentsOnlineCount = 0;
						$scope.parentPaginationOnline.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
					console.log(e)
				});
			} else if(res.ret == 400) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = res.message;
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000);
			}
		}, function(e) {
			console.log(e)
		})
	};
	//确认删除
	$scope.suredel = function() {
		$scope.state.deletStatus = false;
		if(sessionStorage.getItem('tableChangeP') == 0) {
			var params = {
				ids: $scope.parentsList.checkboxArr.join(','),
				delFlag: 3,
				updateBy: teachMain.teaId
			}
			loginService.teachHandleUpdataList(params, function(res) {
				if(res.ret == 200) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/chenggong.png';
					$scope.state.noteContent = '所选用户已成功删除！!';
					$scope.state.allchecked = false;
					$scope.parentsList.checkboxArr = [];
					$scope.parentsList.checkboxReArr = [];
					var classState = $scope.state.classState == 'all' ? null : $scope.state.classState;

					// 家长在线
					var paramsjz = {
						areaId: "",
						officeId: "",
						gradeId: $scope.state.gradeState,
						classId: classState,
						delFlag: 0,
						state: 1,
						pageNo: 1,
						pageSize: pageSize,
						userType: 3
					};

					var paramsty = {
						areaId: "",
						officeId: "",
						gradeId: $scope.state.gradeState,
						classId: classState,
						delFlag: 0,
						state: 2,
						pageNo: 1,
						pageSize: pageSize,
						userType: 3
					};

					var paramshsz = {
						areaId: "",
						officeId: "",
						gradeId: $scope.state.gradeState,
						classId: classState,
						delFlag: 3,
						pageNo: 1,
						pageSize: pageSize,
						userType: 3
					};

					if(scopeRole == 2 || scopeRole == 3 || $scope.xuexiaoId == "") {
						paramsjz.areaId = areaId;
						paramsty.areaId = areaId;
						paramshsz.areaId = areaId;
					}
					
					if(scopeRole == 4){
						paramsjz.officeId = oid;
						paramsty.officeId = oid;
						paramshsz.officeId = oid;
					}
					console.log($scope.xuexiaoId)
					if($scope.xuexiaoId != "") {

						paramsjz.areaId = "";
						paramsty.areaId = "";
						paramshsz.areaId = "";
						paramsjz.officeId = $scope.xuexiaoId;
						paramsty.officeId = $scope.xuexiaoId;
						paramshsz.officeId = $scope.xuexiaoId;

						loginService.getParentList(paramsjz, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 0) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgList = res.data.list;
								$scope.parentPaginationOnline.totalItems = res.data.count;
								$scope.state.parentsOnlineCount = res.data.count;
							} else if(res.ret == 400) {
								$scope.parentsList.tableMsgList = [];
								$scope.state.parentsOnlineCount = 0;
								$scope.parentPaginationOnline.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});
						//停用
						loginService.getParentList(paramsty, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 1) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgStop = res.data.list;
								$scope.parentPaginationStop.totalItems = res.data.count;
								$scope.state.parentsStopCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgStop = [];
								$scope.state.parentsStopCount = 0;
								$scope.parentPaginationStop.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
						});
						// 回收站
						loginService.getParentList(paramshsz, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 2) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgListRecover = res.data.list;
								$scope.parentPaginationRecover.totalItems = res.data.count;
								$scope.state.parentsRecoverCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgListRecover = [];
								$scope.state.parentsRecoverCount = 0;
								$scope.parentPaginationRecover.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});

					} else {

						loginService.getParentList(paramsjz, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 0) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgList = res.data.list;
								$scope.parentPaginationOnline.totalItems = res.data.count;
								$scope.state.parentsOnlineCount = res.data.count;
							} else if(res.ret == 400) {
								$scope.parentsList.tableMsgList = [];
								$scope.state.parentsOnlineCount = 0;
								$scope.parentPaginationOnline.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});
						//停用
						loginService.getParentList(paramsty, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 1) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgStop = res.data.list;
								$scope.parentPaginationStop.totalItems = res.data.count;
								$scope.state.parentsStopCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgStop = [];
								$scope.state.parentsStopCount = 0;
								$scope.parentPaginationStop.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
						});
						// 回收站
						loginService.getParentList(paramshsz, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 2) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgListRecover = res.data.list;
								$scope.parentPaginationRecover.totalItems = res.data.count;
								$scope.state.parentsRecoverCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgListRecover = [];
								$scope.state.parentsRecoverCount = 0;
								$scope.parentPaginationRecover.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});

					}

				}
			}, function(e) {
				console.log(e)
			});

		} else if(sessionStorage.getItem('tableChangeP') == 1) {
			$scope.parentStopAction('deletStop');
		} else if(sessionStorage.getItem('tableChangeP') == 2) {
			$scope.parentRecoverAction('delet');
		}
	}
	//文件上传
	$scope.fileAction = function(me) {
		$scope.state.warningShow = true;
		$scope.state.imgNotice = 'img/wonde_big.png';
		$scope.state.noteContent = '上传中，请稍等!';
		$scope.state.repeatstate = false;
		var fd = new FormData();
		var file = me.files[0];
		fd.append('excelFile', file);
		fd.append('userType', '3');
		fd.append("userId", sessionStorage.getItem('userId'));
		loginService.uploadExcelParent(fd, function(res) {
			if(res.ret == 200) {
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '上传成功';
				$timeout(function() {
					$scope.state.warningShow = false;
					$scope.parentSearch('');
				}, 1500)
			} else if(res.ret == 400) {
				console.log(res)
				$scope.state.noteContent = res.message + '请重新上传!';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1500)
			} else if(res.ret == 402) {
				console.log(res)
				$scope.state.noteContent = res.message + '请重新上传!';
				$scope.state.repeatData = res.data;
				$scope.state.repeatstate = true;
				$timeout(function() {
					$scope.state.warningShow = false;
					$scope.state.repeatstate = false;
				}, 1500)
			}
		}, function(e) {
			$scope.state.noteContent = '服务器错误,请稍候上传!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1500)
		});
		me.value = '';
	};
	//审核、停用 重置密码
	$scope.parentonlineAction = function(state) {
		if(!$scope.parentsList.checkboxArr.length) {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请至少选择一项!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		};
		switch(state) {
			case 'checked':
				var params = {
					ids: $scope.parentsList.checkboxArr.join(','),
					delFlag: 0,
					state: 1,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已审核成功！';
				break;
			case 'stop':
				var params = {
					ids: $scope.parentsList.checkboxArr.join(','),
					delFlag: 0,
					state: 2,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已成功停用！';
				var requestState = onlineState.some(function(v, i) {
					$scope.state.noteContent =  '所选用户已成功停用！';
					return v == 0;
				});
			break;
			case 'reset':
				var params = {
					ids: $scope.parentsList.checkboxArr.join(','),
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户密码已成功重置！';
				break;
		};
		if(requestState) {
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.warningShow = true;
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		};
		loginService.teachHandleUpdataList(params, function(res) {
			if(res.ret == 200) {
				$scope.state.warningShow = true;
				$scope.state.allchecked = false;
				$scope.parentsList.checkboxArr = [];
				//	                $scope.parentsList.checkboxStopArr = [];
				//	                $scope.parentsList.checkboxReArr = [];
				var classState = $scope.state.classState == 'all' ? null : $scope.state.classState;
				// 家长在线
				var paramsjz = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				};

				var paramsty = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 2,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				};

				var paramshsz = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				};

				if(scopeRole == 2 || scopeRole == 3 || $scope.xuexiaoId == "") {
					paramsjz.areaId = areaId;
					paramsty.areaId = areaId;
					paramshsz.areaId = areaId;
				}else{
					paramsjz.officeId = oid;
					paramsty.officeId = oid;
					paramshsz.officeId = oid;
				}
				
				if(scopeRole==4){
					paramsjz.officeId = oid;
					paramsty.officeId = oid;
					paramshsz.officeId = oid;
				}
				
				if($scope.xuexiaoId != "") {

					paramsjz.areaId = "";
					paramsty.areaId = "";
					paramshsz.areaId = "";
					paramsjz.officeId = $scope.xuexiaoId;
					paramsty.officeId = $scope.xuexiaoId;
					paramshsz.officeId = $scope.xuexiaoId;

					loginService.getParentList(paramsjz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 0) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgList = res.data.list;
							$scope.parentPaginationOnline.totalItems = res.data.count;
							$scope.state.parentsOnlineCount = res.data.count;
						} else if(res.ret == 400) {
							$scope.parentsList.tableMsgList = [];
							$scope.state.parentsOnlineCount = 0;
							$scope.parentPaginationOnline.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});
					//停用
					loginService.getParentList(paramsty, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					// 回收站
					loginService.getParentList(paramshsz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 2) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});

				} else {

					loginService.getParentList(paramsjz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 0) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgList = res.data.list;
							$scope.parentPaginationOnline.totalItems = res.data.count;
							$scope.state.parentsOnlineCount = res.data.count;
						} else if(res.ret == 400) {
							$scope.parentsList.tableMsgList = [];
							$scope.state.parentsOnlineCount = 0;
							$scope.parentPaginationOnline.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});
					//停用
					loginService.getParentList(paramsty, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					// 回收站
					loginService.getParentList(paramshsz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 2) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});

				}

			}
		}, function(e) {
			console.log(e)
		});
	};
	//家长停用内的 启用 删除
	$scope.parentStopAction = function(state) {
		if(!$scope.parentsList.checkboxStopArr.length) {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请至少选择一项!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000);
			return false;
		};
		switch(state) {
			case 'qiyong':
				var params = {
					ids: $scope.parentsList.checkboxStopArr.join(','),
					delFlag: 0,
					state: 1,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已成功启用！';
				break;
			case 'deletStop':
				var params = {
					ids: $scope.parentsList.checkboxStopArr.join(','),
					delFlag: 3,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已成功删除！';
				break;
		};
		loginService.teachHandleUpdataList(params, function(res) {
			if(res.ret == 200) {
				$scope.state.warningShow = true;
				$scope.state.allchecked = false;
				$scope.parentsList.checkboxArr = [];
				$scope.state.allStopchecked =false;
				//	                $scope.parentsList.checkboxStopArr = [];
				//	                $scope.parentsList.checkboxReArr = [];
				var classState = $scope.state.classState == 'all' ? null : $scope.state.classState;
				// 家长在线

				var parmsqyjz = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				var parmsqyty = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 2,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				var parmsqyhsz = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2 || scopeRole == 3 || $scope.xuexiaoId == "") {
					parmsqyjz.areaId = areaId;
					parmsqyty.areaId = areaId;
					parmsqyhsz.areaId = areaId;
				}
				
				if(scopeRole == 4){
					parmsqyjz.officeId = oid;
					parmsqyty.officeId = oid;
					parmsqyhsz.officeId = oid;
				}
				

				if($scope.xuexiaoId != "") {

					parmsqyjz.areaId = "";
					parmsqyty.areaId = "";
					parmsqyhsz.areaId = "";
					parmsqyjz.officeId = $scope.xuexiaoId;
					parmsqyty.officeId = $scope.xuexiaoId;
					parmsqyhsz.officeId = $scope.xuexiaoId;

					//在线
					loginService.getParentList(parmsqyjz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 0) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgList = res.data.list;
							$scope.parentPaginationOnline.totalItems = res.data.count;
							$scope.state.parentsOnlineCount = res.data.count;
						} else if(res.ret == 400) {
							$scope.parentsList.tableMsgList = [];
							$scope.state.parentsOnlineCount = 0;
							$scope.parentPaginationOnline.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});
					//停用

					loginService.getParentList(parmsqyty, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					// 回收站
					loginService.getParentList(parmsqyhsz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 2) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});

				} else {

					//在线
					loginService.getParentList(parmsqyjz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 0) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgList = res.data.list;
							$scope.parentPaginationOnline.totalItems = res.data.count;
							$scope.state.parentsOnlineCount = res.data.count;
						} else if(res.ret == 400) {
							$scope.parentsList.tableMsgList = [];
							$scope.state.parentsOnlineCount = 0;
							$scope.parentPaginationOnline.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});
					//停用

					loginService.getParentList(parmsqyty, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					// 回收站
					loginService.getParentList(parmsqyhsz, function(res) {
						if(sessionStorage.getItem('tableChangeP') == 2) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
						console.log(e)
					});

				}

			}
		}, function(e) {
			console.log(e)
		})
	}
	//点击头部的确认删除按钮
	$scope.parentDeleAction = function(status) {
		switch(status) {
			case 'online':
				if(!$scope.parentsList.checkboxArr.length) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '请至少选择一项!';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000);
					return false;
				}
				$scope.state.sureDeletContent = '确认删除所选家长？'
				break;
			case 'stop':
				if(!$scope.parentsList.checkboxStopArr.length) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '请至少选择一项!';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000);
					return false;
				}
				$scope.state.sureDeletContent = '确认删除所选家长？'
				break;
			case 'recover':
				if(!$scope.parentsList.checkboxReArr.length) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '请至少选择一项!';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
					return false
				}
				$scope.state.sureDeletContent = '确认彻底删除所选家长？(该操作不可恢复)'
				break;
		}
		$scope.state.deletStatus = true;
	}

	var schoolId = {
		officeId: JSON.parse(sessionStorage.getItem('userObj')).oid
	}

	var parentMainClassId = '';
	var gradeListStatus = JSON.parse(sessionStorage.getItem('userObj')).teachStatus;
	
	//是否是已停用页面
	if(sessionStorage.getItem('tableChangeP') == 1) {
		var tingyongparms = {
			areaId: "",
			officeId: "",
			gradeId: $scope.state.gradeState,
			classId: $scope.state.classState,
			delFlag: 0,
			state: 2,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}

		if(scopeRole == 2 || scopeRole == 3) {
			tingyongparms.areaId = areaId;
		}
		
		if(scopeRole == 2&&oid!="" || scopeRole == 3&&oid!=""){
			tingyongparms.officeId = "";
		}else{
			tingyongparms.officeId=oid;
		}

		if($scope.xuexiaoId != "") {
			tingyongparms.areaId = "";
			tingyongparms.officeId = oid;

			loginService.getParentList(tingyongparms, function(res) {

				if(res.ret == 200) {
					$scope.parentsList.tableMsgStop = res.data.list;
					$scope.parentPaginationStop.totalItems = res.data.count;
					$scope.state.parentsStopCount = res.data.count;
				} else if(res.ret == 400) {
					// $scope.state.warningShow = false;
					$scope.parentsList.tableMsgStop = [];
					$scope.state.parentsStopCount = 0;
					$scope.parentPaginationStop.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});
		} else {

			loginService.getParentList(tingyongparms, function(res) {
				if(sessionStorage.getItem('tableChangeP') == 1) {
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 800)
				}
				if(res.ret == 200) {
					$scope.parentsList.tableMsgStop = res.data.list;
					$scope.parentPaginationStop.totalItems = res.data.count;
					$scope.state.parentsStopCount = res.data.count;
				} else if(res.ret == 400) {
					// $scope.state.warningShow = false;
					$scope.parentsList.tableMsgStop = [];
					$scope.state.parentsStopCount = 0;
					$scope.parentPaginationStop.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});

		}

	}
	
	
	//是否是回收站页面
	if(sessionStorage.getItem('tableChangeP') == 2) {
		var huisparmsn = {
			areaId: "",
			officeId: "",
			gradeId: $scope.state.gradeState,
			classId: $scope.state.classState,
			delFlag: 3,
			pageNo: 1,
			pageSize: pageSize,
			state:"",
			userType: 3
		}

		if(scopeRole == 2 || scopeRole == 3) {
			huisparmsn.areaId = areaId;
			huisparmsn.state = "";
		}
		
		if(scopeRole == 2&&oid!="" || scopeRole == 3&&oid!=""){
			huisparmsn.officeId = "";
		}else{
			huisparmsn.officeId=oid;
			huisparmsn.state = "";
		}

		if($scope.xuexiaoId != "") {
			huisparmsn.areaId = "";
			huisparmsn.officeId = oid;
			huisparmsn.state = "";

			loginService.getParentList(huisparmsn, function(res) {
				if(sessionStorage.getItem('tableChangeP') == 2) {
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 800)
				}
				if(res.ret == 200) {
					$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
				} else if(res.ret == 400) {
					// $scope.state.warningShow = false;
					$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});
		} else {
			console.log(huisparmsn.areaId)
			loginService.getParentList(huisparmsn, function(res) {
				
				
				if(sessionStorage.getItem('tableChangeP') == 2) {
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 800)
				}
				if(res.ret == 200) {
					$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
				} else if(res.ret == 400) {
					// $scope.state.warningShow = false;
					$scope.parentsList.tableMsgListRecover = [];
							$scope.state.parentsRecoverCount = 0;
							$scope.parentPaginationRecover.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});

		}

	}
	
	
	

	//判断管理员身份  2==市领导  3==区领导   4==学校管理员   15==校领导  1==班主任
	if(teachStatus == 1) {
		$scope.banzhuren = true;
		$scope.state.parentgrade = true;
		$scope.parentsList.classList = [];
		//通过班主任id 获取年级信息
		loginService.studentMainleGradeList(teachMain, function(res) {
			if(res.ret == 200) {
				$scope.state.gradeState = res.data.gradeId;
				$scope.parentsList.gradeList.push(res.data);
				$scope.state.classState = res.data.id;
				parentMainClassId = res.data.id;

				$scope.parentsList.classList = $scope.parentsList.classList.concat(res.data);
				$scope.parentsList.classList.forEach(function(v) {
					v.name = v.name + '班'
				});
				//注册家长

				var zaixian = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: res.data.id,
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2) {
					zaixian.areaId = areaId;
				}

				if(scopeRole == 3) {
					zaixian.areaId = areaId;
				}

				loginService.getParentList(zaixian, function(res) {
					if(res.ret == 200) {
						console.log(res.data.list)
						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgList = [];
						$scope.state.parentsOnlineCount = 0;
						$scope.parentPaginationOnline.totalItems = 0;
					}
				}, function(e) {
					console.log(e)
				});
				//停用

				var tingyong = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: res.data.id,
					delFlag: 0,
					state: 2,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2) {
					tingyong.areaId = areaId;
				}

				if(scopeRole == 3) {
					tingyong.areaId = areaId;
				}

				loginService.getParentList(tingyong, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 1) {
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 800)
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgStop = res.data.list;
						$scope.parentPaginationStop.totalItems = res.data.count;
						$scope.state.parentsStopCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgStop = [];
						$scope.state.parentsStopCount = 0;
						$scope.parentPaginationStop.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 800)
				});
				//回收站
				var huisjpa = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: res.data.id,
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2) {
					huisjpa.areaId = areaId;
				}

				if(scopeRole == 3) {
					huisjpa.areaId = areaId;
				}

				loginService.getParentList(huisjpa, function(res) {
					if(res.ret == 200) {
						$scope.parentsList.tableMsgListRecover = res.data.list;
						$scope.parentPaginationRecover.totalItems = res.data.count;
						$scope.state.parentsRecoverCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgListRecover = [];
						$scope.state.parentsRecoverCount = 0;
						$scope.parentPaginationRecover.totalItems = 0;
					}
				}, function(e) {
					console.log(e)
				});
			} else if(res.ret == 400) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = res.message;
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			}
		}, function(e) {
			console.log(e)
		});

	} else if(scopeRole == 2) {
		var areaparm = {
			areaId: areaId,
			gradeId: "",
			classId: "",
			delFlag: 0,
			state: 1,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		$http.get(requireIp + '/uc/ucUser', {
				params: areaparm
			})
			.success(function(res) {
				$scope.parentsList.tableMsgList = res.data.list;
				$scope.parentPaginationOnline.totalItems = res.data.count;
				$scope.state.parentsOnlineCount = res.data.count;
			})

			.error(function(e) {

			})
	} else if(scopeRole == 3) {
		var userparm = {
			areaId: userAreaId,
			gradeId: "",
			classId: "",
			delFlag: 0,
			state: 1,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		$http.get(requireIp + '/uc/ucUser', {
				params: userparm
			})
			.success(function(res) {
				$scope.parentsList.tableMsgList = res.data.list;
				$scope.parentPaginationOnline.totalItems = res.data.count;
				$scope.state.parentsOnlineCount = res.data.count;
			})
			.error(function(e) {})
	} else if(scopeRole == 4) {
		var officeparm = {
			officeId: oid,
			gradeId: "",
			classId: "",
			delFlag: 0,
			state: 1,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		$http.get(requireIp + '/uc/ucUser', {
				params: officeparm
			})
			.success(function(res) {
				console.log(res)
				$scope.parentsList.tableMsgList = res.data.list;
				$scope.parentPaginationOnline.totalItems = res.data.count;
				$scope.state.parentsOnlineCount = res.data.count;
				console.log(oid)
				var officeId1 ={officeId: oid}
				$http.get(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
					params:officeId1
					})
					.success(function(res) {
						$scope.parentsList.gradeList = res.data
					})
					.error(function(e) {

					})
			})
			.error(function(e) {})

	} else {

	}

	//选择地区
	$scope.selettypefn = function(schoolId) {
		$scope.state.allchecked = false;
		$scope.parentsList.checkboxArr = [];
		$scope.state.allStopchecked = false;
		$scope.parentsList.checkboxStopArr = [];
		$scope.state.allcheckedRecover = false;
		$scope.parentsList.checkboxReArr = [];
		$scope.state.gradeState="";
    	$scope.state.classState="";
		$scope.xuexiaoId = schoolId
		//家长在线
		var shiquparmjz = {
			areaId: "",
			officeId: "",
			gradeId: "",
			classId: "",
			delFlag: 0,
			state: 1,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		//已停用
		var shiquparmty = {
			areaId: "",
			officeId: "",
			gradeId: "",
			classId: "",
			delFlag: 0,
			state: 2,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		//回收站
		var shiquparmhsz = {
			areaId: "",
			officeId: "",
			gradeId: "",
			classId: "",
			delFlag: 3,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		}
		//学校id
		var nianjiquparm = {
			officeId: schoolId
		}

		if(scopeRole == 2 || scopeRole == 3) {
			shiquparmjz.areaId = areaId;
			shiquparmty.areaId = areaId;
			shiquparmhsz.areaId = areaId;
		}

		if($scope.xuexiaoId != "") {
			console.log($scope.xuexiaoId)
			shiquparmjz.areaId = "";
			shiquparmty.areaId = "";
			shiquparmhsz.areaId = "";
			shiquparmjz.officeId = $scope.xuexiaoId;
			shiquparmty.officeId = $scope.xuexiaoId;
			shiquparmhsz.officeId = $scope.xuexiaoId;

			//通过学校id获取年级
			$http.get(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
					params: nianjiquparm
				})
				.success(function(res) {
					$scope.parentsList.gradeList = res.data
				})
				.error(function(e) {

				})
			//获取家长信息
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmjz
				})
				.success(function(res) {
					$scope.parentsList.tableMsgList = res.data.list;
					$scope.parentPaginationOnline.totalItems = res.data.count;
					$scope.state.parentsOnlineCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

			//停用
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmty
				})
				.success(function(res) {
					$scope.parentsList.tableMsgStop = res.data.list;
					$scope.parentPaginationStop.totalItems = res.data.count;
					$scope.state.parentsStopCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

			//回收站
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmhsz
				})
				.success(function(res) {
					$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

		} else {

			//通过学校id获取年级
			$http.get(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
					params: nianjiquparm
				})
				.success(function(res) {
					$scope.parentsList.gradeList = res.data
				})
				.error(function(e) {

				})
			//获取家长信息
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmjz
				})
				.success(function(res) {
					$scope.parentsList.tableMsgList = res.data.list;
					$scope.parentPaginationOnline.totalItems = res.data.count;
					$scope.state.parentsOnlineCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

			//停用
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmty
				})
				.success(function(res) {
					$scope.parentsList.tableMsgStop = res.data.list;
					$scope.parentPaginationStop.totalItems = res.data.count;
					$scope.state.parentsStopCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

			//回收站
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmhsz
				})
				.success(function(res) {
					$scope.parentsList.tableMsgListRecover = res.data.list;
							$scope.parentPaginationRecover.totalItems = res.data.count;
							$scope.state.parentsRecoverCount = res.data.count;
				})
				.error(function(e) {
					error(e)
				})

		}

	}

	var onlineState = [];
	var onlineName = [];
	//头部选项卡
	$scope.changeTable = function(change) {
		console.log(change)
		$scope.state.headTab = change;
		sessionStorage.setItem('tableChangeP', change);
		$state.go('teacher_index.parents_handle',{'tableChange':change})
	}
	//点击注册家长全选
	$scope.clickallCheck = function(event) {
		if($scope.state.allchecked) {
			$scope.parentsList.checkboxArr = [];
			$scope.parentsList.tableMsgList.forEach(function(v) {
				$scope.parentsList.checkboxArr.push(v.id);
				onlineState.push(v.state);
				onlineName.push(v.prarentsName);
			})
		} else {
			$scope.parentsList.checkboxArr = [];
			onlineState = [];
			onlineName = [];
		}
	}
	//点击停用全选
	$scope.clickStopCheck = function(event) {
		if($scope.state.allStopchecked) {
			$scope.parentsList.checkboxStopArr = [];
			$scope.parentsList.tableMsgStop.forEach(function(v) {
				$scope.parentsList.checkboxStopArr.push(v.id);
			})
		} else {
			$scope.parentsList.checkboxStopArr = [];
		}
	}
	//点击回收站全选
	$scope.clickRecoverCheck = function(event) {
		if($scope.state.allcheckedRecover) {
			$scope.parentsList.checkboxReArr = [];
			$scope.parentsList.tableMsgListRecover.forEach(function(v) {
				$scope.parentsList.checkboxReArr.push(v.id)
			})
		} else {
			$scope.parentsList.checkboxReArr = [];
		}
	}
	//家长注册单选的选中状态
	$scope.isChecked = function(id) {
		return $scope.parentsList.checkboxArr.indexOf(id) >= 0
	}
	//家长停用单选的选中状态
	$scope.isStopChecked = function(id) {
		return $scope.parentsList.checkboxStopArr.indexOf(id) >= 0
	}
	//回收站单选的选中状态
	$scope.isCheckedRecover = function(id) {
		return $scope.parentsList.checkboxReArr.indexOf(id) >= 0
	}
	//家长注册点击单个checkbox
	$scope.changeCheckbox = function(event, item) {
		var action = event.target.checked ? 'add' : 'remove';
		if(action == 'add' && $scope.parentsList.checkboxArr.indexOf(item.id) == -1) {
			$scope.parentsList.checkboxArr.push(item.id);
			//      	onlineState.push(v.state);
			//          onlineName.push(v.prarentsName);
			if($scope.parentsList.checkboxArr.length == $scope.parentsList.tableMsgList.length) {
				$scope.state.allchecked = true;
			}
		};
		if(action == 'remove' && $scope.parentsList.checkboxArr.indexOf(item.id) != -1) {
			var inx = $scope.parentsList.checkboxArr.indexOf(item.id);
			var sta = onlineState.indexOf(item.state);
			var rea = onlineName.indexOf(item.prarentsName);
			$scope.parentsList.checkboxArr.splice(inx, 1);
			onlineState.splice(sta, 1);
			onlineName.splice(rea, 1);
			$scope.state.allchecked = false;
		}
	}
	//家长停用点击单个checkbox
	$scope.changeStopCheckbox = function(event, id) {
		var action = event.target.checked ? 'add' : 'remove';
		if(action == 'add' && $scope.parentsList.checkboxStopArr.indexOf(id) == -1) {
			$scope.parentsList.checkboxStopArr.push(id);
			if($scope.parentsList.checkboxStopArr.length == $scope.parentsList.tableMsgStop.length) {
				$scope.state.allStopchecked = true;
			}
		}
		if(action == 'remove' && $scope.parentsList.checkboxStopArr.indexOf(id) != -1) {
			var inx = $scope.parentsList.checkboxStopArr.indexOf(id);
			$scope.parentsList.checkboxStopArr.splice(inx, 1);
			$scope.state.allStopchecked = false;
		}
	}
	//回收站点击单个checkbox
	$scope.changeRecoverCheckbox = function(event, id) {
		var action = event.target.checked ? 'add' : 'remove';
		if(action == 'add' && $scope.parentsList.checkboxReArr.indexOf(id) == -1) {
			$scope.parentsList.checkboxReArr.push(id);
			if($scope.parentsList.checkboxReArr.length == $scope.parentsList.tableMsgListRecover.length) {
				$scope.state.allcheckedRecover = true
			}
		}
		if(action == 'remove' && $scope.parentsList.checkboxReArr.indexOf(id) != -1) {
			var inx = $scope.parentsList.checkboxReArr.indexOf(id);
			$scope.parentsList.checkboxReArr.splice(inx, 1);
			$scope.state.allcheckedRecover = false;
		}
	}
	//点击年级
	$scope.changeGreade = function(gradeId) {
		$scope.state.allchecked = false;
		$scope.parentsList.checkboxArr = [];
		$scope.state.allStopchecked = false;
		$scope.parentsList.checkboxStopArr = [];
		$scope.state.allcheckedRecover = false;
		$scope.parentsList.checkboxReArr = [];
		if($scope.state.gradeState == null) {
			var shiquparmlopejz = {
				areaId: "",
				officeId: "",
				gradeId: $scope.state.gradeState,
				classId: "",
				delFlag: 0,
				state: 1,
				pageNo: 1,
				pageSize: pageSize,
				userType: 3
			}
			
			var shiquparmlopety={
				areaId: "",
				officeId: "",
				gradeId: $scope.state.gradeState,
				classId: "",
				delFlag: 0,
				state: 2,
				pageNo: 1,
				pageSize: pageSize,
				userType: 3
			}
			
			
			var paramshszg = {
					areaId: "",
					officeId: "",
					gradeId: $scope.state.gradeState,
					classId: "",
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				};
			
				
			if(scopeRole == 4){
					shiquparmlopejz.officeId = oid;
					shiquparmlopety.officeId = oid;
					paramshszg.officeId = oid;
			}
			
			//家长在线
			$http.get(requireIp + '/uc/ucUser', {
					params: shiquparmlopejz
				})
				.success(function(res) {
					console.log(res)

					$scope.parentsList.tableMsgList = res.data.list;
					$scope.parentPaginationOnline.totalItems = res.data.count;
					$scope.state.parentsOnlineCount = res.data.count;

				})
				.error(function(e) {
					error(e)
				})
				//停用
				loginService.getParentList(shiquparmlopety, function(res) {
					console.log(res)
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					
					// 回收站
						loginService.getParentList(paramshszg, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 2) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgListRecover = res.data.list;
								$scope.parentPaginationRecover.totalItems = res.data.count;
								$scope.state.parentsRecoverCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgListRecover = [];
								$scope.state.parentsRecoverCount = 0;
								$scope.parentPaginationRecover.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});
				
				
		} else {
			$scope.state.studentOnlineChecked = false;
			var param = {
				gradeId: $scope.state.gradeState,
				classId: "",
				delFlag: 0,
				state: 1,
				pageNo: 1,
				pageSize: pageSize,
				userType: 3
			}
			
			var shiquparmlopety={
				officeId: $scope.xuexiaoId,
				gradeId: $scope.state.gradeState,
				classId: "",
				delFlag: 0,
				state: 2,
				pageNo: 1,
				pageSize: pageSize,
				userType: 3
			}
			
			var paramshszg = {
					officeId: $scope.xuexiaoId,
					gradeId: $scope.state.gradeState,
					classId: "",
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				};
				
				
			
			//通过年级查家长
			$http.get(requireIp + '/uc/ucUser', {
					params: param
				})
				.success(function(res) {
					console.log(res)

					$scope.parentsList.tableMsgList = res.data.list;
					$scope.parentPaginationOnline.totalItems = res.data.count;
					$scope.state.parentsOnlineCount = res.data.count;

				})
				.error(function(e) {
					error(e)
				})
				
				
				//停用
				loginService.getParentList(shiquparmlopety, function(res) {
					console.log(res)
						if(sessionStorage.getItem('tableChangeP') == 1) {
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 800)
						}
						if(res.ret == 200) {
							$scope.parentsList.tableMsgStop = res.data.list;
							$scope.parentPaginationStop.totalItems = res.data.count;
							$scope.state.parentsStopCount = res.data.count;
						} else if(res.ret == 400) {
							// $scope.state.warningShow = false;
							$scope.parentsList.tableMsgStop = [];
							$scope.state.parentsStopCount = 0;
							$scope.parentPaginationStop.totalItems = 0;
						}
					}, function(e) {
						$scope.state.warningShow = true;
						$scope.state.imgNotice = 'img/wonde_big.png';
						$scope.state.noteContent = '服务器错误请刷新页面重试';
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 1000)
					});
					
					// 回收站
						loginService.getParentList(paramshszg, function(res) {
							if(sessionStorage.getItem('tableChangeP') == 2) {
								$timeout(function() {
									$scope.state.warningShow = false;
								}, 800)
							}
							if(res.ret == 200) {
								$scope.parentsList.tableMsgListRecover = res.data.list;
								$scope.parentPaginationRecover.totalItems = res.data.count;
								$scope.state.parentsRecoverCount = res.data.count;
							} else if(res.ret == 400) {
								// $scope.state.warningShow = false;
								$scope.parentsList.tableMsgListRecover = [];
								$scope.state.parentsRecoverCount = 0;
								$scope.parentPaginationRecover.totalItems = 0;
							}
						}, function(e) {
							$scope.state.warningShow = true;
							$scope.state.imgNotice = 'img/wonde_big.png';
							$scope.state.noteContent = '服务器错误请刷新页面重试';
							$timeout(function() {
								$scope.state.warningShow = false;
							}, 1000)
							console.log(e)
						});
					
				
				
			//通过年级查班级
			$scope.parentsList.classList = []
			var love = {
				gradeId: $scope.state.gradeState,
				classId: "",
				delFlag: 0,
				state: 1,
				pageNo: 1,
				pageSize: pageSize
			}
			$http.get(requireIp + '/ea/eaClass/findClassInfoByGid', {
					params: love
				})
				.success(function(res) {
					$scope.parentsList.classList = $scope.parentsList.classList.concat(res.data);
					$scope.parentsList.classList.forEach(function(v) {
						v.name = v.name + '班'
					});
				})
				.error(function(e) {
					error(e)
				})

		}

	}

	//点击班级

	$scope.changeClass = function(classId) {

		$scope.state.allchecked = false;
		$scope.parentsList.checkboxArr = [];
		$scope.state.allStopchecked = false;
		$scope.parentsList.checkboxStopArr = [];
		$scope.state.allcheckedRecover = false;
		$scope.parentsList.checkboxReArr = [];
		if($scope.state.classState == null) {

			if($scope.state.gradeState == null) {
				var shiquparmlope = {
					officeId: $scope.xuexiaoId,
					gradeId: "",
					classId: "",
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}
				$http.get(requireIp + '/uc/ucUser', {
						params: shiquparmlope
					})
					.success(function(res) {
						console.log(res)

						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;

					})
					.error(function(e) {
						error(e)
					})
			} else {
				var param = {
					gradeId: $scope.state.gradeState,
					classId: "",
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}
				//通过年级查家长
				$http.get(requireIp + '/uc/ucUser', {
						params: param
					})
					.success(function(res) {
						console.log(res)

						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;

					})
					.error(function(e) {
						error(e)
					})
			}

		} else {
			//通过班级id查询家长
			console.log($scope.state.classState)
			var classparma = {
				classId: $scope.state.classState,
				delFlag: 0,
				state: 1,
				pageNo: 1,
				pageSize: pageSize,
				userType: 3
			}

			$http.get(requireIp + '/uc/ucUser', {
					params: classparma
				})
				.success(function(res) {
					console.log(res)
					$scope.parentsList.tableMsgList = res.data.list;
					$scope.parentPaginationOnline.totalItems = res.data.count;
					$scope.state.parentsOnlineCount = res.data.count;
				})
				.error(function(e) {

				})
		}

	}
	//回收站头部按钮事件
	$scope.parentRecoverAction = function(change) {
		if(!$scope.parentsList.checkboxReArr.length) {
			$scope.state.warningShow = true;
			$scope.state.imgNotice = 'img/wonde_big.png';
			$scope.state.noteContent = '请至少选择一项!';
			$timeout(function() {
				$scope.state.warningShow = false;
			}, 1000)
			return false
		}
		switch(change) {
			case 'renew':
				var params = {
					ids: $scope.parentsList.checkboxReArr.join(','),
					delFlag: 0,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已还原！';
				break;
			case 'delet':
				var params = {
					ids: $scope.parentsList.checkboxReArr.join(','),
					delFlag: 1,
					updateBy: teachMain.teaId
				}
				$scope.state.imgNotice = 'img/chenggong.png';
				$scope.state.noteContent = '所选用户已彻底删除！';
				break;
		}
		loginService.teachHandleUpdataList(params, function(res) {
			if(res.ret == 200) {
				$scope.state.warningShow = true;
				$scope.state.allcheckedRecover = false;
				$scope.parentsList.checkboxArr = [];
				$scope.parentsList.checkboxReArr = [];
				var classState = $scope.state.classState == 'all' ? null : $scope.state.classState;
				// 家长在线

				var jslistpar = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 1,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3,
				}

				if(scopeRole == 2) {
					jslistpar.areaId = areaId;
				}

				if(scopeRole == 3) {
					jslistpar.areaId = areaId;
				}

				loginService.getParentList(jslistpar, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 0) {
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 800)
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;
					} else if(res.ret == 400) {
						$scope.parentsList.tableMsgList = [];
						$scope.state.parentsOnlineCount = 0;
						$scope.parentPaginationOnline.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
					console.log(e)
				});
				//停用

				var jkdfhparm = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 0,
					state: 2,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2) {
					jkdfhparm.areaId = areaId;
				}

				if(scopeRole == 3) {
					jkdfhparm.areaId = areaId;
				}
				loginService.getParentList(jkdfhparm, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 1) {
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 800)
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgStop = res.data.list;
						$scope.parentPaginationStop.totalItems = res.data.count;
						$scope.state.parentsStopCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgStop = [];
						$scope.state.parentsStopCount = 0;
						$scope.parentPaginationStop.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
				// 回收站

				var ukehparm = {
					areaId: "",
					gradeId: $scope.state.gradeState,
					classId: classState,
					delFlag: 3,
					pageNo: 1,
					pageSize: pageSize,
					userType: 3
				}

				if(scopeRole == 2) {
					ukehparm.areaId = areaId;
				}

				if(scopeRole == 3) {
					ukehparm.areaId = areaId;
				}
				loginService.getParentList(ukehparm, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 2) {
						$timeout(function() {
							$scope.state.warningShow = false;
						}, 800)
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgListRecover = res.data.list;
						$scope.parentPaginationRecover.totalItems = res.data.count;
						$scope.state.parentsRecoverCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgListRecover = [];
						$scope.state.parentsRecoverCount = 0;
						$scope.parentPaginationRecover.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
					console.log(e)
				});
			}
		}, function(e) {
			console.log(e)
		})
	}
	//在线搜索
	$scope.parentSearch = function(searchWord) {
	
		$scope.state.allchecked = false;
		$scope.parentsList.checkboxArr = [];
		$scope.state.allStopchecked = false;
		$scope.parentsList.checkboxStopArr = [];
		$scope.state.allcheckedRecover = false;
		$scope.parentsList.checkboxReArr = [];

		var classId = $scope.state.classState == 'all' ? null : $scope.state.classState;
		if(gradeListStatus == 1) {
			classId = parentMainClassId
		};

		var params = {
			areaId: "",
			officeId: "",
			gradeId: $scope.state.gradeState,
			classId: classId,
			keyword: searchWord,
			delFlag: 0,
			state: 1,
			pageNo: 1,
			pageSize: pageSize,
			userType: 3
		};

		if(scopeRole == 2 || scopeRole == 3) {
			params.areaId = areaId;
			params.officeId=$scope.xuexiaoId;
		}

		if($scope.xuexiaoId != "") {

			params.areaId = "";
			params.officeId = $scope.xuexiaoId;
			if(classId == null) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '正在查找!';
			};
			var tableChageItem = sessionStorage.getItem('tableChangeP');
			if(tableChageItem == 0) {
				$scope.state.parentOnlineSearch=searchWord;
				params.delFlag = 0;
				params.state = 1;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 0) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;
					} else if(res.ret == 400) {
						$scope.parentsList.tableMsgList = [];
						$scope.state.parentsOnlineCount = 0;
						$scope.parentPaginationOnline.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			} else if(tableChageItem == 1) {
				$scope.state.parentStopSearch=searchWord;
				params.delFlag = 0;
				params.state = 2;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 1) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgStop = res.data.list;
						$scope.parentPaginationStop.totalItems = res.data.count;
						$scope.state.parentsStopCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgStop = [];
						$scope.state.parentsStopCount = 0;
						$scope.parentPaginationStop.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			} else if(tableChageItem == 2) {
				$scope.state.parentRecoverSearch=searchWord;
				params.delFlag = 3;
				params.state = null;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 2) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgListRecover = res.data.list;
						$scope.parentPaginationRecover.totalItems = res.data.count;
						$scope.state.parentsRecoverCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgListRecover = [];
						$scope.state.parentsRecoverCount = 0;
						$scope.parentPaginationRecover.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			}

		} else {
			if(scopeRole == 2 || scopeRole == 3) {
				params.officeId=$scope.xuexiaoId;
			}else{
				params.officeId=oid;
			}
			
			
			if(classId == null) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '正在查找!';
			};
			var tableChageItem = sessionStorage.getItem('tableChangeP');
			if(tableChageItem == 0) {
				params.delFlag = 0;
				params.state = 1;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 0) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgList = res.data.list;
						$scope.parentPaginationOnline.totalItems = res.data.count;
						$scope.state.parentsOnlineCount = res.data.count;
					} else if(res.ret == 400) {
						$scope.parentsList.tableMsgList = [];
						$scope.state.parentsOnlineCount = 0;
						$scope.parentPaginationOnline.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			} else if(tableChageItem == 1) {
				params.delFlag = 0;
				params.state = 2;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 1) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgStop = res.data.list;
						$scope.parentPaginationStop.totalItems = res.data.count;
						$scope.state.parentsStopCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgStop = [];
						$scope.state.parentsStopCount = 0;
						$scope.parentPaginationStop.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			} else if(tableChageItem == 2) {
				params.delFlag = 3;
				params.state = null;
				loginService.getParentList(params, function(res) {
					if(sessionStorage.getItem('tableChangeP') == 2) {
						$scope.state.warningShow = false;
					}
					if(res.ret == 200) {
						$scope.parentsList.tableMsgListRecover = res.data.list;
						$scope.parentPaginationRecover.totalItems = res.data.count;
						$scope.state.parentsRecoverCount = res.data.count;
					} else if(res.ret == 400) {
						// $scope.state.warningShow = false;
						$scope.parentsList.tableMsgListRecover = [];
						$scope.state.parentsRecoverCount = 0;
						$scope.parentPaginationRecover.totalItems = 0;
					}
				}, function(e) {
					$scope.state.warningShow = true;
					$scope.state.imgNotice = 'img/wonde_big.png';
					$scope.state.noteContent = '服务器错误请刷新页面重试';
					$timeout(function() {
						$scope.state.warningShow = false;
					}, 1000)
				});
			}

		}

	}
	//按键搜索
	$scope.keyUpSearch = function(event, key) {
		if(event.keyCode == 13) {
			$scope.parentSearch(key)
		}
	}
	
	//分页组件配置
	$scope.parentPaginationOnline = {
		currentPage: 1,
		// totalItems: 100  ,
		pagesLength: 9,
		itemsPerPage: pageSize,
		perPageOptions: [15],
		onChange: function() {
			var currentpage = this.currentPage;
			var classId = $scope.state.classState == 'all' ? null : $scope.state.classState;
			var params = {
				areaId: "",
				officeId:"",
				gradeId: $scope.state.gradeState,
				classId: classId,
				delFlag: 0,
				state: 1,
				pageNo: currentpage,
				pageSize: pageSize,
				userType: 3,
				keyword:$scope.state.parentOnlineSearch
			};

			if(scopeRole == 2) {
				params.areaId = areaId;
			}

			if(scopeRole == 3) {
				params.areaId = areaId;
			}
			if(scopeRole == 4) {
				params.officeId = oid;
			}
			if(classId == null) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '稍等一会!';
			}
			loginService.getParentList(params, function(res) {
				$scope.state.warningShow = false;
				if(res.ret == 200) {
					$scope.parentsList.tableMsgList = res.data.list;
				} else if(res.ret == 400) {
					$scope.parentsList.tableMsgList = [];
					$scope.state.parentsOnlineCount = 0;
					$scope.parentPaginationOnline.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});
		}
	}
	//停用组件配置
	$scope.parentPaginationStop = {
		currentPage: 1,
		// totalItems: 100  ,
		pagesLength: 9,
		itemsPerPage: pageSize,
		perPageOptions: [15],
		onChange: function() {
			var currentpage = this.currentPage;
			var classId = $scope.state.classState == 'all' ? null : $scope.state.classState;
			var params = {
				areaId: "",
				gradeId: $scope.state.gradeState,
				classId: classId,
				delFlag: 0,
				state: 2,
				pageNo: currentpage,
				pageSize: pageSize,
				userType: 3,
				keyword:$scope.state.parentStopSearch
			};

			if(scopeRole == 2) {
				params.areaId = areaId;
			}

			if(scopeRole == 3) {
				params.areaId = areaId;
			}

			if(classId == null) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '稍等一会!';
			}
			loginService.getParentList(params, function(res) {
				$scope.state.warningShow = false;
				if(res.ret == 200) {
					$scope.parentsList.tableMsgStop = res.data.list;
				} else if(res.ret == 400) {
					$scope.parentsList.tableMsgStop = [];
					$scope.state.parentsStopCount = 0;
					$scope.parentPaginationStop.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});
		}
	}
	//回收站分页
	$scope.parentPaginationRecover = {
		currentPage: 1,
		totalItems: 10,
		pagesLength: 9,
		itemsPerPage: pageSize,
		perPageOptions: [15],
		onChange: function() {
			var currentpage = this.currentPage;
			var classId = $scope.state.classState == 'all' ? null : $scope.state.classState;
			var params = {
				areaId: "",
				gradeId: $scope.state.gradeState,
				classId: classId,
				delFlag: 3,
				pageNo: currentpage,
				pageSize: pageSize,
				userType: 3,
				keyword:$scope.state.parentRecoverSearch
			};

			if(scopeRole == 2) {
				params.areaId = areaId;
			}

			if(scopeRole == 3) {
				params.areaId = areaId;
			}
			if(classId == null) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '稍等一会!';
			}
			loginService.getParentList(params, function(res) {
				$scope.state.warningShow = false;
				if(res.ret == 200) {
					$scope.parentsList.tableMsgListRecover = res.data.list;
				} else if(res.ret == 400) {
					// $scope.state.warningShow = false;
					$scope.parentsList.tableMsgListRecover = [];
					$scope.state.parentsRecoverCount = 0;
					$scope.parentPaginationRecover.totalItems = 0;
				}
			}, function(e) {
				$scope.state.warningShow = true;
				$scope.state.imgNotice = 'img/wonde_big.png';
				$scope.state.noteContent = '服务器错误请刷新页面重试';
				$timeout(function() {
					$scope.state.warningShow = false;
				}, 1000)
			});
		}
	};

}]);
app.controller('teachHandleCtrl', ['$scope', 'loginService','$state', '$stateParams','$timeout',function ($scope, loginService,$state,$stateParams,$timeout) {
	var loadingtimout = 1000;
    var pageSize = 10;
    var userObjId = sessionStorage.getItem('userId');
    $scope.newschoolId = '';
    //各种状态判断
    $scope.state = {
        headTab: 0,//判断头部选项卡
        teachOnlineChecked: false,//在线教师-判断是否选中
        teachStopChecked: false,//停用账号-判断是否选中
        teachRecoverChecked: false,//回收站-判断是否选中
        teachOnlineCount: 0,
        teachStopCount: 0,
        teachRecoverCount: 0,
        warningShow: false,
        noteContent:'',
        testShow:1,
        deletStatus : false,
        imgNotice : 'img/wonde_big.png',
        sureDeletContent:'确认删除所选教师？',
        AddState:false,//新增是否显示
        addTeaName:'',//新添加教师姓名
        addTeaTel:'',//添加教师手机号
        modelDown:requireIp,
        searchOfficeId:'',
        usertypestate:'',
        promptMessage:false
    };
    $scope.state.usertypestate = sessionStorage.getItem('userType') || 0
	$scope.state.scopestate = sessionStorage.getItem('scope') || 0;
    //声明学校id变量
    var officeId = null;
    var areaIds = null;
    var scope = sessionStorage.getItem('scope');
    if($scope.state.searchOfficeId!=''){
	    	officeId = $scope.state.searchOfficeId;
	}else{
		if(scope =='2'){
			areaIds = sessionStorage.getItem('areaId');
		}
		if(scope == '3'){
			areaIds = sessionStorage.getItem('userAreaId');
			officeId = ''
		}
		if(scope=='4'){
			officeId = JSON.parse(sessionStorage.getItem('userObj')).oid;
		}
	}
        
//  if(sessionStorage.getItem("userType")=='1'){//如果是普通教师登录
//  	officeId = $scope.state.searchOfficeId || JSON.parse(sessionStorage.getItem('userObj')).oid;
//  }else if(sessionStorage.getItem("userType")=='4'){//管理员登录
//  	//获取管理员的区域id
//  	officeId = $scope.state.searchOfficeId || null;
//  }
//  if($scope.state.scopestate == 4){
//  	officeId = JSON.parse(sessionStorage.getItem('userObj')).oid;
//  }
    if($stateParams.tableChange){
        $scope.state.headTab = $stateParams.tableChange;
    }

	 //模拟数据
    $scope.teacherList = {
        teachOnlineArr: [],
        teachStopArr: [],
        teachRecoverArr: [],
        tableMsgList: [
        ],
        tableMsgListStop: [
        ],
        tableMsgListRecover: [
        ]
    }

    $scope.changeHeadTab = function (tebState) {
//  	$scope.newschoolId = "";
//  	$scope.state.searchOfficeId = "";
        $scope.state.headTab = tebState;
       	$state.go('teacher_index.teach_handle',{'tableChange':tebState})
    }
     
     //搜索事件
    $scope.onlineSearch = function(keywords,officeId){
//  	$scope.onlineKeyword = keywords;
    	
    	if($scope.state.headTab==0){
    		$scope.onlineKeyword=keywords;
    	}else if($scope.state.headTab==2){
    		$scope.stopKeyword=keywords;
    	}else if($scope.state.headTab==3){
    		$scope.recoverKeyword=keywords;
    	}
    	
    	$scope.newschoolId = officeId;
    	$scope.TeacherQueryList();
    }
    //教师在线搜索回车
    $scope.onlineKeyup = function(event,key,officeid) {
        if(event.keyCode==13){
            $scope.onlineSearch(key,officeid)
        }
    }
     
    //点击hide删除弹窗
    $scope.gbtc = function(){
        $scope.state.deletStatus = false;
    };
    //新增
    $scope.addOnlineActionTea = function(state){
    	switch(state){
    		case 'add':
    			$scope.state.AddState = true;
    		break;
    		case 'cancel':
    			$scope.state.AddState = false;
    		break;
    	}
    }
     //在线教师头部确认删除
    $scope.suredel = function(){
        $scope.state.deletStatus = false;
        if( $scope.state.headTab==0){
            $scope.teachEventHandle('delet');
        }else if( $scope.state.headTab==2){
            $scope.teachStopHandle('finishDele');
        }else if( $scope.state.headTab==3){
            $scope.teachRecoverHandle('finishDele');
        }
    }
    //点击头部的确认删除按钮
    $scope.teachDelet = function(status){
        switch(status){
            case 'online':
                if(!$scope.teacherList.teachOnlineArr.length){
                    $scope.state.noteContent = '请选择选项';
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.warningShow = true;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000)
                    return false
                }
                $scope.state.sureDeletContent = '确认删除所选教师？'
            break;
            case 'stop':
                if(!$scope.teacherList.teachStopArr.length){
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '请至少选择一项!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000)
                    return false
                }
                $scope.state.sureDeletContent = '确认删除所选教师？'
            break;
            case 'recover':
                if(!$scope.teacherList.teachRecoverArr.length){
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '请至少选择一项!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000)
                    return false
                }
                $scope.state.sureDeletContent = '确认彻底删除所选教师？(该操作不可恢复)'
            break;
        }
        $scope.state.deletStatus = true;
    }
    //在线教师分页
    $scope.teachPaginationOnline = {
        currentPage: 1,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange: function () {
            var currentPage = this.currentPage;
			
            loginService.queryUserList({
                userType: '1',//用户类型
                delFlag: 0,//在职、删除、停用、回收
                state:1,//在职
                keyword:$scope.keyonline,
                pageSize: pageSize,
                pageNo: currentPage,
                officeId: officeId,//学校id
                areaIds:areaIds,
                keyword:$scope.onlineKeyword
            }, function (res) {
                if(res.ret==200){
                	console.log(currentPage+"====================")
                    $scope.teacherList.tableMsgList = res.data.list;
                }else if(res.ret==400){
                    $scope.teacherList.tableMsgList = [];
                    $scope.state.teachOnlineCount = 0;
                    $scope.teachPaginationOnline.itemsPerPage = 0;
                }
            }, function (e) {
                console.log(e)
            });
        }
    }
    //停用账号分页
    $scope.teachPaginationStop = {
        currentPage: 1,
        // totalItems: 10,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange: function () {
             var currentPage = this.currentPage;
            loginService.queryUserList({
                userType: '1',//用户类型
                delFlag: 0,//在职、删除、停用、回收
                state:2,
                keyword:$scope.keyonline,
                pageSize: pageSize,
                pageNo: currentPage,
                officeId: officeId,//学校id
                keyword:$scope.stopKeyword
            }, function (res) {
                if(res.ret==200){
                    $scope.teacherList.tableMsgListStop = res.data.list;
                }else if(res.ret==400){
                    $scope.teacherList.tableMsgListStop = [];
                    $scope.state.teachStopCount = 0;
                    $scope.teachPaginationStop.itemsPerPage = 0;
                }
            }, function (e) {
                console.log(e)
            });
        }
    }
    //回收分页
    $scope.teachPaginationRecover = {
        currentPage: 1,
        totalItems: 10,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange: function () {
            var currentPage = this.currentPage;
            loginService.queryUserList({
                userType: '1',//用户类型
                delFlag: 3,//在职、删除、停用、回收
                pageSize: pageSize,
                pageNo: currentPage,
                keyword:$scope.keyonline,
                officeId: officeId,//学校id
                keyword:$scope.recoverKeyword
            }, function (res) {
                if(res.ret==200){
                    $scope.teacherList.tableMsgListRecover = res.data.list;
                }else if(res.ret==400){
                    $scope.teacherList.tableMsgListRecover = [];
                    $scope.state.teachRecoverCount = 0;
                    $scope.teachPaginationRecover.itemsPerPage = 0;
                }
            }, function (e) {
                console.log(e)
            });
        }
    };
    //文件上传
    $scope.fileAction = function(me){
    	$scope.state.warningShow = true;
        $scope.state.imgNotice = 'img/wonde_big.png';
        $scope.state.noteContent = '上传中，请稍等!';
    	var fd = new FormData();
        var file = me.files[0];
        fd.append('excelFile', file);
        fd.append("userId",sessionStorage.getItem('userId'));
        fd.append("userType",'1');
        loginService.uploadExcelTea(fd,function(res){
        	if(res.ret==200){
		      	$scope.state.imgNotice = 'img/chenggong.png';
		      	$scope.state.noteContent = '上传成功';	
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      		$state.go('teacher_index.teach_handle',{tableChange:0},{reload:true})
		      	},1500)
			}else if(res.ret == 400){
		      	$scope.state.noteContent = res.message+'请重新上传!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
			}else if(res.ret == 402){
				$scope.content = res.data;
				$scope.state.noteContent = res.message;
				$scope.state.promptMessage=true;
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      		$scope.state.promptMessage=false;
		      	},1500)
			}
        },function(e){
        	$scope.state.noteContent = '服务器错误，请稍候再试!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
        });
        me.value = '';
    }
    //新需求文件上传
    $scope.fileUpload =function(me){
    	$scope.state.warningShow = true;
        $scope.state.imgNotice = 'img/wonde_big.png';
        $scope.state.noteContent = '上传中，请稍等!';
    	var fd = new FormData();
        var file = me.files[0];
        fd.append('excelFile', file);
        fd.append("type",'1');
        loginService.importExcelTeacher(fd,function(res){
        	if(res.ret==200){
		      	$scope.state.imgNotice = 'img/chenggong.png';
		      	$scope.state.noteContent = '上传成功';	
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      		$state.go('teacher_index.teach_handle',{tableChange:0},{reload:true})
		      	},1500)
			}else if(res.ret == 400){
		      	$scope.state.noteContent = res.message+'请重新上传!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
			}
		},function(e){
        	$scope.state.noteContent = '服务器错误，请稍候再试!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
        });
        me.value = '';
    }
    //学生新增数据
    $scope.sureAddTeach = function(teaName,tel){
    	var regExp = /^1[34578]\d{9}$/;
    	if(teaName==''){
    		$scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请输入学生姓名!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            return false;
    	}else if(tel==''||!regExp.test(tel)){
    		$scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请输入正确手机号!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            return false;
    	}else{
    		var userRole=[];
    		var userInfo = {
	    		realname:teaName,
	    		userMobile:tel.toString(),
	    		userType:1,
	    		officeId:JSON.parse(sessionStorage.getItem('userObj')).oid,
				createBy:sessionStorage.getItem('userId')
    		}
    		var jsonData = angular.toJson({userInfo:userInfo,roleInfo:userRole})
    		console.log(jsonData)
    		loginService.addUser({
    			userType:1,
	    		jsonData:jsonData
    		},function(res){
    			if(res.ret==200){
    				$scope.state.warningShow = true;
		            $scope.state.imgNotice = 'img/chenggong.png';
		            $scope.state.noteContent = res.message;
		            $scope.state.addTeaName = '';
		            $scope.state.addTeaTel = '';
		            $timeout(function(){
		                $scope.state.warningShow = false;
		                $state.go('teacher_index.teach_handle',null,{reload:true})
		            },1000);
    			}else{
    				$scope.state.warningShow = true;
		            $scope.state.imgNotice = 'img/wonde_big.png';
		            $scope.state.noteContent = res.message;
		            $timeout(function(){
		                $scope.state.warningShow = false;
		            },1000);
    			}
    		},function(e){
    			console.log(e)
    		})
    	}
    }
   
 	var onlineState = [];
    var onlineName = [];
    //点击在线全选事件
    $scope.teachOnlineAction = function (event) {
        var state = $scope.state.teachOnlineChecked,
            arrList = $scope.teacherList.tableMsgList;
        if (state) {
            $scope.teacherList.teachOnlineArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachOnlineArr.push(v.teaInfo.id)
                onlineState.push(v.teaInfo.state);
            	onlineName.push(v.teaInfo.realname);
            })
        } else {
            $scope.teacherList.teachOnlineArr = [];
            onlineState = [];
            onlineName = [];
        }
    }
    //点击账号停用全选事件
    $scope.teachStopAction = function (event) {
        var state = $scope.state.teachStopChecked,
            arrList = $scope.teacherList.tableMsgListStop;
        if (state) {
            $scope.teacherList.teachStopArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachStopArr.push(v.teaInfo.id);
            })
        } else {
            $scope.teacherList.teachStopArr = [];
        }
    };
    //点击回收全选事件
    $scope.teachRecoverAction = function (event) {
        var state = $scope.state.teachRecoverChecked,
            arrList = $scope.teacherList.tableMsgListRecover;
        if (state) {
            $scope.teacherList.teachRecoverArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachRecoverArr.push(v.teaInfo.id);
            })
        } else {
            $scope.teacherList.teachRecoverArr = [];
        }
    }
    //在线教师单选的选中状态
    $scope.isOnlineChecked = function (id) {
        return $scope.teacherList.teachOnlineArr.indexOf(id) >= 0
    }
    //停用账号单选的选中状态
    $scope.isStopChecked = function (id) {
        return $scope.teacherList.teachStopArr.indexOf(id) >= 0
    } //回收单选的选中状态
    $scope.isRecovereChecked = function (id) {
        return $scope.teacherList.teachRecoverArr.indexOf(id) >= 0
    };
    //在线教师点击单个checkbox
    $scope.changeOnlineChecked = function (event, item) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachOnlineArr.indexOf(item.id) == -1) {
            $scope.teacherList.teachOnlineArr.push(item.id);
            onlineState.push(item.state);
            onlineName.push(item.realname);
            if ($scope.teacherList.teachOnlineArr.length == $scope.teacherList.tableMsgList.length) {
                $scope.state.teachOnlineChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachOnlineArr.indexOf(item.id) != -1) {
            var inx = $scope.teacherList.teachOnlineArr.indexOf(item.id);
            var sta = onlineState.indexOf(item.state);
            var real = onlineName.indexOf(item.realname)
            $scope.teacherList.teachOnlineArr.splice(inx, 1);
            onlineState.splice(sta,1);
            onlineName.splice(real,1);
            $scope.state.teachOnlineChecked = false
        }
    }
    //停用账号点击单个checkbox
    $scope.changeStopChecked = function (event, id) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachStopArr.indexOf(id) == -1) {
            $scope.teacherList.teachStopArr.push(id);
            if ($scope.teacherList.teachStopArr.length == $scope.teacherList.tableMsgListStop.length) {
                $scope.state.teachStopChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachStopArr.indexOf(id) != -1) {
            var inx = $scope.teacherList.teachStopArr.indexOf(id);
            $scope.teacherList.teachStopArr.splice(inx, 1);
            $scope.state.teachStopChecked = false
        }
    };
    //回收点击单个checkbox
    $scope.changeRecoverChecked = function (event, id) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachRecoverArr.indexOf(id) == -1) {
            $scope.teacherList.teachRecoverArr.push(id);
            if ($scope.teacherList.teachRecoverArr.length == $scope.teacherList.tableMsgListRecover.length) {
                $scope.state.teachRecoverChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachRecoverArr.indexOf(id) != -1) {
            var inx = $scope.teacherList.teachRecoverArr.indexOf(id);
            $scope.teacherList.teachRecoverArr.splice(inx, 1);
            $scope.state.teachRecoverChecked = false
        }
    }
    //在线教师点击
    $scope.teachEventHandle = function(changeState) {
        if(!$scope.teacherList.teachOnlineArr.length){
            $scope.state.noteContent = '请选择选项';
            $scope.state.imgNotice = 'img/wonde_big.png';
                $scope.state.warningShow = true;
                $scope.TeacherQueryList();
                $timeout(function(){
                    $scope.state.warningShow = false;
                },1000)
            return false
        }
        switch(changeState){
            case 'stop':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : 2,
                    delFlag : 0,
                    updateBy : userObjId
                };
                var requestState = onlineState.some(function(v,i){
                	$scope.state.noteContent = onlineName[i]+'未审核,不能停用';
                	return v==0
                });
                if(requestState){
                	$scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.warningShow = true;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000);
                    return false;
                };
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
	                    $scope.state.noteContent = '停用成功';
	                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $scope.TeacherQueryList();
                         $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
						
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                    }
                },function(e){
                    console.log(e)
                });
            break;
            //密码重置
            case 'passReset':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : '',
                    delFlag : '',
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '密码重置成功';
                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
//                          $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'delet':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    delFlag : 3,
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已成功删除';
                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $scope.TeacherQueryList();
                        $timeout(function(){
                            $scope.state.warningShow = false;
                             $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            
         }
        
    };
    
   


    // $scope.stopSearch = function(keyword){
    //      $scope.onlineSearch(keyword)
    // }
    // $scope.recoverSearch = function(keyword){
    //     console.log(keyword)
    // }
    //教师账号停用事件
    $scope.teachStopHandle = function(changeState) {
         if(!$scope.teacherList.teachStopArr.length){
            $scope.state.noteContent = '请选择选项';
            $scope.state.imgNotice = 'img/wonde_big.png';
                $scope.state.warningShow = true;
                $timeout(function(){
                    $scope.state.warningShow = false;
                     $state.go('teacher_index.teach_handle',null,{reload:true})
                },1000)
            return false
        }
        switch(changeState){
            case 'renew':
                var objParames = {
                    ids : $scope.teacherList.teachStopArr.join(','),
                    state : 1,
                    delFlag : 0,
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '所选用户已还原';
                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $scope.TeacherQueryList();
                        $timeout(function(){
                            $scope.state.warningShow = false;
							 $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'finishDele':
                var objParames = {
                    ids : $scope.teacherList.teachStopArr.join(','),
                    delFlag : 3,
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已成功删除';
                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $scope.TeacherQueryList();
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
        }
        
    }
    //教师回收事件
    $scope.teachRecoverHandle = function(changeState) {
         if(!$scope.teacherList.teachRecoverArr.length){
            $scope.state.noteContent = '请选择选项';
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.warningShow = true;
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000)
            return false
        }
        switch(changeState){
            case 'startUser':
                var objParames = {
                    ids : $scope.teacherList.teachRecoverArr.join(','),
                    state : '',
                    delFlag : 0,
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '账号已可以重新使用';
                    $scope.state.imgNotice = 'img/chenggong.png';
                        $scope.state.warningShow = true;
                        $scope.TeacherQueryList();
                        $timeout(function(){
                            $scope.state.warningShow = false;
                             $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'finishDele':
                var objParames = {
                    ids : $scope.teacherList.teachRecoverArr.join(','),
                    state : '',
                    delFlag : 1,
                    updateBy : userObjId
                }
                loginService.batchUpdataUserState(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已彻底删除';
                    $scope.state.imgNotice = 'img/chenggong.png';
                    $scope.state.warningShow = true;
                    $scope.TeacherQueryList();
                    $timeout(function(){
                        $scope.state.warningShow = false;
                         $state.go('teacher_index.teach_handle',null,{reload:true})
                    },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.imgNotice = 'img/wonde_big.png';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
        }
    }
    //区域搜索查询
    $scope.selettypefn=function(officeId){
    	$scope.state.teachOnlineChecked=false;
    	$scope.teacherList.teachOnlineArr=[];
    	$scope.state.teachStopChecked=false;
    	$scope.teacherList.teachStopArr=[];
    	$scope.state.teachRecoverChecked=false;
    	$scope.teacherList.teachRecoverArr=[];
    	$scope.state.searchOfficeId = officeId;
    	$scope.newschoolId = officeId;
    	if($scope.state.headTab==0){
    		var keyword = $scope.onlineKeyword;
    		$scope.onlineSearch(keyword,$scope.state.searchOfficeId);
    	}else if($scope.state.headTab==2){
    		var keyword = $scope.stopKeyword;
    		$scope.onlineSearch(keyword,$scope.state.searchOfficeId);
    	}else if($scope.state.headTab==3){
    		var keyword = $scope.recoverKeyword;
    		$scope.onlineSearch(keyword,$scope.state.searchOfficeId);
    	}
    }
    
    
    $scope.TeacherQueryList=function(){
        var userListParame ={
        	userType: '1',//用户类型
            keyword: $scope.onlineKeyword,
            delFlag: '',//在职、删除、停用、回收
            pageSize: pageSize,
            pageNo: 1,
            officeId: '', //学校id
            areaIds:''
        }
        var scope = sessionStorage.getItem("scope");
        if($scope.newschoolId!=''){
        	userListParame.officeId = $scope.newschoolId;
        }else{
        	if(scope=='2'){
        		userListParame.areaIds = sessionStorage.getItem('areaId');
       		}
        	if(scope == '3'){
				areaIds = sessionStorage.getItem('userAreaId');
				officeId = ''
			}
        	if(scope=='4'){
        		userListParame.officeId = JSON.parse(sessionStorage.getItem('userObj')).oid;
        	}
        }
        if($scope.state.headTab=='0'){
        	userListParame.state = '1';
        	userListParame.delFlag = '0';
        	//在线列表
	        loginService.queryUserList(userListParame, function (res) {
	        	console.log(res)
	            $scope.teacherList.tableMsgList = res.data.list;
	            $scope.state.teachOnlineCount = res.data.count;
	            $scope.teachPaginationOnline.totalItems = res.data.count;
	        }, function (e) {
	            console.log(e)
	        });
        }
        if($scope.state.headTab=='2'){
        	userListParame.state = '2';
        	userListParame.delFlag = '0';
        	  //停用列表
	        loginService.queryUserList(userListParame, function (res) {
	        	console.log(res)
	            $scope.teacherList.tableMsgListStop = res.data.list;
	            $scope.state.teachStopCount = res.data.count;
	            $scope.teachPaginationStop.totalItems = res.data.count;
	        }, function (e) {
	            console.log(e)
	        });
        }
        if($scope.state.headTab=='3'){
        	userListParame.delFlag = '3';
        	//回收站列表
	        loginService.queryUserList(userListParame, function (res) {
	        	console.log(res)
	            $scope.teacherList.tableMsgListRecover = res.data.list;
	            $scope.state.teachRecoverCount = res.data.count;
	            $scope.teachPaginationRecover.totalItems = res.data.count;
	        }, function (e) {
	            console.log(e)
	        });
        }
    }
    
      $scope.TeacherQueryList();
}])
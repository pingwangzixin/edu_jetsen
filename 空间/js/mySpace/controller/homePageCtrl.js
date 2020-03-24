app.controller('homePageCtrl',['$window','$scope','$state','$timeout','$http','$location','$interval',function($window,$scope,$state,$timeout,$http,$location,$interval) {
	//判断是否登录
	function login(){
		if(sessionStorage.getItem("userId") == null || sessionStorage.getItem("userId") == undefined){
			$state.go('login');
		}
	}
	$scope.classSpace = false;
	$scope.schoolSpace = true;
	
	$scope.person = {
		loginUserName:'', // 登录用户的名字
		userRole:'',
		userClassId:'',
		classId:"",
		officeId:sessionStorage.getItem("officeId"),//学校Id
		userId:sessionStorage.getItem("userId"),
	}
	console.log("学校的Id是》》》》："+$scope.person.officeId);
		//变量包
	$scope.homePage = {
		layerText : '', //弹层文字说明
		open : true, //是否开通空间
		removeState : false ,//是否显示弹层
		fontNumber : 140, //所剩文字数
		inputText:'', //输入框输入的文字
		fileNumber:0, //上传的照片数量;
		ifFiled : false , //是否可以点击上传
		hintState : false, //提示弹层
		issuesuccess : false ,//是否成功提示
		issueState : false,//是否可以点击发布
		issueStateDisabled:true,//发布按钮是否不可用  
		
	}
		//上传照片数据
	$scope.fileArr = [];
//	var src = [{'file_path':'./img/parentRQ.png','imgId':1},{'file_path':'./img/xiaobenkecheng.png','imgId':2},{'file_path':'./img/xz.png','imgId':3}];
	var src = [];
	var ii = 0;
	var resourceIdList = [];
	
	$http.get(spaceEaIp + '/ea/api/uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function (data){
		if(data.ret==200){
			if(sessionStorage.getItem("userType") == 1 || sessionStorage.getItem("userType") == 4 ){
				$scope.userFace = data.data.userInfo.userFace;
				$scope.person.loginUserName = data.data.userInfo.realname;
//				alert($scope.person.loginUserName);
			$scope.navShowDet.title=$scope.person.loginUserName+"的空间";
//			$scope.homePage.officeId=data.data.UserInfo.officeId;
//			console.log("学校Id："+$scope.homePage.officeId);
	 	}
			if(sessionStorage.getItem("userType") == 1 ){
				$http.get(spaceEaIp+"/ea/api/ea/class?teaId="+sessionStorage.getItem("userId")).success(function(data){
					if (data.ret==200) {
					$scope.person.officeId=data.data.officeId;
					$scope.person.classId=data.data.id;
				 
					 
					}
				})
				
			}
			
			
			}
	})
	$scope.navShowDet = {
		title :  '',	//最左侧标题
		secondTitle : '',	//左侧标题旁边二级标题
		middleAdmin : false,	//中间的 机构、用户、角色管理  （布尔值：是否展示，true展示）
		goBackCloud : true		//右边的 捷成教育云返回 （布尔值：是否展示，true展示）
	};
	$scope.$emit('nav',$scope.navShowDet);
 
	//上传照片数据
//	$scope.fileNumer = [
//		{'imgSrc':'./img/parentRQ.png','imgId':1},
//		{'imgSrc':'./img/default_avatar.png'}
//	]
//	
	
	//点赞、取消赞
	$scope.laudClick = function (i,commentId){
		login();
		if($scope.listdata[i].whetherDianZan == false){
			$scope.listdata[i].dianZanCount = $scope.listdata[i].dianZanCount + 1;
			$scope.listdata[i].whetherDianZan = true;
			//点赞提交
			$http.post(mySpaceIP + 'comment/dianZan',{commentId:commentId,userName:$scope.person.loginUserName,userId:sessionStorage.getItem("userId")}).success(function (data){
				console.log(data);
				if(data.ret != 200){
					info('点赞失败',false);
				}
		    })
		}else{
			if($scope.listdata[i].dianZanCount == 0)$scope.listdata[i].dianZanCount = 0;
			$scope.listdata[i].dianZanCount = $scope.listdata[i].dianZanCount - 1;
			$scope.listdata[i].whetherDianZan = false;
			//取消点赞
			$http.post(mySpaceIP + 'comment/dianZanUpDate',{commentId:commentId,userId:sessionStorage.getItem("userId")}).success(function (data){
				console.log(data);
		    })
		}
	};
	
	//点击删除按钮
	$scope.removeClick = function(tar,commentId){
		login()
		$scope.homePage.removeState = true;
		$scope.homePage.layerText = '确认删除吗？';
		//删除弹层确认
		$scope.okClick = function(){
			//删除后台数据
			$http.delete(mySpaceIP + 'comment',{params:{id:commentId}}).success(function (data){
				console.log(data);
				if(data.ret == 200){
					info('删除成功',true);
					$scope.homePage.removeState = false;
					angular.element(tar.target).parents('.zyx-list').remove();
				}else{
					info('删除失败',false);
				}
			})
			
		}
	}
	

//上传图片
	$scope.filePhoto = function(){
		login()
		var fileObj = document.getElementById("FileUpload").files[0]; 
	  	var formFile = new FormData();
      	formFile.append("action", "UploadVMKImagePath");  
       	formFile.append("file", fileObj); //加入文件对象

       	var data = formFile;
       	console.log(data);

       	var data = formFile;

       	if($scope.homePage.fileNumber++ == 9){
			$scope.homePage.ifFiled = true;
			$scope.homePage.fileNumber = 9;
		}else{
			console.log(data)
			$http({
	          	method:'POST',
	          	url:mySpaceIP+'comment/uploadFile',
	          	data: data,
	          	headers: {'Content-Type':undefined},
	          	transformRequest: angular.identity 
	          	 }).success( function ( data ) {
	          	 	console.log(data);
	          	 	if(data.ret == 200){
		               	console.log(data);
		                src[ii] = data.data;
		                resourceIdList[ii] = data.data.file_id;
		                $scope.fileArr.push(src[ii]);
						if($scope.homePage.inputText.length >0 || $scope.homePage.fileNumber >0){
							$scope.homePage.issueState = true;
							$scope.homePage.issueStateDisabled = false;
						}else{
							$scope.homePage.issueState = false;
							$scope.homePage.issueStateDisabled = true;
						} 
						ii ++;
			            console.info(src[ii]);
						console.info($scope.fileArr);
						console.log(resourceIdList);
	          	 	}else{
	          	 		$scope.homePage.fileNumber--;
	          	 	}
	             }); 
		}
		event.target.value='';
	};
	
	//图片上的删除按钮
	$scope.closeClick = function(tar,index,fileId){
		login()
		console.log(fileId);
		console.info(tar+"-------------"+index);
		$scope.homePage.removeState = true;
		$scope.homePage.layerText = '确认删除吗？';
		//删除弹层确认
		$scope.okClick = function(){
			//删除上传的资源
			$http.delete(mySpaceIP + 'comment/delCommentResByResId',{params:{id:fileId}}).success(function (data){
				console.log(data);
				if(data.ret == 200){
					$scope.homePage.removeState = false;
					$scope.fileArr.splice(index,1);
					$scope.homePage.fileNumber = $scope.fileArr.length;
					console.log($scope.fileArr);
					info('删除成功',true);
					src.splice(index,1);
					resourceIdList.splice(index,1);
					ii --;
					console.log(src);
					console.log(ii);
					console.log(resourceIdList.join(','));
					if($scope.homePage.inputText.length >0 || $scope.homePage.fileNumber >0){
						$scope.homePage.issueState = true;
						$scope.homePage.issueStateDisabled = false;
					}else{
						$scope.homePage.issueState = false;
						$scope.homePage.issueStateDisabled = true;
					}
				}else{
					info('删除失败',false);
				}
			})
		}
	}
	
	//发布
	$scope.issueClick = function(){
		login()
		console.log($scope.person.loginUserName);
		console.log($scope.homePage.inputText.length);
		var judgmentResourceState ="0";
		if( $scope.homePage.fileNumber >0){
			judgmentResourceState = "1";
		}
		$http.post(mySpaceIP + 'comment',{commentUserId:sessionStorage.getItem("userId"),commentUserName:$scope.person.loginUserName,state:'0',content:$scope.homePage.inputText,relatedArticleId:sessionStorage.getItem("userId"),resourceId:resourceIdList.join(','),reviewRating:'0',judgmentResource:judgmentResourceState}).success(function (data){
				console.log(data);
				if(data.ret == 200){
					info('发布成功',true);
				    $window.location.reload();
				}else{
					info('发布失败',false);
				}
	    })
	}
	
	//删除弹层取消
	$scope.noClick = function(){
		$scope.homePage.removeState = false;
	}
	
	//输入文字数量限制
	$scope.changeText = function(tar){
		login()
		var length = angular.element(tar.target).val().length;
		$scope.homePage.fontNumber = 140 - length;
//		console.log($scope.homePage.inputText)
		if($scope.homePage.fontNumber <= 0){
			$scope.homePage.fontNumber = 0;
			$scope.homePage.inputText = $scope.homePage.inputText.slice(0,140);
		}
		console.log($scope.homePage.inputText.length);
		console.log($scope.homePage.fileNumber);
		if($scope.homePage.inputText.length >0 || $scope.homePage.fileNumber >0){
			$scope.homePage.issueState = true;
			$scope.homePage.issueStateDisabled = false;
		}else{
			$scope.homePage.issueState = false;
			$scope.homePage.issueStateDisabled = true;
		}
	}
//	获取登录人的信息
	$http.get(spaceEaIp + '/ea/api/uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function (data){
    	console.log(data.data);
		if(data.ret==200){
			if(sessionStorage.getItem("userType") == 1 || sessionStorage.getItem("userType") == 4 ){
				$scope.userFace = data.data.userInfo.userFace;
				$scope.person.loginUserName = data.data.userInfo.realname;
				console.log(data.data.userRole);
				angular.forEach(data.data.userRole, function (each) { 
					console.log(each.rid);
					if(each.rid == 1){
						$scope.classSpace = true;
						$scope.person.userClassId = each.cid;
					}
				})
				/**
			   	 * 如果不是学校，那么不显示学校空间
		   		 */
				if(data.data.userInfo.officeGrade == 4 || data.data.userInfo.officeGrade == 7 ||data.data.userInfo.officeGrade == 8 ){
					$scope.schoolSpace = false;
				}
				$scope.person.officeId = data.data.userInfo.officeId;
				if ($scope.person.officeId!="") {
					console.log("学校Id>>>>>>>>>>>>>>>>>>"+$scope.person.officeId);
					sessionStorage.setItem("officeId",$scope.person.officeId);
							console.log("存入session》》》"+sessionStorage.getItem("officeId"))	;		
				} else{
						alert(11111111111111111111111);		
				}
			}else if(sessionStorage.getItem("userType") == 2){
				$scope.userFace = data.data.stuInfo.userFace;
				$scope.person.loginUserName = data.data.stuInfo.realname;
			}else if(sessionStorage.getItem("userType") == 3){
				$scope.userFace = data.data.parInfo.userFace;
				$scope.person.loginUserName = data.data.parInfo.realname;
			}
		}
    })
	//	获取说说动态
	$http.get(mySpaceIP + 'comment/findListTree',{params:{relatedArticleId:sessionStorage.getItem("userId"),sortType:'1',pageNumber:'1',showNumber:'10',loginUserId:sessionStorage.getItem("userId")}}).success(function (data){
    	console.log(data);
    	console.log(data.ret);
    	console.log(data.data);
    	console.log(data.data.commentList);
		if(data.ret==200){
			$scope.listdata = data.data.commentList;
		}else{
			$scope.dataState = false;
		}
			
    })
	function info($text,$state){
		$scope.homePage.layerText = $text;
		$scope.homePage.issuesuccess = $state;
		$scope.homePage.hintState = true;
		$timeout(function(){
			$scope.homePage.hintState = false;
		},1500);
	}
	
	
}]);


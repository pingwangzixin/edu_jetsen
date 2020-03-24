app.controller('dailyCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','queryData',function($scope,$state,$timeout,$http,$location,$q,$rootScope,queryData) {
//	敏感词
	$scope.sensitiveWords = ["国家领导人","共产党","傻","神经","杀","社会主义","台湾","香港","一国两制"];
//	展示图片
	$scope.picture = [];
//	上传图片
	$scope.picture1 = [];
	$scope.$on('transfer.type', function(event, data) {  
		$scope.userImage = data;
		$scope.findData();
	}); 
	$scope.publishContent = "";
	$scope.whetherComment = false;
	$scope.verificationReview = false;
	$scope.verificationReview1 = false;
	$scope.validationReply = false;
	$scope.user = {};
	$scope.faceHave = true;
//	变量
	$scope.userId =  $location.search().id || sessionStorage.userId;
	$scope.myUserId = sessionStorage.myUserId;
	$scope.myUserType = sessionStorage.myUserType;
	$scope.userType = $location.search().type || sessionStorage.userType;
	$scope.userName = sessionStorage.userName;

	console.log($scope.userId)
	console.log($scope.myUserId)
	console.log($scope.userType)
	console.log($scope.userName)
	$scope.variablePacket = {
		relatedArticleId:$scope.userId,
//		relatedArticleId:"e05575e52c5f4c35a03baf68a0da4eb9",
//		relatedArticleId:"a0a6ddda7b0494c80ce9a4239a02eb0",
		sortType:1,
		pageNumber:1,
		showNumber:5,
		loginUserId:sessionStorage.myUserId,
		messageArray:[],
	}
	$scope.parentsComment = function(){
		$scope.whetherComment = !$scope.whetherComment;
	}
	
	//	是否是本人
	$scope.visiter = sessionStorage.visiter;
//	发布数据
	$scope.release ={
		state:false
	}
//	发布显示与隐藏
	$scope.release1 =function(){
		$scope.release.state = !$scope.release.state;
	}
	$scope.replysensitive = function(item){
		item.verificationReview3 = $scope.sensitiveWords.some((ele,index)=>{
			if(item.publishContent1.indexOf(ele) != -1){
				return  true;
			}else{
				return  false;
			}
		})
	}
//	发布评论
	$scope.release2 =function(){
		if($scope.publishContent ==""  &&  $scope.picture1.length == 0){
			$scope.verificationReview1 = true;
			return; 
		}else{
			$scope.verificationReview1 = false;
		}
		if($scope.verificationReview){
			return;
		}
		let  params = {
			commentUserId:$scope.userId,
			commentUserName:$scope.userName,
			content:$scope.publishContent,
			state:0,
			relatedArticleId:$scope.userId,
//			relatedArticleId:'e05575e52c5f4c35a03baf68a0da4eb9',tea_617_23767
			judgmentResource:0,
			reviewRating:0,
			parentping:0,
			userFace:"",
			schoolId:$scope.user.schoolId,
			classId:$scope.user.classId
		}
		if($scope.whetherComment){
			params.parentping =1;
		}
		console.log(params)
		if($scope.picture1.length >0){
			var fd = new FormData();
			$scope.picture1.forEach((ele,index)=>{
				 fd.append('file'+(index+1),ele);
			})
		    $http({
	    		url:edu_comment+"/edu-comment/comment/uploadFile",
	    		method:'POST',
	    		data:fd,
	    		headers: {'Content-Type':undefined},
	            transformRequest: angular.identity
	    	}).success(function(res){
	    		let str = "";
				res.data.forEach(ele=>{
					str += (ele.file_id + ",")
				})
				str = str.substring(0,str.length - 1)
				params.judgmentResource = 1;
				params.resourceId = str;
				queryData.postData(edu_comment+"/edu-comment/comment", params).then(res=>{
					if(res.ret == 200){
						$scope.findData();
					}
				});
	    	})
		}else{
			queryData.postData(edu_comment+"/edu-comment/comment", params).then(res=>{
				if(res.ret == 200){
					$scope.findData();
				}
			});
		}
		$scope.release.state = !$scope.release.state;
		$scope.picture = [];
		$scope.picture1 = [];
		$scope.publishContent = "";
	}
//	发布回复
	$scope.release3 = function(item,index){
		if(item.publishContent1 == ""){
			item.verificationReview2 = true;
			return;
		}else{
			item.verificationReview2 = false;
		}
		if(item.verificationReview3){
			return;
		}
		let  params = {
			commentUserId:sessionStorage.userId,
			commentUserName:sessionStorage.userName,
			content:item.publishContent1,
			state:1,
//			relatedArticleId:'e05575e52c5f4c35a03baf68a0da4eb9',
			byReplyId:item.id,
			replyUserId:sessionStorage.myUserId,
			replyUserName:sessionStorage.myUserName,
			judgmentResource:0,
			reviewRating:0,
			userFace:"",
			schoolId:"",
			classId:""
		}
		console.log(params)
		queryData.postData(edu_comment+"/edu-comment/comment", params).then(res=>{
			if(res.ret == 200){
				$scope.findData(index);
			}
		});
	}
//	input.file改变
	$scope.uploadPictures = function(target){
		for(let i = 0;i < target.files.length; i++){
			if($scope.picture1.length<9){
				$scope.picture1.push(target.files[i]);
				let reader = new FileReader();  
				reader.readAsDataURL(target.files[i]);
		        reader.onload=function(e){
		            let imgFile = e.target.result;
	            	$scope.picture.push(imgFile);
	            	$scope.$apply();
		     	};
			}
		}
		target.value = "";
	}
//	删除照片
	$scope.deleteimg = function(e){
		$scope.picture.splice(e,1);
		$scope.picture1.splice(e,1);
	}
//	删除评论
	$scope.deleteComments = function(item){
		queryData.getData(edu_comment+"/edu-comment/comment/delCommentById", {id:item.id}).then(res=>{
			$scope.findData();
		})
	}
//	删除回复
	$scope.deleteReply = function(item,index){
		queryData.getData(edu_comment+"/edu-comment/comment/delCommentAndReplyById", {id:item.id}).then(res=>{
			$scope.findData(index);
		})
	}
//	查询性别
	$scope.queryGender = "";

//	请求
	$scope.findData = function(index) {
		$http.get(spaceEaIp + '/ea/api/uc/ucUser/'+$scope.userId+'/'+$scope.userType).success(function(data) {
			if($scope.userType == 1){
				$scope.queryGender = data.data.userInfo.sex;
				$scope.user.schoolId = data.data.userInfo.officeId;
				let str = '';
				data.data.userCourse.forEach((ele,index)=>{
					if(index == data.data.userCourse.length-1){
						str += ele.cid;
					}else{
						str += ele.cid + ",";
					}
				})
				$scope.user.classId = str;
				if(data.data.userInfo.userFace != ""){
					$scope.faceHave = true;
				}else{
					$scope.faceHave = false;
				}
				$scope.userImage = spaceEaIp+'/resource/user/face/'+data.data.userInfo.userFace +"?"+ new Date().getTime();
			}else if($scope.userType == 2){
				$scope.queryGender = data.data.stuInfo.sex;
				$scope.user.schoolId = data.data.stuInfo.officeId;
				$scope.user.classId = data.data.stuInfo.classId;
				$scope.userImage = spaceEaIp+'/resource/user/face/'+ data.data.stuInfo.userFace +"?"+ new Date().getTime();
				if(data.data.stuInfo.userFace != ""){
					$scope.faceHave = true;
				}else{
					$scope.faceHave = false;
				}
			}else if($scope.userType == 3){
				$scope.user.schoolId = data.data.officeId;
				$scope.user.classId = data.data.classId;
				$scope.userImage = spaceEaIp+'/resource/user/face/'+ data.data.parInfo.userFace +"?"+ new Date().getTime();
				if(data.data.parInfo.userFace != ""){
					$scope.faceHave = true;
				}else{
					$scope.faceHave = false;
				}
			}
		})
		var params = {
			relatedArticleId : $scope.variablePacket.relatedArticleId,
			sortType : $scope.variablePacket.sortType,
			pageNumber :$scope.variablePacket.pageNumber,
			showNumber : $scope.variablePacket.showNumber,
			loginUserId:$scope.variablePacket.loginUserId,
		}
		//查询消息列表
		var promise = queryData.getData(edu_comment+"/edu-comment/comment/findListTree", params);
		promise.then(function(result){
			if(result.ret == 200){ 
				if(result.data.commentCount%10 ==0){
					$scope.totalPageNumber = result.data.commentCount/10;
				}else{
					$scope.totalPageNumber = parseInt(result.data.commentCount/10)+1;
				}
				//先清空数据
				$scope.variablePacket.messageArray = [];
				$scope.variablePacket.messageArray = result.data.commentList;
				$scope.variablePacket.messageArray.forEach(ele=>{
					ele.state = false;
					ele.publishContent1 = "";
					ele.verificationReview2 = false;
					ele.verificationReview3 = false;
					ele.pinglunflag = (ele.parentping == 0&& $scope.myUserType==3)?true:false;
					ele.replyList.forEach(ele1=>{
						let flag = false;
//						学生或者家长回复删除权限
						if(sessionStorage.myUserType == 2 || sessionStorage.myUserType == 3 ){
							if(ele1.replyUserId == sessionStorage.myUserId)  flag = true 						
						}
//						校领导回复删除权限
						if(sessionStorage.myUserType == 4){
							flag = true 
						}
						if(sessionStorage.myUserType == 1){
//							任课老师删除权限
							if(sessionStorage.myRoleId == 14){
								if(ele1.replyUserId == sessionStorage.myUserId)  flag = true; 	
							}else{
//								班主任删除权限
								if(ele1.replyUserId == sessionStorage.myUserId)  flag = true;
								if(sessionStorage.myClassId == sessionStorage.classId){
									if(sessionStorage.userType ==2 || sessionStorage.userType ==3){
										flag = true;
									}
								} 
								if(sessionStorage.classId1){
									JSON.parse(sessionStorage.classId1).forEach(ele=>{
										if(ele == sessionStorage.myClassId ){
											flag = true;
										}
									})
								}
							}
						}
						ele1.state = flag;
					})
				})
				let arr = [];
				$scope.variablePacket.messageArray.forEach(ele=>{
					let  promise = queryData.getData(edu_comment+"/edu-comment/comment/getDianZanList", {commentId:ele.id});
					arr.push(promise)
				})
				Promise.all(arr).then(res=>{
					console.log(res)
					res.forEach((ele,index)=>{
						$scope.variablePacket.messageArray[index].dianZanList = ele.data.dianZanList;
					})

					if(index != undefined){
						$scope.variablePacket.messageArray[index].state = true;
					}
					console.log($scope.variablePacket.messageArray)
					$scope.$apply()
				})
				$scope.variablePacket.messageArray.forEach((e,i)=>{
					let userIds = "";
					e.replyList.forEach((ele,index)=>{
						if(index == e.replyList.length-1){
							userIds += ele.replyUserId;
						}else{
							userIds += ele.replyUserId + ",";
						}
					});
					var params = {
					   userIds : userIds
					}
					var promise = queryData.postData(findUsers, params);
					promise.then(res=>{
						console.log(res)
						res.data.forEach(ele=>{
							e.replyList.forEach(ele1=>{
								if(ele1.replyUserId == ele.id){
									if(ele.userFace){
										ele1.userFace = spaceEaIp+'/resource/user/face/'+ ele.userFace +"?"+ new Date().getTime();
									}else{
										ele1.userFace = "";
									}
									
									ele1.sex = ele.sex;
								} 
							})
						})
					})
				})
			}else{
				console.log("查询失败");
				$scope.variablePacket.noMessage = true;
			}
		});
	}
	//监听页数变换
	$scope.$watch("variablePacket.pageNumber", function(newVal, oldVal) {
		$scope.findData();
	})
	$scope.$watch("publishContent", function(newVal, oldVal) {
		$scope.verificationReview = $scope.sensitiveWords.some((ele,index)=>{
			if($scope.publishContent.indexOf(ele) != -1){
				return  true;
			}else{
				return  false;
			}
		})
		$scope.verificationReview1 = false;
	})
	
//	回复列表.
	$scope.openClose = function(index){
		$scope.variablePacket.messageArray[index].state = !$scope.variablePacket.messageArray[index].state;
	}
//	点赞
	$scope.dianZan = function(item,index){
		$scope.variablePacket.messageArray[index].whetherDianZan = !$scope.variablePacket.messageArray[index].whetherDianZan;
		let  params = {
			commentId:item.id,
			userName:sessionStorage.myUserName,
//			userId:item.commentUserId
			userId:sessionStorage.myUserId
		}
		if($scope.variablePacket.messageArray[index].whetherDianZan){
			queryData.postData(edu_comment+"/edu-comment/comment/dianZan", params).then(res=>{
				$scope.findData();
			})
		}else{
			queryData.postData(edu_comment+"/edu-comment/comment/dianZanUpDate", params).then(res=>{
				$scope.findData();
			})
		}
	}
}]);
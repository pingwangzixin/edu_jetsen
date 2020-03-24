app.controller('starStudentCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	range:$location.$$search.range,//学校还是班主任进入的角色
		nav:$location.$$search.nav,//导航显示的角色
    	  showState:true,  //展示模块状态
		  editState:false, //编辑模块状态
		  nameError:false, //姓名提示
          imgError:false,//上传图片提示
          textError:false, //文本提示
          name:"",         //姓名
          imagePath:"" ,     //上传图片路径
          text:"" ,//文本内容
          prompt:false  //删除弹框
    };
    //明星学生数据模拟
    $scope.starStudent=[
        {
        	 id:1,
        	 img:"img/default_avatar.png",//头像
        	 name:"张三",     //姓名
        	 content:"我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。"//简介
        },
        {
        	 id:2,
        	 img:"img/default_avatar.png",
        	 name:"李四",
        	 content:"我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。"
        },
        {
        	 id:3,
        	 img:"img/default_avatar.png",
        	 name:"王五",
        	 content:"我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。"
        },
        {
        	 id:4,
        	 img:"img/default_avatar.png",
        	 name:"赵六",
        	 content:"我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。我喜欢学习，学习使我快乐。"
        }
    
    
      ];
      
    /*$timeout(function(){
    	angular.element(".zmj_starStudent_list").mCustomScrollbar({
			mouseWheelPixels : 1000,	//滚动速度
			theme: "dark-thin"			//滚动条样式
		});
    })*/
      
    //编辑事件
	$scope.edit=function(){
		 $scope.variablePacket.showState=false;
		 $scope.variablePacket.editState=true;
		 
	};
	//上传图片
	$scope.filePhoto = function() {
		var imgFile = document.getElementById('FileInput').files[0];
		var FileImg=document.getElementById("FileImg");
		var fr = new FileReader();
		fr.readAsDataURL(imgFile);
		fr.addEventListener("load", function(argument) {
			FileImg.src = this.result;
			$scope.variablePacket.imagePath=this.result;
			FileImg.style.display="block";
			$scope.variablePacket.imgError=false;
			$scope.$apply();
		
		});

	};
	//文本验证
	$scope.nameBlur=function(){
		 if($scope.variablePacket.name!=""){
		 	 $scope.variablePacket.nameError=false;
		 }else{
		 	  $scope.variablePacket.nameError=true;
		 };
	};
	//文本域验证
	$scope.textBlur=function(){
		 if($scope.variablePacket.text!=""){
		 	 $scope.variablePacket.textError=false;
		 }else{
		 	  $scope.variablePacket.textError=true;
		 };
	};
	//保存验证
	$scope.save=function(){
		 if($scope.variablePacket.name==""){
		 	 $scope.variablePacket.nameError=true;
		 };
		 if($scope.variablePacket.imagePath==""){
		 	 $scope.variablePacket.imgError=true;
		 };
		 if($scope.variablePacket.text==""){
		 	 $scope.variablePacket.textError=true;
		 };
		 if($scope.variablePacket.name!="" && $scope.variablePacket.imagePath!="" && $scope.variablePacket.text!=""){
		 	  $scope.variablePacket.showState=true;
	          $scope.variablePacket.editState=false;
		 };
		   //根据交互效果来确定是否用else if
		 
	};
	//删除弹框
	$scope.Del = function(i) {    
		$scope.promptShow('确认删除吗？',false);
		$scope.delOk = function (){
			$scope.variablePacket.prompt = false;
			$scope.starStudent.splice(i,1);
			$scope.wranShow('删除成功',true);
		};
	};
}]);
app.controller('classAtmosphereCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', function($scope, $state, $stateParams, $timeout, $http, $location, $interval) {
	//变量包
	$scope.variablePacket = {
		range:$location.$$search.range,//学校还是班主任进入的角色
		nav:$location.$$search.nav,//导航显示的角色
		showState:true,  //展示模块状态
		editState:false, //编辑模块状态
        imgError:false,//上传图片提示
        textError:false, //文本提示
        imagePath:"" ,     //上传图片路径
        text:""          //文本内容
	};
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
	//文本域失去焦点
	$scope.textBlur=function(){
		 if($scope.variablePacket.text!=""){
		 	 $scope.variablePacket.textError=false;
		 }else{
		 	  $scope.variablePacket.textError=true;
		 };
	};
	//保存验证
	$scope.save=function(){
		 
		 if($scope.variablePacket.imagePath==""){
		 	 $scope.variablePacket.imgError=true;
		 };
		 if($scope.variablePacket.text==""){
		 	 $scope.variablePacket.textError=true;
		 };
		 if($scope.variablePacket.imagePath!="" && $scope.variablePacket.text!=""){
		 	  $scope.variablePacket.showState=true;
	          $scope.variablePacket.editState=false;
		 };
		   //根据交互效果来确定是否用else if
		 
	};

}]);
app.controller('publicEditCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
	$scope.variablePacket = {
		name:$stateParams.name,  //establish:创建    edit:编辑
		state:$stateParams.state,    //classNotice：班务公示  classActivity：特色活动   schoolActivity：学校活动
		taskName : '', // 公示名称文字
		selectDate:'',  // 日期选择默认
		taskCont:'',   //公示内容文字
		UploadFile_show:true,//页面--上传文件是否显示
		uploadFile:[
			{'ResourceSrc':'0',"name":"2016—2017学年六年级语文...",'ResourceNum':0},
			{'ResourceSrc':'1',"name":"2015—2017学年六年级语文...",'ResourceNum':1},
			{'ResourceSrc':'2',"name":"2016—2017学年六年级语文...",'ResourceNum':2},
			{'ResourceSrc':'3',"name":"2015—2017学年六年级语文...",'ResourceNum':3},
			{'ResourceSrc':'4',"name":"2016—2017学年六年级语文...",'ResourceNum':4}
		],
		ProvingOff:false,//验证开关
		ProvingTaskname:false,//公示名称验证
		ProvingDate:false,//活动时间验证
		ProvingTaskcont:false,//公示内容验证
		prompt:false  //删除弹框
	}
	//公示名称
	$scope.mlh_taskName = function(){
		if($scope.variablePacket.taskName.length>0){
			$scope.variablePacket.ProvingTaskname = false;
			$scope.variablePacket.ProvingOff = true;
		}
	}
	//双日历
	$scope.ChangeDate = function(){
		$scope.variablePacket.selectDate = $("#time").val();
		if($scope.variablePacket.selectDate.length>0){
			$scope.variablePacket.ProvingDate = false;
			$scope.variablePacket.ProvingOff = true;
		}
	}
	// 公示内容
	$scope.mlh_taskCont = function(){
		if($scope.variablePacket.taskCont.length>0){
			$scope.variablePacket.ProvingTaskcont = false;
			$scope.variablePacket.ProvingOff = true;
		}
	}
	//验证
	$scope.Verification = function(ok){
		if(ok && (!$scope.variablePacket.ProvingDate) && (!$scope.variablePacket.ProvingTaskcont) &&  (!$scope.variablePacket.ProvingTaskname)){
			$scope.wranShow('验证成功!',true,'');
		}else{
			if(!$scope.variablePacket.ProvingTaskcont&& !$scope.variablePacket.ProvingOff){
				$scope.variablePacket.ProvingTaskcont = true;
			}
			if(!$scope.variablePacket.ProvingDate && !$scope.variablePacket.ProvingOff){
				$scope.variablePacket.ProvingDate = true;
			}
			if(!$scope.variablePacket.ProvingTaskname && !$scope.variablePacket.ProvingOff){
				$scope.variablePacket.ProvingTaskname = true;
			}
		}
	}
	//页面--上传文件的删除
	$scope.uploadFile = function (i,index,title){
		$scope.promptShow('确认删除吗？',false,title);
		$scope.delOk = function (){
			$scope.variablePacket.uploadFile.splice(index,1);
			$scope.variablePacket.prompt = false;
			$scope.wranShow('删除成功',true,title);
			if($scope.variablePacket.uploadFile.length == 0){
					$scope.variablePacket.UploadFile_show = false;
			}
		};
	};
}]);
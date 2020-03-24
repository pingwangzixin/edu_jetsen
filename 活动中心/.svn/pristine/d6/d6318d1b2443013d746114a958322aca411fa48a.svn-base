 app.controller('sharedLibraryCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	//分享列表

	$http.get(requireIp+"activity/activitycenter/findShare").success(function(res){
		console.log(res);
		if(res.code != 200){
			$scope.n_y_data = true;
			return ;
		}
		
		if(res.data == null || res.data =="" || res.data <= 0){
			$scope.n_y_data = true;
			return ;
		}
		$scope.n_y_data = false;
		var newData =[];
		angular.forEach(res.data, function(data,i,array){
			//data等价于array[index]
			var newActivity = {};
			switch (data.activityType){
				case 1:
					newActivity.type = "社会实践课";
					newActivity.class = "zy_education";
					break;
				case 2:
					newActivity.type = "爱国与团队精神";
					newActivity.class = "zy_habit";
					break;
				case 3:
					newActivity.type = "学生守则与行为规范";
					newActivity.class = "zy_law";
					break;
				case 4:
					newActivity.type = "思想品德与艺术教育";
					newActivity.class = "zy_character";
					break;
				default:
					newActivity.type = "其他";
					newActivity.class = "zy_other";
					break;
			}
			newActivity.id = data.activityId;
			var imgSrc = "";
			if(!$.isEmptyObject(data.activityFile)) {
				$.each(JSON.parse(data.activityFile), function(i,o) {
					if(i==0){
						imgSrc = o.substring(0,o.lastIndexOf("/")-1);
						return;
					}					
				});
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			newActivity.src = resourceIp+"resource/"+imgSrc;
			newActivity.cont = data.activityDeman;
			newActivity.title = data.activityName;
			newActivity.time = data.activityStartdate +"~" +data.activityEnddate;
			newData.push(newActivity);
		});
		console.log(newData)
		$scope.shareList= newData;
	});
}]);


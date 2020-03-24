app.controller('studentActivityListCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var stuId = user.stuId;
	$http.get(requireIp+"activity/activitycenter/findStuActivity?stuId="+stuId).success(function(res){
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
			if(data.activity_state == 0){
				newActivity.state = "未开始";
				newActivity.class ="zy_not_begin";
			}else if(data.activity_state == 1){
				newActivity.state = "进行中";
				newActivity.class ="zy_be_underway";
			}else {
				newActivity.state = "已结束";
				newActivity.class ="zy_is_over";
			}
			if(data.activity_state == 2){
				newActivity.state = "已结束";
				newActivity.class ="zy_is_over";
			}
				newActivity.id = data.activity_id;
			if(data.activity_file !="" && data.activity_file !="[]"){
				$.each(JSON.parse(data.activity_file), function(i,o) {
					if(i == 0){
			 	    newActivity.src = resourceIp+"resource/"+o.substring(0,o.lastIndexOf("/")-1);
		            return;
					}
				});
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			
			newActivity.cont = data.activity_deman;
			newActivity.title = data.activity_name;
			newActivity.time = data.activity_startdate.substring(0,10) +"~" +data.activity_enddate.substring(0,10);
			newData.push(newActivity);
		});
		console.log(newData)
	$scope.activityList= newData;
})
}]);


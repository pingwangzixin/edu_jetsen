app.controller('indexListDetailsCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	id : $stateParams.id, //列表页传递的参数id
    	data :   //详情页模拟数据
		{
			id: 1,
			notice:'(系统消息)牡丹江市教育和体育局关于2018年秋季申请认定高中阶段教师资的通告',
			expert:'专家',
			teacher:'教师',
			xiaoxue:'全部小学',
			chuzhong:'全部初中',
			title: "牡丹江市教育和体育局关于2018年秋季申请认定高中阶段教师资的通告", 
			content: "根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。 根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。根据省教育厅的统一安排部署，现将我市2018年春季教师资格认定工作通告如下。",
			adjunct:'唐诗鉴赏.jpg'
      }
    }
//	console.log($scope.id);
}]);

app.controller('evaluationCriterionCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//返回按钮返回路径
	$scope.prevPath= 'wrap.' + $location.$$search.prevPage + '({roleIndex : ' + $location.$$search.roleIndex + ',roleAllName:"' + $location.$$search.roleAllName + '",term:"' + $location.$$search.term + '",index:' + $location.$$search.index + '})';
	
	//静态数据
	$http.get("file/evaluationCriterion.json").success(function (data) {
		console.log(data.data)
		$scope.standard = data.data;
    });

}]);

//repeat 加载完之后
app.directive('repeatFinish',function($timeout){
    return {
        link: function(scope,element,attr){
//          console.log(scope.$index)
            if(scope.$last == true){
//              $timeout(function (){
                	console.log('ng-repeat执行完毕');
                	scope.$eval(attr.repeatFinish);
//					scope.$emit('ngRepeatFinished');
//              },50);
            }
        }
    }
});

	
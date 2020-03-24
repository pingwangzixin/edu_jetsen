app.controller('studentResourceDtealis', ['$rootScope','$scope', '$state', '$stateParams', '$timeout', '$http', '$location', '$interval', 'templateServer', function($rootScope,$scope, $state, $stateParams, $timeout, $http, $location, $interval, templateServer) {
    //导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '资源';
	
    $scope.variablePacket ={
     	   id:$stateParams.id,    //地址栏去参
     	   type:$stateParams.type
     };
     
      $scope.resourceData={
      	      "all":[
      	          {"id":1,"title":"一年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":2,"title":"二年级期末考试.mp4","name":"李四","time":"2018-03-28","size":"1049.03k","type":"1"},
      	          {"id":3,"title":"三年级期末考试.mp3","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	          {"id":4,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          {"id":5,"title":"五年级期末考试.ppt","name":"张三","time":"2018-02-28","size":"1049.03k","type":"5"}
   
      	       ],
      	       "word":[
      	          {"id":1,"title":"一年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":2,"title":"二年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},
      	          {"id":3,"title":"三年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"},    
      	          {"id":4,"title":"四年级期末考试.word","name":"张三","time":"2018-02-28","size":"1049.03k","type":"6"}
      	         
      	       ],
      	       "video":[
      	          {"id":1,"title":"三年级期末考试.mp4","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	          {"id":2,"title":"三年级期末考试.mp4","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"},
      	         
      	       ],
      	       "audio":[
      	            {"id":3,"title":"三年级期末考试.mp3","name":"王五","time":"2018-02-28","size":"1049.03k","type":"2"}
      	       ],
      	       "pic":[
      	          
      	          {"id":1,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          {"id":2,"title":"四年级期末考试.jpg","name":"赵六","time":"2018-04-28","size":"1049.03k","type":"3"},
      	          
      	         
      	       ],
      	       "ppt":[
      	          {"id":1,"title":"五年级期末考试.ppt","name":"张三","time":"2018-02-28","size":"1049.03k","type":"5"}
      	         
      	       ]
      };
     $scope.resource=$scope.resourceData[$scope.variablePacket.type][$scope.variablePacket.id];
     console.log($scope.resource)
}]);
app.filter('icon', function() {
    return function(objId) {
        var icon = "";
        switch(objId)
        {
            case '1':
                icon = "img/resources_mp4.png";
                break;
            case '2':
                icon = "img/resources_ear.png";
                break;
            case '3':
                icon = "img/resources_pic.png";
                break;
            case '4':
                icon = "img/resources_pdf.png";
                break;
            case '5':
                icon = "img/resources_ppt.png";
                break;
            case '6':
                icon = "img/resources_word.png";
                break;
            case '7':
                icon = "img/resources_excal.png";
                break;
        }
        return icon;
    };
  
});
	





app.controller('evaluateCriterionDetailsCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,$stateParams) {
	
	//变量包
    $scope.variablePacket = {
		
    };
	/*console.log($stateParams.id);
	console.log($stateParams.gradeName);
	console.log($stateParams.subjectName);
	console.log($stateParams.content);
	console.log($stateParams.term);*/
	$scope.id=$stateParams.id;
	$scope.gradeName=$stateParams.gradeName;
	$scope.subjectName=$stateParams.subjectName;
	$scope.content=$stateParams.content;
	$scope.term=$stateParams.term;
	$scope.allName=$stateParams.gradeName+$stateParams.subjectName+$stateParams.content;
	$scope.tableHtml="";
	findContentlist($stateParams.id);
	
	//获取所有表格的数据	
    function findContentlist(id){
		//获取年级
		$http.post(suzhiIp + '/EvaluationManagerContr/findContentlist.do', {
			id: id
		}).success(function(data) {
			//alert($stateParams.content);
			console.info(data);
			if(data.result != null && data.result != ""){
				var number = data.result.length;
				if($stateParams.content=="学业发展水平"){
					var m=0;
					for ( var i = 0; i < data.result.length; i++) {
						if(data.result[i].pjIndex.indexOf("知识技能|")>-1){
							m++;
						}
					}
					var html='<tr><th>评价内容</th><th width="30%" colspan="3">评价指标</th>'
							 +'<th width="50%">评价要点</th></tr>'
							 +'<tr>'
						     +'<td rowspan="'+number+'">'+data.result[0].pjContent+'</td>'
						     +'<td rowspan="'+number+'">'+data.result[0].pjCourseName+'学科</td>';
					if(data.result[0].pjCourseName=="音乐"){
						var html1 ='<td rowspan="'+m+'" colspan="2">知识技能</td>'
						+'<td>'+data.result[0].pjPoints+'</td>'
						+'</tr>';
					}else{
						var html1 ='<td rowspan="'+m+'">知识技能</td>'
						+'<td>'+data.result[0].pjIndex.substring(5,data.result[0].pjIndex.length)+'</td>'
						+'<td>'+data.result[0].pjPoints+'</td>'
						+'</tr>';
					}
					
					for ( var i = 1; i < data.result.length; i++) {
						if(data.result[i].pjIndex.indexOf("知识技能|")>-1){
							if(data.result[i].pjCourseName=="音乐"){
								html1+='<tr>'
										
										+'<td>'+data.result[i].pjPoints+'</td>'
										+'</tr>';
							}else{
								html1+='<tr>'
										+'<td>'+data.result[i].pjIndex.substring(5,data.result[0].pjIndex.length)+'</td>'
										+'<td>'+data.result[i].pjPoints+'</td>'
										+'</tr>';
							}
							
						}else{
							html1+='<tr>'
										+'<td colspan="2">'+data.result[i].pjIndex+'</td>'
										+'<td>'+data.result[i].pjPoints+'</td>'
										+'</tr>';
						}
						
					}
					$("#table").html(html+html1);
				}
				
				if($stateParams.content=="身心发展水平"){
					var number = data.result.length;
					var a =0;
					var b =0;
					var c =0;
					var one = data.result[0].pjIndex
					var oneqian =one.substring(0,one.indexOf("|"));
					for ( var i = 0; i < data.result.length; i++) {
						var pjIndex=data.result[i].pjIndex;
						//alert(pjIndex);
						//alert(pjIndex.substring(0,pjIndex.indexOf("|")));
						var qian=pjIndex.substring(0,pjIndex.indexOf("|"));
						//alert(pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length));
						var hou =pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length);
						if(pjIndex.indexOf("体育健康|")>-1){
							//alert(pjIndex);
							a++;
						}
						if(pjIndex.indexOf("心理|")>-1){
							//alert(pjIndex);
							b++;
						}
						if(pjIndex.indexOf("审美素养|")>-1){
							//alert(pjIndex);
							c++;
						}
					}
					var html='<tr><th>评价内容</th><th width="30%" colspan="2">评价指标</th>'
					+'<th width="50%">评价要点</th></tr>';
					
					html+='<tr>'
						+'<td rowspan="'+number+'">身心发展水平</td>'
						+'<td rowspan="'+a+'">'+oneqian+'</td>';
					for ( var i = 0; i < a ; i++) {
						var pjIndex=data.result[i].pjIndex;
						//alert(pjIndex);
						//alert(pjIndex.substring(0,pjIndex.indexOf("|")));
						var qian=pjIndex.substring(0,pjIndex.indexOf("|"));
						//alert(pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length));
						var hou =pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length);

						html+='<td>'+hou+'</td>'
						+'<td>'+data.result[i].pjPoints+'</td>'
						+'</tr>';
						
					}
					
					var xinli = data.result[a+1].pjIndex;
					var xinliqian=xinli.substring(0,xinli.indexOf("|"));
					var html1='<tr>'
						+'<td rowspan="'+b+'">'+xinliqian+'</td>';
					
					for ( var i = a; i < a+b ; i++) {
						
						var pjIndex=data.result[i].pjIndex;
						//alert(pjIndex);
						//alert(pjIndex.substring(0,pjIndex.indexOf("|")));
						var qian=pjIndex.substring(0,pjIndex.indexOf("|"));
						//alert(pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length));
						var hou =pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length);
						
						html1+='<td>'+hou+'</td>'
						+'<td>'+data.result[i].pjPoints+'</td>'
						+'</tr>';
					}
					var suzhi = data.result[a+b+1].pjIndex;
					var suzhiqian=suzhi.substring(0,suzhi.indexOf("|"));
					html1+='<tr>'
						+'<td rowspan="'+c+'">'+suzhiqian+'</td>';
					
					for ( var i = a+b; i <data.result.length; i++) {
						
						var pjIndex=data.result[i].pjIndex;
						//alert(pjIndex);
						//alert(pjIndex.substring(0,pjIndex.indexOf("|")));
						var qian=pjIndex.substring(0,pjIndex.indexOf("|"));
						//alert(pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length));
						var hou =pjIndex.substring(pjIndex.indexOf("|")+1,pjIndex.length);
						html1+='<td>'+hou+'</td>'
						+'<td>'+data.result[i].pjPoints+'</td>'
						+'</tr>';
					}
					$("#table").html(html+html1);
				}
				if($stateParams.content=="品德发展水平"||$stateParams.content=="兴趣特长养成"){
					var html ='<tr><th>评价内容</th><th width="30%">评价指标</th><th width="50%">评价要点</th></tr>'
					         +'<tr>'
						     +'<td rowspan="'+number+'">'+$stateParams.content+'</td>';
					for ( var i = 0; i < data.result.length; i++) {
						
						
						 html+='<td>'+data.result[i].pjIndex+'</td>'
							      +'<td>'+data.result[i].pjPoints+'</td>'
								  +'</tr>';
					}

					$("#table").html(html);
				}
			}
		});
	}
    
    
}]);

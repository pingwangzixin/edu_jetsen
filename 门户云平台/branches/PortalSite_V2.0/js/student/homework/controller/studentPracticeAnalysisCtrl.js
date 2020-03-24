app.controller('studentPracticeAnalysisCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer','scrollbar','$sce','$compile',function($scope,$state,$timeout,$http,$location,$interval,templateServer,scrollbar,$sce,$compile) {
	
	var stuExamInfo = JSON.parse(sessionStorage.getItem("stuExamInfo"))
	var examId = stuExamInfo.examId;
	var stuId = stuExamInfo.stuId;
	var classId = stuExamInfo.classId;
	
	//变量包
	$scope.variablePacket = {
		checkJump : 'secondNav.studentHomeworkDel.exerciseContent({state : "' + $location.$$search.state + '",type : "'+ $location.$$search.type + '"})',		//表格小题查看地址设置
		correctRateTable : [],
//		[
//			{titNum:'一、',littleTitNum:'1',type:'单选',rightAnswer:'A',yourAnswer:'C',yourAnswerIcon:'wrong',correctRate:'32%',lessHalf:true},
//			{titNum:'一、',littleTitNum:'2',type:'单选',rightAnswer:'A',yourAnswer:'A',yourAnswerIcon:'right',correctRate:'80%',lessHalf:false},
//			{titNum:'二、',littleTitNum:'1',type:'多选',rightAnswer:'A C D',yourAnswer:'C',yourAnswerIcon:'half',correctRate:'66%',lessHalf:false},
//		],	//正确率表格数据初始值
		questionCount:0,
		correctCount:0
	};
	
	$scope.findExamCount = function(){
		var url = lessonIp+"stuExam/examCount?examId="+examId+"&classId="+classId+"&stuId="+stuId;
		$http.get(url).success(function(result) {
			var correctRateTable = [];
			if(result.ret==200){
				var data = result.data;
				var obj = {};
				$scope.variablePacket.questionCount = data.length;
				var errorCount = 0;
				for(var i=0,len=data.length; i<len; i++){
					obj.titNum=checkTypeNum(data[i].typeSort);
					obj.littleTitNum=data[i].sort;
					obj.type=data[i].typeName;
					obj.rightAnswer=checkAnswer(data[i].answer, data[i].type);
					obj.yourAnswer=checkAnswer(data[i].myAnswer, data[i].type);
					obj.yourAnswerIcon=checkScore(data[i].score, data[i].type);
					for(var j=0,leng=obj.yourAnswerIcon.length; j<leng; j++){
						if(obj.yourAnswerIcon[j]=="error"||obj.yourAnswerIcon[j]=="half"){
							errorCount++;
							break;
						}
					}
					
					obj.correctRate=data[i].correctRate;
					correctRateTable.push(obj);
					obj = {};
//					obj.lessHalf:true;
				}
				$scope.variablePacket.correctCount = $scope.variablePacket.questionCount-errorCount;
			}
			console.log(correctRateTable);
			$scope.variablePacket.correctRateTable = correctRateTable;
		})
	}
	
	$scope.findExamCount();
	
	function checkTypeNum(sort){
		 switch (sort) {
            case 1:
                return "一、";
            case 2:
                return "二、";
            case 3:
                return "三、";
            case 4:
                return "四、";
            case 5:
                return "五、";
            case 6:
                return "六、";
            case 7:
                return "七、";
            case 8:
                return "八、";
        }
	}
	
	function checkAnswer(answer, type){
		switch (type) {
            case "2":
            case "4":
            case "8":
            case "6":
            	return answer;
           		break;
       		case "1":
       			if(answer=="T"){
       				return "正确"
       			}else if(answer=="F"){
       				return "错误";
       			}else if(answer!=null&&answer!=undefined){
       				return answer;
       			}
       			break;
   			case "3":
   				var split = answer.split("|");
       			var maArray = [];
       			var maObj = {};
       			var result = "";
       			for(var i=0; i<split.length; i++){
       				result+="("+(i+1)+") "+split[i];
//     				if(i+1!=split.length){
//     					result+="<br>";
//     				}
       			}
            	return result;
           		break;
           	case "7":
           	case "5":
            	var split = answer.split(",");
       			var result = "";
       			for(var i=0; i<split.length; i++){
       				result+="("+(i+1)+") "+split[i];
//     				if(i+1!=split.length){
//     					result+="<br>";
//     				}
       			}
            	return result;
           		break;
            default:
            	break;
        }
	}
	
	function checkScore(icon, type){
		switch (type) {
            case "2":
            case "4":
            case "1":
            case "8":
            case "6":
            	var iconArray = [];
            	iconArray.push(icon);
            	return iconArray;
       			break;
       		case "3":
           	case "7":
           	case "5":
            	return icon;
           		break;
            default:
            	break;
        }
	}
}]);
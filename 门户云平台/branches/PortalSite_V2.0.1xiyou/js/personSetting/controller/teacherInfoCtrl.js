app.controller('teacherInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//导航切换
	$scope.personalInfoState = 0;
//	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	
	//变量包
	$scope.aggregate = {
		join : 0,
		addTeach:1,
		addGrade:false,
		addTable:false,
	}
	
	
	$scope.switchContent = function(i){
		$scope.aggregate.join = i;
	}
	
	
	$scope.removeData = function(tar){
		angular.element(tar.target).parent().remove();
	}
	
	
	$scope.addGradeClick = function(){
		$scope.aggregate.addGrade = true;
	}
	
	
	$scope.addTableClick = function(){
		$scope.aggregate.addTable = true;
	}
	
	$scope.clearClick = function(){
		$scope.aggregate.addGrade = false;
		$scope.aggregate.addTable = false;
		$scope.aggregate.gradeTxt = '年级',
		$scope.aggregate.classTxt = '班级',
		$scope.sckey = '请选择年级/班级'
	}
	
	
	//授课的数据
	$scope.teachData=[{
		"id":"1",
		"grade":"初一",
		"class":"50班",
		"subject":"数学",
		"edition":"新课标人教2017版",
		"operation":"删除"
	},{
		"id":"2",
		"grade":"初二",
		"class":"51班",
		"subject":"数学",
		"edition":"新课标人教2017版",
		"operation":"删除"
	},{
		"id":"3",
		"grade":"初三",
		"class":"52班",
		"subject":"数学",
		"edition":"新课标人教2017版",
		"operation":"删除"
	}]
	
}]);

app.directive('zyxSelect',function($timeout,$filter,$http){
	return {
		restrict: 'EA',
		template:'<div class="fl zyx_select"><div class="select"><input maxlength="30" type="text" ng-model="sckey" ng-focus="mapFocus($event)" class="searchGrade" placeholder="请选择年级/班级" ng-keyup="keyinput()"><i class="iconfont icon-sanjiao" ng-click="showselect()"></i></div><div class="choice_grade clearfix" ng-if="datamap.selectarea"><div class="grade fl"><span class="allarea" ng-click="showaddressul()">{{datamap.gradeTxt}}<i class="iconfont icon-sanjiao"></i></span><div class="addresswrap" id="addresswrap"><ul id="addressul"><li ulwrap-finish ng-repeat="listOne in selectdata" ng-bind="listOne.grade" ng-click="gradeClick($event,listOne.gradeId)" ng-class="{active:datamap.activeStateGrade==listOne.gradeId}"></li></ul></div></div><div class="class fr"><span class="allarea" ng-click="showaddressul()">{{datamap.classTxt}}<i class="iconfont icon-sanjiao"></i></span><div id="searchwrap"><div id="searchclass"><em search-finish ng-repeat="listOne in selectdata" ng-bind="listOne.class" ng-click="classClick($event,listOne.classId)" ng-class="{active:datamap.activeStateClass==listOne.classId}"></em></div></div></div></div></div>',
		replace:true,
		scope:{
			
		},
		link: function(scope, element, attrs) {
			scope.datamap = {
				gradeTxt:'年级',
				classTxt:'班级',
				selectarea:false,
				activeStateGrade:0,
				activeStateClass:0
			}
			scope.selectdata = [{
				'gradeId' : 1,
				'classId' : 1,
				'grade':'一年级',
				'class':'（1）班'
			},{
				'gradeId' : 2,
				'classId' : 2,
				'grade':'二年级',
				'class':'（2）班'
			},{
				'gradeId' : 3,
				'classId' : 3,
				'grade':'三年级',
				'class':'（3）班'
			},{
				'gradeId' : 4,
				'classId' : 4,
				'grade':'四年级',
				'class':'（4）班'
				
			},{
				'gradeId' : 5,
				'classId' : 5,
				'grade':'五年级',
				'class':'（5）班'
			},{
				'gradeId' : 6,
				'classId' : 6,
				'grade':'六年级',
				'class':'（6）班'
			},{
				'gradeId' : 7,
				'classId' : 7,
				'grade':'初一',
				'class':'（7）班'
			},{
				'gradeId' : 8,
				'classId' : 8,
				'grade':'初二',
				'class':'（8）班'
			},{
				'gradeId' : 9,
				'classId' : 9,
				'grade':'初三',
				'class':'（9）班'
			},{
				'gradeId' : 10,
				'classId' : 10,
				'grade':'高一',
				'class':'（10）班'
			},{
				'gradeId' : 11,
				'classId' : 11,
				'grade':'高二',
				'class':'（11）班'
			},{
				'gradeId' : 12,
				'classId' : 12,
				'grade':'高三',
				'class':'（12）班'
			}]
			
			scope.gradeClick = function(tar,id){
				scope.datamap.gradeTxt = angular.element(tar.target).html();
				scope.datamap.activeStateGrade = id;
			}
			
			scope.classClick = function(tar,id){
				scope.datamap.classTxt = angular.element(tar.target).html();
				scope.sckey = angular.element(tar.target).html();
				scope.datamap.selectarea = false;
				scope.datamap.activeStateClass = id;
			}
			
			scope.mapFocus = function(event){
				scope.datamap.selectarea = true;
			}
			
			scope.keyinput = function(){
				
			}
			
			document.body.addEventListener('click',function(e){
		    	scope.datamap.selectarea = false;
		    	scope.$apply();
		    });
		    document.querySelector(".zyx_select").addEventListener('click',function(e){
		    	e.stopPropagation();
		    },false)
			
		}
	}
	
})

app.directive('ulwrapFinish',function(scrollbar){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
            	if(element.parent().parent()[0].offsetHeight < element.parent()[0].offsetHeight){
                	scrollbar.scroollAction('addresswrap', 'addressul', 'scrollDiv');
                }
            }
        }
    }
})
app.directive('searchFinish',function(scrollbar){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
            	if(element.parent().parent()[0].offsetHeight < element.parent()[0].offsetHeight){
            		scrollbar.scroollAction('searchwrap', 'searchclass', 'scrollDiv');
            	}
            }
        }
    }
})
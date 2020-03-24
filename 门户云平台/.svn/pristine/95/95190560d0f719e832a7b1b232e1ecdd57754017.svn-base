app.service('myQuzService',['$http','$timeout',function($http,$timeout) {
	
	// 1.查询全部试题
    this.findQuzAll = function(params,succ,error) {
    	$http.get(questionUrl+"/a/quz/quzAll",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }	
	// 2.查询我的上传试题
	this.findQuz = function(params,succ,error) {
		$http.get(questionUrl+"/a/quz/getQuzFile",{params:params})
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	// 3.查询我的分享试题 1  查询我的收藏试题0
	this.findShareAndFavoutite = function(params,succ,error) {
		$http.get(questionUrl+"/a/quzFavoutite",{params:params})
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	// 5.查询试题类型
	this.findQuzType = function(succ,error) {
		$http.get(questionUrl+"a/quzType?token="+token)
		.success(function(res){
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	// 6.修改
    this.update = function(params,succ,error) {
    	$http.put(questionUrl+"/a/quz",JSON.stringify(params),{headers: {'Content-Type': 'application/json'}})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
	// 7.删除
	this.deleteQuz = function(params,succ,error) {
    	$http.delete(questionUrl+"/a/quz?ids="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	// 8.通过id查询试题详情
	this.getQuzByid = function(params,succ,error){
		$http.get(questionUrl+"/a/quz/"+params)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	// 9.收藏
	this.addQuzFav = function(params,succ,error){
		$http.post(questionUrl+"/a/quzFavoutite",params)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	// 10.删除收藏
	this.deleteQuzFav = function(params,succ,error) {
    	$http.delete(questionUrl+"/a/quzFavoutite?ids="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	
	
	
	//  试卷
	// 1.试卷 查询
	this.getExamList = function(params,succ,error){
		$http.get(questionUrl+"/exam",{params:params})
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	
	// 2.删除试卷
    this.deleteExam = function(params,succ,error){
		$http.delete(questionUrl+"/exam/"+params)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	
	// 3.添加试卷
    this.insertModel = function(params,succ,error){
		$http.post(questionUrl+"/exam/insertModel",params)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
    
    // 5.修改试卷
    this.updateExam = function(params,succ,error) {
    	$http.put(questionUrl+"/exam",params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 通过试卷id 查询当前试卷的试题  （组卷）
    this.findExamQuestion = function(params,succ,error) {
    	$http.get(questionUrl+"/exam/question",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }	
		
    /**
     * 根据试卷Id查询试卷
     */
    this.getExamById = function(id,succ,error) {
    	$http.get(questionUrl+"/exam/"+id)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    /**
     * 添加试卷
     */
    this.insertExam = function(params,succ,error) {
    	$http.post(questionUrl+"/exam",params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
}])



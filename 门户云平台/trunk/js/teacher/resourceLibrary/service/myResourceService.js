app.service('myResourceService',['$http','$timeout',function($http,$timeout) {
	
	// 1.获取 全部资源 集合
    this.getResourcesAll = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource/getResourcesAll",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    // 2. 获取我的上传资源
    this.getResources = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 3. 获取收藏资源
    this.getFavorites = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource/favorites",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    
    
    // 4. 获取共享资源
    this.getShare = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource/share",{params:params})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 5. 获取当前资源
    this.findResById = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource/"+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 获取资源类型列表
    this.getResType = function(params,succ,error) {
    	$http.get(resourcesIp+"/a/resource/resType?pid="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
        // 删除资源类型列表
    this.deleteResource = function(params,succ,error) {
    	$http.delete(resourcesIp+"/a/resource?rids="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
        // 删除收藏列表
    this.deleteFavorites = function(params,succ,error) {
    	$http.delete(resourcesIp+"/a/resource/favorites?ids="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
        // 删除分享列表
    this.deleteShare = function(params,succ,error) {
    	$http.delete(resourcesIp+"/a/resource/share?ids="+params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    
            // 根据条件修改资源
    this.update = function(params,succ,error) {
    	$http.put(resourcesIp+"/a/resource",JSON.stringify(params),{headers: {'Content-Type': 'application/json'}})
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 我的一键备课	
    this.addSync = function(params,succ,error) {
    	$http.post(resourcesIp+"/a/resource/sync",params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 收藏一键备课	
    this.addfavSync = function(params,succ,error) {
    	$http.post(resourcesIp+"/a/resource/favorites/sync",params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
    // 分享一键备课	
    this.addShareSync = function(params,succ,error) {
    	$http.post(resourcesIp+"/a/resource/share/sync",params)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
    }
    
}])
import Axios from 'axios';
const $http = Axios;

const configure = {
	testPaper : 'http://39.105.18.180:9042/',
};


export let wordRelevant = {
	//导出excel的路径
	dowmUrl:configure.testPaper,
	//登录
	login : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'user',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
    //  1.查询区域   get  http://192.168.9.184:8000/area     
    getCityList : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'area',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},


    // 	 2.查询学校列表     http://192.168.9.184:8000/school    GET  pageNo 当前页   pageSize示条数  provinceCode		省code  municipalityCode	市code
	// areaCode			区县code

    getSchoolList : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'school',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	// 3.添加学校   POST		http://192.168.9.184:8000/school
	addSchoolList : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'school',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},

// 4.修改学校   PUT			http://192.168.9.184:8000/school    id	
	updateSchoolList : (data) => {
		return $http({
			method : 'put',
			url : configure.testPaper + 'school',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},

// 5.删除学校     DELETE		http://192.168.9.184:8000/school/{id}     必传参数：id	 学校id
	delSchoolList : (data) => {
		return $http({
			method : 'delete',
			url : configure.testPaper + 'school/'+data,
			headers:{"content-type":"application/json"}
		});
	},
   
// 6.Excel文件上传     POST		http://192.168.9.184:8000/excel/upload      必传参数：file				excel文件
	uploadExcel : (data,callback) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'excel/upload',
			data : data,
			headers:{'Content-Type':'multipart/form-data'},
			onUploadProgress:callback
		});
	},
	// 7.Excel导入数据解析      POST		http://192.168.9.184:8000/excel      必传参数：path				上传成功返回的文件路径
	
	analysisExcel : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'excel',
			params : data,
			headers:{"content-type":"application/json"},
		});
	},

	// 8.查询学校详情      GET			http://192.168.9.184:8000/school/{id}     必传参数：id					学校id

	getSchoolData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'school/' +data,
			headers:{"content-type":"application/json"}
		});
	},

	// 9.Excel导出模板  GET		http://192.168.9.184:8000/excel   可选参数;id

	downSchoolData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'excel',
			params:data,
			headers:{"content-type":"application/json"}
		});
	},




}



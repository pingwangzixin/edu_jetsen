
import Axios from 'axios';
const $http = Axios;
export const configure = {
	studentRecord : 'http://111.207.13.88:9117/',
	user : 'http://111.207.13.88:8881/jeuc/'
};



export let record = {
	//学生档案详情汇总（多个接口）
	stuRecordAll : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'StuRecordDetail/listAll',
//			data : data
			params : data
		})
	},
	//学生列表
	stuList : (data) => {
		return $http({
			method : 'get',
			url : configure.user + 'api/uc/ucUser',
//			data : data
			params : data
		})
	},
	//根据学校id查询学校的年级
	gradeList : (data) => {
		return $http({
			method : 'get',
			url : configure.user + 'api/ea/eaClass/findClassAndGradeByOfficeId',
//			data : data
			params : data
		})
	},
	//根据年级id查询所有班级列表
	classlist : (data) => {
		return $http({
			method : 'get',
			url : configure.user + 'api/ea/eaClass/findClassInfoByGid',
//			data : data
			params : data
		})
	},
	//当前学年
	schoolYear:()=>{
		return $http({
			method : 'get',
			url : configure.user + 'api/ea/office/getStuYearList',
		})
	},
	//个人信息
	teacherInfor:(data)=>{
		return $http({
			method : 'get',
			url : configure.user + '/api/uc/user/'+data,
			// 校领导
			// url : configure.user + '/api/uc/user/a75e66cbd2a744feaa5068c11a77e787',
			//年级组长
			// url : configure.user + '/api/uc/user/4ba96df0ec504a928d86834551c22eca',
			//任课老师
			// url : configure.user + '/api/uc/user/f96e86d2d4854fbfafa2b6001e39a19a',
			// 学生
			// url : configure.user + '/api/uc/user/fd68e387171d4f17a60808d4bb53fd56',
			// 家长
			// url : configure.user + '/api/uc/user/8de9cd5ab5254b2da9fb64fc97b17661',
		})
	},
	//根据老师id查老师所带班级
	classGrade:(data)=>{
		return $http({
			method : 'get',
			// url : configure.user + 'api/uc/ucUser/1075824727/1',
			url : configure.user + 'api/uc/ucUser/'+data+'/1',
			// url : configure.user + 'api/uc/ucUser/6c7c0a4fb8c34cf88df49d56afe9668d/1',
		})
	},
	//基本信息导入
	StuBaseInforDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'stuBaseInfor/uploadStuBaseInfor',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//单个图片上传
	StuBaseInforImgDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'stuBaseInfor/upLoadUserImageOnlyOne',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//图片zip导入
	StuBaseInforTupianDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'stuBaseInfor/upLoadUserImage',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//学业成绩导入
	stuScholasticAttainmentDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'stuScholasticAttainment/uploadStuScholasticAttainment',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},

	//综合评价导入
	EvalStuScoreDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'EvalStuScore/import',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//体检数据导入
	StuBaseDataDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'StuBaseData/import',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//体质健康导入
	HealthStuscoreDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'HealthStuscore/import',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	//操行记录导入
	stuRecordDetailDr:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord+'StuRecordDetail/import',
			data:data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},

		})
	},
	
	//查询已导入人数（娟姐的4个）
	importedNumber:(data)=>{
		return $http({
			method : 'get',
			url : configure.studentRecord + 'StuRecordDetail/listAllCount',
			params : data
		})
	},
	//查询已导入人数（陶生的3个）
	findImportNum:(data)=>{
		return $http({
			method : 'get',
			url : configure.studentRecord + 'stuBaseInfor/findImportNum',
			params : data
		})
	},
	//综合评价详情
	evalStuScorelist : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'EvalStuScore/list',
			params : data
		})
	},
	//综合评价修改
	evalStuScoreUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'EvalStuScore/updateList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//综合评价插入
	evalStuScoreIn:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'EvalStuScore/insertList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//体检数据详情
	stuBaseDatalist : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'StuBaseData/list',
			params : data
		})
	},
	//体检数据修改
	stuBaseDataUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'StuBaseData/updateList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//体检数据插入
	stuBaseDataIn:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'StuBaseData/insertList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//体质健康详情
	healthStuscorelist : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'HealthStuscore/list',
			params : data
		})
	},
	//体质健康修改
	healthStuscoreUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'HealthStuscore/updateList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//体质健康插入
	healthStuscoreIn:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'HealthStuscore/insertList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//操行记录详情
	stuRecordDetaillist : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'StuRecordDetail/list',
			params : data
		})
	},
	//操行记录修改
	stuRecordDetailUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'StuRecordDetail/updateList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//操行记录插入
	stuRecordDetailIn:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'StuRecordDetail/insertList',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//基本信息详情
	stuBaseInforlist:(data)=>{
		return $http({
			method : 'get',
			url : configure.studentRecord + 'stuBaseInfor/findStuBaseInfor',
			params : data
		})
	},
	//基本信息修改
	stuBaseInforUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'stuBaseInfor/updateStuBaseInfor',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	// 学业成绩详情
	studyScoreDatalist:(data)=>{
		return $http({
			method : 'get',
			url : configure.studentRecord + 'stuScholasticAttainment/findStuScholasticAttainment',
			params : data
		})
	},
	//学业成绩修改
	studyScoreDataUp:(data)=>{
		return $http({
			method : 'post',
			url : configure.studentRecord + 'stuScholasticAttainment/updateStuScholasticAttainment',
			data :JSON.stringify(data),
			headers:{
				"content-type":"application/json "
		    }
		})
	},
	//生成报告
	generaterReport : (data) => {
		return $http({
			method : 'post',
			url : configure.studentRecord + 'StuRecordDetail/genClassPdf',
			data :data,
			headers:{
				"content-type":"application/x-www-form-urlencoded"
		  }
		})
	},
	// 查看有无生成的报告
	downloadPDF : (data) => {
		return $http({
			method : 'get',
			url : configure.studentRecord + 'StuRecordDetail/existsPdf',
			params:data
			
		})
	},
}




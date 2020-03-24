<template>
    <div class="zy_archives">
        <div class="title_box clearfix">
            <span class="name fl"><b v-text="stuInfo.stuName"></b>的成长档案</span>
            {{stuInfo.currentGradeName}}
            <!--<span class="btn fr" @click="timingBoxFn()">学籍卡</span>-->
           <router-link :to="{path:'/registrationForm', query: {stuName:stuInfo.stuName,stuNo:stuInfo.stuNo,cureentGrade:stuInfo.currentGrade,gradeName:stuInfo.currentGradeName,classId:stuInfo.currentClassId}}"><span class="btn fr">学籍卡</span></router-link>
        </div>
        <div class="cont clearfix">
            <div class="left_nav fl">
                <p>全部</p>
                <ul>																									
                    <li v-for="(i , index) in leftTree.grade" :class="{active : leftTree.currentIndex == index}" @click="tabGrade(index)" :key="index" v-text="i.name + '年级'"></li>
                </ul>
            </div>
            <div class="right_main fr">
                <div class="pieces personality">
                    <div class="tit clearfix">
                        <b class="fl">个性发展记录</b>
                        <!--<span class="fr"><router-link :to="{ path: '/index/personalityRecord', params: { name: 'name', dataObj: data }, query: { name: 'name', dataObj: data } }">查看全部</router-link></span>-->
                        <!--<span class="fr"><router-link :to="'/index/personalityRecord'">查看全部</router-link></span>-->
                    </div>
                    <ul class="personality_list clearfix">
                        <li class="fl" v-for="(i , index) in mainCont.personality" :key="index">
                            <p class="time">{{i.time}}</p>
                            <div class="details clearfix">
                                <!--<img src="../../assets/img/eg.jpg" alt="" srcset="" class="fl">--> 
                                <img :src="i.img" alt="" srcset="" class="fl"> 
                                <p class="fl">
                                    <b>{{i.name}}</b>
                                    <span>{{i.remarks}}</span>
                                    <strong>{{'共' + i.num + '张'}}</strong>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pieces_two clearfix">
                    <div class="pieces fl achievement">
                        <div class="tit clearfix">
                            <b class="fl">学业成绩记录</b>
                            <!--<span class="fr">查看全部</span>-->
                        </div>
                        <div class="achievement_list">
                            <table>
                            	<tr>
                            		<th></th>
                            		<th width="38px">道德与法治</th>
                            		<th>语文</th>
                            		<th>数学</th>
                            		<th>外语</th>
                            		<th>物理</th>
                            		<th>化学</th>
                            		<th>生物</th>
                            		<th>历史</th>
                            		<th>地理</th>
                            		<th width="38px">体育与健康</th>
                            		<th>音乐</th>
                            		<th>美术</th>
                            		<th width="38px">信息技术</th>
                            		<th width="38px">劳动与技术</th>
                            		<th width="38px">研究性学习</th>
                            	</tr>
                            	<!--{{mainCont.achievement.lastSemester == ''}}-->
                            	<!--{{mainCont.achievement.lastSemester == null}}-->
                            	<!--{{mainCont.achievement.lastSemester == undefined}}-->
                            	<tr >
                            		<!--
                            			
                            			_this.mainCont.achievement.lastSemester = ele;
										_this.mainCont.achievement.nextSemester = ele;
										_this.mainCont.achievement.schoolYear = ele;
		                            		-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen}}-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen.stuCourse}}-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen.stuScore}}-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen.stuScore}}-->
		                            		<!--{{mainCont.achievement.lastSemester[yuwen]}}-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen.stuCourse}}-->
		                            		<!--{{mainCont.achievement.lastSemester.yuwen.stuScore}}-->
                            		<td>第一学期</td>
                            		<!--{{mainCont.achievement.lastSemester.daodeyufazhi == null}}-->
                            		<td v-text="mainCont.achievement.lastSemester.daodeyufazhi.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.yuwen.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.shuxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.waiyu.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.wuli.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.huaxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.shengwu.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.lishi.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.dili.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.tiyuyujiankang.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.yinle.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.meishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.xinxijishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.laodongyujishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.lastSemester.yanjiuxingxuexi.stuScore"></td>
                            	</tr>
                            	<tr>
                            		<td>第二学期</td>
                            		<td v-text="mainCont.achievement.nextSemester.daodeyufazhi.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.yuwen.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.shuxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.waiyu.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.wuli.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.huaxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.shengwu.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.lishi.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.dili.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.tiyuyujiankang.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.yinle.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.meishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.xinxijishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.laodongyujishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.nextSemester.yanjiuxingxuexi.stuScore"></td>
                            	</tr>
                            	<tr>
                            		<td>学年总评</td>
                            		<td v-text="mainCont.achievement.schoolYear.daodeyufazhi.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.yuwen.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.shuxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.waiyu.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.wuli.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.huaxue.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.shengwu.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.lishi.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.dili.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.tiyuyujiankang.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.yinle.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.meishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.xinxijishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.laodongyujishu.stuScore"></td>
                            		<td v-text="mainCont.achievement.schoolYear.yanjiuxingxuexi.stuScore"></td>
                            	</tr>
                                <!--<tr>
                                    <th rowspan="2" width="22%">入学考试</th>
                                    <th colspan="2" width="28%">第一学期</th>
                                    <th colspan="2" width="28%">第二学期</th>
                                    <th rowspan="2" width="22%">毕业考试</th>
                                 
                                </tr>   
                                <tr>   
                                    <th>期中考试</th>
                                    <th>期末考试</th>
                                    <th>期中考试</th>
                                    <th>期末考试</th>
                                </tr>
                                <tr>
                                	<td>{{mainCont.achievement.entrance}}</td>
                                    <td>{{mainCont.achievement.firstTerm.middle}}</td>
                                    <td>{{mainCont.achievement.firstTerm.end}}</td>
                                     <td>{{mainCont.achievement.secondTerm.middle}}</td>
                                    <td>{{mainCont.achievement.secondTerm.end}}</td>
                                    <td>{{mainCont.achievement.graduation}}</td>
                                </tr>-->
                            </table>
                        </div>
                    </div>
                    <div class="pieces fr leave">
                        <div class="tit clearfix">
                            <b class="fl">请假记录</b>
                        </div>
                        <div class="leave_list clearfix">
                            <p class="fl" v-for="(i , index) in mainCont.leave" :key="index">
                                <span v-text="i.term"></span>
                                <b :class="{active : (i.bingjia-0)+(i.shijia-0) > 0}" v-text="(i.bingjia-0)+(i.shijia-0)"></b>
                                <em>请假次数</em>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="pieces_two clearfix">
                    <div class="pieces fl healthy">
                        <div class="tit clearfix">
                            <b class="fl">体质健康记录</b>
                            <!--<span class="fr">查看全部</span>-->
                        </div>
                         <div class="healthy_list">
                            <ul class="clearfix">
                                <li>
                                    <i class="iconfont iconxingbie2"></i>
                                    <b>姓名</b>
                                    <span>{{mainCont.healthy.stuName}}</span>
                                </li>
                                <li>
                                    <i class="iconfont iconxingbie2"></i>
                                    <b>性别</b>
                                    <span>{{mainCont.healthy.sex}}</span>
                                </li>
                                <li>
                                    <i class="iconfont iconshengao1"></i>
                                    <b>身高</b>
                                    <span>{{mainCont.healthy.stuHeight}}（厘米）</span>
                                </li>
                                <li>
                                    <i class="iconfont icontizhong1"></i>
                                    <b>体重</b>
                                    <span>{{mainCont.healthy.stuWeight}}（千克）</span>
                                </li>
                                <li>
                                    <i class="iconfont icontizhongzhishu2"></i>
                                    <b>体重指数(BMI)</b>
                                    <span v-text="mainCont.healthy.stuBmi">
                                    	<em>提示</em>
                                    	<!-- <em v-if="mainCont.healthy.stuBmi != ''" v-text="'（' + mainCont.healthy.bmiRelevant + '）'"></em> -->
                                    </span>
                                </li>
                            </ul>
                            <table>
                                <tr>
                                    <th rowspan="8">基本项目</th>
                                    <th>项目</th>
                                    <th>成绩</th>
                                    <th>得分</th>
                                    <th>等级</th>
                                </tr>
                                <tr>
                                    <td>体重指数（BMI）（kg/m2)</td>
                                    <td v-text="mainCont.healthy.stuBmi"></td>
                                    <td v-text="mainCont.healthy.stubmiScore"></td>
                                    <td v-text="mainCont.healthy.stubmiLevel"></td>
                                </tr>
                                <tr>
                                    <td>肺活量(毫升)</td>
                                    <td v-text="mainCont.healthy.stufeihuoliang"></td>
                                    <td v-text="mainCont.healthy.stufeihuoliangScore"></td>
                                    <td v-text="mainCont.healthy.stufeihuoliangLevel"></td>
                                </tr>
                                <tr>
                                    <td>50米跑(秒)</td>
                                    <td v-text="mainCont.healthy.sturun"></td>
                                    <td v-text="mainCont.healthy.sturunScore"></td>
                                    <td v-text="mainCont.healthy.sturunLevel"></td>
                                </tr>
                                <tr>
                                    <td>坐位体前屈(厘米)</td>
                                    <td v-text="mainCont.healthy.stuzwqtq"></td>
                                    <td v-text="mainCont.healthy.stuzwqtqScore"></td>
                                    <td v-text="mainCont.healthy.stuzwqtqLevel"></td>
                                </tr>
                                <tr>
                                    <td>立定跳远(厘米)</td>
                                    <td v-text="mainCont.healthy.stujump"></td>
                                    <td v-text="mainCont.healthy.stujumpScore"></td>
                                    <td v-text="mainCont.healthy.stujumpLevel"></td>
                                </tr>
                                <tr>
                                    <td>一分钟仰卧起坐（次）</td>
                                    <td v-text="mainCont.healthy.stusitup"></td>
                                    <td v-text="mainCont.healthy.stusitupScore"></td>
                                    <td v-text="mainCont.healthy.stusitupLevel"></td>
                                </tr>
                                <tr>
                                    <td>800米跑（min.s）</td>
                                    <td v-text="mainCont.healthy.stulongrun"></td>
                                    <td v-text="mainCont.healthy.stulongrunScore"></td>
                                    <td v-text="mainCont.healthy.stulongrunLevel"></td>
                                </tr>
                               <!-- <tr>
                                    <td>引体向上(次)</td>
                                    <td v-text="mainCont.healthy.stusitup"></td>
                                    <td v-text="mainCont.healthy.stusitupScore"></td>
                                    <td v-text="mainCont.healthy.stusitupLevel"></td>
                                </tr>
                                <tr>
                                    <td>1000米跑</td>
                                    <td v-text="mainCont.healthy.stulongrun"></td>
                                    <td v-text="mainCont.healthy.stulongrunScore"></td>
                                    <td v-text="mainCont.healthy.stulongrunLevel"></td>
                                </tr>-->
                                <tr>
                                    <td>学年得分</td>
                                    <td></td>
                                    <td></td>
                                    <td v-text="mainCont.healthy.stutotalScore"></td>
                                    <td v-text="mainCont.healthy.stutotalLevel"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="pieces fr activity">
                        <div class="tit clearfix">
                            <b class="fl">实践活动记录</b>
                        </div>
                        <div class="activity_list">
                        	<div class="top clearfix">
                        		<p class="fl">
	                                <b>{{mainCont.activity.summary.total}}</b>
	                                <em>活动总数</em>
	                            </p>
	                            <p class="fl">
	                                <b>{{mainCont.activity.summary.completed}}</b>
	                                <em>已完成</em>
	                            </p>
                        	</div>
	                        <div class="bottom">
	                        	<ul>
	                        		<li class="clearfix" v-for="(i , index) in mainCont.activity.list" :key="index">
	                        			<p class="fl">
	                        				<span>{{i.name}}</span>
	                        				<em>{{i.time}}</em>
	                        			</p>
	                        			<b class="fr">{{i.mark}}</b>
	                        		</li>
	                        	</ul>
	                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
       <!-- <div @click="load()">loading</div>
        <div @click="time()">定时</div>
        <div @click="confirm()">确认</div>-->
   		
    </div>
</template>

<script>
//import prompt from '@/components/publicAssembly/prompt.vue'
import {record} from '@/api/index.js'

export default {
    name : 'growthRecord',
    data(){
        return{
        	//个人信息
        	stuInfo : {
        		stuName : this.$route.query.stuName,
     			stuNo : this.$route.query.stuNo,
        		// stuNo : 'G430281199209301331',
        		currentGrade : '',
        		currentGradeName : '',
        		currentClassId : ''
        	},
        	//左侧树
        	leftTree : {
        		currentIndex : 0,
        		grade : [{name : '初一',gradeName: '',schoolYear : '第一学年'},{name : '初二',gradeName: '',schoolYear : '第二学年'},{name : '初三',gradeName: '',schoolYear : '第三学年'}],
     			acceptGrade : this.$route.query.gradeName
        		// acceptGrade : "初三"
        	},
        	//右侧
            mainCont : {
            	//个性发展记录
            	personality : [
            		{'name':'#学业发展[学科活动]#','remarks':'好好学习天天向上','time':'07月10号 13:16','img':require('../../assets/img/eg.jpg'),'num':'88'},
            		{'name':'#学业发展[学科活动]#','remarks':'好好学习天天向上','time':'07月10号 13:16','img':require('../../assets/img/eg.jpg'),'num':'888'},
            		{'name':'#学业发展[学科活动]#','remarks':'好好学习天天向上','time':'07月10号 13:16','img':require('../../assets/img/eg.jpg'),'num':'99'}
        		],
            	//学业成绩记录
//          	achievement :{'entrance':'60','graduation':59,'firstTerm':{'middle':'30','end':'90'},'secondTerm':{'middle':'88','end':'120'}},
            	achievement :{
            		lastSemester : {
            			'daodeyufazhi' : {'stuCourse' : '','stuScore':''},
            			'yuwen' : {'stuCourse' : '','stuScore':''},
            			'shuxue' : {'stuCourse' : '','stuScore':''},
            			'waiyu' : {'stuCourse' : '','stuScore':''},
            			'wuli' : {'stuCourse' : '','stuScore':''},
            			'huaxue' : {'stuCourse' : '','stuScore':''},
            			'shengwu' : {'stuCourse' : '','stuScore':''},
            			'lishi' : {'stuCourse' : '','stuScore':''},
            			'dili' : {'stuCourse' : '','stuScore':''},
            			'tiyuyujiankang' : {'stuCourse' : '','stuScore':''},
            			'yinle' : {'stuCourse' : '','stuScore':''},
            			'meishu' : {'stuCourse' : '','stuScore':''},
            			'xinxijishu' : {'stuCourse' : '','stuScore':''},
            			'laodongyujishu' : {'stuCourse' : '','stuScore':''},
            			'yanjiuxingxuexi' : {'stuCourse' : '','stuScore':''}
            		},
					nextSemester : {
						'daodeyufazhi' : {'stuCourse' : '','stuScore':''},
            			'yuwen' : {'stuCourse' : '','stuScore':''},
            			'shuxue' : {'stuCourse' : '','stuScore':''},
            			'waiyu' : {'stuCourse' : '','stuScore':''},
            			'wuli' : {'stuCourse' : '','stuScore':''},
            			'huaxue' : {'stuCourse' : '','stuScore':''},
            			'shengwu' : {'stuCourse' : '','stuScore':''},
            			'lishi' : {'stuCourse' : '','stuScore':''},
            			'dili' : {'stuCourse' : '','stuScore':''},
            			'tiyuyujiankang' : {'stuCourse' : '','stuScore':''},
            			'yinle' : {'stuCourse' : '','stuScore':''},
            			'meishu' : {'stuCourse' : '','stuScore':''},
            			'xinxijishu' : {'stuCourse' : '','stuScore':''},
            			'laodongyujishu' : {'stuCourse' : '','stuScore':''},
            			'yanjiuxingxuexi' : {'stuCourse' : '','stuScore':''}
					},
					schoolYear : {
						'daodeyufazhi' : {'stuCourse' : '','stuScore':''},
            			'yuwen' : {'stuCourse' : '','stuScore':''},
            			'shuxue' : {'stuCourse' : '','stuScore':''},
            			'waiyu' : {'stuCourse' : '','stuScore':''},
            			'wuli' : {'stuCourse' : '','stuScore':''},
            			'huaxue' : {'stuCourse' : '','stuScore':''},
            			'shengwu' : {'stuCourse' : '','stuScore':''},
            			'lishi' : {'stuCourse' : '','stuScore':''},
            			'dili' : {'stuCourse' : '','stuScore':''},
            			'tiyuyujiankang' : {'stuCourse' : '','stuScore':''},
            			'yinle' : {'stuCourse' : '','stuScore':''},
            			'meishu' : {'stuCourse' : '','stuScore':''},
            			'xinxijishu' : {'stuCourse' : '','stuScore':''},
            			'laodongyujishu' : {'stuCourse' : '','stuScore':''},
            			'yanjiuxingxuexi' : {'stuCourse' : '','stuScore':''}
					}
            	},
            	//请假记录
            	leave : [
					{
						term:"上学期",
						bingjia:0,
						shijia:0
					},
					{
						term:"下学期",
						bingjia:0,
						shijia:0
					}
				],
            	//体质健康记录
            	healthy : {},
            	//实践活动记录
            	activity : {
            		summary : {'total':10,'completed':2},
            		list :[
	            		{'name':'爱国主义教育活动','time':'2019年08月20日','mark':'思想品德'},
	            		{'name':'青年志愿者服务活动','time':'2019年07月24日','mark':'思想品德'},
	            		{'name':'社会调查','time':'2019年06月16日','mark':'思想品德'},
	            		{'name':'清扫公共设施','time':'2019年05月13日','mark':'思想品德'},
	            		{'name':'参观学习科研机构','time':'2019年04月12日','mark':'思想品德'},
	            		{'name':'募集贫困儿童','time':'2019年03月11日','mark':'思想品德'},
	            		{'name':'社区宣传','time':'2019年02月15日','mark':'思想品德'},
	            		{'name':'植树','time':'2019年01月19日','mark':'思想品德'}
	        		]
            	}
            },
        }
    },
    methods : {
    	//左侧树年级切换
    	tabGrade (index){
			this.mainCont.leave = [
				{
					term:"上学期",
					bingjia:0,
					shijia:0
				},
				{
					term:"下学期",
					bingjia:0,
					shijia:0
				}			
			];
			this.mainCont.healthy = {}
    		var _this = this;
    		this.leftTree.currentIndex = index;
    		_this.stuInfo.currentGrade = this.leftTree.grade[index].gradeName;
    		_this.stuInfo.currentGradeName = this.leftTree.grade[index].name;
    		//右侧各项数据
			record.stuRecordAll({stuNo: this.stuInfo.stuNo,schoolyear: this.leftTree.grade[index].gradeName,stuSchoolYear:this.leftTree.grade[index].schoolYear}).then(res => {
				//当前班级id
				console.log(res)
				if(res.data.data.baseData.length>0){
					_this.stuInfo.currentClassId = res.data.data.baseData[0].classId;
				}
				//请假记录
				if(res.data.data.stuRecordData.length>0){
					_this.mainCont.leave = res.data.data.stuRecordData;
				}
				//体质健康
				if(res.data.data.healthData.length>0){
					_this.mainCont.healthy = res.data.data.healthData[0];
				}
				//学业成绩
//  				 _this.mainCont.achievement = res.data.data.studyScoreData;
				res.data.data.studyScoreData.forEach(function (ele){
					if(ele.stuSchoolYear == _this.leftTree.grade[index].schoolYear && ele.stuSchoolTerm == '第一学期'){
						_this.mainCont.achievement.lastSemester = ele;
					}else if(ele.stuSchoolYear == _this.leftTree.grade[index].schoolYear && ele.stuSchoolTerm == '第二学期'){
						_this.mainCont.achievement.nextSemester = ele;
					}else{
						_this.mainCont.achievement.schoolYear = ele;
					}
				});
				
				console.log(this.mainCont.achievement)
			}).catch(e =>{
				
			});
    	},
		time (){
			this.$parent.timingFn('success','2');
		},
		confirm (){
			let _this = this;
			this.$parent.confirmFn('按时肯德基刻录机',function (state){
				if(state == 'sure'){	
					_this.$parent.timingFn('success','3');
				}
			});
		},
		load (){
			this.$parent.loadingFn(true,'jjjjj');	
		}
    },
    components : {
//  	prompt
    },
    created (){
//  	console.log(this.$route)
//  	console.log(this.$route.query)
    	var _this = this;
    	//左侧树学年
		record.schoolYear().then(res => {
			this.leftTree.grade.forEach(function (e,i){
				if(_this.leftTree.acceptGrade == e.name){
					_this.leftTree.grade.splice(i + 1);
					_this.leftTree.currentIndex = i;
					//当前学年
					_this.stuInfo.currentGrade = res.data.data[0].name.substring(0,res.data.data[0].name.indexOf('学年'));
    				_this.stuInfo.currentGradeName = _this.leftTree.grade[_this.leftTree.currentIndex].name;
					e.gradeName = _this.stuInfo.currentGrade;
					//右侧各项数据
					record.stuRecordAll({stuNo: _this.stuInfo.stuNo,schoolyear:  _this.stuInfo.currentGrade,stuSchoolYear:e.schoolYear}).then(res => {
						console.log(res)
						//当前班级id
						if(res.data.data.baseData.length>0){
							_this.stuInfo.currentClassId = res.data.data.baseData[0].classId;
						}
						//请假记录
						if(res.data.data.stuRecordData.length>0){
							_this.mainCont.leave = res.data.data.stuRecordData;
						}
						//体质健康
						if(res.data.data.healthData.length>0){
							_this.mainCont.healthy = res.data.data.healthData[0];
						}
						//学业成绩
						res.data.data.studyScoreData.forEach(function (ele,index){
							if(ele.stuSchoolYear == e.schoolYear && ele.stuSchoolTerm == '第一学期'){
								_this.mainCont.achievement.lastSemester = ele;
							}else if(ele.stuSchoolYear == e.schoolYear && ele.stuSchoolTerm == '第二学期'){
								_this.mainCont.achievement.nextSemester = ele;
							}else{
								_this.mainCont.achievement.schoolYear = ele;
							}
						});

						console.log(_this.leftTree)
					}).catch(e =>{
						
					});
					let num = 0;
					while(i > 0){
						num ++;
						i --;
						_this.leftTree.grade[i].gradeName = (e.gradeName.substring(0,4) - num) + '-' + (e.gradeName.substring(5,9) - num);
					}
					console.log(_this.leftTree.grade)
				}
			});
		}).catch(e =>{
					
		});
		
		/*record.stuList({'classId':'class_3a0994b3ad7e434794779a2aad9c236c','delFlag':0,'state':1,'userType':2}).then(res => {
			console.log(res)
		})*/
    }
}
</script>

<style lang="">
    
</style>
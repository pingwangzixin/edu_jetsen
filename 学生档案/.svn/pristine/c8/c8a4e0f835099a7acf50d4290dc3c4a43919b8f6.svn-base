import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import list from '../components/teacher/growthArchives/list.vue'
import personalityRecord from '../components/teacher/growthArchives/personalityRecord.vue'
import studentRecord from '../components/teacher/schoolRollManagement/studentRecord.vue'
import studentStatusCard from '../components/teacher/schoolRollManagement/studentStatusCard.vue'
import studentPersonalityRecord from '../components/student/growthArchives/personalityRecord.vue'
import growthRecord from '../components/publicAssembly/growthRecord.vue'
import registrationForm from '../components/publicAssembly/registrationForm.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {   //公共头部
            path: '/',
            name: 'index',
            component: index,
            redirect:"/index/list",
            children: [{
                //教师列表（成长档案）
                path: '/index/list',
                name: 'list',
                component: list,
            }, {
                //教师端成长记录（成长档案）
                path: '/index/personalityRecord',
                name: 'personalityRecord',
                component: personalityRecord,
            }, {
                //教师端存档（学籍卡）
                path: '/index/studentRecord',
                name: 'studentRecord',
                component: studentRecord,
            }, {
                //教师端学籍卡（学籍卡）
                path: '/index/studentStatusCard',
                name: 'studentStatusCard',
                component: studentStatusCard,
            }, {
                //学生端成长记录（成长档案）
                path: '/index/studentPersonalityRecord',
                name: 'studentPersonalityRecord',
                component: studentPersonalityRecord,
            }, {
                //教师端/学生端成长记录（成长档案）
                path: '/index/growthRecord',
                name: 'growthRecord',
                component: growthRecord,
            }, {
                //学生端学籍卡有头部（调用公共表格）（成长档案）
                path: '/index/registrationForm',
                name: 'indexRegistrationForm',
                component: registrationForm,
            }]
        },{
            //教师端查看学生学籍表无头部（公共表格）（成长档案）
            path: '/registrationForm',
            name: 'registrationForm',
            component: registrationForm,
        }/*,{
        	//
        	path: '/prompt',
        	name: 'prompt',
        	component: prompt,
        }*/
    ]
})

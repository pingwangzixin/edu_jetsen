<template>
    <div>
        <!-- 年级选择 -->
        <div class="jhf_grade">
            <p
                class="jhf_grade_conter"
                :class="activeGrade == index ? 'active':''"
                v-for="(item , index) in grade"
                :key="index"
                @click="gradeItem(index)"
            >{{item.gradeName}}年级</p>
        </div>

        <!-- 班级选择 -->
        <div class="jhf_clbum">
            <p
                class="jhf_clbum_conter"
                :class="activeClbum == index ? 'active':''"
                v-for="(item , index) in clbum"
                :key="index"
                @click="clbumItem(index)"
            >{{item.fullClassName}}</p>
        </div>

        <!-- 名字选择 -->
        <div class="jhf_name">
            <p
                class="jhf_name_conter"
                v-for="(item , index) in monicker"
                :key="index"
                @click="goTo(item)"
            >{{item.stuName}}</p>
        </div>
    </div>
</template>

<script>
import { record } from "@/api";
export default {
    name: "list",
    data() {
        return {
            grade: [],
            activeGrade: 0, //年级选择样式切换，0为默认选择第一个
            clbum: [],
            activeClbum: 0, //班级选择样式切换，0为默认选择第一个
            monicker: []
        };
    },
    methods: {
        // 年级点击切换
        gradeItem(index) {
            this.activeGrade = index;
            this.clbum = this.grade[index].classInfo;
            this.clbumItem(0);
        },
        // 班级点击切换
        clbumItem(index) {
            this.monicker = [];
            this.activeClbum = index;
            record
                .stuList({
                    classId: this.clbum[index].classId,
                    delFlag: 0,
                    state: 1,
                    userType: 2
                })
                .then(res => {
                    this.monicker = res.data.data.list;
                });
        },
        // 点击名字页面跳转
        goTo(item) {
            console.log(item);
            this.$router.push({
                name: "growthRecord",
                query: {
                    stuName: item.stuName,
                    stuNo: item.stuNo,
                    gradeName: item.gradeName
                }
            });
        },
         // 判断身份
        identity(userId){
            this.grade = [];
            record.teacherInfor(userId).then(res => {
                console.log(res);
                //判断角色身份
                if (res.data.data.userType == 1) {
                    let bol = res.data.data.userRole.some(ele => {
                        return ele.id == 18;
                    });
                    let bol1 = res.data.data.userRole.some(ele => {
                        return ele.id == 12;
                    });
                    let bol2 = res.data.data.userRole.some(ele => {
                        return ele.id == 14 || ele.id == 1;
                    });
                    if (bol) {
                        this.dengji = 3;
                        record
                            .gradeList({ officeId: res.data.data.officeId })
                            .then(res => {
                                console.log(res);
                                let arr = res.data.data.gradesList.map(ele=>{
                                    ele.classesList.map(ele1=>{
                                        ele1.classId = ele1.id;
                                        ele1.fullClassName = ele1.gradeName + "(" + ele1.name +")班";
                                        ele1.className = ele1.name;
                                    })
                                    ele.classInfo =  ele.classesList;
                                    return ele;
                                });
                                arr.forEach(ele=>{
                                    if(ele.gradeName == "初一"){
                                        this.grade.push(ele) 
                                    }
                                    if(ele.gradeName == "初二"){
                                        this.grade.push(ele) 
                                    }
                                    if(ele.gradeName == "初三"){
                                        this.grade.push(ele) 
                                    }
                                })
                                this.clbum = this.grade[0].classInfo;
                                record
                                    .stuList({
                                        classId: this.clbum[0].classId,
                                        delFlag: 0,
                                        state: 1,
                                        userType: 2
                                    })
                                    .then(res => {
                                        console.log(res);
                                        this.monicker = res.data.data.list;
                                    });
                            });
                    } else if (bol1) {
                        this.dengji = 2;
                        res.data.data.userRole.forEach(ele => {
                            if (ele.id == 12) {
                                record
                                    .classlist({ gradeId: ele.gradeId })
                                    .then(res1 => {
                                        this.grade[0] = {};
                                        this.grade[0].gradeId = ele.gradeId;
                                        this.grade[0].gradeName = ele.gradeName;
                                        this.grade[0].classInfo = res1.data.data.map(
                                            ele1 => {
                                                ele1.classId = ele1.id;
                                                ele1.fullClassName =
                                                    ele1.gradeName +
                                                    "(" +
                                                    ele1.name +
                                                    ")班";
                                                ele1.className = ele1.name;
                                                return ele1;
                                            }
                                        );
                                        console.log(this.grade);
                                        this.clbum = this.grade[0].classInfo;
                                        record
                                            .stuList({
                                                classId: this.clbum[0].classId,
                                                delFlag: 0,
                                                state: 1,
                                                userType: 2
                                            })
                                            .then(res => {
                                                console.log(res);
                                                this.monicker = res.data.data.list;
                                            });
                                    });
                            }
                        });
                    } else if (bol2) {
                        this.dengji = 1;
                        //老师所带班级
                        record.classGrade(res.data.data.id).then(res1 => {
                            console.log(res1);
                            res1.data.data.schoolInfo.forEach(item => {
                                if (item.gradeName == "初一") {
                                    this.grade.push(item);
                                }
                            });
                            res1.data.data.schoolInfo.forEach(item => {
                                if (item.gradeName == "初二") {
                                    this.grade.push(item);
                                }
                            });
                            res1.data.data.schoolInfo.forEach(item => {
                                if (item.gradeName == "初三") {
                                    this.grade.push(item);
                                }
                            });
                            console.log(this.grade);
                            this.clbum = this.grade[0].classInfo;
                            record
                                .stuList({
                                    classId: this.clbum[0].classId,
                                    delFlag: 0,
                                    state: 1,
                                    userType: 2
                                })
                                .then(res => {
                                    console.log(res);
                                    this.monicker = res.data.data.list;
                                });
                        });
                    }
                } else if (res.data.data.userType == 2) {
                    this.$router.push({
                        name: "growthRecord",
                        query: {
                            stuName: res.data.data.realname,
                            stuNo: res.data.data.stuNo,
                            gradeName: res.data.data.gradeName
                        }
                    });
                } else if (res.data.data.userType == 3) {
                    this.$router.push({
                        name: "growthRecord",
                        query: {
                            stuName: res.data.data.children[0].realname,
                            stuNo: res.data.data.children[0].stuNo,
                            gradeName: res.data.data.children[0].gradeName
                        }
                    });
                }
            });
        }
    },
    created() {
        console.log(this.$route.query.userId)
        this.identity(this.$route.query.userId)
    },
    watch:{
        $route(to,from){
            this.identity(to.query.userId)
        }
    },
};
</script>

<style lang="">
/* 年级选择 */
.jhf_grade {
    width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 3px;
}
.jhf_grade_conter {
    display: inline-block;
    line-height: 50px;
    border-right: 1px solid #dddddd;
    padding: 0 30px;
    font-size: 16px;
    cursor: pointer;
}
.jhf_grade .active {
    background: #5093e1;
    color: #ffffff;
}
/* 班级选择 */
.jhf_clbum {
    width: 1192px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 5px;
    margin-top: 10px;
    padding-left: 8px;
}
.jhf_clbum_conter {
    display: inline-block;
    line-height: 50px;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
}
.jhf_clbum .active {
    color: #5093e1;
}
/* 名字选择 */
.jhf_name {
    width: 1192px;
    margin: 0 auto;
    background: #ffffff;
    margin-top: 10px;
    padding-bottom: 33px;
    padding-left: 8px;
}
.jhf_name_conter {
    display: inline-block;
    width: 70px;
    height: 30px;
    background: #f9f9f9;
    font-size: 14px;
    margin-top: 21px;
    margin-left: 26px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
}
</style>
<template>
    <div>
        <div class="wd_xjk">
            <!-- 头部 -->
            <div class="header">
                <h2>学籍卡</h2>
                <input type="text" placeholder="请输入身份证号搜索学籍卡" />
                <i class="iconfont iconsousuo"></i>
            </div>
            <!-- 左边部分 -->
            <div class="main clearfix">
                <div class="left fl">
                    <div class="shang">
                        <!-- 选择年级 -->
                        <div class="nianji" v-if="arr3.length>0">
                            <p
                                v-for="(item,i) in arr3"
                                :key="i"
                                @click="send(item.gradeName,i)"
                                :class="index2==i?'active fl':'fl'"
                                v-text="item.gradeName+'年级'"
                            ></p>
                        </div>
                        <!-- 选择年级 -->
                        <div class="banji" v-if="banji.length>0">
                            <div @click.stop="dianji">
                                <span v-text="banji1.fullClassName"></span>
                                <span>▼</span>
                            </div>
                            <div v-show="isShow">
                                <p
                                    :class="index1==ide?'active':''"
                                    v-for="(item,ide) in banji"
                                    :key="ide"
                                    @mouseover="huaguo(ide)"
                                    @click="dianji1(ide)"
                                    v-text="item.fullClassName"
                                ></p>
                            </div>
                            <p></p>
                            <p @click="qiehuan">
                                收起详情
                                <span v-show="bol">▲</span>
                                <span v-show="!bol">▼</span>
                            </p>
                        </div>
                        <!-- 选择个人 -->
                        <div class="xuesheng clearfix" v-show="bol">
                            <p
                                class="fl wdr"
                                :class="num==index?'active':''"
                                v-for="(item,index) in yiban.weidaoru"
                                @click="send1(index,item)"
                                :key="index+'b'"
                                v-text="item.stuName"
                            ></p>
                            <p
                                class="fl ydr"
                                :class="num1==index?'active1':''"
                                v-for="(item,index) in yiban.yidaoru"
                                @click="send5(index,item)"
                                :key="index+'a'"
                                v-text="item.stuName"
                            ></p>
                        </div>
                        <div class="yanse" v-show="bol">
                            <p>点击学生姓名预览该学生学籍卡</p>
                            <!-- <p>
                                <span></span>未导入学生名单颜色
                                <span></span>已导入学生名单颜色
                            </p> -->
                        </div>
                    </div>
                    <!-- 表格组件 -->
                    <div class="xuejika">
                        <registrationForm
                            :data1="{dengji:dengji,isS:true,nianji:arr3[index2],dangqian:schoolYear,stuNo:stuNo,stuName:stuName,banji:banji1}"
                        ></registrationForm>
                    </div>
                    <div>
                        <registrationForm
                            :id="'app'+index"
                            v-for="(item,index) in classStudents" :key="index"
                            :data1="{nianji:arr3[index2],dangqian:schoolYear,stuNo:item.stuNo,stuName:item.stuName,banji:banji1}"
                        ></registrationForm>
                    </div>
                </div>
                <!-- 右边部分 -->
                <div class="right fr">
                    <div class="shang">
                        <!-- 录入项目 -->
                        <div>
                            <h3>
                                <span>{{banji1.fullClassName}}录入项目</span>
                                <span v-show="bol1" @click="send2">︿</span>
                                <span v-show="!bol1" @click="send2">﹀</span>
                            </h3>
                            <div @click.stop="send4">
                                <span v-text="schoolYear1.xuenian+schoolYear1.xueqi"></span>
                                <span>▼</span>
                            </div>
                            <div v-show="isShow1">
                                <p
                                    v-for="(item,index) in arr2"
                                    :key="index"
                                    @click="xzxq(index)"
                                    v-text="item.xuenian+item.xueqi"
                                ></p>
                            </div>
                        </div>
                        <div class="xinxi" v-show="bol1">
                            <div class="moban" v-for="(item,index) in arr" :key="index">
                                <p>
                                    <span>{{item.name}}</span>
                                    <span class="renshu" v-if="index!=1">导入{{item.daoru}}人，共{{renshu}}人</span>
                                    <span class="fr dian" v-if="item.zhaopian" @click.stop="send6">···</span>
                                </p>
                                <div class="clearfix" v-if="index!=1">
                                    <a class="fl" :href="item.xiazai" type="application/x-msdownload">模板下载</a>
                                    <input
                                        type="file"
                                        ref="shangchuan"
                                        :accept="index==1?'.zip':'.xlsx'"
                                        @change="daoru(index)"
                                        :id="'shangchuan'+index"
                                    />
                                    <label class="fl" :for="'shangchuan'+index">导入</label>
                                    <a class="fl"  :href="item.xiazai1">下载未导入名单</a>
                                </div>
                                <div class="clearfix tupian" v-if="index==1">
                                    <input
                                        type="file"
                                        ref="shangchuan1"
                                        :accept="index==1?'.zip':'.xlsx'"
                                        @change="daoru1"
                                        id="shangchuan"
                                    />
                                    <label class="fl" for="shangchuan">入学照片</label>
                                    <input
                                        type="file"
                                        ref="shangchuan"
                                        :accept="index==1?'.zip':'.xlsx'"
                                        @change="daoru(index)"
                                        :id="'shangchuan'+index"
                                    />
                                    <label class="fl" :for="'shangchuan'+index">毕业照片</label>
                                </div>
                                <div class="clearfix tprs" v-if="index==1">
                                    <p class="fl">导入{{item.ruxuedaoru}}人</p>
                                    <p class="fl">导入{{item.biyedaoru}}人</p>
                                    <p class="fl">共{{renshu}}人</p>
                                </div>
                                <p>{{item.xinxi}}</p>
                                <div v-if="item.zhaopian" class="sandian" v-show="isShow2">
                                    <div></div>
                                    <div @click="dcrutp">导出入学照片（2张）</div>
                                    <div @click="dcrutp1">导出毕业照片（2张）</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 班级导入 -->
                    <div class="xia" v-if="dengji >=2" >
                        <div>
                            <h3>
                                <span>班级导入进度</span>
                                <span v-show="bol2" @click="send3">︿</span>
                                <span v-show="!bol2" @click="send3">﹀</span>
                            </h3>
                        </div>
                        <div v-show="bol2" class="baogao">
                            <div class="xiazai" v-for="(item,index) in banji" :key="index">
                                <p>
                                    <span>{{item.fullClassName}}</span>
                                    <!-- <span>{{item.daoru}}</span> -->
                                </p>
                                <div class="clearfix">
                                    <p class="fl" :class="{'active':item.bol}" @click="scpdf(item)">生成报告</p>
                                    <p class="fl" :class="{'active':item.bol}" @click="xzpdf(item)">下载PDF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div  class="cdsb">存档上报</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import registrationForm from "../../publicAssembly/registrationForm";
import { record ,configure} from "@/api";
export default {
    name: "studentStatusCard",
    data() {
        return {
            //权限等级
            dengji:1,
            //班级总人数
            renshu: "",
            stuName: "",
            //选中学生学籍号
            stuNo: "",
            // 选择年级
            index2: 0,
            //学年
            schoolYear1: {
                xuenian: "第一学年",
                xueqi: "第一学期",
                id: "",
                name: ""
            },
            schoolYear: [],
            // 选择个人
            index1: "",
            // 个人的实现隐藏、
            isShow: false,
            // 录入项目选择年级
            isShow1: false,
            // 学籍照片显示隐藏
            isShow2: false,
            // 未导入索引
            num: 0,
            // 已导入索引
            num1: -1,
            // 控制收起详情
            bol: true,
            // 录入项目的控制隐藏
            bol1: true,
            // 班级进度的控制隐藏
            bol2: true,
            // 班级
            banji1: "初一年级（1）班",
            // 班级选择
            banji: [],
            // 学生个人
            yiban: {
                // 已导入
                yidaoru: [],
                // 未导入
                weidaoru: []
            },
            // 项目导入信息
            arr: [
                {
                    name: "基本信息",
                    daoru:0
                },
                {
                    name: "学籍照片",
                    ruxuedaoru:0,
                    biyedaoru:0,
                    xinxi:
                        "照片一身份证号命名，全部框选后压缩未zip格式再进行导入",
                    zhaopian: true
                },
                {
                    name: "学业成绩",
                    daoru: 0
                },
                {
                    name: "综合评价",
                    daoru: 0
                },
                {
                    name: "体检数据",
                    daoru: 0
                },
                {
                    name: "体质健康",
                    daoru: 0
                },
                {
                    name: "操行记录",
                    daoru: 0
                }
            ],
            //学年学期
            arr2: [
                {
                    xuenian: "第一学年",
                    xueqi: "第一学期",
                    id: "",
                    name: ""
                },
                {
                    xuenian: "第一学年",
                    xueqi: "第二学期",
                    id: "",
                    name: ""
                }
            ],
            //保存年级与班级
            arr3: [],
            // 生成报告时的学生列表
            classStudents: [],
            //生成报告所保存的班级
            quanban:"",
            // 右下角班级列表
            rightbanji:[]
        };
    },
    methods: {
        //学年字符串优化
        bianxn(str) {
            let num = Number(str.substring(0, 4));
            return num - 1 + "-" + num;
        },
        // 选择年级事件
        send(a, b) {
            this.index2 = b;
            if (a == "初一") {
                this.arr2 = [
                    {
                        xuenian: "第一学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                    {
                        xuenian: "第一学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    }
                    
                ];
                this.arr3.forEach((ele, index) => {
                    if (ele.gradeName == "初一") {
                        this.banji = this.arr3[index].classInfo;
                    }
                });
            } else if (a == "初二") {
                this.arr2 = [
                    {
                        xuenian: "第二学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                    {
                        xuenian: "第二学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                     {
                        xuenian: "第一学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.schoolYear.name)
                    },
                    {
                        xuenian: "第一学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.schoolYear.name)
                    }
                   
                ];
                this.arr3.forEach((ele, index) => {
                    if (ele.gradeName == "初二") {
                        this.banji = this.arr3[index].classInfo;
                    }
                });
            } else if (a == "初三") {
                this.arr2 = [
                    {
                        xuenian: "第三学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                    {
                        xuenian: "第三学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                    {
                        xuenian: "第二学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.schoolYear.name)
                    },
                    {
                        xuenian: "第二学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.schoolYear.name)
                    },
                    {
                        xuenian: "第一学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.bianxn(this.schoolYear.name))
                    },
                    {
                        xuenian: "第一学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.bianxn(this.bianxn(this.schoolYear.name))
                    }
                    
                ];
                this.arr3.forEach((ele, index) => {
                    if (ele.gradeName == "初三") {
                        this.banji = this.arr3[index].classInfo;
                    }
                });
            }
            this.rightbanji = this.banji;
            this.rightbanji = this.rightbanji.map((ele)=>{
                ele.bol = false;
                return ele;
            })
            this.schoolYear1 = this.arr2[0];
            this.banji1 = this.banji[0];
            this.dianji1(0);
            this.num == 0;
        },
        // 选择班级事件
        dianji() {
            this.isShow = !this.isShow;
        },
        //导出入学图片
        dcrutp() {
            let str =configure.studentRecord+"stuBaseInfor/downLoadUserImage?classId=" +
                this.banji1.classId +
                "&&type=ruxue";
            window.location.href = str;
        },
        //导出毕业图片
        dcrutp1() {
            let str =configure.studentRecord+"stuBaseInfor/downLoadUserImage?classId=" +
                this.banji1.classId +
                "&&type=biye";
            window.location.href = str;
        },
        // 班级选项滑过事件
        huaguo(a) {
            this.index1 = a;
        },
        // 班级选择点击事件
        dianji1(a) {
            this.yiban.weidaoru = [];
            this.stuNo = "";
            this.stuName = "";
            this.renshu = 0;
            if(this.banji.length>0){
                this.num = 0;
                this.banji1 = this.banji[a];
                this.isShow = false;
                record
                    .stuList({
                        classId: this.banji1.classId,
                        delFlag: 0,
                        state: 1,
                        userType: 2
                    })
                    .then(res => {
                        this.yiban.weidaoru = res.data.data.list;
                        this.stuNo = this.yiban.weidaoru[0].stuNo;
                        this.stuName = this.yiban.weidaoru[0].stuName;
                        this.renshu = res.data.data.count;
                    });
                record
                    .importedNumber({
                        classId: this.banji1.classId,
                        schoolyear: this.schoolYear1.name
                    })
                    .then(res => {
                        this.arr[3].daoru = res.data.data.evalDataCount;
                        this.arr[4].daoru = res.data.data.stuRecordDataCount;
                        this.arr[5].daoru = res.data.data.healthDataCount;
                        this.arr[6].daoru = res.data.data.baseDataCount;
                    });
                record.findImportNum({
                    stuClassId:this.banji1.classId,
                    stuSchoolYear:this.schoolYear1.xuenian,
                    stuSchoolTerm:this.schoolYear1.xueqi,
                }).then(res=>{
                        this.arr[0].daoru = res.data.data.importedBaseInforNum;
                        this.arr[1].ruxuedaoru = res.data.data.importedRuxueNum;
                        this.arr[1].biyedaoru = res.data.data.importedBiyeNum;
                        this.arr[2].daoru = res.data.data.importedScholasticAttainmentNum;
                })
            }
            this.xiazai()
        },

        // 收起详情的点击事件
        qiehuan() {
            this.bol = !this.bol;
        },
        // 选择未导入个人的点击事件
        send1(index,item) {
            this.num = index;
            this.num1 = -1;
            this.stuNo = item.stuNo;
            this.stuName = item.stuName;
        },
        // 录入项目控制显示隐藏事件
        send2(a) {
            this.bol1 = !this.bol1;
        },
        // 班级导入的控制显示隐藏事件
        send3(a) {
            this.bol2 = !this.bol2;
        },
        // 选择学期的点击事件
        send4(a) {
            this.isShow1 = !this.isShow1;
        },
        // 控制已导入的点击事件
        send5(index,item) {
            this.num1 = index;
            this.num = -1;
            this.stuNo = item.stuNo;
            this.stuName = item.stuName;
        },
        // 学籍照片的点击事件
        send6() {
            this.isShow2 = !this.isShow2;
        },
        // 选择学期的点击事件
        xzxq(a) {
            this.schoolYear1 = this.arr2[a];
            this.isShow1 = false;
            this.xiazai();
        },
        //模板下载
        xiazai() {
            //娟姐接口需要的参数
            if(this.banji1 !=undefined){
                console.log(this.banji1.className)
                let str;
                if (this.schoolYear1.xueqi == "第一学期") {
                    str =
                        "schoolyear=" +
                        this.schoolYear1.name +
                        "&term=上学期&className=" +
                        this.banji1.className +
                        "&gradeName=" +
                        this.arr3[this.index2].gradeName +
                        "&classId=" +
                        this.banji1.classId;
                } else {
                    str =
                        "schoolyear=" +
                        this.schoolYear1.name +
                        "&term=下学期&className=" +
                        this.banji1.className +
                        "&gradeName=" +
                        this.arr3[this.index2].gradeName +
                        "&classId=" +
                        this.banji1.classId;
                }
                // 陶生接口需要的参数
                let str1 = "stuClassId=" + this.banji1.classId + "&stuSchoolYear=" + this.schoolYear1.xuenian + "&stuSchoolTerm=" + this.schoolYear1.xueqi;
                //下载模板
                this.arr[0].xiazai =configure.studentRecord+"stuBaseInfor/downLoadBaseInforModel?" + str1;
                this.arr[2].xiazai =configure.studentRecord+"stuScholasticAttainment/downLoadScholasticAttainmentModel?"+ str1;
                this.arr[3].xiazai =configure.studentRecord+"EvalStuScore/export?" + str;
                this.arr[5].xiazai =configure.studentRecord+"HealthStuscore/export?" + str;
                this.arr[4].xiazai =configure.studentRecord+"StuBaseData/export?" + str;
                this.arr[6].xiazai =configure.studentRecord+"StuRecordDetail/export?" + str;
                this.arr[0].xiazai1 =configure.studentRecord+"stuBaseInfor/downLoadNoImportBaseInfor?" + str1;
                this.arr[2].xiazai1 =configure.studentRecord+"stuScholasticAttainment/downLoadNoImportScholasticAttainment?" + str1;
                this.arr[3].xiazai1 =configure.studentRecord+"EvalStuScore/downloadOther?" + str;
                this.arr[5].xiazai1 =configure.studentRecord+"HealthStuscore/downloadOther?" + str;
                this.arr[4].xiazai1 =configure.studentRecord+"StuBaseData/downloadOther?" + str;
                this.arr[6].xiazai1 =configure.studentRecord+"StuRecordDetail/downloadOther?" + str;
            }
        },
        daoru(a) {
            const file = this.$refs.shangchuan[a].files[0];
            const data = new window.FormData();
            data.append("file", file);
            if (a == 0) {
                
                data.append("classId", this.banji1.classId);
                data.append("stuSchoolYear", this.schoolYear1.xuenian); 
                data.append("stuSchoolTerm", this.schoolYear1.xueqi); 
                console.log(data)
                record.StuBaseInforDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            } else if (a == 1) {
                data.append("classId", this.banji1.classId);
                data.append("type", "biye");
                record.StuBaseInforTupianDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            } else if (a == 2) {
                data.append("classId", this.banji1.classId);
                data.append("stuSchoolYear", this.schoolYear1.xuenian); 
                data.append("stuSchoolTerm", this.schoolYear1.xueqi); 
                record.stuScholasticAttainmentDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            } else if (a == 3) {
                data.append("classId", this.banji1.classId);
                data.append("schoolyear", this.schoolYear1.name);
                if (this.schoolYear1.xueqi == "第一学期") {
                    data.append("term", "上学期");
                } else {
                    data.append("term", "下学期");
                }
                record.EvalStuScoreDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            } else if (a == 4) {
                data.append("classId", this.banji1.classId);
                data.append("schoolyear", this.schoolYear1.name);
                if (this.schoolYear1.xueqi == "第一学期") {
                    data.append("term", "上学期");
                } else {
                    data.append("term", "下学期");
                }
                record.StuBaseDataDr(data).then(res => {
                   if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            } else if (a == 5) {
                data.append("classId", this.banji1.classId);
                data.append("schoolyear", this.schoolYear1.name);
                if (this.schoolYear1.xueqi == "第一学期") {
                    data.append("term", "上学期");
                } else {
                    data.append("term", "下学期");
                }
                record.HealthStuscoreDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    };
                });
            } else if (a == 6) {
                data.append("classId", this.banji1.classId);
                data.append("schoolyear", this.schoolYear1.name);
                if (this.schoolYear1.xueqi == "第一学期") {
                    data.append("term", "上学期");
                } else {
                    data.append("term", "下学期");
                }
                record.stuRecordDetailDr(data).then(res => {
                    if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
                });
            }
            this.$refs.shangchuan[a].value = "";
        },
        daoru1() {
            const file = this.$refs.shangchuan1[0].files[0];
            const data = new  window.FormData();
            data.append('file', file);
            data.append('classId',this.banji1.classId);
            data.append('type',"ruxue");
            record.StuBaseInforTupianDr(data).then(res=>{
                if (res.data.ret == "200") {
                        this.$parent.timingFn("success", "导入成功");
                    } else {
                        this.$parent.timingFn("fail", "导入失败");
                    }
            })
        },
        scpdf(item) {
            if(item.bol){
                this.$parent.timingFn("warning","正在生成报告");
            }else{
                this.$parent.loadingFn(true);
                item.bol = true;
                setTimeout(()=>{
                    item.bol = false;
                },600000);
                this.rightbanji = this.rightbanji.slice();
                record.stuList({classId: item.classId,delFlag: 0,state: 1,userType: 2})
                .then(res => {
                    this.classStudents =res.data.data.list;
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            for(let i=0;i<this.classStudents.length;i++){
                                let params = new URLSearchParams();
                                params.append("htmlstr",$("#app"+i).html());
                                params.append("stuNo",this.classStudents[i].stuNo);
                                params.append("stuName",this.classStudents[i].stuName);
                                params.append("classId",item.classId);
                                record.generaterReport(params).then(res=>{
                                    if(i== (this.classStudents.length-1)){
                                        this.$parent.loadingFn(false);
                                        this.classStudents =[];
                                    };
                                });
                            };
                        },0);
                    });
                });
            };
            
        },
        xzpdf(item){
            if(item.bol){
                this.$parent.timingFn("warning","正在生成报告")
            }else{
                let obj = {
                    classId:item.classId,
                }
                record.downloadPDF(obj).then(res=>{
                    if(res.data == 0){
                        this.$parent.timingFn("fail","请先生成报告")
                    }else{
                            let str = configure.studentRecord+"StuRecordDetail/exportClassPdf?classId="+item.classId+"&gradeName="+this.arr3[this.index2].gradeName+"&className="+item.className;
                            window.location.href = str;
                    }
                })
            }
        },
        // 判断身份
        identity(userId){
            this.arr3= [];
            return record.teacherInfor(userId).then(res => {
                //判断角色身份
                if(res.data.data.userType == 1){
                    let bol = res.data.data.userRole.some(ele=>{
                        return  ele.id == 18 
                    })
                    let bol1 = res.data.data.userRole.some(ele=>{
                        return  ele.id == 12  
                    })
                    let bol2 = res.data.data.userRole.some(ele=>{
                        return  ele.id == 14 || ele.id == 1
                    })
                    if(bol){
                        this.dengji = 3;
                        record.gradeList({officeId:res.data.data.officeId}).then(res=>{
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
                                    this.arr3.push(ele) 
                                }
                                if(ele.gradeName == "初二"){
                                    this.arr3.push(ele) 
                                }
                                if(ele.gradeName == "初三"){
                                    this.arr3.push(ele) 
                                }
                            })
                            this.banji = this.arr3[0].classInfo;
                            this.send(this.arr3[0].gradeName, 0);
                        })
                    }else if(bol1){
                        this.dengji = 2;
                        res.data.data.userRole.forEach(ele=>{
                            if(ele.id==12){
                                record.classlist({gradeId:ele.gradeId}).then(res1=>{
                                    this.arr3[0] = {};
                                    this.arr3[0].gradeId = ele.gradeId;
                                    this.arr3[0].gradeName = ele.gradeName;
                                    this.arr3[0].classInfo = res1.data.data.map(ele1=>{
                                        ele1.classId = ele1.id;
                                        ele1.fullClassName = ele1.gradeName + "(" + ele1.name +")班";
                                        ele1.className = ele1.name;
                                        return ele1
                                    })
                                    this.banji = this.arr3[0].classInfo;
                                    this.send(this.arr3[0].gradeName, 0);
                                })
                            }  
                        })

                    }else if(bol2){
                        this.dengji = 1;
                        //老师所带班级
                        record.classGrade(res.data.data.id).then(res1=>{
                            res1.data.data.schoolInfo.forEach(item=>{
                                if(item.gradeName == "初一"){
                                    this.arr3.push(item)
                                }
                            })
                            res1.data.data.schoolInfo.forEach(item=>{
                                if(item.gradeName == "初二"){
                                    this.arr3.push(item)
                                }
                            })
                            res1.data.data.schoolInfo.forEach(item=>{
                                if(item.gradeName == "初三"){
                                    this.arr3.push(item)
                                }
                            })
                            this.banji = this.arr3[0].classInfo;
                            this.send(this.arr3[0].gradeName, 0);
                        });
                    };
                };
            });
        }
    },
    // 引入组件
    components: {
        registrationForm
    },
    created() {
        //查询当当前学年
        record
            .schoolYear()
            .then(res => {
                this.schoolYear = res.data.data[0];
                this.arr2 = [
                    {
                        xuenian: "第一学年",
                        xueqi: "第一学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    },
                    {
                        xuenian: "第一学年",
                        xueqi: "第二学期",
                        id: this.schoolYear.id,
                        name: this.schoolYear.name.substring(0, 9)
                    }
                ];
                this.schoolYear1 = this.arr2[0];
                //查询年级班级
                this.identity(this.$route.query.userId)
            })
    },
    watch:{
        $route(to,from){
            if(JSON.stringify(to.query) != JSON.stringify(from.query)){
                this.identity(to.query.userId)
            }
        }
    },
    mounted(){
        this.bodyListener = ()=>{
            this.isShow = false;
            this.isShow1 = false;
            this.isShow2 = false;
        };
        document.body.addEventListener('click',this.bodyListener ,false)
    },
    beforeDestroy() {
      document.body.removeEventListener('click', this.bodyListener,false)
    },
};
</script>

<style scoped>
.wd_xjk {
    width: 1200px;
    margin: -20px auto 0;
    position: relative;
}
.wd_xjk .header {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 12px;
    position: relative;
}
.wd_xjk .header h2 {
    font-size: 18px;
    padding: 11px 5px 0;
    border-bottom: 2px solid #5ca7e5;
}
.wd_xjk .header input {
    font-size: 14px;
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    padding-left: 25px;
    outline: none;
    width: 300px;
    height: 36px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 1px rgba(41, 45, 47, 0.1);
    border-radius: 17px;
    position: absolute;
    top: 7px;
    right: 0;
}
.wd_xjk .header .iconsousuo {
    position: absolute;
    top: 14px;
    right: 20px;
    font-size: 20px;
}
.wd_xjk .main {
    padding-top: 15px;
}
.wd_xjk .left .shang {
    width: 874px;
    background: #fff;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
}
.wd_xjk .left .nianji {
    height: 45px;
    width: 100%;
    border-bottom: 1px solid #ddd;
}
.wd_xjk .left .nianji p {
    margin-left: 20px;
    font-size: 16px;
    padding: 11px 0;
    cursor: pointer;
    color: #333;
}
.wd_xjk .left .nianji .active {
    border-bottom: 2px solid #5ca8e6;
    color: #5ca8e6;
}
.wd_xjk .left .banji {
    width: 100%;
    position: relative;
    padding-bottom: 12px;
    padding-top: 12px;
}
.wd_xjk .left .banji div:nth-child(1) {
    width: 154px;
    height: 26px;
    border: 1px solid #5ca7e5;
    border-radius: 5px;
    margin-left: 20px;
    line-height: 26px;
    padding: 0 5px 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
}
.wd_xjk .left .banji div:nth-child(1) span:last-child {
    color: #8bc0ea;
}
.wd_xjk .left .banji div:nth-child(2) {
    width: 152px;
    max-height: 190px;
    border: 1px solid #5ca8e6;
    position: absolute;
    top: 39px;
    left: 20px;
    background: #fff;
    overflow: auto;
}
.wd_xjk .left .banji div:nth-child(2) p {
    padding: 0 5px 0;
    line-height: 30px;
    cursor: pointer;
}
.wd_xjk .left .banji div:nth-child(2) .active {
    color: #5ca8e6;
}
.wd_xjk .left .banji > p:nth-child(3) {
    position: absolute;
    color: #b2b2b2;
    top: 15px;
    left: 190px;
}
.wd_xjk .left .banji > p:nth-child(4) {
    position: absolute;
    color: #b2b2b2;
    top: 15px;
    right: 20px;
    color: #4e9de3;
    font-size: 14px;
    cursor: pointer;
}
.wd_xjk .left .xuesheng {
    width: 100%;
    margin: 0 auto;
}
.wd_xjk .left .xuesheng .ydr {
    width: 77px;
    cursor: pointer;
    margin: 7px 10px 7px;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    border-radius: 3px;
    padding: 3px 0;
}

.wd_xjk .left .xuesheng .wdr {
    width: 77px;
    margin: 7px 10px 7px;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #eb8814;
    border-radius: 3px;
    cursor: pointer;
    padding: 3px 0;
}
.wd_xjk .left .xuesheng .active {
    background: #eb8814;
    color: #fff;
}
.wd_xjk .left .xuesheng .active1 {
    background: #5295e1;
    color: #fff;
}
.wd_xjk .left .yanse {
    width: 96%;
    padding: 5px 0 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 12px;
}
.wd_xjk .left .yanse p span:nth-child(1) {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: inline-block;
    background: #eb8813;
    margin-right: 5px;
}
.wd_xjk .left .yanse p span:nth-child(2) {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: inline-block;
    background: #2d2d2d;
    margin: 0 5px 0 15px;
}
.wd_xjk .right {
    width: 315px;
}
.wd_xjk .right .shang {
    border-radius: 5px;
    padding-bottom: 12px;
    background: #fff;
    box-shadow: 2px 2px 2px #e7e7e7;
}
.wd_xjk .right .shang > div:nth-child(1) {
    position: relative;
}
.wd_xjk .right .shang > div:nth-child(1) h3 {
    padding: 20px 20px 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
    letter-spacing: 3px;
    color: #333333;
}
.wd_xjk .right .shang > div:nth-child(1) h3 span:nth-last-child(1) {
    cursor: pointer;
}
.wd_xjk .right .shang > div:nth-child(1) h3 span:nth-last-child(2) {
    cursor: pointer;
}
.wd_xjk .right .shang > div:nth-child(1) div:nth-child(2) {
    width: 90%;
    height: 30px;
    border: 1px solid #5ca8e6;
    line-height: 30px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.wd_xjk .right .shang > div:nth-child(1) div:nth-child(3) {
    width: 90%;
    border: 1px solid #ccc;
    box-shadow: 0px 6px 9px 0px rgba(0, 0, 0, 0.13);
    position: absolute;
    left: 50%;
    top: 87px;
    background: #fff;
    transform: translate(-50%);
    box-sizing: border-box;
    padding: 10px;
    color: #5392e1;
    z-index: 10;
    cursor: pointer;
}
.wd_xjk .right .shang > div:nth-child(1) div:nth-child(3) p {
    padding: 6px 0;
}
.wd_xjk .right .shang > div:nth-child(2) {
    width: 100%;
    border-top: 1px solid #ddd;
    margin-top: 10px;
}
.wd_xjk .right .shang .moban {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    padding-top: 20px;
    position: relative;
}
.wd_xjk .right .shang .moban .tupian a:nth-child(1) {
    width: 65px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background: #5392e1;
    border-radius: 3px;
}
.wd_xjk .right .shang .moban:last-child {
    border: none;
}
.wd_xjk .right .shang .moban p:nth-child(1) span:nth-child(1) {
    font-size: 18px;
}
.wd_xjk .right .shang .moban p:nth-child(1) .renshu {
    color: #999;
    margin-left: 10px;
}
.wd_xjk .right .shang .moban p:nth-child(1) .dian {
    color: #0baf97;
    font-size: 30px;
    margin-top: -9px;
    margin-right: 5px;
    cursor: pointer;
}
.wd_xjk .right .shang .moban > div {
    padding: 20px 0 20px;
}
.wd_xjk .right .shang .moban > div a:nth-child(1) {
    width: 65px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 15px;
    color: #5392e1;
    border: 1px solid #5392e1;
    border-radius: 3px;
    cursor: pointer;
}
.wd_xjk .right .shang .moban > div a:last-child {
    color: #0baf97;
    font-size: 16px;
    margin: 5px 0 0 16px;
    cursor: pointer;
}
.wd_xjk .right .shang .moban > div input {
    display: none;
}
.wd_xjk .right .shang .moban > div label {
    width: 65px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background: #5392e1;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
}
.wd_xjk .right .shang .moban .tupian label:nth-child(2) {
    margin-left: 0;
}

.wd_xjk .right .shang .moban .sandian {
    width: 120px;
    position: absolute;
    top: 43px;
    right: 0;
    z-index: 10;
}
.wd_xjk .right .shang .moban .sandian div:nth-child(1) {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #333;
    position: absolute;
    right: 10px;
    top: -5px;
}
.wd_xjk .right .shang .moban .sandian div:nth-child(2) {
    width: 120px;
    height: 65px;
    text-align: center;
    padding: 10px 16px;
    box-sizing: border-box;
    background: #333;
    color: #fff;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    position: absolute;
    top: 0;
}
.wd_xjk .right .shang .moban .sandian div:nth-child(3) {
    width: 120px;
    height: 65px;
    text-align: center;
    padding: 10px 16px;
    box-sizing: border-box;
    background: #333;
    border-radius: 0 0 5px 5px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 65px;
}
.wd_xjk .right .xia {
    border-radius: 5px;
    padding-bottom: 10px;
    background: #fff;
    box-shadow: 2px 2px 2px #e7e7e7;
    margin-top: 10px;
}
.wd_xjk .right .xia > div:nth-child(1) h3 {
    padding: 20px 20px 10px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
}
.wd_xjk .right .xia > div:nth-child(1) h3 span:nth-child(2) {
    cursor: pointer;
}
.wd_xjk .right .xia > div:nth-child(1) h3 span:nth-child(3) {
    cursor: pointer;
}
.wd_xjk .right .xia > div:nth-child(1) div {
    width: 90%;
    height: 30px;
    border: 1px solid #5ca8e6;
    line-height: 30px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px 0;
    display: flex;
    justify-content: space-between;
}
.wd_xjk .right .xia > div:nth-child(2) {
    width: 100%;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}
.wd_xjk .right .xia .xiazai {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    padding-top: 20px;
}
.wd_xjk .right .xia .xiazai:last-child {
    border: none;
}
.wd_xjk .right .xia .xiazai p:nth-child(1) span:nth-child(1) {
    font-size: 16px;
    color: #333333;
    letter-spacing: 3px;
}
.wd_xjk .right .xia .xiazai p:nth-child(1) span:nth-child(2) {
    font-size: 12px;
    color: #999999;
    letter-spacing: 2px;
}
.wd_xjk .right .xia .xiazai > div:nth-child(2) {
    padding: 20px 0 20px;
}
.wd_xjk .right .xia .xiazai > div p:nth-child(1) {
    width: 70px;
    height: 28px;
    border: solid 1px #5093e1;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #5093e1;
    border-radius: 3px;
    cursor: pointer;
}
.wd_xjk .right .xia .xiazai > div p:nth-child(2) {
    width: 70px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #5093e1;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
}

.wd_xjk .right .shang .moban > p:nth-child(4) {
    color: #999;
    margin: -10px 0 10px;
}
.wd_xjk .right .shang .moban  .tprs{
    margin: -20px 0 20px;
    padding: 0;
}
.wd_xjk .right .shang .moban  .tprs p{
    width: 65px;
    color:#999;
    margin-right: 10px;
    text-align: center;
}
.wd_xjk .right .cdsb {
    width: 100%;
    height: 50px;
    background: #0372e8;
    color: #fff;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    letter-spacing: 3px;
    cursor: pointer;
}
.wd_xjk   .baogao .active{
    background: #ddd !important;
    color: #fff !important;
    border:1px solid #ddd !important;
}
.wd_xjk .xuejika {
    width: 875px;
    margin-top: 10px;
    box-shadow: 0px 1px 3px 1px rgba(41, 45, 47, 0.1);
}
</style>
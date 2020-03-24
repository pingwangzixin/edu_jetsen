<template>
    <div>
        
        <!-- 个性发展记录 -->
        <div class='jhf_header ' v-for='(item , index) in list' :key='index+"q"' >
            <p>{{item.name}}{{item.grade}}的个性发展记录</p>
        </div>


        <div class='clearfix'>

            <div class='fl jhf_left'>
                <!-- 推荐 -->
                <div class='jhf_tuijian' >
                    <span class='fl' >共<b class='jhf_b' >{{_comment}}</b>条</span>
                    <b class='fl' >推荐<b class='jhf_b' >{{_arr}}</b>条</b>
                    <label for="jhf_input" class='fr'>只看推荐</label>
                    <input type="checkbox" class='fr jhf_recommend' @click='recommendItem()' v-model="bol" id='jhf_input'>
                </div>
                <!-- 每一条动态 -->
                <div class='fl' >
                    <ul class='jhf_comment' v-for='(item , index) in comment' :key="index+'a'" >
                        <li class='jhf_top fl' >
                            <ul class='fl' >
                                <li class="fl" >
                                    <span class="fl jhf_comment_left_content">{{item.names}}</span>
                                    <ul class="jhf_comment_conter fl">
                                        <li>
                                            <p>
                                                <span class="jhf_comment_name">{{item.name}}</span>
                                                <span
                                                    class="jhf_comment_excellent"
                                                    v-if="item.excellent"
                                                >{{item.excellent}}</span>
                                            </p>
                                            <p class="jhf_comment_conter_one">
                                                <span class="jhf_comment_time">{{item.time}}</span>
                                                <span class="jhf_comment_clbum">{{item.clbum}}</span>
                                            </p>
                                            <p class="jhf_comment_conter_two">
                                                <span class="jhf_comment_theme">{{item.theme}}</span>
                                                <span class="jhf_comment_conteror">{{item.conteror}}</span>
                                            </p>
                                            <p class="jhf_com_four" v-if='item.url'>
                                                <img :src="item.url" alt />
                                            </p>
                                            <span class='jhf_com_yin' @click="hideShow(index,item.id)" :class="item.yincang=='隐藏记录'?'jhf_com_yin':'jhf_com_yincang'">{{item.yincang}}</span>
                                        </li>
                                    </ul>
                                    <span class='jhf_com_span fr'  v-if="item.excellent" @click="cancelRecommend(index,item.id)">取消推荐</span>
                                    <span class='jhf_comment_span fr' v-if="!item.excellent" @click="recommendAtion(index,item.id)">推荐</span>
                                </li>
                                <li class="jhf_comment_footer fl">
                                    <span class="jhf_comment_message fr" @click="doDiscuss(index)">
                                        <i class="iconfont iconliuyan jhf_message"></i> {{item.res.length}}
                                    </span>
                                    <span class="jhf_comment_like fr" @click="doLikes(index,item.id)">
                                        <i
                                            :class="item.isShow1?'active':'jhf_like'"
                                            class="iconfont icondianzan11"
                                        ></i>
                                        {{item.disname.length}}
                                    </span>
                                </li>

                                <!-- 点赞 -->
                                <li class="jhf_discuss_conter jhf_discuss fl" v-show="!item.disname.length==0">
                                    <span v-for="(ele,index1) in item.disname" :key="index1">{{ele}}</span>
                                        觉得很赞
                                </li>

                                <!-- 评论框 -->
                                <li class="jhf_discuss_con fl" v-show="item.isShow2">
                                    <textarea
                                        name
                                        id
                                        cols="110"
                                        rows="2"
                                        class="jhf_dis_text"
                                        v-model="pinglun"
                                    ></textarea>
                                    <span class="fr jhf_dis_sue" @click="remarkSend(index)">评论</span>
                                </li>
                            </ul>
                        </li>
                        <li class='jhf_bottom fl' >
                            <ul class='fl' >
                                <!-- 评论 -->
                                <li
                                    class="jhf_remark fl"
                                    v-show="!item.res.length==0"
                                    v-for="(ele,index2) in item.res"
                                    :key="index2"
                                >
                                    <span class="jhf_remark_cir fl">{{ele.r_names}}</span>
                                    <p class="jhf_remark_one">
                                        <span class="jhf_remark_name">{{ele.r_name}}</span>
                                        <span class="jhf_remark_time">{{ele.r_time}}</span>
                                    </p>
                                    <p class='jhf_remark_ul'>
                                        <span class="jhf_remark_conter fl">{{ele.r_conter}}</span>
                                    </p>
                                    <p class='fr jhf_comment_p ' @click="remarkDel(index,index2,item.id)">
                                        <i class="iconfont iconshanchu fl jhf_shanchu"></i>
                                        <span class=" fr jhf_comment_del">
                                            删除
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="fr">
                <!-- 标签分类 -->
                <div class='jhf_label fr' >
                    <div class='jhf_label_header' >
                        <span>标签分类</span>
                    </div>
                    <div class='jhf_label_all' >
                        <span>全部分类</span>
                    </div>
                    <div class='jhf_label_mora clearfix' v-for='(item , index) in mora' :key="index+'e'" >
                        <ul class='fl' >
                            <li>
                                <p class='jhf_mora_name' >{{item.name}} <span>共1条</span> </p>
                            </li>
                            <li class='fl' >
                                <span class='jhf_mora_tuandui fl' v-for='(item1 ,index1 ) in item.arr' :key="index1" >{{item1}}<span class='jhf_mora_span' >(1)</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name : 'studentPersonalityRecord',
    data(){
        return{
            // 个性发展记录下评论动态发布
            pinglun : "",
            // 只看推荐功能v-model绑定
            bol : false,
            // 模拟数据数组
            arr : [
                {
                    names: "李",
                    name: "李明霖",
                    excellent: "优秀推荐",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初一年级（1）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    yincang : '隐藏记录',
                    disname: ["唐海涛"],
                    id: 1,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: [
                        {
                            r_names: "王",
                            r_name: "王四",
                            r_time: "2017-07-07 15:58:39",
                            r_conter: "这篇文章真的是太好了！"
                        }
                    ]
                },
                {
                    names: "李",
                    name: "李明霖",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初一年级（8）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    yincang : '显示记录',
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 2,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                },
                {
                    names: "李",
                    name: "李明霖",
                    time: "2017-07-07 15:58:39",
                    clbum : '来自 初一年级（3）班',
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    yincang : '显示记录',
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 3,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                },
                {
                    names: "李",
                    name: "李明霖",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初二年级（2）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    yincang : '显示记录',
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 4,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                }
            ],
            // 标签分类数组
            mora : [
                {
                    name : '思想道德',
                    arr : ['#团队特色#','#社团活动#','#主题活动#','#志愿服务#','#其他#']
                },{
                    name : '学业发展',
                    arr : ['#学科活动#','#主动发展#','#科技创新#','#其他#']
                },{
                    name : '艺术素养',
                    arr : ['#艺术作品#','#艺术活动#','#其他#']
                }
            ],
            // 头部数组
            list : [
                {
                    name : '顾晓宇',
                    grade : '第一学年'
                }
            ],
            // 条件筛选之后渲染的数组
            comment : [
                
            ],
        }
    },
    methods: {
        // 只看推荐
        recommendItem() {
            this.arr.forEach(ele=>{
                ele.isShow2 = false;
            })
            if (!this.bol) {
                this.comment = this.arr.filter(ele => {
                    return ele.excellent;
                });
            } else {
                this.comment = this.arr.slice();
            }

        },
        // 评论区评论删除
        remarkDel(index,index1,id) {
            console.log(index,index1,id)
            let _this = this;
			this.$parent.confirmFn('确认要删除吗？',function (state){
				if(state == 'sure'){	
                    _this.$parent.timingFn('success','删除成功！');
                    let a = "";
                    _this.arr.forEach((ele,index1)=>{
                        if(ele.id==id){
                            a = index1;
                        }
                    })
                    _this.comment[index].res.splice(index1,1);
                    _this.arr[a] = _this.comment[index]
				}
			});
        },
        // 点赞，显示与隐藏以及添加点赞人名
        doLikes(index,id) {
            this.comment[index].isShow1 = !this.comment[index].isShow1;
            let a = "";
            this.arr.forEach((ele,ind) => {
                if(ele.id == id){
                    a = ind;
                }
            });
            if (this.comment[index].isShow1) {
                this.comment[index].disname.push('姜慧峰');
            } else {
                this.comment[index].disname.pop();
            }
            this.comment = this.comment.slice();
            this.arr[a] = this.comment[index];
        },
        // 每条个性发展记录下评论框显示与隐藏
        doDiscuss(index) {
            this.comment[index].isShow2 = !this.comment[index].isShow2;
        },
        // 个性发展评论动态发布
        remarkSend(index,id) {
            if(this.pinglun.replace(/\s+/g,"")==""){
                this.$parent.timingFn('warning','请输入评论内容！');
                return
            }
            this.comment[index].isShow2 = !this.comment[index].isShow2;
            let obj = {
                r_names: "姜",
                r_name: "姜慧峰",
                r_time: this.systemTime(),
                r_conter: this.pinglun,
            };
            this.comment[index].res.unshift(obj)
            this.comment = this.comment.slice()
            this.pinglun = ""
            // let a = "";
            // this.arr.forEach((ele,ind) => {
            //     if(ele.id == id){
            //         a = ind;
            //     }
            // });
            // this.arr[a] = this.comment[index];
        },
        // 取消推荐
        cancelRecommend(index,id){
            let a = "";
            this.arr.forEach((ele,index1)=>{
                if(ele.id == id){
                    a = index1;
                }
            })
            delete this.comment[index].excellent;
            this.comment = this.comment.slice();
            this.arr[a] = this.comment[index];
            this.arr = this.arr.slice();
            if (this.bol) {
                this.comment = this.arr.filter(ele => {
                    return ele.excellent;
                });
            }
        },
        // 推荐
        recommendAtion(index,id){
            let a = "";
            this.arr.forEach((ele,index1)=>{
                if(ele.id==id){
                    a = index1;
                }
            })
            this.comment[index].excellent = "优秀推荐";
            this.comment = this.comment.slice();
            this.arr[a] = this.comment[index];
            this.arr = this.arr.slice();
        },
        // 显示隐藏记录
        hideShow(index,id){
            if(this.comment[index].yincang == "显示记录"){
                this.comment[index].yincang = "隐藏记录"
            }else{
                this.comment[index].yincang = "显示记录"
            }
            this.comment = this.comment.slice();
        },
        // 获取系统时间
        systemTime(){
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let h = d.getHours();
            let min = d.getMinutes();
            let s = d.getSeconds();
            if( month < 10 ){
                month = '0' + month;
            }
            if( day < 10 ){
                month = '0' + day;
            }
            if( h < 10 ){
                h = '0' + h;
            }
            if( min < 10 ){
                min = '0' + min;
            }
            if( s < 10 ){
                s = '0' + s;
            }
            var show = "" + year + "-" + month + "-" + day + " " + h + ":" + min + ":" + s + "";
            return show;
        },
    },
    computed: {
        // 显示一共有多少条数据
        _comment() {
            return this.comment.length;
        },
        // 优秀推荐个数
        _arr() {
            return this.arr.filter(ele => {
                return ele.excellent;
            }).length;
        }
    },
    created(){
        this.comment = this.arr.slice();
    }
}
</script>

<style lang="">
    .jhf_left{
        width: 850px;
    }
    /* 标签 */
    .jhf_label{
        width: 340px;
        background: #FFFFFF;
        border-radius: 3px;
        margin-top: 19px;
    }
    .jhf_label_header{
        height: 49px;
        border-bottom: 1px solid #DDDDDD;
        overflow: hidden;
    }
    .jhf_label_header span{
        display: block;
        font-size: 16px;
        color: #333333;
        line-height: 49px;
        margin: 0 0 0 20px;
    }
    .jhf_label_all{
        height: 54px;
        overflow: hidden;
    }
    .jhf_label_all span{
        display: block;
        color: #5093e1;
        font-size: 16px;
        line-height: 54px;
        margin: 0 0 0 21px;
    }
    .jhf_label_mora{
        padding-bottom: 36px;
    }
    .jhf_mora_name{
        color: #333333;
        font-size: 16px;
        margin-left: 21px;
    }
    .jhf_mora_name span{
        color: #999999;
        font-size: 14px;
    }
    .jhf_label_mora > span{
        display: inline-block;
        margin: 15px 0 0 21px;
        cursor: pointer;
    }
    .jhf_mora_span{
        color: #999999;
    }
    .jhf_mora_tuandui{
        margin: 16px 0 0 21px;
        cursor: pointer;
    }

    /* 个性发展记录 */
    .jhf_header{
        color: #333333;
        font-size: 24px;
    }


    /* 推荐 */
    .jhf_tuijian{
        width: 850px;
        height: 50px;
        background: #FFFFFF;
        border-radius: 3px;
        margin-top: 19px;
        overflow: hidden;
    }
    .jhf_tuijian span{
        color: #666666;
        font-size: 14px;
        margin: 0 0 0 23px;
        line-height: 50px;
    }
    .jhf_tuijian b{
        font-size: 14px;
        color: #666666;
        font-weight: 500;
        margin: 0 0 0 8px;
        line-height: 50px;
    }
    .jhf_tuijian label{
        color: #333333;
        font-size: 14px;
        margin: 0 20px 0 0;
        font-style: normal;
        cursor: pointer;
        user-select: none;
        line-height: 50px;
    }
    .jhf_tuijian input{
        margin: 20px 8px 0 0;
    }
    .jhf_tuijian .jhf_b{
        margin: 0;
    }
    .jhf_recommend{
        cursor: pointer;
    }

    
    /* 评论 */
    .jhf_comment {
        background: #ffffff;
        margin-top: 10px;
        border-radius: 3px;
        overflow: hidden;
        width: 850px;
    }
    .jhf_comment_left_content {
        display: block;
        background: #7d8599;
        color: #ffffff;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin: 0 0 0 20px;
        font-size: 24px;
        text-align: center;
        line-height: 52px;
        margin-top: 23px;
    }
    .jhf_comment_conter {
        width: 680px;
        display: block;
        margin: 31px 0 0 13px;
    }
    .jhf_comment_name {
        font-size: 16px;
        color: #4f5355;
    }
    .jhf_comment_excellent {
        background: #fff0e1;
        color: #ff9933;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin: 2px 0 0 7px;
        padding: 3px 12px;
    }
    .jhf_comment_time {
        color: #7f8487;
        font-size: 14px;
    }
    .jhf_comment_clbum {
        color: #7f8487;
        font-size: 14px;
        margin-left: 14px;
    }
    .jhf_comment_theme {
        color: #333333;
        font-size: 16px;
        font-weight: 700;
    }
    .jhf_comment_conteror {
        color: #333333;
        font-size: 16px;
    }
    .jhf_comment_conter_one {
        margin-top: 9px;
    }
    .jhf_comment_conter_two {
        margin-top: 14px;
    }
    .jhf_comment_right {
        width: 71px;
    }
    .jhf_com_four {
        margin-top: 10px;
    }
    .jhf_comment_p{
        color: #f65177;
        margin-right: 25px;
        cursor: pointer;
    }
    .jhf_shanchu{
        margin-top: 1px;
        font-size: 18px;
    }
    .jhf_comment_del {
        display: block;
        color: #f65177;
        font-size: 14px;
        cursor: pointer;
    }
    .jhf_comment_footer {
        width: 850px;
        height: 35px;
    }
    .jhf_comment_like {
        font-size: 14px;
        border-right: 1px solid #7f8487;
        padding-right: 20px;
        color: #7f8487;
        margin-top: 5px;
        cursor: pointer;
    }
    .jhf_like {
        font-size: 14px;
        cursor: pointer;
        color: #7f8487;
    }
    .jhf_comment_like .active {
        color: #ff9933;
        font-size: 14px;
        cursor: pointer;
    }
    .jhf_comment_message {
        font-size: 14px;
        color: #7f8487;
        margin-top: 5px;
        padding-right: 19px;
        cursor: pointer;
    }
    .jhf_message {
        font-size: 14px;
        cursor: pointer;
        color: #7f8487;
        padding-left: 20px;
    }
    .jhf_remark {
        width: 850px;
        border-top: 1px solid #dddddd;
        padding-bottom: 15px;
        background: #ffffff;
    }
    .jhf_remark_cir {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #66b2e8;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        margin: 4px 0 0 23px;
        font-size: 16px;
    }
    .jhf_remark_one {
        margin-top: 4px;
    }
    .jhf_remark_name {
        font-size: 12px;
        margin: 0 0 0 10px;
        color: #333333;
    }
    .jhf_remark_time {
        font-size: 12px;
        color: #7f8487;
        margin: 0 0 0 8px;
    }
    .jhf_remark_conter {
        margin: 5px 0 0 11px;
        color: #333333;
        /* display: block; */
        width: 709px;
    }
    .jhf_discuss {
        width: 820px;
        background: #ffffff;
        border-top: 1px solid #dddddd;
    }
    .jhf_discuss_conter {
        color: #666666;
        margin: 5px 0 5px 0;
        padding-left: 30px;
    }
    .jhf_discuss_conter > span{
        margin-right: 3px;
    }
    .jhf_com_span{
        display: block;
        color: #999999;
        cursor: pointer;
        font-size: 16px;
        margin: 31px 21px 0 0;
    }
    .jhf_com_yin{
        display: block;
        width: 60px;
        height: 18px;
        border: 1px solid #999999;
        color: #999999;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin-top: 13px;
        border-radius: 20px;
        cursor: pointer;
    }
    .jhf_com_yincang{
        display: block;
        width: 60px;
        height: 18px;
        border: 1px solid #5093e1;
        color: #5093e1;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin-top: 13px;
        border-radius: 20px;
        cursor: pointer;
    }
    .jhf_comment_span{
        display: block;
        color: #5093e1;
        cursor: pointer;
        font-size: 16px;
        margin: 31px 21px 0 0;
    }


    /* 评论框 */
    .jhf_discuss_con {
        width: 850px;
        background: #ffffff;
        border-top: 1px solid #dddddd;
    }
    .jhf_dis_text {
        margin: 5px 0 0 20px;
        outline: none;
        line-height: 24px;
        padding-left: 5px;
    }
    .jhf_dis_sue {
        width: 88px;
        height: 32px;
        background: #399fdf;
        color: #ffffff;
        border-radius: 5px;
        line-height: 32px;
        text-align: center;
        margin: 0 20px 5px 0;
        cursor: pointer;
    }
</style>
<template>
    <div>

        <!-- 记录成长轨迹 -->
        <div class="jhf_record">
            <p class="jhf_track">记录您的成长轨迹，说点什么吧！</p>
            <textarea name id cols="100" rows="5" class="jhf_txtarea" v-model="text"></textarea>
            <img src="" ref='imgUploading' alt="" class='jhf_img'>
            <label class="jhf_p_pic fl" for="myFile">
                <i class="iconfont icontupian jhf_pic fl"></i>
                <label class="jhf_span_pic fl" for="myFile">图片</label>
                <input type="file" name="myFile" id="myFile" ref="sc"  @input="getFileContent()" class='jhf_sc'>
            </label>
            <p class="jhf_p_well fl" @click="labelSend">
                <i class="iconfont iconjinghao jhf_well fl"></i>
                <span class="jhf_span_well fl" >标签</span>
            </p>
            <label class="jhf_p_affix fl" for='createFile'>
                <i class="iconfont iconfujian jhf_affix fl"></i>
                <label class="jhf_span_affix fl" for='createFile'>附件</label>
                <input type="file" name='createFile' id='createFile' ref='fj' class='jhf_fj'>
            </label>
            <span class="jhf_issue fr" @click="inFo">发&nbsp;布</span>
        </div>

        <!-- 推荐 -->
        <div class="jhf_recommend">
            <span
                :class="activeRecommend == index ? 'active':''"
                v-for="(item , index) in list"
                :key="index"
                @click="recommendItem(index)"
                class="jhf_recommend_conter"
            >{{item.name}}</span>
            <select name id class="jhf_classify fr">
                <option value>全部分类</option>
                <option value>我</option>
                <option value>班级推荐</option>
                <option value>老师推荐</option>
            </select>
            <select name id class="jhf_grade fr">
                <option value>第一学年</option>
                <option value>第二学年</option>
            </select>
            <span class="jhf_inall fr">
                推荐<b>{{_arr}}</b>条
            </span>
            <span class="jhf_in_all fr">
                共<b>{{_comment}}</b>条
            </span>
        </div>

        <!-- 每一条记录 -->
        <div>

            <ul class="jhf_comment" v-for="(item , index) in comment" :key="index+'a'">
                <li class='jhf_top fl' >
                    <ul class='fl' >
                        <li class="fl">
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
                                </li>
                            </ul>
                            <p class='fr jhf_comment_p '  @click="progressDel(item.id)">
                                <i class="iconfont iconshanchu fl jhf_shanchu"></i>
                                <span class=" fr jhf_comment_del">
                                    删除
                                </span>
                            </p>
                        </li>
                        <li class="jhf_comment_footer fl">
                            <span class="jhf_comment_message fr" @click="doDiscuss(index)">
                                <i class="iconfont iconliuyan jhf_message"></i> {{item.res.length}}
                            </span>
                            <span class="jhf_comment_like fr" @click="doLikes(item.id)">
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

                        <!-- 评论输入框 -->
                        <li class="jhf_discuss_con fl" v-show="item.isShow2">
                            <textarea
                                name
                                id
                                cols="159"
                                rows="2"
                                class="jhf_dis_text"
                                v-model="pinglun"
                            ></textarea>
                            <span class="fr jhf_dis_sue" @click="remarkSend(item.id)">评论</span>
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
                                <span class="jhf_remark_conter">{{ele.r_conter}}</span>
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
export default {
    name: "studentPersonalityRecord",
    data() {
        return {
            // 我、班级推荐、老师推荐 样式切换
            activeRecommend: 0,
            list: [
                { name: "我" },
                { name: "班级推荐" },
                { name: "老师推荐" }
            ],
            // 个性发展记录动态发布
            text: "",
            // 个性发展记录下评论动态发布
            pinglun: "",
            // 条件筛选之后渲染的数组
            comment: [

            ],
        };
    },
    methods: {
        // 我、班级推荐、老师推荐 样式切换
        recommendItem(index) {
			let arr = JSON.parse(localStorage.jhf);
            this.activeRecommend = index;
            if (index == 0) {
                this.comment = arr ;
            } else if (index == 2) {
                this.comment = arr.filter(ele => {
                    return ele.excellent;
                });
            } else if (index == 1) {
                this.comment = arr.filter(ele => {
                    return ele.clbum;
                });
            }
        },
        // 个性发展记录删除
        progressDel(id) {
            let arr = JSON.parse(localStorage.jhf);
            let _this = this;
			this.$parent.confirmFn('确认要删除吗？',function (state){
				if(state == 'sure'){
					// console.log(arr);
                    arr = arr.filter((item, i) => {
						return  item.id != id;
                    });
					// console.log(arr);
					localStorage.jhf = JSON.stringify(arr);
					_this.recommendItem(_this.activeRecommend)
                    _this.$parent.timingFn('success','删除成功！');
				}
            });
        },
        // 点赞，显示与隐藏以及添加点赞人名
        doLikes(id) {
            let a = "";
			let arr = JSON.parse(localStorage.jhf);
            arr.forEach((ele,ind) => {
                if(ele.id == id){
                    a = ind;
                }
            });
			arr[a].isShow1 = !arr[a].isShow1;
			if (arr[a].isShow1) {
			    arr[a].disname.push('姜慧峰');
			} else {
			    arr[a].disname.pop();
			}
			localStorage.jhf = JSON.stringify(arr);
			this.recommendItem(this.activeRecommend);
        },
        // 系统时间获取
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
        // 个性发展textarea动态发布
        inFo() {
            if(this.text.replace(/\s+/g,"")==""){
                this.$parent.timingFn('warning','请输入发布内容！');
                return;
            }
            let obj = {
                names: "李",
                name: "李明霖",
                time: this.systemTime(),
                theme: "#思想道德[主题活动]",
                conteror: this.text,
                isShow1:false,
                isShow2:false,
                disname: [],
                id: new Date().getTime(),
                res: [],
                url : this.$refs.imgUploading.src
            };
			let arr = JSON.parse(localStorage.jhf);
            arr.unshift(obj);
			localStorage.jhf = JSON.stringify(arr);
			this.recommendItem(this.activeRecommend);
            this.text = "";
            this.$refs.imgUploading.src = '';
        },
        // 每条个性发展记录下评论框显示与隐藏
        doDiscuss(index) {
            this.comment[index].isShow2 = !this.comment[index].isShow2;
        },
        // 个性发展评论动态发布
        remarkSend(id) {
            if(this.pinglun.replace(/\s+/g,"")==""){
                this.$parent.timingFn('warning','请输入评论内容！');
                return;
            }
			let arr = JSON.parse(localStorage.jhf);
			let a = "";
			arr.forEach((ele,ind) => {
			    if(ele.id == id){
			        a = ind;
			    }
			});
            arr[a].isShow2 = false;
            let obj = {
                r_names: "姜",
                r_name: "姜慧峰",
                r_time: this.systemTime(),
                r_conter: this.pinglun
            };
			arr[a].res.unshift(obj);
			localStorage.jhf = JSON.stringify(arr);
            this.recommendItem(this.activeRecommend);
            this.pinglun = "";
        },
        // textarea发布中插入#
        labelSend(){
            this.text = this.text + "#";
        },
        // 发布中图片插入
        getFileContent() {
            let _this = this;
            let reader = new FileReader();
            let file = this.$refs.sc.files;
            reader.readAsDataURL(file[0]);
            reader.onload = function () {
                _this.$refs.imgUploading.src = reader.result;
            }
			this.$refs.sc.value= "";
        },
    },
    computed : {
        // 显示一共有多少条数据
        _comment() {
            return this.comment.length;
        },
        // 优秀推荐个数
        _arr() {
            return this.comment.filter(ele => {
                return ele.excellent;
            }).length;
        }
    },
    mounted() {
        this.comment = JSON.parse(localStorage.jhf);
    },
    // localStorage存储
    created(){
		let arr = [
                {
                    names: "李",
                    name: "李朋霖",
                    excellent: "优秀推荐",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初一年级（1）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
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
                    name: "李朋霖",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初一年级（8）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 2,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                },
                {
                    names: "李",
                    name: "李朋霖",
                    time: "2017-07-07 15:58:39",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 3,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                },
                {
                    names: "李",
                    name: "李朋霖",
                    time: "2017-07-07 15:58:39",
                    clbum: "来自 初二年级（2）班",
                    theme: "#思想道德[主题活动]",
                    conteror: "#悲喜自渡，他人难悟",
                    disname: [],
                    url: require("../../../assets/img/comment_pic.jpg"),
                    id: 4,  // 个性发展记录删除用到的id
                    isShow1:false,  // 点赞的显示与隐藏
                    isShow2:false,  // 个性发展记录下评论框的显示与隐藏
                    res: []
                }
            ];
        localStorage.jhf = JSON.stringify(arr);
    },
};
</script>

<style lang="">
    /* 成长轨迹 */
    .jhf_record {
        background: #ffffff;
        border-radius: 3px;
        overflow: hidden;
    }
    .jhf_track {
        font-size: 14px;
        color: #ff9933;
        margin: 15px 0 0 20px;
    }
    .jhf_txtarea {
        width: 1158px;
        height: 106px;
        margin: 10px 0 0 20px;
        outline: none;
        text-align: left;
        padding-left: 5px;
        line-height: 24px;
    }
    .jhf_issue {
        display: block;
        width: 88px;
        height: 32px;
        background: #399fdf;
        color: #ffffff;
        border-radius: 5px;
        line-height: 32px;
        text-align: center;
        margin: 6px 20px 0 0;
        cursor: pointer;
        margin-bottom: 4px;
    }
    .jhf_pic {
        color: #1abc9c;
        font-size: 24px;
    }
    .jhf_p_pic {
        font-size: 14px;
        cursor: pointer;
        margin: 0 0 0 20px;
    }
    .jhf_span_pic {
        margin: 2px 0 0 2px;
        cursor: pointer;
    }
    .jhf_well {
        color: #4579d8;
        font-size: 17px;
    }
    .jhf_p_well {
        margin: 2px 0 0 14px;
        font-size: 14px;
        cursor: pointer;
    }
    .jhf_span_well {
        margin-left: 2px;
    }
    .jhf_affix {
        color: #ff9933;
        font-size: 18px;
    }
    .jhf_p_affix {
        font-size: 14px;
        cursor: pointer;
        margin: 2px 0 0 14px;
    }
    .jhf_span_affix {
        margin-left: 2px;
        cursor: pointer;
    }


    /* 推荐 */
    .jhf_recommend {
        height: 50px;
        background: #ffffff;
        margin-top: 10px;
        border-radius: 3px;
    }
    .jhf_recommend_conter {
        display: inline-block;
        font-size: 16px;
        margin: 0 17px 0;
        height: 28px;
        line-height: 28px;
        margin-top: 11px;
        cursor: pointer;
        padding: 0 13px;
    }
    .jhf_recommend .active {
        background: #399fdf;
        color: #ffffff;
        border-radius: 5px;
    }
    .jhf_inall {
        font-size: 14px;
        margin: 19px 22px 0 0;
        color: #666666;
    }
    .jhf_inall b {
        font-weight: 400;
    }
    .jhf_in_all {
        font-size: 14px;
        margin: 19px 8px 0 0;
        color: #666666;
    }
    .jhf_in_all b {
        font-weight: 400;
    }
    .jhf_grade {
        width: 125px;
        height: 30px;
        outline: none;
        border-color: #5093e1;
        margin: 9px 4px 0 0;
        border-radius: 3px;
        cursor: pointer;
    }
    .jhf_classify {
        width: 125px;
        height: 30px;
        outline: none;
        border-color: #5093e1;
        margin: 9px 20px 0 0;
        border-radius: 3px;
        cursor: pointer;
    }


    /* 评论 */
    .jhf_comment {
        background: #ffffff;
        margin-top: 10px;
        border-radius: 3px;
        overflow: hidden;
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
        width: 1043px;
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
        width: 67px;
    }
    .jhf_com_four {
        margin-top: 10px;
    }
    .jhf_com_four img{
        width: 156px;
        height: 156px;
    }
    .jhf_comment_del {
        display: block;
        color: #f65177;
        font-size: 14px;
        cursor: pointer;
    }
    .jhf_comment_p{
        color: #f65177;
        margin-right: 25px;
        margin-top: 25px;
        cursor: pointer;
    }
    .jhf_shanchu{
        margin-top: 1px;
        font-size: 18px;
    }
    .jhf_comment_footer {
        width: 1200px;
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
        width: 1200px;
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
        margin: 5px 0 0 69px;
        color: #333333;
        display: block;
        width: 1061px;
    }
    .jhf_discuss {
        width: 1170px;
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


    /* 评论框 */
    .jhf_discuss_con {
        width: 1200px;
        background: #ffffff;
        /* height: 83px; */
        /* display: block; */
        /* padding-bottom: 13px; */
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
    .jhf_remark_ul{
        width: 1130px;
    }
    .jhf_img{
        width: 156px;
        height: 156px;
        margin-left: 20px;
    }
    .jhf_sc{
        display: none;
    }
    .jhf_fj{
        display: none;
    }
</style>
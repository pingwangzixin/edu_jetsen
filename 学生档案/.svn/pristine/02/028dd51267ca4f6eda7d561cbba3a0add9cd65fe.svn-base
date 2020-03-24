<template>
    <div>
        <!-- 头部 -->
        <div class="wd_header">提交学籍卡存档</div>
        <div class="wd_main clearfix">
            <!-- 左边 -->
            <div class="wd_left fl">
                <p :class="num==0?'active':''" @click="send(0)">初一年级</p>
                <p :class="num==1?'active':''" @click="send(1)">初二年级</p>
                <p :class="num==2?'active':''" @click="send(2)">初三年级</p>
            </div>
            <!-- 右边 -->
            <div class="wd_right fl">
                <div v-for="(item,index) in arr" :key="index" class="clearfix">
                    <p class="fl">{{item.name}}</p>
                    <p class="fl"></p>
                    <p class="fl">
                        存档完成
                        <span>{{item.num1}}</span>人/共
                        <span>{{item.num2}}</span>人
                    </p>
                    <button class="fr">提交存档</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 左边选择年级
            num: 0,
            // 右边的数据
            arr: [
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                },
                {
                    name: "初一年级(1)班",
                    num1: 0,
                    num2: 11
                }
            ]
        };
    },
    methods: {
        send(index) {
            this.num = index;
        }
    }
};
</script>

<style scoped>
.wd_header {
    width: 1000px;
    height: 50px;
    margin: 0 auto;
    font-size: 18px;
    letter-spacing: 3px;
    color: #ffffff;
    background: #2f4048;
    box-sizing: border-box;
    padding-left: 20px;
    line-height: 50px;
}
.wd_main {
    width: 1000px;
    height: 876px;
    margin: 0 auto;
}
.wd_left {
    width: 186px;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    border-right: 1px solid #ddd;
    padding-top: 14px;
    box-sizing: border-box;
}
.wd_left p {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
}
.wd_left .active {
    background-color: #f6f6f6;
    color: #5093e1;
}
.wd_right {
    width: calc(100% - 187px);
    height: 100%;
    background: #fff;
    overflow: auto;
    box-sizing: border-box;
    padding-bottom: 50px;
}
.wd_right>div{
    width: 703px;
    margin: 45px auto 0;
}
.wd_right>div p:nth-child(1){
    font-size: 16px;
    color: #333333;
}
.wd_right>div p:nth-child(2){
    width: 220px;
	height: 8px;
	background-color: #f1f1f1;
    border-radius: 3px;
    margin: 7px 47px 0 47px;
} 
.wd_right>div p:nth-child(3){
    font-size: 14px;
    color: #666;
}
.wd_right>div button{
    width: 86px;
	height: 30px;
	background-color: #5093e1;
    border-radius: 2px;
    outline: none;
    border: none;
    font-size: 14px;
    color: #ffffff;
    margin-top: -5px;
    cursor: pointer;
    line-height: 30px;
}
</style>
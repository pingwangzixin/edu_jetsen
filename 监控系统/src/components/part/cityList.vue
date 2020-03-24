<template>
  <div class="cityList">
    <div class="fl">
      <div class="province fl">
        <p @click="provinceShow">
          <span class="fl">{{provinceDefault}}</span>
          <span class="fr">
            <i class="iconfont iconxiala"></i>
          </span>
        </p>
        <ul id="provinceUl" v-show="provinceFlag">
          <li
            v-for="(item,index) in provinceList"
            :key="item.code"
            @click="provinceChange(index)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="province fl">
        <p @click="municipalityShow">
          <span class="fl">{{municipalityDefault}}</span>
          <span class="fr">
            <i class="iconfont iconxiala"></i>
          </span>
        </p>
        <ul id="provinceUl" v-show="municipalityFlag">
          <li
            v-for="(item,index) in municipalityList"
            :key="item.code"
            @click="municipalityChange(index)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="province fl">
        <p @click="areaShow">
          <span class="fl">{{areaDefault}}</span>
          <span class="fr">
            <i class="iconfont iconxiala"></i>
          </span>
        </p>
        <ul id="provinceUl" v-show="areaFlag">
          <li
            v-for="(item,index) in areaList"
            :key="item.code"
            @click="areaChange(index)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
import { wordRelevant } from "@/api";
import { mapState ,mapMutations } from "vuex";
export default {
  name: "cityList",
  data() {
    return {
      //城市下拉框是否显示标识
      provinceFlag: false,
      municipalityFlag: false,
      areaFlag: false,
      provinceList: [], //省列表
      municipalityList: [], //市列表
      areaList: [], //区县列表
      provinceCode: "", //当前省 code
      municipalityCode: "", //当前市 code
      areaCode: "", //当前区 code
      provinceDefault: "选择省份/地区", //默认值
      municipalityDefault: "选择市", //默认值
      areaDefault: "选择区/县" //默认值
    };
  },
  created() {
    this.getCityList();
  },
   computed: {
    ...mapState({
        userInfo:state=> state.userInfo
    })
  },
  methods: {
    getCityList() {
      wordRelevant
        .getCityList(this.userInfo)
        .then(res => {
          if (res.status == 200) {
            this.provinceList = res.data.data;
            if (res.data.data.length == 1) {
              //外部三级联动的默认值
              this.provinceDefault = res.data.data[0].name;
              this.provinceCode = res.data.data[0].code;
              this.municipalityList = res.data.data[0].list;
              if (res.data.data[0].list.length == 1) {
                this.municipalityDefault = res.data.data[0].list[0].name;
                this.municipalityCode = res.data.data[0].list[0].code;
                this.areaList = res.data.data[0].list[0].list;
                if (res.data.data[0].list[0].list.length == 1) {
                  this.areaDefault = res.data.data[0].list[0].list[0].name;
                  this.areaCode = res.data.data[0].list[0].list[0].code;
                }
              }
            }
          }
      this.$emit("sendCityCode",{provinceCode:this.provinceCode,areaCode:this.areaCode,municipalityCode:this.municipalityCode,cityList:this.provinceList});
        })
        .catch(e => {});
    },
    //省份点击事件
    provinceShow() {
      this.provinceFlag = !this.provinceFlag;
      this.municipalityFlag = false;
      this.areaFlag = false;
    },
    //省份选择事件
    provinceChange(index) {
      this.municipalityList = this.provinceList[index].list;
      this.provinceDefault = this.provinceList[index].name;
      this.provinceCode = this.provinceList[index].code;
      this.areaCode = "";
      this.municipalityCode = "";
      this.municipalityDefault = "选择市";
      this.areaDefault = "选择区/县";
      this.areaList = [];
      this.provinceShow();
      this.$emit("sendCityCode",{provinceCode:this.provinceCode,areaCode:"",municipalityCode:""});
    },
    //市点击事件
    municipalityShow() {
      if (!this.provinceCode) {
        this.$parent.$parent.timingFn("warning", "请先选择省市/地区");
        return;
      }
      this.municipalityFlag = !this.municipalityFlag;
      this.areaFlag = false;
    },
    //市选择事件
    municipalityChange(index) {
      this.areaList = this.municipalityList[index].list;
      this.municipalityCode = this.municipalityList[index].code;
      this.areaCode = "";
      this.municipalityDefault = this.municipalityList[index].name;
      this.areaDefault = "选择区/县";
      this.municipalityShow();
      this.$emit("sendCityCode",{provinceCode:this.provinceCode,areaCode:"",municipalityCode:this.municipalityCode});
    },
    //区县点击事件
    areaShow() {
      if (!this.municipalityCode) {
        this.$parent.$parent.timingFn("warning", "请先选择市");
        return;
      }
      this.areaFlag = !this.areaFlag;
    },
    //区县选择事件
    areaChange(index) {
      this.areaDefault = this.areaList[index].name;
      this.areaCode = this.areaList[index].code;
      this.areaShow();
      this.$emit("sendCityCode",{provinceCode:this.provinceCode,areaCode:this.areaCode,municipalityCode:this.municipalityCode});
    }
  }
};
</script>


<style scoped>
/* 下拉按钮 */
.province {
  position: relative;
}
.cityList {
  height: 40px;
     width: 756px;
}
.cityList .province p {
  background: #031a46;
  border: none;
  color: #aab9d6;
  margin-right: 10px;
  width: 218px;
  line-height: 40px;
  overflow: hidden;
  padding: 0 9px 0 15px;
  cursor: pointer;
}
.cityList .province #provinceUl {
  width: 226px;
  height: 207px;
  background: #031a46;
  color: #fff;
  border: #20bcff 1px solid;
  padding: 5px 0 5px 13px;
  overflow: auto;
  margin-top: 2px;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 43px;
}
/* 滚动条的颜色 */
#provinceUl::-webkit-scrollbar-thumb {
  background-color: #106e96;
}
/*滚动条的宽度  */
#provinceUl::-webkit-scrollbar {
  width: 15px;
  height: 10px;
}
/* 滚动条滑道的颜色 */
#provinceUl::-webkit-scrollbar-track {
  background: #02102c;
}

.province li {
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.province li:hover {
  color: #254f86;
}
</style>
<template>
  <div class="zk_indexPage">
    <div class="zk_title">
      <!-- 城市列表三级联动 -->
      <CityList class="fl" @sendCityCode="receive" />
      <!-- 下载导入及新增 -->
      <div class="fr downDiv">
        <span class="pointer" @click="downExcel">下载数据模板</span>
        <!-- 导入学校数据 -->
        <ImportSchoolData class="importDivWrapper" />
        <span class="pointer" @click="addSchool">新增学校</span>
      </div>
    </div>

    <!-- 表格数据 -->
    <div class="tableList">
      <table>
        <thead>
          <tr>
            <td v-for="(item,index) in tableData.thead" :key="index">{{item}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.tableList" :key="index">
            <td class="pointer" @click="schoolClick(item)">{{item.name}}</td>
            <td>
              <p>{{item.provinceName+item.municipalityName+item.areaName}}</p>
            </td>
            <td>{{item.levelName}}</td>
            <td>{{item.userCount}}</td>
            <td>{{item.resourceCount}}</td>
            <td>{{item.questionCount}}</td>
            <td>{{item.homeworkCount}}</td>
            <td>{{item.lessonCount}}</td>
            <td>{{item.teachCount}}</td>
            <td>
              <div class="setDiv">
                <i class="iconfont iconbianji pointer fl" @click="updateTableList(index)"></i>
                <i class="iconfont iconshanchu pointer fr" @click="delTableList(index)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增学校 -->
    <div class="hideDiv" v-if="addData.addFlag">
      <div class="addOrChangeSchool">
        <div class="add_title">
          <span class="fl" v-show="!addData.updateTableFlag">新增学校</span>
          <span class="fl" v-show="addData.updateTableFlag">修改学校基础信息</span>
          <span class="fr">
            <i class="iconfont iconyooxi warning pointer" @click="addClose"></i>
          </span>
        </div>
        <div class="add_content">
          <div class="addNameDiv">
            <label for>学校名称：</label>
            <input type="text" placeholder="请输入学校名称" v-model="addData.schoolName" />
            <span class="promptSpan" v-show="addData.schoolNameSpanFlag">请输入学校名称</span>
          </div>
          <div class="addCityWrapper">
            <div class="fl">所处地区：</div>
            <div class="addCity">
              <div class="selectDiv">
                <p @click="addProvinceClick" class="over">
                  <span class="fl">{{addData.provinceDefault}}</span>
                  <span class="fr">
                    <i class="iconfont iconxiala"></i>
                  </span>
                </p>
                <span class="promptSpan" v-show="addData.provinceSpanFlag">请选择所处省</span>

                <ul v-show="addData.provinceFlag">
                  <li
                    v-for="(item,index) in provinceList"
                    :key="item.code"
                    @click="addProvinceChange(index)"
                  >{{item.name}}</li>
                </ul>
              </div>

              <div class="selectDiv">
                <p @click="addCityClick" class="over">
                  <span class="fl">{{addData.municipalityDefault}}</span>
                  <span class="fr">
                    <i class="iconfont iconxiala"></i>
                  </span>
                </p>
                <span class="promptSpan" v-show="addData.municipalitySpanFlag">请选择所处市</span>

                <ul v-show="addData.municipalityFlag">
                  <li
                    v-for="(item,index) in addData.municipalityList"
                    :key="item.code"
                    @click="addCityChange(index)"
                  >{{item.name}}</li>
                </ul>
              </div>
              <div class="selectDiv">
                <p @click="addCountyClick" class="over">
                  <span class="fl">{{addData.areaDefault}}</span>
                  <span class="fr">
                    <i class="iconfont iconxiala"></i>
                  </span>
                </p>
                <span class="promptSpan" v-show="addData.areaSpanFlag">请选择所处地区</span>

                <ul v-show="addData.areaFlag">
                  <li
                    v-for="(item,index) in addData.areaList"
                    :key="item.code"
                    @click="addCountyChange(index)"
                  >{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="addState">
            <span class="fl">所处学段：</span>
            <div class="fr selectDiv">
              <p @click="addStateClick" class="over">
                <span class="fl">{{addData.stateDefault}}</span>
                <span class="fr">
                  <i class="iconfont iconxiala"></i>
                </span>
              </p>
              <span class="promptSpan" v-show="addData.stateSpanFlag">请选择所处学段</span>

              <ul v-show="addData.stateFlag">
                <li
                  v-for="(item,index) in addData.stateList"
                  :key="item.level"
                  @click="addStateChange(index)"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="buttonWrapper">
            <div @click="addSend">确认</div>
            <div @click="addClose">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportSchoolData from "../part/importShoolData";
import CityList from "../part/cityList";
import { wordRelevant } from "@/api";
export default {
  name: "list",
  components: {
    ImportSchoolData,
    CityList
  },
  data() {
    return {
      //列表模拟数据
      tableData: {
        thead: [
          "学校名称",
          "地区",
          "学段",
          "注册人数",
          "资源数",
          "试题数",
          "作业下发",
          "课堂记录",
          "教案教研",
          "操作"
        ],
        tableList: [] //学校列表
      },
      // 新增或者修改所需数据
      addData: {
        provinceList: [], //省列表（以及下级的列表）
        municipalityList: [], //市列表
        areaList: [], //区县列表
        addFlag: false, //添加修改弹出框标识
        updateTableFlag: false, //判断点击的是新增还是修改
        schoolName: "", // 绑定的学校名
        provinceDefault: "选择省份/地区", //默认值
        municipalityDefault: "选择市", //默认值
        areaDefault: "选择区/县", //默认值
        stateDefault: "选择学段", //默认值
        provinceCode: "", //当前省 code
        municipalityCode: "", //当前市 code
        areaCode: "", //当前区 code
        provinceFlag: false, //省份下拉列表的标识
        municipalityFlag: false, //市下拉列表的标识
        areaFlag: false, //区县下拉列表的标识
        stateFlag: false, //学段下拉列表的标识
        schoolNameSpanFlag: false, //学校名称为空标识
        provinceSpanFlag: false, //省份未填的警告标识
        municipalitySpanFlag: false, //市未填的警告标识
        areaSpanFlag: false, //区县未填的警告标识
        stateSpanFlag: false, //学段未填的警告标识

        stateList: [
          //学段信息
          {
            level: 1,
            name: "小学"
          },
          {
            level: 2,
            name: "初中"
          },
          {
            level: 3,
            name: "高中"
          }
        ],
        addInfo: {}, //添加的信息都放在这个对象中
        updateInfo: {} //点击修改按钮时就要修改的信息存放在这个对象中
      }
    };
  },
  methods: {
    //
    getCityList(obj) {
      if(obj)this.provinceList  = obj
        if (this.provinceList.length == 1) {
          //新增修改的默认值
          this.addData.provinceDefault = this.provinceList[0].name;
          this.addData.addInfo.provinceName = this.provinceList[0].name;
          this.addData.addInfo.provinceCode = this.provinceList[0].code;
          this.addData.municipalityList = this.provinceList[0].list;
          if (this.provinceList[0].list.length == 1) {
            //新增修改的默认值
            this.addData.municipalityDefault = this.provinceList[0].list[0].name;
            this.addData.addInfo.municipalityCode =
              this.provinceList[0].list[0].code;
            this.addData.addInfo.municipalityName =
              this.provinceList[0].list[0].name;
            this.addData.areaList = this.provinceList[0].list[0].list;
            if (this.provinceList[0].list[0].list.length == 1) {
              //新增修改的默认值
              this.addData.areaDefault = this.provinceList[0].list[0].list[0].name;
              this.addData.addInfo.areaCode =
                this.provinceList[0].list[0].list[0].code;
              this.addData.addInfo.areaName =
                this.provinceList[0].list[0].list[0].name;
            }
          }else{
               this.addData.areaList = []
          }
      }else{
          this.addData.municipalityList = []
          this.addData.areaList = []
      }
    },
    //外部三级联动接收到子组件的数据
    receive(obj) {

      this.provinceCode = obj.provinceCode;
      this.municipalityCode = obj.municipalityCode;
      this.areaCode = obj.areaCode;
      if(!this.provinceList){
          this.getCityList(obj.cityList)
      }
      this.getSchoolList(obj.provinceCode,obj.municipalityCode,obj.areaCode)
    },
    //获取学校列表
    getSchoolList(provinceCode=this.provinceCode,municipalityCode=this.municipalityCode,areaCode=this.areaCode) {
      wordRelevant
        .getSchoolList({provinceCode,municipalityCode,areaCode})
        .then(res => {
          if (res.status == 200) {
            this.tableData.tableList = res.data.data;
            var arr = ["", "小学", "初中", "高中"];
            this.tableData.tableList.forEach((item, index) => {
              var num = item.level;
              this.tableData.tableList[index].levelName = arr[num];
            });
          }
        })
        .catch(e => {});
    },

    //点击新增学校按钮
    addSchool() {
      this.addData.addFlag = true;
      this.addData.updateTableFlag = false;
      this.addData.schoolNameSpanFlag = false;
      this.addData.provinceSpanFlag = false ;
      this.addData.municipalitySpanFlag = false;
      this.addData.areaSpanFlag = false;
      this.addData.stateSpanFlag = false;
    },
    //点击关闭添加按钮
    addClose() {
      this.addData.addFlag = false;
      this.addData.schoolName = "";
      this.addData.provinceDefault = "选择省份/地区";
      this.addData.municipalityDefault = "选择市";
      this.addData.areaDefault = "选择区/县";
      this.addData.stateDefault = "选择学段";
      this.addData.addInfo = {};
      this.getCityList();
      this.getSchoolList()
    },
    //新增  省点击事件
    addProvinceClick() {
      this.addData.provinceFlag = !this.addData.provinceFlag;
      this.addData.municipalityFlag = false;
      this.addData.areaFlag = false;
    },
    //新增  省选择事件
    addProvinceChange(index) {
      this.addData.addInfo.provinceCode = this.provinceList[index].code;
      this.addData.addInfo.municipalityCode = "";
      this.addData.addInfo.areaCode = "";
      this.addData.addInfo.provinceName = this.provinceList[index].name;
      this.addData.municipalityList = this.provinceList[index].list;
      this.addData.provinceDefault = this.provinceList[index].name;
      this.addData.municipalityDefault = "选择市";
      this.addData.areaDefault = "选择区/县";
      this.addData.areaList = [];
      this.addData.provinceSpanFlag = false;
      this.addProvinceClick();
    },
    //新增  市点击事件
    addCityClick() {
      if (this.addData.municipalityList.length == 0) {
        this.addData.provinceSpanFlag = true;
        return;
      }
      this.addData.municipalityFlag = !this.addData.municipalityFlag;
      this.addData.provinceFlag = false;
      this.addData.areaFlag = false;
    },
    //新增  市选择事件
    addCityChange(index) {
      this.addData.addInfo.municipalityCode = this.addData.municipalityList[
        index
      ].code;
      this.addData.addInfo.municipalityName = this.addData.municipalityList[
        index
      ].name;
      this.addData.addInfo.areaCode = "";
      this.addData.areaList = this.addData.municipalityList[index].list;
      this.addData.municipalityDefault = this.addData.municipalityList[
        index
      ].name;
      this.addData.municipalitySpanFlag = false;
      this.addData.areaDefault = "选择区/县";
      this.addCityClick();
    },
    //新增  区点击事件
    addCountyClick() {
      if (this.addData.areaList.length == 0) {
        this.addData.municipalitySpanFlag = true;
        return;
      }
      this.addData.areaFlag = !this.addData.areaFlag;
    },
    //新增  区选择事件
    addCountyChange(index) {
      this.addData.addInfo.areaCode = this.addData.areaList[index].code;
      this.addData.addInfo.areaName = this.addData.areaList[index].name;
      this.addData.areaDefault = this.addData.areaList[index].name;
      this.addData.areaSpanFlag = false;
      this.addCountyClick();
    },
    //新增  学段点击事件
    addStateClick() {
      this.addData.stateFlag = !this.addData.stateFlag;
    },
    //新增  学段改变事件
    addStateChange(index) {
      this.addData.stateDefault = this.addData.stateList[index].name;
      this.addData.addInfo.level = this.addData.stateList[index].level;
      this.addData.stateSpanFlag = false;
      this.addStateClick();
    },
    // 新增 确定添加   或者确定修改
    addSend() {
      var flag = true;
      if (!this.addData.schoolName) {
        this.addData.schoolNameSpanFlag = true;
        flag = false;
      }
      if (this.addData.areaDefault == "选择区/县") {
        this.addData.areaSpanFlag = true;
        flag = false;
      }
      if (this.addData.stateDefault == "选择学段") {
        this.addData.stateSpanFlag = true;
        flag = false;
      }

      if (!flag) return;
      this.addData.addInfo.name = this.addData.schoolName;
      var _this = this;
      if (!this.addData.updateTableFlag) {
        wordRelevant
          .addSchoolList(this.addData.addInfo)
          .then(res => {
            if (res.status == 200) {
              _this.$parent.timingFn("success", "添加成功！");
              this.addClose();
            }
          })
          .catch(e => {});
      } else {
        //修改
        wordRelevant
          .updateSchoolList(this.addData.addInfo)
          .then(res => {
            if (res.status == 200) {
              _this.$parent.timingFn("success", "修改成功！");
              this.addClose();
            }
          })
          .catch(e => {});
      }
    },
    //删除表格中数据
    delTableList(index) {
      var _this = this;
      _this.$parent.confirmFn("确认要删除吗？", function(state) {
        if (state == "sure") {
         
          wordRelevant
            .delSchoolList(_this.tableData.tableList[index].id)
            .then(res => {
              if (res.status == 200) {
                 _this.$parent.timingFn("success", "删除成功！");
                _this.getSchoolList();
              }
            })
            .catch(e => {});
        }
      });
    },
    // 点击x号
    promptClose() {
      this.promptData.confirmBox.open = false;
    },
    // 点击修改按钮
    updateTableList(index) {
      //清空警告标识
      this.addSchool();
      this.addData.updateTableFlag = true;
      //默认显示
      this.addData.schoolName = this.tableData.tableList[index].name;
      this.addData.provinceDefault = this.tableData.tableList[
        index
      ].provinceName;
      this.addData.municipalityDefault = this.tableData.tableList[
        index
      ].municipalityName;
      this.addData.areaDefault = this.tableData.tableList[index].areaName;
      this.addData.stateDefault = this.tableData.tableList[index].levelName;
      //默认值
      this.addData.addInfo.id = this.tableData.tableList[index].id;
      this.addData.addInfo.name = this.tableData.tableList[index].name;
      this.addData.addInfo.provinceCode = this.tableData.tableList[
        index
      ].provinceCode;
      this.addData.addInfo.provinceName = this.tableData.tableList[
        index
      ].provinceName;
      this.addData.addInfo.municipalityCode = this.tableData.tableList[
        index
      ].municipalityCode;
      this.addData.addInfo.municipalityName = this.tableData.tableList[
        index
      ].municipalityName;
      this.addData.addInfo.areaCode = this.tableData.tableList[index].areaCode;
      this.addData.addInfo.areaName = this.tableData.tableList[index].areaName;
      this.addData.addInfo.Level = this.tableData.tableList[index].level;
    },
    //点击学校名称,进入数据页
    schoolClick(item) {
      this.$router.push({ name: "schoolData", params: { id: item.id } });
    },
    //导出列表excel
    downExcel() {
      if (this.provinceCode && this.municipalityCode && this.areaCode) {
        window.location.href =wordRelevant.dowmUrl +
          "excel?provinceCode=" +
          this.provinceCode +
          "&municipalityCode=" +
          this.municipalityCode +
          "&areaCode=" +
          this.areaCode;
        return;
      }
      if (this.provinceCode && this.municipalityCode) {
        window.location.href =wordRelevant.dowmUrl +
          "excel?provinceCode=" +
          this.provinceCode +
          "&municipalityCode=" +
          this.municipalityCode;
        return;
      }
      if (this.provinceCode) {
        window.location.href =wordRelevant.dowmUrl +
          "excel?provinceCode=" + this.provinceCode;
        return;
      }
      window.location.href = wordRelevant.dowmUrl +"excel";
    }
  },

  created() {},

};
</script>



<style scoped>
.zk_indexPage {
  padding: 20px;
  box-shadow: 0 0 8px #106e96;
}
.zk_title {
  height: 50px;
}
/* 下载按钮 */
.downDiv {
  color: #eb9500;
  line-height: 40px;
}
.downDiv span {
  height: 40px;
  display: block;
  float: left;
  box-sizing: border-box;
  width: 120px;
  text-align: center;
}
.downDiv span:nth-of-type(2) {
  border: 1px solid #eb9500;
  margin: 0 10px;
}
.downDiv span:nth-of-type(3) {
  background: #eb9500;
  color: #fff;
}
.importDivWrapper {
  width: 110px;
}

/* 表格 */

.tableList table {
  color: #20bcff;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
  width: 100%;
  font-size: 12px;
}
.tableList table td p {
  line-height: 24px;
  margin: 8px 0;
}
.tableList table tr:nth-of-type(2n),
thead tr {
  background: #031a46;
}
.tableList tr td:nth-of-type(1) {
  width: 210px;
}
.tableList tr td:nth-of-type(2) {
  width: 150px;
}
.tableList tr td:nth-of-type(3) {
  width: 116px;
}
.tableList tr td:nth-of-type(4) {
  width: 90px;
}
.tableList tr td:nth-of-type(5) {
  width: 96px;
}
.tableList tr td:nth-of-type(6) {
  width: 90px;
}
.tableList tr td:nth-of-type(7) {
  width: 102px;
}
.tableList tr td:nth-of-type(8) {
  width: 98px;
}
.tableList tr td:nth-of-type(9) {
  width: 104px;
}
.tableList tr td:nth-of-type(10) {
  width: 115px;
}
.setDiv {
  width: 46px;
  margin: auto;
}

/* 新增学校弹出框 */
.hideDiv {
  position: fixed;
  z-index: 1003;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
}
.addOrChangeSchool .selectDiv {
  color: #abbad7;
  padding: 0 8px 0 12px;
  height: 24px;
  float: right;
  width: 170px;
  background: #031a46;
  margin-bottom: 8px;
  line-height: 24px;
  cursor: pointer;
  position: relative;
}
.addOrChangeSchool .selectDiv ul {
  position: absolute;
  width: 190px;
  height: 207px;
  background: #031a46;
  z-index: 20;
  left: 0;
  top: 25px;
  overflow: auto;
  text-indent: 10px;
}
.addOrChangeSchool {
  width: 525px;
  height: 316px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  background: #021132;
  color: #20bcff;
  box-shadow: 0 0 3px #fff;
}
.addOrChangeSchool .add_title {
  line-height: 40px;
  height: 40px;
  padding: 0 20px;
  font-size: 15px;
  border-bottom: 2px solid #031e49;
}
.add_content {
  width: 272px;
  margin: 20px auto;
}
.addCityWrapper {
  height: 100px;
  margin-top: 12px;
}

.add_content input {
  height: 24px;
  width: 190px;
  outline: none;
  background: #031a46;
  border: none;
  text-indent: 12px;
  margin-left: 7px;
  color: #abbad7;
}
.add_content input::-webkit-input-placeholder {
  color: #abbad7;
}
input::-moz-input-placeholder {
  color: #abbad7;
}
input::-ms-input-placeholder {
  color: #abbad7;
}

.buttonWrapper div {
  width: 108px;
  height: 31px;
  border-radius: 3px;
  text-align: center;
  line-height: 31px;
  margin-top: 20px;
  cursor: pointer;
}
.buttonWrapper div:nth-of-type(1) {
  float: left;
  background: #eb9500;
  color: #000;
}
.buttonWrapper div:nth-of-type(2) {
  float: right;
  border: #eb9500 1px solid;
  color: #eb9500;
}
.addNameDiv {
  position: relative;
}
.promptSpan {
  position: absolute;
  position: absolute;
  right: -110px;
  top: 0;
  color: #eb9500;
}
</style>

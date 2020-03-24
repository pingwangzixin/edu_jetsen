<template>
  <div class="schoolDataPage">
    <div class="buttonDiv">
      <div>
        <p @click="downExcel" class="fl  downP">下载数据模板</p>
      <ImportSchoolData class="importDivWrapper"/>
      </div>
    </div>
    <div class="dataList">
      <div v-for="(val,key) in schoolData" :key="key">
        <p class="dataModel">{{val.name}}</p>
        <p class="dataTitle">
          <span v-for="(item,index) in val.list" :key="index">
            {{item.name}}
          </span>
        </p>
        <p class="dataCount">
            <span v-for="(item,index) in val.list" :key="index">
            {{item.count}}
          </span>

        </p>
      </div>
    </div>
  </div>
</template>



<script>
import ImportSchoolData from "../part/importShoolData";
import { wordRelevant } from "@/api";
export default {
  name: "schoolData",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      schoolData: {
        user: {
          name: "用户统计",
          list:[]
        },
        resource: {
          name: "资源统计",
          list:[]
        },
        question: {
          name: "试题统计",
           list:[]
        },
        homework: {
          name: "作业统计"
        },
        lesson: {
          name: "课堂记录统计"
        },
        teach: {
          name: "教研统计"
        }
      },
    };
  },
  components: {
    ImportSchoolData
  },
  created() {
    this.getCityList();
  },
  methods: {
    //获取数据
    getCityList() {
      wordRelevant
        .getSchoolData(this.id)
        .then(res => {
          if (res.status == 200) {
           for(var props in this.schoolData){
             this.schoolData[props].list = res.data.data[props]
           }
          }
        })
        .catch(e => {});
    },
    downExcel(){
      window.location.href = wordRelevant.dowmUrl +"excel?id="+this.id
    }
  }
};
</script>




<style scoped>
.schoolDataPage{
  box-shadow: 0 0 8px #106e96;
  padding:20px; 
  line-height: 40px;
}
.buttonDiv{
  height: 88px;

}
.buttonDiv>div{
    width: 310px;
    height: 40px;
    margin: auto;
}
.importDivWrapper{
  width: 140px;
}
.downP{
  width: 140px;
  height: 38px;
  border: #eb9500 1px solid;
  text-align: center;
  margin-right: 26px;
  color: #eb9500;
  cursor: pointer;
}
.dataTitle{
  display: flex;
  justify-content: space-around;
  background: #031a46;
}
.dataCount{
  display: flex;
  justify-content: space-around;
}
.dataList span{
  width: 90px;
  text-align: center;
}
.dataModel{
  color: #eb9500;
    height: 32px;
    line-height: 32px;
    padding-top: 8px;
}
</style>
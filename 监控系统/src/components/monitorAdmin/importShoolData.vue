<template>
<div class="importSchoolData">
    <span class="pointer  importSpan" @click="importFlagChange">导入学校数据</span>
      <div class="hideDiv" v-show="importFlag">
    <div class="importDiv">
      <div class="importTop">
        <span class="fl">导入学校数据</span>
        <span class="fr">
          <i class="iconfont iconyooxi warning pointer" @click="importClose"></i>
        </span>
      </div>
      <div class="importContent" v-show="!uploadingFlag">
        <div v-show="!fileFlag ">
          <p class="addFileWrapper">
            <span>浏览文件</span>或拖入文件
          </p>
          <input
            type="file"
            class="addFile"
            @change="fileChange"
            ref="importFile"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <div v-show="fileFlag " class="addFileWrapper">
          <p>
            确定导入
            <span>{{fileName}}</span> ？
          </p>
        </div>
       
      </div>
       <div class="importContent" v-show="uploadingFlag">
          <p  class="importSuccessP">导入完成,点击确定开始解析</p>
        </div>
      <div class="buttonWrapper importButton">
        <div @click="importSure">确定</div>
        <div @click="importClose">取消</div>
      </div>
    </div>
  </div>

</div>
</template>


<script>
import { wordRelevant } from "@/api";
export default {
  name: "import",
  data() {
    return {
      fileFlag: false,
      fileName: "", //导入文件的名字
      importFlag: false, //导入文件弹窗的标识
      uploadingFlag:false,
      file: "", //导入文件(formData)
      filePath: "" ,//服务端返回的解析路径

    };
  },

  methods: {
    //点击导入按钮
    importFlagChange() {
      this.importFlag = !this.importFlag;
    },
    //取消导入
    importClose() {
      this.fileFlag = false;
      this.importFlag = false;
      this.fileName = "";
      this.file = "";
      this.$refs.importFile.value = "";
      this.filePath = "";
      this.uploadingFlag = false;
    },
    //点击确认上传
    importSure() {
      if (!this.file) return;
      if (!this.filePath) {
        let formData = new FormData();
        formData.append("file", this.file);
        wordRelevant
          .uploadExcel(formData, progressEvent => {
            let complete =
              (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
            console.log("上传 " + complete);
          })
          .then(res => {
            if (res.status == 200) {
              console.log(res);
              this.filePath = res.data.data;
                this.uploadingFlag = true
            }
          })
          .catch(e => {});
      } else {
            this.$parent.$parent.loadingFn(true, "正在解析，请稍后");
        console.log(this.filePath);
        wordRelevant
          .analysisExcel({ path: this.filePath })
          .then(res => {
            if (res.status == 200) {
            this.$parent.$parent.loadingFn(false, "解析完成");
              this.importClose()
              this.$parent.getCityList()
              console.log(res);
            }
          })
          .catch(e => {});
      }
    },
      //  文件选择事件
    fileChange(e) {
      this.fileFlag = true;
      this.fileName = e.target.files[0].name;
      this.file = e.target.files[0];
    },
  }
};
</script>



<style scoped>
/* 导入学校数据 */
.importSchoolData {
    height: 40px;
  float: left;
  box-sizing: border-box;
}
.importSchoolData .importSpan{
  display: block;
  text-align: center;
  background: #eb9500;
    height: 40px;
    line-height: 40px;
  color: #fff;
}
.hideDiv {
  position: fixed;
  z-index: 1003;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
}
.importDiv {
  width: 525px;
  height: 252px;
  border: 1px solid #2c374d;
  box-shadow: 0 0 2px #fff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: #021132;
}
.importTop {
  line-height: 40px;
  height: 40px;
  color: #2b85fe;
  padding: 0 20px;
  font-size: 15px;
  border-bottom: 2px solid #031e49;
}
.addFileWrapper {
  position: absolute;
  top: 40px;
  left: 0;
  color: #fff;
  width: 100%;
  text-align: center;
}
.addFileWrapper span {
  color: #eb9500;
  cursor: pointer;
}
.addFile {
  position: absolute;
  top: 48px;
  left: 55px;
  filter: alpha(opacity=0);
  opacity: 0;
  cursor: pointer;
  z-index: 20;
}
.importContent {
  position: relative;
  width: 482px;
  height: 118px;
  margin: 14px auto 0;
  border: 1px #20bcff dashed;
}
.importSuccessP{
  text-align: center;
  margin-top: 30px;
}
.importButton {
  width: 270px;
  margin: auto;
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
</style>
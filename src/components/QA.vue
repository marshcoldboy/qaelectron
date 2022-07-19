<template>
  <el-card class="box-card">
    <template #header>
      <span style="font-weight: bold;font-size: 15px">电力缺陷问答系统</span>
    </template>
    <div id="dialog_container">
      <div v-for="oneDialog in text_dialog" :key="oneDialog">
        <el-divider content-position="left">{{ user_name }} {{ oneDialog.time }}</el-divider>
        <span id="question_card" style="font-size: 15px">{{ oneDialog.showQuestion }}</span>
        <el-divider content-position="right">电力系统智能助理</el-divider>
        <span id="answer_card">
              <div style="font-size: 15px" v-html="oneDialog.showAnswer"></div>
            </span>
      </div>
    </div>
    <el-divider content-position="right"></el-divider>
    <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入您的问题"
        v-model="txt_question"
    >
    </el-input>
    <el-divider content-position="right">
      <el-button @click="dialogSampleVisible=true">问题样例</el-button>
      <el-button @click="ask_question()">提问</el-button>
    </el-divider>
  </el-card>
  <el-dialog v-model="dialogTableVisible" title="推荐问题">
    <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          property="recommend_question"
          label="问题"
          width="400">
      </el-table-column>
    </el-table>
    <el-button @click="ask_recommend_question()">提问</el-button>
  </el-dialog>
  <el-dialog v-model="dialogSampleVisible" title="问题样例">
    <el-table
        ref="singleTable"
        :data="sampleData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          property="question_type"
          label="问题类型"
          width="100">
      </el-table-column>
      <el-table-column
          property="sample_question"
          label="问题"
          width="400">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "QA",
  data(){
    return{
      dialogSampleVisible: false,
      dialogTableVisible: false,
      tableData: [],
      sampleData: [
        {
          question_type:'包含',
          sample_question:'变电一次设备有哪些类型'
        },
        {
          question_type:'包含',
          sample_question:'主变的冷却器系统有哪些类型'
        },
        {
          question_type:'包含',
          sample_question:'主变的风冷冷却器控制箱有哪些常见缺陷'
        },
        {
          question_type:'分级：危急',
          sample_question:'主变的风冷冷却器控制箱漏油，如何界定为危急缺陷'
        },
        {
          question_type:'属于',
          sample_question:'主变的风冷冷却器控制箱出现漏油速度每滴时间快于5秒，且油位正常的现象，属于那类缺陷'
        }
      ],
      currentRow: null,
      user_name: '您',
      txt_question: '',
      text_dialog: [],
      res:{
        is_recommend:false,
        answer:"答案",
        qnum:0,
        question:[]
      }
    }
  },
  methods: {
    scrollToBottom: function () {
      // 问答的框，每次提问完滚动条滚动到最下方新的消息
      this.$nextTick(() => {
        const div = document.getElementById('dialog_container')
        div.scrollTop = div.scrollHeight
      })

    },
    answer: function () {
      const myDate = new Date();
      this.text_dialog.push({time: myDate.toLocaleString(), showQuestion: this.txt_question, showAnswer: this.res.answer})
      this.scrollToBottom();
      this.txt_question=''
    },
    ask_question() {
      // 提问
      if (this.txt_question === '') {
        alert("输入不能为空")
        return
      }
      // 添加一条 问答对话
      if (this.txt_question !== "") {
        let reqObj = { expression: this.txt_question };
        axios
            .post(`${this.SERVERURL}/qa/get`, reqObj)
            .then((response) => {
              this.res = JSON.parse(response.data);
              // console.log(this.res);
              // this.answer();
              //如果不推荐则回答问题
              if(this.res.is_recommend === false){
                this.answer();
              }
              //如果要推荐则显示推荐问题列表
              else if(this.res.is_recommend === true){
                // console.log(this.res.question)
                this.tableData.splice(0);
                for(let i=0; i<this.res.qnum; i++){
                  this.tableData.push({recommend_question:this.res.question[i]});
                }
                this.dialogTableVisible=true;
              }
            })
            .catch(function (error) {
              console.error(error);
            });
      }
  },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      // console.log(this.currentRow.recommend_question);
    },
    ask_recommend_question() {
      let reqObj = { expression: this.currentRow.recommend_question };
      axios
          .post(`${this.SERVERURL}/qa/get`, reqObj)
          .then((response) => {
            this.res = JSON.parse(response.data);
            // console.log(this.res);
            //如果不推荐则回答问题
            if(this.res.is_recommend === false){
              this.answer();
              this.dialogTableVisible=false;
            }
          })
          .catch(function (error) {
            console.error(error);
          });
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: 2% auto;
  width: 50%;
  min-width: 900px;
  text-align: left;
}

#dialog_container {
  overflow: auto;
  scroll-margin-right: 1px;
  /*根据屏幕占比设置高度*/
  min-height: calc(100vh - 300px);
  max-height: calc(100vh - 300px);
}

</style>

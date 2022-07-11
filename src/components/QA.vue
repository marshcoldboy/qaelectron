<template>
  <el-card class="box-card">
    <template #header>
      <span style="font-weight: bold;font-size: 15px">电力缺陷问答系统</span>
    </template>
    <div id="dialog_container">
      <div v-for="oneDialog in text_dialog" :key="oneDialog">
        <el-divider content-position="left">{{ user_name }} --{{ oneDialog.time }}</el-divider>
        <span id="question_card" style="font-size: 15px">{{ oneDialog.showQuestion }}</span>
        <el-divider content-position="right">回答</el-divider>
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
      <el-button @click="ask_question()">提问</el-button>
    </el-divider>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  name: "QA",
  data(){
    return{
      result:"答案",
      user_name: '默认用户',
      txt_question: '',
      text_dialog: [],
      res:{
        is_recommend:0,
        answer:'',
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
      this.text_dialog.push({time: myDate.toLocaleString(), showQuestion: this.txt_question, showAnswer: this.result})
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
      if (this.txt_question != "") {
        let reqObj = { expression: this.txt_question };
        axios
            .post(`${this.SERVERURL}/qa/get`, reqObj)
            .then((response) => {
              this.result = `${response.data}`;
              // this.res = response.data;
              //如果不推荐则回答问题
              // if(this.res.is_recommend === 0)
              //如果要推荐则显示推荐问题列表
              // else if(this.res.is_recommend === 1)
              this.answer();
            })
            .catch(function (error) {
              console.error(error);
            });
      }
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

<template>
  <h1>问答页面</h1>
  <el-container>
    <el-container>
      <el-aside width="400px">
        <p>请输入您的问题：</p>
        <el-input
            class="question"
            v-model="inputQuestion"
            autosize
            type="textarea"
            placeholder="Please input"
        />
        <p></p>
        <el-row type="flex">
          <el-button type="success">发起提问</el-button>
          <el-button type="success" @click="queryPath = true"
          >查询路径</el-button
          >
          <el-button type="success" @click="dialogVisible = true"
          >问题样例</el-button
          >
        </el-row>
      </el-aside>
      <el-main>
        <table class="demo-border">
          <tbody>
          <tr>
            <td class="text">问题：</td>
            <td class="line">变压器有哪些类型？</td>
          </tr>
          <tr>
            <td class="text">答案：</td>
            <td class="line">油浸变压器、SF6气体绝缘变压器</td>
          </tr>
          <tr>
            <td class="text">问题：</td>
            <td class="line">
              主变的风冷冷却器控制箱漏油,如何界定为危急缺陷？
            </td>
          </tr>
          <tr>
            <td class="text">答案：</td>
            <td class="line">
              漏油形成油流；漏油速度每滴时间快于5秒且油位低于下限
            </td>
          </tr>
          </tbody>
        </table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "QA"
}
</script>

<style scoped>

</style>

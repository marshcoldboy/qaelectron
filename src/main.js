import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

// global variables are defined in main.js
app.config.globalProperties.SERVERURL = "http://127.0.0.1:5000";

app.mount('#app')
app.use(ElementPlus)

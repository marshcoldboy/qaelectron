<template>
  <div>
    <QA></QA>
  </div>
</template>

<script>
import semver from "semver";
import axios from "axios";
import axiosRetry from "axios-retry";

const MIN_API_VERSION = "1.1.0";

import QA from "./components/QA.vue";

export default {
  name: "App",
  components: { QA},
  data() {
    return {
      appPath: "",
    };
  },
  mounted() {
    const client = axios.create({ baseURL: `${this.SERVERURL}` });

    client
      .get("/echo", {
        "axios-retry": {
          retries: 5,
          retryDelay: axiosRetry.exponentialDelay,
        },
      })
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${this.SERVERURL}/api_version`)
          .then((response) => {
            if (
              semver.lte(
                semver.clean(MIN_API_VERSION),
                semver.clean(response.data)
              )
            ) {
              console.log("API version satisfied");
            } else {
              alert("Invalid API version");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    window.ipcRenderer.send("getAppPath");

    window.ipcRenderer.on("getAppPathResponse", (appPath) => {
      this.appPath = appPath;
    });
  },
};
</script>

<style>
body {
  background: var(--color-bg);
  color: var(--color-text);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text);
}
</style>

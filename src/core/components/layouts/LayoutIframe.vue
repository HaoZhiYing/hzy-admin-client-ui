<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Tools from "@/core/utils/Tools";

const isPro = process.env.NODE_ENV == "production";
const token = ref(Tools.getAuthorization());
const loading = ref(true);
const iframe = ref<HTMLElement>();

onMounted(() => {
  token.value = Tools.getAuthorization();
  if (iframe.value) {
    // 处理兼容行问题
    if (Object.prototype.hasOwnProperty.call(iframe, "attachEvent")) {
      iframe.value.addEventListener("onload", () => {
        // iframe加载完毕以后执行操作
        loading.value = false;
      });
    } else {
      iframe.value.onload = function () {
        // iframe加载完毕以后执行操作
        loading.value = false;
      };
    }
  }
});

/**
 * 获取新地址
 * @param url
 * @param menuId
 */
function getUrl(urlDev: string, urlPro: string, menuId: number) {
  if (isPro) {
    urlPro = urlPro.replace("{menuid}", menuId.toString());
    urlPro = urlPro.replace("{token}", token.value);
    return urlPro;
  } else {
    if (urlDev) {
      urlDev = urlDev.replace("{menuid}", menuId.toString());
      urlDev = urlDev.replace("{token}", token.value);
      return urlDev;
    } else {
      urlPro = urlPro.replace("{menuid}", menuId.toString());
      urlPro = urlPro.replace("{token}", token.value);
      return urlPro;
    }
  }
}
</script>

<template>
  <!-- iframe 处理 -->
  <a-spin :spinning="loading">
    <iframe ref="iframe" :src="getUrl($route.meta.moduleUrl!, $route.meta.moduleUrlPro!,  $route.meta.menuId!)" frameBorder="0"></iframe>
  </a-spin>
</template>

<style lang="less" scoped>
iframe {
  width: 100%;
  height: calc(100vh - 90px);
}
</style>

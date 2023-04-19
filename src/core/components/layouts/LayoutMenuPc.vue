<script lang="ts" setup>
import MenuStore from "@/core/store/layouts/MenuStore";
import LayoutMenuVue from "./menus/LayoutMenu.vue";
import { theme } from "ant-design-vue";
import LayoutLogoVue from "./LayoutLogo.vue";

const menuStore = MenuStore();

const { useToken } = theme;
const { token } = useToken();
</script>

<template>
  <a-layout-sider
    hasSider
    :theme="'light'"
    v-model:collapsed="menuStore.state.isCollapse"
    :collapsedWidth="menuStore.state.width"
    :width="menuStore.state.width"
    class="hzy-menu"
    style="overflow: hidden; overflow-y: auto; height: 100vh"
    :style="{ backgroundColor: token.Menu?.colorItemBg }"
  >
    <LayoutLogoVue />
    <LayoutMenuVue />
  </a-layout-sider>
</template>

<style lang="less" scoped>
.hzy-logo {
  font-weight: bold;
  font-size: 20px;
  min-height: 90px;
}
</style>

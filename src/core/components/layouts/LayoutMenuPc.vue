<script lang="ts" setup>
import { computed } from "vue";
import CoreStore from "@/core/store/layouts/CoreStore";
import MenuStore from "@/core/store/layouts/MenuStore";
import AppStore from "@/core/store/AppStore";
import LayoutMenuVue from "./menus/LayoutMenu.vue";
import AppConsts from "@/utils/AppConsts";
import ThemeStore from "@/core/store/layouts/ThemeStore";

const coreStore = CoreStore();
const menuStore = MenuStore();
const appStore = AppStore();
const themeStore = ThemeStore();
const _isDark = computed(() => themeStore.state.isDark);
</script>

<template>
  <a-layout-sider
    hasSider
    v-model:collapsed="menuStore.state.isCollapse"
    :collapsedWidth="menuStore.state.width"
    :theme="menuStore.themeType()"
    :width="menuStore.state.width"
    style="overflow: hidden; overflow-y: auto; height: 100vh"
    :style="{ backgroundColor: menuStore.menuCustomThemes[menuStore.state.menuCustomThemesIndex]?.backgroundColor }"
    class="hzy-menu"
  >
    <div class="hzy-logo" :style="{ color: _isDark ? '#ffffff' : '' }" v-if="!menuStore.state.isCollapse">
      {{ AppConsts.appTitle }}
    </div>
    <LayoutMenuVue />
  </a-layout-sider>
</template>

<style lang="less" scoped>
.hzy-logo {
  font-weight: bold;
  font-size: 20px;
}
</style>

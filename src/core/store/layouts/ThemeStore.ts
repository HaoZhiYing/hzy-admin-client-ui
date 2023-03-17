import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { theme as antdTheme } from "ant-design-vue";

export type ThemeName = "light" | "dark" | "compact";

interface IState {
  isDark: boolean;
}

export default defineStore("ThemeStore", () => {
  const state = reactive<IState>({
    isDark: false, // 默认 暗黑
  });

  const getAlgorithm = (themes: ThemeName[] = []) =>
    themes.map((theme) => {
      if (theme === "dark") {
        return antdTheme.darkAlgorithm;
      }
      if (theme === "compact") {
        return antdTheme.compactAlgorithm;
      }
      return antdTheme.defaultAlgorithm;
    });

  const themeConfig = computed(() => (state.isDark ? getAlgorithm(["dark"]) : getAlgorithm(["light"])));

  /**
   * 主题改变
   * @param isDark
   */
  function changeTheme(isDark: boolean) {
    state.isDark = isDark;
    console.log(state.isDark);
  }

  return {
    state,
    themeConfig,
    changeTheme,
  };
});

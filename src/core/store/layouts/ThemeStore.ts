import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { theme as antdTheme } from "ant-design-vue";
import AppConsts from "@/utils/AppConsts";
import { onMounted } from "vue";

export type ThemeName = "light" | "dark" | "compact";

interface IState {
  isDark: boolean;
  tokenTheme?: ITokenTheme;
  menuTheme: IMenuTheme;
}

class ITokenTheme {
  colorPrimary: string = "#2f54eb";
  //
  // colorBgLayout: "red",
  // paddingXXS: 16,
  // paddingXS: 16,
  // paddingSM: 16,
  // padding: 16,
  // paddingMD: 16,
  // paddingLG: 16,
  // paddingXL: 16,
}

/**
 * 菜单主题接口
 */
interface IMenuTheme {
  // 菜单项背景色
  colorItemBg?: string;
  // 背景色 hover
  colorItemBgHover?: string;
  // 选中背景色
  colorItemBgSelected?: string;
  // 文本色
  colorItemText?: string;
  // 文本 hover
  colorItemTextHover?: string;
  // 文本选中
  colorItemTextSelected?: string;
}

export default defineStore("ThemeStore", () => {
  var tokenTheme = new ITokenTheme();

  const menuThemeList: IMenuTheme[] = [
    // 白色
    {},
    // antd 暗色菜单
    {
      colorItemBg: "#001529",
      colorItemBgSelected: tokenTheme.colorPrimary,
      colorItemBgHover: "rgba(0, 0, 0, 0.06)",
      colorItemText: "#ffffffa6",
      colorItemTextHover: "#ffffff",
      colorItemTextSelected: "#ffffff",
    },
    // element+ 官方自定义颜色风格
    {
      colorItemBg: "#545c64",
      colorItemBgSelected: tokenTheme.colorPrimary,
      colorItemBgHover: "rgba(0, 0, 0, 0.06)",
      colorItemText: "#ffffffa6",
      colorItemTextHover: "#fff",
      colorItemTextSelected: "#fff",
    },
    // iview 菜单风格
    {
      colorItemBg: "#191a23",
      colorItemBgSelected: tokenTheme.colorPrimary,
      colorItemBgHover: "rgba(0, 0, 0, 0.06)",
      colorItemText: "#ffffffa6",
      colorItemTextHover: "#fff",
      colorItemTextSelected: "#fff",
    },
  ];

  const state = reactive<IState>({
    isDark: false,
    tokenTheme,
    menuTheme: menuThemeList[3],
  });

  onMounted(() => {
    let index = ThemeCacheUtil.getMenuCustomThemesIndex();
    state.menuTheme = menuThemeList[index];
    let isDark = ThemeCacheUtil.getIsDark();
    state.isDark = isDark;
  });

  //
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
    ThemeCacheUtil.setIsDark(isDark);
  }

  /**
   * 切换菜单主题
   * @param index
   */
  function changeMenuTheme(index: number) {
    state.menuTheme = menuThemeList[index];
    ThemeCacheUtil.setMenuCustomThemesIndex(index);
  }

  return {
    state,
    themeConfig,
    menuThemeList,
    changeTheme,
    changeMenuTheme,
  };
});

/**
 * 主题缓存工具
 */
class ThemeCacheUtil {
  /**
   * 持久化保存自定义颜色状态
   * @param index
   */
  static setMenuCustomThemesIndex(index: number) {
    localStorage.setItem(`${AppConsts.appPrefix}_menu_custom_themes_index`, index.toString());
  }

  /**
   * 获取 index
   * @returns
   */
  static getMenuCustomThemesIndex(): number {
    var index = localStorage.getItem(`${AppConsts.appPrefix}_menu_custom_themes_index`);
    if (index == null || index == undefined || index == "") return 0;
    return parseInt(index);
  }

  /**
   * 设置主题
   * @param isDark
   */
  static setIsDark(isDark: boolean) {
    localStorage.setItem(`${AppConsts.appPrefix}_theme_is_dark`, (isDark ? 1 : 0).toString());
  }

  /**
   * 获取主题
   * @returns
   */
  static getIsDark() {
    var result = localStorage.getItem(`${AppConsts.appPrefix}_theme_is_dark`);
    return result == "1";
  }
}

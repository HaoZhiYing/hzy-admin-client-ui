import { DefaultUserInfo } from "@/core/store/AppStore";
import Http from "@/core/utils/Http";
//菜单数据
import menuTreeList from "@/core/mock/MenuData";
import ApiResult from "@/core/typings/ApiResult";

/**
 * 用户服务
 */
export default class SysUserService {
  static urlPrefix = "/api/v1/admin/SysUser";

  /**
   * 获取数据列表
   * @param current
   * @param pageSize
   * @param search
   * @param searchSort
   * @returns
   */
  static findList(current: number, pageSize: number, search: any = {}, searchSort: any[] = []) {
    return Http.post(`${this.urlPrefix}/findList`, {
      page: current,
      size: pageSize,
      search,
      searchSort,
    });
  }

  /**
   * 删除集合数据
   *
   * @param ids
   * @returns
   */
  static deleteList(ids: string[]) {
    return Http.post(`${this.urlPrefix}/deleteList`, ids);
  }

  /**
   * 查询表单
   *
   * @param id
   * @returns
   */
  static findForm(id?: string | undefined) {
    return Http.get(`${this.urlPrefix}/findForm${id ? "/" + id : ""}`);
  }

  /**
   * 保存表单数据
   *
   * @param id
   * @param formData
   * @returns
   */
  static saveForm(id: string | undefined, formData: any) {
    return Http.post(`${this.urlPrefix}/${id ? "update" : "create"}`, formData);
  }

  /**
   * 导出 excel
   * @param search
   * @param searchSort
   * @returns
   */
  static exportExcel(search: any = {}, searchSort: any[] = []) {
    return Http.download(`${this.urlPrefix}/exportExcel`, {
      page: -1,
      size: -1,
      search,
      searchSort,
    });
  }

  /**
   * 获取当前用户信息
   * @returns
   */
  static currentUser() {
    // return Http.get(`${this.urlPrefix}/info`);

    // 静态 mock 数据
    var defaultUserInfo = new DefaultUserInfo();
    defaultUserInfo.menus = [...menuTreeList];
    console.log("defaultUserInfo = ", defaultUserInfo);
    return new Promise<ApiResult<any>>((resolve) => {
      resolve({
        code: 1,
        data: defaultUserInfo,
        message: "success",
      });
    });
  }
}

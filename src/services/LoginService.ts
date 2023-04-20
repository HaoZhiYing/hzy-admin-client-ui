import ApiResult from "@/core/typings/ApiResult";
import Http from "@/core/utils/Http";

/**
 * 登录服务
 */
export default class LoginService {
  static urlPrefix = "/api/v1/identity/Account";

  /**
   * 登录
   * @param userName
   * @param userPassword
   * @returns
   */
  static login(userName: string, userPassword: string) {
    // return Http.post(`${this.urlPrefix}/Login`, {
    //   userName,
    //   userPassword,
    // });
    return new Promise<ApiResult<any>>((resolve) => {
      resolve({
        code: 1,
        data: { token: "test" },
        message: "success",
      });
    });
  }
}

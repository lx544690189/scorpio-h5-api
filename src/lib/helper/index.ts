import { Inject, Provide } from '@midwayjs/decorator';

@Provide()
export class Helper {
  /**
   * 接口返回成功
   */
  success(data: object = {}) {
    return {
      code: 0,
      data,
    };
  }

  /**
   * 接口返回失败
   */
  error(errmsg: string, code?: number) {
    return {
      code: code !== undefined ? code : 2001,
      errmsg,
    };
  }
}

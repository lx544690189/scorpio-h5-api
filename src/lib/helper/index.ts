import { Provide } from '@midwayjs/decorator';
import { ErrorShowType } from '../../app/types/common';

@Provide()
export class Helper {
  /**
   * 接口返回成功
   */
  success(data: object = {}) {
    return {
      success: true,
      data,
      showType: ErrorShowType.SILENT,
    };
  }

  /**
   * 接口返回失败
   */
  error(errorMessage: string, showType?: ErrorShowType) {
    return {
      success: false,
      errorMessage,
      showType: showType || ErrorShowType.ERROR_MESSAGE,
    };
  }
}

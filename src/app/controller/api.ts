import { Inject, Controller, Provide, Query, Get } from '@midwayjs/decorator';
import { Helper } from '../../lib/helper';
import { PageService } from '../service/page';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  pageService: PageService;

  @Inject()
  helper: Helper;

  @Get('/page/getSchema')
  async getUser(@Query() id: string) {
    const result = await this.pageService.queryById(id);
    if (result) {
      return this.helper.success(result);
    } else {
      return this.helper.error('页面不存在');
    }
  }
}

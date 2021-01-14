import {
  Inject,
  Controller,
  Post,
  Provide,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { Helper } from '../../lib/helper';
import { PageDTO } from '../dto';
import { PageService } from '../service/page';

@Provide()
@Controller('/page')
export class PageController {
  @Inject()
  ctx: Context;

  @Inject()
  pageService: PageService;

  @Inject()
  helper: Helper;

  /**
   * 新增
   */
  @Post('/add')
  async addComponent(@Body(ALL) page: PageDTO) {
    const result = await this.pageService.create(page);
    return this.helper.success(result);
  }

  /**
   * 修改
   */
  @Post('/edit')
  async editComponent(@Body(ALL) page: PageDTO) {
    const result = await this.pageService.edit(page);
    return this.helper.success(result);
  }

  /**
   * 查询
   */
  @Post('/detail')
  async queryComponent(@Body() _id: string) {
    const result = await this.pageService.queryById(_id);
    if (result) {
      return this.helper.success(result);
    } else {
      return this.helper.error('页面不存在');
    }
  }

  /**
   * 删除
   */
  @Post('/delete')
  async deleteComponent(@Body() _id: string) {
    const result = await this.pageService.delete(_id);
    return this.helper.success(result);
  }
}

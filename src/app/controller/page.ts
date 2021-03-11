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
   * 查询列表
   */
  @Post('/list')
  async queryList(@Body() isTemplate: boolean) {
    const result = await this.pageService.queryList({ isTemplate });
    return this.helper.success(result);
  }

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
    if (
      [
        '6045d54edf8e607d29d0bffc',
        '6045e4649f610c2ea68905ef',
        '6045ec66d8359437ba855b5d',
      ].includes(page._id)
    ) {
      return this.helper.error('示例页面，不允许操作');
    }
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
    return this.helper.error('演示项目，不允许操作');
  }

  /**
   * 是否设为模板
   */
  @Post('/togglePageTemplate')
  async togglePageTemplate(@Body() _id: string, @Body() isTemplate: boolean) {
    const result = await this.pageService.editIsTemplate(_id, isTemplate);
    return this.helper.success(result);
  }
}

import { Inject, Controller, Post, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Helper } from '../../lib/helper';
import { ComponentService } from '../service/component';

@Provide()
@Controller('/component')
export class ComponentController {
  @Inject()
  ctx: Context;

  @Inject()
  componentService: ComponentService;

  @Inject()
  helper: Helper;

  @Post('/category/add')
  async addComponentCategory() {
    const result = await this.componentService.addComponentCategory();
    return this.helper.success(result);
  }
}

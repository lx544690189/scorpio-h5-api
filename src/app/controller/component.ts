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
import { ComponentService } from '../service/component';
import { ComponentDTO } from '../dto';
import { CategoryService } from '../service/category';

@Provide()
@Controller('/component')
export class ComponentController {
  @Inject()
  ctx: Context;

  @Inject()
  componentService: ComponentService;
  @Inject()
  categoryService: CategoryService;

  @Inject()
  helper: Helper;

  /**
   * 新增组件
   */
  @Post('/add')
  async addComponent(@Body(ALL) component: ComponentDTO) {
    const category = await this.categoryService.queryCategoryById(
      component.categoryId
    );
    if (!category) {
      return this.helper.error('分类ID不存在！');
    }
    const result = await this.componentService.addComponent(component);
    return this.helper.success(result);
  }

  /**
   * 修改组件
   */
  @Post('/edit')
  async editComponent(@Body(ALL) component: ComponentDTO) {
    const result = await this.componentService.editComponent(component);
    return this.helper.success(result);
  }

  /**
   * 查询组件
   */
  @Post('/detail')
  async queryComponent(@Body() _id: string) {
    const result = await this.componentService.queryComponentById(_id);
    if (result) {
      return this.helper.success(result);
    } else {
      return this.helper.error('组件不存在');
    }
  }

  /**
   * 删除组件
   */
  @Post('/delete')
  async deleteComponent(@Body() _id: string) {
    const result = await this.componentService.deleteComponent(_id);
    return this.helper.success(result);
  }
}

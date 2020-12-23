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
import { ComponentCategoryDTO, ComponentDTO } from '../dto';
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

  /**
   * 新增分类
   */
  @Post('/category/add')
  async addCategory(@Body(ALL) category: ComponentCategoryDTO) {
    const { categoryName } = category;
    const exist = await this.componentService.queryCategoryByName(categoryName);
    if (exist) {
      return this.helper.error('名称已存在');
    }
    const result = await this.componentService.addCategory(category);
    return this.helper.success(result);
  }

  /**
   * 查询分类
   */
  @Post('/category/list')
  async queryCategoryList(@Body() categoryName: string) {
    const result = await this.componentService.queryCategoryList({
      categoryName,
    });
    return this.helper.success(result);
  }

  /**
   * 新增组件
   */
  @Post('/component/add')
  async addComponent(
    @Body('categoryId') categoryId: string,
    @Body('component') component: ComponentDTO
  ) {
    const result = await this.componentService.addComponent(
      categoryId,
      component
    );
    return this.helper.success(result);
  }

  /**
   * 修改组件
   */
  @Post('/component/edit')
  async editComponent(
    @Body('categoryId') categoryId: string,
    @Body('component') component: ComponentDTO
  ) {
    const result = await this.componentService.editComponent(
      categoryId,
      component
    );
    return this.helper.success(result);
  }
}

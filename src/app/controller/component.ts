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
@Controller('/category')
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
  @Post('/add')
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
  @Post('/list')
  async queryCategoryList(@Body() categoryName: string) {
    const result = await this.componentService.queryCategoryList({
      categoryName,
    });
    return this.helper.success(result);
  }

  /**
   * 修改分类
   */
  @Post('/edit')
  async editCategory(@Body() categoryId: string, @Body() categoryName: string) {
    const result = await this.componentService.editCategory(
      categoryId,
      categoryName
    );
    if (result) {
      return this.helper.success();
    } else {
      return this.helper.error('修改失败');
    }
  }

  /**
   * 删除分类
   */
  @Post('/delete')
  async deleteCategory(@Body() categoryId: string) {
    const result = await this.componentService.deleteCategory(categoryId);
    if (result) {
      return this.helper.success();
    } else {
      return this.helper.error('修改失败');
    }
  }

  /**
   * 新增组件
   */
  @Post('/component/add')
  async addComponent(
    @Body() categoryId: string,
    @Body() component: ComponentDTO
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
    @Body() categoryId: string,
    @Body() component: ComponentDTO
  ) {
    const result = await this.componentService.editComponent(
      categoryId,
      component
    );
    return this.helper.success(result);
  }

  /**
   * 查询组件
   */
  @Post('/component/detail')
  async queryComponent(@Body() componentId: string) {
    const result = await this.componentService.queryComponentById(componentId);
    if (result) {
      return this.helper.success(result);
    } else {
      return this.helper.error('组件不存在');
    }
  }
}

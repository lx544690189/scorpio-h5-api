import { Inject, Controller, Post, Provide, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Helper } from '../../lib/helper';
import { CategoryService } from '../service/category';

@Provide()
@Controller('/category')
export class CategoryController {
  @Inject()
  ctx: Context;

  @Inject()
  categoryService: CategoryService;

  @Inject()
  helper: Helper;

  /**
   * 新增分类
   */
  @Post('/add')
  async addCategory(@Body() name: string) {
    return this.helper.error('演示项目，不允许操作');
  }

  /**
   * 查询分类
   */
  @Post('/list')
  async queryCategoryList(@Body() name: string) {
    const result = await this.categoryService.queryCategoryList({
      name,
    });
    return this.helper.success(result);
  }

  /**
   * 修改分类
   */
  @Post('/edit')
  async editCategory(@Body() _id: string, @Body() name: string) {
    return this.helper.error('演示项目，不允许操作');
  }

  /**
   * 删除分类
   */
  @Post('/delete')
  async deleteCategory(@Body() _id: string) {
    return this.helper.error('演示项目，不允许操作');
  }

  /**
   * 查询分类+组件
   */
  @Post('/queryAllWithComponent')
  async queryAllWithComponent() {
    const result = await this.categoryService.queryAllWithComponent();
    return this.helper.success(result);
  }
}

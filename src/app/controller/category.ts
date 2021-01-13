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
    const exist = await this.categoryService.queryCategoryByName(name);
    if (exist) {
      return this.helper.error('名称已存在');
    }
    const result = await this.categoryService.addCategory({ name });
    return this.helper.success(result);
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
    const result = await this.categoryService.editCategory(_id, name);
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
  async deleteCategory(@Body() _id: string) {
    const result = await this.categoryService.deleteCategory(_id);
    if (result) {
      return this.helper.success();
    } else {
      return this.helper.error('修改失败');
    }
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

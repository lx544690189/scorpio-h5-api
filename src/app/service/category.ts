import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';
import { CATEGORY_STATUS } from '../types';

@Provide()
export class CategoryService {
  @Inject()
  private categoryModel!: typeof mongoose.Model;

  async addCategory(category: { name: string }) {
    const result = await this.categoryModel.create(category);
    return result;
  }

  async queryCategoryById(_id: string) {
    const result = await this.categoryModel.findById(_id);
    return result;
  }

  async queryCategoryByName(name: string) {
    const result = await this.categoryModel.findOne({
      name,
      status: CATEGORY_STATUS.initial,
    });
    return result;
  }

  async queryCategoryList({ current = 1, pageSize = 10, name = '' }) {
    const condition: {
      name?: RegExp;
      status: CATEGORY_STATUS;
    } = {
      status: CATEGORY_STATUS.initial,
    };
    if (name) {
      condition.name = new RegExp(name, 'i');
    }
    const list = await this.categoryModel
      .find(condition)
      // .sort({ createdAt: -1 })
      .skip(pageSize * (current - 1))
      .limit(pageSize);
    const total = await this.categoryModel.find(condition).countDocuments();
    return {
      list,
      total,
    };
  }

  async editCategory(_id: string, name: string) {
    const result = await this.categoryModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          name,
        },
      }
    );
    return result;
  }

  async deleteCategory(_id: string) {
    const result = await this.categoryModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          status: CATEGORY_STATUS.delete,
        },
      }
    );
    return result;
  }

  async queryAllWithComponent() {
    const result = await this.categoryModel.aggregate([
      {
        $lookup: {
          from: 'component',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'components',
        },
      },
    ]);
    // 过滤已删除组件
    return result.map(category => {
      category.components = category.components.filter(
        component => component.status === CATEGORY_STATUS.initial
      );
      return category;
    });
  }
}

import { COMPONENT_STATUS } from './../types/index';
import { ComponentCategoryDTO, ComponentDTO } from './../dto/index';
import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';
import { CATEGORY_STATUS } from '../types';

@Provide()
export class ComponentService {
  @Inject()
  private componentModel!: typeof mongoose.Model;

  async addCategory(category: ComponentCategoryDTO) {
    const result = await this.componentModel.create(category);
    return result;
  }

  async queryCategoryById(_id: string) {
    const result = await this.componentModel.findById(_id);
    return result;
  }

  async queryCategoryByName(categoryName: string) {
    const result = await this.componentModel.findOne({
      categoryName,
      status: CATEGORY_STATUS.initial,
    });
    return result;
  }

  async queryCategoryList({ current = 1, pageSize = 10, categoryName = '' }) {
    const condition: {
      categoryName?: RegExp;
      status: CATEGORY_STATUS;
    } = {
      status: CATEGORY_STATUS.initial,
    };
    if (categoryName) {
      condition.categoryName = new RegExp(categoryName, 'i');
    }
    const list = await this.componentModel
      .find(condition)
      // .sort({ createdAt: -1 })
      .skip(pageSize * (current - 1))
      .limit(pageSize);
    const total = await this.componentModel.find(condition).countDocuments();
    return {
      list,
      total,
    };
  }

  async editCategory(_id: string, categoryName: string) {
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          categoryName,
        },
      }
    );
    return result;
  }

  async deleteCategory(_id: string) {
    const result = await this.componentModel.findOneAndUpdate(
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

  async addComponent(categoryId: string, component: ComponentDTO) {
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id: categoryId,
      },
      {
        $push: {
          children: {
            ...component,
            status: COMPONENT_STATUS.initial,
          },
        },
      } as any,
      {
        new: true,
      }
    );
    return result;
  }

  async editComponent(categoryId: string, component: ComponentDTO) {
    console.log('component: ', component);
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id: categoryId,
        children: {
          $elemMatch: {
            _id: component._id,
          },
        },
      },
      {
        $set: {
          'children.$.name': component.name,
          'children.$.cover': component.cover,
          'children.$.mchema': component.schema,
        },
      },
      {
        new: true,
      }
    );
    return result;
  }

  async queryComponentById(componentId: string) {
    const result = await this.componentModel.findOne({
      children: {
        $elemMatch: {
          _id: componentId,
        },
      },
    });
    if (result) {
      return result.children.find(item => item._id.equals(componentId));
    }
  }
}

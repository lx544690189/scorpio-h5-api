import { ComponentCategoryDTO, ComponentDTO } from './../dto/index';
import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';

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
    });
    return result;
  }

  async addComponent(categoryId: string, component: ComponentDTO) {
    console.log('component: ', component);
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id: categoryId,
      },
      {
        $push: {
          children: component,
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
        // child: {
        //   $elemMatch: {
        //     _id: component._id,
        //   },
        // },
      },
      {
        // $set: {
        //   'child.&.name': component.name,
        // },
      },
      {
        new: true,
      }
    );
    return result;
  }
}

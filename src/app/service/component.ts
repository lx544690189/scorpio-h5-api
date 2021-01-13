import { ComponentDTO } from './../dto/index';
import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';
import { COMPONENT_STATUS } from '../types';

@Provide()
export class ComponentService {
  @Inject()
  private componentModel!: typeof mongoose.Model;

  async addComponent(component: ComponentDTO) {
    const result = await this.componentModel.create({
      ...component,
      status: COMPONENT_STATUS.initial,
    });
    return result;
  }

  async editComponent(component: ComponentDTO) {
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id: component._id,
      },
      {
        $set: {
          name: component.name,
          cover: component.cover,
          generatorSchema: component.generatorSchema,
          props: component.props,
          containerProps: component.containerProps,
        },
      },
      {
        new: true,
      }
    );
    return result;
  }

  async queryComponentById(_id: string) {
    const result = await this.componentModel.findById(_id);
    return result;
  }

  async deleteComponent(_id: string) {
    const result = await this.componentModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          status: COMPONENT_STATUS.delete,
        },
      }
    );
    return result;
  }
}

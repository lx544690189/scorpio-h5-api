import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';

@Provide()
export class ComponentService {
  @Inject()
  private componentModel!: typeof mongoose.Model;

  async addComponentCategory() {
    const result = await this.componentModel.create({
      test: 1,
    });
    return result;
  }
}

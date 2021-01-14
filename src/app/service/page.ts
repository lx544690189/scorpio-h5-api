import { PageDTO } from './../dto/index';
import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';
import { PAGE_STATUS } from '../types';

@Provide()
export class PageService {
  @Inject()
  private pageModel!: typeof mongoose.Model;

  async create(page: PageDTO) {
    const result = await this.pageModel.create(page);
    return result;
  }

  async edit(page: PageDTO) {
    const result = await this.pageModel.findOneAndUpdate(
      {
        _id: page._id,
      },
      {
        $set: {
          pageSchema: page.pageSchema,
        },
      },
      {
        new: true,
      }
    );
    return result;
  }

  async queryById(_id: string) {
    const result = await this.pageModel.findById(_id);
    return result;
  }

  async delete(_id: string) {
    const result = await this.pageModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          status: PAGE_STATUS.delete,
        },
      }
    );
    return result;
  }
}

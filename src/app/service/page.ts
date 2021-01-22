import { PageDTO } from './../dto/index';
import { Inject, Provide } from '@midwayjs/decorator';
import * as mongoose from 'mongoose';
import { PAGE_STATUS } from '../types';

@Provide()
export class PageService {
  @Inject()
  private pageModel!: typeof mongoose.Model;

  async queryList({ current = 1, pageSize = 10, name = '' }) {
    const condition: {
      status: PAGE_STATUS;
    } = {
      status: PAGE_STATUS.initial,
    };
    const list = await this.pageModel
      .find(condition)
      .sort({ createdAt: -1 })
      .skip(pageSize * (current - 1))
      .limit(pageSize);
    const total = await this.pageModel.find(condition).countDocuments();
    return {
      list,
      total,
    };
  }

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

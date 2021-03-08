import { ScopeEnum } from '@midwayjs/decorator';
import { IApplicationContext, providerWrapper } from '@midwayjs/core';

import { MongooseConnection } from '../lib/mongoose';

providerWrapper([
  {
    id: 'pageModel',
    provider: model,
    scope: ScopeEnum.Singleton,
  },
]);
export async function model(context: IApplicationContext) {
  const mongooseConnection: MongooseConnection = await context.getAsync(
    'mongooseConnection'
  );
  const {
    mongoose: { Schema },
    connection,
  } = mongooseConnection;

  const schema = new Schema(
    {
      pageSchema: {
        type: Array,
        default: [],
      },
      history: {
        type: Array,
        default: [],
      },
      isTemplate: {
        type: Boolean,
        default: false,
      },
      status: {
        type: Number,
        default: 1,
      },
    },
    {
      timestamps: true,
    }
  );
  return connection.model('page', schema, 'page');
}

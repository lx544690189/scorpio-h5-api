import { ScopeEnum } from '@midwayjs/decorator';
import { IApplicationContext, providerWrapper } from '@midwayjs/core';

import { MongooseConnection } from '../lib/mongoose';

providerWrapper([
  {
    id: 'componentModel',
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
      name: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  return connection.model('component', schema, 'component');
}

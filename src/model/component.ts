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
    mongoose: { Schema, Types },
    connection,
  } = mongooseConnection;

  const schema = new Schema(
    {
      categoryId: {
        type: Types.ObjectId,
      },
      name: {
        type: String,
      },
      cover: {
        type: String,
      },
      generatorSchema: {
        type: Object,
      },
      props: {
        type: Object,
      },
      containerProps: {
        type: Object,
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
  return connection.model('component', schema, 'component');
}

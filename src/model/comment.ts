import { ScopeEnum } from '@midwayjs/decorator';
import { IApplicationContext, providerWrapper } from '@midwayjs/core';
import { MongooseConnection } from '../lib/mongoose';

providerWrapper([
  {
    id: 'commentModel',
    provider: model,
    scope: ScopeEnum.Singleton,
  },
]);
export async function model(context: IApplicationContext) {
  const mongooseConnection: MongooseConnection = await context.getAsync(
    'mongooseConnection'
  );
  const {
    mongoose: {
      Schema,
      Types: { ObjectId },
    },
    connection,
  } = mongooseConnection;
  const schema = new Schema(
    {
      nickname: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      ip: {
        type: String,
      },
      ipAddress: {
        type: String,
      },
      referId: {
        type: ObjectId,
      },
      content: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  return connection.model('comment', schema, 'comment');
}

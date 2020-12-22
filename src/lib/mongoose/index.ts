import * as mongoose from 'mongoose';
import {
  Provide,
  ScopeEnum,
  Scope,
  Async,
  Config,
  Init,
} from '@midwayjs/decorator';

export interface IMongooseConnection {
  mongoose: typeof mongoose;
  connection: mongoose.Connection;
}
@Scope(ScopeEnum.Singleton)
@Async()
@Provide()
export class MongooseConnection implements IMongooseConnection {
  mongoose!: typeof mongoose;

  connection!: mongoose.Connection;

  @Config('mongoose')
  public options!: {
    url: string;
    options: mongoose.ConnectionOptions;
  };

  @Init()
  public async connect() {
    const { url, options } = this.options;
    const connection = await mongoose.createConnection(url, options);

    this.mongoose = mongoose;
    this.connection = connection;
  }
}

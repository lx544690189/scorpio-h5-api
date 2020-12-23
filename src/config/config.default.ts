import { Context, EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608621404438_3273';

  // add your config here
  config.middleware = [];

  config.onerror = {
    accepts(ctx: Context) {
      if (ctx.get('content-type').includes('application/json')) {
        return 'json';
      }
      return 'html';
    },
    html(err: any, ctx: any) {
      ctx.body = `<p>${err.message}</p>`;
      ctx.status = 500;
    },
    json(err: any, ctx: Context) {
      if (err.status === 401) {
        ctx.body = {
          code: 14001,
          errmsg: '登录状态失效，请重新登录',
          trace: err.message,
        };
      } else if (err.status === 500) {
        ctx.body = {
          code: 2001,
          errmsg: '系统开小差了,请稍后再试',
          trace: err.message,
        };
      } else if (err.status !== 200) {
        ctx.body = {
          code: err.status,
          errmsg: err.message,
        };
      }
      ctx.status = 200;
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    credentials: true,
    origin: (ctx: Context) => ctx.get('origin'),
  };

  return config;
};

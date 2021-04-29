# 搭建项目api服务

- 技术栈： [midway](https://midwayjs.org/)，mongoose。
- 前端项目：https://github.com/lx544690189/scorpio-h5-design
- 演示地址：https://scorpio-design.lxzyl.cn
## 快速入门
修改配置文件：`/src/config/config.default.ts`，配置自己的MongoDB地址
```ts
config.mongoose = {
  url: '', // 这里填写你的mongo地址
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
```
### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。


[midway]: https://midwayjs.org

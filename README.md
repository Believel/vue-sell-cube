# vue-sell-cube

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

> 在项目目录文件中生成 dist 文件夹

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your report

```
yarn run report
```

> 在 dist 文件中生成一个`report.html文件`,可以直接在本地打开

### 如何在本地跑起来打包之后的项目

1. 打包项目生成 `dist` 文件夹(静态文件)
2. 在项目文件夹下创建一个 server,例如 prod.server.js,开启一个本地的服务
3. 运行 `prod.server.js`

```
node prod.server.js
```

4. 在浏览器中打开：http://localhost:4000就能在本地看见打包之后的项目

# FCLOGO Legacy

此仓库是 FCLOGO 旧版本的归档首页。项目已迁移至 [https://fclogo.top](https://fclogo.top)。

## 构建

```sh
yarn build
```

构建产物位于 `public/`。页面使用原生 HTML 与 CSS，不需要安装第三方依赖。

## 本地开发

```sh
yarn dev
```

浏览器访问 [http://127.0.0.1:8000](http://127.0.0.1:8000)。修改 HTML 或 CSS 后刷新页面即可看到结果。

检查最终构建产物时运行：

```sh
yarn preview
```

## Netlify

仓库中的 `netlify.toml` 已配置：

- 构建命令：`node build.mjs`
- 发布目录：`public`

在 Netlify 导入此 Git 仓库并选择需要部署的分支即可。旧站的其他访问路径会显示同一个迁移首页。

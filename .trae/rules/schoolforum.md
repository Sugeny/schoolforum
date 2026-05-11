# Schoolforum 项目规则

## 运行时环境

- Node.js 版本要求: `^20.19.0 || >=22.12.0`
- 包管理器: pnpm
- 构建工具: Vite 7.x
- 框架: Vue 3.5.x

## 沙箱运行规则

### 端口和终端管理

- 操作完成后自动结束被占用的端口号和终端
- 开发服务器默认端口: 5173
- 预览服务器默认端口: 4173

### 常用命令

- 安装依赖: `pnpm install`
- 开发服务器: `pnpm dev`
- 构建项目: `pnpm build`
- 预览构建: `pnpm preview`
- 代码格式化: `pnpm format`

## 技术栈

- 前端框架: Vue 3
- 状态管理: Pinia (+ pinia-plugin-persistedstate 持久化插件)
- 路由: Vue Router
- HTTP 客户端: Axios
- UI 组件库: Arco Design Vue
- CSS 预处理器: Sass
- 通用工具库: VueUse

## 构建插件

- @vitejs/plugin-vue: Vue 官方 Vite 插件
- @arco-plugins/vite-vue: Arco Design 按需加载插件
- unplugin-auto-import: API 自动导入
- unplugin-vue-components: 组件自动导入

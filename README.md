# 应用管理器

一个使用 Next.js 和 Tailwind CSS 构建的现代化应用管理工具，帮助您管理和组织所有应用程序。

## ✨ 功能特性

- 🚀 **现代化界面**: 使用 Tailwind CSS 构建的响应式设计
- 📱 **响应式布局**: 支持桌面端和移动端
- 🔍 **智能搜索**: 快速搜索和筛选应用
- 📊 **双视图模式**: 支持网格和列表两种显示方式
- 🏷️ **分类管理**: 按类别组织和筛选应用
- ➕ **添加应用**: 简单易用的应用添加表单
- ⚡ **状态管理**: 管理应用的活跃/非活跃状态
- 🎨 **图标选择**: 丰富的表情符号图标库
- 🔗 **快速访问**: 一键访问应用链接

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **UI组件**: Headless UI
- **语言**: TypeScript
- **字体**: Inter (Google Fonts)

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
hacker/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/             # React 组件
│   ├── AppCard.tsx        # 应用卡片组件
│   └── AddAppModal.tsx    # 添加应用模态框
├── types/                  # TypeScript 类型定义
│   └── app.ts             # 应用相关类型
├── package.json            # 项目依赖
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## 🎯 使用方法

### 1. 查看应用
- 应用以网格或列表形式显示
- 使用右上角的按钮切换视图模式

### 2. 搜索和筛选
- 使用搜索框按名称或描述搜索应用
- 使用分类下拉菜单筛选特定类别的应用

### 3. 添加新应用
- 点击"添加应用"按钮
- 填写应用信息（名称、描述、分类、链接等）
- 选择应用图标和状态
- 点击"添加应用"保存

### 4. 管理应用
- 点击应用卡片上的"访问"按钮打开应用链接
- 使用更多选项菜单更改应用状态或删除应用

## 🎨 自定义

### 修改颜色主题
编辑 `tailwind.config.js` 文件中的 `primary` 颜色配置：

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // 主色调
    600: '#2563eb',
    // ... 其他色阶
  }
}
```

### 添加新分类
在 `app/page.tsx` 中修改 `categories` 数组：

```typescript
const categories = ['all', '工具', '开发', '娱乐', '生产力', '社交', '新分类']
```

### 自定义图标
在 `components/AddAppModal.tsx` 中修改图标数组：

```typescript
['🚀', '💻', '🌐', '🎵', '📱', '🎮', '📚', '🔧', '🎨', '📊', '💡', '⭐', '🔥', '💎', '🌈', '🎯', '新图标']
```

## 📱 响应式设计

应用完全响应式，支持以下断点：
- **移动端**: < 640px
- **平板**: 640px - 1024px  
- **桌面端**: > 1024px

## 🔧 开发

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### 组件开发
- 所有组件都使用 TypeScript
- 使用 Tailwind CSS 进行样式设计
- 遵循 React Hooks 最佳实践

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果您有任何问题或建议，请创建 Issue 或联系开发者。

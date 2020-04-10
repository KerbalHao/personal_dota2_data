# 个人 dota2 项目

## 项目介绍
- 本项目是基于 dota2 中文官网以及 17173 网站中关于 dota2 的数据创建的全栈项目，仅用于个人练习。
- 项目使用了 flex 布局，主要支持使用移动端浏览。
- 项目支持登录和注销操作，大部分功能需要登录使用，账号密码为 admin。
- 英雄页面可以点击查看英雄具体内容，包括背景故事、昵称、阵营、技能（技能详情需要进一步的数据）等，支持筛选过滤，可在详情页面收藏该英雄
- 物品界面模拟网上商城，可以进行购物、结算等操作，有点击加入购物车的动画（小球抛物线）。
- 用户界面处理登录和注册事宜，且可查看已购买和已收藏。
- 后端使用 jwt 校验用户是否登录
- 用户数据保存在 server\routes\data 中
- 英雄界面
   
![英雄界面](https://cdn.jsdelivr.net/gh/kerbalhao/blog_images/img/2020/SxKVv5r5Cu.gif)
- 物品界面
 
![物品界面](https://cdn.jsdelivr.net/gh/kerbalhao/blog_images/img/2020/AdLYeNBHWw.gif)
## 技术栈

### 前端
- 使用了 Vue 全家桶(Vue，Vue-Router，Vuex)，cube-ui 组件库以及 CSS 预处理器 stylus 进行前端的开发以及样式的书写。
- 使用 axios 进行进行数据的请求

### 后端
- 使用 express 框架构建了基础的后台服务，通过前端发出请求进行数据的交流
- 使用 JSON Web Token 进行跨域认证，校验用户是否登录

## 使用说明
### 部署项目
```
npm install
```
### 修改原始配置
#### 字体
因为在使用 cube-ui 是使用了 amfe-flexibale，文档字体大小 rem 被固定，修改需要到找到 `node_modules\amfe-flexible\index.js` 文件，修改函数 `setRemUnit`，重新设置其 rem 的单位大小，本人修改如下：
```js
function setRemUnit () {
    var rem = docEl.clientWidth / 20
    docEl.style.fontSize = rem + 'px'
  }
```

### 启用后台服务
```
npm start 
```
### 启用开发环境
```
npm run serve
```

### 启用生产环境
```
npm run build
```
const express = require('express'); // 引入 express 模块 // 引入 express
const cors = require('cors'); // 引入 cors 模块用于跨域资源共享 // 引入 cors
const db = require('../models'); // 导入数据库模型 // 导入模型
const userRoutes = require('./routes/userRoutes'); // 导入用户路由模块 // 导入用户路由
const postRoutes = require('./routes/postRoutes'); // 导入帖子路由模块 // 导入帖子路由

const app = express(); // 创建 express 应用实例 // 创建应用

// 中间件 // 使用中间件
app.use(cors()); // 使用 cors 中间件允许跨域请求 // 允许跨域
app.use(express.json()); // 使用 express.json 中间件解析 JSON 请求体 // 解析 JSON
app.use(express.urlencoded({ extended: true })); // 使用 express.urlencoded 中间件解析 URL 编码的请求体 // 解析 URL 编码

// 数据库测试连接和同步 // 数据库同步
/*
db.sequelize
  .sync() // 确保模型与数据库表同步 // 同步模型
  .then(() => console.log('Database connected and models synchronized!')) // 连接成功日志 // 成功日志
  .catch((err) => console.error('Database connection failed:', err)); // 连接失败错误处理 // 错误处理
*/

// 路由 // 定义路由
app.use('/api/users', userRoutes); // 使用用户路由模块，路径为 /api/users // 用户路由
app.use('/api/posts', postRoutes); // 使用帖子路由模块，路径为 /api/posts // 帖子路由

module.exports = app; // 导出 express 应用实例 // 导出应用







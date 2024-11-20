const express = require('express'); // 引入 express 模块 // 引入 express
const { createPost, getAllPosts, getPostById, deletePost, updatePost } = require('../controllers/postController'); // 导入帖子控制器中的各个函数 // 导入控制器函数
const authMiddleware = require('../middlewares/authMiddleware'); // 导入认证中间件 // 导入中间件

const router = express.Router(); // 创建一个 express 路由器实例 // 创建路由器

router.post('/', authMiddleware, createPost); // 定义 POST 路由用于创建帖子，需要登录 // 创建帖子路由
router.get('/', getAllPosts);                 // 定义 GET 路由用于查看所有帖子，公开 // 查看所有帖子路由
router.get('/:id', getPostById);              // 定义 GET 路由用于查看单个帖子，公开 // 查看单个帖子路由
router.put('/:id', authMiddleware, updatePost); // 定义 PUT 路由用于修改帖子，需要登录 // 修改帖子路由
router.delete('/:id', authMiddleware, deletePost); // 定义 DELETE 路由用于删除帖子，需要登录 // 删除帖子路由

module.exports = router; // 导出路由器实例 // 导出路由器







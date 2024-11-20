const express = require('express'); // 引入 express 模块 // 引入 express
const { register, login } = require('../controllers/userController'); // 导入用户控制器中的注册和登录函数 // 导入控制器函数
const { sendRegistrationCode, verifyRegistrationCode } = require('../controllers/verificationController');

const router = express.Router(); // 创建一个 express 路由器实例 // 创建路由器

router.post('/register', register); // 定义 POST 路由用于用户注册 // 注册路由
router.post('/login', login);       // 定义 POST 路由用于用户登录 // 登录路由

// 用户注册验证相关路由
router.post('/send-registration-code', sendRegistrationCode);
router.post('/verify-registration-code', verifyRegistrationCode);

module.exports = router; // 导出路由器实例 // 导出路由器







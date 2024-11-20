const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 库用于验证 JWT // 引入 jwt

module.exports = (req, res, next) => { // 导出中间件函数 // 导出中间件
  try { // 尝试执行以下代码块 // 尝试
    const token = req.headers.authorization?.split(' ')[1]; // 从请求头中获取并分割 authorization 字段以提取 JWT // 获取令牌
    if (!token) { // 如果没有找到令牌 // 判断是否有令牌
      return res.status(401).json({ error: 'Unauthorized' }); // 发送未授权响应 // 未授权响应
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 使用 jwt.verify 方法验证令牌 // 验证令牌
    req.user = decoded; // 将解码后的用户信息存入 req.user // 存储用户信息
    next(); // 调用下一个中间件 // 下一个中间件
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(401).json({ error: 'Invalid or expired token' }); // 发送无效或过期令牌响应 // 无效或过期响应
  }
}; // 结束中间件函数 // 结束函数







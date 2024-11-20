const { User } = require('../../models'); // 加载 User 模型 // 加载模型
const bcrypt = require('bcrypt'); // 引入 bcrypt 库用于密码加密 // 引入 bcrypt
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 库用于生成 JWT // 引入 jwt

// 用户注册 // 定义用户注册函数
exports.register = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { username, email, password } = req.body; // 从请求体中解构获取 username, email 和 password // 获取请求体数据

    // 检查用户是否已存在 // 检查用户是否存在
    const existingUser = await User.findOne({ where: { email } }); // 使用 findOne 方法查找用户 // 查找用户
    if (existingUser) { // 如果用户已存在 // 判断是否存在
      return res.status(400).json({ error: 'Email already registered' }); // 发送邮箱已注册响应 // 已注册响应
    }

    // 加密密码 // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10); // 使用 bcrypt.hash 方法加密密码 // 加密密码

    // 创建用户 // 创建用户
    const user = await User.create({ // 使用 User 模型创建新用户 // 创建用户
      username, // 设置用户名 // 用户名
      email, // 设置邮箱 // 邮箱
      password: hashedPassword, // 设置加密后的密码 // 密码
    });

    res.status(201).json({ // 发送成功响应 // 成功响应
      message: 'User registered successfully', // 响应消息 // 消息
      user: { id: user.id, username: user.username, email: user.email }, // 返回用户信息 // 用户信息
    });
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 register 函数 // 结束函数

// 用户登录 // 定义用户登录函数
exports.login = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { email, password } = req.body; // 从请求体中解构获取 email 和 password // 获取请求体数据

    // 检查用户是否存在 // 检查用户是否存在
    const user = await User.findOne({ where: { email } }); // 使用 findOne 方法查找用户 // 查找用户
    if (!user) { // 如果用户不存在 // 判断是否存在
      return res.status(401).json({ error: 'Invalid email or password' }); // 发送无效邮箱或密码响应 // 无效响应
    }

    // 验证密码 // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password); // 使用 bcrypt.compare 方法验证密码 // 验证密码
    if (!isPasswordValid) { // 如果密码无效 // 判断密码有效性
      return res.status(401).json({ error: 'Invalid email or password' }); // 发送无效邮箱或密码响应 // 无效响应
    }

    // 生成 JWT // 生成 JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { // 使用 jwt.sign 方法生成 JWT // 生成 JWT
      expiresIn: '1h', // 设置过期时间为1小时 // 过期时间
    });

    res.status(200).json({ // 发送成功响应 // 成功响应
      message: 'Login successful', // 响应消息 // 消息
      token, // 返回 JWT // JWT
      user: { id: user.id, username: user.username, email: user.email }, // 返回用户信息 // 用户信息
    });
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 login 函数 // 结束函数







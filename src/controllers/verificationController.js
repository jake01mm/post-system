const Verification = require('../utils/verification');
const { User } = require('../../models');
// const sendMail = require('../utils/mailer'); // 引入 Mailgun 邮件工具

// 注册验证码发送
exports.sendRegistrationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 生成验证码并发送
    const code = await Verification.create(user.id, 'register');
    console.log(`Registration code for ${email}: ${code}`); // 模拟发送

    // 使用 Mailgun 发送验证码
   await sendMail(email, 'Your Registration Code', `Your verification code is: ${code}`);


    res.status(200).json({ message: 'Registration code sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 验证注册验证码
exports.verifyRegistrationCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await Verification.validate(user.id, code, 'register');
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }
    // 更新用户为已验证状态
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Registration verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

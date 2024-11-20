const mailgun = require('mailgun.js');
const formData = require('form-data');

const mg = mailgun(formData);
const client = mg.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY, // 使用 API 密钥
});

async function sendMail(to, subject, text) {
  try {
    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, { // 使用域名
      from: process.env.MAILGUN_FROM, // 发件人地址
      to, // 收件人地址
      subject, // 邮件主题
      text, // 邮件正文
    });
    console.log(`Email sent to ${to}:`, result.id);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}

module.exports = sendMail;

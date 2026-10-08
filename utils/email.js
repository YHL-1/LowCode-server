const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '1447582128@qq.com',
    pass: 'stohuasbrgrrhhec'
  }
})

// 发送验证码
async function sendCodeMail(to, code) {
  return await transporter.sendMail({
    from: '1447582128@qq.com',
    to,
    subject: '您的注册验证码',
    html: `<h2>您的验证码：${code}</h2><p>5分钟内有效</p>`
  })
}

module.exports = { sendCodeMail }
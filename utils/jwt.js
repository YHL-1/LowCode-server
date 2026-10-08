const jwt = require('jsonwebtoken')

// 秘钥（自己改复杂点）
const SECRET_KEY = 'lowcode_2026_secret'
// 有效期 2 小时
const EXPIRES_IN = '2h'

// 生成 token
function generateToken(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: EXPIRES_IN })
}

// 解析 token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return null
  }
}

module.exports = {
  generateToken,
  verifyToken
}
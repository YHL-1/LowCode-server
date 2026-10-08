const {register,login,resetPassword}=require('../service/user');

    const { sendCodeMail } = require('../utils/email');

    const redis=require("../utils/redis")

const {  generateToken,
  verifyToken} =require('../utils/jwt')
class UserController{

async sendCode (ctx) {
  const { email } = ctx.request.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(`verify:${email}`, code, 'EX', 300);
  await sendCodeMail(email, code);
  ctx.body = { code: 200, msg: '发送成功' };
}

async register(ctx){
        const {email,code,password} = ctx.request.body;
        const realCode = await redis.get(`verify:${email}`);
        if(!realCode || realCode !== code){
            ctx.body = {
                code: 400,
                message: '验证码错误或已过期'
            };
            return;
        }
        await redis.del(`verify:${email}`);
        register(email,password)
        ctx.body = {
            code: 0,
            message: {
                code:200,
                msg:'注册成功'
            }
        };
    }
async login(ctx){
        const {email,password} = ctx.request.body;
        const res = await login(email);
        if(!res)
        {
            ctx.body = {
            code: 400,
            message: '登陆失败,该邮箱未被注册',
        };
        }else{
            if(res.password==password){
                const token=generateToken({id:res.id})
        ctx.body = {
            code: 200,
            message: '登录成功',
            data:{
                id:res.id,
                token:token
            }
        };}
        else{
            ctx.body = {
            code: 400,
            message: '登陆失败,密码错误',
        };
        }
    }
}

async resetPassword(ctx){
        const {email,code,password} = ctx.request.body;
        const realCode = await redis.get(`verify:${email}`);
        if(!realCode || realCode !== code){
            ctx.body = {
                code: 400,
                message: '验证码错误或已过期'
            };
            return;
        }
        await redis.del(`verify:${email}`);
        resetPassword(email,password);
        ctx.body = {
            code: 0,
            message: {
                code:200,
                msg:'修改成功'
            }
        };
    }
}
module.exports=new UserController();
const {verifyToken}=require('../utils/jwt')

const authMiddleWare=async(ctx,next)=>{

    const authHeader=ctx.headers.authorization
    if(!authHeader)
    {
        ctx.body={
            code:401,
            msg:'未登录,请先登录'
        }
        return
    }
    

    const token=authHeader.replace('Bearer ','')
    const userId=verifyToken(token)

    if(!userId){
        ctx.body={
            code:401,
            msg:'登录已失效,请重新登录'
        }
        return
    }

    console.log(userId)

    ctx.userId=userId.id
    await next()
}

module.exports=authMiddleWare
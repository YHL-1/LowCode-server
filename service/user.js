const User=require('../model/user');

class UserService{
    async register(email,password){
        const res=await User.create({email,password});
        return res.dataValues;
    }

    async login(email){
        const res=await User.findOne({where: {email}});
        return res?res.dataValues:null;
}
    async resetPassword(email,password){
        const res=await User.update({password:password},{where:{email:email}});
        return res?res.dataValues:null;
    }
}

module.exports=new UserService();
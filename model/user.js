const {DataTypes}=require('sequelize');
const seq=require('../db/db');

const User=seq.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        comment:'用户ID'
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        comment:'用户邮箱'
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'用户密码'
    }
}, {
  tableName: 'users', 
   timestamps: false      // 👈 强制指定数据库真实表名！
});

User.sync({force:false})


module.exports=User;
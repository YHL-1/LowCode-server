const {DataTypes}=require('sequelize');
const seq=require('../db/db');

const Record=seq.define('Record',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        comment:'记录ID'
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户ID'
    },
    result:{
        type:DataTypes.TEXT('long'),
        allowNull:false,
        comment:'JSON结果'
    },
    title:{
        type:DataTypes.TEXT('long'),
        allowNull:true,
        comment:'草稿名称'
    },
});

Record.sync({force:false})

module.exports=Record;